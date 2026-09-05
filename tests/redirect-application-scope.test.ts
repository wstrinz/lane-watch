import {expect,test} from 'bun:test';
import {Database} from 'bun:sqlite';
import {CampaignSchemaMigrationService} from '../src/campaign-schema-migration-service';
import {WaveSemanticService} from '../src/wave-semantic-service';

function fixture(phase='BLOCKED'){
 const db=new Database(':memory:');new CampaignSchemaMigrationService(db).migrate();
 db.query("INSERT INTO campaign_projects(project_id,role,root_path,current_phase,updated_at) VALUES('demo','test','C:/test',?,'old')").run(phase);
 db.query("INSERT INTO campaign_waves(wave_id,project_id,label,phase,lane_ids_json,evidence_digest,bundle_path,synthesis_turn_id,created_at,updated_at) VALUES('wave','demo','test',?,'[]','digest','','','old','old')").run(phase);
 db.run("INSERT INTO campaign_research_requests(request_id,project_id,wave_id,question,status,created_at,updated_at) VALUES('existing','demo','wave','Existing question','approved_for_dispatch','old','old')");
 db.run("INSERT INTO campaign_wave_schedules(schedule_id,project_id,wave_id,schedule_digest,plan_digest,resource_digest,status,proposal_json,created_by,confirmed_by,created_at,updated_at,confirmed_at,completed_at) VALUES('reserved','demo','wave','a','b','c','confirmed','{}','test','test','old','old','old','')");
 const response={summary:'Retain the common-input critique.',decision:'READY_FOR_GATE',newDirections:[{question:'Compare the same frozen inputs.'},{question:'A separate broad follow-up.'}]};
 db.query("INSERT INTO campaign_redirect_inputs(input_id,project_id,wave_id,title,content,input_digest,status,response_json,created_by,created_at,updated_at) VALUES('input','demo','wave','Review','Exact critique','input-digest','drafted',?,'test','old','old')").run(JSON.stringify(response));
 const events:any[]=[];
 const port={project:()=>db.query("SELECT current_phase FROM campaign_projects WHERE project_id='demo'").get(),
  touchProject:(_id:string,newPhase?:string)=>{if(newPhase)db.query("UPDATE campaign_projects SET current_phase=? WHERE project_id='demo'").run(newPhase);},
  recordEvent:(_project:string,_aggregate:string,_id:string,type:string,payload:unknown)=>events.push({type,payload}),now:()=>new Date().toISOString()};
 const waves={latest:()=>db.query("SELECT * FROM campaign_waves WHERE wave_id='wave'").get()};
 const service=new WaveSemanticService(db,{} as any,'',waves as any,{} as any,{} as any,port as any);
 return {db,service,events,response};
}

test('context-only retention preserves the blocked plan, existing requests and frozen schedule',async()=>{
 const {db,service,events,response}=fixture();try{
  const result=await service.applyRedirect('demo','input','operator',{mode:'context-only'});
  expect(result).toMatchObject({applicationMode:'context-only',insertedResearchRequests:0,phase:'BLOCKED'});
  expect(db.query('SELECT question,status FROM campaign_research_requests').all()).toEqual([{question:'Existing question',status:'approved_for_dispatch'}]);
  expect(db.query('SELECT status FROM campaign_wave_schedules').get()).toEqual({status:'confirmed'});
  expect(db.query('SELECT phase FROM campaign_waves').get()).toEqual({phase:'BLOCKED'});
  expect(service.redirectContext('demo')[0]).toMatchObject({applicationMode:'context-only',response});
  expect(events[0].payload).toMatchObject({applicationMode:'context-only',insertedResearchRequests:0});
  await expect(service.applyRedirect('demo','input','operator',{mode:'stage-directions'})).rejects.toThrow('completed Sol redirect');
 }finally{db.close();}
});
test('retaining context at a confirmed launch gate does not reopen or supersede it',async()=>{
 const {db,service}=fixture('RESEARCH_READY');try{
  await expect(service.applyRedirect('demo','input','operator',{mode:'stage-directions'})).rejects.toThrow('confirmed schedule');
  expect(await service.applyRedirect('demo','input','operator',{mode:'context-only'})).toMatchObject({phase:'RESEARCH_READY',insertedResearchRequests:0});
  expect(db.query('SELECT phase FROM campaign_waves').get()).toEqual({phase:'RESEARCH_READY'});
  expect(db.query('SELECT status FROM campaign_wave_schedules').get()).toEqual({status:'confirmed'});
 }finally{db.close();}
});
test('an unknown application mode cannot mark a review applied or insert questions',async()=>{
 const {db,service}=fixture();try{
  await expect(service.applyRedirect('demo','input','operator',{mode:'approve-everything'})).rejects.toThrow('context-only or stage-directions');
  expect(db.query('SELECT status,application_mode FROM campaign_redirect_inputs').get()).toEqual({status:'drafted',application_mode:''});
  expect(db.query('SELECT COUNT(*) AS n FROM campaign_research_requests').get()).toEqual({n:1});
 }finally{db.close();}
});
test('version-four redirect rows upgrade without rewriting their response or historical status',()=>{
 const {db,response}=fixture();try{
  db.run('ALTER TABLE campaign_redirect_inputs DROP COLUMN application_mode');
  db.run('DELETE FROM campaign_schema_migrations WHERE version=5');
  expect(new CampaignSchemaMigrationService(db).migrate()).toEqual({fromVersion:4,toVersion:5,appliedVersions:[5]});
  expect(db.query('SELECT status,application_mode,response_json FROM campaign_redirect_inputs').get()).toEqual({status:'drafted',application_mode:'',response_json:JSON.stringify(response)});
 }finally{db.close();}
});
