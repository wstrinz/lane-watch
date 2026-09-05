<script lang="ts">
 import {campaignState} from './campaign-state';
 $: project=$campaignState.control?.projects?.find(p=>p.id===$campaignState.selectedProject);
 $: runs=(project?.researchRuns||[]).filter((run:any)=>run.launchAttempt);
 const labels:Record<string,string>={prepared:'Prepared',entered:'Waiting for launch receipt',returned:'Launch receipt recorded',uncertain:'Outcome unverified',aborted:'Adapter was not entered'};
</script>
{#if runs.length}
 <section id="research-launch-attempts" class="launch-attempts">
  <h3>Recorded launch attempts</h3>
  {#each runs as run (run.id)}
   {@const attempt=run.launchAttempt}
   <details open={attempt.status==='uncertain'}>
    <summary><strong>{run.taskId}</strong><span>{labels[attempt.status]||attempt.status}</span></summary>
    {#if attempt.error}<p class="attempt-error">{attempt.error}</p>{/if}
    <p>Attempt {attempt.id}<br/>Run {run.id}</p>
    <p>Recorded {new Date(attempt.createdAt).toLocaleString()} · frozen deadline {new Date(attempt.deadlineAt).toLocaleString()}<br/>{Number(attempt.tokenBudget).toLocaleString()} reserved token units. Runtime enforcement remains unverified.</p>
    {#if attempt.receipt?.jobId}<p><strong>{attempt.status==='uncertain'?'Later receipt awaiting reconciliation':'Transport receipt'}</strong><br/>Job {attempt.receipt.jobId} · lane {attempt.receipt.laneId}<br/>{attempt.receipt.worktree}</p>{/if}
    <small>Frozen contract SHA-256 {attempt.specDigest}</small>
   </details>
  {/each}
 </section>
{/if}
<style>
 .launch-attempts{margin-bottom:1rem;scroll-margin-top:90px}.launch-attempts h3{font-size:1.05rem;margin:.5rem 0 1rem}.launch-attempts details{border:1px solid #45614e;border-radius:9px;padding:1rem;margin:.6rem 0;overflow-wrap:anywhere}.launch-attempts summary{display:flex;justify-content:space-between;gap:1rem;cursor:pointer}.launch-attempts summary span{color:#e4bc7d;font-size:.8rem}.launch-attempts p{font-size:.85rem;color:#b6cbbd;line-height:1.65}.launch-attempts .attempt-error{color:#ffb9a8}.launch-attempts small{font-size:.75rem;color:#91ac9c}@media(max-width:600px){.launch-attempts summary{display:grid;gap:.4rem}}
</style>
