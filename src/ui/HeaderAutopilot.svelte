<script lang="ts">
  import { campaignState } from "./campaign-state";
  import { settleCampaignAction, type CampaignProject } from "./campaign-actions";

  let project: CampaignProject | null = null;
  let working = false;
  let feedback = "";

  function openControl(): void {
    const resourceBlocked = project?.loopStart?.code === "EPOCH_BUDGET";
    if (resourceBlocked) {
      for (const selector of ["#strategy-workspaces", "#strategy-workspace"]) {
        const element = document.querySelector(selector);
        if (element instanceof HTMLDetailsElement) element.open = true;
      }
      requestAnimationFrame(() => document.querySelector("#strategy-workspace")?.scrollIntoView({ behavior: "smooth", block: "start" }));
      return;
    }
    document.querySelector("#loop-control, #next-action")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function toggle(): Promise<void> {
    if (!project || working || !$campaignState.access?.canMutate) return;
    if (!toggleAction) { openControl(); return; }
    working = true;
    feedback = "";
    try {
      await settleCampaignAction({ projectId: project.id, type: toggleAction, scope: "header-autopilot", pollLimit: 80 });
    } catch (error) {
      feedback = error instanceof Error ? error.message : String(error);
    } finally {
      working = false;
    }
  }

  $: project = ($campaignState.control?.projects?.find((candidate) => candidate.id === $campaignState.selectedProject) as CampaignProject | undefined) || null;
  $: loop = project?.loop || null;
  $: running = loop?.status === "running";
  $: resumable = ["paused", "attention"].includes(loop?.status || "") && Boolean(loop?.canResume || loop?.status === "paused");
  $: toggleAction = running ? "loop.pause" : resumable ? "loop.resume" : project?.canStartLoop ? "loop.start" : "";
  $: state = running ? "ON" : resumable ? "PAUSED" : project?.canStartLoop ? "READY" : "BLOCKED";
  $: label = working ? "Working…" : running ? "Pause" : resumable ? "Resume" : project?.canStartLoop ? "Start" : "Manage blocker";
  $: title = feedback || (toggleAction ? `${label} one-loop autopilot` : project?.loopStart?.blocker || "Open the current campaign gate");
</script>

{#if project}
  <div class="header-autopilot" class:active={running} class:paused={resumable} class:blocked={!toggleAction}>
    <span><small>AUTOPILOT</small><strong>{state}</strong></span>
    <button
      type="button"
      aria-label={`${label} one-loop autopilot`}
      aria-pressed={running}
      disabled={working || $campaignState.access?.canMutate === false}
      {title}
      onclick={toggle}
    >
      <i aria-hidden="true"></i>{label}
    </button>
  </div>
{/if}
