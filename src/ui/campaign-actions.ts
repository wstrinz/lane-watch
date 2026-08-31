import type { CampaignControlSnapshot } from "./campaign-state";

export interface CampaignAction {
  id: string;
  projectId?: string;
  type: string;
  targetId?: string;
  status: string;
  result?: Record<string, any>;
  error?: string;
  completedAt?: string;
}

export type CampaignProject = Record<string, any> & {
  id: string;
  version: number;
  phase: string;
  actions?: CampaignAction[];
};

export interface CampaignActionRequest {
  projectId: string;
  type: string;
  targetId?: string;
  args?: Record<string, unknown>;
  scope?: string;
  pollLimit?: number;
  pollIntervalMs?: number;
  staleRetries?: number;
}

export interface CampaignActionSettlement {
  action: CampaignAction;
  control: CampaignControlSnapshot;
  project: CampaignProject;
  staleRetries: number;
}

export interface CampaignActionDependencies {
  refresh?: () => Promise<CampaignControlSnapshot>;
  fetcher?: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
  wait?: (milliseconds: number) => Promise<void>;
  nonce?: () => string;
}

export type CampaignActionRuntime = {
  pending: Record<string, { projectId: string; type: string; targetId: string; startedAt: string }>;
};

let runtimeValue: CampaignActionRuntime = { pending: {} };
const runtimeSubscribers = new Set<(runtime: CampaignActionRuntime) => void>();
const projectQueues = new Map<string, Promise<void>>();
export const campaignActionRuntime = {
  subscribe(subscriber: (runtime: CampaignActionRuntime) => void): () => void {
    runtimeSubscribers.add(subscriber);
    subscriber(runtimeValue);
    return () => runtimeSubscribers.delete(subscriber);
  },
};

function publishRuntime(value: CampaignActionRuntime): void {
  runtimeValue = value;
  for (const subscriber of runtimeSubscribers) subscriber(runtimeValue);
}

const defaultWait = (milliseconds: number) => new Promise<void>((resolve) => setTimeout(resolve, milliseconds));
const defaultRefresh = async (): Promise<CampaignControlSnapshot> => {
  const { refreshCampaignControl } = await import("./campaign-state");
  return refreshCampaignControl();
};

export function campaignProjectFrom(control: CampaignControlSnapshot, projectId: string): CampaignProject | null {
  return (control.projects?.find((candidate) => candidate.id === projectId) as CampaignProject | undefined) || null;
}

export function isStaleVersionFailure(action: CampaignAction | null | undefined): boolean {
  return action?.status === "failed" && /^Stale project version:/i.test(action.error || "");
}

function runtimeKey(request: CampaignActionRequest, nonce: string): string {
  return `${request.projectId}:${request.type}:${nonce}`;
}

function idempotencyKey(request: CampaignActionRequest, projectId: string, scope: string, nonce: string, attempt: number): string {
  return [request.type.slice(0, 56), projectId.slice(0, 40), scope, nonce.slice(0, 36), String(attempt)].join(":");
}

function setPending(key: string, request: CampaignActionRequest): void {
  publishRuntime({
    pending: {
      ...runtimeValue.pending,
      [key]: {
        projectId: request.projectId,
        type: request.type,
        targetId: request.targetId || "",
        startedAt: new Date().toISOString(),
      },
    },
  });
}

function clearPending(key: string): void {
  const pending = { ...runtimeValue.pending };
  delete pending[key];
  publishRuntime({ pending });
}

async function executeCampaignAction(
  request: CampaignActionRequest,
  dependencies: CampaignActionDependencies = {},
): Promise<CampaignActionSettlement> {
  const refresh = dependencies.refresh || defaultRefresh;
  const fetcher = dependencies.fetcher || fetch;
  const wait = dependencies.wait || defaultWait;
  const nonce = (dependencies.nonce || (() => crypto.randomUUID()))();
  const key = runtimeKey(request, nonce);
  const retryLimit = Math.max(0, Math.min(3, request.staleRetries ?? 1));
  const pollLimit = Math.max(1, Math.min(240, request.pollLimit ?? 80));
  const pollIntervalMs = Math.max(25, Math.min(2_000, request.pollIntervalMs ?? 250));
  const scope = String(request.scope || "svelte").replace(/[^a-z0-9._-]+/gi, "-").slice(0, 32) || "svelte";
  setPending(key, request);
  try {
    let control = await refresh();
    let current = campaignProjectFrom(control, request.projectId);
    if (!current) throw new Error("The selected campaign is no longer available");
    let action: CampaignAction | null = null;
    let staleRetries = 0;
    for (let versionAttempt = 0; versionAttempt <= retryLimit; versionAttempt++) {
      const response = await fetcher("/api/actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: current.id,
          type: request.type,
          targetId: request.targetId || "",
          args: request.args || {},
          expectedVersion: current.version,
          idempotencyKey: idempotencyKey(request, current.id, scope, nonce, versionAttempt),
        }),
      });
      const queued = await response.json() as CampaignAction & { error?: string };
      if (!response.ok) throw new Error(queued.error || `Action failed: ${response.status}`);
      action = queued;
      for (let poll = 0; queued.id && poll < pollLimit && ["queued", "running"].includes(action?.status || ""); poll++) {
        await wait(pollIntervalMs);
        control = await refresh();
        current = campaignProjectFrom(control, request.projectId);
        if (!current) throw new Error("The campaign disappeared while its action was settling");
        action = current.actions?.find((candidate) => candidate.id === queued.id) || action;
      }
      if (!isStaleVersionFailure(action) || versionAttempt === retryLimit) break;
      staleRetries += 1;
      control = await refresh();
      current = campaignProjectFrom(control, request.projectId);
      if (!current) throw new Error("The campaign disappeared while its control version refreshed");
    }
    if (action?.status === "failed") throw new Error(action.error || `${request.type} failed`);
    if (action?.status !== "completed") throw new Error(`${request.type} did not settle before the control timeout`);
    control = await refresh();
    current = campaignProjectFrom(control, request.projectId);
    if (!current) throw new Error("The selected campaign disappeared after its action completed");
    return { action, control, project: current, staleRetries };
  } catch (error) {
    await refresh().catch(() => undefined);
    throw error;
  } finally {
    clearPending(key);
  }
}

export async function settleCampaignAction(
  request: CampaignActionRequest,
  dependencies: CampaignActionDependencies = {},
): Promise<CampaignActionSettlement> {
  const predecessor = projectQueues.get(request.projectId) || Promise.resolve();
  let release!: () => void;
  const hold = new Promise<void>((resolve) => { release = resolve; });
  const tail = predecessor.catch(() => undefined).then(() => hold);
  projectQueues.set(request.projectId, tail);
  await predecessor.catch(() => undefined);
  try {
    return await executeCampaignAction(request, dependencies);
  } finally {
    release();
    if (projectQueues.get(request.projectId) === tail) projectQueues.delete(request.projectId);
  }
}
