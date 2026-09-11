import { existsSync, watch, type FSWatcher } from "node:fs";
import { readFile, readdir } from "node:fs/promises";
import { homedir } from "node:os";
import { basename, dirname, extname, join, resolve, sep } from "node:path";
import type {
  Activity,
  HostKind,
  LaneSeverity,
  LaneSnapshot,
  ObserverSnapshot,
  TimelineEntry,
} from "./types";

type JsonObject = Record<string, any>;

interface Source {
  project: string;
  host: HostKind;
  path: string;
  kind: "canonical" | "coordinator-checkout";
}

interface ProjectRoot {
  id: string;
  root: string;
}

const TERMINAL = new Set([
  "done",
  "stopped",
  "failed",
  "error",
  "crashed",
  "cancelled",
  "canceled",
  "complete",
  "completed",
]);

const FAILED = new Set(["failed", "error", "crashed", "cancelled", "canceled"]);

function text(value: unknown, fallback = ""): string {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function number(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function flagValue(state: JsonObject, flag: string): string {
  const flags = Array.isArray(state.respawnFlags) ? state.respawnFlags.map(String) : [];
  const index = flags.indexOf(flag);
  return index >= 0 ? text(flags[index + 1]) : "";
}

function within(root: string, candidate: string): boolean {
  const normalizedRoot = resolve(root).toLowerCase();
  const normalizedCandidate = resolve(candidate).toLowerCase();
  const prefix = normalizedRoot.endsWith(sep) ? normalizedRoot : `${normalizedRoot}${sep}`;
  return normalizedCandidate === normalizedRoot || normalizedCandidate.startsWith(prefix);
}

function iso(value: unknown): string {
  if (typeof value === "number" && Number.isFinite(value)) {
    return new Date(value).toISOString();
  }
  const candidate = text(value);
  if (!candidate) return "";
  const parsed = new Date(candidate);
  return Number.isNaN(parsed.valueOf()) ? candidate : parsed.toISOString();
}

function clip(value: unknown, max = 1200): string {
  const normalized = text(value)
    .replaceAll(homedir(), "%USERPROFILE%")
    .replace(/\s+/g, " ")
    .trim();
  return normalized.length > max ? `${normalized.slice(0, max - 1)}…` : normalized;
}

async function readJson(path: string): Promise<JsonObject | null> {
  try {
    return parseJsonText(await readFile(path, "utf8"));
  } catch {
    return null;
  }
}

export function parseJsonText(value: string): JsonObject {
  return JSON.parse(value.replace(/^\uFEFF/, ""));
}

async function readTimeline(path: string, count = 3): Promise<TimelineEntry[]> {
  try {
    const rows = (await readFile(path, "utf8"))
      .split(/\r?\n/)
      .filter(Boolean)
      .slice(-count);
    const parsed: TimelineEntry[] = [];
    for (const row of rows) {
      try {
        const item = parseJsonText(row);
        parsed.push({
          at: iso(item.at),
          state: text(item.state, "unknown"),
          detail: clip(item.detail, 500),
          text: clip(item.text, 1800),
        });
      } catch {
        // A timeline may be observed between append and flush; the next scan retries it.
      }
    }
    return parsed;
  } catch {
    return [];
  }
}

export function classifyLane(
  lifecycleInput: string,
  daemonInput: string,
  tempoInput: string,
  inFlight: number,
): { severity: LaneSeverity; reason: string; status: string } {
  const lifecycle = lifecycleInput.toLowerCase() || "active";
  const daemon = daemonInput.toLowerCase() || "unknown";
  const tempo = tempoInput.toLowerCase();

  if (lifecycle === "retired") {
    return { severity: "complete", reason: "", status: "Retired" };
  }
  if (lifecycle === "complete") {
    if (!TERMINAL.has(daemon) && daemon !== "unknown" && daemon !== "blocked") {
      return { severity: "attention", reason: "complete-but-live", status: "Complete, process still live" };
    }
    return { severity: "complete", reason: "", status: "Complete" };
  }
  if (daemon === "blocked") {
    return { severity: "attention", reason: "blocked-checkpoint", status: "Blocked" };
  }
  if (FAILED.has(daemon)) {
    return { severity: "attention", reason: `daemon-${daemon}`, status: daemon };
  }
  if (TERMINAL.has(daemon)) {
    return { severity: "attention", reason: "terminal-unrecorded", status: "Done, reconciliation pending" };
  }
  if (daemon === "expired" || daemon === "unknown") {
    return { severity: "unknown", reason: "orphaned-active", status: "Live state unavailable" };
  }
  if (inFlight > 0 || tempo === "active" || tempo === "busy") {
    return { severity: "working", reason: "", status: "Working" };
  }
  if (tempo === "idle") {
    return { severity: "idle", reason: "idle-active", status: "Idle" };
  }
  return { severity: "working", reason: "", status: "Active" };
}

export function normalizeRuntimeActivities(state: JsonObject | null): Activity[] {
  if (!state) return [];
  const fan = Array.isArray(state.fan) ? state.fan : state.inFlight?.fan;
  if (!Array.isArray(fan)) return [];
  return fan.slice(0, 12).map((item: JsonObject, index: number) => ({
    id: text(item.id, `activity-${index}`),
    kind: text(item.kind, "task"),
    label: clip(item.label, 280),
    startedAt: iso(item.startedAt),
  }));
}

async function readSubagentActivities(state: JsonObject | null): Promise<Activity[]> {
  const transcript = text(state?.linkScanPath);
  if (!transcript) return [];
  const sessionRoot = join(dirname(transcript), basename(transcript, extname(transcript)));
  const subagents = join(sessionRoot, "subagents");
  if (!existsSync(subagents)) return [];
  try {
    const entries = await readdir(subagents, { withFileTypes: true });
    const metaFiles = entries.filter((entry) => entry.isFile() && entry.name.endsWith(".meta.json")).slice(0, 24);
    const activities: Activity[] = [];
    for (const entry of metaFiles) {
      const meta = await readJson(join(subagents, entry.name));
      if (!meta) continue;
      activities.push({
        id: entry.name.replace(/^agent-/, "").replace(/\.meta\.json$/, ""),
        kind: "subagent",
        label: clip(meta.description, 280),
        agentType: text(meta.agentType, "unknown"),
        model: text(meta.model, "unknown"),
        status: TERMINAL.has(text(state?.state).toLowerCase()) ? "finished" : "observed",
        depth: Number.isFinite(Number(meta.spawnDepth)) ? Number(meta.spawnDepth) : undefined,
      });
    }
    return activities;
  } catch {
    return [];
  }
}

function normalizeTopology(task: JsonObject, state: JsonObject | null): import("./types").TopologySnapshot | null {
  if (!state && !text(task.profile)) return null;
  const reservations = Array.isArray(state?.reservations) ? state.reservations : [];
  const agents = Array.isArray(state?.agents) ? state.agents : [];
  const violations = Array.isArray(state?.violations) ? state.violations : [];
  return {
    profile: text(state?.profile, text(task.profile, "legacy")),
    compliance: text(state?.compliance, state ? "unknown" : "unobserved"),
    parentAgent: text(state?.parentAgent, text(task.parentAgent)),
    parentModel: text(state?.parentModel, text(task.model, "unknown")),
    childAgentType: text(state?.allowedAgentTypes?.[0], text(task.childAgentType)),
    childModel: text(state?.childModel, text(task.childModel)),
    exactCount: Number(state?.exactCount ?? task.fanout ?? 0) || 0,
    launchedCount: reservations.filter((item: JsonObject) => item.status === "launched").length,
    runningCount: agents.filter((item: JsonObject) => item.status === "running").length,
    violations: violations.length,
  };
}

export class AgentCollector {
  readonly manifestPath: string;
  readonly claudeHome: string;
  readonly macHost: string;
  private sources: Source[] = [];
  private projectRoots: ProjectRoot[] = [];
  private watchers: FSWatcher[] = [];
  private watching = false;
  private changeListener: (() => void) | null = null;
  private remoteStates = new Map<string, JsonObject>();
  private remotePolledAt = 0;

  constructor(options: { manifestPath?: string; claudeHome?: string; macHost?: string } = {}) {
    this.manifestPath = resolve(
      options.manifestPath ??
        process.env.OBSERVER_PROJECT_MANIFEST ??
        join(import.meta.dir, "..", "..", "..", "hub", "projects.json"),
    );
    this.claudeHome = resolve(
      options.claudeHome ?? process.env.OBSERVER_CLAUDE_HOME ?? join(homedir(), ".claude"),
    );
    this.macHost = options.macHost ?? process.env.OBSERVER_MAC_HOST ?? "macbook";
  }

  async initialize(): Promise<void> {
    await this.refreshSources();
  }

  private async refreshSources(): Promise<void> {
    const manifest = await readJson(this.manifestPath);
    if (!manifest || !Array.isArray(manifest.projects)) {
      throw new Error(`Cannot read project manifest: ${this.manifestPath}`);
    }
    const hubRoot = dirname(this.manifestPath);
    const sources: Source[] = [];
    const projectRoots: ProjectRoot[] = [];
    for (const project of manifest.projects) {
      const projectId = text(project.id);
      if (!projectId || !text(project.path)) continue;
      const root = resolve(hubRoot, text(project.path));
      projectRoots.push({ id: projectId, root });
      if (project.local_agent_coordinator) {
        sources.push({ project: projectId, host: "windows", path: join(root, "_worktrees", ".agent-runtime"), kind: "canonical" });
      }
      if (project.mac_agent_coordinator) {
        sources.push({ project: projectId, host: "macbook", path: join(root, "_worktrees", ".mac-agent-runtime"), kind: "canonical" });
      }
    }

    const knownProjects = new Set(projectRoots.map((project) => project.id));
    for (const owner of projectRoots) {
      const worktreesRoot = join(owner.root, "_worktrees");
      if (!existsSync(worktreesRoot)) continue;
      try {
        const entries = await readdir(worktreesRoot, { withFileTypes: true });
        for (const entry of entries) {
          if (!entry.isDirectory() || entry.name.startsWith(".")) continue;
          const checkout = join(worktreesRoot, entry.name);
          const identity = await readJson(join(checkout, "campaign.json"));
          const projectId = text(identity?.id ?? identity?.projectId);
          if (!projectId || !knownProjects.has(projectId)) continue;
          const runtime = join(checkout, "_worktrees", ".agent-runtime");
          if (existsSync(runtime)) {
            sources.push({ project: projectId, host: "windows", path: runtime, kind: "coordinator-checkout" });
          }
        }
      } catch {
        // A checkout may move while discovery runs; the next heartbeat retries it.
      }
    }

    const unique = new Map(sources.map((source) => [`${source.project}:${source.host}:${source.path.toLowerCase()}`, source]));
    const nextSources = [...unique.values()];
    const changed = JSON.stringify(nextSources) !== JSON.stringify(this.sources);
    this.projectRoots = projectRoots;
    this.sources = nextSources;
    if (changed && this.watching) this.rebuildWatchers();
  }

  onChange(listener: () => void): void {
    this.changeListener = listener;
  }

  startWatching(): void {
    this.watching = true;
    this.rebuildWatchers();
  }

  private rebuildWatchers(): void {
    for (const watcher of this.watchers) watcher.close();
    this.watchers = [];
    const paths = [this.manifestPath, join(this.claudeHome, "jobs"), ...this.sources.map((source) => source.path)];
    for (const path of paths) {
      if (!existsSync(path)) continue;
      try {
        const watcher = watch(path, { recursive: true }, () => this.changeListener?.());
        watcher.on("error", () => undefined);
        this.watchers.push(watcher);
      } catch {
        // The heartbeat scan remains authoritative where recursive watches are unavailable.
      }
    }
  }

  stopWatching(): void {
    for (const watcher of this.watchers) watcher.close();
    this.watchers = [];
    this.watching = false;
  }

  private projectForNativeState(state: JsonObject): ProjectRoot | null {
    const candidates = [text(state.worktreePath), text(state.cwd)].filter(Boolean);
    return this.projectRoots
      .filter((project) => candidates.some((candidate) => within(project.root, candidate)))
      .sort((left, right) => right.root.length - left.root.length)[0] ?? null;
  }

  private async collectNativeLanes(referencedJobs: Set<string>): Promise<LaneSnapshot[]> {
    const jobsRoot = join(this.claudeHome, "jobs");
    if (!existsSync(jobsRoot)) return [];
    const lanes: LaneSnapshot[] = [];
    let entries;
    try {
      entries = await readdir(jobsRoot, { withFileTypes: true });
    } catch {
      return [];
    }
    for (const entry of entries) {
      if (!entry.isDirectory() || !/^[0-9a-f]{8}$/.test(entry.name) || referencedJobs.has(entry.name)) continue;
      const jobRoot = join(jobsRoot, entry.name);
      const state = await readJson(join(jobRoot, "state.json"));
      if (!state || TERMINAL.has(text(state.state).toLowerCase())) continue;
      const updatedAt = iso(state.updatedAt ?? state.createdAt);
      const updatedMs = Date.parse(updatedAt);
      if (!Number.isFinite(updatedMs) || Date.now() - updatedMs > 72 * 60 * 60 * 1000) continue;
      const project = this.projectForNativeState(state);
      if (!project) continue;
      const runtimeActivities = normalizeRuntimeActivities(state);
      const inFlight = Number(state.inFlight?.tasks ?? runtimeActivities.length) || 0;
      const queued = Number(state.inFlight?.queued ?? 0) || 0;
      const daemon = text(state.state, "unknown").toLowerCase();
      const tempo = text(state.tempo, "unknown").toLowerCase();
      const classification = classifyLane("active", daemon, tempo, inFlight + queued);
      const timeline = await readTimeline(join(jobRoot, "timeline.jsonl"));
      const activities = [...await readSubagentActivities(state), ...runtimeActivities].slice(0, 24);
      const jobName = text(state.name, `native-${entry.name}`);
      const currentDetail = clip(state.detail, 720);
      lanes.push({
        id: `${project.id}:windows:native:${entry.name}`,
        project: project.id,
        host: "windows",
        task: jobName,
        lane: "UNREGISTERED",
        name: jobName,
        model: text(state.model, flagValue(state, "--model") || "unknown"),
        effort: text(state.effort, flagValue(state, "--effort") || "—"),
        laneKind: "native-unregistered",
        parentAgent: "",
        jobId: entry.name,
        sessionId: text(state.sessionId),
        lifecycle: "active",
        daemon,
        tempo,
        status: `${classification.status} · unregistered`,
        severity: classification.severity,
        attentionReason: "unregistered-native-job",
        detail: clip(`Observe only: this native Claude job has no campaign lane ledger.${currentDetail ? ` ${currentDetail}` : ""}`, 900),
        output: clip(state.output?.result, 2200),
        tokens: number(state.tokens),
        inFlight,
        queued,
        activities,
        topology: null,
        timeline,
        landing: "observe-only",
        branch: text(state.worktreeBranch),
        worktree: clip(state.worktreePath ?? state.cwd, 500),
        launchedAt: iso(state.createdAt),
        updatedAt,
        completedAt: "",
      });
    }
    return lanes;
  }

  private async pollMac(ids: string[], force = false): Promise<void> {
    const safeIds = [...new Set(ids.filter((id) => /^[0-9a-f]{8}$/.test(id)))];
    if (!safeIds.length || (!force && Date.now() - this.remotePolledAt < 15_000)) return;
    this.remotePolledAt = Date.now();
    const idsLiteral = JSON.stringify(safeIds);
    const python = [
      "import json,pathlib",
      `ids=${idsLiteral}`,
      "root=pathlib.Path.home()/'.claude'/'jobs'",
      "print(json.dumps({i:json.loads((root/i/'state.json').read_text()) for i in ids if (root/i/'state.json').is_file()}))",
    ].join(";");
    const encodedPython = Buffer.from(python, "utf8").toString("base64");
    const subprocess = Bun.spawn(
      [
        "ssh",
        "-o",
        "BatchMode=yes",
        "-o",
        "ConnectTimeout=5",
        this.macHost,
        `python3 -c "import base64;exec(base64.b64decode('${encodedPython}'))"`,
      ],
      { stdout: "pipe", stderr: "pipe" },
    );
    const timeout = setTimeout(() => subprocess.kill(), 8_000);
    try {
      const output = await new Response(subprocess.stdout).text();
      const exitCode = await subprocess.exited;
      if (exitCode !== 0) return;
      const parsed = JSON.parse(output) as Record<string, JsonObject>;
      for (const [id, state] of Object.entries(parsed)) this.remoteStates.set(id, state);
      this.changeListener?.();
    } catch {
      // Remote state is an enhancement; cached ledgers still render when the Mac is offline.
    } finally {
      clearTimeout(timeout);
    }
  }

  async collect(options: { forceRemote?: boolean } = {}): Promise<ObserverSnapshot> {
    await this.refreshSources();
    const ledgerRows: Array<{ source: Source; path: string; task: JsonObject }> = [];
    const remoteIds: string[] = [];

    for (const source of this.sources) {
      if (!existsSync(source.path)) continue;
      const entries = await readdir(source.path, { withFileTypes: true });
      for (const entry of entries) {
        if (!entry.isFile() || !entry.name.endsWith(".json")) continue;
        const path = join(source.path, entry.name);
        const task = await readJson(path);
        if (!task || !text(task.taskId)) continue;
        ledgerRows.push({ source, path, task });
        if (source.host === "macbook" && text(task.lifecycleStatus, "active") === "active") {
          remoteIds.push(text(task.latestJobId));
        }
      }
    }

    await this.pollMac(remoteIds, options.forceRemote ?? false);
    const lanes: LaneSnapshot[] = [];
    const referencedJobs = new Set(ledgerRows.map(({ task }) => text(task.latestJobId)).filter(Boolean));

    for (const { source, task } of ledgerRows) {
      const jobId = text(task.latestJobId);
      let state: JsonObject | null = null;
      let timeline: TimelineEntry[] = [];
      let subagentActivities: Activity[] = [];
      if (jobId && source.host === "windows") {
        const jobRoot = join(this.claudeHome, "jobs", jobId);
        state = await readJson(join(jobRoot, "state.json"));
        timeline = await readTimeline(join(jobRoot, "timeline.jsonl"));
        subagentActivities = await readSubagentActivities(state);
      } else if (jobId) {
        state = this.remoteStates.get(jobId) ?? null;
      }

      const lifecycle = text(task.lifecycleStatus, "active").toLowerCase();
      const registration = text(task.registrationStatus, "active").toLowerCase();
      const daemon = text(state?.state, text(task.terminalRemoteState, lifecycle === "complete" ? "done" : "unknown")).toLowerCase();
      const tempo = text(state?.tempo, "unknown").toLowerCase();
      const runtimeActivities = normalizeRuntimeActivities(state);
      const inFlight = Number(state?.inFlight?.tasks ?? runtimeActivities.length) || 0;
      const queued = Number(state?.inFlight?.queued ?? 0) || 0;
      const classification = classifyLane(registration === "retired" ? "retired" : lifecycle, daemon, tempo, inFlight + queued);
      const taskId = text(task.taskId);
      const landingRecord = await readJson(join(source.path, "landing-queue", `${taskId}.json`));
      const topologyRecord = source.host === "windows" && text(task.topologyState)
        ? await readJson(text(task.topologyState))
        : null;
      const launchedAt = iso(task.launchedAt ?? task.createdAt ?? task.history?.[0]?.launchedAt);
      const updatedAt = iso(state?.updatedAt ?? task.updatedAt ?? task.completedAt ?? launchedAt);
      const output = clip(state?.output?.result ?? task.completionResult, 2200);

      lanes.push({
        id: `${source.project}:${source.host}:${taskId}`,
        project: source.project,
        host: source.host,
        task: taskId,
        lane: text(task.laneId, "—"),
        name: text(task.sessionName ?? task.name, taskId),
        model: text(task.model, "unknown"),
        effort: text(task.effort, "—"),
        laneKind: text(task.laneKind, "research"),
        parentAgent: text(task.parentAgent),
        jobId,
        sessionId: text(task.latestSessionId ?? state?.sessionId),
        lifecycle,
        daemon,
        tempo,
        status: classification.status,
        severity: classification.severity,
        attentionReason: classification.reason,
        detail: clip(state?.detail, 900),
        output,
        tokens: number(state?.tokens),
        inFlight,
        queued,
        activities: [...subagentActivities, ...runtimeActivities].slice(0, 24),
        topology: normalizeTopology(task, topologyRecord),
        timeline,
        landing: text(landingRecord?.state, "—"),
        branch: text(task.branch),
        worktree: clip(task.worktree, 500),
        launchedAt,
        updatedAt,
        completedAt: iso(task.completedAt ?? state?.firstTerminalAt),
      });
    }

    lanes.push(...await this.collectNativeLanes(referencedJobs));

    lanes.sort((a, b) => {
      const order: Record<LaneSeverity, number> = { working: 0, idle: 1, attention: 2, unknown: 3, complete: 4 };
      return order[a.severity] - order[b.severity] || b.updatedAt.localeCompare(a.updatedAt);
    });

    return {
      generatedAt: new Date().toISOString(),
      version: 1,
      lanes,
      counts: {
        working: lanes.filter((lane) => lane.severity === "working").length,
        idle: lanes.filter((lane) => lane.severity === "idle").length,
        attention: lanes.filter((lane) => lane.severity === "attention" || lane.severity === "unknown").length,
        complete: lanes.filter((lane) => lane.severity === "complete").length,
        total: lanes.length,
      },
      sources: this.sources.map((source) => ({ ...source, available: existsSync(source.path) })),
    };
  }
}
