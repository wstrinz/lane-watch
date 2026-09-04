import { createHash } from "node:crypto";
import { custodyTokenCap, type CustodyWorkItem } from "./custody";

export interface CustodyLeaseBudget {
  maxTokens: number;
  maxMinutes: number;
  maxChangedPaths: number;
}

export interface CustodyLeaseEnvelope {
  schema: "campaign-custody-lease/v1";
  leaseId: string;
  projectId: string;
  itemId: string;
  adapter: {
    id: string;
    capability: string;
    executionMode: "disconnected" | "isolated-worktree";
  };
  workspace?: {
    sourceRoot: string;
    repositoryRoot: string;
    projectRelativePath: string;
    baseCommit: string;
    isolation: "detached-worktree";
  };
  campaignBoundary: {
    phase: string;
    version: number;
    charterRevision: number;
    epochId: string;
  };
  issuedAt: string;
  expiresAt: string;
  contract: {
    task: string;
    reason: string;
    strategicTrack: string;
    capability: string;
    repairGeneration: number;
    effortClass: string;
    blocksResearch: boolean;
    acceptance: CustodyWorkItem["acceptance"];
  };
  contractDigest: string;
  budget: CustodyLeaseBudget;
  authority: {
    allowedEffects: string[];
    forbiddenEffects: string[];
    claimPromotion: false;
    researchDirection: false;
    workerDispatch: false;
  };
  leaseDigest: string;
}

export interface CustodyProtocolReceipt {
  schema: "campaign-custody-protocol-receipt/v1";
  mode: "simulation";
  leaseId: string;
  leaseDigest: string;
  contractDigest: string;
  adapterId: string;
  status: "PROTOCOL_OK";
  effects: {
    changedPaths: string[];
    claimPromotions: string[];
    dispatches: string[];
  };
  usage: { tokens: number; minutes: number };
  checks: Array<{ id: string; status: "PASS"; detail: string }>;
  replayKey: string;
}

function canonical(value: unknown): string {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
  return `{${Object.entries(value as Record<string, unknown>)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, nested]) => `${JSON.stringify(key)}:${canonical(nested)}`)
    .join(",")}}`;
}

export function protocolDigest(value: unknown): string {
  return `sha256:${createHash("sha256").update(canonical(value)).digest("hex")}`;
}

export function custodyBudgetFor(item: CustodyWorkItem): CustodyLeaseBudget {
  return item.effortClass === "medium"
    ? { maxTokens: custodyTokenCap("medium"), maxMinutes: 90, maxChangedPaths: 20 }
    : { maxTokens: custodyTokenCap("small"), maxMinutes: 30, maxChangedPaths: 8 };
}

function acceptanceForCurrentBudget(item: CustodyWorkItem, budget: CustodyLeaseBudget): CustodyWorkItem["acceptance"] {
  const legacyCeiling = item.effortClass === "medium" ? 50_000 : 20_000;
  if (budget.maxTokens <= legacyCeiling) return item.acceptance;
  const legacyLabel = legacyCeiling.toLocaleString("en-US");
  return {
    ...item.acceptance,
    stopCondition: item.acceptance.stopCondition.replaceAll(
      legacyLabel + " tokens",
      budget.maxTokens.toLocaleString("en-US") + " tokens",
    ),
  };
}

export function createCustodyLease(input: {
  leaseId: string;
  item: CustodyWorkItem;
  campaignBoundary: CustodyLeaseEnvelope["campaignBoundary"];
  issuedAt: string;
  expiresAt: string;
  adapterId?: string;
  executionMode?: "disconnected" | "isolated-worktree";
  workspace?: CustodyLeaseEnvelope["workspace"];
}): CustodyLeaseEnvelope {
  const budget = custodyBudgetFor(input.item);
  const contract = {
    task: input.item.task,
    reason: input.item.reason,
    strategicTrack: input.item.strategicTrack,
    capability: input.item.capability,
    repairGeneration: input.item.repairGeneration,
    effortClass: input.item.effortClass,
    blocksResearch: input.item.blocksResearch,
    acceptance: acceptanceForCurrentBudget(input.item, budget),
  };
  const body = {
    schema: "campaign-custody-lease/v1" as const,
    leaseId: input.leaseId,
    projectId: input.item.projectId,
    itemId: input.item.id,
    adapter: { id: input.adapterId || "terra-local-steward", capability: input.item.capability, executionMode: input.executionMode || "disconnected" },
    ...(input.workspace ? { workspace: input.workspace } : {}),
    campaignBoundary: input.campaignBoundary,
    issuedAt: input.issuedAt,
    expiresAt: input.expiresAt,
    contract,
    contractDigest: protocolDigest(contract),
    budget,
    authority: {
      allowedEffects: ["isolated-bounded-path-repair", "verification", "receipt-emission", "detached-producer-commit"],
      forbiddenEffects: ["research-direction", "claim-promotion", "worker-dispatch", "merge", "push", "unlisted-path-change"],
      claimPromotion: false as const,
      researchDirection: false as const,
      workerDispatch: false as const,
    },
  };
  return { ...body, leaseDigest: protocolDigest(body) };
}

