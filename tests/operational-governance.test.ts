import { describe, expect, test } from "bun:test";
import { deriveOperationalGovernance } from "../src/operational-governance";
import type { ObserverSnapshot } from "../src/types";

const observer: ObserverSnapshot = {
  generatedAt: "now", version: 1, lanes: [], counts: { working: 0, idle: 0, attention: 0, complete: 0, total: 0 },
  sources: [
    { project: "cfg23", host: "windows", path: "local", available: true },
    { project: "cfg23", host: "macbook", path: "remote", available: true },
    { project: "arr15", host: "windows", path: "local", available: false },
  ],
};

function project(id: string, tokens: number, research: number): Record<string, any> {
  return { id, resources: { ledger: { committedTokens: tokens }, slots: { active: { strategy: 0, research, custody: 0 } } } };
}

describe("operational governance projection", () => {
  test("separates observed and declared hosts from unsupported controller authority", () => {
    const result = deriveOperationalGovernance({
      projects: [project("cfg23", 100_000, 2)], observer, generatedAt: "2026-08-31T00:00:00Z",
      manifestProjects: [{ id: "cfg23", local_agent_coordinator: "local.ps1", mac_agent_coordinator: "mac.ps1" }],
      quota: { tokenCommitments: 240_000, slots: { strategy: 1, research: 3, custody: 1 } },
    }) as any;
    expect(result).toMatchObject({ schema: "lane-watch-operational-governance/v1", mode: "queue-admission", schedulerAuthority: "none", hostMutationAuthority: "none" });
    expect(result.projects[0].hosts[0]).toMatchObject({ id: "windows", observation: "available", coordinatorDeclared: true, researchDispatch: "configured", reconciliation: "terminal-owned-only" });
    expect(result.projects[0].hosts[1]).toMatchObject({ id: "macbook", observation: "available", coordinatorDeclared: true, researchDispatch: "unsupported-by-controller", reconciliation: "unsupported-by-controller" });
    expect(result.quotas).toMatchObject({ usage: { tokenCommitments: 100_000, slots: { research: 2 } }, remaining: { tokenCommitments: 140_000, slots: { research: 1 } }, status: "WITHIN_LIMITS", enforced: true });
  });

  test("aggregates multiple projects and reports overage without inventing enforcement", () => {
    const result = deriveOperationalGovernance({
      projects: [project("cfg23", 180_000, 2), project("arr15", 100_000, 2)], observer, generatedAt: "now",
      manifestProjects: [{ id: "cfg23", local_agent_coordinator: "local.ps1" }, { id: "arr15" }],
      quota: { tokenCommitments: 240_000, slots: { strategy: 1, research: 3, custody: 1 } },
    }) as any;
    expect(result.quotas).toMatchObject({ usage: { tokenCommitments: 280_000, slots: { research: 4 } }, remaining: { tokenCommitments: 0, slots: { research: 0 } }, status: "EXCEEDED", enforced: true });
    expect(result.projects[1].hosts[0]).toMatchObject({ observation: "unavailable", coordinatorDeclared: false, researchDispatch: "unavailable" });
  });
});
