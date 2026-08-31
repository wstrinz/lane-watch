import { expect, test } from "bun:test";
import { Database } from "bun:sqlite";
import { CampaignCoordinationInterfaceService } from "../src/campaign-coordination-interface-service";
import type { LaneSnapshot } from "../src/types";
import { WaveRepository } from "../src/wave-repository";

function lane(overrides: Partial<LaneSnapshot> = {}): LaneSnapshot {
  return {
    id: "demo:windows:lane-a", project: "demo", host: "windows", task: "lane-a", lane: "DKW-LSA",
    name: "lane a", model: "sonnet", effort: "high", laneKind: "research", parentAgent: "",
    jobId: "job-a", sessionId: "session-a", lifecycle: "active", daemon: "working", tempo: "active",
    status: "Working", severity: "working", attentionReason: "", detail: "", output: "", tokens: 1,
    inFlight: 1, queued: 0, activities: [], topology: null, timeline: [], landing: "—",
    branch: "agent/lane-a", worktree: "C:/tmp/lane-a", launchedAt: "2026-08-30T00:00:00.000Z",
    updatedAt: "2026-08-30T00:01:00.000Z", completedAt: "",
    ...overrides,
  };
}

function harness(recovery: { required: boolean; status: string } = { required: false, status: "ALIGNED" }) {
  const database = new Database(":memory:");
  database.run(`
    CREATE TABLE campaign_waves (
      wave_id TEXT PRIMARY KEY, project_id TEXT NOT NULL, label TEXT NOT NULL, phase TEXT NOT NULL,
      lane_ids_json TEXT NOT NULL, evidence_digest TEXT NOT NULL, bundle_path TEXT NOT NULL,
      synthesis_turn_id TEXT NOT NULL, created_at TEXT NOT NULL, updated_at TEXT NOT NULL
    );
    CREATE TABLE campaign_wave_lanes (
      wave_id TEXT NOT NULL, lane_id TEXT NOT NULL, accounting_state TEXT NOT NULL,
      disposition TEXT NOT NULL, reason TEXT NOT NULL, snapshot_json TEXT NOT NULL,
      updated_at TEXT NOT NULL, PRIMARY KEY(wave_id, lane_id)
    );
    CREATE TABLE campaign_research_runs (
      run_id TEXT NOT NULL, project_id TEXT NOT NULL, wave_id TEXT NOT NULL, task_id TEXT NOT NULL,
      lane_id TEXT NOT NULL, job_id TEXT NOT NULL, status TEXT NOT NULL
    );
    CREATE TABLE campaign_wave_schedules (
      schedule_id TEXT PRIMARY KEY, project_id TEXT NOT NULL, wave_id TEXT NOT NULL,
      schedule_digest TEXT NOT NULL, status TEXT NOT NULL, confirmed_by TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
  `);
  const waves = new WaveRepository(database);
  const service = new CampaignCoordinationInterfaceService(database, waves, { controlState: () => ({ recovery }) });
  return { database, service };
}

function addWave(database: Database, phase = "RUNNING"): void {
  database.query(`
    INSERT INTO campaign_waves VALUES ('wave-1', 'demo', 'Imported wave', $phase, '["demo:windows:lane-a"]', '', '', '', $now, $now)
  `).run({ $phase: phase, $now: "2026-08-30T00:00:00.000Z" });
  database.run(`
    INSERT INTO campaign_wave_lanes VALUES ('wave-1', 'demo:windows:lane-a', 'RUNNING', '', '', '{}', '2026-08-30T00:00:00.000Z')
  `);
}

function addSchedule(database: Database, status: string): void {
  database.query(`
    INSERT INTO campaign_wave_schedules VALUES ('schedule-1', 'demo', 'wave-1', $digest, $status, $actor, '2026-08-30T00:02:00.000Z')
  `).run({ $digest: `sha256:${"a".repeat(64)}`, $status: status, $actor: status === "proposed" ? "" : "operator" });
}

