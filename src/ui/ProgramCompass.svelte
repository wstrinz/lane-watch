<script lang="ts">
  import { campaignState } from "./campaign-state";
  import { buildProgramCompass, type ProgramCompass as Compass } from "./program-compass";

  let project: any = null;
  let compass: Compass | null = null;
  $: project = $campaignState.control?.projects?.find((candidate: any) => candidate.id === $campaignState.selectedProject) || null;
  $: compass = project ? buildProgramCompass(project) : null;
</script>

{#if compass}
  <section class="program-compass" aria-label="Program objective and recommended next research targets">
    <header>
      <div><p>PROGRAM COMPASS</p><h2>{compass.headline}</h2></div>
      <strong>{compass.status}</strong>
    </header>
    <div class="compass-chain">
      <article><span>WIN CONDITION</span><strong>{compass.objective}</strong></article>
      <i aria-hidden="true">→</i>
      <article><span>WHAT JUST CHANGED</span><strong>{compass.changed}</strong><small>{compass.scale}</small></article>
      <i aria-hidden="true">→</i>
      <article class="recommended"><span>BEST NEXT TARGET</span><strong>{compass.nextTarget}</strong></article>
    </div>
    {#if compass.moves.length}
      <div class="compass-wave">
        {#each compass.moves as move (move.id)}
          <details class:held={move.timing === "HOLD"}>
            <summary><span><b>{move.timing}</b><small>{move.track}</small></span><strong>{move.title}</strong><i>why?</i></summary>
            <div><p>{move.detail}</p><p><b>Program payoff:</b> {move.payoff}</p></div>
          </details>
        {/each}
      </div>
    {/if}
    <details class="compass-reasoning">
      <summary><span>WHY THIS ORDER</span><strong>Show strategy and anti-loop guard</strong></summary>
      <div><p>{compass.rationale}</p><p><b>Avoid the loop:</b> {compass.antiLoop}</p></div>
    </details>
    <footer><b>ADVISORY, NOT AUTHORITY</b><span>The evidence receipts and human gates still decide what is accepted or launched.</span></footer>
  </section>
{/if}
