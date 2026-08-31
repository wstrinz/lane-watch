import { Database } from "bun:sqlite";
import { join } from "node:path";
import { WORKFLOW_HISTORY_PAGE_SCHEMA, type WorkflowHistoryPage } from "./projections";
import { deriveProgramHistory } from "./program-history";

function parseJson<T>(value: string, fallback: T): T {
  try { return JSON.parse(value) as T; } catch { return fallback; }
}

export class CampaignReadRepository {
  private readonly database: Database;

  constructor(dataDir: string) {
    this.database = new Database(join(dataDir, "observer.sqlite"), { readonly: true });
  }

  workflowHistorySummary(projectId: string): { total: number; newestAt: string } | null {
    const project = this.database.query("SELECT version FROM campaign_projects WHERE project_id = $project").get({ $project: projectId }) as { version: number } | null;
    if (!project) return null;
    const count = this.database.query("SELECT COUNT(*) AS total, COALESCE(MAX(created_at), '') AS newest_at FROM campaign_events WHERE project_id = $project")
      .get({ $project: projectId }) as { total: number; newest_at: string };
    return { total: Number(count.total || 0), newestAt: count.newest_at || "" };
  }

  workflowHistory(projectId: string, cursor = "", requestedLimit = 100): WorkflowHistoryPage | null {
    const project = this.database.query("SELECT version FROM campaign_projects WHERE project_id = $project").get({ $project: projectId }) as { version: number } | null;
    if (!project) return null;
    const total = Number((this.database.query("SELECT COUNT(*) AS total FROM campaign_events WHERE project_id = $project").get({ $project: projectId }) as { total: number }).total || 0);
    const parsedCursor = cursor === "" ? total : Number(cursor);
    const end = Number.isSafeInteger(parsedCursor) && parsedCursor >= 0 && parsedCursor <= total ? parsedCursor : total;
    const limit = Math.max(1, Math.min(500, Math.floor(Number(requestedLimit) || 100)));
    const start = Math.max(0, end - limit);
    const rows = this.database.query(`
      SELECT event_id, aggregate_type, aggregate_id, event_type, payload_json, created_at
      FROM campaign_events WHERE project_id = $project
      ORDER BY created_at ASC, event_id ASC LIMIT $limit OFFSET $offset
    `).all({ $project: projectId, $limit: end - start, $offset: start }) as Array<Record<string, string>>;
    const items = rows.map((event) => ({
      id: event.event_id,
      aggregateType: event.aggregate_type,
      aggregateId: event.aggregate_id,
      type: event.event_type,
      payload: parseJson(event.payload_json, {}),
      createdAt: event.created_at,
    }));
    return {
      schema: WORKFLOW_HISTORY_PAGE_SCHEMA,
      projectId,
      projectVersion: project.version,
      total,
      returned: items.length,
      nextCursor: start > 0 ? String(start) : null,
      items,
    };
  }

  programHistory(projectId: string): Record<string, any> | null {
    const project = this.database.query("SELECT version FROM campaign_projects WHERE project_id = $project").get({ $project: projectId }) as { version: number } | null;
    if (!project) return null;
    const all = (table: string, order = "created_at") => this.database.query(`SELECT * FROM ${table} WHERE project_id = $project ORDER BY ${order}`).all({ $project: projectId }) as Array<Record<string, any>>;
    const waves = all("campaign_waves");
    const waveIds = new Set(waves.map((wave) => wave.wave_id));
    const members = this.database.query("SELECT * FROM campaign_wave_lanes ORDER BY updated_at").all() as Array<Record<string, any>>;
    return deriveProgramHistory({
      projectId, projectVersion: project.version,
      epochs: all("campaign_strategy_epochs"), waves,
      runs: all("campaign_research_runs"),
      members: members.filter((member) => waveIds.has(member.wave_id)),
      custody: all("campaign_custody_items"), leases: all("campaign_custody_leases"),
      snapshots: all("campaign_strategy_snapshots"),
    });
  }

  researchEvidence(projectId: string, runId: string): Record<string, any> | null {
    const row = this.database.query("SELECT evidence_json FROM campaign_research_runs WHERE project_id = $project AND run_id = $run")
      .get({ $project: projectId, $run: runId }) as { evidence_json: string } | null;
    return row ? parseJson(row.evidence_json, {}) : null;
  }

  stop(): void {
    this.database.close();
  }
}
