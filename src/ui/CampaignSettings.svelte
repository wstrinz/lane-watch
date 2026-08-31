<script lang="ts">
  import { campaignState } from "./campaign-state";
  import { settleCampaignAction, type CampaignProject as Project } from "./campaign-actions";

  let project: Project | null = null;
  let working = "";
  let feedback = "";
  let governance: Record<string, any> | null = null;
  let governanceProjectId = "";
  let governanceLoading = false;
  let governanceError = "";

  async function submit(type: string, args: Record<string, unknown>): Promise<void> {
    if (!project || working || $campaignState.access?.canMutate === false) return;
    working = type;
    feedback = "Saving future-run policy…";
    try {
      await settleCampaignAction({ projectId: project.id, type, args, scope: "campaign-settings" });
      feedback = "Future-run policy saved. No active worker was changed.";
    } catch (error) { feedback = error instanceof Error ? error.message : String(error); }
    finally { working = ""; }
  }

  async function loadGovernance(): Promise<void> {
    if (!project || governanceLoading || (governance && governanceProjectId === project.id)) return;
    governanceLoading = true;
    governanceError = "";
    governanceProjectId = project.id;
    try {
      const response = await fetch(`/api/governance?project=${encodeURIComponent(project.id)}`, { cache: "no-store" });
      const result = await response.json() as Record<string, any>;
      if (!response.ok) throw new Error(String(result.error || `Could not load operational governance: ${response.status}`));
      governance = result;
    } catch (error) { governanceError = error instanceof Error ? error.message : String(error); }
    finally { governanceLoading = false; }
  }

  $: project = ($campaignState.control?.projects?.find((candidate) => candidate.id === $campaignState.selectedProject) as Project | undefined) || null;
  $: preferences = project?.dispatchPreferences || null;
  $: coordination = project?.coordinationInterface || null;
</script>

{#if project && preferences}
  <details class="campaign-settings" id="campaign-settings" ontoggle={(event) => { if (event.currentTarget.open) void loadGovernance(); }}>
    <summary><span><small>FUTURE-RUN POLICY</small><strong>{preferences.profiles?.find((profile: any) => profile.id === preferences.selectedProfile)?.label || preferences.selectedProfile}</strong></span><span>{coordination?.mode || "observe-only"} · {project.automationMode || "prepare"}</span></summary>
    <div class="campaign-settings-body">
      <div class="campaign-settings-boundary"><strong>Defaults, never active mutations</strong><p>These choices apply only when a later checked contract is confirmed. They do not restaff a running lane, approve a plan, or launch anything.</p></div>
      {#if $campaignState.access}
        <div class="campaign-settings-boundary access-boundary"><strong>Signed in as {$campaignState.access.role} · {$campaignState.access.identity}</strong><p>{$campaignState.access.projects.includes("*") ? "Can read all configured projects." : `Readable projects: ${$campaignState.access.projects.join(", ")}.`} {$campaignState.access.canMutate ? "This project is in the mutation scope; every campaign gate still applies." : "This project is read-only; guarded actions and manual refresh are disabled."}</p></div>
      {/if}
      {#if coordination}
        <div class="campaign-settings-boundary"><strong>Coordinator interface · {coordination.mode}</strong><p>{coordination.reason}</p><small>Observation never grants authority. Human wave adoption imports a fixed wave; exact human schedule confirmation grants controller execution only to reserved members.</small></div>
      {/if}
      <div class="dispatch-profile-grid">
        {#each preferences.profiles || [] as profile (profile.id)}
          <button type="button" class="dispatch-profile" class:selected={profile.id === preferences.selectedProfile} disabled={Boolean(working) || profile.id === preferences.selectedProfile || $campaignState.access?.canMutate === false} onclick={() => submit("project.dispatch-profile.set", { profile: profile.id })}>
            <span>{profile.budgetClass}</span><strong>{profile.label}</strong><small>{profile.model} · {profile.effort}{profile.fanout ? ` · ${profile.fanout} children` : " · single worker"}</small><p>{profile.useWhen}</p>
          </button>
        {/each}
      </div>
      <label class="automation-setting"><span><strong>Automatic boundary handling</strong><small>Controls how far the controller may prepare between explicit human gates.</small></span><select value={project.automationMode || "prepare"} disabled={Boolean(working) || $campaignState.access?.canMutate === false} onchange={(event) => submit("project.automation.set", { mode: (event.currentTarget as HTMLSelectElement).value })}><option value="observe">observe</option><option value="prepare">prepare</option><option value="propose">propose</option><option value="bounded">bounded</option></select></label>
      <section class="operational-governance" aria-label="Operational governance">
        <header><span><small>HOSTS & GLOBAL QUOTAS</small><strong>Pre-admission inventory</strong></span><b>{governance?.quotas?.status || (governanceLoading ? "LOADING" : "READ ONLY")}</b></header>
        {#if governanceError}<p>{governanceError}</p>{:else if governance}
          <div class="host-capability-grid">
            {#each governance.projects?.[0]?.hosts || [] as host (host.id)}<article><span>{host.id}</span><strong>{host.observation} observation</strong><small>dispatch {host.researchDispatch}</small><small>reconcile {host.reconciliation}</small></article>{/each}
          </div>
          <div class="global-quota-grid">
            <span><small>TOKEN COMMITMENTS</small><strong>{governance.quotas.usage.tokenCommitments.toLocaleString()} / {governance.quotas.policy.tokenCommitments.toLocaleString()}</strong></span>
            {#each ["strategy", "research", "custody"] as slot}<span><small>{slot} SLOTS</small><strong>{governance.quotas.usage.slots[slot]} / {governance.quotas.policy.slots[slot]}</strong></span>{/each}
          </div>
          <footer>ENFORCED AT SERIALIZED RESOURCE ACQUISITION · no scheduler or host mutation authority</footer>
        {:else}<p>{governanceLoading ? "Loading scoped host and quota facts…" : "Open this section to load scoped operational facts."}</p>{/if}
      </section>
      {#if feedback}<div class="gate-feedback" role="status">{feedback}</div>{/if}
    </div>
  </details>
{/if}
