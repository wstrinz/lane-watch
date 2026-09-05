<script lang="ts">
  import { campaignState } from "./campaign-state";
  import { latestResearchRun, receiptNeedsAttention } from "./campaign-guidance";
  const stages = ["Plan", "Launch", "Run", "Review", "Decide"];
  const phases: Record<string, number> = { PLANNING: 0, RESEARCH_REVIEW: 0, REVISING: 0, NEXT_WAVE_READY: 0, RESEARCH_READY: 1, RESEARCH_RUNNING: 2, RUNNING: 2, RESEARCH_INTAKE: 3, RECONCILING: 3, SYNTHESIS_READY: 3, SYNTHESIZING: 3, DECISION_REQUIRED: 4, BLOCKED: 4 };
  $: project = $campaignState.control?.projects?.find(p => p.id === $campaignState.selectedProject);
  $: run = latestResearchRun(project);
  $: current = receiptNeedsAttention(run) || run?.status === "evidence_ready" ? 3 : phases[project?.phase || ""] ?? 0;
  $: budget = project?.resources?.ledger;
</script>
{#if project}
  <section class="campaign-summary" id="process-tracker" aria-label="Campaign progress">
    <div class="campaign-summary-heading"><div><p class="eyebrow">{project.id} · CAMPAIGN</p><h2>{project.strategy?.epoch?.label || project.role}</h2></div><span class="campaign-mode">{project.loop?.status === "running" ? "Automation on" : "Guided mode"}</span></div>
    <ol aria-label="Campaign stages">{#each stages as stage, index}<li class:current={index === current} class:passed={index < current} aria-current={index === current ? "step" : undefined}><span>{index + 1}</span>{stage}</li>{/each}</ol>
    {#if budget && budget.schedulableTokens === 0}<p class="campaign-budget-note">New research is paused: {Number(budget.knownTokens).toLocaleString()} recorded tokens against the {Number(budget.epochTokenBudget).toLocaleString()} epoch budget. Existing results can still be reviewed.</p>{/if}
  </section>
{/if}
