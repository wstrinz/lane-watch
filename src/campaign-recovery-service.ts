import { Database } from "bun:sqlite";
import { planWaveProjectionRepair, projectWaveAggregate, waveAccounting } from "./wave";
import type { LaneSnapshot, ObserverSnapshot } from "./types";
import { WaveRepository } from "./wave-repository";

export type CampaignRecoveryDecision =
  | "PRESERVE_HOLD"
  | "ALIGN_WAVE_TO_WORKFLOW"
  | "ALIGN_WORKFLOW_TO_WAVE"
  | "APPLY_VALIDATED_PROJECTION_REPAIR";

interface RecoveryReportRow {
  report_id: string;
  project_id: string;
  wave_id: string;
  report_digest: string;
  status: string;
  report_json: string;
  prepared_by: string;
  decision: string;
  note: string;
  applied_by: string;
  created_at: string;
  updated_at: string;
  applied_at: string;
}

interface CampaignRecoveryPort {
  project(projectId: string): { project_id: string; current_phase: string; version: number; updated_at: string };
  controlState(projectId: string, wavePhase: string): Record<string, any>;
  observer(): ObserverSnapshot | null;
  transitionWorkflow(projectId: string, phase: string, actor: string): void;
  touchProject(projectId: string): void;
  recordEvent(projectId: string, aggregateType: string, aggregateId: string, eventType: string, payload: unknown): void;
  digest(value: unknown): string;
  now(): string;
}

const DECISIONS = new Set<CampaignRecoveryDecision>([
  "PRESERVE_HOLD",
  "ALIGN_WAVE_TO_WORKFLOW",
  "ALIGN_WORKFLOW_TO_WAVE",
  "APPLY_VALIDATED_PROJECTION_REPAIR",
]);

function parseJson<T>(value: string | undefined, fallback: T): T {
  try { return JSON.parse(value || "") as T; } catch { return fallback; }
}

function stableLane(lane: LaneSnapshot): Record<string, unknown> {
  return {
    id: lane.id, task: lane.task, host: lane.host, lifecycle: lane.lifecycle,
    daemon: lane.daemon, landing: lane.landing, jobId: lane.jobId,
    completedAt: lane.completedAt,
  };
}

/** Freezes and applies the narrow human-owned historical recovery protocol. */
export class CampaignRecoveryService {
  constructor(
    private readonly database: Database,
    private readonly waves: WaveRepository,
    private readonly port: CampaignRecoveryPort,
  ) {}

  prepare(projectId: string, actor: string): Record<string, unknown> {
    const snapshot = this.buildSnapshot(projectId);
    const recovery = (snapshot.controlState as Record<string, any>)?.recovery ?? {};
    if (!recovery.required) throw new Error("Campaign recovery preparation requires a current human-reconciliation boundary");
    if (Number(recovery.activeExecution || 0) !== 0) throw new Error("Controlled execution must be idle before recovery can be prepared");
    const reportId = crypto.randomUUID();
    const reportDigest = `sha256:${this.port.digest(snapshot)}`;
    const stamp = this.port.now();
    this.database.transaction(() => {
      this.database.query(`
        UPDATE campaign_recovery_reports SET status = 'superseded', updated_at = $now
        WHERE project_id = $project AND status = 'prepared'
      `).run({ $project: projectId, $now: stamp });
      this.database.query(`
        INSERT INTO campaign_recovery_reports(
          report_id, project_id, wave_id, report_digest, status, report_json,
          prepared_by, decision, note, applied_by, created_at, updated_at, applied_at
        ) VALUES ($id, $project, $wave, $digest, 'prepared', $report, $actor, '', '', '', $now, $now, '')
      `).run({
        $id: reportId, $project: projectId, $wave: String((snapshot.wave as any)?.id || ""),
        $digest: reportDigest, $report: JSON.stringify(snapshot), $actor: actor, $now: stamp,
      });
      this.port.recordEvent(projectId, "campaign-recovery", reportId, "campaign.recovery.prepared", {
        reportDigest, waveId: String((snapshot.wave as any)?.id || ""), actor,
        workflowPhase: String((snapshot.project as any)?.phase || ""), wavePhase: String((snapshot.wave as any)?.phase || ""),
      });
    })();
    return this.report(this.byId(reportId));
  }

