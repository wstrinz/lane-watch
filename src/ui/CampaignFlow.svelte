<script lang="ts">
  import { onDestroy } from "svelte";
  import { Background, BackgroundVariant, Controls, MarkerType, MiniMap, SvelteFlow, type Edge, type Node } from "@xyflow/svelte";
  import { campaignState } from "./campaign-state";

  type CampaignEvent = { id: string; aggregateType: string; aggregateId: string; type: string; payload: Record<string, unknown>; createdAt: string };
  type CampaignProject = { id: string; phase: string; version: number; context?: { sources?: Array<{ id: string; role: string; path: string; sha256: string; modifiedAt: string }> }; controlState?: { recovery?: { required?: boolean } }; wave?: { aggregate?: Record<string, any> } | null; loop?: { status?: string } | null; externalInputs?: Array<{ status: string }>; workflowHistory?: CampaignEvent[]; workflowHistorySummary?: { total?: number; returned?: number; detailAvailable?: boolean; newestAt?: string } };
  type HistoryPage = { schema: string; projectId: string; projectVersion: number; total: number; returned: number; nextCursor: string | null; items: CampaignEvent[] };
  type HistoryDelta = { key: string; start: unknown; end: unknown; changed: boolean };
  type ProgramCustody = { id: string; sourceType: string; sourceId: string; task: string; status: string; startedAt: string; completedAt: string; leases: Array<{ id: string; status: string; receiptDigest: string; startedAt: string; completedAt: string }> };
  type ProgramLane = { id: string; taskId: string; status: string; profile: string; evidenceDigest: string; tokens: number | null; startedAt: string; completedAt: string };
  type ProgramWave = { id: string; label: string; phase: string; assignment: { epochId: string; basis: string }; startedAt: string; updatedAt: string; evidenceDigest: string; lanes: ProgramLane[]; observedMembers: Array<{ laneId: string; accountingState: string; disposition: string }>; custody: ProgramCustody[] };
  type ProgramEpoch = { id: string; label: string; status: string; charterRevision: number; startedAt: string; completedAt: string; boundary: { complete: boolean; startSnapshot: Record<string, any> | null; endSnapshot: Record<string, any> | null; metrics: HistoryDelta[]; cost: HistoryDelta[]; drift: HistoryDelta[] }; custody: ProgramCustody[]; waves: ProgramWave[] };
  type ProgramHistory = { schema: string; projectId: string; projectVersion: number; mode: string; ownershipPolicy: string; counts: { epochs: number; waves: number; lanes: number; custody: number }; epochs: ProgramEpoch[] };
  type FlowNodeData = Record<string, unknown> & { label: string; title: string; kicker: string; detail: string; status: string; payload?: Record<string, unknown>; substeps?: CampaignEvent[] };
  type MapMode = "workflow" | "replay" | "history";
  type HistoryFilter = "all" | "gates" | "execution" | "evidence";

  const phaseNode: Record<string, string> = {
    PLANNING: "plan", RESEARCH_REVIEW: "plan", RESEARCH_READY: "plan", REVISING: "plan",
    RUNNING: "dispatch", RESEARCH_RUNNING: "dispatch", RECONCILING: "landing", RESEARCH_INTAKE: "landing",
    SYNTHESIS_READY: "synthesis", SYNTHESIZING: "synthesis", DECISION_REQUIRED: "decision", NEXT_WAVE_READY: "decision", BLOCKED: "decision",
  };

  const workflow = [
    { id: "plan", order: "1", title: "Shape the wave", kicker: "SOL PLAN", role: "core", detail: "Bootstrap, synthesis guidance, or redirect context becomes a checked allocation of coherent, bounded lanes.", position: { x: 40, y: 90 } },
    { id: "dispatch", order: "2", title: "Bounded execution", kicker: "WAVE OUT", role: "core", detail: "Approved immutable contracts dispatch dependency-safe lanes under the selected resource profile.", position: { x: 350, y: 25 } },
    { id: "landing", order: "3", title: "Landing & custody", kicker: "EVIDENCE INTAKE", role: "custody", detail: "Terminal work is reconciled, mechanically repaired, frozen, and admitted as evidence—not campaign truth.", position: { x: 665, y: 90 } },
    { id: "synthesis", order: "4", title: "Situation synthesis", kicker: "FAST REVIEW", role: "semantic", detail: "Sol checks what changed, contradictions, dependencies, and tunnel-vision risk, then gives planning guidance.", position: { x: 665, y: 305 } },
    { id: "decision", order: "5", title: "Direction decision", kicker: "HUMAN / AUTOPILOT GATE", role: "gate", detail: "Stop, continue an obvious follow-up, or widen the search before another checked plan.", position: { x: 350, y: 370 } },
    { id: "ideas", order: "↗", title: "Idea search", kicker: "OPTIONAL ESCAPE ROUTE", role: "escape", detail: "Search prior work and external sources when the current frontier is narrow, stale, or underdetermined.", position: { x: 40, y: 305 } },
    { id: "redirect", order: "+", title: "External perspective", kicker: "OPERATOR INPUT", role: "escape", detail: "A supplied critique, paper, or reframing pauses automation safely and asks Sol to reshape direction.", position: { x: 40, y: 440 } },
  ] as const;

  const journey = [
    { id: "intake", order: "01", title: "Packet inbox", kicker: "CONTEXT IN", detail: "A bounded queue packet is hashed and staged as context. Reception creates no launch or claim authority." },
    { id: "plan", order: "02", title: "Checked plan", kicker: "SOL + HUMAN GATE", detail: "Sol turns admitted context into a small, dependency-aware plan. A human keeps, revises, or blocks every proposed lane." },
    { id: "dispatch", order: "03", title: "Bounded wave", kicker: "CONFIRM + RUN", detail: "One exact schedule freezes contracts, dependencies, slots, and token caps before a separate dispatch action." },
    { id: "landing", order: "04", title: "Evidence return", kicker: "LAND + BATCH", detail: "Receipts land together at the wave boundary. Evidence is inspected and reconciled without becoming campaign truth automatically." },
    { id: "decision", order: "05", title: "Synthesis & decision", kicker: "SOL + HUMAN GATE", detail: "Synthesis names the delta, contradictions, and next options. The operator stops, continues, or opens a different branch." },
  ] as const;

  const journeyBranches = [
    { id: "redirect", column: 1, title: "External packet / redirect", kicker: "FEEDS INTAKE", detail: "A supplied paper, critique, or DKC packet enters as immutable context before planning." },
    { id: "ideas", column: 2, title: "Idea search & strategy", kicker: "FEEDS PLANNING", detail: "A bounded read-only search can widen the plan without creating executable work." },
    { id: "custody", column: 4, title: "Custody & independent replay", kicker: "SUPPORTS EVIDENCE", detail: "Separate Terra custody can validate artifacts and receipts without frontier authority." },
  ] as const;

  const links = [
    ["plan", "dispatch", "core"], ["dispatch", "landing", "core"], ["landing", "synthesis", "core"], ["synthesis", "decision", "core"], ["decision", "plan", "core"],
    ["decision", "ideas", "escape"], ["decision", "redirect", "escape"], ["ideas", "plan", "escape"], ["redirect", "plan", "escape"],
  ] as const;

  const eventLabels: Record<string, string> = {
    "wave.adopted": "Wave adopted", "research.review.started": "Sol checked the lane plan", "research.review.resolved": "Plan gate resolved",
    "research.dispatch.started": "Dispatch reserved", "research.dispatch.launched": "Bounded lane launched", "research.dispatch.failed": "Dispatch failed",
    "research.schedule.prepared": "Wave schedule frozen", "research.schedule.confirmed": "Wave schedule confirmed",
    "research.schedule.dispatch-started": "Scheduled wave reserved", "research.schedule.dispatched": "Scheduled wave launched",
    "research.run.observed": "Worker observed", "research.run.evidence-ready": "Evidence became ready", "research.evidence.returned": "Evidence returned to Sol",
    "synthesis.bundle.prepared": "Synthesis bundle frozen", "synthesis.requested": "Synthesis started", "synthesis.turn.completed": "Synthesis completed",
    "synthesis.reviewed": "Direction decision recorded", "campaign.redirect.queued": "External perspective queued", "campaign.redirect.started": "Sol redirect started",
    "campaign.redirect.turn.completed": "Sol redirect completed", "campaign.redirect.applied": "Redirect applied", "loop.started": "One-loop autopilot started",
    "loop.completed": "One-loop autopilot completed", "loop.attention": "Autopilot paused for attention", "loop.resumed": "Autopilot resumed",
    "campaign.operator-transition.completed": "DOC-A1 authority transition completed",
    "strategy.epoch.baseline-recorded": "Strategy epoch baseline recorded", "strategy.review.started": "Independent epoch review started",
    "strategy.review.turn.completed": "Independent epoch review completed", "strategy.epoch.activated": "New strategy epoch activated",
    "strategy.proposal.dismissed": "Strategy proposal dismissed", "strategy.wave.snapshot-recorded": "Wave strategy snapshot recorded",
    "custody.item.ready": "Custody contract marked ready", "custody.item.parked": "Custody work parked", "custody.item.proposed": "Custody work restored",
    "custody.lease.prepared": "Custody lease frozen", "custody.lease.confirmed": "Custody lease confirmed", "custody.lease.dispatched": "Terra steward dispatched",
    "custody.execution.finalizing": "Custody result measuring", "custody.execution.completed": "Custody receipt ready", "custody.receipt.landed": "Custody receipt landed", "custody.receipt.rejected": "Custody receipt rejected",
    "custody.lease.simulated": "Custody receipt simulated",
    "custody.lease.verified": "Custody receipt replay verified", "custody.lease.replay-failed": "Custody replay failed",
    "resource.schedule.simulated": "Resource schedule simulated",
  };

  const historyFilters: Array<{ id: HistoryFilter; label: string }> = [
    { id: "all", label: "All" }, { id: "gates", label: "Gates" }, { id: "execution", label: "Execution" }, { id: "evidence", label: "Evidence" },
  ];

  let project: CampaignProject | null = null;
  let mode: MapMode = "workflow";
  let historyFilter: HistoryFilter = "all";
  let selected: Node<FlowNodeData> | null = null;
  let inspection: Node<FlowNodeData> | null = null;
  let viewportWidth = typeof window !== "undefined" ? window.innerWidth : 1200;
  let compact = viewportWidth <= 700;
  let graph: { nodes: Node<FlowNodeData>[]; edges: Edge[] } = { nodes: [], edges: [] };
  let milestones: CampaignEvent[] = [];
  let replayIndex = 0;
  let replayEvent: CampaignEvent | null = null;
  let replayPlaying = false;
  let replayTimer: ReturnType<typeof setInterval> | null = null;
  let replayProjectId = "";
  let historyProjectId = "";
  let historyEvents: CampaignEvent[] = [];
  let historyTotal = 0;
  let historyCursor: string | null = null;
  let historyLoading = false;
  let historyError = "";
  let historyRequest = 0;
  let historyRevision = "";
  let programHistory: ProgramHistory | null = null;
  let programHistoryProjectId = "";
  let programHistoryLoading = false;
  let programHistoryError = "";
  let programHistoryRequest = 0;

  function nodeData(title: string, kicker: string, detail: string, status: string, extra: Partial<FlowNodeData> = {}): FlowNodeData {
    return { title, kicker, detail, status, label: `${kicker}\n${title}\n${status}`, ...extra };
  }

  function labelForEvent(type: string): string { return eventLabels[type] || type.replaceAll(".", " · "); }

  function isMilestone(event: CampaignEvent): boolean {
    if (event.type.startsWith("action.") || event.type === "project.phase.changed" || event.type === "loop.step.queued") return false;
    return Boolean(eventLabels[event.type]) || /^(wave\.|research\.(review|dispatch|evidence|run)\.|synthesis\.|campaign\.(redirect|operator-transition)\.|strategy\.|custody\.|loop\.)/.test(event.type);
  }

  function stageForEvent(event: CampaignEvent | null): string {
    const type = event?.type || "";
    if (type.startsWith("campaign.redirect")) return "redirect";
    if (type.startsWith("strategy.")) return type.includes("activated") || type.includes("baseline") ? "plan" : "decision";
    if (type.startsWith("custody.")) return "landing";
    if (type.includes("operator-transition")) return "plan";
    if (type.startsWith("research.review") || type.startsWith("research.plan") || type === "wave.adopted") return "plan";
    if (type.startsWith("research.dispatch") || type.startsWith("research.schedule")) return "dispatch";
    if (type.startsWith("research.run") || type.startsWith("research.evidence") || type.startsWith("lane.") || type.startsWith("wave.triage")) return "landing";
    if (type.startsWith("synthesis.") && type !== "synthesis.reviewed") return "synthesis";
    if (type === "synthesis.reviewed" || type.startsWith("loop.")) return "decision";
    return "plan";
  }

  function categoryForEvent(event: CampaignEvent): HistoryFilter {
    const stage = stageForEvent(event);
    if (stage === "dispatch") return "execution";
    if (stage === "landing" || stage === "synthesis") return "evidence";
    return "gates";
  }

  function positionsForWorkflow(): Record<string, { x: number; y: number }> {
    if (!compact) return Object.fromEntries(workflow.map((item) => [item.id, item.position]));
    return { plan: { x: 0, y: 0 }, dispatch: { x: 155, y: 0 }, landing: { x: 155, y: 125 }, synthesis: { x: 155, y: 250 }, decision: { x: 0, y: 250 }, ideas: { x: 0, y: 375 }, redirect: { x: 155, y: 375 } };
  }

  function journeyStage(value: CampaignProject): string {
    if (["PLANNING", "RESEARCH_REVIEW", "RESEARCH_READY", "REVISING"].includes(value.phase)) return "plan";
    if (["RUNNING", "RESEARCH_RUNNING"].includes(value.phase)) return "dispatch";
    if (["RECONCILING", "RESEARCH_INTAKE", "SYNTHESIS_READY", "SYNTHESIZING"].includes(value.phase)) return "landing";
    return "decision";
  }

  function inspectJourney(item: { id: string; title: string; kicker: string; detail: string }, status: string): void {
    selected = {
      id: item.id,
      type: "default",
      position: { x: 0, y: 0 },
      data: nodeData(item.title, item.kicker, item.detail, status),
    } as Node<FlowNodeData>;
  }

  function workflowGraph(value: CampaignProject, replay: CampaignEvent | null = null, replayPosition = 0): { nodes: Node<FlowNodeData>[]; edges: Edge[] } {
    const current = replay ? stageForEvent(replay) : phaseNode[value.phase] || "plan";
    const previousReplay = replay && replayPosition > 0 ? stageForEvent(milestones[replayPosition - 1]) : "";
    const visited = new Set(replay ? milestones.slice(0, replayPosition + 1).map(stageForEvent) : []);
    const redirectActive = !replay && value.externalInputs?.some((input) => ["queued", "drafting", "drafted"].includes(input.status));
    const positions = positionsForWorkflow();
    const nodes: Node<FlowNodeData>[] = workflow.map((item) => {
      const active = item.id === current || (item.id === "redirect" && redirectActive);
      const replayVisited = Boolean(replay && visited.has(item.id) && !active);
      const width = compact ? 135 : item.role === "gate" ? 235 : item.role === "escape" ? 205 : 215;
      return {
        id: item.id, type: "default", position: positions[item.id],
        class: `campaign-flow-node stage-${item.id} role-${item.role} ${active ? "current" : ""} ${replayVisited ? "visited" : ""}`,
        style: `width: ${width}px; min-height: ${item.role === "gate" ? 92 : 82}px`,
        data: nodeData(item.title, `${item.order} · ${item.kicker}`, item.detail,
          replay && active ? `REPLAY ${replayPosition + 1}/${milestones.length}` : item.id === current ? value.phase : active ? "INPUT OPEN" : replayVisited ? "visited" : item.role === "escape" ? "optional" : "workflow",
          replay && active ? { payload: replay.payload } : {}),
      };
    });
    const edges: Edge[] = links.map(([source, target, role], index) => {
      const active = replay ? source === previousReplay && target === current : source === current;
      const color = active ? "#71d6a0" : role === "escape" ? "#8b7750" : "#607568";
      return { id: `workflow-${index}`, source, target, type: role === "escape" ? "smoothstep" : "bezier", animated: active,
        markerEnd: { type: MarkerType.ArrowClosed, color }, style: `stroke: ${color}; stroke-width: ${active ? 2.4 : role === "escape" ? 1 : 1.3}; ${role === "escape" ? "stroke-dasharray: 5 4" : ""}` };
    });
    return { nodes, edges };
  }

  function projectHistory(value: CampaignProject): CampaignEvent[] {
    return historyProjectId === value.id && historyEvents.length ? historyEvents : Array.isArray(value.workflowHistory) ? value.workflowHistory : [];
  }

  function availableHistoryTotal(value: CampaignProject): number {
    return historyProjectId === value.id ? historyTotal : Number(value.workflowHistorySummary?.total || projectHistory(value).length);
  }

  async function loadHistory(value: CampaignProject, older = false): Promise<void> {
    if (historyLoading || (older && !historyCursor)) return;
    const ownRequest = ++historyRequest;
    const replayEventId = older ? projectHistory(value).filter(isMilestone)[replayIndex]?.id || "" : "";
    if (!older || historyProjectId !== value.id) {
      historyProjectId = value.id;
      historyEvents = [];
      historyCursor = null;
      historyTotal = Number(value.workflowHistorySummary?.total || 0);
    }
    historyLoading = true;
    historyError = "";
    try {
      const url = new URL("/api/workflow-history", location.origin);
      url.searchParams.set("project", value.id);
      url.searchParams.set("limit", "250");
      if (older && historyCursor) url.searchParams.set("cursor", historyCursor);
      const response = await fetch(`${url.pathname}${url.search}`, { cache: "no-store" });
      const page = await response.json() as HistoryPage & { error?: string };
      if (!response.ok) throw new Error(page.error || `Could not load campaign history: ${response.status}`);
      if (ownRequest !== historyRequest || project?.id !== value.id) return;
      const combined = older ? [...page.items, ...historyEvents] : page.items;
      historyEvents = [...new Map(combined.map((event) => [event.id, event])).values()];
      historyTotal = page.total;
      historyCursor = page.nextCursor;
      const nextMilestones = historyEvents.filter(isMilestone);
      if (older && replayEventId) replayIndex = Math.max(0, nextMilestones.findIndex((event) => event.id === replayEventId));
      else if (!older) replayIndex = Math.max(0, nextMilestones.length - 1);
    } catch (error) {
      if (ownRequest === historyRequest) historyError = error instanceof Error ? error.message : String(error);
    } finally {
      if (ownRequest === historyRequest) historyLoading = false;
    }
  }

  async function loadProgramHistory(value: CampaignProject): Promise<void> {
    const ownRequest = ++programHistoryRequest;
    programHistoryProjectId = value.id;
    programHistory = null;
    programHistoryLoading = true;
    programHistoryError = "";
    try {
      const url = new URL("/api/program-history", location.origin);
      url.searchParams.set("project", value.id);
      const response = await fetch(`${url.pathname}${url.search}`, { cache: "no-store" });
      const result = await response.json() as ProgramHistory & { error?: string };
      if (!response.ok) throw new Error(result.error || `Could not load program history: ${response.status}`);
      if (ownRequest !== programHistoryRequest || project?.id !== value.id) return;
      programHistory = result;
    } catch (error) {
      if (ownRequest === programHistoryRequest) programHistoryError = error instanceof Error ? error.message : String(error);
    } finally {
      if (ownRequest === programHistoryRequest) programHistoryLoading = false;
    }
  }

  function boundaryChanges(epoch: ProgramEpoch): Array<{ group: string; item: HistoryDelta }> {
    return [
      ...epoch.boundary.metrics.map((item) => ({ group: "metric", item })),
      ...epoch.boundary.cost.map((item) => ({ group: "cost", item })),
      ...epoch.boundary.drift.map((item) => ({ group: "drift", item })),
    ].filter(({ item }) => item.changed);
  }

  function displayValue(value: unknown): string {
    if (value === null || value === undefined) return "—";
    return typeof value === "string" ? value : JSON.stringify(value);
  }

  function filteredHistory(value: CampaignProject): CampaignEvent[] {
    const history = projectHistory(value).filter(isMilestone);
    return historyFilter === "all" ? history : history.filter((event) => categoryForEvent(event) === historyFilter);
  }

  function historyGraph(value: CampaignProject): { nodes: Node<FlowNodeData>[]; edges: Edge[] } {
    const history = projectHistory(value);
    const filtered = filteredHistory(value);
    const majors = filtered.slice(-(compact ? 12 : 20));
    const columns = compact ? 2 : 4;
    const spacingX = compact ? 155 : 220;
    const spacingY = compact ? 125 : 135;
    const nodes: Node<FlowNodeData>[] = majors.map((event, index) => {
      const row = Math.floor(index / columns);
      const columnInRow = index % columns;
      const column = row % 2 ? columns - 1 - columnInRow : columnInRow;
      const category = categoryForEvent(event);
      const substeps = history.filter((candidate) => candidate.aggregateId === event.aggregateId && candidate.id !== event.id);
      return { id: event.id, type: "default", position: { x: column * spacingX, y: row * spacingY },
        class: `campaign-flow-node history-node history-${category} ${index === majors.length - 1 ? "current" : ""}`,
        style: `width: ${compact ? 135 : 185}px; min-height: 82px`,
        data: nodeData(labelForEvent(event.type), `${new Date(event.createdAt).toLocaleString()} · ${event.aggregateType}`, event.aggregateId, index === majors.length - 1 ? "LATEST" : category, { payload: event.payload, substeps }) };
    });
    const edges: Edge[] = nodes.slice(1).map((node, index) => ({ id: `history-${index}`, source: nodes[index].id, target: node.id, type: "smoothstep", markerEnd: { type: MarkerType.ArrowClosed, color: "#5d7064" }, style: "stroke: #5d7064; stroke-width: 1.1" }));
    return { nodes, edges };
  }

  function eventInspection(event: CampaignEvent | null, index: number): Node<FlowNodeData> | null {
    if (!event) return null;
    return { id: event.id, position: { x: 0, y: 0 }, data: nodeData(labelForEvent(event.type), `REPLAY ${index + 1}/${milestones.length} · ${new Date(event.createdAt).toLocaleString()}`, event.aggregateId, stageForEvent(event), { payload: event.payload }) };
  }

  function stopReplay(): void { replayPlaying = false; if (replayTimer) clearInterval(replayTimer); replayTimer = null; }
  function setReplayIndex(index: number): void { replayIndex = Math.max(0, Math.min(index, Math.max(0, milestones.length - 1))); selected = null; }
  function toggleReplay(): void {
    if (replayPlaying) return stopReplay();
    if (replayIndex >= milestones.length - 1) setReplayIndex(0);
    replayPlaying = true;
    replayTimer = setInterval(() => { if (replayIndex >= milestones.length - 1) stopReplay(); else setReplayIndex(replayIndex + 1); }, 900);
  }
  function changeMode(next: MapMode): void {
    stopReplay();
    mode = next;
    selected = null;
    if (next === "replay" && milestones.length) replayIndex = milestones.length - 1;
    if (next !== "workflow" && project) void loadHistory(project);
    if (next === "history" && project && (programHistoryProjectId !== project.id || !programHistory)) void loadProgramHistory(project);
  }
  function changeHistoryFilter(next: HistoryFilter): void { historyFilter = next; selected = null; }
  onDestroy(stopReplay);

  $: project = ($campaignState.control?.projects?.find((candidate) => candidate.id === $campaignState.selectedProject) as CampaignProject | undefined) || null;
  $: compact = viewportWidth <= 700;
  $: historyRevision = `${historyProjectId}:${historyEvents.length}:${historyCursor || ""}:${historyFilter}:${compact}`;
  $: milestones = project
    ? (historyProjectId === project.id && historyEvents.length
      ? historyEvents
      : Array.isArray(project.workflowHistory) ? project.workflowHistory : []).filter(isMilestone)
    : [];
  $: if (project && project.id !== replayProjectId) { replayProjectId = project.id; replayIndex = Math.max(0, milestones.length - 1); }
  $: if (project && mode === "history" && programHistoryProjectId !== project.id && !programHistoryLoading) void loadProgramHistory(project);
  $: if (replayIndex >= milestones.length && milestones.length) replayIndex = milestones.length - 1;
  $: replayEvent = milestones[replayIndex] || null;
  $: {
    historyRevision;
    graph = project ? mode === "history" ? historyGraph(project) : workflowGraph(project, mode === "replay" ? replayEvent : null, replayIndex) : { nodes: [], edges: [] };
  }
  $: inspection = selected || (mode === "replay" ? eventInspection(replayEvent, replayIndex) : null);
  $: waveAggregate = project?.wave?.aggregate || null;
  $: currentJourney = project ? journeyStage(project) : "intake";
  $: currentJourneyIndex = Math.max(0, journey.findIndex((item) => item.id === currentJourney));
  $: queuePacketCount = project?.context?.sources?.filter((source) => source.role === "queue-plan").length || 0;
