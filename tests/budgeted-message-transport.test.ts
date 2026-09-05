import {afterEach,expect,test} from 'bun:test';
import {mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {OutputRequestBudget} from '../src/output-request-budget';
import {BudgetedMessageTransport} from '../src/budgeted-message-transport';
const cleanup:Array<()=>void>=[];
afterEach(()=>{for(const f of cleanup.splice(0).reverse())f();});
function fixture(handler:(request:Request)=>Response|Promise<Response>){
 const root=mkdtempSync(join(tmpdir(),'message-budget-'));cleanup.push(()=>rmSync(root,{recursive:true,force:true}));
 const path=join(root,'budget.sqlite'),budget=new OutputRequestBudget(path);cleanup.push(()=>budget.close());
 budget.bind({leaseId:'test',launchDigest:'a'.repeat(64),outputTokenCap:100,deadlineAt:new Date(Date.now()+60000).toISOString()});
 const server=Bun.serve({hostname:'127.0.0.1',port:0,fetch:handler});cleanup.push(()=>server.stop(true));
 const endpoint=new URL('/v1/messages',server.url);
 return {budget,path,transport:new BudgetedMessageTransport(budget,endpoint,{})};
}
const body=(max_tokens:number)=>({model:'local-fixture',messages:[{role:'user',content:'fixture'}],max_tokens,stream:false});
const reply=(output_tokens:number)=>Response.json({type:'message',id:'fixture-message',role:'assistant',stop_reason:'end_turn',content:[],usage:{output_tokens,input_tokens:1000,cache_read_input_tokens:9000}});
test('reservation precedes real HTTP and concurrent children cannot oversubscribe',async()=>{
 let calls=0,release!:()=>void;const gate=new Promise<void>(r=>release=r);
 const {budget,transport}=fixture(async request=>{calls++;const payload=await request.json() as any;expect(payload.max_tokens).toBe(80);expect(budget.snapshot('test').chargedOutputTokens).toBe(80);await gate;return reply(20);});
 const first=transport.send('test','first',body(80));
 try {await expect(transport.send('test','second',body(30))).rejects.toThrow('insufficient');}
 finally {release();}
 await first;expect(calls).toBe(1);expect(budget.snapshot('test').remainingOutputTokens).toBe(80);
 expect(budget.snapshot('test').separateReportedUsage.inputTokens).toBe(1000);
});
test('truncated response stays fully reserved after reopening; no automatic retry',async()=>{
 let calls=0;const {budget,path,transport}=fixture(()=>{calls++;return new Response('{"type":"message"');});
 await expect(transport.send('test','lost',body(80))).rejects.toThrow();
 const recovered=new OutputRequestBudget(path);cleanup.push(()=>recovered.close());
 expect(recovered.snapshot('test').remainingOutputTokens).toBe(20);
 await expect(transport.send('test','lost',body(10))).rejects.toThrow();expect(calls).toBe(1);
 expect(budget.snapshot('test').unresolvedRequests).toBe(1);
});
test('redirect cannot forward request or credentials; reservation stays charged',async()=>{
 let calls=0;const {budget,transport}=fixture(()=>{calls++;return new Response(null,{status:307,headers:{location:'http://127.0.0.1:1/other'}});});
 await expect(transport.send('test','redirect',body(60))).rejects.toThrow();
 expect(calls).toBe(1);expect(budget.snapshot('test').remainingOutputTokens).toBe(40);
});
test('provider overrun holds later transport; unsupported streaming does not enter HTTP',async()=>{
 let calls=0;const {budget,transport}=fixture(()=>{calls++;return reply(41);});
 await expect(transport.send('test','stream',{...body(40),stream:true})).rejects.toThrow('non-streaming');
 expect(calls).toBe(0);
 await expect(transport.send('test','overrun',body(40))).rejects.toThrow('exceeds');
 await expect(transport.send('test','next',body(1))).rejects.toThrow('held');
 expect(calls).toBe(1);expect(budget.snapshot('test').unresolvedRequests).toBe(1);
});
