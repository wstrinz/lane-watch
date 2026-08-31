import type { ResourcePolicy, ResourceUsage } from "./resources";

export type ResourceCalibrationClass = "routineLane" | "coordinatedLane" | "custody" | "synthesis" | "strategyReview";

const MINIMUM_SAMPLES: Record<ResourceCalibrationClass, number> = {
  routineLane: 5,
  coordinatedLane: 3,
  custody: 3,
  synthesis: 3,
  strategyReview: 3,
};

const TERMINAL_STATUSES = new Set([
  "complete", "completed", "verified", "evidence_ready", "returned_to_sol", "blocked", "failed", "rejected",
]);

function calibrationClass(usage: ResourceUsage): ResourceCalibrationClass {
  if (usage.layer === "research") return usage.profile === "sonnet-worker" ? "routineLane" : "coordinatedLane";
  if (usage.layer === "custody") return "custody";
  if (usage.layer === "synthesis") return "synthesis";
  return "strategyReview";
}

function quantile(values: number[], share: number): number {
  if (!values.length) return 0;
  const sorted = [...values].sort((left, right) => left - right);
  return sorted[Math.max(0, Math.ceil(sorted.length * share) - 1)]!;
}

function roundedAdvisoryCap(value: number): number {
  return Math.ceil(value * 1.2 / 10_000) * 10_000;
}

/** Derives human-reviewable calibration statistics without changing resource policy or scheduler authority. */
export function deriveResourceCalibration(policy: ResourcePolicy, usage: ResourceUsage[]): Record<string, any> {
  const exclusions = new Map<string, number>();
  const eligible = usage.filter((entry) => {
    let reason = "";
    if (!TERMINAL_STATUSES.has(entry.status.toLowerCase())) reason = "non-terminal";
    else if (!entry.receiptBound) reason = "not-receipt-bound";
    else if (!entry.measurementComplete) reason = "incomplete-measurement";
    else if (!Number.isFinite(entry.tokens) || Number(entry.tokens) <= 0) reason = "missing-positive-tokens";
    else if (!Number.isFinite(entry.wallHours) || entry.wallHours <= 0) reason = "missing-positive-duration";
    if (reason) exclusions.set(reason, (exclusions.get(reason) || 0) + 1);
    return !reason;
  });
  const currentCaps: Partial<Record<ResourceCalibrationClass, number>> = {
    routineLane: policy.tokenCaps.routineLane,
    coordinatedLane: policy.tokenCaps.coordinatedLane,
    synthesis: policy.tokenCaps.synthesis,
    strategyReview: policy.tokenCaps.strategyReview,
  };
  const classes = (Object.keys(MINIMUM_SAMPLES) as ResourceCalibrationClass[]).map((id) => {
    const entries = eligible.filter((entry) => calibrationClass(entry) === id);
    const tokens = entries.map((entry) => Number(entry.tokens));
    const wallHours = entries.map((entry) => entry.wallHours);
    const minimumSamples = MINIMUM_SAMPLES[id];
    const observedCap = entries.length >= 3 ? roundedAdvisoryCap(quantile(tokens, 0.9)) : null;
    const currentCap = currentCaps[id] ?? null;
    return {
      id,
      samples: entries.length,
      minimumSamples,
      sufficient: entries.length >= minimumSamples,
      tokens: { p50: quantile(tokens, 0.5), p90: quantile(tokens, 0.9), max: tokens.length ? Math.max(...tokens) : 0 },
      wallHours: { p50: quantile(wallHours, 0.5), p90: quantile(wallHours, 0.9), max: wallHours.length ? Math.max(...wallHours) : 0 },
      recommendation: observedCap === null ? null : {
        currentCap,
        advisoryCap: currentCap === null ? observedCap : Math.max(currentCap, observedCap),
        basis: "120% of receipt-bound p90, rounded up to 10,000 tokens; never automatically lowers the current cap.",
      },
    };
  });
  const researchReady = classes.filter((entry) => ["routineLane", "coordinatedLane"].includes(entry.id)).every((entry) => entry.sufficient);
  const anySufficient = classes.some((entry) => entry.sufficient);
  return {
    schema: "campaign-resource-calibration/v1",
    status: researchReady ? "READY_FOR_HUMAN_REVIEW" : anySufficient ? "PARTIAL" : "INSUFFICIENT",
    schedulerAuthority: "none",
    policyChangeAllowed: false,
    recommendationsAdvisory: true,
    eligibleSamples: eligible.length,
    observedUsage: usage.length,
    excludedSamples: usage.length - eligible.length,
    exclusions: [...exclusions.entries()].map(([reason, count]) => ({ reason, count })),
    classes,
    note: "Only terminal, receipt-bound records with explicit positive token and duration measurements qualify. Ledger-only observer telemetry is excluded.",
  };
}
