import type { LaneSnapshot } from "./types";

export const WAVE_DISPOSITIONS = new Set<string>(["REPAIR", "SUPERSEDE", "ABANDON", "CARRY_FORWARD", "DUPLICATE"]);
export type WaveDisposition = "REPAIR" | "SUPERSEDE" | "ABANDON" | "CARRY_FORWARD" | "DUPLICATE";

export const TERMINAL_DAEMONS = new Set([
  "done", "stopped", "failed", "error", "crashed", "cancelled", "canceled", "complete", "completed",
]);

export type WaveLaneAccountingState = "READY" | "BLOCKED" | "RUNNING" | "FAILED_REVIEWABLE" | "NEEDS_RECONCILIATION";

export interface WaveLaneRecord {
  lane_id: string;
  accounting_state: string;
  disposition: string;
  reason?: string;
  updated_at?: string;
}

export interface WaveAccounting {
  [key: string]: number | boolean;
  total: number;
  accounted: number;
  unaccounted: number;
  running: number;
  ready: number;
  failed: number;
  blocked: number;
  needsReconciliation: number;
  complete: boolean;
}

export type ObservedCampaignPhase = "PLANNING" | "RUNNING" | "RECONCILING" | "SYNTHESIS_READY" | "BLOCKED";

export interface WaveProjectionRepairItem {
  laneId: string;
  recordedAccountingState: string;
  observed: {
    present: boolean;
    lifecycle: string;
    daemon: string;
    landing: string;
    updatedAt: string;
    completedAt: string;
  };
  diagnosis: "MISSING_OBSERVATION" | "STALE_OR_UNKNOWN_OBSERVATION" | "WORKER_STILL_ACTIVE" | "RECONCILIATION_REQUIRED" | "TERMINAL_PROJECTION_MISMATCH";
  recommendation: "INSPECT_ARCHIVE" | "WAIT_FOR_TERMINAL_EVIDENCE" | "RECONCILE_FIRST" | "PROPOSE_OBSERVER_SYNC";
  proposedAccountingState: WaveLaneAccountingState | "";
  mechanicallyRepairable: boolean;
  note: string;
}

export interface WaveProjectionRepairPlan {
  schema: "campaign-wave-projection-repair/v1";
  mode: "advisory";
  authority: "none";
  mutation: "none";
  applicable: false;
  status: "NOT_NEEDED" | "READY_FOR_REVIEW" | "BLOCKED_ON_EVIDENCE";
  waveId: string;
  items: WaveProjectionRepairItem[];
  summary: string;
}

export function laneFailure(lane: LaneSnapshot): boolean {
  const landing = lane.landing.toUpperCase();
  return ["failed", "error", "crashed", "cancelled", "canceled", "blocked"].includes(lane.daemon)
    || landing.includes("FAIL")
    || landing.includes("BLOCK")
    || Boolean(lane.topology?.violations);
}

export function laneAccountingState(lane: LaneSnapshot): WaveLaneAccountingState {
  if (lane.landing === "READY_FOR_SEMANTIC_REVIEW") return "READY";
  if (lane.daemon === "blocked") return "BLOCKED";
  if (!TERMINAL_DAEMONS.has(lane.daemon)) return "RUNNING";
  if (lane.landing.toUpperCase().includes("FAIL")) return "FAILED_REVIEWABLE";
  return "NEEDS_RECONCILIATION";
}

export function waveLaneAccounted(row: WaveLaneRecord): boolean {
  return ["READY", "FAILED_REVIEWABLE", "BLOCKED"].includes(row.accounting_state) || Boolean(row.disposition);
}

export function waveAccounting(rows: WaveLaneRecord[]): WaveAccounting {
  const accounted = rows.filter(waveLaneAccounted).length;
  return {
    total: rows.length,
    accounted,
    unaccounted: rows.length - accounted,
    running: rows.filter((row) => row.accounting_state === "RUNNING" && !row.disposition).length,
    ready: rows.filter((row) => row.accounting_state === "READY").length,
    failed: rows.filter((row) => row.accounting_state === "FAILED_REVIEWABLE").length,
    blocked: rows.filter((row) => row.accounting_state === "BLOCKED").length,
    needsReconciliation: rows.filter((row) => row.accounting_state === "NEEDS_RECONCILIATION" && !row.disposition).length,
    complete: rows.length > 0 && accounted === rows.length,
  };
}

