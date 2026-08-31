import { Database } from "bun:sqlite";
import { workflowProvenance, type WorkflowPhaseEventEvidence } from "./campaign-workflow-provenance";

export const CAMPAIGN_PHASES = [
  "PLANNING", "RUNNING", "RECONCILING", "SYNTHESIS_READY", "SYNTHESIZING",
  "RESEARCH_REVIEW", "RESEARCH_READY", "RESEARCH_RUNNING", "RESEARCH_INTAKE",
  "REVISING", "DECISION_REQUIRED", "NEXT_WAVE_READY", "BLOCKED",
] as const;

export type CampaignWorkflowPhase = typeof CAMPAIGN_PHASES[number];

interface CampaignProjectRow {
  project_id: string;
  role: string;
  root_path: string;
  automation_mode: string;
  dispatch_profile: string;
  current_phase: CampaignWorkflowPhase;
  version: number;
  updated_at: string;
}

interface CampaignActivityRow {
  project_id: string;
  observed_phase: string;
  active_count: number;
  running_count: number;
  terminal_count: number;
  summary_json: string;
  observed_at: string;
}

export interface CampaignStateChange {
  phase?: CampaignWorkflowPhase;
  automation?: string;
  dispatchProfile?: string;
}

export interface CampaignTransitionContext {
  authority: "observer" | "domain-command" | "coordinator-result" | "human-confirmed" | "system";
  cause: string;
  actor?: string;
}

export interface ObservedCampaignActivity {
  phase: string;
  active: number;
  running: number;
  terminal: number;
  summary?: Record<string, unknown>;
}

interface CampaignStatePort {
  activeExecutionCount(projectId: string): number;
  now(): string;
}

const TRANSITIONS: Record<CampaignWorkflowPhase, ReadonlySet<CampaignWorkflowPhase>> = {
  PLANNING: new Set(["PLANNING", "RUNNING", "RECONCILING", "SYNTHESIS_READY", "RESEARCH_REVIEW", "BLOCKED"]),
  RUNNING: new Set(["RUNNING", "RECONCILING", "SYNTHESIS_READY", "BLOCKED"]),
  RECONCILING: new Set(["RECONCILING", "RUNNING", "SYNTHESIS_READY", "BLOCKED"]),
  SYNTHESIS_READY: new Set(["SYNTHESIS_READY", "SYNTHESIZING", "BLOCKED"]),
  SYNTHESIZING: new Set(["SYNTHESIZING", "DECISION_REQUIRED", "BLOCKED"]),
  DECISION_REQUIRED: new Set(["DECISION_REQUIRED", "NEXT_WAVE_READY", "RESEARCH_REVIEW", "RESEARCH_READY", "REVISING", "BLOCKED"]),
  RESEARCH_REVIEW: new Set(["RESEARCH_REVIEW", "RESEARCH_READY", "REVISING", "BLOCKED"]),
  RESEARCH_READY: new Set(["RESEARCH_READY", "RESEARCH_RUNNING", "BLOCKED"]),
  RESEARCH_RUNNING: new Set(["RESEARCH_RUNNING", "RESEARCH_INTAKE", "BLOCKED"]),
  RESEARCH_INTAKE: new Set(["RESEARCH_INTAKE", "SYNTHESIZING", "BLOCKED"]),
  REVISING: new Set(["REVISING", "RESEARCH_REVIEW", "BLOCKED"]),
  NEXT_WAVE_READY: new Set(["NEXT_WAVE_READY", "PLANNING", "RUNNING", "RECONCILING", "SYNTHESIS_READY", "RESEARCH_REVIEW"]),
  BLOCKED: new Set(["BLOCKED", "SYNTHESIS_READY", "RESEARCH_REVIEW", "REVISING", "DECISION_REQUIRED", "NEXT_WAVE_READY"]),
};

const HUMAN_BOUNDARIES = new Set<CampaignWorkflowPhase>([
  "DECISION_REQUIRED", "RESEARCH_REVIEW", "RESEARCH_READY", "REVISING", "NEXT_WAVE_READY", "BLOCKED",
]);

function parseJson<T>(value: string | undefined, fallback: T): T {
  try { return JSON.parse(value || "") as T; } catch { return fallback; }
}

function isPhase(value: unknown): value is CampaignWorkflowPhase {
  return typeof value === "string" && (CAMPAIGN_PHASES as readonly string[]).includes(value);
}

/** Owns workflow transitions while keeping observer activity non-authoritative. */
export class CampaignStateService {
  constructor(private readonly database: Database, private readonly port: CampaignStatePort) {}

  project(projectId: string): CampaignProjectRow {
    const row = this.database.query("SELECT * FROM campaign_projects WHERE project_id = $id").get({ $id: projectId }) as CampaignProjectRow | null;
    if (!row) throw new Error(`Unknown project: ${projectId}`);
    return row;
  }

