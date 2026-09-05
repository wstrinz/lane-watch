import {expect,test} from 'bun:test';
import {mkdtempSync,readFileSync,existsSync,writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {launchHarness,fixtureSpec} from './helpers/research-launch-harness';
import {ResearchLaunchJournal} from '../src/research-launch-journal';
import {CampaignStartupService} from '../src/campaign-startup-service';
import {assertLocalResearchRuntime} from '../src/local-research-runtime-policy';
import {executionFocus} from '../src/ui/campaign-guidance';
import {matchResearchRunLane} from '../src/research-run-identity';
import type {ResearchLauncher} from '../src/research-execution-service';

const temporary=()=>mkdtempSync(join(tmpdir(),'lane-watch-launch-recovery-'));
const rows=(db:any)=>({attempt:db.query('SELECT * FROM campaign_research_launch_attempts').get(),run:db.query('SELECT * FROM campaign_research_runs').get(),request:db.query('SELECT * FROM campaign_research_requests').get(),schedule:db.query('SELECT * FROM campaign_wave_schedules').get()});
test('launch intent and its schedule events commit together before any adapter call',async()=>{
 let calls=0;const h=launchHarness(temporary(),async()=>{calls++;throw Error('Must not launch');});
 h.port.recordEvent=()=>{throw Error('Event write rejected');};
 await expect(h.service.dispatchSchedule('fixture','schedule',{},'fixture')).rejects.toThrow('Event write rejected');
 expect(rows(h.db).attempt).toBeNull();expect(rows(h.db).run).toBeNull();expect(rows(h.db).schedule.status).toBe('confirmed');expect(calls).toBe(0);h.db.close();
});
test('production preflight creates no attempt or run; reserved limits must agree',async()=>{
 let calls=0;
 const launcher:ResearchLauncher=Object.assign(async()=>{calls++;throw Error('Must not run');},{preflight:assertLocalResearchRuntime});
 const h=launchHarness(temporary(),launcher);
 await expect(h.service.dispatchSchedule('fixture','schedule',{},'fixture')).rejects.toThrow('does not yet enforce');
 expect(rows(h.db).attempt).toBeNull();expect(rows(h.db).run).toBeNull();expect(calls).toBe(0);
 delete launcher.preflight;h.db.run('UPDATE campaign_wave_schedule_members SET token_cap=2');
 await expect(h.service.dispatchSchedule('fixture','schedule',{},'fixture')).rejects.toThrow('differs from its reserved');
 expect(rows(h.db).attempt).toBeNull();expect(rows(h.db).run).toBeNull();h.db.close();
});
test('an entered adapter that loses its reply stays uncertain and cannot be retried',async()=>{
 let calls=0;
 const h=launchHarness(temporary(),async(_root,spec,context)=>{
  calls++;const r=rows(h.db);
  expect(r.attempt.status).toBe('entered');expect(JSON.parse(r.attempt.launch_spec_json)).toEqual(spec);
  expect(context).toMatchObject({attemptId:r.attempt.attempt_id,deadlineAt:r.attempt.deadline_at,tokenBudget:1,enforcement:'unverified-reservation'});
  expect(Date.parse(context.deadlineAt)-Date.parse(context.createdAt)).toBe(60000);
  throw Error('Transport reply was lost');
 });
 await expect(h.service.dispatchSchedule('fixture','schedule',{},'fixture')).rejects.toThrow('outcome is unverified');
 const r=rows(h.db);expect(r.attempt.status).toBe('uncertain');expect(r.run).toMatchObject({status:'launching',job_id:'',completed_at:''});
 expect(r.request.status).toBe('dispatching');expect(r.schedule.status).toBe('attention');expect(h.port.project().current_phase).toBe('BLOCKED');
 await expect(h.service.dispatchSchedule('fixture','schedule',{},'fixture')).rejects.toThrow('RESEARCH_READY');expect(calls).toBe(1);
 expect(matchResearchRunLane(r.run,[{task:fixtureSpec.taskId,jobId:'old-job',id:'old-lane'}] as any)).toBeUndefined();
 const focus=executionFocus({phase:'BLOCKED',researchRuns:[{status:'launching',launchAttempt:{status:'uncertain'}}]});
 expect(focus?.title).toBe('Verify the last launch before retrying');expect(focus?.actions.map(a=>a.key)).toEqual(['reveal']);
 h.db.close();
});
test('frozen attempts reject changed limits and late receipts remain held for inspection',()=>{
 const h=launchHarness(temporary(),async()=>{throw Error('Must not run');}),journal=new ResearchLaunchJournal(h.db),at=h.now();
 const c=journal.prepare({projectId:'fixture',scheduleId:'schedule',requestId:'request',runId:'run',spec:fixtureSpec,at});
 expect(()=>h.db.run("UPDATE campaign_research_launch_attempts SET deadline_at='2099-01-01'")).toThrow('immutable');
 expect(()=>journal.enter(c.attemptId,c.deadlineAt)).toThrow('expired');expect(journal.get(c.attemptId).status).toBe('prepared');
 journal.enter(c.attemptId,at);expect(()=>journal.enter(c.attemptId,at)).toThrow('already entered');
 journal.hold(c.attemptId,'Controller lost',at);
 const receipt={laneId:'fixture-lane',jobId:'1234abcd',worktree:'/fixture',output:'Late transport receipt'};
 expect(journal.returned(c.attemptId,receipt,at)).toBe(false);
 expect(journal.get(c.attemptId)).toMatchObject({status:'uncertain',receipt_json:JSON.stringify(receipt),deadline_at:c.deadlineAt});h.db.close();
});
test('a received identity survives a failure to publish the running state without authorizing retry',async()=>{
 const receipt={laneId:'fixture-lane',jobId:'1234abcd',worktree:'/fixture',output:'Transport receipt'};
 const h=launchHarness(temporary(),async()=>receipt),record=h.port.recordEvent;
 h.port.recordEvent=(...args:any[])=>{if(args[3]==='research.dispatch.launched')throw Error('Publishing interrupted');record(...args);};
 await expect(h.service.dispatchSchedule('fixture','schedule',{},'fixture')).rejects.toThrow('outcome is unverified');
 expect(rows(h.db).attempt).toMatchObject({status:'uncertain',receipt_json:JSON.stringify(receipt)});
 expect(rows(h.db).run).toMatchObject({status:'launching',job_id:''});expect(rows(h.db).request.status).toBe('dispatching');h.db.close();
});
test('a live finite worker is not duplicated after its launcher loses the reply',async()=>{
 const worker:{current?:{pid:number;kill:()=>void;exited:Promise<number>}}={};let calls=0;
 const h=launchHarness(temporary(),async()=>{
  calls++;worker.current=Bun.spawn(['node','-e','setTimeout(()=>process.exit(0),3000)'],{stdout:'ignore',stderr:'ignore',windowsHide:true});
  throw Error('Reply lost after process creation');
 });
 try{
  await expect(h.service.dispatchSchedule('fixture','schedule',{},'fixture')).rejects.toThrow('outcome is unverified');
  expect(worker.current).toBeDefined();process.kill(worker.current!.pid,0);
  expect(rows(h.db).attempt.status).toBe('uncertain');
  await expect(h.service.dispatchSchedule('fixture','schedule',{},'fixture')).rejects.toThrow('RESEARCH_READY');expect(calls).toBe(1);
 }finally{if(worker.current){worker.current.kill();await worker.current.exited;}h.db.close();}
});
test('startup closes a durable attempt that never entered the adapter without invoking it',()=>{
 let calls=0;const h=launchHarness(temporary(),async()=>{calls++;throw Error('Must not run');});
 // Reconstruct the persisted pre-entry crash window without invoking an adapter.
 const journal=new ResearchLaunchJournal(h.db),at=h.now();
 h.db.query(`INSERT INTO campaign_research_runs(run_id,request_id,project_id,wave_id,task_id,status,profile,host,model,effort,fanout,packet_path,base_ref,lane_id,job_id,worktree,evidence_path,evidence_sha256,error,created_at,updated_at,completed_at)
 VALUES ('run','request','fixture','wave',?,'launching','fixture','windows','no-model','none',0,'fixture.md','base','','','','receipt.json','','',?,?,'')`).run(fixtureSpec.taskId,at,at);
 h.db.run("UPDATE campaign_research_requests SET status='dispatching'; UPDATE campaign_wave_schedule_members SET status='launching',run_id='run';");
 const c=journal.prepare({projectId:'fixture',scheduleId:'schedule',requestId:'request',runId:'run',spec:fixtureSpec,at});
 expect(h.service.recoverInterruptedLaunches()).toBe(1);expect(h.service.recoverInterruptedLaunches()).toBe(0);expect(calls).toBe(0);
 expect(rows(h.db).attempt).toMatchObject({status:'aborted',deadline_at:c.deadlineAt});expect(rows(h.db).run.status).toBe('failed');expect(rows(h.db).request.status).toBe('approved_for_dispatch');h.db.close();
});
test('a real controller crash retains an unknown finite worker through the startup barrier',async()=>{
 const root=temporary(),marker=join(root,'worker.json');
 const controller=Bun.spawn([process.execPath,join(import.meta.dir,'helpers','research-launch-harness.ts'),root,marker],{stdout:'ignore',stderr:'pipe',windowsHide:true});
 let recovered:ReturnType<typeof launchHarness>|null=null;
 try{
  const until=Date.now()+12000;
  while(!existsSync(marker)&&controller.exitCode===null&&Date.now()<until)await Bun.sleep(50);
  if(!existsSync(marker)){
    if(controller.exitCode===null){controller.kill();await controller.exited;}
    throw Error('Finite fixture did not start: '+await new Response(controller.stderr).text());
  }
  const binding=JSON.parse(readFileSync(marker,'utf8'));expect(binding.controllerPid).toBe(controller.pid);
  process.kill(binding.workerPid,0);
  controller.kill();await controller.exited;
  let calls=0;recovered=launchHarness(root,async()=>{calls++;throw Error('Restart must not invoke the launcher');});
  const before=rows(recovered.db);expect(before.attempt.status).toBe('entered');
  const manifest=join(root,'projects.json');writeFileSync(manifest,JSON.stringify({projects:[{id:'fixture',path:'.',local_agent_coordinator:'fixture'}]}));
  let resumes=0;
  const startup=new CampaignStartupService(recovered.db,manifest,{registerProject:()=>{},ensureStrategyFoundation:()=>{},recoverInterruptedActions:()=>1,recoverResearchLaunches:()=>recovered!.service.recoverInterruptedLaunches(),recoverCustodyExecutions:async()=>{},resumeActions:()=>{resumes++;}});
  await startup.initialize();expect(resumes).toBe(0);expect(startup.snapshot().interruptedResearchLaunchCount).toBe(1);
  const after=rows(recovered.db);
  expect(after.attempt).toMatchObject({attempt_id:binding.context.attemptId,status:'uncertain',launch_spec_json:before.attempt.launch_spec_json,deadline_at:binding.context.deadlineAt,spec_digest:binding.context.specDigest});
  expect(after.run).toMatchObject({status:'launching',job_id:'',completed_at:''});expect(after.request.status).toBe('dispatching');
  expect(recovered.port.project().current_phase).toBe('BLOCKED');expect(calls).toBe(0);
  startup.observationSettled();expect(resumes).toBe(1);expect(calls).toBe(0);
  await expect(recovered.service.dispatchSchedule('fixture','schedule',{},'fixture')).rejects.toThrow('RESEARCH_READY');
  // The owned fixture exits itself after six seconds. Recovery sends no guessed PID signal.
 }finally{if(controller.exitCode===null){controller.kill();await controller.exited;}recovered?.db.close();}
},20000);
