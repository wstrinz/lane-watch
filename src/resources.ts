import type { StrategyTrackId, StrategyWorkKind } from "./strategy";

export type ResourceLayer = "strategy" | "research" | "custody" | "synthesis";

export interface ResourcePolicy {
  mode: "provisional";
  epochTokenBudget: number;
  waveTokenBudget: number;
  reserveShare: number;
  tokenCaps: { routineLane: number; coordinatedLane: number; synthesis: number; strategyReview: number };
  slots: { strategy: number; research: number; custody: number };
  maxUnreportedRuns: number;
  rationale: string;
}

export interface ResourceUsage {
  id: string;
  layer: ResourceLayer;
  trackId: StrategyTrackId | "shared";
  workKind: StrategyWorkKind | "coordination" | "simulation";
  tokens: number | null;
  wallHours: number;
  status: string;
  profile?: string;
  receiptDigest?: string;
  measurementSource?: string;
  receiptBound?: boolean;
  measurementComplete?: boolean;
}

export interface ResourceCandidate {
  id: string;
  label: string;
  layer: ResourceLayer;
  slotPool: "strategy" | "research" | "custody";
  trackId: StrategyTrackId | "shared";
  workKind: StrategyWorkKind | "coordination";
  tokenCap: number;
  priority: number;
  blocking: boolean;
  ready: boolean;
  gateRequired: boolean;
  committed: boolean;
  expectedDelta: string;
  reason: string;
}

export interface ResourceSlotState {
  strategy: number;
  research: number;
  custody: number;
}

export function defaultResourcePolicy(): ResourcePolicy {
  return {
    mode: "provisional",
    epochTokenBudget: 1_000_000,
    waveTokenBudget: 240_000,
    reserveShare: 0.1,
    tokenCaps: { routineLane: 80_000, coordinatedLane: 160_000, synthesis: 100_000, strategyReview: 120_000 },
    slots: { strategy: 1, research: 3, custody: 1 },
    maxUnreportedRuns: 0,
    rationale: "Start with a conservative epoch envelope, preserve a ten-percent redirect reserve, and measure real usage before granting this scheduler authority.",
  };
}

export function normalizeResourcePolicy(value: Record<string, any> | null | undefined): ResourcePolicy {
  const fallback = defaultResourcePolicy();
  const tokenCaps = value?.tokenCaps || {};
  const slots = value?.slots || {};
  const finite = (candidate: unknown, fallbackValue: number): number => {
    const parsed = Number(candidate);
    return Number.isFinite(parsed) ? parsed : fallbackValue;
  };
  return {
    mode: "provisional",
    epochTokenBudget: Math.max(100_000, finite(value?.epochTokenBudget, fallback.epochTokenBudget)),
    waveTokenBudget: Math.max(20_000, finite(value?.waveTokenBudget, fallback.waveTokenBudget)),
    reserveShare: Math.min(0.5, Math.max(0, finite(value?.reserveShare, fallback.reserveShare))),
    tokenCaps: {
      routineLane: Math.max(10_000, finite(tokenCaps.routineLane, fallback.tokenCaps.routineLane)),
      coordinatedLane: Math.max(20_000, finite(tokenCaps.coordinatedLane, fallback.tokenCaps.coordinatedLane)),
      synthesis: Math.max(20_000, finite(tokenCaps.synthesis, fallback.tokenCaps.synthesis)),
      strategyReview: Math.max(20_000, finite(tokenCaps.strategyReview, fallback.tokenCaps.strategyReview)),
    },
    slots: {
      strategy: Math.max(0, Math.min(4, Math.floor(finite(slots.strategy, fallback.slots.strategy)))),
      research: Math.max(0, Math.min(16, Math.floor(finite(slots.research, fallback.slots.research)))),
      custody: Math.max(0, Math.min(8, Math.floor(finite(slots.custody, fallback.slots.custody)))),
    },
    maxUnreportedRuns: Math.max(0, Math.floor(finite(value?.maxUnreportedRuns, fallback.maxUnreportedRuns))),
    rationale: String(value?.rationale || fallback.rationale).trim().slice(0, 2_000),
  };
}

