import type { ResourcePolicy } from "./resources";

export interface ScheduledLaunchSpec {
  taskId: string;
  priority: number;
  dependsOnTaskId?: string;
  dependsOnTaskIds?: string[];
  dependsOnEvidenceStatuses?: Array<"complete" | "blocked">;
  requiresOperatorRelease?: boolean;
  profile: string;
  host: "windows";
  model: string;
  effort: string;
  fanout: number;
  packetPath: string;
  baseRef: string;
  evidencePath: string;
  timeoutMinutes: number;
  tokenBudget: number;
  tools: string[];
  outputContract: string;
}

export interface WaveScheduleCandidate {
  requestId: string;
  question: string;
  expectedDelta: string;
  trackId: string;
  workKind: string;
  dependencyReady: boolean;
  dependencyReason: string;
  spec: ScheduledLaunchSpec;
}

export type WaveScheduleDecision = "RESERVE" | "WAIT_DEPENDENCY" | "WAIT_SLOT" | "PARK_BUDGET" | "OPERATOR_GATE" | "INVALID_CONTRACT";

export interface WaveScheduleMember {
  requestId: string;
  taskId: string;
  ordinal: number;
  decision: WaveScheduleDecision;
  decisionReason: string;
  tokenCap: number;
  profile: string;
  model: string;
  effort: string;
  fanout: number;
  trackId: string;
  workKind: string;
  expectedDelta: string;
  dependencies: string[];
  launchSpec: ScheduledLaunchSpec;
}

export interface WaveScheduleProposal {
  schema: "campaign-wave-schedule/v1";
  mode: "human-gated";
  authority: "none-until-confirmed";
  projectId: string;
  waveId: string;
  planDigest: string;
  resourceDigest: string;
  status: "PROPOSED";
  budget: {
    policyWaveTokens: number;
    spendableEpochTokens: number;
    effectiveTokenLimit: number;
    reservedTokens: number;
    remainingTokens: number;
  };
  slots: {
    capacity: number;
    active: number;
    available: number;
    reserved: number;
  };
  members: WaveScheduleMember[];
  deferred: WaveScheduleMember[];
  invariants: {
    valid: boolean;
    uniqueRequests: boolean;
    uniqueTasks: boolean;
    immutableContracts: boolean;
    withinTokenLimit: boolean;
    withinSlotLimit: boolean;
    nonEmpty: boolean;
    humanConfirmationRequired: true;
    dispatched: false;
  };
  summary: string;
  createdAt: string;
}

