import { Database } from "bun:sqlite";

interface SchemaMigration {
  version: number;
  name: string;
  up(database: Database): void;
}

export interface CampaignSchemaMigrationResult {
  fromVersion: number;
  toVersion: number;
  appliedVersions: number[];
}

export const LATEST_CAMPAIGN_SCHEMA_VERSION = 5;

function tableExists(database: Database, table: string): boolean {
  const row = database.query("SELECT 1 AS present FROM sqlite_master WHERE type = 'table' AND name = $table")
    .get({ $table: table }) as { present: number } | null;
  return Boolean(row?.present);
}

function columns(database: Database, table: string): Set<string> {
  return new Set((database.query(`PRAGMA table_info(${table})`).all() as Array<{ name: string }>).map((column) => column.name));
}

function ensureTextColumn(database: Database, table: string, column: string, defaultSql: string): void {
  if (!columns(database, table).has(column)) {
    database.run(`ALTER TABLE ${table} ADD COLUMN ${column} TEXT NOT NULL DEFAULT ${defaultSql}`);
  }
}

function ensureColumn(database: Database, table: string, column: string, declaration: string): void {
  if (!columns(database, table).has(column)) database.run(`ALTER TABLE ${table} ADD COLUMN ${column} ${declaration}`);
}

function createBaseline(database: Database): void {
  database.run(`CREATE TABLE IF NOT EXISTS campaign_projects (
    project_id TEXT PRIMARY KEY, role TEXT NOT NULL, root_path TEXT NOT NULL,
    automation_mode TEXT NOT NULL DEFAULT 'prepare', dispatch_profile TEXT NOT NULL DEFAULT 'sonnet-worker',
    current_phase TEXT NOT NULL DEFAULT 'PLANNING', version INTEGER NOT NULL DEFAULT 1, updated_at TEXT NOT NULL
  )`);
  ensureTextColumn(database, "campaign_projects", "dispatch_profile", "'sonnet-worker'");

  database.run(`CREATE TABLE IF NOT EXISTS campaign_project_activity (
    project_id TEXT PRIMARY KEY, observed_phase TEXT NOT NULL, active_count INTEGER NOT NULL,
    running_count INTEGER NOT NULL, terminal_count INTEGER NOT NULL, summary_json TEXT NOT NULL, observed_at TEXT NOT NULL
  )`);
  database.run(`CREATE TABLE IF NOT EXISTS campaign_coordinators (
    project_id TEXT PRIMARY KEY, thread_id TEXT NOT NULL, source_thread_id TEXT NOT NULL DEFAULT '',
    thread_name TEXT NOT NULL, thread_cwd TEXT NOT NULL DEFAULT '', model TEXT NOT NULL, effort TEXT NOT NULL,
    status TEXT NOT NULL, last_turn_id TEXT NOT NULL, last_event_at TEXT NOT NULL, attached_at TEXT NOT NULL
  )`);
  ensureTextColumn(database, "campaign_coordinators", "thread_cwd", "''");
  if (!columns(database, "campaign_coordinators").has("source_thread_id")) {
    database.run("ALTER TABLE campaign_coordinators ADD COLUMN source_thread_id TEXT NOT NULL DEFAULT ''");
    database.run("UPDATE campaign_coordinators SET source_thread_id = thread_id WHERE source_thread_id = ''");
  }

  database.run(`CREATE TABLE IF NOT EXISTS campaign_waves (
    wave_id TEXT PRIMARY KEY, project_id TEXT NOT NULL, label TEXT NOT NULL, phase TEXT NOT NULL,
    lane_ids_json TEXT NOT NULL, evidence_digest TEXT NOT NULL, bundle_path TEXT NOT NULL,
    synthesis_turn_id TEXT NOT NULL DEFAULT '', created_at TEXT NOT NULL, updated_at TEXT NOT NULL
  )`);
  database.run("CREATE INDEX IF NOT EXISTS campaign_waves_project ON campaign_waves(project_id, created_at DESC)");
  database.run(`CREATE TABLE IF NOT EXISTS campaign_wave_lanes (
    wave_id TEXT NOT NULL, lane_id TEXT NOT NULL, accounting_state TEXT NOT NULL,
    disposition TEXT NOT NULL DEFAULT '', reason TEXT NOT NULL DEFAULT '', snapshot_json TEXT NOT NULL,
    updated_at TEXT NOT NULL, PRIMARY KEY(wave_id, lane_id)
  )`);
  database.run(`CREATE TABLE IF NOT EXISTS campaign_context_sources (
    project_id TEXT NOT NULL, source_id TEXT NOT NULL, role TEXT NOT NULL, path TEXT NOT NULL,
    sha256 TEXT NOT NULL, bytes INTEGER NOT NULL, modified_at TEXT NOT NULL, content TEXT NOT NULL,
    observed_at TEXT NOT NULL, PRIMARY KEY(project_id, source_id)
  )`);
  database.run(`CREATE TABLE IF NOT EXISTS campaign_syntheses (
    wave_id TEXT PRIMARY KEY, thread_id TEXT NOT NULL, turn_id TEXT NOT NULL, status TEXT NOT NULL,
    response_json TEXT NOT NULL, created_at TEXT NOT NULL, updated_at TEXT NOT NULL
  )`);
  database.run(`CREATE TABLE IF NOT EXISTS campaign_wave_triages (
    wave_id TEXT PRIMARY KEY, project_id TEXT NOT NULL, thread_id TEXT NOT NULL, turn_id TEXT NOT NULL,
    status TEXT NOT NULL, bundle_path TEXT NOT NULL, evidence_digest TEXT NOT NULL,
    response_json TEXT NOT NULL, created_at TEXT NOT NULL, updated_at TEXT NOT NULL
  )`);
  database.run(`CREATE TABLE IF NOT EXISTS campaign_actions (
    action_id TEXT PRIMARY KEY, project_id TEXT NOT NULL, action_type TEXT NOT NULL, target_id TEXT NOT NULL,
    idempotency_key TEXT NOT NULL UNIQUE, expected_version INTEGER NOT NULL, status TEXT NOT NULL,
    args_json TEXT NOT NULL, result_json TEXT NOT NULL, error TEXT NOT NULL, created_by TEXT NOT NULL,
    created_at TEXT NOT NULL, started_at TEXT NOT NULL, completed_at TEXT NOT NULL
  )`);
  database.run("CREATE INDEX IF NOT EXISTS campaign_actions_project ON campaign_actions(project_id, created_at DESC)");
  database.run(`CREATE TABLE IF NOT EXISTS campaign_events (
    event_id TEXT PRIMARY KEY, project_id TEXT NOT NULL, aggregate_type TEXT NOT NULL,
    aggregate_id TEXT NOT NULL, event_type TEXT NOT NULL, payload_json TEXT NOT NULL, created_at TEXT NOT NULL
  )`);
  database.run(`CREATE TABLE IF NOT EXISTS codex_approvals (
    request_id TEXT PRIMARY KEY, rpc_id_json TEXT NOT NULL, project_id TEXT NOT NULL, thread_id TEXT NOT NULL,
    turn_id TEXT NOT NULL, method TEXT NOT NULL, params_json TEXT NOT NULL, created_at TEXT NOT NULL
  )`);
  database.run(`CREATE TABLE IF NOT EXISTS campaign_decisions (
    decision_id TEXT PRIMARY KEY, project_id TEXT NOT NULL, wave_id TEXT NOT NULL, decision TEXT NOT NULL,
    note TEXT NOT NULL, actor TEXT NOT NULL, created_at TEXT NOT NULL
  )`);
  database.run(`CREATE TABLE IF NOT EXISTS campaign_research_requests (
    request_id TEXT PRIMARY KEY, project_id TEXT NOT NULL, wave_id TEXT NOT NULL, question TEXT NOT NULL,
    status TEXT NOT NULL, created_at TEXT NOT NULL, updated_at TEXT NOT NULL
  )`);
  database.run(`CREATE TABLE IF NOT EXISTS campaign_research_plans (
    wave_id TEXT PRIMARY KEY, project_id TEXT NOT NULL, thread_id TEXT NOT NULL, turn_id TEXT NOT NULL,
    status TEXT NOT NULL, bundle_path TEXT NOT NULL, evidence_digest TEXT NOT NULL,
    response_json TEXT NOT NULL, created_at TEXT NOT NULL, updated_at TEXT NOT NULL
  )`);
  database.run(`CREATE TABLE IF NOT EXISTS campaign_wave_schedules (
    schedule_id TEXT PRIMARY KEY, project_id TEXT NOT NULL, wave_id TEXT NOT NULL, schedule_digest TEXT NOT NULL,
    plan_digest TEXT NOT NULL, resource_digest TEXT NOT NULL, status TEXT NOT NULL, proposal_json TEXT NOT NULL,
    created_by TEXT NOT NULL, confirmed_by TEXT NOT NULL DEFAULT '', created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL, confirmed_at TEXT NOT NULL DEFAULT '', completed_at TEXT NOT NULL DEFAULT ''
  )`);
  database.run("CREATE INDEX IF NOT EXISTS campaign_wave_schedules_project ON campaign_wave_schedules(project_id, wave_id, created_at DESC)");
  database.run(`CREATE TABLE IF NOT EXISTS campaign_wave_schedule_members (
    schedule_id TEXT NOT NULL, request_id TEXT NOT NULL, task_id TEXT NOT NULL, ordinal INTEGER NOT NULL,
    status TEXT NOT NULL, token_cap INTEGER NOT NULL, launch_spec_json TEXT NOT NULL, member_json TEXT NOT NULL,
    run_id TEXT NOT NULL DEFAULT '', error TEXT NOT NULL DEFAULT '', updated_at TEXT NOT NULL,
    PRIMARY KEY(schedule_id, request_id), UNIQUE(schedule_id, task_id)
  )`);
  database.run("CREATE INDEX IF NOT EXISTS campaign_wave_schedule_members_status ON campaign_wave_schedule_members(schedule_id, status, ordinal)");
  database.run(`CREATE TABLE IF NOT EXISTS campaign_research_runs (
    run_id TEXT PRIMARY KEY, request_id TEXT NOT NULL, project_id TEXT NOT NULL, wave_id TEXT NOT NULL,
    task_id TEXT NOT NULL, status TEXT NOT NULL, profile TEXT NOT NULL, host TEXT NOT NULL, model TEXT NOT NULL,
    effort TEXT NOT NULL, fanout INTEGER NOT NULL, packet_path TEXT NOT NULL, base_ref TEXT NOT NULL,
    lane_id TEXT NOT NULL, job_id TEXT NOT NULL, worktree TEXT NOT NULL, evidence_path TEXT NOT NULL,
    evidence_sha256 TEXT NOT NULL, evidence_json TEXT NOT NULL DEFAULT '{}', error TEXT NOT NULL,
    measured_tokens INTEGER, measured_wall_seconds REAL NOT NULL DEFAULT 0,
    measurement_source TEXT NOT NULL DEFAULT '', measurement_at TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL, updated_at TEXT NOT NULL, completed_at TEXT NOT NULL
  )`);
  ensureTextColumn(database, "campaign_research_runs", "evidence_json", "'{}'");
  database.run("CREATE UNIQUE INDEX IF NOT EXISTS campaign_research_runs_request ON campaign_research_runs(request_id)");
  database.run("CREATE INDEX IF NOT EXISTS campaign_research_runs_project ON campaign_research_runs(project_id, created_at DESC)");
  database.run(`CREATE TABLE IF NOT EXISTS campaign_loop_runs (
    loop_id TEXT PRIMARY KEY, project_id TEXT NOT NULL, status TEXT NOT NULL, start_phase TEXT NOT NULL,
    end_phase TEXT NOT NULL DEFAULT '', start_json TEXT NOT NULL, end_json TEXT NOT NULL DEFAULT '{}',
    steps_json TEXT NOT NULL DEFAULT '[]', pending_action_id TEXT NOT NULL DEFAULT '',
    halt_after_step INTEGER NOT NULL DEFAULT 0, decision_crossed INTEGER NOT NULL DEFAULT 0,
    error TEXT NOT NULL DEFAULT '', created_by TEXT NOT NULL, created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL, completed_at TEXT NOT NULL DEFAULT ''
  )`);
  database.run("CREATE INDEX IF NOT EXISTS campaign_loop_runs_project ON campaign_loop_runs(project_id, created_at DESC)");
  database.run(`CREATE TABLE IF NOT EXISTS campaign_redirect_inputs (
    input_id TEXT PRIMARY KEY, project_id TEXT NOT NULL, wave_id TEXT NOT NULL, title TEXT NOT NULL,
    content TEXT NOT NULL, source_url TEXT NOT NULL DEFAULT '', input_digest TEXT NOT NULL, status TEXT NOT NULL,
    thread_id TEXT NOT NULL DEFAULT '', turn_id TEXT NOT NULL DEFAULT '', bundle_path TEXT NOT NULL DEFAULT '',
    response_json TEXT NOT NULL DEFAULT '{}', error TEXT NOT NULL DEFAULT '', created_by TEXT NOT NULL,
    created_at TEXT NOT NULL, updated_at TEXT NOT NULL, applied_at TEXT NOT NULL DEFAULT ''
  )`);
  database.run("CREATE INDEX IF NOT EXISTS campaign_redirect_inputs_project ON campaign_redirect_inputs(project_id, created_at DESC)");
  database.run(`CREATE TABLE IF NOT EXISTS campaign_strategy_charters (
    project_id TEXT PRIMARY KEY, revision INTEGER NOT NULL, charter_json TEXT NOT NULL,
    created_at TEXT NOT NULL, updated_at TEXT NOT NULL
  )`);
  database.run(`CREATE TABLE IF NOT EXISTS campaign_strategy_charter_revisions (
    project_id TEXT NOT NULL, revision INTEGER NOT NULL, charter_json TEXT NOT NULL,
    proposal_id TEXT NOT NULL DEFAULT '', actor TEXT NOT NULL, created_at TEXT NOT NULL,
    PRIMARY KEY(project_id, revision)
  )`);
  database.run(`CREATE TABLE IF NOT EXISTS campaign_strategy_epochs (
    epoch_id TEXT PRIMARY KEY, project_id TEXT NOT NULL, label TEXT NOT NULL, status TEXT NOT NULL,
    charter_revision INTEGER NOT NULL, start_json TEXT NOT NULL, end_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL, updated_at TEXT NOT NULL, completed_at TEXT NOT NULL DEFAULT ''
  )`);
  database.run("CREATE INDEX IF NOT EXISTS campaign_strategy_epochs_project ON campaign_strategy_epochs(project_id, created_at DESC)");
  database.run(`CREATE TABLE IF NOT EXISTS campaign_strategy_snapshots (
    snapshot_id TEXT PRIMARY KEY, project_id TEXT NOT NULL, epoch_id TEXT NOT NULL, wave_id TEXT NOT NULL,
    kind TEXT NOT NULL, metrics_json TEXT NOT NULL, cost_json TEXT NOT NULL, drift_json TEXT NOT NULL,
    created_at TEXT NOT NULL
  )`);
  database.run("CREATE INDEX IF NOT EXISTS campaign_strategy_snapshots_project ON campaign_strategy_snapshots(project_id, created_at DESC)");
  database.run("DROP INDEX IF EXISTS campaign_strategy_snapshots_boundary");
  database.run("CREATE UNIQUE INDEX IF NOT EXISTS campaign_strategy_snapshots_boundary ON campaign_strategy_snapshots(project_id, epoch_id, wave_id, kind)");
  database.run(`CREATE TABLE IF NOT EXISTS campaign_strategy_reviews (
    review_id TEXT PRIMARY KEY, project_id TEXT NOT NULL, epoch_id TEXT NOT NULL, base_revision INTEGER NOT NULL,
    trigger_kind TEXT NOT NULL, trigger_reason TEXT NOT NULL, status TEXT NOT NULL, thread_id TEXT NOT NULL DEFAULT '',
    review_kind TEXT NOT NULL DEFAULT '', request_source TEXT NOT NULL DEFAULT '',
    request_reference TEXT NOT NULL DEFAULT '', resource_cap INTEGER NOT NULL DEFAULT 0,
    turn_id TEXT NOT NULL DEFAULT '', bundle_path TEXT NOT NULL DEFAULT '', bundle_digest TEXT NOT NULL DEFAULT '',
    response_json TEXT NOT NULL DEFAULT '{}', error TEXT NOT NULL DEFAULT '', created_by TEXT NOT NULL,
    created_at TEXT NOT NULL, updated_at TEXT NOT NULL, completed_at TEXT NOT NULL DEFAULT '',
    activated_at TEXT NOT NULL DEFAULT ''
  )`);
  database.run("CREATE INDEX IF NOT EXISTS campaign_strategy_reviews_project ON campaign_strategy_reviews(project_id, created_at DESC)");
  database.run(`CREATE TABLE IF NOT EXISTS campaign_custody_items (
    item_id TEXT PRIMARY KEY, project_id TEXT NOT NULL, source_type TEXT NOT NULL, source_id TEXT NOT NULL,
    fingerprint TEXT NOT NULL, task TEXT NOT NULL, reason TEXT NOT NULL, urgency TEXT NOT NULL,
    blocks_research INTEGER NOT NULL DEFAULT 0, strategic_track TEXT NOT NULL, capability TEXT NOT NULL,
    repair_generation INTEGER NOT NULL DEFAULT 0, effort_class TEXT NOT NULL, acceptance_json TEXT NOT NULL,
    status TEXT NOT NULL, assigned_actor TEXT NOT NULL DEFAULT '', receipt_json TEXT NOT NULL DEFAULT '{}',
    created_by TEXT NOT NULL, created_at TEXT NOT NULL, updated_at TEXT NOT NULL,
    completed_at TEXT NOT NULL DEFAULT ''
  )`);
  database.run("CREATE UNIQUE INDEX IF NOT EXISTS campaign_custody_items_fingerprint ON campaign_custody_items(project_id, fingerprint)");
  database.run("CREATE INDEX IF NOT EXISTS campaign_custody_items_project ON campaign_custody_items(project_id, status, created_at DESC)");
  database.run(`CREATE TABLE IF NOT EXISTS campaign_custody_leases (
    lease_id TEXT PRIMARY KEY, item_id TEXT NOT NULL, project_id TEXT NOT NULL, adapter_id TEXT NOT NULL,
    status TEXT NOT NULL, bundle_path TEXT NOT NULL, lease_digest TEXT NOT NULL, lease_json TEXT NOT NULL,
    receipt_json TEXT NOT NULL DEFAULT '{}', receipt_digest TEXT NOT NULL DEFAULT '',
    verification_json TEXT NOT NULL DEFAULT '{}', error TEXT NOT NULL DEFAULT '', issued_by TEXT NOT NULL,
    created_at TEXT NOT NULL, expires_at TEXT NOT NULL, updated_at TEXT NOT NULL,
    completed_at TEXT NOT NULL DEFAULT '', thread_id TEXT NOT NULL DEFAULT '', turn_id TEXT NOT NULL DEFAULT '',
    worktree_path TEXT NOT NULL DEFAULT '', base_commit TEXT NOT NULL DEFAULT '',
    producer_commit TEXT NOT NULL DEFAULT '', started_at TEXT NOT NULL DEFAULT ''
  )`);
  for (const column of ["thread_id", "turn_id", "worktree_path", "base_commit", "producer_commit", "started_at"]) {
    ensureTextColumn(database, "campaign_custody_leases", column, "''");
  }
  database.run("CREATE INDEX IF NOT EXISTS campaign_custody_leases_project ON campaign_custody_leases(project_id, created_at DESC)");
  database.run("DROP INDEX IF EXISTS campaign_custody_leases_open_item");
  database.run("CREATE UNIQUE INDEX IF NOT EXISTS campaign_custody_leases_open_item ON campaign_custody_leases(item_id) WHERE status IN ('prepared', 'confirmed', 'running', 'finalizing', 'awaiting_review', 'simulated')");
  database.run(`CREATE TABLE IF NOT EXISTS campaign_resource_simulations (
    simulation_id TEXT PRIMARY KEY, project_id TEXT NOT NULL, epoch_id TEXT NOT NULL,
    charter_revision INTEGER NOT NULL, input_digest TEXT NOT NULL, input_json TEXT NOT NULL,
    result_json TEXT NOT NULL, created_by TEXT NOT NULL, created_at TEXT NOT NULL
  )`);
  database.run("CREATE INDEX IF NOT EXISTS campaign_resource_simulations_project ON campaign_resource_simulations(project_id, created_at DESC)");
}

