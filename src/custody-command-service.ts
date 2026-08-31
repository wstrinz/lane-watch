import { Database } from "bun:sqlite";
import { mkdir, rename, stat, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, relative, resolve, sep } from "node:path";
import type { CodexAppServerClient, CodexNotification, CodexServerRequest } from "./codex";
import type { CampaignDomainReader } from "./campaign-domain-reader";
import { type CustodyStatus, type CustodyWorkItem } from "./custody";
import { buildCustodyExecutionReceipt, custodyExecutorPrompt, custodyExecutorReportSchema, verifyCustodyExecutionReceipt, type CustodyExecutionMeasurement, type CustodyExecutionReceipt, type CustodyExecutorReport } from "./custody-executor";
import { createCustodyLease, protocolDigest, simulateCustodyProtocol, verifyCustodyProtocolReceipt, type CustodyLeaseEnvelope, type CustodyProtocolReceipt } from "./custody-protocol";
import { runGit } from "./git";

interface CustodyItemRow {
  item_id: string;
  project_id: string;
  status: CustodyStatus;
}

interface CustodyLeaseRow {
  lease_id: string;
  item_id: string;
  project_id: string;
  status: string;
  bundle_path: string;
  lease_digest: string;
  lease_json: string;
  receipt_json: string;
  receipt_digest: string;
  verification_json: string;
  error: string;
  created_at: string;
  expires_at: string;
  updated_at: string;
  completed_at: string;
  thread_id: string;
  turn_id: string;
  worktree_path: string;
  base_commit: string;
  producer_commit: string;
  started_at: string;
}

export interface CustodyCommandPort {
  project(projectId: string): { current_phase: string; version: number };
  projectRoot(projectId: string): string;
  touchProject(projectId: string): void;
  recordEvent(projectId: string, aggregateType: string, aggregateId: string, eventType: string, payload: unknown): void;
  notifyChanged(): void;
  now(): string;
}

function parseJson<T>(value: string | undefined, fallback: T): T {
  try { return JSON.parse(value || "") as T; } catch { return fallback; }
}

