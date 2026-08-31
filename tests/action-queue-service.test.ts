import { expect, test } from "bun:test";
import { Database } from "bun:sqlite";
import { ActionQueueService, type ActionQueueRow } from "../src/action-queue-service";

function createActions(database: Database): void {
  database.run(`
    CREATE TABLE campaign_actions (
      action_id TEXT PRIMARY KEY,
      project_id TEXT NOT NULL,
      action_type TEXT NOT NULL,
      target_id TEXT NOT NULL,
      idempotency_key TEXT NOT NULL UNIQUE,
      expected_version INTEGER NOT NULL,
      status TEXT NOT NULL,
      args_json TEXT NOT NULL,
      result_json TEXT NOT NULL,
      error TEXT NOT NULL,
      created_by TEXT NOT NULL,
      created_at TEXT NOT NULL,
      started_at TEXT NOT NULL,
      completed_at TEXT NOT NULL
    )
  `);
}

test("restart recovery never replays an ambiguously running action and resumes queued work", async () => {
  const database = new Database(":memory:");
  createActions(database);
  const insert = database.query(`
    INSERT INTO campaign_actions(
      action_id, project_id, action_type, target_id, idempotency_key, expected_version,
      status, args_json, result_json, error, created_by, created_at, started_at, completed_at
    ) VALUES ($id, 'demo', $type, '', $key, 7, $status, '{}', '{}', '', 'operator', $created, $started, '')
  `);
  insert.run({ $id: "ambiguous", $type: "research.schedule.dispatch", $key: "ambiguous-key", $status: "running", $created: "2026-08-30T00:00:00Z", $started: "2026-08-30T00:00:01Z" });
  insert.run({ $id: "not-started", $type: "synthesis.prepare", $key: "queued-key", $status: "queued", $created: "2026-08-30T00:00:02Z", $started: "" });

  const executed: string[] = [];
  const events: Array<{ id: string; type: string; payload: any }> = [];
  const settled: string[] = [];
  const service = new ActionQueueService(database, {
    validateType: () => undefined,
    projectVersion: () => 7,
    execute: async (action) => { executed.push(action.action_id); return { safe: true }; },
    recordEvent: (_project, _aggregate, id, type, payload) => events.push({ id, type, payload }),
    notifyChanged: () => undefined,
    afterSettled: (projectId) => settled.push(projectId),
    now: () => "2026-08-30T00:01:00Z",
  });

  expect(service.recoverInterrupted()).toBe(1);
  expect((database.query("SELECT * FROM campaign_actions WHERE action_id = 'ambiguous'").get() as ActionQueueRow).status).toBe("failed");
  expect((database.query("SELECT * FROM campaign_actions WHERE action_id = 'ambiguous'").get() as ActionQueueRow).error).toContain("was not replayed");
  expect((database.query("SELECT status FROM campaign_actions WHERE action_id = 'not-started'").get() as { status: string }).status).toBe("queued");
  expect(executed).toEqual([]);
  expect(events).toContainEqual(expect.objectContaining({ id: "ambiguous", type: "action.recovery-attention", payload: expect.objectContaining({ automaticReplay: false }) }));

  service.resume();
  for (let attempt = 0; attempt < 100; attempt++) {
    const row = database.query("SELECT status FROM campaign_actions WHERE action_id = 'not-started'").get() as { status: string };
    if (row.status === "completed") break;
    await Bun.sleep(5);
  }
  expect(executed).toEqual(["not-started"]);
  expect((database.query("SELECT status FROM campaign_actions WHERE action_id = 'not-started'").get() as { status: string }).status).toBe("completed");
  expect(settled).toContain("demo");
  database.close();
});
