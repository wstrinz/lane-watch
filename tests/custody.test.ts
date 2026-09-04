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

  test("admits one exact operator-owned transition beyond the automatic generation limit", () => {
    const approved = item({
      id: "operator-approved",
      status: "ready",
      repairGeneration: 1,
      receipt: { operatorAuthorization: {
        schema: "campaign-custody-operator-authorization/v1", scope: "single-ready-transition",
        itemId: "operator-approved", repairGeneration: 1,
      } },
    });
    const service = deriveCustodyServiceState([approved], 0, true);
    expect(service.items[0]).toMatchObject({ automaticGenerationAllowed: false, operatorGenerationApproval: true, generationAllowed: true, executorEligible: true });
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

  test("orders reshape siblings by predecessor receipt instead of exposing every ready button", () => {
    const first = item({ id: "first", sourceType: "custody-reshape", sourceId: "parent", task: "Bind the manifest", blocksResearch: true });
    const second = item({ id: "second", sourceType: "custody-reshape", sourceId: "parent", task: "Verify the inventory", blocksResearch: true, createdAt: "2026-08-27T00:01:00.000Z" });
    let service = deriveCustodyServiceState([first, second], 1, true);
    expect(service.items.find((candidate: any) => candidate.id === "first")).toMatchObject({ dependenciesSatisfied: true, eligibleToReady: true });
    expect(service.items.find((candidate: any) => candidate.id === "second")).toMatchObject({ dependenciesSatisfied: false, eligibleToReady: false, missingDependencies: [expect.objectContaining({ id: "first" })] });

    service = deriveCustodyServiceState([{ ...first, status: "complete" }, second], 1, true);
    expect(service.items.find((candidate: any) => candidate.id === "second")).toMatchObject({ dependenciesSatisfied: true, eligibleToReady: true });
  });

  test("resolves named predecessor contracts to immutable item dependencies", () => {
    const first = item({ id: "source", task: "Freeze exact source map", status: "complete" });
    const second = item({ id: "consumer", task: "Consume source map", acceptance: { ...item().acceptance, dependsOnTasks: ["Freeze exact source map"] } });
    const service = deriveCustodyServiceState([first, second]);
    expect(service.items.find((candidate: any) => candidate.id === "consumer")).toMatchObject({ dependencyItemIds: ["source"], dependenciesSatisfied: true });
  });

  test("repairs legacy nested reshape ordering and follows superseded predecessors to their terminal child", () => {
    const rows = [
      item({ id: "replay-parent", sourceType: "custody-reshape", sourceId: "root", task: "Replay frozen asymmetric deduplication and reconcile resource scope", status: "complete", receipt: { status: "SUPERSEDED" } }),
      item({ id: "manifest-parent", sourceType: "custody-reshape", sourceId: "root", task: "Verify frozen asymmetric manifest, provenance, and control count", status: "complete", receipt: { status: "SUPERSEDED" } }),
      item({ id: "inventory", sourceType: "custody-reshape", sourceId: "manifest-parent", task: "Verify the frozen asymmetric type inventory and control count", blocksResearch: true }),
      item({ id: "manifest", sourceType: "custody-reshape", sourceId: "manifest-parent", task: "Bind the frozen asymmetric manifest and provenance", blocksResearch: true }),
      item({ id: "measure", sourceType: "custody-reshape", sourceId: "replay-parent", task: "Reconcile frozen asymmetric replay resource measurements", blocksResearch: true }),
      item({ id: "replay", sourceType: "custody-reshape", sourceId: "replay-parent", task: "Replay the frozen role-preserving asymmetric deduplication core", blocksResearch: true }),
    ];
    const service = deriveCustodyServiceState(rows, 1, true);
    expect(service.items.find((candidate: any) => candidate.id === "manifest")).toMatchObject({ dependenciesSatisfied: true });
    expect(service.items.find((candidate: any) => candidate.id === "inventory")).toMatchObject({ dependencyItemIds: ["manifest"], dependenciesSatisfied: false });
    expect(service.items.find((candidate: any) => candidate.id === "replay")).toMatchObject({ dependencyItemIds: ["inventory"], dependenciesSatisfied: false });
    expect(service.items.find((candidate: any) => candidate.id === "measure")).toMatchObject({ dependencyItemIds: expect.arrayContaining(["replay", "inventory"]), dependenciesSatisfied: false });
  });
});
