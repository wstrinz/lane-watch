import { describe, expect, test } from "bun:test";
import { defaultResourcePolicy, deriveResourceState, normalizeResourcePolicy, type ResourceCandidate, type ResourceUsage } from "../src/resources";

function candidate(overrides: Partial<ResourceCandidate> = {}): ResourceCandidate {
  return {
    id: crypto.randomUUID(),
    label: "Bounded frontier experiment",
    layer: "research",
    slotPool: "research",
    trackId: "coverage",
    workKind: "frontier",
    tokenCap: 80_000,
    priority: 2,
    blocking: false,
    ready: true,
    gateRequired: false,
    committed: false,
    expectedDelta: "Replace an unknown denominator with a reproducible benchmark.",
    reason: "Ready under the checked plan.",
    ...overrides,
  };
}

function usage(overrides: Partial<ResourceUsage> = {}): ResourceUsage {
  return {
    id: crypto.randomUUID(),
    layer: "research",
    trackId: "coverage",
    workKind: "experiment",
    tokens: 100_000,
    wallHours: 2,
    status: "complete",
    ...overrides,
  };
}

describe("resource policy", () => {
  test("normalizes malformed provisional proposals into bounded values", () => {
    const policy = normalizeResourcePolicy({
      epochTokenBudget: "not-a-number",
      waveTokenBudget: 1,
      reserveShare: 9,
      tokenCaps: { routineLane: 1, coordinatedLane: 1, synthesis: 1, strategyReview: 1 },
      slots: { strategy: -2, research: 99, custody: 2.8 },
      maxUnreportedRuns: -4,
      rationale: "Measure before granting authority.",
    });
    expect(policy).toMatchObject({
      epochTokenBudget: 1_000_000,
      waveTokenBudget: 20_000,
      reserveShare: 0.5,
      tokenCaps: { routineLane: 10_000, coordinatedLane: 20_000, synthesis: 20_000, strategyReview: 20_000 },
      slots: { strategy: 0, research: 16, custody: 2 },
      maxUnreportedRuns: 0,
      rationale: "Measure before granting authority.",
    });
  });
});

describe("shadow resource scheduler", () => {
  test("ranks frontier work, preserves gates, and never dispatches", () => {
    const policy = { ...defaultResourcePolicy(), epochTokenBudget: 500_000, reserveShare: 0.1, slots: { strategy: 1, research: 3, custody: 1 } };
    const state = deriveResourceState({
      policy,
      usage: [usage()],
      activeSlots: { strategy: 0, research: 1, custody: 0 },
      candidates: [
        candidate({ id: "maintenance", label: "Archive receipts", layer: "custody", slotPool: "custody", trackId: "decision", workKind: "maintenance", tokenCap: 20_000, priority: 1 }),
        candidate({ id: "frontier", committed: true }),
        candidate({ id: "review", label: "Epoch review", layer: "strategy", slotPool: "strategy", trackId: "shared", workKind: "coordination", tokenCap: 120_000, priority: 1, blocking: true, ready: false, gateRequired: true }),
      ],
      computedAt: "2026-08-28T12:00:00.000Z",
    });
    expect(state.ledger).toMatchObject({ epochTokenBudget: 500_000, knownTokens: 100_000, reserveTokens: 50_000, committedTokens: 80_000, schedulableTokens: 270_000 });
    expect(state.slots).toEqual({ capacity: policy.slots, active: { strategy: 0, research: 1, custody: 0 }, available: { strategy: 1, research: 2, custody: 1 } });
    expect(state.candidates.map((item: any) => [item.id, item.decision])).toEqual([["review", "GATE"], ["frontier", "SCHEDULE"], ["maintenance", "SCHEDULE"]]);
    expect(state.simulation).toMatchObject({ dispatched: false, remainingTokens: 250_000, remainingSlots: { strategy: 1, research: 1, custody: 0 } });
    expect(state.schedulerAuthority).toBe("none");
  });

  test("surfaces missing costs and overcommitment instead of pretending capacity exists", () => {
    const policy = { ...defaultResourcePolicy(), epochTokenBudget: 500_000, reserveShare: 0.1 };
    const state = deriveResourceState({
      policy,
      usage: [usage({ tokens: 400_000 }), usage({ id: "unknown", tokens: null })],
      activeSlots: { strategy: 0, research: 0, custody: 0 },
      candidates: [candidate({ id: "oversized-commitment", committed: true, tokenCap: 100_000 })],
    });
    expect(state.candidates[0]).toMatchObject({ decision: "PARK" });
    expect(state.signals.map((signal: any) => signal.id)).toEqual(["epoch-budget-pressure", "resource-cost-blindness", "overcommitted"]);
    expect(state.simulation.dispatched).toBe(false);
  });
});
