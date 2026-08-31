import type { ObserverSnapshot } from "./types";

export const OPERATIONAL_GOVERNANCE_SCHEMA = "lane-watch-operational-governance/v1";

export interface GlobalQuotaPolicy {
  tokenCommitments: number;
  slots: { strategy: number; research: number; custody: number };
}

export function quotaPolicyFromEnvironment(environment: Record<string, string | undefined> = process.env): GlobalQuotaPolicy {
  const value = (name: string, fallback: number): number => {
    const parsed = Number(environment[name]);
    return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
  };
  return {
    tokenCommitments: value("OBSERVER_GLOBAL_TOKEN_COMMITMENT_QUOTA", 240_000),
    slots: {
      strategy: value("OBSERVER_GLOBAL_STRATEGY_SLOT_QUOTA", 1),
      research: value("OBSERVER_GLOBAL_RESEARCH_SLOT_QUOTA", 3),
      custody: value("OBSERVER_GLOBAL_CUSTODY_SLOT_QUOTA", 1),
    },
  };
}

function nonnegative(value: unknown): number { return Number.isFinite(Number(value)) ? Math.max(0, Number(value)) : 0; }

/** Read-only pre-admission view. It reports declarations and measured occupancy without granting host or scheduler authority. */
export function deriveOperationalGovernance(input: {
  projects: Array<Record<string, any>>;
  manifestProjects: Array<Record<string, any>>;
  observer: ObserverSnapshot;
  quota: GlobalQuotaPolicy;
  generatedAt: string;
}): Record<string, any> {
  const manifest = new Map(input.manifestProjects.map((project) => [String(project.id || ""), project]));
  const projectViews = input.projects.map((project) => {
    const declaration = manifest.get(String(project.id)) || {};
    const sources = input.observer.sources.filter((source) => source.project === project.id);
    const active = project.resources?.slots?.active || {};
    return {
      id: project.id,
      hosts: [
        {
          id: "windows", observation: sources.some((source) => source.host === "windows" && source.available) ? "available" : "unavailable",
          coordinatorDeclared: Boolean(declaration.local_agent_coordinator),
          researchDispatch: declaration.local_agent_coordinator ? "configured" : "unavailable",
          reconciliation: declaration.local_agent_coordinator ? "terminal-owned-only" : "unavailable",
          schedulerAuthority: "none",
        },
        {
          id: "macbook", observation: sources.some((source) => source.host === "macbook" && source.available) ? "available" : "unavailable",
          coordinatorDeclared: Boolean(declaration.mac_agent_coordinator),
          researchDispatch: "unsupported-by-controller",
          reconciliation: "unsupported-by-controller",
          schedulerAuthority: "none",
        },
      ],
      quotaUsage: {
        tokenCommitments: nonnegative(project.resources?.ledger?.committedTokens),
        slots: { strategy: nonnegative(active.strategy), research: nonnegative(active.research), custody: nonnegative(active.custody) },
      },
    };
  });
  const usage = projectViews.reduce((total, project) => ({
    tokenCommitments: total.tokenCommitments + project.quotaUsage.tokenCommitments,
    slots: {
      strategy: total.slots.strategy + project.quotaUsage.slots.strategy,
      research: total.slots.research + project.quotaUsage.slots.research,
      custody: total.slots.custody + project.quotaUsage.slots.custody,
    },
  }), { tokenCommitments: 0, slots: { strategy: 0, research: 0, custody: 0 } });
  const remaining = {
    tokenCommitments: Math.max(0, input.quota.tokenCommitments - usage.tokenCommitments),
    slots: {
      strategy: Math.max(0, input.quota.slots.strategy - usage.slots.strategy),
      research: Math.max(0, input.quota.slots.research - usage.slots.research),
      custody: Math.max(0, input.quota.slots.custody - usage.slots.custody),
    },
  };
  const exceeded = usage.tokenCommitments > input.quota.tokenCommitments
    || (Object.keys(input.quota.slots) as Array<keyof GlobalQuotaPolicy["slots"]>).some((key) => usage.slots[key] > input.quota.slots[key]);
  return {
    schema: OPERATIONAL_GOVERNANCE_SCHEMA, generatedAt: input.generatedAt,
    mode: "queue-admission", schedulerAuthority: "none", hostMutationAuthority: "none",
    projects: projectViews,
    quotas: {
      policy: input.quota, usage, remaining, status: exceeded ? "EXCEEDED" : "WITHIN_LIMITS", enforced: true,
      acquisitionActions: ["strategy.review.request", "synthesis.request", "research.schedule.confirm", "research.dispatch.start", "custody.lease.confirm"],
    },
    note: "Host inventory distinguishes observation and declarations from controller support. Global quotas are enforced only at serialized resource-acquisition actions; they grant no scheduling or host authority.",
  };
}
