import { afterEach, describe, expect, test } from "bun:test";
import { Database } from "bun:sqlite";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createHash } from "node:crypto";
import { CampaignControl, deriveCampaignPhase, freezeResearchLaunchPackets, requireCleanContractWorkspace, researchDependencySatisfied } from "../src/campaign";
import { CampaignReadService } from "../src/campaign-read-service";
import type { CodexNotification, CodexServerRequest, CodexThreadSummary } from "../src/codex";
import type { LaneSnapshot, ObserverSnapshot } from "../src/types";

const fixtureRoot = join(import.meta.dir, "fixtures");
const temporaryRoots: string[] = [];

function git(root: string, ...args: string[]) {
  const result = Bun.spawnSync(["git", "-C", root, ...args], { stdout: "pipe", stderr: "pipe" });
  if (result.exitCode !== 0) throw new Error(new TextDecoder().decode(result.stderr));
  return new TextDecoder().decode(result.stdout).trim();
}

afterEach(async () => {
  for (const root of temporaryRoots.splice(0)) {
    for (let attempt = 0; attempt < 10; attempt++) {
      try {
        rmSync(root, { recursive: true, force: true });
        break;
      } catch (error: any) {
        if (error?.code !== "EBUSY") throw error;
        if (attempt === 9) break;
        await Bun.sleep(20);
      }
    }
  }
});

test("dependency readiness normalizes accepted terminal-state receipts", () => {
  const spec = { taskId: "successor", dependsOnTaskIds: ["producer"], dependsOnEvidenceStatuses: ["complete"] } as any;
  const run = (receipt: Record<string, unknown>) => [{
    task_id: "producer", status: "returned_to_sol", evidence_json: JSON.stringify(receipt),
  }] as any;

  expect(researchDependencySatisfied(spec, run({ schema: "cfg23-research-evidence/v1", terminal_state: "SUPPORTED" }))).toBe(true);
  expect(researchDependencySatisfied(spec, run({ schema: "cfg23-research-evidence/v1", verdict: "INCONCLUSIVE" }))).toBe(true);
  expect(researchDependencySatisfied(spec, run({ schema: "cfg23-research-evidence/v1", status: "blocked_at_preflight", verdict: "BLOCKED" }))).toBe(false);
});

test("checked launch packets are frozen without absorbing unrelated work", async () => {
  const root = mkdtempSync(join(tmpdir(), "lane-watch-contract-git-"));
  temporaryRoots.push(root);
  git(root, "init");
  git(root, "config", "user.name", "Lane Watch Test");
  git(root, "config", "user.email", "lane-watch@example.invalid");
  writeFileSync(join(root, "README.md"), "campaign\n");
  git(root, "add", "--", "README.md");
  git(root, "commit", "-m", "Initialize campaign");

  expect(await requireCleanContractWorkspace(root)).toBe(true);
  const nested = join(root, "nested-campaign");
  mkdirSync(nested);
  expect(await requireCleanContractWorkspace(nested)).toBe(false);
  mkdirSync(join(root, "packets", "launch"), { recursive: true });
  writeFileSync(join(root, "packets", "launch", "checked.md"), "checked contract\n");
  const commit = await freezeResearchLaunchPackets(root, ["packets/launch/checked.md"], true);
  expect(commit).toMatch(/^[0-9a-f]{40}$/);
  expect(git(root, "status", "--porcelain=v1", "--untracked-files=all")).toBe("");
  expect(git(root, "show", "HEAD:packets/launch/checked.md")).toBe("checked contract");

  writeFileSync(join(root, "packets", "launch", "checked.md"), "revised checked contract\n");
  const revisedCommit = await freezeResearchLaunchPackets(root, ["packets/launch/checked.md"], true);
  expect(revisedCommit).not.toBe(commit);
  expect(git(root, "status", "--porcelain=v1", "--untracked-files=all")).toBe("");
  expect(git(root, "show", "HEAD:packets/launch/checked.md")).toBe("revised checked contract");

  writeFileSync(join(root, "unrelated.txt"), "operator work\n");
  await expect(requireCleanContractWorkspace(root)).rejects.toThrow("uncommitted changes before launch-contract compilation");
  expect(git(root, "status", "--porcelain=v1", "--untracked-files=all")).toContain("unrelated.txt");
}, 30_000);

function lane(overrides: Partial<LaneSnapshot> = {}): LaneSnapshot {
  return {
    id: "demo:windows:prove-the-lemma",
    project: "demo",
    host: "windows",
    task: "prove-the-lemma",
    lane: "DKW-LSA",
    name: "demo lane",
    model: "sonnet",
    effort: "high",
    laneKind: "research",
    parentAgent: "demo-sonnet-worker",
    jobId: "abcd1234",
    sessionId: "session-1",
    lifecycle: "active",
    daemon: "done",
    tempo: "idle",
    status: "Done, reconciliation pending",
    severity: "attention",
    attentionReason: "terminal-unrecorded",
    detail: "finished",
    output: "lemma checked",
    tokens: 100,
    inFlight: 0,
    queued: 0,
    activities: [],
    topology: null,
    timeline: [],
    landing: "READY_FOR_SEMANTIC_REVIEW",
    branch: "agent/local-sonnet/prove-the-lemma",
    worktree: "C:/tmp/demo",
    launchedAt: "2026-08-26T00:00:00.000Z",
    updatedAt: "2026-08-26T01:00:00.000Z",
    completedAt: "2026-08-26T01:00:00.000Z",
    ...overrides,
  };
}

function observer(lanes: LaneSnapshot[]): ObserverSnapshot {
  return {
    generatedAt: new Date().toISOString(),
    version: 1,
    lanes,
    counts: {
      working: lanes.filter((item) => item.severity === "working").length,
      idle: lanes.filter((item) => item.severity === "idle").length,
      attention: lanes.filter((item) => item.severity === "attention" || item.severity === "unknown").length,
      complete: lanes.filter((item) => item.severity === "complete").length,
      total: lanes.length,
    },
    sources: [],
  };
}

class FakeCodex {
  notifications: Array<(notification: CodexNotification) => void> = [];
  requests: Array<(request: CodexServerRequest) => void> = [];
  errors: Array<(error: Error) => void> = [];
  listCalls = 0;
  startCalls = 0;
  startBarrier: Promise<void> | null = null;
  startParams: Record<string, unknown> | null = null;
  startThreadParams: Record<string, unknown> | null = null;
  nextTurnId = "turn_synthesis";
  resumeError = "";
  forkCalls: string[] = [];
  steerCalls: Array<{ threadId: string; turnId: string; text: string }> = [];
  responses: Array<{ requestId: string | number; result: unknown }> = [];
  thread: CodexThreadSummary = {
    id: "thr_sol",
    name: "Sol · demo",
    cwd: join(fixtureRoot, "project"),
    model: "gpt-5.6-sol",
    status: "idle",
    createdAt: "",
    updatedAt: "",
  };

  onNotification(listener: (notification: CodexNotification) => void) { this.notifications.push(listener); return () => undefined; }
  onServerRequest(listener: (request: CodexServerRequest) => void) { this.requests.push(listener); return () => undefined; }
  onError(listener: (error: Error) => void) { this.errors.push(listener); return () => undefined; }
  async listThreads() { this.listCalls += 1; return [this.thread]; }
  async readThread() { return this.thread; }
  async readThreadDetail() {
    return {
      ...this.thread,
      turns: [{
        id: "turn_history",
        status: "completed",
        items: [
          { id: "user_history", type: "userMessage", content: [{ type: "text", text: "What remains?" }] },
          { id: "tool_history", type: "commandExecution", command: "secret-tool-command" },
          { id: "agent_history", type: "agentMessage", text: "One bounded repair lane remains." },
        ],
      }],
    };
  }
  async resumeThread() { if (this.resumeError) throw new Error(this.resumeError); }
  async forkThread(threadId: string) {
    this.forkCalls.push(threadId);
    return { ...this.thread, id: "thr_sol_control", name: "Untitled Codex task", status: "idle" };
  }
  async startThread(params: Record<string, unknown>) {
    this.startThreadParams = params;
    return { ...this.thread, id: "thr_strategy", name: "Independent strategy review", status: "idle" };
  }
  async startTurn(params: Record<string, unknown>) {
    this.startCalls += 1;
    this.startParams = params;
    if (this.startBarrier) await this.startBarrier;
    return { id: this.nextTurnId };
  }
  async steerTurn(threadId: string, turnId: string, text: string) { this.steerCalls.push({ threadId, turnId, text }); }
  async interruptTurn() {}
  async respond(requestId: string | number, result: unknown) { this.responses.push({ requestId, result }); }
  stop() {}

  emit(notification: CodexNotification) {
    for (const listener of this.notifications) listener(notification);
  }

  emitRequest(request: CodexServerRequest) {
    for (const listener of this.requests) listener(request);
  }
}

async function waitForAction(control: CampaignControl, projectId: string, type: string): Promise<any> {
  for (let attempt = 0; attempt < 1000; attempt++) {
    const project = (control.snapshot() as any).projects.find((item: any) => item.id === projectId);
    const action = project.actions.find((item: any) => item.type === type);
    if (action && action.status !== "queued" && action.status !== "running") return action;
    await Bun.sleep(10);
  }
  throw new Error(`Timed out waiting for ${type}`);
}

async function waitForProject(control: CampaignControl, projectId: string, predicate: (project: any) => boolean): Promise<any> {
  for (let attempt = 0; attempt < 1000; attempt++) {
    const project = (control.snapshot() as any).projects.find((item: any) => item.id === projectId);
    if (project && predicate(project)) return project;
    await Bun.sleep(10);
  }
  throw new Error("Timed out waiting for the expected project state");
}

describe("deriveCampaignPhase", () => {
  test("distinguishes running, reconciliation, semantic readiness, and blocking", () => {
    expect(deriveCampaignPhase([])).toBe("PLANNING");
    expect(deriveCampaignPhase([lane({ daemon: "working", landing: "—" })])).toBe("RUNNING");
    expect(deriveCampaignPhase([lane({ landing: "CUSTODY_READY_CHECKS_REQUIRED" })])).toBe("RECONCILING");
    expect(deriveCampaignPhase([lane()])).toBe("SYNTHESIS_READY");
    expect(deriveCampaignPhase([lane({ daemon: "failed" })])).toBe("BLOCKED");
  });
});

test("observer activity cannot cross a durable human-gate phase", async () => {
  const root = mkdtempSync(join(tmpdir(), "lane-watch-held-phase-"));
  temporaryRoots.push(root);
  const hub = join(root, "hub");
  const projectRoot = join(root, "project");
  const dataDir = join(root, "data");
  mkdirSync(hub, { recursive: true });
  mkdirSync(projectRoot, { recursive: true });
  writeFileSync(join(hub, "projects.json"), JSON.stringify({ projects: [{ id: "demo", path: "../project", local_agent_coordinator: "tools/local_agent_coord.ps1" }] }));
  const control = await CampaignControl.create(dataDir, join(hub, "projects.json"), new FakeCodex() as any);
  await control.observe(observer([]));
  const database = new Database(join(dataDir, "observer.sqlite"));
  database.query("UPDATE campaign_projects SET current_phase = 'BLOCKED' WHERE project_id = 'demo'").run();
  database.close();

  await control.observe(observer([lane({ daemon: "working", tempo: "active", severity: "working", landing: "—", attentionReason: "" })]));
  const project = (control.snapshot() as any).projects.find((item: any) => item.id === "demo");
  expect(project.phase).toBe("BLOCKED");
  expect(project.controlState).toMatchObject({
    workflow: { phase: "BLOCKED" },
    observation: { phase: "RUNNING", active: 1, running: 1, workflowMutation: false },
  });
  control.stop();
});

test("manual reconciliation refuses an externally owned terminal lane", async () => {
  const root = mkdtempSync(join(tmpdir(), "lane-watch-external-ownership-"));
  temporaryRoots.push(root);
  const hub = join(root, "hub");
  const projectRoot = join(root, "project");
  const dataDir = join(root, "data");
  mkdirSync(hub, { recursive: true });
  mkdirSync(projectRoot, { recursive: true });
  writeFileSync(join(hub, "projects.json"), JSON.stringify({ projects: [{ id: "demo", path: "../project", local_agent_coordinator: "tools/local_agent_coord.ps1" }] }));
  const control = await CampaignControl.create(dataDir, join(hub, "projects.json"), new FakeCodex() as any);
  const external = lane({ landing: "—", attentionReason: "terminal-unrecorded" });
  await control.observe(observer([external]));
  const project = (control.snapshot() as any).projects[0];

  await control.enqueueAction({
    projectId: "demo",
    type: "lane.reconcile",
    targetId: external.id,
    idempotencyKey: "refuse-external-reconciliation",
    expectedVersion: project.version,
  }, "test-operator");
  const action = await waitForAction(control, "demo", "lane.reconcile");
  expect(action.status).toBe("failed");
  expect(action.error).toContain("Lane Watch does not own this lane");
  control.stop();
});

test("a digest-bound recovery report aligns only the explicitly chosen historical boundary", async () => {
  const root = mkdtempSync(join(tmpdir(), "lane-watch-recovery-action-"));
  temporaryRoots.push(root);
  const hub = join(root, "hub");
  const projectRoot = join(root, "project");
  const dataDir = join(root, "data");
  mkdirSync(hub, { recursive: true });
  mkdirSync(projectRoot, { recursive: true });
  writeFileSync(join(hub, "projects.json"), JSON.stringify({ projects: [{ id: "demo", path: "../project", local_agent_coordinator: "tools/local_agent_coord.ps1" }] }));
  const control = await CampaignControl.create(dataDir, join(hub, "projects.json"), new FakeCodex() as any);
  await control.observe(observer([]));
  const database = new Database(join(dataDir, "observer.sqlite"));
  const stamp = "2026-08-30T02:00:00.000Z";
  database.query("UPDATE campaign_projects SET current_phase = 'BLOCKED' WHERE project_id = 'demo'").run();
  database.query(`
    INSERT INTO campaign_waves(wave_id, project_id, label, phase, lane_ids_json, evidence_digest, bundle_path, synthesis_turn_id, created_at, updated_at)
    VALUES ('demo-wave-recovery', 'demo', 'Historical recovery wave', 'DECISION_REQUIRED', '["demo:windows:historical"]', 'sha256:historical', '', '', $now, $now)
  `).run({ $now: stamp });
  database.query(`
    INSERT INTO campaign_wave_lanes(wave_id, lane_id, accounting_state, disposition, reason, snapshot_json, updated_at)
    VALUES ('demo-wave-recovery', 'demo:windows:historical', 'RUNNING', '', '', '{}', $now)
  `).run({ $now: stamp });
  database.close();
  await control.observe(observer([]));
  let project = (control.snapshot() as any).projects[0];
  expect(project.controlState.recovery.status).toBe("HUMAN_RECONCILIATION_REQUIRED");

  await control.enqueueAction({
    projectId: "demo", type: "campaign.recovery.prepare",
    idempotencyKey: "prepare-historical-recovery", expectedVersion: project.version,
  }, "test-operator");
  expect((await waitForAction(control, "demo", "campaign.recovery.prepare")).status).toBe("completed");
  project = (control.snapshot() as any).projects[0];
  expect(project.recoveryReport).toMatchObject({ status: "prepared", waveId: "demo-wave-recovery" });
  expect(project.recoveryReport.reportDigest).toStartWith("sha256:");

  await control.enqueueAction({
    projectId: "demo", type: "campaign.recovery.apply",
    idempotencyKey: "apply-historical-wave-alignment", expectedVersion: project.version,
    args: {
      reportId: project.recoveryReport.id,
      reportDigest: project.recoveryReport.reportDigest,
      decision: "ALIGN_WAVE_TO_WORKFLOW",
      confirmation: "APPLY CAMPAIGN RECOVERY",
      note: "Align only the obsolete wave record; retain the blocked research direction.",
    },
  }, "test-operator");
  expect((await waitForAction(control, "demo", "campaign.recovery.apply")).status).toBe("completed");
  project = (control.snapshot() as any).projects[0];
  expect(project).toMatchObject({
    phase: "BLOCKED",
    wave: { phase: "BLOCKED" },
    controlState: { recovery: { status: "ALIGNED", required: false } },
    recoveryReport: { status: "applied", decision: "ALIGN_WAVE_TO_WORKFLOW" },
  });
  control.stop();
});

