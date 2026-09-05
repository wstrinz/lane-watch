import {mkdirSync,writeFileSync} from 'node:fs';
import {join,resolve} from 'node:path';
import {randomUUID,createHash} from 'node:crypto';
import {OutputRequestBudget} from '../src/output-request-budget';
import {BudgetedMessageTransport} from '../src/budgeted-message-transport';
const root=resolve('tmp','native-stream-gateway-'+randomUUID());mkdirSync(root,{recursive:true});
const session=randomUUID(),config=join(root,'cli-config');mkdirSync(config);
const budget=new OutputRequestBudget(join(root,'budget.sqlite'));
budget.bind({leaseId:session,launchDigest:'c'.repeat(64),outputTokenCap:100000,deadlineAt:new Date(Date.now()+15000).toISOString()});
const ev=(type:string,extra:Record<string,unknown>={})=>`event: ${type}\ndata: ${JSON.stringify({type,...extra})}\n\n`;
let contextManagementEditTypes:unknown[]=[];
let upstreamCalls=0,requestCount=0,observedKeys:string[]=[],headerNames:string[]=[],observedSession='',requestMax:number|null=null;
let capture!:()=>void,release!:()=>void;const captured=new Promise<void>(r=>capture=r),released=new Promise<void>(r=>release=r);
let wasReleased=false;const transportOutcomes:unknown[]=[],gatewayErrors:string[]=[];
const upstream=Bun.serve({hostname:'127.0.0.1',port:0,async fetch(request){
 upstreamCalls++;if(!wasReleased)throw Error('Upstream entered before local release');
 const body=await request.json() as any;
 const stream=ev('message_start',{message:{id:'msg_local_fixture',type:'message',role:'assistant',model:body.model,content:[],stop_reason:null,stop_sequence:null,usage:{input_tokens:10,output_tokens:1}}})
 +ev('ping')+ev('content_block_start',{index:0,content_block:{type:'text',text:''}})
 +ev('content_block_delta',{index:0,delta:{type:'text_delta',text:'fixture-complete'}})+ev('content_block_stop',{index:0})
 +ev('message_delta',{delta:{stop_reason:'end_turn',stop_sequence:null},usage:{output_tokens:7}})+ev('message_stop');
 return new Response(stream,{headers:{'content-type':'text/event-stream'}});
}});
const gateway=Bun.serve({hostname:'127.0.0.1',port:0,async fetch(request){
 const url=new URL(request.url);
 if(request.method!=='POST'||url.pathname!=='/v1/messages')return new Response('Fixture endpoint unavailable',{status:404});
 requestCount++;const body=await request.json() as any;observedKeys=Object.keys(body).sort();contextManagementEditTypes=body.context_management?.edits?.map((x:any)=>x.type)||[];headerNames=[...request.headers.keys()].sort();
 observedSession=request.headers.get('x-claude-code-session-id')||'';requestMax=body.max_tokens;capture();
 if(observedSession!==session)return new Response('Fixture session mismatch',{status:409});
 await released;
 try {
  const headers:Record<string,string>={};for(const key of ['anthropic-version','anthropic-beta']){const value=request.headers.get(key);if(value)headers[key]=value;}
  const transport=new BudgetedMessageTransport(budget,new URL('/v1/messages',upstream.url),headers);
  const sent=await transport.sendStream(session,'request-'+requestCount,body,request.signal);
  void sent.completion.then(x=>transportOutcomes.push(x));return sent.response;
 }catch(error){gatewayErrors.push(error instanceof Error?error.message:'unknown');return Response.json({type:'error',error:{type:'invalid_request_error',message:'Local fixture request held'}},{status:400});}
}});
const env:Record<string,string>={};for(const key of ['SystemRoot','WINDIR','COMSPEC','PATH','PATHEXT','TEMP','TMP'])if(process.env[key])env[key]=process.env[key]!;
Object.assign(env,{CLAUDE_CONFIG_DIR:config,ANTHROPIC_API_KEY:'local-fixture-only',ANTHROPIC_BASE_URL:gateway.url.toString(),CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC:'1',DISABLE_AUTOUPDATER:'1',DISABLE_TELEMETRY:'1',DISABLE_ERROR_REPORTING:'1'});
const executable='C:/nvm4w/nodejs/node_modules/@anthropic-ai/claude-code/bin/claude.exe';
const child=Bun.spawn([executable,'--bare','--print','--output-format','json','--session-id',session,'--model','claude-sonnet-4-6','--tools','','--strict-mcp-config','--mcp-config','{"mcpServers":{}}','--','Return fixture-complete.'],{cwd:root,env,stdin:'ignore',stdout:'pipe',stderr:'pipe',windowsHide:true});
const stdout=new Response(child.stdout).text(),stderr=new Response(child.stderr).text();
let timeout:ReturnType<typeof setTimeout>|undefined,exitCode:number|null=null,failure='';
try {
 await Promise.race([captured,child.exited.then(code=>{throw Error('Native CLI exited before request: '+code);}),new Promise((_,reject)=>{timeout=setTimeout(()=>reject(Error('No native request within 8 seconds')),8000);})]);clearTimeout(timeout);
 if(upstreamCalls!==0)throw Error('Upstream entered before release');
 wasReleased=true;release();
 exitCode=await Promise.race([child.exited,new Promise<never>((_,reject)=>{timeout=setTimeout(()=>reject(Error('Native fixture exceeded 6-second completion bound')),6000);})]);clearTimeout(timeout);
}catch(error){failure=error instanceof Error?error.message:'unknown';clearTimeout(timeout);release();if(child.exitCode===null)child.kill();exitCode=await child.exited;}
finally{gateway.stop(true);upstream.stop(true);}
const out=await stdout,err=await stderr;
const record={at:new Date().toISOString(),fixture:'installed-native-foreground-to-local-stream-gateway',session,executable,childPid:child.pid,exitCode,failure,
 requestCount,observedKeys,contextManagementEditTypes,headerNames,sessionMatches:observedSession===session,requestMax,upstreamCalls,transportOutcomes,gatewayErrors,
 outputMatched:out.includes('fixture-complete'),stdoutBytes:Buffer.byteLength(out),stderrBytes:Buffer.byteLength(err),stderrDiagnostic:err.slice(0,2000).replaceAll('local-fixture-only','[dummy key]'),stdoutSha256:createHash('sha256').update(out).digest('hex'),
 budget:budget.snapshot(session),scope:'Foreground --bare, no tools, dummy key, isolated configuration and local fake provider only. Does not verify background daemon, real provider, child ownership or runtime deadline shutdown.'};
writeFileSync(join(root,'report.json'),JSON.stringify(record,null,2));budget.close();console.log(JSON.stringify({report:join(root,'report.json'),...record}));
if(failure||exitCode!==0||!record.outputMatched||!record.sessionMatches||upstreamCalls!==1||gatewayErrors.length)process.exitCode=1;

