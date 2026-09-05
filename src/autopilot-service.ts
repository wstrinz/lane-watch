import { Database } from "bun:sqlite";
import { waveAccounting } from "./wave";
import { WaveRepository } from "./wave-repository";
import { WaveScheduleRepository } from "./wave-schedule-repository";
import type { ObserverSnapshot } from "./types";
import type { AutopilotStartReadiness } from "./autopilot-readiness";
import { custodyHasBudgetUpgrade } from "./custody";

export interface LoopRunRow {
  loop_id: string;
  project_id: string;
  status: string;
  start_phase: string;
  end_phase: string;
  start_json: string;
  end_json: string;
  steps_json: string;
  pending_action_id: string;
  halt_after_step: number;
  decision_crossed: number;
  error: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  completed_at: string;
}

interface LoopStep {
  index: number;
  key: string;
  label: string;
  actionType: string;
  status: "queued" | "running" | "completed" | "failed";
  actionId: string;
  startedAt: string;
  completedAt: string;
  summary: string;
  attemptCount?: number;
}

export function compactLoopSteps(steps: LoopStep[]): LoopStep[] {
  const seenActions = new Set<string>();
  const compacted = steps.filter((step) => {
    if (!step.actionId) return true;
    if (seenActions.has(step.actionId)) return false;
    seenActions.add(step.actionId);
    return true;
  });
  compacted.forEach((step, index) => { step.index = index + 1; });
  return compacted;
}

interface ActionRow {
  action_id: string;
  project_id: string;
  action_type: string;
  status: string;
  result_json: string;
  error: string;
  completed_at: string;
}

interface AutopilotPort {
  project(projectId: string): { current_phase: string; version: number };
  observer(): ObserverSnapshot | null;
  nextDispatchTarget(projectId: string): string;
  startReadiness(projectId: string): AutopilotStartReadiness;
  custody(projectId: string): Record<string, any>;
  enqueueAction(input: {
    projectId: string;
    type: string;
    targetId?: string;
    args?: Record<string, unknown>;
    expectedVersion: number;
    idempotencyKey: string;
  }, actor: string): Promise<Record<string, unknown>>;
  touchProject(projectId: string): void;
  recordEvent(projectId: string, aggregateType: string, aggregateId: string, eventType: string, payload: unknown): void;
  now(): string;
}