test("scoped read snapshots avoid full evidence and bound durable history", async () => {
  const root = mkdtempSync(join(tmpdir(), "lane-watch-scoped-read-"));
  temporaryRoots.push(root);
  const hub = join(root, "hub");
  const projectRoot = join(root, "project");
  const dataDir = join(root, "data");
  mkdirSync(hub, { recursive: true });
  mkdirSync(projectRoot, { recursive: true });
  writeFileSync(join(hub, "projects.json"), JSON.stringify({ projects: [{ id: "demo", path: "../project", local_agent_coordinator: "tools/local_agent_coord.ps1" }] }));
  const control = await CampaignControl.create(dataDir, join(hub, "projects.json"), new FakeCodex() as any);
  await control.observe(observer([]));
  const database = new Database(join(dataDir, "observer.sqlite"));
  const evidence = { schema: "research-evidence/v1", status: "complete", verdict: "SUPPORTED", summary: "The bounded check landed.", payload: "x".repeat(20_000) };
  database.query(`INSERT INTO campaign_research_runs(
    run_id, request_id, project_id, wave_id, task_id, status, profile, host, model, effort, fanout,
    packet_path, base_ref, lane_id, job_id, worktree, evidence_path, evidence_sha256, evidence_json,
    error, created_at, updated_at, completed_at
  ) VALUES ('run-1', 'request-1', 'demo', 'wave-1', 'bounded-check', 'evidence_ready', 'sonnet-worker', 'windows', 'sonnet', 'high', 0,
    '', '', '', '', '', '', 'sha256:evidence', $evidence, '', '2026-08-28T00:00:00Z', '2026-08-28T00:00:00Z', '2026-08-28T00:00:00Z')`).run({ $evidence: JSON.stringify(evidence) });
  const insertEvent = database.query(`INSERT INTO campaign_events(event_id, project_id, aggregate_type, aggregate_id, event_type, payload_json, created_at)
    VALUES ($id, 'demo', 'wave', 'wave-1', 'wave.observed', '{}', $at)`);
  database.transaction(() => {
    for (let index = 0; index < 30; index++) insertEvent.run({ $id: `event-${index}`, $at: `2026-08-28T00:${String(index).padStart(2, "0")}:00Z` });
  })();
  database.close();

  const scoped = control.snapshot({ projectId: "demo", historyLimit: 7, evidenceMode: "summary" }) as any;
  expect(scoped.projects).toHaveLength(1);
  expect(scoped.projects[0].researchRuns[0]).not.toHaveProperty("evidence");
  expect(scoped.projects[0].researchRuns[0]).toMatchObject({ evidenceDetailAvailable: true, evidenceSummary: { schema: "research-evidence/v1", verdict: "SUPPORTED" } });
  expect(scoped.projects[0].workflowHistory).toHaveLength(7);
  expect(scoped.projects[0].workflowHistorySummary).toMatchObject({ returned: 7, detailAvailable: true });
  expect(scoped.projects[0].workflowHistorySummary.total).toBeGreaterThanOrEqual(30);
  expect(scoped.projects[0].strategy).toMatchObject({ mode: "shadow", charter: { revision: 1 }, workspace: { reviewAvailable: true } });
  expect(scoped.projects[0].custody).toMatchObject({ schema: "campaign-custody-service/v1", protocol: { schema: "campaign-custody-adapter-protocol/v1" } });
  expect(scoped.projects[0].resources).toMatchObject({
    schema: "campaign-resource-ledger/v1", mode: "shadow", schedulerAuthority: "none",
    calibration: { schema: "campaign-resource-calibration/v1", status: "INSUFFICIENT", schedulerAuthority: "none", policyChangeAllowed: false },
  });
  expect(JSON.stringify(scoped)).not.toContain(evidence.payload);

  const full = control.snapshot({ projectId: "demo" }) as any;
  expect(full.projects[0].researchRuns[0].evidence.payload).toBe(evidence.payload);
  const index = control.indexSnapshot() as any;
  expect(index.projects).toHaveLength(1);
  expect(index.projects[0]).not.toHaveProperty("researchRuns");
  const reads = new CampaignReadService(control, dataDir);
  const compact = reads.compactSnapshot("demo");
  expect(compact.projectIndex).toHaveLength(1);
  expect(compact.projects[0].workflowHistorySummary.total).toBeGreaterThanOrEqual(30);
  expect(compact.projects[0].researchRuns[0]).not.toHaveProperty("evidence");
  const history = reads.workflowHistory("demo", "", 5)!;
  expect(history.returned).toBe(5);
  expect(history.total).toBeGreaterThanOrEqual(30);
  expect(history.nextCursor).not.toBeNull();
  const programHistory = reads.programHistory("demo") as any;
  expect(programHistory).toMatchObject({ schema: "campaign-program-history/v1", projectId: "demo", mode: "read-only" });
  expect(programHistory.counts.epochs).toBeGreaterThanOrEqual(1);
  expect(reads.researchRun("demo", "run-1")?.evidence.payload).toBe(evidence.payload);
  reads.stop();
  control.stop();
});

test("the DOC-A1 operator gate preflights exact bytes before making local custody commits", async () => {
  const root = mkdtempSync(join(tmpdir(), "lane-watch-doc-a1-"));
  temporaryRoots.push(root);
  const hub = join(root, "hub");
  const projectRoot = join(root, "project");
  const dataDir = join(root, "data");
  mkdirSync(hub, { recursive: true });
  mkdirSync(projectRoot, { recursive: true });
  writeFileSync(join(hub, "projects.json"), JSON.stringify({ projects: [{ id: "demo", path: "../project", local_agent_coordinator: "tools/local_agent_coord.ps1" }] }));

  git(projectRoot, "init", "-b", "main");
  git(projectRoot, "config", "user.name", "Lane Watch Test");
  git(projectRoot, "config", "user.email", "lane-watch@example.invalid");
  const canonicalRoot = join(projectRoot, "artifacts", "trade37-pin-gate-repair-v2-1");
  mkdirSync(join(canonicalRoot, "output"), { recursive: true });
  writeFileSync(join(projectRoot, "README.md"), "campaign\n");
  writeFileSync(join(canonicalRoot, "CONTRACT.md"), "historical contract\n");
  writeFileSync(join(canonicalRoot, "output", "preimage-spec.json"), "{\"version\":\"historical\"}\n");
  writeFileSync(join(canonicalRoot, "evidence-receipt.json"), "{\"status\":\"historical\"}\n");
  git(projectRoot, "add", "--", ".");
  git(projectRoot, "commit", "-m", "Historical producer authority");
  const historicalCommit = git(projectRoot, "rev-parse", "HEAD");
  const historicalHash = (path: string) => createHash("sha256").update(readFileSync(path)).digest("hex");
  const historicalContractHash = historicalHash(join(canonicalRoot, "CONTRACT.md"));
  const historicalPreimageHash = historicalHash(join(canonicalRoot, "output", "preimage-spec.json"));
  const historicalReceiptHash = historicalHash(join(canonicalRoot, "evidence-receipt.json"));

  const sourceBranch = "agent/local-sonnet/trade37-v21-doc-a1-authority-instantiation";
  git(projectRoot, "checkout", "-b", sourceBranch);
  const candidateRoot = join(projectRoot, "artifacts", "trade37-v21-doc-a1-authority-instantiation", "candidate");
  mkdirSync(join(candidateRoot, "output"), { recursive: true });
  writeFileSync(join(candidateRoot, "CONTRACT.md"), "approved DOC-A1 contract\n");
  writeFileSync(join(candidateRoot, "output", "preimage-spec.json"), "{\"version\":\"DOC-A1\"}\n");
  const contractHash = historicalHash(join(candidateRoot, "CONTRACT.md"));
  const preimageHash = historicalHash(join(candidateRoot, "output", "preimage-spec.json"));
  git(projectRoot, "add", "--", "artifacts/trade37-v21-doc-a1-authority-instantiation");
  git(projectRoot, "commit", "-m", "Stage exact DOC-A1 bytes");
  const stagedCommit = git(projectRoot, "rev-parse", "HEAD");
  writeFileSync(join(projectRoot, "staging-receipt.json"), "{\"status\":\"staged\"}\n");
  git(projectRoot, "add", "--", "staging-receipt.json");
  git(projectRoot, "commit", "-m", "Record staging receipt");
  const sourceHead = git(projectRoot, "rev-parse", "HEAD");
  git(projectRoot, "checkout", "main");
  writeFileSync(join(projectRoot, "main-marker.txt"), "main custody\n");
  git(projectRoot, "add", "--", "main-marker.txt");
  git(projectRoot, "commit", "-m", "Advance main custody ledger");
  const baseHead = git(projectRoot, "rev-parse", "HEAD");

  const control = await CampaignControl.create(dataDir, join(hub, "projects.json"), new FakeCodex() as any);
  await control.observe(observer([]));
  const database = new Database(join(dataDir, "observer.sqlite"));
  const stamp = "2026-08-27T20:00:00.000Z";
  const waveId = "demo-wave-doc-a1";
  const followupRequestId = "cold-replay-request";
  const planResponse = {
    decision: "BLOCKED",
    operatorGuidance: "Approve the exact DOC-A1 bytes, mint the successor receipt, then replan.",
    lanes: [
      { requestId: "operator-transition", taskId: "operator-doc-a1-canonical-transition", action: "DROP", contract: { status: "NOT_LAUNCHABLE", baseRef: "" } },
      { requestId: followupRequestId, taskId: "trade37-v21-doc-a1-successor-cold-replay", action: "REVISE", contract: { status: "AFTER_DEPENDENCY", baseRef: "" } },
    ],
  };
  database.query("UPDATE campaign_projects SET current_phase = 'RESEARCH_REVIEW', updated_at = $now WHERE project_id = 'demo'").run({ $now: stamp });
  database.query(`INSERT INTO campaign_waves(wave_id, project_id, label, phase, lane_ids_json, evidence_digest, bundle_path, synthesis_turn_id, created_at, updated_at)
    VALUES ($wave, 'demo', 'DOC-A1 wave', 'RESEARCH_REVIEW', '[]', 'sha256:plan', '', '', $now, $now)`).run({ $wave: waveId, $now: stamp });
  database.query(`INSERT INTO campaign_research_requests(request_id, project_id, wave_id, question, status, created_at, updated_at)
    VALUES ($request, 'demo', $wave, 'Run the successor cold replay.', 'planned_followup', $now, $now)`).run({ $request: followupRequestId, $wave: waveId, $now: stamp });
  database.query(`INSERT INTO campaign_research_plans(wave_id, project_id, thread_id, turn_id, status, bundle_path, evidence_digest, response_json, created_at, updated_at)
    VALUES ($wave, 'demo', 'thr_sol', 'turn_plan', 'drafted', '', 'sha256:plan', $response, $now, $now)`).run({ $wave: waveId, $response: JSON.stringify(planResponse), $now: stamp });
  const evidence = {
    schema: "cfg23-research-evidence/v1",
    task_id: "trade37-v21-doc-a1-authority-instantiation",
    status: "complete",
    verdict: "SUPPORTED",
    branch: sourceBranch,
    doc_a1_naming: { reconciliation_commit: historicalCommit },
    historical_commit_and_hashes: {
      commit: historicalCommit,
      "CONTRACT.md_sha256": historicalContractHash,
      "preimage-spec.json_sha256": historicalPreimageHash,
      "evidence-receipt.json_sha256": historicalReceiptHash,
    },
    successor_commit_and_hashes: {
      commit: stagedCommit,
      branch: sourceBranch,
      installed_paths: {
        "artifacts/trade37-v21-doc-a1-authority-instantiation/candidate/CONTRACT.md": contractHash,
        "artifacts/trade37-v21-doc-a1-authority-instantiation/candidate/output/preimage-spec.json": preimageHash,
      },
    },
  };
  database.query(`INSERT INTO campaign_research_runs(
    run_id, request_id, project_id, wave_id, task_id, status, profile, host, model, effort, fanout,
    packet_path, base_ref, lane_id, job_id, worktree, evidence_path, evidence_sha256, evidence_json,
    error, created_at, updated_at, completed_at
  ) VALUES ('doc-a1-run', 'doc-a1-source', 'demo', $wave, 'trade37-v21-doc-a1-authority-instantiation', 'returned_to_sol',
    'sonnet-worker', 'windows', 'sonnet', 'high', 0, '', $base, '', '', '', '', 'sha256:evidence', $evidence, '', $now, $now, $now)`)
    .run({ $wave: waveId, $base: baseHead, $evidence: JSON.stringify(evidence), $now: stamp });
  database.close();

  let project = (control.snapshot() as any).projects[0];
  await control.enqueueAction({ projectId: "demo", type: "campaign.operator-transition.prepare", idempotencyKey: "doc-a1-preflight", expectedVersion: project.version }, "test-operator");
  const preflight = await waitForAction(control, "demo", "campaign.operator-transition.prepare");
  expect(preflight.status).toBe("completed");
  expect(preflight.result).toMatchObject({ baseHead, sourceHead, stagedCommit, clean: true, mergeable: true, hashes: { contract: contractHash, preimage: preimageHash } });
  expect(git(projectRoot, "rev-parse", "HEAD")).toBe(baseHead);

  project = (control.snapshot() as any).projects[0];
  await control.enqueueAction({
    projectId: "demo",
    type: "campaign.operator-transition.execute",
    idempotencyKey: "doc-a1-execute",
    expectedVersion: project.version,
    args: { confirmation: "APPROVE DOC-A1", previewActionId: preflight.id, previewDigest: preflight.result.previewDigest },
  }, "test-operator");
  const executed = await waitForAction(control, "demo", "campaign.operator-transition.execute");
  expect(executed.error).toBe("");
  expect(executed.status).toBe("completed");
  expect(executed.result).toMatchObject({ kind: "doc-a1-canonical-transition", previewDigest: preflight.result.previewDigest });
  expect(git(projectRoot, "status", "--porcelain=v1", "--untracked-files=all")).toBe("");
  expect(historicalHash(join(canonicalRoot, "CONTRACT.md"))).toBe(contractHash);
  expect(historicalHash(join(canonicalRoot, "output", "preimage-spec.json"))).toBe(preimageHash);
  const receipt = JSON.parse(readFileSync(join(canonicalRoot, "evidence-receipt.json"), "utf8"));
  expect(receipt).toMatchObject({ amendment_id: "DOC-A1", performed_by: "test-operator", authority_transition: { staging_candidate_commit: stagedCommit, staging_receipt_commit: sourceHead, canonical_document_commit: executed.result.documentCommit } });
  expect(git(projectRoot, "log", "-3", "--format=%s").split(/\r?\n/)).toEqual([
    "DKC: record DOC-A1 authority transition receipt",
    "DKC: install DOC-A1 at canonical producer paths",
    "DKC: intake DOC-A1 staging lineage",
  ]);
  project = (control.snapshot() as any).projects[0];
  expect(project.researchPlan.status).toBe("superseded");
  expect(project.researchRequests.find((request: any) => request.id === followupRequestId).status).toBe("proposed");

  const reviewBundle = join(dataDir, "doc-a1-followup-plan.json");
  writeFileSync(reviewBundle, JSON.stringify({ proposedRequests: [{ id: followupRequestId, question: "Run the successor cold replay." }] }));
  const followupPlan = {
    decision: "READY_FOR_GATE",
    operatorGuidance: `Launch only the independent replay at ${executed.result.receiptCommit}.`,
    lanes: [{
      requestId: followupRequestId,
      action: "REVISE",
      question: "Independently replay the receipt-bearing DOC-A1 state.",
      taskId: "trade37-v21-doc-a1-successor-cold-replay",
      profile: "sonnet-worker",
      priority: 1,
      dependsOnTaskIds: [],
      rationale: "One bounded replay closes the custody chain.",
      stopCondition: "Stop on any mismatch.",
      evidenceExpected: "An independent immutable receipt.",
      contract: { status: "READY", baseRef: executed.result.receiptCommit },
    }],
  };
  const reviewDatabase = new Database(join(dataDir, "observer.sqlite"));
  reviewDatabase.query("UPDATE campaign_research_requests SET status = 'in_review' WHERE request_id = $request")
    .run({ $request: followupRequestId });
  reviewDatabase.query(`INSERT INTO campaign_research_requests(request_id, project_id, wave_id, question, status, created_at, updated_at)
    VALUES ('stale-prior-review', 'demo', $wave, 'Already-accounted operator work.', 'in_review', $now, $now)`)
    .run({ $wave: waveId, $now: stamp });
  reviewDatabase.query(`UPDATE campaign_research_plans SET status = 'drafted', bundle_path = $bundle, response_json = $response, updated_at = $now WHERE wave_id = $wave`)
    .run({ $bundle: reviewBundle, $response: JSON.stringify(followupPlan), $now: stamp, $wave: waveId });
  reviewDatabase.close();
  project = (control.snapshot() as any).projects[0];
  await control.enqueueAction({
    projectId: "demo",
    type: "research.review.resolve",
    idempotencyKey: "approve-doc-a1-followup",
    expectedVersion: project.version,
    args: { decision: "approve", note: "Approve the exact receipt-bound replay." },
  }, "test-operator");
  const resolved = await waitForAction(control, "demo", "research.review.resolve");
  expect(resolved.error).toBe("");
  expect(resolved.result).toMatchObject({ approved: 1, retiredStale: 1, phase: "RESEARCH_READY" });
  project = (control.snapshot() as any).projects[0];
  expect(project.researchRequests.find((request: any) => request.id === followupRequestId).status).toBe("approved_for_dispatch");
  expect(project.researchRequests.find((request: any) => request.id === "stale-prior-review").status).toBe("plan_excluded");
  control.stop();
}, 60_000);

