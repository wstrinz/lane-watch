import { describe, expect, test } from "bun:test";
import { createCustodyLease, simulateCustodyProtocol, verifyCustodyProtocolReceipt } from "../src/custody-protocol";
import { buildCustodyExecutionReceipt, custodyExecutorPrompt, custodyInterruptThreshold, custodyPathAllowed, verifyCustodyExecutionReceipt, type CustodyExecutorReport } from "../src/custody-executor";
import type { CustodyWorkItem } from "../src/custody";

const item: CustodyWorkItem = {
  id: "custody-1",
  projectId: "demo",
  sourceType: "strategy-review",
  sourceId: "review-1",
  task: "Verify and archive one bounded receipt.",
  reason: "Move mechanical provenance work outside research execution.",
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
    stopCondition: "Stop on any hash mismatch.",
  },
  status: "ready",
  assignedActor: "",
  receipt: {},
  createdBy: "operator",
  createdAt: "2026-08-28T00:00:00.000Z",
  updatedAt: "2026-08-28T00:00:00.000Z",
  completedAt: "",
};

function lease() {
  return createCustodyLease({
    leaseId: "lease-1",
    item,
    campaignBoundary: { phase: "DECISION_REQUIRED", version: 42, charterRevision: 2, epochId: "epoch-2" },
    issuedAt: "2026-08-28T01:00:00.000Z",
    expiresAt: "2026-08-29T01:00:00.000Z",
  });
}

describe("custody adapter protocol", () => {
  test("binds immutable authority and fixed effort-class budgets", () => {
    const envelope = lease();
    expect(envelope).toMatchObject({
      schema: "campaign-custody-lease/v1",
      adapter: { id: "terra-local-steward", executionMode: "disconnected" },
      budget: { maxTokens: 20_000, maxMinutes: 30, maxChangedPaths: 8 },
      authority: { claimPromotion: false, researchDirection: false, workerDispatch: false },
    });
    expect(envelope.contractDigest).toStartWith("sha256:");
    expect(envelope.leaseDigest).toStartWith("sha256:");
  });

  test("produces deterministic zero-effect receipts that replay exactly", () => {
    const envelope = lease();
    const first = simulateCustodyProtocol(envelope);
    const second = simulateCustodyProtocol(envelope);
    expect(first).toEqual(second);
    expect(first).toMatchObject({
      mode: "simulation",
      status: "PROTOCOL_OK",
      effects: { changedPaths: [], claimPromotions: [], dispatches: [] },
      usage: { tokens: 0, minutes: 0 },
    });
    expect(verifyCustodyProtocolReceipt(envelope, first)).toMatchObject({ ok: true, errors: [], replayKey: first.replayKey, executorConnected: false, realEffects: false });
  });

  test("gives the steward an explicit token ceiling and reserves cancellation headroom", () => {
    const envelope = lease();
    const prompt = custodyExecutorPrompt(envelope, "C:/leases/lease.json", "sha256:bundle", "C:/worktree");
    expect(prompt).toContain("at most 20,000 total tokens");
    expect(prompt).toContain("before 60% of the token ceiling");
    expect(custodyInterruptThreshold(20_000)).toBe(14_000);
    expect(custodyInterruptThreshold(50_000)).toBe(35_000);
  });

  test("rejects tampered leases, excess budgets, and forbidden effects", () => {
    const envelope = lease();
    const receipt = simulateCustodyProtocol(envelope);
    const tamperedLease = { ...envelope, contract: { ...envelope.contract, task: "Do unrelated research." } };
    const tamperedReceipt = {
      ...receipt,
      usage: { tokens: 20_001, minutes: 31 },
      effects: { changedPaths: ["FRONTIER.md"], claimPromotions: ["claim-1"], dispatches: ["worker-1"] },
    };
    const verification = verifyCustodyProtocolReceipt(tamperedLease, tamperedReceipt);
    expect(verification.ok).toBe(false);
    expect(verification.errors).toEqual(expect.arrayContaining([
      "Lease digest does not match its canonical envelope.",
      "Receipt exceeds its fixed resource budget.",
      "Custody receipts cannot promote claims.",
      "Custody receipts cannot dispatch workers.",
      "Protocol simulation cannot report real file effects.",
    ]));
  });
});

