import {mkdirSync,writeFileSync,readFileSync,existsSync} from 'node:fs';
import {join,resolve} from 'node:path';
import {randomUUID} from 'node:crypto';
import {OutputRequestBudget} from '../src/output-request-budget';
import {observeOwnedProcessExit} from '../src/owned-process-exit';
import {BudgetedMessageTransport} from '../src/budgeted-message-transport';
// Historical probes remain preserved, but their cleanup trusted native job status.
// Do not rerun until complete native process-tree ownership and cleanup are wired.
throw Error('Native background probe held: verified process-tree cleanup is required');
const session=randomUUID(),root=resolve('tmp','native-monitored-gateway-'+session),config=join(root,'config');mkdirSync(config,{recursive:true});
const startedAt=Date.now(),budget=new OutputRequestBudget(join(root,'budget.sqlite'));
budget.bindNative({leaseId:session,launchDigest:'e'.repeat(64),outputTokenCap:100000,deadlineAt:new Date(startedAt+30000).toISOString()},{worktree:root,preparedAt:new Date(startedAt).toISOString()});
let boundSession:string|null=null;
let upstreamCalls=0,requestCount=0,observedSession='',keys:string[]=[],released=false,capture!:()=>void,release!:()=>void;
const requestShapes:unknown[]=[];
const captured=new Promise<void>(r=>capture=r),gate=new Promise<void>(r=>release=r),outcomes:unknown[]=[],errors:string[]=[];
const event=(type:string,extra:Record<string,unknown>={})=>`event: ${type}\ndata: ${JSON.stringify({type,...extra})}\n\n`;
const upstream=Bun.serve({hostname:'127.0.0.1',port:0,async fetch(req){
 upstreamCalls++;if(!released)throw Error('Premature upstream entry');const input=await req.json() as any;
 if(input.stream!==true)return Response.json({id:'msg_bg_auxiliary',type:'message',role:'assistant',model:input.model,content:[{type:'text',text:'fixture-complete'}],stop_reason:'end_turn',stop_sequence:null,usage:{input_tokens:10,output_tokens:7}});
 return new Response(event('message_start',{message:{id:'msg_bg_fixture',type:'message',role:'assistant',model:input.model,content:[],stop_reason:null,usage:{input_tokens:10,output_tokens:1}}})+
 event('ping')+event('content_block_start',{index:0,content_block:{type:'text',text:''}})+event('content_block_delta',{index:0,delta:{type:'text_delta',text:'fixture-complete'}})+event('content_block_stop',{index:0})+
 event('message_delta',{delta:{stop_reason:'end_turn',stop_sequence:null},usage:{output_tokens:7}})+event('message_stop'),{headers:{'content-type':'text/event-stream'}});
}});
const gateway=Bun.serve({hostname:'127.0.0.1',port:0,async fetch(req){
 if(req.method!=='POST'||new URL(req.url).pathname!=='/v1/messages')return new Response(null,{status:404});
 const requestId='request-'+ ++requestCount;if(requestCount>4)return new Response('Fixture request-count bound',{status:400});
 const body=await req.json() as any;keys=Object.keys(body).sort();const requestSession=req.headers.get('x-claude-code-session-id')||'';observedSession=requestSession;requestShapes.push({requestId,keys,stream:body.stream??false,maxTokens:body.max_tokens});capture();
 await gate;
 if(requestSession!==boundSession)return new Response('Bound daemon session mismatch',{status:409});
 try{
  const headers:Record<string,string>={};for(const key of ['anthropic-beta','anthropic-version']){const value=req.headers.get(key);if(value)headers[key]=value;}
  const transport=new BudgetedMessageTransport(budget,new URL('/v1/messages',upstream.url),headers);
  if(body.stream!==true){const result=await transport.send(session,requestId,body);outcomes.push({requestId,status:'settled',kind:'non-streaming'});return Response.json(result);}
  const sent=await transport.sendStream(session,requestId,body,req.signal);void sent.completion.then(value=>outcomes.push({requestId,kind:'streaming',...value}));return sent.response;
 }catch(e){errors.push(String(e));return Response.json({type:'error',error:{type:'invalid_request_error',message:'Fixture request held'}},{status:400});}
}});
const settings=join(root,'settings.json');writeFileSync(settings,JSON.stringify({env:{ANTHROPIC_BASE_URL:gateway.url.toString(),ANTHROPIC_API_KEY:'local-fixture-only',CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC:'1'}}));
const env:Record<string,string>={};for(const key of ['SystemRoot','WINDIR','COMSPEC','PATH','PATHEXT','TEMP','TMP'])if(process.env[key])env[key]=process.env[key]!;
Object.assign(env,{CLAUDE_CONFIG_DIR:config,ANTHROPIC_BASE_URL:gateway.url.toString(),ANTHROPIC_API_KEY:'local-fixture-only',CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC:'1'});
const executable='C:/nvm4w/nodejs/node_modules/@anthropic-ai/claude-code/bin/claude.exe';
async function invoke(args:string[],ms:number){
 const child=Bun.spawn([executable,...args],{cwd:root,env,stdin:'ignore',stdout:'pipe',stderr:'pipe',windowsHide:true});
 const timer=setTimeout(()=>{if(child.exitCode===null)child.kill();},ms);
 try{const [stdout,stderr,exit]=await Promise.all([new Response(child.stdout).text(),new Response(child.stderr).text(),child.exited]);return {pid:child.pid,stdout,stderr,exit};}finally{clearTimeout(timer);}
}
let monitor:ReturnType<typeof Bun.spawn>|null=null,monitorOutput:Promise<string>|null=null,monitorError:Promise<string>|null=null,monitorReady:any=null,monitorResult:any=null;
let launch:Awaited<ReturnType<typeof invoke>>|null=null,jobId:string|null=null,state:any=null,beforeCleanup:any=null,beforeRelease:any=null,failure='',stop:any=null;
const readState=()=>jobId&&existsSync(join(config,'jobs',jobId,'state.json'))?JSON.parse(readFileSync(join(config,'jobs',jobId,'state.json'),'utf8')):null;
const terminal=(s:any)=>s&&['done','stopped','failed','error','crashed'].includes(s.state);
let captureTimeout:ReturnType<typeof setTimeout>|undefined;
try{
 launch=await invoke(['--bg','--bare','--name','Lane Watch local streaming background fixture','--model','claude-sonnet-4-6','--tools','','--strict-mcp-config','--settings',settings,'--mcp-config','{"mcpServers":{}}','--','Return fixture-complete.'],6000);
 if(launch.exit!==0)throw Error('Background launcher failed');
 jobId=launch.stdout.match(/^backgrounded\s*·\s*([0-9a-f]{8})\s*·/m)?.[1]??null;if(!jobId)throw Error('Missing exact background receipt');
 await Promise.race([captured,new Promise<never>((_,reject)=>{captureTimeout=setTimeout(()=>reject(Error('No native background request within 8 seconds')),8000);})]);clearTimeout(captureTimeout);
 beforeRelease=readState();
 if(!beforeRelease||typeof beforeRelease.sessionId!=='string'||!beforeRelease.sessionId.startsWith(jobId+'-')||observedSession!==beforeRelease.sessionId||resolve(beforeRelease.cwd)!==root||Date.parse(beforeRelease.createdAt)<startedAt||upstreamCalls!==0)throw Error('Background identity not bound before release');
 boundSession=beforeRelease.sessionId;
 const jobDigest=budget.bindNativeJob(session,{jobId,sessionId:boundSession!,worktree:root,createdAt:beforeRelease.createdAt});
 const readyNonce=randomUUID(),readyPath=join(root,'monitor-ready.json'),envelopePath=join(root,'monitor.json');
 const original=budget.snapshot(session).contract;
 writeFileSync(envelopePath,JSON.stringify({schema:'lane-watch-output-monitor/v1',outputBudgetPath:join(root,'budget.sqlite'),outputLeaseId:session,
  watchDatabase:join(root,'watch.sqlite'),claudeHome:config,executable,eventPath:join(root,'monitor-events.jsonl'),readyPath,readyNonce,
  lease:{jobId,sessionId:boundSession,worktree:root,startedAt:beforeRelease.createdAt,deadlineAt:original.deadlineAt,tokenCap:original.outputTokenCap,tokenMetric:'output-tokens',pollMs:100,telemetryGraceMs:1000}}));
 monitor=Bun.spawn([process.execPath,resolve('src/native-output-watch.ts'),envelopePath],{cwd:root,stdin:'ignore',stdout:'pipe',stderr:'pipe',windowsHide:true});
 const monitorExit=observeOwnedProcessExit(monitor);
 monitorOutput=new Response(monitor.stdout).text();monitorError=new Response(monitor.stderr).text();
 const readyUntil=Date.now()+3000;
 do{if(!monitorExit.isRunning())throw Error('Owned output monitor exited before readiness');try{monitorReady=JSON.parse(readFileSync(readyPath,'utf8'));}catch{}if(monitorReady)break;await Bun.sleep(25);}while(Date.now()<readyUntil);
 if(!monitorReady||monitorReady.readyNonce!==readyNonce||monitorReady.pid!==monitor.pid||monitorReady.outputLeaseId!==session
  ||monitorReady.jobDigest!==jobDigest||monitorReady.deadlineAt!==original.deadlineAt)throw Error('Monitor readiness does not bind the prepared native lease');
 const ownedMonitor=monitorExit;
 budget.releaseNative(session,{jobDigest,monitorNonce:monitorReady.monitorNonce,pid:monitor.pid},ownedMonitor.isRunning);
 released=true;release();
 const until=Date.now()+6000;do{state=readState();if(terminal(state))break;await Bun.sleep(100);}while(Date.now()<until);
 beforeCleanup=state;
 if(upstreamCalls<1||upstreamCalls!==requestCount||outcomes.length!==upstreamCalls||outcomes.some((x:any)=>x.status!=='settled')||errors.length)throw Error('Background requests did not all settle');
}catch(e){failure=String(e);}
finally{
 clearTimeout(captureTimeout);release();
 state=readState();
 if(state&&!terminal(state)&&resolve(state.cwd)===root&&Date.parse(state.createdAt)>=startedAt){stop=await invoke(['stop',jobId!],5000);state=readState();}
 if(monitor){
  const reapTimer=setTimeout(()=>{if(monitor!.exitCode===null)monitor!.kill();},3000);
  const exit=await monitor.exited;clearTimeout(reapTimer);
  const output=await monitorOutput,stderr=await monitorError;
  monitorResult={pid:monitor.pid,exit,output:output?.slice(0,1500),stderr:stderr?.slice(0,1500)};
 }
 gateway.stop(true);upstream.stop(true);
}
const compact=(s:any)=>s?{sessionId:s.sessionId,cwd:s.cwd,createdAt:s.createdAt,state:s.state}:null;
const report={at:new Date().toISOString(),fixture:'installed-native-background-monitored-gateway',preparedLeaseId:session,boundSession,jobId,failure,
 launch:launch?{pid:launch.pid,exit:launch.exit,stdout:launch.stdout.slice(0,1000),stderr:launch.stderr.slice(0,1000)}:null,
 requestCount,requestShapes,requestKeys:keys,sessionMatches:observedSession===boundSession,upstreamCalls,beforeRelease:compact(beforeRelease),beforeCleanup:compact(beforeCleanup),after:compact(state),outcomes,errors,
 monitorReady,monitorResult,nativeGate:budget.nativeBinding(session),stop:stop?{pid:stop.pid,exit:stop.exit}:null,budget:budget.snapshot(session),
 scope:'Isolated native background --bare, no tools, dummy API key in explicit settings, local fake provider. Durable returned-job gate and a real output monitor are used. Does not prove production subscription/profile, subagents, monitor crash/hang supervision or process-tree deadline stopping.'};
writeFileSync(join(root,'report.json'),JSON.stringify(report,null,2));budget.close();console.log(JSON.stringify({report:join(root,'report.json'),...report}));if(failure||!monitorReady||monitorResult?.exit!==0)process.exitCode=1;
