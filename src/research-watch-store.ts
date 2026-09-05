import {Database} from 'bun:sqlite';
import {createHash,randomUUID} from 'node:crypto';
import {validateResearchWatchLease,type ResearchWatchLease,type ResearchWatchEvent,type ResearchWatchResult} from './research-runtime-watch';

export interface WatchClaim {sessionId:string;nonce:string;generation:number;recovered:boolean;observedTokens:number|null;lease:ResearchWatchLease}
type LeaseRow={session_id:string;job_id:string;lease_json:string;lease_digest:string;phase:string;owner_pid:number|null;owner_nonce:string|null;generation:number;high_tokens:number|null;result_json:string|null};
const digest=(value:string)=>createHash('sha256').update(value).digest('hex');
function canonicalLease(lease:ResearchWatchLease):string {
 validateResearchWatchLease(lease);
 return JSON.stringify({jobId:lease.jobId,sessionId:lease.sessionId,worktree:lease.worktree,startedAt:lease.startedAt,
  deadlineAt:lease.deadlineAt,tokenCap:lease.tokenCap,tokenMetric:lease.tokenMetric,pollMs:lease.pollMs,telemetryGraceMs:lease.telemetryGraceMs});
}
function processIsAlive(pid:number):boolean {
 try {process.kill(pid,0);return true;}catch(error:any){return error?.code!=='ESRCH';}
}
/** A durable bound-job registry, not a launch controller. Only a confirmed dead
 * monitor permits recovery; PID reuse/permission uncertainty conservatively blocks it.
 * A recovered job is stopped by the runner, never given a fresh budget. */
