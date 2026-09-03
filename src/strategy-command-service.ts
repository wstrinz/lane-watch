import { Database } from "bun:sqlite";
import { mkdir, rename, writeFile } from "node:fs/promises";
import { join } from "node:path";
import type { CodexAppServerClient } from "./codex";
import type { CampaignDomainReader } from "./campaign-domain-reader";
import { normalizeResourcePolicy } from "./resources";
import { defaultStrategyCharter } from "./strategy";

interface StrategyCharterRow {
  revision: number;
  charter_json: string;
  updated_at: string;
}

interface StrategyEpochRow {
  epoch_id: string;
  label: string;
  status: string;
  created_at: string;
}

interface StrategyReviewRow {
  review_id: string;
  project_id: string;
  epoch_id: string;
  base_revision: number;
  status: string;
  response_json: string;
  review_kind: string;
  request_source: string;
  request_reference: string;
  resource_cap: number;
}

export interface StrategyCommandPort {
  definition(projectId: string): { role: string };
  project(projectId: string): { current_phase: string; version: number };
  projectRoot(projectId: string): string;
  touchProject(projectId: string): void;
  recordEvent(projectId: string, aggregateType: string, aggregateId: string, eventType: string, payload: unknown): void;
  digest(value: unknown): string;
  reviewSchema(): Record<string, unknown>;
  now(): string;
}

function parseJson<T>(value: string | undefined, fallback: T): T {
  try { return JSON.parse(value || "") as T; } catch { return fallback; }
}

