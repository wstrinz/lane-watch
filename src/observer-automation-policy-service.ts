import { Database } from "bun:sqlite";
import { CampaignCoordinationInterfaceService } from "./campaign-coordination-interface-service";
import { LaneOwnershipService } from "./lane-ownership-service";
import { WaveRepository } from "./wave-repository";
import type { LaneSnapshot } from "./types";

interface ObserverAutomationProject {
  automation_mode: string;
  current_phase: string;
  version: number;
}

interface ObserverAutomationPolicyPort {
  project(projectId: string): ObserverAutomationProject;
  controlState(projectId: string, wavePhase: string): Record<string, any>;
  coordinatorAvailable(projectId: string): boolean;
  enqueueAction(input: {
    projectId: string;
    type: string;
    targetId?: string;
    args?: Record<string, unknown>;
    expectedVersion: number;
    idempotencyKey: string;
  }, actor: string): Promise<Record<string, unknown>>;
  digest(value: unknown): string;
}

/**
 * Converts observer facts into guarded action proposals. It cannot execute a
 * campaign command directly; every proposal must settle through the durable
 * version-checked action queue.
 */
export class ObserverAutomationPolicyService {
  constructor(
    private readonly database: Database,
    private readonly waves: WaveRepository,
    private readonly coordination: CampaignCoordinationInterfaceService,
    private readonly ownership: LaneOwnershipService,
    private readonly port: ObserverAutomationPolicyPort,
  ) {}

  async propose(
    projectId: string,
    observedLanes: LaneSnapshot[],
    activeLanes: LaneSnapshot[],
    accounting: Record<string, number | boolean> | null,
  ): Promise<void> {
    const current = this.port.project(projectId);
    const wave = this.waves.latest(projectId);
    const controlState = this.port.controlState(projectId, wave?.phase || "");
    const recovery = controlState?.recovery ?? {};
    const coordination = this.coordination.snapshot(projectId, observedLanes);

    // Observation is evidence, not workflow authority. While the durable
    // workflow and frozen wave disagree, no observer-derived command is safe:
    // the historical boundary must be reconciled by a human first.
    if (recovery.required || !coordination.capabilities.automaticProposals) return;

    const aligned = recovery.status === "ALIGNED";
    const ownership = new Map(this.ownership.classify(projectId, observedLanes).map((item) => [item.laneId, item]));

    if (current.automation_mode !== "observe" && coordination.capabilities.reconcile) {
      for (const lane of observedLanes.filter((candidate) =>
        ownership.get(candidate.id)?.controlled
        &&
        candidate.host === "windows"
        && candidate.lifecycle === "active"
        && candidate.attentionReason === "terminal-unrecorded"
        && candidate.landing === "—"
      )) {
        await this.port.enqueueAction({
          projectId,
          type: "lane.reconcile",
          targetId: lane.id,
          idempotencyKey: `auto-reconcile:v2:${lane.id}:${lane.updatedAt}`,
          expectedVersion: current.version,
          args: { automatic: true },
        }, "campaign-control");
      }
    }

    if (aligned
      && coordination.capabilities.account
      && ["propose", "bounded"].includes(current.automation_mode)
      && accounting
      && Number(accounting.unaccounted) > 0
      && Number(accounting.running) === 0) {
      const triage = wave
        ? this.database.query("SELECT status FROM campaign_wave_triages WHERE wave_id = $wave")
          .get({ $wave: wave.wave_id }) as { status: string } | null
        : null;
      if (wave && this.port.coordinatorAvailable(projectId) && !["drafting", "drafted"].includes(triage?.status ?? "")) {
        const laneState = this.waves.members(wave.wave_id)
          .map((lane) => [lane.lane_id, lane.accounting_state, lane.disposition, lane.updated_at]);
        await this.port.enqueueAction({
          projectId,
          type: "wave.triage.request",
          idempotencyKey: `auto-triage:${wave.wave_id}:${this.port.digest(laneState)}`,
          expectedVersion: current.version,
          args: { automatic: true },
        }, "campaign-control");
      }
    }

    if (current.automation_mode !== "observe"
      && aligned
      && coordination.capabilities.synthesize
      && wave
      && current.current_phase === "SYNTHESIS_READY"
      && wave.phase === "SYNTHESIS_READY"
      && accounting?.complete
      && !wave.bundle_path) {
      const memberState = this.waves.members(wave.wave_id)
        .map((member) => [member.lane_id, member.accounting_state, member.disposition, member.updated_at]);
      await this.port.enqueueAction({
        projectId,
        type: "synthesis.prepare",
        idempotencyKey: `auto-prepare:${wave.wave_id}:${this.port.digest(memberState)}`,
        expectedVersion: current.version,
        args: { automatic: true },
      }, "campaign-control");
    }
  }
}
