import { afterEach, expect, test } from "bun:test";
import { Database } from "bun:sqlite";
import { CampaignRecoveryService } from "../src/campaign-recovery-service";
import type { LaneSnapshot, ObserverSnapshot } from "../src/types";
import { WaveRepository } from "../src/wave-repository";

const databases: Database[] = [];
afterEach(() => { for (const database of databases.splice(0)) database.close(); });

function observed(overrides: Partial<LaneSnapshot> = {}): LaneSnapshot {
  return {
    id: "demo:windows:stale-member", project: "demo", host: "windows", task: "stale-member",
    lane: "DKW-LSA", name: "stale member", model: "sonnet", effort: "high", laneKind: "research",
    parentAgent: "", jobId: "job-1", sessionId: "session-1", lifecycle: "active", daemon: "done",
    tempo: "idle", status: "Done", severity: "attention", attentionReason: "terminal-unrecorded",
    detail: "", output: "", tokens: 10, inFlight: 0, queued: 0, activities: [], topology: null,
    timeline: [], landing: "READY_FOR_SEMANTIC_REVIEW", branch: "", worktree: "", launchedAt: "",
    updatedAt: "2026-08-30T01:00:00.000Z", completedAt: "2026-08-30T01:00:00.000Z",
    ...overrides,
  };
}

function fixture() {
  const database = new Database(":memory:");
  databases.push(database);
  database.run(`
    CREATE TABLE campaign_waves(
      wave_id TEXT PRIMARY KEY, project_id TEXT NOT NULL, label TEXT NOT NULL, phase TEXT NOT NULL,
      lane_ids_json TEXT NOT NULL, evidence_digest TEXT NOT NULL, bundle_path TEXT NOT NULL,
      synthesis_turn_id TEXT NOT NULL, created_at TEXT NOT NULL, updated_at TEXT NOT NULL
    );
    CREATE TABLE campaign_wave_lanes(
      wave_id TEXT NOT NULL, lane_id TEXT NOT NULL, accounting_state TEXT NOT NULL, disposition TEXT NOT NULL,
      reason TEXT NOT NULL, snapshot_json TEXT NOT NULL, updated_at TEXT NOT NULL, PRIMARY KEY(wave_id, lane_id)
    );
    CREATE TABLE campaign_actions(action_id TEXT, project_id TEXT, action_type TEXT, target_id TEXT, status TEXT, created_at TEXT);
    CREATE TABLE campaign_research_runs(run_id TEXT, project_id TEXT, wave_id TEXT, task_id TEXT, status TEXT, lane_id TEXT, job_id TEXT, created_at TEXT, updated_at TEXT);
    CREATE TABLE campaign_wave_schedules(schedule_id TEXT, project_id TEXT, wave_id TEXT, schedule_digest TEXT, status TEXT, created_at TEXT, updated_at TEXT);
    CREATE TABLE campaign_custody_leases(lease_id TEXT, item_id TEXT, project_id TEXT, status TEXT, lease_digest TEXT, created_at TEXT, updated_at TEXT);
    CREATE TABLE campaign_events(event_id TEXT, project_id TEXT, aggregate_type TEXT, aggregate_id TEXT, event_type TEXT, payload_json TEXT, created_at TEXT);
    CREATE TABLE campaign_recovery_reports(
      report_id TEXT PRIMARY KEY, project_id TEXT NOT NULL, wave_id TEXT NOT NULL, report_digest TEXT NOT NULL,
      status TEXT NOT NULL, report_json TEXT NOT NULL, prepared_by TEXT NOT NULL, decision TEXT NOT NULL DEFAULT '',
      note TEXT NOT NULL DEFAULT '', applied_by TEXT NOT NULL DEFAULT '', created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL, applied_at TEXT NOT NULL DEFAULT ''
    );
  `);
  database.query(`
    INSERT INTO campaign_waves VALUES ('wave-1', 'demo', 'Historical wave', 'DECISION_REQUIRED', '["demo:windows:stale-member"]', 'sha256:evidence', '', '', $now, $now)
  `).run({ $now: "2026-08-29T00:00:00.000Z" });
  database.query(`
    INSERT INTO campaign_wave_lanes VALUES ('wave-1', 'demo:windows:stale-member', 'RUNNING', '', '', '{}', '2026-08-29T00:00:00.000Z')
  `).run();
  const project = { project_id: "demo", current_phase: "BLOCKED", version: 5, updated_at: "2026-08-29T00:00:00.000Z" };
  let observer: ObserverSnapshot = {
    generatedAt: "2026-08-30T01:00:00.000Z", version: 1, lanes: [observed()],
    counts: { working: 0, idle: 0, attention: 1, complete: 0, total: 1 }, sources: [],
  };
  let tick = 0;
  const waves = new WaveRepository(database);
  const controlState = () => {
    const wave = waves.latest("demo");
    const required = wave?.phase !== project.current_phase;
    return {
      workflow: { phase: project.current_phase, authority: "legacy-or-unrecorded", cause: "legacy-or-unrecorded" },
      recovery: {
        required, status: required ? "HUMAN_RECONCILIATION_REQUIRED" : "ALIGNED",
        workflowPhase: project.current_phase, wavePhase: wave?.phase || "", activeExecution: 0,
        authority: required ? "human" : "none", automaticMutation: false,
      },
    };
  };
  const service = new CampaignRecoveryService(database, waves, {
    project: () => project,
    controlState,
    observer: () => observer,
    transitionWorkflow: (_projectId, phase) => { project.current_phase = phase; project.version += 1; },
    touchProject: () => { project.version += 1; },
    recordEvent: (projectId, aggregateType, aggregateId, eventType, payload) => {
      database.query("INSERT INTO campaign_events VALUES ($id, $project, $aggregateType, $aggregateId, $type, $payload, $now)").run({
        $id: `event-${++tick}`, $project: projectId, $aggregateType: aggregateType, $aggregateId: aggregateId,
        $type: eventType, $payload: JSON.stringify(payload), $now: `2026-08-30T01:00:0${tick}.000Z`,
      });
    },
    digest: (value) => new Bun.CryptoHasher("sha256").update(JSON.stringify(value)).digest("hex"),
    now: () => `2026-08-30T01:00:0${tick}.000Z`,
  });
  return { database, waves, project, service, controlState, setObserver: (value: ObserverSnapshot) => { observer = value; } };
}

