<script lang="ts">
  import { campaignState } from "./campaign-state";
  import { settleCampaignAction, type CampaignProject as BaseCampaignProject } from "./campaign-actions";

  type LoopStep = {
    index: number;
    label: string;
    status: string;
    actionId: string;
    completedAt?: string;
    attemptCount?: number;
  };

  type LoopBoundary = {
    capturedAt?: string;
    phase?: string;
    waveLabel?: string;
    runCounts?: Record<string, number>;
    latestRun?: { taskId?: string; status?: string };
  };

  type LoopState = {
    id: string;
    status: string;
    start?: LoopBoundary;
    end?: LoopBoundary;
    steps?: LoopStep[];
    pendingActionId?: string;
    haltAfterStep?: boolean;
    error?: string;
    canResume?: boolean;
    resumeBlocker?: string;
  };

  type CampaignProject = BaseCampaignProject & {
    canStartLoop: boolean;
    loopStart?: {
      canStart: boolean;
      code: string;
      blocker: string;
      effectiveTokenLimit?: number;
      minimumRunnableTokenCap?: number;
      runnableTasks?: string[];
    };
    loop?: LoopState | null;
  };

  let project: CampaignProject | null = null;
  let working = "";
  let feedback = "";
  let feedbackKind: "pending" | "success" | "error" = "pending";

  const phaseLabels: Record<string, string> = {
    SYNTHESIS_READY: "results ready", SYNTHESIZING: "synthesizing situation", DECISION_REQUIRED: "direction decision",
    RESEARCH_REVIEW: "wave planning", RESEARCH_READY: "human launch gate", RESEARCH_RUNNING: "wave out",
    RESEARCH_INTAKE: "landing and intake", NEXT_WAVE_READY: "next wave ready", PLANNING: "planning",
  };

  const actionCopy: Record<string, { pending: string; completed: string }> = {
    "loop.start": { pending: "Starting one-loop autopilot…", completed: "Autopilot started from the captured boundary." },
    "loop.pause": { pending: "Pausing automatic advancement…", completed: "Autopilot paused before another step starts." },
    "loop.resume": { pending: "Rechecking the recorded boundary…", completed: "The boundary cleared; autopilot resumed." },
    "loop.halt-after-step": { pending: "Arming the next step boundary…", completed: "Autopilot will halt when the current step settles." },
    "loop.stop": { pending: "Stopping and capturing this run…", completed: "The loop stopped and its end state was captured." },
    "research.schedule.prepare": { pending: "Freezing the dependency-safe resource frontier…", completed: "The immutable multi-member schedule is ready for review." },
    "research.schedule.confirm": { pending: "Confirming the exact schedule digest…", completed: "The wave reservation is confirmed. No worker launched yet." },
    "research.schedule.dispatch": { pending: "Reserving and launching the confirmed wave…", completed: "The confirmed wave was dispatched under its fixed contracts." },
  };

  function phaseLabel(value = "PLANNING"): string {
    return phaseLabels[value] || value.toLowerCase().replaceAll("_", " ");
  }

  function timestamp(value?: string): string {
    if (!value) return "Pending";
    const parsed = new Date(value);
    return Number.isFinite(parsed.getTime()) ? parsed.toLocaleString() : "Pending";
  }

  function boundaryNote(boundary?: LoopBoundary): string {
    const counts = boundary?.runCounts || {};
    const settled = Number(counts.returned_to_sol || 0) + Number(counts.evidence_ready || 0);
    return boundary?.latestRun?.taskId
      ? `${boundary.latestRun.taskId} · ${boundary.latestRun.status || "recorded"}`
      : `${settled} landed research receipt${settled === 1 ? "" : "s"}`;
  }

  async function submit(type: string, targetId = "", args: Record<string, unknown> = {}): Promise<void> {
    if (!project || working) return;
    working = type;
    feedbackKind = "pending";
    feedback = actionCopy[type]?.pending || "Updating autopilot…";
    try {
      await settleCampaignAction({ projectId: project.id, type, targetId, args, scope: "loop-control", pollLimit: type === "research.schedule.dispatch" ? 160 : 32 });
      feedbackKind = "success";
      feedback = actionCopy[type]?.completed || "Autopilot updated.";
    } catch (error) {
      feedbackKind = "error";
      feedback = error instanceof Error ? error.message : String(error);
    } finally {
      working = "";
    }
  }

  function revealRequiredGate(): void {
    document.querySelector("#operator-gate, #next-action")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function revealStrategyProposal(): void {
    for (const selector of ["#strategy-workspaces", "#strategy-workspace"]) {
      const element = document.querySelector(selector);
      if (element instanceof HTMLDetailsElement) element.open = true;
    }
    requestAnimationFrame(() => document.querySelector("#strategy-workspace")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  $: project = ($campaignState.control?.projects?.find((candidate) => candidate.id === $campaignState.selectedProject) as CampaignProject | undefined) || null;
  $: loop = project?.loop || null;
  $: active = Boolean(loop && ["running", "paused", "attention"].includes(loop.status));
  $: steps = loop?.steps || [];
  $: current = steps.find((step) => step.actionId === loop?.pendingActionId) || steps.at(-1);
  $: activeRun = project?.researchRuns?.find((run: any) => ["launching", "running", "blocked"].includes(run.status)) || null;
  $: activeRuns = project?.researchRuns?.filter((run: any) => ["launching", "running", "blocked"].includes(run.status)) || [];
  $: schedule = project?.researchSchedule || null;
  $: scheduleGate = project?.phase === "RESEARCH_READY";
  $: custodyBlockers = (project?.custody?.items || []).filter((item: any) => item.blocksResearch && !["complete", "parked"].includes(item.status));
  $: custodyGate = scheduleGate && custodyBlockers.length > 0;
  $: scheduleClosed = Boolean(schedule && ["completed", "failed", "superseded"].includes(schedule.status));
  $: scheduleNeedsPreparation = scheduleGate && !custodyGate && (!schedule || scheduleClosed);
  $: scheduleVisible = Boolean(schedule && !scheduleClosed && ["RESEARCH_READY", "RESEARCH_RUNNING", "RESEARCH_INTAKE", "SYNTHESIZING"].includes(project?.phase || ""));
  $: startBlocked = Boolean(project && !active && !project.canStartLoop && project.loopStart?.blocker
    && !(scheduleGate && schedule && ["proposed", "confirmed"].includes(schedule.status)));
  $: strategyProposal = project?.strategy?.workspace?.activeReview?.status === "drafted"
    ? project.strategy.workspace.activeReview.response?.proposal : null;
  $: statusLabel = startBlocked ? "PREFLIGHT BLOCKED"
    : scheduleGate && schedule?.status === "proposed" ? "CONFIRM WAVE"
    : scheduleGate && schedule?.status === "confirmed" ? "WAVE RESERVED"
      : ({ running: "RUNNING", paused: "PAUSED", attention: "NEEDS ATTENTION", completed: "LOOP COMPLETE", stopped: "STOPPED" } as Record<string, string>)[loop?.status || ""] || "READY";
  $: statusClass = startBlocked ? "attention"
    : scheduleGate && schedule?.status === "proposed" ? "attention"
    : scheduleGate && schedule?.status === "confirmed" ? "paused"
      : loop?.status === "attention" ? "attention" : loop?.status === "completed" ? "complete" : loop?.status || "ready";
  $: guidance = project?.researchPlan?.response?.operatorGuidance || project?.wave?.synthesis?.response?.operatorBrief?.nextDecision || "Resolve the required human gate, then autopilot can recheck the boundary.";
  $: operatorTransitionRequired = project?.phase === "RESEARCH_REVIEW"
    && project?.researchPlan?.status === "drafted"
    && project?.researchPlan?.response?.decision === "BLOCKED"
    && project?.researchPlan?.response?.lanes?.some((lane: any) => lane?.taskId === "operator-doc-a1-canonical-transition");
</script>

{#if project}
  <section class="loop-control {statusClass}" id="loop-control" aria-live="polite">
    <div class="loop-control-heading">
      <div>
        <p class="eyebrow">ONE-LOOP AUTOPILOT</p>
        <h3>{startBlocked ? "Recenter resources before starting the loop" : custodyGate ? "Resolve custody before scheduling research" : scheduleNeedsPreparation ? "Freeze the resource-bounded wave" : scheduleGate && schedule?.status === "proposed" ? `Confirm ${schedule.members?.length || 0} scheduled member${schedule.members?.length === 1 ? "" : "s"}` : scheduleGate && schedule?.status === "confirmed" ? "Dispatch the confirmed wave" : operatorTransitionRequired ? "Paused for one operator approval" : activeRun ? `${activeRuns.length} bounded lane${activeRuns.length === 1 ? " is" : "s are"} working` : active ? (current?.label || (loop?.status === "attention" ? "Waiting at a checked boundary" : "Watching for the next safe step")) : loop?.status === "completed" ? "A full bounded loop is captured" : "Continue to the next fresh decision"}</h3>
        <p>{startBlocked ? project?.loopStart?.blocker : custodyGate ? `${custodyBlockers.length} required custody contract${custodyBlockers.length === 1 ? " remains" : "s remain"}. Wave scheduling is locked until the focused dependency above is reshaped or settled.` : scheduleNeedsPreparation ? `${scheduleClosed ? "The previous schedule is closed. " : ""}Freeze the current dependency-safe frontier under the slot and token policy before operator review.` : scheduleGate && schedule?.status === "proposed" ? "Review the exact tasks, contracts, resource caps, and deferred lanes below. Confirmation reserves this digest but launches nothing." : scheduleGate && schedule?.status === "confirmed" ? "The operator gate is captured. Dispatch will launch only these immutable members and will preserve a batch evidence boundary." : operatorTransitionRequired ? "The checked staging evidence is ready; approve DOC-A1 below, then Sol will replan automatically." : activeRun ? `${activeRuns.map((run: any) => run.taskId).join(", ")}. Autopilot will wait for the whole wave, perform batch intake, and continue the loop.` : "decision → checked plan → resource-bounded wave → custody → batch synthesis → next decision. Every action and receipt stays inspectable."}</p>
      </div>
      <span class="loop-status {statusClass}">{statusLabel}</span>
    </div>

    {#if loop?.error && !operatorTransitionRequired}
      <div class="loop-error" role="alert"><strong>Paused safely</strong><span>{loop.error}</span></div>
    {/if}
    {#if startBlocked}
      <div class="loop-resolution">
        <span>AUTOMATION START PREFLIGHT · {project?.loopStart?.code?.replaceAll("_", " ")}</span>
        <strong>{project?.loopStart?.blocker}</strong>
        {#if project?.loopStart?.minimumRunnableTokenCap}
          <p>{Number(project.loopStart.minimumRunnableTokenCap).toLocaleString()} required · {Number(project.loopStart.effectiveTokenLimit || 0).toLocaleString()} currently schedulable · no workflow transition was consumed.</p>
        {/if}
      </div>
    {/if}
    {#if loop?.status === "attention" && loop.resumeBlocker && !operatorTransitionRequired}
      <div class="loop-resolution">
        <span>REQUIRED BEFORE AUTOPILOT CAN CONTINUE</span>
        <strong>{loop.resumeBlocker}</strong>
        <p>{guidance}</p>
      </div>
    {/if}

    {#if scheduleVisible}
      <details class="scheduled-wave" open={schedule.status === "proposed"}>
        <summary><span>IMMUTABLE WAVE SCHEDULE · {schedule.digest?.slice(0, 18)}…</span><strong>{schedule.members?.length || 0} reserved · {schedule.deferred?.length || 0} deferred</strong></summary>
        <div class="scheduled-wave-body">
          <div class="schedule-budget"><span><b>{schedule.proposal?.budget?.reservedTokens?.toLocaleString() || 0}</b> tokens reserved</span><span><b>{schedule.proposal?.slots?.reserved || 0}/{schedule.proposal?.slots?.available || 0}</b> available slots</span><span><b>{schedule.status.toUpperCase()}</b> schedule state</span></div>
          <ol>{#each schedule.members || [] as member (member.requestId)}<li><b>{member.ordinal}</b><div><strong>{member.taskId}</strong><span>{member.profile} · cap {member.tokenCap?.toLocaleString()} · {member.trackId}/{member.workKind}</span><p>{member.expectedDelta}</p></div><i>{member.status}</i></li>{/each}</ol>
          {#if schedule.deferred?.length}<details class="schedule-deferred"><summary>Deferred candidates <strong>{schedule.deferred.length}</strong></summary><ul>{#each schedule.deferred as member (member.requestId)}<li><strong>{member.taskId}</strong><span>{member.decision.replaceAll("_", " ")} · {member.decisionReason}</span></li>{/each}</ul></details>{/if}
          <footer><b>{schedule.authority === "operator-confirmed-reservation" ? "OPERATOR-CONFIRMED RESERVATION" : schedule.authority === "operator-confirmed-execution" ? "BOUND SCHEDULE EXECUTION" : "NO DISPATCH AUTHORITY"}</b><span>{schedule.authority === "operator-confirmed-reservation" ? "Only the fixed members above may now be dispatched." : schedule.authority === "operator-confirmed-execution" ? "Member status and batch intake remain bound to the confirmed digest." : "Confirming the exact digest is required before any member can launch."}</span></footer>
        </div>
      </details>
    {/if}

    <div class="loop-control-row">
      <div class="loop-now">
        <span>{scheduleGate ? "Current position" : loop?.haltAfterStep ? "Halt armed" : active ? "Current position" : "Scope"}</span>
        <strong>{startBlocked ? "Resource gate → unlock autopilot" : custodyGate ? "Custody dependency → bounded successor → resume" : scheduleNeedsPreparation ? "Checked plan → freeze schedule" : scheduleGate && schedule?.status === "proposed" ? "Resource frontier frozen → operator confirmation" : scheduleGate && schedule?.status === "confirmed" ? "Operator confirmed → bounded wave dispatch" : operatorTransitionRequired ? "DOC-A1 preflight passed · your approval is next" : activeRun ? `${activeRun.taskId} · ${activeRun.status}` : loop?.haltAfterStep ? "Will pause when this step settles" : current ? `${current.index}. ${current.label} · ${current.status}` : "One decision-to-decision cycle"}</strong>
      </div>
      <div class="loop-buttons">
        {#if custodyGate}
          <button class="primary-button compact" onclick={revealRequiredGate}>Return to custody action</button>
          {#if active}<button class="outline-button compact" disabled={Boolean(working)} onclick={() => submit("loop.stop")}>Stop & capture here</button>{/if}
        {:else if startBlocked}
          <button class="primary-button autopilot-start-button" disabled>▶ Start one-loop autopilot</button>
          <button class="outline-button compact autopilot-unlock-button" onclick={revealStrategyProposal}>{strategyProposal?.epochLabel ? "Review Epoch 2 resource proposal →" : "Open strategy & resources →"}</button>
        {:else if scheduleNeedsPreparation}
          <button class="primary-button compact" disabled={Boolean(working)} onclick={() => submit("research.schedule.prepare")}>{working ? "Freezing…" : "Freeze wave schedule"}</button>
          {#if active}<button class="outline-button compact" disabled={Boolean(working)} onclick={() => submit("loop.stop")}>Stop & capture here</button>{/if}
        {:else if scheduleGate && schedule?.status === "proposed"}
          <button class="primary-button compact" disabled={Boolean(working)} onclick={() => submit("research.schedule.confirm", schedule.id, { scheduleDigest: schedule.digest })}>{working ? "Confirming…" : `Confirm ${schedule.members?.length || 0}-lane schedule`}</button>
          {#if active}<button class="outline-button compact" disabled={Boolean(working)} onclick={() => submit("loop.stop")}>Stop & capture here</button>{/if}
        {:else if scheduleGate && schedule?.status === "confirmed"}
          {#if loop?.status === "paused" || loop?.status === "attention"}
            <button class="primary-button compact" disabled={Boolean(working)} onclick={() => submit("loop.resume")}>{working ? "Resuming…" : "Resume & dispatch wave"}</button>
          {:else if loop?.status !== "running"}
            <button class="primary-button compact" disabled={Boolean(working)} onclick={() => submit("research.schedule.dispatch", schedule.id, { scheduleDigest: schedule.digest })}>{working ? "Dispatching…" : `Dispatch ${schedule.members?.length || 0}-lane wave`}</button>
          {/if}
          {#if active}<button class="outline-button compact" disabled={Boolean(working)} onclick={() => submit("loop.stop")}>Stop & capture here</button>{/if}
        {:else if loop?.status === "running"}
          <button class="outline-button compact" disabled={Boolean(working)} onclick={() => submit("loop.pause")}>{activeRun ? "Pause automation" : "Pause now"}</button>
          <button class="outline-button compact" disabled={Boolean(working)} onclick={() => submit("loop.halt-after-step")}>{loop.pendingActionId ? "Halt after this step" : "Pause before next step"}</button>
          <button class="outline-button compact" disabled={Boolean(working)} onclick={() => submit("loop.stop")}>Stop & capture here</button>
        {:else if loop?.status === "paused" || (loop?.status === "attention" && loop.canResume)}
          <button class="primary-button compact" disabled={Boolean(working)} onclick={() => submit("loop.resume")}>{working === "loop.resume" ? "Rechecking…" : "Recheck & resume"}</button>
          <button class="outline-button compact" disabled={Boolean(working)} onclick={() => submit("loop.stop")}>Stop & capture here</button>
        {:else if loop?.status === "attention"}
          <button class="primary-button compact" onclick={revealRequiredGate}>{operatorTransitionRequired ? "Review & approve DOC-A1" : "Resolve the required gate"}</button>
          <button class="outline-button compact" disabled={Boolean(working)} onclick={() => submit("loop.stop")}>Stop & capture here</button>
        {:else if project.canStartLoop}
          <button class="primary-button" disabled={Boolean(working)} onclick={() => submit("loop.start")}>{working === "loop.start" ? "Starting…" : loop?.status === "completed" ? "Run another complete loop" : project.phase === "DECISION_REQUIRED" ? "Run one complete loop" : "Continue this loop automatically"}</button>
        {/if}
      </div>
    </div>

    <details class="loop-context">
      <summary>Loop record & step ledger <strong>{steps.filter((step) => step.status === "completed").length}/{steps.length} settled</strong></summary>
      <div class="loop-boundaries">
        <div class="loop-boundary">
          <span>START · {timestamp(loop?.start?.capturedAt)}</span>
          <strong>{phaseLabel(loop?.start?.phase)}</strong>
          <small>{loop?.start?.waveLabel || "No named wave"} · {boundaryNote(loop?.start)}</small>
        </div>
        {#if loop?.end?.capturedAt}
          <div class="loop-boundary">
            <span>END · {timestamp(loop.end.capturedAt)}</span>
            <strong>{phaseLabel(loop.end.phase)}</strong>
            <small>{loop.end.waveLabel || "No named wave"} · {boundaryNote(loop.end)}</small>
          </div>
        {:else}
          <div class="loop-boundary pending"><span>END · PENDING</span><strong>{active ? "Captured when this run stops" : "Not captured"}</strong></div>
        {/if}
      </div>
      {#if steps.length}
        <ol class="loop-context-steps">{#each steps as step (step.actionId)}<li class={step.status}><span>{step.index}</span><div><strong>{step.label}</strong><small>{step.status}{step.attemptCount && step.attemptCount > 1 ? ` · attempt ${step.attemptCount}` : ""}{step.completedAt ? ` · ${timestamp(step.completedAt)}` : ""}</small></div></li>{/each}</ol>
      {/if}
    </details>
    {#if feedback}<div class="gate-feedback loop-feedback {feedbackKind}" role="status"><span>{feedback}</span></div>{/if}
  </section>
{/if}
