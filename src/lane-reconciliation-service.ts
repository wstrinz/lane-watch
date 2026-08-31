import { join, resolve, sep } from "node:path";
import type { LaneOwnership } from "./lane-ownership-service";
import type { LaneSnapshot, ObserverSnapshot } from "./types";
import { TERMINAL_DAEMONS } from "./wave";

interface ReconciliationProjectDefinition {
  root: string;
  localCoordinator: string;
}

interface LaneReconciliationPort {
  observer(): ObserverSnapshot | null;
  definition(projectId: string): ReconciliationProjectDefinition | null;
  ownership(projectId: string, lane: LaneSnapshot): LaneOwnership;
}

export interface LaneReconciliationProcessInput {
  coordinatorPath: string;
  projectRoot: string;
  taskId: string;
}

export interface LaneReconciliationProcessResult {
  exitCode: number;
  stdout: string;
  stderr: string;
}

export type LaneReconciliationExecutor = (
  input: LaneReconciliationProcessInput,
) => Promise<LaneReconciliationProcessResult>;

function within(root: string, candidate: string): boolean {
  const normalizedRoot = resolve(root);
  const normalizedCandidate = resolve(candidate);
  return normalizedCandidate === normalizedRoot || normalizedCandidate.startsWith(`${normalizedRoot}${sep}`);
}

async function windowsPowerShellExecutor(input: LaneReconciliationProcessInput): Promise<LaneReconciliationProcessResult> {
  const systemRoot = process.env.SystemRoot || "C:\\Windows";
  const candidates = [
    process.env.OBSERVER_PWSH_BIN,
    Bun.which("pwsh"),
    join(systemRoot, "System32", "WindowsPowerShell", "v1.0", "powershell.exe"),
    Bun.which("powershell"),
  ].filter((value): value is string => Boolean(value));
  let executable = "";
  for (const candidate of candidates) {
    if (await Bun.file(candidate).exists()) { executable = candidate; break; }
  }
  if (!executable) throw new Error("No supported PowerShell executable is available");
  const child = Bun.spawn([
    executable, "-NoProfile", "-File", input.coordinatorPath,
    "reconcile", "-TaskId", input.taskId,
  ], { stdout: "pipe", stderr: "pipe", cwd: input.projectRoot });
  const timeout = setTimeout(() => child.kill(), 5 * 60_000);
  try {
    const [stdout, stderr, exitCode] = await Promise.all([
      new Response(child.stdout).text(),
      new Response(child.stderr).text(),
      child.exited,
    ]);
    return { stdout, stderr, exitCode };
  } finally {
    clearTimeout(timeout);
  }
}

/** Owns the bounded Windows coordinator process for an already-owned terminal lane. */
export class LaneReconciliationService {
  constructor(
    private readonly port: LaneReconciliationPort,
    private readonly executeProcess: LaneReconciliationExecutor = windowsPowerShellExecutor,
  ) {}

  async reconcile(projectId: string, targetId: string): Promise<Record<string, unknown>> {
    const lane = this.port.observer()?.lanes.find((candidate) => candidate.id === targetId && candidate.project === projectId);
    if (!lane) throw new Error(`Unknown lane: ${targetId}`);
    const ownership = this.port.ownership(projectId, lane);
    if (!ownership.controlled) throw new Error(`Lane Watch does not own this lane: ${ownership.reason}`);
    if (lane.host !== "windows") throw new Error("Mac reconciliation is not implemented by the campaign coordinator yet");
    if (!TERMINAL_DAEMONS.has(lane.daemon)) throw new Error("Lane must be terminal before reconciliation");
    const definition = this.port.definition(projectId);
    if (!definition?.localCoordinator) throw new Error(`Project ${projectId} has no local coordinator`);
    const coordinatorPath = resolve(definition.root, definition.localCoordinator);
    if (!within(definition.root, coordinatorPath)) throw new Error("Local coordinator path escapes the project root");

    const result = await this.executeProcess({ coordinatorPath, projectRoot: definition.root, taskId: lane.task });
    if (result.exitCode !== 0) {
      throw new Error((result.stderr || result.stdout || `Reconciliation exited ${result.exitCode}`).trim());
    }
    return { laneId: lane.id, taskId: lane.task, output: result.stdout.trim().slice(-8000) };
  }
}
