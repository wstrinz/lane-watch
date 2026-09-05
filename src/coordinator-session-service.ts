import { Database } from "bun:sqlite";
import { isAbsolute, relative, resolve, sep } from "node:path";
import { CodexAppServerClient, type CodexThreadSummary } from "./codex";

export interface CoordinatorRow {
  project_id: string;
  thread_id: string;
  source_thread_id: string;
  thread_name: string;
  thread_cwd: string;
  model: string;
  effort: string;
  status: string;
  last_turn_id: string;
  last_event_at: string;
  attached_at: string;
}

export interface CodexCoordinatorCandidate extends CodexThreadSummary {
  eligible: boolean;
  scope: "project" | "workspace-root" | "workspace" | "outside-workspace" | "unknown";
  matchReason: string;
  relevanceScore: number;
}

interface CoordinatorSessionPort {
  definition(projectId: string): { role: string; root: string } | null;
  projectRoot(projectId: string): string;
  workspaceRoot(): string;
  touchProject(projectId: string): void;
  recordEvent(projectId: string, aggregateType: string, aggregateId: string, eventType: string, payload: unknown): void;
  sanitizeConversation(projectId: string, coordinator: CoordinatorRow, thread: Record<string, any>): Record<string, unknown>;
  now(): string;
}

function within(root: string, candidate: string): boolean {
  const normalizedRoot = resolve(root);
  const normalizedCandidate = resolve(candidate);
  const delta = relative(normalizedRoot, normalizedCandidate);
  return !delta || (!delta.startsWith(`..${sep}`) && delta !== ".." && !isAbsolute(delta));
}

function sha256Text(value: string): string {
  const hasher = new Bun.CryptoHasher("sha256");
  hasher.update(value);
  return hasher.digest("hex");
}

/** Owns Sol task attachment, writer recovery, inspection, and operator messaging. */
export class CoordinatorSessionService {
  constructor(
    private readonly database: Database,
    private readonly codex: CodexAppServerClient,
    private readonly port: CoordinatorSessionPort,
  ) {}

  get(projectId: string): CoordinatorRow | null {
    return this.database.query("SELECT * FROM campaign_coordinators WHERE project_id = $id").get({ $id: projectId }) as CoordinatorRow | null;
  }

  async listCandidates(projectId: string): Promise<CodexCoordinatorCandidate[]> {
    const definition = this.port.definition(projectId);
    if (!definition) throw new Error(`Unknown project: ${projectId}`);
    const root = definition.root;
    const workspaceRoot = this.port.workspaceRoot();
    const all = await this.codex.listThreads();
    return all.map((thread): CodexCoordinatorCandidate => {
      const cwd = thread.cwd && isAbsolute(thread.cwd) ? resolve(thread.cwd) : "";
      const normalizedName = thread.name.toLowerCase();
      const roleTerms = (definition.role.toLowerCase().match(/[a-z0-9]+/g) ?? [])
        .filter((term) => term.length >= 4 && !["private", "campaign", "project", "research", "active", "exact", "problem"].includes(term));
      const relevanceScore = [projectId.toLowerCase(), ...new Set(roleTerms)]
        .reduce((score, term) => score + (normalizedName.includes(term) ? 1 : 0), 0);
      if (cwd && within(root, cwd)) return { ...thread, eligible: true, scope: "project", matchReason: "Campaign project", relevanceScore };
      if (cwd === workspaceRoot) return { ...thread, eligible: true, scope: "workspace-root", matchReason: relevanceScore ? "Project-related control task" : "Shared control workspace", relevanceScore };
      if (cwd && within(workspaceRoot, cwd)) return { ...thread, eligible: true, scope: "workspace", matchReason: "Shared workspace", relevanceScore };
      if (!cwd) return { ...thread, eligible: false, scope: "unknown", matchReason: "Working directory unavailable", relevanceScore };
      return {
        ...thread,
        eligible: false,
        scope: "outside-workspace",
        matchReason: relevanceScore ? "Name matches, but task is outside this workspace" : "Outside this workspace",
        relevanceScore,
      };
    }).sort((left, right) => {
      const rank = { project: 0, "workspace-root": 1, workspace: 2, unknown: 3, "outside-workspace": 4 };
      return rank[left.scope] - rank[right.scope]
        || right.relevanceScore - left.relevanceScore
        || Date.parse(right.updatedAt || right.createdAt || "") - Date.parse(left.updatedAt || left.createdAt || "")
        || left.name.localeCompare(right.name);
    }).slice(0, 50);
  }

