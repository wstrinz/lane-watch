import { expect, test } from "bun:test";
import { Database } from "bun:sqlite";
import { CampaignCoordinationInterfaceService } from "../src/campaign-coordination-interface-service";
import { ObserverAutomationPolicyService } from "../src/observer-automation-policy-service";
import { LaneOwnershipService } from "../src/lane-ownership-service";
import type { LaneSnapshot } from "../src/types";
import { WaveRepository } from "../src/wave-repository";

function lane(overrides: Partial<LaneSnapshot> = {}): LaneSnapshot {
  return {
    id: "demo:windows:external-terminal",
    project: "demo",
    host: "windows",
    task: "external-terminal",
    lane: "DKW-LSA",
    name: "external terminal",
    model: "sonnet",
    effort: "high",
    laneKind: "research",
    parentAgent: "",
    jobId: "job-external",
    sessionId: "session-external",
    lifecycle: "active",
    daemon: "done",
    tempo: "idle",
    status: "Done",
    severity: "attention",
    attentionReason: "terminal-unrecorded",
    detail: "Terminal result is waiting for its owner.",
    output: "",
    tokens: 100,
    inFlight: 0,
    queued: 0,
    activities: [],
    topology: null,
    timeline: [],
    landing: "—",
    branch: "agent/local-sonnet/external-terminal",
    worktree: "C:/tmp/external-terminal",
    launchedAt: "2026-08-30T00:00:00.000Z",
    updatedAt: "2026-08-30T01:00:00.000Z",
    completedAt: "2026-08-30T01:00:00.000Z",
    ...overrides,
  };
}

function harness(input: {
  phase?: string;
  automation?: string;
  recovery?: { required: boolean; status: string };
} = {}) {
  const database = new Database(":memory:");
  database.run(`
    CREATE TABLE campaign_waves (
      wave_id TEXT PRIMARY KEY, project_id TEXT NOT NULL, label TEXT NOT NULL,
      phase TEXT NOT NULL, lane_ids_json TEXT NOT NULL, evidence_digest TEXT NOT NULL,
      bundle_path TEXT NOT NULL, synthesis_turn_id TEXT NOT NULL,
      created_at TEXT NOT NULL, updated_at TEXT NOT NULL
    );
    CREATE TABLE campaign_wave_lanes (
      wave_id TEXT NOT NULL, lane_id TEXT NOT NULL, accounting_state TEXT NOT NULL,
      disposition TEXT NOT NULL, reason TEXT NOT NULL, snapshot_json TEXT NOT NULL,
      updated_at TEXT NOT NULL, PRIMARY KEY(wave_id, lane_id)
    );
    CREATE TABLE campaign_wave_triages (wave_id TEXT PRIMARY KEY, status TEXT NOT NULL);
    CREATE TABLE campaign_research_runs (
      run_id TEXT NOT NULL DEFAULT '', project_id TEXT NOT NULL, wave_id TEXT NOT NULL, task_id TEXT NOT NULL,
      lane_id TEXT NOT NULL, job_id TEXT NOT NULL, status TEXT NOT NULL
    );
    CREATE TABLE campaign_wave_schedules (
      schedule_id TEXT PRIMARY KEY, project_id TEXT NOT NULL, wave_id TEXT NOT NULL,
      schedule_digest TEXT NOT NULL, status TEXT NOT NULL, confirmed_by TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
  `);
  const actions: Array<Record<string, any>> = [];
  const project = {
    automation_mode: input.automation ?? "prepare",
    current_phase: input.phase ?? "RUNNING",
    version: 7,
  };
  const recovery = input.recovery ?? { required: false, status: "ALIGNED" };
  const waves = new WaveRepository(database);
  const coordination = new CampaignCoordinationInterfaceService(database, waves, { controlState: () => ({ recovery }) });
  const ownership = new LaneOwnershipService(coordination);
  const policy = new ObserverAutomationPolicyService(database, waves, coordination, ownership, {
    project: () => project,
    controlState: () => ({ recovery }),
    coordinatorAvailable: () => false,
    enqueueAction: async (action, actor) => { actions.push({ ...action, actor }); return action; },
    digest: (value) => JSON.stringify(value),
  });
  return { database, actions, policy };
}

