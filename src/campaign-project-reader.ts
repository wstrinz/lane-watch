import { TERMINAL_DAEMONS, laneFailure, planWaveProjectionRepair, projectWaveAggregate, waveAccounting, waveLaneAccounted } from "./wave";
import type { CampaignDomainReader } from "./campaign-domain-reader";
import type { LaneSnapshot, ObserverSnapshot } from "./types";

export interface CampaignProjectReadOptions {
  projectId?: string;
  historyLimit?: number;
  evidenceMode?: "full" | "summary";
}

export interface CampaignProjectReaderPort {
  definitions(): Array<{ id: string; role: string; root: string; managed: boolean }>;
  observer(): ObserverSnapshot | null;
  queryAll<T>(sql: string, params: Record<string, unknown>): T[];
  queryOne<T>(sql: string, params: Record<string, unknown>): T | null;
  project(projectId: string): any;
  campaignState(projectId: string, wavePhase: string): Record<string, any>;
  coordinationInterface(projectId: string, lanes: LaneSnapshot[]): Record<string, any>;
  laneOwnership(projectId: string, lanes: LaneSnapshot[]): Array<Record<string, any>>;
  recoveryReport(projectId: string): Record<string, unknown> | null;
  coordinator(projectId: string): any | null;
  latestWave(projectId: string): any | null;
  waveLanes(waveId: string): any[];
  latestLoop(projectId: string): any | null;
  activeLoop(projectId: string): any | null;
  loopSnapshot(row: any | null): Record<string, unknown> | null;
  researchSchedule(projectId: string, waveId: string): Record<string, any> | null;
  actionSnapshot(row: any): Record<string, unknown>;
  liveTurn(projectId: string): any | null;
  dispatchProfiles(): any[];
  selectedDispatchProfile(value: unknown): string;
  resolveResearchSpec(request: any, planResponse: Record<string, any>): any | null;
  researchDependencySatisfied(spec: any, runs: any[]): boolean;
  inferStrategy(taskId: string, question: string): Record<string, any>;
  contextDigest(contexts: any[]): string;
}

function parseJson<T>(value: string | undefined, fallback: T): T {
  try { return JSON.parse(value || "") as T; } catch { return fallback; }
}

export class CampaignProjectReader {
  constructor(
    private readonly port: CampaignProjectReaderPort,
    private readonly domains: CampaignDomainReader,
  ) {}