test("prepare mode freezes a digest-bound synthesis bundle", async () => {
  const dataDir = mkdtempSync(join(tmpdir(), "lane-watch-campaign-"));
  temporaryRoots.push(dataDir);
  const control = await CampaignControl.create(
    dataDir,
    join(fixtureRoot, "hub", "projects.json"),
    new FakeCodex() as any,
  );
  const observed = observer([lane()]);
  await control.observe(observed);
  let project = (control.snapshot() as any).projects[0];
  await control.enqueueAction({
    projectId: "demo",
    type: "wave.adopt",
    idempotencyKey: "adopt-before-automatic-synthesis",
    expectedVersion: project.version,
  }, "test-operator");
  expect((await waitForAction(control, "demo", "wave.adopt")).status).toBe("completed");
  await control.observe(observed);
  const action = await waitForAction(control, "demo", "synthesis.prepare");
  expect(action.status).toBe("completed");
  project = (control.snapshot() as any).projects[0];
  expect(project.phase).toBe("SYNTHESIS_READY");
  expect(project.wave.evidenceDigest).toStartWith("sha256:");
  expect(project.wave.laneIds).toEqual(["demo:windows:prove-the-lemma"]);
  expect(project.wave.aggregate).toMatchObject({ schema: "campaign-wave-aggregate/v1", mode: "projection-only", authority: "none", membership: { frozen: true, count: 1 }, accounting: { complete: true } });
  expect(existsSync(project.wave.bundlePath)).toBe(true);
  expect(project.strategy).toMatchObject({
    mode: "shadow",
    charter: { revision: 1 },
    epoch: { status: "active" },
    tracks: [{ id: "coverage", targetShare: 0.5 }, { id: "supply", targetShare: 0.3 }, { id: "decision", targetShare: 0.2 }],
  });
  const bundle = JSON.parse(readFileSync(project.wave.bundlePath, "utf8"));
  expect(bundle.strategy).toMatchObject({ schema: "campaign-strategy-context/v1", mode: "shadow" });
  control.stop();
});

test("an independent Sol strategy review creates a human-gated charter revision without touching campaign execution", async () => {
  const dataDir = mkdtempSync(join(tmpdir(), "lane-watch-strategy-review-"));
  temporaryRoots.push(dataDir);
  const codex = new FakeCodex();
  codex.nextTurnId = "turn_strategy_review";
  const control = await CampaignControl.create(
    dataDir,
    join(fixtureRoot, "hub", "projects.json"),
    codex as any,
  );
  await control.observe(observer([]));
  let project = (control.snapshot() as any).projects[0];
  const originalPhase = project.phase;
  const originalEpoch = project.strategy.epoch.id;
  await control.enqueueAction({
    projectId: "demo",
    type: "strategy.review.request",
    idempotencyKey: "reject-unbound-coordinator-strategy-review",
    expectedVersion: project.version,
    args: { reviewKind: "idea-search", requestSource: "coordinator-request", requestReference: "unknown-turn", reason: "Search beyond the dominant line." },
  }, "test-operator");
  expect(await waitForAction(control, "demo", "strategy.review.request")).toMatchObject({
    status: "failed", error: "The coordinator request reference does not match the attached regular coordinator",
  });
  await control.enqueueAction({
    projectId: "demo",
    type: "strategy.review.request",
    idempotencyKey: "request-independent-strategy-review",
    expectedVersion: project.version,
    args: { triggerKind: "drift", reviewKind: "idea-search", requestSource: "operator", reason: "Measured support work displaced frontier experiments." },
  }, "test-operator");
  expect((await waitForAction(control, "demo", "strategy.review.request")).status).toBe("completed");
  project = (control.snapshot() as any).projects[0];
  const review = project.strategy.workspace.activeReview;
  expect(review).toMatchObject({
    status: "drafting", baseRevision: 1, reviewKind: "idea-search", requestSource: "operator",
    requestReference: "", resourceCap: 120_000, threadId: "thr_strategy", turnId: "turn_strategy_review",
  });
  const strategyBundle = JSON.parse(readFileSync(review.bundlePath, "utf8"));
  expect(strategyBundle).toMatchObject({
    schema: "campaign-strategy-review-bundle/v3",
    binding: {
      algorithm: "sha256",
      serialization: "canonical-json/v1",
      digestScope: "all top-level fields except bundleDigest",
    },
    bundleDigest: review.bundleDigest,
  });
  expect(codex.startThreadParams).toMatchObject({ cwd: join(fixtureRoot, "project"), model: "gpt-5.6-sol" });
  expect(codex.startParams).toMatchObject({ threadId: "thr_strategy", model: "gpt-5.6-sol", sandboxPolicy: { type: "readOnly" } });
  const strategyPrompt = (codex.startParams?.input as Array<{ text: string }>)[0]?.text || "";
  expect(strategyPrompt).toContain("independent idea-search strategist");
  expect(strategyPrompt).toContain("intentionally not the SHA-256 of the pretty-printed file bytes");
  expect(project.phase).toBe(originalPhase);
  expect(project.coordinator.attached).toBe(false);

  const response = {
    summary: "The epoch needs a balanced frontier reset.",
    assessment: {
      epochStatus: "DRIFTING",
      durableProgress: [],
      wheelSpinningEvidence: ["Support descendants consumed the measured portfolio."],
      resourceAssessment: "Rebalance before another large decision run.",
      tunnelVisionRisks: ["One candidate family dominates attention."],
    },
    proposal: {
      thesis: "Restore global knowledge while preserving the strongest candidate line.",
      epochLabel: "Epoch 2 · Reopen the frontier",
      epochObjective: "Measure the global denominator and create independent positive supply before deep decision work.",
      targetWaves: 3,
      trackWeights: [
        { trackId: "coverage", share: 0.5, reason: "Recover the denominator." },
        { trackId: "supply", share: 0.3, reason: "Diversify candidates." },
        { trackId: "decision", share: 0.2, reason: "Retain bounded closure work." },
      ],
      metrics: [
        { id: "coverage-denominator", label: "Coverage denominator", trackId: "coverage", target: "explicit numerator/denominator", unit: "benchmark" },
      ],
      resourcePolicy: {
        epochTokenBudget: 800_000,
        waveTokenBudget: 180_000,
        reserveShare: 0.15,
        tokenCaps: { routineLane: 60_000, coordinatedLane: 140_000, synthesis: 90_000, strategyReview: 110_000 },
        slots: { strategy: 1, research: 2, custody: 1 },
        maxUnreportedRuns: 0,
        rationale: "Use smaller waves while cost receipts are incomplete and preserve a redirect reserve.",
      },
      maintenanceShareLimit: 0.1,
      automaticRepairLimit: 1,
      redirectionTriggers: ["Two waves without durable frontier motion."],
      custodyCandidates: [{
        task: "Archive completed repair receipts",
        reason: "Non-strategic upkeep",
        urgency: "SOON",
        blocksResearch: false,
        strategicTrack: "decision",
        capability: "archive",
        repairGeneration: 0,
        effortClass: "small",
        acceptanceCriteria: ["Every admitted receipt is content-addressed and indexed."],
        allowedPaths: ["artifacts/**/evidence-receipt.json", "custody/index.json"],
        receiptType: "campaign-custody-receipt/v1",
        stopCondition: "Stop on an uncommitted source receipt or hash mismatch.",
      }],
      rationale: "The proposal restores portfolio optionality.",
    },
    portfolioActions: { stop: ["Unbounded repair descendants"], continue: ["Cheap candidate closure"], start: ["Global benchmark"] },
    recommendation: "ACTIVATE_NEW_EPOCH",
    operatorDecision: "Approve the new shadow charter or keep revision 1.",
  };
  codex.emit({
    method: "item/completed",
    params: { threadId: "thr_strategy", turnId: "turn_strategy_review", item: { type: "agentMessage", text: JSON.stringify(response) } },
  });
  codex.emit({
    method: "turn/completed",
    params: { threadId: "thr_strategy", turn: { id: "turn_strategy_review", status: "completed" } },
  });
  project = (control.snapshot() as any).projects[0];
  expect(project.strategy.workspace.activeReview).toMatchObject({ id: review.id, status: "drafted" });
  expect(project.strategy.workspace.activationAvailable).toBe(true);
  expect(project.strategy.charter.revision).toBe(1);
  expect(project.phase).toBe(originalPhase);

  await control.enqueueAction({
    projectId: "demo",
    type: "strategy.proposal.activate",
    targetId: review.id,
    idempotencyKey: "activate-independent-strategy-review",
    expectedVersion: project.version,
    args: { confirmation: "ACTIVATE STRATEGY REVISION" },
  }, "test-operator");
  const activation = await waitForAction(control, "demo", "strategy.proposal.activate");
  expect(activation).toMatchObject({ status: "completed", result: { revision: 2, status: "activated", mode: "shadow", custodyCandidatesStaged: 1, campaignPhase: originalPhase } });
  project = (control.snapshot() as any).projects[0];
  expect(project.strategy.charter).toMatchObject({ revision: 2, thesis: response.proposal.thesis, epoch: { label: response.proposal.epochLabel }, resourcePolicy: response.proposal.resourcePolicy });
  expect(project.strategy.epoch.id).not.toBe(originalEpoch);
  expect(project.strategy.epoch).toMatchObject({ label: response.proposal.epochLabel, charterRevision: 2, status: "active" });
  expect(project.strategy.workspace.charterHistory.map((item: any) => item.revision)).toEqual([2, 1]);
  expect(project.custody).toMatchObject({
    mode: "bounded-autopilot-ready",
    executorConnected: true,
    counts: { proposed: 1, ready: 0, blocking: 0 },
    items: [{ task: "Archive completed repair receipts", status: "proposed", strategicTrack: "decision", capability: "archive", contractComplete: true, eligibleToReady: true }],
  });
  expect(project.phase).toBe(originalPhase);
  expect(project.coordinator.attached).toBe(false);
  expect(project.resources).toMatchObject({
    mode: "shadow",
    schedulerAuthority: "none",
    epochId: project.strategy.epoch.id,
    charterRevision: 2,
    policy: response.proposal.resourcePolicy,
    simulation: { dispatched: false },
    calibration: { schema: "campaign-resource-calibration/v1", schedulerAuthority: "none", policyChangeAllowed: false },
    simulations: [],
  });

  await control.enqueueAction({
    projectId: "demo",
    type: "resource.schedule.simulate",
    idempotencyKey: "freeze-resource-scheduler-simulation",
    expectedVersion: project.version,
  }, "test-operator");
  expect(await waitForAction(control, "demo", "resource.schedule.simulate")).toMatchObject({
    status: "completed",
    result: { schedulerAuthority: "none", dispatched: false, campaignPhase: originalPhase, inputDigest: expect.stringMatching(/^sha256:/) },
  });
  project = (control.snapshot() as any).projects[0];
  expect(project.resources.simulations).toHaveLength(1);
  expect(project.resources.simulations[0]).toMatchObject({ charterRevision: 2, actor: "test-operator", result: { schedulerAuthority: "none", dispatched: false } });
  expect(project.phase).toBe(originalPhase);
  expect(project.coordinator.attached).toBe(false);

  const custodyId = project.custody.items[0].id;
  await control.enqueueAction({
    projectId: "demo",
    type: "custody.item.promote",
    targetId: custodyId,
    idempotencyKey: "promote-custody-contract",
    expectedVersion: project.version,
    args: { note: "Contract is bounded and non-blocking." },
  }, "test-operator");
  expect(await waitForAction(control, "demo", "custody.item.promote")).toMatchObject({ status: "completed", result: { status: "ready", executorConnected: true, dispatched: false, campaignPhase: originalPhase } });
  project = (control.snapshot() as any).projects[0];
  expect(project.custody.counts).toMatchObject({ proposed: 0, ready: 1, active: 0 });
  expect(project.phase).toBe(originalPhase);
  expect(project.coordinator.attached).toBe(false);

  await control.enqueueAction({
    projectId: "demo",
    type: "custody.lease.prepare",
    targetId: custodyId,
    idempotencyKey: "prepare-custody-protocol-lease",
    expectedVersion: project.version,
  }, "test-operator");
  const prepared = await waitForAction(control, "demo", "custody.lease.prepare");
  expect(prepared).toMatchObject({ status: "completed", result: { status: "prepared", executorConnected: false, dispatched: false, budget: { maxTokens: 20_000, maxMinutes: 30, maxChangedPaths: 8 } } });
  expect(existsSync(prepared.result.bundlePath)).toBe(true);
  const frozenLease = JSON.parse(readFileSync(prepared.result.bundlePath, "utf8"));
  expect(frozenLease).toMatchObject({ authority: { claimPromotion: false, researchDirection: false, workerDispatch: false }, adapter: { executionMode: "disconnected" } });
  project = (control.snapshot() as any).projects[0];
  expect(project.custody.items[0]).toMatchObject({ status: "ready", activeLease: { id: prepared.result.leaseId, status: "prepared" } });

  await control.enqueueAction({
    projectId: "demo",
    type: "custody.lease.simulate",
    targetId: prepared.result.leaseId,
    idempotencyKey: "simulate-custody-protocol-receipt",
    expectedVersion: project.version,
  }, "test-operator");
  const simulated = await waitForAction(control, "demo", "custody.lease.simulate");
  expect(simulated).toMatchObject({ status: "completed", result: { status: "simulated", realEffects: false, itemStatus: "ready", verification: { ok: true, executorConnected: false } } });
  project = (control.snapshot() as any).projects[0];
  expect(project.custody.items[0]).toMatchObject({ status: "ready", activeLease: { status: "simulated" } });

  await control.enqueueAction({
    projectId: "demo",
    type: "custody.lease.replay",
    targetId: prepared.result.leaseId,
    idempotencyKey: "replay-custody-protocol-receipt",
    expectedVersion: project.version,
  }, "test-operator");
  const replayed = await waitForAction(control, "demo", "custody.lease.replay");
  expect(replayed).toMatchObject({ status: "completed", result: { status: "verified", ok: true, errors: [], realEffects: false, itemStatus: "ready" } });
  project = (control.snapshot() as any).projects[0];
  expect(project.custody).toMatchObject({
    executorConnected: true,
    counts: { ready: 1, active: 0 },
    protocol: { mode: "bounded-autopilot-execution", executorConnected: true, counts: { verified: 1 }, leases: [{ id: prepared.result.leaseId, status: "verified", verification: { ok: true } }] },
  });
  expect(project.phase).toBe(originalPhase);
  expect(project.coordinator.attached).toBe(false);

  const custodyDatabase = new Database(join(dataDir, "observer.sqlite"));
  custodyDatabase.query("UPDATE campaign_custody_items SET status = 'failed' WHERE item_id = $id").run({ $id: custodyId });
  custodyDatabase.close();
  project = (control.snapshot() as any).projects[0];
  await control.enqueueAction({
    projectId: "demo",
    type: "custody.item.park",
    targetId: custodyId,
    idempotencyKey: "park-failed-custody-contract",
    expectedVersion: project.version,
    args: { note: "Operator explicitly removed the failed dependency after review." },
  }, "test-operator");
  expect(await waitForAction(control, "demo", "custody.item.park")).toMatchObject({
    status: "completed",
    result: { from: "failed", status: "parked", dispatched: false, campaignPhase: originalPhase },
  });
  project = (control.snapshot() as any).projects[0];
  expect(project.custody.items[0]).toMatchObject({ status: "parked" });
  expect(project.phase).toBe(originalPhase);

  await control.enqueueAction({
    projectId: "demo", type: "custody.item.restore", targetId: custodyId,
    idempotencyKey: "restore-custody-contract-for-reshape", expectedVersion: project.version,
  }, "test-operator");
  expect(await waitForAction(control, "demo", "custody.item.restore")).toMatchObject({ status: "completed", result: { status: "proposed" } });
  project = (control.snapshot() as any).projects[0];
  await control.enqueueAction({
    projectId: "demo", type: "custody.item.promote", targetId: custodyId,
    idempotencyKey: "ready-custody-contract-for-reshape", expectedVersion: project.version,
  }, "test-operator");
  expect(await waitForAction(control, "demo", "custody.item.promote")).toMatchObject({ status: "completed", result: { status: "ready" } });
  project = (control.snapshot() as any).projects[0];
  await control.enqueueAction({
    projectId: "demo", type: "custody.lease.prepare", targetId: custodyId,
    idempotencyKey: "prepare-oversized-custody-contract", expectedVersion: project.version,
  }, "test-operator");
  const oversizedLease = await waitForAction(control, "demo", "custody.lease.prepare");
  expect(oversizedLease).toMatchObject({ status: "completed", result: { status: "prepared", dispatched: false } });
  project = (control.snapshot() as any).projects[0];
  const successor = (task: string, path: string) => ({
    task, reason: "Bound one half of an oversized custody check.", urgency: "NOW", blocksResearch: true,
    strategicTrack: "decision", capability: "archive", repairGeneration: 0, effortClass: "small",
    acceptance: { acceptanceCriteria: ["The bounded half has an exact receipt."], allowedPaths: [path], receiptType: "campaign-custody-receipt/v1", stopCondition: "Stop before crossing this bounded half." },
  });
  await control.enqueueAction({
    projectId: "demo", type: "custody.item.reshape", targetId: custodyId,
    idempotencyKey: "reshape-oversized-custody-contract", expectedVersion: project.version,
    args: { children: [successor("Verify receipt source binding", "custody/source/**"), successor("Update the bounded receipt index", "custody/index/**")] },
  }, "test-operator");
  expect(await waitForAction(control, "demo", "custody.item.reshape")).toMatchObject({
    status: "completed", result: { status: "superseded", successorCount: 2, dispatched: false, campaignPhase: originalPhase },
  });
  project = (control.snapshot() as any).projects[0];
  expect(project.custody.items.filter((item: any) => item.sourceType === "custody-reshape")).toHaveLength(2);
  expect(project.custody.items.find((item: any) => item.id === custodyId)).toMatchObject({ status: "complete", receipt: { status: "SUPERSEDED" } });
  expect(project.custody.protocol.leases.find((lease: any) => lease.id === oversizedLease.result.leaseId)).toMatchObject({ status: "superseded" });
  expect(project.phase).toBe(originalPhase);
  control.stop();
});