  apply(projectId: string, args: Record<string, any>, actor: string): Record<string, unknown> {
    const reportId = typeof args.reportId === "string" ? args.reportId : "";
    const expectedDigest = typeof args.reportDigest === "string" ? args.reportDigest : "";
    const decision = String(args.decision || "").toUpperCase() as CampaignRecoveryDecision;
    const note = typeof args.note === "string" ? args.note.trim().slice(0, 2000) : "";
    if (args.confirmation !== "APPLY CAMPAIGN RECOVERY") throw new Error("Explicit campaign recovery confirmation is required");
    if (!reportId || !expectedDigest || !DECISIONS.has(decision)) throw new Error("A prepared report, exact digest, and valid recovery decision are required");
    const report = this.byId(reportId);
    if (report.project_id !== projectId || report.status !== "prepared") throw new Error("The recovery report is not a current prepared report for this project");
    if (report.report_digest !== expectedDigest) throw new Error("The recovery report digest does not match the requested apply action");

    const freshSnapshot = this.buildSnapshot(projectId);
    const freshDigest = `sha256:${this.port.digest(freshSnapshot)}`;
    if (freshDigest !== report.report_digest) throw new Error("The campaign recovery boundary changed; prepare and review a fresh report");
    const recovery = (freshSnapshot.controlState as Record<string, any>)?.recovery ?? {};
    if (!recovery.required || Number(recovery.activeExecution || 0) !== 0) throw new Error("The campaign is no longer at the prepared idle recovery boundary");
    const wave = this.waves.latest(projectId);
    if (!wave || wave.wave_id !== report.wave_id) throw new Error("The frozen wave changed after recovery preparation");

    const before = { workflowPhase: this.port.project(projectId).current_phase, wavePhase: wave.phase };
    const projectionRepair = (freshSnapshot.projectionRepair as Record<string, any>) ?? {};
    const stamp = this.port.now();
    this.database.transaction(() => {
      if (decision === "ALIGN_WAVE_TO_WORKFLOW") {
        this.database.query("UPDATE campaign_waves SET phase = $phase, updated_at = $now WHERE wave_id = $wave")
          .run({ $phase: before.workflowPhase, $now: stamp, $wave: wave.wave_id });
        this.port.touchProject(projectId);
      } else if (decision === "ALIGN_WORKFLOW_TO_WAVE") {
        this.port.transitionWorkflow(projectId, before.wavePhase, actor);
      } else if (decision === "APPLY_VALIDATED_PROJECTION_REPAIR") {
        const items = Array.isArray(projectionRepair.items) ? projectionRepair.items : [];
        if (projectionRepair.status !== "READY_FOR_REVIEW" || !items.length || items.some((item: any) => !item.mechanicallyRepairable || !item.proposedAccountingState)) {
          throw new Error("The frozen projection repair is not fully supported by terminal observer evidence");
        }
        const update = this.database.query(`
          UPDATE campaign_wave_lanes SET accounting_state = $state, snapshot_json = $snapshot, updated_at = $now
          WHERE wave_id = $wave AND lane_id = $lane
        `);
        const observed = new Map((this.port.observer()?.lanes ?? []).map((lane) => [lane.id, lane]));
        for (const item of items) {
          const lane = observed.get(item.laneId);
          if (!lane) throw new Error(`Terminal observer evidence disappeared for ${item.laneId}`);
          update.run({ $state: item.proposedAccountingState, $snapshot: JSON.stringify(lane), $now: stamp, $wave: wave.wave_id, $lane: item.laneId });
        }
        this.port.touchProject(projectId);
      } else {
        this.port.touchProject(projectId);
      }
      this.database.query(`
        UPDATE campaign_recovery_reports SET status = 'applied', decision = $decision, note = $note,
          applied_by = $actor, updated_at = $now, applied_at = $now WHERE report_id = $id
      `).run({ $id: reportId, $decision: decision, $note: note, $actor: actor, $now: stamp });
      const afterWave = this.waves.latest(projectId);
      const afterProject = this.port.project(projectId);
      this.port.recordEvent(projectId, "campaign-recovery", reportId, "campaign.recovery.applied", {
        reportDigest: report.report_digest, decision, note, actor, before,
        after: { workflowPhase: afterProject.current_phase, wavePhase: afterWave?.phase || "" },
        authority: "human-confirmed", inferredWorkerResult: false, dispatch: false, claimPromotion: false,
      });
    })();
    const settled = this.byId(reportId);
    return {
      ...this.report(settled),
      controlState: this.port.controlState(projectId, this.waves.latest(projectId)?.phase || ""),
      accounting: waveAccounting(this.waves.members(wave.wave_id)),
    };
  }

  latest(projectId: string): Record<string, unknown> | null {
    const row = this.database.query("SELECT * FROM campaign_recovery_reports WHERE project_id = $project ORDER BY created_at DESC LIMIT 1")
      .get({ $project: projectId }) as RecoveryReportRow | null;
    return row ? this.report(row) : null;
  }

