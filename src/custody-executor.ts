import type { CustodyLeaseEnvelope } from "./custody-protocol";

export type CustodyExecutionOutcome = "COMPLETED" | "BLOCKED" | "FAILED";
export type CustodyCheckStatus = "PASS" | "FAIL" | "BLOCK";

export interface CustodyExecutorReport {
  status: CustodyExecutionOutcome;
  summary: string;
  stopReason: string;
  changedPaths: string[];
  checks: Array<{ id: string; status: CustodyCheckStatus; detail: string }>;
}

export interface CustodyExecutionReceipt {
  schema: "campaign-custody-execution-receipt/v1";
  mode: "isolated-worktree";
  leaseId: string;
  leaseDigest: string;
  contractDigest: string;
  adapterId: string;
  status: CustodyExecutionOutcome;
  summary: string;
  stopReason: string;
  effects: {
    changedPaths: string[];
    claimPromotions: string[];
    dispatches: string[];
    merges: string[];
    pushes: string[];
  };
  usage: {
    tokens: number | null;
    minutes: number;
    tokenMeasurement: "app-server" | "unavailable";
  };
  checks: Array<{ id: string; status: CustodyCheckStatus; detail: string }>;
  executorReport: CustodyExecutorReport;
  producerCommit: string;
  completedAt: string;
}

export interface CustodyExecutionMeasurement {
  actualChangedPaths: string[];
  actualHead: string;
  measuredMinutes: number;
  measuredTokens: number | null;
  completedAt: string;
  producerCommit?: string;
}