export class ResearchWatchStore {
 private readonly db:Database;
 constructor(path:string,private readonly options:{ownerPid?:number;isAlive?:(pid:number)=>boolean}={}) {
  this.db=new Database(path,{create:true});
  this.db.exec(`PRAGMA journal_mode=WAL; PRAGMA synchronous=FULL; PRAGMA busy_timeout=1000;
   CREATE TABLE IF NOT EXISTS research_watch_leases (
    session_id TEXT PRIMARY KEY, job_id TEXT NOT NULL UNIQUE, lease_json TEXT NOT NULL, lease_digest TEXT NOT NULL,
    phase TEXT NOT NULL CHECK(phase IN ('bound','monitoring','attention','terminal')),
    owner_pid INTEGER, owner_nonce TEXT, generation INTEGER NOT NULL DEFAULT 0,
    high_tokens INTEGER CHECK(high_tokens IS NULL OR high_tokens>=0), last_observed_at TEXT, result_json TEXT);
   CREATE TABLE IF NOT EXISTS research_watch_events (
    sequence INTEGER PRIMARY KEY AUTOINCREMENT,session_id TEXT NOT NULL,owner_nonce TEXT NOT NULL,event_json TEXT NOT NULL);
   CREATE TRIGGER IF NOT EXISTS immutable_research_watch_lease
    BEFORE UPDATE OF session_id,job_id,lease_json,lease_digest ON research_watch_leases
    BEGIN SELECT RAISE(ABORT,'Runtime lease identity and bounds are immutable'); END;`);
 }
 close():void {this.db.close();}
 private row(sessionId:string):LeaseRow {
  const row=this.db.query('SELECT * FROM research_watch_leases WHERE session_id=?').get(sessionId) as LeaseRow|null;
  if(!row)throw Error('Unknown bound runtime lease');
  if(digest(row.lease_json)!==row.lease_digest)throw Error('Runtime lease digest mismatch');
  const lease=JSON.parse(row.lease_json);validateResearchWatchLease(lease);
  if(row.high_tokens!==null&&(!Number.isSafeInteger(row.high_tokens)||row.high_tokens<0))throw Error('Invalid persisted token counter');
  if(!Number.isSafeInteger(row.generation)||row.generation<0||!['bound','monitoring','attention','terminal'].includes(row.phase))throw Error('Invalid persisted monitor state');
  if(row.phase==='monitoring'&&(!Number.isSafeInteger(row.owner_pid)||!row.owner_pid||!row.owner_nonce||row.generation<1))throw Error('Incomplete persisted monitor ownership');
  if(lease.sessionId!==row.session_id||lease.jobId!==row.job_id)throw Error('Runtime lease identity mismatch');
  return row;
 }
 private owned(claim:WatchClaim):LeaseRow {
  const row=this.row(claim.sessionId);
  if(row.phase!=='monitoring'||row.owner_nonce!==claim.nonce||row.generation!==claim.generation)throw Error('Runtime monitor ownership changed');
  return row;
 }
 bind(lease:ResearchWatchLease):void {
  const json=canonicalLease(lease);
  this.db.transaction(()=>{
   this.db.query("INSERT INTO research_watch_leases(session_id,job_id,lease_json,lease_digest,phase) VALUES(?,?,?,?,'bound') ON CONFLICT(session_id) DO NOTHING")
    .run(lease.sessionId,lease.jobId,json,digest(json));
   if(this.row(lease.sessionId).lease_json!==json)throw Error('Cannot rebind a job or change its frozen runtime bounds');
  }).immediate();
 }
 claim(sessionId:string):WatchClaim {
  const pid=this.options.ownerPid??process.pid;
  if(!Number.isSafeInteger(pid)||pid<=0)throw Error('Invalid monitor process identity');
  return this.db.transaction(()=>{
   const row=this.row(sessionId);
   if(!['bound','monitoring'].includes(row.phase))throw Error('Terminal or attention leases require review; automatic watch restart is held');
   if(row.owner_pid!==null&&(this.options.isAlive??processIsAlive)(row.owner_pid))throw Error('The existing monitor may still be alive; no duplicate watcher started');
   const nonce=randomUUID(),generation=row.generation+1;
   this.db.query("UPDATE research_watch_leases SET phase='monitoring',owner_pid=?,owner_nonce=?,generation=? WHERE session_id=?")
    .run(pid,nonce,generation,sessionId);
   this.db.query('INSERT INTO research_watch_events(session_id,owner_nonce,event_json) VALUES(?,?,?)')
    .run(sessionId,nonce,JSON.stringify({type:'monitor.claimed',at:new Date().toISOString(),pid,generation,recovered:row.generation>0}));
   return {sessionId,nonce,generation,recovered:row.generation>0,observedTokens:row.high_tokens,lease:JSON.parse(row.lease_json)};
  }).immediate();
 }
 checkpoint(claim:WatchClaim,state:{observedTokens:number|null;at:string;state:string}):void {
  if(state.observedTokens!==null&&(!Number.isSafeInteger(state.observedTokens)||state.observedTokens<0))throw Error('Invalid durable token observation');
  if(!Number.isFinite(Date.parse(state.at))||typeof state.state!=='string')throw Error('Invalid durable observation metadata');
  this.db.transaction(()=>{
   const row=this.owned(claim);
   const tokens=state.observedTokens===null?row.high_tokens:Math.max(row.high_tokens??0,state.observedTokens);
   this.db.query('UPDATE research_watch_leases SET high_tokens=?,last_observed_at=? WHERE session_id=?').run(tokens,state.at,claim.sessionId);
  }).immediate();
 }
 record(claim:WatchClaim,event:ResearchWatchEvent):void {
  this.db.transaction(()=>{
   const row=this.owned(claim);if(event.jobId!==row.job_id)throw Error('Audit event targets a different job');
   this.db.query('INSERT INTO research_watch_events(session_id,owner_nonce,event_json) VALUES(?,?,?)').run(claim.sessionId,claim.nonce,JSON.stringify(event));
  }).immediate();
 }
 finish(claim:WatchClaim,result:ResearchWatchResult):void {
  if(!['terminal','stopped','attention'].includes(result.status)||
    (result.observedTokens!==null&&(!Number.isSafeInteger(result.observedTokens)||result.observedTokens<0)))throw Error('Invalid terminal runtime observation');
  this.db.transaction(()=>{
   const row=this.owned(claim);
   const tokens=result.observedTokens===null?row.high_tokens:Math.max(row.high_tokens??0,result.observedTokens);
   this.db.query('UPDATE research_watch_leases SET phase=?,owner_pid=NULL,owner_nonce=NULL,high_tokens=?,result_json=? WHERE session_id=?')
    .run(result.status==='attention'?'attention':'terminal',tokens,JSON.stringify(result),claim.sessionId);
  }).immediate();
 }
 snapshot(sessionId:string):{phase:string;generation:number;observedTokens:number|null;lease:ResearchWatchLease;result:ResearchWatchResult|null} {
  const row=this.row(sessionId);
  return {phase:row.phase,generation:row.generation,observedTokens:row.high_tokens,lease:JSON.parse(row.lease_json),result:row.result_json?JSON.parse(row.result_json):null};
 }
}
