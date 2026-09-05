<script lang="ts">
  import { onMount } from "svelte";
  import ObserverDashboard from "./ObserverDashboard.svelte";
  import CampaignPlay from './CampaignPlay.svelte';
  import CampaignWorkQueue from "./CampaignWorkQueue.svelte";
  import ResearchLaunchAttempts from './ResearchLaunchAttempts.svelte';
  import PrimaryActionRail from "./PrimaryActionRail.svelte";
  import PacketInbox from "./PacketInbox.svelte";
  import CampaignInterpretation from "./CampaignInterpretation.svelte";
  import ExternalPerspective from "./ExternalPerspective.svelte";
  import CoordinatorConsole from "./CoordinatorConsole.svelte";
  import CampaignSettings from "./CampaignSettings.svelte";
  import WaveAccounting from "./WaveAccounting.svelte";
  import CampaignFlow from "./CampaignFlow.svelte";
  import LoopControl from "./LoopControl.svelte";
  import HeaderAutopilot from "./HeaderAutopilot.svelte";
  import CampaignProcessTracker from "./CampaignProcessTracker.svelte";
  import OperatorGate from "./OperatorGate.svelte";
  import StrategyOverview from "./StrategyOverview.svelte";
  import ProgramCompass from "./ProgramCompass.svelte";
  import ResourceEconomy from "./ResourceEconomy.svelte";
  import StrategyWorkspace from "./StrategyWorkspace.svelte";
  import CustodyService from "./CustodyService.svelte";
  import { campaignState, connectCampaignState, refreshAll, selectProject } from "./campaign-state";
  import { registerPwa } from "./pwa";

  onMount(() => {
    const disconnect = connectCampaignState();
    const unregisterPwa = registerPwa();
    return () => { disconnect(); unregisterPwa(); };
  });
</script>

<header class="topbar">
  <a class="topbar-brand" href="/" title="Open all jobs" onclick={(event) => { event.preventDefault(); selectProject(""); }}>
    <p class="eyebrow">CAMPAIGN CONTROL</p>
    <h1>Lane Watch</h1>
  </a>
  <span class="topbar-context">Research campaigns</span>
  <div class="connection-wrap">
    {#if $campaignState.access}<span class="access-identity" title={`${$campaignState.access.projects.includes("*") ? "Read all projects" : `Read ${$campaignState.access.projects.join(", ")}`} · ${$campaignState.access.mutableProjects.includes("*") ? "change all projects" : `change ${$campaignState.access.mutableProjects.join(", ") || "none"}`}`}><b>{$campaignState.access.role}</b>{$campaignState.access.identity}</span>{/if}
    <button class="refresh-button" class:refreshing={$campaignState.connection === "refreshing"} disabled={$campaignState.connection === "refreshing" || $campaignState.access?.canMutate === false} aria-label="Refresh all campaign and lane states" title={$campaignState.access?.canMutate === false ? "Viewer access is read-only" : "Refresh all campaign and lane states"} onclick={() => refreshAll().catch(() => undefined)}>↻</button>
    <span class="connection-dot" class:connecting={$campaignState.connection === "connecting" || $campaignState.connection === "refreshing"} class:offline={$campaignState.connection === "offline" || $campaignState.connection === "reconnecting"}></span>
    <span>{$campaignState.connectionLabel}</span>
  </div>
</header>

<main>
  {#if !$campaignState.selectedProject}
    <section id="observer-lanes" class="observer-surface all-jobs-surface" aria-label="All observed agent lanes">
      <header><div><p class="eyebrow">ALL JOBS OVERVIEW</p><h2>Every visible lane, in one place</h2></div><span>Read-only across projects · choose a campaign to open its controls</span></header>
      <ObserverDashboard />
    </section>
  {:else}
    <CampaignPlay />
    <details id="campaign-library" class="campaign-library">
    <summary>Campaign library <span>Evidence, history, controls & settings</span></summary>
    <CampaignWorkQueue />

    <section class="workspace-switchboard" aria-label="Campaign detail drawers">
    <header><div><p class="eyebrow">CAMPAIGN DETAIL</p><h2>Explore the campaign</h2></div><span>Evidence, direction, and background</span></header>
    <details id="campaign-context" class="workspace-group">
      <summary><span><small>OBJECTIVE & INPUTS</small><strong>Objective, background, and new inputs</strong></span><b>Open drawer</b></summary>
      <div class="workspace-group-body">
        <ProgramCompass />
        <PacketInbox />
        <CampaignInterpretation />
      </div>
    </details>
    <details id="process-history" class="workspace-group">
      <summary><span><small>PROCESS MAP & HISTORY</small><strong>History and automation</strong></span><b>Open drawer</b></summary>
      <div class="workspace-group-body">
      <CampaignProcessTracker />
      <PrimaryActionRail />
      <OperatorGate />
    <details class="autopilot-ledger">
      <summary><span><small>AUTOPILOT DETAIL</small><strong>Step ledger, frozen schedule, and advanced controls</strong></span><b>Expand</b></summary>
      <HeaderAutopilot />
      <LoopControl />
    </details>
        <CampaignFlow />
      </div>
    </details>
    <details id="evidence-workspace" class="workspace-group">
      <summary><span><small>WAVE & EVIDENCE</small><strong>Results, receipts, and workers</strong></span><b>Open workspace</b></summary>
      <div class="workspace-group-body">
        <ResearchLaunchAttempts />
        <WaveAccounting />
        <CustodyService />
        <section id="observer-lanes" class="observer-surface" aria-label="Observed agent lanes">
          <header><div><p class="eyebrow">LANE OBSERVER</p><h2>Workers, receipts, and recent history</h2></div><span>Drill down without leaving campaign control</span></header>
          <ObserverDashboard />
        </section>
      </div>
    </details>
    <details id="strategy-workspaces" class="workspace-group">
      <summary><span><small>STRATEGY & BRANCHES</small><strong>Direction, budget, and alternatives</strong></span><b>Open workspace</b></summary>
      <div class="workspace-group-body">
        <StrategyOverview />
        <ResourceEconomy />
        <StrategyWorkspace />
        <ExternalPerspective />
      </div>
    </details>
    <details id="system-workspace" class="workspace-group">
      <summary><span><small>SYSTEM & COORDINATION</small><strong>Settings and coordinator</strong></span><b>Open workspace</b></summary>
      <div class="workspace-group-body">
        <CampaignSettings />
        <CoordinatorConsole />
      </div>
    </details>
    </section>
    </details>
  {/if}
</main>
<style>.campaign-library{border-top:1px solid #36513d;margin-top:12px}.campaign-library>summary{cursor:pointer;padding:24px 8px;font-size:17px;color:#d8e8d4}.campaign-library>summary span{font-size:12px;color:#93ab9b;margin-left:20px}@media(max-width:600px){.campaign-library>summary span{display:block;margin:8px 0 0}}</style>