function boundedText(value: unknown, limit = 2_000): string {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

export class StrategyCommandService {
  constructor(
    private readonly database: Database,
    private readonly domains: CampaignDomainReader,
    private readonly codex: CodexAppServerClient,
    private readonly bundleRoot: string,
    private readonly port: StrategyCommandPort,
  ) {}

  ensureFoundation(projectId: string): void {
    const definition = this.port.definition(projectId);
    const stamp = this.port.now();
    const existing = this.database.query(
      "SELECT project_id FROM campaign_strategy_charters WHERE project_id = $project",
    ).get({ $project: projectId });
    if (!existing) {
      this.database.query(`
        INSERT INTO campaign_strategy_charters(project_id, revision, charter_json, created_at, updated_at)
        VALUES ($project, 1, $charter, $now, $now)
      `).run({ $project: projectId, $charter: JSON.stringify(defaultStrategyCharter(definition)), $now: stamp });
    }
    const charter = this.database.query(
      "SELECT * FROM campaign_strategy_charters WHERE project_id = $project",
    ).get({ $project: projectId }) as StrategyCharterRow & { created_at: string };
    this.database.query(`
      INSERT OR IGNORE INTO campaign_strategy_charter_revisions(project_id, revision, charter_json, proposal_id, actor, created_at)
      VALUES ($project, $revision, $charter, '', 'system-import', $now)
    `).run({
      $project: projectId,
      $revision: charter.revision,
      $charter: charter.charter_json,
      $now: charter.created_at || stamp,
    });
    const activeEpoch = this.database.query(
      "SELECT epoch_id FROM campaign_strategy_epochs WHERE project_id = $project AND status = 'active' LIMIT 1",
    ).get({ $project: projectId });
    if (activeEpoch) return;
    const charterValue = parseJson<Record<string, any>>(charter.charter_json, defaultStrategyCharter(definition));
    const earliest = this.database.query(
      "SELECT MIN(created_at) AS created_at FROM campaign_research_runs WHERE project_id = $project",
    ).get({ $project: projectId }) as { created_at: string | null } | null;
    const startedAt = earliest?.created_at || stamp;
    this.database.query(`
      INSERT INTO campaign_strategy_epochs(
        epoch_id, project_id, label, status, charter_revision, start_json, created_at, updated_at
      ) VALUES ($id, $project, $label, 'active', $revision, $start, $created, $now)
    `).run({
      $id: crypto.randomUUID(),
      $project: projectId,
      $label: String(charterValue.epoch?.label || "Epoch 1 · Restore frontier motion"),
      $revision: charter.revision,
      $start: JSON.stringify({ capturedAt: stamp, importedHistoryFrom: startedAt, mode: "shadow", phase: this.port.project(projectId).current_phase }),
      $created: startedAt,
      $now: stamp,
    });
  }

  ensureBaseline(projectId: string): void {
    const epoch = this.database.query(
      "SELECT * FROM campaign_strategy_epochs WHERE project_id = $project AND status = 'active' ORDER BY created_at DESC LIMIT 1",
    ).get({ $project: projectId }) as StrategyEpochRow | null;
    if (!epoch) return;
    const existing = this.database.query(
      "SELECT snapshot_id FROM campaign_strategy_snapshots WHERE project_id = $project AND epoch_id = $epoch AND kind = 'epoch_baseline' LIMIT 1",
    ).get({ $project: projectId, $epoch: epoch.epoch_id });
    if (existing) return;
    const strategy = this.domains.strategySnapshot(projectId);
    const stamp = this.port.now();
    this.database.query(`
      INSERT INTO campaign_strategy_snapshots(snapshot_id, project_id, epoch_id, wave_id, kind, metrics_json, cost_json, drift_json, created_at)
      VALUES ($id, $project, $epoch, '', 'epoch_baseline', $metrics, $cost, $drift, $now)
    `).run({
      $id: crypto.randomUUID(),
      $project: projectId,
      $epoch: epoch.epoch_id,
      $metrics: JSON.stringify({ progressDeltas: [], note: "Imported shadow-mode baseline; no mathematical progress was inferred from activity alone." }),
      $cost: JSON.stringify(strategy.cost),
      $drift: JSON.stringify(strategy.drift),
      $now: stamp,
    });
    this.port.recordEvent(projectId, "strategy", epoch.epoch_id, "strategy.epoch.baseline-recorded", { mode: "shadow", cost: strategy.cost, drift: strategy.drift });
  }

  bundleContext(projectId: string): Record<string, any> {
    const strategy = this.domains.strategySnapshot(projectId);
    return {
      schema: "campaign-strategy-context/v1",
      mode: strategy.mode,
      charter: strategy.charter,
      epoch: strategy.epoch,
      tracks: strategy.tracks,
      progress: strategy.progress,
      cost: strategy.cost,
      drift: { status: strategy.drift.status, signals: strategy.drift.signals },
      recentWork: strategy.work,
      custody: this.domains.custodySnapshot(projectId),
      resources: this.domains.resourceSnapshot(projectId),
    };
  }

  recordWaveSnapshot(projectId: string, waveId: string): void {
    const epoch = this.database.query(
      "SELECT * FROM campaign_strategy_epochs WHERE project_id = $project AND status = 'active' ORDER BY created_at DESC LIMIT 1",
    ).get({ $project: projectId }) as StrategyEpochRow | null;
    if (!epoch) return;
    const synthesis = this.database.query(
      "SELECT response_json FROM campaign_syntheses WHERE wave_id = $wave",
    ).get({ $wave: waveId }) as { response_json: string } | null;
    const response = parseJson<Record<string, any>>(synthesis?.response_json || "{}", {});
    const assessment = response.strategyAssessment || {};
    const strategy = this.domains.strategySnapshot(projectId);
    const metrics = {
      progressDeltas: Array.isArray(assessment.progressDeltas) ? assessment.progressDeltas : [],
      workMix: Array.isArray(assessment.workMix) ? assessment.workMix : [],
      strategyDecision: assessment.strategyDecision || "UNASSESSED",
      recommendedTrackWeights: Array.isArray(assessment.recommendedTrackWeights) ? assessment.recommendedTrackWeights : [],
      note: assessment.summary || "This synthesis predates structured strategy assessment; no progress was inferred.",
    };
    const stamp = this.port.now();
    this.database.query(`
      INSERT INTO campaign_strategy_snapshots(snapshot_id, project_id, epoch_id, wave_id, kind, metrics_json, cost_json, drift_json, created_at)
      VALUES ($id, $project, $epoch, $wave, 'wave_end', $metrics, $cost, $drift, $now)
      ON CONFLICT(project_id, epoch_id, wave_id, kind) DO UPDATE SET metrics_json = excluded.metrics_json,
        cost_json = excluded.cost_json, drift_json = excluded.drift_json, created_at = excluded.created_at
    `).run({
      $id: crypto.randomUUID(),
      $project: projectId,
      $epoch: epoch.epoch_id,
      $wave: waveId,
      $metrics: JSON.stringify(metrics),
      $cost: JSON.stringify(strategy.cost),
      $drift: JSON.stringify(strategy.drift),
      $now: stamp,
    });
    this.port.recordEvent(projectId, "strategy", epoch.epoch_id, "strategy.wave.snapshot-recorded", { waveId, mode: "shadow", metrics, driftStatus: strategy.drift.status });
  }

  async requestReview(projectId: string, args: Record<string, any>, actor: string): Promise<Record<string, unknown>> {
    const active = this.database.query(`
      SELECT review_id, status FROM campaign_strategy_reviews
      WHERE project_id = $project AND status IN ('queued', 'drafting', 'drafted')
      ORDER BY created_at DESC LIMIT 1
    `).get({ $project: projectId }) as { review_id: string; status: string } | null;
    if (active) throw new Error(`Resolve strategy review ${active.review_id} before requesting another`);
    const project = this.port.project(projectId);
    const epoch = this.database.query(
      "SELECT * FROM campaign_strategy_epochs WHERE project_id = $project AND status = 'active' ORDER BY created_at DESC LIMIT 1",
    ).get({ $project: projectId }) as StrategyEpochRow | null;
    if (!epoch) throw new Error("The campaign has no active strategy epoch");
    const charter = this.database.query(
      "SELECT * FROM campaign_strategy_charters WHERE project_id = $project",
    ).get({ $project: projectId }) as StrategyCharterRow;
    const triggerKind = ["manual", "drift", "interval"].includes(String(args.triggerKind || "")) ? String(args.triggerKind) : "manual";
    const triggerReason = boundedText(args.reason || "Independent epoch review requested by the operator.", 2_000);
    if (!triggerReason) throw new Error("A bounded strategy-review reason is required");
    const reviewKind = args.reviewKind === "idea-search" ? "idea-search" : "epoch";
    const requestSource = args.requestSource === "coordinator-request" ? "coordinator-request" : "operator";
    const requestReference = boundedText(args.requestReference, 500);
    if (requestSource === "coordinator-request") {
      if (!requestReference) throw new Error("A coordinator-requested review requires the exact coordinator thread or turn reference");
      const coordinator = this.database.query(`
        SELECT thread_id, last_turn_id FROM campaign_coordinators WHERE project_id = $project
      `).get({ $project: projectId }) as { thread_id: string; last_turn_id: string } | null;
      if (!coordinator || ![coordinator.thread_id, coordinator.last_turn_id].includes(requestReference)) {
        throw new Error("The coordinator request reference does not match the attached regular coordinator");
      }
    }
    const resources = this.domains.resourceSnapshot(projectId);
    const resourceCap = Number(resources.policy?.tokenCaps?.strategyReview || 0);
    if (resourceCap < 20_000 || Number(resources.slots?.available?.strategy || 0) < 1) {
      throw new Error("No bounded strategy resource slot is available for an independent review");
    }
    const reviewId = crypto.randomUUID();
    const stamp = this.port.now();
    this.database.query(`
      INSERT INTO campaign_strategy_reviews(
        review_id, project_id, epoch_id, base_revision, trigger_kind, trigger_reason, review_kind,
        request_source, request_reference, resource_cap, status, created_by, created_at, updated_at
      ) VALUES ($id, $project, $epoch, $revision, $kind, $reason, $reviewKind,
        $requestSource, $requestReference, $resourceCap, 'queued', $actor, $now, $now)
    `).run({
      $id: reviewId,
      $project: projectId,
      $epoch: epoch.epoch_id,
      $revision: charter.revision,
      $kind: triggerKind,
      $reason: triggerReason,
      $reviewKind: reviewKind,
      $requestSource: requestSource,
      $requestReference: requestReference,
      $resourceCap: resourceCap,
      $actor: actor,
      $now: stamp,
    });
    const wave = this.database.query(
      "SELECT * FROM campaign_waves WHERE project_id = $project AND phase != 'VOIDED' ORDER BY created_at DESC LIMIT 1",
    ).get({ $project: projectId }) as Record<string, any> | null;
    const synthesis = wave
      ? this.database.query("SELECT response_json FROM campaign_syntheses WHERE wave_id = $wave").get({ $wave: wave.wave_id }) as { response_json: string } | null
      : null;
    const plan = wave
      ? this.database.query("SELECT response_json FROM campaign_research_plans WHERE wave_id = $wave").get({ $wave: wave.wave_id }) as { response_json: string } | null
      : null;
    const redirects = this.database.query(`
      SELECT title, content, response_json, status, created_at FROM campaign_redirect_inputs
      WHERE project_id = $project ORDER BY created_at DESC LIMIT 4
    `).all({ $project: projectId }) as Array<Record<string, any>>;
    const bundleBody = {
      schema: "campaign-strategy-review-bundle/v3",
      binding: {
        algorithm: "sha256",
        serialization: "canonical-json/v1",
        digestScope: "all top-level fields except bundleDigest",
        verification: "Parse this JSON, remove only the top-level bundleDigest field, recursively sort object keys while preserving array order, encode JSON scalars without formatting whitespace, and hash the resulting UTF-8 text.",
      },
      projectId,
      reviewId,
      request: { reviewKind, source: requestSource, reference: requestReference, authorizedBy: actor, capturedAt: stamp },
      trigger: { kind: triggerKind, reason: triggerReason },
      resourceBoundary: { slotPool: "strategy", tokenCap: resourceCap, schedulerAuthority: "none", policyMutationAllowed: false },
      campaign: { phase: project.current_phase, version: project.version, role: this.port.definition(projectId).role },
      strategy: this.bundleContext(projectId),
      latestWave: wave ? { id: wave.wave_id, label: wave.label, phase: wave.phase, evidenceDigest: wave.evidence_digest } : null,
      latestSynthesis: synthesis ? parseJson(synthesis.response_json, {}) : null,
      latestCheckedPlan: plan ? parseJson(plan.response_json, {}) : null,
      externalPerspectives: redirects.map((redirect) => ({
        title: redirect.title,
        content: redirect.content,
        response: parseJson(redirect.response_json, {}),
        status: redirect.status,
        createdAt: redirect.created_at,
      })),
      generatedAt: stamp,
    };
    const bundleDigest = `sha256:${this.port.digest(bundleBody)}`;
    await mkdir(this.bundleRoot, { recursive: true });
    const bundlePath = join(this.bundleRoot, `${reviewId}-strategy-${bundleDigest.slice(7, 15)}.json`);
    const temporaryPath = `${bundlePath}.${crypto.randomUUID()}.tmp`;
    await writeFile(temporaryPath, `${JSON.stringify({ ...bundleBody, bundleDigest }, null, 2)}\n`, { encoding: "utf8", mode: 0o600 });
    await rename(temporaryPath, bundlePath);
    try {
      const projectRoot = this.port.projectRoot(projectId);
      const strategist = await this.codex.startThread({
        cwd: projectRoot,
        model: "gpt-5.6-sol",
        approvalPolicy: "on-request",
      });
      const prompt = [
        `You are the independent ${reviewKind === "idea-search" ? "idea-search strategist" : "epoch strategist"} for campaign ${projectId}. This is not the campaign's regular wave coordinator.`,
        `The immutable strategy-review bundle is ${bundlePath}, bound by ${bundleDigest}. Read it completely.`,
        "Verify the bundle with its binding metadata. The recorded digest is the semantic SHA-256 of canonical-json/v1 over every top-level field except bundleDigest; it is intentionally not the SHA-256 of the pretty-printed file bytes.",
        "Audit the campaign at the epoch timescale. Activity is not progress: only count durable changes to a coverage denominator, candidate supply, candidate decision, mathematical claim, or demonstrated scaling/cost fact.",
        "Look for maintenance capture, tunnel vision, repeated descendants of the same blocker, unjustified track concentration, missing costs, stale assumptions, and work that belongs in a separate custody service.",
        ...(reviewKind === "idea-search" ? ["Search deliberately outside the current dominant line. Put falsifiable, dependency-aware candidate directions in portfolioActions.start, but do not create research requests or launch contracts. Any direction remains inert unless a human later activates the exact charter proposal and separately approves a checked research plan."] : []),
        "Return a coherent proposed charter even if your recommendation is to continue the current epoch, so the operator can compare exact alternatives. Track weights must contain coverage, supply, and decision exactly once and sum to 1.",
        "Propose a provisional epoch and wave token envelope, per-kind token caps, redirect reserve, and shared strategy/research/custody slot pools. Ground the numbers in measured history, explicitly account for missing usage, and explain the tradeoff in resourcePolicy.rationale. These values feed a shadow scheduler only and confer no execution authority.",
        "Custody candidates are recommendations for a future separate service. Give each one a strategic cost track, capability, repair generation, small/medium effort class, allowed paths, acceptance checks, receipt type, and hard stop condition. Non-blocking upkeep should usually be PARK or SOON, not NOW.",
        "Do not create or execute custody work, research requests, launch contracts, or campaign mutations. The control plane will only stage your candidates into a non-executing inbox after a human activates this charter.",
        "This is a read-only governance task. Do not edit files, message or interrupt the regular coordinator, dispatch workers, change campaign phase, merge, push, or promote claims. A separate explicit human gate controls activation.",
      ].join("\n\n");
      const turn = await this.codex.startTurn({
        threadId: strategist.id,
        input: [{ type: "text", text: prompt }],
        cwd: strategist.cwd || projectRoot,
        model: "gpt-5.6-sol",
        effort: "high",
        approvalPolicy: "on-request",
        sandboxPolicy: { type: "readOnly" },
        outputSchema: this.port.reviewSchema(),
      });
      if (!turn.id) throw new Error("Codex App Server did not return a strategy-review turn id");
      this.database.query(`
        UPDATE campaign_strategy_reviews SET status = 'drafting', thread_id = $thread, turn_id = $turn,
          bundle_path = $path, bundle_digest = $digest, updated_at = $now WHERE review_id = $id
      `).run({ $id: reviewId, $thread: strategist.id, $turn: turn.id, $path: bundlePath, $digest: bundleDigest, $now: this.port.now() });
      this.port.touchProject(projectId);
      this.port.recordEvent(projectId, "strategy-review", reviewId, "strategy.review.started", {
        epochId: epoch.epoch_id,
        baseRevision: charter.revision,
        threadId: strategist.id,
        turnId: turn.id,
        bundlePath,
        bundleDigest,
        triggerKind,
        reviewKind,
        requestSource,
        requestReference,
        resourceCap,
        schedulerAuthority: "none",
      });
      return { reviewId, status: "drafting", reviewKind, requestSource, requestReference, resourceCap, threadId: strategist.id, turnId: turn.id, bundlePath, bundleDigest, schedulerAuthority: "none" };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.database.query(
        "UPDATE campaign_strategy_reviews SET status = 'failed', error = $error, bundle_path = $path, bundle_digest = $digest, updated_at = $now, completed_at = $now WHERE review_id = $id",
      ).run({ $id: reviewId, $error: message.slice(0, 4_000), $path: bundlePath, $digest: bundleDigest, $now: this.port.now() });
      this.port.touchProject(projectId);
      this.port.recordEvent(projectId, "strategy-review", reviewId, "strategy.review.failed", { error: message, bundlePath, bundleDigest });
      throw error;
    }
  }

  activateProposal(projectId: string, reviewId: string, args: Record<string, any>, actor: string): Record<string, unknown> {
    if (args.confirmation !== "ACTIVATE STRATEGY REVISION") throw new Error("Explicit strategy activation confirmation is required");
    const review = this.database.query(
      "SELECT * FROM campaign_strategy_reviews WHERE review_id = $id AND project_id = $project",
    ).get({ $id: reviewId, $project: projectId }) as StrategyReviewRow | null;
    if (!review || review.status !== "drafted") throw new Error("Select a completed, unresolved strategy proposal to activate");
    const current = this.database.query(
      "SELECT * FROM campaign_strategy_charters WHERE project_id = $project",
    ).get({ $project: projectId }) as StrategyCharterRow;
    const currentEpoch = this.database.query(
      "SELECT * FROM campaign_strategy_epochs WHERE project_id = $project AND status = 'active' ORDER BY created_at DESC LIMIT 1",
    ).get({ $project: projectId }) as StrategyEpochRow | null;
    if (!currentEpoch || currentEpoch.epoch_id !== review.epoch_id) throw new Error("The proposal no longer targets the active strategy epoch");
    const charter = this.proposedCharter(projectId, review);
    const before = this.domains.strategySnapshot(projectId);
    const revision = current.revision + 1;
    const epochId = crypto.randomUUID();
    const stamp = this.port.now();
    const responseDigest = `sha256:${this.port.digest(parseJson(review.response_json, {}))}`;
    let custodyCandidatesStaged = 0;
    const apply = this.database.transaction(() => {
      this.database.query(`
        INSERT INTO campaign_strategy_charter_revisions(project_id, revision, charter_json, proposal_id, actor, created_at)
        VALUES ($project, $revision, $charter, $proposal, $actor, $now)
      `).run({ $project: projectId, $revision: revision, $charter: JSON.stringify(charter), $proposal: reviewId, $actor: actor, $now: stamp });
      this.database.query(
        "UPDATE campaign_strategy_charters SET revision = $revision, charter_json = $charter, updated_at = $now WHERE project_id = $project",
      ).run({ $project: projectId, $revision: revision, $charter: JSON.stringify(charter), $now: stamp });
      this.database.query(
        "UPDATE campaign_strategy_epochs SET status = 'completed', end_json = $end, updated_at = $now, completed_at = $now WHERE epoch_id = $epoch",
      ).run({
        $epoch: currentEpoch.epoch_id,
        $end: JSON.stringify({ capturedAt: stamp, reason: "human-activated-successor", reviewId, responseDigest, cost: before.cost, progress: before.progress, drift: before.drift }),
        $now: stamp,
      });
      this.database.query(`
        INSERT INTO campaign_strategy_epochs(epoch_id, project_id, label, status, charter_revision, start_json, created_at, updated_at)
        VALUES ($id, $project, $label, 'active', $revision, $start, $now, $now)
      `).run({
        $id: epochId,
        $project: projectId,
        $label: charter.epoch.label,
        $revision: revision,
        $start: JSON.stringify({ capturedAt: stamp, priorEpochId: currentEpoch.epoch_id, reviewId, responseDigest, mode: "shadow", phase: this.port.project(projectId).current_phase }),
        $now: stamp,
      });
      this.database.query(
        "UPDATE campaign_strategy_reviews SET status = 'activated', updated_at = $now, completed_at = $now, activated_at = $now WHERE review_id = $id",
      ).run({ $id: reviewId, $now: stamp });
      custodyCandidatesStaged = this.stageCustodyCandidates(projectId, review, actor, stamp);
    });
    apply();
    this.ensureBaseline(projectId);
    this.port.touchProject(projectId);
    this.port.recordEvent(projectId, "strategy", epochId, "strategy.epoch.activated", {
      actor,
      reviewId,
      revision,
      priorEpochId: currentEpoch.epoch_id,
      responseDigest,
      mode: "shadow",
      custodyCandidatesStaged,
      campaignPhaseUnchanged: this.port.project(projectId).current_phase,
    });
    return { reviewId, revision, epochId, status: "activated", mode: "shadow", custodyCandidatesStaged, campaignPhase: this.port.project(projectId).current_phase };
  }

  dismissProposal(projectId: string, reviewId: string, args: Record<string, any>, actor: string): Record<string, unknown> {
    const review = this.database.query(
      "SELECT * FROM campaign_strategy_reviews WHERE review_id = $id AND project_id = $project",
    ).get({ $id: reviewId, $project: projectId }) as StrategyReviewRow | null;
    if (!review || review.status !== "drafted") throw new Error("Select a completed, unresolved strategy proposal to dismiss");
    const note = boundedText(args.note || "Operator kept the current charter.", 2_000);
    const stamp = this.port.now();
    this.database.query(
      "UPDATE campaign_strategy_reviews SET status = 'dismissed', error = $note, updated_at = $now, completed_at = $now WHERE review_id = $id",
    ).run({ $id: reviewId, $note: note, $now: stamp });
    this.port.touchProject(projectId);
    this.port.recordEvent(projectId, "strategy-review", reviewId, "strategy.proposal.dismissed", { actor, note, baseRevision: review.base_revision });
    return { reviewId, status: "dismissed", revision: review.base_revision };
  }

  private proposedCharter(projectId: string, review: StrategyReviewRow): Record<string, any> {
    const definition = this.port.definition(projectId);
    const current = this.database.query(
      "SELECT * FROM campaign_strategy_charters WHERE project_id = $project",
    ).get({ $project: projectId }) as StrategyCharterRow;
    if (review.base_revision !== current.revision) throw new Error(`Strategy proposal is stale: based on revision ${review.base_revision}, current ${current.revision}`);
    const response = parseJson<Record<string, any>>(review.response_json, {});
    if (response.recommendation !== "ACTIVATE_NEW_EPOCH") throw new Error("The independent strategist did not recommend activating a new epoch");
    const proposal = response.proposal || {};
    const weights = Array.isArray(proposal.trackWeights) ? proposal.trackWeights : [];
    const ids = weights.map((item: any) => String(item?.trackId || ""));
    if (weights.length !== 3 || new Set(ids).size !== 3 || !["coverage", "supply", "decision"].every((id) => ids.includes(id))) {
      throw new Error("The proposed charter must allocate coverage, supply, and decision exactly once");
    }
    const total = weights.reduce((sum: number, item: any) => sum + Number(item.share || 0), 0);
    if (!Number.isFinite(total) || Math.abs(total - 1) > 0.001) throw new Error(`Proposed track weights sum to ${total}, not 1`);
    const requiredText = [proposal.thesis, proposal.epochLabel, proposal.epochObjective, proposal.rationale];
    if (requiredText.some((value) => !String(value || "").trim())) throw new Error("The proposed charter is missing its thesis, epoch label, objective, or rationale");
    const previous = parseJson<Record<string, any>>(current.charter_json, defaultStrategyCharter(definition));
    const weightById = new Map<string, any>(weights.map((item: any) => [item.trackId, item]));
    return {
      ...previous,
      schema: "campaign-strategy-charter/v1",
      mode: "shadow",
      thesis: String(proposal.thesis).trim(),
      epoch: {
        label: String(proposal.epochLabel).trim(),
        objective: String(proposal.epochObjective).trim(),
        targetWaves: Math.max(1, Math.min(20, Number(proposal.targetWaves || 1))),
      },
      tracks: (Array.isArray(previous.tracks) ? previous.tracks : []).map((track: any) => ({
        ...track,
        targetShare: Number(weightById.get(track.id)?.share || 0),
      })),
      metrics: Array.isArray(proposal.metrics) ? proposal.metrics : [],
      redirectionTriggers: Array.isArray(proposal.redirectionTriggers) ? proposal.redirectionTriggers : [],
      maintenancePolicy: {
        ...(previous.maintenancePolicy || {}),
        rollingShareLimit: Number(proposal.maintenanceShareLimit),
        maxAutomaticRepairGeneration: Number(proposal.automaticRepairLimit),
      },
      resourcePolicy: normalizeResourcePolicy(proposal.resourcePolicy),
      rationale: String(proposal.rationale).trim(),
      sourceReviewId: review.review_id,
    };
  }

  private stageCustodyCandidates(projectId: string, review: StrategyReviewRow, actor: string, stamp: string): number {
    const response = parseJson<Record<string, any>>(review.response_json, {});
    const candidates = Array.isArray(response.proposal?.custodyCandidates) ? response.proposal.custodyCandidates : [];
    let inserted = 0;
    for (const candidate of candidates.slice(0, 24)) {
      const task = boundedText(candidate?.task, 1_000);
      const reason = boundedText(candidate?.reason, 2_000);
      const urgency = ["NOW", "SOON", "PARK"].includes(String(candidate?.urgency || "")) ? candidate.urgency : "PARK";
      const strategicTrack = ["coverage", "supply", "decision"].includes(String(candidate?.strategicTrack || "")) ? candidate.strategicTrack : "decision";
      const capability = ["repair", "verification", "archive", "provenance", "portability"].includes(String(candidate?.capability || "")) ? candidate.capability : "archive";
      const effortClass = candidate?.effortClass === "medium" ? "medium" : "small";
      const acceptance = {
        acceptanceCriteria: (Array.isArray(candidate?.acceptanceCriteria) ? candidate.acceptanceCriteria : []).map((item: unknown) => boundedText(item, 500)).filter(Boolean).slice(0, 12),
        allowedPaths: (Array.isArray(candidate?.allowedPaths) ? candidate.allowedPaths : []).map((item: unknown) => boundedText(item, 500)).filter(Boolean).slice(0, 24),
        receiptType: boundedText(candidate?.receiptType, 200),
        stopCondition: boundedText(candidate?.stopCondition, 1_000),
      };
      if (!task || !reason) continue;
      const fingerprint = `sha256:${this.port.digest({ projectId, task: task.trim().toLowerCase(), capability, sourceType: "strategy-review", sourceId: review.review_id })}`;
      const result = this.database.query(`
        INSERT OR IGNORE INTO campaign_custody_items(
          item_id, project_id, source_type, source_id, fingerprint, task, reason, urgency, blocks_research,
          strategic_track, capability, repair_generation, effort_class, acceptance_json, status,
          created_by, created_at, updated_at
        ) VALUES ($id, $project, 'strategy-review', $source, $fingerprint, $task, $reason, $urgency, $blocks,
          $track, $capability, $generation, $effort, $acceptance, 'proposed', $actor, $now, $now)
      `).run({
        $id: crypto.randomUUID(),
        $project: projectId,
        $source: review.review_id,
        $fingerprint: fingerprint,
        $task: task,
        $reason: reason,
        $urgency: urgency,
        $blocks: candidate?.blocksResearch ? 1 : 0,
        $track: strategicTrack,
        $capability: capability,
        $generation: Math.max(0, Math.floor(Number(candidate?.repairGeneration || 0))),
        $effort: effortClass,
        $acceptance: JSON.stringify(acceptance),
        $actor: actor,
        $now: stamp,
      });
      inserted += Number(result.changes || 0);
    }
    return inserted;
  }
}