  private buildSnapshot(projectId: string): Record<string, unknown> {
    const project = this.port.project(projectId);
    const wave = this.waves.latest(projectId);
    if (!wave) throw new Error("A frozen wave is required before historical recovery can be prepared");
    const members = this.waves.members(wave.wave_id);
    const observed = (this.port.observer()?.lanes ?? []).filter((lane) => lane.project === projectId).sort((a, b) => a.id.localeCompare(b.id));
    const controlState = this.port.controlState(projectId, wave.phase);
    const aggregate = projectWaveAggregate({
      id: wave.wave_id, projectId, label: wave.label, campaignPhase: wave.phase,
      createdAt: wave.created_at, updatedAt: wave.updated_at, lanes: members,
    });
    const projectionRepair = planWaveProjectionRepair({ aggregate, observedLanes: observed });
    const activeActions = this.database.query(`
      SELECT action_id, action_type, target_id, status, created_at FROM campaign_actions
      WHERE project_id = $project AND status IN ('queued', 'running')
        AND action_type NOT IN ('campaign.recovery.prepare', 'campaign.recovery.apply') ORDER BY created_at
    `).all({ $project: projectId });
    const activeRuns = this.database.query(`
      SELECT run_id, wave_id, task_id, status, lane_id, job_id, created_at, updated_at FROM campaign_research_runs
      WHERE project_id = $project AND status IN ('launching', 'running', 'blocked', 'awaiting_evidence') ORDER BY created_at
    `).all({ $project: projectId });
    const activeSchedules = this.database.query(`
      SELECT schedule_id, wave_id, schedule_digest, status, created_at, updated_at FROM campaign_wave_schedules
      WHERE project_id = $project AND status IN ('proposed', 'confirmed', 'dispatching', 'running', 'attention') ORDER BY created_at
    `).all({ $project: projectId });
    const activeCustody = this.database.query(`
      SELECT lease_id, item_id, status, lease_digest, created_at, updated_at FROM campaign_custody_leases
      WHERE project_id = $project AND status IN ('confirmed', 'dispatching', 'running', 'awaiting_review') ORDER BY created_at
    `).all({ $project: projectId });
    const lineage = this.database.query(`
      SELECT event_id, aggregate_type, aggregate_id, event_type, payload_json, created_at FROM campaign_events
      WHERE project_id = $project AND (
        event_type = 'project.phase.changed' OR event_type = 'wave.adopted' OR
        event_type = 'lane.disposition.recorded' OR event_type = 'wave.triage.applied' OR
        event_type = 'synthesis.reviewed' OR event_type = 'research.schedule.confirmed' OR
        event_type = 'research.evidence.returned'
      ) ORDER BY created_at DESC LIMIT 24
    `).all({ $project: projectId }) as Array<Record<string, any>>;
    return {
      schema: "campaign-recovery-report/v1",
      project: { id: projectId, version: project.version, phase: project.current_phase, updatedAt: project.updated_at },
      controlState: {
        workflow: controlState.workflow,
        recovery: controlState.recovery,
      },
      wave: {
        id: wave.wave_id, label: wave.label, phase: wave.phase, evidenceDigest: wave.evidence_digest,
        accounting: waveAccounting(members),
        members: members.map((member) => ({
          laneId: member.lane_id, accountingState: member.accounting_state,
          disposition: member.disposition, reason: member.reason, updatedAt: member.updated_at,
        })),
      },
      controlledExecution: { actions: activeActions, researchRuns: activeRuns, schedules: activeSchedules, custodyLeases: activeCustody },
      observedActivity: observed.filter((lane) => lane.lifecycle === "active").map(stableLane),
      projectionRepair,
      eventLineage: lineage.reverse().map((event) => ({
        id: event.event_id, aggregateType: event.aggregate_type, aggregateId: event.aggregate_id,
        type: event.event_type, payload: parseJson(event.payload_json, {}), createdAt: event.created_at,
      })),
      choices: {
        preserveHold: true,
        alignWaveToWorkflow: true,
        alignWorkflowToWave: true,
        applyProjectionRepair: projectionRepair.status === "READY_FOR_REVIEW",
      },
      invariants: {
        humanConfirmationRequired: true,
        digestRequired: true,
        workerResultInference: false,
        dispatch: false,
        claimPromotion: false,
        mergeOrPush: false,
      },
    };
  }

  private byId(reportId: string): RecoveryReportRow {
    const row = this.database.query("SELECT * FROM campaign_recovery_reports WHERE report_id = $id").get({ $id: reportId }) as RecoveryReportRow | null;
    if (!row) throw new Error(`Unknown campaign recovery report: ${reportId}`);
    return row;
  }

  private report(row: RecoveryReportRow): Record<string, unknown> {
    return {
      id: row.report_id, projectId: row.project_id, waveId: row.wave_id,
      reportDigest: row.report_digest, status: row.status, snapshot: parseJson(row.report_json, {}),
      actor: row.prepared_by, decision: row.decision, note: row.note, appliedBy: row.applied_by,
      createdAt: row.created_at, updatedAt: row.updated_at, appliedAt: row.applied_at,
    };
  }
}
