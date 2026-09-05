<script lang="ts">
 import {campaignState} from './campaign-state';
 import {settleCampaignAction} from './campaign-actions';
 export let oninspect=()=>{};
 let busy=false,error='';
 $: project=$campaignState.control?.projects?.find(p=>p.id===$campaignState.selectedProject);
 $: requests=(project?.researchRequests||[]).filter((r:any)=>r.waveId===project?.wave?.id&&r.status==='proposed');
 $: plan=project?.researchPlan;
 $: thinking=plan?.status==='drafting';
 $: checked=plan?.status==='drafted';
 $: held=checked&&plan?.response?.decision==='BLOCKED';
 $: blockers=(plan?.response?.quickChecks||[]).filter((check:any)=>check.status==='BLOCK');
 $: occupied=['working','active','running'].includes(project?.coordinator?.status);
 $: eligible=Boolean(project?.coordinationInterface?.capabilities?.plan)&&['BLOCKED','RESEARCH_REVIEW'].includes(project?.phase)&&requests.length>0;
 async function prepare(){
  if(!project||busy)return;const id=project.id;busy=true;error='';
  try{await settleCampaignAction({projectId:id,type:'research.review.start',scope:'review-plan-step'});}
  catch(e){if(project?.id===id)error=e instanceof Error?e.message:String(e);}
  finally{busy=false;}
 }
</script>
<section aria-label="Next planning step">
 <small>YOUR NEXT STEP</small>
 <h3>{thinking?'Your review plan is being prepared':held?'Reviews planned — execution setup needed':checked?'Your review plan is ready':'Prepare the review plan'}</h3>
 {#if thinking}<p>The coordinator is checking scope, dependencies, outputs and stop conditions. The result will appear here.</p>
 {:else if held}
 <p>The planning pass is complete. The reviews have not started.</p>
 <ul>{#each blockers as blocker}<li>{blocker.detail}</li>{/each}</ul>
 <ol>
  <li><strong>Implementation work — needed now.</strong> Finish and verify the worker’s token limits and deadline stop. This requires a code change; no approval button on this page performs it.</li>
  <li><strong>Your decision — after verification.</strong> Choose the next output-token budget and cutoff time.</li>
  <li><strong>Then resume research.</strong> Recheck the saved contracts and approve the bounded review run.</li>
 </ol>
 <p>Your two review questions are saved. You do not need to ask another adviser or prepare another plan to preserve them.</p>
 <details><summary>Read the held review plan</summary><p>{plan.response?.summary}</p>{#each plan.response?.lanes||[] as lane}<h4>{lane.question}</h4><p>{lane.evidenceExpected}</p><p>{lane.stopCondition}</p>{/each}</details>
 {:else if checked}<p>{plan.response?.summary||plan.response?.operatorGuidance||'Inspect the checked plan and its requirements before deciding what to run.'}</p><button onclick={oninspect}>Inspect checked plan →</button>
 {:else}
 <p>You’ve selected {requests.length} question{requests.length===1?'':'s'}. Next, have the coordinator turn them into a plan you can assess.</p>
 <ul>{#each requests as request}<li>{request.question}</li>{/each}</ul>
 <button disabled={!$campaignState.access?.canMutate||!eligible||!project?.coordinator?.attached||occupied||busy} onclick={prepare}>{busy?'Starting…':occupied?'Waiting for the coordinator…':'Prepare review plan'}</button>
 {#if !eligible}<p>Planning needs an aligned campaign and staged questions. Inspect the campaign controls for the current requirement.</p><button onclick={oninspect}>Inspect planning requirements →</button>{/if}
 {/if}
 <p class="boundary">This step prepares a plan; it does not run the reviews. Research execution still needs working resource enforcement and an authorized budget.</p>
 {#if error}<p role="alert">{error}</p>{/if}
</section>
<style>small{color:#a6c6ac;font:600 11px monospace;letter-spacing:.13em}h3{font-size:26px;line-height:1.25;margin:14px 0}p,li{line-height:1.6;color:#b9cbbf;font-size:14px}li{margin:10px 0}ul{padding-left:20px}button{background:#d5edb0;color:#14251a;border:0;border-radius:10px;padding:14px 20px;font-weight:650;cursor:pointer;margin:10px 0}button:disabled{opacity:.5;cursor:not-allowed}.boundary{font-size:12px}button:focus-visible{outline:2px solid #d5edb0;outline-offset:3px}[role=alert]{color:#ffc0a9}</style>
