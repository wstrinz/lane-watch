export interface AutopilotStartCandidate {
  taskId: string;
  tokenBudget: number;
  dependencyReady: boolean;
  requiresOperatorRelease: boolean;
}

export interface AutopilotStartReadiness {
  canStart: boolean;
  code: "READY" | "PHASE_BLOCKED" | "PLAN_NOT_READY" | "NO_RUNNABLE_FRONTIER" | "NO_RESEARCH_SLOT" | "EPOCH_BUDGET" | "SCHEDULE_CONFIRMATION";
  blocker: string;
  effectiveTokenLimit: number;
  minimumRunnableTokenCap: number;
  runnableTasks: string[];
}

export function evaluateAutopilotStartReadiness(input: {
  phase: string;
  planStatus?: string;
  planDecision?: string;
  candidates?: AutopilotStartCandidate[];
  spendableEpochTokens?: number;
  waveTokenBudget?: number;
  availableResearchSlots?: number;
  scheduleStatus?: string;
}): AutopilotStartReadiness {
  const ready = (overrides: Partial<AutopilotStartReadiness> = {}): AutopilotStartReadiness => ({
    canStart: true,
    code: "READY",
    blocker: "",
    effectiveTokenLimit: 0,
    minimumRunnableTokenCap: 0,
    runnableTasks: [],
    ...overrides,
  });
  const blocked = (code: AutopilotStartReadiness["code"], blocker: string, overrides: Partial<AutopilotStartReadiness> = {}): AutopilotStartReadiness => ({
    ...ready(),
    canStart: false,
    code,
    blocker,
    ...overrides,
  });

  if (["BLOCKED", "NEXT_WAVE_READY"].includes(input.phase)) {
    return blocked("PHASE_BLOCKED", `Resolve or adopt the ${input.phase} campaign boundary before starting another loop.`);
  }
  if (input.phase === "RESEARCH_READY" && input.scheduleStatus === "proposed") {
    return blocked("SCHEDULE_CONFIRMATION", "Review and explicitly confirm the proposed immutable wave schedule before automation can continue.");
  }
  if (!(["RESEARCH_REVIEW", "RESEARCH_READY"].includes(input.phase))) return ready();
  if (input.phase === "RESEARCH_REVIEW" && input.planStatus !== "drafted") return ready();
  if (input.phase === "RESEARCH_REVIEW" && input.planDecision !== "READY_FOR_GATE") {
    return blocked("PLAN_NOT_READY", `The checked coordinator plan is ${input.planDecision || "not ready"}; resolve or revise it before starting automation.`);
  }
  if (input.phase === "RESEARCH_READY" && input.scheduleStatus === "confirmed") return ready();

  const runnable = (input.candidates || []).filter((candidate) => candidate.dependencyReady && !candidate.requiresOperatorRelease);
  const runnableTasks = runnable.map((candidate) => candidate.taskId);
  if (!runnable.length) {
    return blocked("NO_RUNNABLE_FRONTIER", "The checked plan has no dependency-ready immutable launch contract. Land its predecessor evidence or revise the plan before starting automation.", { runnableTasks });
  }
  const slots = Math.max(0, Math.floor(Number(input.availableResearchSlots) || 0));
  if (!slots) {
    return blocked("NO_RESEARCH_SLOT", "No research slot is currently available for the checked launch frontier.", { runnableTasks });
  }
  const spendable = Math.max(0, Math.floor(Number(input.spendableEpochTokens) || 0));
  const waveLimit = Math.max(0, Math.floor(Number(input.waveTokenBudget) || 0));
  const effectiveTokenLimit = Math.min(spendable, waveLimit);
  const minimumRunnableTokenCap = Math.min(...runnable.map((candidate) => Math.max(0, Math.floor(Number(candidate.tokenBudget) || 0))));
  if (minimumRunnableTokenCap > effectiveTokenLimit) {
    return blocked(
      "EPOCH_BUDGET",
      `The cheapest dependency-ready contract needs ${minimumRunnableTokenCap.toLocaleString()} tokens, but this epoch has only ${effectiveTokenLimit.toLocaleString()} schedulable. Recenter or activate a fresh resource envelope before starting automation.`,
      { effectiveTokenLimit, minimumRunnableTokenCap, runnableTasks },
    );
  }
  return ready({ effectiveTokenLimit, minimumRunnableTokenCap, runnableTasks });
}
