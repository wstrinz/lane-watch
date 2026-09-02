import { Database } from "bun:sqlite";
import { readFile } from "node:fs/promises";
import { resolve, sep } from "node:path";
import { runGit } from "./git";
import { TERMINAL_DAEMONS, deriveCampaignPhase, laneFailure, waveAccounting } from "./wave";
import { WaveCommandService } from "./wave-commands";
import { WaveRepository } from "./wave-repository";
import { WaveScheduleRepository } from "./wave-schedule-repository";
import type { LaneSnapshot } from "./types";

interface ResearchRunRow {
  run_id: string;
  request_id: string;
  project_id: string;
  wave_id: string;
  task_id: string;
  status: string;
  lane_id: string;
  job_id: string;
  worktree: string;
  evidence_path: string;
  evidence_sha256: string;
  evidence_json: string;
  error: string;
  created_at: string;
  measured_tokens: number | null;
  measured_wall_seconds: number;
  measurement_source: string;
  measurement_at: string;
}

export function deriveReceiptBoundMeasurement(input: {
  evidenceSha256: string;
  observedTokens: number | null;
  createdAt: string;
  settledAt: string;
}): { tokens: number; wallSeconds: number; source: string; measuredAt: string } | null {
  if (!input.evidenceSha256 || !Number.isFinite(input.observedTokens) || Number(input.observedTokens) <= 0) return null;
  const started = Date.parse(input.createdAt);
  const ended = Date.parse(input.settledAt);
  if (!Number.isFinite(started) || !Number.isFinite(ended) || ended <= started) return null;
  return {
    tokens: Math.floor(Number(input.observedTokens)),
    wallSeconds: (ended - started) / 1000,
    source: "observer-ledger-at-receipt-freeze",
    measuredAt: input.settledAt,
  };
}

interface ObservationSyncPort {
  project(projectId: string): { current_phase: string };
  observeActivity(projectId: string, activity: { phase: string; active: number; running: number; terminal: number; summary: Record<string, unknown> }): void;
  transitionProject(projectId: string, phase: string, cause: string): void;
  recordEvent(projectId: string, aggregateType: string, aggregateId: string, eventType: string, payload: unknown): void;
  now(): string;
}

function within(root: string, candidate: string): boolean {
  const prefix = root.endsWith(sep) ? root : `${root}${sep}`;
  return candidate === root || candidate.startsWith(prefix);
}

function sha256Text(value: string): string {
  const hasher = new Bun.CryptoHasher("sha256");
  hasher.update(value);
  return hasher.digest("hex");
}

function sha256Bytes(value: Uint8Array): string {
  const hasher = new Bun.CryptoHasher("sha256");
  hasher.update(value);
  return hasher.digest("hex");
}

export function sha256ReceiptArtifact(receipt: Record<string, any>, value: Uint8Array): string {
  if (!/canonical LF/i.test(String(receipt?.artifact_paths_note || ""))) return sha256Bytes(value);
  const normalized = new Uint8Array(value.length);
  let write = 0;
  for (let read = 0; read < value.length; read += 1) {
    if (value[read] === 13 && value[read + 1] === 10) read += 1;
    normalized[write] = value[read] === 13 ? 10 : value[read];
    write += 1;
  }
  return sha256Bytes(normalized.subarray(0, write));
}

function gitStatusPath(line: string): string {
  const value = line.slice(3).trim();
  const destination = value.includes(" -> ") ? value.split(" -> ").at(-1)! : value;
  return destination.replace(/^"|"$/g, "").replace(/\\/g, "/");
}

export function assertTerminalResearchReceipt(receipt: Record<string, any>, taskId: string): void {
  if (receipt?.schema !== "cfg23-research-evidence/v1") throw new Error("Receipt schema must be cfg23-research-evidence/v1");
  if (receipt?.task_id !== taskId) throw new Error("Receipt task_id does not match the durable run");
  const status = String(receipt?.status || "").toLowerCase();
  const verdict = String(receipt?.verdict || "").toUpperCase();
  if (!["complete", "blocked"].includes(status) && !["SUPPORTED", "REFUTED", "INCONCLUSIVE", "BLOCKED"].includes(verdict)) {
    throw new Error("Receipt must declare status complete|blocked or verdict SUPPORTED|REFUTED|INCONCLUSIVE|BLOCKED");
  }
}

