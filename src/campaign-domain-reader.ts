import { custodyTokenCap, deriveCustodyServiceState, type CustodyAcceptanceContract, type CustodyCapability, type CustodyStatus, type CustodyUrgency, type CustodyWorkItem } from "./custody";
import type { CustodyExecutionReceipt } from "./custody-executor";
import type { CustodyLeaseEnvelope, CustodyProtocolReceipt } from "./custody-protocol";
import { deriveResourceState, normalizeResourcePolicy, type ResourceCandidate, type ResourceUsage } from "./resources";
import { deriveResourceCalibration } from "./resource-calibration";
import { defaultStrategyCharter, deriveStrategyState, type StrategyWorkItem } from "./strategy";
import type { ObserverSnapshot } from "./types";

interface StrategyCharterRow {
  revision: number;
  charter_json: string;
  updated_at: string;
}

interface StrategyEpochRow {
  epoch_id: string;
  label: string;
  status: string;
  charter_revision: number;
  start_json: string;
  created_at: string;
  updated_at: string;
}

interface StrategySnapshotRow {
  snapshot_id: string;
  wave_id: string;
  kind: string;
  metrics_json: string;
  cost_json: string;
  drift_json: string;
  created_at: string;
}

interface StrategyReviewRow {
  review_id: string;
  epoch_id: string;
  base_revision: number;
  trigger_kind: string;
  trigger_reason: string;
  status: string;
  thread_id: string;
  turn_id: string;
  bundle_path: string;
  bundle_digest: string;
  response_json: string;
  error: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  completed_at: string;
  activated_at: string;
  review_kind: string;
  request_source: string;
  request_reference: string;
  resource_cap: number;
}

interface CustodyItemRow {
  item_id: string;
  project_id: string;
  source_type: string;
  source_id: string;
  task: string;
  reason: string;
  urgency: CustodyUrgency;
  blocks_research: number;
  strategic_track: "coverage" | "supply" | "decision";
  capability: CustodyCapability;
  repair_generation: number;
  effort_class: "small" | "medium";
  acceptance_json: string;
  status: CustodyStatus;
  assigned_actor: string;
  receipt_json: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  completed_at: string;
}

interface CustodyLeaseRow {
  lease_id: string;
  item_id: string;
  adapter_id: string;
  status: string;
  bundle_path: string;
  lease_digest: string;
  lease_json: string;
  receipt_json: string;
  receipt_digest: string;
  verification_json: string;
  error: string;
  issued_by: string;
  created_at: string;
  expires_at: string;
  updated_at: string;
  completed_at: string;
  thread_id: string;
  turn_id: string;
  worktree_path: string;
  base_commit: string;
  producer_commit: string;
  started_at: string;
}

interface ResourceSimulationRow {
  simulation_id: string;
  epoch_id: string;
  charter_revision: number;
  input_digest: string;
  input_json: string;
  result_json: string;
  created_by: string;
  created_at: string;
}

interface ResearchRequestRow {
  request_id: string;
  question: string;
  created_at: string;
}

interface ResearchRunRow {
  run_id: string;
  request_id: string;
  wave_id: string;
  task_id: string;
  status: string;
  lane_id: string;
  job_id: string;
  created_at: string;
  updated_at: string;
  completed_at: string;
  profile?: string;
  evidence_sha256?: string;
  measured_tokens?: number | null;
  measured_wall_seconds?: number;
  measurement_source?: string;
  measurement_at?: string;
}

export interface CampaignDomainReaderPort {
  definition(projectId: string): { role: string };
  observer(): ObserverSnapshot | null;
  queryAll<T>(sql: string, params: Record<string, unknown>): T[];
  queryOne<T>(sql: string, params: Record<string, unknown>): T | null;
  project(projectId: string): { current_phase: string; dispatch_profile: unknown };
  resolveResearchSpec(request: ResearchRequestRow, planResponse: Record<string, any>): any | null;
  researchDependencySatisfied(spec: any, runs: ResearchRunRow[]): boolean;
  inferStrategy(taskId: string, question: string): Record<string, any>;
}

function parseJson<T>(value: string | undefined, fallback: T): T {
  try { return JSON.parse(value || "") as T; } catch { return fallback; }
}

export class CampaignDomainReader {
  constructor(private readonly port: CampaignDomainReaderPort) {}

