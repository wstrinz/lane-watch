import {expect,test,afterEach} from 'bun:test';
import {Database} from 'bun:sqlite';
import {mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {basename,join,resolve,sep} from 'node:path';
import {ResearchWatchStore} from '../src/research-watch-store';
import {runDurableResearchWatch} from '../src/durable-research-watch';
import {watchResearchRuntime,type ResearchWatchLease,type ResearchWatchObservation,type ResearchWatchPort} from '../src/research-runtime-watch';

const lease:ResearchWatchLease={jobId:'abc12345',sessionId:'abc12345-0000-4000-8000-000000000000',worktree:'C:/campaign/work',startedAt:'2026-09-05T00:00:00Z',deadlineAt:'2026-09-05T00:01:00Z',tokenCap:100,tokenMetric:'daemon-reported',pollMs:100,telemetryGraceMs:300};
const dirs:string[]=[];
function dbPath(){const dir=mkdtempSync(join(tmpdir(),'lane-watch-lease-test-'));dirs.push(dir);return join(dir,'watch.sqlite');}
afterEach(()=>{for(const dir of dirs.splice(0)){const absolute=resolve(dir);if(!absolute.startsWith(resolve(tmpdir())+sep)||!basename(absolute).startsWith('lane-watch-lease-test-'))throw Error('Unexpected cleanup target');rmSync(absolute,{recursive:true,force:true});}});
function port(tokens=1){
 let stopped=false,now=Date.parse(lease.startedAt);const stops:string[]=[];
 const observation=():ResearchWatchObservation=>({jobId:lease.jobId,sessionId:lease.sessionId,worktree:lease.worktree,createdAt:lease.startedAt,state:stopped?'stopped':'working',observedTokens:tokens});
 const value:ResearchWatchPort={now:()=>now,monotonicNow:()=>now,observe:async()=>observation(),verifyExit:async()=>stopped,stop:async id=>{stops.push(id);stopped=true;},wait:async ms=>{now+=ms;},record:async()=>{}};
 return {stops,value};
}

test('lease identity, token cap and original deadline cannot be rebound',()=>{
 const store=new ResearchWatchStore(dbPath());try{
  store.bind(lease);store.bind({...lease});
  for(const change of [{tokenCap:101},{tokenCap:99},{deadlineAt:'2026-09-05T00:02:00Z'},{worktree:'C:/other'}])expect(()=>store.bind({...lease,...change})).toThrow('frozen runtime bounds');
  expect(store.snapshot(lease.sessionId).lease).toEqual(lease);
 }finally{store.close();}
});
test('two connections cannot claim a potentially live monitor',()=>{
 const path=dbPath(),a=new ResearchWatchStore(path,{ownerPid:101,isAlive:()=>true}),b=new ResearchWatchStore(path,{ownerPid:202,isAlive:()=>true});
 try {a.bind(lease);a.claim(lease.sessionId);expect(()=>b.claim(lease.sessionId)).toThrow('may still be alive');expect(b.snapshot(lease.sessionId).generation).toBe(1);}
 finally{a.close();b.close();}
});
test('death recovery preserves the high-water mark and rejects the old owner nonce',()=>{
 const path=dbPath(),a=new ResearchWatchStore(path,{ownerPid:101,isAlive:()=>false});
 a.bind(lease);const old=a.claim(lease.sessionId);a.checkpoint(old,{observedTokens:80,at:lease.startedAt,state:'working'});a.close();
 const b=new ResearchWatchStore(path,{ownerPid:202,isAlive:()=>false});try{
  const next=b.claim(lease.sessionId);expect(next).toMatchObject({recovered:true,generation:2,observedTokens:80});expect(next.lease).toEqual(lease);
  expect(()=>b.checkpoint(old,{observedTokens:0,at:lease.startedAt,state:'working'})).toThrow('ownership changed');
  b.checkpoint(next,{observedTokens:20,at:lease.startedAt,state:'working'});expect(b.snapshot(lease.sessionId).observedTokens).toBe(80);
 }finally{b.close();}
});
test('recovered monitor stops the exact job immediately instead of granting remaining time',async()=>{
 const path=dbPath(),a=new ResearchWatchStore(path,{ownerPid:101,isAlive:()=>false});
 a.bind(lease);const claim=a.claim(lease.sessionId);a.checkpoint(claim,{observedTokens:80,at:lease.startedAt,state:'working'});a.close();
 const b=new ResearchWatchStore(path,{ownerPid:202,isAlive:()=>false}),fake=port(20);
 try {
  const result=await runDurableResearchWatch(lease,b,fake.value);
  expect(result).toMatchObject({status:'stopped',reason:'supervisor-recovery',observedTokens:80,stopAttempts:1});
  expect(fake.stops).toEqual([lease.jobId]);expect(b.snapshot(lease.sessionId)).toMatchObject({phase:'terminal',generation:2,observedTokens:80});
  expect(()=>b.claim(lease.sessionId)).toThrow('require review');
 }finally{b.close();}
});
test('attention remains held and does not become an automatic retry loop',async()=>{
 const store=new ResearchWatchStore(dbPath());const fake=port();fake.value.observe=async()=>null;
 try {const result=await runDurableResearchWatch(lease,store,fake.value);expect(result.status).toBe('attention');expect(store.snapshot(lease.sessionId).phase).toBe('attention');expect(()=>store.claim(lease.sessionId)).toThrow('require review');expect(fake.stops).toEqual([]);}
 finally{store.close();}
});
test('failed durable checkpoint still stops an exactly owned job and reports unconfirmed persistence',async()=>{
 const fake=port();fake.value.checkpoint=async()=>{throw Error('disk unavailable');};
 const result=await watchResearchRuntime(lease,fake.value);
 expect(result).toMatchObject({status:'stopped',reason:'checkpoint-unavailable',stopAttempts:1});
 expect(fake.stops).toEqual([lease.jobId]);expect(result.auditWriteFailures?.some(e=>e.type==='watch.checkpoint')).toBe(true);
});
test('recovery validates ownership before stopping a mismatched native job',async()=>{
 const fake=port();const observe=fake.value.observe;
 fake.value.observe=async id=>({...(await observe(id))!,sessionId:'abc12345-1111-4000-8000-000000000000'});
 const result=await watchResearchRuntime(lease,fake.value,{observedTokens:80,recovered:true});
 expect(result).toMatchObject({status:'attention',reason:'identity-mismatch',observedTokens:80});expect(fake.stops).toEqual([]);
});

test('durable stop and terminal events survive an external audit sink that hangs',async()=>{
 const path=dbPath(),store=new ResearchWatchStore(path),fake=port();let calls=0;
 fake.value.record=()=>{calls++;return new Promise(()=>{});};
 try {
  const result=await runDurableResearchWatch(lease,store,fake.value);
  expect(result).toMatchObject({status:'stopped',reason:'audit-unavailable',stopAttempts:1});
  expect(calls).toBe(1);expect(result.auditWriteFailures).toHaveLength(3);
  expect(store.snapshot(lease.sessionId).phase).toBe('terminal');
  const reader=new Database(path,{readonly:true});try{
   const events=reader.query('SELECT event_json FROM research_watch_events ORDER BY sequence').all() as {event_json:string}[];
   expect(events.map(x=>JSON.parse(x.event_json).type)).toEqual(['monitor.claimed','watch.started','watch.stop-requested','watch.terminal']);
  }finally{reader.close();}
 }finally{store.close();}
});

test('monitor readiness follows exact working-job verification and precedes watch execution',async()=>{
 const store=new ResearchWatchStore(dbPath()),fixture=port(100);let ready=0;
 try{
  const result=await runDurableResearchWatch(lease,store,fixture.value,async claim=>{
   ready++;expect(claim.lease).toEqual(lease);expect(fixture.stops).toEqual([]);
  });
  expect(ready).toBe(1);expect(result.status).toBe('stopped');
 }finally{store.close();}
});
test('mismatched initial observation cannot issue a monitor-ready receipt',async()=>{
 const store=new ResearchWatchStore(dbPath()),fixture=port();let ready=0;
 const original=fixture.value.observe;fixture.value.observe=async id=>{const observed=await original(id);if(!observed)throw Error('Missing fixture observation');return {...observed,sessionId:'different-session'};};
 try{
  await expect(runDurableResearchWatch(lease,store,fixture.value,async()=>{ready++;})).rejects.toThrow('verified');
  expect(ready).toBe(0);expect(fixture.stops).toEqual([]);
 }finally{store.close();}
});