test("an exact custody lease runs one isolated Terra steward and lands only after receipt review", async () => {
  const root = mkdtempSync(join(tmpdir(), "lane-watch-custody-execution-"));
  temporaryRoots.push(root);
  const hub = join(root, "hub");
  const projectRoot = join(root, "project");
  const dataDir = join(root, "data");
  mkdirSync(hub, { recursive: true });
  mkdirSync(join(projectRoot, "custody"), { recursive: true });
  writeFileSync(join(hub, "projects.json"), JSON.stringify({ projects: [{ id: "demo", path: "../project", local_agent_coordinator: "tools/local_agent_coord.ps1" }] }));
  writeFileSync(join(projectRoot, "README.md"), "campaign\n");
  writeFileSync(join(projectRoot, "custody", "index.json"), "{\"receipts\":[]}\n");
  git(projectRoot, "init", "-b", "main");
  git(projectRoot, "config", "user.name", "Lane Watch Test");
  git(projectRoot, "config", "user.email", "lane-watch@example.invalid");
  git(projectRoot, "add", "--", ".");
  git(projectRoot, "commit", "-m", "Initialize custody fixture");
  const baseCommit = git(projectRoot, "rev-parse", "HEAD");
  const codex = new FakeCodex();
  codex.nextTurnId = "turn_custody";
  const control = await CampaignControl.create(dataDir, join(hub, "projects.json"), codex as any);
  await control.observe(observer([]));
  const database = new Database(join(dataDir, "observer.sqlite"));
  const itemId = "custody-index-repair";
  const stamp = "2026-08-28T12:00:00.000Z";
  database.query(`
    INSERT INTO campaign_custody_items(
      item_id, project_id, source_type, source_id, fingerprint, task, reason, urgency,
      blocks_research, strategic_track, capability, repair_generation, effort_class,
      acceptance_json, status, assigned_actor, receipt_json, created_by, created_at, updated_at, completed_at
    ) VALUES ($id, 'demo', 'test', 'fixture', $fingerprint, $task, $reason, 'NOW', 0, 'decision',
      'archive', 0, 'small', $acceptance, 'ready', '', '{}', 'test-operator', $now, $now, '')
  `).run({
    $id: itemId,
    $fingerprint: "custody-execution-fixture",
    $task: "Index one already accepted receipt.",
    $reason: "Exercise the separate mechanical custody path.",
    $acceptance: JSON.stringify({
      acceptanceCriteria: ["The custody index contains the accepted receipt hash."],
      allowedPaths: ["custody/index.json"],
      receiptType: "campaign-custody-execution-receipt/v1",
      stopCondition: "Stop if any other file must change.",
    }),
    $now: stamp,
  });
  database.close();

  let project = (control.snapshot() as any).projects[0];
  const originalPhase = project.phase;
  await control.enqueueAction({
    projectId: "demo", type: "custody.lease.prepare", targetId: itemId,
    idempotencyKey: "prepare-executable-custody-lease", expectedVersion: project.version,
  }, "test-operator");
  const prepared = await waitForAction(control, "demo", "custody.lease.prepare");
  expect(prepared).toMatchObject({ status: "completed", result: { status: "prepared", executorConnected: true, executionMode: "isolated-worktree", baseCommit } });
  expect(codex.startThreadParams).toBeNull();
  project = (control.snapshot() as any).projects[0];
  const lease = project.custody.items[0].activeLease;
  expect(lease).toMatchObject({ status: "prepared", lease: { adapter: { executionMode: "isolated-worktree" }, workspace: { baseCommit } } });

  await control.enqueueAction({
    projectId: "demo", type: "custody.lease.confirm", targetId: lease.id,
    idempotencyKey: "confirm-executable-custody-lease", expectedVersion: project.version,
    args: { leaseDigest: lease.leaseDigest },
  }, "test-operator");
  expect(await waitForAction(control, "demo", "custody.lease.confirm")).toMatchObject({ status: "completed", result: { status: "confirmed", dispatched: false, baseCommit } });
  expect(codex.startThreadParams).toBeNull();
  project = (control.snapshot() as any).projects[0];
  await control.enqueueAction({
    projectId: "demo", type: "custody.lease.dispatch", targetId: lease.id,
    idempotencyKey: "dispatch-executable-custody-lease", expectedVersion: project.version,
    args: { leaseDigest: lease.leaseDigest },
  }, "test-operator");
  const dispatched = await waitForAction(control, "demo", "custody.lease.dispatch");
  expect(dispatched).toMatchObject({ status: "completed", result: { status: "running", turnId: "turn_custody", baseCommit, campaignPhase: originalPhase } });
  expect(codex.startThreadParams).toMatchObject({ model: "gpt-5.6-terra", approvalPolicy: "never", sandbox: "workspace-write" });
  expect(codex.startThreadParams?.cwd).not.toBe(dispatched.result.worktreePath);
  expect(codex.startParams).toMatchObject({
    threadId: "thr_strategy", cwd: codex.startThreadParams?.cwd, model: "gpt-5.6-terra", effort: "medium", approvalPolicy: "never",
    sandboxPolicy: { type: "workspaceWrite", writableRoots: expect.arrayContaining([dispatched.result.worktreePath, codex.startThreadParams?.cwd]), networkAccess: false },
  });
  const expectedBundleHash = `sha256:${createHash("sha256").update(readFileSync(prepared.result.bundlePath)).digest("hex")}`;
  const custodyPrompt = String((codex.startParams as any)?.input?.[0]?.text || "");
  expect(custodyPrompt).toContain(`Verify the literal bundle bytes against ${expectedBundleHash}`);
  expect(custodyPrompt).toContain("Do not compare the whole-file SHA-256 to leaseDigest.");
  expect(custodyPrompt).toContain(`The detached campaign workspace is ${dispatched.result.worktreePath}`);
  expect(git(projectRoot, "rev-parse", "HEAD")).toBe(baseCommit);
  writeFileSync(join(dispatched.result.worktreePath, "custody", "index.json"), "{\"receipts\":[\"sha256:accepted\"]}\n");
  codex.emit({ method: "thread/tokenUsage/updated", params: { threadId: "thr_strategy", tokenUsage: { total: { totalTokens: 6_350_000 }, last: { totalTokens: 1_250 } } } });
  codex.emit({
    method: "item/completed",
    params: {
      threadId: "thr_strategy", turnId: "turn_custody",
      item: { type: "agentMessage", text: JSON.stringify({
        status: "COMPLETED", summary: "Indexed the accepted receipt.", stopReason: "", changedPaths: ["custody/index.json"],
        checks: [{ id: "index-entry", status: "PASS", detail: "The accepted hash is present exactly once." }],
      }) },
    },
  });
  codex.emit({ method: "turn/completed", params: { threadId: "thr_strategy", turn: { id: "turn_custody", status: "completed" } } });
  project = await waitForProject(control, "demo", (candidate) => candidate.custody.items[0]?.activeLease?.status === "awaiting_review");
  const reviewLease = project.custody.items[0].activeLease;
  expect(reviewLease).toMatchObject({
    status: "awaiting_review",
    receipt: { status: "COMPLETED", effects: { changedPaths: ["custody/index.json"] }, usage: { tokens: 1250, tokenMeasurement: "app-server" } },
    verification: { ok: true, landable: true, errors: [] },
  });
  expect(reviewLease.producerCommit).toMatch(/^[0-9a-f]{40}$/);
  expect(git(projectRoot, "rev-parse", "HEAD")).toBe(baseCommit);
  expect(readFileSync(join(projectRoot, "custody", "index.json"), "utf8")).toBe("{\"receipts\":[]}\n");

  await control.enqueueAction({
    projectId: "demo", type: "custody.receipt.land", targetId: lease.id,
    idempotencyKey: "land-executable-custody-receipt", expectedVersion: project.version,
    args: { receiptDigest: reviewLease.receiptDigest },
  }, "test-operator");
  const landed = await waitForAction(control, "demo", "custody.receipt.land");
  expect(landed).toMatchObject({ status: "completed", result: { status: "completed", producerCommit: reviewLease.producerCommit, pushed: false, campaignPhase: originalPhase } });
  expect(landed.result.landedCommit).toMatch(/^[0-9a-f]{40}$/);
  project = (control.snapshot() as any).projects[0];
  expect(project.custody.items[0]).toMatchObject({ status: "complete", activeLease: null });
  expect(readFileSync(join(projectRoot, "custody", "index.json"), "utf8").replace(/\r\n/g, "\n")).toBe("{\"receipts\":[\"sha256:accepted\"]}\n");
  expect(project.phase).toBe(originalPhase);
  control.stop();
  rmSync(dispatched.result.worktreePath, { recursive: true, force: true });
}, 30_000);