  strategySnapshot(projectId: string): Record<string, any> {
    const definition = this.port.definition(projectId);
    const charterRow = this.port.queryOne<StrategyCharterRow>(
      "SELECT * FROM campaign_strategy_charters WHERE project_id = $project",
      { $project: projectId },
    )!;
    const charter = parseJson<Record<string, any>>(charterRow.charter_json, defaultStrategyCharter(definition));
    const epoch = this.port.queryOne<StrategyEpochRow>(
      "SELECT * FROM campaign_strategy_epochs WHERE project_id = $project AND status = 'active' ORDER BY created_at DESC LIMIT 1",
      { $project: projectId },
    )!;
    const runs = this.port.queryAll<ResearchRunRow & { question?: string }>(`
      SELECT run.*, request.question AS question
      FROM campaign_research_runs run
      LEFT JOIN campaign_research_requests request ON request.request_id = run.request_id
      WHERE run.project_id = $project AND run.created_at >= $start
      ORDER BY run.created_at
    `, { $project: projectId, $start: epoch.created_at });
    const plans = this.port.queryAll<{ wave_id: string; response_json: string }>(`
      SELECT wave_id, response_json FROM campaign_research_plans
      WHERE project_id = $project AND created_at >= $start
    `, { $project: projectId, $start: epoch.created_at });
    const planByWave = new Map(plans.map((plan) => [plan.wave_id, parseJson<Record<string, any>>(plan.response_json, {})]));
    const observerLanes = this.port.observer()?.lanes.filter((lane) => lane.project === projectId) ?? [];
    const work: StrategyWorkItem[] = runs.map((run) => {
      const liveLane = observerLanes.find((lane) => lane.task === run.task_id || lane.id === run.lane_id || lane.jobId === run.job_id);
      const plan = planByWave.get(run.wave_id);
      const declared = (Array.isArray(plan?.lanes) ? plan.lanes : [])
        .find((lane: any) => lane?.requestId === run.request_id || lane?.taskId === run.task_id)?.strategy;
      const inferred = this.port.inferStrategy(run.task_id, run.question || "");
      const classification = ["coverage", "supply", "decision"].includes(String(declared?.trackId || ""))
        && ["frontier", "experiment", "maintenance", "audit"].includes(String(declared?.workKind || ""))
        ? { trackId: declared.trackId, workKind: declared.workKind, source: "declared" as const }
        : inferred;
      const durableTokens = Number.isFinite(run.measured_tokens) && Number(run.measured_tokens) > 0 ? Number(run.measured_tokens) : null;
      const liveTokens = Number.isFinite(liveLane?.tokens) && Number(liveLane?.tokens) > 0 ? Number(liveLane!.tokens) : null;
      const tokens = durableTokens ?? liveTokens;
      const started = Date.parse(run.created_at);
      const ended = Date.parse(run.completed_at || run.updated_at);
      const measuredWallHours = Number(run.measured_wall_seconds) > 0 ? Number(run.measured_wall_seconds) / 3600 : 0;
      const receiptBound = durableTokens !== null && Boolean(run.evidence_sha256) && Boolean(run.measurement_source);
      return {
        runId: run.run_id,
        waveId: run.wave_id,
        taskId: run.task_id,
        status: run.status,
        question: run.question || "",
        ...classification,
        tokens,
        wallHours: measuredWallHours || (Number.isFinite(started) && Number.isFinite(ended) && ended >= started ? (ended - started) / 3_600_000 : 0),
        createdAt: run.created_at,
        completedAt: run.completed_at,
        profile: run.profile || "",
        evidenceDigest: run.evidence_sha256 || "",
        measurementSource: durableTokens !== null ? run.measurement_source || "" : liveTokens !== null ? "observer-ledger-unbound" : "",
        receiptBound,
        measurementComplete: receiptBound && measuredWallHours > 0,
      } as StrategyWorkItem;
    });
    const frontier = this.port.queryOne<{ path: string; modified_at: string }>(`
      SELECT path, modified_at FROM campaign_context_sources
      WHERE project_id = $project AND (LOWER(role) LIKE '%frontier%' OR LOWER(path) LIKE '%frontier.md%')
      ORDER BY modified_at DESC LIMIT 1
    `, { $project: projectId });
    const snapshots = this.port.queryAll<StrategySnapshotRow>(`
      SELECT * FROM campaign_strategy_snapshots WHERE project_id = $project AND epoch_id = $epoch
      ORDER BY created_at DESC LIMIT 12
    `, { $project: projectId, $epoch: epoch.epoch_id });
    const state = deriveStrategyState({
      charter,
      charterRevision: charterRow.revision,
      charterUpdatedAt: charterRow.updated_at,
      epoch: {
        id: epoch.epoch_id,
        label: epoch.label,
        status: epoch.status,
        charterRevision: epoch.charter_revision,
        start: parseJson(epoch.start_json, {}),
        createdAt: epoch.created_at,
        updatedAt: epoch.updated_at,
      },
      work,
      frontier: frontier ? { path: frontier.path, modifiedAt: frontier.modified_at } : null,
      snapshots: snapshots.map((snapshot) => ({
        id: snapshot.snapshot_id,
        waveId: snapshot.wave_id,
        kind: snapshot.kind,
        metrics: parseJson(snapshot.metrics_json, {}),
        cost: parseJson(snapshot.cost_json, {}),
        drift: parseJson(snapshot.drift_json, {}),
        createdAt: snapshot.created_at,
      })),
    });
    const reviews = this.port.queryAll<StrategyReviewRow>(`
      SELECT * FROM campaign_strategy_reviews WHERE project_id = $project
      ORDER BY created_at DESC LIMIT 8
    `, { $project: projectId });
    const history = this.port.queryAll<{ revision: number; charter_json: string; proposal_id: string; actor: string; created_at: string }>(`
      SELECT revision, charter_json, proposal_id, actor, created_at
      FROM campaign_strategy_charter_revisions WHERE project_id = $project
      ORDER BY revision DESC LIMIT 8
    `, { $project: projectId });
    const reviewSnapshots = reviews.map((review) => ({
      id: review.review_id,
      epochId: review.epoch_id,
      baseRevision: review.base_revision,
      triggerKind: review.trigger_kind,
      triggerReason: review.trigger_reason,
      reviewKind: review.review_kind || "legacy-undifferentiated",
      requestSource: review.request_source || "legacy-undifferentiated",
      requestReference: review.request_reference,
      resourceCap: review.resource_cap,
      status: review.status,
      threadId: review.thread_id,
      turnId: review.turn_id,
      bundlePath: review.bundle_path,
      bundleDigest: review.bundle_digest,
      response: parseJson<Record<string, any>>(review.response_json, {}),
      error: review.error,
      actor: review.created_by,
      createdAt: review.created_at,
      updatedAt: review.updated_at,
      completedAt: review.completed_at,
      activatedAt: review.activated_at,
    }));
    const activeReview = reviewSnapshots.find((review) => ["queued", "drafting", "drafted"].includes(review.status)) || null;
    return {
      ...state,
      workspace: {
        reviewAvailable: !reviews.some((review) => ["queued", "drafting", "drafted"].includes(review.status)),
        activationAvailable: Boolean(activeReview?.status === "drafted"
          && activeReview.baseRevision === charterRow.revision
          && activeReview.response?.recommendation === "ACTIVATE_NEW_EPOCH"),
        activeReview,
        reviews: reviewSnapshots,
        charterHistory: history.map((item) => ({
          revision: item.revision,
          proposalId: item.proposal_id,
          actor: item.actor,
          createdAt: item.created_at,
          charter: parseJson(item.charter_json, {}),
        })),
      },
    };
  }

