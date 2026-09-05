import {readFile} from 'node:fs/promises';
import {watchResearchRuntime,observationMatchesLease,type ResearchWatchLease,type ResearchWatchPort,type ResearchWatchResult} from './research-runtime-watch';
import {nativeClaudeWatchPort} from './native-claude-runtime-watch';
import {ResearchWatchStore,type WatchClaim} from './research-watch-store';
import {boundedResearchWatchPort} from './bounded-research-watch-port';

/** Run in a dedicated monitor process. Unexpected failure must terminate that
 * process so recovery can distinguish it from a potentially live owner. */
export async function runDurableResearchWatch(lease:ResearchWatchLease,store:ResearchWatchStore,base:ResearchWatchPort,onReady?:(claim:WatchClaim)=>Promise<void>):Promise<ResearchWatchResult> {
 store.bind(lease);
 const claim=store.claim(lease.sessionId);
 const bounded=boundedResearchWatchPort(base);
 if(onReady&&!claim.recovered){
  const observed=await bounded.observe(lease.jobId);
  if(!observed||!observationMatchesLease(lease,observed)||observed.state!=='working')throw Error('Exact working job was not verified before monitor readiness');
  const event={type:'watch.ready',at:new Date(base.now()).toISOString(),jobId:lease.jobId,reason:'exact-working-job',observedTokens:observed.observedTokens};
  store.record(claim,event);await bounded.record(event);await onReady(claim);
 }
 const result=await watchResearchRuntime(claim.lease,{
  ...bounded,
  // The durable journal still receives later stop/terminal events even if the
  // external audit sink timed out and its own circuit is held closed.
  record:async event=>{store.record(claim,event);await bounded.record(event);},
  checkpoint:async state=>{store.checkpoint(claim,state);await bounded.checkpoint?.(state);},
 },{observedTokens:claim.observedTokens,recovered:claim.recovered});
 store.finish(claim,result);
 return result;
}
if(import.meta.main){
 const [leasePath,databasePath,claudeHome,executable,eventPath]=process.argv.slice(2);
 if(!leasePath||!databasePath||!claudeHome||!executable||!eventPath)throw Error('Usage: bun src/durable-research-watch.ts LEASE_JSON DATABASE CLAUDE_HOME CLAUDE_EXE EVENT_JSONL');
 const lease=JSON.parse(await readFile(leasePath,'utf8'));
 const store=new ResearchWatchStore(databasePath);
 try {
  const result=await runDurableResearchWatch(lease,store,nativeClaudeWatchPort(lease,{claudeHome,executable,eventPath}));
  console.log(JSON.stringify(result));
  if(result.status==='attention'||result.auditWriteFailures?.length)process.exitCode=2;
 }finally{store.close();}
}
