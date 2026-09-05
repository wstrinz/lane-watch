import {afterEach, expect, test} from 'bun:test';
import {mkdtempSync, rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {OutputRequestBudget, type OutputUsage} from '../src/output-request-budget';
const roots:string[]=[];
const stores:OutputRequestBudget[]=[];
const digest='a'.repeat(64);
function setup(cap=100, deadline='2099-01-01T00:00:00.000Z') {
 const root=mkdtempSync(join(tmpdir(),'output-budget-'));roots.push(root);
 const path=join(root,'budget.sqlite'),store=new OutputRequestBudget(path);stores.push(store);
 store.bind({leaseId:'lease-1',launchDigest:digest,outputTokenCap:cap,deadlineAt:deadline});
 return {store,path};
}
const usage=(outputTokens:number):OutputUsage=>({outputTokens,inputTokens:1000000,cacheReadInputTokens:2000000,cacheCreationInputTokens:null});
afterEach(()=>{for(const s of stores.splice(0))s.close();for(const p of roots.splice(0))rmSync(p,{recursive:true,force:true});});
test('two connections share one allowance; terminal output frees only unused reserved output',()=>{
 const {store,path}=setup();const other=new OutputRequestBudget(path);stores.push(other);
 store.reserve('lease-1','child-a',digest,70);
 expect(()=>other.reserve('lease-1','child-b',digest,40)).toThrow('insufficient');
 other.reserve('lease-1','child-b',digest,30);
 expect(store.snapshot('lease-1').remainingOutputTokens).toBe(0);
 store.settle('lease-1','child-a',digest,usage(20));
 other.reserve('lease-1','child-c',digest,50);
 const state=store.snapshot('lease-1');
 expect(state.chargedOutputTokens).toBe(100);
 expect(state.reportedOutputTokens).toBe(20);
 expect(state.unresolvedRequests).toBe(2);
 expect(state.separateReportedUsage.inputTokens).toBe(1000000);
 expect(state.missingUsageReports.cacheCreationInputTokens).toBe(1);
});
test('lost transport response survives reopen with no allowance reset or request replay',()=>{
 const {store,path}=setup();store.reserve('lease-1','lost-reply',digest,80);
 store.close();stores.splice(stores.indexOf(store),1);
 const recovered=new OutputRequestBudget(path);stores.push(recovered);
 recovered.bind({leaseId:'lease-1',launchDigest:digest,outputTokenCap:100,deadlineAt:'2099-01-01T00:00:00.000Z'});
 expect(recovered.snapshot('lease-1').remainingOutputTokens).toBe(20);
 expect(()=>recovered.reserve('lease-1','lost-reply',digest,10)).toThrow();
 expect(()=>recovered.bind({leaseId:'lease-1',launchDigest:digest,outputTokenCap:200,deadlineAt:'2099-01-01T00:00:00.000Z'})).toThrow('frozen');
 expect(recovered.snapshot('lease-1').remainingOutputTokens).toBe(20);
});
test('exact late receipt settles once; conflicting or unbound receipts cannot reclaim output',()=>{
 const {store}=setup();store.reserve('lease-1','r1',digest,80);
 expect(()=>store.settle('lease-1','r1','b'.repeat(64),usage(1))).toThrow('bind');
 expect(()=>store.settle('lease-1','r1',digest,{...usage(1),outputTokens:NaN})).toThrow();
 expect(store.snapshot('lease-1').remainingOutputTokens).toBe(20);
 store.settle('lease-1','r1',digest,usage(15));store.settle('lease-1','r1',digest,usage(15));
 expect(()=>store.settle('lease-1','r1',digest,usage(10))).toThrow('Conflicting');
 expect(store.snapshot('lease-1').remainingOutputTokens).toBe(85);
 expect(()=>store.reserve('lease-1','r1',digest,10)).toThrow();
});
test('expired contracts, invalid ceilings and unknown usage fail before allowance is reclaimed',()=>{
 const {store}=setup(100,'2020-01-01T00:00:00.000Z');
 expect(()=>store.reserve('lease-1','expired',digest,1)).toThrow('deadline');
 const {store:live}=setup();
 for(const cap of [0,-1,0.5,Infinity,Number.MAX_SAFE_INTEGER+1])expect(()=>live.reserve('lease-1','bad',digest,cap)).toThrow();
 live.reserve('lease-1','unknown',digest,100);
 expect(()=>live.settle('lease-1','unknown',digest,{...usage(1),inputTokens:undefined} as unknown as OutputUsage)).toThrow();
 expect(live.snapshot('lease-1').remainingOutputTokens).toBe(0);
});

test('a provider ceiling violation durably holds all further request admission',()=>{
 const {store,path}=setup();store.reserve('lease-1','bad-provider',digest,10);
 expect(()=>store.settle('lease-1','bad-provider',digest,usage(11))).toThrow('exceeds');
 const reopened=new OutputRequestBudget(path);stores.push(reopened);
 expect(()=>reopened.reserve('lease-1','next',digest,1)).toThrow('held');
 expect(reopened.snapshot('lease-1').unresolvedRequests).toBe(1);
 expect(reopened.snapshot('lease-1').holdReason).toContain('exceeds');
});
