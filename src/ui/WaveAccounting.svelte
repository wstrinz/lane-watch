<script lang="ts">
  import { campaignState } from "./campaign-state";
  import { settleCampaignAction, type CampaignProject as Project } from "./campaign-actions";

  let project: Project | null = null;
  let working = "";
  let feedback = "";
  let dispositions: Record<string, string> = {};
  let reasons: Record<string, string> = {};

  function setDisposition(id: string, value: string): void { dispositions = { ...dispositions, [id]: value }; }
  function setReason(id: string, value: string): void { reasons = { ...reasons, [id]: value }; }
  async function record(lane: any): Promise<void> {
    if (!project || working || !dispositions[lane.id]) return;
    working = lane.id;
    feedback = "Recording the bounded disposition…";
    try {
      await settleCampaignAction({ projectId: project.id, type: "lane.disposition.set", targetId: lane.id, args: { disposition: dispositions[lane.id], reason: reasons[lane.id] || "" }, scope: "wave-accounting" });
      feedback = "Disposition recorded. Synthesis readiness was recomputed mechanically.";
      dispositions = { ...dispositions, [lane.id]: "" };
      reasons = { ...reasons, [lane.id]: "" };
    } catch (error) { feedback = error instanceof Error ? error.message : String(error); }
    finally { working = ""; }
  }

  $: project = ($campaignState.control?.projects?.find((candidate) => candidate.id === $campaignState.selectedProject) as Project | undefined) || null;
  $: wave = project?.wave || null;
  $: lanes = Array.isArray(wave?.lanes) ? wave.lanes : [];
  $: accounting = wave?.accounting || null;
</script>

{#if project && wave && lanes.length}
  <details class="wave-accounting" id="wave-accounting">
    <summary><span><small>WAVE CUSTODY</small><strong>Source-lane accounting</strong></span><span class:attention={accounting && accounting.accounted < accounting.total}>{accounting ? `${accounting.accounted}/${accounting.total} accounted` : `${lanes.length} members`}</span></summary>
    <div class="wave-accounting-body">
      <div class="accounting-boundary"><strong>Mechanical disposition only</strong><p>Recording a repair, supersession, abandonment, or carry-forward closes custody accounting. It does not endorse the lane’s mathematics or promote a claim.</p></div>
      <ol>{#each lanes as lane (lane.id)}<li class:open={!lane.accounted}>
        <span class="accounting-state">{lane.accounted ? "ACCOUNTED" : lane.accountingState?.replaceAll("_", " ")}</span>
        <div><strong>{lane.task}</strong><small>{lane.lane} · {lane.host} · {lane.daemon} · {lane.landing}</small>{#if lane.disposition}<p><b>{lane.disposition}</b> · {lane.reason}</p>{/if}</div>
        {#if !lane.accounted}<div class="accounting-controls"><select value={dispositions[lane.id] || ""} onchange={(event) => setDisposition(lane.id, (event.currentTarget as HTMLSelectElement).value)}><option value="">Choose disposition</option><option value="REPAIR">Repair</option><option value="SUPERSEDE">Supersede</option><option value="ABANDON">Abandon</option><option value="CARRY_FORWARD">Carry forward</option></select><input value={reasons[lane.id] || ""} oninput={(event) => setReason(lane.id, (event.currentTarget as HTMLInputElement).value)} placeholder="Reason and evidence boundary" /><button class="primary-button" disabled={!dispositions[lane.id] || working === lane.id} onclick={() => record(lane)}>{working === lane.id ? "Recording…" : "Record"}</button></div>{/if}
      </li>{/each}</ol>
      {#if feedback}<div class="gate-feedback" role="status">{feedback}</div>{/if}
    </div>
  </details>
{/if}
