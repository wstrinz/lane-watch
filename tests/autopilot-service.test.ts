import { describe, expect, test } from "bun:test";
import { compactLoopSteps, nextCustodyAutopilotStep } from "../src/autopilot-service";

describe("autopilot durable step replay", () => {
  test("collapses replayed references to one completed action before scheduling a new attempt", () => {
    const steps = compactLoopSteps([
      { index: 1, key: "prepare", actionId: "action-1", status: "completed", attemptCount: 1 },
      { index: 2, key: "prepare", actionId: "action-1", status: "completed", attemptCount: 1 },
      { index: 3, key: "dispatch", actionId: "action-2", status: "failed", attemptCount: 1 },
    ] as any);
    expect(steps.map((step) => step.actionId)).toEqual(["action-1", "action-2"]);
    expect(steps.map((step) => step.index)).toEqual([1, 2]);
  });
});

describe("autopilot custody policy", () => {
  const blocker = (overrides: Record<string, any> = {}) => ({
    id: "custody-1", task: "Reconcile named pools", blocksResearch: true, status: "proposed",
    createdAt: "2026-09-03T00:00:00Z", receipt: {}, activeLease: null, ...overrides,
  });

  test("walks exact leases through enable, dispatch, and mechanically verified landing", () => {
    expect(nextCustodyAutopilotStep({ items: [blocker()] })).toMatchObject({ kind: "action", type: "custody.item.promote" });
    expect(nextCustodyAutopilotStep({ items: [blocker({ status: "ready" })] })).toMatchObject({ kind: "action", type: "custody.lease.prepare" });
    expect(nextCustodyAutopilotStep({ items: [blocker({ status: "ready", activeLease: { id: "lease-1", status: "prepared", leaseDigest: "sha256:lease" } })] })).toMatchObject({ kind: "action", type: "custody.lease.confirm", args: { leaseDigest: "sha256:lease" } });
    expect(nextCustodyAutopilotStep({ items: [blocker({ status: "verifying", activeLease: { id: "lease-1", status: "awaiting_review", receiptDigest: "sha256:receipt", verification: { landable: true } } })] })).toMatchObject({ kind: "action", type: "custody.receipt.land", args: { receiptDigest: "sha256:receipt" } });
  });

  test("retries zero-effect controller stops but halts on substantive mathematical blockers", () => {
    expect(nextCustodyAutopilotStep({ items: [blocker({ status: "blocked", receipt: { summary: "Lease-byte provenance mismatch", effects: { changedPaths: [] } } })] })).toMatchObject({ kind: "action", type: "custody.item.promote" });
    expect(nextCustodyAutopilotStep({ items: [blocker({ status: "failed", receipt: { summary: "Custody executor turn was interrupted", effects: { changedPaths: [] } } })] })).toMatchObject({ kind: "action", type: "custody.item.promote" });
    expect(nextCustodyAutopilotStep({ items: [blocker({ status: "failed", receipt: { summary: "The checkout source tree differs", effects: { changedPaths: [] }, checks: [
      { id: "producer_manifest_blobs", status: "PASS" }, { id: "immutable_successor_binding", status: "PASS" }, { id: "frozen_replay_tree", status: "FAIL" },
    ] } })] })).toMatchObject({ kind: "action", type: "custody.item.promote" });
    expect(nextCustodyAutopilotStep({ items: [blocker({ status: "blocked", receipt: { summary: "Candidate count changed", effects: { changedPaths: [] } } })] })).toMatchObject({ kind: "attention" });
  });

  test("bounds automatic retries for repeated runtime interruptions", () => {
    const item = blocker({ status: "blocked", receipt: { summary: "Custody executor turn was interrupted", effects: { changedPaths: [] } } });
    const lease = (id: string) => ({ id, itemId: item.id, status: "blocked", receipt: { summary: "Runtime interruption", effects: { changedPaths: [] } } });
    expect(nextCustodyAutopilotStep({ items: [item], protocol: { leases: [lease("one"), lease("two")] } })).toMatchObject({ kind: "action", type: "custody.item.promote" });
    expect(nextCustodyAutopilotStep({ items: [item], protocol: { leases: [lease("one"), lease("two"), lease("three")] } })).toMatchObject({ kind: "action" });
    expect(nextCustodyAutopilotStep({ items: [item], protocol: { leases: [lease("one"), lease("two"), lease("three"), lease("four")] } })).toMatchObject({ kind: "attention" });
  });

  test("reconciles a stale App Server turn instead of leaving phantom custody running", () => {
    expect(nextCustodyAutopilotStep({ items: [blocker({
      status: "assigned",
      activeLease: { id: "lease-stale", status: "running", updatedAt: new Date(Date.now() - 120_000).toISOString() },
    })] })).toMatchObject({ kind: "action", type: "custody.lease.reconcile", targetId: "lease-stale" });
  });

  test("finishes the current custody slot before confirming an older queued lease", () => {
    const prepared = blocker({
      id: "queued",
      createdAt: "2026-09-01T00:00:00Z",
      status: "ready",
      activeLease: { id: "lease-queued", status: "prepared", leaseDigest: "sha256:queued" },
    });
    const running = blocker({
      id: "active",
      createdAt: "2026-09-02T00:00:00Z",
      status: "assigned",
      activeLease: { id: "lease-active", status: "running", updatedAt: new Date().toISOString() },
    });
    expect(nextCustodyAutopilotStep({ items: [prepared, running] })).toMatchObject({ kind: "wait" });
    (running.activeLease as any).updatedAt = new Date(Date.now() - 120_000).toISOString();
    expect(nextCustodyAutopilotStep({ items: [prepared, running] })).toMatchObject({
      kind: "action", type: "custody.lease.reconcile", targetId: "lease-active",
    });
  });

  test("skips downstream contracts until their exact predecessor receipt settles", () => {
    const downstream = blocker({ id: "downstream", dependenciesSatisfied: false, missingDependencies: [{ task: "Bind predecessor" }] });
    const predecessor = blocker({ id: "predecessor", createdAt: "2026-09-04T00:00:00Z", dependenciesSatisfied: true });
    expect(nextCustodyAutopilotStep({ items: [downstream, predecessor] })).toMatchObject({
      kind: "action", type: "custody.item.promote", targetId: "predecessor",
    });
    expect(nextCustodyAutopilotStep({ items: [downstream] })).toMatchObject({ kind: "attention", message: expect.stringContaining("Bind predecessor") });
  });

  test("continues an independent dependency root while preserving a substantive stopped branch", () => {
    const stopped = blocker({
      id: "stopped", status: "failed", dependenciesSatisfied: true,
      createdAt: "2026-09-01T00:00:00Z",
      receipt: { summary: "Custody executor approached its fixed token ceiling", effects: { changedPaths: [] } },
    });
    const independent = blocker({ id: "independent", dependenciesSatisfied: true, createdAt: "2026-09-02T00:00:00Z" });
    expect(nextCustodyAutopilotStep({ items: [stopped, independent] })).toMatchObject({
      kind: "action", type: "custody.item.promote", targetId: "independent",
    });
    expect(stopped.status).toBe("failed");
  });
});