test("a coordinator-requested idea search binds exact provenance but still starts only through an operator action", async () => {
  const dataDir = mkdtempSync(join(tmpdir(), "lane-watch-coordinator-idea-search-"));
  temporaryRoots.push(dataDir);
  const codex = new FakeCodex();
  codex.nextTurnId = "turn_idea_search";
  const control = await CampaignControl.create(dataDir, join(fixtureRoot, "hub", "projects.json"), codex as any);
  await control.observe(observer([]));
  let project = (control.snapshot() as any).projects[0];
  const originalPhase = project.phase;
  await control.enqueueAction({
    projectId: "demo", type: "coordinator.attach", idempotencyKey: "attach-for-idea-search",
    expectedVersion: project.version, args: { threadId: "thr_sol" },
  }, "operator");
  expect((await waitForAction(control, "demo", "coordinator.attach")).status).toBe("completed");
  project = (control.snapshot() as any).projects[0];
  await control.enqueueAction({
    projectId: "demo", type: "strategy.review.request", idempotencyKey: "approve-coordinator-idea-search",
    expectedVersion: project.version,
    args: {
      triggerKind: "manual", reviewKind: "idea-search", requestSource: "coordinator-request",
      requestReference: "thr_sol", reason: "The regular coordinator requested an independent search beyond the current candidate family.",
    },
  }, "operator");
  expect(await waitForAction(control, "demo", "strategy.review.request")).toMatchObject({
    status: "completed", result: {
      reviewKind: "idea-search", requestSource: "coordinator-request", requestReference: "thr_sol",
      resourceCap: 120_000, schedulerAuthority: "none",
    },
  });
  project = (control.snapshot() as any).projects[0];
  expect(project.strategy.workspace.activeReview).toMatchObject({
    status: "drafting", reviewKind: "idea-search", requestSource: "coordinator-request",
    requestReference: "thr_sol", resourceCap: 120_000,
  });
  expect(project.phase).toBe(originalPhase);
  expect(project.coordinator).toMatchObject({ attached: true, threadId: "thr_sol" });
  expect(codex.startThreadParams).toMatchObject({ model: "gpt-5.6-sol", approvalPolicy: "on-request" });
  expect(codex.startParams).toMatchObject({ threadId: "thr_strategy", sandboxPolicy: { type: "readOnly" } });
  control.stop();
}, 30_000);

test("attaching a coordinator is an idempotent guarded action", async () => {
  const dataDir = mkdtempSync(join(tmpdir(), "lane-watch-coordinator-"));
  temporaryRoots.push(dataDir);
  const control = await CampaignControl.create(
    dataDir,
    join(fixtureRoot, "hub", "projects.json"),
    new FakeCodex() as any,
  );
  await control.observe(observer([]));
  const project = (control.snapshot() as any).projects[0];
  const input = {
    projectId: "demo",
    type: "coordinator.attach" as const,
    idempotencyKey: "attach-demo-sol",
    expectedVersion: project.version,
    args: { threadId: "thr_sol" },
  };
  const first = await control.enqueueAction(input, "test");
  const second = await control.enqueueAction(input, "test");
  expect(first.id).toBe(second.id);
  expect((await waitForAction(control, "demo", "coordinator.attach")).status).toBe("completed");
  expect((control.snapshot() as any).projects[0].coordinator.threadId).toBe("thr_sol");
  expect((control.snapshot() as any).projects[0].coordinator.cwd).toBe(join(fixtureRoot, "project"));
  control.stop();
});

test("coordinator tool approvals are captured and answered only through the guarded action queue", async () => {
  const dataDir = mkdtempSync(join(tmpdir(), "lane-watch-approval-"));
  temporaryRoots.push(dataDir);
  const codex = new FakeCodex();
  const control = await CampaignControl.create(dataDir, join(fixtureRoot, "hub", "projects.json"), codex as any);
  await control.observe(observer([]));
  let project = (control.snapshot() as any).projects[0];
  await control.enqueueAction({
    projectId: "demo",
    type: "coordinator.attach",
    idempotencyKey: "attach-for-approval",
    expectedVersion: project.version,
    args: { threadId: "thr_sol" },
  }, "test");
  await waitForAction(control, "demo", "coordinator.attach");

  codex.emitRequest({
    id: 77,
    method: "item/commandExecution/requestApproval",
    params: { threadId: "thr_sol", turnId: "turn_tool", reason: "Inspect a local receipt" },
  });
  project = (control.snapshot() as any).projects[0];
  expect(project.approvals).toEqual([expect.objectContaining({
    id: "thr_sol:77",
    method: "item/commandExecution/requestApproval",
    threadId: "thr_sol",
    turnId: "turn_tool",
    supported: true,
  })]);

  await control.enqueueAction({
    projectId: "demo",
    type: "approval.respond",
    idempotencyKey: "approve-tool-77",
    expectedVersion: project.version,
    args: { requestId: "thr_sol:77", decision: "decline" },
  }, "operator");
  expect((await waitForAction(control, "demo", "approval.respond")).status).toBe("completed");
  expect(codex.responses).toEqual([{ requestId: 77, result: { decision: "decline" } }]);
  expect((control.snapshot() as any).projects[0].approvals).toEqual([]);
  control.stop();
});

test("the coordinator conversation is sanitized and messages start or steer turns", async () => {
  const dataDir = mkdtempSync(join(tmpdir(), "lane-watch-conversation-"));
  temporaryRoots.push(dataDir);
  const codex = new FakeCodex();
  codex.nextTurnId = "turn_chat";
  const control = await CampaignControl.create(
    dataDir,
    join(fixtureRoot, "hub", "projects.json"),
    codex as any,
  );
  await control.observe(observer([]));
  let project = (control.snapshot() as any).projects[0];
  await control.enqueueAction({
    projectId: "demo",
    type: "coordinator.attach",
    idempotencyKey: "attach-for-conversation",
    expectedVersion: project.version,
    args: { threadId: "thr_sol" },
  }, "test");
  await waitForAction(control, "demo", "coordinator.attach");
  const conversation = await control.coordinatorConversation("demo") as any;
  expect(conversation.messages).toEqual([
    { id: "user_history", turnId: "turn_history", role: "user", text: "What remains?", turnStatus: "completed" },
    { id: "agent_history", turnId: "turn_history", role: "assistant", text: "One bounded repair lane remains.", turnStatus: "completed" },
  ]);
  expect(conversation.turns[0].activities).toEqual([expect.objectContaining({ type: "commandExecution", label: "Run local command" })]);
  expect(JSON.stringify(conversation)).not.toContain("secret-tool-command");

  project = (control.snapshot() as any).projects[0];
  await control.enqueueAction({
    projectId: "demo",
    type: "coordinator.message.send",
    idempotencyKey: "start-chat-turn",
    expectedVersion: project.version,
    args: { message: "Summarize the repair decision." },
  }, "test");
  expect((await waitForAction(control, "demo", "coordinator.message.send")).status).toBe("completed");
  expect(codex.startParams).toMatchObject({
    threadId: "thr_sol",
    input: [{ type: "text", text: "Summarize the repair decision." }],
    approvalPolicy: "on-request",
    sandboxPolicy: { type: "readOnly" },
  });

  project = (control.snapshot() as any).projects[0];
  const steerQueued = await control.enqueueAction({
    projectId: "demo",
    type: "coordinator.message.send",
    idempotencyKey: "steer-chat-turn",
    expectedVersion: project.version,
    args: { message: "Also call out the evidence gap." },
  }, "test");
  let steerAction: any = null;
  for (let attempt = 0; attempt < 100; attempt++) {
    steerAction = (control.snapshot() as any).projects[0].actions.find((item: any) => item.id === steerQueued.id);
    if (steerAction && !["queued", "running"].includes(steerAction.status)) break;
    await Bun.sleep(5);
  }
  expect(steerAction.status).toBe("completed");
  expect(codex.steerCalls).toEqual([{ threadId: "thr_sol", turnId: "turn_chat", text: "Also call out the evidence gap." }]);

  const liveEvents: any[] = [];
  control.onLiveChange((event) => liveEvents.push(event));
  codex.emit({ method: "turn/plan/updated", params: { turnId: "turn_chat", plan: [{ step: "Read the receipts", status: "inProgress" }, { step: "Draft the wave", status: "pending" }] } });
  codex.emit({ method: "item/started", params: { threadId: "thr_sol", turnId: "turn_chat", item: { id: "tool_live", type: "commandExecution", command: ["super-secret-bin", "--token=abc"], cwd: join(fixtureRoot, "project"), status: "inProgress" } } });
  codex.emit({ method: "item/commandExecution/outputDelta", params: { threadId: "thr_sol", turnId: "turn_chat", itemId: "tool_live", delta: "PRIVATE COMMAND OUTPUT" } });
  codex.emit({ method: "item/reasoning/summaryTextDelta", params: { threadId: "thr_sol", turnId: "turn_chat", itemId: "reason_live", delta: "Checking the evidence boundary." } });
  codex.emit({ method: "item/agentMessage/delta", params: { threadId: "thr_sol", turnId: "turn_chat", itemId: "agent_live", delta: "I found the first dependency." } });
  let live = (control.snapshot() as any).projects[0].coordinator.live;
  expect(live).toMatchObject({ active: true, turnId: "turn_chat", narrative: "I found the first dependency.", reasoningSummary: "Checking the evidence boundary." });
  expect(live.plan).toEqual([{ step: "Read the receipts", status: "inProgress" }, { step: "Draft the wave", status: "pending" }]);
  expect(live.items[0]).toMatchObject({ label: "Run local command", status: "inProgress", details: { outputBytes: 22 } });
  expect(JSON.stringify(live)).not.toContain("super-secret-bin");
  expect(JSON.stringify(live)).not.toContain("PRIVATE COMMAND OUTPUT");
  codex.emit({ method: "item/completed", params: { threadId: "thr_sol", turnId: "turn_chat", item: { id: "agent_live", type: "agentMessage", text: "The dependency is confirmed." } } });
  codex.emit({ method: "turn/completed", params: { threadId: "thr_sol", turn: { id: "turn_chat", status: "completed" } } });
  live = (control.snapshot() as any).projects[0].coordinator.live;
  expect(live).toMatchObject({ active: false, status: "completed", narrative: "The dependency is confirmed." });
  expect(liveEvents.some((event) => event.refreshHistory === true)).toBe(true);
  control.stop();
});

test("external perspectives produce an inspectable Sol redirect before a human applies it", async () => {
  const dataDir = mkdtempSync(join(tmpdir(), "lane-watch-redirect-"));
  temporaryRoots.push(dataDir);
  const codex = new FakeCodex();
  codex.nextTurnId = "turn_redirect";
  const control = await CampaignControl.create(
    dataDir,
    join(fixtureRoot, "hub", "projects.json"),
    codex as any,
  );
  await control.observe(observer([]));
  let project = (control.snapshot() as any).projects[0];
  await control.enqueueAction({
    projectId: "demo",
    type: "coordinator.attach",
    idempotencyKey: "attach-for-redirect",
    expectedVersion: project.version,
    args: { threadId: "thr_sol" },
  }, "test");
  await waitForAction(control, "demo", "coordinator.attach");
  project = (control.snapshot() as any).projects[0];
  let releaseStart!: () => void;
  codex.startBarrier = new Promise<void>((resolve) => { releaseStart = resolve; });
  await control.enqueueAction({
    projectId: "demo",
    type: "campaign.redirect.submit",
    idempotencyKey: "submit-external-perspective",
    expectedVersion: project.version,
    args: {
      title: "Alternative invariant",
      sourceUrl: "https://example.test/perspective",
      content: "The campaign may be overcommitted to coefficient chasing; test the invariant formulation first.",
    },
  }, "test");
  for (let attempt = 0; codex.startCalls === 0 && attempt < 100; attempt++) await Bun.sleep(5);
  expect(codex.startCalls).toBe(1);
  await Promise.all([control.observe(observer([])), control.observe(observer([])), control.observe(observer([]))]);
  expect(codex.startCalls).toBe(1);
  releaseStart();
  expect((await waitForAction(control, "demo", "campaign.redirect.submit")).status).toBe("completed");
  project = (control.snapshot() as any).projects[0];
  expect(project.externalInputs[0]).toMatchObject({ title: "Alternative invariant", status: "drafting", turnId: "turn_redirect" });
  expect(codex.startParams).toMatchObject({ approvalPolicy: "on-request", sandboxPolicy: { type: "readOnly" } });
  expect(String((codex.startParams?.input as any)?.[0]?.text)).toContain("detect tunnel vision and reshape the campaign");

  const redirectResponse = {
    summary: "Keep the landed checks, but test the invariant formulation before more coefficient work.",
    tunnelVisionAssessment: "The current queue is locally coherent but too concentrated on one representation.",
    perspectiveShift: "Move from coefficient-by-coefficient repair to an invariant obstruction test.",
    assumptionsToRevisit: ["The current coordinates are the cheapest route."],
    keep: ["Preserve the completed custody evidence."],
    stopOrDeprioritize: ["Pause generic coefficient marching."],
    newDirections: [{ question: "Does the invariant obstruction eliminate the remaining branch?", rationale: "It may collapse several local checks at once.", profile: "sonnet-worker" }],
    nextWaveObjective: "Falsify the invariant obstruction cheaply before returning to local coordinates.",
    decision: "READY_FOR_GATE",
  };
  codex.emit({ method: "item/completed", params: { threadId: "thr_sol", turnId: "turn_redirect", item: { type: "agentMessage", text: JSON.stringify(redirectResponse) } } });
  codex.emit({ method: "turn/completed", params: { threadId: "thr_sol", turn: { id: "turn_redirect", status: "completed" } } });
  project = (control.snapshot() as any).projects[0];
  expect(project.externalInputs[0]).toMatchObject({ status: "drafted", response: redirectResponse });
  await control.enqueueAction({
    projectId: "demo",
    type: "campaign.redirect.apply",
    targetId: project.externalInputs[0].id,
    idempotencyKey: "apply-external-perspective",
    expectedVersion: project.version,
  }, "test");
  expect((await waitForAction(control, "demo", "campaign.redirect.apply")).status).toBe("completed");
  project = (control.snapshot() as any).projects[0];
  expect(project.externalInputs[0].status).toBe("applied");
  expect(project.workflowHistory.some((event: any) => event.type === "campaign.redirect.applied")).toBe(true);
  control.stop();
});

