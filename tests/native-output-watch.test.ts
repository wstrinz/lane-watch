import {expect,test} from 'bun:test';
import {mkdtempSync,mkdirSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {OutputRequestBudget} from '../src/output-request-budget';
import {nativeOutputWatchPort} from '../src/native-output-watch';
import {nativeClaudeWatchPort} from '../src/native-claude-runtime-watch';
import type {ResearchWatchLease} from '../src/research-runtime-watch';
test('output monitor reads settled output ledger and never relabels the daemon counter',async()=>{
 const root=mkdtempSync(join(tmpdir(),'output-monitor-')),budget=new OutputRequestBudget(join(root,'budget.sqlite'));
 try{
  const preparedAt=new Date(Date.now()-1000).toISOString(),createdAt=new Date(Date.now()-500).toISOString(),deadlineAt=new Date(Date.now()+60000).toISOString();
  const job={jobId:'1234abcd',sessionId:'1234abcd-0000-4000-8000-000000000000',worktree:root,createdAt};
  budget.bindNative({leaseId:'original',launchDigest:'a'.repeat(64),outputTokenCap:100,deadlineAt},{worktree:root,preparedAt});
  const jobDigest=budget.bindNativeJob('original',job);budget.releaseNative('original',{jobDigest,monitorNonce:'fixture',pid:process.pid},()=>true);
  budget.reserve('original','request','b'.repeat(64),80);budget.settle('original','request','b'.repeat(64),{outputTokens:7,inputTokens:1000,cacheReadInputTokens:null,cacheCreationInputTokens:null});
  const home=join(root,'config'),stateDir=join(home,'jobs',job.jobId);mkdirSync(stateDir,{recursive:true});
  writeFileSync(join(stateDir,'state.json'),JSON.stringify({...job,cwd:root,state:'working',tokens:999999}));
  const lease:ResearchWatchLease={...job,startedAt:createdAt,deadlineAt,tokenCap:100,tokenMetric:'output-tokens',pollMs:100,telemetryGraceMs:1000};
  const options={claudeHome:home,executable:'not-executed',eventPath:join(root,'events')};
  const observed=await nativeOutputWatchPort(lease,budget,'original',options).observe(job.jobId);
  expect(observed?.observedTokens).toBe(7);
  expect(()=>nativeClaudeWatchPort(lease,options)).toThrow('relabeled');
  expect(()=>nativeOutputWatchPort({...lease,tokenCap:101},budget,'original',options)).toThrow('original');
 }finally{budget.close();rmSync(root,{recursive:true,force:true});}
});
