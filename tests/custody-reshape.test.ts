import { describe, expect, test } from "bun:test";
import { custodyNeedsReshape, custodyReshapeChildren } from "../src/ui/custody-reshape";

function failed(task: string, tokens: number, ceiling = "50,000"): Record<string, any> {
  return {
    task,
    status: "failed",
    effortClass: "small",
    tokenCap: 50_000,
    capability: "verification",
    strategicTrack: "supply",
    repairGeneration: 1,
    acceptance: { receiptType: "campaign-custody-protocol-receipt/v1" },
    receipt: {
      summary: `Custody executor exceeded its fixed ${ceiling}-token lease budget and was stopped before landing.`,
      usage: { tokens },
    },
  };
}

describe("custody contract reshaping", () => {
  test("splits each known oversized CFG23 boundary into two narrower successors", () => {
    const tasks = [
      "Consolidated asymmetric-laboratory intake replay and scope reconciliation",
      "Verify frozen asymmetric manifest, provenance, and control count",
      "Bind the frozen asymmetric manifest and provenance",
      "Replay frozen asymmetric deduplication and reconcile resource scope",
      "Backfill and reconcile epoch resource provenance",
      "Bind missing epoch token measurements to their source runs",
      "Reconcile epoch reservation and wall-time scopes",
    ];

    for (const task of tasks) {
      const children = custodyReshapeChildren(failed(task, 64_067));
      expect(children).toHaveLength(2);
      expect(children.every((child) => child.blocksResearch && child.acceptance.allowedPaths.length === 1)).toBe(true);
      expect(new Set(children.map((child) => child.task)).size).toBe(2);
    }
  });

  test("never treats an unknown over-budget contract as safely retryable", () => {
    const item = failed("A future custody contract without a reshape template", 54_759);
    expect(custodyNeedsReshape(item)).toBe(true);
    expect(custodyReshapeChildren(item)).toEqual([]);
  });

  test("routes a legacy small-lease overrun to the corrected envelope instead of another split", () => {
    const item = failed("Verify frozen asymmetric manifest, provenance, and control count", 24_893, "20,000");
    expect(custodyNeedsReshape(item)).toBe(false);
  });
});
