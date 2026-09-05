import {expect,test} from 'bun:test';
import {watchResearchRuntime,type ResearchWatchLease} from '../src/research-runtime-watch';
import {boundedResearchWatchPort} from '../src/bounded-research-watch-port';
import {observeOwnedProcessExit} from '../src/owned-process-exit';

test('failed job record cannot hide a live owned process; watcher stops and verifies its handle',async()=>{
 // Deliberately finite, no network, no model, no child creation. The owned
 // spawn handle covers this fixture's entire scope, not a native daemon tree.
 const child=Bun.spawn([process.execPath,'-e','setTimeout(()=>{},30000)'],
  {stdin:'ignore',stdout:'ignore',stderr:'ignore',windowsHide:true});
 const physical=observeOwnedProcessExit(child);
 const lease:ResearchWatchLease={jobId:'abc12345',sessionId:'abc12345-0000-4000-8000-000000000000',
  worktree:process.cwd(),startedAt:new Date().toISOString(),deadlineAt:new Date(Date.now()+10000).toISOString(),
  tokenCap:100,tokenMetric:'output-tokens',pollMs:25,telemetryGraceMs:100};
 const checks:boolean[]=[],stops:string[]=[],events:string[]=[];
 try{
  expect(child.exitCode).toBeNull();
  const result=await watchResearchRuntime(lease,boundedResearchWatchPort({
   now:Date.now,monotonicNow:()=>performance.now(),wait:ms=>Bun.sleep(ms),
   observe:async()=>({jobId:lease.jobId,sessionId:lease.sessionId,worktree:lease.worktree,
    createdAt:lease.startedAt,state:'failed',observedTokens:0}),
   verifyExit:async id=>{expect(id).toBe(lease.jobId);const exited=physical.hasExited();checks.push(exited);return exited;},
   stop:async id=>{expect(id).toBe(lease.jobId);stops.push(id);child.kill();await physical.settled;},
   record:async event=>{events.push(event.type);},
  }));
  expect(result).toMatchObject({status:'terminal',reason:'physical-exit-unconfirmed',stopAttempts:1});
  // Failed job state does not become "confirmed cancellation" merely because
  // the fallback stop worked; physical exit and native outcome stay distinct.
  expect(physical.hasExited()).toBe(true);expect(physical.isRunning()).toBe(false);expect(checks).toEqual([false,true]);
  expect(stops).toEqual([lease.jobId]);expect(events.at(-1)).toBe('watch.terminal');
 }finally{if(!physical.hasExited())child.kill();await physical.settled;}
},15000);
