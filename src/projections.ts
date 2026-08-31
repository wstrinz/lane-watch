import type { LaneSnapshot, ObserverSnapshot } from "./types";

export const CONTROL_PROJECTION_SCHEMA = "lane-watch-control-projection/v1";
export const OBSERVER_PROJECTION_SCHEMA = "lane-watch-observer-projection/v1";
export const WORKFLOW_HISTORY_PAGE_SCHEMA = "lane-watch-workflow-history-page/v1";
const WORKFLOW_HISTORY_PREVIEW_LIMIT = 24;

export interface CampaignIndexEntry {
  id: string;
  role: string;
  phase: string;
  version: number;
  updatedAt: string;
  automationMode: string;
  laneCounts: Record<string, number>;
  coordinator: { attached: boolean; name: string; status: string; lastEventAt: string };
  wave: { id: string; phase: string; accounting: Record<string, unknown> | null } | null;
  loop: { status: string } | null;
}

export interface CampaignControlProjection {
  projection: { schema: typeof CONTROL_PROJECTION_SCHEMA; scope: "index" | "project"; projectId: string; compact: true };
  projectIndex: CampaignIndexEntry[];
  projects: Array<Record<string, any>>;
}

export interface WorkflowHistoryPage {
  schema: typeof WORKFLOW_HISTORY_PAGE_SCHEMA;
  projectId: string;
  projectVersion: number;
  total: number;
  returned: number;
  nextCursor: string | null;
  items: Array<Record<string, any>>;
}

function text(value: unknown): string { return typeof value === "string" ? value : ""; }
function numberRecord(value: unknown): Record<string, number> {
  if (!value || typeof value !== "object") return {};
  return Object.fromEntries(Object.entries(value).filter(([, item]) => typeof item === "number")) as Record<string, number>;
}

export function campaignIndexEntry(project: Record<string, any>): CampaignIndexEntry {
  return {
    id: text(project.id),
    role: text(project.role),
    phase: text(project.phase),
    version: Number(project.version || 0),
    updatedAt: text(project.updatedAt),
    automationMode: text(project.automationMode),
    laneCounts: numberRecord(project.laneCounts),
    coordinator: {
      attached: Boolean(project.coordinator?.attached),
      name: text(project.coordinator?.name),
      status: text(project.coordinator?.status),
      lastEventAt: text(project.coordinator?.lastEventAt),
    },
    wave: project.wave ? {
      id: text(project.wave.id),
      phase: text(project.wave.phase),
      accounting: project.wave.accounting && typeof project.wave.accounting === "object" ? project.wave.accounting : null,
    } : null,
    loop: project.loop ? { status: text(project.loop.status) } : null,
  };
}

export function compactResearchRun(run: Record<string, any>): Record<string, any> {
  const { evidence: _evidence, ...summary } = run;
  const hasFullEvidence = run.evidence && typeof run.evidence === "object" && Object.keys(run.evidence).length;
  return {
    ...summary,
    evidenceSummary: run.evidenceSummary ?? (hasFullEvidence ? {
      schema: text(run.evidence.schema),
      status: text(run.evidence.status),
      verdict: text(run.evidence.verdict),
      summary: text(run.evidence.summary),
    } : null),
    evidenceDetailAvailable: run.evidenceDetailAvailable ?? Boolean(hasFullEvidence),
  };
}

export function compactCampaignProject(project: Record<string, any>): Record<string, any> {
  const workflowHistory = Array.isArray(project.workflowHistory) ? project.workflowHistory : [];
  const preview = workflowHistory.slice(-WORKFLOW_HISTORY_PREVIEW_LIMIT);
  const upstreamHistory = project.workflowHistorySummary && typeof project.workflowHistorySummary === "object" ? project.workflowHistorySummary : {};
  return {
    ...project,
    researchRuns: Array.isArray(project.researchRuns) ? project.researchRuns.map(compactResearchRun) : [],
    workflowHistory: preview,
    workflowHistorySummary: {
      total: Number(upstreamHistory.total ?? workflowHistory.length),
      returned: preview.length,
      detailAvailable: Number(upstreamHistory.total ?? workflowHistory.length) > preview.length,
      newestAt: text(upstreamHistory.newestAt ?? workflowHistory.at(-1)?.createdAt),
    },
  };
}

export function projectCampaignProjection(snapshot: Record<string, any>, projectId = "", indexSnapshot: Record<string, any> = snapshot): CampaignControlProjection {
  const projects = Array.isArray(snapshot.projects) ? snapshot.projects : [];
  const indexProjects = Array.isArray(indexSnapshot.projects) ? indexSnapshot.projects : projects;
  const selected = projectId ? projects.find((project: Record<string, any>) => project.id === projectId) : null;
  return {
    projection: { schema: CONTROL_PROJECTION_SCHEMA, scope: projectId ? "project" : "index", projectId, compact: true },
    projectIndex: indexProjects.map(campaignIndexEntry),
    projects: selected ? [compactCampaignProject(selected)] : [],
  };
}

export function compactLane(lane: LaneSnapshot): LaneSnapshot {
  return {
    ...lane,
    detail: lane.detail.length > 640 ? `${lane.detail.slice(0, 639)}…` : lane.detail,
    output: "",
    activities: [],
    timeline: [],
  };
}

export function projectObserverProjection(snapshot: ObserverSnapshot, projectId = ""): ObserverSnapshot & { projection: Record<string, unknown> } {
  const lanes = snapshot.lanes.filter((lane) => !projectId || lane.project === projectId).map(compactLane);
  return {
    ...snapshot,
    lanes,
    counts: {
      working: lanes.filter((lane) => lane.severity === "working").length,
      idle: lanes.filter((lane) => lane.severity === "idle").length,
      attention: lanes.filter((lane) => lane.severity === "attention" || lane.severity === "unknown").length,
      complete: lanes.filter((lane) => lane.severity === "complete").length,
      total: lanes.length,
    },
    sources: snapshot.sources.filter((source) => !projectId || source.project === projectId),
    projection: { schema: OBSERVER_PROJECTION_SCHEMA, scope: projectId ? "project" : "all", projectId, compact: true },
  };
}

export function researchRunDetail(snapshot: Record<string, any>, projectId: string, runId: string): Record<string, any> | null {
  const project = (Array.isArray(snapshot.projects) ? snapshot.projects : []).find((candidate: Record<string, any>) => candidate.id === projectId);
  return (Array.isArray(project?.researchRuns) ? project.researchRuns : []).find((run: Record<string, any>) => run.id === runId) || null;
}

export function workflowHistoryPage(snapshot: Record<string, any>, projectId: string, cursor = "", requestedLimit = 100): WorkflowHistoryPage | null {
  const project = (Array.isArray(snapshot.projects) ? snapshot.projects : []).find((candidate: Record<string, any>) => candidate.id === projectId);
  if (!project) return null;
  const history = Array.isArray(project.workflowHistory) ? project.workflowHistory : [];
  const parsedCursor = cursor === "" ? history.length : Number(cursor);
  const end = Number.isSafeInteger(parsedCursor) && parsedCursor >= 0 && parsedCursor <= history.length ? parsedCursor : history.length;
  const limit = Math.max(1, Math.min(500, Math.floor(Number(requestedLimit) || 100)));
  const start = Math.max(0, end - limit);
  const items = history.slice(start, end);
  return {
    schema: WORKFLOW_HISTORY_PAGE_SCHEMA,
    projectId,
    projectVersion: Number(project.version || 0),
    total: history.length,
    returned: items.length,
    nextCursor: start > 0 ? String(start) : null,
    items,
  };
}
