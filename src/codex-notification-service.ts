import { Database } from "bun:sqlite";
import { basename } from "node:path";
import type { CodexNotification } from "./codex";
import type { CoordinatorRow } from "./coordinator-session-service";

interface StrategyReviewRow {
  review_id: string;
  project_id: string;
  base_revision: number;
  thread_id: string;
  turn_id: string;
  response_json: string;
  review_kind: string;
  request_source: string;
  request_reference: string;
  resource_cap: number;
}

interface CoordinatorActivityItem {
  id: string;
  type: string;
  label: string;
  status: string;
  summary: string;
  details: Record<string, string | number | boolean | string[]>;
}

export interface CoordinatorLiveTurn {
  projectId: string;
  threadId: string;
  turnId: string;
  status: string;
  active: boolean;
  startedAt: string;
  updatedAt: string;
  revision: number;
  narrative: string;
  reasoningSummary: string;
  plan: Array<{ step: string; status: string }>;
  items: CoordinatorActivityItem[];
}

interface CodexNotificationPort {
  handleCustody(notification: CodexNotification): boolean;
  touchProject(projectId: string, phase?: string): void;
  recordEvent(projectId: string, aggregateType: string, aggregateId: string, eventType: string, payload: unknown): void;
  recordStrategyWaveSnapshot(projectId: string, waveId: string): void;
  notifyChanged(): void;
  notifyLive(activity: Record<string, unknown>): void;
  advanceAutopilot(projectId: string): void;
  startQueuedRedirect(projectId: string): void;
  now(): string;
}

function parseJson<T>(value: string, fallback: T): T {
  try { return JSON.parse(value) as T; } catch { return fallback; }
}

function agentText(item: Record<string, any>): string {
  if (typeof item.text === "string") return item.text;
  if (typeof item.message === "string") return item.message;
  if (Array.isArray(item.content)) {
    return item.content.map((part: any) => typeof part === "string" ? part : typeof part?.text === "string" ? part.text : "").filter(Boolean).join("\n");
  }
  return "";
}

function codexStatus(value: unknown): string {
  if (typeof value === "string") return value;
  if (value && typeof value === "object" && typeof (value as any).type === "string") return (value as any).type;
  return "unknown";
}

