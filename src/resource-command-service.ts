import { Database } from "bun:sqlite";
import type { CampaignDomainReader } from "./campaign-domain-reader";

export interface ResourceCommandPort {
  project(projectId: string): { current_phase: string };
  touchProject(projectId: string): void;
  recordEvent(projectId: string, aggregateType: string, aggregateId: string, eventType: string, payload: unknown): void;
  digest(value: unknown): string;
  now(): string;
}

export class ResourceCommandService {
  constructor(
    private readonly database: Database,
    private readonly domains: CampaignDomainReader,
    private readonly port: ResourceCommandPort,
  ) {}

  simulate(projectId: string, actor: string): Record<string, unknown> {
    const state = this.domains.resourceSnapshot(projectId);
    const simulationId = crypto.randomUUID();
    const stamp = this.port.now();
    const input = {
      schema: "campaign-resource-simulation-input/v1",
      projectId,
      epochId: state.epochId,
      charterRevision: state.charterRevision,
      policy: state.policy,
      usage: state.usage,
      candidates: state.candidates.map(({ decision, decisionReason, ...candidate }: any) => candidate),
      activeSlots: state.slots.active,
    };
    const result = {
      schema: "campaign-resource-simulation-result/v1",
      ledger: state.ledger,
      slots: state.slots,
      byLayer: state.byLayer,
      decisions: state.candidates,
      simulation: state.simulation,
      signals: state.signals,
      schedulerAuthority: "none",
      dispatched: false,
      computedAt: stamp,
    };
    const inputDigest = `sha256:${this.port.digest(input)}`;
    this.database.query(`
      INSERT INTO campaign_resource_simulations(
        simulation_id, project_id, epoch_id, charter_revision, input_digest, input_json, result_json, created_by, created_at
      ) VALUES ($id, $project, $epoch, $revision, $digest, $input, $result, $actor, $now)
    `).run({
      $id: simulationId,
      $project: projectId,
      $epoch: state.epochId,
      $revision: state.charterRevision,
      $digest: inputDigest,
      $input: JSON.stringify(input),
      $result: JSON.stringify(result),
      $actor: actor,
      $now: stamp,
    });
    const phase = this.port.project(projectId).current_phase;
    this.port.touchProject(projectId);
    this.port.recordEvent(projectId, "resource-simulation", simulationId, "resource.schedule.simulated", {
      actor,
      epochId: state.epochId,
      charterRevision: state.charterRevision,
      inputDigest,
      decisions: state.candidates.map((candidate: any) => ({ id: candidate.id, decision: candidate.decision })),
      schedulerAuthority: "none",
      dispatched: false,
      campaignPhaseUnchanged: phase,
    });
    return { simulationId, inputDigest, schedulerAuthority: "none", dispatched: false, campaignPhase: phase, result };
  }
}
