import {afterEach,expect,test} from 'bun:test';
import {mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {OutputRequestBudget} from '../src/output-request-budget';
import {observeOwnedProcessExit} from '../src/owned-process-exit';
const roots:string[]=[],stores:OutputRequestBudget[]=[];
afterEach(()=>{for(const s of stores.splice(0))s.close();for(const root of roots.splice(0))rmSync(root,{recursive:true,force:true});});
function fixture(){
 const root=mkdtempSync(join(tmpdir(),'native-gate-'));roots.push(root);const path=join(root,'budget.sqlite'),budget=new OutputRequestBudget(path);stores.push(budget);
 const contract={leaseId:'prepared-attempt',launchDigest:'a'.repeat(64),outputTokenCap:100,deadlineAt:new Date(Date.now()+60000).toISOString()};
 const preparation={worktree:root,preparedAt:new Date(Date.now()-1000).toISOString()};
 const job={jobId:'abc12345',sessionId:'abc12345-0000-4000-8000-000000000001',worktree:root,createdAt:new Date(Date.now()-500).toISOString()};
 budget.bindNative(contract,preparation);return {root,path,budget,contract,preparation,job};
}

test('a signal-terminated owned monitor cannot keep native admission open',async()=>{
 const {budget,contract,job}=fixture();
 const child=Bun.spawn([process.execPath,'-e','setTimeout(()=>{},30000)'],{stdin:'ignore',stdout:'ignore',stderr:'ignore',windowsHide:true});
 const owned=observeOwnedProcessExit(child);
 try{
  const jobDigest=budget.bindNativeJob(contract.leaseId,job);
  budget.releaseNative(contract.leaseId,{jobDigest,monitorNonce:'owned-fixture',pid:child.pid},owned.isRunning);
  budget.reserve(contract.leaseId,'before-signal','d'.repeat(64),80);
  child.kill();await owned.settled;
  expect(owned.hasExited()).toBe(true);expect(owned.isRunning()).toBe(false);
  expect(()=>budget.reserve(contract.leaseId,'after-signal','d'.repeat(64),1)).toThrow('gate');
  expect(budget.snapshot(contract.leaseId).remainingOutputTokens).toBe(20);
 }finally{if(!owned.hasExited())child.kill();await owned.settled;}
});

test('rejected process exit observation closes admission without asserting physical exit',async()=>{
 const owned=observeOwnedProcessExit({exited:Promise.reject(Error('unavailable')),exitCode:null,signalCode:null});
 await owned.settled;expect(owned.isRunning()).toBe(false);expect(owned.hasExited()).toBe(false);
});
test('native allowance is born closed and binding does not release or replace the cap',()=>{
 const {budget,contract,preparation,job}=fixture();
 expect(()=>budget.reserve(contract.leaseId,'early','b'.repeat(64),1)).toThrow('gate');
 budget.bindNative(contract,preparation);const digest=budget.bindNativeJob(contract.leaseId,job);
 expect(budget.bindNativeJob(contract.leaseId,job)).toBe(digest);
 expect(()=>budget.reserve(contract.leaseId,'still-early','b'.repeat(64),1)).toThrow('gate');
 expect(()=>budget.bindNativeJob(contract.leaseId,{...job,sessionId:'abc12345-0000-4000-8000-000000000002'})).toThrow('replace');
 expect(budget.snapshot(contract.leaseId).contract).toEqual(contract);
});
test('only the current owned monitor handle enables native admission; process loss closes it',()=>{
 const {budget,contract,job}=fixture();let alive=true;
 const jobDigest=budget.bindNativeJob(contract.leaseId,job),ready={jobDigest,monitorNonce:'monitor-one',pid:process.pid};
 expect(()=>budget.releaseNative(contract.leaseId,{...ready,jobDigest:'c'.repeat(64)},()=>true)).toThrow('bound');
 expect(()=>budget.releaseNative(contract.leaseId,ready,()=>false)).toThrow('live');
 budget.releaseNative(contract.leaseId,ready,()=>alive);budget.reserve(contract.leaseId,'admitted','d'.repeat(64),80);
 alive=false;expect(()=>budget.reserve(contract.leaseId,'after-death','d'.repeat(64),1)).toThrow('gate');
 expect(budget.snapshot(contract.leaseId).remainingOutputTokens).toBe(20);
 expect(()=>budget.releaseNative(contract.leaseId,ready,()=>true)).toThrow('bound');
});
test('reopened released record has no authority and cannot silently re-release or gain a fresh allowance',()=>{
 const {budget,path,contract,job,preparation}=fixture();const jobDigest=budget.bindNativeJob(contract.leaseId,job),ready={jobDigest,monitorNonce:'monitor',pid:process.pid};
 budget.releaseNative(contract.leaseId,ready,()=>true);budget.reserve(contract.leaseId,'in-flight','d'.repeat(64),80);
 const reopened=new OutputRequestBudget(path);stores.push(reopened);
 reopened.bindNative(contract,preparation);reopened.bind(contract);
 expect(reopened.nativeBinding(contract.leaseId)?.phase).toBe('released');
 expect(()=>reopened.reserve(contract.leaseId,'replayed','d'.repeat(64),1)).toThrow('gate');
 expect(()=>reopened.releaseNative(contract.leaseId,ready,()=>true)).toThrow('bound');
 expect(()=>reopened.bindNative({...contract,outputTokenCap:200},preparation)).toThrow('frozen');
 expect(reopened.snapshot(contract.leaseId).remainingOutputTokens).toBe(20);
});
test('wrong worktree, earlier creation or a plain allowance cannot be adopted as native',()=>{
 const {budget,contract,preparation,job}=fixture();
 expect(()=>budget.bindNativeJob(contract.leaseId,{...job,worktree:join(job.worktree,'other')})).toThrow('worktree');
 expect(()=>budget.bindNativeJob(contract.leaseId,{...job,createdAt:'2000-01-01T00:00:00.000Z'})).toThrow('time');
 const plain={...contract,leaseId:'plain'};budget.bind(plain);
 expect(()=>budget.bindNative(plain,preparation)).toThrow('convert');
});

test('clock rollback cannot reopen native admission past its original monotonic deadline',()=>{
 const root=mkdtempSync(join(tmpdir(),'native-gate-clock-'));roots.push(root);let wall=Date.now(),mono=100;
 const budget=new OutputRequestBudget(join(root,'budget.sqlite'),{wallNow:()=>wall,monotonicNow:()=>mono});stores.push(budget);
 const contract={leaseId:'clock',launchDigest:'a'.repeat(64),outputTokenCap:100,deadlineAt:new Date(wall+1000).toISOString()};
 budget.bindNative(contract,{worktree:root,preparedAt:new Date(wall-1000).toISOString()});
 const jobDigest=budget.bindNativeJob('clock',{jobId:'abc12345',sessionId:'abc12345-0000-4000-8000-000000000001',worktree:root,createdAt:new Date(wall-500).toISOString()});
 budget.releaseNative('clock',{jobDigest,monitorNonce:'monitor',pid:process.pid},()=>true);
 wall-=60000;mono+=1001;
 expect(()=>budget.reserve('clock','late','b'.repeat(64),1)).toThrow('gate');expect(budget.snapshot('clock').remainingOutputTokens).toBe(100);
});
test('a reopened bound preparation cannot manufacture a new monotonic release window',()=>{
 const {budget,path,contract,job}=fixture();const jobDigest=budget.bindNativeJob(contract.leaseId,job);
 const recovered=new OutputRequestBudget(path);stores.push(recovered);
 expect(()=>recovered.releaseNative(contract.leaseId,{jobDigest,monitorNonce:'replacement',pid:process.pid},()=>true)).toThrow('live');
 expect(recovered.nativeBinding(contract.leaseId)?.phase).toBe('bound');
});