test("a wave can synthesize failed evidence once remaining work is explicitly accounted", async () => {
  const dataDir = mkdtempSync(join(tmpdir(), "lane-watch-accounting-"));
  temporaryRoots.push(dataDir);
  const control = await CampaignControl.create(
    dataDir,
    join(fixtureRoot, "hub", "projects.json"),
    new FakeCodex() as any,
  );
  await control.observe(observer([
    lane({ daemon: "working", landing: "—", status: "Working" }),
    lane({ id: "demo:windows:failed-proof", task: "failed-proof", daemon: "stopped", landing: "FAILED", status: "Failed custody checks" }),
  ]));
  let project = (control.snapshot() as any).projects[0];
  await control.enqueueAction({
    projectId: "demo",
    type: "wave.adopt",
    idempotencyKey: "adopt-accounting-wave",
    expectedVersion: project.version,
  }, "test");
  expect((await waitForAction(control, "demo", "wave.adopt")).status).toBe("completed");
  project = (control.snapshot() as any).projects[0];
  expect(project.wave.accounting).toMatchObject({ total: 2, accounted: 1, unaccounted: 1, failed: 1 });
  await control.enqueueAction({
    projectId: "demo",
    type: "lane.disposition.set",
    targetId: "demo:windows:prove-the-lemma",
    idempotencyKey: "carry-running-lane",
    expectedVersion: project.version,
    args: { disposition: "CARRY_FORWARD", reason: "Keep the live computation in the next wave." },
  }, "test");
  expect((await waitForAction(control, "demo", "lane.disposition.set")).status).toBe("completed");
  project = (control.snapshot() as any).projects[0];
  expect(project.phase).toBe("SYNTHESIS_READY");
  expect(project.canPrepareSynthesis).toBe(true);
  await control.enqueueAction({
    projectId: "demo",
    type: "synthesis.prepare",
    idempotencyKey: "prepare-accounted-wave",
    expectedVersion: project.version,
  }, "test");
  expect((await waitForAction(control, "demo", "synthesis.prepare")).status).toBe("completed");
  project = (control.snapshot() as any).projects[0];
  const bundle = JSON.parse(readFileSync(project.wave.bundlePath, "utf8"));
  expect(bundle.schema).toBe("campaign-synthesis-bundle/v2");
  expect(bundle.accounting.complete).toBe(true);
  expect(bundle.lanes.find((item: any) => item.id.endsWith("failed-proof")).accountingState).toBe("FAILED_REVIEWABLE");
  control.stop();
});

test("coordinator discovery includes the shared workspace root without an exact-root pass", async () => {
  const dataDir = mkdtempSync(join(tmpdir(), "lane-watch-discovery-"));
  temporaryRoots.push(dataDir);
  const codex = new FakeCodex();
  codex.thread.cwd = fixtureRoot;
  const control = await CampaignControl.create(
    dataDir,
    join(fixtureRoot, "hub", "projects.json"),
    codex as any,
  );
  const candidates = await control.listCodexThreads("demo");
  expect(codex.listCalls).toBe(1);
  expect(candidates).toHaveLength(1);
  expect(candidates[0]).toMatchObject({ id: "thr_sol", eligible: true, scope: "workspace-root" });
  control.stop();
});

test("the attached Sol coordinator can triage terminal wave accounting before a human applies it", async () => {
  const dataDir = mkdtempSync(join(tmpdir(), "lane-watch-triage-"));
  temporaryRoots.push(dataDir);
  const codex = new FakeCodex();
  codex.nextTurnId = "turn_triage";
  codex.resumeError = "thread thr_sol already has an active writer";
  const control = await CampaignControl.create(
    dataDir,
    join(fixtureRoot, "hub", "projects.json"),
    codex as any,
  );
  await control.observe(observer([
    lane({ landing: "CUSTODY_READY_CHECKS_REQUIRED", status: "Terminal receipt needs semantic accounting" }),
    lane({ id: "demo:windows:failed-proof", task: "failed-proof", daemon: "stopped", landing: "FAILED", status: "Failed custody checks" }),
  ]));
  let project = (control.snapshot() as any).projects[0];
  await control.enqueueAction({
    projectId: "demo",
    type: "wave.adopt",
    idempotencyKey: "adopt-triage-wave",
    expectedVersion: project.version,
  }, "test");
  await waitForAction(control, "demo", "wave.adopt");
  project = (control.snapshot() as any).projects[0];
  await control.enqueueAction({
    projectId: "demo",
    type: "coordinator.attach",
    idempotencyKey: "attach-for-triage",
    expectedVersion: project.version,
    args: { threadId: "thr_sol" },
  }, "test");
  await waitForAction(control, "demo", "coordinator.attach");
  project = (control.snapshot() as any).projects[0];
  expect(project.canRequestWaveTriage).toBe(true);
  await control.enqueueAction({
    projectId: "demo",
    type: "wave.triage.request",
    idempotencyKey: "request-wave-triage",
    expectedVersion: project.version,
  }, "test");
  expect((await waitForAction(control, "demo", "wave.triage.request")).status).toBe("completed");
  project = (control.snapshot() as any).projects[0];
  expect(project.wave.triage.status).toBe("drafting");
  expect(project.coordinator).toMatchObject({
    threadId: "thr_sol_control",
    sourceThreadId: "thr_sol",
    forked: true,
  });
  expect(codex.forkCalls).toEqual(["thr_sol"]);
  expect(codex.startParams?.threadId).toBe("thr_sol_control");
  expect(codex.startParams?.approvalPolicy).toBe("on-request");
  expect(codex.startParams?.sandboxPolicy).toEqual({ type: "readOnly" });
  const response = {
    waveId: project.wave.id,
    evidenceDigest: project.wave.triage.evidenceDigest,
    campaignAssessment: "One terminal receipt needs an explicit carry-forward decision.",
    canClose: true,
    laneRecommendations: [
      {
        laneId: "demo:windows:prove-the-lemma",
        disposition: "CARRY_FORWARD",
        reason: "Preserve the receipt and resolve its remaining custody check in the next wave.",
        recommendedActions: ["Open a bounded repair lane."],
      },
      {
        laneId: "demo:windows:failed-proof",
        disposition: "NONE",
        reason: "The failed receipt is already accounted as evidence.",
        recommendedActions: [],
      },
    ],
    blockers: [],
    researchQuestions: [],
    nextStep: "Apply the recommendation, then prepare synthesis.",
  };
  codex.emit({
    method: "item/completed",
    params: { threadId: "thr_sol_control", turnId: "turn_triage", item: { type: "agentMessage", text: JSON.stringify(response) } },
  });
  codex.emit({
    method: "turn/completed",
    params: { threadId: "thr_sol_control", turn: { id: "turn_triage", status: "completed" } },
  });
  project = (control.snapshot() as any).projects[0];
  expect(project.phase).toBe("BLOCKED");
  expect(project.wave.triage.status).toBe("drafted");
  expect(project.canApplyWaveTriage).toBe(true);
  await control.enqueueAction({
    projectId: "demo",
    type: "wave.triage.apply",
    idempotencyKey: "apply-wave-triage",
    expectedVersion: project.version,
    args: { waveId: project.wave.id, evidenceDigest: project.wave.triage.evidenceDigest },
  }, "test");
  expect((await waitForAction(control, "demo", "wave.triage.apply")).status).toBe("completed");
  project = (control.snapshot() as any).projects[0];
  expect(project.phase).toBe("SYNTHESIS_READY");
  expect(project.wave.accounting.complete).toBe(true);
  expect(project.wave.lanes.find((item: any) => item.id.endsWith("prove-the-lemma")).disposition).toBe("CARRY_FORWARD");
  control.stop();
});

test("autopilot cannot claim to resume across an unchanged blocked coordinator plan", async () => {
  const dataDir = mkdtempSync(join(tmpdir(), "lane-watch-loop-blocker-"));
  temporaryRoots.push(dataDir);
  const control = await CampaignControl.create(
    dataDir,
    join(fixtureRoot, "hub", "projects.json"),
    new FakeCodex() as any,
  );
  await control.observe(observer([]));
  const stamp = "2026-08-27T21:45:39.743Z";
  const database = new Database(join(dataDir, "observer.sqlite"));
  database.query("UPDATE campaign_projects SET current_phase = 'RESEARCH_REVIEW', version = version + 1, updated_at = $now WHERE project_id = 'demo'").run({ $now: stamp });
  database.query(`
    INSERT INTO campaign_waves(wave_id, project_id, label, phase, lane_ids_json, evidence_digest, bundle_path, created_at, updated_at)
    VALUES ('blocked-wave', 'demo', 'Blocked wave', 'RESEARCH_REVIEW', '[]', 'sha256:blocked', '', $now, $now)
  `).run({ $now: stamp });
  database.query(`
    INSERT INTO campaign_research_plans(wave_id, project_id, thread_id, turn_id, status, bundle_path, evidence_digest, response_json, created_at, updated_at)
    VALUES ('blocked-wave', 'demo', 'thr_sol', 'turn_blocked', 'drafted', '', 'sha256:blocked', $response, $now, $now)
  `).run({ $response: JSON.stringify({ decision: "BLOCKED", operatorGuidance: "Complete the operator-owned authority transition first." }), $now: stamp });
  database.query(`
    INSERT INTO campaign_loop_runs(loop_id, project_id, status, start_phase, start_json, decision_crossed, error, created_by, created_at, updated_at)
    VALUES ('blocked-loop', 'demo', 'attention', 'RESEARCH_REVIEW', $start, 1, 'Coordinator plan is BLOCKED', 'test', $now, $now)
  `).run({ $start: JSON.stringify({ capturedAt: stamp, phase: "RESEARCH_REVIEW" }), $now: stamp });
  database.close();

  let project = (control.snapshot() as any).projects[0];
  expect(project.loop).toMatchObject({ status: "attention", canResume: false });
  expect(project.loop.resumeBlocker).toContain("remains BLOCKED");
  await control.enqueueAction({
    projectId: "demo",
    type: "loop.resume",
    idempotencyKey: "refuse-unchanged-blocked-resume",
    expectedVersion: project.version,
  }, "test");
  const action = await waitForAction(control, "demo", "loop.resume");
  expect(action.status).toBe("failed");
  expect(action.error).toContain("cannot resume yet");
  project = (control.snapshot() as any).projects[0];
  expect(project.loop).toMatchObject({ status: "attention", canResume: false, error: "Coordinator plan is BLOCKED" });
  control.stop();
});

