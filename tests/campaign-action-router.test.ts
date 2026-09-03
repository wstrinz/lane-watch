import { describe, expect, test } from "bun:test";
import type { ActionQueueRow } from "../src/action-queue-service";
import {
  CAMPAIGN_ACTION_TYPES,
  CampaignActionRouter,
  type CampaignActionHandlerRegistry,
} from "../src/campaign-action-router";

function action(type: string): ActionQueueRow {
  return {
    action_id: "action-1", project_id: "demo", action_type: type, target_id: "target-1",
    idempotency_key: "key-1", expected_version: 7, status: "running", args_json: "{}",
    result_json: "{}", error: "", created_by: "operator", created_at: "now",
    started_at: "now", completed_at: "",
  };
}

function handlers(calls: Array<{ type: string; args: Record<string, any> }>): CampaignActionHandlerRegistry {
  return Object.fromEntries(CAMPAIGN_ACTION_TYPES.map((type) => [
    type,
    (row: ActionQueueRow, args: Record<string, any>) => {
      calls.push({ type: row.action_type, args });
      return { routed: row.action_type, projectId: row.project_id, targetId: row.target_id, actor: row.created_by };
    },
  ])) as unknown as CampaignActionHandlerRegistry;
}

describe("CampaignActionRouter", () => {
  test("derives one unique exact catalog and routes the complete action envelope", async () => {
    expect(CAMPAIGN_ACTION_TYPES).toHaveLength(50);
    expect(new Set(CAMPAIGN_ACTION_TYPES).size).toBe(CAMPAIGN_ACTION_TYPES.length);
    const calls: Array<{ type: string; args: Record<string, any> }> = [];
    const router = new CampaignActionRouter(handlers(calls));

    expect(router.registeredTypes()).toBe(CAMPAIGN_ACTION_TYPES);
    expect(await router.execute(action("wave.adopt"), { label: "Bounded wave" })).toEqual({
      routed: "wave.adopt", projectId: "demo", targetId: "target-1", actor: "operator",
    });
    expect(calls).toEqual([{ type: "wave.adopt", args: { label: "Bounded wave" } }]);
  });

  test("rejects unsupported actions before any handler is called", () => {
    const calls: Array<{ type: string; args: Record<string, any> }> = [];
    const router = new CampaignActionRouter(handlers(calls));

    expect(() => router.validate("wave.secret-dispatch")).toThrow("Unsupported campaign action: wave.secret-dispatch");
    expect(() => router.execute(action("wave.secret-dispatch"), {})).toThrow("Unsupported campaign action: wave.secret-dispatch");
    expect(calls).toEqual([]);
  });

  test("refuses runtime registries with missing or extra action handlers", () => {
    const complete = handlers([]) as Record<string, any>;
    const missing = { ...complete };
    delete missing["campaign.recovery.apply"];
    expect(() => new CampaignActionRouter(missing as CampaignActionHandlerRegistry))
      .toThrow("missing=[campaign.recovery.apply]");

    const extra = { ...complete, "campaign.unreviewed-mutation": () => ({}) };
    expect(() => new CampaignActionRouter(extra as unknown as CampaignActionHandlerRegistry))
      .toThrow("extra=[campaign.unreviewed-mutation]");
  });
});
