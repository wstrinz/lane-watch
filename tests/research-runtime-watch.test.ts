import {expect,test} from 'bun:test';
import {watchResearchRuntime,validateResearchWatchLease,observationMatchesLease,type ResearchWatchLease,type ResearchWatchObservation} from '../src/research-runtime-watch';
const lease:ResearchWatchLease={jobId:'abc12345',sessionId:'abc12345-0000-4000-8000-000000000000',worktree:'C:/campaign/work',startedAt:'2026-09-05T00:00:00Z',deadlineAt:'2026-09-05T00:01:00Z',tokenCap:100,tokenMetric:'daemon-reported',pollMs:100,telemetryGraceMs:300};
const observation=(changes:Partial<ResearchWatchObservation>={}):ResearchWatchObservation=>({jobId:lease.jobId,sessionId:lease.sessionId,worktree:lease.worktree,createdAt:lease.startedAt,state:'working',observedTokens:1,...changes});
function harness(values:Array<ResearchWatchObservation|null>,stopWorks=true,start=Date.parse(lease.startedAt)) {
 let now=start,index=0,stopped=false;const stops:string[]=[],events:any[]=[];
 return {stops,events,port:{now:()=>now,monotonicNow:()=>now,observe:async()=>stopped?observation({state:'stopped',observedTokens:100}):values[Math.min(index++,values.length-1)],verifyExit:async()=>stopped||values[Math.min(index-1,values.length-1)]?.state==='done',stop:async(id:string)=>{stops.push(id);stopped=stopWorks;},wait:async(ms:number)=>{now+=ms;},record:async(e:any)=>{events.push(e);}}};
}
test('threshold stops exact identity and confirms terminal state without restarting',async()=>{const h=harness([observation({observedTokens:80}),observation({observedTokens:105})]);expect(await watchResearchRuntime(lease,h.port)).toMatchObject({status:'stopped',reason:'token-threshold',stopAttempts:1,observedTokens:105});expect(h.stops).toEqual([lease.jobId]);});
test('deadline works independently of missing token telemetry',async()=>{const h=harness([observation({observedTokens:null})],true,Date.parse(lease.deadlineAt));expect(await watchResearchRuntime(lease,h.port)).toMatchObject({status:'stopped',reason:'deadline'});});
test('a transient missing observation rechecks the same job; sustained missing ownership never stops another job',async()=>{let h=harness([null,observation({state:'done'})]);expect((await watchResearchRuntime(lease,h.port)).status).toBe('terminal');expect(h.stops).toEqual([]);h=harness([null]);expect((await watchResearchRuntime(lease,h.port)).reason).toBe('telemetry-unavailable');expect(h.stops).toEqual([]);});
test('mismatched session/worktree/creation identity is never stopped',async()=>{for(const change of [{sessionId:'abc12345-1111-4000-8000-000000000000'},{worktree:'C:/unrelated'},{createdAt:'2026-09-04T00:00:00Z'}]){const h=harness([observation(change)]);expect((await watchResearchRuntime(lease,h.port)).reason).toBe('identity-mismatch');expect(h.stops).toEqual([]);}});
test('confirmed ownership with missing usage or regressed counter fails closed',async()=>{for(const values of [[observation({observedTokens:null})],[observation({observedTokens:60}),observation({observedTokens:50})]]){const h=harness(values);expect((await watchResearchRuntime(lease,h.port)).status).toBe('stopped');expect(h.stops).toHaveLength(1);}});
test('unsuccessful stop is bounded and remains unconfirmed',async()=>{const h=harness([observation({observedTokens:101})],false);expect(await watchResearchRuntime(lease,h.port)).toMatchObject({status:'attention',reason:'stop-unconfirmed:token-threshold',stopAttempts:2});});

test('terminal job state without independent exit evidence never confirms completion',async()=>{
 for(const state of ['failed','stopped','done','crashed']){
  const h=harness([observation({state})],false);
  const {verifyExit,...withoutEvidence}=h.port;
  const result=await watchResearchRuntime(lease,withoutEvidence);
  expect(result).toMatchObject({status:'attention',reason:'stop-unconfirmed:physical-exit-unconfirmed',stopAttempts:2});
  expect(h.stops).toEqual([lease.jobId,lease.jobId]);
  expect(h.events.some(e=>e.type==='watch.terminal')).toBe(false);
 }
});

