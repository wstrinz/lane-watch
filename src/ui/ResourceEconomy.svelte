<script lang="ts">
  import { campaignState } from "./campaign-state";
  import { settleCampaignAction, type CampaignProject as Project } from "./campaign-actions";

  let project: Project | null = null;
  let resources: Record<string, any> | null = null;
  let expanded = false;
  let working = false;
  let feedback = "";
  let feedbackKind: "pending" | "success" | "error" = "pending";

  function compact(value: unknown): string {
    const number = Number(value || 0);
    if (number >= 1_000_000) return `${(number / 1_000_000).toFixed(number % 1_000_000 ? 1 : 0)}m`;
    if (number >= 1_000) return `${Math.round(number / 1_000)}k`;
    return number.toLocaleString();
  }

  function percent(value: unknown): string { return `${Math.round(Number(value || 0) * 100)}%`; }

  async function freezeSimulation(): Promise<void> {
    if (!project || working) return;
    working = true;
    feedbackKind = "pending";
    feedback = "Freezing the current ledger, candidates, and advisory decisions…";
    try {
      await settleCampaignAction({ projectId: project.id, type: "resource.schedule.simulate", scope: "resource-economy" });
      feedbackKind = "success";
      feedback = "Immutable advisory simulation recorded. It dispatched nothing and left the campaign phase unchanged.";
    } catch (error) {
      feedbackKind = "error";
      feedback = error instanceof Error ? error.message : String(error);
    } finally {
      working = false;
    }
  }

  $: project = ($campaignState.control?.projects?.find((candidate) => candidate.id === $campaignState.selectedProject) as Project | undefined) || null;
  $: resources = project?.resources || null;
  $: ledger = resources?.ledger || {};
  $: calibration = resources?.calibration || {};
  $: budget = Math.max(1, Number(ledger.epochTokenBudget || 1));
  $: knownWidth = Math.min(100, Number(ledger.knownTokens || 0) / budget * 100);
  $: committedWidth = Math.min(100 - knownWidth, Number(ledger.committedTokens || 0) / budget * 100);
  $: reserveWidth = Math.min(100 - knownWidth - committedWidth, Number(ledger.reserveTokens || 0) / budget * 100);
</script>