export function simulateCustodyProtocol(lease: CustodyLeaseEnvelope): CustodyProtocolReceipt {
  const replaySeed = {
    schema: "campaign-custody-protocol-simulation/v1",
    leaseId: lease.leaseId,
    leaseDigest: lease.leaseDigest,
    contractDigest: lease.contractDigest,
    budget: lease.budget,
  };
  return {
    schema: "campaign-custody-protocol-receipt/v1",
    mode: "simulation",
    leaseId: lease.leaseId,
    leaseDigest: lease.leaseDigest,
    contractDigest: lease.contractDigest,
    adapterId: "protocol-simulator",
    status: "PROTOCOL_OK",
    effects: { changedPaths: [], claimPromotions: [], dispatches: [] },
    usage: { tokens: 0, minutes: 0 },
    checks: [
      { id: "lease-binding", status: "PASS", detail: "Receipt binds the immutable lease and contract digests." },
      { id: "authority-boundary", status: "PASS", detail: "Simulation produced no file, claim, dispatch, merge, or push effect." },
      { id: "budget-boundary", status: "PASS", detail: "Zero simulated usage is within the fixed lease budget." },
      { id: "replay-determinism", status: "PASS", detail: "The replay key is derived solely from immutable protocol inputs." },
    ],
    replayKey: protocolDigest(replaySeed),
  };
}

export function verifyCustodyProtocolReceipt(lease: CustodyLeaseEnvelope, receipt: CustodyProtocolReceipt): Record<string, any> {
  const errors: string[] = [];
  const { leaseDigest: _storedDigest, ...leaseBody } = lease;
  const computedLeaseDigest = protocolDigest(leaseBody);
  if (lease.leaseDigest !== computedLeaseDigest) errors.push("Lease digest does not match its canonical envelope.");
  if (receipt.schema !== "campaign-custody-protocol-receipt/v1") errors.push("Receipt schema is unsupported.");
  if (receipt.mode !== "simulation") errors.push("Only simulation receipts are accepted while the executor is disconnected.");
  if (receipt.leaseId !== lease.leaseId || receipt.leaseDigest !== lease.leaseDigest) errors.push("Receipt is not bound to this lease.");
  if (receipt.contractDigest !== lease.contractDigest) errors.push("Receipt contract digest does not match the lease.");
  if (receipt.usage.tokens > lease.budget.maxTokens || receipt.usage.minutes > lease.budget.maxMinutes) errors.push("Receipt exceeds its fixed resource budget.");
  if (receipt.effects.changedPaths.length > lease.budget.maxChangedPaths) errors.push("Receipt exceeds the changed-path budget.");
  if (receipt.effects.claimPromotions.length) errors.push("Custody receipts cannot promote claims.");
  if (receipt.effects.dispatches.length) errors.push("Custody receipts cannot dispatch workers.");
  if (receipt.effects.changedPaths.length) errors.push("Protocol simulation cannot report real file effects.");
  const expected = simulateCustodyProtocol(lease);
  if (receipt.replayKey !== expected.replayKey) errors.push("Receipt replay key is not deterministic for this lease.");
  return {
    ok: errors.length === 0,
    errors,
    leaseDigest: computedLeaseDigest,
    receiptDigest: protocolDigest(receipt),
    replayKey: receipt.replayKey,
    executorConnected: false,
    realEffects: false,
  };
}
