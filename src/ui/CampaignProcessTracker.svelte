<script lang="ts">
  import { campaignState } from "./campaign-state";
  import type { CampaignProject } from "./campaign-actions";

  const stages = [
    { id: "plan", short: "Plan", label: "Shape the wave" },
    { id: "launch", short: "Launch", label: "Confirm bounds" },
    { id: "run", short: "Run", label: "Bounded research" },
    { id: "land", short: "Land", label: "Evidence intake" },
    { id: "decide", short: "Decide", label: "Synthesize & steer" },
  ];

  const stageByPhase: Record<string, string> = {
    PLANNING: "plan", RESEARCH_REVIEW: "plan", REVISING: "plan", NEXT_WAVE_READY: "plan",
    RESEARCH_READY: "launch", RESEARCH_RUNNING: "run", RUNNING: "run",
    RESEARCH_INTAKE: "land", RECONCILING: "land", SYNTHESIS_READY: "land", SYNTHESIZING: "land",
    DECISION_REQUIRED: "decide", BLOCKED: "decide",
  };

  const nextByPhase: Record<string, string> = {
    PLANNING: "Prepare a bounded plan", RESEARCH_REVIEW: "Resolve the checked plan gate", REVISING: "Recheck the revised plan",
    RESEARCH_READY: "Resolve launch resources and confirm the schedule", RESEARCH_RUNNING: "Wait for the bounded wave to settle",
    RESEARCH_INTAKE: "Accept and reconcile landed evidence", RECONCILING: "Close the evidence boundary",
    SYNTHESIS_READY: "Freeze the synthesis bundle", SYNTHESIZING: "Wait for synthesis",
    DECISION_REQUIRED: "Choose the next campaign direction", NEXT_WAVE_READY: "Shape the next wave", BLOCKED: "Resolve the recorded blocker",
  };

  let project: CampaignProject | null = null;
  $: project = ($campaignState.control?.projects?.find((candidate) => candidate.id === $campaignState.selectedProject) as CampaignProject | undefined) || null;
  $: currentId = stageByPhase[project?.phase || ""] || "plan";
  $: currentIndex = Math.max(0, stages.findIndex((stage) => stage.id === currentId));
  $: activeRuns = project?.researchRuns?.filter((run: any) => ["launching", "running", "blocked"].includes(run.status)).length || 0;
  $: settledSteps = project?.loop?.steps?.filter((step: any) => step.status === "completed").length || 0;
  $: totalSteps = project?.loop?.steps?.length || 0;
</script>

{#if project}
  <section class="process-tracker" id="process-tracker" aria-label="Campaign process tracker">
    <header>
      <div><p class="eyebrow">CAMPAIGN PROCESS</p><h2>{nextByPhase[project.phase] || "Track the next bounded move"}</h2></div>
      <span><b>{project.phase.replaceAll("_", " ")}</b>{activeRuns ? `${activeRuns} active lane${activeRuns === 1 ? "" : "s"}` : totalSteps ? `${settledSteps}/${totalSteps} loop steps settled` : "No active execution"}</span>
    </header>
    <ol>
      {#each stages as stage, index}
        <li class:current={stage.id === currentId} class:passed={index < currentIndex}>
          <span>{index + 1}</span>
          <div><strong>{stage.short}</strong><small>{stage.label}</small></div>
        </li>
      {/each}
    </ol>
    <footer>
      <span><b>NOW</b>{stages[currentIndex].label}</span>
      <span><b>CAMPAIGN</b>{project.strategy?.workspace?.activeReview?.response?.proposal?.epochLabel || project.strategy?.epoch?.label || project.role}</span>
    </footer>
  </section>
{/if}
