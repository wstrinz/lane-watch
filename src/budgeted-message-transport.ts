import {MessageStreamAccounting} from './message-stream-accounting';
import {createHash} from 'node:crypto';
import {OutputRequestBudget, type OutputUsage} from './output-request-budget';

/** Candidate non-streaming Messages transport. No retries, redirects or hidden
 * SDK requests. This is not wired to a production CLI, custody or campaign
 * launcher. Its abort ends local waiting; it does not prove provider shutdown.
 */
export class BudgetedMessageTransport {
  private readonly endpoint: URL;
  private readonly headers: Readonly<Record<string,string>>;
  constructor(private readonly budget: OutputRequestBudget,
    endpoint: URL, headers: Readonly<Record<string,string>>) {
    if (!['https:','http:'].includes(endpoint.protocol) || endpoint.username || endpoint.password || endpoint.hash || endpoint.search)
      throw Error('Unsupported Messages endpoint');
    if (endpoint.protocol==='http:' && !['127.0.0.1','[::1]'].includes(endpoint.hostname))
      throw Error('Plain HTTP is permitted only for loopback fixtures');
    if (endpoint.pathname !== '/v1/messages') throw Error('Expected a single Messages endpoint');
    this.endpoint = new URL(endpoint.href);
    this.headers = Object.freeze({...headers});
  }
  async send(leaseId: string, requestId: string, body: Record<string,unknown>): Promise<unknown> {
    if (body.stream !== false || !Number.isSafeInteger(body.max_tokens) || Number(body.max_tokens)<=0)
      throw Error('Only explicit bounded non-streaming Messages requests are supported');
    if (typeof body.model!=='string'||!body.model||!Array.isArray(body.messages)||!body.messages.length)
      throw Error('Missing Messages model or input');
    // No server tools or other request families in this initial transport.
    const allowed = new Set(['model','messages','max_tokens','stream','system','temperature','stop_sequences']);
    if (Object.keys(body).some(key=>!allowed.has(key))) throw Error('Unsupported Messages request option');
    const serialized=JSON.stringify(body);
    if (Buffer.byteLength(serialized)>1024*1024) throw Error('Messages request exceeds bounded transport size');
    const frozen=JSON.parse(serialized);
    // Revalidate after serialization: caller objects may have getters/toJSON.
    if (frozen.stream!==false || !Number.isSafeInteger(frozen.max_tokens) || frozen.max_tokens<=0
      || typeof frozen.model!=='string' || !Array.isArray(frozen.messages) || !frozen.messages.length
      || Object.keys(frozen).some(key=>!allowed.has(key))) throw Error('Serialized request changed contract');
    const digest=createHash('sha256').update(serialized).digest('hex');
    this.budget.reserve(leaseId,requestId,digest,frozen.max_tokens);
    const remaining=Date.parse(this.budget.snapshot(leaseId).contract.deadlineAt)-Date.now();
    if (remaining<=0) throw Error('Deadline reached before transport; reservation retained');
    // A finite I/O bound is separate from the whole-worker deadline.
    const signal=AbortSignal.timeout(Math.min(remaining,30000));
    const response=await fetch(this.endpoint,{method:'POST',headers:{...this.headers,'content-type':'application/json'},
      body:serialized,signal,redirect:'error'});
    if (!response.ok) { await response.body?.cancel(); throw Error('Messages transport failed; reservation retained'); }
    if (!response.body) throw Error('Missing Messages response; reservation retained');
    const reader=response.body.getReader(),chunks:Uint8Array[]=[];let size=0;
    try {
      for (;;) {
        const {done,value}=await reader.read();if(done)break;
        size+=value.byteLength;
        if(size>4*1024*1024)throw Error('Messages response exceeds bounded transport size');
        chunks.push(value);
      }
    } catch (error) { await reader.cancel().catch(()=>{}); throw error; }
    finally {reader.releaseLock();}
    const result=JSON.parse(Buffer.concat(chunks).toString('utf8'));
    if (result.type!=='message'||typeof result.id!=='string'||!result.id||result.role!=='assistant'
      || !['end_turn','max_tokens','stop_sequence','refusal'].includes(result.stop_reason)
      || !Array.isArray(result.content) || !result.usage) throw Error('Incomplete terminal Messages response; reservation retained');
    if(result.usage.iterations?.length||result.content.some((block:any)=>block?.type==='fallback')) {
      this.budget.hold(leaseId,'Response uses unverified multi-attempt accounting');
      throw Error('Unverified multi-attempt accounting; reservation retained');
    }
    const usage:OutputUsage={outputTokens:result.usage.output_tokens,inputTokens:result.usage.input_tokens??null,
      cacheReadInputTokens:result.usage.cache_read_input_tokens??null,
      cacheCreationInputTokens:result.usage.cache_creation_input_tokens??null};
    this.budget.settle(leaseId,requestId,digest,usage);
    return result;
  }

