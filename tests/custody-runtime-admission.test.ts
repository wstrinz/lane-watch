import {test,expect} from 'bun:test';
import {Database} from 'bun:sqlite';
import {CustodyCommandService} from '../src/custody-command-service';
import {CUSTODY_RUNTIME_ADMISSION,CUSTODY_RUNTIME_HOLD} from '../src/local-research-runtime-policy';
import {nextCustodyAutopilotStep} from '../src/autopilot-service';

function fixture(preflight?:()=>void){
 const db=new Database(':memory:');
 db.run('CREATE TABLE campaign_custody_leases(lease_id TEXT,project_id TEXT,status TEXT,lease_json TEXT,lease_digest TEXT,expires_at TEXT)');
 const lease={leaseDigest:'sha256:frozen',adapter:{executionMode:'isolated-worktree'},workspace:{repositoryRoot:'Z:/must-not-be-touched'},budget:{maxTokens:50000,maxMinutes:30}};
 db.query('INSERT INTO campaign_custody_leases VALUES(?,?,?,?,?,?)').run('lease','demo','confirmed',JSON.stringify(lease),'sha256:frozen','2099-01-01T00:00:00Z');
 const effects:string[]=[];
 const unreachable=new Proxy({},{get:(_target,key)=>{effects.push(String(key));throw Error('Unexpected effect/dependency: '+String(key));}});
 const service=new CustodyCommandService(db,unreachable as any,unreachable as any,'Z:/must-not-be-touched',unreachable as any,preflight);
 return {db,service,effects};
}
test('production custody admission refuses before any dependency, worktree, model or lease mutation',async()=>{
 const {db,service,effects}=fixture();try{
  const before=db.query('SELECT * FROM campaign_custody_leases').all();
  await expect(service.dispatchLease('demo','lease',{leaseDigest:'sha256:frozen'},'operator')).rejects.toThrow(CUSTODY_RUNTIME_HOLD);
  expect(db.query('SELECT * FROM campaign_custody_leases').all()).toEqual(before);
  expect(effects).toEqual([]);
 }finally{db.close();}
});
test('a changed digest cannot reach even an injected executor admission check',async()=>{
 let admissions=0;const {db,service,effects}=fixture(()=>{admissions++;});try{
  await expect(service.dispatchLease('demo','lease',{leaseDigest:'sha256:different'},'operator')).rejects.toThrow('digest does not match');
  expect(admissions).toBe(0);expect(effects).toEqual([]);
 }finally{db.close();}
});
test('autopilot reports held dispatch while retaining reconciliation and receipt landing paths',()=>{
 const base={id:'item',task:'Index accepted evidence',status:'ready',blocksResearch:true,createdAt:'old'};
 const custody=(activeLease:any)=>({runtimeAdmission:CUSTODY_RUNTIME_ADMISSION,items:[{...base,activeLease}]});
 expect(nextCustodyAutopilotStep(custody({id:'lease',status:'confirmed',leaseDigest:'sha256:frozen'}))).toEqual({kind:'attention',message:CUSTODY_RUNTIME_HOLD});
 expect(nextCustodyAutopilotStep(custody({id:'lease',status:'running',updatedAt:'2020-01-01T00:00:00Z'}))).toMatchObject({kind:'action',type:'custody.lease.reconcile',targetId:'lease'});
 expect(nextCustodyAutopilotStep(custody({id:'lease',status:'awaiting_review',verification:{landable:true},receiptDigest:'sha256:receipt'}))).toMatchObject({kind:'action',type:'custody.receipt.land',targetId:'lease'});
});