function parseJson<T>(value: string, fallback: T): T {
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export type CustodyAutopilotDecision =
  | { kind: "action"; type: string; targetId: string; args?: Record<string, unknown>; key: string }
  | { kind: "wait" }
  | { kind: "attention"; message: string };

function controllerOwnedCustodyStop(item: Record<string, any>): boolean {
  const receipt = item.receipt || {};
  const changedPaths = Array.isArray(receipt.effects?.changedPaths) ? receipt.effects.changedPaths : [];
  const checks = Array.isArray(receipt.checks) ? receipt.checks : [];
  const passed = (id: string) => checks.some((check: any) => check?.id === id && check?.status === "PASS");
  const replaySourceSelection = passed("producer_manifest_blobs") && passed("immutable_successor_binding")
    && checks.some((check: any) => check?.id === "frozen_replay_tree" && check?.status === "FAIL")
    && /checkout.*differs|source tree differs/i.test(`${receipt.summary || ""} ${receipt.stopReason || ""}`);
  return changedPaths.length === 0 && (replaySourceSelection || /lease-byte provenance mismatch|frozen[- ]lease[- ]integrity|specified frozen lease|unknown variant [`']workspaceWrite|executor turn was interrupted|runtime interruption/i.test(
    `${receipt.summary || ""} ${receipt.stopReason || ""}`,
  ));
}

function controllerOwnedStopCount(custody: Record<string, any>, itemId: string): number {
  return (Array.isArray(custody?.protocol?.leases) ? custody.protocol.leases : [])
    .filter((lease: any) => lease.itemId === itemId && ["blocked", "failed"].includes(lease.status) && controllerOwnedCustodyStop({ receipt: lease.receipt || {} }))
    .length;
}

/** Select only transitions whose effects are already bounded by the custody lease. */
export function nextCustodyAutopilotStep(custody: Record<string, any> | null | undefined): CustodyAutopilotDecision | null {
  const allItems = Array.isArray(custody?.items) ? custody.items : [];
  const items = allItems
    .filter((item: any) => item.blocksResearch && !["complete", "parked"].includes(item.status))
    .sort((left: any, right: any) => Date.parse(left.createdAt || "") - Date.parse(right.createdAt || ""));
  const occupied = allItems.find((candidate: any) =>
    ["assigned", "verifying"].includes(candidate.status)
    || ["confirmed", "dispatching", "running", "finalizing", "awaiting_review"].includes(candidate.activeLease?.status));
  // Finish the lease that already owns the serialized custody slot before
  // trying to confirm an older prepared dependency. Otherwise the quota gate
  // correctly rejects a second slot and the loop appears to repeat forever.
  const dependencyReady = items.filter((candidate: any) => candidate.dependenciesSatisfied !== false);
  const actionable = dependencyReady.filter((candidate: any) => {
    if (candidate.inputReadiness?.ready === false || candidate.generationAllowed === false) return false;
    if (["proposed", "ready"].includes(candidate.status)) return true;
    if (custodyHasBudgetUpgrade(candidate)) return true;
    if (!["blocked", "failed"].includes(candidate.status) || !controllerOwnedCustodyStop(candidate)) return false;
    return controllerOwnedStopCount(custody || {}, candidate.id) < 4;
  });
  // One stopped branch must not freeze a separate dependency root. Work all
  // mechanically actionable roots first, then return to the substantive stop.
  const item = occupied || actionable[0] || dependencyReady[0];
  if (!item && items.length) {
    const waiting = items[0]?.missingDependencies?.map((dependency: any) => dependency.task).filter(Boolean).join(", ");
    return { kind: "attention", message: waiting
      ? `Custody is waiting for predecessor receipts: ${waiting}. Resume from the earliest dependency instead of repeating a downstream contract.`
      : "Custody contracts are waiting for predecessor receipts. Inspect the dependency chain before continuing." };
  }
  if (!item) return null;
  const lease = item.activeLease;
  if (custody?.runtimeAdmission?.ready === false
    && !["running", "finalizing", "awaiting_review"].includes(lease?.status || "")
    && !["assigned", "verifying"].includes(item.status)) return {
    kind: "attention", message: custody.runtimeAdmission.reason || "Custody runtime enforcement is not ready.",
  };
  if (!occupied && item.inputReadiness?.ready === false) return {
    kind: "attention", message: `${item.task}: ${item.inputReadiness.reason}`,
  };
  if (item.status === "proposed") return { kind: "action", type: "custody.item.promote", targetId: item.id, key: `custody:${item.id}:enable` };
  if (["blocked", "failed"].includes(item.status)) {
    if (custodyHasBudgetUpgrade(item)) return {
      kind: "action",
      type: "custody.item.promote",
      targetId: item.id,
      args: { note: "Autopilot refroze this zero-effect legacy lease under the corrected " + Number(item.tokenCap).toLocaleString() + "-token total-turn envelope." },
      key: "custody:" + item.id + ":budget-upgrade:" + item.tokenCap,
    };
    const controllerOwned = controllerOwnedCustodyStop(item);
    const automaticStops = controllerOwnedStopCount(custody || {}, item.id);
    if (controllerOwned && automaticStops < 4) return { kind: "action", type: "custody.item.promote", targetId: item.id, args: { note: "Autopilot retried a zero-effect controller-owned custody stop under the unchanged contract." }, key: `custody:${item.id}:controller-retry:${automaticStops + 1}` };
    return { kind: "attention", message: controllerOwned
      ? `${item.task} hit the bounded automatic retry limit after ${automaticStops} zero-effect controller stops. Inspect the runtime before retrying.`
      : `${item.task} stopped on a substantive custody check. Inspect or reshape its contract; do not park it merely to bypass the dependency.` };
  }
  if (item.status === "ready" && !lease) return { kind: "action", type: "custody.lease.prepare", targetId: item.id, key: `custody:${item.id}:prepare` };
  if (lease?.status === "prepared") return { kind: "action", type: "custody.lease.confirm", targetId: lease.id, args: { leaseDigest: lease.leaseDigest }, key: `custody:${item.id}:confirm:${lease.id}` };
  if (lease?.status === "confirmed") {
    return { kind: "action", type: "custody.lease.dispatch", targetId: lease.id, args: { leaseDigest: lease.leaseDigest }, key: `custody:${item.id}:dispatch:${lease.id}` };
  }
  if (["running", "finalizing"].includes(String(lease?.status || "")) || item.status === "assigned") {
    const stale = lease?.id && Date.now() - Date.parse(lease.updatedAt || lease.startedAt || item.updatedAt || "") >= 60_000;
    return stale
      ? { kind: "action", type: "custody.lease.reconcile", targetId: lease.id, key: `custody:${item.id}:reconcile:${lease.id}` }
      : { kind: "wait" };
  }
  if (lease?.status === "awaiting_review" || item.status === "verifying") {
    if (lease?.verification?.landable && lease.receiptDigest) return { kind: "action", type: "custody.receipt.land", targetId: lease.id, args: { receiptDigest: lease.receiptDigest }, key: `custody:${item.id}:land:${lease.id}` };
    return { kind: "attention", message: `${item.task} returned a receipt that is not mechanically landable. Inspect its exact checks before changing the contract.` };
  }
  return { kind: "attention", message: `${item.task} is in custody state ${item.status || "unknown"}; inspect the bounded receipt before continuing.` };
}

/** Chooses one safe gated action at a time; execution remains in the action queue. */
export class AutopilotService {
  private readonly advancing = new Set<string>();
  private readonly advanceAgain = new Set<string>();

  constructor(
    private readonly database: Database,
    private readonly waves: WaveRepository,
    private readonly schedules: WaveScheduleRepository,
    private readonly port: AutopilotPort,
  ) {}

  latestLoop(projectId: string): LoopRunRow | null {
    return this.database.query("SELECT * FROM campaign_loop_runs WHERE project_id = $project ORDER BY created_at DESC LIMIT 1")
      .get({ $project: projectId }) as LoopRunRow | null;
  }

  activeLoop(projectId: string): LoopRunRow | null {
    return this.database.query(`
      SELECT * FROM campaign_loop_runs
      WHERE project_id = $project AND status IN ('running', 'paused', 'attention')
      ORDER BY created_at DESC LIMIT 1
    `).get({ $project: projectId }) as LoopRunRow | null;
  }

  snapshot(row: LoopRunRow | null): Record<string, unknown> | null {
    if (!row) return null;
    const pending = row.pending_action_id
      ? this.database.query("SELECT status FROM campaign_actions WHERE action_id = $id").get({ $id: row.pending_action_id }) as { status: string } | null
      : null;
    const resumeBlocker = row.status === "attention" ? this.resumeBlocker(row.project_id) : "";
    return {
      id: row.loop_id,
      status: row.status,
      startPhase: row.start_phase,
      endPhase: row.end_phase,
      start: parseJson(row.start_json, {}),
      end: parseJson(row.end_json, {}),
      steps: parseJson<LoopStep[]>(row.steps_json, []),
      pendingActionId: row.pending_action_id,
      pendingActionStatus: pending?.status || "",
      haltAfterStep: Boolean(row.halt_after_step),
      decisionCrossed: Boolean(row.decision_crossed),
      error: row.error,
      canResume: row.status === "paused" || (row.status === "attention" && !resumeBlocker),
      resumeBlocker,
      actor: row.created_by,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      completedAt: row.completed_at,
    };
  }

  start(projectId: string, actor: string): Record<string, unknown> {
    if (this.activeLoop(projectId)) throw new Error("A one-loop run is already active for this project");
    const project = this.port.project(projectId);
    if (["BLOCKED", "NEXT_WAVE_READY"].includes(project.current_phase)) throw new Error(`A one-loop run cannot start from ${project.current_phase}; resolve or adopt that boundary first`);
    const readiness = this.port.startReadiness(projectId);
    if (!readiness.canStart) throw new Error(`A one-loop run cannot start safely. ${readiness.blocker}`);
    const loopId = crypto.randomUUID();
    const stamp = this.port.now();
    const decisionCrossed = project.current_phase === "DECISION_REQUIRED" ? 0 : 1;
    this.database.query(`
      INSERT INTO campaign_loop_runs(
        loop_id, project_id, status, start_phase, start_json, decision_crossed,
        created_by, created_at, updated_at
      ) VALUES ($id, $project, 'running', $phase, $start, $crossed, $actor, $now, $now)
    `).run({ $id: loopId, $project: projectId, $phase: project.current_phase, $start: JSON.stringify(this.boundary(projectId)), $crossed: decisionCrossed, $actor: actor, $now: stamp });
    this.port.touchProject(projectId);
    this.port.recordEvent(projectId, "loop", loopId, "loop.started", { startPhase: project.current_phase, decisionCrossed: Boolean(decisionCrossed), actor });
    return { loopId, status: "running", startPhase: project.current_phase };
  }

  pause(projectId: string, actor: string): Record<string, unknown> {
    const loop = this.activeLoop(projectId);
    if (!loop) throw new Error("No active one-loop run is available to pause");
    const stamp = this.port.now();
    this.database.query("UPDATE campaign_loop_runs SET status = 'paused', halt_after_step = 0, updated_at = $now WHERE loop_id = $id").run({ $id: loop.loop_id, $now: stamp });
    this.port.touchProject(projectId);
    this.port.recordEvent(projectId, "loop", loop.loop_id, "loop.paused", { actor, pendingActionId: loop.pending_action_id });
    return { loopId: loop.loop_id, status: "paused", pendingActionId: loop.pending_action_id };
  }

  resume(projectId: string, actor: string): Record<string, unknown> {
    const loop = this.activeLoop(projectId);
    if (!loop || !["paused", "attention"].includes(loop.status)) throw new Error("No paused one-loop run is available to resume");
    const blocker = loop.status === "attention" ? this.resumeBlocker(projectId) : "";
    if (blocker) throw new Error(`Autopilot cannot resume yet. ${blocker}`);
    const stamp = this.port.now();
    this.database.query("UPDATE campaign_loop_runs SET status = 'running', halt_after_step = 0, error = '', updated_at = $now WHERE loop_id = $id").run({ $id: loop.loop_id, $now: stamp });
    this.port.touchProject(projectId);
    this.port.recordEvent(projectId, "loop", loop.loop_id, "loop.resumed", { actor });
    return { loopId: loop.loop_id, status: "running" };
  }

  haltAfterStep(projectId: string, actor: string): Record<string, unknown> {
    const loop = this.activeLoop(projectId);
    if (!loop || loop.status !== "running") throw new Error("No running one-loop run is available to halt");
    const stamp = this.port.now();
    const status = loop.pending_action_id ? "running" : "paused";
    this.database.query("UPDATE campaign_loop_runs SET status = $status, halt_after_step = $halt, updated_at = $now WHERE loop_id = $id")
      .run({ $id: loop.loop_id, $status: status, $halt: loop.pending_action_id ? 1 : 0, $now: stamp });
    this.port.touchProject(projectId);
    this.port.recordEvent(projectId, "loop", loop.loop_id, "loop.halt-requested", { actor, pendingActionId: loop.pending_action_id });
    return { loopId: loop.loop_id, status, haltAfterStep: Boolean(loop.pending_action_id) };
  }

  stop(projectId: string, actor: string): Record<string, unknown> {
    const loop = this.activeLoop(projectId);
    if (!loop) throw new Error("No active one-loop run is available to stop");
    const project = this.port.project(projectId);
    const stamp = this.port.now();
    this.database.query(`
      UPDATE campaign_loop_runs SET status = 'stopped', end_phase = $phase, end_json = $end,
        halt_after_step = 0, updated_at = $now, completed_at = $now WHERE loop_id = $id
    `).run({ $id: loop.loop_id, $phase: project.current_phase, $end: JSON.stringify(this.boundary(projectId)), $now: stamp });
    this.port.touchProject(projectId);
    this.port.recordEvent(projectId, "loop", loop.loop_id, "loop.stopped", { actor, phase: project.current_phase });
    return { loopId: loop.loop_id, status: "stopped", phase: project.current_phase };
  }

  async advance(projectId: string): Promise<void> {
    if (this.advancing.has(projectId)) {
      this.advanceAgain.add(projectId);
      return;
    }
    this.advancing.add(projectId);
    try {
      let loop = this.activeLoop(projectId);
      if (!loop || loop.status !== "running") return;
      const queuedControl = this.database.query(`
        SELECT action_id FROM campaign_actions
        WHERE project_id = $project AND status = 'queued'
          AND action_type IN ('loop.pause', 'loop.halt-after-step', 'loop.stop') LIMIT 1
      `).get({ $project: projectId });
      if (queuedControl) return;
      if (loop.pending_action_id) {
        const action = this.action(loop.pending_action_id);
        const steps = parseJson<LoopStep[]>(loop.steps_json, []);
        const step = steps.find((candidate) => candidate.actionId === action.action_id);
        if (step) {
          step.status = action.status === "completed" ? "completed" : action.status === "failed" ? "failed" : action.status === "running" ? "running" : "queued";
          if (["completed", "failed"].includes(action.status)) {
            step.completedAt = action.completed_at || this.port.now();
            step.summary = action.status === "completed" ? JSON.stringify(parseJson(action.result_json, {})).slice(0, 500) : action.error.slice(0, 500);
          }
          this.database.query("UPDATE campaign_loop_runs SET steps_json = $steps, updated_at = $now WHERE loop_id = $id")
            .run({ $id: loop.loop_id, $steps: JSON.stringify(steps), $now: this.port.now() });
        }
        if (["queued", "running"].includes(action.status)) return;
        if (action.status === "failed") return this.attention(loop, `${this.stepLabel(action.action_type)} failed: ${action.error}`);
        const halt = Boolean(loop.halt_after_step);
        this.database.query("UPDATE campaign_loop_runs SET pending_action_id = '', halt_after_step = 0, status = $status, updated_at = $now WHERE loop_id = $id")
          .run({ $id: loop.loop_id, $status: halt ? "paused" : "running", $now: this.port.now() });
        if (halt) {
          this.port.touchProject(projectId);
          this.port.recordEvent(projectId, "loop", loop.loop_id, "loop.paused-after-step", { actionId: action.action_id });
          return;
        }
        loop = this.activeLoop(projectId)!;
      }
      const next = this.chooseNext(loop);
      if (next) await next;
    } catch (error) {
      const loop = this.activeLoop(projectId);
      if (loop) this.attention(loop, error instanceof Error ? error.message : String(error));
    } finally {
      this.advancing.delete(projectId);
      const shouldAdvanceAgain = this.advanceAgain.delete(projectId);
      const pendingLoop = this.activeLoop(projectId);
      if (shouldAdvanceAgain) {
        queueMicrotask(() => void this.advance(projectId));
      } else if (pendingLoop?.status === "running" && pendingLoop.pending_action_id) {
        const pendingAction = this.action(pendingLoop.pending_action_id);
        if (["completed", "failed"].includes(pendingAction.status)) queueMicrotask(() => void this.advance(projectId));
      }
    }
  }

  private chooseNext(loop: LoopRunRow): Promise<void> | void {
    const projectId = loop.project_id;
    const phase = this.port.project(projectId).current_phase;
    if (["RESEARCH_REVIEW", "RESEARCH_READY"].includes(phase)) {
      const custody = nextCustodyAutopilotStep(this.port.custody(projectId));
      if (custody?.kind === "action") return this.enqueueStep(loop, custody.type, custody.targetId, custody.args || {}, custody.key);
      if (custody?.kind === "wait") return;
      if (custody?.kind === "attention") return this.attention(loop, custody.message);
    }
    if (phase === "DECISION_REQUIRED") {
      if (loop.decision_crossed) return this.complete(loop, phase);
      const wave = this.waves.latest(projectId);
      const synthesis = wave ? this.database.query("SELECT response_json FROM campaign_syntheses WHERE wave_id = $wave").get({ $wave: wave.wave_id }) as { response_json: string } | null : null;
      const response = parseJson<Record<string, any>>(synthesis?.response_json || "{}", {});
      if (String(response.decision || "").toUpperCase() === "BLOCKED") return this.attention(loop, "Synthesis is blocked and requires operator direction");
      const hasResearch = String(response.decision || "").toUpperCase() === "RESEARCH_REQUIRED"
        || (Array.isArray(response.researchRequests) && response.researchRequests.length > 0)
        || (Array.isArray(response.nextWave?.lanes) && response.nextWave.lanes.length > 0);
      this.database.query("UPDATE campaign_loop_runs SET decision_crossed = 1, updated_at = $now WHERE loop_id = $id").run({ $id: loop.loop_id, $now: this.port.now() });
      return this.enqueueStep(loop, "synthesis.review", "", { decision: hasResearch ? "research" : "accept", note: "Single-loop autopilot followed the recorded synthesis recommendation." }, hasResearch ? "follow-research-recommendation" : "accept-complete-wave");
    }
    if (phase === "NEXT_WAVE_READY") return this.complete(loop, phase);
    if (phase === "SYNTHESIS_READY") {
      const wave = this.waves.latest(projectId);
      return this.enqueueStep(loop, wave?.bundle_path ? "synthesis.request" : "synthesis.prepare");
    }
    if (phase === "SYNTHESIZING") {
      const synthesis = this.database.query("SELECT wave_id, status, updated_at FROM campaign_syntheses WHERE wave_id = (SELECT wave_id FROM campaign_waves WHERE project_id = $project ORDER BY created_at DESC LIMIT 1)")
        .get({ $project: projectId }) as { wave_id: string; status: string; updated_at: string } | null;
      const stale = synthesis?.status === "drafting" && Date.now() - Date.parse(synthesis.updated_at) >= 90_000;
      if (stale) return this.enqueueStep(loop, "synthesis.reconcile", synthesis.wave_id);
      return;
    }
    if (["RESEARCH_RUNNING", "RUNNING"].includes(phase)) return;
    if (phase === "PLANNING") {
      const active = this.activeObserverLanes(projectId);
      if (!active.length) return this.attention(loop, "No active wave is available to adopt");
      return this.enqueueStep(loop, "wave.adopt");
    }
    if (phase === "RECONCILING") {
      const terminal = this.activeObserverLanes(projectId).find((lane) => lane.attentionReason === "terminal-unrecorded" && lane.landing === "—");
      if (terminal) return this.enqueueStep(loop, "lane.reconcile", terminal.id);
      const wave = this.waves.latest(projectId);
      const accounting = wave ? waveAccounting(this.waves.members(wave.wave_id)) : null;
      const triage = wave ? this.database.query("SELECT * FROM campaign_wave_triages WHERE wave_id = $wave").get({ $wave: wave.wave_id }) as { status: string; evidence_digest: string } | null : null;
      if (accounting && Number(accounting.unaccounted) > 0 && Number(accounting.running) === 0) {
        if (triage?.status === "drafting") return;
        if (triage?.status === "drafted") return this.enqueueStep(loop, "wave.triage.apply", "", { waveId: wave!.wave_id, evidenceDigest: triage.evidence_digest });
        return this.enqueueStep(loop, "wave.triage.request");
      }
      return this.attention(loop, "Reconciliation has no safe mechanical or coordinator-proposed transition");
    }
    if (phase === "RESEARCH_INTAKE") {
      const run = this.database.query("SELECT run_id FROM campaign_research_runs WHERE project_id = $project AND status = 'evidence_ready' ORDER BY created_at DESC LIMIT 1")
        .get({ $project: projectId }) as { run_id: string } | null;
      if (!run) {
        const repairable = this.database.query("SELECT run_id FROM campaign_research_runs WHERE project_id = $project AND status = 'awaiting_evidence' AND error LIKE '%hash-mode declaration mismatch:%' ORDER BY created_at DESC LIMIT 1")
          .get({ $project: projectId }) as { run_id: string } | null;
        if (repairable) return this.enqueueStep(loop, "research.receipt.reconcile", repairable.run_id);
        const failed = this.database.query("SELECT task_id FROM campaign_research_runs WHERE project_id = $project AND status = 'failed' ORDER BY created_at DESC LIMIT 1")
          .get({ $project: projectId }) as { task_id: string } | null;
        return this.attention(loop, failed
          ? `Research launch failed safely before evidence landed: ${failed.task_id}. Use the recovery gate to stage a fresh checked schedule.`
          : "Research intake has no validated evidence-ready receipt");
      }
      return this.enqueueStep(loop, "research.evidence.return", run.run_id);
    }
    if (phase === "RESEARCH_REVIEW") {
      const wave = this.waves.latest(projectId);
      const plan = wave ? this.database.query("SELECT * FROM campaign_research_plans WHERE wave_id = $wave").get({ $wave: wave.wave_id }) as { status: string; response_json: string } | null : null;
      if (plan?.status === "drafting") return;
      if (plan?.status === "drafted") {
        const response = parseJson<Record<string, any>>(plan.response_json, {});
        if (response.decision !== "READY_FOR_GATE") return this.attention(loop, `Coordinator plan is ${response.decision || "not ready"}`);
        const lanes = Array.isArray(response.lanes) ? response.lanes : [];
        const readyLanes = lanes.filter((lane: any) => lane?.contract?.status === "READY" && /^[0-9a-f]{40}$/i.test(String(lane.contract.baseRef || "")));
        if (!readyLanes.length) return this.enqueueStep(loop, "research.review.resolve", "", { decision: "revise", note: "Autopilot resolved the checked dependency-only plan after its custody prerequisites settled; request fresh exact base bindings." }, "dependency-plan-revision");
        return this.enqueueStep(loop, "research.review.resolve", "", { decision: "approve", note: "Single-loop autopilot applied the coordinator's checked READY_FOR_GATE plan." });
      }
      return this.enqueueStep(loop, "research.review.start");
    }
    if (phase === "RESEARCH_READY") {
      const wave = this.waves.latest(projectId);
      const schedule = wave ? this.schedules.latest(projectId, wave.wave_id) : null;
      if (!schedule || ["superseded", "failed", "completed"].includes(schedule.status)) return this.enqueueStep(loop, "research.schedule.prepare");
      if (schedule.status === "proposed") return this.attention(loop, "The resource-bounded wave schedule requires explicit operator confirmation before dispatch");
      if (schedule.status === "confirmed") return this.enqueueStep(loop, "research.schedule.dispatch", schedule.schedule_id, { scheduleDigest: schedule.schedule_digest });
      if (["dispatching", "running", "landed"].includes(schedule.status)) return;
      return this.attention(loop, `Wave schedule entered ${schedule.status} and requires operator inspection`);
    }
    if (phase === "REVISING") return this.enqueueStep(loop, "research.review.start", "", {}, "dependency-plan-recheck");
    if (phase === "BLOCKED") return this.attention(loop, `Campaign entered ${phase} and requires operator direction`);
    this.attention(loop, `One-loop automation does not yet have a safe transition from ${phase}`);
  }

  private resumeBlocker(projectId: string): string {
    const phase = this.port.project(projectId).current_phase;
    const wave = this.waves.latest(projectId);
    if (["RESEARCH_REVIEW", "RESEARCH_READY"].includes(phase)) {
      const custody = nextCustodyAutopilotStep(this.port.custody(projectId));
      if (custody?.kind === "attention") return custody.message;
      if (custody?.kind === "wait") return "";
      if (custody?.kind === "action") {
        const readiness = this.port.startReadiness(projectId);
        return readiness.canStart ? "" : readiness.blocker;
      }
    }
    if (phase === "RESEARCH_REVIEW") {
      const plan = wave ? this.database.query("SELECT status, response_json FROM campaign_research_plans WHERE wave_id = $wave").get({ $wave: wave.wave_id }) as { status: string; response_json: string } | null : null;
      if (plan?.status === "drafted") {
        const decision = String(parseJson<Record<string, any>>(plan.response_json, {}).decision || "not ready");
        if (decision !== "READY_FOR_GATE") return `The checked coordinator plan remains ${decision}. Resolve or revise that plan boundary before rechecking autopilot.`;
      }
    }
    if (phase === "RESEARCH_READY") {
      const schedule = wave ? this.schedules.latest(projectId, wave.wave_id) : null;
      if (schedule?.status === "proposed") return "The immutable multi-member wave schedule is waiting for explicit operator confirmation.";
      const scheduleClosed = !schedule || ["superseded", "failed", "completed"].includes(schedule.status);
      if (scheduleClosed && !this.port.nextDispatchTarget(projectId)) return "No dependency-safe checked launch contract is available. Repair the contract or change the checked plan before rechecking autopilot.";
    }
    if (phase === "DECISION_REQUIRED") {
      const synthesis = wave ? this.database.query("SELECT response_json FROM campaign_syntheses WHERE wave_id = $wave").get({ $wave: wave.wave_id }) as { response_json: string } | null : null;
      if (String(parseJson<Record<string, any>>(synthesis?.response_json || "{}", {}).decision || "").toUpperCase() === "BLOCKED") return "The synthesis still requires operator direction before autopilot can cross this decision boundary.";
    }
    if (["BLOCKED", "REVISING"].includes(phase)) return `The campaign remains in ${phase}; resolve that human boundary before rechecking autopilot.`;
    if (phase === "PLANNING" && !this.activeObserverLanes(projectId).length) return "No active wave is available to adopt yet.";
    return "";
  }

  private boundary(projectId: string): Record<string, unknown> {
    const project = this.port.project(projectId);
    const wave = this.waves.latest(projectId);
    const synthesis = wave ? this.database.query("SELECT status, response_json, updated_at FROM campaign_syntheses WHERE wave_id = $wave").get({ $wave: wave.wave_id }) as Record<string, string> | null : null;
    const runs = this.database.query("SELECT task_id, status, profile, evidence_sha256, created_at, completed_at FROM campaign_research_runs WHERE project_id = $project ORDER BY created_at")
      .all({ $project: projectId }) as Array<Record<string, string>>;
    const counts = Object.fromEntries(["launching", "running", "blocked", "evidence_ready", "returned_to_sol", "failed"].map((status) => [status, runs.filter((run) => run.status === status).length]));
    const latestRun = runs.at(-1);
    return {
      capturedAt: this.port.now(), phase: project.current_phase, version: project.version, waveId: wave?.wave_id || "", waveLabel: wave?.label || "",
      evidenceDigest: wave?.evidence_digest || "", synthesisStatus: synthesis?.status || "",
      synthesisDecision: synthesis ? parseJson<Record<string, any>>(synthesis.response_json, {}).decision || "" : "", runCounts: counts,
      latestRun: latestRun ? { taskId: latestRun.task_id, status: latestRun.status, profile: latestRun.profile, evidenceSha256: latestRun.evidence_sha256, createdAt: latestRun.created_at, completedAt: latestRun.completed_at } : null,
    };
  }

  private async enqueueStep(loop: LoopRunRow, type: string, targetId = "", args: Record<string, unknown> = {}, key: string = type): Promise<void> {
    let steps = compactLoopSteps(parseJson<LoopStep[]>(loop.steps_json, []));
    const priorMatches = steps.filter((step) => step.key === key);
    const failedMatches = steps.filter((step) => step.key === key && step.status === "failed");
    const retrySlot = failedMatches[0] || null;
    const priorAttempts = priorMatches.reduce((maximum, step) => Math.max(maximum, step.attemptCount || 1), 0);
    if (failedMatches.length > 1) {
      const keepId = retrySlot!.actionId;
      steps = steps.filter((step) => step.key !== key || step.status !== "failed" || step.actionId === keepId);
      steps.forEach((step, index) => { step.index = index + 1; });
    }
    const action = await this.port.enqueueAction({
      projectId: loop.project_id, type, targetId, args, expectedVersion: this.port.project(loop.project_id).version,
      idempotencyKey: `single-loop:${loop.loop_id}:${key}:attempt:${priorAttempts + 1}`,
    }, `single-loop:${loop.loop_id}`) as Record<string, any>;
    const stamp = this.port.now();
    const step: LoopStep = {
      index: retrySlot?.index || steps.length + 1, key, label: this.stepLabel(type), actionType: type,
      status: ["running", "completed", "failed"].includes(action.status) ? action.status : "queued", actionId: String(action.id || ""),
      startedAt: stamp, completedAt: "", summary: "", attemptCount: priorAttempts + 1,
    };
    if (retrySlot) steps[steps.findIndex((candidate) => candidate.actionId === retrySlot.actionId)] = step;
    else steps.push(step);
    this.database.query("UPDATE campaign_loop_runs SET steps_json = $steps, pending_action_id = $action, updated_at = $now WHERE loop_id = $id")
      .run({ $id: loop.loop_id, $steps: JSON.stringify(steps), $action: action.id, $now: stamp });
    this.port.recordEvent(loop.project_id, "loop", loop.loop_id, "loop.step.queued", { index: step.index, attempt: step.attemptCount, type, actionId: action.id, targetId });
  }

  private complete(loop: LoopRunRow, phase: string): void {
    const stamp = this.port.now();
    this.database.query(`UPDATE campaign_loop_runs SET status = 'completed', end_phase = $phase, end_json = $end, pending_action_id = '', halt_after_step = 0, updated_at = $now, completed_at = $now WHERE loop_id = $id`)
      .run({ $id: loop.loop_id, $phase: phase, $end: JSON.stringify(this.boundary(loop.project_id)), $now: stamp });
    this.port.touchProject(loop.project_id);
    this.port.recordEvent(loop.project_id, "loop", loop.loop_id, "loop.completed", { phase });
  }

  private attention(loop: LoopRunRow, message: string): void {
    const stamp = this.port.now();
    this.database.query("UPDATE campaign_loop_runs SET status = 'attention', pending_action_id = '', error = $error, updated_at = $now WHERE loop_id = $id")
      .run({ $id: loop.loop_id, $error: message.slice(0, 4000), $now: stamp });
    this.port.touchProject(loop.project_id);
    this.port.recordEvent(loop.project_id, "loop", loop.loop_id, "loop.attention", { error: message });
  }

  private action(actionId: string): ActionRow {
    const row = this.database.query("SELECT * FROM campaign_actions WHERE action_id = $id").get({ $id: actionId }) as ActionRow | null;
    if (!row) throw new Error(`Unknown action: ${actionId}`);
    return row;
  }

  private activeObserverLanes(projectId: string) {
    return this.port.observer()?.lanes.filter((lane) => lane.project === projectId && lane.lifecycle === "active") ?? [];
  }

  private stepLabel(type: string): string {
    return ({
      "synthesis.prepare": "Freeze synthesis input", "synthesis.request": "Synthesize the situation", "synthesis.reconcile": "Recheck or retry an interrupted synthesis", "synthesis.review": "Follow synthesis direction",
      "research.review.start": "Coordinator checks the lane plan", "research.review.resolve": "Apply the checked lane plan",
      "research.schedule.prepare": "Freeze the resource-bounded wave schedule", "research.schedule.confirm": "Confirm the exact wave schedule",
      "research.schedule.dispatch": "Dispatch the confirmed wave", "research.dispatch.start": "Dispatch one bounded lane",
      "research.failure.requeue": "Stage a failed launch for a fresh schedule", "research.receipt.reconcile": "Reconcile exact receipt custody metadata", "research.evidence.return": "Return landed evidence to synthesis", "wave.adopt": "Adopt the active wave", "lane.reconcile": "Reconcile a terminal lane",
      "custody.item.promote": "Enable the bounded custody contract", "custody.lease.prepare": "Freeze the exact custody lease", "custody.lease.confirm": "Confirm custody under active-loop authority", "custody.lease.dispatch": "Dispatch one Terra custody steward", "custody.lease.reconcile": "Reconcile a stale or interrupted Terra steward", "custody.receipt.land": "Land a mechanically verified custody receipt",
      "wave.triage.request": "Ask Sol to triage unresolved custody", "wave.triage.apply": "Apply Sol's custody recommendations",
    } as Record<string, string>)[type] || type;
  }
}
