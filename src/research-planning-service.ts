import { Database } from "bun:sqlite";
import { mkdir, rename, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { CodexAppServerClient } from "./codex";
import type { CampaignCoordinationInterface } from "./campaign-coordination-interface-service";
import { CoordinatorSessionService } from "./coordinator-session-service";
import type { ResearchLaunchSpec } from "./research-execution-service";

interface ResearchRequestRow {
  request_id: string;
  project_id: string;
  wave_id: string;
  question: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface ResearchPlanRow {
  wave_id: string;
  project_id: string;
  thread_id: string;
  turn_id: string;
  status: string;
  bundle_path: string;
  evidence_digest: string;
  response_json: string;
  created_at: string;
  updated_at: string;
}

interface ResearchPlanningPort {
  project(projectId: string): { current_phase: string; dispatch_profile: string };
  coordinationInterface(projectId: string): CampaignCoordinationInterface;
  latestWave(projectId: string): { wave_id: string; evidence_digest: string } | null;
  projectRoot(projectId: string): string;
  workspaceRoot(): string;
  strategyBundleContext(projectId: string): unknown;
  redirectContext(projectId: string): unknown;
  staffingProfiles(): unknown[];
  resolveResearchSpec(request: ResearchRequestRow, planResponse: Record<string, any>): ResearchLaunchSpec | null;
  requireCleanContractWorkspace(projectRoot: string): Promise<boolean>;
  freezeLaunchPackets(projectRoot: string, packetPaths: string[], gitRepository: boolean): Promise<string>;
  planSchema(): Record<string, unknown>;
  touchProject(projectId: string, phase: string): void;
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

function within(root: string, candidate: string): boolean {
  const normalizedRoot = resolve(root);
  const normalizedCandidate = resolve(candidate);
  return normalizedCandidate === normalizedRoot || normalizedCandidate.startsWith(`${normalizedRoot}\\`) || normalizedCandidate.startsWith(`${normalizedRoot}/`);
}

/** Owns frozen Sol lane-plan review and the human checked-plan gate. */
export class ResearchPlanningService {
  constructor(
    private readonly database: Database,
    private readonly codex: CodexAppServerClient,
    private readonly bundleRoot: string,
    private readonly coordinators: CoordinatorSessionService,
    private readonly port: ResearchPlanningPort,
  ) {}

  async startReview(projectId: string, actor: string): Promise<Record<string, unknown>> {
    if (!this.port.coordinationInterface(projectId).capabilities.plan) {
      throw new Error("Research planning requires an aligned imported-wave or controller-owned boundary");
    }
    const project = this.port.project(projectId);
    const wave = this.port.latestWave(projectId);
    if (!wave) throw new Error("No wave is available for research review");
    const revising = project.current_phase === "REVISING";
    if (!revising && project.current_phase !== "RESEARCH_REVIEW") {
      throw new Error("Starting research review requires RESEARCH_REVIEW or REVISING");
    }
    const queuedStatus = revising ? "revision_requested" : "proposed";
    const proposed = this.database.query(`
      SELECT * FROM campaign_research_requests
      WHERE project_id = $project AND wave_id = $wave AND status = $status
      ORDER BY created_at, request_id
    `).all({ $project: projectId, $wave: wave.wave_id, $status: queuedStatus }) as ResearchRequestRow[];
    if (!proposed.length) throw new Error("No queued research requests are available to review");
    if (!this.coordinators.get(projectId)) throw new Error("Attach a Sol coordinator before checking the lane plan");
    const coordinator = await this.coordinators.writable(projectId);
    const synthesis = this.database.query("SELECT response_json FROM campaign_syntheses WHERE wave_id = $wave")
      .get({ $wave: wave.wave_id }) as { response_json: string } | null;
    const previousPlan = revising
      ? this.database.query("SELECT response_json FROM campaign_research_plans WHERE wave_id = $wave")
        .get({ $wave: wave.wave_id }) as { response_json: string } | null
      : null;
    const revisionDecision = revising
      ? this.database.query(`
        SELECT note FROM campaign_decisions
        WHERE project_id = $project AND wave_id = $wave AND decision = 'research_revise'
        ORDER BY created_at DESC LIMIT 1
      `).get({ $project: projectId, $wave: wave.wave_id }) as { note: string } | null
      : null;
    const priorRuns = this.database.query(`
      SELECT task_id, status, profile, model, effort, fanout, evidence_sha256, evidence_json, completed_at
      FROM campaign_research_runs WHERE project_id = $project ORDER BY created_at
    `).all({ $project: projectId }) as Array<Record<string, any>>;
    const operatorTransitions = this.database.query(`
      SELECT action_id, result_json, completed_at FROM campaign_actions
      WHERE project_id = $project AND action_type = 'campaign.operator-transition.execute' AND status = 'completed'
      ORDER BY completed_at DESC LIMIT 4
    `).all({ $project: projectId }) as Array<{ action_id: string; result_json: string; completed_at: string }>;
    const bundleBody = {
      schema: "campaign-research-plan-review/v1",
      projectId,
      waveId: wave.wave_id,
      waveEvidenceDigest: wave.evidence_digest,
      strategy: this.port.strategyBundleContext(projectId),
      synthesis: synthesis ? parseJson(synthesis.response_json, {}) : null,
      externalRedirects: this.port.redirectContext(projectId),
      revision: revising ? {
        operatorDirection: revisionDecision?.note || "Address every blocker and warning in the previous checked plan.",
        previousPlan: previousPlan ? parseJson(previousPlan.response_json, {}) : null,
      } : null,
      proposedRequests: proposed.map((request) => ({ id: request.request_id, question: request.question })),
      priorRuns: priorRuns.map((run) => ({
        taskId: run.task_id,
        status: run.status,
        profile: run.profile,
        model: run.model,
        effort: run.effort,
        fanout: run.fanout,
        evidenceSha256: run.evidence_sha256,
        evidenceStatus: parseJson<Record<string, any>>(run.evidence_json, {}).status ?? "",
        completedAt: run.completed_at,
      })),
      operatorTransitions: operatorTransitions.map((transition) => ({
        actionId: transition.action_id,
        completedAt: transition.completed_at,
        ...parseJson<Record<string, unknown>>(transition.result_json, {}),
      })),
      staffingProfiles: this.port.staffingProfiles(),
      campaignDefaultProfile: ["sonnet-worker", "opus-lead-sonnet", "research-opus-max"].includes(project.dispatch_profile) ? project.dispatch_profile : "sonnet-worker",
      generatedAt: this.port.now(),
    };
    const evidenceDigest = `sha256:${this.port.digest(bundleBody)}`;
    await mkdir(this.bundleRoot, { recursive: true });
    const bundlePath = resolve(this.bundleRoot, `${wave.wave_id}-lane-plan-${evidenceDigest.slice(7, 15)}.json`);
    const temporaryPath = `${bundlePath}.${crypto.randomUUID()}.tmp`;
    await writeFile(temporaryPath, `${JSON.stringify({ ...bundleBody, evidenceDigest }, null, 2)}\n`, { encoding: "utf8", mode: 0o600 });
    await rename(temporaryPath, bundlePath);
    const prompt = [
      `You are the Sol lane-plan coordinator for project ${projectId}.`,
      `The frozen wave review and proposed lane bundle is at: ${bundlePath}`,
      `Its bound digest is ${evidenceDigest}.`,
      ...(revising ? [
        "This is a revision pass over a checked plan that the human gate declined to stage.",
        `Follow this operator direction exactly: ${revisionDecision?.note || "Address every blocker and warning in the previous checked plan."}`,
        "Use the previous checked plan in the frozen bundle as the baseline. Return a corrected structured plan, not a commentary on the old one.",
      ] : []),
      "Perform a quick but adversarial planning pass. Check dependency order, duplicate or obsolete work, whether each lane has an enforced launch contract, profile fit, evidence/stop conditions, resource proportionality, and signs of tunnel vision.",
      "Use the included shadow-mode strategy context. Return portfolioAssessment and classify every retained lane with a strategic track, work kind, expected measurable delta, evidence tier, parent/repair generation, and cost class. Infrastructure is charged to the strategic track it supports and does not count as a fourth research track.",
      "The charter is advisory in this pass, but do not hide violations: identify an imbalanced or outside-charter plan, estimate its maintenance share, and explain how the plan responds to every active drift signal. A maintenance or audit descendant beyond one automatic repair generation should normally be DROP or operator-held unless it fixes a demonstrated critical-path correctness defect.",
      "Allocate at research-question grain: each retained lane should own one coherent falsifiable question or tightly coupled proof/computation package, with an explicit stop condition and evidentiary output. Do not turn individual files, coefficients, or clerical substeps into separate lanes. Parallel lanes may share a priority. Use dependencies and HOLD/DROP behavior to prevent low-information work from marching ahead.",
      "You may KEEP, REVISE, or DROP each proposed request. Preserve every supplied requestId exactly and include each proposed request exactly once. Consolidate overlapping requests by REVISE-ing one into the coherent lane and DROP-ping the duplicates with a clear rationale. Do not add lanes in this pass; if a genuinely new question is missing, put it in operatorGuidance or risks for the next synthesis revision.",
      "For every lane return a structured contract. A lane runnable in this wave must use contract.status READY and bind baseRef to one exact 40-hex Git commit. A dependent lane whose successor commit does not exist yet must use AFTER_DEPENDENCY with an empty baseRef; it will be shown as planned follow-up work and must pass a later coordinator and human gate. DROP lanes use NOT_LAUNCHABLE. Never copy one lane's commit into an unrelated dependent lane.",
      "Sonnet worker is the normal profile. Use opus-lead-sonnet only for genuinely multi-part coordination and research-opus-max only for synthesis, adversarial cross-checking, or extracting/challenging new ideas from accumulated results.",
      "This is a read-only proposal. Do not modify files, dispatch workers, merge, push, promote claims, or consume the proposed plan. A human gate will decide whether to apply it.",
    ].join("\n\n");
    const turn = await this.codex.startTurn({
      threadId: coordinator.thread_id,
      input: [{ type: "text", text: prompt }],
      cwd: coordinator.thread_cwd || this.port.workspaceRoot(),
      model: coordinator.model || undefined,
      effort: coordinator.effort || "high",
      approvalPolicy: "on-request",
      sandboxPolicy: { type: "readOnly" },
      outputSchema: this.port.planSchema(),
    });
    if (!turn.id) throw new Error("Codex App Server did not return a lane-plan turn id");
    const stamp = this.port.now();
    this.database.query(`
      INSERT INTO campaign_research_plans(wave_id, project_id, thread_id, turn_id, status, bundle_path, evidence_digest, response_json, created_at, updated_at)
      VALUES ($wave, $project, $thread, $turn, 'drafting', $path, $digest, '{}', $now, $now)
      ON CONFLICT(wave_id) DO UPDATE SET thread_id = excluded.thread_id, turn_id = excluded.turn_id,
        status = excluded.status, bundle_path = excluded.bundle_path, evidence_digest = excluded.evidence_digest,
        response_json = '{}', updated_at = excluded.updated_at
    `).run({ $wave: wave.wave_id, $project: projectId, $thread: coordinator.thread_id, $turn: turn.id, $path: bundlePath, $digest: evidenceDigest, $now: stamp });
    this.database.query(`
      UPDATE campaign_research_requests SET status = 'in_review', updated_at = $now
      WHERE project_id = $project AND wave_id = $wave AND status = $status
    `).run({ $project: projectId, $wave: wave.wave_id, $status: queuedStatus, $now: stamp });
    this.database.query("UPDATE campaign_coordinators SET status = 'working', last_turn_id = $turn, last_event_at = $now WHERE project_id = $project")
      .run({ $turn: turn.id, $now: stamp, $project: projectId });
    this.database.query("UPDATE campaign_waves SET phase = 'RESEARCH_REVIEW', updated_at = $now WHERE wave_id = $wave")
      .run({ $now: stamp, $wave: wave.wave_id });
    this.port.touchProject(projectId, "RESEARCH_REVIEW");
    this.port.recordEvent(projectId, "research_review", wave.wave_id, "research.review.started", {
      waveId: wave.wave_id,
      requestCount: proposed.length,
      bundlePath,
      evidenceDigest,
      threadId: coordinator.thread_id,
      turnId: turn.id,
      actor,
      revision: revising,
    });
    return { waveId: wave.wave_id, requestCount: proposed.length, status: "drafting", revision: revising, bundlePath, evidenceDigest, threadId: coordinator.thread_id, turnId: turn.id, phase: "RESEARCH_REVIEW" };
  }

  async resolveReview(projectId: string, args: Record<string, any>, actor: string): Promise<Record<string, unknown>> {
    if (!this.port.coordinationInterface(projectId).capabilities.plan) {
      throw new Error("Research plan resolution requires an aligned imported-wave or controller-owned boundary");
    }
    const project = this.port.project(projectId);
    const wave = this.port.latestWave(projectId);
    if (!wave) throw new Error("No wave is available for research review");
    if (project.current_phase !== "RESEARCH_REVIEW") throw new Error("Resolving research review requires RESEARCH_REVIEW");
    const decision = typeof args.decision === "string" ? args.decision.trim().toLowerCase() : "";
    if (!["approve", "revise", "block"].includes(decision)) throw new Error(`Invalid research review decision: ${decision}`);
    const note = typeof args.note === "string" ? args.note.trim().slice(0, 4000) : "";
    const counts = this.database.query(`
      SELECT COUNT(*) AS total,
        SUM(CASE WHEN status = 'in_review' THEN 1 ELSE 0 END) AS in_review
      FROM campaign_research_requests
      WHERE project_id = $project AND wave_id = $wave
    `).get({ $project: projectId, $wave: wave.wave_id }) as { total: number; in_review: number } | null;
    if (!counts?.total) throw new Error("No research requests are available to resolve");
    if (!counts.in_review) throw new Error("Begin the research review before resolving it");
    const plan = this.database.query("SELECT * FROM campaign_research_plans WHERE wave_id = $wave")
      .get({ $wave: wave.wave_id }) as ResearchPlanRow | null;
    if (!plan || plan.status !== "drafted") throw new Error("Wait for the coordinator's checked lane plan before resolving this gate");
    const planResponse = parseJson<Record<string, any>>(plan.response_json, {});
    if (decision === "approve" && planResponse.decision !== "READY_FOR_GATE") {
      throw new Error(`The coordinator plan is ${planResponse.decision || "not ready"}; request revision or block instead`);
    }
    const requestStatus = decision === "approve" ? "approved_for_dispatch" : decision === "revise" ? "revision_requested" : "blocked";
    const phase = decision === "approve" ? "RESEARCH_READY" : decision === "revise" ? "REVISING" : "BLOCKED";
    const stamp = this.port.now();
    const decisionId = crypto.randomUUID();
    let approved = 0;
    let revised = 0;
    let dropped = 0;
    let deferred = 0;
    let retiredStale = 0;
    let contractCommit = "";
    if (decision === "approve") {
      const inReviewRows = this.database.query(`
        SELECT * FROM campaign_research_requests
        WHERE project_id = $project AND wave_id = $wave AND status = 'in_review'
      `).all({ $project: projectId, $wave: wave.wave_id }) as ResearchRequestRow[];
      const byId = new Map(inReviewRows.map((request) => [request.request_id, request]));
      const lanes = Array.isArray(planResponse.lanes) ? planResponse.lanes : [];
      let frozenRequestIds = new Set<string>();
      if (plan.bundle_path && await Bun.file(plan.bundle_path).exists()) {
        const frozenBundle = parseJson<Record<string, any>>(await Bun.file(plan.bundle_path).text(), {});
        frozenRequestIds = new Set((Array.isArray(frozenBundle.proposedRequests) ? frozenBundle.proposedRequests : [])
          .map((request: any) => typeof request?.id === "string" ? request.id : "")
          .filter(Boolean));
      }
      const laneRequestIds = lanes.map((lane: any) => typeof lane?.requestId === "string" ? lane.requestId : "").filter(Boolean);
      if (frozenRequestIds.size && (laneRequestIds.length !== frozenRequestIds.size
        || new Set(laneRequestIds).size !== frozenRequestIds.size
        || laneRequestIds.some((requestId: string) => !frozenRequestIds.has(requestId)))) {
        throw new Error("The coordinator plan must account for every request in its frozen review bundle exactly once");
      }
      const currentPlanIds = frozenRequestIds.size ? frozenRequestIds : new Set(laneRequestIds);
      const staleInReviewRows = inReviewRows.filter((request) => !currentPlanIds.has(request.request_id));
      if (!lanes.some((lane: any) => ["KEEP", "REVISE"].includes(String(lane?.action || "")))) throw new Error("A dispatch approval must retain at least one bounded lane");
      const seen = new Set<string>();
      const planned: Array<{
        lane: Record<string, any>;
        request: ResearchRequestRow;
        requestId: string;
        action: string;
        question: string;
        launchSpec: ResearchLaunchSpec | null;
        status: "approved_for_dispatch" | "planned_followup" | "plan_excluded";
      }> = [];
      for (const lane of lanes) {
        const requestId = typeof lane?.requestId === "string" ? lane.requestId : "";
        const request = byId.get(requestId);
        if (!request || seen.has(requestId)) throw new Error(`The coordinator plan has an unknown or duplicate requestId: ${requestId}`);
        seen.add(requestId);
        const action = String(lane.action || "");
        if (action === "DROP") {
          planned.push({ lane, request, requestId, action, question: request.question, launchSpec: null, status: "plan_excluded" });
          continue;
        }
        if (!["KEEP", "REVISE"].includes(action)) throw new Error(`Invalid coordinator lane action for ${requestId}: ${action}`);
        const question = typeof lane.question === "string" ? lane.question.trim() : "";
        if (!question) throw new Error(`Coordinator lane ${requestId} has no bounded question`);
        const launchSpec = this.port.resolveResearchSpec(request, planResponse);
        const dependencies = Array.isArray(lane.dependsOnTaskIds)
          ? lane.dependsOnTaskIds.filter((value: unknown) => typeof value === "string" && Boolean(value.trim()))
          : [];
        const contractStatus = typeof lane.contract?.status === "string" ? lane.contract.status : "";
        const canWaitForSuccessor = contractStatus === "AFTER_DEPENDENCY" || (!contractStatus && dependencies.length > 0);
        if (!launchSpec && !canWaitForSuccessor) throw new Error(`Coordinator lane ${requestId} has no enforceable immutable launch contract`);
        planned.push({ lane, request, requestId, action, question, launchSpec, status: launchSpec ? "approved_for_dispatch" : "planned_followup" });
      }
      if (!planned.some((item) => item.status === "approved_for_dispatch")) throw new Error("The checked plan has no lane with a ready immutable launch contract; request revision instead");
      const projectRoot = this.port.projectRoot(projectId);
      const readyPacketPaths = planned.flatMap((item) => item.launchSpec ? [item.launchSpec.packetPath] : []);
      const gitRepository = await this.port.requireCleanContractWorkspace(projectRoot);
      for (const item of planned) if (item.launchSpec) await this.writeLaunchPacket(projectId, item.lane, planResponse, item.launchSpec);
      contractCommit = await this.port.freezeLaunchPackets(projectRoot, readyPacketPaths, gitRepository);
      const retire = this.database.query("UPDATE campaign_research_requests SET status = 'plan_excluded', updated_at = $now WHERE request_id = $request AND status = 'in_review'");
      for (const stale of staleInReviewRows) {
        retire.run({ $now: stamp, $request: stale.request_id });
        retiredStale += 1;
      }
      for (const item of planned) {
        this.database.query("UPDATE campaign_research_requests SET question = $question, status = $status, updated_at = $now WHERE request_id = $request")
          .run({ $question: item.question, $status: item.status, $now: stamp, $request: item.requestId });
        if (item.status === "approved_for_dispatch") approved += 1;
        if (item.status === "planned_followup") deferred += 1;
        if (item.status === "plan_excluded") dropped += 1;
        if (item.status !== "plan_excluded" && (item.action === "REVISE" || item.question !== item.request.question)) revised += 1;
      }
    } else {
      this.database.query(`
        UPDATE campaign_research_requests SET status = $status, updated_at = $now
        WHERE project_id = $project AND wave_id = $wave AND status = 'in_review'
      `).run({ $status: requestStatus, $now: stamp, $project: projectId, $wave: wave.wave_id });
    }
    this.database.query("UPDATE campaign_research_plans SET status = $status, updated_at = $now WHERE wave_id = $wave")
      .run({ $status: decision === "approve" ? "applied" : decision, $now: stamp, $wave: wave.wave_id });
    this.database.query(`
      INSERT INTO campaign_decisions(decision_id, project_id, wave_id, decision, note, actor, created_at)
      VALUES ($id, $project, $wave, $decision, $note, $actor, $now)
    `).run({ $id: decisionId, $project: projectId, $wave: wave.wave_id, $decision: `research_${decision}`, $note: note, $actor: actor, $now: stamp });
    this.database.query("UPDATE campaign_waves SET phase = $phase, updated_at = $now WHERE wave_id = $wave")
      .run({ $phase: phase, $now: stamp, $wave: wave.wave_id });
    this.port.touchProject(projectId, phase);
    this.port.recordEvent(projectId, "research_review", decisionId, "research.review.resolved", {
      waveId: wave.wave_id, decision, note, actor, requestCount: counts.in_review, requestStatus,
      approved, revised, dropped, deferred, retiredStale, contractCommit, phase,
    });
    return { decisionId, waveId: wave.wave_id, decision, requestStatus, requestCount: counts.in_review, approved, revised, dropped, deferred, retiredStale, contractCommit, phase };
  }

  private async writeLaunchPacket(projectId: string, lane: Record<string, any>, planResponse: Record<string, any>, spec: ResearchLaunchSpec): Promise<void> {
    const projectRoot = this.port.projectRoot(projectId);
    const packetPath = resolve(projectRoot, spec.packetPath);
    if (!within(projectRoot, packetPath)) throw new Error(`Research packet path escapes the project root: ${spec.packetPath}`);
    await mkdir(dirname(packetPath), { recursive: true });
    const dependencies = spec.dependsOnTaskIds?.length ? spec.dependsOnTaskIds.join(", ") : "none";
    const packet = [
      `# Research launch packet — ${spec.taskId}`,
      "",
      `**Profile:** \`${spec.profile}\`. **Base:** \`${spec.baseRef}\`. **Graph effect:** \`NONE\`.`,
      `**Dependencies:** ${dependencies}. **Operator release required:** ${spec.requiresOperatorRelease ? "yes" : "no"}.`,
      "",
      "## Bounded question", "", String(lane.question || "").trim(), "",
      "## Rationale", "", String(lane.rationale || "").trim(), "",
      "## Stop condition", "", String(lane.stopCondition || "").trim(), "",
      "## Required evidence", "", String(lane.evidenceExpected || "").trim(), "",
      `Write the immutable receipt to \`${spec.evidencePath}\` using \`${spec.outputContract}\`.`,
      "Before reporting completion, commit every allowed output—including the final receipt—to this isolated lane branch, then verify `git status --short` is empty. Do not merge, rebase, or push.",
      "", "Allowed writes:", "", `- \`${spec.evidencePath.replace(/\\/g, "/").replace(/\/[^/]+$/, "/**")}\``, "",
      "## Frozen operator guidance", "", String(planResponse.operatorGuidance || "").trim(), "",
      "## Scope", "",
      "Do not run SAT unless the bounded question explicitly authorizes it. Do not merge, push, promote claims, mutate Grand Portage, or launch dependent work. Stop on any contract, custody, dependency, or evidence mismatch.",
      "",
    ].join("\n");
    const temporaryPath = `${packetPath}.${crypto.randomUUID()}.tmp`;
    await writeFile(temporaryPath, packet, { encoding: "utf8", mode: 0o600 });
    await rename(temporaryPath, packetPath);
  }
}
