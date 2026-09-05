export interface ResearchWatchLease {
  jobId: string;
  sessionId: string;
  worktree: string;
  startedAt: string;
  deadlineAt: string;
  tokenCap: number;
  /** This counter is intentionally not described as billing or total parent/child API usage. */
  tokenMetric: 'daemon-reported';
  pollMs: number;
  telemetryGraceMs: number;
}
export interface ResearchWatchObservation {
  jobId: string; sessionId: string; worktree: string; createdAt: string;
  state: string; observedTokens: number | null;
}
export type ResearchWatchEvent = {type: string; at: string; jobId: string; reason: string; observedTokens: number | null};
export interface ResearchWatchPort {
  now(): number;
  monotonicNow(): number;
  observe(jobId: string): Promise<ResearchWatchObservation | null>;
  stop(jobId: string): Promise<void>;
  wait(ms: number): Promise<void>;
  record(event: ResearchWatchEvent): Promise<void>;
  checkpoint?(state:{observedTokens:number|null;at:string;state:string}): Promise<void>;
}
export type ResearchWatchResult = { status: 'terminal'|'stopped'|'attention'; reason: string; stopAttempts: number; observedTokens: number | null; auditWriteFailures?: ResearchWatchEvent[] };
const TERMINAL = new Set(['done','stopped','failed','error','crashed','cancelled','canceled','complete','completed']);
const normalizedPath = (p: string) => p.replaceAll('\\','/').replace(/\/+$/,'').toLowerCase();
export function validateResearchWatchLease(lease: ResearchWatchLease): void {
  if (!/^[0-9a-f]{8}$/i.test(lease.jobId) || !lease.sessionId.startsWith(lease.jobId+'-') || !/^[0-9a-f-]{36}$/i.test(lease.sessionId)) throw Error('Invalid exact job/session binding');
  if (!/^(?:[a-z]:[\\/]|\/)/i.test(lease.worktree)) throw Error('Worktree must be absolute');
  if (!Number.isFinite(Date.parse(lease.startedAt)) || !Number.isFinite(Date.parse(lease.deadlineAt)) || Date.parse(lease.deadlineAt)<=Date.parse(lease.startedAt)) throw Error('Invalid runtime deadline');
  if (!Number.isSafeInteger(lease.tokenCap) || lease.tokenCap<=0 || lease.tokenMetric!=='daemon-reported') throw Error('Invalid runtime token policy');
  if (!Number.isInteger(lease.pollMs) || lease.pollMs<25 || lease.pollMs>1000 || !Number.isInteger(lease.telemetryGraceMs) || lease.telemetryGraceMs<lease.pollMs || lease.telemetryGraceMs>30_000) throw Error('Invalid runtime polling policy');
}
export function observationMatchesLease(lease: ResearchWatchLease, observed: ResearchWatchObservation): boolean {
  return typeof observed.worktree==='string' && typeof observed.createdAt==='string' && typeof observed.state==='string' && lease.jobId===observed.jobId && lease.sessionId===observed.sessionId && normalizedPath(lease.worktree)===normalizedPath(observed.worktree) && Date.parse(lease.startedAt)===Date.parse(observed.createdAt);
}
/** Stops only an exact observed owned job. A polling limit is a stop threshold,
 * not a hard token ceiling: in-flight generation/telemetry/stop latency can overshoot.
 * This kernel does not grant launch authority and is not yet the production adapter.
 */
