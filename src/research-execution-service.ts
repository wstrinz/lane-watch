import { EVIDENCE_REVIEW_GUIDANCE } from "./evidence-review-guidance";
import { Database } from "bun:sqlite";
import { mkdir, rename, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { CodexAppServerClient } from "./codex";
import type { AutopilotStartReadiness } from "./autopilot-readiness";
import type { CampaignCoordinationInterface } from "./campaign-coordination-interface-service";
import { buildWaveSchedule, waveScheduleDigest, type ScheduledLaunchSpec, type WaveScheduleCandidate, type WaveScheduleProposal } from "./wave-schedule";
import { WaveScheduleRepository, type WaveScheduleMemberRow, type WaveScheduleRow } from "./wave-schedule-repository";
import { ResearchLaunchJournal, type ResearchLaunchContext } from './research-launch-journal';

export interface ResearchLaunchSpec {
  taskId: string;
  priority: number;
  dependsOnTaskId?: string;
  dependsOnTaskIds?: string[];
  dependsOnEvidenceStatuses?: Array<"complete" | "blocked">;
  requiresOperatorRelease?: boolean;
  profile: string;
  host: "windows";
  model: string;
  effort: string;
  fanout: number;
  packetPath: string;
  baseRef: string;
  evidencePath: string;
  timeoutMinutes: number;
  tokenBudget: number;
  tools: string[];
  outputContract: string;
}

export interface ResearchLaunchResult {
  laneId: string;
  jobId: string;
  worktree: string;
  output: string;
}

export type ResearchLauncher = ((projectRoot: string, spec: ResearchLaunchSpec, context: Readonly<ResearchLaunchContext>) => Promise<ResearchLaunchResult>) & { preflight?: (projectRoot: string, spec: ResearchLaunchSpec) => void };

interface ResearchRequestRow {
  request_id: string;
  project_id: string;
  wave_id: string;
  question: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface ResearchRunRow {
  run_id: string;
  request_id: string;
  project_id: string;
  wave_id: string;
  task_id: string;
  status: string;
  profile: string;
  host: string;
  model: string;
  effort: string;
  fanout: number;
  packet_path: string;
  base_ref: string;
  lane_id: string;
  job_id: string;
  worktree: string;
  evidence_path: string;
  evidence_sha256: string;
  evidence_json: string;
  error: string;
  created_at: string;
  updated_at: string;
  completed_at: string;
}

interface ResearchPlanRow {
  wave_id: string;
  evidence_digest: string;
  response_json: string;
}

interface ResearchExecutionPort {
  project(projectId: string): { current_phase: string; dispatch_profile: string };
  coordinationInterface(projectId: string): CampaignCoordinationInterface;
  latestWave(projectId: string): { wave_id: string } | null;
  projectRoot(projectId: string): string;
  coordinatorFallbackCwd(): string;
  resourceSnapshot(projectId: string): Record<string, any>;
  startReadiness(projectId: string): AutopilotStartReadiness;
  coordinator(projectId: string): { thread_id: string; thread_cwd: string; model: string; effort: string } | null;
  writableCoordinator(projectId: string): Promise<{ thread_id: string; thread_cwd: string; model: string; effort: string }>;
  strategyBundleContext(projectId: string): unknown;
  redirectContext(projectId: string): unknown;
  resolveResearchSpec(request: ResearchRequestRow, planResponse: Record<string, any>): ResearchLaunchSpec | null;
  researchDependencySatisfied(spec: ResearchLaunchSpec, runs: ResearchRunRow[]): boolean;
  inferStrategy(taskId: string, question: string): { trackId: string; workKind: string };
  validateTerminalReceipt(receipt: Record<string, any>, taskId: string): void;
  synthesisSchema(): Record<string, unknown>;
  touchProject(projectId: string, phase?: string): void;
  recordEvent(projectId: string, aggregateType: string, aggregateId: string, eventType: string, payload: unknown): void;
  notifyChanged(): void;
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

/** Owns the checked-plan -> reserved schedule -> bounded execution -> semantic intake boundary. */
export class ResearchExecutionService {
  private readonly launches: ResearchLaunchJournal;
  constructor(
    private readonly database: Database,
    private readonly schedules: WaveScheduleRepository,
    private readonly codex: CodexAppServerClient,
    private readonly bundleRoot: string,
    private readonly launcher: ResearchLauncher,
    private readonly port: ResearchExecutionPort,
  ) { this.launches = new ResearchLaunchJournal(database); }

  /** Reconcile the durable invocation boundary before queued actions may resume.
   * An entered adapter may have launched work: startup neither infers a terminal
   * worker nor issues a stop or duplicate launch without its exact identity. */
  recoverInterruptedLaunches(): number {
    const interrupted=this.launches.interrupted();
    const projects=new Set<string>();
    const schedules=new Set<string>();
    this.database.transaction(()=>{
      for(const attempt of interrupted){
        const stamp=this.port.now(),message=attempt.status==='prepared'
          ? 'Controller restarted before this launch entered the adapter; the unused attempt was closed.'
          : 'Controller restarted before the launch receipt was recorded. Worker state is unverified; retain this attempt and inspect its exact launch identity before retrying.';
        this.settleUnansweredLaunch(attempt.attempt_id,message,stamp);
        projects.add(attempt.project_id);
        schedules.add(attempt.schedule_id);
        this.port.recordEvent(attempt.project_id,'research_run',attempt.run_id,'research.launch.recovered',{
          attemptId:attempt.attempt_id,scheduleId:attempt.schedule_id,priorStatus:attempt.status,
          outcome:attempt.status==='prepared'?'not-entered':'unverified',deadlineAt:attempt.deadline_at,
          restartedWorker:false,stoppedWorker:false,
        });
      }
      for(const scheduleId of schedules){
        const states=this.database.query('SELECT status FROM campaign_research_launch_attempts WHERE schedule_id=?').all(scheduleId) as Array<{status:string}>;
        const uncertain=states.some(row=>row.status==='uncertain'),members=this.schedules.members(scheduleId);
        const active=members.some(row=>['launching','running','blocked'].includes(row.status));
        const failed=members.some(row=>row.status==='failed');
        this.schedules.transitionSchedule(scheduleId,uncertain||active&&failed?'attention':active?'running':members.every(row=>row.status==='failed')?'failed':'landed',this.port.now());
      }
      for(const projectId of projects){
        const uncertain=this.database.query("SELECT 1 FROM campaign_research_launch_attempts WHERE project_id=? AND status='uncertain' LIMIT 1").get(projectId);
        const active=this.database.query("SELECT 1 FROM campaign_research_runs WHERE project_id=? AND status IN ('launching','running','blocked') LIMIT 1").get(projectId);
        this.port.touchProject(projectId,uncertain?'BLOCKED':active?'RESEARCH_RUNNING':'RESEARCH_READY');
      }
    })();
    return interrupted.length;
  }

  private settleUnansweredLaunch(attemptId:string,message:string,stamp:string):boolean {
    const attempt=this.launches.get(attemptId),outcome=this.launches.hold(attemptId,message,stamp);
    const uncertain=outcome==='uncertain';
    this.database.query("UPDATE campaign_research_runs SET status=?,error=?,updated_at=?,completed_at=? WHERE run_id=?")
      .run(uncertain?'launching':'failed',message.slice(0,4000),stamp,uncertain?'':stamp,attempt.run_id);
    this.database.query('UPDATE campaign_research_requests SET status=?,updated_at=? WHERE request_id=?')
      .run(uncertain?'dispatching':'approved_for_dispatch',stamp,attempt.request_id);
    this.schedules.transitionMember(attempt.schedule_id,attempt.request_id,uncertain?'launching':'failed',attempt.run_id,message.slice(0,4000),stamp);
    this.schedules.transitionSchedule(attempt.schedule_id,uncertain?'attention':'failed',stamp);
    return uncertain;
  }

  nextDispatchTarget(projectId: string): string {
    const project = this.port.project(projectId);
    const wave = this.port.latestWave(projectId);
    if (!wave) return "";
    const plan = this.database.query("SELECT response_json FROM campaign_research_plans WHERE wave_id = $wave")
      .get({ $wave: wave.wave_id }) as { response_json: string } | null;
    const response = parseJson<Record<string, any>>(plan?.response_json || "{}", {});
    const planIds = new Set((Array.isArray(response.lanes) ? response.lanes : [])
      .filter((lane: any) => ["KEEP", "REVISE"].includes(String(lane?.action || "")))
      .map((lane: any) => String(lane?.requestId || "")).filter(Boolean));
    const requests = this.database.query(`
      SELECT * FROM campaign_research_requests
      WHERE project_id = $project AND wave_id = $wave AND status = 'approved_for_dispatch'
    `).all({ $project: projectId, $wave: wave.wave_id }) as ResearchRequestRow[];
    const runs = this.database.query("SELECT * FROM campaign_research_runs WHERE project_id = $project ORDER BY created_at")
      .all({ $project: projectId }) as ResearchRunRow[];
    return requests
      .filter((request) => !planIds.size || planIds.has(request.request_id))
      .map((request) => ({ request, spec: this.port.resolveResearchSpec(request, response) }))
      .filter((candidate): candidate is { request: ResearchRequestRow; spec: ResearchLaunchSpec } => Boolean(candidate.spec) && this.port.researchDependencySatisfied(candidate.spec!, runs))
      .sort((left, right) => left.spec.priority - right.spec.priority)[0]?.request.request_id || "";
  }

  buildSchedule(projectId: string, createdAt = this.port.now()): WaveScheduleProposal {
    const project = this.port.project(projectId);
    const wave = this.port.latestWave(projectId);
    if (!wave) throw new Error("A current wave is required before scheduling research");
    const plan = this.database.query("SELECT * FROM campaign_research_plans WHERE wave_id = $wave")
      .get({ $wave: wave.wave_id }) as ResearchPlanRow | null;
    const planResponse = parseJson<Record<string, any>>(plan?.response_json || "{}", {});
    const plannedLanes = Array.isArray(planResponse.lanes) ? planResponse.lanes : [];
    const retained = new Set(plannedLanes
      .filter((lane: any) => ["KEEP", "REVISE"].includes(String(lane?.action || "")))
      .map((lane: any) => String(lane?.requestId || "")).filter(Boolean));
    const requests = this.database.query(`
      SELECT * FROM campaign_research_requests
      WHERE project_id = $project AND wave_id = $wave AND status = 'approved_for_dispatch'
      ORDER BY created_at, request_id
    `).all({ $project: projectId, $wave: wave.wave_id }) as ResearchRequestRow[];
    const runs = this.database.query("SELECT * FROM campaign_research_runs WHERE project_id = $project ORDER BY created_at")
      .all({ $project: projectId }) as ResearchRunRow[];
    const candidates: WaveScheduleCandidate[] = requests
      .filter((request) => !retained.size || retained.has(request.request_id))
      .flatMap((request) => {
        const spec = this.port.resolveResearchSpec(request, planResponse);
        if (!spec) return [];
        const declared = plannedLanes.find((lane: any) => lane?.requestId === request.request_id)?.strategy;
        const inferred = this.port.inferStrategy(spec.taskId, request.question);
        const classification = ["coverage", "supply", "decision"].includes(String(declared?.trackId || ""))
          && ["frontier", "experiment", "maintenance", "audit"].includes(String(declared?.workKind || "")) ? declared : inferred;
        const dependencies = spec.dependsOnTaskIds?.length ? spec.dependsOnTaskIds : spec.dependsOnTaskId ? [spec.dependsOnTaskId] : [];
        const dependencyReady = this.port.researchDependencySatisfied(spec, runs);
        return [{
          requestId: request.request_id,
          question: request.question,
          expectedDelta: String(declared?.expectedDelta || request.question).slice(0, 1_000),
          trackId: String(classification.trackId),
          workKind: String(classification.workKind),
          dependencyReady,
          dependencyReason: dependencyReady ? "" : spec.requiresOperatorRelease
            ? "A distinct operator-release token is required by this contract."
            : `Waiting for returned evidence from ${dependencies.join(", ") || "a predecessor"}.`,
          spec: spec as ScheduledLaunchSpec,
        }];
      });
    const resources = this.port.resourceSnapshot(projectId);
    const planDigest = `sha256:${this.port.digest({
      waveId: wave.wave_id,
      evidenceDigest: plan?.evidence_digest || "legacy",
      response: planResponse,
      candidates: candidates.map((candidate) => ({
        requestId: candidate.requestId, question: candidate.question, dependencyReady: candidate.dependencyReady,
        dependencyReason: candidate.dependencyReason, spec: candidate.spec,
      })),
      returnedEvidence: runs.filter((run) => run.status === "returned_to_sol").map((run) => [run.task_id, run.evidence_sha256, run.evidence_json]),
    })}`;
    const resourceDigest = `sha256:${this.port.digest({
      epochId: resources.epochId,
      charterRevision: resources.charterRevision,
      policy: resources.policy,
      ledger: {
        knownTokens: resources.ledger.knownTokens,
        unreported: resources.ledger.unreported,
        reserveTokens: resources.ledger.reserveTokens,
        remainingBeforeCommitments: resources.ledger.remainingBeforeCommitments,
      },
      slots: resources.slots,
    })}`;
    return buildWaveSchedule({
      projectId,
      waveId: wave.wave_id,
      planDigest,
      resourceDigest,
      policy: resources.policy,
      spendableEpochTokens: Number(resources.ledger.remainingBeforeCommitments || 0),
      activeResearchSlots: Number(resources.slots.active.research || 0),
      candidates,
      createdAt,
    });
  }

  scheduleSnapshot(row: WaveScheduleRow | null): Record<string, any> | null {
    if (!row) return null;
    const proposal = parseJson<WaveScheduleProposal | null>(row.proposal_json, null);
    const members = this.schedules.members(row.schedule_id).map((member) => ({
      ...parseJson<Record<string, any>>(member.member_json, {}),
      status: member.status,
      runId: member.run_id,
      error: member.error,
      updatedAt: member.updated_at,
    }));
    return {
      id: row.schedule_id,
      digest: row.schedule_digest,
      planDigest: row.plan_digest,
      resourceDigest: row.resource_digest,
      status: row.status,
      authority: row.status === "confirmed" ? "operator-confirmed-reservation"
        : ["dispatching", "running", "attention", "landed", "completed"].includes(row.status) ? "operator-confirmed-execution"
          : "none",
      proposal,
      members,
      deferred: proposal?.deferred || [],
      canConfirm: row.status === "proposed" && Boolean(proposal?.invariants.valid),
      canDispatch: row.status === "confirmed" && members.length > 0,
      actor: row.created_by,
      confirmedBy: row.confirmed_by,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      confirmedAt: row.confirmed_at,
      completedAt: row.completed_at,
    };
  }

  prepareSchedule(projectId: string, actor: string): Record<string, unknown> {
    if (this.port.project(projectId).current_phase !== "RESEARCH_READY") throw new Error("A wave schedule can be prepared only from RESEARCH_READY");
    if (!this.port.coordinationInterface(projectId).capabilities.prepareSchedule) {
      throw new Error("A wave schedule can be prepared only from an aligned imported-wave boundary");
    }
    const readiness = this.port.startReadiness(projectId);
    if (!readiness.canStart && readiness.code !== "SCHEDULE_CONFIRMATION") {
      throw new Error(`Wave schedule preflight blocked: ${readiness.blocker}`);
    }
    const proposal = this.buildSchedule(projectId);
    if (!proposal.invariants.valid) {
      const blockers = proposal.deferred.map((member) => `${member.taskId}: ${member.decision}`).join(", ");
      throw new Error(`The checked plan has no valid resource-bounded dispatch frontier${blockers ? ` (${blockers})` : ""}`);
    }
    const existing = this.schedules.latest(projectId, proposal.waveId);
    if (existing && ["proposed", "confirmed", "dispatching", "running", "landed"].includes(existing.status)
      && existing.plan_digest === proposal.planDigest && existing.resource_digest === proposal.resourceDigest) {
      return this.scheduleSnapshot(existing)!;
    }
    if (existing && ["confirmed", "dispatching", "running", "landed"].includes(existing.status)) {
      throw new Error("A confirmed wave schedule cannot be silently superseded; stop at the operator boundary and resolve it explicitly");
    }
    const scheduleId = crypto.randomUUID();
    const scheduleDigest = waveScheduleDigest(proposal);
    const row = this.schedules.create({ scheduleId, scheduleDigest, proposal, actor });
    this.port.touchProject(projectId);
    this.port.recordEvent(projectId, "wave-schedule", scheduleId, "research.schedule.prepared", {
      waveId: proposal.waveId,
      scheduleDigest,
      planDigest: proposal.planDigest,
      resourceDigest: proposal.resourceDigest,
      members: proposal.members.map((member) => ({ requestId: member.requestId, taskId: member.taskId, tokenCap: member.tokenCap })),
      deferred: proposal.deferred.map((member) => ({ requestId: member.requestId, taskId: member.taskId, decision: member.decision })),
      authority: "none",
      dispatched: false,
      actor,
    });
    return this.scheduleSnapshot(row)!;
  }

  confirmSchedule(projectId: string, scheduleId: string, args: Record<string, any>, actor: string): Record<string, unknown> {
    if (this.port.project(projectId).current_phase !== "RESEARCH_READY") throw new Error("Wave schedule confirmation requires RESEARCH_READY");
    if (!this.port.coordinationInterface(projectId).capabilities.confirmSchedule) {
      throw new Error("Schedule confirmation requires a current proposed schedule on an aligned imported-wave boundary");
    }
    const schedule = this.schedules.byId(scheduleId);
    if (!schedule || schedule.project_id !== projectId) throw new Error(`Unknown wave schedule: ${scheduleId}`);
    const expectedDigest = typeof args.scheduleDigest === "string" ? args.scheduleDigest : "";
    if (!expectedDigest) throw new Error("The exact wave schedule digest is required");
    const current = this.buildSchedule(projectId, parseJson<WaveScheduleProposal>(schedule.proposal_json, {} as WaveScheduleProposal).createdAt || schedule.created_at);
    if (current.planDigest !== schedule.plan_digest || current.resourceDigest !== schedule.resource_digest) {
      throw new Error("The checked plan, dependency frontier, or resource envelope changed; prepare a fresh schedule before confirming");
    }
    const confirmed = this.schedules.confirm(scheduleId, expectedDigest, actor, this.port.now());
    this.port.touchProject(projectId);
    this.port.recordEvent(projectId, "wave-schedule", scheduleId, "research.schedule.confirmed", {
      waveId: schedule.wave_id,
      scheduleDigest: schedule.schedule_digest,
      memberCount: this.schedules.members(scheduleId).length,
      actor,
      authority: "operator-confirmed-reservation",
      dispatched: false,
    });
    return this.scheduleSnapshot(confirmed)!;
  }

  async dispatchSchedule(projectId: string, scheduleId: string, args: Record<string, any>, actor: string): Promise<Record<string, unknown>> {
    if (this.port.project(projectId).current_phase !== "RESEARCH_READY") throw new Error("Scheduled wave dispatch requires RESEARCH_READY");
    if (!this.port.coordinationInterface(projectId).capabilities.dispatch) {
      throw new Error("Dispatch requires controller-owned execution granted by exact human schedule confirmation");
    }
    const schedule = this.schedules.byId(scheduleId);
    if (!schedule || schedule.project_id !== projectId) throw new Error(`Unknown wave schedule: ${scheduleId}`);
    if (schedule.status !== "confirmed") throw new Error(`Wave schedule must be operator-confirmed before dispatch, not ${schedule.status}`);
    if (typeof args.scheduleDigest === "string" && args.scheduleDigest !== schedule.schedule_digest) throw new Error("The confirmed wave schedule digest has changed");
    const wave = this.port.latestWave(projectId);
    if (!wave || wave.wave_id !== schedule.wave_id) throw new Error("The confirmed schedule is not bound to the current wave");
    const active = this.database.query(`
      SELECT COUNT(*) AS count FROM campaign_research_runs
      WHERE project_id = $project AND status IN ('launching', 'running', 'blocked')
    `).get({ $project: projectId }) as { count: number } | null;
    if (active?.count) throw new Error("A confirmed schedule cannot dispatch while another research run is active");
    const scheduleMembers = this.schedules.members(scheduleId);
    if (!scheduleMembers.length) throw new Error("The confirmed wave schedule has no reserved members");
    for (const member of scheduleMembers) this.launcher.preflight?.(this.port.projectRoot(projectId), parseJson<ResearchLaunchSpec>(member.launch_spec_json, {} as ResearchLaunchSpec));
    const stamp = this.port.now();
    const staged = this.database.transaction(() => {
      const stagedRuns: Array<{ member: WaveScheduleMemberRow; spec: ResearchLaunchSpec; runId: string; context: ResearchLaunchContext }> = [];
      for (const member of scheduleMembers) {
        if (member.status !== "reserved") throw new Error(`Scheduled member ${member.task_id} cannot dispatch from ${member.status}`);
        const request = this.database.query(`
          SELECT * FROM campaign_research_requests WHERE request_id = $request AND project_id = $project AND wave_id = $wave
        `).get({ $request: member.request_id, $project: projectId, $wave: wave.wave_id }) as ResearchRequestRow | null;
        if (!request || request.status !== "approved_for_dispatch") throw new Error(`Scheduled request ${member.request_id} is no longer approved for dispatch`);
        const spec = parseJson<ResearchLaunchSpec | null>(member.launch_spec_json, null);
        if (!spec || spec.taskId !== member.task_id || !spec.baseRef || !spec.packetPath) throw new Error(`Scheduled member ${member.task_id} has an invalid frozen launch contract`);
        if(spec.tokenBudget!==member.token_cap)throw new Error('Frozen launch budget differs from its reserved schedule member');
        const priorRun = this.database.query("SELECT * FROM campaign_research_runs WHERE request_id = $request")
          .get({ $request: member.request_id }) as ResearchRunRow | null;
        if (priorRun && priorRun.status !== "failed") throw new Error(`Scheduled request ${member.request_id} already has a ${priorRun.status} run`);
        const runId = priorRun?.run_id || crypto.randomUUID();
        if (priorRun) {
          this.database.query(`
            UPDATE campaign_research_runs SET
              task_id = $task, status = 'launching', profile = $profile, host = $host, model = $model,
              effort = $effort, fanout = $fanout, packet_path = $packet, base_ref = $base,
              lane_id = '', job_id = '', worktree = '', evidence_path = $evidence, evidence_sha256 = '',
              evidence_json = '{}', error = '', created_at = $now, updated_at = $now, completed_at = ''
            WHERE run_id = $run
          `).run({
            $run: runId, $task: spec.taskId, $profile: spec.profile, $host: spec.host, $model: spec.model,
            $effort: spec.effort, $fanout: spec.fanout, $packet: spec.packetPath, $base: spec.baseRef,
            $evidence: spec.evidencePath, $now: stamp,
          });
        } else {
          this.database.query(`
            INSERT INTO campaign_research_runs(
              run_id, request_id, project_id, wave_id, task_id, status, profile, host, model, effort, fanout,
              packet_path, base_ref, lane_id, job_id, worktree, evidence_path, evidence_sha256, error,
              created_at, updated_at, completed_at
            ) VALUES (
              $run, $request, $project, $wave, $task, 'launching', $profile, $host, $model, $effort, $fanout,
              $packet, $base, '', '', '', $evidence, '', '', $now, $now, ''
            )
          `).run({
            $run: runId, $request: member.request_id, $project: projectId, $wave: wave.wave_id,
            $task: spec.taskId, $profile: spec.profile, $host: spec.host, $model: spec.model, $effort: spec.effort,
            $fanout: spec.fanout, $packet: spec.packetPath, $base: spec.baseRef, $evidence: spec.evidencePath, $now: stamp,
          });
        }
        this.database.query("UPDATE campaign_research_requests SET status = 'dispatching', updated_at = $now WHERE request_id = $request")
          .run({ $now: stamp, $request: member.request_id });
        this.schedules.transitionMember(scheduleId, member.request_id, "launching", runId, "", stamp);
        const context=this.launches.prepare({projectId,scheduleId,requestId:member.request_id,runId,spec,at:stamp});
        stagedRuns.push({ member, spec, runId, context });
      }
      this.schedules.transitionSchedule(scheduleId, "dispatching", stamp);
      this.port.touchProject(projectId, "RESEARCH_RUNNING");
      this.port.recordEvent(projectId, "wave-schedule", scheduleId, "research.schedule.dispatch-started", {
        waveId: wave.wave_id,scheduleDigest:schedule.schedule_digest,memberCount:stagedRuns.length,
        taskIds:stagedRuns.map(item=>item.spec.taskId),actor,
      });
      for(const item of stagedRuns)this.port.recordEvent(projectId,'research_run',item.runId,'research.dispatch.started',{
        scheduleId,requestId:item.member.request_id,taskId:item.spec.taskId,profile:item.spec.profile,actor,attemptId:item.context.attemptId,
      });
      return stagedRuns;
    })();
    this.port.notifyChanged();

    const results = await Promise.all(staged.map(async (item) => {
      let received:ResearchLaunchResult|undefined;
      try {
        this.launches.enter(item.context.attemptId,this.port.now());
        const result = await this.launcher(this.port.projectRoot(projectId), item.spec, item.context);
        received=result;
        const launchedAt = this.port.now();
        const attached=this.database.transaction(()=>{
        if(!this.launches.returned(item.context.attemptId,result,launchedAt))return false;
        this.database.query(`
          UPDATE campaign_research_runs SET status = 'running', lane_id = $lane, job_id = $job, worktree = $worktree, updated_at = $now
          WHERE run_id = $run
        `).run({ $lane: result.laneId, $job: result.jobId, $worktree: result.worktree, $now: launchedAt, $run: item.runId });
        this.database.query("UPDATE campaign_research_requests SET status = 'running', updated_at = $now WHERE request_id = $request")
          .run({ $now: launchedAt, $request: item.member.request_id });
        this.schedules.transitionMember(scheduleId, item.member.request_id, "running", item.runId, "", launchedAt);
        this.port.recordEvent(projectId, "research_run", item.runId, "research.dispatch.launched", {
          scheduleId, requestId: item.member.request_id, taskId: item.spec.taskId, profile: item.spec.profile,
          laneId: result.laneId, jobId: result.jobId, actor,
          attemptId:item.context.attemptId,
        });
        return true;
        })();
        if(!attached)throw Error('A late launch receipt was retained for reconciliation; it does not reopen the held attempt');
        return { ok: true as const, runId: item.runId, requestId: item.member.request_id, taskId: item.spec.taskId, laneId: result.laneId, jobId: result.jobId };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        const failedAt = this.port.now();
        const uncertain=this.database.transaction(()=>{
          const held=this.settleUnansweredLaunch(item.context.attemptId,message,failedAt);
          if(held&&received)this.launches.retainUnverifiedReceipt(item.context.attemptId,received,failedAt);
          this.port.recordEvent(projectId, "research_run", item.runId, held?'research.dispatch.unverified':'research.dispatch.failed', {
            scheduleId, requestId: item.member.request_id, taskId: item.spec.taskId, actor, error: message,attemptId:item.context.attemptId,
          });
          return held;
        })();
        return { ok: false as const, uncertain, runId: item.runId, requestId: item.member.request_id, taskId: item.spec.taskId, error: message };
      }
    }));
    const launched = results.filter((result) => result.ok);
    const failed = results.filter((result) => !result.ok);
    const uncertain = failed.some(result=>result.uncertain);
    const finishedAt = this.port.now();
    this.schedules.transitionSchedule(scheduleId, uncertain?'attention':launched.length ? failed.length ? "attention" : "running" : "failed", finishedAt);
    this.port.touchProject(projectId, uncertain?'BLOCKED':launched.length ? "RESEARCH_RUNNING" : "RESEARCH_READY");
    this.port.recordEvent(projectId, "wave-schedule", scheduleId, "research.schedule.dispatched", {
      waveId: wave.wave_id,
      scheduleDigest: schedule.schedule_digest,
      launched: launched.map((result) => ({ requestId: result.requestId, taskId: result.taskId, runId: result.runId })),
      failed: failed.map((result) => ({ requestId: result.requestId, taskId: result.taskId, runId: result.runId, error: result.error })),
      actor,
    });
    if (!launched.length) throw new Error(`${uncertain?'Launch outcome is unverified; retry is held':'Every scheduled launch failed'}: ${failed.map((result) => `${result.taskId}: ${result.error}`).join("; ")}`);
    return {
      scheduleId,
      scheduleDigest: schedule.schedule_digest,
      waveId: wave.wave_id,
      status: failed.length ? "attention" : "running",
      phase: uncertain?'BLOCKED':"RESEARCH_RUNNING",
      launched,
      failed,
    };
  }

  async returnEvidence(projectId: string, runId: string, actor: string): Promise<Record<string, unknown>> {
    const intakePhase = this.port.project(projectId).current_phase;
    if (!["RESEARCH_INTAKE", "RESEARCH_READY"].includes(intakePhase)) throw new Error("Returning research evidence requires an intake boundary");
    const run = this.database.query("SELECT * FROM campaign_research_runs WHERE run_id = $run AND project_id = $project")
      .get({ $run: runId, $project: projectId }) as ResearchRunRow | null;
    if (!run || run.status !== "evidence_ready" || !run.evidence_sha256) throw new Error("Select a research run with a validated evidence receipt");
    const wave = this.port.latestWave(projectId);
    if (!wave || wave.wave_id !== run.wave_id) throw new Error("The research run is not attached to the current wave");
    const schedule = this.schedules.latest(projectId, wave.wave_id);
    const scheduleMembers = schedule ? this.schedules.members(schedule.schedule_id) : [];
    const scheduledRunIds = scheduleMembers.map((member) => member.run_id).filter(Boolean);
    const scheduledRuns = scheduledRunIds.length
      ? this.database.query("SELECT * FROM campaign_research_runs WHERE project_id = $project AND wave_id = $wave ORDER BY created_at")
        .all({ $project: projectId, $wave: wave.wave_id }) as ResearchRunRow[]
      : [];
    const boundRuns = scheduledRunIds.length ? scheduledRuns.filter((candidate) => scheduledRunIds.includes(candidate.run_id)) : [run];
    const unresolved = boundRuns.filter((candidate) => !["evidence_ready", "failed", "returned_to_sol"].includes(candidate.status));
    if (unresolved.length) throw new Error(`Batch intake is waiting for ${unresolved.map((candidate) => `${candidate.task_id} (${candidate.status})`).join(", ")}`);
    const intakeRuns = boundRuns.filter((candidate) => candidate.status === "evidence_ready" && candidate.evidence_sha256);
    if (!intakeRuns.length) throw new Error("The scheduled wave has no validated evidence receipt to return");
    const intake = intakeRuns.map((candidate) => {
      const receipt = parseJson<Record<string, any>>(candidate.evidence_json, {});
      this.port.validateTerminalReceipt(receipt, candidate.task_id);
      return { run: candidate, receipt };
    });
    if (intakePhase === "RESEARCH_READY") {
      const active = this.database.query("SELECT COUNT(*) AS count FROM campaign_research_runs WHERE project_id = $project AND status IN ('launching','running','blocked')").get({ $project: projectId }) as { count: number };
      assertRecoveredIntake(schedule?.status || "", scheduleMembers.some(member => member.run_id === runId), active.count);
      this.port.touchProject(projectId, "RESEARCH_INTAKE");
      this.port.recordEvent(projectId, "research_run", runId, "research.receipt.intake-restored", { actor, scheduleId: schedule?.schedule_id, evidenceSha256: run.evidence_sha256, priorPhase: intakePhase, dispatched: false });
    }
    let coordinator = this.port.coordinator(projectId);
    if (!coordinator) throw new Error("Attach a Sol coordinator before returning research evidence");
    coordinator = await this.port.writableCoordinator(projectId);
    const previousSynthesis = this.database.query("SELECT response_json FROM campaign_syntheses WHERE wave_id = $wave")
      .get({ $wave: wave.wave_id }) as { response_json: string } | null;
    const createdAt = this.port.now();
    const bundleBody = {
      schema: "campaign-research-intake/v2",
      projectId,
      waveId: wave.wave_id,
      schedule: schedule ? this.scheduleSnapshot(schedule) : null,
      researchRun: this.runBundle(intake[0].run),
      receipt: intake[0].receipt,
      researchRuns: intake.map(({ run: candidate, receipt }) => ({ ...this.runBundle(candidate), receipt })),
      failedScheduledRuns: boundRuns.filter((candidate) => candidate.status === "failed").map((candidate) => ({
        id: candidate.run_id, requestId: candidate.request_id, taskId: candidate.task_id, error: candidate.error,
      })),
      strategy: this.port.strategyBundleContext(projectId),
      previousSynthesis: previousSynthesis ? parseJson(previousSynthesis.response_json, previousSynthesis.response_json) : null,
      externalRedirects: this.port.redirectContext(projectId),
      authority: "RECONNAISSANCE",
      generatedAt: createdAt,
    };
    const bundleDigest = `sha256:${this.port.digest(bundleBody)}`;
    const bundle = { ...bundleBody, evidenceDigest: bundleDigest };
    await mkdir(this.bundleRoot, { recursive: true });
    const bundlePath = join(this.bundleRoot, `${wave.wave_id}-research-${bundleDigest.slice(7, 15)}.json`);
    const temporaryPath = `${bundlePath}.${crypto.randomUUID()}.tmp`;
    await writeFile(temporaryPath, `${JSON.stringify(bundle, null, 2)}\n`, { encoding: "utf8", mode: 0o600 });
    await rename(temporaryPath, bundlePath);
    const prompt = [
      `You are the Sol semantic coordinator for project ${projectId}.`,
      `A human has accepted ${intake.length} validated research receipt${intake.length === 1 ? "" : "s"} from one scheduled wave for return to semantic synthesis. The immutable intake bundle is at: ${bundlePath}`,
      `Its bound digest is ${bundleDigest}.`,
      "Read the complete bundle, including the prior synthesis, every returned research receipt, and any scheduled launch failures. Treat all receipts as RECONNAISSANCE, not campaign truth.",
      EVIDENCE_REVIEW_GUIDANCE,
      "Produce a revised fast wave review: say exactly what the wave changes, compare corroborating or conflicting members, run quick consistency checks, identify tunnel-vision risks, state which dependencies may proceed, and give the coordinator concrete guidance for shaping the next bounded lane plan.",
      "Refresh operatorBrief as a durable, human-friendly campaign briefing: a plain-language headline, where the campaign stands, two or three recent concrete advances, the current focus, the next operator decision, and only the most important watchouts. Keep it concise and understandable without task IDs or internal control-plane terminology.",
      "Complete strategyAssessment from the included shadow strategy context. Mark progress ADVANCED only for a claim, denominator, candidate-supply, candidate-decision, or measured-scaling change; custody that preserves mathematical semantics is UNCHANGED. Classify support work separately and recommend rebalancing when the measured portfolio violates the charter.",
      "Do not edit repository files, dispatch workers, merge, push, or promote claims. Preserve scope limits and distinguish custody evidence from mathematical existence or nonexistence evidence.",
    ].join("\n\n");
    const turn = await this.codex.startTurn({
      threadId: coordinator.thread_id,
      input: [{ type: "text", text: prompt }],
      cwd: coordinator.thread_cwd || this.port.coordinatorFallbackCwd(),
      model: coordinator.model || undefined,
      effort: coordinator.effort || "high",
      approvalPolicy: "on-request",
      sandboxPolicy: { type: "readOnly" },
      outputSchema: this.port.synthesisSchema(),
    });
    if (!turn.id) throw new Error("Codex App Server did not return a synthesis turn id");
    this.database.query(`
      INSERT INTO campaign_syntheses(wave_id, thread_id, turn_id, status, response_json, created_at, updated_at)
      VALUES ($wave, $thread, $turn, 'drafting', '{}', $now, $now)
      ON CONFLICT(wave_id) DO UPDATE SET thread_id = excluded.thread_id, turn_id = excluded.turn_id,
        status = excluded.status, response_json = '{}', updated_at = excluded.updated_at
    `).run({ $wave: wave.wave_id, $thread: coordinator.thread_id, $turn: turn.id, $now: createdAt });
    this.database.query("UPDATE campaign_waves SET phase = 'SYNTHESIZING', evidence_digest = $digest, bundle_path = $path, synthesis_turn_id = $turn, updated_at = $now WHERE wave_id = $wave")
      .run({ $digest: bundleDigest, $path: bundlePath, $turn: turn.id, $now: createdAt, $wave: wave.wave_id });
    for (const item of intake) {
      this.database.query("UPDATE campaign_research_runs SET status = 'returned_to_sol', updated_at = $now WHERE run_id = $run")
        .run({ $now: createdAt, $run: item.run.run_id });
      this.database.query("UPDATE campaign_research_requests SET status = 'returned_to_sol', updated_at = $now WHERE request_id = $request")
        .run({ $now: createdAt, $request: item.run.request_id });
      if (schedule) this.schedules.transitionMember(schedule.schedule_id, item.run.request_id, "returned_to_sol", item.run.run_id, "", createdAt);
    }
    if (schedule) this.schedules.transitionSchedule(schedule.schedule_id, "completed", createdAt);
    this.database.query("UPDATE campaign_coordinators SET status = 'working', last_turn_id = $turn, last_event_at = $now WHERE project_id = $project")
      .run({ $turn: turn.id, $now: createdAt, $project: projectId });
    const decisionId = crypto.randomUUID();
    this.database.query(`
      INSERT INTO campaign_decisions(decision_id, project_id, wave_id, decision, note, actor, created_at)
      VALUES ($id, $project, $wave, 'research_evidence_returned', $note, $actor, $now)
    `).run({ $id: decisionId, $project: projectId, $wave: wave.wave_id, $note: intake.map((item) => `${item.run.task_id} ${item.run.evidence_sha256}`).join("; "), $actor: actor, $now: createdAt });
    this.port.touchProject(projectId, "SYNTHESIZING");
    for (const item of intake) {
      this.port.recordEvent(projectId, "research_run", item.run.run_id, "research.evidence.returned", {
        scheduleId: schedule?.schedule_id || "", bundlePath, bundleDigest, threadId: coordinator.thread_id, turnId: turn.id, actor,
      });
    }
    return { runId: run.run_id, runIds: intake.map((item) => item.run.run_id), scheduleId: schedule?.schedule_id || "", waveId: wave.wave_id, bundlePath, bundleDigest, threadId: coordinator.thread_id, turnId: turn.id, phase: "SYNTHESIZING" };
  }

  requeueFailed(projectId: string, runId: string, actor: string): Record<string, unknown> {
    if (this.port.project(projectId).current_phase !== "RESEARCH_INTAKE") throw new Error("Retrying a failed research launch requires RESEARCH_INTAKE");
    const run = this.database.query("SELECT * FROM campaign_research_runs WHERE run_id = $run AND project_id = $project")
      .get({ $run: runId, $project: projectId }) as ResearchRunRow | null;
    if (!run || run.status !== "failed") throw new Error("Select a terminal research run that failed without validated evidence");
    if (run.evidence_sha256) throw new Error("A run with validated evidence must use the landing gate, not retry recovery");
    const active = this.database.query(`
      SELECT COUNT(*) AS count FROM campaign_research_runs
      WHERE project_id = $project AND status IN ('launching', 'running', 'blocked', 'awaiting_evidence', 'evidence_ready')
    `).get({ $project: projectId }) as { count: number } | null;
    if (active?.count) throw new Error("A failed launch cannot be requeued while another research receipt is active or ready");
    const wave = this.port.latestWave(projectId);
    if (!wave || wave.wave_id !== run.wave_id) throw new Error("The failed research run is not attached to the current wave");
    const schedule = this.schedules.latest(projectId, wave.wave_id);
    const member = schedule?.schedule_id ? this.schedules.members(schedule.schedule_id).find((candidate) => candidate.run_id === runId) : null;
    if (!schedule || !member || member.status !== "failed") throw new Error("The failed run is not bound to the latest settled wave schedule");
    const stamp = this.port.now();
    this.database.transaction(() => {
      this.database.query("UPDATE campaign_research_requests SET status = 'approved_for_dispatch', updated_at = $now WHERE request_id = $request")
        .run({ $now: stamp, $request: run.request_id });
      this.schedules.transitionSchedule(schedule.schedule_id, "failed", stamp);
      this.port.touchProject(projectId, "RESEARCH_READY");
      this.port.recordEvent(projectId, "research_run", runId, "research.failure.requeued", {
        requestId: run.request_id,
        taskId: run.task_id,
        failedScheduleId: schedule.schedule_id,
        actor,
        nextBoundary: "fresh-schedule-required",
        dispatchAuthority: "none",
      });
    })();
    return { runId, requestId: run.request_id, taskId: run.task_id, phase: "RESEARCH_READY", nextBoundary: "fresh-schedule-required" };
  }

  private runBundle(run: ResearchRunRow): Record<string, unknown> {
    return {
      id: run.run_id,
      requestId: run.request_id,
      taskId: run.task_id,
      profile: run.profile,
      host: run.host,
      model: run.model,
      effort: run.effort,
      fanout: run.fanout,
      packetPath: run.packet_path,
      baseRef: run.base_ref,
      laneId: run.lane_id,
      jobId: run.job_id,
      evidencePath: run.evidence_path,
      evidenceSha256: run.evidence_sha256,
    };
  }
}

export function assertRecoveredIntake(scheduleStatus: string, sameRun: boolean, activeRuns: number): void {
  if (!["landed", "failed"].includes(scheduleStatus) || !sameRun || activeRuns > 0) throw new Error("Recovered intake requires the original settled schedule and no active research; a new launch reservation cannot be replaced.");
}
