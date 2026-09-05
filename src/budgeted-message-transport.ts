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
    const usage:OutputUsage={outputTokens:result.usage.output_tokens,inputTokens:result.usage.input_tokens??null,
      cacheReadInputTokens:result.usage.cache_read_input_tokens??null,
      cacheCreationInputTokens:result.usage.cache_creation_input_tokens??null};
    this.budget.settle(leaseId,requestId,digest,usage);
    return result;
  }
}