function normalizedPath(value: string): string {
  return value.replace(/\\/g, "/").replace(/^\.\//, "").replace(/\/{2,}/g, "/");
}

function escapeRegex(value: string): string {
  return value.replace(/[|\\{}()[\]^$+?.]/g, "\\$&");
}

/** Match the deliberately small Git-glob subset used by custody contracts. */
export function custodyPathAllowed(path: string, patterns: string[]): boolean {
  const candidate = normalizedPath(path);
  return patterns.some((rawPattern) => {
    const pattern = normalizedPath(rawPattern.trim());
    if (!pattern) return false;
    let expression = "";
    for (let index = 0; index < pattern.length;) {
      if (pattern.slice(index, index + 3) === "**/") {
        expression += "(?:.*/)?";
        index += 3;
      } else if (pattern.slice(index, index + 2) === "**") {
        expression += ".*";
        index += 2;
      } else if (pattern[index] === "*") {
        expression += "[^/]*";
        index += 1;
      } else {
        expression += escapeRegex(pattern[index]);
        index += 1;
      }
    }
    return new RegExp(`^${expression}$`, "i").test(candidate);
  });
}

export function custodyExecutorReportSchema(): Record<string, unknown> {
  const check = {
    type: "object",
    additionalProperties: false,
    required: ["id", "status", "detail"],
    properties: {
      id: { type: "string", minLength: 1, maxLength: 120 },
      status: { type: "string", enum: ["PASS", "FAIL", "BLOCK"] },
      detail: { type: "string", minLength: 1, maxLength: 2_000 },
    },
  };
  return {
    type: "object",
    additionalProperties: false,
    required: ["status", "summary", "stopReason", "changedPaths", "checks"],
    properties: {
      status: { type: "string", enum: ["COMPLETED", "BLOCKED", "FAILED"] },
      summary: { type: "string", minLength: 1, maxLength: 4_000 },
      stopReason: { type: "string", maxLength: 2_000 },
      changedPaths: { type: "array", maxItems: 64, items: { type: "string", minLength: 1, maxLength: 500 } },
      checks: { type: "array", minItems: 1, maxItems: 40, items: check },
    },
  };
}

export function custodyExecutorPrompt(lease: CustodyLeaseEnvelope, bundlePath: string): string {
  const allowed = lease.contract.acceptance.allowedPaths.map((path) => `- ${path}`).join("\n") || "- No paths are writable; verification only.";
  const criteria = lease.contract.acceptance.acceptanceCriteria.map((criterion) => `- ${criterion}`).join("\n");
  return [
    `You are the Terra custody steward for immutable lease ${lease.leaseId}.`,
    `The frozen lease is at ${bundlePath} and is bound by ${lease.leaseDigest}. Read it completely before acting.`,
    `Perform only this mechanical custody task: ${lease.contract.task}`,
    `Why it exists: ${lease.contract.reason}`,
    `Acceptance criteria:\n${criteria}`,
    `The only paths you may change, relative to your current project directory, are:\n${allowed}`,
    `Hard stop: ${lease.contract.acceptance.stopCondition}`,
    `Budget: at most ${lease.budget.maxMinutes} minutes and ${lease.budget.maxChangedPaths} changed paths. The controller separately meters tokens where available.`,
    "You are already inside a detached custody worktree. Do not commit, merge, cherry-pick, push, switch branches, alter Git configuration, access the network, start another agent, dispatch any worker, modify the campaign control database, choose research direction, or promote a mathematical claim.",
    "Inspect first. Make only the smallest changes needed by the acceptance contract. Stop as BLOCKED instead of guessing whenever the contract, source bytes, allowed paths, or evidence are insufficient.",
    "Return the structured report requested by the host. changedPaths must exactly name every file you changed relative to the current project directory. A COMPLETED report requires every acceptance check to PASS; otherwise return BLOCKED or FAILED.",
  ].join("\n\n");
}

export function buildCustodyExecutionReceipt(
  lease: CustodyLeaseEnvelope,
  report: CustodyExecutorReport,
  measurement: CustodyExecutionMeasurement,
): CustodyExecutionReceipt {
  return {
    schema: "campaign-custody-execution-receipt/v1",
    mode: "isolated-worktree",
    leaseId: lease.leaseId,
    leaseDigest: lease.leaseDigest,
    contractDigest: lease.contractDigest,
    adapterId: lease.adapter.id,
    status: report.status,
    summary: report.summary,
    stopReason: report.stopReason,
    effects: {
      changedPaths: [...new Set(measurement.actualChangedPaths.map(normalizedPath))].sort(),
      claimPromotions: [],
      dispatches: [],
      merges: [],
      pushes: [],
    },
    usage: {
      tokens: measurement.measuredTokens,
      minutes: Math.max(0, measurement.measuredMinutes),
      tokenMeasurement: measurement.measuredTokens === null ? "unavailable" : "app-server",
    },
    checks: report.checks,
    executorReport: report,
    producerCommit: measurement.producerCommit || "",
    completedAt: measurement.completedAt,
  };
}

export function verifyCustodyExecutionReceipt(
  lease: CustodyLeaseEnvelope,
  receipt: CustodyExecutionReceipt,
  measurement: CustodyExecutionMeasurement,
): Record<string, unknown> {
  const errors: string[] = [];
  const warnings: string[] = [];
  const actualPaths = [...new Set(measurement.actualChangedPaths.map(normalizedPath))].sort();
  const declaredPaths = [...new Set(receipt.executorReport.changedPaths.map(normalizedPath))].sort();
  if (receipt.schema !== "campaign-custody-execution-receipt/v1" || receipt.mode !== "isolated-worktree") errors.push("Receipt schema or execution mode is unsupported.");
  if (receipt.leaseId !== lease.leaseId || receipt.leaseDigest !== lease.leaseDigest || receipt.contractDigest !== lease.contractDigest) errors.push("Receipt is not bound to the immutable custody lease.");
  if (lease.adapter.executionMode !== "isolated-worktree") errors.push("Lease does not authorize an isolated custody executor.");
  if (!lease.workspace?.baseCommit || measurement.actualHead !== lease.workspace.baseCommit) errors.push("The custody executor changed Git history or ran from the wrong base commit.");
  if (JSON.stringify(actualPaths) !== JSON.stringify(declaredPaths)) errors.push("Executor-declared changed paths do not match the detached worktree.");
  if (actualPaths.length > lease.budget.maxChangedPaths) errors.push("Receipt exceeds the changed-path budget.");
  const escaped = actualPaths.filter((path) => !custodyPathAllowed(path, lease.contract.acceptance.allowedPaths));
  if (escaped.length) errors.push(`Custody changes escape the allowed path contract: ${escaped.join(", ")}.`);
  if (receipt.usage.minutes > lease.budget.maxMinutes) errors.push("Receipt exceeds the fixed wall-time budget.");
  if (receipt.usage.tokens !== null && receipt.usage.tokens > lease.budget.maxTokens) errors.push("Receipt exceeds the fixed token budget.");
  if (receipt.usage.tokens === null) warnings.push("App Server did not expose a measured token total for this turn; do not use this receipt for token calibration.");
  if (receipt.effects.claimPromotions.length || receipt.effects.dispatches.length || receipt.effects.merges.length || receipt.effects.pushes.length) errors.push("Custody execution reported a forbidden effect.");
  if (receipt.status === "COMPLETED" && (!receipt.checks.length || receipt.checks.some((check) => check.status !== "PASS"))) errors.push("A completed custody receipt requires every acceptance check to pass.");
  return {
    ok: errors.length === 0,
    landable: errors.length === 0 && receipt.status === "COMPLETED",
    outcome: receipt.status,
    errors,
    warnings,
    actualChangedPaths: actualPaths,
    leaseDigest: lease.leaseDigest,
    producerCommit: receipt.producerCommit,
    tokenMeasurement: receipt.usage.tokenMeasurement,
  };
}
