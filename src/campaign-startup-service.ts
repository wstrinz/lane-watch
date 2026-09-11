import { Database } from "bun:sqlite";
import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

export interface CampaignProjectDefinition {
  id: string;
  role: string;
  root: string;
  managed: boolean;
  localCoordinator: string;
}

export type CampaignStartupPhase =
  | "constructed"
  | "loading-projects"
  | "recovering-actions"
  | "recovering-research"
  | "recovering-custody"
  | "awaiting-first-observation"
  | "ready"
  | "failed";

export interface CampaignStartupReport {
  phase: CampaignStartupPhase;
  projectCount: number;
  interruptedActionCount: number;
  interruptedResearchLaunchCount: number;
}

interface CampaignStartupPort {
  registerProject(project: CampaignProjectDefinition): void;
  ensureStrategyFoundation(projectId: string): void;
  recoverInterruptedActions(): number;
  recoverResearchLaunches(): number;
  recoverCustodyExecutions(): Promise<void>;
  resumeActions(): void;
}

/** Owns durable startup recovery and the first-observation execution barrier. */
export class CampaignStartupService {
  private phase: CampaignStartupPhase = "constructed";
  private initialization: Promise<CampaignStartupReport> | null = null;
  private projectCount = 0;
  private interruptedActionCount = 0;
  private interruptedResearchLaunchCount = 0;
  private registeredProjectIds = new Set<string>();

  constructor(
    private readonly database: Database,
    private readonly manifestPath: string,
    private readonly port: CampaignStartupPort,
    private readonly clock: () => string = () => new Date().toISOString(),
  ) {}

  initialize(): Promise<CampaignStartupReport> {
    this.initialization ??= this.initializeOnce();
    return this.initialization.then(() => this.snapshot());
  }

  /** Re-reads project definitions without replaying one-time crash recovery. */
  async reconcileProjects(): Promise<CampaignStartupReport> {
    await this.initialize();
    this.projectCount = await this.loadProjects();
    return this.snapshot();
  }

  /**
   * Called only after an observer snapshot has fully synchronized facts and
   * proposed any guarded actions. This is the sole startup path that makes the
   * durable action queue executable.
   */
  observationSettled(): void {
    if (!this.initialization || !["awaiting-first-observation", "ready"].includes(this.phase)) {
      throw new Error(`Campaign startup cannot resume actions while ${this.phase}`);
    }
    this.phase = "ready";
    this.port.resumeActions();
  }

  snapshot(): CampaignStartupReport {
    return {
      phase: this.phase,
      projectCount: this.projectCount,
      interruptedActionCount: this.interruptedActionCount,
      interruptedResearchLaunchCount: this.interruptedResearchLaunchCount,
    };
  }

  private async initializeOnce(): Promise<CampaignStartupReport> {
    try {
      this.phase = "loading-projects";
      this.projectCount = await this.loadProjects();
      this.phase = "recovering-actions";
      this.interruptedActionCount = this.port.recoverInterruptedActions();
      this.phase = 'recovering-research';
      this.interruptedResearchLaunchCount = this.port.recoverResearchLaunches();
      this.phase = "recovering-custody";
      await this.port.recoverCustodyExecutions();
      this.phase = "awaiting-first-observation";
      return this.snapshot();
    } catch (error) {
      this.phase = "failed";
      throw error;
    }
  }

  private async loadProjects(): Promise<number> {
    const manifest = JSON.parse((await readFile(this.manifestPath, "utf8")).replace(/^\uFEFF/, ""));
    const hubRoot = dirname(this.manifestPath);
    let count = 0;
    for (const value of Array.isArray(manifest.projects) ? manifest.projects : []) {
      const id = typeof value.id === "string" ? value.id : "";
      if (!id) continue;
      const project: CampaignProjectDefinition = {
        id,
        role: typeof value.role === "string" ? value.role : "Research campaign",
        root: resolve(hubRoot, value.path),
        managed: Boolean(value.local_agent_coordinator || value.mac_agent_coordinator),
        localCoordinator: typeof value.local_agent_coordinator === "string" ? value.local_agent_coordinator : "",
      };
      this.port.registerProject(project);
      this.database.query(`
        INSERT INTO campaign_projects(project_id, role, root_path, updated_at)
        VALUES ($id, $role, $root, $now)
        ON CONFLICT(project_id) DO UPDATE SET role = excluded.role, root_path = excluded.root_path
      `).run({ $id: id, $role: project.role, $root: project.root, $now: this.clock() });
      if (!this.registeredProjectIds.has(project.id)) {
        this.port.ensureStrategyFoundation(project.id);
        this.registeredProjectIds.add(project.id);
      }
      count += 1;
    }
    return count;
  }
}
