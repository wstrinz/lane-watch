import {expect,test} from 'bun:test';
import {MessageStreamAccounting} from '../src/message-stream-accounting';
const encoder=new TextEncoder();
const event=(type:string,value:Record<string,unknown>={})=>`event: ${type}\r\ndata: ${JSON.stringify({type,...value})}\r\n\r\n`;
const start=event('message_start',{message:{id:'message-one',type:'message',role:'assistant',content:[],usage:{output_tokens:1,input_tokens:5,cache_read_input_tokens:20}}});
const block=event('content_block_start',{index:0,content_block:{type:'text',text:''}})+event('content_block_delta',{index:0,delta:{type:'text_delta',text:'α🧮'}})+event('content_block_stop',{index:0});
const tail=event('message_delta',{delta:{stop_reason:null},usage:{output_tokens:3}})+event('message_delta',{delta:{stop_reason:'end_turn'},usage:{output_tokens:7}})+event('message_stop');
export const completeFixture=start+': keepalive\r\n\r\n'+event('ping')+block+tail;
function inspector(){return new MessageStreamAccounting(()=>{},()=>{});}
test('every byte split preserves UTF-8/CRLF parsing and cumulative output is not summed',()=>{
 const bytes=encoder.encode(completeFixture);
 for(let cut=0;cut<=bytes.length;cut++){
  const parser=inspector();parser.push(bytes.slice(0,cut));parser.push(bytes.slice(cut));
  const usage=parser.finish();expect(usage.outputTokens).toBe(7);expect(usage.inputTokens).toBe(5);
 }
 const oneByte=inspector();for(const byte of bytes)oneByte.push(Uint8Array.of(byte));expect(oneByte.finish().cacheReadInputTokens).toBe(20);
});
test('terminal marker alone, missing EOF framing, errors and counter regressions never settle',()=>{
 const bad=[event('message_stop'),start+tail.slice(0,-2),start+event('error',{error:{type:'overloaded_error'}}),
 start+event('message_delta',{delta:{stop_reason:'end_turn'},usage:{output_tokens:0}})+event('message_stop'),
 start+block+event('message_stop'),completeFixture+event('message_delta',{delta:{stop_reason:'end_turn'},usage:{output_tokens:8}}),
 start+event('unknown_generation')+tail];
 for(const text of bad)expect(()=>{const p=inspector();p.push(encoder.encode(text));p.finish();}).toThrow();
});
test('fallback and multi-attempt usage invoke durable-hold hook rather than assuming one counter',()=>{
 for(const text of [start+event('content_block_start',{index:0,content_block:{type:'fallback'}}),
 start+event('message_delta',{delta:{stop_reason:'end_turn'},usage:{output_tokens:7,iterations:[{output_tokens:70}]}})]){
  const holds:string[]=[];const p=new MessageStreamAccounting(()=>{},r=>holds.push(r));
  expect(()=>p.push(encoder.encode(text))).toThrow();expect(holds.length).toBe(1);
 }
});
test('invalid UTF-8 and oversized SSE data fail within parser limits',()=>{
 expect(()=>inspector().push(Uint8Array.of(0xff))).toThrow();
 expect(()=>inspector().push(encoder.encode('data: '+'x'.repeat(262145)))).toThrow('bound');
});