test("an operator-confirmed schedule launches a dependency-safe multi-member wave in parallel", async () => {
  const root = mkdtempSync(join(tmpdir(), "lane-watch-multi-wave-"));
  temporaryRoots.push(root);
  const hub = join(root, "hub");
  const projectRoot = join(root, "project");
  const dataDir = join(root, "data");
  mkdirSync(hub, { recursive: true });
  mkdirSync(projectRoot, { recursive: true });
  writeFileSync(join(hub, "projects.json"), JSON.stringify({ projects: [{ id: "demo", path: "../project", local_agent_coordinator: "tools/local_agent_coord.ps1" }] }));
  let inFlight = 0;
  let maxInFlight = 0;
  const launched: string[] = [];
  const codex = new FakeCodex();
  const control = await CampaignControl.create(dataDir, join(hub, "projects.json"), codex as any, async (_root, spec) => {
    launched.push(spec.taskId);
    inFlight += 1;
    maxInFlight = Math.max(maxInFlight, inFlight);
    await Bun.sleep(25);
    inFlight -= 1;
    return { laneId: `demo:windows:${spec.taskId}`, jobId: spec.taskId.endsWith("v2") ? "11111111" : "22222222", worktree: join(root, spec.taskId), output: "launched" };
  });
  await control.observe(observer([]));
  const database = new Database(join(dataDir, "observer.sqlite"));
  const stamp = "2026-08-28T13:00:00.000Z";
  database.query(`
    INSERT INTO campaign_waves(wave_id, project_id, label, phase, lane_ids_json, evidence_digest, bundle_path, synthesis_turn_id, created_at, updated_at)
    VALUES ('wave-parallel', 'demo', 'Parallel frontier', 'RESEARCH_READY', '[]', '', '', '', $now, $now)
  `).run({ $now: stamp });
  database.query(`
    INSERT INTO campaign_research_requests(request_id, project_id, wave_id, question, status, created_at, updated_at)
    VALUES ('request-build', 'demo', 'wave-parallel', 'Implement a v2 layered gate with exact mechanical checks.', 'approved_for_dispatch', $now, $now)
  `).run({ $now: stamp });
  database.query(`
    INSERT INTO campaign_research_requests(request_id, project_id, wave_id, question, status, created_at, updated_at)
    VALUES ('request-audit', 'demo', 'wave-parallel', 'Rebuild all 37 corrected pins from the LF source and audit them independently.', 'approved_for_dispatch', $now, $now)
  `).run({ $now: stamp });
  const parallelPlan = {
    lanes: [
      {
        requestId: "request-build", action: "KEEP", question: "Implement a v2 layered gate with exact mechanical checks.",
        taskId: "trade37-pin-gate-repair-v2", profile: "sonnet-worker", priority: 10, dependsOnTaskIds: [],
        contract: { status: "READY", baseRef: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" },
      },
      {
        requestId: "request-audit", action: "KEEP", question: "Rebuild all 37 corrected pins from the LF source and audit them independently.",
        taskId: "trade37-pin-lf-independent-audit-v1", profile: "sonnet-worker", priority: 100, dependsOnTaskIds: [],
        contract: { status: "READY", baseRef: "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb" },
      },
    ],
  };
  database.query(`
    INSERT INTO campaign_research_plans(wave_id, project_id, thread_id, turn_id, status, bundle_path, evidence_digest, response_json, created_at, updated_at)
    VALUES ('wave-parallel', 'demo', 'thr_sol', 'turn_parallel', 'applied', '', 'sha256:parallel-plan', $response, $now, $now)
  `).run({ $response: JSON.stringify(parallelPlan), $now: stamp });
  database.query("UPDATE campaign_projects SET current_phase = 'RESEARCH_READY', version = version + 1, updated_at = $now WHERE project_id = 'demo'").run({ $now: stamp });
  database.close();
  let project = (control.snapshot() as any).projects[0];
  await control.enqueueAction({ projectId: "demo", type: "research.schedule.prepare", idempotencyKey: "prepare-parallel-wave", expectedVersion: project.version }, "operator");
  expect((await waitForAction(control, "demo", "research.schedule.prepare")).status).toBe("completed");
  project = (control.snapshot() as any).projects[0];
  expect(project.researchSchedule).toMatchObject({ status: "proposed", authority: "none", proposal: { budget: { reservedTokens: 160_000 }, slots: { reserved: 2 } } });
  expect(project.researchSchedule.members.map((member: any) => member.taskId)).toEqual(["trade37-pin-gate-repair-v2", "trade37-pin-lf-independent-audit-v1"]);
  expect(launched).toEqual([]);
  await control.enqueueAction({
    projectId: "demo", type: "research.schedule.confirm", targetId: project.researchSchedule.id,
    idempotencyKey: "confirm-parallel-wave", expectedVersion: project.version,
    args: { scheduleDigest: project.researchSchedule.digest },
  }, "operator");
  expect((await waitForAction(control, "demo", "research.schedule.confirm")).status).toBe("completed");
  project = (control.snapshot() as any).projects[0];
  expect(project.researchSchedule).toMatchObject({ status: "confirmed", authority: "operator-confirmed-reservation" });
  expect(launched).toEqual([]);
  await control.enqueueAction({
    projectId: "demo", type: "research.schedule.dispatch", targetId: project.researchSchedule.id,
    idempotencyKey: "dispatch-parallel-wave", expectedVersion: project.version,
    args: { scheduleDigest: project.researchSchedule.digest },
  }, "operator");
  expect((await waitForAction(control, "demo", "research.schedule.dispatch")).status).toBe("completed");
  project = (control.snapshot() as any).projects[0];
  expect(maxInFlight).toBe(2);
  expect(new Set(launched)).toEqual(new Set(["trade37-pin-gate-repair-v2", "trade37-pin-lf-independent-audit-v1"]));
  expect(project).toMatchObject({ phase: "RESEARCH_RUNNING", researchSchedule: { status: "running", authority: "operator-confirmed-execution" } });
  expect(project.researchRuns).toHaveLength(2);
  expect(project.researchRuns.every((run: any) => run.status === "running")).toBe(true);

  const intakeDatabase = new Database(join(dataDir, "observer.sqlite"));
  intakeDatabase.query(`
    INSERT INTO campaign_coordinators(project_id, thread_id, source_thread_id, thread_name, thread_cwd, model, effort, status, last_turn_id, last_event_at, attached_at)
    VALUES ('demo', 'thr_sol', 'thr_sol', 'Sol · demo', $cwd, 'gpt-5.6-sol', 'high', 'idle', '', $now, $now)
  `).run({ $cwd: projectRoot, $now: stamp });
  for (const run of project.researchRuns) {
    const receipt = { schema: "cfg23-research-evidence/v1", task_id: run.taskId, status: "complete", verdict: "SUPPORTED" };
    intakeDatabase.query(`
      UPDATE campaign_research_runs SET status = 'evidence_ready', evidence_sha256 = $sha, evidence_json = $receipt, updated_at = $now, completed_at = $now
      WHERE run_id = $run
    `).run({ $run: run.id, $sha: `sha256:${run.id}`, $receipt: JSON.stringify(receipt), $now: stamp });
    intakeDatabase.query("UPDATE campaign_research_requests SET status = 'evidence_ready', updated_at = $now WHERE request_id = $request")
      .run({ $request: run.requestId, $now: stamp });
    intakeDatabase.query(`
      UPDATE campaign_wave_schedule_members SET status = 'evidence_ready', updated_at = $now
      WHERE schedule_id = $schedule AND request_id = $request
    `).run({ $schedule: project.researchSchedule.id, $request: run.requestId, $now: stamp });
  }
  intakeDatabase.query("UPDATE campaign_wave_schedules SET status = 'landed', updated_at = $now WHERE schedule_id = $schedule")
    .run({ $schedule: project.researchSchedule.id, $now: stamp });
  intakeDatabase.query("UPDATE campaign_projects SET current_phase = 'RESEARCH_INTAKE', version = version + 1, updated_at = $now WHERE project_id = 'demo'")
    .run({ $now: stamp });
  intakeDatabase.close();
  project = (control.snapshot() as any).projects[0];
  await control.enqueueAction({
    projectId: "demo", type: "research.evidence.return", targetId: project.researchRuns[0].id,
    idempotencyKey: "return-parallel-wave", expectedVersion: project.version,
  }, "operator");
  const intakeAction = await waitForAction(control, "demo", "research.evidence.return");
  expect(intakeAction.status).toBe("completed");
  expect(intakeAction.result.runIds).toHaveLength(2);
  project = (control.snapshot() as any).projects[0];
  expect(project).toMatchObject({ phase: "SYNTHESIZING", researchSchedule: { status: "completed" } });
  expect(project.researchRuns.every((run: any) => run.status === "returned_to_sol")).toBe(true);
  const intakeBundle = JSON.parse(readFileSync(intakeAction.result.bundlePath, "utf8"));
  expect(intakeBundle).toMatchObject({ schema: "campaign-research-intake/v2", schedule: { id: project.researchSchedule.id } });
  expect(intakeBundle.researchRuns).toHaveLength(2);
  control.stop();
}, 15_000);

test("an explicit synthesis request advances through App Server completion", async () => {
  const dataDir = mkdtempSync(join(tmpdir(), "lane-watch-synthesis-"));
  temporaryRoots.push(dataDir);
  const codex = new FakeCodex();
  const researchWorktree = join(dataDir, "research-worktree");
  let launchedSpec: any = null;
  const control = await CampaignControl.create(
    dataDir,
    join(fixtureRoot, "hub", "projects.json"),
    codex as any,
    async (_projectRoot, spec) => {
      launchedSpec = spec;
      return { laneId: "DKW-LOA", jobId: "deadbeef", worktree: researchWorktree, output: "test launch" };
    },
  );
  const observed = observer([lane()]);
  await control.observe(observed);
  let project = (control.snapshot() as any).projects[0];
  await control.enqueueAction({
    projectId: "demo",
    type: "wave.adopt",
    idempotencyKey: "adopt-before-explicit-synthesis",
    expectedVersion: project.version,
  }, "test-operator");
  expect((await waitForAction(control, "demo", "wave.adopt")).status).toBe("completed");
  await control.observe(observed);
  await waitForAction(control, "demo", "synthesis.prepare");
  project = (control.snapshot() as any).projects[0];
  await control.enqueueAction({
    projectId: "demo",
    type: "coordinator.attach",
    idempotencyKey: "attach-for-synthesis",
    expectedVersion: project.version,
    args: { threadId: "thr_sol" },
  }, "test");
  await waitForAction(control, "demo", "coordinator.attach");
  project = (control.snapshot() as any).projects[0];
  await control.enqueueAction({
    projectId: "demo",
    type: "synthesis.request",
    idempotencyKey: "request-demo-synthesis",
    expectedVersion: project.version,
  }, "test");
  expect((await waitForAction(control, "demo", "synthesis.request")).status).toBe("completed");
  expect(codex.startParams?.cwd).toBe(join(fixtureRoot, "project"));
  expect((control.snapshot() as any).projects[0].phase).toBe("SYNTHESIZING");
  codex.emit({
    method: "item/completed",
    params: {
      threadId: "thr_sol",
      turnId: "turn_synthesis",
      item: { type: "agentMessage", text: '{"decision":"READY_FOR_REVIEW","researchRequests":["Rebuild all 37 corrected pins from a clean Git archive and compare their canonical identities."]}' },
    },
  });
  codex.emit({
    method: "turn/completed",
    params: { threadId: "thr_sol", turn: { id: "turn_synthesis", status: "completed" } },
  });
  project = (control.snapshot() as any).projects[0];
  expect(project.phase).toBe("DECISION_REQUIRED");
  expect(project.wave.synthesis.response.decision).toBe("READY_FOR_REVIEW");
  await control.enqueueAction({
    projectId: "demo",
    type: "synthesis.review",
    idempotencyKey: "send-synthesis-to-research",
    expectedVersion: project.version,
    args: { decision: "research", note: "Cross-check before accepting." },
  }, "test");
  expect((await waitForAction(control, "demo", "synthesis.review")).status).toBe("completed");
  project = (control.snapshot() as any).projects[0];
  expect(project.phase).toBe("RESEARCH_REVIEW");
  expect(project.researchRequests[0].question).toBe("Rebuild all 37 corrected pins from a clean Git archive and compare their canonical identities.");
  expect(project.researchRequests[0].status).toBe("proposed");
  codex.nextTurnId = "turn_plan";
  await control.enqueueAction({
    projectId: "demo",
    type: "research.review.start",
    idempotencyKey: "start-research-review",
    expectedVersion: project.version,
  }, "test");
  expect((await waitForAction(control, "demo", "research.review.start")).status).toBe("completed");
  project = (control.snapshot() as any).projects[0];
  expect(project.phase).toBe("RESEARCH_REVIEW");
  expect(project.researchRequests[0].status).toBe("in_review");
  expect(project.researchPlan.status).toBe("drafting");
  const plannedRequest = project.researchRequests[0];
  codex.emit({
    method: "item/completed",
    params: {
      threadId: "thr_sol",
      turnId: "turn_plan",
      item: { type: "agentMessage", text: JSON.stringify({
        waveId: project.wave.id,
        evidenceDigest: project.researchPlan.evidenceDigest,
        summary: "One dependency-safe Sonnet audit should run next.",
        quickChecks: [{ check: "Dependency order", status: "PASS", detail: "No predecessor is required." }],
        lanes: [{
          requestId: plannedRequest.id,
          action: "KEEP",
          question: plannedRequest.question,
          taskId: "trade37-pin-lf-independent-audit-v1",
          profile: "sonnet-worker",
          priority: 1,
          dependsOnTaskIds: [],
          rationale: "This closes the byte/semantic custody gate.",
          stopCondition: "Stop after the immutable evidence receipt is written.",
          evidenceExpected: "cfg23-research-evidence/v1 receipt",
          contract: { status: "READY", baseRef: "1111111111111111111111111111111111111111" },
        }],
        risks: ["Do not interpret custody as geometric evidence."],
        operatorGuidance: "Approve only the single bounded audit.",
        decision: "READY_FOR_GATE",
      }) },
    },
  });
  codex.emit({
    method: "turn/completed",
    params: { threadId: "thr_sol", turn: { id: "turn_plan", status: "completed" } },
  });
  project = (control.snapshot() as any).projects[0];
  expect(project.researchPlan.status).toBe("drafted");
  expect(project.researchPlan.response.decision).toBe("READY_FOR_GATE");
  await control.enqueueAction({
    projectId: "demo",
    type: "research.review.resolve",
    idempotencyKey: "revise-research-review",
    expectedVersion: project.version,
    args: { decision: "revise", note: "Freeze the exact audit base and make the dependent replay require an accepted receipt." },
  }, "test");
  expect((await waitForAction(control, "demo", "research.review.resolve")).status).toBe("completed");
  project = (control.snapshot() as any).projects[0];
  expect(project.phase).toBe("REVISING");
  expect(project.researchRequests[0].status).toBe("revision_requested");
  expect(project.researchPlan.status).toBe("revise");
  codex.nextTurnId = "turn_plan_revised";
  await control.enqueueAction({
    projectId: "demo",
    type: "research.review.start",
    idempotencyKey: "restart-research-review",
    expectedVersion: project.version,
  }, "test");
  expect((await waitForAction(control, "demo", "research.review.start")).status).toBe("completed");
  project = (control.snapshot() as any).projects[0];
  expect(project.phase).toBe("RESEARCH_REVIEW");
  expect(project.researchRequests[0].status).toBe("in_review");
  expect(project.researchPlan.status).toBe("drafting");
  const revisionPrompt = (codex.startParams?.input as Array<{ text: string }> | undefined)?.[0]?.text;
  expect(revisionPrompt).toContain("This is a revision pass");
  expect(revisionPrompt).toContain("Freeze the exact audit base");
  codex.emit({
    method: "item/completed",
    params: {
      threadId: "thr_sol",
      turnId: "turn_plan_revised",
      item: { type: "agentMessage", text: JSON.stringify({
        waveId: project.wave.id,
        evidenceDigest: project.researchPlan.evidenceDigest,
        summary: "The corrected Sonnet audit is pinned and dependency-safe.",
        quickChecks: [{ check: "Exact launch base", status: "PASS", detail: "The immutable audit base is frozen." }],
        lanes: [{
          requestId: plannedRequest.id,
          action: "REVISE",
          question: plannedRequest.question,
          taskId: "trade37-pin-lf-independent-audit-v1",
          profile: "sonnet-worker",
          priority: 1,
          dependsOnTaskIds: [],
          rationale: "The revised packet freezes the audit base and preserves independence.",
          stopCondition: "Stop after the immutable evidence receipt is written.",
          evidenceExpected: "cfg23-research-evidence/v1 receipt with the frozen base digest",
          contract: { status: "READY", baseRef: "1111111111111111111111111111111111111111" },
        }],
        risks: ["Do not interpret custody as geometric evidence."],
        operatorGuidance: "Approve the corrected bounded audit at immutable base 1111111111111111111111111111111111111111.",
        decision: "READY_FOR_GATE",
      }) },
    },
  });
  codex.emit({
    method: "turn/completed",
    params: { threadId: "thr_sol", turn: { id: "turn_plan_revised", status: "completed" } },
  });
  project = (control.snapshot() as any).projects[0];
  expect(project.researchPlan.status).toBe("drafted");
  expect(project.researchPlan.response.decision).toBe("READY_FOR_GATE");
  const historyDatabase = new Database(join(dataDir, "observer.sqlite"));
  historyDatabase.query(`
    INSERT INTO campaign_research_requests(request_id, project_id, wave_id, question, status, created_at, updated_at)
    VALUES ('historical-request', 'demo', $wave, 'Previously completed independent check.', 'returned_to_sol', '2026-01-01T00:00:00.000Z', '2026-01-01T00:00:00.000Z')
  `).run({ $wave: project.wave.id });
  historyDatabase.close();
  await control.enqueueAction({
    projectId: "demo",
    type: "research.review.resolve",
    idempotencyKey: "approve-research-review",
    expectedVersion: project.version,
    args: { decision: "approve", note: "Independent questions are suitable for the proposed wave." },
  }, "test");
  expect((await waitForAction(control, "demo", "research.review.resolve")).status).toBe("completed");
  project = (control.snapshot() as any).projects[0];
  expect(project.phase).toBe("RESEARCH_READY");
  expect(project.researchRequests[0].status).toBe("approved_for_dispatch");
  expect(project.researchRequests.find((item: any) => item.id === "historical-request").status).toBe("returned_to_sol");
  expect(project.decisions[0].decision).toBe("research_approve");
  expect(project.dispatchPreferences.selectedProfile).toBe("sonnet-worker");
  expect(project.researchDispatch.spec).toMatchObject({ profile: "sonnet-worker", model: "sonnet", effort: "high", fanout: 0 });
  await control.enqueueAction({
    projectId: "demo",
    type: "project.dispatch-profile.set",
    idempotencyKey: "choose-opus-lead-sonnet",
    expectedVersion: project.version,
    args: { profile: "opus-lead-sonnet" },
  }, "test");
  expect((await waitForAction(control, "demo", "project.dispatch-profile.set")).status).toBe("completed");
  project = (control.snapshot() as any).projects[0];
  expect(project.dispatchPreferences.selectedProfile).toBe("opus-lead-sonnet");
  // A checked plan's lane-specific profile is part of its approved contract;
  // changing the campaign default must not mutate that staged lane.
  expect(project.researchDispatch.spec).toMatchObject({ profile: "sonnet-worker", model: "sonnet", effort: "high", fanout: 0 });
  await control.enqueueAction({
    projectId: "demo",
    type: "project.dispatch-profile.set",
    idempotencyKey: "restore-sonnet-worker",
    expectedVersion: project.version,
    args: { profile: "sonnet-worker" },
  }, "test");
  expect((await waitForAction(control, "demo", "project.dispatch-profile.set")).status).toBe("completed");
  project = (control.snapshot() as any).projects[0];
  await control.enqueueAction({
    projectId: "demo",
    type: "loop.start",
    idempotencyKey: "start-one-loop-pilot",
    expectedVersion: project.version,
  }, "test");
  expect((await waitForAction(control, "demo", "loop.start")).status).toBe("completed");
  expect((await waitForAction(control, "demo", "research.schedule.prepare")).status).toBe("completed");
  project = await waitForProject(control, "demo", (candidate) => candidate.loop?.status === "attention" && candidate.loop?.steps?.[0]?.status === "completed");
  expect(project.researchSchedule).toMatchObject({ status: "proposed", authority: "none", canConfirm: true, proposal: { slots: { reserved: 1 }, invariants: { humanConfirmationRequired: true, dispatched: false } } });
  expect(project.loop).toMatchObject({ status: "attention", steps: [{ actionType: "research.schedule.prepare", status: "completed" }] });
  await control.enqueueAction({
    projectId: "demo",
    type: "research.schedule.confirm",
    targetId: project.researchSchedule.id,
    idempotencyKey: "confirm-one-loop-wave-schedule",
    expectedVersion: project.version,
    args: { scheduleDigest: project.researchSchedule.digest },
  }, "test");
  expect((await waitForAction(control, "demo", "research.schedule.confirm")).status).toBe("completed");
  project = (control.snapshot() as any).projects[0];
  expect(project.researchSchedule).toMatchObject({ status: "confirmed", authority: "operator-confirmed-reservation", canDispatch: true });
  expect(project.loop).toMatchObject({ status: "attention", canResume: true });
  await control.enqueueAction({
    projectId: "demo",
    type: "loop.resume",
    idempotencyKey: "resume-confirmed-wave-schedule",
    expectedVersion: project.version,
  }, "test");
  expect((await waitForAction(control, "demo", "loop.resume")).status).toBe("completed");
  expect((await waitForAction(control, "demo", "research.schedule.dispatch")).status).toBe("completed");
  project = await waitForProject(control, "demo", (candidate) => candidate.phase === "RESEARCH_RUNNING" && candidate.loop?.pendingActionId === "");
  expect(project.phase).toBe("RESEARCH_RUNNING");
  expect(project.loop).toMatchObject({ status: "running", startPhase: "RESEARCH_READY", decisionCrossed: true });
  expect(project.loop.start.phase).toBe("RESEARCH_READY");
  expect(project.loop.steps.map((step: any) => step.actionType)).toEqual(["research.schedule.prepare", "research.schedule.dispatch"]);
  expect(project.researchRuns[0]).toMatchObject({ status: "running", taskId: "trade37-pin-lf-independent-audit-v1", jobId: "deadbeef" });
  expect(launchedSpec).toMatchObject({ profile: "sonnet-worker", model: "sonnet", effort: "high", fanout: 0, outputContract: "cfg23-research-evidence/v1" });
  await control.enqueueAction({
    projectId: "demo",
    type: "loop.pause",
    idempotencyKey: "pause-one-loop-pilot",
    expectedVersion: project.version,
  }, "test");
  expect((await waitForAction(control, "demo", "loop.pause")).status).toBe("completed");
  project = (control.snapshot() as any).projects[0];
  expect(project.loop.status).toBe("paused");
  await control.enqueueAction({
    projectId: "demo",
    type: "loop.resume",
    idempotencyKey: "resume-one-loop-pilot",
    expectedVersion: project.version,
  }, "test");
  expect((await waitForAction(control, "demo", "loop.resume")).status).toBe("completed");
  project = (control.snapshot() as any).projects[0];
  expect(project.loop.status).toBe("running");
  await control.enqueueAction({
    projectId: "demo",
    type: "loop.halt-after-step",
    idempotencyKey: "halt-one-loop-before-next-step",
    expectedVersion: project.version,
  }, "test");
  expect((await waitForAction(control, "demo", "loop.halt-after-step")).status).toBe("completed");
  project = (control.snapshot() as any).projects[0];
  expect(project.loop).toMatchObject({ status: "paused", haltAfterStep: false });
  await control.enqueueAction({
    projectId: "demo",
    type: "loop.resume",
    idempotencyKey: "resume-one-loop-after-halt",
    expectedVersion: project.version,
  }, "test");
  expect((await waitForAction(control, "demo", "loop.resume")).status).toBe("completed");
  project = (control.snapshot() as any).projects[0];
  expect(project.loop.status).toBe("running");
  await control.observe(observer([lane({
    id: "demo:windows:trade37-pin-lf-independent-audit-v1",
    task: "trade37-pin-lf-independent-audit-v1",
    lane: "DKW-LOA",
    jobId: "deadbeef",
    daemon: "running",
    severity: "working",
    status: "Working",
    attentionReason: "",
    landing: "—",
  })]));
  project = (control.snapshot() as any).projects[0];
  expect(project.phase).toBe("RESEARCH_RUNNING");
  await control.observe(observer([lane({
    id: "demo:windows:trade37-pin-lf-independent-audit-v1",
    task: "trade37-pin-lf-independent-audit-v1",
    lane: "DKW-LOA",
    jobId: "deadbeef",
    daemon: "working",
    tempo: "blocked",
    severity: "working",
    status: "Active",
    detail: "stuck on a startup dialog",
    attentionReason: "",
    landing: "—",
  })]));
  project = (control.snapshot() as any).projects[0];
  expect(project.phase).toBe("RESEARCH_RUNNING");
  expect(project.researchRuns[0]).toMatchObject({ status: "blocked", jobId: "deadbeef", error: "stuck on a startup dialog" });
  mkdirSync(join(researchWorktree, "artifacts", "trade37-pin-lf-independent-audit-v1"), { recursive: true });
  git(researchWorktree, "init");
  git(researchWorktree, "config", "user.name", "Lane Watch Test");
  git(researchWorktree, "config", "user.email", "lane-watch@example.invalid");
  writeFileSync(join(researchWorktree, "README.md"), "research base\n");
  git(researchWorktree, "add", "--", "README.md");
  git(researchWorktree, "commit", "-m", "Initialize research base");
  const receiptPath = "artifacts/trade37-pin-lf-independent-audit-v1/evidence-receipt.json";
  writeFileSync(join(researchWorktree, receiptPath), JSON.stringify({
    schema: "cfg23-research-evidence/v1",
    task_id: "trade37-pin-lf-independent-audit-v1",
    verdict: "SUPPORTED",
    pin_count: 37,
    changed_paths: [receiptPath],
  }));
  writeFileSync(join(researchWorktree, "unrelated.txt"), "operator work\n");
  // Some adapters report a completed turn as blocked when its final prose asks
  // a follow-up question. The landing repair must refuse unrelated work before
  // freezing an otherwise terminal receipt.
  await control.observe(observer([lane({
    id: "demo:windows:trade37-pin-lf-independent-audit-v1",
    task: "trade37-pin-lf-independent-audit-v1",
    lane: "DKW-LOA",
    jobId: "deadbeef",
    daemon: "working",
    tempo: "blocked",
    severity: "attention",
    status: "Blocked",
    detail: "Next sharp question: choose the follow-up scope.",
    attentionReason: "blocked-checkpoint",
    landing: "—",
  })]));
  project = (control.snapshot() as any).projects[0];
  expect(project.phase).toBe("RESEARCH_RUNNING");
  expect(project.researchRuns[0].status).toBe("blocked");
  expect(project.researchRuns[0].error).toContain("Landing repair refused unexpected changed paths: unrelated.txt");
  rmSync(join(researchWorktree, "unrelated.txt"));
  codex.nextTurnId = "turn_revised_synthesis";
  await control.observe(observer([lane({
    id: "demo:windows:trade37-pin-lf-independent-audit-v1",
    task: "trade37-pin-lf-independent-audit-v1",
    lane: "DKW-LOA",
    jobId: "deadbeef",
    daemon: "working",
    tempo: "blocked",
    severity: "attention",
    status: "Blocked",
    detail: "Next sharp question: choose the follow-up scope.",
    attentionReason: "blocked-checkpoint",
    landing: "—",
  })]));
  expect((await waitForAction(control, "demo", "research.evidence.return")).status).toBe("completed");
  project = (control.snapshot() as any).projects[0];
  expect(project.phase).toBe("SYNTHESIZING");
  expect(project.researchRuns[0]).toMatchObject({ status: "returned_to_sol", jobId: "deadbeef", error: "" });
  expect(git(researchWorktree, "status", "--porcelain=v1", "--untracked-files=all")).toBe("");
  expect(git(researchWorktree, "log", "-1", "--format=%s")).toBe("Freeze trade37-pin-lf-independent-audit-v1 research evidence");
  await control.observe(observer([lane({
    id: "demo:windows:trade37-pin-lf-independent-audit-v1",
    task: "trade37-pin-lf-independent-audit-v1",
    lane: "DKW-LOA",
    jobId: "deadbeef",
    daemon: "done",
    severity: "attention",
    status: "Done, reconciliation pending",
    attentionReason: "terminal-unrecorded",
    landing: "READY_FOR_SEMANTIC_REVIEW",
  })]));
  project = (control.snapshot() as any).projects[0];
  expect(project.phase).toBe("SYNTHESIZING");
  expect(project.researchRuns[0].status).toBe("returned_to_sol");
  expect(project.researchRuns[0].evidenceSha256).toStartWith("sha256:");
  expect(project.researchRuns[0].evidence.task_id).toBe("trade37-pin-lf-independent-audit-v1");
  expect(project.researchRuns[0]).toMatchObject({ measuredTokens: 100, measurementSource: "observer-ledger-at-receipt-freeze" });
  expect(project.researchRuns[0].measuredWallSeconds).toBeGreaterThan(0);
  expect(project.resources.calibration).toMatchObject({
    status: "INSUFFICIENT", eligibleSamples: 1, schedulerAuthority: "none", policyChangeAllowed: false,
  });

  const auditQuestion = "Independently audit the v2 gate from a clean commit, including CRLF, CR-only, trailing-newline, formatting, set-order, relabeling, stale-provenance, one-flag mutation, deleted dependency, duplicate ID, role swap, and Frankenstein-candidate controls.";
  const stagedDatabase = new Database(join(dataDir, "observer.sqlite"));
  stagedDatabase.query(`
    INSERT INTO campaign_research_requests(request_id, project_id, wave_id, question, status, created_at, updated_at)
    VALUES ('staged-audit', 'demo', $wave, $question, 'approved_for_dispatch', '2026-08-26T02:00:00.000Z', '2026-08-26T02:00:00.000Z')
  `).run({ $wave: project.wave.id, $question: auditQuestion });
  const stagedPlanRow = stagedDatabase.query("SELECT response_json FROM campaign_research_plans WHERE wave_id = $wave")
    .get({ $wave: project.wave.id }) as { response_json: string };
  const stagedPlanResponse = JSON.parse(stagedPlanRow.response_json);
  stagedPlanResponse.lanes.push({
    requestId: "staged-audit",
    action: "KEEP",
    question: auditQuestion,
    taskId: "trade37-pin-gate-independent-audit-v2",
    profile: "sonnet-worker",
    priority: 20,
    dependsOnTaskIds: [],
    contract: { status: "READY", baseRef: "2222222222222222222222222222222222222222" },
  });
  stagedDatabase.query("UPDATE campaign_research_plans SET response_json = $response WHERE wave_id = $wave")
    .run({ $response: JSON.stringify(stagedPlanResponse), $wave: project.wave.id });
  stagedDatabase.close();
  codex.emit({
    method: "item/completed",
    params: {
      threadId: "thr_sol",
      turnId: "turn_revised_synthesis",
      item: { type: "agentMessage", text: JSON.stringify({
        decision: "RESEARCH_REQUIRED",
        researchRequests: ["Run a separately implemented audit before release."],
        nextWave: { lanes: [{ taskId: "trade37-pin-gate-independent-audit-v2" }] },
      }) },
    },
  });
  codex.emit({
    method: "turn/completed",
    params: { threadId: "thr_sol", turn: { id: "turn_revised_synthesis", status: "completed" } },
  });
  project = (control.snapshot() as any).projects[0];
  expect(project.phase).toBe("DECISION_REQUIRED");
  expect(project.loop).toMatchObject({ status: "completed", startPhase: "RESEARCH_READY", endPhase: "DECISION_REQUIRED" });
  expect(project.loop.end.phase).toBe("DECISION_REQUIRED");
  expect(project.loop.steps.map((step: any) => step.actionType)).toEqual(["research.schedule.prepare", "research.schedule.dispatch", "research.evidence.return"]);
  await control.enqueueAction({
    projectId: "demo",
    type: "synthesis.review",
    idempotencyKey: "reuse-approved-audit",
    expectedVersion: project.version,
    args: { decision: "research", note: "Run the already approved dependency-safe audit.", focusTaskId: "trade37-pin-gate-independent-audit-v2" },
  }, "test");
  const reuseAction = await waitForAction(control, "demo", "synthesis.review");
  expect(reuseAction.status).toBe("completed");
  expect(reuseAction.result.insertedResearchRequests).toBe(0);
  expect(reuseAction.result.focusTaskId).toBe("trade37-pin-gate-independent-audit-v2");
  project = (control.snapshot() as any).projects[0];
  expect(project.phase).toBe("RESEARCH_READY");
  expect(project.researchRequests.filter((item: any) => item.question === auditQuestion)).toHaveLength(1);

  const repairV21Question = "Produce v2.1 that removes FLOAT_QUARANTINE subtrees from the L2 preimage or replaces them with a fixed sentinel; require Q02 never to HARD_STOP.";
  const repairDatabase = new Database(join(dataDir, "observer.sqlite"));
  repairDatabase.query(`
    INSERT INTO campaign_research_requests(request_id, project_id, wave_id, question, status, created_at, updated_at)
    VALUES ('repair-v2-1', 'demo', $wave, $question, 'approved_for_dispatch', '2026-08-27T00:00:00.000Z', '2026-08-27T00:00:00.000Z')
  `).run({ $wave: project.wave.id, $question: repairV21Question });
  repairDatabase.query(`
    INSERT INTO campaign_research_runs(
      run_id, request_id, project_id, wave_id, task_id, status, profile, host, model, effort, fanout,
      packet_path, base_ref, lane_id, job_id, worktree, evidence_path, evidence_sha256, evidence_json,
      error, created_at, updated_at, completed_at
    ) VALUES (
      'audit-v2-blocked', 'audit-v2-request', 'demo', $wave, 'trade37-pin-gate-independent-audit-v2',
      'returned_to_sol', 'research-opus-max', 'windows', 'opus', 'max', 0,
      'packets/launch/trade37-pin-gate-independent-audit-v2.md', 'main', 'DKW-LOD', 'auditjob', '',
      'artifacts/trade37-pin-gate-independent-audit-v2/evidence-receipt.json', 'sha256:audit',
      '{"schema":"cfg23-research-evidence/v1","task_id":"trade37-pin-gate-independent-audit-v2","status":"blocked"}',
      '', '2026-08-26T23:00:00.000Z', '2026-08-26T23:30:00.000Z', '2026-08-26T23:30:00.000Z'
    )
  `).run({ $wave: project.wave.id });
  // A historical question without its checked plan remains readable but must
  // not reconstruct a launch contract from question text.
  repairDatabase.query("DELETE FROM campaign_wave_schedule_members WHERE schedule_id IN (SELECT schedule_id FROM campaign_wave_schedules WHERE wave_id = $wave)")
    .run({ $wave: project.wave.id });
  repairDatabase.query("DELETE FROM campaign_wave_schedules WHERE wave_id = $wave").run({ $wave: project.wave.id });
  repairDatabase.query("DELETE FROM campaign_research_plans WHERE wave_id = $wave").run({ $wave: project.wave.id });
  repairDatabase.close();
  project = (control.snapshot() as any).projects[0];
  expect(project.researchDispatch.available).toBe(false);
  expect(project.researchDispatch.reason).toContain("No approved request has an enforced dispatch contract yet");
  expect(project.researchDispatch.spec).toBeNull();
  await control.enqueueAction({
    projectId: "demo",
    type: "research.schedule.prepare",
    idempotencyKey: "refuse-legacy-question-fallback",
    expectedVersion: project.version,
  }, "test");
  const refusedLegacySchedule = await waitForAction(control, "demo", "research.schedule.prepare");
  expect(refusedLegacySchedule.status).toBe("failed");
  expect(refusedLegacySchedule.error).toContain("Wave schedule preflight blocked");
  expect(refusedLegacySchedule.error).toContain("no dependency-ready immutable launch contract");
  control.stop();
}, 30_000);
