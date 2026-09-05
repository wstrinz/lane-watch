export interface CodexThreadSummary {
  id: string;
  name: string;
  cwd: string;
  model: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface CodexServerRequest {
  id: string | number;
  method: string;
  params: Record<string, unknown>;
}

export interface CodexNotification {
  method: string;
  params: Record<string, any>;
}

type PendingRequest = {
  resolve: (value: any) => void;
  reject: (error: Error) => void;
  timeout: ReturnType<typeof setTimeout>;
};

function text(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function iso(value: unknown): string {
  if (typeof value === "number" && Number.isFinite(value)) {
    const milliseconds = value > 10_000_000_000 ? value : value * 1000;
    return new Date(milliseconds).toISOString();
  }
  const candidate = text(value);
  if (!candidate) return "";
  const parsed = new Date(candidate);
  return Number.isNaN(parsed.valueOf()) ? candidate : parsed.toISOString();
}

function statusName(value: unknown): string {
  if (typeof value === "string") return value;
  if (value && typeof value === "object" && "type" in value) return text((value as any).type);
  return "unknown";
}

export function normalizeThread(value: Record<string, any>): CodexThreadSummary {
  return {
    id: text(value.id),
    name: text(value.name) || text(value.title) || "Untitled Codex task",
    cwd: text(value.cwd),
    model: text(value.model) || text(value.modelId),
    status: statusName(value.status),
    createdAt: iso(value.createdAt ?? value.created_at),
    updatedAt: iso(value.updatedAt ?? value.updated_at),
  };
}

/**
 * Minimal host-local App Server client. It deliberately uses the documented
 * stdio transport so the browser never receives a raw App Server endpoint.
 */
export class CodexAppServerClient {
  private process: any = null;
  private nextId = 1;
  private pending = new Map<string | number, PendingRequest>();
  private connecting: Promise<void> | null = null;
  private stderrTails = new WeakMap<object, string>();
  private notificationListeners = new Set<(notification: CodexNotification) => void>();
  private serverRequestListeners = new Set<(request: CodexServerRequest) => void>();
  private errorListeners = new Set<(error: Error) => void>();

  onNotification(listener: (notification: CodexNotification) => void): () => void {
    this.notificationListeners.add(listener);
    return () => this.notificationListeners.delete(listener);
  }

  onServerRequest(listener: (request: CodexServerRequest) => void): () => void {
    this.serverRequestListeners.add(listener);
    return () => this.serverRequestListeners.delete(listener);
  }

  onError(listener: (error: Error) => void): () => void {
    this.errorListeners.add(listener);
    return () => this.errorListeners.delete(listener);
  }

  async connect(): Promise<void> {
    // The child exists before initialize completes. Concurrent callers must
    // await that handshake before sending any other protocol request.
    if (this.connecting) return this.connecting;
    if (this.process) return;
    this.connecting = this.start();
    try {
      await this.connecting;
    } finally {
      this.connecting = null;
    }
  }

  private async start(): Promise<void> {
    const configured = process.env.OBSERVER_CODEX_BIN?.trim();
    let executable = configured ? (Bun.which(configured) ?? configured) : "";
    if (!executable && process.platform === "win32" && process.env.LOCALAPPDATA) {
      const desktopBinRoot = `${process.env.LOCALAPPDATA}\\OpenAI\\Codex\\bin`;
      const candidates: string[] = [];
      try {
        for await (const path of new Bun.Glob("*/codex.exe").scan({ cwd: desktopBinRoot, absolute: true })) candidates.push(path);
      } catch {
        // Fall through to PATH when the desktop bundle is not installed.
      }
      candidates.sort((left, right) => Bun.file(right).lastModified - Bun.file(left).lastModified);
      executable = candidates[0] || "";
    }
    executable ||= Bun.which("codex") ?? "codex";
    const child = Bun.spawn([executable, "app-server", "--listen", "stdio://"], {
      stdin: "pipe",
      stdout: "pipe",
      stderr: "pipe",
      windowsHide: true,
      env: process.env,
    });
    this.process = child;
    void this.readStdout(child);
    void this.readStderr(child);
    void child.exited.then((code: number) => this.handleExit(child, code));
    try {
      await this.requestRaw("initialize", {
        clientInfo: {
          name: "lane_watch",
          title: "Lane Watch Campaign Control",
          version: "0.2.0",
        },
      }, 20_000);
      this.notify("initialized", {});
    } catch (error) {
      const diagnostic = this.stderrTails.get(child)?.trim();
      child.kill();
      if (this.process === child) this.process = null;
      throw new Error(`${error instanceof Error ? error.message : String(error)} (executable: ${executable}; child PID: ${child.pid})${diagnostic ? `; stderr: ${diagnostic}` : "; no stderr received"}`);
    }
  }

  private async readStdout(child: any): Promise<void> {
    const reader = child.stdout.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        while (true) {
          const newline = buffer.indexOf("\n");
          if (newline < 0) break;
          const line = buffer.slice(0, newline).trim();
          buffer = buffer.slice(newline + 1);
          if (line) this.handleLine(line);
        }
      }
      const finalLine = `${buffer}${decoder.decode()}`.trim();
      if (finalLine) this.handleLine(finalLine);
    } catch (error) {
      this.emitError(error instanceof Error ? error : new Error(String(error)));
    } finally {
      reader.releaseLock();
    }
  }

  private async readStderr(child: any): Promise<void> {
    const reader = child.stderr.getReader();
    const decoder = new TextDecoder();
    try {
      while (true) {
        const {done, value} = await reader.read();
        const chunk = done ? decoder.decode() : decoder.decode(value, {stream:true});
        this.stderrTails.set(child, ((this.stderrTails.get(child) || "") + chunk).slice(-2000));
        if (done) break;
      }
      const output = this.stderrTails.get(child)?.trim();
      if (output && this.process === child) this.emitError(new Error(`Codex App Server: ${output}`));
    } catch {
      // Preserve the bounded diagnostic tail even if the stream fails.
    } finally {
      reader.releaseLock();
    }
  }

  private handleLine(line: string): void {
    let message: Record<string, any>;
    try {
      message = JSON.parse(line);
    } catch {
      this.emitError(new Error(`Codex App Server emitted invalid JSON: ${line.slice(0, 500)}`));
      return;
    }
    if (message.id !== undefined && ("result" in message || "error" in message)) {
      const pending = this.pending.get(message.id);
      if (!pending) return;
      clearTimeout(pending.timeout);
      this.pending.delete(message.id);
      if (message.error) pending.reject(new Error(text(message.error.message) || JSON.stringify(message.error)));
      else pending.resolve(message.result);
      return;
    }
    if (message.id !== undefined && text(message.method)) {
      const request: CodexServerRequest = {
        id: message.id,
        method: message.method,
        params: message.params ?? {},
      };
      for (const listener of this.serverRequestListeners) listener(request);
      return;
    }
    if (text(message.method)) {
      const notification: CodexNotification = { method: message.method, params: message.params ?? {} };
      for (const listener of this.notificationListeners) listener(notification);
    }
  }

  private handleExit(child: any, code: number): void {
    if (this.process !== child) return;
    this.process = null;
    const error = new Error(`Codex App Server exited with code ${code}`);
    for (const pending of this.pending.values()) {
      clearTimeout(pending.timeout);
      pending.reject(error);
    }
    this.pending.clear();
    if (code !== 0) this.emitError(error);
  }

  private emitError(error: Error): void {
    for (const listener of this.errorListeners) listener(error);
  }

  private write(message: unknown): void {
    if (!this.process) throw new Error("Codex App Server is not connected");
    this.process.stdin.write(`${JSON.stringify(message)}\n`);
    this.process.stdin.flush();
  }

  private requestRaw(method: string, params: Record<string, unknown>, timeoutMs = 15_000): Promise<any> {
    const id = this.nextId++;
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.pending.delete(id);
        reject(new Error(`Codex App Server request timed out: ${method}`));
      }, timeoutMs);
      this.pending.set(id, { resolve, reject, timeout });
      try {
        this.write({ method, id, params });
      } catch (error) {
        clearTimeout(timeout);
        this.pending.delete(id);
        reject(error);
      }
    });
  }

  private notify(method: string, params: Record<string, unknown>): void {
    this.write({ method, params });
  }

  async request(method: string, params: Record<string, unknown> = {}, timeoutMs = 15_000): Promise<any> {
    await this.connect();
    return this.requestRaw(method, params, timeoutMs);
  }

  async listThreads(cwd?: string): Promise<CodexThreadSummary[]> {
    const params: Record<string, unknown> = { limit: 50, archived: false };
    if (cwd) params.cwd = cwd;
    const result = await this.request("thread/list", params, 20_000);
    const rows = Array.isArray(result?.data) ? result.data : [];
    return rows.map(normalizeThread).filter((thread: CodexThreadSummary) => thread.id);
  }

  async readThread(threadId: string): Promise<CodexThreadSummary> {
    const result = await this.request("thread/read", { threadId, includeTurns: false }, 20_000);
    if (!result?.thread?.id) throw new Error(`Codex task not found: ${threadId}`);
    return normalizeThread(result.thread);
  }

  async readThreadDetail(threadId: string): Promise<Record<string, any>> {
    const result = await this.request("thread/read", { threadId, includeTurns: true }, 30_000);
    if (!result?.thread?.id) throw new Error(`Codex task not found: ${threadId}`);
    return result.thread;
  }

  async startThread(params: Record<string, unknown>): Promise<CodexThreadSummary> {
    const result = await this.request("thread/start", params, 30_000);
    if (!result?.thread?.id) throw new Error("Codex coordinator task could not be created");
    return normalizeThread(result.thread);
  }

  async resumeThread(threadId: string): Promise<void> {
    await this.request("thread/resume", { threadId }, 20_000);
  }

  async forkThread(threadId: string): Promise<CodexThreadSummary> {
    const result = await this.request("thread/fork", { threadId }, 30_000);
    if (!result?.thread?.id) throw new Error(`Codex task could not be forked: ${threadId}`);
    return normalizeThread(result.thread);
  }

  async startTurn(params: Record<string, unknown>): Promise<Record<string, any>> {
    const result = await this.request("turn/start", params, 30_000);
    return result?.turn ?? {};
  }

  async steerTurn(threadId: string, expectedTurnId: string, text: string): Promise<void> {
    await this.request("turn/steer", {
      threadId,
      expectedTurnId,
      input: [{ type: "text", text }],
    }, 30_000);
  }

  async interruptTurn(threadId: string, turnId: string): Promise<void> {
    await this.request("turn/interrupt", { threadId, turnId });
  }

  async respond(requestId: string | number, result: unknown): Promise<void> {
    await this.connect();
    this.write({ id: requestId, result });
  }

  stop(): void {
    const child = this.process;
    this.process = null;
    if (child) child.kill();
  }
}
