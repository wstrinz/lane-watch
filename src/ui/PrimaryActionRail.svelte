<script lang="ts">
  import { campaignState, refreshAll, selectProject } from "./campaign-state";
  import { settleCampaignAction, type CampaignProject as Project } from "./campaign-actions";
  import { custodyNeedsReshape, custodyReshapeChildren } from "./custody-reshape";

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
  let observedLoopError = "";

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

  function duplicateWave(value: any): boolean {
    const response = value?.wave?.triage?.response;
    const recommendations = Array.isArray(response?.laneRecommendations) ? response.laneRecommendations : [];
    return value?.phase === "RECONCILING"
      && recommendations.length > 0
      && recommendations.every((item: any) => String(item?.disposition || "").toUpperCase() === "NONE")
      && /duplicate|already (?:accounted|synthesized)/i.test(`${response?.campaignAssessment || ""} ${response?.nextStep || ""}`);
  }

  function activeCustodyItem(value: any): any | null {
    return (value.custody?.items || []).find((item: any) =>
      ["assigned", "verifying"].includes(item.status)
      || ["confirmed", "dispatching", "running", "finalizing", "awaiting_review"].includes(item.activeLease?.status)) || null;
  }

  function custodyFocusItem(value: any, blockers: any[]): any {
    const loopError = String(value.loop?.error || "");
    const namedBlocker = blockers.find((item: any) => item?.task && loopError.includes(item.task));
    return activeCustodyItem(value) || namedBlocker || blockers[0];
  }

  function custodyBlockerFocus(value: any, item: any, blockers: any[]): RailFocus {
    const count = blockers.length;
    const suffix = count > 1 ? ` · 1 of ${count}` : "";
    const inspect = { key: "reveal", label: "Inspect custody queue", target: "#custody-service", style: "outline-button" };
    const lease = item.activeLease;
    const loopError = String(value.loop?.error || "");
    const reshapeChildren = custodyReshapeChildren(item);
    const needsReshape = custodyNeedsReshape(item, loopError);
    const reshapeBatch = blockers.map((candidate: any) => ({
      targetId: candidate.id,
      task: candidate.task,
      children: custodyReshapeChildren(candidate),
    })).filter((candidate: any) => candidate.children.length >= 2 && custodyNeedsReshape(
      blockers.find((item: any) => item.id === candidate.targetId),
      loopError,
    ));
    if (reshapeChildren.length && needsReshape) return {
      status: reshapeBatch.length > 1 ? `CUSTODY CONTRACT RESHAPE · ${reshapeBatch.length} OVERSIZED` : `CUSTODY CONTRACT RESHAPE${suffix}`,
      title: reshapeBatch.length > 1 ? `${reshapeBatch.length} jobs are larger than their custody leases` : "This job is larger than one custody lease",
      detail: reshapeBatch.length > 1
        ? `All ${reshapeBatch.length} failed receipts landed zero changes. One approval replaces them with ${reshapeBatch.reduce((total: number, candidate: any) => total + candidate.children.length, 0)} dependency-ordered successors and resumes the one-at-a-time custody steward.`
        : `The failed receipt landed no changes. Replace this oversized contract with ${reshapeChildren.length} dependency-ordered successors and resume the one-at-a-time custody steward.`,
      actions: [
        { key: "custody.reshape-and-resume", args: { batch: reshapeBatch.length > 1 ? reshapeBatch : [{ targetId: item.id, task: item.task, children: reshapeChildren }] }, label: reshapeBatch.length > 1 ? `Split all ${reshapeBatch.length} & resume custody` : "Split & resume custody", style: "primary-button" },
        inspect,
      ],
    };
    if (needsReshape) return {
      status: `CUSTODY CONTRACT STOP${suffix}`,
      title: "This job cannot safely repeat unchanged",
      detail: "The last zero-effect attempt crossed its fixed lease ceiling. Keep the dependency and inspect its acceptance contract; a smaller successor shape is required before another steward may run.",
      actions: [inspect],
    };
    if (item.status === "proposed") return {
      status: `DEPENDENCY GATE${suffix}`,
      title: `Enable ${compact(item.task, 72)}`,
      detail: compact(`${item.reason} This authorizes the bounded custody contract and freezes its exact lease; it does not start a steward.`),
      actions: [
        { key: "custody.item.promote", targetId: item.id, label: "Enable & freeze custody check", style: "primary-button" },
        inspect,
      ],
    };
    if (["blocked", "failed"].includes(item.status)) {
      const protocolStop = /lease-byte provenance mismatch|frozen[- ]lease[- ]integrity|specified frozen lease|executor turn was interrupted|runtime interruption/i.test(`${item.receipt?.summary || ""} ${item.receipt?.stopReason || ""}`);
      if (!protocolStop) return {
        status: `CUSTODY REVIEW REQUIRED${suffix}`,
        title: compact(item.task, 96),
        detail: compact(`${item.receipt?.summary || item.reason} The receipt is not classified as a controller-owned interruption, so Lane Watch will not repeat it automatically.`),
        actions: [inspect],
      };
      return {
        status: `SAFE CUSTODY RETRY${suffix}`,
        title: protocolStop ? "Retry the unchanged contract with the corrected lease check" : `Retry ${compact(item.task, 72)}`,
        detail: protocolStop
          ? "The prior steward changed no files and stopped on a controller-owned digest instruction. One click freezes a fresh lease and dispatches Terra under the same allowed paths; it cannot promote a claim."
          : compact(`${item.receipt?.summary || item.reason} A retry remains inside the same frozen acceptance contract and repair-generation limit.`),
        actions: [
          { key: "custody.item.promote", targetId: item.id, args: { autoDispatch: true, note: "Operator requested one bounded custody retry and dispatch under the unchanged acceptance contract." }, label: "Retry with Terra", style: "primary-button" },
          inspect,
        ],
      };
    }
    if (item.status === "ready" && !lease) return {
      status: `LEASE PREPARATION${suffix}`,
      title: `Freeze ${compact(item.task, 72)}`,
      detail: "The custody contract is enabled. Bind it to the current campaign revision and exact resource envelope before granting execution authority.",
      actions: [{ key: "custody.lease.prepare", targetId: item.id, label: "Freeze exact custody lease", style: "primary-button" }, inspect],
    };
    if (lease?.status === "prepared" && Number(value.resources?.slots?.available?.custody ?? 1) < 1) {
      const holder = activeCustodyItem(value);
      return {
        status: `CUSTODY QUEUED${suffix}`,
        title: "One Terra steward is already using the custody slot",
        detail: holder
          ? `${compact(holder.task, 100)} is active. This exact lease is safely prepared and autopilot will confirm and dispatch it after the active receipt settles.`
          : "The shared custody slot is occupied by another campaign. This exact lease is safely prepared and will remain queued until the slot is released.",
        actions: [inspect],
      };
    }
    if (lease?.status === "prepared") return {
      status: `HUMAN CUSTODY GATE${suffix}`,
      title: `Confirm ${compact(item.task, 72)}`,
      detail: "The immutable lease is ready. This click confirms its exact digest and dispatches one isolated Terra steward; it cannot change research direction or promote a claim.",
      actions: [
        { key: "custody.lease.confirm", targetId: lease.id, args: { leaseDigest: lease.leaseDigest }, label: "Confirm & dispatch steward", style: "primary-button" },
        inspect,
      ],
    };
    if (lease?.status === "confirmed") return {
      status: `READY TO DISPATCH${suffix}`,
      title: `Run ${compact(item.task, 72)}`,
      detail: "Human authority is already recorded for this exact lease. Dispatch starts only its bounded isolated steward.",
      actions: [{ key: "custody.lease.dispatch", targetId: lease.id, args: { leaseDigest: lease.leaseDigest }, label: "Dispatch Terra steward", style: "primary-button" }, inspect],
    };
    if (["running", "finalizing"].includes(String(lease?.status || "")) || item.status === "assigned") return {
      status: `CUSTODY RUNNING${suffix}`,
      title: compact(item.task, 96),
      detail: lease?.status === "finalizing" ? "The isolated result is being measured and checked before its landing gate appears." : "The isolated Terra steward is working inside the exact lease. Research remains blocked until its receipt is reviewed.",
      actions: [
        ...(lease?.id && Date.now() - Date.parse(lease.updatedAt || lease.startedAt || item.updatedAt || "") >= 60_000
          ? [{ key: "custody.lease.reconcile", targetId: lease.id, label: "Recheck steward", style: "primary-button" }]
          : []),
        inspect,
      ],
    };
    if (lease?.status === "awaiting_review" || item.status === "verifying") return {
      status: `RECEIPT GATE${suffix}`,
      title: `Review ${compact(item.task, 72)}`,
      detail: compact(lease?.receipt?.summary || "The bounded custody result is ready. Landing rechecks the receipt and exact producer commit; it does not promote a mathematical claim."),
      actions: [
        ...(lease?.verification?.landable ? [{ key: "custody.receipt.land", targetId: lease.id, args: { receiptDigest: lease.receiptDigest }, label: "Accept & land custody result", style: "primary-button" }] : []),
        inspect,
      ],
    };
    return {
      status: `CUSTODY ATTENTION${suffix}`,
      title: compact(item.task, 96),
      detail: compact(lease?.error || item.reason || "This custody dependency needs inspection before research planning can continue."),
      actions: [inspect],
    };
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
    if (duplicateWave(value)) return {
      status: "CONTROL-PLANE REPAIR",
      title: "Remove the duplicate wave from the live loop",
      detail: "These exact lane executions were already dispositioned and synthesized. Closing this duplicate restores the prior decision boundary without changing evidence, claims, Git, or worker state.",
      actions: [{ key: "wave.duplicate.close", label: "Close duplicate & restore decision", style: "primary-button" }],
    };
    if (value.canApplyWaveTriage) return { status: "HUMAN GATE", title: "Apply the checked accounting repair", detail: `Sol’s triage is ready, but only ${count} source lanes are accounted. Applying the proposal records dispositions; it does not promote claims.`, actions: [{ key: "wave.triage.apply", label: "Apply Sol recommendations", style: "primary-button", args: { waveId: value.wave?.id, evidenceDigest: value.wave?.triage?.evidenceDigest } }] };
    if (value.canRequestWaveTriage) return { status: "ACCOUNTING GAP", title: "Ask Sol for bounded wave triage", detail: `Workers have stopped, but only ${count} source lanes are accounted. The triage pass is read-only until a second human apply gate.`, actions: [{ key: "wave.triage.request", label: "Ask Sol to triage", style: "primary-button" }] };
    if (value.canPrepareSynthesis) return { status: "READY", title: "Freeze the synthesis boundary", detail: `The wave is closed at ${count}. Freeze its evidence and campaign context before any synthesis job starts.`, actions: [{ key: "synthesis.prepare", label: "Prepare synthesis bundle", style: "primary-button" }] };
    if (value.canRequestSynthesis) return { status: "READY", title: "Run the fast wave synthesis", detail: "The immutable evidence bundle is ready. Sol will check the landed results and advise the next planning decision without dispatching.", actions: [{ key: "synthesis.request", label: "Ask Sol to synthesize", style: "primary-button" }] };
    if (value.phase === "SYNTHESIZING") return { status: "SOL WORKING", title: "Wave synthesis is running", detail: "Sol is checking landed evidence, contradictions, portfolio balance, and the next decision. This rail will update without moving the page.", actions: [] };
    if (value.phase === "DECISION_REQUIRED") {
      const synthesis = value.wave?.synthesis?.response || {};
      const next = Array.isArray(synthesis?.nextWave?.lanes) ? synthesis.nextWave.lanes : [];
      const research = next.length > 0 || synthesis.decision === "RESEARCH_REQUIRED" || synthesis.decision === "BLOCKED";
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
      const dependent = lanes.filter((lane: any) => readiness(lane) === "followup");
      const custodyBlockers = (value.custody?.items || []).filter((item: any) => item.blocksResearch && !["complete", "parked"].includes(item.status));
      const blocked = plan?.status === "drafted" && plan?.response?.decision === "BLOCKED";
      if (plan?.status === "drafting") return { status: "SOL CHECKING", title: "Sol is shaping the next bounded wave", detail: `The coordinator is checking ${currentRequests(value).length} requests for grain, dependencies, contracts, resources, and tunnel vision. It cannot dispatch.`, actions: [] };
      if (blocked) return { status: "OPERATOR TRANSITION", title: "The checked plan needs one operator-owned change", detail: compact(plan?.response?.operatorGuidance || "No safe lane can launch until the required transition is resolved."), actions: [{ key: "scroll", label: "Open required operator gate", target: "#operator-gate", style: "primary-button" }] };
      if (plan?.status === "drafted" && !ready.length && dependent.length && custodyBlockers.length) return custodyBlockerFocus(value, custodyFocusItem(value, custodyBlockers), custodyBlockers);
      if (plan?.status === "drafted" && !ready.length) return { status: "DEPENDENCY PLAN", title: "No research lane can launch from this revision", detail: compact(plan?.response?.operatorGuidance || "The checked plan contains only dependent or excluded work. Request a revision after resolving its named prerequisites."), actions: [
        { key: "research.review.resolve", label: "Request dependency-aware revision", style: "primary-button", args: { decision: "revise" } },
        { key: "inspect", label: "Inspect checked plan", style: "outline-button" },
      ] };
      if (plan?.status === "drafted") return { status: "HUMAN PLAN GATE", title: `Review ${ready.length} launchable lane${ready.length === 1 ? "" : "s"}`, detail: compact(plan?.response?.summary || plan?.response?.operatorGuidance || "The checked plan is ready for an explicit human gate."), actions: [
        { key: "research.review.resolve", label: `Approve & stage ${ready.length} lane${ready.length === 1 ? "" : "s"}`, style: "primary-button", args: { decision: "approve" } },
        { key: "research.review.resolve", label: "Request revision", style: "outline-button", args: { decision: "revise" } },
        { key: "research.review.resolve", label: "Block plan", style: "outline-button", args: { decision: "block" } },
      ] };
      return { status: "PLAN INPUT READY", title: "Ask Sol to shape the wave", detail: `${currentRequests(value).filter((request: any) => request.status === "proposed").length} candidate lane records are ready for dependency, staffing, resource, and breadth checks.`, actions: [{ key: "research.review.start", label: "Check & shape lane plan", style: "primary-button" }] };
    }
    if (value.phase === "RESEARCH_READY") {
      const custodyBlockers = (value.custody?.items || []).filter((item: any) => item.blocksResearch && !["complete", "parked"].includes(item.status));
      if (custodyBlockers.length) return custodyBlockerFocus(value, custodyFocusItem(value, custodyBlockers), custodyBlockers);
      const schedule = value.researchSchedule;
      if (schedule?.status === "proposed") return { status: "HUMAN LAUNCH GATE", title: `Confirm ${schedule.members?.length || 0} checked lane${schedule.members?.length === 1 ? "" : "s"}`, detail: "This reserves the exact immutable schedule digest but launches nothing. Autopilot can dispatch only after this human boundary is recorded.", actions: [{ key: "research.schedule.confirm", targetId: schedule.id, args: { scheduleDigest: schedule.digest }, label: "Confirm checked wave", style: "primary-button" }] };
      if (schedule?.status === "confirmed") return { status: "READY TO DISPATCH", title: "Launch the confirmed bounded wave", detail: "The human reservation is recorded. Resuming autopilot launches only the confirmed members and keeps their evidence together for batch intake.", actions: [{ key: "loop.resume", label: "Resume & dispatch", style: "primary-button" }] };
      if (value.loop?.resumeBlocker) return { status: "PLAN REPAIR NEEDED", title: "Repair the checked launch frontier", detail: compact(value.loop.resumeBlocker), actions: [
        { key: "reveal", label: "Inspect process & plan", target: "#process-history", style: "primary-button" },
        { key: "reveal", label: "Review strategy context", target: "#strategy-workspaces", style: "outline-button" },
      ] };
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
      const repairable = waiting && /hash-mode declaration mismatch:/i.test(String(waiting.error || ""));
      return {
        status: run ? "LANDING GATE" : failed ? "LAUNCH FAILED SAFELY" : repairable ? "BOUNDED CUSTODY REPAIR" : "LANDING GATE",
        title: run ? "Accept the landed research receipt" : failed ? "Retry from a fresh checked schedule" : repairable ? "Correct the receipt’s hashing declaration" : waiting?.error ? "Resolve the receipt check" : "Recheck the landing boundary",
        detail: run
          ? "Returning evidence preserves custody and starts read-only synthesis. It does not promote claims, merge, push, or dispatch another lane."
          : failed
            ? compact(failed.error || "The worker stopped before producing validated evidence. The failed attempt is preserved; retry returns the same frozen contract to a new schedule and launch gate.")
            : repairable
              ? "The artifact bytes already match every recorded digest. The receipt mislabeled raw Windows bytes as canonical LF; this repair changes only that declaration, freezes an audit commit, and leaves the mathematical result untouched."
              : compact(waiting?.error || "The worker is terminal, but its validated evidence receipt has not landed yet. Recheck once, or inspect the worker and receipt without leaving this control area."),
        actions: run
          ? [{ key: "research.evidence.return", targetId: run.id, label: "Accept receipt & continue", style: "primary-button" }]
          : failed ? [{ key: "research.failure.requeue", targetId: failed.id, label: "Stage a fresh retry", style: "primary-button" }] : repairable ? [
            { key: "research.receipt.reconcile", targetId: waiting.id, label: "Repair receipt custody", style: "primary-button" },
            { key: "reveal", label: "Inspect exact mismatch", target: "#evidence-workspace", style: "outline-button" },
          ] : [
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
      if (target) {
        let ancestor = target.parentElement;
        while (ancestor) {
          if (ancestor instanceof HTMLDetailsElement) ancestor.open = true;
          ancestor = ancestor.parentElement;
        }
        target.open = true;
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
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
      if (item.key === "custody.reshape-and-resume") {
        const batch = Array.isArray(item.args?.batch) ? item.args.batch : [];
        if (!batch.length) throw new Error("No oversized custody contracts were selected");
        for (const candidate of batch) {
          await settleCampaignAction({
            projectId: project.id,
            type: "custody.item.reshape",
            targetId: String(candidate.targetId || ""),
            args: { children: candidate.children },
            scope: "primary-rail-custody-batch",
            pollLimit: 80,
          });
        }
        await settleCampaignAction({ projectId: project.id, type: "loop.resume", scope: "primary-rail-custody-resume", pollLimit: 80 });
        feedbackKind = "success";
        feedback = `${batch.length} oversized contract${batch.length === 1 ? " was" : "s were"} replaced by dependency-ordered successors, and custody autopilot resumed.`;
        return;
      }
      const args = { ...(item.args || {}), ...(["synthesis.review", "research.review.resolve"].includes(item.key) ? { note: decisionNote } : {}) };
      let result = await settleCampaignAction({ projectId: project.id, type: item.key, targetId: item.targetId || "", args, scope: "primary-rail", pollLimit: ["synthesis.request", "research.review.start"].includes(item.key) ? 160 : 80 });
      if (item.key === "custody.item.promote") {
        const promoted = result.project.custody?.items?.find((candidate: any) => candidate.id === item.targetId);
        if (promoted?.status === "ready" && !promoted.activeLease) {
          result = await settleCampaignAction({ projectId: project.id, type: "custody.lease.prepare", targetId: promoted.id, scope: "primary-rail-custody", pollLimit: 80 });
        }
        if (item.args?.autoDispatch) {
          const prepared = result.project.custody?.items?.find((candidate: any) => candidate.id === item.targetId)?.activeLease;
          if (prepared?.status === "prepared") {
            result = await settleCampaignAction({ projectId: project.id, type: "custody.lease.confirm", targetId: prepared.id, args: { leaseDigest: prepared.leaseDigest }, scope: "primary-rail-custody", pollLimit: 80 });
          }
          const confirmed = result.project.custody?.items?.find((candidate: any) => candidate.id === item.targetId)?.activeLease;
          if (confirmed?.status === "confirmed") {
            result = await settleCampaignAction({ projectId: project.id, type: "custody.lease.dispatch", targetId: confirmed.id, args: { leaseDigest: confirmed.leaseDigest }, scope: "primary-rail-custody", pollLimit: 80 });
          }
        }
      }
      if (item.key === "custody.lease.confirm") {
        const confirmed = result.project.custody?.items?.find((candidate: any) => candidate.activeLease?.id === item.targetId);
        if (confirmed?.activeLease?.status === "confirmed") {
          result = await settleCampaignAction({ projectId: project.id, type: "custody.lease.dispatch", targetId: confirmed.activeLease.id, args: { leaseDigest: confirmed.activeLease.leaseDigest }, scope: "primary-rail-custody", pollLimit: 80 });
        }
      }
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
  $: latestLoopStep = Array.isArray(project?.loop?.steps) ? project?.loop?.steps.at(-1) : null;
  $: currentLoopError = project?.loop?.status === "attention" && latestLoopStep?.status === "failed" ? String(project?.loop?.error || "") : "";
  $: if (currentLoopError && currentLoopError !== observedLoopError) {
    observedLoopError = currentLoopError;
    const releasedCustodySlot = /quota admission denied: custody slots/i.test(currentLoopError)
      && Number(project?.resources?.slots?.available?.custody || 0) > 0;
    feedbackKind = releasedCustodySlot ? "pending" : "error";
    feedback = releasedCustodySlot
      ? "Previous attempt waited on the single Terra slot. That slot is now free; use the current action above instead of repeating the old confirmation."
      : compact(currentLoopError, 520);
  }
  $: if (!currentLoopError && observedLoopError) observedLoopError = "";
  $: focus = project ? focusFor(project) : null;
  $: planLanes = Array.isArray(project?.researchPlan?.response?.lanes) ? project.researchPlan.response.lanes : [];
  $: synthesis = project?.wave?.synthesis?.response || null;
  $: direction = ["DECISION_REQUIRED", "NEXT_WAVE_READY", "SYNTHESIZING", "SYNTHESIS_READY"].includes(String(project?.phase || ""))
    ? synthesis?.waveReview?.coordinatorGuidance || synthesis?.operatorBrief?.nextDecision || synthesis?.nextWave?.objective || project?.researchPlan?.response?.operatorGuidance || project?.role || ""
    : project?.researchPlan?.response?.operatorGuidance || synthesis?.waveReview?.coordinatorGuidance || synthesis?.nextWave?.objective || project?.role || "";
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