  change(projectId: string, changes: CampaignStateChange, context: CampaignTransitionContext): CampaignProjectRow {
    const settle = this.database.transaction(() => {
      const row = this.project(projectId);
      const phase = changes.phase ?? row.current_phase;
      if (!isPhase(phase)) throw new Error(`Unknown campaign workflow phase: ${String(phase)}`);
      if (phase !== row.current_phase && !TRANSITIONS[row.current_phase].has(phase)) {
        throw new Error(`Illegal campaign workflow transition: ${row.current_phase} -> ${phase} (${context.cause})`);
      }
      const stamp = this.port.now();
      this.database.query(`
        UPDATE campaign_projects
        SET current_phase = $phase, automation_mode = $automation, dispatch_profile = $dispatchProfile,
          version = version + 1, updated_at = $now
        WHERE project_id = $id
      `).run({
        $id: projectId,
        $phase: phase,
        $automation: changes.automation ?? row.automation_mode,
        $dispatchProfile: changes.dispatchProfile ?? row.dispatch_profile,
        $now: stamp,
      });
      if (phase !== row.current_phase) {
        this.insertEvent(projectId, "project", projectId, "project.phase.changed", {
          from: row.current_phase,
          to: phase,
          authority: context.authority,
          cause: context.cause,
          actor: context.actor || "",
        }, stamp);
      }
      return this.project(projectId);
    });
    return settle();
  }

  observeActivity(projectId: string, activity: ObservedCampaignActivity): void {
    this.database.transaction(() => {
      this.project(projectId);
      const previous = this.database.query("SELECT * FROM campaign_project_activity WHERE project_id = $project")
        .get({ $project: projectId }) as CampaignActivityRow | null;
      const stamp = this.port.now();
      const summary = JSON.stringify(activity.summary ?? {});
      this.database.query(`
        INSERT INTO campaign_project_activity(project_id, observed_phase, active_count, running_count, terminal_count, summary_json, observed_at)
        VALUES ($project, $phase, $active, $running, $terminal, $summary, $now)
        ON CONFLICT(project_id) DO UPDATE SET observed_phase = excluded.observed_phase,
          active_count = excluded.active_count, running_count = excluded.running_count,
          terminal_count = excluded.terminal_count, summary_json = excluded.summary_json,
          observed_at = excluded.observed_at
      `).run({
        $project: projectId,
        $phase: activity.phase,
        $active: Math.max(0, Math.floor(activity.active)),
        $running: Math.max(0, Math.floor(activity.running)),
        $terminal: Math.max(0, Math.floor(activity.terminal)),
        $summary: summary,
        $now: stamp,
      });
      if (previous && previous.observed_phase !== activity.phase) {
        this.insertEvent(projectId, "project-activity", projectId, "project.activity.changed", {
          from: previous.observed_phase,
          to: activity.phase,
          authority: "observer",
          workflowMutation: false,
        }, stamp);
      }
    })();
  }

  private insertEvent(
    projectId: string,
    aggregateType: string,
    aggregateId: string,
    eventType: string,
    payload: unknown,
    createdAt: string,
  ): void {
    this.database.query(`
      INSERT INTO campaign_events(event_id, project_id, aggregate_type, aggregate_id, event_type, payload_json, created_at)
      VALUES ($event, $project, $aggregateType, $aggregateId, $type, $payload, $createdAt)
    `).run({
      $event: crypto.randomUUID(),
      $project: projectId,
      $aggregateType: aggregateType,
      $aggregateId: aggregateId,
      $type: eventType,
      $payload: JSON.stringify(payload),
      $createdAt: createdAt,
    });
  }

  snapshot(projectId: string, wavePhase = ""): Record<string, unknown> {
    const project = this.project(projectId);
    const activity = this.database.query("SELECT * FROM campaign_project_activity WHERE project_id = $project")
      .get({ $project: projectId }) as CampaignActivityRow | null;
    const event = this.database.query(`
      SELECT event_id, payload_json, created_at FROM campaign_events
      WHERE project_id = $project AND event_type = 'project.phase.changed'
      ORDER BY created_at DESC LIMIT 1
    `).get({ $project: projectId }) as WorkflowPhaseEventEvidence | null;
    const recognizedWavePhase = isPhase(wavePhase) ? wavePhase : null;
    const activeExecution = this.port.activeExecutionCount(projectId);
    const divergent = Boolean(recognizedWavePhase && recognizedWavePhase !== project.current_phase);
    const recoveryRequired = Boolean(divergent && activeExecution === 0
      && (HUMAN_BOUNDARIES.has(project.current_phase) || HUMAN_BOUNDARIES.has(recognizedWavePhase!)));
    return {
      schema: "campaign-control-state/v1",
      workflow: workflowProvenance(project.current_phase, project.updated_at, event),
      observation: activity ? {
        phase: activity.observed_phase,
        active: activity.active_count,
        running: activity.running_count,
        terminal: activity.terminal_count,
        summary: parseJson(activity.summary_json, {}),
        observedAt: activity.observed_at,
        workflowMutation: false,
      } : { phase: "UNKNOWN", active: 0, running: 0, terminal: 0, summary: {}, observedAt: "", workflowMutation: false },
      recovery: {
        required: recoveryRequired,
        status: recoveryRequired ? "HUMAN_RECONCILIATION_REQUIRED" : divergent ? "DIVERGENCE_EXPLAINED_BY_ACTIVE_EXECUTION" : "ALIGNED",
        workflowPhase: project.current_phase,
        wavePhase: recognizedWavePhase || "",
        activeExecution,
        authority: recoveryRequired ? "human" : "none",
        automaticMutation: false,
        summary: recoveryRequired
          ? `The workflow is ${project.current_phase}, while the frozen wave is ${recognizedWavePhase}. No controlled execution is active, so an operator must inspect and reconcile the historical boundary.`
          : divergent
            ? `Workflow and wave phases differ while ${activeExecution} controlled execution or settlement record(s) remain active.`
            : "Workflow and frozen wave phases are aligned.",
      },
    };
  }
}