  snapshot(options: CampaignProjectReadOptions = {}): Record<string, unknown> {
    const observer = this.port.observer();
    const historyLimit = Math.max(1, Math.min(180, Math.floor(Number(options.historyLimit) || 180)));
    const evidenceMode = options.evidenceMode ?? "full";
    const projects = this.port.definitions().filter((project) => project.managed && (!options.projectId || project.id === options.projectId)).map((definition) => {
      const row = this.port.project(definition.id);
      const coordinator = this.port.coordinator(definition.id);
      const wave = this.port.latestWave(definition.id);
      const controlState = this.port.campaignState(definition.id, wave?.phase || "");
      const waveLaneRows = wave ? this.port.waveLanes(wave.wave_id) : [];
      const accounting = wave ? waveAccounting(waveLaneRows) : null;
      const lanes = observer?.lanes.filter((lane) => lane.project === definition.id) ?? [];
      const active = lanes.filter((lane) => lane.lifecycle === "active");
      const coordinationInterface = this.port.coordinationInterface(definition.id, active);
      const laneOwnership = this.port.laneOwnership(definition.id, active);
      const approvals = this.port.queryAll<any>("SELECT * FROM codex_approvals WHERE project_id = $project ORDER BY created_at", { $project: definition.id });
      const actions = this.port.queryAll<any>("SELECT * FROM campaign_actions WHERE project_id = $project ORDER BY created_at DESC LIMIT 8", { $project: definition.id });
      const events = this.port.queryAll<any>("SELECT * FROM campaign_events WHERE project_id = $project ORDER BY created_at DESC LIMIT $limit", { $project: definition.id, $limit: historyLimit });
      const workflowHistoryTotal = historyLimit < 180
        ? Math.min(180, Number(this.port.queryOne<{ count: number }>("SELECT COUNT(*) AS count FROM campaign_events WHERE project_id = $project", { $project: definition.id })?.count || 0))
        : events.length;
      const redirects = this.port.queryAll<any>("SELECT * FROM campaign_redirect_inputs WHERE project_id = $project ORDER BY created_at DESC LIMIT 12", { $project: definition.id });
      const contexts = this.port.queryAll<any>("SELECT * FROM campaign_context_sources WHERE project_id = $project ORDER BY role, path", { $project: definition.id });
      const decisions = this.port.queryAll<any>("SELECT * FROM campaign_decisions WHERE project_id = $project ORDER BY created_at DESC LIMIT 8", { $project: definition.id });
      const researchRequests = this.port.queryAll<any>("SELECT * FROM campaign_research_requests WHERE project_id = $project ORDER BY created_at DESC LIMIT 20", { $project: definition.id });
      const researchRuns = evidenceMode === "full"
        ? this.port.queryAll<any>("SELECT * FROM campaign_research_runs WHERE project_id = $project ORDER BY created_at DESC LIMIT 20", { $project: definition.id })
        : this.port.queryAll<any>(`
            SELECT run_id, request_id, project_id, wave_id, task_id, status, profile, host, model, effort, fanout,
              packet_path, base_ref, lane_id, job_id, worktree, evidence_path, evidence_sha256, '' AS evidence_json, error,
              measured_tokens, measured_wall_seconds, measurement_source, measurement_at, created_at, updated_at, completed_at,
              CASE WHEN json_valid(evidence_json) THEN COALESCE(json_extract(evidence_json, '$.schema'), '') ELSE '' END AS evidence_schema,
              CASE WHEN json_valid(evidence_json) THEN COALESCE(json_extract(evidence_json, '$.status'), '') ELSE '' END AS evidence_status,
              CASE WHEN json_valid(evidence_json) THEN COALESCE(json_extract(evidence_json, '$.verdict'), '') ELSE '' END AS evidence_verdict,
              CASE WHEN json_valid(evidence_json) THEN COALESCE(json_extract(evidence_json, '$.summary'), '') ELSE '' END AS evidence_summary,
              CASE WHEN evidence_json NOT IN ('', '{}', 'null') THEN 1 ELSE 0 END AS evidence_detail_available
            FROM campaign_research_runs WHERE project_id = $project ORDER BY created_at DESC LIMIT 20
          `, { $project: definition.id });
      const researchPlan = wave ? this.port.queryOne<any>("SELECT * FROM campaign_research_plans WHERE wave_id = $wave", { $wave: wave.wave_id }) : null;
      const researchSchedule = wave ? this.port.researchSchedule(definition.id, wave.wave_id) : null;
      const researchPlanResponse = researchPlan ? parseJson<Record<string, any>>(researchPlan.response_json, {}) : {};
      const currentPlanRequestIds = new Set((Array.isArray(researchPlanResponse.lanes) ? researchPlanResponse.lanes : [])
        .filter((lane: any) => ["KEEP", "REVISE"].includes(String(lane?.action || "")))
        .map((lane: any) => typeof lane?.requestId === "string" ? lane.requestId : "")
        .filter(Boolean));
      const configuredApprovedRequests = researchRequests
        .filter((request) => request.status === "approved_for_dispatch" && (!currentPlanRequestIds.size || currentPlanRequestIds.has(request.request_id)))
        .map((request) => ({ request, spec: this.port.resolveResearchSpec(request, researchPlanResponse) }))
        .filter((candidate): candidate is { request: any; spec: any } => Boolean(candidate.spec));
      const nextDispatchRequest = configuredApprovedRequests
        .filter((candidate) => this.port.researchDependencySatisfied(candidate.spec, researchRuns))
        .sort((left, right) => left.spec.priority - right.spec.priority)[0]?.request;
      const nextDispatchSpec = configuredApprovedRequests.find((candidate) => candidate.request.request_id === nextDispatchRequest?.request_id)?.spec ?? null;
      const synthesis = wave ? this.port.queryOne<any>("SELECT status, response_json, updated_at FROM campaign_syntheses WHERE wave_id = $wave", { $wave: wave.wave_id }) : null;
      const triage = wave ? this.port.queryOne<any>("SELECT * FROM campaign_wave_triages WHERE wave_id = $wave", { $wave: wave.wave_id }) : null;
      const loop = this.port.latestLoop(definition.id);
      const strategy = this.domains.strategySnapshot(definition.id);
      const custody = this.domains.custodySnapshot(definition.id);
      const resources = this.domains.resourceSnapshot(definition.id);
      const waveAggregate = wave ? projectWaveAggregate({
        id: wave.wave_id, projectId: definition.id, label: wave.label, campaignPhase: wave.phase,
        createdAt: wave.created_at, updatedAt: wave.updated_at, lanes: waveLaneRows,
      }) : null;
      const projectionRepairPlan = waveAggregate ? planWaveProjectionRepair({ aggregate: waveAggregate, observedLanes: lanes }) : null;
      const orderedEvents = [...events].reverse();
      return {
        id: definition.id,
        role: definition.role,
        root: definition.root,
        phase: row.current_phase,
        controlState,
        coordinationInterface,
        recoveryReport: this.port.recoveryReport(definition.id),
        automationMode: row.automation_mode,
        dispatchPreferences: { selectedProfile: this.port.selectedDispatchProfile(row.dispatch_profile), appliesTo: "future research launches", profiles: this.port.dispatchProfiles() },
        version: row.version,
        updatedAt: row.updated_at,
        strategy,
        custody,
        resources,
        loop: this.port.loopSnapshot(loop),
        canStartLoop: !this.port.activeLoop(definition.id) && !["BLOCKED", "NEXT_WAVE_READY"].includes(row.current_phase),
        externalInputs: redirects.map((input) => ({
          id: input.input_id, waveId: input.wave_id, title: input.title, content: input.content, sourceUrl: input.source_url,
          inputDigest: input.input_digest, status: input.status, threadId: input.thread_id, turnId: input.turn_id,
          bundlePath: input.bundle_path, response: parseJson(input.response_json, {}), error: input.error, actor: input.created_by,
          createdAt: input.created_at, updatedAt: input.updated_at, appliedAt: input.applied_at,
        })),
        workflowHistory: orderedEvents.map((event) => ({
          id: event.event_id, aggregateType: event.aggregate_type, aggregateId: event.aggregate_id, type: event.event_type,
          payload: parseJson(event.payload_json, {}), createdAt: event.created_at,
        })),
        workflowHistorySummary: {
          total: workflowHistoryTotal, returned: orderedEvents.length, detailAvailable: workflowHistoryTotal > orderedEvents.length,
          newestAt: orderedEvents.at(-1)?.created_at || "",
        },
        laneCounts: this.laneCounts(lanes),
        laneOwnership,
        coordinator: coordinator ? {
          attached: true, threadId: coordinator.thread_id, sourceThreadId: coordinator.source_thread_id || coordinator.thread_id,
          forked: Boolean(coordinator.source_thread_id && coordinator.source_thread_id !== coordinator.thread_id), name: coordinator.thread_name,
          cwd: coordinator.thread_cwd, model: coordinator.model, effort: coordinator.effort, status: coordinator.status,
          lastTurnId: coordinator.last_turn_id, lastEventAt: coordinator.last_event_at, attachedAt: coordinator.attached_at,
          live: this.port.liveTurn(definition.id),
        } : { attached: false },
        wave: wave ? {
          id: wave.wave_id, label: wave.label, phase: wave.phase, laneIds: parseJson(wave.lane_ids_json, []), accounting,
          aggregate: { ...waveAggregate, repairPlan: projectionRepairPlan },
          lanes: waveLaneRows.map((member) => {
            const lane = parseJson<LaneSnapshot | null>(member.snapshot_json, null);
            return {
              id: member.lane_id, task: lane?.task ?? member.lane_id, lane: lane?.lane ?? "", host: lane?.host ?? "", model: lane?.model ?? "",
              daemon: lane?.daemon ?? "unknown", landing: lane?.landing ?? "—", accountingState: member.accounting_state,
              accounted: waveLaneAccounted(member), disposition: member.disposition, reason: member.reason, updatedAt: member.updated_at,
            };
          }),
          evidenceDigest: wave.evidence_digest, bundlePath: wave.bundle_path, synthesisTurnId: wave.synthesis_turn_id,
          createdAt: wave.created_at, updatedAt: wave.updated_at,
          synthesis: synthesis ? { status: synthesis.status, response: parseJson(synthesis.response_json, synthesis.response_json), updatedAt: synthesis.updated_at } : null,
          triage: triage ? {
            status: triage.status, threadId: triage.thread_id, turnId: triage.turn_id, bundlePath: triage.bundle_path,
            evidenceDigest: triage.evidence_digest, response: parseJson(triage.response_json, triage.response_json), updatedAt: triage.updated_at,
          } : null,
        } : null,
        canAdoptWave: Boolean(coordinationInterface.capabilities?.importWave && active.length > 0 && (!wave || wave.phase === "NEXT_WAVE_READY")),
        canRequestWaveTriage: Boolean(coordinationInterface.capabilities?.account && wave && coordinator && accounting && Number(accounting.unaccounted) > 0 && Number(accounting.running) === 0 && !["drafting", "drafted"].includes(triage?.status ?? "")),
        canApplyWaveTriage: Boolean(coordinationInterface.capabilities?.account && wave && accounting && Number(accounting.unaccounted) > 0 && triage?.status === "drafted"),
        canPrepareSynthesis: Boolean(coordinationInterface.capabilities?.synthesize && wave && accounting?.complete && !wave.bundle_path),
        canRequestSynthesis: Boolean(coordinationInterface.capabilities?.synthesize && row.current_phase === "SYNTHESIS_READY" && wave?.bundle_path && coordinator),
        context: {
          digest: contexts.length ? `sha256:${this.port.contextDigest(contexts.map((source) => [source.source_id, source.sha256]))}` : "",
          sources: contexts.map((source) => ({
            id: source.source_id, role: source.role, path: source.path, sha256: source.sha256, bytes: source.bytes,
            modifiedAt: source.modified_at, observedAt: source.observed_at,
          })),
        },
        decisions: decisions.map((decision) => ({
          id: decision.decision_id, waveId: decision.wave_id, decision: decision.decision, note: decision.note,
          actor: decision.actor, createdAt: decision.created_at,
        })),
        researchRequests: researchRequests.map((request) => ({
          id: request.request_id, waveId: request.wave_id, question: request.question, status: request.status,
          strategy: (Array.isArray(researchPlanResponse.lanes) ? researchPlanResponse.lanes : []).find((lane: any) => lane?.requestId === request.request_id)?.strategy
            || this.port.inferStrategy("", request.question),
          createdAt: request.created_at, updatedAt: request.updated_at,
        })),
        researchPlan: researchPlan ? {
          status: researchPlan.status, threadId: researchPlan.thread_id, turnId: researchPlan.turn_id, bundlePath: researchPlan.bundle_path,
          evidenceDigest: researchPlan.evidence_digest, response: parseJson(researchPlan.response_json, {}),
          createdAt: researchPlan.created_at, updatedAt: researchPlan.updated_at,
        } : null,
        researchSchedule,
        researchDispatch: {
          available: false,
          nextRequestId: nextDispatchRequest?.request_id ?? "",
          reason: researchSchedule
            ? researchSchedule.status === "proposed" ? "The exact multi-member schedule is waiting for operator confirmation."
              : researchSchedule.status === "confirmed" ? "The confirmed multi-member schedule is ready for bounded dispatch."
                : `The multi-member schedule is ${researchSchedule.status}.`
            : nextDispatchSpec
              ? row.current_phase === "RESEARCH_READY" ? "Freeze the dependency-safe contracts into one resource-bounded wave schedule before dispatch." : "The research campaign is already active."
              : configuredApprovedRequests.length ? "Approved launch contracts are waiting for required predecessor evidence." : "No approved request has an enforced dispatch contract yet.",
          spec: nextDispatchSpec,
        },
        researchRuns: researchRuns.map((run) => {
          const liveLane = lanes.find((lane) => lane.task === run.task_id || lane.id === run.lane_id || lane.jobId === run.job_id);
          const request = researchRequests.find((candidate) => candidate.request_id === run.request_id);
          const plannedLane = (Array.isArray(researchPlanResponse.lanes) ? researchPlanResponse.lanes : []).find((lane: any) => lane?.requestId === run.request_id);
          return {
            id: run.run_id, requestId: run.request_id, waveId: run.wave_id, taskId: run.task_id,
            strategy: plannedLane?.strategy || this.port.inferStrategy(run.task_id, request?.question || ""),
            status: run.status, profile: run.profile, host: run.host, model: run.model, effort: run.effort, fanout: run.fanout,
            packetPath: run.packet_path, baseRef: run.base_ref, laneId: run.lane_id, jobId: run.job_id, worktree: run.worktree,
            evidencePath: run.evidence_path, evidenceSha256: run.evidence_sha256,
            measuredTokens: run.measured_tokens ?? null, measuredWallSeconds: Number(run.measured_wall_seconds || 0),
            measurementSource: run.measurement_source || "", measurementAt: run.measurement_at || "",
            ...(evidenceMode === "full" ? { evidence: parseJson(run.evidence_json, {}) } : {
              evidenceSummary: run.evidence_detail_available ? {
                schema: run.evidence_schema, status: run.evidence_status, verdict: run.evidence_verdict, summary: run.evidence_summary,
              } : null,
              evidenceDetailAvailable: Boolean(run.evidence_detail_available),
            }),
            error: run.error, liveDetail: liveLane?.detail ?? "", liveActivity: liveLane?.activities[0]?.label ?? "",
            inFlight: liveLane?.inFlight ?? 0, tokens: liveLane?.tokens ?? null, liveUpdatedAt: liveLane?.updatedAt ?? "",
            createdAt: run.created_at, updatedAt: run.updated_at, completedAt: run.completed_at,
          };
        }),
        approvals: approvals.map((approval) => ({
          id: approval.request_id, method: approval.method, threadId: approval.thread_id, turnId: approval.turn_id,
          params: parseJson(approval.params_json, {}), supported: ["item/commandExecution/requestApproval", "item/fileChange/requestApproval"].includes(approval.method),
          createdAt: approval.created_at,
        })),
        actions: actions.map((action) => this.port.actionSnapshot(action)),
      };
    });
    return { generatedAt: new Date().toISOString(), version: 1, projects };
  }