export async function watchResearchRuntime(lease: ResearchWatchLease, port: ResearchWatchPort, recovery?:{observedTokens:number|null;recovered:boolean}): Promise<ResearchWatchResult> {
  validateResearchWatchLease(lease);
  if(recovery && (typeof recovery.recovered!=='boolean'||(recovery.observedTokens!==null&&(!Number.isSafeInteger(recovery.observedTokens)||recovery.observedTokens<0))))throw Error('Invalid recovery checkpoint');
  const initialWall=port.now(), initialMonotonic=port.monotonicNow();
  // A wall-clock correction may shorten the lease, but cannot extend its remaining duration.
  const watchNow=()=>Math.max(port.now(),initialWall+port.monotonicNow()-initialMonotonic);
  let unknownSince: number|null=null, tokens: number|null=recovery?.observedTokens??null, stopAttempts=0, stopRequestedAt=0, reason=recovery?.recovered?'supervisor-recovery':'';
  const auditWriteFailures: ResearchWatchEvent[] = [];
  // A rejected audit write must not prevent stopping an exactly owned job.
  // Returned events have unconfirmed persistence; they are not a durable journal.
  const event=async(type:string,why:string)=>{
    const entry={type,at:new Date(port.now()).toISOString(),jobId:lease.jobId,reason:why,observedTokens:tokens};
    try {await port.record(entry);} catch {auditWriteFailures.push(entry);reason ||= 'audit-unavailable';}
  };
  const finish=(status:ResearchWatchResult['status'],why:string):ResearchWatchResult=>({
    status,reason:why,stopAttempts,observedTokens:tokens,
    ...(auditWriteFailures.length ? {auditWriteFailures:[...auditWriteFailures]} : {}),
  });
  await event('watch.started','Exact job bound; daemon-reported token threshold and deadline monitored.');
  for (;;) {
    const now=watchNow();
    let observed: ResearchWatchObservation|null=null;
    try { observed=await port.observe(lease.jobId); } catch { /* Missing telemetry is retried against the same identity. */ }
    if (!observed) {
      unknownSince ??=now;
      if (now-unknownSince>=lease.telemetryGraceMs) {
        await event('watch.attention','Job telemetry unavailable; ownership cannot be revalidated, no stop or restart inferred.');
        return finish('attention','telemetry-unavailable');
      }
      await port.wait(lease.pollMs); continue;
    }
    if (!observationMatchesLease(lease,observed)) {
      await event('watch.attention','Job identity changed; no unrelated job was stopped.');
      return finish('attention','identity-mismatch');
    }
    const measured=observed.observedTokens;
    const valid=typeof measured==='number'&&Number.isSafeInteger(measured)&&measured>=0;
    if(valid) {
      if(tokens!==null&&measured<tokens){reason ||= 'counter-regressed';}
      tokens=Math.max(tokens??0,measured);
    }
    if(port.checkpoint){
      try {await port.checkpoint({observedTokens:tokens,at:new Date(port.now()).toISOString(),state:observed.state});}
      catch {
        reason ||= 'checkpoint-unavailable';
        auditWriteFailures.push({type:'watch.checkpoint',at:new Date(port.now()).toISOString(),jobId:lease.jobId,reason:'checkpoint-unavailable',observedTokens:tokens});
      }
    }
    if (TERMINAL.has(observed.state.toLowerCase())) {
      await event('watch.terminal',reason||'Worker was already terminal.');
      return finish(stopAttempts&&['stopped','cancelled','canceled'].includes(observed.state.toLowerCase())?'stopped':'terminal',reason||'already-terminal');
    }
    if (!valid) unknownSince ??=now; else unknownSince=null;
    if(now>=Date.parse(lease.deadlineAt))reason ||= 'deadline';
    if(tokens!==null&&tokens>=lease.tokenCap)reason ||= 'token-threshold';
    if(unknownSince!==null&&now-unknownSince>=lease.telemetryGraceMs)reason ||= 'usage-unavailable';
    if(reason) {
      if(stopAttempts && now-stopRequestedAt<2000){await port.wait(lease.pollMs);continue;}
      if(stopAttempts>=2){await event('watch.attention','Stop was requested twice but terminal state remains unconfirmed.');return finish('attention','stop-unconfirmed:'+reason);}
      stopAttempts++;stopRequestedAt=now;
      await event('watch.stop-requested',reason);
      try {await port.stop(lease.jobId);} catch {await event('watch.stop-error','Stop failed; re-observe this same job before another bounded stop attempt.');}
    }
    await port.wait(lease.pollMs);
  }
}
