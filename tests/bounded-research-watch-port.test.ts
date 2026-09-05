import {expect,test} from 'bun:test';
import {boundedResearchWatchPort,type ResearchWatchIoLimits} from '../src/bounded-research-watch-port';
import {watchResearchRuntime,type ResearchWatchPort,type ResearchWatchLease,type ResearchWatchObservation} from '../src/research-runtime-watch';

const limits:ResearchWatchIoLimits={observationMs:5,auditMs:5,checkpointMs:5,stopMs:5,waitMs:5};
const lease:ResearchWatchLease={jobId:'abc12345',sessionId:'abc12345-0000-4000-8000-000000000000',worktree:'C:/campaign/work',startedAt:'2026-09-05T00:00:00Z',deadlineAt:'2026-09-05T00:01:00Z',tokenCap:100,tokenMetric:'daemon-reported',pollMs:100,telemetryGraceMs:300};
const never=()=>new Promise<never>(()=>{});
function harness(){
  let now=Date.parse(lease.startedAt),stopped=false;const stops:string[]=[];
  const observation=():ResearchWatchObservation=>({jobId:lease.jobId,sessionId:lease.sessionId,worktree:lease.worktree,createdAt:lease.startedAt,state:stopped?'stopped':'working',observedTokens:1});
  const port:ResearchWatchPort={now:()=>now,monotonicNow:()=>now,observe:async()=>observation(),verifyExit:async()=>stopped,stop:async id=>{stops.push(id);stopped=true;},record:async()=>{},wait:async ms=>{now+=ms;}};
  return {port,stops,observation};
}

test('a hanging audit sink cannot prevent an exact stop or accumulate pending writes',async()=>{
  const h=harness();let calls=0;h.port.record=()=>{calls++;return never();};
  const result=await watchResearchRuntime(lease,boundedResearchWatchPort(h.port,limits));
  expect(result).toMatchObject({status:'stopped',reason:'audit-unavailable',stopAttempts:1});
  expect(h.stops).toEqual([lease.jobId]);expect(calls).toBe(1);expect(result.auditWriteFailures).toHaveLength(3);
});
test('a hanging checkpoint requests a stop while retaining unconfirmed persistence',async()=>{
  const h=harness();let calls=0;h.port.checkpoint=()=>{calls++;return never();};
  const result=await watchResearchRuntime(lease,boundedResearchWatchPort(h.port,limits));
  expect(result).toMatchObject({status:'stopped',reason:'checkpoint-unavailable',stopAttempts:1});
  expect(calls).toBe(1);expect(result.auditWriteFailures?.every(x=>x.type==='watch.checkpoint')).toBe(true);
});
test('a hanging observation remains unknown ownership and never licenses a stop',async()=>{
  const h=harness();let calls=0;h.port.observe=()=>{calls++;return never();};
  const result=await watchResearchRuntime(lease,boundedResearchWatchPort(h.port,limits));
  expect(result).toMatchObject({status:'attention',reason:'telemetry-unavailable'});expect(h.stops).toEqual([]);expect(calls).toBe(1);
});
test('a hanging stop has no concurrent retry and is never reported as confirmed',async()=>{
  const h=harness();let calls=0;h.port.observe=async()=>({...h.observation(),observedTokens:101});h.port.stop=()=>{calls++;return never();};
  const result=await watchResearchRuntime(lease,boundedResearchWatchPort(h.port,limits));
  expect(result).toMatchObject({status:'attention',reason:'stop-unconfirmed:token-threshold',stopAttempts:2});expect(calls).toBe(1);
});
test('a late observation is discarded and cannot reopen a timed-out reader',async()=>{
  const h=harness();let resolveLate!:(value:ResearchWatchObservation)=>void;
  h.port.observe=()=>new Promise(resolve=>{resolveLate=resolve;});const bounded=boundedResearchWatchPort(h.port,limits);
  await expect(bounded.observe(lease.jobId)).rejects.toThrow('timed out');
  resolveLate(h.observation());await Promise.resolve();
  await expect(bounded.observe(lease.jobId)).rejects.toThrow('timed out');
});

test('hanging physical exit verification is bounded and cannot confirm a terminal record',async()=>{
 const h=harness();let calls=0;
 h.port.observe=async()=>({...h.observation(),state:'failed'});
 h.port.verifyExit=()=>{calls++;return never();};
 const result=await watchResearchRuntime(lease,boundedResearchWatchPort(h.port,limits));
 expect(result).toMatchObject({status:'attention',reason:'stop-unconfirmed:physical-exit-unconfirmed',stopAttempts:2});
 expect(calls).toBe(1);
});
test('a rejected observation can be retried; a timed-out poll wait exits for external recovery',async()=>{
  const h=harness();let calls=0;h.port.observe=async()=>{if(++calls===1)throw Error('transient read');return h.observation();};
  const bounded=boundedResearchWatchPort(h.port,limits);
  await expect(bounded.observe(lease.jobId)).rejects.toThrow('transient read');expect(await bounded.observe(lease.jobId)).toEqual(h.observation());
  h.port.wait=never;await expect(bounded.wait(100)).rejects.toThrow('timed out');
});
test('missing or nonfinite I/O limits are rejected before invoking an operation',()=>{
  const h=harness();for(const policy of [{...limits,stopMs:Infinity},{...limits,observationMs:0},{auditMs:5}])expect(()=>boundedResearchWatchPort(h.port,policy as ResearchWatchIoLimits)).toThrow();
});
