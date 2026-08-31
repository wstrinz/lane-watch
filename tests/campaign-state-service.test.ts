import { afterEach, describe, expect, test } from "bun:test";
import { Database } from "bun:sqlite";
import { CampaignStateService } from "../src/campaign-state-service";

function fixture(phase = "PLANNING") {
  const database = new Database(":memory:");
  database.run(`
    CREATE TABLE campaign_projects(
      project_id TEXT PRIMARY KEY, role TEXT NOT NULL, root_path TEXT NOT NULL,
      automation_mode TEXT NOT NULL, dispatch_profile TEXT NOT NULL,
      current_phase TEXT NOT NULL, version INTEGER NOT NULL, updated_at TEXT NOT NULL
    );
    CREATE TABLE campaign_project_activity(
      project_id TEXT PRIMARY KEY, observed_phase TEXT NOT NULL, active_count INTEGER NOT NULL,
      running_count INTEGER NOT NULL, terminal_count INTEGER NOT NULL,
      summary_json TEXT NOT NULL, observed_at TEXT NOT NULL
    );
    CREATE TABLE campaign_events(
      event_id TEXT PRIMARY KEY, project_id TEXT NOT NULL, aggregate_type TEXT NOT NULL,
      aggregate_id TEXT NOT NULL, event_type TEXT NOT NULL, payload_json TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
  `);
  database.query(`
    INSERT INTO campaign_projects(project_id, role, root_path, automation_mode, dispatch_profile, current_phase, version, updated_at)
    VALUES ('demo', 'primary', 'C:/demo', 'observe', 'sonnet-worker', $phase, 0, '2026-08-29T00:00:00.000Z')
  `).run({ $phase: phase });
  let activeExecution = 0;
  const state = new CampaignStateService(database, {
    activeExecutionCount: () => activeExecution,
    now: () => "2026-08-29T00:01:00.000Z",
  });
  return { database, state, setActiveExecution: (count: number) => { activeExecution = count; } };
}

const databases: Database[] = [];

afterEach(() => {
  for (const database of databases.splice(0)) database.close();
});

describe("CampaignStateService", () => {
  test("stores observed activity without mutating workflow phase or project version", () => {
    const item = fixture("BLOCKED");
    databases.push(item.database);

    item.state.observeActivity("demo", {
      phase: "RUNNING", active: 3, running: 2, terminal: 1,
      summary: { waveAccounting: { total: 3 } },
    });

    expect(item.state.project("demo")).toMatchObject({ current_phase: "BLOCKED", version: 0 });
    expect(item.state.snapshot("demo", "BLOCKED")).toMatchObject({
      workflow: { phase: "BLOCKED" },
      observation: {
        phase: "RUNNING", active: 3, running: 2, terminal: 1,
        workflowMutation: false,
        summary: { waveAccounting: { total: 3 } },
      },
    });
  });

  test("records authority and cause for an allowed workflow transition", () => {
    const item = fixture();
    databases.push(item.database);

    item.state.change("demo", { phase: "RUNNING" }, {
      authority: "domain-command", cause: "wave-dispatch", actor: "operator-a",
    });

    expect(item.state.project("demo")).toMatchObject({ current_phase: "RUNNING", version: 1 });
    expect(item.state.snapshot("demo", "RUNNING")).toMatchObject({
      workflow: {
        phase: "RUNNING", authority: "domain-command", cause: "wave-dispatch", actor: "operator-a",
      },
      recovery: { required: false, status: "ALIGNED" },
    });
    const event = item.database.query("SELECT event_type, payload_json, created_at FROM campaign_events").get() as Record<string, string>;
    expect(event.event_type).toBe("project.phase.changed");
    expect(JSON.parse(event.payload_json)).toEqual({
      from: "PLANNING", to: "RUNNING", authority: "domain-command", cause: "wave-dispatch", actor: "operator-a",
    });
    expect(event.created_at).toBe(item.state.project("demo").updated_at);
  });

  test("rolls back the authoritative row when its provenance event cannot be inserted", () => {
    const item = fixture();
    databases.push(item.database);
    item.database.run(`CREATE TRIGGER reject_phase_provenance BEFORE INSERT ON campaign_events
      WHEN NEW.event_type = 'project.phase.changed' BEGIN SELECT RAISE(ABORT, 'event blocked'); END`);

    expect(() => item.state.change("demo", { phase: "RUNNING" }, {
      authority: "domain-command", cause: "atomic-rollback",
    })).toThrow("event blocked");

    expect(item.state.project("demo")).toMatchObject({ current_phase: "PLANNING", version: 0 });
    expect(item.database.query("SELECT COUNT(*) AS count FROM campaign_events").get()).toEqual({ count: 0 });
  });

  test("participates in a surrounding transaction so state and provenance roll back together", () => {
    const item = fixture();
    databases.push(item.database);
    const outer = item.database.transaction(() => {
      item.state.change("demo", { phase: "RUNNING" }, {
        authority: "system", cause: "nested-transaction",
      });
      throw new Error("outer rollback");
    });

    expect(outer).toThrow("outer rollback");
    expect(item.state.project("demo")).toMatchObject({ current_phase: "PLANNING", version: 0 });
    expect(item.database.query("SELECT COUNT(*) AS count FROM campaign_events").get()).toEqual({ count: 0 });
  });

  test("rolls back an observation projection when its non-authoritative change event fails", () => {
    const item = fixture("BLOCKED");
    databases.push(item.database);
    item.state.observeActivity("demo", { phase: "RUNNING", active: 1, running: 1, terminal: 0 });
    item.database.run(`CREATE TRIGGER reject_activity_provenance BEFORE INSERT ON campaign_events
      WHEN NEW.event_type = 'project.activity.changed' BEGIN SELECT RAISE(ABORT, 'activity event blocked'); END`);

    expect(() => item.state.observeActivity("demo", {
      phase: "BLOCKED", active: 0, running: 0, terminal: 0,
    })).toThrow("activity event blocked");

    expect(item.state.snapshot("demo", "BLOCKED")).toMatchObject({
      workflow: { phase: "BLOCKED" },
      observation: { phase: "RUNNING", active: 1, running: 1, terminal: 0, workflowMutation: false },
    });
  });

  test("rejects an undeclared workflow jump without changing durable state", () => {
    const item = fixture();
    databases.push(item.database);

    expect(() => item.state.change("demo", { phase: "DECISION_REQUIRED" }, {
      authority: "system", cause: "test-invalid-jump",
    })).toThrow("Illegal campaign workflow transition: PLANNING -> DECISION_REQUIRED");
    expect(item.state.project("demo")).toMatchObject({ current_phase: "PLANNING", version: 0 });
  });

  test("requires human reconciliation for an idle durable wave mismatch", () => {
    const item = fixture("BLOCKED");
    databases.push(item.database);

    expect(item.state.snapshot("demo", "DECISION_REQUIRED")).toMatchObject({
      recovery: {
        required: true, status: "HUMAN_RECONCILIATION_REQUIRED",
        workflowPhase: "BLOCKED", wavePhase: "DECISION_REQUIRED",
        activeExecution: 0, authority: "human", automaticMutation: false,
      },
    });

    item.setActiveExecution(1);
    expect(item.state.snapshot("demo", "DECISION_REQUIRED")).toMatchObject({
      recovery: { required: false, status: "DIVERGENCE_EXPLAINED_BY_ACTIVE_EXECUTION", activeExecution: 1 },
    });
  });
});
