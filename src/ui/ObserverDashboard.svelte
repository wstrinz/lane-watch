<script lang="ts">
  import { onMount, tick } from "svelte";
  import type { LaneSnapshot } from "../types";
  import { campaignState, selectProject } from "./campaign-state";
  import { settleCampaignAction } from "./campaign-actions";
  import { alertState, toggleAlerts } from "./pwa";

  type Filter = "active" | "running" | "attention" | "recent" | "all";
  let activeFilter: Filter = "active";
  let query = "";
  let openLaneId = typeof location === "undefined" ? "" : new URL(location.href).searchParams.get("lane") || "";
  let dialog: HTMLDialogElement;
  let laneDetail: LaneSnapshot | null = null;
  let laneDetailError = "";
  let reconciling = false;
  let reconcileFeedback = "";
  let projectControl: Record<string, any> | null = null;

  const priority: Record<string, number> = { working: 0, idle: 1, attention: 2, unknown: 3, complete: 4 };

  function relativeTime(value = ""): string {
    const delta = Date.now() - new Date(value).valueOf();
    if (!Number.isFinite(delta)) return value || "unknown";
    const absolute = Math.abs(delta);
    const [suffix, divisor] = absolute < 60_000 ? ["s", 1_000] : absolute < 3_600_000 ? ["m", 60_000] : absolute < 86_400_000 ? ["h", 3_600_000] : ["d", 86_400_000];
    const amount = Math.max(1, Math.round(absolute / divisor));
    return delta < 0 ? `in ${amount}${suffix}` : `${amount}${suffix} ago`;
  }

  function formatNumber(value: number | null | undefined): string {
    if (value == null) return "—";
    if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}m`;
    if (value >= 1_000) return `${Math.round(value / 1_000)}k`;
    return String(value);
  }

  function ownershipFor(lane: LaneSnapshot): { origin: string; controlled: boolean; reason: string; label: string } {
    const item = (projectControl?.laneOwnership || []).find((candidate: any) => candidate.laneId === lane.id);
    if (item) return {
      ...item,
      label: item.origin === "controller-run" ? "controller run" : item.origin === "adopted-wave" ? "adopted wave" : "observed elsewhere",
    };
    return lane.lifecycle === "active"
      ? { origin: "observed-elsewhere", controlled: false, reason: "No current Lane Watch ownership record exists.", label: "observed elsewhere" }
      : { origin: "historical", controlled: false, reason: "This is a historical observer record.", label: "historical" };
  }

  function matches(lane: LaneSnapshot): boolean {
    if ($campaignState.selectedProject && lane.project !== $campaignState.selectedProject) return false;
    const haystack = `${lane.task} ${lane.lane} ${lane.project} ${lane.model} ${lane.detail} ${lane.topology?.profile || ""} ${lane.topology?.childModel || ""}`.toLowerCase();
    if (query.trim() && !haystack.includes(query.trim().toLowerCase())) return false;
    if (activeFilter === "all") return true;
    if (activeFilter === "running") return ["working", "idle"].includes(lane.severity);
    if (activeFilter === "attention") return ["attention", "unknown"].includes(lane.severity);
    if (activeFilter === "recent") return lane.severity === "complete" && Date.now() - new Date(lane.updatedAt || lane.completedAt).valueOf() < 86_400_000;
    const updated = new Date(lane.updatedAt || lane.launchedAt).valueOf();
    const currentWindow = Number.isFinite(updated) && Date.now() - updated < 12 * 3_600_000;
    return lane.severity !== "complete" && (lane.severity !== "unknown" || currentWindow);
  }

  async function showLane(id: string): Promise<void> {
    openLaneId = id;
    laneDetail = null;
    laneDetailError = "";
    reconcileFeedback = "";
    const url = new URL(location.href);
    url.searchParams.set("lane", id);
    history.replaceState(null, "", `${url.pathname}${url.search}`);
    await tick();
    if (dialog && !dialog.open) dialog.showModal();
    try {
      const response = await fetch(`/api/lane?id=${encodeURIComponent(id)}`, { cache: "no-store" });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || `Could not load lane detail: ${response.status}`);
      if (openLaneId === id) laneDetail = body as LaneSnapshot;
    } catch (error) {
      if (openLaneId === id) laneDetailError = error instanceof Error ? error.message : String(error);
    }
  }

  function closeLane(): void {
    openLaneId = "";
    laneDetail = null;
    laneDetailError = "";
    const url = new URL(location.href);
    url.searchParams.delete("lane");
    history.replaceState(null, "", `${url.pathname}${url.search}`);
  }

  async function reconcile(lane: LaneSnapshot): Promise<void> {
    if (reconciling) return;
    const ownership = ownershipFor(lane);
    if (!ownership.controlled) {
      reconcileFeedback = `Reconciliation unavailable: ${ownership.reason}`;
      return;
    }
    reconciling = true;
    reconcileFeedback = "Running mechanical reconciliation…";
    try {
      await settleCampaignAction({ projectId: lane.project, type: "lane.reconcile", targetId: lane.id, scope: "lane-dialog" });
      reconcileFeedback = "Reconciliation completed and the observer state was refreshed.";
      const response = await fetch(`/api/lane?id=${encodeURIComponent(lane.id)}`, { cache: "no-store" });
      if (response.ok) laneDetail = await response.json() as LaneSnapshot;
    } catch (error) {
      reconcileFeedback = error instanceof Error ? error.message : String(error);
    } finally {
      reconciling = false;
    }
  }

  $: snapshot = $campaignState.observer;
  $: projectControl = ($campaignState.control?.projects || []).find((candidate) => candidate.id === $campaignState.selectedProject) || null;
  $: scopedLanes = snapshot?.lanes.filter((lane) => !$campaignState.selectedProject || lane.project === $campaignState.selectedProject) || [];
  $: currentAttention = scopedLanes.filter((lane) => ["attention", "unknown"].includes(lane.severity) && Date.now() - new Date(lane.updatedAt || lane.launchedAt).valueOf() < 12 * 3_600_000).length;
  $: counts = {
    working: scopedLanes.filter((lane) => lane.severity === "working").length,
    idle: scopedLanes.filter((lane) => lane.severity === "idle").length,
    attention: currentAttention,
    complete: scopedLanes.filter((lane) => lane.severity === "complete").length,
  };
  $: projects = [...new Set([...(snapshot?.lanes.map((lane) => lane.project) || []), ...($campaignState.control?.projectIndex?.map((project) => String(project.id)) || []), ...($campaignState.control?.projects?.map((project) => String(project.id)) || [])])].sort();
  $: lanes = (snapshot?.lanes || []).filter(matches).sort((left, right) => (priority[left.severity] ?? 5) - (priority[right.severity] ?? 5) || new Date(right.updatedAt || right.launchedAt).valueOf() - new Date(left.updatedAt || left.launchedAt).valueOf());
  $: openLane = laneDetail?.id === openLaneId ? laneDetail : snapshot?.lanes.find((lane) => lane.id === openLaneId) || null;
  $: stale = snapshot ? Date.now() - new Date(snapshot.generatedAt).valueOf() >= 35_000 : false;
  $: alertLabel = ({ loading: "Checking alerts…", unsupported: "Alerts unsupported", disabled: "Enable alerts", enabled: "Alerts enabled", error: "Alert setup failed" } as Record<string, string>)[$alertState];

  onMount(() => {
    const openRequestedLane = (event: Event) => {
      const id = (event as CustomEvent<{ id?: string }>).detail?.id || "";
      if (id) void showLane(id);
    };
    window.addEventListener("lane-watch:open-lane", openRequestedLane);
    if (openLaneId) void showLane(openLaneId);
    return () => window.removeEventListener("lane-watch:open-lane", openRequestedLane);
  });
</script>

<section class="summary" aria-label="Lane summary">
  <button class="summary-card working" class:selected={activeFilter === "running"} onclick={() => activeFilter = "running"}><span class="summary-value">{counts.working}</span><span>working</span></button>
  <button class="summary-card idle" class:selected={activeFilter === "running"} onclick={() => activeFilter = "running"}><span class="summary-value">{counts.idle}</span><span>idle</span></button>
  <button class="summary-card attention" class:selected={activeFilter === "attention"} onclick={() => activeFilter = "attention"}><span class="summary-value">{counts.attention}</span><span>attention</span></button>
  <button class="summary-card complete" class:selected={activeFilter === "recent"} onclick={() => activeFilter = "recent"}><span class="summary-value">{counts.complete}</span><span>complete</span></button>
</section>

<section class="controls observer-controls" aria-label="Lane dashboard controls">
  <div class="filter-tabs" role="tablist" aria-label="Lane filters">
    {#each [["active", "Live"], ["running", "Running"], ["attention", "Attention"], ["recent", "Recent"], ["all", "All"]] as item}
      <button class="filter-tab" class:active={activeFilter === item[0]} onclick={() => activeFilter = item[0] as Filter}>{item[1]}</button>
    {/each}
  </div>
  <div class="control-row">
    <label class="search-box"><span class="sr-only">Search lanes</span><input type="search" placeholder="Search task, lane, project…" autocomplete="off" bind:value={query} /></label>
    <select aria-label="Filter by project" value={$campaignState.selectedProject} onchange={(event) => selectProject((event.currentTarget as HTMLSelectElement).value)}>
      <option value="">All projects</option>
      {#each projects as project}<option value={project}>{project}</option>{/each}
    </select>
    <button class="outline-button" class:enabled={$alertState === "enabled"} disabled={["loading", "unsupported"].includes($alertState)} onclick={toggleAlerts}>{alertLabel}</button>
  </div>
</section>

{#if stale}<p class="banner" role="status">Status snapshot is {relativeTime(snapshot?.generatedAt)}. The observer may be reconnecting.</p>{/if}

<section class="lane-grid" aria-live="polite">
  {#each lanes as lane (lane.id)}
    <button type="button" class="lane-card {lane.severity}" onclick={() => showLane(lane.id)} aria-label={`Open ${lane.task} details`}>
      <div class="card-top"><span class="lane-name">{lane.lane}</span><span class="status-pill">{lane.status}</span></div>
      <h3 class="task-title">{lane.task}</h3>
      <p class="detail">{lane.detail || lane.output || (lane.severity === "complete" ? "Coordinator completion recorded." : "No current detail reported.")}</p>
      {#if lane.inFlight + lane.queued}<div class="activity-line"><span class="pulse"></span><span>{lane.inFlight + lane.queued} active task{lane.inFlight + lane.queued === 1 ? "" : "s"}</span></div>{/if}
      <div class="meta-row">
        <span class="meta-chip">{lane.model}</span>
        {#if lane.topology?.profile}<span class="meta-chip">{lane.topology.profile}</span>{/if}
        <span class="meta-chip">{lane.project}</span><span class="meta-chip">{lane.host === "macbook" ? "Mac" : "Windows"}</span>
        <span class="meta-chip ownership-chip {ownershipFor(lane).origin}">{ownershipFor(lane).label}</span>
        {#if lane.tokens != null}<span class="meta-chip">{formatNumber(lane.tokens)} tok</span>{/if}
      </div>
      <div class="card-footer"><span>{lane.jobId || "no job"}</span><span>updated {relativeTime(lane.updatedAt)}</span></div>
    </button>
  {/each}
</section>
{#if snapshot && !lanes.length}<div class="empty-state"><p>No lanes match this view.</p></div>{/if}

<dialog class="lane-dialog" bind:this={dialog} onclose={closeLane}>
  {#if openLane}
    <div class="dialog-shell">
      <header class="dialog-header"><div><p class="eyebrow">{openLane.lane} · {openLane.project} · {openLane.host === "macbook" ? "Mac" : "Windows"}</p><h2>{openLane.task}</h2></div><button class="close-button" aria-label="Close lane details" onclick={() => dialog.close()}>×</button></header>
      <div class="dialog-body">
        {#if laneDetailError}<p class="banner" role="alert">{laneDetailError}</p>{/if}
        <section class="dialog-section"><h3>Snapshot</h3><div class="detail-grid">
          {#each [["Status", openLane.status], ["Model", `${openLane.model} / ${openLane.effort}`], ["Lifecycle", openLane.lifecycle], ["Daemon", `${openLane.daemon} / ${openLane.tempo}`], ["Tokens", formatNumber(openLane.tokens)], ["Landing", openLane.landing], ["Ownership", ownershipFor(openLane).label], ["Profile", openLane.topology?.profile || "legacy"], ["Updated", openLane.updatedAt ? new Date(openLane.updatedAt).toLocaleString() : "—"]] as fact}
            <div class="detail-cell"><span>{fact[0]}</span><strong>{fact[1]}</strong></div>
          {/each}
        </div></section>
        <section class="dialog-section"><h3>Current detail</h3><p>{openLane.detail || "No current detail reported."}</p></section>
        {#if openLane.activities.length}<section class="dialog-section"><h3>In-flight activity</h3>{#each openLane.activities as activity (activity.id)}<div class="command">{activity.kind === "subagent" ? `${activity.agentType || "unknown"} / ${activity.model || "unknown"}` : activity.kind} · {activity.label}</div>{/each}</section>{/if}
        {#if openLane.timeline.length}<section class="dialog-section"><h3>Recent timeline</h3>{#each openLane.timeline as entry}<div class="timeline-item"><time>{new Date(entry.at).toLocaleString()} · {entry.state}</time><p>{entry.detail || entry.text}</p></div>{/each}</section>{/if}
        {#if openLane.output}<section class="dialog-section"><h3>Result</h3><p>{openLane.output}</p></section>{/if}
        <section class="dialog-section"><h3>Source</h3><p>Job {openLane.jobId || "—"}<br />{openLane.branch || "No branch recorded"}<br />{openLane.worktree || "No worktree recorded"}</p></section>
        {#if openLane.lifecycle === "active" && ["done", "stopped", "failed", "error", "crashed", "cancelled", "canceled", "complete", "completed"].includes(openLane.daemon) && ownershipFor(openLane).controlled}
          <section class="dialog-section"><h3>Controls</h3><button class="primary-button" disabled={reconciling} onclick={() => reconcile(openLane)}>{reconciling ? "Reconciling…" : "Run mechanical reconciliation"}</button>{#if reconcileFeedback}<p class="dialog-feedback">{reconcileFeedback}</p>{/if}</section>
        {:else if openLane.lifecycle === "active" && !ownershipFor(openLane).controlled}
          <section class="dialog-section ownership-boundary"><h3>Observed elsewhere</h3><p>{ownershipFor(openLane).reason} Lane Watch will not enqueue reconciliation, synthesis, adoption, or dispatch for this worker.</p></section>
        {/if}
      </div>
    </div>
  {/if}
</dialog>
