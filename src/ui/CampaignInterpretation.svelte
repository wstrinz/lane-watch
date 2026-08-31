<script lang="ts">
  import { campaignState } from "./campaign-state";
  import { buildCampaignInterpretation, interpretationAuthority, type CampaignInterpretation as Interpretation, type InterpretationNode } from "./campaign-interpretation";

  let project: any = null;
  let interpretation: Interpretation | null = null;
  let selectedId = "campaign-objective";
  let projectId = "";

  function nodes(value: Interpretation | null): InterpretationNode[] {
    return value ? [value.objective, value.quest, value.decision, ...value.tracks, ...value.claims, ...value.proposals, ...value.concepts] : [];
  }

  function trackNodes(value: Interpretation, trackId?: string): InterpretationNode[] {
    return [...value.claims, ...value.proposals].filter((node) => node.trackId === trackId);
  }

  function choose(node: InterpretationNode): void {
    selectedId = node.id;
    requestAnimationFrame(() => document.querySelector(".atlas-inspector")?.scrollIntoView({ behavior: "smooth", block: "nearest" }));
  }

  $: project = $campaignState.control?.projects?.find((candidate: any) => candidate.id === $campaignState.selectedProject) || null;
  $: interpretation = project ? buildCampaignInterpretation(project) : null;
  $: if (project?.id !== projectId) { projectId = project?.id || ""; selectedId = "campaign-objective"; }
  $: selected = nodes(interpretation).find((node) => node.id === selectedId) || interpretation?.objective || null;
</script>

