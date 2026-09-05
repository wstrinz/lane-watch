/** Model-free native crash/recovery probe. Never starts a research turn. */
import {mkdir,readFile,writeFile,access} from 'node:fs/promises';
import {resolve,join,basename} from 'node:path';
import {randomUUID,createHash} from 'node:crypto';
import {ResearchWatchStore} from '../src/research-watch-store';
import {nativeClaudeWatchPort} from '../src/native-claude-runtime-watch';
import type {ResearchWatchLease} from '../src/research-runtime-watch';
const executable='C:/nvm4w/nodejs/node_modules/@anthropic-ai/claude-code/bin/claude.exe';
const claudeHome=process.env.CLAUDE_CONFIG_DIR||join(process.env.USERPROFILE!,'.claude');
const root=process.cwd(),dir=resolve('tmp','durable-watch-probe-'+randomUUID());
const reportName=process.argv[2]||`${new Date().toISOString().slice(0,10)}-durable-watch-crash-${randomUUID()}.json`;
if(basename(reportName)!==reportName||!reportName.endsWith('.json'))throw Error('Report must be a JSON basename in runtime-audits');
const reportPath=resolve('runtime-audits',reportName);
try {await access(reportPath);throw Error('Refusing to overwrite existing probe evidence');}catch(error:any){if(error.code!=='ENOENT')throw error;}
const sha=(bytes:Uint8Array|string)=>createHash('sha256').update(bytes).digest('hex');
const sources=await Promise.all(['src/research-runtime-watch.ts','src/native-claude-runtime-watch.ts','src/bounded-research-watch-port.ts','src/research-watch-store.ts','src/durable-research-watch.ts','scripts/probe-durable-research-watch.ts','tests/fixtures/runtime-stop-probe.cjs'].map(async path=>{
 const bytes=await readFile(path);return {path,sha256:sha(bytes),bytes:bytes.length,lfNormalizedSha256:sha(bytes.toString('utf8').replaceAll('\r\n','\n'))};
}));
await mkdir(dir,{recursive:true});
const prefix=join(dir,'fixture'),leasePath=join(dir,'lease.json'),databasePath=join(dir,'watch.sqlite'),eventPath=join(dir,'events.jsonl');
const normalize=(p:string)=>p.replaceAll('\\','/');
function quote(p:string){if(/["`$\r\n]/.test(p))throw Error('Unexpected probe path');return '"'+normalize(p)+'"';}
async function eventually<T>(read:()=>Promise<T>,accept:(v:T)=>boolean,ms:number):Promise<T>{const end=Date.now()+ms;do{try{const value=await read();if(accept(value))return value;}catch{}await Bun.sleep(50);}while(Date.now()<end);throw Error('Bounded fixture observation did not arrive');}
function alive(pid:number){try{process.kill(pid,0);return true;}catch(e:any){if(e.code==='ESRCH')return false;throw e;}}
let first:any=null,second:any=null,store:ResearchWatchStore|null=null,lease:ResearchWatchLease|null=null;
let report:any={modelsInvoked:0,fixtureSelfExitSeconds:15,capturedAt:new Date().toISOString(),sources};
try {
 const command=['node',resolve('tests/fixtures/runtime-stop-probe.cjs'),prefix].map(quote).join(' ');
 const launch=Bun.spawn([executable,'--bg','--name','Lane Watch finite crash-recovery fixture','--exec',command],{cwd:root,stdin:'ignore',stdout:'pipe',stderr:'pipe',windowsHide:true});
 const launchTimeout=setTimeout(()=>launch.kill(),5000);
 const [output,error,code]=await Promise.all([new Response(launch.stdout).text(),new Response(launch.stderr).text(),launch.exited]);clearTimeout(launchTimeout);
 if(code!==0)throw Error('Fixture launch failed: '+error.slice(-1000));
 const match=output.match(/^backgrounded\s*·\s*([0-9a-f]{8})\s*·/m);
 if(!match)throw Error('Exact native background header missing: '+output.slice(0,1000));
 const jobId=match[1],statePath=join(claudeHome,'jobs',jobId,'state.json');
 const readState=async()=>JSON.parse(await readFile(statePath,'utf8'));
 const before=await eventually(readState,s=>s.state==='working',3000);
 if(normalize(before.cwd).toLowerCase()!==normalize(root).toLowerCase()||!before.sessionId.startsWith(jobId+'-'))throw Error('Fixture state did not match exact launch');
 const parent=await eventually(async()=>JSON.parse(await readFile(prefix+'.parent','utf8')),p=>Number.isSafeInteger(p.pid)&&Number.isSafeInteger(p.childPid),2000);
 const child=await eventually(async()=>JSON.parse(await readFile(prefix+'.child','utf8')),p=>p.pid===parent.childPid,1000);
 if(!alive(parent.pid)||!alive(child.pid))throw Error('Finite fixture was not live before the crash test');
 lease={jobId,sessionId:before.sessionId,worktree:before.cwd,startedAt:before.createdAt,deadlineAt:new Date(Date.now()+30000).toISOString(),tokenCap:1000,tokenMetric:'daemon-reported',pollMs:100,telemetryGraceMs:10000};
 await writeFile(leasePath,JSON.stringify(lease));store=new ResearchWatchStore(databasePath);store.bind(lease);
 const monitorArgs=[process.execPath,resolve('src/durable-research-watch.ts'),leasePath,databasePath,claudeHome,executable,eventPath];
 first=Bun.spawn(monitorArgs,{cwd:root,stdin:'ignore',stdout:'pipe',stderr:'pipe',windowsHide:true});
 const firstOut=new Response(first.stdout).text(),firstError=new Response(first.stderr).text();
 await eventually(async()=>({snapshot:store!.snapshot(lease!.sessionId),events:await readFile(eventPath,'utf8')}),v=>v.snapshot.phase==='monitoring'&&v.snapshot.generation===1&&v.events.includes('watch.started'),3000);
 if(first.exitCode!==null||(await readState()).state!=='working')throw Error('First monitor or fixture was already terminal');
 const crashedPid=first.pid;first.kill();const firstExit=await first.exited;
 await Promise.all([firstOut,firstError]);
 if(alive(crashedPid))throw Error('First watchdog process still exists; recovery is not authorized');
 const persisted=store.snapshot(lease.sessionId);
 second=Bun.spawn(monitorArgs,{cwd:root,stdin:'ignore',stdout:'pipe',stderr:'pipe',windowsHide:true});
 const secondTimeout=setTimeout(()=>second.kill(),7000);
 const [secondOut,secondError,secondCode]=await Promise.all([new Response(second.stdout).text(),new Response(second.stderr).text(),second.exited]);clearTimeout(secondTimeout);
 if(secondCode!==0)throw Error('Recovered watchdog failed: '+secondError.slice(-1500)+' '+secondOut.slice(-1500));
 const result=JSON.parse(secondOut.trim());
 const after=await readState(),saved=store.snapshot(lease.sessionId);
 const ageMs=Date.now()-Date.parse(before.createdAt);
 report={...report,jobId,sessionId:lease.sessionId,firstMonitorPid:crashedPid,firstMonitorExitCode:firstExit,
  beforeState:before.state,afterState:after.state,watchResult:result,
  beforeRecoveryGeneration:persisted.generation,afterRecoveryGeneration:saved.generation,
  originalBoundsUnchanged:JSON.stringify(saved.lease)===JSON.stringify(lease),persistedPhase:saved.phase,
  parentPid:parent.pid,childPid:child.pid,parentStillExists:alive(parent.pid),childStillExists:alive(child.pid),
  millisecondsSinceJobCreated:ageMs,observedTokensBeforeRecovery:persisted.observedTokens,observedTokensAfterRecovery:saved.observedTokens,
  probeDirectory:dir};
 if(result.status!=='stopped'||result.reason!=='supervisor-recovery'||after.state!=='stopped'||saved.generation!==2||
    !report.originalBoundsUnchanged||saved.phase!=='terminal'||report.parentStillExists||report.childStillExists||ageMs>=12000)throw Error('Crash recovery did not prove the intended finite stop outcome');
 report.status='SUPPORTED';
 await writeFile(reportPath,JSON.stringify(report,null,2)+'\n',{flag:'wx'});
 console.log(JSON.stringify(report));
} catch(error) {
 report.status='INCONCLUSIVE';report.error=String(error);
 await writeFile(join(dir,'failed-report.json'),JSON.stringify(report,null,2)+'\n');
 console.error(JSON.stringify(report));process.exitCode=1;
} finally {
 for(const monitor of [first,second])if(monitor&&monitor.exitCode===null){monitor.kill();await monitor.exited;}
 if(lease){const native=nativeClaudeWatchPort(lease,{claudeHome,executable,eventPath});const observed=await native.observe(lease.jobId);if(observed?.state==='working')try{await native.stop(lease.jobId);}catch{}}
 store?.close();
}
