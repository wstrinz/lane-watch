import { describe, expect, test } from "bun:test";
import { custodyContractComplete, deriveCustodyServiceState, type CustodyWorkItem } from "../src/custody";

function item(overrides: Partial<CustodyWorkItem> = {}): CustodyWorkItem {
  return {
    id: crypto.randomUUID(),
    projectId: "demo",
    sourceType: "strategy-review",
    sourceId: "review-1",
    task: "Archive a bounded evidence receipt.",
    reason: "Keep mechanical custody out of the research portfolio.",
    urgency: "SOON",
    blocksResearch: false,
    strategicTrack: "decision",
    capability: "archive",
    repairGeneration: 0,
    effortClass: "small",
    acceptance: {
      acceptanceCriteria: ["Receipt hash is indexed."],
      allowedPaths: ["artifacts/**/evidence-receipt.json"],
      receiptType: "campaign-custody-receipt/v1",
      stopCondition: "Stop on a hash mismatch.",
    },
    status: "proposed",
    assignedActor: "",
    receipt: {},
    createdBy: "operator",
    createdAt: "2026-08-27T00:00:00.000Z",
    updatedAt: "2026-08-27T00:00:00.000Z",
    completedAt: "",
    ...overrides,
  };
}

describe("custody contracts", () => {
  test("require bounded acceptance and receipts before becoming ready", () => {
    expect(custodyContractComplete(item().acceptance)).toBe(true);
    expect(custodyContractComplete({ acceptanceCriteria: [], allowedPaths: [], receiptType: "", stopCondition: "" })).toBe(false);
  });

  test("prioritizes research blockers while leaving the executor disconnected", () => {
    const service = deriveCustodyServiceState([
      item({ id: "routine", urgency: "SOON" }),
      item({ id: "blocker", blocksResearch: true, urgency: "NOW", capability: "verification" }),
      item({ id: "parked", status: "parked", urgency: "PARK" }),
    ]);
    expect(service.items.map((candidate: any) => candidate.id)).toEqual(["blocker", "routine", "parked"]);
    expect(service).toMatchObject({
      mode: "shadow",
      executorConnected: false,
      executorEligible: 0,
      counts: { total: 3, proposed: 2, parked: 1, blocking: 1 },
      policy: { readyDoesNotDispatch: true, promotionAuthority: "human" },
    });
  });

  test("flags repair descendants beyond the charter limit", () => {
    const service = deriveCustodyServiceState([item({ id: "generation-two", repairGeneration: 2 })], 1);
    expect(service.items[0]).toMatchObject({ generationAllowed: false, eligibleToReady: false });
    expect(service.violations).toEqual([expect.objectContaining({ itemId: "generation-two", kind: "repair-generation-limit" })]);
  });

  test("marks a stopped bounded contract as retryable without granting claim authority", () => {
    const service = deriveCustodyServiceState([item({ status: "blocked", blocksResearch: true })], 1, true);
    expect(service.items[0]).toMatchObject({ eligibleToRetry: true, executorEligible: false });
    expect(service.policy).toMatchObject({
      leaseConfirmationAuthority: "human-or-active-loop",
      receiptLandingAuthority: "human-or-active-loop-when-landable",
      claimPromotionAuthority: "outside-custody-service",
    });
  });

  test("keeps failed research dependencies visible until explicitly repaired or parked", () => {
    const service = deriveCustodyServiceState([item({ status: "failed", blocksResearch: true })], 1, true);
    expect(service.counts).toMatchObject({ open: 1, blocking: 1, failed: 1 });
    expect(service.items[0]).toMatchObject({ eligibleToRetry: true, executorEligible: false });
  });
});