test("external observation remains observe-only and may only enter through human wave adoption", () => {
  const { database, service } = harness();
  const snapshot = service.snapshot("demo", [lane()]);
  expect(snapshot).toMatchObject({
    schema: "campaign-coordination-interface/v1",
    mode: "observe-only",
    authority: "none",
    capabilities: { observe: true, importWave: true, reconcile: false, dispatch: false, automaticProposals: false },
    invariants: { observationIsAuthority: false, recoveryIsCircuitBreaker: true },
  });
  expect(snapshot.lanes[0]).toMatchObject({ mode: "observe-only", controlled: false });
  database.close();
});

test("explicit aligned wave membership grants imported-wave mechanics but no dispatch", () => {
  const { database, service } = harness();
  addWave(database);
  const snapshot = service.snapshot("demo", [lane(), lane({ id: "demo:windows:external", task: "external", jobId: "external" })]);
  expect(snapshot).toMatchObject({
    mode: "imported-wave",
    authority: "human-imported-wave",
    capabilities: { reconcile: true, account: true, plan: true, prepareSchedule: true, dispatch: false, synthesize: true },
  });
  expect(snapshot.invariants.importedWaveCanDispatch).toBe(false);
  expect(snapshot.lanes).toEqual([
    expect.objectContaining({ laneId: "demo:windows:lane-a", mode: "imported-wave", controlled: true }),
    expect.objectContaining({ laneId: "demo:windows:external", mode: "observe-only", controlled: false }),
  ]);
  database.close();
});

test("a proposal stays imported while exact schedule confirmation grants controller execution", () => {
  const { database, service } = harness();
  addWave(database, "RESEARCH_READY");
  addSchedule(database, "proposed");
  expect(service.snapshot("demo")).toMatchObject({
    mode: "imported-wave",
    capabilities: { confirmSchedule: true, dispatch: false },
    invariants: { scheduleProposalIsAuthority: false },
  });
  database.query("UPDATE campaign_wave_schedules SET status = 'confirmed', confirmed_by = 'operator'").run();
  expect(service.snapshot("demo")).toMatchObject({
    mode: "controller-owned-execution",
    authority: "operator-confirmed-schedule",
    capabilities: { confirmSchedule: false, dispatch: true },
    schedule: { id: "schedule-1", status: "confirmed", confirmedBy: "operator" },
  });
  database.close();
});

test("a durable active run grants controller authority only to its exact matching lane", () => {
  const { database, service } = harness({ required: false, status: "DIVERGENCE_EXPLAINED_BY_ACTIVE_EXECUTION" });
  addWave(database);
  database.run(`
    INSERT INTO campaign_research_runs VALUES ('run-1', 'demo', 'wave-1', 'lane-a', 'demo:windows:lane-a', 'job-a', 'running')
  `);
  const snapshot = service.snapshot("demo", [lane(), lane({ id: "demo:windows:external", task: "external", jobId: "external" })]);
  expect(snapshot).toMatchObject({ mode: "controller-owned-execution", authority: "durable-controller-run", activeControllerRuns: 1 });
  expect(snapshot.lanes).toEqual([
    expect.objectContaining({ laneId: "demo:windows:lane-a", mode: "controller-owned-execution", runId: "run-1", controlled: true }),
    expect.objectContaining({ laneId: "demo:windows:external", mode: "observe-only", controlled: false }),
  ]);
  database.close();
});

test("historical recovery is a complete coordination-interface circuit breaker", () => {
  const { database, service } = harness({ required: true, status: "HUMAN_RECONCILIATION_REQUIRED" });
  addWave(database, "DECISION_REQUIRED");
  const snapshot = service.snapshot("demo", [lane()]);
  expect(snapshot).toMatchObject({
    mode: "observe-only",
    recoveryRequired: true,
    capabilities: {
      importWave: false, reconcile: false, account: false, plan: false,
      prepareSchedule: false, confirmSchedule: false, dispatch: false,
      synthesize: false, automaticProposals: false,
    },
  });
  expect(snapshot.lanes[0]).toMatchObject({ mode: "observe-only", controlled: false });
  database.close();
});