  custodySnapshot(projectId: string): Record<string, any> {
    const rows = this.port.queryAll<CustodyItemRow>(
      "SELECT * FROM campaign_custody_items WHERE project_id = $project ORDER BY created_at",
      { $project: projectId },
    );
    const items: CustodyWorkItem[] = rows.map((row) => ({
      id: row.item_id,
      projectId: row.project_id,
      sourceType: row.source_type,
      sourceId: row.source_id,
      task: row.task,
      reason: row.reason,
      urgency: row.urgency,
      blocksResearch: Boolean(row.blocks_research),
      strategicTrack: row.strategic_track,
      capability: row.capability,
      repairGeneration: row.repair_generation,
      effortClass: row.effort_class,
      acceptance: parseJson<CustodyAcceptanceContract>(row.acceptance_json, { acceptanceCriteria: [], allowedPaths: [], receiptType: "", stopCondition: "" }),
      status: row.status,
      assignedActor: row.assigned_actor,
      receipt: parseJson<Record<string, any>>(row.receipt_json, {}),
      createdBy: row.created_by,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      completedAt: row.completed_at,
    }));
    const charter = this.port.queryOne<{ charter_json: string }>(
      "SELECT charter_json FROM campaign_strategy_charters WHERE project_id = $project",
      { $project: projectId },
    );
    const policy = parseJson<Record<string, any>>(charter?.charter_json || "{}", {}).maintenancePolicy || {};
    const service = deriveCustodyServiceState(items, Number(policy.maxAutomaticRepairGeneration ?? 1), true);
    const leaseRows = this.port.queryAll<CustodyLeaseRow>(`
      SELECT * FROM campaign_custody_leases WHERE project_id = $project ORDER BY created_at DESC LIMIT 24
    `, { $project: projectId });
    const leases = leaseRows.map((row) => ({
      id: row.lease_id,
      itemId: row.item_id,
      adapterId: row.adapter_id,
      status: row.status,
      bundlePath: row.bundle_path,
      leaseDigest: row.lease_digest,
      lease: parseJson<CustodyLeaseEnvelope | Record<string, never>>(row.lease_json, {}),
      receipt: parseJson<CustodyProtocolReceipt | CustodyExecutionReceipt | Record<string, never>>(row.receipt_json, {}),
      receiptDigest: row.receipt_digest,
      verification: parseJson<Record<string, any>>(row.verification_json, {}),
      error: row.error,
      actor: row.issued_by,
      createdAt: row.created_at,
      expiresAt: row.expires_at,
      updatedAt: row.updated_at,
      completedAt: row.completed_at,
      threadId: row.thread_id,
      turnId: row.turn_id,
      worktreePath: row.worktree_path,
      baseCommit: row.base_commit,
      producerCommit: row.producer_commit,
      startedAt: row.started_at,
    }));
    const activeStatuses = ["prepared", "confirmed", "running", "finalizing", "awaiting_review", "simulated"];
    const activeByItem = new Map(leases.filter((lease) => activeStatuses.includes(lease.status)).map((lease) => [lease.itemId, lease]));
    return {
      ...service,
      items: service.items.map((item: any) => ({ ...item, activeLease: activeByItem.get(item.id) || null })),
      protocol: {
        schema: "campaign-custody-adapter-protocol/v1",
        mode: "bounded-autopilot-execution",
        executorConnected: true,
        leaseVersion: "campaign-custody-lease/v1",
        receiptVersion: "campaign-custody-protocol-receipt/v1",
        invariant: "Only an exact confirmed lease can start one isolated Terra steward; a human or active loop may land only a controller-verified landable receipt, never a claim promotion.",
        counts: {
          prepared: leases.filter((lease) => lease.status === "prepared").length,
          confirmed: leases.filter((lease) => lease.status === "confirmed").length,
          running: leases.filter((lease) => ["running", "finalizing"].includes(lease.status)).length,
          awaitingReview: leases.filter((lease) => lease.status === "awaiting_review").length,
          simulated: leases.filter((lease) => lease.status === "simulated").length,
          verified: leases.filter((lease) => lease.verification?.ok).length,
          completed: leases.filter((lease) => lease.status === "completed").length,
          blocked: leases.filter((lease) => lease.status === "blocked").length,
          failed: leases.filter((lease) => lease.status === "failed").length,
        },
        leases,
      },
    };
  }