function canonical(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    return `{${Object.keys(record).sort().map((key) => `${JSON.stringify(key)}:${canonical(record[key])}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

export function waveScheduleDigest(value: unknown): string {
  const hasher = new Bun.CryptoHasher("sha256");
  hasher.update(canonical(value));
  return `sha256:${hasher.digest("hex")}`;
}

function dependencies(spec: ScheduledLaunchSpec): string[] {
  return spec.dependsOnTaskIds?.length ? [...spec.dependsOnTaskIds] : spec.dependsOnTaskId ? [spec.dependsOnTaskId] : [];
}

function contractValid(spec: ScheduledLaunchSpec): boolean {
  return Boolean(spec.taskId && spec.packetPath && spec.baseRef && spec.evidencePath && spec.outputContract === "cfg23-research-evidence/v1"
    && Number.isFinite(spec.tokenBudget) && spec.tokenBudget > 0);
}

export function buildWaveSchedule(input: {
  projectId: string;
  waveId: string;
  planDigest: string;
  resourceDigest: string;
  policy: ResourcePolicy;
  spendableEpochTokens: number;
  activeResearchSlots: number;
  candidates: WaveScheduleCandidate[];
  createdAt: string;
}): WaveScheduleProposal {
  const capacity = Math.max(0, input.policy.slots.research);
  const available = Math.max(0, capacity - Math.max(0, input.activeResearchSlots));
  const effectiveTokenLimit = Math.max(0, Math.min(input.policy.waveTokenBudget, input.spendableEpochTokens));
  const sorted = [...input.candidates].sort((left, right) => left.spec.priority - right.spec.priority
    || left.spec.tokenBudget - right.spec.tokenBudget
    || left.spec.taskId.localeCompare(right.spec.taskId));
  const seenRequests = new Set<string>();
  const seenTasks = new Set<string>();
  let reservedTokens = 0;
  let reservedSlots = 0;
  const decisions: WaveScheduleMember[] = sorted.map((candidate, index) => {
    const tokenCap = Math.max(0, Math.floor(candidate.spec.tokenBudget));
    let decision: WaveScheduleDecision = "RESERVE";
    let decisionReason = "Fits the checked contract, current dependency frontier, research slots, and wave token envelope.";
    if (seenRequests.has(candidate.requestId) || seenTasks.has(candidate.spec.taskId) || !contractValid(candidate.spec)) {
      decision = "INVALID_CONTRACT";
      decisionReason = "The checked schedule input has a duplicate identity or incomplete immutable launch contract.";
    } else if (candidate.spec.requiresOperatorRelease) {
      decision = "OPERATOR_GATE";
      decisionReason = "This contract declares a distinct operator-release dependency and cannot be included in the wave gate.";
    } else if (!candidate.dependencyReady) {
      decision = "WAIT_DEPENDENCY";
      decisionReason = candidate.dependencyReason || "Required predecessor evidence has not landed.";
    } else if (reservedSlots >= available) {
      decision = "WAIT_SLOT";
      decisionReason = `The ${available} currently available research slot${available === 1 ? " is" : "s are"} already reserved by higher-ranked members.`;
    } else if (reservedTokens + tokenCap > effectiveTokenLimit) {
      decision = "PARK_BUDGET";
      decisionReason = `Adding this ${tokenCap.toLocaleString()} token cap would exceed the ${effectiveTokenLimit.toLocaleString()} effective wave envelope.`;
    }
    seenRequests.add(candidate.requestId);
    seenTasks.add(candidate.spec.taskId);
    if (decision === "RESERVE") {
      reservedSlots += 1;
      reservedTokens += tokenCap;
    }
    return {
      requestId: candidate.requestId,
      taskId: candidate.spec.taskId,
      ordinal: index + 1,
      decision,
      decisionReason,
      tokenCap,
      profile: candidate.spec.profile,
      model: candidate.spec.model,
      effort: candidate.spec.effort,
      fanout: candidate.spec.fanout,
      trackId: candidate.trackId,
      workKind: candidate.workKind,
      expectedDelta: candidate.expectedDelta,
      dependencies: dependencies(candidate.spec),
      launchSpec: { ...candidate.spec, dependsOnTaskIds: [...(candidate.spec.dependsOnTaskIds || [])], tools: [...candidate.spec.tools] },
    };
  });
  const members = decisions.filter((candidate) => candidate.decision === "RESERVE");
  const deferred = decisions.filter((candidate) => candidate.decision !== "RESERVE");
  const uniqueRequests = new Set(decisions.map((candidate) => candidate.requestId)).size === decisions.length;
  const uniqueTasks = new Set(decisions.map((candidate) => candidate.taskId)).size === decisions.length;
  const immutableContracts = members.every((member) => contractValid(member.launchSpec));
  const withinTokenLimit = reservedTokens <= effectiveTokenLimit;
  const withinSlotLimit = members.length <= available;
  const nonEmpty = members.length > 0;
  return {
    schema: "campaign-wave-schedule/v1",
    mode: "human-gated",
    authority: "none-until-confirmed",
    projectId: input.projectId,
    waveId: input.waveId,
    planDigest: input.planDigest,
    resourceDigest: input.resourceDigest,
    status: "PROPOSED",
    budget: {
      policyWaveTokens: input.policy.waveTokenBudget,
      spendableEpochTokens: input.spendableEpochTokens,
      effectiveTokenLimit,
      reservedTokens,
      remainingTokens: Math.max(0, effectiveTokenLimit - reservedTokens),
    },
    slots: { capacity, active: input.activeResearchSlots, available, reserved: members.length },
    members,
    deferred,
    invariants: {
      valid: uniqueRequests && uniqueTasks && immutableContracts && withinTokenLimit && withinSlotLimit && nonEmpty,
      uniqueRequests,
      uniqueTasks,
      immutableContracts,
      withinTokenLimit,
      withinSlotLimit,
      nonEmpty,
      humanConfirmationRequired: true,
      dispatched: false,
    },
    summary: `${members.length} dependency-safe member${members.length === 1 ? "" : "s"} reserve ${reservedTokens.toLocaleString()} tokens across ${members.length} of ${available} available research slots; ${deferred.length} candidate${deferred.length === 1 ? " is" : "s are"} deferred.`,
    createdAt: input.createdAt,
  };
}
