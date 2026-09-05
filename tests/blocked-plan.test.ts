import {test,expect} from 'bun:test';
import {mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {ResearchPlanningService} from '../src/research-planning-service';

async function fixture(options:{active?:number,reserved?:number,working?:boolean,empty?:boolean}={}){
 const root=await mkdtemp(join(tmpdir(),'blocked-plan-'));
 const calls:any[]=[],writes:string[]=[],phases:string[]=[];
 const db:any={query:(sql:string)=>({
  all:()=>sql.includes('SELECT * FROM campaign_research_requests')?(options.empty?[]:[{request_id:'new-review',question:'Review the theorem',status:'proposed'}]):[],
  get:()=>sql.includes('COUNT(*)')?{count:sql.includes('campaign_research_runs')?(options.active||0):(options.reserved||0)}:null,
  run:()=>{writes.push(sql);}
 })};
 const coordinator:any={thread_id:'coordinator',status:options.working?'working':'idle'};
 const service=new ResearchPlanningService(db,{startTurn:async(p:any)=>{calls.push(p);return{id:'plan-turn'};}} as any,root,{get:()=>coordinator,writable:async()=>coordinator} as any,{
  coordinationInterface:()=>({capabilities:{plan:true}}),project:()=>({current_phase:'BLOCKED'}),latestWave:()=>({wave_id:'wave',evidence_digest:'frozen'}),projectRoot:()=>root,workspaceRoot:()=>root,strategyBundleContext:()=>({}),redirectContext:()=>[],staffingProfiles:()=>[],planSchema:()=>({}),now:()=>new Date().toISOString(),digest:()=> 'a'.repeat(64),touchProject:(_id:string,phase:string)=>phases.push(phase),recordEvent:()=>{}
 } as any);
 return{service,calls,writes,phases,cleanup:()=>rm(root,{recursive:true,force:true})};
}
test('a blocked campaign can review only its new proposed questions without a budget reset or dispatch',async()=>{
 const f=await fixture();try{
  await f.service.startReview('demo','operator');
  expect(f.calls).toHaveLength(1);
  expect(f.calls[0].sandboxPolicy).toEqual({type:'readOnly'});
  expect(f.calls[0].input[0].text).toContain('Preserve existing execution holds and budget exhaustion');
  expect(f.phases).toEqual(['RESEARCH_REVIEW']);
  expect(f.writes.some(s=>s.includes('campaign_research_runs')||s.includes('campaign_resource'))).toBe(false);
 }finally{await f.cleanup();}
});
for(const options of [{active:1},{reserved:1},{working:true},{empty:true}])test(`blocked planning refuses an unsettled boundary ${JSON.stringify(options)}`,async()=>{
 const f=await fixture(options);try{
  await expect(f.service.startReview('demo','operator')).rejects.toThrow();
  expect(f.calls).toHaveLength(0);expect(f.writes).toHaveLength(0);
 }finally{await f.cleanup();}
});
