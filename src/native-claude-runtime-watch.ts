import {appendFile,readFile} from 'node:fs/promises';
import {join} from 'node:path';
import {watchResearchRuntime,observationMatchesLease,validateResearchWatchLease,type ResearchWatchLease,type ResearchWatchPort} from './research-runtime-watch';

/** Native adapter for a previously bound job, not a launcher. Callers must own
 * the lease and retain its event log. No signal is sent to guessed PIDs. */
export function nativeClaudeWatchPort(lease: ResearchWatchLease, options: {claudeHome:string;executable:string;eventPath:string}): ResearchWatchPort {
  validateResearchWatchLease(lease);
  if(lease.tokenMetric!=='daemon-reported')throw Error('Native daemon counters cannot be relabeled as output tokens');
  const observe:ResearchWatchPort['observe']=async jobId=>{
    if(jobId!==lease.jobId)throw Error('Watch cannot observe a different job');
    try{
      const s=JSON.parse(await readFile(join(options.claudeHome,'jobs',jobId,'state.json'),'utf8'));
      if(!s||['sessionId','cwd','createdAt','state'].some(key=>typeof s[key]!=='string'))return null;
      return {jobId,sessionId:s.sessionId,worktree:s.cwd,createdAt:s.createdAt,state:s.state,observedTokens:typeof s.tokens==='number'?s.tokens:null};
    }catch{return null;}
  };
  return {now:Date.now,monotonicNow:()=>performance.now(),observe,wait:ms=>Bun.sleep(ms),record:async e=>{await appendFile(options.eventPath,JSON.stringify(e)+'\n');},stop:async jobId=>{
    const observed=await observe(jobId);
    if(!observed||!observationMatchesLease(lease,observed))throw Error('Exact identity could not be revalidated immediately before stop');
    const child=Bun.spawn([options.executable,'stop',jobId],{env:{...process.env,CLAUDE_CONFIG_DIR:options.claudeHome},stdout:'ignore',stderr:'ignore',windowsHide:true});
    const timeout=setTimeout(()=>child.kill(),10_000);
    try{const code=await child.exited;if(code!==0)throw Error('Native stop did not confirm success');}finally{clearTimeout(timeout);}
  }};
}
if(import.meta.main){
  const [leasePath,claudeHome,executable,eventPath]=process.argv.slice(2);
  if(!leasePath||!claudeHome||!executable||!eventPath)throw Error('Usage: bun src/native-claude-runtime-watch.ts LEASE_JSON CLAUDE_HOME CLAUDE_EXE EVENT_JSONL');
  const lease=JSON.parse(await readFile(leasePath,'utf8'));
  const result=await watchResearchRuntime(lease,nativeClaudeWatchPort(lease,{claudeHome,executable,eventPath}));
  console.log(JSON.stringify(result));if(result.status==='attention'||result.auditWriteFailures?.length)process.exitCode=2;
}