test('terminal state with failed exit verification remains unconfirmed even after stop success',async()=>{
 for(const verifyExit of [async()=>false,async():Promise<boolean>=>{throw Error('exit evidence unavailable');}]){
  const h=harness([observation({state:'failed'})]);
  h.port.verifyExit=verifyExit;
  expect(await watchResearchRuntime(lease,h.port)).toMatchObject({status:'attention',stopAttempts:2});
 }
});
test('invalid budgets/identities are rejected before monitoring',()=>{for(const change of [{tokenCap:NaN},{tokenCap:-1},{jobId:'all'},{worktree:'relative'},{pollMs:0}])expect(()=>validateResearchWatchLease({...lease,...change})).toThrow();});

test('wall-clock rollback cannot extend the deadline',async()=>{const h=harness([observation()]);let wall=Date.parse(lease.startedAt);h.port.now=()=>wall;const wait=h.port.wait;h.port.wait=async ms=>{wall-=ms;await wait(ms);};expect(await watchResearchRuntime(lease,h.port)).toMatchObject({status:'stopped',reason:'deadline',stopAttempts:1});});

test('natural completion after a stop request is not reported as confirmed cancellation',async()=>{const h=harness([observation({observedTokens:101}),observation({state:'done',observedTokens:101})],false);expect(await watchResearchRuntime(lease,h.port)).toMatchObject({status:'terminal',stopAttempts:1});});

test('malformed observation fails ownership checks without throwing or stopping',async()=>{const h=harness([observation({worktree:undefined as any})]);expect(await watchResearchRuntime(lease,h.port)).toMatchObject({status:'attention',reason:'identity-mismatch'});expect(h.stops).toEqual([]);});

test('path ownership respects POSIX case while accepting Windows drive spelling',()=>{
 expect(observationMatchesLease(lease,observation({worktree:'c:\\CAMPAIGN\\work\\'}))).toBe(true);
 const posix={...lease,worktree:'/home/research/Work'};
 expect(observationMatchesLease(posix,observation({worktree:'/home/research/work'}))).toBe(false);
 expect(observationMatchesLease(posix,observation({worktree:'/home/research/Work/'}))).toBe(true);
 expect(observationMatchesLease(posix,observation({worktree:'/home/research\\Work'}))).toBe(false);
});

test('deadline is checked after a slow observation without another research polling cycle',async()=>{
 const h=harness([observation()]);let now=Date.parse(lease.startedAt),reads=0;const original=h.port.observe;
 h.port.now=()=>now;h.port.monotonicNow=()=>now;
 h.port.observe=async()=>{reads++;now=Date.parse(lease.deadlineAt);return original();};
 const wait=h.port.wait;h.port.wait=async ms=>{expect(h.stops).toHaveLength(1);await wait(ms);};
 expect(await watchResearchRuntime(lease,h.port)).toMatchObject({status:'stopped',reason:'deadline'});expect(reads).toBe(2);
});


test('audit sink failure requests a bounded stop and returns unconfirmed events',async()=>{
 const h=harness([observation()]);h.port.record=async()=>{throw Error('disk unavailable');};
 const result=await watchResearchRuntime(lease,h.port);
 expect(result).toMatchObject({status:'stopped',reason:'audit-unavailable',stopAttempts:1});
 expect(h.stops).toEqual([lease.jobId]);
 expect(result.auditWriteFailures?.map(e=>e.type)).toEqual(['watch.started','watch.stop-requested','watch.terminal']);
});
test('failed stop-event persistence cannot prevent the exact stop or hide the threshold',async()=>{
 const h=harness([observation({observedTokens:101})]);const record=h.port.record;
 h.port.record=async e=>{if(e.type==='watch.stop-requested')throw Error('disk unavailable');await record(e);};
 const result=await watchResearchRuntime(lease,h.port);
 expect(result).toMatchObject({status:'stopped',reason:'token-threshold',stopAttempts:1});
 expect(h.stops).toEqual([lease.jobId]);
 expect(result.auditWriteFailures).toHaveLength(1);
 expect(result.auditWriteFailures?.[0].reason).toBe('token-threshold');
});
test('audit failure does not bypass ownership or authorize a guessed stop',async()=>{
 for(const value of [null,observation({worktree:'C:/unrelated'})]){
  const h=harness([value]);h.port.record=async()=>{throw Error('disk unavailable');};
  const result=await watchResearchRuntime(lease,h.port);
  expect(result.status).toBe('attention');expect(h.stops).toEqual([]);
  expect(result.auditWriteFailures?.length).toBeGreaterThan(0);
 }
});