function addWave(database: Database, input: {
  phase?: string;
  laneId?: string;
  accountingState?: string;
  bundlePath?: string;
} = {}): void {
  const phase = input.phase ?? "RUNNING";
  const laneId = input.laneId ?? "demo:windows:owned-terminal";
  database.query(`
    INSERT INTO campaign_waves(
      wave_id, project_id, label, phase, lane_ids_json, evidence_digest,
      bundle_path, synthesis_turn_id, created_at, updated_at
    ) VALUES ('wave-1', 'demo', 'Current wave', $phase, $lanes, '', $bundle, '', $now, $now)
  `).run({ $phase: phase, $lanes: JSON.stringify([laneId]), $bundle: input.bundlePath ?? "", $now: "2026-08-30T00:00:00.000Z" });
  database.query(`
    INSERT INTO campaign_wave_lanes(
      wave_id, lane_id, accounting_state, disposition, reason, snapshot_json, updated_at
    ) VALUES ('wave-1', $lane, $state, '', '', '{}', '2026-08-30T00:00:00.000Z')
  `).run({ $lane: laneId, $state: input.accountingState ?? "RUNNING" });
}

test("recovery-required state is a complete observer automation circuit breaker", async () => {
  const { database, actions, policy } = harness({
    phase: "BLOCKED",
    automation: "bounded",
    recovery: { required: true, status: "HUMAN_RECONCILIATION_REQUIRED" },
  });
  addWave(database, { phase: "DECISION_REQUIRED", laneId: "demo:windows:external-terminal", accountingState: "NEEDS_RECONCILIATION" });

  const observed = lane();
  await policy.propose("demo", [observed], [observed], { total: 1, accounted: 0, unaccounted: 1, running: 0, complete: false });

  expect(actions).toEqual([]);
  database.close();
});

test("an aligned but externally owned terminal lane does not enqueue reconciliation", async () => {
  const { database, actions, policy } = harness();
  addWave(database, { laneId: "demo:windows:different-owned-lane" });

  const observed = lane();
  await policy.propose("demo", [observed], [observed], { total: 1, accounted: 0, unaccounted: 1, running: 1, complete: false });

  expect(actions).toEqual([]);
  database.close();
});

test("an aligned adopted member or current durable run remains eligible for guarded reconciliation", async () => {
  const adopted = harness();
  addWave(adopted.database, { laneId: "demo:windows:owned-terminal", accountingState: "NEEDS_RECONCILIATION" });
  const ownedLane = lane({ id: "demo:windows:owned-terminal", task: "owned-terminal", jobId: "job-owned" });
  await adopted.policy.propose("demo", [ownedLane], [ownedLane], { total: 1, accounted: 0, unaccounted: 1, running: 0, complete: false });
  expect(adopted.actions).toContainEqual(expect.objectContaining({ type: "lane.reconcile", targetId: ownedLane.id }));
  adopted.database.close();

  const scheduled = harness({ recovery: { required: false, status: "DIVERGENCE_EXPLAINED_BY_ACTIVE_EXECUTION" } });
  addWave(scheduled.database, { laneId: "demo:windows:historical-member" });
  scheduled.database.query(`
    INSERT INTO campaign_research_runs(run_id, project_id, wave_id, task_id, lane_id, job_id, status)
    VALUES ('run-scheduled', 'demo', 'wave-1', 'scheduled-task', 'demo:windows:scheduled-task', 'job-scheduled', 'running')
  `).run();
  const scheduledLane = lane({ id: "demo:windows:scheduled-task", task: "scheduled-task", jobId: "job-scheduled" });
  await scheduled.policy.propose("demo", [scheduledLane], [scheduledLane], { total: 1, accounted: 0, unaccounted: 1, running: 1, complete: false });
  expect(scheduled.actions).toContainEqual(expect.objectContaining({ type: "lane.reconcile", targetId: scheduledLane.id }));
  scheduled.database.close();
});

test("automatic synthesis preparation requires an aligned complete current wave", async () => {
  const ready = harness({ phase: "SYNTHESIS_READY" });
  addWave(ready.database, { phase: "SYNTHESIS_READY", accountingState: "READY" });
  await ready.policy.propose("demo", [], [], { total: 1, accounted: 1, unaccounted: 0, running: 0, complete: true });
  expect(ready.actions).toContainEqual(expect.objectContaining({ type: "synthesis.prepare" }));
  ready.database.close();

  const observedOnly = harness({ phase: "RUNNING" });
  addWave(observedOnly.database, { phase: "RUNNING", accountingState: "READY" });
  const terminal = lane({ landing: "READY_FOR_SEMANTIC_REVIEW", attentionReason: "" });
  await observedOnly.policy.propose("demo", [terminal], [terminal], { total: 1, accounted: 1, unaccounted: 0, running: 0, complete: true });
  expect(observedOnly.actions.find((action) => action.type === "synthesis.prepare")).toBeUndefined();
  observedOnly.database.close();
});