  indexSnapshot(): Record<string, unknown> {
    const observer = this.port.observer();
    const projects = this.port.definitions().filter((project) => project.managed).map((definition) => {
      const row = this.port.project(definition.id);
      const coordinator = this.port.coordinator(definition.id);
      const wave = this.port.latestWave(definition.id);
      const controlState = this.port.campaignState(definition.id, wave?.phase || "");
      const accounting = wave ? waveAccounting(this.port.waveLanes(wave.wave_id)) : null;
      const loop = this.port.latestLoop(definition.id);
      const lanes = observer?.lanes.filter((lane) => lane.project === definition.id) ?? [];
      const coordinationInterface = this.port.coordinationInterface(definition.id, lanes.filter((lane) => lane.lifecycle === "active"));
      return {
        id: definition.id, role: definition.role, phase: row.current_phase, controlState,
        coordinationInterface: { schema: coordinationInterface.schema, mode: coordinationInterface.mode, authority: coordinationInterface.authority, reason: coordinationInterface.reason },
        version: row.version,
        updatedAt: row.updated_at, automationMode: row.automation_mode, laneCounts: this.laneCounts(lanes),
        coordinator: coordinator ? { attached: true, name: coordinator.thread_name, status: coordinator.status, lastEventAt: coordinator.last_event_at }
          : { attached: false, name: "", status: "", lastEventAt: "" },
        wave: wave ? { id: wave.wave_id, phase: wave.phase, accounting } : null,
        loop: loop ? { status: loop.status } : null,
      };
    });
    return { generatedAt: new Date().toISOString(), version: 1, projects };
  }

  private laneCounts(lanes: LaneSnapshot[]): Record<string, number> {
    const active = lanes.filter((lane) => lane.lifecycle === "active");
    return {
      active: active.length,
      running: active.filter((lane) => !TERMINAL_DAEMONS.has(lane.daemon)).length,
      terminal: active.filter((lane) => TERMINAL_DAEMONS.has(lane.daemon)).length,
      semanticReady: active.filter((lane) => lane.landing === "READY_FOR_SEMANTIC_REVIEW").length,
      blocked: active.filter(laneFailure).length,
      total: lanes.length,
    };
  }
}