async function validateReceiptArtifacts(
  worktree: string,
  evidencePath: string,
  receipt: Record<string, any>,
): Promise<void> {
  const normalizedEvidence = evidencePath.replace(/\\/g, "/");
  const allowedRoot = normalizedEvidence.replace(/\/[^/]+$/, "");
  if (!allowedRoot || allowedRoot === normalizedEvidence) throw new Error("Evidence receipt path has no bounded task directory");
  const artifacts = receipt.artifact_paths && typeof receipt.artifact_paths === "object" ? receipt.artifact_paths as Record<string, unknown> : {};
  for (const [path, expected] of Object.entries(artifacts)) {
    const normalized = path.replace(/\\/g, "/");
    if (normalized !== allowedRoot && !normalized.startsWith(`${allowedRoot}/`)) throw new Error(`Receipt artifact escapes the authorized task directory: ${normalized}`);
    if (!/^[0-9a-f]{64}$/i.test(String(expected))) throw new Error(`Receipt artifact has an invalid SHA-256: ${normalized}`);
    const absolute = resolve(worktree, normalized);
    if (!within(worktree, absolute)) throw new Error(`Receipt artifact escapes the worktree: ${normalized}`);
    const actual = sha256ReceiptArtifact(receipt, await readFile(absolute));
    if (actual !== String(expected).toLowerCase()) throw new Error(`Receipt artifact hash mismatch: ${normalized}`);
  }
}

async function committedWorktreeFileMatches(worktree: string, relativePath: string): Promise<boolean> {
  const normalized = relativePath.replace(/\\/g, "/");
  const repository = await runGit(worktree, ["rev-parse", "--is-inside-work-tree"]);
  if (repository.exitCode !== 0 || repository.stdout !== "true") return false;
  const [workingOid, headOid] = await Promise.all([
    runGit(worktree, ["hash-object", "--", normalized]),
    runGit(worktree, ["rev-parse", `HEAD:${normalized}`]),
  ]);
  return workingOid.exitCode === 0
    && headOid.exitCode === 0
    && /^[0-9a-f]{40}$/i.test(workingOid.stdout)
    && workingOid.stdout === headOid.stdout;
}

async function freezeCompletedResearchEvidence(
  worktree: string,
  evidencePath: string,
  receipt: Record<string, any>,
  taskId: string,
): Promise<string> {
  const normalizedEvidence = evidencePath.replace(/\\/g, "/");
  const allowedRoot = normalizedEvidence.replace(/\/[^/]+$/, "");
  if (!allowedRoot || allowedRoot === normalizedEvidence) throw new Error("Evidence receipt path has no bounded task directory");
  const status = await runGit(worktree, ["status", "--porcelain=v1", "--untracked-files=all"]);
  if (status.exitCode !== 0) throw new Error(`Could not inspect the evidence worktree: ${status.stderr || status.stdout}`);
  const changed = status.stdout ? status.stdout.split(/\r?\n/).filter(Boolean).map(gitStatusPath) : [];
  const outside = changed.filter((path) => path !== allowedRoot && !path.startsWith(`${allowedRoot}/`));
  if (outside.length) throw new Error(`Landing repair refused unexpected changed paths: ${outside.join(", ")}`);
  if (!changed.includes(normalizedEvidence)) throw new Error("The terminal receipt is not part of the bounded worktree changes");

  const declaredChanges = Array.isArray(receipt.changed_paths)
    ? receipt.changed_paths.filter((value: unknown): value is string => typeof value === "string").map((value: string) => value.replace(/\\/g, "/"))
    : [];
  if (declaredChanges.length) {
    const declared = new Set(declaredChanges);
    const undeclared = changed.filter((path) => !declared.has(path));
    const missing = declaredChanges.filter((path) => !changed.includes(path));
    if (undeclared.length || missing.length) {
      throw new Error(`Receipt changed_paths does not match the worktree (undeclared: ${undeclared.join(", ") || "none"}; missing: ${missing.join(", ") || "none"})`);
    }
  }

  const add = await runGit(worktree, ["add", "--", allowedRoot]);
  if (add.exitCode !== 0) throw new Error(`Could not stage bounded research evidence: ${add.stderr || add.stdout}`);
  const staged = await runGit(worktree, ["diff", "--cached", "--name-only", "--", allowedRoot]);
  const stagedPaths = staged.stdout ? staged.stdout.split(/\r?\n/).filter(Boolean).map((path) => path.replace(/\\/g, "/")) : [];
  if (!stagedPaths.length || stagedPaths.some((path) => path !== allowedRoot && !path.startsWith(`${allowedRoot}/`))) {
    throw new Error("Bounded research evidence did not produce an exact scoped staging set");
  }
  const commit = await runGit(worktree, ["commit", "-m", `Freeze ${taskId} research evidence`, "--", allowedRoot]);
  if (commit.exitCode !== 0) throw new Error(`Could not freeze bounded research evidence: ${commit.stderr || commit.stdout}`);
  const remaining = await runGit(worktree, ["status", "--porcelain=v1", "--untracked-files=all"]);
  if (remaining.exitCode !== 0 || remaining.stdout) throw new Error(`Evidence commit left unexpected worktree changes: ${remaining.stderr || remaining.stdout}`);
  const head = await runGit(worktree, ["rev-parse", "HEAD"]);
  if (head.exitCode !== 0 || !/^[0-9a-f]{40}$/i.test(head.stdout)) throw new Error(`Could not resolve the evidence commit: ${head.stderr || head.stdout}`);
  return head.stdout;
}