  resourceSnapshot(projectId: string): Record<string, any> {
    const project = this.port.project(projectId);
    const strategy = this.strategySnapshot(projectId);
    const custody = this.custodySnapshot(projectId);
    const epochId = String(strategy.epoch?.id || "");
    const epochStart = String(strategy.epoch?.createdAt || "");
    const charterRevision = Number(strategy.charter?.revision || 1);
    const policy = normalizeResourcePolicy(strategy.charter?.resourcePolicy);
    const usage: ResourceUsage[] = (Array.isArray(strategy.work) ? strategy.work : []).map((work: any) => ({
      id: String(work.runId || work.taskId || crypto.randomUUID()),
      layer: "research",
      trackId: ["coverage", "supply", "decision"].includes(String(work.trackId)) ? work.trackId : "shared",
      workKind: ["frontier", "experiment", "maintenance", "audit"].includes(String(work.workKind)) ? work.workKind : "experiment",
      tokens: Number.isFinite(work.tokens) && Number(work.tokens) >= 0 ? Number(work.tokens) : null,
      wallHours: Math.max(0, Number(work.wallHours || 0)),
      status: String(work.status || "unknown"),
      profile: String(work.profile || ""),
      receiptDigest: String(work.evidenceDigest || ""),
      measurementSource: String(work.measurementSource || ""),
      receiptBound: Boolean(work.receiptBound),
      measurementComplete: Boolean(work.measurementComplete),
    }));
    const reviewRows = this.port.queryAll<Record<string, any>>(`
      SELECT review_id, status, created_at, completed_at, updated_at FROM campaign_strategy_reviews
      WHERE project_id = $project AND epoch_id = $epoch AND status != 'queued'
    `, { $project: projectId, $epoch: epochId });
    for (const review of reviewRows) {
      const started = Date.parse(review.created_at);
      const ended = Date.parse(review.completed_at || review.updated_at);
      usage.push({
        id: review.review_id,
        layer: "strategy",
        trackId: "shared",
        workKind: "coordination",
        tokens: null,
        wallHours: Number.isFinite(started) && Number.isFinite(ended) && ended >= started ? (ended - started) / 3_600_000 : 0,
        status: review.status,
        receiptBound: false,
        measurementComplete: false,
      });
    }
    const synthesisRows = this.port.queryAll<Record<string, any>>(`
      SELECT synthesis.wave_id AS id, synthesis.status, synthesis.created_at, synthesis.updated_at
      FROM campaign_syntheses synthesis
      JOIN campaign_waves wave ON wave.wave_id = synthesis.wave_id
      WHERE wave.project_id = $project AND synthesis.created_at >= $start
    `, { $project: projectId, $start: epochStart });
    for (const synthesis of synthesisRows) {
      const started = Date.parse(synthesis.created_at);
      const ended = Date.parse(synthesis.updated_at);
      usage.push({
        id: synthesis.id,
        layer: "synthesis",
        trackId: "shared",
        workKind: "coordination",
        tokens: null,
        wallHours: Number.isFinite(started) && Number.isFinite(ended) && ended >= started ? (ended - started) / 3_600_000 : 0,
        status: synthesis.status,
        receiptBound: false,
        measurementComplete: false,
      });
    }
    for (const lease of custody.protocol?.leases || []) {
      // A strategy activation opens a fresh resource envelope. Preserve older
      // receipts in custody history, but do not charge their measured usage to
      // the successor epoch.
      if (epochStart && String(lease.createdAt || "") < epochStart) continue;
      if (["simulated", "verified"].includes(String(lease.status))) {
        usage.push({ id: lease.id, layer: "custody", trackId: "shared", workKind: "simulation", tokens: 0, wallHours: 0, status: lease.status, receiptBound: false, measurementComplete: false });
        continue;
      }
      if (!["running", "finalizing", "awaiting_review", "completed", "blocked", "failed", "rejected"].includes(String(lease.status))) continue;
      const reportedTokens = lease.receipt?.usage?.tokens;
      const numericTokens = reportedTokens !== null && reportedTokens !== undefined && Number.isFinite(Number(reportedTokens)) ? Number(reportedTokens) : null;
      const leaseTokenCap = Number(lease.lease?.budget?.maxTokens || 0);
      const tokens = numericTokens !== null && (!leaseTokenCap || numericTokens <= leaseTokenCap * 4) ? numericTokens : null;
      const minutes = Number(lease.receipt?.usage?.minutes || 0);
      const receiptBound = lease.status === "completed" && Boolean(lease.receiptDigest) && Boolean(lease.verification?.ok)
        && lease.receipt?.usage?.tokenMeasurement === "app-server";
      usage.push({
        id: lease.id, layer: "custody", trackId: "shared", workKind: "maintenance", tokens,
        wallHours: Math.max(0, minutes / 60), status: lease.status,
        receiptDigest: String(lease.receiptDigest || ""), measurementSource: String(lease.receipt?.usage?.tokenMeasurement || ""),
        receiptBound, measurementComplete: receiptBound && tokens !== null && tokens > 0 && minutes > 0,
      });
    }

    const activeResearch = this.port.queryOne<{ count: number }>(`
      SELECT COUNT(*) AS count FROM campaign_research_runs
      WHERE project_id = $project AND status IN ('launching', 'running', 'blocked')
    `, { $project: projectId });
    const activeStrategy = this.port.queryOne<{ count: number }>(`
      SELECT COUNT(*) AS count FROM campaign_strategy_reviews
      WHERE project_id = $project AND status IN ('queued', 'drafting')
    `, { $project: projectId });
    const activeCustody = this.port.queryOne<{ count: number }>(`
      SELECT COUNT(*) AS count FROM campaign_custody_items
      WHERE project_id = $project AND status IN ('assigned', 'verifying')
    `, { $project: projectId });
    const activeSlots = {
      strategy: Number(activeStrategy?.count || 0),
      research: Number(activeResearch?.count || 0),
      custody: Number(activeCustody?.count || 0),
    };

    const candidates: ResourceCandidate[] = [];
    const wave = this.port.queryOne<{ wave_id: string }>(
      "SELECT wave_id FROM campaign_waves WHERE project_id = $project AND phase != 'VOIDED' ORDER BY created_at DESC LIMIT 1",
      { $project: projectId },
    );
    const activeSchedule = wave ? this.port.queryOne<{ schedule_id: string; status: string }>(
      "SELECT schedule_id, status FROM campaign_wave_schedules WHERE project_id = $project AND wave_id = $wave ORDER BY created_at DESC LIMIT 1",
      { $project: projectId, $wave: wave.wave_id },
    ) : null;
    const scheduleMembers = activeSchedule ? this.port.queryAll<{ request_id: string }>(
      "SELECT request_id FROM campaign_wave_schedule_members WHERE schedule_id = $schedule ORDER BY ordinal",
      { $schedule: activeSchedule.schedule_id },
    ) : [];
    const committedRequestIds = activeSchedule && ["confirmed", "dispatching", "running", "attention", "landed"].includes(activeSchedule.status)
      ? new Set(scheduleMembers.map((member) => member.request_id))
      : new Set<string>();
    const plan = wave ? this.port.queryOne<{ response_json: string }>(
      "SELECT response_json FROM campaign_research_plans WHERE wave_id = $wave",
      { $wave: wave.wave_id },
    ) : null;
    const planResponse = parseJson<Record<string, any>>(plan?.response_json || "{}", {});
    const plannedLanes = Array.isArray(planResponse.lanes) ? planResponse.lanes : [];
    const retainedRequestIds = new Set(plannedLanes
      .filter((lane: any) => ["KEEP", "REVISE"].includes(String(lane?.action || "")))
      .map((lane: any) => String(lane?.requestId || ""))
      .filter(Boolean));
    const requests = this.port.queryAll<ResearchRequestRow>(`
      SELECT * FROM campaign_research_requests
      WHERE project_id = $project AND status = 'approved_for_dispatch' ORDER BY created_at
    `, { $project: projectId });
    const runs = this.port.queryAll<ResearchRunRow>(
      "SELECT * FROM campaign_research_runs WHERE project_id = $project ORDER BY created_at",
      { $project: projectId },
    );
    for (const request of requests) {
      if (retainedRequestIds.size && !retainedRequestIds.has(request.request_id)) continue;
      const spec = this.port.resolveResearchSpec(request, planResponse);
      if (!spec) continue;
      const declared = plannedLanes.find((lane: any) => lane?.requestId === request.request_id)?.strategy;
      const inferred = this.port.inferStrategy(spec.taskId, request.question);
      const classification = ["coverage", "supply", "decision"].includes(String(declared?.trackId || ""))
        && ["frontier", "experiment", "maintenance", "audit"].includes(String(declared?.workKind || "")) ? declared : inferred;
      const dependencyReady = this.port.researchDependencySatisfied(spec, runs);
      const phaseReady = project.current_phase === "RESEARCH_READY";
      candidates.push({
        id: request.request_id,
        label: spec.taskId,
        layer: "research",
        slotPool: "research",
        trackId: classification.trackId,
        workKind: classification.workKind,
        tokenCap: Math.max(10_000, Number(spec.tokenBudget || policy.tokenCaps.routineLane)),
        priority: Number(spec.priority || 99),
        blocking: false,
        ready: dependencyReady && phaseReady,
        gateRequired: false,
        committed: committedRequestIds.has(request.request_id),
        expectedDelta: String(declared?.expectedDelta || request.question).slice(0, 1_000),
        reason: !dependencyReady ? "Required predecessor evidence has not landed." : !phaseReady ? `Campaign phase ${project.current_phase} is not dispatch-ready.` : "The checked plan and dependencies are ready for a separate human dispatch gate.",
      });
    }
    for (const item of custody.items || []) {
      if (item.status !== "ready") continue;
      candidates.push({
        id: item.id,
        label: item.task,
        layer: "custody",
        slotPool: "custody",
        trackId: item.strategicTrack,
        workKind: "maintenance",
        tokenCap: custodyTokenCap(item.effortClass),
        priority: item.blocksResearch ? 1 : item.urgency === "NOW" ? 2 : 5,
        blocking: Boolean(item.blocksResearch),
        ready: Boolean(custody.executorConnected && item.contractComplete && item.generationAllowed),
        gateRequired: true,
        committed: Boolean(item.activeLease && ["confirmed", "running", "finalizing", "awaiting_review"].includes(item.activeLease.status)),
        expectedDelta: item.acceptance?.receiptType || "Bounded custody receipt",
        reason: "A separate exact lease confirmation and receipt landing gate isolate this work from research execution.",
      });
    }
    const activeReview = strategy.workspace?.activeReview;
    if (activeReview) {
      candidates.push({
        id: activeReview.id,
        label: "Complete the active epoch strategy review",
        layer: "strategy",
        slotPool: "strategy",
        trackId: "shared",
        workKind: "coordination",
        tokenCap: policy.tokenCaps.strategyReview,
        priority: 1,
        blocking: strategy.drift?.status === "attention",
        ready: false,
        gateRequired: activeReview.status === "drafted",
        committed: ["queued", "drafting"].includes(activeReview.status),
        expectedDelta: "A human-comparable, versioned epoch charter proposal.",
        reason: activeReview.status === "drafted" ? "The draft is waiting at the human charter activation gate." : "The independent Sol strategist is already using the strategy slot.",
      });
    } else if (strategy.drift?.status === "attention") {
      candidates.push({
        id: `strategy-review:${epochId}`,
        label: "Independent epoch recentering review",
        layer: "strategy",
        slotPool: "strategy",
        trackId: "shared",
        workKind: "coordination",
        tokenCap: policy.tokenCaps.strategyReview,
        priority: 1,
        blocking: true,
        ready: false,
        gateRequired: true,
        committed: false,
        expectedDelta: "Test whether the campaign charter should be rebalanced or replaced.",
        reason: "A human must authorize the read-only Sol strategy review.",
      });
    }
    if (project.current_phase === "SYNTHESIS_READY") {
      candidates.push({
        id: `synthesis:${wave?.wave_id || projectId}`,
        label: "Synthesize the landed wave",
        layer: "synthesis",
        slotPool: "strategy",
        trackId: "shared",
        workKind: "coordination",
        tokenCap: policy.tokenCaps.synthesis,
        priority: 1,
        blocking: true,
        ready: false,
        gateRequired: true,
        committed: false,
        expectedDelta: "A bounded wave assessment and guidance for the next decision.",
        reason: "Synthesis retains its existing explicit human gate.",
      });
    }
    const derived = deriveResourceState({ policy, usage, candidates, activeSlots });
    const calibration = deriveResourceCalibration(policy, usage);
    const simulationRows = this.port.queryAll<ResourceSimulationRow>(`
      SELECT * FROM campaign_resource_simulations WHERE project_id = $project ORDER BY created_at DESC LIMIT 12
    `, { $project: projectId });
    return {
      ...derived,
      epochId,
      charterRevision,
      calibration,
      simulations: simulationRows.map((simulation) => ({
        id: simulation.simulation_id,
        epochId: simulation.epoch_id,
        charterRevision: simulation.charter_revision,
        inputDigest: simulation.input_digest,
        input: parseJson(simulation.input_json, {}),
        result: parseJson(simulation.result_json, {}),
        actor: simulation.created_by,
        createdAt: simulation.created_at,
      })),
    };
  }
}