export function deriveCampaignPhase(lanes: LaneSnapshot[]): ObservedCampaignPhase {
  const active = lanes.filter((lane) => lane.lifecycle === "active");
  if (!active.length) return "PLANNING";
  if (active.some(laneFailure)) return "BLOCKED";
  if (active.some((lane) => !TERMINAL_DAEMONS.has(lane.daemon))) return "RUNNING";
  if (active.every((lane) => lane.landing === "READY_FOR_SEMANTIC_REVIEW")) return "SYNTHESIS_READY";
  return "RECONCILING";
}

export function projectWaveAggregate(input: {
  id: string;
  projectId: string;
  label: string;
  campaignPhase: string;
  createdAt: string;
  updatedAt: string;
  lanes: WaveLaneRecord[];
}): Record<string, any> {
  const accounting = waveAccounting(input.lanes);
  const duplicateLaneIds = input.lanes.map((lane) => lane.lane_id).filter((id, index, values) => values.indexOf(id) !== index);
  const invalidDispositions = input.lanes
    .filter((lane) => lane.disposition && !WAVE_DISPOSITIONS.has(lane.disposition))
    .map((lane) => lane.lane_id);
  const afterSynthesis = ["DECISION_REQUIRED", "RESEARCH_REVIEW", "RESEARCH_READY", "RESEARCH_RUNNING", "RESEARCH_INTAKE", "REVISING", "NEXT_WAVE_READY"].includes(input.campaignPhase);
  const closureAccountingGap = afterSynthesis && !accounting.complete;
  const state = closureAccountingGap ? "CLOSED_WITH_ACCOUNTING_GAP" : afterSynthesis ? "CLOSED"
    : ["SYNTHESIS_READY", "SYNTHESIZING"].includes(input.campaignPhase) || accounting.complete ? "READY_FOR_SYNTHESIS"
      : accounting.running ? "EXECUTING" : "LANDING";
  const nextBoundary = state === "CLOSED_WITH_ACCOUNTING_GAP" ? "Reconcile the historical member projection before this aggregate can become an execution authority."
    : state === "EXECUTING" ? "Wait for every active member to become terminal."
    : state === "LANDING" ? "Reconcile or explicitly disposition every unaccounted member."
      : state === "READY_FOR_SYNTHESIS" ? "Preserve the explicit synthesis gate and freeze one wave-level evidence boundary."
        : "The wave is immutable history; planning belongs to a successor wave.";
  return {
    schema: "campaign-wave-aggregate/v1",
    mode: "projection-only",
    authority: "none",
    id: input.id,
    projectId: input.projectId,
    label: input.label,
    state,
    campaignPhase: input.campaignPhase,
    membership: {
      frozen: true,
      count: input.lanes.length,
      laneIds: input.lanes.map((lane) => lane.lane_id),
      duplicates: [...new Set(duplicateLaneIds)],
    },
    accounting,
    parallelism: {
      active: state === "EXECUTING" ? accounting.running : 0,
      recordedRunning: accounting.running,
      terminal: accounting.total - accounting.running,
      boundedMembers: input.lanes.length,
    },
    lanes: input.lanes.map((lane) => ({
      id: lane.lane_id,
      accountingState: lane.accounting_state,
      disposition: lane.disposition || "",
      reason: lane.reason || "",
      accounted: waveLaneAccounted(lane),
      updatedAt: lane.updated_at || "",
    })),
    invariants: {
      valid: duplicateLaneIds.length === 0 && invalidDispositions.length === 0 && !closureAccountingGap,
      immutableMembership: true,
      explicitDispositionRequired: true,
      synthesisRequiresCompleteAccounting: true,
      phaseAccountingConsistent: !closureAccountingGap,
      closureGapLaneIds: closureAccountingGap ? input.lanes.filter((lane) => !waveLaneAccounted(lane)).map((lane) => lane.lane_id) : [],
      invalidDispositionLaneIds: invalidDispositions,
    },
    nextBoundary,
    createdAt: input.createdAt,
    updatedAt: input.updatedAt,
  };
}