export function deriveResourceState(input: {
  policy: ResourcePolicy;
  usage: ResourceUsage[];
  candidates: ResourceCandidate[];
  activeSlots: ResourceSlotState;
  computedAt?: string;
}): Record<string, any> {
  const { policy, usage, candidates } = input;
  const knownTokens = usage.reduce((sum, entry) => sum + (entry.tokens || 0), 0);
  const unreported = usage.filter((entry) => entry.tokens === null).length;
  const reserveTokens = Math.round(policy.epochTokenBudget * policy.reserveShare);
  const committedTokens = candidates.filter((candidate) => candidate.committed).reduce((sum, candidate) => sum + candidate.tokenCap, 0);
  const remainingBeforeCommitments = Math.max(0, policy.epochTokenBudget - reserveTokens - knownTokens);
  const schedulableTokens = Math.max(0, remainingBeforeCommitments - committedTokens);
  const availableSlots: ResourceSlotState = {
    strategy: Math.max(0, policy.slots.strategy - input.activeSlots.strategy),
    research: Math.max(0, policy.slots.research - input.activeSlots.research),
    custody: Math.max(0, policy.slots.custody - input.activeSlots.custody),
  };
  const ranked = [...candidates].sort((left, right) => {
    if (left.blocking !== right.blocking) return left.blocking ? -1 : 1;
    if (left.ready !== right.ready) return left.ready ? -1 : 1;
    if (left.workKind !== right.workKind) {
      const order = { frontier: 0, experiment: 1, coordination: 2, audit: 3, maintenance: 4 } as Record<string, number>;
      return (order[left.workKind] ?? 9) - (order[right.workKind] ?? 9);
    }
    if (left.priority !== right.priority) return left.priority - right.priority;
    return left.tokenCap - right.tokenCap;
  });
  const simulatedSlots = { ...availableSlots };
  let simulatedTokens = remainingBeforeCommitments;
  const decisions = ranked.map((candidate) => {
    let decision: "SCHEDULE" | "GATE" | "WAIT" | "PARK" = "SCHEDULE";
    let reason = "Fits the provisional token and slot envelope.";
    if (!candidate.ready || candidate.gateRequired) {
      decision = candidate.gateRequired ? "GATE" : "WAIT";
      reason = candidate.reason || (candidate.gateRequired ? "Human authority is required before scheduling." : "Dependencies or contracts are not ready.");
      if (candidate.committed) simulatedTokens = Math.max(0, simulatedTokens - candidate.tokenCap);
    } else if (simulatedSlots[candidate.slotPool] < 1) {
      decision = "WAIT";
      reason = `No ${candidate.slotPool} slot is available in this simulation.`;
    } else if (candidate.tokenCap > simulatedTokens) {
      decision = "PARK";
      reason = `The ${candidate.tokenCap.toLocaleString()} token cap exceeds the remaining provisional envelope.`;
    } else {
      simulatedSlots[candidate.slotPool] -= 1;
      simulatedTokens -= candidate.tokenCap;
    }
    return { ...candidate, decision, decisionReason: reason };
  });
  const byLayer = (["strategy", "research", "custody", "synthesis"] as ResourceLayer[]).map((layer) => {
    const entries = usage.filter((entry) => entry.layer === layer);
    return {
      id: layer,
      knownTokens: entries.reduce((sum, entry) => sum + (entry.tokens || 0), 0),
      unreported: entries.filter((entry) => entry.tokens === null).length,
      wallHours: entries.reduce((sum, entry) => sum + entry.wallHours, 0),
      runs: entries.length,
    };
  });
  const signals: Array<Record<string, any>> = [];
  const spendShare = policy.epochTokenBudget ? knownTokens / policy.epochTokenBudget : 0;
  if (spendShare >= 0.75) signals.push({ id: "epoch-budget-pressure", severity: spendShare >= 0.9 ? "attention" : "warning", label: "The provisional epoch budget is under pressure", detail: `${Math.round(spendShare * 100)}% of the token envelope is already measured.` });
  if (unreported > policy.maxUnreportedRuns) signals.push({ id: "resource-cost-blindness", severity: "warning", label: "Resource accounting is incomplete", detail: `${unreported} run${unreported === 1 ? "" : "s"} have no durable token usage.` });
  if (committedTokens > remainingBeforeCommitments) signals.push({ id: "overcommitted", severity: "attention", label: "Approved commitments exceed the spendable envelope", detail: `${committedTokens.toLocaleString()} committed tokens compete for ${remainingBeforeCommitments.toLocaleString()} spendable tokens.` });
  return {
    schema: "campaign-resource-ledger/v1",
    mode: "shadow",
    schedulerAuthority: "none",
    policy,
    ledger: {
      epochTokenBudget: policy.epochTokenBudget,
      knownTokens,
      unreported,
      reserveTokens,
      committedTokens,
      remainingBeforeCommitments,
      schedulableTokens,
      spendShare,
    },
    slots: { capacity: policy.slots, active: input.activeSlots, available: availableSlots },
    byLayer,
    candidates: decisions,
    simulation: {
      scheduled: decisions.filter((candidate) => candidate.decision === "SCHEDULE"),
      gated: decisions.filter((candidate) => candidate.decision === "GATE"),
      waiting: decisions.filter((candidate) => candidate.decision === "WAIT"),
      parked: decisions.filter((candidate) => candidate.decision === "PARK"),
      remainingTokens: simulatedTokens,
      remainingSlots: simulatedSlots,
      dispatched: false,
    },
    signals,
    usage,
    computedAt: input.computedAt || new Date().toISOString(),
  };
}