function boundedText(value: unknown, limit = 2_000): string {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

function within(root: string, candidate: string): boolean {
  const normalizedRoot = resolve(root);
  const normalizedCandidate = resolve(candidate);
  return normalizedCandidate === normalizedRoot || normalizedCandidate.startsWith(`${normalizedRoot}${sep}`);
}

function agentText(item: Record<string, any>): string {
  if (typeof item.text === "string") return item.text;
  if (typeof item.message === "string") return item.message;
  if (Array.isArray(item.content)) {
    return item.content
      .map((part: any) => typeof part === "string" ? part : typeof part?.text === "string" ? part.text : "")
      .filter(Boolean)
      .join("\n");
  }
  return "";
}

export class CustodyCommandService {
  constructor(
    private readonly database: Database,
    private readonly domains: CampaignDomainReader,
    private readonly codex: CodexAppServerClient,
    private readonly bundleRoot: string,
    private readonly port: CustodyCommandPort,
  ) {}

  async recoverExecutions(): Promise<void> {
    const rows = this.database.query(
      "SELECT * FROM campaign_custody_leases WHERE status IN ('running', 'finalizing') ORDER BY created_at",
    ).all() as CustodyLeaseRow[];
    for (const row of rows) {
      try {
        await this.codex.resumeThread(row.thread_id);
        const detail = await this.codex.readThreadDetail(row.thread_id);
        const turns = Array.isArray(detail.turns) ? detail.turns : [];
        const turn = turns.find((candidate: any) => candidate?.id === row.turn_id);
        const status = String(turn?.status || "");
        if (!["completed", "failed", "interrupted"].includes(status)) continue;
        const messages = Array.isArray(turn?.items) ? turn.items.filter((item: any) => item?.type === "agentMessage") : [];
        const response = messages.length ? agentText(messages[messages.length - 1]) : "";
        if (response) this.database.query(
          "UPDATE campaign_custody_leases SET receipt_json = $receipt WHERE lease_id = $id",
        ).run({ $id: row.lease_id, $receipt: response });
        if (row.status === "running") this.database.query(
          "UPDATE campaign_custody_leases SET status = 'finalizing', updated_at = $now WHERE lease_id = $id",
        ).run({ $id: row.lease_id, $now: this.port.now() });
        await this.finalizeExecution({ ...row, status: "finalizing", receipt_json: response || row.receipt_json }, status);
      } catch (error) {
        this.port.recordEvent(row.project_id, "custody-lease", row.lease_id, "custody.execution.recovery-attention", {
          itemId: row.item_id,
          threadId: row.thread_id,
          error: error instanceof Error ? error.message : String(error),
          mutation: "none",
        });
      }
    }
  }

  transitionItem(projectId: string, itemId: string, transition: "promote" | "park" | "restore", args: Record<string, any>, actor: string): Record<string, unknown> {
    const row = this.database.query(
      "SELECT * FROM campaign_custody_items WHERE item_id = $id AND project_id = $project",
    ).get({ $id: itemId, $project: projectId }) as CustodyItemRow | null;
    if (!row) throw new Error("Select a custody item from this campaign");
    const service = this.domains.custodySnapshot(projectId);
    const item = service.items.find((candidate: any) => candidate.id === itemId);
    let status: CustodyStatus;
    if (transition === "promote") {
      if (row.status !== "proposed") throw new Error("Only a proposed custody item can become ready");
      if (!item?.contractComplete) throw new Error("Complete the custody acceptance contract before marking it ready");
      if (!item?.generationAllowed) throw new Error("This repair exceeds the charter's automatic repair-generation limit and must remain operator-owned");
      status = "ready";
    } else if (transition === "park") {
      if (!["proposed", "ready", "blocked"].includes(row.status)) throw new Error("Only proposed, ready, or blocked custody work can be parked");
      status = "parked";
    } else {
      if (row.status !== "parked") throw new Error("Only parked custody work can return to the proposed inbox");
      status = "proposed";
    }
    const note = boundedText(args.note || "", 2_000);
    const stamp = this.port.now();
    this.database.query(
      "UPDATE campaign_custody_items SET status = $status, updated_at = $now WHERE item_id = $id",
    ).run({ $id: itemId, $status: status, $now: stamp });
    this.port.touchProject(projectId);
    this.port.recordEvent(projectId, "custody", itemId, `custody.item.${status}`, {
      actor,
      from: row.status,
      to: status,
      note,
      readyDoesNotDispatch: true,
      campaignPhaseUnchanged: this.port.project(projectId).current_phase,
    });
    return { itemId, from: row.status, status, executorConnected: Boolean(service.executorConnected), dispatched: false, campaignPhase: this.port.project(projectId).current_phase };
  }

  async prepareLease(projectId: string, itemId: string, actor: string): Promise<Record<string, unknown>> {
    const service = this.domains.custodySnapshot(projectId);
    const item = service.items.find((candidate: any) => candidate.id === itemId) as CustodyWorkItem & { contractComplete: boolean; generationAllowed: boolean; activeLease: any } | undefined;
    if (!item || item.status !== "ready") throw new Error("Only a human-ready custody contract can receive a protocol lease");
    if (!item.contractComplete || !item.generationAllowed) throw new Error("Custody contract no longer satisfies the active charter policy");
    if (item.activeLease) throw new Error(`Custody item already has active lease ${item.activeLease.id}`);
    const project = this.port.project(projectId);
    const strategy = this.domains.strategySnapshot(projectId);
    const sourceRoot = this.port.projectRoot(projectId);
    const repository = await runGit(sourceRoot, ["rev-parse", "--show-toplevel"]);
    const head = await runGit(sourceRoot, ["rev-parse", "HEAD"]);
    const exactRepositoryRoot = repository.exitCode === 0 && Boolean(repository.stdout) && resolve(repository.stdout) === resolve(sourceRoot);
    const executableWorkspace = exactRepositoryRoot && head.exitCode === 0 && /^[0-9a-f]{40}$/i.test(head.stdout);
    const repositoryRoot = executableWorkspace ? resolve(repository.stdout) : "";
    if (executableWorkspace && !within(repositoryRoot, sourceRoot)) throw new Error("Campaign workspace is outside its resolved Git repository");
    const projectRelativePath = executableWorkspace ? (relative(repositoryRoot, sourceRoot).replace(/\\/g, "/") || ".") : ".";
    const issuedAt = this.port.now();
    const expiresAt = new Date(Date.parse(issuedAt) + 24 * 60 * 60 * 1_000).toISOString();
    const leaseId = crypto.randomUUID();
    const lease = createCustodyLease({
      leaseId,
      item,
      campaignBoundary: {
        phase: project.current_phase,
        version: project.version,
        charterRevision: strategy.charter.revision,
        epochId: strategy.epoch.id,
      },
      issuedAt,
      expiresAt,
      executionMode: executableWorkspace ? "isolated-worktree" : "disconnected",
      workspace: executableWorkspace ? {
        sourceRoot,
        repositoryRoot,
        projectRelativePath,
        baseCommit: head.stdout,
        isolation: "detached-worktree",
      } : undefined,
    });
    await mkdir(this.bundleRoot, { recursive: true });
    const bundlePath = join(this.bundleRoot, `${leaseId}-custody-lease-${lease.leaseDigest.slice(7, 15)}.json`);
    const temporaryPath = `${bundlePath}.${crypto.randomUUID()}.tmp`;
    await writeFile(temporaryPath, `${JSON.stringify(lease, null, 2)}\n`, { encoding: "utf8", mode: 0o600 });
    await rename(temporaryPath, bundlePath);
    this.database.query(`
      INSERT INTO campaign_custody_leases(
        lease_id, item_id, project_id, adapter_id, status, bundle_path, lease_digest, lease_json,
        issued_by, created_at, expires_at, updated_at, base_commit
      ) VALUES ($id, $item, $project, 'terra-local-steward', 'prepared', $path, $digest, $lease, $actor, $now, $expires, $now, $base)
    `).run({
      $id: leaseId,
      $item: itemId,
      $project: projectId,
      $path: bundlePath,
      $digest: lease.leaseDigest,
      $lease: JSON.stringify(lease),
      $actor: actor,
      $now: issuedAt,
      $expires: expiresAt,
      $base: executableWorkspace ? head.stdout : "",
    });
    this.port.touchProject(projectId);
    this.port.recordEvent(projectId, "custody-lease", leaseId, "custody.lease.prepared", {
      itemId,
      actor,
      leaseDigest: lease.leaseDigest,
      contractDigest: lease.contractDigest,
      budget: lease.budget,
      expiresAt,
      executorConnected: executableWorkspace,
      dispatched: false,
    });
    return { leaseId, itemId, status: "prepared", bundlePath, leaseDigest: lease.leaseDigest, contractDigest: lease.contractDigest, budget: lease.budget, baseCommit: executableWorkspace ? head.stdout : "", executorConnected: executableWorkspace, executionMode: lease.adapter.executionMode, dispatched: false };
  }

  async confirmLease(projectId: string, leaseId: string, args: Record<string, any>, actor: string): Promise<Record<string, unknown>> {
    const row = this.lease(projectId, leaseId);
    if (!row || row.status !== "prepared") throw new Error("Select a prepared custody lease for exact confirmation");
    const lease = parseJson<CustodyLeaseEnvelope | null>(row.lease_json, null);
    if (!lease || lease.adapter.executionMode !== "isolated-worktree" || !lease.workspace) throw new Error("This project has only a disconnected simulation lease; it cannot dispatch a steward");
    if (String(args.leaseDigest || "") !== row.lease_digest || lease.leaseDigest !== row.lease_digest) throw new Error("Confirm the exact immutable custody lease digest");
    if (Date.parse(row.expires_at) <= Date.now()) throw new Error("The custody lease expired; prepare a fresh revision-bound lease");
    const head = await runGit(lease.workspace.sourceRoot, ["rev-parse", "HEAD"]);
    if (head.exitCode !== 0 || head.stdout !== lease.workspace.baseCommit) throw new Error("The campaign revision changed; prepare and review a fresh custody lease");
    const stamp = this.port.now();
    this.database.query(
      "UPDATE campaign_custody_leases SET status = 'confirmed', updated_at = $now WHERE lease_id = $id AND status = 'prepared'",
    ).run({ $id: leaseId, $now: stamp });
    this.port.touchProject(projectId);
    this.port.recordEvent(projectId, "custody-lease", leaseId, "custody.lease.confirmed", {
      itemId: row.item_id,
      actor,
      leaseDigest: row.lease_digest,
      baseCommit: lease.workspace.baseCommit,
      authority: "operator-confirmed-custody-reservation",
      dispatched: false,
    });
    return { leaseId, itemId: row.item_id, status: "confirmed", leaseDigest: row.lease_digest, baseCommit: lease.workspace.baseCommit, dispatched: false };
  }

  async dispatchLease(projectId: string, leaseId: string, args: Record<string, any>, actor: string): Promise<Record<string, unknown>> {
    const row = this.lease(projectId, leaseId);
    if (!row || row.status !== "confirmed") throw new Error("Only an exact confirmed custody lease can dispatch");
    const lease = parseJson<CustodyLeaseEnvelope | null>(row.lease_json, null);
    if (!lease?.workspace || lease.adapter.executionMode !== "isolated-worktree") throw new Error("Custody lease has no isolated execution workspace");
    if (String(args.leaseDigest || "") !== row.lease_digest || lease.leaseDigest !== row.lease_digest) throw new Error("Dispatch digest does not match the confirmed custody lease");
    if (Date.parse(row.expires_at) <= Date.now()) throw new Error("The confirmed custody lease expired before dispatch");
    const strategy = this.domains.strategySnapshot(projectId);
    const custodySlots = Math.max(0, Number(strategy.charter?.resourcePolicy?.slots?.custody ?? 1));
    const active = this.database.query(
      "SELECT COUNT(*) AS count FROM campaign_custody_leases WHERE project_id = $project AND status IN ('running', 'finalizing')",
    ).get({ $project: projectId }) as { count: number } | null;
    if (Number(active?.count || 0) >= custodySlots) throw new Error(`All ${custodySlots} custody slot${custodySlots === 1 ? " is" : "s are"} occupied`);
    const sourceHead = await runGit(lease.workspace.sourceRoot, ["rev-parse", "HEAD"]);
    if (sourceHead.exitCode !== 0 || sourceHead.stdout !== lease.workspace.baseCommit) throw new Error("Campaign Git state changed after confirmation; prepare a fresh custody lease");
    const worktreeRoot = join(tmpdir(), "lane-watch-custody", projectId, leaseId);
    try {
      await stat(worktreeRoot);
      throw new Error(`Custody worktree path already exists: ${worktreeRoot}`);
    } catch (error: any) {
      if (error?.code !== "ENOENT") throw error;
    }
    await mkdir(dirname(worktreeRoot), { recursive: true });
    const addWorktree = await runGit(lease.workspace.repositoryRoot, ["worktree", "add", "--detach", worktreeRoot, lease.workspace.baseCommit]);
    if (addWorktree.exitCode !== 0) throw new Error(`Could not create the detached custody worktree: ${addWorktree.stderr || addWorktree.stdout}`);
    const worktreeCwd = lease.workspace.projectRelativePath === "." ? worktreeRoot : resolve(worktreeRoot, lease.workspace.projectRelativePath);
    if (!within(worktreeRoot, worktreeCwd)) throw new Error("Custody project path escapes its detached worktree");
    try {
      const thread = await this.codex.startThread({
        cwd: worktreeCwd,
        model: "gpt-5.6-terra",
        approvalPolicy: "never",
        sandbox: "workspaceWrite",
        serviceName: "lane_watch_custody",
      });
      const turn = await this.codex.startTurn({
        threadId: thread.id,
        input: [{ type: "text", text: custodyExecutorPrompt(lease, row.bundle_path) }],
        cwd: worktreeCwd,
        model: "gpt-5.6-terra",
        effort: "medium",
        approvalPolicy: "never",
        sandboxPolicy: {
          type: "workspaceWrite",
          writableRoots: [worktreeRoot],
          readOnlyAccess: { type: "fullAccess" },
          networkAccess: false,
        },
        outputSchema: custodyExecutorReportSchema(),
      });
      if (!turn.id) throw new Error("Codex App Server did not return a custody-executor turn id");
      const stamp = this.port.now();
      this.database.query(`
        UPDATE campaign_custody_leases SET status = 'running', thread_id = $thread, turn_id = $turn,
          worktree_path = $worktree, base_commit = $base, started_at = $now, updated_at = $now,
          verification_json = $verification, error = '' WHERE lease_id = $id AND status = 'confirmed'
      `).run({
        $id: leaseId,
        $thread: thread.id,
        $turn: turn.id,
        $worktree: worktreeRoot,
        $base: lease.workspace.baseCommit,
        $now: stamp,
        $verification: JSON.stringify({ telemetry: { measuredTokens: null } }),
      });
      this.database.query(
        "UPDATE campaign_custody_items SET status = 'assigned', assigned_actor = $actor, updated_at = $now WHERE item_id = $id",
      ).run({ $id: row.item_id, $actor: thread.id, $now: stamp });
      this.port.touchProject(projectId);
      this.port.recordEvent(projectId, "custody-lease", leaseId, "custody.lease.dispatched", {
        itemId: row.item_id,
        actor,
        threadId: thread.id,
        turnId: turn.id,
        worktreePath: worktreeRoot,
        baseCommit: lease.workspace.baseCommit,
        model: "gpt-5.6-terra",
        custodySlots,
        campaignPhaseUnchanged: this.port.project(projectId).current_phase,
      });
      return { leaseId, itemId: row.item_id, status: "running", threadId: thread.id, turnId: turn.id, worktreePath: worktreeRoot, baseCommit: lease.workspace.baseCommit, campaignPhase: this.port.project(projectId).current_phase };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      const stamp = this.port.now();
      this.database.query(
        "UPDATE campaign_custody_leases SET status = 'failed', error = $error, updated_at = $now, completed_at = $now, worktree_path = $worktree WHERE lease_id = $id",
      ).run({ $id: leaseId, $error: message.slice(0, 4_000), $now: stamp, $worktree: worktreeRoot });
      this.database.query(
        "UPDATE campaign_custody_items SET status = 'ready', assigned_actor = '', updated_at = $now WHERE item_id = $id",
      ).run({ $id: row.item_id, $now: stamp });
      this.port.touchProject(projectId);
      this.port.recordEvent(projectId, "custody-lease", leaseId, "custody.lease.dispatch-failed", { itemId: row.item_id, actor, error: message, worktreePath: worktreeRoot });
      throw error;
    }
  }

  simulateLease(projectId: string, leaseId: string, actor: string): Record<string, unknown> {
    const row = this.lease(projectId, leaseId);
    if (!row || row.status !== "prepared") throw new Error("Select a prepared custody lease for protocol simulation");
    const lease = parseJson<CustodyLeaseEnvelope | null>(row.lease_json, null);
    if (!lease) throw new Error("Prepared custody lease envelope is unreadable");
    const receipt = simulateCustodyProtocol(lease);
    const verification = verifyCustodyProtocolReceipt(lease, receipt);
    if (!verification.ok) throw new Error(`Protocol simulator produced an invalid receipt: ${verification.errors.join(" ")}`);
    const receiptDigest = protocolDigest(receipt);
    const stamp = this.port.now();
    this.database.query(`
      UPDATE campaign_custody_leases SET status = 'simulated', receipt_json = $receipt,
        receipt_digest = $receiptDigest, verification_json = $verification, updated_at = $now WHERE lease_id = $id
    `).run({
      $id: leaseId,
      $receipt: JSON.stringify(receipt),
      $receiptDigest: receiptDigest,
      $verification: JSON.stringify(verification),
      $now: stamp,
    });
    this.port.touchProject(projectId);
    this.port.recordEvent(projectId, "custody-lease", leaseId, "custody.lease.simulated", {
      actor,
      receiptDigest,
      replayKey: receipt.replayKey,
      usage: receipt.usage,
      realEffects: false,
      itemStatusUnchanged: "ready",
    });
    return { leaseId, status: "simulated", receiptDigest, replayKey: receipt.replayKey, verification, realEffects: false, itemStatus: "ready" };
  }

  replayLease(projectId: string, leaseId: string, actor: string): Record<string, unknown> {
    const row = this.lease(projectId, leaseId);
    if (!row || !["simulated", "verified"].includes(row.status)) throw new Error("Select a simulated custody receipt for deterministic replay");
    const lease = parseJson<CustodyLeaseEnvelope | null>(row.lease_json, null);
    const receipt = parseJson<CustodyProtocolReceipt | null>(row.receipt_json, null);
    if (!lease || !receipt) throw new Error("Custody lease or simulated receipt is unreadable");
    const verification = verifyCustodyProtocolReceipt(lease, receipt);
    const receiptDigest = protocolDigest(receipt);
    if (row.lease_digest !== verification.leaseDigest || row.receipt_digest !== receiptDigest || !verification.ok) {
      const error = [
        row.lease_digest !== verification.leaseDigest ? "Persisted lease digest mismatch." : "",
        row.receipt_digest !== receiptDigest ? "Persisted receipt digest mismatch." : "",
        ...verification.errors,
      ].filter(Boolean).join(" ");
      this.database.query(
        "UPDATE campaign_custody_leases SET status = 'failed', error = $error, verification_json = $verification, updated_at = $now, completed_at = $now WHERE lease_id = $id",
      ).run({ $id: leaseId, $error: error, $verification: JSON.stringify(verification), $now: this.port.now() });
      this.port.touchProject(projectId);
      this.port.recordEvent(projectId, "custody-lease", leaseId, "custody.lease.replay-failed", { actor, error, realEffects: false });
      throw new Error(error);
    }
    const stamp = this.port.now();
    this.database.query(
      "UPDATE campaign_custody_leases SET status = 'verified', verification_json = $verification, error = '', updated_at = $now, completed_at = $now WHERE lease_id = $id",
    ).run({ $id: leaseId, $verification: JSON.stringify(verification), $now: stamp });
    this.port.touchProject(projectId);
    this.port.recordEvent(projectId, "custody-lease", leaseId, "custody.lease.verified", {
      actor,
      leaseDigest: verification.leaseDigest,
      receiptDigest,
      replayKey: verification.replayKey,
      realEffects: false,
      itemStatusUnchanged: "ready",
    });
    return { leaseId, status: "verified", ...verification, itemStatus: "ready" };
  }

  async landReceipt(projectId: string, leaseId: string, args: Record<string, any>, actor: string): Promise<Record<string, unknown>> {
    const row = this.lease(projectId, leaseId);
    if (!row || row.status !== "awaiting_review") throw new Error("Select a verified custody receipt awaiting human review");
    if (String(args.receiptDigest || "") !== row.receipt_digest) throw new Error("Accept the exact measured custody receipt digest");
    const lease = parseJson<CustodyLeaseEnvelope | null>(row.lease_json, null);
    const receipt = parseJson<CustodyExecutionReceipt | null>(row.receipt_json, null);
    const verification = parseJson<Record<string, any>>(row.verification_json, {});
    if (!lease?.workspace || !receipt || !verification.ok || !verification.landable) throw new Error("Custody receipt is not landable under its frozen lease");
    const root = lease.workspace.sourceRoot;
    let landedCommit = "";
    if (row.producer_commit) {
      const clean = await runGit(root, ["status", "--porcelain=v1", "--untracked-files=all"]);
      if (clean.exitCode !== 0 || clean.stdout) throw new Error("Campaign checkout must be clean before landing the isolated custody commit");
      const producer = await runGit(root, ["cat-file", "-e", `${row.producer_commit}^{commit}`]);
      if (producer.exitCode !== 0) throw new Error("The frozen custody producer commit is unavailable");
      const preview = await runGit(root, ["merge-tree", "--write-tree", "HEAD", row.producer_commit]);
      if (preview.exitCode !== 0) throw new Error(`Custody producer no longer lands cleanly: ${preview.stderr || preview.stdout}`);
      const cherryPick = await runGit(root, ["cherry-pick", row.producer_commit]);
      if (cherryPick.exitCode !== 0) {
        await runGit(root, ["cherry-pick", "--abort"]);
        throw new Error(`Custody landing failed without retaining a partial cherry-pick: ${cherryPick.stderr || cherryPick.stdout}`);
      }
      const head = await runGit(root, ["rev-parse", "HEAD"]);
      landedCommit = head.stdout;
    }
    const stamp = this.port.now();
    this.database.transaction(() => {
      this.database.query(
        "UPDATE campaign_custody_leases SET status = 'completed', updated_at = $now, completed_at = $now WHERE lease_id = $id",
      ).run({ $id: leaseId, $now: stamp });
      this.database.query(
        "UPDATE campaign_custody_items SET status = 'complete', assigned_actor = '', completed_at = $now, updated_at = $now WHERE item_id = $id",
      ).run({ $id: row.item_id, $now: stamp });
    })();
    this.port.touchProject(projectId);
    this.port.recordEvent(projectId, "custody-lease", leaseId, "custody.receipt.landed", {
      itemId: row.item_id,
      actor,
      receiptDigest: row.receipt_digest,
      producerCommit: row.producer_commit,
      landedCommit,
      pushed: false,
      claimPromotion: false,
      campaignPhaseUnchanged: this.port.project(projectId).current_phase,
    });
    return { leaseId, itemId: row.item_id, status: "completed", receiptDigest: row.receipt_digest, producerCommit: row.producer_commit, landedCommit, pushed: false, campaignPhase: this.port.project(projectId).current_phase };
  }

  rejectReceipt(projectId: string, leaseId: string, args: Record<string, any>, actor: string): Record<string, unknown> {
    const row = this.lease(projectId, leaseId);
    if (!row || row.status !== "awaiting_review") throw new Error("Select a custody receipt awaiting human review");
    if (String(args.receiptDigest || "") !== row.receipt_digest) throw new Error("Reject the exact measured custody receipt digest");
    const reason = boundedText(args.reason || "Operator rejected the custody result at the landing gate.", 2_000);
    const stamp = this.port.now();
    this.database.transaction(() => {
      this.database.query(
        "UPDATE campaign_custody_leases SET status = 'rejected', error = $reason, updated_at = $now, completed_at = $now WHERE lease_id = $id",
      ).run({ $id: leaseId, $reason: reason, $now: stamp });
      this.database.query(
        "UPDATE campaign_custody_items SET status = 'blocked', assigned_actor = '', updated_at = $now WHERE item_id = $id",
      ).run({ $id: row.item_id, $now: stamp });
    })();
    this.port.touchProject(projectId);
    this.port.recordEvent(projectId, "custody-lease", leaseId, "custody.receipt.rejected", { itemId: row.item_id, actor, receiptDigest: row.receipt_digest, reason });
    return { leaseId, itemId: row.item_id, status: "rejected", itemStatus: "blocked", receiptDigest: row.receipt_digest };
  }

  handleNotification(notification: CodexNotification): boolean {
    const params = notification.params ?? {};
    const turnId = params.turnId ?? params.turn?.id ?? "";
    const threadId = params.threadId ?? params.thread?.id ?? params.turn?.threadId ?? "";
    const row = threadId
      ? this.database.query(
        "SELECT * FROM campaign_custody_leases WHERE thread_id = $thread AND status IN ('running', 'finalizing') ORDER BY created_at DESC LIMIT 1",
      ).get({ $thread: threadId }) as CustodyLeaseRow | null
      : turnId
        ? this.database.query(
          "SELECT * FROM campaign_custody_leases WHERE turn_id = $turn AND status IN ('running', 'finalizing') LIMIT 1",
        ).get({ $turn: turnId }) as CustodyLeaseRow | null
        : null;
    if (!row) return false;
    this.handleExecutionNotification(row, notification);
    return true;
  }

  handleServerRequest(request: CodexServerRequest): boolean {
    const threadId = typeof request.params.threadId === "string" ? request.params.threadId : "";
    if (!threadId) return false;
    const row = this.database.query(
      "SELECT * FROM campaign_custody_leases WHERE thread_id = $thread AND status IN ('running', 'finalizing') LIMIT 1",
    ).get({ $thread: threadId }) as CustodyLeaseRow | null;
    if (!row) return false;
    const response = request.method === "item/permissions/requestApproval" ? { permissions: [] } : { decision: "decline" };
    void this.codex.respond(request.id, response);
    this.port.recordEvent(row.project_id, "custody-lease", row.lease_id, "custody.executor.escalation-declined", {
      itemId: row.item_id,
      method: request.method,
      reason: "The immutable custody lease does not permit sandbox, network, or external authority expansion.",
    });
    this.port.notifyChanged();
    return true;
  }

  private lease(projectId: string, leaseId: string): CustodyLeaseRow | null {
    return this.database.query(
      "SELECT * FROM campaign_custody_leases WHERE lease_id = $id AND project_id = $project",
    ).get({ $id: leaseId, $project: projectId }) as CustodyLeaseRow | null;
  }

  private custodyTokenTotal(params: Record<string, any>): number | null {
    const visit = (value: unknown, depth = 0): number | null => {
      if (!value || typeof value !== "object" || depth > 6) return null;
      for (const [key, nested] of Object.entries(value as Record<string, unknown>)) {
        const normalized = key.replace(/[_-]/g, "").toLowerCase();
        if (["totaltokens", "totalusagetokens"].includes(normalized) && Number.isFinite(Number(nested))) return Math.max(0, Number(nested));
      }
      for (const nested of Object.values(value as Record<string, unknown>)) {
        const found = visit(nested, depth + 1);
        if (found !== null) return found;
      }
      return null;
    };
    return visit(params);
  }

  private handleExecutionNotification(row: CustodyLeaseRow, notification: CodexNotification): void {
    const params = notification.params ?? {};
    const stamp = this.port.now();
    if (notification.method === "thread/tokenUsage/updated") {
      const measuredTokens = this.custodyTokenTotal(params);
      if (measuredTokens !== null) {
        const prior = parseJson<Record<string, any>>(row.verification_json, {});
        this.database.query(
          "UPDATE campaign_custody_leases SET verification_json = $verification, updated_at = $now WHERE lease_id = $id",
        ).run({ $id: row.lease_id, $verification: JSON.stringify({ ...prior, telemetry: { ...(prior.telemetry || {}), measuredTokens, updatedAt: stamp } }), $now: stamp });
        this.port.notifyChanged();
      }
      return;
    }
    if (notification.method === "item/completed" && params.item?.type === "agentMessage") {
      const response = agentText(params.item);
      if (response) {
        this.database.query(
          "UPDATE campaign_custody_leases SET receipt_json = $receipt, updated_at = $now WHERE lease_id = $id AND status = 'running'",
        ).run({ $id: row.lease_id, $receipt: response, $now: stamp });
        this.port.notifyChanged();
      }
      return;
    }
    if (notification.method !== "turn/completed") return;
    const turnStatus = String(params.turn?.status ?? params.status ?? "completed");
    const claimed = this.database.query(
      "UPDATE campaign_custody_leases SET status = 'finalizing', updated_at = $now WHERE lease_id = $id AND status = 'running'",
    ).run({ $id: row.lease_id, $now: stamp });
    if (!claimed.changes) return;
    this.database.query(
      "UPDATE campaign_custody_items SET status = 'verifying', updated_at = $now WHERE item_id = $id",
    ).run({ $id: row.item_id, $now: stamp });
    this.port.touchProject(row.project_id);
    this.port.recordEvent(row.project_id, "custody-lease", row.lease_id, "custody.execution.finalizing", { itemId: row.item_id, turnId: row.turn_id, turnStatus });
    this.port.notifyChanged();
    void this.finalizeExecution(row, turnStatus).catch((error) => {
      const message = error instanceof Error ? error.message : String(error);
      const failedAt = this.port.now();
      this.database.transaction(() => {
        this.database.query(
          "UPDATE campaign_custody_leases SET status = 'failed', error = $error, updated_at = $now, completed_at = $now WHERE lease_id = $id",
        ).run({ $id: row.lease_id, $error: message.slice(0, 4_000), $now: failedAt });
        this.database.query(
          "UPDATE campaign_custody_items SET status = 'failed', updated_at = $now WHERE item_id = $id",
        ).run({ $id: row.item_id, $now: failedAt });
      })();
      this.port.touchProject(row.project_id);
      this.port.recordEvent(row.project_id, "custody-lease", row.lease_id, "custody.execution.finalization-failed", { itemId: row.item_id, error: message });
      this.port.notifyChanged();
    });
  }

  private async changedPaths(worktreeCwd: string): Promise<string[]> {
    const [tracked, untracked] = await Promise.all([
      runGit(worktreeCwd, ["diff", "--name-only", "--relative", "HEAD", "--", "."]),
      runGit(worktreeCwd, ["ls-files", "--others", "--exclude-standard", "--", "."]),
    ]);
    if (tracked.exitCode !== 0 || untracked.exitCode !== 0) throw new Error(`Could not inspect custody worktree changes: ${tracked.stderr || untracked.stderr}`);
    return [...new Set(`${tracked.stdout}\n${untracked.stdout}`.split(/\r?\n/).map((path) => path.trim().replace(/\\/g, "/")).filter(Boolean))].sort();
  }

  private async freezeProducerCommit(worktreeCwd: string, leaseId: string, expectedPaths: string[]): Promise<string> {
    if (!expectedPaths.length) return "";
    const add = await runGit(worktreeCwd, ["add", "--", "."]);
    if (add.exitCode !== 0) throw new Error(`Could not stage the bounded custody result: ${add.stderr || add.stdout}`);
    const staged = await runGit(worktreeCwd, ["diff", "--cached", "--name-only", "--relative", "HEAD", "--", "."]);
    const stagedPaths = staged.stdout.split(/\r?\n/).map((path) => path.trim().replace(/\\/g, "/")).filter(Boolean).sort();
    if (JSON.stringify(stagedPaths) !== JSON.stringify([...expectedPaths].sort())) throw new Error("Custody staging set changed after receipt verification");
    const commit = await runGit(worktreeCwd, [
      "-c", "user.name=Lane Watch Custody",
      "-c", "user.email=lane-watch-custody@example.invalid",
      "commit", "-m", `Freeze custody lease ${leaseId}`,
    ]);
    if (commit.exitCode !== 0) throw new Error(`Could not freeze the custody producer commit: ${commit.stderr || commit.stdout}`);
    const remaining = await runGit(worktreeCwd, ["status", "--porcelain=v1", "--untracked-files=all", "--", "."]);
    if (remaining.exitCode !== 0 || remaining.stdout) throw new Error(`Custody producer commit left unexpected changes: ${remaining.stderr || remaining.stdout}`);
    const head = await runGit(worktreeCwd, ["rev-parse", "HEAD"]);
    if (head.exitCode !== 0 || !/^[0-9a-f]{40}$/i.test(head.stdout)) throw new Error("Could not resolve the custody producer commit");
    return head.stdout;
  }

  private async finalizeExecution(row: CustodyLeaseRow, turnStatus: string): Promise<void> {
    const fresh = this.database.query(
      "SELECT * FROM campaign_custody_leases WHERE lease_id = $id",
    ).get({ $id: row.lease_id }) as CustodyLeaseRow | null;
    if (!fresh || fresh.status !== "finalizing") return;
    const lease = parseJson<CustodyLeaseEnvelope | null>(fresh.lease_json, null);
    if (!lease?.workspace || !fresh.worktree_path) throw new Error("Running custody lease lost its workspace binding");
    const worktreeCwd = lease.workspace.projectRelativePath === "." ? fresh.worktree_path : resolve(fresh.worktree_path, lease.workspace.projectRelativePath);
    const raw = parseJson<Record<string, any>>(fresh.receipt_json, {});
    const report: CustodyExecutorReport = turnStatus === "completed" && ["COMPLETED", "BLOCKED", "FAILED"].includes(String(raw.status))
      ? {
        status: raw.status,
        summary: boundedText(raw.summary, 4_000) || "Custody executor returned no summary.",
        stopReason: boundedText(raw.stopReason, 2_000),
        changedPaths: Array.isArray(raw.changedPaths) ? raw.changedPaths.filter((path: unknown): path is string => typeof path === "string").slice(0, 64) : [],
        checks: Array.isArray(raw.checks) ? raw.checks.slice(0, 40).map((check: any) => ({
          id: boundedText(check?.id, 120) || "executor-check",
          status: ["PASS", "FAIL", "BLOCK"].includes(String(check?.status)) ? check.status : "FAIL",
          detail: boundedText(check?.detail, 2_000) || "No executor detail supplied.",
        })) : [],
      }
      : {
        status: "FAILED",
        summary: `Custody executor turn ended ${turnStatus}.`,
        stopReason: boundedText(raw?.error || "The steward did not return a complete structured report.", 2_000),
        changedPaths: [],
        checks: [{ id: "turn-completion", status: "FAIL", detail: `App Server turn status: ${turnStatus}.` }],
      };
    const actualChangedPaths = await this.changedPaths(worktreeCwd);
    const head = await runGit(worktreeCwd, ["rev-parse", "HEAD"]);
    if (head.exitCode !== 0) throw new Error(`Could not resolve custody worktree HEAD: ${head.stderr}`);
    const telemetry = parseJson<Record<string, any>>(fresh.verification_json, {}).telemetry || {};
    const measuredTokens = Number.isFinite(Number(telemetry.measuredTokens)) ? Number(telemetry.measuredTokens) : null;
    const started = Date.parse(fresh.started_at || fresh.updated_at || fresh.created_at);
    const completedAt = this.port.now();
    const measurement: CustodyExecutionMeasurement = {
      actualChangedPaths,
      actualHead: head.stdout,
      measuredMinutes: Math.max(0, (Date.parse(completedAt) - started) / 60_000),
      measuredTokens,
      completedAt,
    };
    let receipt = buildCustodyExecutionReceipt(lease, report, measurement);
    let verification = verifyCustodyExecutionReceipt(lease, receipt, measurement) as Record<string, any>;
    let producerCommit = "";
    if (verification.landable) {
      producerCommit = await this.freezeProducerCommit(worktreeCwd, fresh.lease_id, actualChangedPaths);
      receipt = { ...receipt, producerCommit };
      verification = verifyCustodyExecutionReceipt(lease, receipt, { ...measurement, producerCommit }) as Record<string, any>;
    }
    const receiptDigest = protocolDigest(receipt);
    const nextLeaseStatus = !verification.ok ? "failed" : report.status === "COMPLETED" ? "awaiting_review" : report.status === "BLOCKED" ? "blocked" : "failed";
    const nextItemStatus: CustodyStatus = nextLeaseStatus === "awaiting_review" ? "verifying" : nextLeaseStatus === "blocked" ? "blocked" : "failed";
    const error = verification.ok ? "" : (verification.errors || []).join(" ");
    this.database.transaction(() => {
      this.database.query(`
        UPDATE campaign_custody_leases SET status = $status, receipt_json = $receipt, receipt_digest = $digest,
          verification_json = $verification, producer_commit = $producer, error = $error, updated_at = $now,
          completed_at = CASE WHEN $status = 'awaiting_review' THEN '' ELSE $now END WHERE lease_id = $id
      `).run({
        $id: fresh.lease_id,
        $status: nextLeaseStatus,
        $receipt: JSON.stringify(receipt),
        $digest: receiptDigest,
        $verification: JSON.stringify(verification),
        $producer: producerCommit,
        $error: error.slice(0, 4_000),
        $now: completedAt,
      });
      this.database.query(
        "UPDATE campaign_custody_items SET status = $status, receipt_json = $receipt, updated_at = $now WHERE item_id = $id",
      ).run({ $id: fresh.item_id, $status: nextItemStatus, $receipt: JSON.stringify(receipt), $now: completedAt });
    })();
    this.port.touchProject(fresh.project_id);
    this.port.recordEvent(fresh.project_id, "custody-lease", fresh.lease_id, "custody.execution.completed", {
      itemId: fresh.item_id,
      turnId: fresh.turn_id,
      turnStatus,
      outcome: report.status,
      status: nextLeaseStatus,
      receiptDigest,
      producerCommit,
      changedPaths: actualChangedPaths,
      verification,
      campaignPhaseUnchanged: this.port.project(fresh.project_id).current_phase,
    });
    this.port.notifyChanged();
  }
}