/** Reconciles observer facts into durable wave membership, receipts, schedules, and phase projection. */
export class ObservationSyncService {
  constructor(
    private readonly database: Database,
    private readonly waves: WaveRepository,
    private readonly waveCommands: WaveCommandService,
    private readonly schedules: WaveScheduleRepository,
    private readonly port: ObservationSyncPort,
  ) {}

  async synchronizeProject(projectId: string, lanes: LaneSnapshot[]): Promise<{
    activeLanes: LaneSnapshot[];
    accounting: Record<string, number | boolean> | null;
  }> {
    const activeLanes = lanes.filter((lane) => lane.lifecycle === "active");
    await this.syncResearchRuns(projectId, lanes);
    const accounting = this.syncWaveLanes(projectId, activeLanes);
    const derived = deriveCampaignPhase(lanes);
    this.port.observeActivity(projectId, {
      phase: derived,
      active: activeLanes.length,
      running: activeLanes.filter((lane) => !TERMINAL_DAEMONS.has(String(lane.daemon).toLowerCase())).length,
      terminal: activeLanes.filter((lane) => TERMINAL_DAEMONS.has(String(lane.daemon).toLowerCase())).length,
      summary: accounting ? { waveAccounting: accounting } : {},
    });
    return { activeLanes, accounting };
  }

  syncWaveMembers(projectId: string, lanes: LaneSnapshot[]): Record<string, number | boolean> | null {
    return this.syncWaveLanes(projectId, lanes);
  }

