import {readFile,writeFile} from 'node:fs/promises';
import {OutputRequestBudget} from './output-request-budget';
import {ResearchWatchStore} from './research-watch-store';
import {nativeClaudeWatchPort} from './native-claude-runtime-watch';
import {runDurableResearchWatch} from './durable-research-watch';
import {observationMatchesLease,validateResearchWatchLease,type ResearchWatchLease,type ResearchWatchPort} from './research-runtime-watch';

export function nativeOutputWatchPort(lease:ResearchWatchLease,budget:OutputRequestBudget,outputLeaseId:string,
 options:{claudeHome:string;executable:string;eventPath:string}):ResearchWatchPort {
 validateResearchWatchLease(lease);
 const original=budget.snapshot(outputLeaseId).contract,binding=budget.nativeBinding(outputLeaseId);
 if(lease.tokenMetric!=='output-tokens'||lease.tokenCap!==original.outputTokenCap||Date.parse(lease.deadlineAt)!==Date.parse(original.deadlineAt)
  ||!binding?.job||!observationMatchesLease(lease,{...binding.job,state:'working',observedTokens:0}))throw Error('Output monitor does not bind the original native allowance');
 // The native port supplies exact job state/stop routing only. Its daemon token
 // value is discarded and never labeled as output usage.
 const native=nativeClaudeWatchPort({...lease,tokenMetric:'daemon-reported'},options);
 return {...native,observe:async jobId=>{
  const observed=await native.observe(jobId);if(!observed)return null;
  return {...observed,observedTokens:budget.snapshot(outputLeaseId).reportedOutputTokens};
 }};
}

if(import.meta.main){
 const input=JSON.parse(await readFile(process.argv[2],'utf8'));
 if(input.schema!=='lane-watch-output-monitor/v1'||typeof input.readyNonce!=='string'||!input.readyNonce)throw Error('Invalid output-monitor envelope');
 const budget=new OutputRequestBudget(input.outputBudgetPath),watch=new ResearchWatchStore(input.watchDatabase);
 try{
  const binding=budget.nativeBinding(input.outputLeaseId);
  const port=nativeOutputWatchPort(input.lease,budget,input.outputLeaseId,input);
  const result=await runDurableResearchWatch(input.lease,watch,port,async claim=>{
   await writeFile(input.readyPath,JSON.stringify({schema:'lane-watch-output-monitor-ready/v1',readyNonce:input.readyNonce,
    jobDigest:binding!.jobDigest,monitorNonce:claim.nonce,pid:process.pid,outputLeaseId:input.outputLeaseId,deadlineAt:input.lease.deadlineAt}),{flag:'wx'});
  });
  console.log(JSON.stringify(result));if(result.status==='attention'||result.auditWriteFailures?.length)process.exitCode=2;
 }finally{watch.close();budget.close();}
}
