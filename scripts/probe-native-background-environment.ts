import {mkdirSync,writeFileSync,readFileSync,existsSync} from 'node:fs';
import {join,resolve} from 'node:path';
import {randomUUID} from 'node:crypto';
const nonce=randomUUID(),session=randomUUID(),root=resolve('tmp','native-environment-'+nonce);mkdirSync(root,{recursive:true});
const config=join(root,'config');mkdirSync(config);
const fixture=join(root,'environment.cjs'),receipt=join(root,'environment.json');
writeFileSync(fixture,`const fs=require('node:fs'); const target=process.argv[2],expected=process.argv[3]; fs.writeFileSync(target,JSON.stringify({pid:process.pid,parentPid:process.ppid,at:new Date().toISOString(),nonceMatches:process.env.LANE_WATCH_FIXTURE_NONCE===expected,gatewayMatches:process.env.ANTHROPIC_BASE_URL==='http://127.0.0.1:9/no-inference',modelsInvoked:0}));setTimeout(()=>process.exit(0),3000);`);
const quote=(value:string)=>{if(/["\r\n`$]/.test(value))throw Error('Invalid fixture argument');return '"'+value.replaceAll('\\','/')+'"';};
const command=['C:/nvm4w/nodejs/node.exe',fixture,receipt,nonce].map(quote).join(' ');
const executable='C:/nvm4w/nodejs/node_modules/@anthropic-ai/claude-code/bin/claude.exe';
const child=Bun.spawn([executable,'--bg','--name','Lane Watch finite environment inheritance fixture','--exec',command],
 {cwd:root,env:{...process.env,CLAUDE_CONFIG_DIR:config,LANE_WATCH_FIXTURE_NONCE:nonce,ANTHROPIC_BASE_URL:'http://127.0.0.1:9/no-inference'},stdin:'ignore',stdout:'pipe',stderr:'pipe',windowsHide:true});
const timer=setTimeout(()=>{if(child.exitCode===null)child.kill();},5000);
const [out,err,code]=await Promise.all([new Response(child.stdout).text(),new Response(child.stderr).text(),child.exited]);clearTimeout(timer);
const match=out.match(/^backgrounded\s*·\s*([0-9a-f]{8})\s*·/m),jobId=match?.[1]??null;
const home=config;
let observed:any=null,metadata:any=null;
const end=Date.now()+6000;
while(Date.now()<end){
 if(existsSync(receipt))metadata=JSON.parse(readFileSync(receipt,'utf8'));
 if(jobId){try{observed=JSON.parse(readFileSync(join(home,'jobs',jobId,'state.json'),'utf8'));}catch{}}
 if(metadata&&observed&&['done','stopped','failed','error','crashed'].includes(observed.state))break;
 await Bun.sleep(100);
}
let fixtureAlive:boolean|null=null;if(metadata){try{process.kill(metadata.pid,0);fixtureAlive=true;}catch(e:any){if(e.code==='ESRCH')fixtureAlive=false;}}
const report={at:new Date().toISOString(),fixture:'native-background-exec-environment',modelsInvoked:0,nonce,requestedSession:null,launcherPid:child.pid,launcherExit:code,
 jobId,metadata,state:observed?{sessionId:observed.sessionId,cwd:observed.cwd,createdAt:observed.createdAt,state:observed.state}:null,
 jobSessionMatches:typeof observed?.sessionId==='string'&&observed.sessionId.startsWith(jobId+'-'),fixtureAlive,stderr:err.slice(0,1000),launchOutput:out.slice(0,1000),
 scope:'Finite Node --exec fixture only. No research model or background agent. Does not establish inference subprocess routing or a runtime monitor handshake.'};
writeFileSync(join(root,'report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({report:join(root,'report.json'),...report}));
if(code!==0||!metadata||fixtureAlive!==false||!report.jobSessionMatches||!metadata.gatewayMatches||!metadata.nonceMatches)process.exitCode=1;
