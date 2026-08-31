<script lang="ts">
  import { campaignState } from "./campaign-state";

  type StrategyTrack = {
    id: string;
    label: string;
    shortLabel?: string;
    purpose: string;
    color: string;
    targetShare: number;
    actualShare: number;
    runs: number;
    knownTokens: number;
    maintenanceRuns: number;
  };
  type DriftSignal = { id: string; severity: string; label: string; detail: string; evidence: string; action: string };
  type Strategy = {
    mode: string;
    charter: Record<string, any>;
    epoch: Record<string, any>;
    layers: Array<Record<string, any>>;
    tracks: StrategyTrack[];
    progress: Record<string, any>;
    cost: Record<string, any>;
    drift: { status: string; signals: DriftSignal[] };
    recentSnapshots: Array<Record<string, any>>;
  };

  let project: Record<string, any> | null = null;
  let strategy: Strategy | null = null;
  let topSignal: DriftSignal | null = null;

  function percent(value: unknown): string { return `${Math.round(Number(value || 0) * 100)}%`; }
  function compactNumber(value: unknown): string {
    const number = Number(value || 0);
    if (number >= 1_000_000) return `${(number / 1_000_000).toFixed(1)}m`;
    if (number >= 1_000) return `${Math.round(number / 1_000)}k`;
    return number.toLocaleString();
  }
  function frontierAge(value: unknown): string {
    const time = Date.parse(String(value || ""));
    if (!Number.isFinite(time)) return "not tracked";
    const hours = Math.max(0, (Date.now() - time) / 3_600_000);
    if (hours < 2) return "just updated";
    if (hours < 48) return `${Math.round(hours)}h old`;
    return `${Math.round(hours / 24)}d old`;
  }

  $: project = ($campaignState.control?.projects?.find((candidate) => candidate.id === $campaignState.selectedProject) as Record<string, any> | undefined) || null;
  $: strategy = (project?.strategy as Strategy | undefined) || null;
  $: topSignal = strategy?.drift?.signals?.[0] || null;
</script>

{#if strategy}
  <section id="campaign-strategy" class="strategy-overview status-{strategy.drift.status}" aria-label="Campaign strategy and drift" aria-live="polite">
    <div class="strategy-heading">
      <div>
        <p>CAMPAIGN STRATEGY · {strategy.epoch.label}</p>
        <h2>{topSignal?.label || "The portfolio is moving within its charter"}</h2>
        <span>{topSignal?.detail || strategy.charter.thesis}</span>
      </div>
      <div class="strategy-status"><strong>{strategy.drift.status === "attention" ? "RECENTER" : strategy.drift.status === "watch" ? "WATCH" : "ON TRACK"}</strong><span>shadow mode · advisory</span></div>
    </div>

    <div class="strategy-vitals">
      <div><span>Frontier motion</span><strong>{strategy.progress.advancedDeltaCount || 0}</strong><small>recorded advances</small></div>
      <div><span>Measured spend</span><strong>{compactNumber(strategy.cost.knownTokens)}</strong><small>known tokens · {strategy.cost.unreportedRuns} unreported</small></div>
      <div class:over={Number(strategy.cost.maintenanceShare) > Number(strategy.charter.maintenancePolicy?.rollingShareLimit || .15)}><span>Support share</span><strong>{percent(strategy.cost.maintenanceShare)}</strong><small>charter ceiling {percent(strategy.charter.maintenancePolicy?.rollingShareLimit || .15)}</small></div>
      <div><span>Frontier ledger</span><strong>{frontierAge(strategy.progress.frontierUpdatedAt)}</strong><small>{strategy.progress.frontierPath ? "durable source detected" : "source missing"}</small></div>
    </div>

    <div class="strategy-tracks" aria-label="Strategic track allocation">
      {#each strategy.tracks as track (track.id)}
        <article style={`--track:${track.color}`}>
          <div><strong>{track.label}</strong><span>{percent(track.actualShare)} actual / {percent(track.targetShare)} target</span></div>
          <div class="track-meter"><i style={`width:${Math.min(100, Number(track.actualShare || 0) * 100)}%`}></i><b style={`left:${Math.min(100, Number(track.targetShare || 0) * 100)}%`}></b></div>
          <small>{track.runs} runs · {compactNumber(track.knownTokens)} tokens{track.maintenanceRuns ? ` · ${track.maintenanceRuns} support` : ""}</small>
        </article>
      {/each}
    </div>

    <details class="strategy-details">
      <summary><span>Inspect timescales, drift evidence, and custody separation</span><strong>{strategy.drift.signals.length} signal{strategy.drift.signals.length === 1 ? "" : "s"}</strong></summary>
      <div class="strategy-detail-grid">
        <section>
          <h3>Nested control loops</h3>
          <ol class="strategy-layers">
            {#each strategy.layers as layer, index (layer.id)}
              <li class:planned={layer.status === "planned" || layer.status === "shadow"}><span>{index + 1}</span><div><strong>{layer.label}</strong><small>{layer.cadence} · {layer.owner}{layer.status ? ` · ${layer.status}` : ""}</small><p>{layer.purpose}</p></div></li>
            {/each}
          </ol>
        </section>
        <section>
          <h3>Drift evidence</h3>
          {#if strategy.drift.signals.length}
            <div class="drift-list">
              {#each strategy.drift.signals as signal (signal.id)}
                <article class="severity-{signal.severity}"><strong>{signal.label}</strong><p>{signal.evidence}</p><small>{signal.action}</small></article>
              {/each}
            </div>
          {:else}
            <p class="strategy-empty">No active drift signal crosses the charter’s advisory thresholds.</p>
          {/if}
        </section>
      </div>
      <p class="strategy-shadow-note"><strong>Shadow mode:</strong> these measurements are supplied to Sol synthesis and lane planning, but they do not yet approve, reject, or dispatch work.</p>
    </details>
  </section>
{/if}
