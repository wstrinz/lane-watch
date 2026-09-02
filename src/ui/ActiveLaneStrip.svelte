<script lang="ts">
  import type { LaneSnapshot } from "../types";
  import { campaignState } from "./campaign-state";

  let detailById: Record<string, LaneSnapshot> = {};
  let loadingById: Record<string, boolean> = {};
  let errorById: Record<string, string> = {};

  function compact(value: unknown, limit = 180): string {
    const text = String(value || "").trim().replace(/\s+/g, " ");
    return text.length <= limit ? text : `${text.slice(0, limit).replace(/\s+\S*$/, "")}…`;
  }

  function relativeTime(value = ""): string {
    const delta = Date.now() - new Date(value).valueOf();
    if (!Number.isFinite(delta)) return "just now";
    const [suffix, divisor] = delta < 60_000 ? ["s", 1_000] : delta < 3_600_000 ? ["m", 60_000] : ["h", 3_600_000];
    return `${Math.max(1, Math.round(delta / divisor))}${suffix} ago`;
  }

  function formatTokens(value: number | null): string {
    if (value == null) return "unmeasured";
    if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}m tokens`;
    if (value >= 1_000) return `${Math.round(value / 1_000)}k tokens`;
    return `${value} tokens`;
  }

  async function loadDetail(id: string): Promise<void> {
    if (detailById[id] || loadingById[id]) return;
    loadingById = { ...loadingById, [id]: true };
    errorById = { ...errorById, [id]: "" };
    try {
      const response = await fetch(`/api/lane?id=${encodeURIComponent(id)}`, { cache: "no-store" });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || `Could not load lane detail: ${response.status}`);
      detailById = { ...detailById, [id]: body as LaneSnapshot };
    } catch (error) {
      errorById = { ...errorById, [id]: error instanceof Error ? error.message : String(error) };
    } finally {
      loadingById = { ...loadingById, [id]: false };
    }
  }

  function openInspector(id: string): void {
    const workspace = document.querySelector("#evidence-workspace") as HTMLDetailsElement | null;
    if (workspace) workspace.open = true;
    requestAnimationFrame(() => window.dispatchEvent(new CustomEvent("lane-watch:open-lane", { detail: { id } })));
  }

  $: lanes = ($campaignState.observer?.lanes || [])
    .filter((lane) => lane.project === $campaignState.selectedProject && lane.lifecycle === "active" && ["working", "idle"].includes(lane.severity))
    .sort((left, right) => new Date(right.updatedAt || right.launchedAt).valueOf() - new Date(left.updatedAt || left.launchedAt).valueOf());
</script>

{#if lanes.length}
  <section class="active-lane-strip" aria-label="Currently running campaign lanes">
    <header>
      <span><i aria-hidden="true"></i><small>LIVE WAVE</small><strong>{lanes.length} lane{lanes.length === 1 ? "" : "s"} running</strong></span>
      <b>Expand a lane to inspect</b>
    </header>
    <div class="active-lane-list">
      {#each lanes as lane (lane.id)}
        {@const detail = detailById[lane.id] || lane}
        <details class="active-lane-mini" ontoggle={(event) => (event.currentTarget as HTMLDetailsElement).open && loadDetail(lane.id)}>
          <summary>
            <span class="active-lane-state"><i aria-hidden="true"></i><b>{lane.status || lane.severity}</b></span>
            <span class="active-lane-title"><strong>{lane.task}</strong><small>{lane.lane} · {lane.model || "worker"}</small></span>
            <span class="active-lane-glance"><b>{lane.inFlight + lane.queued ? `${lane.inFlight + lane.queued} active` : lane.tempo || "observing"}</b><small>{relativeTime(lane.updatedAt || lane.launchedAt)}</small></span>
          </summary>
          <div class="active-lane-detail">
            <p>{compact(detailById[lane.id]?.detail || lane.detail || "The worker has not reported a current activity note yet.", 320)}</p>
            {#if loadingById[lane.id]}<small class="active-lane-loading">Loading live detail…</small>{/if}
            {#if errorById[lane.id]}<small class="active-lane-error">{errorById[lane.id]}</small>{/if}
            <div class="active-lane-facts">
              <span><small>PROFILE</small><strong>{detail.topology?.profile || detail.effort || "bounded worker"}</strong></span>
              <span><small>USAGE</small><strong>{formatTokens(detail.tokens)}</strong></span>
              <span><small>JOB</small><strong>{detail.jobId || "pending"}</strong></span>
            </div>
            {#if detail.activities?.length}
              <ul>{#each detail.activities.slice(0, 3) as activity (activity.id)}<li><b>{activity.kind}</b><span>{compact(activity.label, 140)}</span></li>{/each}</ul>
            {/if}
            <button class="outline-button compact" type="button" onclick={() => openInspector(lane.id)}>Open full lane inspector</button>
          </div>
        </details>
      {/each}
    </div>
  </section>
{/if}
