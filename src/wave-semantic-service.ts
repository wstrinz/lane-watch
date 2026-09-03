import { Database } from "bun:sqlite";
import { mkdir, rename, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { CodexAppServerClient } from "./codex";
import type { CampaignCoordinationInterface } from "./campaign-coordination-interface-service";
import { CoordinatorSessionService } from "./coordinator-session-service";
import { WAVE_DISPOSITIONS, waveAccounting, waveLaneAccounted } from "./wave";
import { WaveCommandService } from "./wave-commands";
import { WaveRepository, type WaveMemberRecord, type WaveRecord } from "./wave-repository";
import type { LaneSnapshot, ObserverSnapshot } from "./types";

interface ContextSourceRow {
  source_id: string;
  role: string;
  path: string;
  sha256: string;
  modified_at: string;
  content: string;
}

interface WaveTriageRow {
  status: string;
  evidence_digest: string;
  response_json: string;
}

interface CampaignRedirectRow {
  input_id: string;
  project_id: string;
  wave_id: string;
  title: string;
  content: string;
  source_url: string;
  input_digest: string;
  status: string;
  thread_id: string;
  turn_id: string;
  bundle_path: string;
  response_json: string;
  error: string;
}

interface WaveSemanticPort {
  project(projectId: string): { current_phase: string };
  coordinationInterface(projectId: string): CampaignCoordinationInterface;
  projectRoot(projectId: string): string;
  workspaceRoot(): string;
  observer(): ObserverSnapshot | null;
  adoptWave(projectId: string, lanes: LaneSnapshot[]): WaveRecord;
  syncWave(projectId: string, lanes: LaneSnapshot[]): void;
  activeLoop(projectId: string): { loop_id: string; status: string; pending_action_id: string } | null;
  strategyBundleContext(projectId: string): unknown;
  synthesisSchema(): Record<string, unknown>;
  triageSchema(): Record<string, unknown>;
  redirectSchema(): Record<string, unknown>;
  touchProject(projectId: string, phase?: string): void;
  recordEvent(projectId: string, aggregateType: string, aggregateId: string, eventType: string, payload: unknown): void;
  digest(value: unknown): string;
  now(): string;
}

function parseJson<T>(value: string, fallback: T): T {
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

/** Owns read-only Sol wave interpretation and the human gates that consume it. */
export class WaveSemanticService {
  constructor(
    private readonly database: Database,
    private readonly codex: CodexAppServerClient,
    private readonly bundleRoot: string,
    private readonly waves: WaveRepository,
    private readonly waveCommands: WaveCommandService,
    private readonly coordinators: CoordinatorSessionService,
    private readonly port: WaveSemanticPort,
  ) {}

  redirectContext(projectId: string): Array<Record<string, unknown>> {
    const rows = this.database.query(`
      SELECT input_id, title, source_url, input_digest, status, bundle_path, response_json, applied_at
      FROM campaign_redirect_inputs
      WHERE project_id = $project AND status = 'applied'
      ORDER BY created_at DESC LIMIT 8
    `).all({ $project: projectId }) as Array<Record<string, string>>;
    return rows.map((row) => ({
      id: row.input_id,
      title: row.title,
      sourceUrl: row.source_url,
      inputDigest: row.input_digest,
      bundlePath: row.bundle_path,
      response: parseJson(row.response_json, {}),
      appliedAt: row.applied_at,
    }));
  }

  async submitRedirect(projectId: string, args: Record<string, any>, actor: string): Promise<Record<string, unknown>> {
    const title = typeof args.title === "string" ? args.title.trim().slice(0, 240) : "";
    const content = typeof args.content === "string" ? args.content.trim() : "";
    const sourceUrl = typeof args.sourceUrl === "string" ? args.sourceUrl.trim().slice(0, 2_000) : "";
    if (!content) throw new Error("Paste an external perspective, observation, or proposed reframing first");
    if (content.length > 24_000) throw new Error("External perspective inputs are limited to 24,000 characters");
    if (sourceUrl && !/^https?:\/\//i.test(sourceUrl)) throw new Error("Source link must be an http or https URL");
    const drafting = this.database.query("SELECT input_id FROM campaign_redirect_inputs WHERE project_id = $project AND status = 'drafting' LIMIT 1")
      .get({ $project: projectId });
    if (drafting) throw new Error("Sol is already reshaping the campaign from another external input");
    const project = this.port.project(projectId);
    const wave = this.waves.latest(projectId);
    const inputId = crypto.randomUUID();
    const stamp = this.port.now();
    const inputDigest = `sha256:${this.port.digest({ title, content, sourceUrl })}`;
    this.database.query(`
      INSERT INTO campaign_redirect_inputs(
        input_id, project_id, wave_id, title, content, source_url, input_digest,
        status, created_by, created_at, updated_at
      ) VALUES ($id, $project, $wave, $title, $content, $url, $digest, 'queued', $actor, $now, $now)
    `).run({
      $id: inputId, $project: projectId, $wave: wave?.wave_id || "", $title: title || "External perspective",
      $content: content, $url: sourceUrl, $digest: inputDigest, $actor: actor, $now: stamp,
    });
    const loop = this.port.activeLoop(projectId);
    if (loop?.status === "running") {
      this.database.query("UPDATE campaign_loop_runs SET status = $status, halt_after_step = $halt, updated_at = $now WHERE loop_id = $id")
        .run({ $id: loop.loop_id, $status: loop.pending_action_id ? "running" : "paused", $halt: loop.pending_action_id ? 1 : 0, $now: stamp });
      this.port.recordEvent(projectId, "loop", loop.loop_id, "loop.redirect-pause-requested", { inputId, pendingActionId: loop.pending_action_id });
    }
    this.port.touchProject(projectId);
    this.port.recordEvent(projectId, "redirect", inputId, "campaign.redirect.queued", { title: title || "External perspective", sourceUrl, inputDigest, phase: project.current_phase, actor });
    const started = await this.startQueuedRedirect(projectId);
    return { inputId, status: started?.inputId === inputId ? "drafting" : "queued", inputDigest, pausedLoop: Boolean(loop) };
  }

  async startQueuedRedirect(projectId: string): Promise<Record<string, any> | null> {
    const coordinator = this.coordinators.get(projectId);
    if (!coordinator || (["working", "active", "running"].includes(coordinator.status.toLowerCase()) && coordinator.last_turn_id)) return null;
    // Observation settlement, action completion, and Codex notifications can all
    // ask for the next redirect at once. Claim the queued row synchronously before
    // the first await so only one caller can launch its read-only Sol turn.
    const input = this.database.transaction(() => {
      const active = this.database.query("SELECT input_id FROM campaign_redirect_inputs WHERE project_id = $project AND status = 'drafting' LIMIT 1")
        .get({ $project: projectId });
      if (active) return null;
      const queued = this.database.query("SELECT * FROM campaign_redirect_inputs WHERE project_id = $project AND status = 'queued' ORDER BY created_at LIMIT 1")
        .get({ $project: projectId }) as CampaignRedirectRow | null;
      if (!queued) return null;
      const claimed = this.database.query(`
        UPDATE campaign_redirect_inputs SET status = 'drafting', error = '', updated_at = $now
        WHERE input_id = $id AND status = 'queued'
      `).run({ $id: queued.input_id, $now: this.port.now() });
      return claimed.changes === 1 ? queued : null;
    })();
    if (!input) return null;
    try {
      const wave = this.waves.latest(projectId);
      const synthesis = wave ? this.database.query("SELECT response_json FROM campaign_syntheses WHERE wave_id = $wave").get({ $wave: wave.wave_id }) as { response_json: string } | null : null;
      const plan = wave ? this.database.query("SELECT response_json FROM campaign_research_plans WHERE wave_id = $wave").get({ $wave: wave.wave_id }) as { response_json: string } | null : null;
      const runs = this.database.query(`
        SELECT task_id, status, profile, evidence_sha256, evidence_json, completed_at
        FROM campaign_research_runs WHERE project_id = $project ORDER BY created_at
      `).all({ $project: projectId }) as Array<Record<string, any>>;
      const bundleBody = {
        schema: "campaign-external-redirect/v1",
        projectId,
        waveId: wave?.wave_id || "",
        currentPhase: this.port.project(projectId).current_phase,
        strategy: this.port.strategyBundleContext(projectId),
        input: { id: input.input_id, title: input.title, content: input.content, sourceUrl: input.source_url, inputDigest: input.input_digest },
        currentSynthesis: synthesis ? parseJson(synthesis.response_json, {}) : null,
        currentPlan: plan ? parseJson(plan.response_json, {}) : null,
        priorRuns: runs.map((run) => ({
          taskId: run.task_id, status: run.status, profile: run.profile, evidenceSha256: run.evidence_sha256,
          evidenceStatus: parseJson<Record<string, any>>(run.evidence_json, {}).status || "", completedAt: run.completed_at,
        })),
        generatedAt: this.port.now(),
      };
      const bundleDigest = `sha256:${this.port.digest(bundleBody)}`;
      const bundlePath = await this.writeBundle(`${input.input_id}-redirect`, bundleBody, bundleDigest);
      const writer = await this.coordinators.writable(projectId);
      const prompt = [
        `You are the Sol campaign-redirect coordinator for project ${projectId}.`,
        `A human supplied an external perspective intended to detect tunnel vision and reshape the campaign. The immutable bundle is at: ${bundlePath}`,
        `Its bound digest is ${bundleDigest}. Read the full input and the included synthesis, checked plan, and run history.`,
        "Assess the input seriously but adversarially: distinguish genuinely new constraints or ideas from already-covered work, check for conflicts with evidence, identify assumptions the campaign has overcommitted to, and preserve valuable progress.",
        "The bundle includes the current shadow-mode charter, epoch allocation, progress ledger, and drift signals. Return strategyProposal as an explicit strategy diff: epoch objective, track weights summing to 1, metrics, work to park, and work to retire. Do not silently turn every packet bullet into a lane.",
        "Propose a reshaped next-wave objective and a small set of coherent falsifiable directions. Do not fabricate launch contracts or immutable commits; this is direction-setting before the normal Sol planning and human launch gates.",
        "Do not edit files, dispatch workers, merge, push, promote claims, or interrupt an active worker. Return only the structured redirect proposal for human review.",
      ].join("\n\n");
      const turn = await this.codex.startTurn({
        threadId: writer.thread_id,
        input: [{ type: "text", text: prompt }],
        cwd: writer.thread_cwd || this.port.workspaceRoot(),
        model: writer.model || undefined,
        effort: writer.effort || "high",
        approvalPolicy: "on-request",
        sandboxPolicy: { type: "readOnly" },
        outputSchema: this.port.redirectSchema(),
      });
      if (!turn.id) throw new Error("Codex App Server did not return a campaign-redirect turn id");
      const stamp = this.port.now();
      this.database.query(`
        UPDATE campaign_redirect_inputs
        SET thread_id = $thread, turn_id = $turn, bundle_path = $path,
          response_json = '{}', error = '', updated_at = $now
        WHERE input_id = $id AND status = 'drafting'
      `).run({ $id: input.input_id, $thread: writer.thread_id, $turn: turn.id, $path: bundlePath, $now: stamp });
      this.database.query("UPDATE campaign_coordinators SET status = 'working', last_turn_id = $turn, last_event_at = $now WHERE project_id = $project")
        .run({ $turn: turn.id, $now: stamp, $project: projectId });
      this.port.touchProject(projectId);
      this.port.recordEvent(projectId, "redirect", input.input_id, "campaign.redirect.started", { turnId: turn.id, threadId: writer.thread_id, bundlePath, bundleDigest });
      return { inputId: input.input_id, turnId: turn.id, bundlePath, bundleDigest };
    } catch (error) {
      const message = (error instanceof Error ? error.message : String(error)).slice(0, 2_000);
      this.database.query(`
        UPDATE campaign_redirect_inputs SET status = 'failed', error = $error, updated_at = $now
        WHERE input_id = $id AND status = 'drafting'
      `).run({ $id: input.input_id, $error: message, $now: this.port.now() });
      this.port.touchProject(projectId);
      this.port.recordEvent(projectId, "redirect", input.input_id, "campaign.redirect.failed", { error: message });
      throw error;
    }
  }

  async applyRedirect(projectId: string, inputId: string, actor: string): Promise<Record<string, unknown>> {
    const input = this.database.query("SELECT * FROM campaign_redirect_inputs WHERE input_id = $id AND project_id = $project")
      .get({ $id: inputId, $project: projectId }) as CampaignRedirectRow | null;
    if (!input || input.status !== "drafted") throw new Error("Select a completed Sol redirect proposal to apply");
    const response = parseJson<Record<string, any>>(input.response_json, {});
    if (!response.summary || !["READY_FOR_GATE", "NEEDS_MORE_INPUT", "NO_CHANGE"].includes(response.decision)) throw new Error("Sol's redirect proposal is incomplete or malformed");
    const project = this.port.project(projectId);
    const wave = this.waves.latest(projectId);
    const stamp = this.port.now();
    let inserted = 0;
    if (wave && response.decision === "READY_FOR_GATE") {
      const existing = this.database.query("SELECT question FROM campaign_research_requests WHERE project_id = $project AND wave_id = $wave")
        .all({ $project: projectId, $wave: wave.wave_id }) as Array<{ question: string }>;
      const normalized = new Set(existing.map((item) => item.question.trim().replace(/\s+/g, " ").toLowerCase()));
      for (const direction of Array.isArray(response.newDirections) ? response.newDirections : []) {
        const question = typeof direction?.question === "string" ? direction.question.trim() : "";
        const key = question.replace(/\s+/g, " ").toLowerCase();
        if (!question || normalized.has(key)) continue;
        this.database.query(`
          INSERT INTO campaign_research_requests(request_id, project_id, wave_id, question, status, created_at, updated_at)
          VALUES ($id, $project, $wave, $question, 'proposed', $now, $now)
        `).run({ $id: crypto.randomUUID(), $project: projectId, $wave: wave.wave_id, $question: question, $now: stamp });
        normalized.add(key);
        inserted += 1;
      }
    }
    this.database.query("UPDATE campaign_redirect_inputs SET status = 'applied', updated_at = $now, applied_at = $now WHERE input_id = $id")
      .run({ $id: input.input_id, $now: stamp });
    const canOpenReview = inserted > 0 && ["DECISION_REQUIRED", "NEXT_WAVE_READY", "PLANNING"].includes(project.current_phase);
    const phase = canOpenReview ? "RESEARCH_REVIEW" : project.current_phase;
    if (wave && canOpenReview) this.database.query("UPDATE campaign_waves SET phase = 'RESEARCH_REVIEW', updated_at = $now WHERE wave_id = $wave").run({ $wave: wave.wave_id, $now: stamp });
    const decisionId = crypto.randomUUID();
    this.database.query(`
      INSERT INTO campaign_decisions(decision_id, project_id, wave_id, decision, note, actor, created_at)
      VALUES ($id, $project, $wave, 'external_redirect', $note, $actor, $now)
    `).run({ $id: decisionId, $project: projectId, $wave: wave?.wave_id || "", $note: response.summary.slice(0, 4_000), $actor: actor, $now: stamp });
    this.port.touchProject(projectId, phase);
    this.port.recordEvent(projectId, "redirect", input.input_id, "campaign.redirect.applied", { actor, decision: response.decision, insertedResearchRequests: inserted, phase });
    return { inputId: input.input_id, decision: response.decision, insertedResearchRequests: inserted, phase };
  }

  async requestTriage(projectId: string): Promise<Record<string, unknown>> {
    if (!this.port.coordinationInterface(projectId).capabilities.account) {
      throw new Error("Wave triage requires an aligned imported-wave or controller-owned boundary");
    }
    if (!this.coordinators.get(projectId)) throw new Error("Attach a Sol coordinator before requesting wave triage");
    const wave = this.waves.latest(projectId);
    if (!wave) throw new Error("Adopt a wave before asking Sol to triage it");
    const activeLanes = (this.port.observer()?.lanes ?? []).filter((lane) => lane.project === projectId && lane.lifecycle === "active");
    this.port.syncWave(projectId, activeLanes);
    const { evidence, accounting } = this.waveEvidence(projectId, wave, "campaign-wave-triage-bundle/v1");
    if (Number(accounting.unaccounted) === 0) throw new Error("This wave is already fully accounted");
    if (Number(accounting.running) > 0) throw new Error(`Wave still has ${accounting.running} running lane(s)`);
    const { bundlePath, evidenceDigest } = await this.writeEvidenceBundle(wave.wave_id, "triage", evidence);
    const coordinator = await this.coordinators.writable(projectId);
    const prompt = [
      `You are the bound Sol semantic coordinator for project ${projectId}.`,
      `The campaign project root is: ${this.port.projectRoot(projectId)}`,
      `Wave ${wave.wave_id} has stopped running but is not fully accounted. A mechanically frozen triage bundle is at: ${bundlePath}`,
      `Its bound digest is ${evidenceDigest}. Return that exact waveId and evidenceDigest in your response.`,
      "Read the frozen campaign context and every lane receipt. Propose an explicit disposition only for unaccounted lanes; use NONE for lanes whose existing accounting should stand. Distinguish a repairable custody/reconciliation gap from evidence that should be superseded, abandoned, or carried into another wave.",
      "This is a read-only proposal turn. Do not modify files, dispatch workers, merge, push, reconcile lanes, apply dispositions, or promote campaign truth. Give concrete recommended actions and surface research questions or blockers. The control plane will require an explicit human apply step.",
    ].join("\n\n");
    const turn = await this.codex.startTurn({
      threadId: coordinator.thread_id,
      input: [{ type: "text", text: prompt }],
      cwd: coordinator.thread_cwd || this.port.workspaceRoot(),
      model: coordinator.model || undefined,
      effort: coordinator.effort || "high",
      approvalPolicy: "on-request",
      sandboxPolicy: { type: "readOnly" },
      outputSchema: this.port.triageSchema(),
    });
    if (!turn.id) throw new Error("Codex App Server did not return a triage turn id");
    const stamp = this.port.now();
    this.database.query(`
      INSERT INTO campaign_wave_triages(wave_id, project_id, thread_id, turn_id, status, bundle_path, evidence_digest, response_json, created_at, updated_at)
      VALUES ($wave, $project, $thread, $turn, 'drafting', $path, $digest, '{}', $now, $now)
      ON CONFLICT(wave_id) DO UPDATE SET thread_id = excluded.thread_id, turn_id = excluded.turn_id,
        status = excluded.status, bundle_path = excluded.bundle_path, evidence_digest = excluded.evidence_digest,
        response_json = '{}', updated_at = excluded.updated_at
    `).run({ $wave: wave.wave_id, $project: projectId, $thread: coordinator.thread_id, $turn: turn.id, $path: bundlePath, $digest: evidenceDigest, $now: stamp });
    this.database.query("UPDATE campaign_coordinators SET status = 'working', last_turn_id = $turn, last_event_at = $now WHERE project_id = $project")
      .run({ $turn: turn.id, $now: stamp, $project: projectId });
    this.port.recordEvent(projectId, "wave-triage", wave.wave_id, "wave.triage.requested", { threadId: coordinator.thread_id, turnId: turn.id, evidenceDigest });
    return { waveId: wave.wave_id, threadId: coordinator.thread_id, turnId: turn.id, evidenceDigest, bundlePath };
  }

  applyTriage(projectId: string, args: Record<string, any>, actor: string): Record<string, unknown> {
    if (!this.port.coordinationInterface(projectId).capabilities.account) {
      throw new Error("Wave triage application requires an aligned imported-wave or controller-owned boundary");
    }
    const wave = this.waves.latest(projectId);
    if (!wave) throw new Error("No wave is available for triage application");
    const triage = this.database.query("SELECT * FROM campaign_wave_triages WHERE wave_id = $wave").get({ $wave: wave.wave_id }) as WaveTriageRow | null;
    if (!triage || triage.status !== "drafted") throw new Error("Sol has not produced an applicable triage proposal");
    if (typeof args.waveId === "string" && args.waveId !== wave.wave_id) throw new Error("The triage proposal is for a different wave");
    if (typeof args.evidenceDigest === "string" && args.evidenceDigest !== triage.evidence_digest) throw new Error("The triage proposal evidence digest has changed");
    const response = parseJson<Record<string, any>>(triage.response_json, {});
    if (response.waveId !== wave.wave_id || response.evidenceDigest !== triage.evidence_digest) throw new Error("Sol's triage response is not bound to the current wave evidence");
    const rows = new Map(this.waves.members(wave.wave_id).map((row) => [row.lane_id, row]));
    const proposed: Array<{ laneId: string; disposition: string; reason: string }> = [];
    for (const recommendation of Array.isArray(response.laneRecommendations) ? response.laneRecommendations : []) {
      const laneId = typeof recommendation?.laneId === "string" ? recommendation.laneId : "";
      const disposition = typeof recommendation?.disposition === "string" ? recommendation.disposition : "";
      const reason = typeof recommendation?.reason === "string" ? recommendation.reason.trim().slice(0, 1000) : "";
      if (!laneId || disposition === "NONE") continue;
      if (!WAVE_DISPOSITIONS.has(disposition)) throw new Error(`Sol proposed an invalid disposition for ${laneId}`);
      if (!reason) throw new Error(`Sol did not provide a reason for ${laneId}`);
      const row = rows.get(laneId);
      if (!row) throw new Error(`Sol proposed a disposition for an unknown wave lane: ${laneId}`);
      if (waveLaneAccounted(row)) continue;
      proposed.push({ laneId, disposition, reason });
    }
    const stamp = this.port.now();
    const result = this.waveCommands.applyDispositions(wave, proposed, stamp);
    for (const disposition of result.applied) {
      this.port.recordEvent(projectId, "lane", disposition.laneId, "lane.disposition.recorded", { waveId: wave.wave_id, disposition: disposition.disposition, reason: disposition.reason, actor, source: "sol-triage" });
    }
    this.database.query("UPDATE campaign_wave_triages SET status = 'applied', updated_at = $now WHERE wave_id = $wave")
      .run({ $now: stamp, $wave: wave.wave_id });
    this.port.touchProject(projectId, result.accounting.complete ? "SYNTHESIS_READY" : undefined);
    this.port.recordEvent(projectId, "wave-triage", wave.wave_id, "wave.triage.applied", { actor, applied: result.applied, accounting: result.accounting });
    return { waveId: wave.wave_id, applied: result.applied, accounting: result.accounting };
  }

  async prepareSynthesis(projectId: string): Promise<Record<string, unknown>> {
    const lanes = (this.port.observer()?.lanes ?? []).filter((lane) => lane.project === projectId && lane.lifecycle === "active").sort((a, b) => a.id.localeCompare(b.id));
    let wave = this.waves.latest(projectId);
    if (!wave) wave = this.port.adoptWave(projectId, lanes);
    if (!this.port.coordinationInterface(projectId).capabilities.synthesize) {
      throw new Error("Synthesis preparation requires an aligned imported-wave or controller-owned boundary");
    }
    this.port.syncWave(projectId, lanes);
    const waveLanes = this.waves.members(wave.wave_id);
    const accounting = waveAccounting(waveLanes);
    if (!accounting.complete) throw new Error(`Wave has ${accounting.unaccounted} unaccounted lane(s)`);
    const contexts = this.contexts(projectId);
    const evidence = {
      schema: "campaign-synthesis-bundle/v2",
      projectId,
      waveId: wave.wave_id,
      accounting,
      strategy: this.port.strategyBundleContext(projectId),
      externalRedirects: this.redirectContext(projectId),
      contextSources: this.contextEvidence(contexts),
      lanes: waveLanes.map((row) => this.laneEvidence(row, false)),
    };
    const evidenceHash = this.port.digest(evidence);
    if (wave.evidence_digest === `sha256:${evidenceHash}` && wave.bundle_path) return { waveId: wave.wave_id, evidenceDigest: wave.evidence_digest, bundlePath: wave.bundle_path, reused: true };
    const createdAt = this.port.now();
    const bundle = { ...evidence, generatedAt: createdAt, evidenceDigest: `sha256:${evidenceHash}` };
    await mkdir(this.bundleRoot, { recursive: true });
    const bundlePath = join(this.bundleRoot, `${wave.wave_id}-${evidenceHash.slice(0, 8)}.json`);
    const temporaryPath = `${bundlePath}.${crypto.randomUUID()}.tmp`;
    await writeFile(temporaryPath, `${JSON.stringify(bundle, null, 2)}\n`, { encoding: "utf8", mode: 0o600 });
    await rename(temporaryPath, bundlePath);
    this.database.query("UPDATE campaign_waves SET phase = 'SYNTHESIS_READY', evidence_digest = $digest, bundle_path = $path, updated_at = $now WHERE wave_id = $wave")
      .run({ $digest: `sha256:${evidenceHash}`, $path: bundlePath, $now: createdAt, $wave: wave.wave_id });
    if (this.port.project(projectId).current_phase !== "SYNTHESIS_READY") this.port.touchProject(projectId, "SYNTHESIS_READY");
    this.port.recordEvent(projectId, "wave", wave.wave_id, "synthesis.bundle.prepared", { evidenceDigest: `sha256:${evidenceHash}`, laneCount: waveLanes.length, contextCount: contexts.length });
    return { waveId: wave.wave_id, evidenceDigest: `sha256:${evidenceHash}`, bundlePath, reused: false, accounting, contextCount: contexts.length };
  }

  async requestSynthesis(projectId: string, retry: { turnId: string; status: string } | null = null): Promise<Record<string, unknown>> {
    if (!this.port.coordinationInterface(projectId).capabilities.synthesize) {
      throw new Error("Synthesis requires an aligned imported-wave or controller-owned boundary");
    }
    const project = this.port.project(projectId);
    const wave = this.waves.latest(projectId);
    const requiredPhase = retry ? "SYNTHESIZING" : "SYNTHESIS_READY";
    if (project.current_phase !== requiredPhase) throw new Error(`Synthesis request requires ${requiredPhase}, currently ${project.current_phase}`);
    if (!this.coordinators.get(projectId)) throw new Error("Attach a Sol coordinator before requesting synthesis");
    if (!wave?.bundle_path) throw new Error("Prepare a synthesis bundle before requesting synthesis");
    const coordinator = await this.coordinators.writable(projectId);
    const prompt = [
      `You are the Sol semantic coordinator for project ${projectId}.`,
      `The campaign project root is: ${this.port.projectRoot(projectId)}`,
      `A mechanically frozen evidence bundle for ${wave.wave_id} is at: ${wave.bundle_path}`,
      `Its bound digest is ${wave.evidence_digest}.`,
      `Applied external redirect bundles: ${JSON.stringify(this.redirectContext(projectId).map((item) => ({ title: item.title, inputDigest: item.inputDigest, bundlePath: item.bundlePath })))}`,
      "Treat this as a fast semantic wave review, not a new research lane. Read the frozen context, lane accounting, failed receipts, and explicit dispositions; summarize what the wave changed and run quick consistency checks over its claims, custody, dependencies, and scope.",
      "Do not modify repository files, dispatch workers, merge, push, or promote campaign truth in this turn.",
      "Treat READY_FOR_SEMANTIC_REVIEW as custody readiness only. Failed, blocked, abandoned, superseded, and carried-forward lanes are evidence too. Explicitly classify each lane, preserve contradictions, flag tunnel-vision risks, and give the coordinator concrete guidance for shaping—not dispatching—the next bounded lane plan using named topology profiles.",
      "Maintain operatorBrief as a durable, human-friendly campaign briefing: a plain-language headline, where the campaign stands, two or three recent concrete advances, the current focus, the next operator decision, and only the most important watchouts. Keep it concise and understandable without task IDs or internal control-plane terminology.",
      "The bundle includes a shadow-mode campaign charter, persistent strategic tracks, measured resource allocation, and computed drift signals. Complete strategyAssessment explicitly. Activity is not progress: record ADVANCED only when evidence changes a claim, denominator, candidate supply, candidate decision, or measured scaling result. Use UNCHANGED for custody or maintenance that preserves mathematical semantics.",
      "Classify the work mix across coverage, supply, and decision, while marking frontier, experiment, maintenance, and audit work separately. Infrastructure is charged to the strategic track it supports; it is not a fourth research track. Recommend rebalancing when support work, repetition, or one-track concentration exceeds the charter. This is advisory shadow mode: report policy tension clearly but do not silently rewrite the charter.",
    ].join("\n\n");
    const turn = await this.codex.startTurn({
      threadId: coordinator.thread_id,
      input: [{ type: "text", text: prompt }],
      cwd: coordinator.thread_cwd || this.port.workspaceRoot(),
      model: coordinator.model || undefined,
      effort: coordinator.effort || "high",
      approvalPolicy: "on-request",
      sandboxPolicy: { type: "readOnly" },
      outputSchema: this.port.synthesisSchema(),
    });
    if (!turn.id) throw new Error("Codex App Server did not return a synthesis turn id");
    const stamp = this.port.now();
    this.database.query(`
      INSERT INTO campaign_syntheses(wave_id, thread_id, turn_id, status, response_json, created_at, updated_at)
      VALUES ($wave, $thread, $turn, 'drafting', '{}', $now, $now)
      ON CONFLICT(wave_id) DO UPDATE SET thread_id = excluded.thread_id, turn_id = excluded.turn_id,
        status = excluded.status, response_json = '{}', updated_at = excluded.updated_at
    `).run({ $wave: wave.wave_id, $thread: coordinator.thread_id, $turn: turn.id, $now: stamp });
    this.database.query("UPDATE campaign_waves SET phase = 'SYNTHESIZING', synthesis_turn_id = $turn, updated_at = $now WHERE wave_id = $wave")
      .run({ $turn: turn.id, $now: stamp, $wave: wave.wave_id });
    this.database.query("UPDATE campaign_coordinators SET status = 'working', last_turn_id = $turn, last_event_at = $now WHERE project_id = $project")
      .run({ $turn: turn.id, $now: stamp, $project: projectId });
    this.port.touchProject(projectId, "SYNTHESIZING");
    this.port.recordEvent(projectId, "synthesis", wave.wave_id, retry ? "synthesis.retried" : "synthesis.requested", {
      threadId: coordinator.thread_id,
      turnId: turn.id,
      ...(retry ? { priorTurnId: retry.turnId, priorStatus: retry.status, immutableBundleReused: true } : {}),
    });
    return { waveId: wave.wave_id, threadId: coordinator.thread_id, turnId: turn.id, retried: Boolean(retry), priorTurnId: retry?.turnId || "" };
  }

  async reconcileSynthesis(projectId: string): Promise<Record<string, unknown>> {
    if (this.port.project(projectId).current_phase !== "SYNTHESIZING") throw new Error("Synthesis reconciliation requires SYNTHESIZING");
    const wave = this.waves.latest(projectId);
    if (!wave) throw new Error("No wave is available for synthesis reconciliation");
    const synthesis = this.database.query("SELECT thread_id, turn_id, status FROM campaign_syntheses WHERE wave_id = $wave")
      .get({ $wave: wave.wave_id }) as { thread_id: string; turn_id: string; status: string } | null;
    if (!synthesis || synthesis.status !== "drafting" || !synthesis.thread_id || !synthesis.turn_id) {
      throw new Error("No drafting synthesis turn is available to reconcile");
    }
    const detail = await this.codex.readThreadDetail(synthesis.thread_id);
    const turns = Array.isArray(detail.turns) ? detail.turns : [];
    const turn = turns.find((candidate: any) => candidate?.id === synthesis.turn_id);
    const status = typeof turn?.status === "string" ? turn.status : String(turn?.status?.type || "unknown");
    if (!["completed", "failed", "interrupted", "cancelled", "canceled"].includes(status)) {
      const stamp = this.port.now();
      this.database.query("UPDATE campaign_syntheses SET updated_at = $now WHERE wave_id = $wave")
        .run({ $now: stamp, $wave: wave.wave_id });
      this.port.recordEvent(projectId, "synthesis", wave.wave_id, "synthesis.turn.rechecked", { turnId: synthesis.turn_id, status, restarted: false });
      return { waveId: wave.wave_id, turnId: synthesis.turn_id, status, restarted: false };
    }
    return this.requestSynthesis(projectId, { turnId: synthesis.turn_id, status });
  }

  reviewSynthesis(projectId: string, args: Record<string, any>, actor: string): Record<string, unknown> {
    const wave = this.waves.latest(projectId);
    if (!wave) throw new Error("No wave is available for review");
    if (this.port.project(projectId).current_phase !== "DECISION_REQUIRED") throw new Error("Synthesis review requires DECISION_REQUIRED");
    const decision = typeof args.decision === "string" ? args.decision.trim().toLowerCase() : "";
    if (!["accept", "research", "revise", "block"].includes(decision)) throw new Error(`Invalid synthesis review decision: ${decision}`);
    const note = typeof args.note === "string" ? args.note.trim().slice(0, 4000) : "";
    const decisionId = crypto.randomUUID();
    const createdAt = this.port.now();
    this.database.query(`
      INSERT INTO campaign_decisions(decision_id, project_id, wave_id, decision, note, actor, created_at)
      VALUES ($id, $project, $wave, $decision, $note, $actor, $now)
    `).run({ $id: decisionId, $project: projectId, $wave: wave.wave_id, $decision: decision, $note: note, $actor: actor, $now: createdAt });
    let phase = decision === "accept" ? "NEXT_WAVE_READY" : decision === "research" ? "RESEARCH_REVIEW" : decision === "revise" ? "REVISING" : "BLOCKED";
    let insertedResearchRequests = 0;
    const synthesis = this.database.query("SELECT response_json FROM campaign_syntheses WHERE wave_id = $wave").get({ $wave: wave.wave_id }) as { response_json: string } | null;
    if (decision === "research" && synthesis) {
      const response = parseJson<Record<string, any>>(synthesis.response_json, {});
      const focusTaskId = typeof args.focusTaskId === "string" ? args.focusTaskId.trim() : "";
      if (focusTaskId) {
        const recommendedTaskIds = new Set((Array.isArray(response.nextWave?.lanes) ? response.nextWave.lanes : []).map((lane: any) => typeof lane?.taskId === "string" ? lane.taskId.trim() : "").filter(Boolean));
        if (!recommendedTaskIds.has(focusTaskId)) throw new Error(`The revised synthesis did not recommend ${focusTaskId}`);
        const stagedRequests = this.database.query("SELECT request_id, question FROM campaign_research_requests WHERE project_id = $project AND wave_id = $wave AND status = 'approved_for_dispatch'")
          .all({ $project: projectId, $wave: wave.wave_id }) as Array<{ request_id: string; question: string }>;
        const checkedPlan = this.database.query("SELECT response_json FROM campaign_research_plans WHERE project_id = $project AND wave_id = $wave ORDER BY created_at DESC LIMIT 1")
          .get({ $project: projectId, $wave: wave.wave_id }) as { response_json: string } | null;
        const checkedLanes = parseJson<Record<string, any>>(checkedPlan?.response_json || "{}", {}).lanes;
        const taskByRequestId = new Map((Array.isArray(checkedLanes) ? checkedLanes : []).map((lane: any) => [String(lane?.requestId || ""), String(lane?.taskId || "")] as const).filter(([requestId, taskId]) => requestId && taskId));
        const stagedTaskIds = new Set(stagedRequests.map((request) => taskByRequestId.get(request.request_id) || "").filter(Boolean));
        if (!stagedTaskIds.has(focusTaskId)) throw new Error(`${focusTaskId} is not already approved for dispatch`);
        phase = "RESEARCH_READY";
      } else {
        const requests = Array.isArray(response.researchRequests) ? response.researchRequests : [];
        const existing = this.database.query("SELECT request_id, question, status FROM campaign_research_requests WHERE project_id = $project AND wave_id = $wave")
          .all({ $project: projectId, $wave: wave.wave_id }) as Array<{ request_id: string; question: string; status: string }>;
        const normalized = new Map(existing.map((item) => [item.question.trim().replace(/\s+/g, " ").toLowerCase(), item]));
        for (const value of requests) {
          const question = typeof value === "string" ? value.trim() : "";
          if (!question) continue;
          const key = question.replace(/\s+/g, " ").toLowerCase();
          const prior = normalized.get(key);
          if (prior) {
            if (prior.status === "planned_followup") {
              this.database.query("UPDATE campaign_research_requests SET status = 'proposed', updated_at = $now WHERE request_id = $request").run({ $now: createdAt, $request: prior.request_id });
              insertedResearchRequests += 1;
            }
            continue;
          }
          const requestId = crypto.randomUUID();
          this.database.query(`INSERT INTO campaign_research_requests(request_id, project_id, wave_id, question, status, created_at, updated_at) VALUES ($id, $project, $wave, $question, 'proposed', $now, $now)`)
            .run({ $id: requestId, $project: projectId, $wave: wave.wave_id, $question: question, $now: createdAt });
          normalized.set(key, { request_id: requestId, question, status: "proposed" });
          insertedResearchRequests += 1;
        }
        if (!insertedResearchRequests) {
          const staged = this.database.query("SELECT COUNT(*) AS count FROM campaign_research_requests WHERE project_id = $project AND wave_id = $wave AND status = 'approved_for_dispatch'")
            .get({ $project: projectId, $wave: wave.wave_id }) as { count: number } | null;
          if (staged?.count) phase = "RESEARCH_READY";
        }
      }
    }
    this.database.query("UPDATE campaign_waves SET phase = $phase, updated_at = $now WHERE wave_id = $wave").run({ $phase: phase, $now: createdAt, $wave: wave.wave_id });
    this.port.touchProject(projectId, phase);
    const focusTaskId = typeof args.focusTaskId === "string" ? args.focusTaskId.trim() : "";
    this.port.recordEvent(projectId, "decision", decisionId, "synthesis.reviewed", { waveId: wave.wave_id, decision, note, actor, phase, insertedResearchRequests, focusTaskId });
    return { decisionId, waveId: wave.wave_id, decision, phase, insertedResearchRequests, focusTaskId };
  }

  private waveEvidence(projectId: string, wave: WaveRecord, schema: string): { evidence: Record<string, unknown>; accounting: Record<string, number | boolean> } {
    const members = this.waves.members(wave.wave_id);
    const accounting = waveAccounting(members);
    return {
      accounting,
      evidence: { schema, projectId, waveId: wave.wave_id, accounting, contextSources: this.contextEvidence(this.contexts(projectId)), lanes: members.map((row) => this.laneEvidence(row, true)) },
    };
  }

  private contexts(projectId: string): ContextSourceRow[] {
    return this.database.query("SELECT * FROM campaign_context_sources WHERE project_id = $project ORDER BY role, path").all({ $project: projectId }) as ContextSourceRow[];
  }

  private contextEvidence(contexts: ContextSourceRow[]) {
    return contexts.map((source) => ({ id: source.source_id, role: source.role, path: source.path, sha256: source.sha256, modifiedAt: source.modified_at, content: source.content }));
  }

  private laneEvidence(row: WaveMemberRecord, includeAccounted: boolean) {
    const lane = parseJson<LaneSnapshot | null>(row.snapshot_json, null);
    return {
      id: row.lane_id,
      accountingState: row.accounting_state,
      ...(includeAccounted ? { accounted: waveLaneAccounted(row) } : {}),
      disposition: row.disposition || null,
      dispositionReason: row.reason || null,
      runtime: lane ? {
        task: lane.task, lane: lane.lane, host: lane.host, model: lane.model, effort: lane.effort, laneKind: lane.laneKind,
        profile: lane.topology?.profile ?? "legacy", topologyCompliance: lane.topology?.compliance ?? "unobserved", topology: lane.topology,
        baseBranch: lane.branch, worktree: lane.worktree, jobId: lane.jobId, lifecycle: lane.lifecycle, daemon: lane.daemon,
        landing: lane.landing, output: lane.output, detail: lane.detail, launchedAt: lane.launchedAt, completedAt: lane.completedAt, updatedAt: lane.updatedAt,
      } : null,
    };
  }

  private async writeEvidenceBundle(waveId: string, kind: string, evidence: Record<string, unknown>): Promise<{ bundlePath: string; evidenceDigest: string }> {
    const evidenceHash = this.port.digest(evidence);
    const evidenceDigest = `sha256:${evidenceHash}`;
    const createdAt = this.port.now();
    await mkdir(this.bundleRoot, { recursive: true });
    const bundlePath = join(this.bundleRoot, `${waveId}-${kind}-${evidenceHash.slice(0, 8)}.json`);
    const temporaryPath = `${bundlePath}.${crypto.randomUUID()}.tmp`;
    await writeFile(temporaryPath, `${JSON.stringify({ ...evidence, generatedAt: createdAt, evidenceDigest }, null, 2)}\n`, { encoding: "utf8", mode: 0o600 });
    await rename(temporaryPath, bundlePath);
    return { bundlePath, evidenceDigest };
  }

  private async writeBundle(name: string, body: Record<string, unknown>, boundDigest: string): Promise<string> {
    await mkdir(this.bundleRoot, { recursive: true });
    const bundlePath = join(this.bundleRoot, `${name}-${boundDigest.slice(7, 15)}.json`);
    const temporaryPath = `${bundlePath}.${crypto.randomUUID()}.tmp`;
    await writeFile(temporaryPath, `${JSON.stringify({ ...body, bundleDigest: boundDigest }, null, 2)}\n`, { encoding: "utf8", mode: 0o600 });
    await rename(temporaryPath, bundlePath);
    return bundlePath;
  }
}
