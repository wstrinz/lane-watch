import { describe, expect, test } from "bun:test";
import { assertTerminalResearchReceipt, deriveReceiptBoundMeasurement, sha256ReceiptArtifact } from "../src/observation-sync-service";
import { deriveResourceCalibration } from "../src/resource-calibration";
import { defaultResourcePolicy, type ResourceUsage } from "../src/resources";

function measured(id: string, tokens: number, profile = "sonnet-worker", layer: ResourceUsage["layer"] = "research"): ResourceUsage {
  return {
    id, layer, trackId: "coverage", workKind: layer === "research" ? "experiment" : "maintenance",
    tokens, wallHours: 2, status: layer === "research" ? "evidence_ready" : "completed", profile,
    receiptDigest: `sha256:${id}`, measurementSource: "observer-ledger-at-receipt-freeze",
    receiptBound: true, measurementComplete: true,
  };
}

describe("receipt-bound resource calibration", () => {
  test("validates the terminal verdict and hashes campaign artifacts as canonical LF bytes", () => {
    assertTerminalResearchReceipt({ schema: "cfg23-research-evidence/v1", task_id: "task-1", verdict: "INCONCLUSIVE" }, "task-1");
    assertTerminalResearchReceipt({ schema: "cfg23-research-evidence/v1", task_id: "task-1", terminal_state: "INCONCLUSIVE" }, "task-1");
    expect(() => assertTerminalResearchReceipt({ schema: "cfg23-research-evidence/v1", task_id: "task-1", terminal_state: "DONE" }, "task-1"))
      .toThrow("Receipt must declare status complete|blocked or verdict/terminal_state");

    const encoder = new TextEncoder();
    const canonical = { artifact_paths_note: "SHA-256 over canonical LF bytes." };
    expect(sha256ReceiptArtifact(canonical, encoder.encode("alpha\r\nbeta\r\n")))
      .toBe(sha256ReceiptArtifact({}, encoder.encode("alpha\nbeta\n")));
    expect(sha256ReceiptArtifact({}, encoder.encode("alpha\r\nbeta\r\n")))
      .not.toBe(sha256ReceiptArtifact({}, encoder.encode("alpha\nbeta\n")));
  });

  test("freezes a positive observer token measurement only at an evidence settlement boundary", () => {
    expect(deriveReceiptBoundMeasurement({
      evidenceSha256: "sha256:receipt", observedTokens: 48_492,
      createdAt: "2026-08-30T10:00:00.000Z", settledAt: "2026-08-30T10:30:00.000Z",
    })).toEqual({ tokens: 48_492, wallSeconds: 1800, source: "observer-ledger-at-receipt-freeze", measuredAt: "2026-08-30T10:30:00.000Z" });
    expect(deriveReceiptBoundMeasurement({ evidenceSha256: "", observedTokens: 48_492, createdAt: "old", settledAt: "new" })).toBeNull();
    expect(deriveReceiptBoundMeasurement({ evidenceSha256: "sha256:receipt", observedTokens: null, createdAt: "old", settledAt: "new" })).toBeNull();
  });

  test("excludes live and historical ledger telemetry that is not receipt-bound", () => {
    const calibration = deriveResourceCalibration(defaultResourcePolicy(), [
      { ...measured("legacy", 48_492), receiptBound: false, measurementComplete: false, measurementSource: "observer-ledger-unbound" },
      { ...measured("incomplete", 83_569), wallHours: 0 },
      { ...measured("active", 48_010), status: "running" },
    ]);
    expect(calibration).toMatchObject({
      schema: "campaign-resource-calibration/v1", status: "INSUFFICIENT", schedulerAuthority: "none",
      policyChangeAllowed: false, recommendationsAdvisory: true, eligibleSamples: 0, excludedSamples: 3,
    });
    expect(calibration.exclusions).toEqual([
      { reason: "not-receipt-bound", count: 1 },
      { reason: "missing-positive-duration", count: 1 },
      { reason: "non-terminal", count: 1 },
    ]);
  });

  test("produces conservative human-reviewable statistics without reducing current caps", () => {
    const policy = defaultResourcePolicy();
    const usage = [40_000, 50_000, 60_000, 70_000, 75_000].map((tokens, index) => measured(`routine-${index}`, tokens));
    usage.push(...[100_000, 120_000, 150_000].map((tokens, index) => measured(`coordinated-${index}`, tokens, "research-opus-max")));
    const calibration = deriveResourceCalibration(policy, usage);
    expect(calibration.status).toBe("READY_FOR_HUMAN_REVIEW");
    expect(calibration.schedulerAuthority).toBe("none");
    expect(calibration.policyChangeAllowed).toBe(false);
    expect(calibration.classes.find((entry: any) => entry.id === "routineLane")).toMatchObject({
      samples: 5, sufficient: true, tokens: { p50: 60_000, p90: 75_000, max: 75_000 },
      recommendation: { currentCap: 80_000, advisoryCap: 90_000 },
    });
    expect(calibration.classes.find((entry: any) => entry.id === "coordinatedLane")).toMatchObject({
      samples: 3, sufficient: true, recommendation: { currentCap: 160_000, advisoryCap: 180_000 },
    });
    expect(policy.tokenCaps).toEqual({ routineLane: 80_000, coordinatedLane: 160_000, synthesis: 100_000, strategyReview: 120_000 });
  });
});
