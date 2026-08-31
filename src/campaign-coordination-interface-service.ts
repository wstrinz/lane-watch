import { Database } from "bun:sqlite";
import type { LaneSnapshot } from "./types";
import { WaveRepository } from "./wave-repository";

export type CampaignCoordinationMode = "observe-only" | "imported-wave" | "controller-owned-execution";

interface CoordinationRunRow {
  run_id: string;
  wave_id: string;
  task_id: string;
  lane_id: string;
  job_id: string;
  status: string;
}

interface CoordinationScheduleRow {
  schedule_id: string;
  wave_id: string;
  status: string;
  schedule_digest: string;
  confirmed_by: string;
}

interface CampaignCoordinationInterfacePort {
  controlState(projectId: string, wavePhase: string): Record<string, any>;
}

export interface CoordinationLaneScope {
  laneId: string;
  mode: CampaignCoordinationMode;
  controlled: boolean;
  runId: string;
  waveId: string;
  reason: string;
}

export interface CampaignCoordinationInterface {
  schema: "campaign-coordination-interface/v1";
  mode: CampaignCoordinationMode;
  authority: "none" | "human-imported-wave" | "operator-confirmed-schedule" | "durable-controller-run";
  reason: string;
  waveId: string;
  schedule: { id: string; status: string; digest: string; confirmedBy: string } | null;
  activeControllerRuns: number;
  recoveryRequired: boolean;
  capabilities: {
    observe: true;
    importWave: boolean;
    reconcile: boolean;
    account: boolean;
    plan: boolean;
    prepareSchedule: boolean;
    confirmSchedule: boolean;
    dispatch: boolean;
    synthesize: boolean;
    automaticProposals: boolean;
  };
  transitions: {
    importWave: "human-wave-adoption";
    controllerExecution: "exact-human-schedule-confirmation";
    returnToImportedWave: "controlled-execution-settlement";
  };
  invariants: {
    observationIsAuthority: false;
    importedWaveCanDispatch: false;
    scheduleProposalIsAuthority: false;
    recoveryIsCircuitBreaker: true;
  };
  lanes: CoordinationLaneScope[];
}

const ACTIVE_RUN_STATUSES = ["launching", "running", "blocked", "awaiting_evidence", "evidence_ready"];
const CONTROLLER_SCHEDULE_STATUSES = ["confirmed", "dispatching", "running", "attention", "landed"];

function matchesRun(lane: LaneSnapshot, run: CoordinationRunRow): boolean {
  return Boolean(
    (run.lane_id && lane.id === run.lane_id)
    || (run.job_id && lane.jobId === run.job_id)
    || (run.task_id && lane.task === run.task_id)
  );
}

/**
 * Formalizes the boundary between a regular campaign coordinator and Lane
 * Watch. Modes are derived from existing durable human gates; observation can
 * never select or upgrade a mode.
 */
export class CampaignCoordinationInterfaceService {
  constructor(
    private readonly database: Database,
    private readonly waves: WaveRepository,
    private readonly port: CampaignCoordinationInterfacePort,
  ) {}

