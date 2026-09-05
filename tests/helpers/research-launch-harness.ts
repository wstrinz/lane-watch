import {Database} from 'bun:sqlite';
import {mkdirSync,writeFileSync} from 'node:fs';
import {join} from 'node:path';
import {CampaignSchemaMigrationService} from '../../src/campaign-schema-migration-service';
import {ResearchExecutionService,type ResearchLauncher,type ResearchLaunchSpec} from '../../src/research-execution-service';
import {WaveScheduleRepository} from '../../src/wave-schedule-repository';

export const fixtureSpec:ResearchLaunchSpec={taskId:'finite-process-fixture',priority:1,profile:'fixture',host:'windows',model:'no-model',effort:'none',fanout:0,packetPath:'fixture.md',baseRef:'1'.repeat(40),evidencePath:'receipt.json',timeoutMinutes:1,tokenBudget:1,tools:[],outputContract:'No model or research; finite process only.'};
export function launchHarness(root:string,launcher:ResearchLauncher){
 mkdirSync(root,{recursive:true});
 const db=new Database(join(root,'fixture.sqlite'),{create:true});
 db.exec('PRAGMA journal_mode=WAL; PRAGMA synchronous=FULL;');
 new CampaignSchemaMigrationService(db).migrate();
 const now=()=>new Date().toISOString();
 if(!db.query("SELECT 1 FROM campaign_projects WHERE project_id='fixture'").get()){
  const at=now();
  db.query("INSERT INTO campaign_projects(project_id,role,root_path,current_phase,updated_at) VALUES ('fixture','Fixture',?,'RESEARCH_READY',?)").run(root,at);
  db.query("INSERT INTO campaign_research_requests VALUES ('request','fixture','wave','Finite fixture','approved_for_dispatch',?,?)").run(at,at);
  db.query(`INSERT INTO campaign_wave_schedules(schedule_id,project_id,wave_id,schedule_digest,plan_digest,resource_digest,status,proposal_json,created_by,confirmed_by,created_at,updated_at,confirmed_at)
   VALUES ('schedule','fixture','wave','digest','plan','resources','confirmed','{}','fixture','fixture',?,?,?)`).run(at,at,at);
  db.query(`INSERT INTO campaign_wave_schedule_members(schedule_id,request_id,task_id,ordinal,status,token_cap,launch_spec_json,member_json,updated_at)
   VALUES ('schedule','request',?,1,'reserved',1,?,'{}',?)`).run(fixtureSpec.taskId,JSON.stringify(fixtureSpec),at);
 }
 const port:any={
  project:()=>db.query("SELECT * FROM campaign_projects WHERE project_id='fixture'").get(),
  projectRoot:()=>root,latestWave:()=>({wave_id:'wave'}),coordinationInterface:()=>({capabilities:{dispatch:true}}),now,
  touchProject:(_id:string,phase?:string)=>db.query("UPDATE campaign_projects SET current_phase=COALESCE(?,current_phase),version=version+1,updated_at=? WHERE project_id='fixture'").run(phase??null,now()),
  recordEvent:(projectId:string,type:string,id:string,event:string,payload:unknown)=>db.query('INSERT INTO campaign_events VALUES (?,?,?,?,?,?,?)').run(crypto.randomUUID(),projectId,type,id,event,JSON.stringify(payload),now()),
  notifyChanged:()=>{},
 };
 const service=new ResearchExecutionService(db,new WaveScheduleRepository(db),{} as any,root,launcher,port);
 return {db,service,port,now};
}

// Called only by the finite controller-crash regression. No CLI/model adapter is used.
if(import.meta.main){
 const [root,marker]=process.argv.slice(2);
 if(!root||!marker)throw Error('Fixture requires its temporary root and marker path');
 const item=launchHarness(root,async(_root,_spec,context)=>{
  const child=Bun.spawn(['node','-e','setTimeout(()=>process.exit(0),6000)'],{stdout:'ignore',stderr:'ignore',windowsHide:true});
  writeFileSync(marker,JSON.stringify({controllerPid:process.pid,workerPid:child.pid,context}));
  await child.exited;
  throw Error('Finite fixture ended without a launch receipt');
 });
 await item.service.dispatchSchedule('fixture','schedule',{scheduleDigest:'digest'},'fixture');
}