function addRecoveryProtocol(database: Database): void {
  database.run(`CREATE TABLE IF NOT EXISTS campaign_recovery_reports (
    report_id TEXT PRIMARY KEY, project_id TEXT NOT NULL, wave_id TEXT NOT NULL, report_digest TEXT NOT NULL,
    status TEXT NOT NULL, report_json TEXT NOT NULL, prepared_by TEXT NOT NULL, decision TEXT NOT NULL DEFAULT '',
    note TEXT NOT NULL DEFAULT '', applied_by TEXT NOT NULL DEFAULT '', created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL, applied_at TEXT NOT NULL DEFAULT ''
  )`);
  database.run("CREATE INDEX IF NOT EXISTS campaign_recovery_reports_project ON campaign_recovery_reports(project_id, created_at DESC)");
}

function addReceiptBoundResourceMeasurements(database: Database): void {
  ensureColumn(database, "campaign_research_runs", "measured_tokens", "INTEGER");
  ensureColumn(database, "campaign_research_runs", "measured_wall_seconds", "REAL NOT NULL DEFAULT 0");
  ensureColumn(database, "campaign_research_runs", "measurement_source", "TEXT NOT NULL DEFAULT ''");
  ensureColumn(database, "campaign_research_runs", "measurement_at", "TEXT NOT NULL DEFAULT ''");
}

