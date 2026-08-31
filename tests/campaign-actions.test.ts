import { describe, expect, test } from "bun:test";
import { campaignActionRuntime, campaignProjectFrom, isStaleVersionFailure, settleCampaignAction, type CampaignAction, type CampaignActionRuntime, type CampaignProject } from "../src/ui/campaign-actions";
import type { CampaignControlSnapshot } from "../src/ui/campaign-state";

function control(version: number, actions: CampaignAction[] = []): CampaignControlSnapshot {
  return { projects: [{ id: "demo", version, phase: "PLANNING", actions } as CampaignProject] };
}

function response(action: CampaignAction, status = 200): Response {
  return new Response(JSON.stringify(action), { status, headers: { "Content-Type": "application/json" } });
}

function runtimePending(): CampaignActionRuntime["pending"] {
  let pending: CampaignActionRuntime["pending"] = {};
  const unsubscribe = campaignActionRuntime.subscribe((runtime) => { pending = runtime.pending; });
  unsubscribe();
  return pending;
}

describe("central campaign action client", () => {
  test("refreshes, retries one stale version, and settles the replacement action", async () => {
    const stale = { id: "action-stale", type: "loop.start", status: "failed", error: "Stale project version: expected 1, current 2" };
    const completed = { id: "action-current", type: "loop.start", status: "completed", result: { phase: "PLANNING" } };
    const snapshots = [control(1), control(2, [stale]), control(2, [stale]), control(3, [completed]), control(3, [completed])];
    let refreshIndex = 0;
    const bodies: Array<Record<string, any>> = [];
    const settlement = await settleCampaignAction(
      { projectId: "demo", type: "loop.start", scope: "test", pollIntervalMs: 25 },
      {
        refresh: async () => snapshots[Math.min(refreshIndex++, snapshots.length - 1)],
        fetcher: async (_input, init) => {
          bodies.push(JSON.parse(String(init?.body || "{}")));
          return bodies.length === 1 ? response({ id: stale.id, type: stale.type, status: "queued" }) : response({ id: completed.id, type: completed.type, status: "queued" });
        },
        wait: async () => undefined,
        nonce: () => "fixed-nonce",
      },
    );
    expect(settlement).toMatchObject({ action: completed, project: { version: 3 }, staleRetries: 1 });
    expect(bodies.map((body) => body.expectedVersion)).toEqual([1, 2]);
    expect(bodies[0].idempotencyKey).not.toBe(bodies[1].idempotencyKey);
    expect(runtimePending()).toEqual({});
  });

  test("does not retry a substantive failed action", async () => {
    const failed = { id: "action-failed", type: "loop.start", status: "failed", error: "The checked boundary is still blocked" };
    let fetchCount = 0;
    let refreshCount = 0;
    await expect(settleCampaignAction(
      { projectId: "demo", type: "loop.start", pollIntervalMs: 25 },
      {
        refresh: async () => refreshCount++ ? control(1, [failed]) : control(1),
        fetcher: async () => { fetchCount += 1; return response({ id: failed.id, type: failed.type, status: "queued" }); },
        wait: async () => undefined,
        nonce: () => "failed-nonce",
      },
    )).rejects.toThrow("The checked boundary is still blocked");
    expect(fetchCount).toBe(1);
    expect(runtimePending()).toEqual({});
  });

  test("serializes mutations for one project across independent components", async () => {
    let releaseFirst!: () => void;
    const firstGate = new Promise<void>((resolve) => { releaseFirst = resolve; });
    let firstFetchStarted = false;
    let secondFetchStarted = false;
    const settled = (id: string) => control(2, [{ id, type: "test.action", status: "completed" }]);
    let firstRefresh = 0;
    let secondRefresh = 0;
    const first = settleCampaignAction({ projectId: "demo", type: "test.action", scope: "first", pollIntervalMs: 25 }, {
      refresh: async () => firstRefresh++ ? settled("first") : control(1),
      fetcher: async () => { firstFetchStarted = true; await firstGate; return response({ id: "first", type: "test.action", status: "queued" }); },
      wait: async () => undefined,
      nonce: () => "first-nonce",
    });
    await Bun.sleep(0);
    const second = settleCampaignAction({ projectId: "demo", type: "test.action", scope: "second", pollIntervalMs: 25 }, {
      refresh: async () => secondRefresh++ ? settled("second") : control(1),
      fetcher: async () => { secondFetchStarted = true; return response({ id: "second", type: "test.action", status: "queued" }); },
      wait: async () => undefined,
      nonce: () => "second-nonce",
    });
    await Bun.sleep(0);
    expect(firstFetchStarted).toBe(true);
    expect(secondFetchStarted).toBe(false);
    releaseFirst();
    expect((await first).action.id).toBe("first");
    expect((await second).action.id).toBe("second");
    expect(secondFetchStarted).toBe(true);
  });

  test("shares project and stale-failure classification", () => {
    expect(campaignProjectFrom(control(7), "demo")).toMatchObject({ id: "demo", version: 7 });
    expect(campaignProjectFrom(control(7), "missing")).toBeNull();
    expect(isStaleVersionFailure({ id: "a", type: "x", status: "failed", error: "Stale project version: expected 1, current 2" })).toBe(true);
    expect(isStaleVersionFailure({ id: "b", type: "x", status: "failed", error: "Other failure" })).toBe(false);
  });
});