{#if resources}
  <details id="resource-economy" class:attention={resources.signals?.some((signal: any) => signal.severity === "attention")} bind:open={expanded}>
    <summary>
      <span><small>RESOURCE ECONOMY</small><strong>{compact(ledger.knownTokens)} measured of {compact(ledger.epochTokenBudget)} this epoch</strong></span>
      <span class="resource-summary"><b>{resources.candidates?.length || 0} choices</b><b>{resources.slots?.available?.research || 0}/{resources.slots?.capacity?.research || 0} research slots</b><i>SHADOW</i></span>
    </summary>
    <div class="resource-body">
      <header class="resource-intro">
        <div><span>PROVISIONAL EPOCH ENVELOPE · CHARTER R{resources.charterRevision}</span><h2>Allocate attention before compute</h2><p>{resources.policy.rationale}</p></div>
        <div class="authority"><strong>ADVISORY ONLY</strong><span>Simulation cannot dispatch</span></div>
      </header>

      <section class="budget" aria-label="Epoch token budget">
        <div class="budget-heading"><strong>{compact(ledger.knownTokens + ledger.committedTokens)} measured + committed</strong><span>{compact(ledger.schedulableTokens)} still schedulable · {compact(ledger.reserveTokens)} held for redirects</span></div>
        <div class="budget-meter"><i class="known" style={`width:${knownWidth}%`}></i><i class="committed" style={`left:${knownWidth}%;width:${committedWidth}%`}></i><i class="reserve" style={`right:0;width:${reserveWidth}%`}></i></div>
        <div class="budget-legend"><span class="known">measured {percent(Number(ledger.knownTokens || 0) / budget)}</span><span class="committed">committed {percent(Number(ledger.committedTokens || 0) / budget)}</span><span class="reserve">redirect reserve {percent(Number(ledger.reserveTokens || 0) / budget)}</span><span>{ledger.unreported || 0} unreported runs</span></div>
      </section>

      <div class="resource-grid">
        <section class="slot-pools">
          <h3>Shared slot pools</h3>
          {#each ["strategy", "research", "custody"] as pool}
            <div><span>{pool}</span><strong>{resources.slots.available[pool]} available</strong><small>{resources.slots.active[pool]} active / {resources.slots.capacity[pool]} capacity</small></div>
          {/each}
        </section>
        <section class="layer-ledger">
          <h3>Measured by layer</h3>
          {#each resources.byLayer || [] as layer (layer.id)}
            <div><span>{layer.id}</span><strong>{compact(layer.knownTokens)}</strong><small>{layer.runs} runs · {layer.unreported} unreported</small></div>
          {/each}
        </section>
      </div>

      <section class="calibration" aria-label="Receipt-bound resource calibration">
        <header><div><span>RECEIPT-BOUND CALIBRATION</span><h3>{String(calibration.status || "INSUFFICIENT").replaceAll("_", " ")}</h3></div><strong>{calibration.eligibleSamples || 0} eligible · {calibration.excludedSamples || 0} excluded</strong></header>
        <p>{calibration.note}</p>
        <div class="calibration-classes">
          {#each calibration.classes || [] as item (item.id)}
            <article class:sufficient={item.sufficient}><span>{item.id}</span><strong>{item.samples}/{item.minimumSamples}</strong><small>{item.samples ? `p90 ${compact(item.tokens?.p90)}` : "awaiting receipts"}</small></article>
          {/each}
        </div>
        <footer>Recommendations remain advisory. Calibration cannot change caps, schedule work, or grant scheduler authority.</footer>
      </section>

      {#if resources.signals?.length}
        <section class="resource-signals">
          {#each resources.signals as signal (signal.id)}
            <article class={`severity-${signal.severity}`}><strong>{signal.label}</strong><p>{signal.detail}</p></article>
          {/each}
        </section>
      {/if}

      <section class="scheduler">
        <header><div><span>ADVISORY SCHEDULER</span><h3>What fits next—and what does not</h3></div><strong>{resources.simulation?.scheduled?.length || 0} fit · {resources.simulation?.gated?.length || 0} gated · {resources.simulation?.waiting?.length || 0} waiting</strong></header>
        {#if resources.candidates?.length}
          <ol>
            {#each resources.candidates as candidate (candidate.id)}
              <li class={`decision-${candidate.decision.toLowerCase()}`}>
                <b>{candidate.decision}</b>
                <div><strong>{candidate.label}</strong><span>{candidate.layer} · {candidate.trackId} · {candidate.workKind} · cap {compact(candidate.tokenCap)}</span><p>{candidate.expectedDelta}</p><small>{candidate.decisionReason}</small></div>
              </li>
            {/each}
          </ol>
        {:else}
          <div class="resource-empty"><strong>No bounded candidate is currently schedulable</strong><p>The ledger remains useful as an epoch budget and cost-quality check.</p></div>
        {/if}
        <footer><p>Freezing creates a content-addressed recommendation receipt for later comparison. It cannot call a worker, consume a gate, or alter research direction.</p><button class="outline-button" disabled={working} onclick={freezeSimulation}>{working ? "Freezing simulation…" : "Freeze scheduler simulation"}</button></footer>
      </section>

      {#if resources.simulations?.length}
        <details class="simulation-history"><summary>Immutable simulation history <strong>{resources.simulations.length} receipt{resources.simulations.length === 1 ? "" : "s"}</strong></summary><ol>{#each resources.simulations as simulation}<li><b>R{simulation.charterRevision}</b><div><strong>{simulation.inputDigest}</strong><span>{new Date(simulation.createdAt).toLocaleString()} · {simulation.actor}</span></div><i>NO DISPATCH</i></li>{/each}</ol></details>
      {/if}
      {#if feedback}<div class="resource-feedback {feedbackKind}" role="status">{feedback}</div>{/if}
    </div>
  </details>
{/if}

<style>
  #resource-economy { color:#e5ebe2; background:#10150e; border:1px solid #536346; border-radius:13px; margin:-4px 0 12px; scroll-margin-top:90px; }
  #resource-economy.attention { border-color:#9c674f; }
  #resource-economy > summary { display:flex; align-items:center; justify-content:space-between; gap:12px; cursor:pointer; list-style:none; padding:10px 13px; }
  #resource-economy > summary::-webkit-details-marker { display:none; }
  #resource-economy > summary > span:first-child { display:flex; align-items:baseline; gap:9px; }
  #resource-economy > summary small,.resource-intro span,.scheduler header span { color:#a7c776; letter-spacing:.1em; font:760 .53rem/1.2 ui-monospace,monospace; }
  #resource-economy > summary strong { font-size:.66rem; }
  #resource-economy[open] > summary { border-bottom:1px solid #3b4933; }
  .resource-summary { display:flex; align-items:center; gap:6px; color:#939f8a; font:.51rem/1 ui-monospace,monospace; }
  .resource-summary b { background:#171f13; border:1px solid #4b5b3f; border-radius:999px; padding:5px 7px; font-weight:700; }
  .resource-summary i { color:#b5d486; letter-spacing:.08em; font-style:normal; font-weight:760; }
  .resource-body { display:grid; gap:9px; padding:11px; }
  .resource-intro { display:flex; justify-content:space-between; align-items:flex-start; gap:14px; }
  .resource-intro h2 { margin:3px 0 2px; font-size:.9rem; }
  .resource-intro p { color:#9da695; margin:0; max-width:90ch; font-size:.55rem; line-height:1.45; }
  .authority { display:grid; flex:none; gap:2px; border:1px solid #61734d; border-radius:8px; padding:7px 9px; text-align:right; }
  .authority strong { color:#c8df9f; letter-spacing:.06em; font:.76 .54rem/1.2 ui-monospace,monospace; }
  .authority span { color:#8f9c84; letter-spacing:0; font-size:.49rem; }
  .budget { display:grid; gap:6px; background:#151c11; border:1px solid #46543b; border-radius:9px; padding:9px; }
  .budget-heading { display:flex; justify-content:space-between; gap:8px; }
  .budget-heading strong { font-size:.61rem; }.budget-heading span { color:#8f9b87; font-size:.52rem; }
  .budget-meter { position:relative; overflow:hidden; height:11px; background:#283024; border-radius:999px; }
  .budget-meter i { position:absolute; top:0; bottom:0; }.budget-meter .known { left:0; background:#9bc46b; }.budget-meter .committed { background:#d8ae5e; }.budget-meter .reserve { background:repeating-linear-gradient(135deg,#698052 0 5px,#4d6040 5px 10px); }
  .budget-legend { display:flex; flex-wrap:wrap; gap:8px; color:#818c7a; font:.49rem/1.3 ui-monospace,monospace; }.budget-legend .known { color:#b6d88c; }.budget-legend .committed { color:#e0bf7b; }.budget-legend .reserve { color:#91aa76; }
  .resource-grid { display:grid; grid-template-columns:.8fr 1.2fr; gap:8px; }
  .slot-pools,.layer-ledger { display:grid; grid-template-columns:repeat(3,1fr); gap:6px; background:#11180f; border:1px solid #3d4b35; border-radius:9px; padding:8px; }
  .layer-ledger { grid-template-columns:repeat(4,1fr); }.slot-pools h3,.layer-ledger h3 { grid-column:1/-1; margin:0; color:#9aaa91; font-size:.55rem; }
  .slot-pools div,.layer-ledger div { display:grid; gap:2px; min-width:0; border-left:2px solid #647e4b; padding-left:6px; }
  .slot-pools span,.layer-ledger span { color:#9ebe75; text-transform:uppercase; font:.48rem/1 ui-monospace,monospace; }.slot-pools strong,.layer-ledger strong { font-size:.57rem; }.slot-pools small,.layer-ledger small { color:#75806f; font-size:.47rem; }
  .resource-signals { display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:6px; }.resource-signals article { border:1px solid #7b6940; border-radius:8px; padding:8px; background:#211d11; }.resource-signals article.severity-attention { border-color:#915b4a; background:#251713; }.resource-signals strong { color:#dfc477; font-size:.56rem; }.resource-signals p { color:#a99d7b; margin:3px 0 0; font-size:.5rem; line-height:1.4; }
  .calibration { display:grid; gap:6px; border:1px solid #47583d; border-radius:9px; padding:9px; background:#12180f; }.calibration > header { display:flex; justify-content:space-between; align-items:end; gap:8px; }.calibration header span { color:#a7c776; letter-spacing:.1em; font:760 .53rem/1.2 ui-monospace,monospace; }.calibration h3 { margin:2px 0 0; font-size:.68rem; }.calibration header > strong { color:#8f9b87; font:.51rem/1.3 ui-monospace,monospace; }.calibration > p,.calibration > footer { color:#7f8a78; margin:0; font-size:.5rem; line-height:1.4; }.calibration-classes { display:grid; grid-template-columns:repeat(5,1fr); gap:5px; }.calibration-classes article { display:grid; gap:2px; border-left:2px solid #675c40; padding-left:6px; }.calibration-classes article.sufficient { border-left-color:#7fa45a; }.calibration-classes span { color:#9ebe75; font:.47rem/1 ui-monospace,monospace; }.calibration-classes strong { font-size:.57rem; }.calibration-classes small { color:#75806f; font-size:.46rem; }
  .scheduler { display:grid; gap:7px; border:1px solid #435239; border-radius:9px; padding:9px; }.scheduler > header { display:flex; justify-content:space-between; gap:10px; align-items:end; }.scheduler h3 { margin:2px 0 0; font-size:.68rem; }.scheduler > header > strong { color:#9ca78f; font:.51rem/1.3 ui-monospace,monospace; }.scheduler ol { display:grid; gap:5px; list-style:none; margin:0; padding:0; }.scheduler li { display:grid; grid-template-columns:68px 1fr; gap:8px; border:1px solid #384431; border-left:3px solid #759951; border-radius:7px; padding:7px; }.scheduler li.decision-gate { border-left-color:#ddaf61; }.scheduler li.decision-wait { border-left-color:#698296; }.scheduler li.decision-park { border-left-color:#8d6a67; }.scheduler li > b { align-self:start; color:#b8d487; background:#1b2714; border-radius:999px; padding:5px 6px; text-align:center; font:.48rem/1 ui-monospace,monospace; }.scheduler li.decision-gate > b { color:#e3c17f; background:#292114; }.scheduler li.decision-wait > b { color:#9eb9cc; background:#152029; }.scheduler li.decision-park > b { color:#c29a94; background:#251917; }.scheduler li div { display:grid; gap:2px; min-width:0; }.scheduler li strong { font-size:.58rem; }.scheduler li span { color:#89a36b; font:.48rem/1.25 ui-monospace,monospace; }.scheduler li p,.scheduler li small { color:#8e9987; margin:0; font-size:.5rem; line-height:1.35; }.scheduler li small { color:#727f70; }.scheduler footer { display:flex; align-items:center; gap:12px; border-top:1px solid #35422f; padding-top:7px; }.scheduler footer p { color:#7f8a78; margin:0 auto 0 0; font-size:.5rem; line-height:1.4; }.scheduler footer button { flex:none; min-height:38px; }
  .resource-empty { border:1px dashed #44543a; border-radius:7px; padding:10px; text-align:center; }.resource-empty strong { font-size:.56rem; }.resource-empty p { color:#7f8979; margin:3px 0 0; font-size:.5rem; }
  .simulation-history { border-top:1px solid #34412e; padding-top:7px; }.simulation-history > summary { display:flex; justify-content:space-between; color:#8f9b87; cursor:pointer; font-size:.53rem; }.simulation-history ol { display:grid; gap:4px; list-style:none; margin:6px 0 0; padding:0; }.simulation-history li { display:grid; grid-template-columns:34px 1fr auto; gap:7px; align-items:center; background:#121910; border-radius:6px; padding:6px; }.simulation-history li > b,.simulation-history li > i { color:#a9c77e; font:.47rem/1 ui-monospace,monospace; }.simulation-history li > i { color:#849577; font-style:normal; }.simulation-history li div { display:grid; gap:1px; min-width:0; }.simulation-history li strong { overflow:hidden; color:#aab59f; text-overflow:ellipsis; white-space:nowrap; font:.48rem/1.2 ui-monospace,monospace; }.simulation-history li span { color:#707b6b; font-size:.46rem; }
  .resource-feedback { border:1px solid #516344; border-radius:8px; padding:9px; font-size:.55rem; }.resource-feedback.success { color:#bfd5a6; background:#172113; }.resource-feedback.error { color:#efb4a3; background:#271813; border-color:#8d5545; }.resource-feedback.pending { color:#d8ca97; background:#242114; border-color:#76683c; }
  @media (max-width:700px) {
    #resource-economy > summary { align-items:flex-start; padding:10px; }#resource-economy > summary > span:first-child { display:grid; gap:2px; }.resource-summary { display:grid; justify-items:end; }.resource-summary b { padding:4px 6px; }
    .resource-body { padding:9px; }.resource-intro { display:grid; }.authority { justify-self:stretch; text-align:left; }.budget-heading { display:grid; }.resource-grid { grid-template-columns:1fr; }.layer-ledger { grid-template-columns:repeat(2,1fr); }.calibration > header { display:grid; }.calibration-classes { grid-template-columns:repeat(2,1fr); }.scheduler > header { display:grid; }.scheduler li { grid-template-columns:60px 1fr; }.scheduler footer { display:grid; }.scheduler footer button { width:100%; min-height:46px; }.simulation-history li { grid-template-columns:32px minmax(0,1fr); }.simulation-history li > i { grid-column:2; }
  }
</style>