export function planWaveProjectionRepair(input: {
  aggregate: Record<string, any>;
  observedLanes: LaneSnapshot[];
}): WaveProjectionRepairPlan {
  const gapIds: string[] = Array.isArray(input.aggregate?.invariants?.closureGapLaneIds)
    ? input.aggregate.invariants.closureGapLaneIds.filter((id: unknown): id is string => typeof id === "string")
    : [];
  const recorded = new Map((Array.isArray(input.aggregate?.lanes) ? input.aggregate.lanes : [])
    .map((lane: Record<string, unknown>) => [String(lane.id || ""), String(lane.accountingState || "") ]));
  const observed = new Map(input.observedLanes.map((lane) => [lane.id, lane]));
  const items: WaveProjectionRepairItem[] = gapIds.map((laneId): WaveProjectionRepairItem => {
    const lane = observed.get(laneId);
    const recordedAccountingState = recorded.get(laneId) || "";
    if (!lane) {
      return {
        laneId, recordedAccountingState,
        observed: { present: false, lifecycle: "", daemon: "", landing: "", updatedAt: "", completedAt: "" },
        diagnosis: "MISSING_OBSERVATION", recommendation: "INSPECT_ARCHIVE", proposedAccountingState: "",
        mechanicallyRepairable: false,
        note: "No current observer record proves a terminal outcome. Inspect durable lane history before proposing any projection change.",
      };
    }
    const observedState = laneAccountingState(lane);
    const observation = {
      present: true, lifecycle: lane.lifecycle, daemon: lane.daemon, landing: lane.landing,
      updatedAt: lane.updatedAt, completedAt: lane.completedAt,
    };
    if (observedState === "RUNNING") {
      const unknown = lane.daemon === "unknown" || lane.landing === "—";
      return {
        laneId, recordedAccountingState, observed: observation,
        diagnosis: unknown ? "STALE_OR_UNKNOWN_OBSERVATION" : "WORKER_STILL_ACTIVE",
        recommendation: "WAIT_FOR_TERMINAL_EVIDENCE", proposedAccountingState: "",
        mechanicallyRepairable: false,
        note: unknown
          ? "The observer still lacks terminal evidence. Inspect the lane source or archive; do not infer completion or revive the worker."
          : "The observed worker is nonterminal. Preserve the recorded membership and wait without interrupting or duplicating it.",
      };
    }
    if (observedState === "NEEDS_RECONCILIATION") {
      return {
        laneId, recordedAccountingState, observed: observation,
        diagnosis: "RECONCILIATION_REQUIRED", recommendation: "RECONCILE_FIRST", proposedAccountingState: observedState,
        mechanicallyRepairable: false,
        note: "Terminal runtime state exists, but custody has not established a reviewable landing receipt.",
      };
    }
    return {
      laneId, recordedAccountingState, observed: observation,
      diagnosis: "TERMINAL_PROJECTION_MISMATCH", recommendation: "PROPOSE_OBSERVER_SYNC", proposedAccountingState: observedState,
      mechanicallyRepairable: true,
      note: "Observer evidence supports a projection update, but this advisory plan has no mutation authority and still requires an explicit repair command.",
    };
  });
  const repairable = items.filter((item) => item.mechanicallyRepairable).length;
  const status = items.length === 0 ? "NOT_NEEDED" : repairable === items.length ? "READY_FOR_REVIEW" : "BLOCKED_ON_EVIDENCE";
  return {
    schema: "campaign-wave-projection-repair/v1",
    mode: "advisory",
    authority: "none",
    mutation: "none",
    applicable: false,
    status,
    waveId: String(input.aggregate?.id || ""),
    items,
    summary: items.length === 0
      ? "No historical member projection gap is present."
      : `${items.length} historical member projection gap${items.length === 1 ? "" : "s"}; ${repairable} has terminal observer evidence suitable for a separately gated repair proposal.`,
  };
}
