import type { CampaignControl } from "./campaign";
import { CampaignReadRepository } from "./campaign-read-repository";
import { projectCampaignProjection, type CampaignControlProjection, type WorkflowHistoryPage } from "./projections";

export class CampaignReadService {
  private readonly repository: CampaignReadRepository;

  constructor(private readonly control: CampaignControl, dataDir: string) {
    this.repository = new CampaignReadRepository(dataDir);
  }

  fullSnapshot(): Record<string, any> {
    return this.control.snapshot() as Record<string, any>;
  }

  compactSnapshot(projectId: string): CampaignControlProjection {
    const index = this.control.indexSnapshot() as Record<string, any>;
    if (!projectId) return projectCampaignProjection(index, "", index);
    const selected = this.control.snapshot({ projectId, historyLimit: 24, evidenceMode: "summary" }) as Record<string, any>;
    const projected = projectCampaignProjection(selected, projectId, index);
    const history = this.repository.workflowHistorySummary(projectId);
    const project = projected.projects[0];
    if (project && history) project.workflowHistorySummary = {
      total: history.total,
      returned: Array.isArray(project.workflowHistory) ? project.workflowHistory.length : 0,
      detailAvailable: history.total > (Array.isArray(project.workflowHistory) ? project.workflowHistory.length : 0),
      newestAt: history.newestAt,
    };
    return projected;
  }

  researchRun(projectId: string, runId: string): Record<string, any> | null {
    const project = (this.control.snapshot({ projectId, historyLimit: 1, evidenceMode: "summary" }) as Record<string, any>).projects?.[0];
    const run = (Array.isArray(project?.researchRuns) ? project.researchRuns : []).find((candidate: Record<string, any>) => candidate.id === runId);
    const evidence = this.repository.researchEvidence(projectId, runId);
    return run && evidence ? { ...run, evidence } : null;
  }

  workflowHistory(projectId: string, cursor = "", limit = 100): WorkflowHistoryPage | null {
    return this.repository.workflowHistory(projectId, cursor, limit);
  }

  programHistory(projectId: string): Record<string, any> | null {
    return this.repository.programHistory(projectId);
  }

  stop(): void {
    this.repository.stop();
  }
}