function addStrategyReviewRequestProvenance(database: Database): void {
  ensureColumn(database, "campaign_strategy_reviews", "review_kind", "TEXT NOT NULL DEFAULT ''");
  ensureColumn(database, "campaign_strategy_reviews", "request_source", "TEXT NOT NULL DEFAULT ''");
  ensureColumn(database, "campaign_strategy_reviews", "request_reference", "TEXT NOT NULL DEFAULT ''");
  ensureColumn(database, "campaign_strategy_reviews", "resource_cap", "INTEGER NOT NULL DEFAULT 0");
}

const MIGRATIONS: SchemaMigration[] = [
  { version: 1, name: "campaign-baseline", up: createBaseline },
  { version: 2, name: "digest-bound-recovery", up: addRecoveryProtocol },
  { version: 3, name: "receipt-bound-resource-measurements", up: addReceiptBoundResourceMeasurements },
  { version: 4, name: "strategy-review-request-provenance", up: addStrategyReviewRequestProvenance },
  { version: 5, name: "redirect-application-scope", up: database => ensureColumn(database, "campaign_redirect_inputs", "application_mode", "TEXT NOT NULL DEFAULT ''") },
];

/** Owns the campaign schema and upgrades every pending version in one transaction. */
export class CampaignSchemaMigrationService {
  constructor(
    private readonly database: Database,
    private readonly clock: () => string = () => new Date().toISOString(),
  ) {}

