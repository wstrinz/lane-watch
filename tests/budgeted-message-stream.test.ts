import {afterEach,expect,test} from 'bun:test';
import {mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {OutputRequestBudget} from '../src/output-request-budget';
import {BudgetedMessageTransport} from '../src/budgeted-message-transport';
const cleanup:Array<()=>void>=[];afterEach(()=>{for(const f of cleanup.splice(0).reverse())f();});
const enc=new TextEncoder();
const event=(type:string,extra:Record<string,unknown>={})=>`event: ${type}\ndata: ${JSON.stringify({type,...extra})}\n\n`;
const prefix=event('message_start',{message:{id:'local',type:'message',role:'assistant',content:[],usage:{output_tokens:1,input_tokens:9000}}})+event('ping');
const ending=(tokens=7)=>event('message_delta',{delta:{stop_reason:'end_turn'},usage:{output_tokens:tokens}})+event('message_stop');
const body={model:'local-fixture',messages:[{role:'user',content:'fixture'}],stream:true,max_tokens:80,context_management:{edits:[{type:'clear_thinking_20251015',keep:'all'}]}};
function fixture(handler:(req:Request)=>Response|Promise<Response>,deadlineMs=60000){
 const root=mkdtempSync(join(tmpdir(),'stream-budget-'));cleanup.push(()=>rmSync(root,{recursive:true,force:true}));
 const budget=new OutputRequestBudget(join(root,'budget.sqlite'));cleanup.push(()=>budget.close());
 budget.bind({leaseId:'lease',launchDigest:'b'.repeat(64),outputTokenCap:100,deadlineAt:new Date(Date.now()+deadlineMs).toISOString()});
 const server=Bun.serve({hostname:'127.0.0.1',port:0,fetch:handler});cleanup.push(()=>server.stop(true));
 return {budget,transport:new BudgetedMessageTransport(budget,new URL('/v1/messages',server.url),{'anthropic-beta':'local-fixture-capability','anthropic-version':'2023-06-01'})};
}
test('HTTP stream relays ping before completion and settles only cumulative terminal output',async()=>{
 let release!:()=>void;const gate=new Promise<void>(r=>release=r);let sent=false;
 const {budget,transport}=fixture(async req=>{
  expect(req.headers.get('anthropic-beta')).toBe('local-fixture-capability');
  const received=await req.json() as any;expect(received.max_tokens).toBe(80);expect(received.context_management).toEqual(body.context_management);
  expect(budget.snapshot('lease').chargedOutputTokens).toBe(80);
  return new Response(new ReadableStream({start(c){c.enqueue(enc.encode(prefix));},async pull(c){if(sent)return;sent=true;await gate;c.enqueue(enc.encode(ending()));c.close();}}),{headers:{'content-type':'text/event-stream'}});
 });
 const {response,completion}=await transport.sendStream('lease','stream-one',body);
 const reader=response.body!.getReader();
 try {
  const first=await reader.read();expect(new TextDecoder().decode(first.value)).toContain('ping');
  expect(budget.snapshot('lease').remainingOutputTokens).toBe(20);
  release();let text=new TextDecoder().decode(first.value);
  for(;;){const next=await reader.read();if(next.done)break;text+=new TextDecoder().decode(next.value);}
  expect(text).toBe(prefix+ending());expect((await completion).status).toBe('settled');
  expect(budget.snapshot('lease').remainingOutputTokens).toBe(93);
 }finally{release();await reader.cancel().catch(()=>{});}
});
test('truncated stream and stream error retain full allowance',async()=>{
 for(const suffix of ['',event('error',{error:{type:'overloaded_error'}})]){
  const {budget,transport}=fixture(()=>new Response(prefix+suffix,{headers:{'content-type':'text/event-stream'}}));
  const sent=await transport.sendStream('lease','uncertain',body);
  await expect(sent.response.text()).rejects.toThrow();expect((await sent.completion).status).toBe('uncertain');
  expect(budget.snapshot('lease').remainingOutputTokens).toBe(20);
 }
});
test('downstream cancellation retains reservation even without reading upstream to EOF',async()=>{
 const {budget,transport}=fixture(()=>new Response(new ReadableStream({start(c){c.enqueue(enc.encode(prefix));}}),{headers:{'content-type':'text/event-stream'}}));
 const sent=await transport.sendStream('lease','cancel',body);
 await sent.response.body!.cancel();expect((await sent.completion).status).toBe('uncertain');
 expect(budget.snapshot('lease').remainingOutputTokens).toBe(20);
});
test('local deadline terminates an unread stream and retains the original reservation',async()=>{
 const {budget,transport}=fixture(()=>new Response(new ReadableStream({start(c){c.enqueue(enc.encode(prefix));}}),{headers:{'content-type':'text/event-stream'}}),400);
 const sent=await transport.sendStream('lease','deadline',body);
 expect((await sent.completion).status).toBe('uncertain');expect(budget.snapshot('lease').remainingOutputTokens).toBe(20);
 await expect(sent.response.text()).rejects.toThrow();
});
test('stream overrun holds future admission; fallback requests never reach the server',async()=>{
 let calls=0;const {budget,transport}=fixture(()=>{calls++;return new Response(prefix+ending(81),{headers:{'content-type':'text/event-stream'}});});
 await expect(transport.sendStream('lease','fallback',{...body,fallbacks:'default'})).rejects.toThrow('Unsupported');expect(calls).toBe(0);
 await expect(transport.sendStream('lease','compaction',{...body,context_management:{edits:[{type:'compact_20260112'}]}})).rejects.toThrow('context-management');
 const sent=await transport.sendStream('lease','overrun',body);await expect(sent.response.text()).rejects.toThrow('exceeds');
 expect((await sent.completion).status).toBe('uncertain');expect(budget.snapshot('lease').holdReason).toContain('exceeds');
 await expect(transport.sendStream('lease','later',{...body,max_tokens:1})).rejects.toThrow('held');expect(calls).toBe(1);
});