function boundedText(value: unknown, limit = 2_000): string {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

function readableSummary(value: unknown): string {
  if (typeof value === "string") return value;
  if (!Array.isArray(value)) return "";
  return value.map((part) => typeof part === "string" ? part : typeof part?.text === "string" ? part.text : "").filter(Boolean).join("\n");
}

function compactPath(value: unknown): string {
  if (typeof value !== "string" || !value) return "";
  const parts = value.replaceAll("\\", "/").split("/").filter(Boolean);
  return parts.slice(-3).join("/").slice(0, 300);
}

function safeExecutable(value: unknown): string {
  const command = Array.isArray(value) ? String(value[0] ?? "") : typeof value === "string" ? value.trim().split(/\s+/)[0] : "";
  const executable = basename(command.replace(/^['"]|['"]$/g, "")).toLowerCase().replace(/\.exe$/, "");
  const allowed = new Map([
    ["git", "Git"], ["bun", "Bun"], ["node", "Node"], ["npm", "npm"], ["npx", "npx"],
    ["pwsh", "PowerShell"], ["powershell", "PowerShell"], ["python", "Python"], ["python3", "Python"],
    ["cargo", "Cargo"], ["rg", "ripgrep"], ["ssh", "SSH"], ["claude", "Claude CLI"], ["codex", "Codex CLI"],
  ]);
  return allowed.get(executable) ?? "local command";
}

function sanitizeCoordinatorItem(item: Record<string, any>, fallbackStatus = "completed"): CoordinatorActivityItem | null {
  const type = typeof item?.type === "string" ? item.type : "unknown";
  const id = typeof item?.id === "string" ? item.id : crypto.randomUUID();
  const status = codexStatus(item?.status ?? fallbackStatus);
  if (type === "userMessage" || type === "agentMessage") return null;
  if (type === "reasoning") {
    const summary = readableSummary(item.summary).slice(0, 4_000);
    return summary ? { id, type, label: "Reasoning summary", status, summary, details: {} } : null;
  }
  if (type === "plan") return { id, type, label: "Plan update", status, summary: boundedText(item.text, 4_000), details: {} };
  if (type === "commandExecution") {
    return {
      id, type, label: `Run ${safeExecutable(item.command)}`, status, summary: "",
      details: {
        ...(item.cwd ? { location: compactPath(item.cwd) } : {}),
        ...(Number.isFinite(item.exitCode) ? { exitCode: item.exitCode } : {}),
        ...(Number.isFinite(item.durationMs) ? { durationMs: item.durationMs } : {}),
        ...(Array.isArray(item.commandActions) ? { actions: item.commandActions.map((action: any) => boundedText(action?.type ?? action, 80)).filter(Boolean).slice(0, 12) } : {}),
      },
    };
  }
  if (type === "fileChange") {
    const changes = Array.isArray(item.changes) ? item.changes : [];
    return { id, type, label: changes.length === 1 ? "Update one file" : `Update ${changes.length} files`, status, summary: "", details: { files: changes.map((change: any) => `${boundedText(change?.kind, 40) || "change"}: ${compactPath(change?.path)}`).slice(0, 30) } };
  }
  if (type === "mcpToolCall") {
    const argumentKeys = item.arguments && typeof item.arguments === "object" && !Array.isArray(item.arguments) ? Object.keys(item.arguments).slice(0, 20) : [];
    return { id, type, label: boundedText(item.appContext?.appName, 80) || `${boundedText(item.server, 80) || "MCP"} · ${boundedText(item.tool, 100) || "tool"}`, status, summary: boundedText(item.error?.message ?? item.error, 500), details: { ...(argumentKeys.length ? { inputs: argumentKeys } : {}), ...(item.appContext?.actionName ? { action: boundedText(item.appContext.actionName, 100) } : {}) } };
  }
  if (type === "dynamicToolCall") {
    const argumentKeys = item.arguments && typeof item.arguments === "object" && !Array.isArray(item.arguments) ? Object.keys(item.arguments).slice(0, 20) : [];
    return { id, type, label: boundedText(item.tool, 100) || "Dynamic tool", status, summary: "", details: { ...(argumentKeys.length ? { inputs: argumentKeys } : {}), ...(Number.isFinite(item.durationMs) ? { durationMs: item.durationMs } : {}) } };
  }
  if (type === "collabToolCall") return { id, type, label: boundedText(item.tool, 100) || "Agent coordination", status, summary: boundedText(item.agentStatus, 300), details: { ...(item.newThreadId ? { childTask: boundedText(item.newThreadId, 120) } : {}), ...(item.receiverThreadId ? { targetTask: boundedText(item.receiverThreadId, 120) } : {}) } };
  if (type === "webSearch") return { id, type, label: "Web research", status, summary: boundedText(item.query, 500), details: { ...(item.action?.type ? { action: boundedText(item.action.type, 80) } : {}) } };
  if (type === "imageView") return { id, type, label: "Inspect image", status, summary: compactPath(item.path), details: {} };
  if (type === "contextCompaction") return { id, type, label: "Compact session context", status, summary: "", details: {} };
  if (type === "enteredReviewMode" || type === "exitedReviewMode") return { id, type, label: type === "enteredReviewMode" ? "Enter review mode" : "Complete review", status, summary: boundedText(item.review, 1_000), details: {} };
  return { id, type, label: type.replace(/([a-z])([A-Z])/g, "$1 $2"), status, summary: "", details: {} };
}

export function sanitizeCoordinatorConversation(projectId: string, coordinator: CoordinatorRow, thread: Record<string, any>): Record<string, unknown> {
  const rawTurns = Array.isArray(thread.turns) ? thread.turns.slice(-40) : [];
  const turns = rawTurns.map((turn: Record<string, any>) => {
    const turnId = typeof turn?.id === "string" ? turn.id : "";
    const status = codexStatus(turn?.status);
    const messages = (Array.isArray(turn?.items) ? turn.items : []).flatMap((item: Record<string, any>, index: number) => {
      const role = item?.type === "userMessage" ? "user" : item?.type === "agentMessage" ? "assistant" : "";
      if (!role) return [];
      const message = agentText(item).trim().slice(0, 20_000);
      return message ? [{ id: typeof item.id === "string" ? item.id : `${turnId}:${index}`, turnId, role, text: message, turnStatus: status }] : [];
    });
    const activities = (Array.isArray(turn?.items) ? turn.items : []).map((item: Record<string, any>) => sanitizeCoordinatorItem(item, status)).filter((item: CoordinatorActivityItem | null): item is CoordinatorActivityItem => Boolean(item));
    const errorValue = typeof turn?.error === "string" ? turn.error : typeof turn?.error?.message === "string" ? turn.error.message : "";
    return { id: turnId, status, error: errorValue.slice(0, 2_000), messages, activities };
  });
  return {
    projectId,
    thread: { id: coordinator.thread_id, sourceThreadId: coordinator.source_thread_id || coordinator.thread_id, name: coordinator.thread_name, status: codexStatus(thread.status ?? coordinator.status), model: coordinator.model, effort: coordinator.effort },
    turns,
    messages: turns.flatMap((turn: any) => turn.messages).slice(-100),
    readAt: new Date().toISOString(),
  };
}

/** Reconciles App Server notifications into live coordinator state and durable semantic turn outcomes. */
export class CodexNotificationService {
  private readonly liveTurns = new Map<string, CoordinatorLiveTurn>();

  constructor(private readonly database: Database, private readonly port: CodexNotificationPort) {}

  liveTurn(projectId: string): CoordinatorLiveTurn | null {
    return this.liveTurns.get(projectId) ?? null;
  }

  handle(notification: CodexNotification): void {
    if (this.port.handleCustody(notification)) return;
    const params = notification.params ?? {};
    const turnId = params.turnId ?? params.turn?.id ?? "";
    const threadId = params.threadId ?? params.thread?.id ?? params.turn?.threadId ?? "";
    const strategyReview = threadId
      ? this.database.query("SELECT * FROM campaign_strategy_reviews WHERE thread_id = $thread AND status = 'drafting' ORDER BY created_at DESC LIMIT 1").get({ $thread: threadId }) as StrategyReviewRow | null
      : turnId ? this.database.query("SELECT * FROM campaign_strategy_reviews WHERE turn_id = $turn AND status = 'drafting' LIMIT 1").get({ $turn: turnId }) as StrategyReviewRow | null : null;
    if (strategyReview) return this.handleStrategyReview(strategyReview, notification, turnId);
    let coordinator = threadId ? this.database.query("SELECT * FROM campaign_coordinators WHERE thread_id = $thread LIMIT 1").get({ $thread: threadId }) as CoordinatorRow | null : null;
    if (!coordinator && turnId) coordinator = this.database.query("SELECT * FROM campaign_coordinators WHERE last_turn_id = $turn LIMIT 1").get({ $turn: turnId }) as CoordinatorRow | null;
    if (!coordinator) return;
    const stamp = this.port.now();
    this.updateLiveActivity(coordinator, notification, turnId, stamp);
    const durableChanged = this.reconcileCoordinatorNotification(coordinator, notification, turnId, stamp);
    if (durableChanged) {
      this.port.notifyChanged();
      this.port.advanceAutopilot(coordinator.project_id);
      this.port.startQueuedRedirect(coordinator.project_id);
    }
  }

  private updateLiveActivity(coordinator: CoordinatorRow, notification: CodexNotification, turnIdValue: string, stamp: string): void {
    const params = notification.params ?? {};
    const method = notification.method;
    const previous = this.liveTurns.get(coordinator.project_id);
    const turnId = turnIdValue || previous?.turnId || coordinator.last_turn_id;
    if (!turnId && method !== "thread/status/changed") return;
    const reset = method === "turn/started" || !previous || (turnId && previous.turnId !== turnId);
    const state: CoordinatorLiveTurn = reset ? {
      projectId: coordinator.project_id, threadId: coordinator.thread_id, turnId, status: "inProgress", active: true,
      startedAt: stamp, updatedAt: stamp, revision: (previous?.revision ?? 0) + 1, narrative: "", reasoningSummary: "", plan: [], items: [],
    } : { ...previous, revision: previous.revision + 1, updatedAt: stamp };
    const upsert = (item: CoordinatorActivityItem | null) => {
      if (!item) return;
      const index = state.items.findIndex((candidate) => candidate.id === item.id);
      if (index >= 0) state.items[index] = item;
      else state.items = [...state.items.slice(-79), item];
    };
    if (method === "turn/started") { state.status = "inProgress"; state.active = true; }
    else if (method === "turn/completed") { state.status = codexStatus(params.turn?.status ?? params.status ?? "completed"); state.active = false; }
    else if (method === "thread/status/changed") { const status = codexStatus(params.status); state.active = ["active", "working", "running", "inProgress"].includes(status); }
    else if (method === "turn/plan/updated") state.plan = (Array.isArray(params.plan) ? params.plan : []).flatMap((entry: any) => { const step = boundedText(entry?.step, 1_000); return step ? [{ step, status: codexStatus(entry?.status) }] : []; }).slice(0, 30);
    else if (method === "item/started" || method === "item/completed") {
      const item = params.item ?? {};
      upsert(sanitizeCoordinatorItem(item, method === "item/completed" ? "completed" : "inProgress"));
      if (item.type === "agentMessage") state.narrative = agentText(item).slice(-20_000);
      if (item.type === "reasoning") state.reasoningSummary = readableSummary(item.summary).slice(-12_000);
    } else if (method === "item/agentMessage/delta") state.narrative = `${state.narrative}${boundedText(params.delta ?? params.text, 8_000)}`.slice(-20_000);
    else if (method === "item/reasoning/summaryTextDelta") state.reasoningSummary = `${state.reasoningSummary}${boundedText(params.delta ?? params.text, 8_000)}`.slice(-12_000);
    else if (method === "item/commandExecution/outputDelta") {
      const itemId = boundedText(params.itemId, 200);
      const existing = state.items.find((candidate) => candidate.id === itemId);
      if (existing) upsert({ ...existing, status: "inProgress", details: { ...existing.details, outputBytes: Number(existing.details.outputBytes ?? 0) + String(params.delta ?? "").length } });
    } else if (method === "turn/diff/updated") upsert({ id: `${turnId}:diff`, type: "turnDiff", label: "Working tree diff updated", status: "inProgress", summary: "", details: {} });
    else if (method === "hook/started" || method === "hook/completed") upsert({ id: boundedText(params.run?.id, 200) || `${turnId}:hook`, type: "hook", label: boundedText(params.run?.name, 100) || "Lifecycle hook", status: method.endsWith("completed") ? "completed" : "inProgress", summary: boundedText(params.run?.summary, 500), details: {} });
    else if (method === "warning") upsert({ id: `${turnId}:warning:${state.revision}`, type: "warning", label: "Runtime warning", status: "attention", summary: boundedText(params.message, 1_000), details: {} });
    this.liveTurns.set(coordinator.project_id, state);
    const refreshHistory = (method === "item/completed" && params.item?.type === "agentMessage") || method === "turn/completed";
    this.port.notifyLive({ ...state, eventMethod: method, refreshHistory });
  }

  private reconcileCoordinatorNotification(coordinator: CoordinatorRow, notification: CodexNotification, turnId: string, stamp: string): boolean {
    const params = notification.params ?? {};
    if (notification.method === "turn/started") {
      this.database.query("UPDATE campaign_coordinators SET status = 'working', last_turn_id = $turn, last_event_at = $now WHERE project_id = $project").run({ $turn: turnId, $now: stamp, $project: coordinator.project_id });
      return true;
    }
    if (notification.method === "thread/status/changed") {
      const status = typeof params.status === "string" ? params.status : params.status?.type ?? "unknown";
      this.database.query("UPDATE campaign_coordinators SET status = $status, last_event_at = $now WHERE project_id = $project").run({ $status: status, $now: stamp, $project: coordinator.project_id });
      return true;
    }
    if (notification.method === "item/completed" && params.item?.type === "agentMessage") {
      const response = agentText(params.item);
      if (response && turnId) {
        for (const table of ["campaign_syntheses", "campaign_wave_triages", "campaign_research_plans", "campaign_redirect_inputs"]) {
          this.database.query(`UPDATE ${table} SET response_json = $response, updated_at = $now WHERE turn_id = $turn`).run({ $response: response, $now: stamp, $turn: turnId });
        }
      }
      return true;
    }
    if (notification.method !== "turn/completed") return false;
    const status = params.turn?.status ?? params.status ?? "completed";
    const synthesis = this.database.query("SELECT wave_id FROM campaign_syntheses WHERE turn_id = $turn LIMIT 1").get({ $turn: turnId }) as { wave_id: string } | null;
    const triage = this.database.query("SELECT wave_id FROM campaign_wave_triages WHERE turn_id = $turn LIMIT 1").get({ $turn: turnId }) as { wave_id: string } | null;
    const researchPlan = this.database.query("SELECT wave_id FROM campaign_research_plans WHERE turn_id = $turn LIMIT 1").get({ $turn: turnId }) as { wave_id: string } | null;
    const redirect = this.database.query("SELECT input_id FROM campaign_redirect_inputs WHERE turn_id = $turn LIMIT 1").get({ $turn: turnId }) as { input_id: string } | null;
    this.database.query("UPDATE campaign_coordinators SET status = 'idle', last_event_at = $now WHERE project_id = $project").run({ $now: stamp, $project: coordinator.project_id });
    if (synthesis) {
      const succeeded = status === "completed";
      this.database.query("UPDATE campaign_syntheses SET status = $status, updated_at = $now WHERE turn_id = $turn").run({ $status: succeeded ? "drafted" : status, $now: stamp, $turn: turnId });
      const phase = succeeded ? "DECISION_REQUIRED" : "BLOCKED";
      this.database.query("UPDATE campaign_waves SET phase = $phase, updated_at = $now WHERE wave_id = $wave").run({ $phase: phase, $now: stamp, $wave: synthesis.wave_id });
      this.port.touchProject(coordinator.project_id, phase);
      this.port.recordEvent(coordinator.project_id, "synthesis", synthesis.wave_id, "synthesis.turn.completed", { status, turnId });
      if (succeeded) this.port.recordStrategyWaveSnapshot(coordinator.project_id, synthesis.wave_id);
    } else if (triage) {
      const succeeded = status === "completed";
      this.database.query("UPDATE campaign_wave_triages SET status = $status, updated_at = $now WHERE turn_id = $turn").run({ $status: succeeded ? "drafted" : status, $now: stamp, $turn: turnId });
      this.port.recordEvent(coordinator.project_id, "wave-triage", triage.wave_id, "wave.triage.turn.completed", { status, turnId });
    } else if (researchPlan) {
      const succeeded = status === "completed";
      this.database.query("UPDATE campaign_research_plans SET status = $status, updated_at = $now WHERE turn_id = $turn").run({ $status: succeeded ? "drafted" : status, $now: stamp, $turn: turnId });
      if (!succeeded) this.database.query("UPDATE campaign_research_requests SET status = 'proposed', updated_at = $now WHERE project_id = $project AND wave_id = $wave AND status = 'in_review'").run({ $now: stamp, $project: coordinator.project_id, $wave: researchPlan.wave_id });
      this.port.touchProject(coordinator.project_id);
      this.port.recordEvent(coordinator.project_id, "research-plan", researchPlan.wave_id, "research.plan.turn.completed", { status, turnId });
    } else if (redirect) {
      const succeeded = status === "completed";
      this.database.query("UPDATE campaign_redirect_inputs SET status = $status, error = $error, updated_at = $now WHERE input_id = $id").run({ $id: redirect.input_id, $status: succeeded ? "drafted" : "failed", $error: succeeded ? "" : `Sol redirect turn ended ${status}`, $now: stamp });
      this.port.touchProject(coordinator.project_id);
      this.port.recordEvent(coordinator.project_id, "redirect", redirect.input_id, "campaign.redirect.turn.completed", { status, turnId });
    } else this.port.recordEvent(coordinator.project_id, "coordinator", coordinator.thread_id, "coordinator.turn.completed", { status, turnId });
    return true;
  }

  private handleStrategyReview(review: StrategyReviewRow, notification: CodexNotification, turnId: string): void {
    const params = notification.params ?? {};
    const stamp = this.port.now();
    if (notification.method === "item/completed" && params.item?.type === "agentMessage") {
      const response = agentText(params.item);
      if (response) this.database.query("UPDATE campaign_strategy_reviews SET response_json = $response, updated_at = $now WHERE review_id = $id").run({ $id: review.review_id, $response: response, $now: stamp });
      this.port.notifyChanged();
      return;
    }
    if (notification.method !== "turn/completed") return;
    const status = params.turn?.status ?? params.status ?? "completed";
    const response = parseJson<Record<string, any>>((this.database.query("SELECT response_json FROM campaign_strategy_reviews WHERE review_id = $id").get({ $id: review.review_id }) as { response_json: string } | null)?.response_json || "{}", {});
    const complete = status === "completed" && Boolean(response.summary && response.proposal && response.recommendation);
    const nextStatus = complete ? "drafted" : "failed";
    const error = complete ? "" : status === "completed" ? "Independent strategist returned an incomplete structured proposal" : `Strategy review turn ended ${status}`;
    this.database.query("UPDATE campaign_strategy_reviews SET status = $status, error = $error, updated_at = $now, completed_at = $now WHERE review_id = $id").run({ $id: review.review_id, $status: nextStatus, $error: error, $now: stamp });
    this.port.touchProject(review.project_id);
    this.port.recordEvent(review.project_id, "strategy-review", review.review_id, "strategy.review.turn.completed", {
      status: nextStatus, turnId, baseRevision: review.base_revision, recommendation: response.recommendation || "",
      reviewKind: review.review_kind || "legacy-undifferentiated", requestSource: review.request_source || "legacy-undifferentiated",
      requestReference: review.request_reference || "", resourceCap: review.resource_cap || 0, schedulerAuthority: "none",
    });
    this.port.notifyChanged();
  }
}