  private async syncResearchRuns(projectId: string, lanes: LaneSnapshot[]): Promise<void> {
    const runs = this.database.query(`
      SELECT * FROM campaign_research_runs
      WHERE project_id = $project AND status IN ('launching', 'running', 'blocked', 'awaiting_evidence', 'evidence_ready')
      ORDER BY created_at
    `).all({ $project: projectId }) as ResearchRunRow[];
    if (!runs.length) return;
    let changed = false;
    for (const run of runs) {
      const lane = lanes.find((candidate) => candidate.task === run.task_id || candidate.id === run.lane_id || candidate.jobId === run.job_id);
      if (!lane) continue;
      const terminal = TERMINAL_DAEMONS.has(String(lane.daemon).toLowerCase());
      const terminalFailure = terminal && laneFailure(lane);
      const blocked = !terminal && (String(lane.tempo).toLowerCase() === "blocked" || lane.severity === "attention");
      let status = terminalFailure ? "failed" : terminal ? "awaiting_evidence" : blocked ? "blocked" : "running";
      let error = terminalFailure
        ? (lane.detail || lane.output || lane.attentionReason || `Worker terminated with ${lane.daemon} before producing validated evidence.`)
        : blocked ? (lane.detail || lane.attentionReason || "Worker requires attention before research can continue.") : "";
      let evidenceSha256 = "";
      let evidenceJson = "{}";
      const settledSignal = terminal || (blocked && Number(lane.inFlight || 0) === 0);
      if (settledSignal && run.worktree && run.evidence_path) {
        const evidencePath = resolve(run.worktree, run.evidence_path);
        if (within(run.worktree, evidencePath)) {
          try {
            const content = await readFile(evidencePath, "utf8");
            const receipt = JSON.parse(content.replace(/^\uFEFF/, ""));
            assertTerminalResearchReceipt(receipt, run.task_id);
            await validateReceiptArtifacts(run.worktree, run.evidence_path, receipt);
            if (!terminal && !(await committedWorktreeFileMatches(run.worktree, run.evidence_path))) {
              await freezeCompletedResearchEvidence(run.worktree, run.evidence_path, receipt, run.task_id);
              if (!(await committedWorktreeFileMatches(run.worktree, run.evidence_path))) {
                throw new Error("Landing repair did not bind the terminal receipt to the worktree HEAD commit");
              }
            }
            evidenceSha256 = `sha256:${sha256Text(content)}`;
            evidenceJson = JSON.stringify(receipt);
            status = "evidence_ready";
            error = "";
          } catch (receiptError) {
            if (terminal || (receiptError as NodeJS.ErrnoException)?.code !== "ENOENT") {
              error = receiptError instanceof Error ? `Evidence receipt is not ready: ${receiptError.message}` : "Evidence receipt is not ready.";
            }
          }
        }
      }
      if (status === run.status && lane.id === run.lane_id && lane.jobId === run.job_id && evidenceSha256 === run.evidence_sha256 && evidenceJson === run.evidence_json && error === run.error) continue;
      const stamp = this.port.now();
      const measurement = run.measured_tokens === null && status === "evidence_ready"
        ? deriveReceiptBoundMeasurement({ evidenceSha256, observedTokens: lane.tokens, createdAt: run.created_at, settledAt: stamp })
        : null;
      this.database.query(`
        UPDATE campaign_research_runs
        SET status = $status, lane_id = $lane, job_id = $job, evidence_sha256 = $evidence, evidence_json = $evidenceJson, error = $error,
          measured_tokens = COALESCE(measured_tokens, $measuredTokens),
          measured_wall_seconds = CASE WHEN measured_tokens IS NULL AND $measuredTokens IS NOT NULL THEN $measuredWallSeconds ELSE measured_wall_seconds END,
          measurement_source = CASE WHEN measured_tokens IS NULL AND $measuredTokens IS NOT NULL THEN $measurementSource ELSE measurement_source END,
          measurement_at = CASE WHEN measured_tokens IS NULL AND $measuredTokens IS NOT NULL THEN $measurementAt ELSE measurement_at END,
          updated_at = $now, completed_at = $completed
        WHERE run_id = $run
      `).run({
        $status: status, $lane: lane.id, $job: lane.jobId, $evidence: evidenceSha256, $evidenceJson: evidenceJson,
        $measuredTokens: measurement?.tokens ?? null, $measuredWallSeconds: measurement?.wallSeconds ?? 0,
        $measurementSource: measurement?.source ?? "", $measurementAt: measurement?.measuredAt ?? "",
        $error: error.slice(0, 4000), $now: stamp, $completed: terminal || status === "evidence_ready" ? stamp : "", $run: run.run_id,
      });
      const requestStatus = status === "failed" ? "approved_for_dispatch" : status;
      this.database.query("UPDATE campaign_research_requests SET status = $status, updated_at = $now WHERE request_id = $request")
        .run({ $status: requestStatus, $now: stamp, $request: run.request_id });
      const schedule = this.schedules.latest(projectId, run.wave_id);
      if (schedule && this.schedules.members(schedule.schedule_id).some((member) => member.request_id === run.request_id)) {
        this.schedules.transitionMember(schedule.schedule_id, run.request_id, status, run.run_id, error.slice(0, 4000), stamp);
      }
      this.port.recordEvent(projectId, "research_run", run.run_id, status === "evidence_ready" ? "research.run.evidence-ready" : status === "failed" ? "research.run.failed" : terminal ? "research.run.terminal" : blocked ? "research.run.blocked" : "research.run.observed", {
        taskId: run.task_id, laneId: lane.id, jobId: lane.jobId, status, evidenceSha256,
        measurement: measurement ? { tokens: measurement.tokens, wallSeconds: measurement.wallSeconds, source: measurement.source, measuredAt: measurement.measuredAt } : null,
      });
      changed = true;
    }
    if (!changed) return;
    const current = this.port.project(projectId);
    const active = this.database.query(`
      SELECT COUNT(*) AS count FROM campaign_research_runs
      WHERE project_id = $project AND status IN ('launching', 'running', 'blocked')
    `).get({ $project: projectId }) as { count: number } | null;
    const phase = active?.count ? "RESEARCH_RUNNING" : "RESEARCH_INTAKE";
    if (!active?.count) {
      const wave = this.waves.latest(projectId);
      const schedule = wave ? this.schedules.latest(projectId, wave.wave_id) : null;
      if (schedule && ["dispatching", "running", "attention"].includes(schedule.status)) {
        const members = this.schedules.members(schedule.schedule_id);
        if (members.length && members.every((member) => !["reserved", "launching", "running", "blocked"].includes(member.status))) {
          this.schedules.transitionSchedule(schedule.schedule_id, members.every((member) => member.status === "failed") ? "failed" : "landed", this.port.now());
        }
      }
    }
    if (current.current_phase !== phase) {
      this.port.transitionProject(projectId, phase, "research-run-observation");
    }
  }

  private syncWaveLanes(projectId: string, lanes: LaneSnapshot[]): Record<string, number | boolean> | null {
    const wave = this.waves.latest(projectId);
    if (!wave || ["DECISION_REQUIRED", "RESEARCH_REVIEW", "REVISING", "NEXT_WAVE_READY"].includes(wave.phase)) {
      return wave ? waveAccounting(this.waves.members(wave.wave_id)) : null;
    }
    return this.waveCommands.syncObservedMembers(wave, lanes, this.port.now());
  }
}
