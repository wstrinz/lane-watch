import type {OutputUsage} from './output-request-budget';

/** Incremental accounting inspector; content bytes are relayed separately.
 * Settlement requires message_stop AND clean EOF. It does not reconstruct text
 * or sum cumulative message_delta counts. Unknown events retain the reservation.
 */
export class MessageStreamAccounting {
  private readonly decoder=new TextDecoder('utf-8',{fatal:true});
  private buffer=''; private event=''; private data:string[]=[]; private eventSize=0;
  private started=false; private stopped=false; private deltaSeen=false;
  private output=0; private reason:string|null=null; private blocks=new Set<number>();
  private seenBlocks=new Set<number>();
  private input:number|null=null; private cacheRead:number|null=null; private cacheCreate:number|null=null;
  constructor(private readonly observeOutput:(tokens:number)=>void,private readonly unsupported:(reason:string)=>void) {}
  push(bytes:Uint8Array):void {this.buffer+=this.decoder.decode(bytes,{stream:true});this.lines(false);}
  private lines(final:boolean):void {
    for (;;) {
      const match=/[\r\n]/.exec(this.buffer);if(!match)break;
      const at=match.index;
      if(!final&&at===this.buffer.length-1&&this.buffer[at]==='\r')break;
      const line=this.buffer.slice(0,at),size=this.buffer[at]==='\r'&&this.buffer[at+1]==='\n'?2:1;
      this.buffer=this.buffer.slice(at+size);this.line(line);
    }
    if(this.buffer.length>262144)throw Error('SSE line exceeds accounting bound');
  }
  private line(line:string):void {
    this.eventSize+=line.length+1;
    if(this.eventSize>262144)throw Error('SSE event exceeds accounting bound');
    if(line==='') {if(this.data.length)this.dispatch();this.event='';this.data=[];this.eventSize=0;return;}
    if(line.startsWith(':'))return;
    const colon=line.indexOf(':'),key=colon<0?line:line.slice(0,colon);
    let value=colon<0?'':line.slice(colon+1);if(value.startsWith(' '))value=value.slice(1);
    if(key==='event')this.event=value;
    else if(key==='data')this.data.push(value);
    else if(!['id','retry'].includes(key))throw Error('Unsupported SSE field');
  }
  private count(value:unknown):number {
    if(!Number.isSafeInteger(value)||Number(value)<0)throw Error('Invalid streamed token count');return Number(value);
  }
  private usage(value:any,outputRequired:boolean):void {
    if(!value||typeof value!=='object')throw Error('Missing streamed usage');
    if(value.iterations?.length){this.unsupported('Stream uses unverified multi-attempt accounting');throw Error('Unverified multi-attempt accounting');}
    if(outputRequired||value.output_tokens!==undefined){
      const n=this.count(value.output_tokens);this.observeOutput(n);
      if(n<this.output)throw Error('Cumulative output counter decreased');this.output=n;
    }
    if(value.input_tokens!==undefined)this.input=Math.max(this.input??0,this.count(value.input_tokens));
    if(value.cache_read_input_tokens!==undefined)this.cacheRead=Math.max(this.cacheRead??0,this.count(value.cache_read_input_tokens));
    if(value.cache_creation_input_tokens!==undefined)this.cacheCreate=Math.max(this.cacheCreate??0,this.count(value.cache_creation_input_tokens));
  }
  private dispatch():void {
    const value=JSON.parse(this.data.join('\n'));
    if(!value||typeof value.type!=='string'||value.type!==this.event)throw Error('SSE event/data type mismatch');
    if(value.type==='ping')return;
    if(this.stopped)throw Error('Event after terminal message');
    if(value.type==='error')throw Error('Provider stream error');
    if(value.type==='message_start'){
      if(this.started||value.message?.type!=='message'||value.message?.role!=='assistant'
        ||typeof value.message?.id!=='string'||!value.message.id||!Array.isArray(value.message.content)||value.message.content.length)
        throw Error('Invalid or repeated message start');
      this.started=true;this.usage(value.message.usage,true);return;
    }
    if(!this.started)throw Error('Stream event before message start');
    if(value.type==='content_block_start'){
      const index=this.count(value.index);
      if(this.deltaSeen||this.seenBlocks.has(index)||!value.content_block)throw Error('Invalid content block start');
      if(value.content_block.type==='fallback'){this.unsupported('Stream used unreserved server fallback');throw Error('Unreserved server fallback');}
      this.seenBlocks.add(index);this.blocks.add(index);return;
    }
    if(value.type==='content_block_delta'||value.type==='content_block_stop'){
      const index=this.count(value.index);if(!this.blocks.has(index)||this.deltaSeen)throw Error('Unbound content block event');
      if(value.type==='content_block_stop')this.blocks.delete(index);return;
    }
    if(value.type==='message_delta'){
      if(this.blocks.size)throw Error('Message delta before content blocks closed');
      this.usage(value.usage,true);this.deltaSeen=true;
      if(value.delta?.stop_reason!==undefined&&value.delta.stop_reason!==null){
        if(typeof value.delta.stop_reason!=='string'||this.reason&&this.reason!==value.delta.stop_reason)throw Error('Conflicting stop reason');
        this.reason=value.delta.stop_reason;
      }
      return;
    }
    if(value.type==='message_stop'){
      if(this.blocks.size||!this.deltaSeen||!this.reason)throw Error('Message stop without complete usage');
      this.stopped=true;return;
    }
    // Future events can be relayed by a later reviewed accounting implementation.
    // This one refuses settlement rather than assuming they are free generation.
    throw Error('Unsupported stream event; reservation retained');
  }
  finish():OutputUsage {
    this.buffer+=this.decoder.decode();this.lines(true);
    if(this.buffer||this.data.length||this.event||!this.started||!this.stopped)throw Error('Truncated Messages stream');
    return {outputTokens:this.output,inputTokens:this.input,cacheReadInputTokens:this.cacheRead,cacheCreationInputTokens:this.cacheCreate};
  }
}