{#if interpretation}
  <section class="interpretation-surface" id="campaign-interpretation" aria-label="Campaign interpretation and research atlas">
    <header class="interpretation-heading">
      <div>
        <p>CAMPAIGN INTERPRETATION</p>
        <h2>Understand the mission before choosing the move</h2>
        <span>A generated briefing and explorable mathematical map, grounded in the same frozen evidence as the control plane.</span>
      </div>
      <strong class="source-{interpretation.source}">{interpretation.source.replaceAll("-", " ")}</strong>
    </header>

    <div class="director-deck">
      <button class="director-card objective state-{interpretation.objective.state.toLowerCase()}" onclick={() => choose(interpretation!.objective)}>
        <span>{interpretation.objective.kicker}</span>
        <strong>{interpretation.objective.title}</strong>
        <p>{interpretation.objective.summary}</p>
        <small>{interpretation.objective.state}</small>
      </button>
      <i class="director-link" aria-hidden="true"></i>
      <button class="director-card quest state-{interpretation.quest.state.toLowerCase()}" onclick={() => choose(interpretation!.quest)}>
        <span>{interpretation.quest.kicker}</span>
        <strong>{interpretation.quest.title}</strong>
        <p>{interpretation.quest.why}</p>
        <small>{interpretation.quest.state}</small>
      </button>
      <i class="director-link" aria-hidden="true"></i>
      <button class="director-card decision state-{interpretation.decision.state.toLowerCase()}" onclick={() => choose(interpretation!.decision)}>
        <span>{interpretation.decision.kicker}</span>
        <strong>{interpretation.decision.title}</strong>
        <p>{interpretation.decision.summary}</p>
        <small>{interpretation.decision.state}</small>
      </button>
    </div>

    {#if interpretation.progress.length || interpretation.watchouts.length}
      <div class="brief-ledger">
        <section>
          <header><span>WHAT CHANGED</span><strong>{interpretation.progress.length} evidence-backed update{interpretation.progress.length === 1 ? "" : "s"}</strong></header>
          {#if interpretation.progress.length}<ol>{#each interpretation.progress as item, index}<li><b>{index + 1}</b><span>{item}</span></li>{/each}</ol>{:else}<p>No synthesized progress delta is available yet.</p>{/if}
        </section>
        <details open>
          <summary><span>SCOPE & WATCHOUTS</span><strong>{interpretation.watchouts.length} boundary note{interpretation.watchouts.length === 1 ? "" : "s"}</strong></summary>
          <ul>{#each interpretation.watchouts as item}<li>{item}</li>{/each}</ul>
        </details>
      </div>
    {/if}

    <section class="research-atlas" aria-label="Research Atlas">
      <header>
        <div><p>RESEARCH ATLAS</p><h3>How bounded work connects back to the campaign objective</h3><span>Select any station to inspect its meaning, evidence, scope, and unlocks.</span></div>
        <div class="atlas-legend" aria-label="Interpretation status legend">
          <span class="supported">SUPPORTED</span><span class="proposed">PROPOSED</span><span class="unmeasured">UNMEASURED</span><span class="blocked">BLOCKED</span><span class="context">CONTEXT</span>
        </div>
      </header>

      <div class="atlas-board">
        <div class="atlas-north-star">
          <button class:chosen={selected?.id === interpretation.objective.id} onclick={() => choose(interpretation!.objective)}><span>NORTH STAR</span><strong>{interpretation.objective.title}</strong></button>
          <i aria-hidden="true"></i>
          <button class:chosen={selected?.id === interpretation.quest.id} onclick={() => choose(interpretation!.quest)}><span>CURRENT KNOWLEDGE</span><strong>{interpretation.quest.title}</strong></button>
          <i aria-hidden="true"></i>
          <button class:chosen={selected?.id === interpretation.decision.id} onclick={() => choose(interpretation!.decision)}><span>NEXT BRANCH</span><strong>{interpretation.decision.title}</strong></button>
        </div>

        <div class="atlas-track-list">
          {#each interpretation.tracks as track (track.id)}
            <section class="atlas-track" style={`--track-color:${track.color || "#71d6a0"}`}>
              <button class="atlas-track-label state-{track.state.toLowerCase()}" class:chosen={selected?.id === track.id} onclick={() => choose(track)}>
                <span>{track.kicker}</span><strong>{track.title}</strong><small>{track.state === "ACTIVE" ? "current route" : "persistent route"}</small>
              </button>
              <div class="atlas-rail" class:empty={!trackNodes(interpretation, track.trackId).length}>
                {#if trackNodes(interpretation, track.trackId).length}
                  {#each trackNodes(interpretation, track.trackId) as node (node.id)}
                    <button class="atlas-station state-{node.state.toLowerCase()}" class:chosen={selected?.id === node.id} onclick={() => choose(node)}>
                      <span>{node.kicker}</span><strong>{node.title}</strong><small>{node.state}</small>
                    </button>
                  {/each}
                {:else}
                  <div class="atlas-empty"><span>OPEN CAPACITY</span><strong>No current claim or proposed lane is assigned here.</strong></div>
                {/if}
              </div>
            </section>
          {/each}
        </div>

        {#if interpretation.concepts.length}
          <section class="object-codex">
            <header><span>OBJECT CODEX</span><strong>Learn the mathematical pieces on this map</strong></header>
            <div>{#each interpretation.concepts as concept (concept.id)}<button class:chosen={selected?.id === concept.id} onclick={() => choose(concept)}><span>CONTEXT</span><strong>{concept.title}</strong></button>{/each}</div>
          </section>
        {/if}
      </div>

      {#if selected}
        <aside class="atlas-inspector state-{selected.state.toLowerCase()}" aria-live="polite">
          <header><div><span>{selected.kicker} · {selected.kind.toUpperCase()}</span><h4>{selected.title}</h4></div><strong>{selected.state}</strong></header>
          <div class="atlas-inspector-grid">
            <section><span>WHAT THIS IS</span><p>{selected.summary}</p></section>
            <section><span>WHY IT MATTERS</span><p>{selected.why || "It provides a typed connection between bounded activity and the campaign objective."}</p></section>
            <section><span>HOW IT CONNECTS</span><p>{selected.relation || "It rejoins the campaign through the normal evidence and decision gates."}</p></section>
            <section><span>AUTHORITY</span><p>{interpretationAuthority(selected.state)}</p></section>
          </div>
          {#if selected.evidence?.length || selected.scope?.length || selected.unlocks?.length || selected.metrics?.length}
            <div class="atlas-inspector-lists">
              {#if selected.evidence?.length}<details open><summary>Evidence <strong>{selected.evidence.length}</strong></summary><ul>{#each selected.evidence as item}<li>{item}</li>{/each}</ul></details>{/if}
              {#if selected.scope?.length}<details open><summary>Scope & objections <strong>{selected.scope.length}</strong></summary><ul>{#each selected.scope as item}<li>{item}</li>{/each}</ul></details>{/if}
              {#if selected.unlocks?.length}<details><summary>What this could unlock <strong>{selected.unlocks.length}</strong></summary><ul>{#each selected.unlocks as item}<li>{item}</li>{/each}</ul></details>{/if}
              {#if selected.metrics?.length}<details><summary>Progress measures <strong>{selected.metrics.length}</strong></summary><ul>{#each selected.metrics as item}<li>{item}</li>{/each}</ul></details>{/if}
            </div>
          {/if}
        </aside>
      {/if}
      <footer><b>INTERPRETATION IS NOT AUTHORITY</b><span>Generated prose helps navigate. Exact receipts, claim states, and human gates remain the source of campaign authority.</span></footer>
    </section>
  </section>
{/if}