  async conversation(projectId: string): Promise<Record<string, unknown>> {
    this.port.projectRoot(projectId);
    const coordinator = this.get(projectId);
    if (!coordinator) throw new Error("Attach a Sol coordinator before reading its conversation");
    const thread = await this.codex.readThreadDetail(coordinator.thread_id);
    return this.port.sanitizeConversation(projectId, coordinator, thread);
  }

  async writable(projectId: string): Promise<CoordinatorRow> {
    const coordinator = this.get(projectId);
    if (!coordinator) throw new Error("Attach a Sol coordinator before starting a turn");
    try {
      await this.codex.resumeThread(coordinator.thread_id);
      // A shallow resume can succeed even when the task's rollout is unreadable
      // to this App Server. Force the full read needed by turn/start first.
      await this.codex.readThreadDetail(coordinator.thread_id);
      return coordinator;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      const activeWriter = /already has an active writer/i.test(message);
      const unreadableRollout = /does not start with session metadata/i.test(message);
      if (!activeWriter && !unreadableRollout) throw error;
      const fork = unreadableRollout
        ? await this.codex.startThread({ cwd: coordinator.thread_cwd, approvalPolicy: "on-request" })
        : await this.codex.forkThread(coordinator.thread_id);
      const stamp = this.port.now();
      const sourceThreadId = coordinator.source_thread_id || coordinator.thread_id;
      const forkName = `${coordinator.thread_name.replace(/ · Lane Watch control$/, "")} · Lane Watch control`;
      this.database.query(`
        UPDATE campaign_coordinators
        SET thread_id = $thread, source_thread_id = $source, thread_name = $name,
          thread_cwd = $cwd, model = $model, status = $status,
          last_turn_id = '', last_event_at = $now
        WHERE project_id = $project
      `).run({
        $thread: fork.id,
        $source: sourceThreadId,
        $name: forkName,
        $cwd: fork.cwd || coordinator.thread_cwd,
        $model: fork.model || coordinator.model,
        $status: fork.status === "unknown" ? "idle" : fork.status,
        $now: stamp,
        $project: projectId,
      });
      this.port.recordEvent(projectId, "coordinator", fork.id, "coordinator.writer.forked", {
        sourceThreadId,
        blockedThreadId: coordinator.thread_id,
        forkThreadId: fork.id,
        recovery: unreadableRollout ? "fresh-thread-from-immutable-bundle" : "active-writer-fork",
        reason: message,
      });
      return this.get(projectId)!;
    }
  }

  async attach(projectId: string, args: Record<string, any>): Promise<Record<string, unknown>> {
    const threadId = typeof args.threadId === "string" ? args.threadId.trim() : "";
    if (!threadId) throw new Error("threadId is required");
    const thread = await this.codex.readThread(threadId);
    const workspaceRoot = this.port.workspaceRoot();
    const root = this.port.projectRoot(projectId);
    if (thread.cwd && isAbsolute(thread.cwd) && !within(root, thread.cwd) && !within(workspaceRoot, thread.cwd)) {
      throw new Error(`Codex task cwd is outside the shared control workspace: ${thread.cwd}`);
    }
    const stamp = this.port.now();
    this.database.query(`
      INSERT INTO campaign_coordinators(project_id, thread_id, source_thread_id, thread_name, thread_cwd, model, effort, status, last_turn_id, last_event_at, attached_at)
      VALUES ($project, $thread, $thread, $name, $cwd, $model, $effort, $status, '', $now, $now)
      ON CONFLICT(project_id) DO UPDATE SET
        thread_id = excluded.thread_id, source_thread_id = excluded.source_thread_id, thread_name = excluded.thread_name, thread_cwd = excluded.thread_cwd, model = excluded.model,
        status = excluded.status, last_event_at = excluded.last_event_at, attached_at = excluded.attached_at
    `).run({
      $project: projectId,
      $thread: thread.id,
      $name: thread.name,
      $cwd: thread.cwd,
      $model: thread.model,
      $effort: typeof args.effort === "string" ? args.effort : "high",
      $status: thread.status,
      $now: stamp,
    });
    this.port.touchProject(projectId);
    this.port.recordEvent(projectId, "coordinator", thread.id, "coordinator.attached", { name: thread.name, cwd: thread.cwd });
    return { thread };
  }

