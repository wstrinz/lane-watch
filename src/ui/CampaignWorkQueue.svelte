<script lang="ts">
 import { campaignState } from './campaign-state';
 let expanded=false;
 $: project=$campaignState.control?.projects?.find(p=>p.id===$campaignState.selectedProject);
 $: queue=project?.workQueue;
 $: remaining=queue?.items?.filter((i:any)=>i.status!=='done')||[];
 $: preview=remaining.filter((i:any)=>i.status==='active'||i.status==='ready').slice(0,3);
</script>
{#if queue}
 <details class="campaign-work-queue" bind:open={expanded}>
  <summary><span><strong>{queue.title}</strong><small>{queue.error || remaining.length+' items remaining · '+queue.cadenceMinutes+' min heartbeat plan'}</small></span><span>{expanded?'Close queue':'View queue'}</span></summary>
  {#if !queue.error}
   <p class="queue-context">Planned coordination until {new Date(queue.cutoffAt).toLocaleString()}. Queue status is recorded by the coordinator; launch and evidence decisions use the campaign controls above.</p>
   <ol>{#each queue.items as item (item.id)}<li class:done={item.status==='done'}><span class="queue-status">{item.status}</span><div><strong>{item.title}</strong><p>{item.detail}</p>{#if item.dependsOn.length}<small>Depends on {item.dependsOn.join(', ')}</small>{/if}</div><small>{item.kind}</small></li>{/each}</ol>
   <small class="queue-updated">Updated {new Date(queue.updatedAt).toLocaleString()} · planning context</small>
  {/if}
 </details>
 {#if !expanded && preview.length}<p class="queue-preview">Up next: {preview.map((i:any)=>i.title).join(' · ')}</p>{/if}
{/if}
<style>
 .campaign-work-queue{margin:1.25rem 0 0;border:1px solid #385646;border-radius:12px;background:#101e17;color:#e2ece5}.campaign-work-queue summary{display:flex;justify-content:space-between;align-items:center;gap:1rem;padding:1rem 1.25rem;cursor:pointer}.campaign-work-queue summary strong,.campaign-work-queue summary small{display:block}.campaign-work-queue summary small{color:#a4baac;margin-top:.3rem}.campaign-work-queue summary>span:last-child{font-size:.8rem;color:#b7ccbe;white-space:nowrap}.queue-context{padding:0 1.25rem;color:#b7ccbe;font-size:.9rem;line-height:1.5}.campaign-work-queue ol{list-style:none;padding:0 1.25rem;margin:0}.campaign-work-queue li{display:grid;grid-template-columns:4rem 1fr auto;gap:.7rem;padding:1rem 0;border-top:1px solid #2e4738}.campaign-work-queue li p{margin:.4rem 0;font-size:.9rem;line-height:1.5;color:#b7ccbe}.campaign-work-queue li small{color:#99b29f}.queue-status{text-transform:uppercase;font-size:.7rem;color:#e6c67a}.campaign-work-queue li.done{opacity:.7}.queue-updated{display:block;padding:1rem 1.25rem;color:#99b29f}.queue-preview{font-size:.8rem;line-height:1.5;color:#abc1b2;margin:.6rem 1rem 1.25rem}@media(max-width:600px){.campaign-work-queue li{grid-template-columns:3rem 1fr}.campaign-work-queue li>small{display:none}.campaign-work-queue summary{padding:1rem}}
</style>
