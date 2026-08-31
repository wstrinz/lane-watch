import type { StrategyTrackId } from "./strategy";

export type CustodyUrgency = "NOW" | "SOON" | "PARK";
export type CustodyStatus = "proposed" | "ready" | "parked" | "assigned" | "verifying" | "complete" | "blocked" | "failed";
export type CustodyCapability = "repair" | "verification" | "archive" | "provenance" | "portability";

export interface CustodyAcceptanceContract {
  acceptanceCriteria: string[];
  allowedPaths: string[];
  receiptType: string;
  stopCondition: string;
}

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
  const decorated = items.map((item) => {
    const contractComplete = custodyContractComplete(item.acceptance);
    const generationAllowed = item.repairGeneration <= maxAutomaticRepairGeneration;
    return {
      ...item,
      contractComplete,
      generationAllowed,
      eligibleToReady: item.status === "proposed" && contractComplete && generationAllowed,
      executorEligible: item.status === "ready" && contractComplete && generationAllowed,
    };
  }).sort((left, right) => {
    if (left.blocksResearch !== right.blocksResearch) return left.blocksResearch ? -1 : 1;
    const statusDifference = statusRank[left.status] - statusRank[right.status];
    if (statusDifference) return statusDifference;
    const urgencyDifference = urgencyRank[left.urgency] - urgencyRank[right.urgency];
    if (urgencyDifference) return urgencyDifference;
    return Date.parse(left.createdAt) - Date.parse(right.createdAt);
  });
  const open = decorated.filter((item) => !["complete", "failed"].includes(item.status));
  const violations = decorated.flatMap((item) => {
    const result: Array<Record<string, any>> = [];
    if (!item.contractComplete) result.push({ itemId: item.id, kind: "incomplete-contract", detail: "Custody work cannot become ready without acceptance criteria, a receipt type, and a stop condition." });
    if (!item.generationAllowed) result.push({ itemId: item.id, kind: "repair-generation-limit", detail: `Repair generation ${item.repairGeneration} exceeds the automatic limit ${maxAutomaticRepairGeneration}.` });
    return result;
  });
  return {
    schema: "campaign-custody-service/v1",
    mode: executorConnected ? "human-gated" : "shadow",
    executorConnected,
    executorEligible: decorated.filter((item) => item.executorEligible).length,
    adapters: [
      {
        id: "terra-local-steward",
        label: "Terra local steward",
        status: executorConnected ? "ready" : "disconnected",
        capabilities: ["repair", "verification", "archive", "provenance", "portability"],
        boundary: "Consumes only exact operator-confirmed leases in detached worktrees; cannot choose research direction, promote claims, merge, push, or spawn children.",
      },
    ],
    counts: {
      total: decorated.length,
      open: open.length,
      proposed: decorated.filter((item) => item.status === "proposed").length,
      ready: decorated.filter((item) => item.status === "ready").length,
      parked: decorated.filter((item) => item.status === "parked").length,
      active: decorated.filter((item) => ["assigned", "verifying"].includes(item.status)).length,
      complete: decorated.filter((item) => item.status === "complete").length,
      blocking: open.filter((item) => item.blocksResearch && item.status !== "parked").length,
    },
    policy: {
      maxAutomaticRepairGeneration,
      chargeToStrategicTrack: true,
      readyDoesNotDispatch: true,
      leaseConfirmationAuthority: "human",
      receiptLandingAuthority: "human",
      promotionAuthority: "human",
      claimPromotionAuthority: "outside-custody-service",
    },
    violations,
    items: decorated,
  };
}