  migrate(): CampaignSchemaMigrationResult {
    const applied = tableExists(this.database, "campaign_schema_migrations")
      ? this.database.query("SELECT version, name FROM campaign_schema_migrations ORDER BY version").all() as Array<{ version: number; name: string }>
      : [];
    for (let index = 0; index < applied.length; index += 1) {
      const expected = MIGRATIONS[index];
      const actual = applied[index];
      if (!expected || actual.version !== expected.version || actual.name !== expected.name) {
        throw new Error(`Unknown or non-contiguous campaign schema migration at version ${actual.version}`);
      }
    }
    const fromVersion = applied.at(-1)?.version ?? 0;
    if (fromVersion > LATEST_CAMPAIGN_SCHEMA_VERSION) {
      throw new Error(`Campaign database schema ${fromVersion} is newer than supported version ${LATEST_CAMPAIGN_SCHEMA_VERSION}`);
    }
    const pending = MIGRATIONS.filter((migration) => migration.version > fromVersion);
    if (!pending.length) return { fromVersion, toVersion: fromVersion, appliedVersions: [] };

    this.database.transaction(() => {
      this.database.run(`CREATE TABLE IF NOT EXISTS campaign_schema_migrations (
        version INTEGER PRIMARY KEY, name TEXT NOT NULL UNIQUE, applied_at TEXT NOT NULL
      )`);
      for (const migration of pending) {
        migration.up(this.database);
        this.database.query("INSERT INTO campaign_schema_migrations(version, name, applied_at) VALUES ($version, $name, $appliedAt)")
          .run({ $version: migration.version, $name: migration.name, $appliedAt: this.clock() });
      }
    })();
    return {
      fromVersion,
      toVersion: pending.at(-1)?.version ?? fromVersion,
      appliedVersions: pending.map((migration) => migration.version),
    };
  }
}