</script>

<svelte:window bind:innerWidth={viewportWidth} />

{#if project}
  <section class="campaign-map mode-{mode}">
    <div class="campaign-map-heading">
      <div><p>CAMPAIGN LINE</p><h2>One main route, with deliberate research branches</h2><span>{mode === "workflow" ? "Packet → checked plan → bounded wave → evidence → decision. Side lines feed the route without bypassing its gates." : mode === "replay" ? `Read-only playback of ${milestones.length} loaded milestone${milestones.length === 1 ? "" : "s"} from ${availableHistoryTotal(project)} durable events.` : `${filteredHistory(project).length} matching loaded milestones; ${availableHistoryTotal(project)} durable events are available.`}</span></div>
      <div class="campaign-map-tabs">
        <button class:active={mode === "workflow"} onclick={() => changeMode("workflow")}>Workflow</button>
        <button class:active={mode === "replay"} onclick={() => changeMode("replay")}>Replay</button>
        <button class:active={mode === "history"} onclick={() => changeMode("history")}>History</button>
      </div>
    </div>

    {#if mode !== "workflow" && (historyLoading || historyError || historyCursor)}
      <div class="history-load-status" aria-live="polite">
        <span>{historyLoading ? "Loading durable history…" : historyError || `${projectHistory(project).length} of ${availableHistoryTotal(project)} events loaded`}</span>
        {#if historyCursor && !historyLoading}<button class="outline-button compact" onclick={() => loadHistory(project, true)}>Load older history</button>{/if}
        {#if historyError && !historyLoading}<button class="outline-button compact" onclick={() => loadHistory(project)}>Retry</button>{/if}
      </div>
    {/if}

    {#if waveAggregate}
      <div class="wave-aggregate-strip" aria-label="Current multi-lane wave aggregate">
        <span><b>WAVE AGGREGATE</b><strong>{waveAggregate.state.replaceAll("_", " ")}</strong></span>
        <span><b>FIXED MEMBERS</b><strong>{waveAggregate.membership.count}</strong></span>
        <span><b>ACCOUNTED</b><strong>{waveAggregate.accounting.accounted}/{waveAggregate.accounting.total}</strong></span>
        <span><b>ACTIVE</b><strong>{waveAggregate.parallelism.active}</strong></span>
        <i>PROJECTION ONLY</i>
      </div>
    {/if}

    {#if waveAggregate?.repairPlan?.items?.length}
      <details class="wave-repair-plan" aria-label="Historical wave projection diagnosis">
        <summary>
          <span><b>ACCOUNTING GAP</b><strong>{waveAggregate.repairPlan.items.length} historical member{waveAggregate.repairPlan.items.length === 1 ? "" : "s"} need evidence</strong></span>
          <i>{waveAggregate.repairPlan.status.replaceAll("_", " ")}</i>
        </summary>
        <div class="wave-repair-body">
          <p>{waveAggregate.repairPlan.summary}</p>
          {#each waveAggregate.repairPlan.items as item (item.laneId)}
            <article>
              <div><b>{item.laneId}</b><span>{item.recordedAccountingState || "unrecorded"} → {item.proposedAccountingState || "no safe update"}</span></div>
              <strong>{item.recommendation.replaceAll("_", " ")}</strong>
              <p>{item.note}</p>
              <small>Observer: {item.observed.present ? `${item.observed.lifecycle} · ${item.observed.daemon} · ${item.observed.landing}` : "no current record"}{item.observed.updatedAt ? ` · ${new Date(item.observed.updatedAt).toLocaleString()}` : ""}</small>
            </article>
          {/each}
          <footer><b>NO WRITE AUTHORITY</b><span>This diagnosis cannot sync state, reconcile custody, revive a worker, dispatch a lane, or change campaign phase.</span></footer>
        </div>
      </details>
    {/if}

    {#if mode === "replay"}
      <div class="replay-toolbar" aria-label="Campaign replay controls">
        <div class="replay-buttons">
          <button onclick={() => setReplayIndex(0)} disabled={!milestones.length || replayIndex === 0} aria-label="First milestone">↤</button>
          <button onclick={() => setReplayIndex(replayIndex - 1)} disabled={!milestones.length || replayIndex === 0} aria-label="Previous milestone">←</button>
          <button class="replay-play" onclick={toggleReplay} disabled={milestones.length < 2}>{replayPlaying ? "Pause" : "Play"}</button>
          <button onclick={() => setReplayIndex(replayIndex + 1)} disabled={!milestones.length || replayIndex >= milestones.length - 1} aria-label="Next milestone">→</button>
          <button onclick={() => setReplayIndex(milestones.length - 1)} disabled={!milestones.length || replayIndex >= milestones.length - 1} aria-label="Latest milestone">↦</button>
        </div>
        <label class="replay-scrubber"><span>{milestones.length ? replayIndex + 1 : 0} / {milestones.length}</span><input type="range" min="0" max={Math.max(0, milestones.length - 1)} value={replayIndex} oninput={(event) => setReplayIndex(Number(event.currentTarget.value))} aria-label="Replay position" /></label>
        <div class="replay-now"><strong>{replayEvent ? labelForEvent(replayEvent.type) : "No recorded milestones"}</strong><span>{replayEvent ? new Date(replayEvent.createdAt).toLocaleString() : ""}</span></div>
      </div>
    {:else if mode === "history"}
      <div class="history-filters" aria-label="History filters">{#each historyFilters as filter}<button class:active={historyFilter === filter.id} onclick={() => changeHistoryFilter(filter.id)}>{filter.label}</button>{/each}</div>
    {/if}

    {#if mode === "history"}
      <section class="program-history" aria-label="Program history hierarchy">
        <header>
          <div><span>PROGRAM HISTORY · READ ONLY</span><strong>Epoch → wave → lane and custody</strong></div>
          {#if programHistory}<p>{programHistory.counts.epochs} epochs · {programHistory.counts.waves} waves · {programHistory.counts.lanes} lanes · {programHistory.counts.custody} custody</p>{/if}
        </header>
        {#if programHistoryLoading}
          <p class="program-history-message">Building the durable hierarchy…</p>
        {:else if programHistoryError}
          <div class="program-history-message error"><span>{programHistoryError}</span><button class="outline-button compact" onclick={() => loadProgramHistory(project)}>Retry</button></div>
        {:else if !programHistory?.epochs.length}
          <p class="program-history-message">No strategy epochs have been recorded for this project.</p>
        {:else}
          <div class="program-epochs">
            {#each programHistory.epochs as epoch, epochIndex (epoch.id)}
              <details class="program-epoch" open={epochIndex === programHistory.epochs.length - 1}>
                <summary>
                  <span><small>EPOCH {epochIndex + 1} · CHARTER R{epoch.charterRevision}</small><strong>{epoch.label}</strong></span>
                  <span><b>{epoch.status.replaceAll("_", " ")}</b><small>{new Date(epoch.startedAt).toLocaleDateString()} → {epoch.completedAt ? new Date(epoch.completedAt).toLocaleDateString() : "active"}</small></span>
                </summary>
                <div class="program-epoch-body">
                  <section class="epoch-boundary" aria-label={`Boundary comparison for ${epoch.label}`}>
                    <header><span><small>START / END COMPARISON</small><strong>{epoch.boundary.complete ? "Completed epoch boundary" : "Current boundary projection"}</strong></span><b>{boundaryChanges(epoch).length} changed</b></header>
                    {#if !epoch.boundary.startSnapshot}
                      <p>No baseline snapshot is available for this historical epoch.</p>
                    {:else if !boundaryChanges(epoch).length}
                      <p>{epoch.boundary.complete ? "The recorded boundary values are unchanged." : "Only the current baseline is available; no completed end boundary has been recorded."}</p>
                    {:else}
                      <div class="boundary-table" role="table" aria-label="Changed boundary values">
                        <div class="boundary-row heading" role="row"><span>GROUP / FIELD</span><span>START</span><span>END</span></div>
                        {#each boundaryChanges(epoch) as change (`${change.group}:${change.item.key}`)}
                          <div class="boundary-row" role="row"><span><small>{change.group}</small><strong>{change.item.key}</strong></span><code>{displayValue(change.item.start)}</code><code>{displayValue(change.item.end)}</code></div>
                        {/each}
                      </div>
                    {/if}
                  </section>
                  <div class="program-waves">
                    {#each epoch.waves as wave (wave.id)}
                      <details class="program-wave">
                        <summary><span><small>WAVE · {wave.assignment.basis.replaceAll("-", " ")}</small><strong>{wave.label || wave.id}</strong></span><span><b>{wave.phase.replaceAll("_", " ")}</b><small>{wave.lanes.length} lanes · {wave.custody.length} custody</small></span></summary>
                        <div class="program-wave-body">
                          {#if wave.lanes.length}
                            <ol class="program-lanes" aria-label={`Research lanes in ${wave.label || wave.id}`}>
                              {#each wave.lanes as lane (lane.id)}<li><span><small>{lane.profile || "research"}</small><strong>{lane.taskId || lane.id}</strong></span><span><b>{lane.status.replaceAll("_", " ")}</b><small>{lane.tokens === null ? "unmeasured" : `${lane.tokens.toLocaleString()} tokens`}</small></span></li>{/each}
                            </ol>
                          {:else}<p>No durable research runs are attached to this wave.</p>{/if}
                          {#if wave.custody.length}
                            <ol class="program-custody" aria-label={`Custody work in ${wave.label || wave.id}`}>
                              {#each wave.custody as item (item.id)}<li><span><small>{item.sourceType}</small><strong>{item.task}</strong></span><span><b>{item.status.replaceAll("_", " ")}</b><small>{item.leases.length} lease{item.leases.length === 1 ? "" : "s"}</small></span></li>{/each}
                            </ol>
                          {/if}
                        </div>
                      </details>
                    {/each}
                    {#if !epoch.waves.length}<p class="program-history-message">No waves are assigned to this epoch.</p>{/if}
                  </div>
                </div>
              </details>
            {/each}
          </div>
          <footer>{programHistory.ownershipPolicy}</footer>
        {/if}
      </section>
    {/if}

    {#if mode === "workflow"}
      <div class="campaign-map-layout journey-layout">
        <div class="journey-board" aria-label="Linear branching campaign workflow">
          <div class="journey-line" style={`--current-stage:${currentJourneyIndex}`}>
            {#each journey as item, index (item.id)}
              <button class="journey-stop" class:current={item.id === currentJourney} class:visited={index < currentJourneyIndex} onclick={() => inspectJourney(item, item.id === currentJourney ? project.phase : item.id === "intake" ? `${queuePacketCount} staged` : "gated")}>
                <span>{item.order} · {item.kicker}</span><strong>{item.title}</strong><small>{item.id === currentJourney ? project.phase.replaceAll("_", " ") : item.id === "intake" ? `${queuePacketCount} packet${queuePacketCount === 1 ? "" : "s"} staged` : "explicit gate"}</small>
              </button>
              {#if index < journey.length - 1}<i class="journey-link" class:active={index === currentJourneyIndex} aria-hidden="true"></i>{/if}
            {/each}
          </div>
          <div class="journey-branches" aria-label="Supporting research branches">
            {#each journeyBranches as branch (branch.id)}
              <button class="journey-branch branch-{branch.id}" style={`--branch-column:${branch.column}`} onclick={() => inspectJourney(branch, branch.id === "redirect" && project.externalInputs?.some((input) => ["queued", "drafting", "drafted"].includes(input.status)) ? "input open" : "optional branch")}>
                <span>{branch.kicker}</span><strong>{branch.title}</strong><small>{branch.detail}</small>
              </button>
            {/each}
          </div>
          <footer><b>{project.controlState?.recovery?.required ? "CONTROL HOLD" : "GATES ENFORCED"}</b><span>{project.controlState?.recovery?.required ? "New packets can be received and hashed, but the main line cannot advance until the historical boundary is reviewed." : "Branches rejoin the main line through normal planning, custody, and decision gates."}</span></footer>
        </div>
        {#if inspection}
          <aside class="flow-inspector">
            <div class="flow-inspector-heading"><div><span>{inspection.data.kicker}</span><strong>{inspection.data.title}</strong></div><button onclick={() => selected = null} aria-label="Close step details">×</button></div>
            <p>{inspection.data.detail}</p>
            <details open><summary>Authority boundary</summary><p>Moving through this stop requires the durable gate shown on the line. Observed files or worker activity cannot advance it.</p></details>
          </aside>
        {:else}
          <div class="flow-inspector empty">Select a stop or branch to inspect what enters it and which gate controls the next move.</div>
        {/if}
      </div>
    {:else}
      <div class="campaign-map-layout">
        <div class="campaign-flow-canvas">
          {#key `${mode}-${historyFilter}-${compact}-${project.id}`}
            <SvelteFlow nodes={graph.nodes} edges={graph.edges} fitView fitViewOptions={{ padding: compact ? 0.06 : 0.14, maxZoom: compact ? 0.74 : 0.88 }} minZoom={0.2} maxZoom={1.8} nodesDraggable={false} nodesConnectable={false} elementsSelectable={true} colorMode="dark" onnodeclick={({ node }) => selected = node as Node<FlowNodeData>}>
              <Background patternColor="#385043" gap={22} size={1} variant={BackgroundVariant.Dots} />
              <Controls showLock={false} />
              <MiniMap pannable={true} zoomable={true} nodeColor={(node) => String(node.class).includes("current") ? "#71d6a0" : String(node.class).includes("role-escape") ? "#9b8150" : "#52685a"} maskColor="rgba(8, 15, 11, .72)" />
            </SvelteFlow>
          {/key}
        </div>
        {#if inspection}
          <aside class="flow-inspector">
            <div class="flow-inspector-heading"><div><span>{inspection.data.kicker}</span><strong>{inspection.data.title}</strong></div>{#if selected}<button onclick={() => selected = null} aria-label="Close step details">×</button>{/if}</div>
            <p>{inspection.data.detail}</p>
            {#if inspection.data.payload}<details open><summary>Recorded payload</summary><pre>{JSON.stringify(inspection.data.payload, null, 2)}</pre></details>{/if}
            {#if inspection.data.substeps?.length}<details><summary>Related substeps <strong>{inspection.data.substeps.length}</strong></summary><ol>{#each inspection.data.substeps as step (step.id)}<li><span>{new Date(step.createdAt).toLocaleTimeString()}</span><strong>{labelForEvent(step.type)}</strong></li>{/each}</ol></details>{/if}
          </aside>
        {:else}
          <div class="flow-inspector empty">Select a recorded milestone to inspect its durable payload and related substeps.</div>
        {/if}
      </div>
    {/if}
  </section>
{/if}
