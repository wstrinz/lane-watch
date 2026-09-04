import type { StrategyTrackId } from "./strategy";

export type CustodyUrgency = "NOW" | "SOON" | "PARK";
export type CustodyStatus = "proposed" | "ready" | "parked" | "assigned" | "verifying" | "complete" | "blocked" | "failed";
export type CustodyCapability = "repair" | "verification" | "archive" | "provenance" | "portability";

export interface CustodyAcceptanceContract {
  acceptanceCriteria: string[];
  allowedPaths: string[];
  receiptType: string;
  stopCondition: string;
  /** Exact custody receipts that must settle before this contract is runnable. */
  dependsOnItemIds?: string[];
  /** Human-readable dependency references resolved to the latest matching item. */
  dependsOnTasks?: string[];
}

export const CUSTODY_OPERATOR_REPAIR_CONFIRMATION = "AUTHORIZE THIS FROZEN REPAIR";

export interface CustodyWorkItem {
  id: string;
  projectId: string;
  sourceType: string;
  sourceId: string;
  task: string;
  reason: string;
  urgency: CustodyUrgency;
  blocksResearch: boolean;
  strategicTrack: StrategyTrackId;
  capability: CustodyCapability;
  repairGeneration: number;
  effortClass: "small" | "medium";
  acceptance: CustodyAcceptanceContract;
  status: CustodyStatus;
  assignedActor: string;
  receipt: Record<string, any>;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  completedAt: string;
}

/**
 * App Server reports whole-turn usage, including the fixed system and lease
 * context. A 20k lease left effectively no working room for a fresh steward,
 * so custody envelopes must budget that fixed cost as well as task execution.
 */
export function custodyTokenCap(effortClass: "small" | "medium"): number {
  return effortClass === "medium" ? 100_000 : 50_000;
}

export function custodyReceiptTokenCeiling(item: Record<string, any>): number {
  const receipt = item?.receipt || {};
  const evidence = [
    receipt.summary,
    receipt.stopReason,
    ...(Array.isArray(receipt.checks) ? receipt.checks.map((check: any) => check?.detail) : []),
  ].filter(Boolean).join(" ");
  const match = evidence.match(/(?:fixed\s+)?([\d,]+)-token(?:\s+lease)?(?:\s+(?:budget|ceiling))?/i);
  return match ? Number(match[1].replaceAll(",", "")) : 0;
}

/** A legacy zero-effect failure that can be retried exactly once under a newer policy cap. */
export function custodyHasBudgetUpgrade(item: Record<string, any>): boolean {
  if (!["blocked", "failed"].includes(String(item?.status || ""))) return false;
  const changedPaths = Array.isArray(item?.receipt?.effects?.changedPaths) ? item.receipt.effects.changedPaths : [];
  const priorCeiling = custodyReceiptTokenCeiling(item);
  const currentCeiling = Number(item?.tokenCap || custodyTokenCap(item?.effortClass === "medium" ? "medium" : "small"));
  return changedPaths.length === 0 && priorCeiling > 0 && currentCeiling > priorCeiling;
}

const urgencyRank: Record<CustodyUrgency, number> = { NOW: 0, SOON: 1, PARK: 2 };
const statusRank: Record<CustodyStatus, number> = {
  ready: 0,
  proposed: 1,
  blocked: 2,
  assigned: 3,
  verifying: 4,
  parked: 5,
  failed: 6,
  complete: 7,
};

export function custodyContractComplete(contract: CustodyAcceptanceContract): boolean {
  return Boolean(
    Array.isArray(contract.acceptanceCriteria) && contract.acceptanceCriteria.some((item) => item.trim())
    && Array.isArray(contract.allowedPaths)
    && contract.receiptType?.trim()
    && contract.stopCondition?.trim(),
  );
}