  snapshot(projectId: string, lanes: LaneSnapshot[] = []): CampaignCoordinationInterface {
    const wave = this.waves.latest(projectId);
    const controlState = this.port.controlState(projectId, wave?.phase || "");
    const recovery = controlState?.recovery ?? {};
    const recoveryRequired = Boolean(recovery.required);
    const aligned = recovery.status === "ALIGNED";
    const members = new Set(wave ? this.waves.members(wave.wave_id).map((member) => member.lane_id) : []);
    const runs = wave ? this.database.query(`
      SELECT run_id, wave_id, task_id, lane_id, job_id, status FROM campaign_research_runs
      WHERE project_id = $project AND wave_id = $wave
        AND status IN (${ACTIVE_RUN_STATUSES.map(() => "?").join(", ")})
    `).all(projectId, wave.wave_id, ...ACTIVE_RUN_STATUSES) as CoordinationRunRow[] : [];
    const schedule = wave ? this.database.query(`
      SELECT schedule_id, wave_id, status, schedule_digest, confirmed_by
      FROM campaign_wave_schedules
      WHERE project_id = $project AND wave_id = $wave
      ORDER BY created_at DESC LIMIT 1
    `).get({ $project: projectId, $wave: wave.wave_id }) as CoordinationScheduleRow | null : null;
    const controllerSchedule = Boolean(schedule && CONTROLLER_SCHEDULE_STATUSES.includes(schedule.status));

    let mode: CampaignCoordinationMode = "observe-only";
    let authority: CampaignCoordinationInterface["authority"] = "none";
    let reason = recoveryRequired
      ? "Historical recovery is required, so Lane Watch remains observe-only until the human boundary is resolved."
      : "No current imported wave or operator-confirmed Lane Watch execution boundary exists.";
    if (!recoveryRequired && (runs.length || controllerSchedule)) {
      mode = "controller-owned-execution";
      authority = runs.length ? "durable-controller-run" : "operator-confirmed-schedule";
      reason = runs.length
        ? "A current durable Lane Watch research run owns execution for its exact lane."
        : "A human confirmed the exact current schedule digest, granting execution authority only to its reserved members.";
    } else if (!recoveryRequired && aligned && wave) {
      mode = "imported-wave";
      authority = "human-imported-wave";
      reason = "The current aligned wave was explicitly adopted for accounting, reconciliation, planning, and synthesis; it has no dispatch authority until an exact schedule is confirmed.";
    }

    const scopedLanes = lanes.map((lane): CoordinationLaneScope => {
      const run = runs.find((candidate) => matchesRun(lane, candidate));
      if (run && !recoveryRequired) return {
        laneId: lane.id,
        mode: "controller-owned-execution",
        controlled: true,
        runId: run.run_id,
        waveId: run.wave_id,
        reason: "This lane matches a current durable Lane Watch research run.",
      };
      if (!recoveryRequired && aligned && wave && members.has(lane.id)) return {
        laneId: lane.id,
        mode: "imported-wave",
        controlled: true,
        runId: "",
        waveId: wave.wave_id,
        reason: "This lane is an explicit member of the aligned current imported wave.",
      };
      return {
        laneId: lane.id,
        mode: "observe-only",
        controlled: false,
        runId: "",
        waveId: wave?.wave_id || "",
        reason: recoveryRequired
          ? "Historical recovery is required, so observer activity has no command authority."
          : "No current durable run or aligned imported-wave membership grants Lane Watch authority over this lane.",
      };
    });

    const importedOrControlled = mode !== "observe-only";
    return {
      schema: "campaign-coordination-interface/v1",
      mode,
      authority,
      reason,
      waveId: wave?.wave_id || "",
      schedule: schedule ? { id: schedule.schedule_id, status: schedule.status, digest: schedule.schedule_digest, confirmedBy: schedule.confirmed_by } : null,
      activeControllerRuns: runs.length,
      recoveryRequired,
      capabilities: {
        observe: true,
        importWave: !recoveryRequired && !runs.length && !controllerSchedule && (!wave || wave.phase === "NEXT_WAVE_READY"),
        reconcile: importedOrControlled && !recoveryRequired,
        account: importedOrControlled && !recoveryRequired,
        plan: importedOrControlled && !recoveryRequired,
        prepareSchedule: mode === "imported-wave" && !recoveryRequired,
        confirmSchedule: mode === "imported-wave" && schedule?.status === "proposed" && !recoveryRequired,
        dispatch: mode === "controller-owned-execution" && schedule?.status === "confirmed" && !recoveryRequired,
        synthesize: importedOrControlled && !recoveryRequired,
        automaticProposals: importedOrControlled && !recoveryRequired,
      },
      transitions: {
        importWave: "human-wave-adoption",
        controllerExecution: "exact-human-schedule-confirmation",
        returnToImportedWave: "controlled-execution-settlement",
      },
      invariants: {
        observationIsAuthority: false,
        importedWaveCanDispatch: false,
        scheduleProposalIsAuthority: false,
        recoveryIsCircuitBreaker: true,
      },
      lanes: scopedLanes,
    };
  }
}
