import { describe, expect, test } from "bun:test";
import { Database } from "bun:sqlite";
import {
  CampaignSchemaMigrationService,
  LATEST_CAMPAIGN_SCHEMA_VERSION,
} from "../src/campaign-schema-migration-service";

function columnNames(database: Database, table: string): string[] {
  return (database.query(`PRAGMA table_info(${table})`).all() as Array<{ name: string }>).map((column) => column.name);
}

function tableExists(database: Database, table: string): boolean {
  return Boolean(database.query("SELECT 1 AS present FROM sqlite_master WHERE type = 'table' AND name = $table")
    .get({ $table: table }));
}

describe("CampaignSchemaMigrationService", () => {
  test("creates and versions a fresh campaign database idempotently", () => {
    const database = new Database(":memory:");
    const service = new CampaignSchemaMigrationService(database, () => "2026-08-30T14:00:00.000Z");

    expect(service.migrate()).toEqual({ fromVersion: 0, toVersion: 6, appliedVersions: [1, 2, 3, 4, 5, 6] });
    expect(LATEST_CAMPAIGN_SCHEMA_VERSION).toBe(6);
    expect(columnNames(database, "campaign_projects")).toContain("dispatch_profile");
    expect(columnNames(database, "campaign_recovery_reports")).toContain("report_digest");
    expect(database.query("SELECT version, name, applied_at FROM campaign_schema_migrations ORDER BY version").all()).toEqual([
      { version: 1, name: "campaign-baseline", applied_at: "2026-08-30T14:00:00.000Z" },
      { version: 2, name: "digest-bound-recovery", applied_at: "2026-08-30T14:00:00.000Z" },
      { version: 3, name: "receipt-bound-resource-measurements", applied_at: "2026-08-30T14:00:00.000Z" },
      { version: 4, name: "strategy-review-request-provenance", applied_at: "2026-08-30T14:00:00.000Z" },
      { version: 5, name: "redirect-application-scope", applied_at: "2026-08-30T14:00:00.000Z" },
      { version: 6, name: "durable-research-launch-intent", applied_at: "2026-08-30T14:00:00.000Z" },
    ]);
    expect(columnNames(database, "campaign_research_runs")).toEqual(expect.arrayContaining([
      "measured_tokens", "measured_wall_seconds", "measurement_source", "measurement_at",
    ]));
    expect(columnNames(database, "campaign_strategy_reviews")).toEqual(expect.arrayContaining([
      "review_kind", "request_source", "request_reference", "resource_cap",
    ]));
    expect(columnNames(database, "campaign_redirect_inputs")).toContain("application_mode");
    expect(service.migrate()).toEqual({ fromVersion: 6, toVersion: 6, appliedVersions: [] });
  });

  test("upgrades representative unversioned legacy shapes without losing provenance", () => {
    const database = new Database(":memory:");
    database.run(`CREATE TABLE campaign_projects (
      project_id TEXT PRIMARY KEY, role TEXT NOT NULL, root_path TEXT NOT NULL,
      automation_mode TEXT NOT NULL DEFAULT 'prepare', current_phase TEXT NOT NULL DEFAULT 'PLANNING',
      version INTEGER NOT NULL DEFAULT 1, updated_at TEXT NOT NULL
    )`);
    database.run("INSERT INTO campaign_projects VALUES ('demo', 'legacy role', 'C:/legacy', 'observe', 'BLOCKED', 7, 'old')");
    database.run(`CREATE TABLE campaign_coordinators (
      project_id TEXT PRIMARY KEY, thread_id TEXT NOT NULL, thread_name TEXT NOT NULL,
      model TEXT NOT NULL, effort TEXT NOT NULL, status TEXT NOT NULL, last_turn_id TEXT NOT NULL,
      last_event_at TEXT NOT NULL, attached_at TEXT NOT NULL
    )`);
    database.run("INSERT INTO campaign_coordinators VALUES ('demo', 'thread-legacy', 'Legacy coordinator', 'sol', 'high', 'idle', '', 'old', 'old')");
    database.run(`CREATE TABLE campaign_research_runs (
      run_id TEXT PRIMARY KEY, request_id TEXT NOT NULL, project_id TEXT NOT NULL, wave_id TEXT NOT NULL,
      task_id TEXT NOT NULL, status TEXT NOT NULL, profile TEXT NOT NULL, host TEXT NOT NULL, model TEXT NOT NULL,
      effort TEXT NOT NULL, fanout INTEGER NOT NULL, packet_path TEXT NOT NULL, base_ref TEXT NOT NULL,
      lane_id TEXT NOT NULL, job_id TEXT NOT NULL, worktree TEXT NOT NULL, evidence_path TEXT NOT NULL,
      evidence_sha256 TEXT NOT NULL, error TEXT NOT NULL, created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL, completed_at TEXT NOT NULL
    )`);
    database.run(`CREATE TABLE campaign_custody_leases (
      lease_id TEXT PRIMARY KEY, item_id TEXT NOT NULL, project_id TEXT NOT NULL, adapter_id TEXT NOT NULL,
      status TEXT NOT NULL, bundle_path TEXT NOT NULL, lease_digest TEXT NOT NULL, lease_json TEXT NOT NULL,
      receipt_json TEXT NOT NULL DEFAULT '{}', receipt_digest TEXT NOT NULL DEFAULT '',
      verification_json TEXT NOT NULL DEFAULT '{}', error TEXT NOT NULL DEFAULT '', issued_by TEXT NOT NULL,
      created_at TEXT NOT NULL, expires_at TEXT NOT NULL, updated_at TEXT NOT NULL,
      completed_at TEXT NOT NULL DEFAULT ''
    )`);
    database.run(`INSERT INTO campaign_research_runs VALUES (
      'legacy-run', 'legacy-request', 'demo', 'wave-legacy', 'legacy-task', 'returned_to_sol',
      'research-opus-max', 'windows', 'opus', 'max', 0, '', '', 'legacy-lane', 'legacy-job', '', '',
      'sha256:legacy', '', 'old', 'old', 'old'
    )`);

    new CampaignSchemaMigrationService(database).migrate();

    expect(database.query("SELECT project_id, role, dispatch_profile, version FROM campaign_projects").get()).toEqual({
      project_id: "demo", role: "legacy role", dispatch_profile: "sonnet-worker", version: 7,
    });
    expect(database.query("SELECT thread_id, source_thread_id, thread_cwd FROM campaign_coordinators").get()).toEqual({
      thread_id: "thread-legacy", source_thread_id: "thread-legacy", thread_cwd: "",
    });
    expect(columnNames(database, "campaign_research_runs")).toContain("evidence_json");
    expect(database.query(`
      SELECT measured_tokens, measured_wall_seconds, measurement_source, measurement_at
      FROM campaign_research_runs WHERE run_id = 'legacy-run'
    `).get()).toEqual({ measured_tokens: null, measured_wall_seconds: 0, measurement_source: "", measurement_at: "" });
    expect(columnNames(database, "campaign_custody_leases")).toEqual(expect.arrayContaining([
      "thread_id", "turn_id", "worktree_path", "base_commit", "producer_commit", "started_at",
    ]));
    expect(tableExists(database, "campaign_recovery_reports")).toBe(true);
  });

  test("rolls back the entire pending batch when a legacy shape cannot be upgraded", () => {
    const database = new Database(":memory:");
    database.run("CREATE TABLE campaign_research_runs (run_id TEXT PRIMARY KEY)");
    const service = new CampaignSchemaMigrationService(database);

    expect(() => service.migrate()).toThrow();
    expect(tableExists(database, "campaign_schema_migrations")).toBe(false);
    expect(tableExists(database, "campaign_projects")).toBe(false);
    expect(columnNames(database, "campaign_research_runs")).toEqual(["run_id"]);
  });

  test("refuses an unknown or non-contiguous migration ledger", () => {
    const database = new Database(":memory:");
    database.run(`CREATE TABLE campaign_schema_migrations (
      version INTEGER PRIMARY KEY, name TEXT NOT NULL UNIQUE, applied_at TEXT NOT NULL
    )`);
    database.run("INSERT INTO campaign_schema_migrations VALUES (3, 'future-schema', 'future')");

    expect(() => new CampaignSchemaMigrationService(database).migrate())
      .toThrow("Unknown or non-contiguous campaign schema migration at version 3");
  });
});
