import { describe, expect, test } from "bun:test";
import { evaluateAutopilotStartReadiness } from "../src/autopilot-readiness";

const row41 = {
  taskId: "v4-bs12-row41-forbidden-condition-coverage-v1",
  tokenBudget: 80_000,
  dependencyReady: true,
  requiresOperatorRelease: false,
};

describe("autopilot start readiness", () => {
  test("blocks before approving a checked plan when the epoch cannot reserve its cheapest runnable contract", () => {
    expect(evaluateAutopilotStartReadiness({
      phase: "RESEARCH_REVIEW",
      planStatus: "drafted",
      planDecision: "READY_FOR_GATE",
      candidates: [row41],
      spendableEpochTokens: 4_906,
      waveTokenBudget: 240_000,
      availableResearchSlots: 3,
    })).toEqual({
      canStart: false,
      code: "EPOCH_BUDGET",
      blocker: "The cheapest dependency-ready contract needs 80,000 tokens, but this epoch has only 4,906 schedulable. Recenter or activate a fresh resource envelope before starting automation.",
      effectiveTokenLimit: 4_906,
      minimumRunnableTokenCap: 80_000,
      runnableTasks: [row41.taskId],
    });
  });

  test("allows a checked plan when one dependency-ready contract fits the wave and epoch envelopes", () => {
    expect(evaluateAutopilotStartReadiness({
      phase: "RESEARCH_REVIEW",
      planStatus: "drafted",
      planDecision: "READY_FOR_GATE",
      candidates: [row41],
      spendableEpochTokens: 160_000,
      waveTokenBudget: 120_000,
      availableResearchSlots: 1,
    })).toMatchObject({
      canStart: true,
      code: "READY",
      effectiveTokenLimit: 120_000,
      minimumRunnableTokenCap: 80_000,
    });
  });

  test("keeps proposed schedules at their explicit operator confirmation gate", () => {
    expect(evaluateAutopilotStartReadiness({
      phase: "RESEARCH_READY",
      scheduleStatus: "proposed",
    })).toMatchObject({
      canStart: false,
      code: "SCHEDULE_CONFIRMATION",
    });
  });

  test("admits a dependency-only plan when bounded custody can advance it", () => {
    expect(evaluateAutopilotStartReadiness({
      phase: "RESEARCH_REVIEW",
      planStatus: "drafted",
      planDecision: "READY_FOR_GATE",
      candidates: [],
      custodyCandidates: [{ taskId: "custody:named-pool replay", tokenBudget: 50_000, active: false }],
      spendableEpochTokens: 300_000,
      waveTokenBudget: 120_000,
      availableResearchSlots: 3,
      availableCustodySlots: 1,
    })).toMatchObject({
      canStart: true,
      code: "READY",
      minimumRunnableTokenCap: 50_000,
      runnableTasks: ["custody:named-pool replay"],
    });
  });

  test("does not let an old confirmed research schedule bypass a blocking custody budget", () => {
    const result = evaluateAutopilotStartReadiness({
      phase: "RESEARCH_READY",
      scheduleStatus: "confirmed",
      custodyCandidates: [{ taskId: "custody:legacy lease recovery", tokenBudget: 50_000, active: false }],
      spendableEpochTokens: 0,
      waveTokenBudget: 240_000,
      availableResearchSlots: 2,
      availableCustodySlots: 1,
    });

    expect(result).toMatchObject({ canStart: false, code: "EPOCH_BUDGET", minimumRunnableTokenCap: 50_000 });
  });
});