export function deriveCustodyServiceState(items: CustodyWorkItem[], maxAutomaticRepairGeneration = 1, executorConnected = false): Record<string, any> {
  const byId = new Map(items.map((item) => [item.id, item]));
  const byTask = new Map<string, CustodyWorkItem>();
  for (const item of [...items].sort((left, right) => Date.parse(left.createdAt) - Date.parse(right.createdAt))) {
    byTask.set(item.task.trim().toLowerCase(), item);
  }
  const reshapeGroups = new Map<string, CustodyWorkItem[]>();
  for (const item of items) {
    if (item.sourceType !== "custody-reshape") continue;
    const group = reshapeGroups.get(item.sourceId) || [];
    group.push(item);
    reshapeGroups.set(item.sourceId, group);
  }
  const legacySequenceRank = (item: CustodyWorkItem): number => {
    const task = item.task.trim().toLowerCase();
    if (task.startsWith("inventory ")) return 0;
    if (task.startsWith("bind ") && /\bto\b.*\binventory\b/.test(task)) return 1;
    if (task.startsWith("bind ")) return 0;
    if (task.startsWith("verify ")) return 1;
    if (task.startsWith("replay ")) return 2;
    if (task.startsWith("reconcile ")) return 3;
    if (task.startsWith("apply ")) return 4;
    return 2;
  };
  const previousSibling = new Map<string, string>();
  for (const group of reshapeGroups.values()) {
    const legacy = group.every((item) => !Object.prototype.hasOwnProperty.call(item.acceptance, "dependsOnItemIds"));
    group.sort((left, right) => (legacy ? legacySequenceRank(left) - legacySequenceRank(right) : 0)
      || Date.parse(left.createdAt) - Date.parse(right.createdAt)
      || left.task.localeCompare(right.task));
    for (let index = 1; index < group.length; index += 1) {
      // New reshapes persist exact item IDs. Only infer order for legacy rows
      // whose acceptance JSON predates dependency metadata.
      if (!Object.prototype.hasOwnProperty.call(group[index].acceptance, "dependsOnItemIds")) {
        previousSibling.set(group[index].id, group[index - 1].id);
      }
    }
  }
  const rawDependencyIds = (item: CustodyWorkItem, seen = new Set<string>()): string[] => {
    if (seen.has(item.id)) return [];
    const nextSeen = new Set(seen).add(item.id);
    const explicitIds = Array.isArray(item.acceptance.dependsOnItemIds) ? item.acceptance.dependsOnItemIds : [];
    const taskIds = (Array.isArray(item.acceptance.dependsOnTasks) ? item.acceptance.dependsOnTasks : [])
      .map((task) => byTask.get(task.trim().toLowerCase())?.id || "").filter(Boolean);
    const siblingId = previousSibling.get(item.id);
    // A reshape narrows a contract; it does not erase the source contract's
    // prerequisites. This also repairs ordering for successors created before
    // dependency metadata existed.
    const inherited = item.sourceType === "custody-reshape" && byId.has(item.sourceId)
      ? rawDependencyIds(byId.get(item.sourceId)!, nextSeen)
      : [];
    return [...new Set([...explicitIds, ...taskIds, ...(siblingId ? [siblingId] : []), ...inherited])]
      .filter((id) => id !== item.id);
  };
  const terminalDependencyId = (id: string, seen = new Set<string>()): string => {
    if (seen.has(id)) return id;
    const dependency = byId.get(id);
    if (!dependency || dependency.receipt?.status !== "SUPERSEDED") return id;
    const successors = [...(reshapeGroups.get(id) || [])]
      .sort((left, right) => Date.parse(left.createdAt) - Date.parse(right.createdAt));
    return successors.length
      ? terminalDependencyId(successors[successors.length - 1].id, new Set(seen).add(id))
      : id;
  };
  const decorated = items.map((item) => {
    const contractComplete = custodyContractComplete(item.acceptance);
    const automaticGenerationAllowed = item.repairGeneration <= maxAutomaticRepairGeneration;
    const operatorGenerationApproval = item.status === "ready"
      && item.receipt?.operatorAuthorization?.schema === "campaign-custody-operator-authorization/v1"
      && item.receipt?.operatorAuthorization?.scope === "single-ready-transition"
      && item.receipt?.operatorAuthorization?.itemId === item.id
      && Number(item.receipt?.operatorAuthorization?.repairGeneration) === item.repairGeneration;
    const generationAllowed = automaticGenerationAllowed || operatorGenerationApproval;
    const dependencyItemIds = [...new Set(rawDependencyIds(item).map((id) => terminalDependencyId(id)))];
    const dependencies = dependencyItemIds.map((id) => {
      const dependency = byId.get(id);
      return { id, task: dependency?.task || "Missing custody predecessor", status: dependency?.status || "missing" };
    });
    const missingDependencies = dependencies.filter((dependency) => dependency.status !== "complete");
    const dependenciesSatisfied = missingDependencies.length === 0;
    return {
      ...item,
      tokenCap: custodyTokenCap(item.effortClass),
      contractComplete,
      generationAllowed,
      automaticGenerationAllowed,
      operatorGenerationApproval,
      dependencyItemIds,
      dependencies,
      missingDependencies,
      dependenciesSatisfied,
      eligibleToReady: item.status === "proposed" && contractComplete && generationAllowed && dependenciesSatisfied,
      eligibleToRetry: ["blocked", "failed"].includes(item.status) && contractComplete && generationAllowed,
      executorEligible: item.status === "ready" && contractComplete && generationAllowed && dependenciesSatisfied,
    };
  }).sort((left, right) => {
    if (left.blocksResearch !== right.blocksResearch) return left.blocksResearch ? -1 : 1;
    const statusDifference = statusRank[left.status] - statusRank[right.status];
    if (statusDifference) return statusDifference;
    const urgencyDifference = urgencyRank[left.urgency] - urgencyRank[right.urgency];
    if (urgencyDifference) return urgencyDifference;
    return Date.parse(left.createdAt) - Date.parse(right.createdAt);
  });
  const open = decorated.filter((item) => item.status !== "complete");
  const violations = decorated.flatMap((item) => {
    const result: Array<Record<string, any>> = [];
    if (!item.contractComplete) result.push({ itemId: item.id, kind: "incomplete-contract", detail: "Custody work cannot become ready without acceptance criteria, a receipt type, and a stop condition." });
    if (!item.generationAllowed) result.push({ itemId: item.id, kind: "repair-generation-limit", detail: `Repair generation ${item.repairGeneration} exceeds the automatic limit ${maxAutomaticRepairGeneration}.` });
    return result;
  });
  return {
    schema: "campaign-custody-service/v1",
    mode: executorConnected ? "bounded-autopilot-ready" : "shadow",
    executorConnected,
    executorEligible: decorated.filter((item) => item.executorEligible).length,
    adapters: [
      {
        id: "terra-local-steward",
        label: "Terra local steward",
        status: executorConnected ? "ready" : "disconnected",
        capabilities: ["repair", "verification", "archive", "provenance", "portability"],
        boundary: "Consumes only exact leases in detached worktrees; a human click or active loop may dispatch and land mechanically verified receipts, but neither may choose research direction, promote claims, merge, push, or spawn children.",
      },
    ],
    counts: {
      total: decorated.length,
      open: open.length,
      proposed: decorated.filter((item) => item.status === "proposed").length,
      ready: decorated.filter((item) => item.status === "ready").length,
      parked: decorated.filter((item) => item.status === "parked").length,
      active: decorated.filter((item) => ["assigned", "verifying"].includes(item.status)).length,
      failed: decorated.filter((item) => item.status === "failed").length,
      complete: decorated.filter((item) => item.status === "complete").length,
      blocking: open.filter((item) => item.blocksResearch && item.status !== "parked").length,
    },
    policy: {
      maxAutomaticRepairGeneration,
      chargeToStrategicTrack: true,
      readyDoesNotDispatch: true,
      leaseConfirmationAuthority: "human-or-active-loop",
      receiptLandingAuthority: "human-or-active-loop-when-landable",
      promotionAuthority: "human",
      claimPromotionAuthority: "outside-custody-service",
    },
    violations,
    items: decorated,
  };
}
