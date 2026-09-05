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

/** Heuristic early warning only. A 30% margin proves no latency/overshoot bound. */
export function custodyInterruptThreshold(maxTokens: number): number {
  return Math.max(1, Math.floor(Math.max(1, maxTokens) * 0.7));
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

export function custodyExecutorPrompt(lease: CustodyLeaseEnvelope, bundlePath: string, bundleFileSha256: string, worktreeCwd: string): string {
  const allowed = lease.contract.acceptance.allowedPaths.map((path) => `- ${path}`).join("\n") || "- No paths are writable; verification only.";
  const criteria = lease.contract.acceptance.acceptanceCriteria.map((criterion) => `- ${criterion}`).join("\n");
  return [
    `You are the Terra custody steward for immutable lease ${lease.leaseId}.`,
    `The detached campaign workspace is ${worktreeCwd}. Run all repository inspection and edits there. Paths in this lease and in your final changedPaths are relative to that workspace.`,
    "This is a narrow mechanical custody turn, not a research lane. The controller has already frozen its campaign boundary into the lease. Do not load broad campaign-history or foundation files unless an acceptance criterion names their content; inspect the exact source artifacts needed for the checks and keep command output bounded.",
    `The frozen lease is at ${bundlePath}. Read it completely before acting.`,
    `Verify the literal bundle bytes against ${bundleFileSha256}. The embedded ${lease.leaseDigest} is the protocol digest of the canonical JSON envelope with the leaseDigest field omitted; it is not the literal file-byte hash. Do not compare the whole-file SHA-256 to leaseDigest.`,
    "When a receipt binds source blobs at an immutable Git commit and those blob hashes verify, replay those exact blobs from that commit in disposable runner scratch. A later checkout may differ byte-for-byte without invalidating the frozen producer. Do not treat successor formatting drift as a provenance mismatch; do stop if the frozen blobs, their referenced commit, candidate data, or replay results disagree.",
    `Perform only this mechanical custody task: ${lease.contract.task}`,
    `Why it exists: ${lease.contract.reason}`,
    `Acceptance criteria:\n${criteria}`,
    `The only paths you may change, relative to the detached campaign workspace, are:\n${allowed}`,
    `Hard stop: ${lease.contract.acceptance.stopCondition}`,
    `Budget: at most ${lease.budget.maxTokens.toLocaleString()} total tokens, ${lease.budget.maxMinutes} minutes, and ${lease.budget.maxChangedPaths} changed paths. Aim to return the final structured report before 60% of the token ceiling. If the checks cannot fit, stop early as BLOCKED with the exact missing prerequisite; do not spend the remaining budget exploring broadly. The controller requests an early interruption near 70%; this threshold alone does not guarantee a hard ceiling.`,
    "The workspace is a detached custody worktree. Disposable files in the runner directory are allowed only to replay immutable blobs and are not campaign effects. Do not commit, merge, cherry-pick, push, switch branches, alter Git configuration, access the network, start another agent, dispatch any worker, modify the campaign control database, choose research direction, or promote a mathematical claim.",
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
