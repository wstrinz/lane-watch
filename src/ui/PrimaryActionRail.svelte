<script lang="ts">
  import { campaignState, refreshAll, selectProject } from "./campaign-state";
  import { settleCampaignAction, type CampaignProject as Project } from "./campaign-actions";

  type RailAction = { key: string; label: string; style?: string; args?: Record<string, any>; targetId?: string; target?: string };
  type RailFocus = { title: string; detail: string; status: string; actions: RailAction[] };
  let project: Project | null = null;
  let working = "";
  let feedback = "";
  let feedbackKind: "pending" | "success" | "error" = "pending";
  let decisionNote = "";
  let recoveryDecision = "PRESERVE_HOLD";
  let recoveryNote = "";
  let recoveryConfirmed = false;
  let recoveryReportId = "";

  const phaseLabels: Record<string, string> = {
    SYNTHESIS_READY: "landed evidence", SYNTHESIZING: "synthesis", DECISION_REQUIRED: "direction decision",
    RESEARCH_REVIEW: "wave planning", RESEARCH_READY: "launch gate", RESEARCH_RUNNING: "wave out",
    RESEARCH_INTAKE: "landing and intake", NEXT_WAVE_READY: "next wave ready", PLANNING: "planning",
    RECONCILING: "reconciliation", BLOCKED: "blocked", RUNNING: "wave out", REVISING: "plan revision",
  };

  function compact(value: unknown, limit = 260): string {
    const text = String(value || "").trim().replace(/\s+/g, " ");
    return text.length <= limit ? text : `${text.slice(0, limit).replace(/\s+\S*$/, "")}…`;
  }

  function currentRequests(value: any): any[] {
    const requests = Array.isArray(value?.researchRequests) ? value.researchRequests : [];
    const waveRequests = value?.wave?.id ? requests.filter((request: any) => request.waveId === value.wave.id) : requests;
    const planActive = ["drafting", "drafted"].includes(String(value?.researchPlan?.status || ""));
    if (!planActive) return waveRequests;
    const reviewRequests = waveRequests.filter((request: any) => request.status === "in_review");
    const planIds = new Set((Array.isArray(value?.researchPlan?.response?.lanes) ? value.researchPlan.response.lanes : []).map((lane: any) => lane?.requestId).filter(Boolean));
    return planIds.size ? reviewRequests.filter((request: any) => planIds.has(request.id)) : reviewRequests;
  }

  function readiness(lane: any): "ready" | "followup" | "excluded" | "contract" {
    if (lane?.action === "DROP" || lane?.contract?.status === "NOT_LAUNCHABLE") return "excluded";
    if (lane?.contract?.status === "AFTER_DEPENDENCY" || lane?.dependsOnTaskIds?.length) return "followup";
    if (lane?.contract?.status === "READY" && /^[0-9a-f]{40}$/i.test(String(lane.contract.baseRef || ""))) return "ready";
    return "contract";
  }

  function focusFor(value: any): RailFocus {
    const recovery = value.controlState?.recovery;
    const failedRun = (value.researchRuns || []).find((candidate: any) => candidate.status === "failed" && !candidate.evidenceSha256);
    if (recovery?.required && failedRun && value.researchSchedule?.status === "failed") {
      return {
        status: "SAFE RETRY READY",
        title: "Return the failed launch to one checked gate",
        detail: compact(failedRun.error || "The worker stopped before validated evidence landed. Its attempt remains preserved, and no mathematical claim was inferred."),
        actions: [{ key: "research.failure.requeue", targetId: failedRun.id, label: "Stage fresh retry", style: "primary-button" }],
      };
    }
    if (recovery?.required) {
      const report = value.recoveryReport;
      return {
      status: "RECOVERY REVIEW",
      title: "Workflow and frozen wave disagree",
      detail: compact(recovery.summary || `The workflow is ${recovery.workflowPhase}, while the frozen wave is ${recovery.wavePhase}. Inspect the durable boundary before choosing a new transition.`),
      actions: [
        ...(report?.status === "prepared"
          ? [{ key: "scroll", label: "Review frozen recovery report", target: ".rail-recovery", style: "primary-button" }]
          : [{ key: "campaign.recovery.prepare", label: "Freeze recovery report", style: "primary-button" }]),
        { key: "scroll", label: "Inspect workflow history", target: ".campaign-map", style: "primary-button" },
        { key: "scroll", label: "Inspect frozen wave", target: "#wave-accounting", style: "outline-button" },
      ],
      };
    }
    const accounting = value.wave?.accounting;
    const count = accounting ? `${accounting.accounted}/${accounting.total}` : "no adopted wave";
    if (value.canApplyWaveTriage) return { status: "HUMAN GATE", title: "Apply the checked accounting repair", detail: `Sol’s triage is ready, but only ${count} source lanes are accounted. Applying the proposal records dispositions; it does not promote claims.`, actions: [{ key: "wave.triage.apply", label: "Apply Sol recommendations", style: "primary-button", args: { waveId: value.wave?.id, evidenceDigest: value.wave?.triage?.evidenceDigest } }] };
    if (value.canRequestWaveTriage) return { status: "ACCOUNTING GAP", title: "Ask Sol for bounded wave triage", detail: `Workers have stopped, but only ${count} source lanes are accounted. The triage pass is read-only until a second human apply gate.`, actions: [{ key: "wave.triage.request", label: "Ask Sol to triage", style: "primary-button" }] };
    if (value.canPrepareSynthesis) return { status: "READY", title: "Freeze the synthesis boundary", detail: `The wave is closed at ${count}. Freeze its evidence and campaign context before any synthesis job starts.`, actions: [{ key: "synthesis.prepare", label: "Prepare synthesis bundle", style: "primary-button" }] };
    if (value.canRequestSynthesis) return { status: "READY", title: "Run the fast wave synthesis", detail: "The immutable evidence bundle is ready. Sol will check the landed results and advise the next planning decision without dispatching.", actions: [{ key: "synthesis.request", label: "Ask Sol to synthesize", style: "primary-button" }] };
    if (value.phase === "SYNTHESIZING") return { status: "SOL WORKING", title: "Wave synthesis is running", detail: "Sol is checking landed evidence, contradictions, portfolio balance, and the next decision. This rail will update without moving the page.", actions: [] };
    if (value.phase === "DECISION_REQUIRED") {
      const synthesis = value.wave?.synthesis?.response || {};
      const next = Array.isArray(synthesis?.nextWave?.lanes) ? synthesis.nextWave.lanes : [];
      const research = synthesis.decision === "RESEARCH_REQUIRED" || synthesis.decision === "BLOCKED";
      return { status: "HUMAN DIRECTION GATE", title: "Choose the campaign direction", detail: compact(synthesis?.operatorBrief?.nextDecision || synthesis?.waveReview?.summary || `Sol proposes ${next.length} follow-up lanes.`), actions: [
        ...(research ? [{ key: "synthesis.review", label: next.length ? `Plan ${next.length} bounded follow-up${next.length === 1 ? "" : "s"}` : "Open idea-search planning", style: "primary-button", args: { decision: "research" } }] : []),
        { key: "synthesis.review", label: research ? "Close wave without follow-up" : "Approve direction", style: research ? "outline-button" : "primary-button", args: { decision: "accept" } },
        { key: "synthesis.review", label: "Request revision", style: "outline-button", args: { decision: "revise" } },
        { key: "synthesis.review", label: "Hold here", style: "outline-button", args: { decision: "block" } },
        { key: "inspect", label: "Inspect synthesis", style: "outline-button" },
      ] };
    }
    if (value.phase === "RESEARCH_REVIEW") {
      const plan = value.researchPlan;
      const lanes = Array.isArray(plan?.response?.lanes) ? plan.response.lanes : [];
      const ready = lanes.filter((lane: any) => readiness(lane) === "ready");
      const blocked = plan?.status === "drafted" && plan?.response?.decision === "BLOCKED";
      if (plan?.status === "drafting") return { status: "SOL CHECKING", title: "Sol is shaping the next bounded wave", detail: `The coordinator is checking ${currentRequests(value).length} requests for grain, dependencies, contracts, resources, and tunnel vision. It cannot dispatch.`, actions: [] };
      if (blocked) return { status: "OPERATOR TRANSITION", title: "The checked plan needs one operator-owned change", detail: compact(plan?.response?.operatorGuidance || "No safe lane can launch until the required transition is resolved."), actions: [{ key: "scroll", label: "Open required operator gate", target: "#operator-gate", style: "primary-button" }] };
      if (plan?.status === "drafted") return { status: "HUMAN PLAN GATE", title: `Review ${ready.length} launchable lane${ready.length === 1 ? "" : "s"}`, detail: compact(plan?.response?.summary || plan?.response?.operatorGuidance || "The checked plan is ready for an explicit human gate."), actions: [
        { key: "research.review.resolve", label: `Approve & stage ${ready.length} lane${ready.length === 1 ? "" : "s"}`, style: "primary-button", args: { decision: "approve" } },
        { key: "research.review.resolve", label: "Request revision", style: "outline-button", args: { decision: "revise" } },
        { key: "research.review.resolve", label: "Block plan", style: "outline-button", args: { decision: "block" } },
      ] };
      return { status: "PLAN INPUT READY", title: "Ask Sol to shape the wave", detail: `${currentRequests(value).filter((request: any) => request.status === "proposed").length} candidate lane records are ready for dependency, staffing, resource, and breadth checks.`, actions: [{ key: "research.review.start", label: "Check & shape lane plan", style: "primary-button" }] };
    }
    if (value.phase === "RESEARCH_READY") {
      const schedule = value.researchSchedule;
      if (schedule?.status === "proposed") return { status: "HUMAN LAUNCH GATE", title: `Confirm ${schedule.members?.length || 0} checked lane${schedule.members?.length === 1 ? "" : "s"}`, detail: "This reserves the exact immutable schedule digest but launches nothing. Autopilot can dispatch only after this human boundary is recorded.", actions: [{ key: "research.schedule.confirm", targetId: schedule.id, args: { scheduleDigest: schedule.digest }, label: "Confirm checked wave", style: "primary-button" }] };
      if (schedule?.status === "confirmed") return { status: "READY TO DISPATCH", title: "Launch the confirmed bounded wave", detail: "The human reservation is recorded. Resuming autopilot launches only the confirmed members and keeps their evidence together for batch intake.", actions: [{ key: "loop.resume", label: "Resume & dispatch", style: "primary-button" }] };
      return { status: "LAUNCH PREPARATION", title: "Freeze the dependency-safe retry schedule", detail: "The failed attempt is preserved. Rechecking autopilot will create a fresh immutable schedule for the same checked mathematical contract, without launching it.", actions: [{ key: "loop.resume", label: "Prepare checked schedule", style: "primary-button" }] };
    }
    if (value.phase === "RESEARCH_RUNNING") {
      const runs = (value.researchRuns || []).filter((run: any) => ["launching", "running", "blocked"].includes(run.status));
      return { status: "WAVE OUT", title: `${runs.length || 1} bounded lane${runs.length === 1 ? " is" : "s are"} active`, detail: runs.map((run: any) => run.taskId).join(" · ") || "The observer is waiting for terminal receipts.", actions: [{ key: "scroll", label: "Inspect live lanes", target: "#observer-lanes", style: "outline-button" }] };
    }
    if (value.phase === "RESEARCH_INTAKE") {
      const run = (value.researchRuns || []).find((candidate: any) => candidate.status === "evidence_ready");
      const failed = (value.researchRuns || []).find((candidate: any) => candidate.status === "failed");
      const waiting = (value.researchRuns || []).find((candidate: any) => candidate.status === "awaiting_evidence");
      return {
        status: run ? "LANDING GATE" : failed ? "LAUNCH FAILED SAFELY" : "LANDING GATE",
        title: run ? "Accept the landed research receipt" : failed ? "Retry from a fresh checked schedule" : waiting?.error ? "Resolve the receipt check" : "Recheck the landing boundary",
        detail: run
          ? "Returning evidence preserves custody and starts read-only synthesis. It does not promote claims, merge, push, or dispatch another lane."
          : failed
            ? compact(failed.error || "The worker stopped before producing validated evidence. The failed attempt is preserved; retry returns the same frozen contract to a new schedule and launch gate.")
            : compact(waiting?.error || "The worker is terminal, but its validated evidence receipt has not landed yet. Recheck once, or inspect the worker and receipt without leaving this control area."),
        actions: run
          ? [{ key: "research.evidence.return", targetId: run.id, label: "Accept receipt & continue", style: "primary-button" }]
          : failed ? [{ key: "research.failure.requeue", targetId: failed.id, label: "Stage a fresh retry", style: "primary-button" }] : [
            { key: "refresh", label: "Recheck receipt", style: "primary-button" },
            { key: "reveal", label: "Inspect worker & receipt", target: "#evidence-workspace", style: "outline-button" },
          ],
      };
    }
    if (value.phase === "REVISING") return { status: "REVISION READY", title: "Rerun the corrected plan check", detail: "Your revision direction is recorded and no lanes were staged.", actions: [{ key: "research.review.start", label: "Run corrected plan check", style: "primary-button" }] };
    if (value.canAdoptWave) return { status: "BOOTSTRAP", title: "Adopt the current bounded lanes", detail: "Capture the current active lane set as an explicit wave before applying accounting and synthesis mechanics.", actions: [{ key: "wave.adopt", label: "Adopt active lanes", style: "primary-button" }] };
    return { status: value.phase || "PLANNING", title: "Planning the next bounded move", detail: value.role || "No active wave is ready for synthesis yet.", actions: [] };
  }

  async function act(item: RailAction): Promise<void> {
    if (!project || working) return;
    if (item.key === "scroll") {
      document.querySelector(item.target || "")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (item.key === "reveal") {
      const target = document.querySelector(item.target || "") as HTMLDetailsElement | null;
      if (target) { target.open = true; target.scrollIntoView({ behavior: "smooth", block: "start" }); }
      return;
    }
    if (item.key === "inspect") {
      const inspector = document.querySelector("#next-action .rail-inspector") as HTMLDetailsElement | null;
      if (inspector) { inspector.open = true; inspector.scrollIntoView({ behavior: "smooth", block: "nearest" }); }
      return;
    }
    working = item.key;
    feedbackKind = "pending";
    feedback = item.key === "refresh" ? "Rechecking the worker and receipt boundary…" : "Applying the checked transition…";
    try {
      if (item.key === "refresh") {
        await refreshAll();
        feedbackKind = "success";
        feedback = "The worker and receipt boundary is current.";
        return;
      }
      const args = { ...(item.args || {}), ...(["synthesis.review", "research.review.resolve"].includes(item.key) ? { note: decisionNote } : {}) };
      const result = await settleCampaignAction({ projectId: project.id, type: item.key, targetId: item.targetId || "", args, scope: "primary-rail", pollLimit: ["synthesis.request", "research.review.start"].includes(item.key) ? 160 : 80 });
      if (item.key === "research.failure.requeue" && result.project.phase === "RESEARCH_READY") {
        await settleCampaignAction({ projectId: project.id, type: "loop.resume", scope: "primary-rail-retry", pollLimit: 80 });
      }
      if (item.key === "synthesis.review" && item.args?.decision === "research" && result.project.phase === "RESEARCH_REVIEW") {
        await settleCampaignAction({ projectId: project.id, type: "research.review.start", scope: "primary-rail", pollLimit: 160 });
      }
      decisionNote = "";
      feedbackKind = "success";
      feedback = "The transition settled and the live control state is current.";
    } catch (error) {
      feedbackKind = "error";
      feedback = error instanceof Error ? error.message : String(error);
    } finally {
      working = "";
    }
  }

  async function applyRecovery(): Promise<void> {
    const report = project?.recoveryReport;
    if (!project || !report || report.status !== "prepared" || working || !recoveryConfirmed) return;
    working = "campaign.recovery.apply";
    feedbackKind = "pending";
    feedback = "Revalidating the exact recovery digest…";
    try {
      await settleCampaignAction({
        projectId: project.id,
        type: "campaign.recovery.apply",
        args: {
          reportId: report.id,
          reportDigest: report.reportDigest,
          decision: recoveryDecision,
          note: recoveryNote,
          confirmation: "APPLY CAMPAIGN RECOVERY",
        },
        scope: "recovery-rail",
      });
      recoveryConfirmed = false;
      recoveryNote = "";
      feedbackKind = "success";
      feedback = "The selected historical recovery decision settled. No worker result, dispatch, claim promotion, merge, or push was inferred.";
    } catch (error) {
      feedbackKind = "error";
      feedback = error instanceof Error ? error.message : String(error);
    } finally {
      working = "";
    }
  }

  $: project = ($campaignState.control?.projects?.find((candidate) => candidate.id === $campaignState.selectedProject) as Project | undefined) || null;
  $: focus = project ? focusFor(project) : null;
  $: planLanes = Array.isArray(project?.researchPlan?.response?.lanes) ? project.researchPlan.response.lanes : [];
  $: synthesis = project?.wave?.synthesis?.response || null;
  $: direction = project?.researchPlan?.response?.operatorGuidance || synthesis?.waveReview?.coordinatorGuidance || synthesis?.nextWave?.objective || project?.role || "";
  $: if ((project?.recoveryReport?.id || "") !== recoveryReportId) {
    recoveryReportId = project?.recoveryReport?.id || "";
    recoveryDecision = "PRESERVE_HOLD";
    recoveryNote = "";
    recoveryConfirmed = false;
  }
</script>

{#if project && focus}
  <section class="lifecycle-focus primary-action-rail" id="next-action" aria-live="polite">
    <div class="rail-copy">
      <div class="rail-kicker"><span>{project.id}</span><strong>{phaseLabels[project.phase] || project.phase?.toLowerCase().replaceAll("_", " ")}</strong><i>{focus.status}</i></div>
      <h2>{focus.title}</h2>
      <p>{focus.detail}</p>
      {#if direction}<div class="rail-direction"><span>CURRENT GROUNDING</span><strong>{compact(direction, 360)}</strong></div>{/if}
      {#if project.controlState?.observation}
        <div class="rail-observation"><span>OBSERVED ACTIVITY · NON-AUTHORITATIVE</span><strong>{phaseLabels[project.controlState.observation.phase] || project.controlState.observation.phase?.toLowerCase().replaceAll("_", " ")} · {project.controlState.observation.active} active</strong></div>
      {/if}
      <details class="rail-hint">
        <summary><span>WHY THIS MATTERS</span><strong>Plain-language hint + mathematical connection</strong></summary>
        <div>
          <p><b>What this state means.</b> {project.phase === "RESEARCH_READY" ? "The research question and resource cap are fixed, but no worker may run until the exact schedule is confirmed." : project.phase === "RESEARCH_INTAKE" ? "A worker boundary has settled; Lane Watch is deciding whether there is valid evidence to accept or an infrastructure attempt to retry." : "This is the next authority boundary in the campaign loop; observation alone cannot cross it."}</p>
          <p><b>Mathematical connection.</b> {compact(project.researchSchedule?.members?.[0]?.expectedDelta || project.researchPlan?.response?.lanes?.[0]?.evidenceExpected || direction || project.role, 420)}</p>
          <p><b>What your click changes.</b> {focus.actions[0]?.key === "research.failure.requeue" ? "It preserves the failed attempt, restores the same checked question to scheduling, and prepares a new confirmation gate. It does not claim a result or dispatch by itself." : focus.actions[0]?.key === "research.schedule.confirm" ? "It authorizes only this frozen task list and budget. It does not yet accept evidence or change campaign truth." : "Only the named workflow boundary changes; worker output, mathematical truth, Git integration, and publication remain separately gated."}</p>
        </div>
      </details>
    </div>
    <div class="lifecycle-actions rail-actions">
      {#each focus.actions as item}
        <button class={item.style || "outline-button"} disabled={Boolean(working)} onclick={() => act(item)}>{working === item.key ? "Working…" : item.label}</button>
      {/each}
    </div>
    {#if ["DECISION_REQUIRED", "RESEARCH_REVIEW"].includes(project.phase)}
      <details class="rail-inspector">
        <summary><span>Inspect the decision packet</span><strong>{project.phase === "DECISION_REQUIRED" ? `${synthesis?.nextWave?.lanes?.length || 0} proposed next lanes` : `${planLanes.length} checked plan records`}</strong></summary>
        <div class="rail-packet">
          {#if project.phase === "DECISION_REQUIRED"}
            <p>{synthesis?.waveReview?.summary || "No synthesis summary was recorded."}</p>
            {#if synthesis?.waveReview?.quickChecks?.length}<ul>{#each synthesis.waveReview.quickChecks as check}<li class={String(check.status).toLowerCase()}><b>{check.status}</b><span>{check.check}</span></li>{/each}</ul>{/if}
          {:else}
            <ol>{#each planLanes as lane}<li><b>{lane.priority || "–"}</b><div><strong>{lane.taskId || "bounded lane"}</strong><p>{lane.question || lane.objective || lane.rationale}</p><small>{readiness(lane)} · {lane.profile || "sonnet-worker"}</small></div></li>{/each}</ol>
          {/if}
          <label class="rail-note"><span>Operator note or revision direction</span><textarea rows="3" bind:value={decisionNote} placeholder="Optional, but useful when redirecting or requesting revision"></textarea></label>
        </div>
      </details>
    {/if}
    {#if project.controlState?.recovery?.required && focus.status !== "SAFE RETRY READY"}
      <details class="rail-inspector rail-recovery" open={project.recoveryReport?.status === "prepared"}>
        <summary><span>Historical recovery protocol</span><strong>{project.recoveryReport?.status === "prepared" ? "DIGEST FROZEN" : "REPORT REQUIRED"}</strong></summary>
        {#if project.recoveryReport?.status === "prepared"}
          <div class="recovery-report">
            <div class="recovery-report-grid">
              <div><span>WORKFLOW</span><strong>{project.recoveryReport.snapshot?.project?.phase}</strong></div>
              <div><span>FROZEN WAVE</span><strong>{project.recoveryReport.snapshot?.wave?.phase}</strong></div>
              <div><span>ACCOUNTING</span><strong>{project.recoveryReport.snapshot?.wave?.accounting?.accounted}/{project.recoveryReport.snapshot?.wave?.accounting?.total}</strong></div>
              <div><span>CONTROLLED EXECUTION</span><strong>{project.recoveryReport.snapshot?.controlState?.recovery?.activeExecution || 0}</strong></div>
            </div>
            <p class="recovery-digest"><span>BOUND REPORT</span><code>{project.recoveryReport.reportDigest}</code></p>
            <p>{project.recoveryReport.snapshot?.projectionRepair?.summary}</p>
            <label class="recovery-choice"><span>Explicit recovery decision</span><select bind:value={recoveryDecision}>
              <option value="PRESERVE_HOLD">Preserve the current hold</option>
              <option value="ALIGN_WAVE_TO_WORKFLOW">Align the historical wave to the workflow</option>
              <option value="ALIGN_WORKFLOW_TO_WAVE">Align the workflow to the frozen wave</option>
              <option value="APPLY_VALIDATED_PROJECTION_REPAIR" disabled={!project.recoveryReport.snapshot?.choices?.applyProjectionRepair}>Apply terminal-evidence projection repair</option>
            </select></label>
            <label class="rail-note"><span>Recovery rationale</span><textarea rows="3" bind:value={recoveryNote} placeholder="Why this historical boundary—not the research direction—should change"></textarea></label>
            <label class="recovery-confirm"><input type="checkbox" bind:checked={recoveryConfirmed} /><span>I reviewed the exact digest and authorize only this historical recovery decision.</span></label>
            <div class="recovery-boundary"><strong>No inferred authority</strong><span>This command cannot infer a worker result, dispatch work, promote claims, merge, or push.</span></div>
            <button class="primary-button recovery-apply" disabled={!recoveryConfirmed || Boolean(working)} onclick={applyRecovery}>{working === "campaign.recovery.apply" ? "Revalidating…" : "Apply selected recovery"}</button>
          </div>
        {:else}
          <div class="recovery-report empty"><p>Freeze a fresh report before choosing a transition. Preparation is read-only with respect to campaign workflow, workers, claims, Git, and publication.</p></div>
        {/if}
      </details>
    {/if}
    {#if feedback}<div class="gate-feedback {feedbackKind}" role="status">{feedback}</div>{/if}
  </section>
{:else if $campaignState.control?.projectIndex?.length}
  <section class="project-picker" aria-label="Campaign projects">
    <div><p class="eyebrow">CAMPAIGNS</p><h2>Choose a campaign control surface</h2></div>
    <div>{#each $campaignState.control.projectIndex as candidate}<button onclick={() => selectProject(String(candidate.id))}><strong>{candidate.id}</strong><span>{phaseLabels[candidate.phase] || candidate.phase}</span><small>{candidate.role}</small></button>{/each}</div>
  </section>
{/if}