describe("custody execution receipts", () => {
  const executionLease = () => createCustodyLease({
    leaseId: "execution-1",
    item,
    campaignBoundary: { phase: "DECISION_REQUIRED", version: 42, charterRevision: 2, epochId: "epoch-2" },
    issuedAt: "2026-08-28T01:00:00.000Z",
    expiresAt: "2026-08-29T01:00:00.000Z",
    executionMode: "isolated-worktree",
    workspace: {
      sourceRoot: "C:/campaign",
      repositoryRoot: "C:/campaign",
      projectRelativePath: ".",
      baseCommit: "a".repeat(40),
      isolation: "detached-worktree",
    },
  });

  test("matches only paths admitted by the immutable contract", () => {
    expect(custodyPathAllowed("artifacts/run/evidence-receipt.json", item.acceptance.allowedPaths)).toBe(true);
    expect(custodyPathAllowed("artifacts/a/b/evidence-receipt.json", item.acceptance.allowedPaths)).toBe(true);
    expect(custodyPathAllowed("artifacts/evidence-receipt.json", item.acceptance.allowedPaths)).toBe(true);
    expect(custodyPathAllowed("FRONTIER.md", item.acceptance.allowedPaths)).toBe(false);
  });

  test("accepts a measured isolated receipt and warns when token telemetry is unavailable", () => {
    const lease = executionLease();
    const report: CustodyExecutorReport = {
      status: "COMPLETED",
      summary: "Indexed the bounded receipt.",
      stopReason: "",
      changedPaths: ["artifacts/run/evidence-receipt.json"],
      checks: [{ id: "receipt-index", status: "PASS", detail: "The content hash is present." }],
    };
    const measurement = {
      actualChangedPaths: ["artifacts/run/evidence-receipt.json"],
      actualHead: lease.workspace!.baseCommit,
      measuredMinutes: 4,
      measuredTokens: null,
      completedAt: "2026-08-28T01:04:00.000Z",
    };
    const receipt = buildCustodyExecutionReceipt(lease, report, measurement);
    expect(verifyCustodyExecutionReceipt(lease, receipt, measurement)).toMatchObject({
      ok: true,
      landable: true,
      outcome: "COMPLETED",
      errors: [],
      tokenMeasurement: "unavailable",
      warnings: [expect.stringContaining("did not expose")],
    });
  });

  test("rejects undeclared, out-of-scope, history-changing, and over-budget execution", () => {
    const lease = executionLease();
    const report: CustodyExecutorReport = {
      status: "COMPLETED",
      summary: "Claimed completion.",
      stopReason: "",
      changedPaths: ["artifacts/run/evidence-receipt.json"],
      checks: [{ id: "receipt-index", status: "FAIL", detail: "Mismatch remains." }],
    };
    const measurement = {
      actualChangedPaths: ["FRONTIER.md"],
      actualHead: "b".repeat(40),
      measuredMinutes: 31,
      measuredTokens: 20_001,
      completedAt: "2026-08-28T01:31:00.000Z",
    };
    const verification = verifyCustodyExecutionReceipt(lease, buildCustodyExecutionReceipt(lease, report, measurement), measurement) as any;
    expect(verification.ok).toBe(false);
    expect(verification.errors).toEqual(expect.arrayContaining([
      "The custody executor changed Git history or ran from the wrong base commit.",
      "Executor-declared changed paths do not match the detached worktree.",
      "Custody changes escape the allowed path contract: FRONTIER.md.",
      "Receipt exceeds the fixed wall-time budget.",
      "Receipt exceeds the fixed token budget.",
      "A completed custody receipt requires every acceptance check to pass.",
    ]));
  });
});
