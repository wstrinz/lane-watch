import { get, writable } from "svelte/store";
import type { ObserverSnapshot } from "../types";

export type CampaignControlSnapshot = {
  projects?: Array<Record<string, any>>;
  projectIndex?: Array<Record<string, any>>;
  projection?: { schema?: string; scope?: string; projectId?: string; compact?: boolean };
};
export type ConnectionState = "connecting" | "live" | "reconnecting" | "refreshing" | "offline";
export type AccessSnapshot = { identity: string; role: "viewer" | "operator" | "admin"; projects: string[]; mutableProjects: string[]; canMutate: boolean; source: string; pushPublicKey?: string };

export type CampaignState = {
  control: CampaignControlSnapshot | null;
  observer: ObserverSnapshot | null;
  selectedProject: string;
  connection: ConnectionState;
  connectionLabel: string;
  lastError: string;
  coordinatorActivity: Record<string, any> | null;
  access: AccessSnapshot | null;
};

export function projectFromLocation(): string {
  if (typeof location === "undefined") return "";
  try {
    return decodeURIComponent(location.pathname.match(/^\/projects\/([^/]+)/)?.[1] || "");
  } catch {
    return "";
  }
}

export const campaignState = writable<CampaignState>({
  control: null,
  observer: null,
  selectedProject: projectFromLocation(),
  connection: "connecting",
  connectionLabel: "Connecting",
  lastError: "",
  coordinatorActivity: null,
  access: null,
});

function update(patch: Partial<CampaignState>): void {
  campaignState.update((state) => ({ ...state, ...patch }));
}

export function applyCampaignControl(control: CampaignControlSnapshot, selectedProject?: string): void {
  campaignState.update((state) => ({
    ...state,
    control,
    selectedProject: selectedProject ?? state.selectedProject ?? projectFromLocation(),
  }));
}

export function applyObserverSnapshot(observer: ObserverSnapshot): void {
  update({ observer, connection: "live", connectionLabel: "Live", lastError: "" });
}

export function selectProject(projectId: string, replace = false): void {
  const path = projectId ? `/projects/${encodeURIComponent(projectId)}` : "/";
  history[replace ? "replaceState" : "pushState"](null, "", path);
  update({ selectedProject: projectId });
}

function scopedUrl(path: string, projectId = get(campaignState).selectedProject): string {
  const url = new URL(path, location.origin);
  url.searchParams.set("view", "compact");
  if (projectId) url.searchParams.set("project", projectId);
  return `${url.pathname}${url.search}`;
}

export async function refreshCampaignControl(projectId = get(campaignState).selectedProject): Promise<CampaignControlSnapshot> {
  const response = await fetch(scopedUrl("/api/control", projectId), { cache: "no-store" });
  if (!response.ok) throw new Error(`Could not refresh campaign state: ${response.status}`);
  const control = await response.json() as CampaignControlSnapshot;
  applyCampaignControl(control);
  return control;
}

export async function refreshObserverSnapshot(projectId = get(campaignState).selectedProject): Promise<ObserverSnapshot> {
  const response = await fetch(scopedUrl("/api/snapshot", projectId), { cache: "no-store" });
  if (!response.ok) throw new Error(`Could not refresh lane state: ${response.status}`);
  const observer = await response.json() as ObserverSnapshot;
  applyObserverSnapshot(observer);
  return observer;
}

export async function refreshAccess(projectId = get(campaignState).selectedProject): Promise<AccessSnapshot> {
  const url = new URL("/api/me", location.origin);
  if (projectId) url.searchParams.set("project", projectId);
  const response = await fetch(`${url.pathname}${url.search}`, { cache: "no-store" });
  if (!response.ok) throw new Error(`Could not load access scope: ${response.status}`);
  const access = await response.json() as AccessSnapshot;
  update({ access });
  return access;
}

export async function refreshAll(): Promise<void> {
  update({ connection: "refreshing", connectionLabel: "Refreshing", lastError: "" });
  try {
    const projectId = get(campaignState).selectedProject;
    const response = await fetch(scopedUrl("/api/refresh", projectId), { method: "POST" });
    if (!response.ok) throw new Error(`Refresh failed: ${response.status}`);
    applyObserverSnapshot(await response.json() as ObserverSnapshot);
    await refreshCampaignControl(projectId);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    update({ connection: "offline", connectionLabel: "Refresh failed", lastError: message });
    throw error;
  }
}

function updateCoordinatorActivity(activity: Record<string, any>): void {
  campaignState.update((state) => {
    const projects = state.control?.projects?.map((project) => project.id === activity.projectId && project.coordinator?.attached
      ? { ...project, coordinator: { ...project.coordinator, live: activity } }
      : project);
    return {
      ...state,
      coordinatorActivity: activity,
      control: state.control && projects ? { ...state.control, projects } : state.control,
    };
  });
}

export function connectCampaignState(): () => void {
  let source: EventSource | null = null;
  let stopped = false;
  let connectedProject: string | null = null;
  let generation = 0;

  const connect = (projectId: string) => {
    if (stopped) return;
    const ownGeneration = ++generation;
    source?.close();
    update({ connection: "connecting", connectionLabel: "Connecting" });
    source = new EventSource(scopedUrl("/api/events", projectId));
    source.addEventListener("snapshot", (event) => {
      if (ownGeneration !== generation) return;
      try { applyObserverSnapshot(JSON.parse((event as MessageEvent).data)); }
      catch (error) { update({ lastError: error instanceof Error ? error.message : String(error) }); }
    });
    source.addEventListener("campaign", (event) => {
      if (ownGeneration !== generation) return;
      try { applyCampaignControl(JSON.parse((event as MessageEvent).data)); }
      catch (error) { update({ lastError: error instanceof Error ? error.message : String(error) }); }
    });
    source.addEventListener("coordinator", (event) => {
      if (ownGeneration !== generation) return;
      try { updateCoordinatorActivity(JSON.parse((event as MessageEvent).data)); }
      catch (error) { update({ lastError: error instanceof Error ? error.message : String(error) }); }
    });
    source.onerror = () => { if (ownGeneration === generation) update({ connection: "reconnecting", connectionLabel: "Reconnecting" }); };
  };

  const popstate = () => update({ selectedProject: projectFromLocation() });
  addEventListener("popstate", popstate);
  const unsubscribe = campaignState.subscribe((state) => {
    if (state.selectedProject === connectedProject) return;
    connectedProject = state.selectedProject;
    connect(state.selectedProject);
    void Promise.all([refreshObserverSnapshot(state.selectedProject), refreshCampaignControl(state.selectedProject), refreshAccess(state.selectedProject)]).catch((error) => {
      update({ connection: "offline", connectionLabel: "Offline", lastError: error instanceof Error ? error.message : String(error) });
    });
  });

  return () => {
    stopped = true;
    generation += 1;
    source?.close();
    unsubscribe();
    removeEventListener("popstate", popstate);
  };
}
