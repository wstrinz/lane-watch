<script lang="ts">
 import { campaignState } from './campaign-state';
 import { onDestroy } from 'svelte';
 import type { QueueResultDocument } from '../queue-result-reader';
 import ResultDocument from './ResultDocument.svelte';
 let expanded=false;
 let dialog:HTMLDialogElement;
 let reading:QueueResultDocument|null=null,readingTitle='',readError='',loading=false,source=false,openedProject='';
 let request:AbortController|null=null;
 function closeResult(){request?.abort();request=null;reading=null;openedProject='';}
 async function openResult(itemId:string,result:any){
  request?.abort();const pending=new AbortController();request=pending;
  reading=null;readError='';readingTitle=result.title;loading=true;source=false;openedProject=project?.id||'';
  dialog.showModal();
  try{
   const query=new URLSearchParams({project:openedProject,item:itemId,result:result.id});
   const response=await fetch('/api/queue-result?'+query,{signal:pending.signal,cache:'no-store'});
   const body=await response.json();
   if(!response.ok)throw Error(body.error||'Could not read result');
   if(request===pending)reading=body;
  }catch(error){if(request===pending&&!pending.signal.aborted)readError=error instanceof Error?error.message:'Could not read result';}
  finally{if(request===pending)loading=false;}
 }
 onDestroy(()=>request?.abort());
 $: project=$campaignState.control?.projects?.find(p=>p.id===$campaignState.selectedProject);
 $: queue=project?.workQueue;
 $: remaining=queue?.items?.filter((i:any)=>i.status!=='done')||[];
 $: preview=remaining.filter((i:any)=>i.status==='active'||i.status==='ready').slice(0,3);
 const order:Record<string,number>={active:0,ready:1,held:2,done:3};
 $: ordered=[...(queue?.items||[])].sort((a:any,b:any)=>order[a.status]-order[b.status]);
 $: if(openedProject&&project?.id!==openedProject)dialog?.close();
</script>
{#if queue}
 <details id="campaign-work-queue" class="campaign-work-queue" ontoggle={(event)=>expanded=event.currentTarget.open}>
  <summary><span><strong>{queue.title}</strong><small>{queue.error || remaining.length+' items remaining · '+queue.cadenceMinutes+' min heartbeat plan'}</small></span><span>{expanded?'Close queue':'View queue'}</span></summary>
  {#if !queue.error}
   <p class="queue-context">Planned coordination until {new Date(queue.cutoffAt).toLocaleString()}. Queue status is recorded by the coordinator; launch and evidence decisions use the campaign controls above.</p>
   <ol>{#each ordered as item (item.id)}<li class:done={item.status==='done'}><span class="queue-status">{item.status}</span><div><strong>{item.title}</strong><p>{item.detail}</p>{#if item.dependsOn.length}<small>Depends on {item.dependsOn.join(', ')}</small>{/if}{#if item.results?.length}<div class="queue-results">{#each item.results as result}<button onclick={()=>openResult(item.id,result)}>Read {result.title}</button>{/each}</div>{/if}</div><small>{item.kind}</small></li>{/each}</ol>
   <small class="queue-updated">Updated {new Date(queue.updatedAt).toLocaleString()} · planning context</small>
  {/if}
 </details>
 {#if !expanded && preview.length}<p class="queue-preview">Up next: {preview.map((i:any)=>i.title).join(' · ')}</p>{/if}
{/if}
<dialog class="queue-result-dialog" bind:this={dialog} onclose={closeResult} aria-labelledby="queue-result-title">
 <header><div><small>SAVED CAMPAIGN RESULT</small><h2 id="queue-result-title">{readingTitle}</h2></div><button aria-label="Close result" onclick={()=>dialog.close()}>Close</button></header>
 <div class="result-body" aria-busy={loading}>
  {#if loading}<p role="status">Reading the recorded result…</p>{:else if readError}<p role="alert">{readError}</p>{:else if reading}
   <details class="result-provenance"><summary>Source details · file hash verified</summary><p>{reading.path}</p><p>Commit {reading.revision}<br/>SHA-256 {reading.sha256}</p><p>This check verifies the recorded file. Research scope and acceptance are described in the document.</p><button onclick={()=>source=!source}>{source?'Return to reading view':'View Markdown source'}</button></details>
   {#if source}<pre class="result-source">{reading.content}</pre>{:else}<ResultDocument content={reading.content}/>{/if}
  {/if}
 </div>
</dialog>
<style>
 .queue-results{display:flex;flex-wrap:wrap;gap:.5rem;margin-top:.65rem}.queue-results button,.queue-result-dialog button{font:inherit;font-size:.85rem;border:1px solid #567d64;background:#213c2c;color:#e4f1e8;border-radius:7px;padding:.55rem .8rem;cursor:pointer}.queue-result-dialog{width:min(850px,calc(100vw - 32px));max-height:calc(100dvh - 32px);padding:0;border:1px solid #567d64;border-radius:14px;color:#e4f1e8;background:#122219}.queue-result-dialog::backdrop{background:#020a06bc}.queue-result-dialog>header{position:sticky;top:0;z-index:1;display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:1rem 1.5rem;background:#192f22;border-bottom:1px solid #385646}.queue-result-dialog h2{font-size:1.15rem;margin:.3rem 0}.queue-result-dialog header small{font-size:.65rem;letter-spacing:.1em;color:#a2c3ae}.queue-result-dialog header button{flex-shrink:0}.result-body{padding:1rem 2rem 2rem;min-height:8rem}.result-provenance{font-size:.8rem;color:#adc6b5;margin:.1rem 0 1.5rem;overflow-wrap:anywhere;line-height:1.5}.result-provenance summary{cursor:pointer}.result-source{white-space:pre-wrap;overflow-wrap:anywhere;font-size:.9rem;line-height:1.6}@media(max-width:600px){.queue-result-dialog{width:calc(100vw - 12px);max-height:calc(100dvh - 12px)}.queue-result-dialog>header{padding:1rem}.result-body{padding:1rem}.queue-results button{min-height:44px}}
 .campaign-work-queue{margin:1.25rem 0 0;border:1px solid #385646;border-radius:12px;background:#101e17;color:#e2ece5}.campaign-work-queue summary{display:flex;justify-content:space-between;align-items:center;gap:1rem;padding:1rem 1.25rem;cursor:pointer}.campaign-work-queue summary strong,.campaign-work-queue summary small{display:block}.campaign-work-queue summary small{color:#a4baac;margin-top:.3rem}.campaign-work-queue summary>span:last-child{font-size:.8rem;color:#b7ccbe;white-space:nowrap}.queue-context{padding:0 1.25rem;color:#b7ccbe;font-size:.9rem;line-height:1.5}.campaign-work-queue ol{list-style:none;padding:0 1.25rem;margin:0}.campaign-work-queue li{display:grid;grid-template-columns:4rem 1fr auto;gap:.7rem;padding:1rem 0;border-top:1px solid #2e4738}.campaign-work-queue li p{margin:.4rem 0;font-size:.9rem;line-height:1.5;color:#b7ccbe}.campaign-work-queue li small{color:#99b29f}.queue-status{text-transform:uppercase;font-size:.7rem;color:#e6c67a}.campaign-work-queue li.done{opacity:.7}.queue-updated{display:block;padding:1rem 1.25rem;color:#99b29f}.queue-preview{font-size:.8rem;line-height:1.5;color:#abc1b2;margin:.6rem 1rem 1.25rem}@media(max-width:600px){.campaign-work-queue li{grid-template-columns:3rem 1fr}.campaign-work-queue li>small{display:none}.campaign-work-queue summary{padding:1rem}}
</style>
