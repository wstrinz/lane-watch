import { expect, test } from "bun:test";
import { Database } from "bun:sqlite";
import { StrategyCommandService } from "../src/strategy-command-service";

function fixture(turns: any[]) {
  const db = new Database(":memory:");
  db.exec("CREATE TABLE campaign_strategy_reviews(review_id TEXT, project_id TEXT, status TEXT, thread_id TEXT, turn_id TEXT, response_json TEXT, error TEXT, updated_at TEXT, completed_at TEXT)");
  db.query("INSERT INTO campaign_strategy_reviews VALUES ('review','demo','drafting','thread','exact','{}','','','')").run();
  let touches = 0;
  const service = new StrategyCommandService(db, {} as any, { resumeThread: async () => ({}), readThreadDetail: async () => ({ turns }) } as any, "", { touchProject: () => touches++, recordEvent: () => {}, now: () => "2026-09-04T22:00:00Z" } as any);
  return { db, service, touches: () => touches };
}

test("interrupted strategy turn releases the stale review without accepting commentary", async () => {
  const f = fixture([{ id: "exact", status: "interrupted", items: [{ type: "agentMessage", phase: "commentary", text: JSON.stringify({ summary: "partial", proposal: {}, recommendation: "CONTINUE_CURRENT" }) }] }]);
  expect(await f.service.reconcileReview("demo", "review", "operator")).toMatchObject({ status: "failed", changed: true });
  expect(f.touches()).toBe(1);
  expect(f.db.query("SELECT response_json FROM campaign_strategy_reviews").get()).toEqual({ response_json: "{}" });
  f.db.close();
});

test("another turn cannot settle the exact review and running turns stay running", async () => {
  const missing = fixture([{ id: "other", status: "completed", items: [] }]);
  await expect(missing.service.reconcileReview("demo", "review", "operator")).rejects.toThrow("exact strategy review turn");
  expect(missing.touches()).toBe(0);
  missing.db.close();
  const active = fixture([{ id: "exact", status: "inProgress", items: [] }]);
  expect(await active.service.reconcileReview("demo", "review", "operator")).toMatchObject({ status: "drafting", changed: false });
  active.db.close();
});