  /** Candidate streamed request boundary. Preserve SSE bytes/pings as they arrive.
   * Not yet a native gateway: fallback/server-side tools and unreviewed request
   * options are refused, not stripped. No production launch uses this method.
   */
  async sendStream(leaseId:string,requestId:string,body:Record<string,unknown>,downstream?:AbortSignal):Promise<{
    response:Response; completion:Promise<{status:'settled'|'uncertain';reason:string}>
  }> {
    const serialized=JSON.stringify(body);
    if(Buffer.byteLength(serialized)>1024*1024)throw Error('Messages request exceeds bounded transport size');
    const frozen=JSON.parse(serialized);
    const allowed=new Set(['model','messages','max_tokens','stream','system','temperature','stop_sequences',
      'tools','tool_choice','thinking','output_config','metadata','cache_control','service_tier','speed','context_management']);
    if(frozen.stream!==true||!Number.isSafeInteger(frozen.max_tokens)||frozen.max_tokens<=0
      ||typeof frozen.model!=='string'||!frozen.model||!Array.isArray(frozen.messages)||!frozen.messages.length
      ||Object.keys(frozen).some(key=>!allowed.has(key)))throw Error('Unsupported bounded streaming request');
    if(frozen.tools!==undefined&&(!Array.isArray(frozen.tools)||frozen.tools.some((tool:any)=>
      !tool||typeof tool.name!=='string'||!tool.input_schema||tool.type!==undefined&&tool.type!=='custom')))
      throw Error('Unverified server tool accounting');
    if(frozen.context_management!==undefined&&(!frozen.context_management||Object.keys(frozen.context_management).some(key=>key!=='edits')
      ||!Array.isArray(frozen.context_management.edits)||frozen.context_management.edits.some((edit:any)=>
        !['clear_thinking_20251015','clear_tool_uses_20250919'].includes(edit?.type))))
      throw Error('Unverified context-management generation accounting');
    if(downstream?.aborted)throw Error('Downstream already cancelled');
    const digest=createHash('sha256').update(serialized).digest('hex');
    this.budget.reserve(leaseId,requestId,digest,frozen.max_tokens);
    const remaining=Date.parse(this.budget.snapshot(leaseId).contract.deadlineAt)-Date.now();
    if(remaining<=0)throw Error('Deadline reached before transport; reservation retained');
    const abort=new AbortController(),cancel=()=>abort.abort();
    downstream?.addEventListener('abort',cancel,{once:true});
    const timer=setTimeout(cancel,Math.min(remaining,30000));
    const cleanup=()=>{clearTimeout(timer);downstream?.removeEventListener('abort',cancel);};
    let upstream:Response;
    try {
      upstream=await fetch(this.endpoint,{method:'POST',headers:{...this.headers,'content-type':'application/json'},
        body:serialized,signal:abort.signal,redirect:'error'});
      if(!upstream.ok||!upstream.body||!upstream.headers.get('content-type')?.toLowerCase().startsWith('text/event-stream')){
        await upstream.body?.cancel();throw Error('Invalid streaming transport response; reservation retained');
      }
    } catch(error){cleanup();abort.abort();throw error;}
    const reader=upstream.body!.getReader();let size=0,finished=false;
    let complete!:(value:{status:'settled'|'uncertain';reason:string})=>void;
    const completion=new Promise<{status:'settled'|'uncertain';reason:string}>(resolve=>complete=resolve);
    const finish=(status:'settled'|'uncertain',reason:string)=>{
      if(finished)return;finished=true;cleanup();complete({status,reason});
    };
    const inspector=new MessageStreamAccounting(tokens=>{
      if(tokens>frozen.max_tokens){this.budget.hold(leaseId,'Stream output exceeds its reserved maximum');throw Error('Stream output exceeds its reserved maximum');}
    },reason=>this.budget.hold(leaseId,reason));
    let streamController:ReadableStreamDefaultController<Uint8Array>|undefined;
    const onAbort=()=>{
      if(finished)return;
      finish('uncertain','Local stream cancelled or deadline reached; reservation retained');
      void reader.cancel().catch(()=>{});
      try{streamController?.error(Error('Streaming transport aborted'));}catch{}
    };
    abort.signal.addEventListener('abort',onAbort,{once:true});
    const stream=new ReadableStream<Uint8Array>({
      start(controller){streamController=controller;},
      pull:async controller=>{
        if(finished)return;
        try {
          const chunk=await reader.read();if(finished)return;
          if(chunk.done){
            const usage=inspector.finish();
            this.budget.settle(leaseId,requestId,digest,usage);
            finish('settled','Complete streamed usage verified');
            abort.signal.removeEventListener('abort',onAbort);reader.releaseLock();controller.close();return;
          }
          size+=chunk.value.byteLength;if(size>16*1024*1024)throw Error('Messages stream exceeds bounded transport size');
          inspector.push(chunk.value);controller.enqueue(chunk.value);
        }catch(error){
          finish('uncertain',error instanceof Error?error.message:'Stream accounting failed; reservation retained');
          abort.signal.removeEventListener('abort',onAbort);abort.abort();void reader.cancel().catch(()=>{});
          try{controller.error(error);}catch{}
        }
      },
      cancel:()=>{finish('uncertain','Downstream cancelled; reservation retained');abort.signal.removeEventListener('abort',onAbort);abort.abort();return reader.cancel().catch(()=>{});}
    });
    if(abort.signal.aborted)onAbort();
    const headers=new Headers(upstream.headers);
    for(const key of ['content-length','content-encoding','transfer-encoding','connection'])headers.delete(key);
    return {response:new Response(stream,{status:upstream.status,headers}),completion};
  }
}
