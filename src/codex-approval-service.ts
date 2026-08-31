import { Database } from "bun:sqlite";
import type { CodexAppServerClient, CodexServerRequest } from "./codex";
import type { CoordinatorRow } from "./coordinator-session-service";

interface ApprovalRow {
  request_id: string;
  rpc_id_json: string;
  project_id: string;
  thread_id: string;
  turn_id: string;
  method: string;
  params_json: string;
  created_at: string;
}

interface CodexApprovalPort {
  handleCustody(request: CodexServerRequest): boolean;
  recordEvent(projectId: string, aggregateType: string, aggregateId: string, eventType: string, payload: unknown): void;
  notifyChanged(): void;
  now(): string;
}

function parseJson<T>(value: string, fallback: T): T {
  try { return JSON.parse(value) as T; } catch { return fallback; }
}

/** Owns capture and explicit operator response for App Server approval requests. */
export class CodexApprovalService {
  constructor(
    private readonly database: Database,
    private readonly codex: CodexAppServerClient,
    private readonly port: CodexApprovalPort,
  ) {}

  capture(request: CodexServerRequest): void {
    if (this.port.handleCustody(request)) return;
    const threadId = typeof request.params.threadId === "string" ? request.params.threadId : "";
    if (!threadId) return;
    const coordinator = this.database.query("SELECT * FROM campaign_coordinators WHERE thread_id = $thread LIMIT 1")
      .get({ $thread: threadId }) as CoordinatorRow | null;
    if (!coordinator) return;
    const requestId = `${threadId}:${String(request.id)}`;
    this.database.query(`
      INSERT OR REPLACE INTO codex_approvals(request_id, rpc_id_json, project_id, thread_id, turn_id, method, params_json, created_at)
      VALUES ($request, $rpc, $project, $thread, $turn, $method, $params, $now)
    `).run({
      $request: requestId,
      $rpc: JSON.stringify(request.id),
      $project: coordinator.project_id,
      $thread: threadId,
      $turn: typeof request.params.turnId === "string" ? request.params.turnId : "",
      $method: request.method,
      $params: JSON.stringify(request.params),
      $now: this.port.now(),
    });
    this.port.recordEvent(coordinator.project_id, "approval", requestId, "approval.requested", { method: request.method });
    this.port.notifyChanged();
  }

  async respond(projectId: string, args: Record<string, any>): Promise<Record<string, unknown>> {
    const requestId = typeof args.requestId === "string" ? args.requestId : "";
    const decision = typeof args.decision === "string" ? args.decision : "";
    if (!requestId || !["accept", "decline", "cancel"].includes(decision)) throw new Error("requestId and a valid decision are required");
    const approval = this.database.query("SELECT * FROM codex_approvals WHERE request_id = $id").get({ $id: requestId }) as ApprovalRow | null;
    if (!approval || approval.project_id !== projectId) throw new Error(`Unknown approval: ${requestId}`);
    if (!["item/commandExecution/requestApproval", "item/fileChange/requestApproval"].includes(approval.method)) {
      throw new Error(`Unsupported approval response for ${approval.method}`);
    }
    const rpcId = parseJson<string | number>(approval.rpc_id_json, approval.rpc_id_json);
    await this.codex.respond(rpcId, { decision });
    this.database.query("DELETE FROM codex_approvals WHERE request_id = $id").run({ $id: requestId });
    this.port.recordEvent(projectId, "approval", requestId, "approval.responded", { decision, method: approval.method });
    return { requestId, decision };
  }
}