test("recovery prepare freezes the full idle boundary without changing workflow state", () => {
  const item = fixture();
  const report = item.service.prepare("demo", "operator") as any;

  expect(report).toMatchObject({ status: "prepared", waveId: "wave-1", actor: "operator" });
  expect(report.reportDigest).toStartWith("sha256:");
  expect(report.snapshot).toMatchObject({
    schema: "campaign-recovery-report/v1",
    project: { phase: "BLOCKED", version: 5 },
    wave: { phase: "DECISION_REQUIRED", accounting: { complete: false, running: 1 } },
    controlledExecution: { actions: [], researchRuns: [], schedules: [], custodyLeases: [] },
    projectionRepair: { status: "READY_FOR_REVIEW", items: [{ proposedAccountingState: "READY", mechanicallyRepairable: true }] },
    invariants: { humanConfirmationRequired: true, workerResultInference: false, dispatch: false, claimPromotion: false },
  });
  expect(item.project).toMatchObject({ current_phase: "BLOCKED", version: 5 });
});

test("recovery apply requires the exact fresh digest and explicit confirmation", () => {
  const item = fixture();
  const report = item.service.prepare("demo", "operator") as any;

  expect(() => item.service.apply("demo", {
    reportId: report.id, reportDigest: report.reportDigest, decision: "ALIGN_WAVE_TO_WORKFLOW",
  }, "operator")).toThrow("Explicit campaign recovery confirmation");

  const result = item.service.apply("demo", {
    reportId: report.id, reportDigest: report.reportDigest, decision: "ALIGN_WAVE_TO_WORKFLOW",
    confirmation: "APPLY CAMPAIGN RECOVERY", note: "Close only the obsolete historical boundary.",
  }, "operator") as any;

  expect(item.waves.latest("demo")?.phase).toBe("BLOCKED");
  expect(item.project.version).toBe(6);
  expect(result).toMatchObject({ status: "applied", decision: "ALIGN_WAVE_TO_WORKFLOW", controlState: { recovery: { status: "ALIGNED" } } });
});

test("a changed observer boundary invalidates the prepared report", () => {
  const item = fixture();
  const report = item.service.prepare("demo", "operator") as any;
  item.setObserver({
    generatedAt: "2026-08-30T01:01:00.000Z", version: 2,
    lanes: [observed({ daemon: "working", landing: "—", completedAt: "" })],
    counts: { working: 1, idle: 0, attention: 0, complete: 0, total: 1 }, sources: [],
  });

  expect(() => item.service.apply("demo", {
    reportId: report.id, reportDigest: report.reportDigest, decision: "APPLY_VALIDATED_PROJECTION_REPAIR",
    confirmation: "APPLY CAMPAIGN RECOVERY",
  }, "operator")).toThrow("prepare and review a fresh report");
  expect(item.waves.members("wave-1")[0].accounting_state).toBe("RUNNING");
});
