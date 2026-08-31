import { describe, expect, test } from "bun:test";
import { planWaveProjectionRepair, projectWaveAggregate, waveAccounting, waveLaneAccounted, type WaveLaneRecord } from "../src/wave";
import type { LaneSnapshot } from "../src/types";

function member(id: string, accountingState: string, disposition = ""): WaveLaneRecord {
  return { lane_id: id, accounting_state: accountingState, disposition, reason: disposition ? "Explicit operator disposition." : "", updated_at: "2026-08-28T12:00:00.000Z" };
}

function observed(id: string, daemon: string, landing: string, lifecycle = "active"): LaneSnapshot {
  return {
    id, project: "demo", host: "windows", task: id, lane: id, name: id, model: "sonnet", effort: "high",
    laneKind: "worker", parentAgent: "", jobId: "", sessionId: "", lifecycle, daemon, tempo: "", status: "",
    severity: "unknown", attentionReason: "", detail: "", output: "", tokens: null, inFlight: 0, queued: 0,
    activities: [], topology: null, timeline: [], landing, branch: "", worktree: "", launchedAt: "",
    updatedAt: "2026-08-28T12:00:00.000Z", completedAt: daemon === "done" ? "2026-08-28T11:59:00.000Z" : "",
  };
}

describe("multi-lane wave aggregate", () => {
  test("projects parallel execution and explicit landing custody without executing anything", () => {
    const lanes = [member("lane-ready", "READY"), member("lane-live", "RUNNING"), member("lane-carried", "NEEDS_RECONCILIATION", "CARRY_FORWARD")];
    expect(waveAccounting(lanes)).toEqual({ total: 3, accounted: 2, unaccounted: 1, running: 1, ready: 1, failed: 0, blocked: 0, needsReconciliation: 0, complete: false });
    const aggregate = projectWaveAggregate({ id: "wave-1", projectId: "demo", label: "Parallel trial", campaignPhase: "RUNNING", createdAt: "2026-08-28T11:00:00.000Z", updatedAt: "2026-08-28T12:00:00.000Z", lanes });
    expect(aggregate).toMatchObject({
      schema: "campaign-wave-aggregate/v1",
      mode: "projection-only",
      authority: "none",
      state: "EXECUTING",
      membership: { frozen: true, count: 3, laneIds: ["lane-ready", "lane-live", "lane-carried"], duplicates: [] },
      parallelism: { active: 1, terminal: 2, boundedMembers: 3 },
      invariants: { valid: true, immutableMembership: true, explicitDispositionRequired: true, synthesisRequiresCompleteAccounting: true },
    });
    expect(aggregate.nextBoundary).toContain("terminal");
  });

  test("requires complete accounting before synthesis and closes only as immutable history", () => {
    const lanes = [member("lane-ready", "READY"), member("lane-blocked", "BLOCKED"), member("lane-failed", "FAILED_REVIEWABLE")];
    expect(lanes.every(waveLaneAccounted)).toBe(true);
    expect(projectWaveAggregate({ id: "wave-2", projectId: "demo", label: "Settled", campaignPhase: "SYNTHESIS_READY", createdAt: "", updatedAt: "", lanes })).toMatchObject({ state: "READY_FOR_SYNTHESIS", accounting: { complete: true, accounted: 3 } });
    expect(projectWaveAggregate({ id: "wave-2", projectId: "demo", label: "Settled", campaignPhase: "DECISION_REQUIRED", createdAt: "", updatedAt: "", lanes })).toMatchObject({ state: "CLOSED", authority: "none" });
  });

  test("surfaces a legacy post-synthesis accounting gap without reviving its worker", () => {
    const aggregate = projectWaveAggregate({
      id: "wave-gap", projectId: "demo", label: "Legacy closure", campaignPhase: "DECISION_REQUIRED", createdAt: "", updatedAt: "",
      lanes: [member("accounted", "READY"), member("stale-runtime", "RUNNING")],
    });
    expect(aggregate).toMatchObject({
      state: "CLOSED_WITH_ACCOUNTING_GAP",
      authority: "none",
      parallelism: { active: 0, recordedRunning: 1 },
      invariants: { valid: false, phaseAccountingConsistent: false, closureGapLaneIds: ["stale-runtime"] },
    });
    expect(aggregate.nextBoundary).toContain("historical member projection");
  });

  test("surfaces duplicate membership and invalid dispositions as invariant failures", () => {
    const aggregate = projectWaveAggregate({
      id: "wave-invalid", projectId: "demo", label: "Invalid", campaignPhase: "RECONCILING", createdAt: "", updatedAt: "",
      lanes: [member("duplicate", "READY"), member("duplicate", "NEEDS_RECONCILIATION", "ASSUME_DONE")],
    });
    expect(aggregate).toMatchObject({ membership: { duplicates: ["duplicate"] }, invariants: { valid: false, invalidDispositionLaneIds: ["duplicate"] } });
  });

  test("diagnoses a stale unknown member without granting repair authority", () => {
    const aggregate = projectWaveAggregate({
      id: "wave-gap", projectId: "demo", label: "Legacy closure", campaignPhase: "DECISION_REQUIRED", createdAt: "", updatedAt: "",
      lanes: [member("stale-runtime", "RUNNING")],
    });
    expect(planWaveProjectionRepair({ aggregate, observedLanes: [observed("stale-runtime", "unknown", "—")] })).toMatchObject({
      schema: "campaign-wave-projection-repair/v1", mode: "advisory", authority: "none", mutation: "none", applicable: false,
      status: "BLOCKED_ON_EVIDENCE",
      items: [{ laneId: "stale-runtime", diagnosis: "STALE_OR_UNKNOWN_OBSERVATION", recommendation: "WAIT_FOR_TERMINAL_EVIDENCE", mechanicallyRepairable: false }],
    });
  });

  test("identifies terminal observer evidence as a separately gated repair proposal", () => {
    const aggregate = projectWaveAggregate({
      id: "wave-gap", projectId: "demo", label: "Legacy closure", campaignPhase: "DECISION_REQUIRED", createdAt: "", updatedAt: "",
      lanes: [member("terminal-mismatch", "RUNNING")],
    });
    expect(planWaveProjectionRepair({ aggregate, observedLanes: [observed("terminal-mismatch", "done", "READY_FOR_SEMANTIC_REVIEW")] })).toMatchObject({
      authority: "none", applicable: false, status: "READY_FOR_REVIEW",
      items: [{ diagnosis: "TERMINAL_PROJECTION_MISMATCH", recommendation: "PROPOSE_OBSERVER_SYNC", proposedAccountingState: "READY", mechanicallyRepairable: true }],
    });
  });
});
