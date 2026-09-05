import { afterEach, describe, expect, test } from "bun:test";
import { Database } from "bun:sqlite";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { CampaignStartupService } from "../src/campaign-startup-service";

const temporaryRoots: string[] = [];

afterEach(() => {
  for (const root of temporaryRoots.splice(0)) rmSync(root, { recursive: true, force: true });
});

function harness(options: { custodyFailure?: Error } = {}) {
  const root = mkdtempSync(join(tmpdir(), "lane-watch-startup-"));
  temporaryRoots.push(root);
  const hub = join(root, "hub");
  mkdirSync(hub, { recursive: true });
  const manifestPath = join(hub, "projects.json");
  writeFileSync(manifestPath, `\uFEFF${JSON.stringify({
    projects: [
      { id: "alpha", role: "Alpha role", path: "../alpha", local_agent_coordinator: "tools/coord.ps1" },
      { id: "beta", path: "../beta" },
      { role: "Ignored because it has no id", path: "../ignored" },
    ],
  })}`);
  const database = new Database(":memory:");
  database.run(`CREATE TABLE campaign_projects (
    project_id TEXT PRIMARY KEY, role TEXT NOT NULL, root_path TEXT NOT NULL,
    automation_mode TEXT NOT NULL DEFAULT 'prepare', dispatch_profile TEXT NOT NULL DEFAULT 'sonnet-worker',
    current_phase TEXT NOT NULL DEFAULT 'PLANNING', version INTEGER NOT NULL DEFAULT 1, updated_at TEXT NOT NULL
  )`);
  const order: string[] = [];
  let resumes = 0;
  const projects: any[] = [];
  const service = new CampaignStartupService(database, manifestPath, {
    registerProject: (project) => { projects.push(project); order.push(`register:${project.id}`); },
    ensureStrategyFoundation: (projectId) => { order.push(`foundation:${projectId}`); },
    recoverInterruptedActions: () => { order.push("recover-actions"); return 2; },
    recoverResearchLaunches: () => { order.push('recover-research'); return 1; },
    recoverCustodyExecutions: async () => {
      order.push("recover-custody");
      if (options.custodyFailure) throw options.custodyFailure;
    },
    resumeActions: () => { resumes += 1; order.push("resume-actions"); },
  }, () => "2026-08-30T15:00:00.000Z");
  return { root, database, manifestPath, order, projects, service, resumes: () => resumes };
}

describe("CampaignStartupService", () => {
  test("loads foundations and recovery in order while keeping execution behind observation", async () => {
    const item = harness();

    expect(item.service.snapshot()).toEqual({ phase: "constructed", projectCount: 0, interruptedActionCount: 0, interruptedResearchLaunchCount:0 });
    expect(await item.service.initialize()).toEqual({
      phase: "awaiting-first-observation", projectCount: 2, interruptedActionCount: 2, interruptedResearchLaunchCount:1,
    });
    expect(item.order).toEqual([
      "register:alpha", "foundation:alpha", "register:beta", "foundation:beta",
      "recover-actions", 'recover-research', "recover-custody",
    ]);
    expect(item.resumes()).toBe(0);
    expect(item.projects).toEqual([
      {
        id: "alpha", role: "Alpha role", root: resolve(item.root, "alpha"),
        managed: true, localCoordinator: "tools/coord.ps1",
      },
      {
        id: "beta", role: "Research campaign", root: resolve(item.root, "beta"),
        managed: false, localCoordinator: "",
      },
    ]);
    expect(item.database.query("SELECT project_id, role, root_path, updated_at FROM campaign_projects ORDER BY project_id").all()).toEqual([
      { project_id: "alpha", role: "Alpha role", root_path: resolve(item.root, "alpha"), updated_at: "2026-08-30T15:00:00.000Z" },
      { project_id: "beta", role: "Research campaign", root_path: resolve(item.root, "beta"), updated_at: "2026-08-30T15:00:00.000Z" },
    ]);

    item.service.observationSettled();
    expect(item.service.snapshot().phase).toBe("ready");
    expect(item.resumes()).toBe(1);
    item.service.observationSettled();
    expect(item.resumes()).toBe(2);
    expect((await item.service.initialize()).phase).toBe("ready");
    expect(item.order.filter((step) => step === "recover-actions")).toHaveLength(1);
    item.database.close();
  });

  test("does not resume actions before initialization or after failed custody recovery", async () => {
    const item = harness({ custodyFailure: new Error("custody app-server unavailable") });

    expect(() => item.service.observationSettled()).toThrow("while constructed");
    await expect(item.service.initialize()).rejects.toThrow("custody app-server unavailable");
    expect(item.service.snapshot()).toEqual({ phase: "failed", projectCount: 2, interruptedActionCount: 2, interruptedResearchLaunchCount:1 });
    expect(() => item.service.observationSettled()).toThrow("while failed");
    expect(item.resumes()).toBe(0);
    item.database.close();
  });
});
