import { Database } from "bun:sqlite";
import type { ActionQueueRow } from "./action-queue-service";
import type { GlobalQuotaPolicy } from "./operational-governance";
import { normalizeResourcePolicy } from "./resources";

export type QuotaVector = { tokenCommitments: number; slots: { strategy: number; research: number; custody: number } };

export function assessQuotaAdmission(policy: GlobalQuotaPolicy, usage: QuotaVector, request: QuotaVector): Record<string, any> {
  const projected = {
    tokenCommitments: usage.tokenCommitments + request.tokenCommitments,
    slots: {
      strategy: usage.slots.strategy + request.slots.strategy,
      research: usage.slots.research + request.slots.research,
      custody: usage.slots.custody + request.slots.custody,
    },
  };
  const violations = [
    ...(projected.tokenCommitments > policy.tokenCommitments ? [`token commitments ${projected.tokenCommitments} > ${policy.tokenCommitments}`] : []),
    ...(Object.keys(policy.slots) as Array<keyof GlobalQuotaPolicy["slots"]>)
      .filter((slot) => projected.slots[slot] > policy.slots[slot])
      .map((slot) => `${slot} slots ${projected.slots[slot]} > ${policy.slots[slot]}`),
  ];
  return { admitted: violations.length === 0, policy, usage, request, projected, violations };
}

function parse(value: string | undefined): Record<string, any> {
  try { return JSON.parse(value || "{}") as Record<string, any>; } catch { return {}; }
}

function empty(): QuotaVector { return { tokenCommitments: 0, slots: { strategy: 0, research: 0, custody: 0 } }; }

/** Global acquisition gate. It runs inside the serialized action queue immediately before a resource-owning command. */
export class MultiProjectQuotaService {
  constructor(private readonly database: Database, private readonly policy: GlobalQuotaPolicy) {}

  admit(action: ActionQueueRow): Record<string, any> | null {
    const request = this.request(action);
    if (!request) return null;
    const assessment = assessQuotaAdmission(this.policy, this.usage(), request);
    if (!assessment.admitted) throw new Error(`Global quota admission denied: ${assessment.violations.join("; ")}`);
    return assessment;
  }

  private policyFor(projectId: string): ReturnType<typeof normalizeResourcePolicy> {
    const row = this.database.query("SELECT charter_json FROM campaign_strategy_charters WHERE project_id = $project")
      .get({ $project: projectId }) as { charter_json: string } | null;
    return normalizeResourcePolicy(parse(row?.charter_json).resourcePolicy);
  }

  private request(action: ActionQueueRow): QuotaVector | null {
    const request = empty();
    if (action.action_type === "strategy.review.request") {
      request.tokenCommitments = this.policyFor(action.project_id).tokenCaps.strategyReview;
      request.slots.strategy = 1;
    } else if (action.action_type === "synthesis.request") {
      request.tokenCommitments = this.policyFor(action.project_id).tokenCaps.synthesis;
      request.slots.strategy = 1;
    } else if (action.action_type === "research.schedule.confirm") {
      const row = this.database.query("SELECT proposal_json FROM campaign_wave_schedules WHERE schedule_id = $id AND project_id = $project AND status = 'proposed'")
        .get({ $id: action.target_id, $project: action.project_id }) as { proposal_json: string } | null;
      if (!row) return null;
      const proposal = parse(row.proposal_json);
      request.tokenCommitments = Math.max(0, Number(proposal.budget?.reservedTokens || 0));
      request.slots.research = Math.max(0, Number(proposal.slots?.reserved || 0));
    } else if (action.action_type === "research.dispatch.start") {
      request.tokenCommitments = this.policyFor(action.project_id).tokenCaps.routineLane;
      request.slots.research = 1;
    } else if (action.action_type === "custody.lease.confirm") {
      const row = this.database.query("SELECT lease_json FROM campaign_custody_leases WHERE lease_id = $id AND project_id = $project AND status = 'prepared'")
        .get({ $id: action.target_id, $project: action.project_id }) as { lease_json: string } | null;
      if (!row) return null;
      request.tokenCommitments = Math.max(0, Number(parse(row.lease_json).budget?.maxTokens || 0));
      request.slots.custody = 1;
    } else return null;
    return request;
  }

  private usage(): QuotaVector {
    const usage = empty();
    const reviews = this.database.query("SELECT resource_cap FROM campaign_strategy_reviews WHERE status IN ('queued', 'drafting')").all() as Array<{ resource_cap: number }>;
    usage.slots.strategy += reviews.length;
    usage.tokenCommitments += reviews.reduce((sum, row) => sum + Math.max(0, Number(row.resource_cap || 0)), 0);
    const syntheses = this.database.query(`
      SELECT wave.project_id FROM campaign_syntheses synthesis JOIN campaign_waves wave ON wave.wave_id = synthesis.wave_id
      WHERE synthesis.status = 'drafting'
    `).all() as Array<{ project_id: string }>;
    usage.slots.strategy += syntheses.length;
    usage.tokenCommitments += syntheses.reduce((sum, row) => sum + this.policyFor(row.project_id).tokenCaps.synthesis, 0);
    const schedules = this.database.query("SELECT status, proposal_json FROM campaign_wave_schedules WHERE status IN ('confirmed', 'dispatching', 'running', 'attention')").all() as Array<{ status: string; proposal_json: string }>;
    for (const schedule of schedules) {
      const proposal = parse(schedule.proposal_json);
      usage.tokenCommitments += Math.max(0, Number(proposal.budget?.reservedTokens || 0));
      if (schedule.status === "confirmed") usage.slots.research += Math.max(0, Number(proposal.slots?.reserved || 0));
    }
    const activeRuns = this.database.query("SELECT COUNT(*) AS count FROM campaign_research_runs WHERE status IN ('launching', 'running', 'blocked')").get() as { count: number } | null;
    usage.slots.research += Number(activeRuns?.count || 0);
    const leases = this.database.query("SELECT lease_json FROM campaign_custody_leases WHERE status IN ('confirmed', 'dispatching', 'running', 'finalizing', 'awaiting_review')").all() as Array<{ lease_json: string }>;
    usage.slots.custody += leases.length;
    usage.tokenCommitments += leases.reduce((sum, row) => sum + Math.max(0, Number(parse(row.lease_json).budget?.maxTokens || 0)), 0);
    return usage;
  }
}