  async interrupt(projectId: string): Promise<Record<string, unknown>> {
    const coordinator = this.get(projectId);
    if (!coordinator?.last_turn_id) throw new Error("The attached Sol coordinator has no active turn");
    await this.codex.interruptTurn(coordinator.thread_id, coordinator.last_turn_id);
    return { threadId: coordinator.thread_id, turnId: coordinator.last_turn_id, interrupted: true };
  }

  async sendMessage(projectId: string, args: Record<string, any>): Promise<Record<string, unknown>> {
    const advice=args.advice===true;
    const adviserModels=['gpt-5.6-sol','gpt-5.6-terra','gpt-6-astra'];
    if(advice&&!adviserModels.includes(args.model))throw new Error('Choose a supported campaign adviser model');
    const message = typeof args.message === "string" ? args.message.trim() : "";
    if (!message) throw new Error("A message is required");
    if (message.length > 12_000) throw new Error("Coordinator messages are limited to 12,000 characters");
    let coordinator = this.get(projectId);
    if (!coordinator) throw new Error("Attach a Sol coordinator before sending a message");
    const active = ["working", "active", "running"].includes(coordinator.status.toLowerCase()) && Boolean(coordinator.last_turn_id);
    if(advice&&active)throw new Error('The campaign adviser is already working. Wait for its reply or interrupt it in coordinator controls.');
    const stamp = this.port.now();
    if (active) {
      await this.codex.steerTurn(coordinator.thread_id, coordinator.last_turn_id, message);
      this.database.query("UPDATE campaign_coordinators SET last_event_at = $now WHERE project_id = $project")
        .run({ $now: stamp, $project: projectId });
      this.port.recordEvent(projectId, "coordinator", coordinator.thread_id, "coordinator.turn.steered", {
        turnId: coordinator.last_turn_id,
        messageDigest: `sha256:${sha256Text(message)}`,
      });
      return { threadId: coordinator.thread_id, turnId: coordinator.last_turn_id, mode: "steered" };
    }
    coordinator = await this.writable(projectId);
    const turn = await this.codex.startTurn({
      threadId: coordinator.thread_id,
      input: [{ type: "text", text: advice ? `You are providing campaign advice in a read-only consultation. Do not edit files, dispatch workers, run research computations, publish, or send external messages. Explain recommendations and evidence limits; the operator will choose subsequent actions.\n\n${message}` : message }],
      cwd: coordinator.thread_cwd || this.port.workspaceRoot(),
      model: advice ? args.model : coordinator.model || undefined,
      effort: coordinator.effort || "high",
      approvalPolicy: advice ? "never" : "on-request",
      sandboxPolicy: { type: "readOnly" },
    });
    if (!turn.id) throw new Error("Codex App Server did not return a turn id");
    this.database.query("UPDATE campaign_coordinators SET status = 'working', last_turn_id = $turn, last_event_at = $now WHERE project_id = $project")
      .run({ $turn: turn.id, $now: stamp, $project: projectId });
    this.port.recordEvent(projectId, "coordinator", coordinator.thread_id, "coordinator.turn.started", {
      turnId: turn.id,
      ...(advice?{purpose:'advice',model:args.model,role:String(args.role||'Propose').slice(0,40)}:{}),
      messageDigest: `sha256:${sha256Text(message)}`,
    });
    return { threadId: coordinator.thread_id, turnId: turn.id, mode: "started" };
  }
}
