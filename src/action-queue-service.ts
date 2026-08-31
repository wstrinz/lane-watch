import { Database } from "bun:sqlite";

export interface ActionQueueRow {
  action_id: string;
  project_id: string;
  action_type: string;
  target_id: string;
  idempotency_key: string;
  expected_version: number;
  status: string;
  args_json: string;
  result_json: string;
  error: string;
  created_by: string;
  created_at: string;
  started_at: string;
  completed_at: string;
}

export interface ActionQueueInput {
  projectId: string;
  type: string;
  targetId?: string;
  idempotencyKey: string;
  expectedVersion: number;
  args?: Record<string, unknown>;
}

interface ActionQueuePort {
  validateType(type: string): void;
  projectVersion(projectId: string): number;
  admit?(action: ActionQueueRow, args: Record<string, any>): void | Promise<void>;
  execute(action: ActionQueueRow, args: Record<string, any>): Promise<Record<string, unknown>>;
  recordEvent(projectId: string, aggregateType: string, aggregateId: string, eventType: string, payload: unknown): void;
  notifyChanged(): void;
  afterSettled(projectId: string): void;
  now(): string;
}

function parseJson<T>(value: string, fallback: T): T {
  try { return JSON.parse(value) as T; } catch { return fallback; }
}

/** Owns durable, idempotent, version-checked serialization of campaign commands. */
export class ActionQueueService {
  private processing = false;
  private ready = false;
  private readonly interruptedProjects = new Set<string>();

  constructor(private readonly database: Database, private readonly port: ActionQueuePort) {}

  async enqueue(input: ActionQueueInput, actor: string): Promise<Record<string, unknown>> {
    this.port.validateType(input.type);
    if (!input.idempotencyKey || input.idempotencyKey.length > 180) throw new Error("A bounded idempotency key is required");
    this.port.projectVersion(input.projectId);
    const existing = this.database.query("SELECT * FROM campaign_actions WHERE idempotency_key = $key").get({ $key: input.idempotencyKey }) as ActionQueueRow | null;
    if (existing) return this.snapshot(existing);
    const actionId = crypto.randomUUID();
    this.database.query(`
      INSERT INTO campaign_actions(
        action_id, project_id, action_type, target_id, idempotency_key, expected_version,
        status, args_json, result_json, error, created_by, created_at, started_at, completed_at
      ) VALUES ($id, $project, $type, $target, $key, $version, 'queued', $args, '{}', '', $actor, $now, '', '')
    `).run({
      $id: actionId,
      $project: input.projectId,
      $type: input.type,
      $target: input.targetId ?? "",
      $key: input.idempotencyKey,
      $version: input.expectedVersion,
      $args: JSON.stringify(input.args ?? {}),
      $actor: actor,
      $now: this.port.now(),
    });
    this.port.recordEvent(input.projectId, "action", actionId, "action.queued", { type: input.type, actor });
    if (this.ready) void this.process();
    this.port.notifyChanged();
    return this.snapshot(this.byId(actionId));
  }

  /**
   * Freezes actions that crossed the durable `running` boundary without a
   * terminal receipt. Their effects are ambiguous after a process crash, so
   * they are never replayed automatically. Actions still `queued` are known
   * not to have started and remain eligible for normal version-checked work.
   */
  recoverInterrupted(): number {
    const interrupted = this.database.query("SELECT * FROM campaign_actions WHERE status = 'running' ORDER BY created_at")
      .all() as ActionQueueRow[];
    if (!interrupted.length) return 0;
    const stamp = this.port.now();
    const message = "Interrupted by a Lane Watch restart after execution began. The action was not replayed; inspect its external effects and submit a fresh guarded action only if safe.";
    const fail = this.database.query("UPDATE campaign_actions SET status = 'failed', error = $error, completed_at = $now WHERE action_id = $id AND status = 'running'");
    this.database.transaction(() => {
      for (const action of interrupted) {
        fail.run({ $id: action.action_id, $error: message, $now: stamp });
        this.interruptedProjects.add(action.project_id);
        this.port.recordEvent(action.project_id, "action", action.action_id, "action.recovery-attention", {
          type: action.action_type,
          error: message,
          automaticReplay: false,
        });
      }
    })();
    this.port.notifyChanged();
    return interrupted.length;
  }

  /** Activates processing only after the first observer snapshot is present. */
  resume(): void {
    if (this.ready) {
      void this.process();
      return;
    }
    this.ready = true;
    void this.process().finally(() => {
      for (const projectId of this.interruptedProjects) this.port.afterSettled(projectId);
      this.interruptedProjects.clear();
    });
  }

  snapshot(row: ActionQueueRow): Record<string, unknown> {
    return {
      id: row.action_id,
      projectId: row.project_id,
      type: row.action_type,
      targetId: row.target_id,
      status: row.status,
      args: parseJson(row.args_json, {}),
      result: parseJson(row.result_json, {}),
      error: row.error,
      actor: row.created_by,
      createdAt: row.created_at,
      startedAt: row.started_at,
      completedAt: row.completed_at,
    };
  }

  byId(actionId: string): ActionQueueRow {
    const row = this.database.query("SELECT * FROM campaign_actions WHERE action_id = $id").get({ $id: actionId }) as ActionQueueRow | null;
    if (!row) throw new Error(`Unknown action: ${actionId}`);
    return row;
  }

  private async process(): Promise<void> {
    if (this.processing) return;
    this.processing = true;
    try {
      while (true) {
        const action = this.database.query("SELECT * FROM campaign_actions WHERE status = 'queued' ORDER BY created_at LIMIT 1").get() as ActionQueueRow | null;
        if (!action) break;
        this.database.query("UPDATE campaign_actions SET status = 'running', started_at = $now WHERE action_id = $id")
          .run({ $id: action.action_id, $now: this.port.now() });
        this.port.notifyChanged();
        try {
          const currentVersion = this.port.projectVersion(action.project_id);
          if (currentVersion !== action.expected_version) throw new Error(`Stale project version: expected ${action.expected_version}, current ${currentVersion}`);
          const args = parseJson<Record<string, any>>(action.args_json, {});
          await this.port.admit?.(action, args);
          const result = await this.port.execute(action, args);
          this.database.query("UPDATE campaign_actions SET status = 'completed', result_json = $result, completed_at = $now WHERE action_id = $id")
            .run({ $id: action.action_id, $result: JSON.stringify(result), $now: this.port.now() });
          this.port.recordEvent(action.project_id, "action", action.action_id, "action.completed", result);
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          this.database.query("UPDATE campaign_actions SET status = 'failed', error = $error, completed_at = $now WHERE action_id = $id")
            .run({ $id: action.action_id, $error: message.slice(0, 4000), $now: this.port.now() });
          this.port.recordEvent(action.project_id, "action", action.action_id, "action.failed", { error: message });
        }
        this.port.notifyChanged();
        this.port.afterSettled(action.project_id);
      }
    } finally {
      this.processing = false;
    }
  }
}
