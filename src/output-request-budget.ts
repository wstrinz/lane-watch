import { Database } from 'bun:sqlite';
import { createHash } from 'node:crypto';

export interface OutputBudgetContract {
  leaseId: string;
  launchDigest: string;
  outputTokenCap: number;
  deadlineAt: string;
}
export interface NativeBudgetJob {jobId:string;sessionId:string;worktree:string;createdAt:string}
export interface NativeMonitorReady {jobDigest:string;monitorNonce:string;pid:number}
type NativeGateRow={lease_id:string;prepared_json:string;job_json:string|null;job_digest:string|null;monitor_json:string|null;phase:'prepared'|'bound'|'released'};
const normalizedWorktree=(value:string)=>/^[a-z]:[\\/]/i.test(value)?value.replaceAll('\\','/').replace(/\/+$/,'').toLowerCase():value.replace(/\/+$/,'')||'/';
export interface OutputUsage {
  outputTokens: number;
  inputTokens: number | null;
  cacheReadInputTokens: number | null;
  cacheCreationInputTokens: number | null;
}
type RequestRow = { lease_id: string; request_id: string; request_digest: string; reserved: number; usage_json: string | null };
const hash = (text: string) => createHash('sha256').update(text).digest('hex');
function integer(value: number, minimum = 0): void {
  if (!Number.isSafeInteger(value) || value < minimum) throw Error('Token counts must be safe nonnegative integers');
}
function identifier(value: string): void {
  if (typeof value !== 'string' || !/^[A-Za-z0-9._:-]{1,160}$/.test(value)) throw Error('Invalid budget identity');
}
function sha(value: string): void {
  if (!/^[a-f0-9]{64}$/.test(value)) throw Error('Expected SHA-256 binding');
}
/** Future request-broker accounting. Not a worker monitor or permission to launch.
 * Reserve before transport; never retry an existing request identity. Uncertain
 * requests keep their full reservation across restart. Only a verified terminal
 * response can settle usage. No production adapter uses this store yet.
 */
export class OutputRequestBudget {
  private readonly db: Database;
  private readonly ownedMonitors=new Map<string,{json:string;alive:()=>boolean}>();
  private readonly nativeDeadlines=new Map<string,number>();
  constructor(path: string,private readonly clock={wallNow:()=>Date.now(),monotonicNow:()=>performance.now()}) {
    this.db = new Database(path, { create: true });
    this.db.exec(`PRAGMA journal_mode=WAL; PRAGMA synchronous=FULL; PRAGMA busy_timeout=1000;
      CREATE TABLE IF NOT EXISTS output_budget_contracts (
        lease_id TEXT PRIMARY KEY, contract_json TEXT NOT NULL, contract_digest TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS output_budget_native_gates (
        lease_id TEXT PRIMARY KEY, prepared_json TEXT NOT NULL, job_json TEXT, job_digest TEXT, monitor_json TEXT,
        phase TEXT NOT NULL CHECK(phase IN ('prepared','bound','released')));
      CREATE TRIGGER IF NOT EXISTS immutable_native_preparation BEFORE UPDATE OF lease_id,prepared_json ON output_budget_native_gates
        BEGIN SELECT RAISE(ABORT,'Frozen native preparation'); END;
      CREATE TRIGGER IF NOT EXISTS immutable_native_job BEFORE UPDATE OF job_json,job_digest ON output_budget_native_gates
        WHEN OLD.job_json IS NOT NULL BEGIN SELECT RAISE(ABORT,'Frozen native job binding'); END;
      CREATE TABLE IF NOT EXISTS output_budget_holds (lease_id TEXT PRIMARY KEY, reason TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS output_budget_requests (
        lease_id TEXT NOT NULL, request_id TEXT NOT NULL, request_digest TEXT NOT NULL,
        reserved INTEGER NOT NULL CHECK(reserved>0), usage_json TEXT,
        PRIMARY KEY(lease_id,request_id), FOREIGN KEY(lease_id) REFERENCES output_budget_contracts(lease_id));
      CREATE TRIGGER IF NOT EXISTS immutable_output_budget_contract
        BEFORE UPDATE ON output_budget_contracts BEGIN SELECT RAISE(ABORT,'Frozen output budget'); END;
      CREATE TRIGGER IF NOT EXISTS immutable_output_request
        BEFORE UPDATE OF lease_id,request_id,request_digest,reserved ON output_budget_requests
        BEGIN SELECT RAISE(ABORT,'Frozen output request'); END;`);
  }
  close(): void { this.ownedMonitors.clear(); this.nativeDeadlines.clear(); this.db.close(); }
  private canonicalContract(contract:OutputBudgetContract):string {
    identifier(contract.leaseId); sha(contract.launchDigest); integer(contract.outputTokenCap, 1);
    const deadline = Date.parse(contract.deadlineAt);
    if (!Number.isFinite(deadline) || new Date(deadline).toISOString() !== contract.deadlineAt) throw Error('Deadline must be canonical UTC');
    return JSON.stringify({ leaseId: contract.leaseId, launchDigest: contract.launchDigest,
      outputTokenCap: contract.outputTokenCap, deadlineAt: contract.deadlineAt });
  }
  bind(contract:OutputBudgetContract):void {
    const json=this.canonicalContract(contract);
    this.db.transaction(() => {
      this.db.query('INSERT INTO output_budget_contracts VALUES(?,?,?) ON CONFLICT(lease_id) DO NOTHING').run(contract.leaseId, json, hash(json));
      if (JSON.stringify(this.contract(contract.leaseId)) !== json) throw Error('Cannot replace a frozen output budget');
    }).immediate();
  }

  /** Creates the allowance and its CLOSED native gate in the same transaction. */
  bindNative(contract:OutputBudgetContract,preparation:{worktree:string;preparedAt:string}):void {
    const json=this.canonicalContract(contract),at=Date.parse(preparation.preparedAt);
    if(!/^(?:[a-z]:[\\/]|\/)/i.test(preparation.worktree)||!Number.isFinite(at)
      ||new Date(at).toISOString()!==preparation.preparedAt||at>=Date.parse(contract.deadlineAt))throw Error('Invalid native preparation');
    const prepared=JSON.stringify({worktree:normalizedWorktree(preparation.worktree),preparedAt:preparation.preparedAt});
    const monotonicEnd=this.clock.monotonicNow()+Math.max(0,Date.parse(contract.deadlineAt)-this.clock.wallNow());
    let createdHere=false;
    this.db.transaction(()=>{
      const gate=this.nativeGate(contract.leaseId);createdHere=!gate;
      if(!gate&&this.db.query('SELECT 1 FROM output_budget_contracts WHERE lease_id=?').get(contract.leaseId))throw Error('Cannot convert an existing plain allowance to a native launch');
      this.db.query('INSERT INTO output_budget_contracts VALUES(?,?,?) ON CONFLICT(lease_id) DO NOTHING').run(contract.leaseId,json,hash(json));
      if(JSON.stringify(this.contract(contract.leaseId))!==json)throw Error('Cannot replace a frozen output budget');
      this.db.query("INSERT INTO output_budget_native_gates(lease_id,prepared_json,phase) VALUES(?,?,'prepared') ON CONFLICT(lease_id) DO NOTHING").run(contract.leaseId,prepared);
      if(this.nativeGate(contract.leaseId)!.prepared_json!==prepared)throw Error('Cannot change native preparation');
    }).immediate();
    if(createdHere)this.nativeDeadlines.set(contract.leaseId,monotonicEnd);
  }
  private nativeGate(leaseId:string):NativeGateRow|null {
    const row=this.db.query('SELECT * FROM output_budget_native_gates WHERE lease_id=?').get(leaseId) as NativeGateRow|null;
    if(row?.job_json&&hash(row.job_json)!==row.job_digest)throw Error('Native job binding digest mismatch');
    return row;
  }
  bindNativeJob(leaseId:string,job:NativeBudgetJob):string {
    if(!/^[a-f0-9]{8}$/.test(job.jobId)||!job.sessionId.startsWith(job.jobId+'-')
      ||!/^([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})$/.test(job.sessionId))throw Error('Invalid native job/session identity');
    const created=Date.parse(job.createdAt);
    if(!Number.isFinite(created)||created>this.clock.wallNow())throw Error('Invalid native creation time');
    return this.db.transaction(()=>{
      const gate=this.nativeGate(leaseId);if(!gate)throw Error('Native launch was not prepared');
      const prepared=JSON.parse(gate.prepared_json);
      if(normalizedWorktree(job.worktree)!==prepared.worktree||created<Date.parse(prepared.preparedAt))throw Error('Native job does not match prepared worktree/time');
      const json=JSON.stringify({jobId:job.jobId,sessionId:job.sessionId,worktree:normalizedWorktree(job.worktree),createdAt:new Date(created).toISOString()});
      if(gate.job_json!==null){if(gate.job_json!==json)throw Error('Cannot replace the bound native job');return gate.job_digest!;}
      this.db.query("UPDATE output_budget_native_gates SET job_json=?,job_digest=?,phase='bound' WHERE lease_id=? AND phase='prepared'").run(json,hash(json),leaseId);
      return hash(json);
    }).immediate();
  }
  /** Host must validate readiness from its owned monitor process. The callback
   * must use that process handle, never a PID lookup that could accept PID reuse.
   * Neither a persisted release nor a supplied nonce can restore this authority
   * in a new controller/store instance. No automatic re-release exists. */
  releaseNative(leaseId:string,ready:NativeMonitorReady,isOwnedMonitorAlive:()=>boolean):void {
    sha(ready.jobDigest);identifier(ready.monitorNonce);integer(ready.pid,1);
    const json=JSON.stringify({jobDigest:ready.jobDigest,monitorNonce:ready.monitorNonce,pid:ready.pid});
    this.db.transaction(()=>{
      const gate=this.nativeGate(leaseId),state=this.snapshot(leaseId);
      if(!gate||gate.phase!=='bound'||gate.job_digest!==ready.jobDigest)throw Error('Native gate is not bound to this monitor');
      const monotonicEnd=this.nativeDeadlines.get(leaseId);
      if(state.holdReason||monotonicEnd===undefined||this.clock.monotonicNow()>=monotonicEnd||this.clock.wallNow()>=Date.parse(state.contract.deadlineAt)||isOwnedMonitorAlive()!==true)throw Error('Native monitor is not live within the frozen contract');
      this.db.query("UPDATE output_budget_native_gates SET monitor_json=?,phase='released' WHERE lease_id=? AND phase='bound'").run(json,leaseId);
    }).immediate();
    this.ownedMonitors.set(leaseId,{json,alive:isOwnedMonitorAlive});
  }
  nativeBinding(leaseId:string):{phase:string;job:NativeBudgetJob|null;jobDigest:string|null;monitor:NativeMonitorReady|null}|null {
    const row=this.nativeGate(leaseId);return row?{phase:row.phase,job:row.job_json?JSON.parse(row.job_json):null,jobDigest:row.job_digest,monitor:row.monitor_json?JSON.parse(row.monitor_json):null}:null;
  }
  private assertNativeAdmission(leaseId:string):void {
    const gate=this.nativeGate(leaseId);if(!gate)return;
    const owned=this.ownedMonitors.get(leaseId);
    const monotonicEnd=this.nativeDeadlines.get(leaseId);
    if(gate.phase!=='released'||!owned||monotonicEnd===undefined||this.clock.monotonicNow()>=monotonicEnd||owned.json!==gate.monitor_json||owned.alive()!==true)throw Error('Native request gate has no live owned monitor release');
  }

  private contract(leaseId: string): OutputBudgetContract {
    const row = this.db.query('SELECT * FROM output_budget_contracts WHERE lease_id=?').get(leaseId) as {contract_json:string;contract_digest:string} | null;
    if (!row || hash(row.contract_json) !== row.contract_digest) throw Error('Missing or corrupt output budget');
    return JSON.parse(row.contract_json);
  }
  snapshot(leaseId: string) {
    const contract = this.contract(leaseId);
    const rows = this.db.query('SELECT * FROM output_budget_requests WHERE lease_id=?').all(leaseId) as RequestRow[];
    let chargedOutputTokens = 0, unresolvedRequests = 0, reportedOutputTokens = 0;
    const separate = {inputTokens: 0, cacheReadInputTokens: 0, cacheCreationInputTokens: 0};
    const missing = {inputTokens: 0, cacheReadInputTokens: 0, cacheCreationInputTokens: 0};
    for (const row of rows) {
      integer(row.reserved, 1);
      if (row.usage_json === null) { chargedOutputTokens += row.reserved; unresolvedRequests++; }
      else {
        const usage: OutputUsage = JSON.parse(row.usage_json);
        this.validateUsage(usage, row.reserved);
        chargedOutputTokens += usage.outputTokens; reportedOutputTokens += usage.outputTokens;
        for (const key of Object.keys(separate) as Array<keyof typeof separate>) {
          if (usage[key] === null) missing[key]++; else separate[key] += usage[key];
        }
      }
    }
    integer(chargedOutputTokens);
    if (chargedOutputTokens > contract.outputTokenCap) throw Error('Output budget invariant violated');
    const hold = this.db.query('SELECT reason FROM output_budget_holds WHERE lease_id=?').get(leaseId) as {reason:string} | null;
    return {contract, holdReason: hold?.reason ?? null, chargedOutputTokens, reportedOutputTokens, unresolvedRequests,
      remainingOutputTokens: contract.outputTokenCap - chargedOutputTokens,
      separateReportedUsage: separate, missingUsageReports: missing};
  }
  /** A repeated ID is rejected, including after a crash before network entry.
   * No caller may interpret it as permission to resend the original request. */
  reserve(leaseId: string, requestId: string, requestDigest: string, maxOutputTokens: number): void {
    identifier(requestId); sha(requestDigest); integer(maxOutputTokens, 1);
    this.db.transaction(() => {
      this.assertNativeAdmission(leaseId);
      const state = this.snapshot(leaseId);
      if (state.holdReason) throw Error('Output budget held: ' + state.holdReason);
      if (this.clock.wallNow() >= Date.parse(state.contract.deadlineAt)) throw Error('Output request deadline reached');
      if (maxOutputTokens > state.remainingOutputTokens) throw Error('Output allowance insufficient');
      this.db.query('INSERT INTO output_budget_requests VALUES(?,?,?,?,NULL)').run(leaseId, requestId, requestDigest, maxOutputTokens);
    }).immediate();
  }
  hold(leaseId: string, reason: string): void {
    if (!reason || reason.length>500) throw Error('Invalid output budget hold');
    this.db.transaction(() => {
      this.contract(leaseId);
      this.db.query('INSERT INTO output_budget_holds VALUES(?,?) ON CONFLICT(lease_id) DO NOTHING').run(leaseId,reason);
    }).immediate();
  }
  private validateUsage(usage: OutputUsage, reserved: number): void {
    integer(usage.outputTokens);
    if (usage.outputTokens > reserved) throw Error('Provider output exceeds its reserved maximum');
    for (const key of ['inputTokens','cacheReadInputTokens','cacheCreationInputTokens'] as const)
      if (usage[key] !== null) integer(usage[key]);
  }
  /** Call only with a complete terminal response bound to this exact request.
   * Interrupted streams, missing counters and transport errors must not settle. */
  settle(leaseId: string, requestId: string, requestDigest: string, usage: OutputUsage): void {
    const violation = this.db.transaction(() => {
      const row = this.db.query('SELECT * FROM output_budget_requests WHERE lease_id=? AND request_id=?').get(leaseId, requestId) as RequestRow | null;
      if (!row || row.request_digest !== requestDigest) throw Error('Terminal response does not bind the reserved request');
      if (Number.isSafeInteger(usage.outputTokens) && usage.outputTokens > row.reserved) {
        const reason = 'Provider output exceeds its reserved maximum';
        this.db.query('INSERT INTO output_budget_holds VALUES(?,?) ON CONFLICT(lease_id) DO NOTHING').run(leaseId,reason);
        return reason;
      }
      this.validateUsage(usage, row.reserved);
      const json = JSON.stringify({outputTokens:usage.outputTokens,inputTokens:usage.inputTokens,
        cacheReadInputTokens:usage.cacheReadInputTokens,cacheCreationInputTokens:usage.cacheCreationInputTokens});
      if (row.usage_json !== null && row.usage_json !== json) throw Error('Conflicting terminal usage');
      this.db.query('UPDATE output_budget_requests SET usage_json=? WHERE lease_id=? AND request_id=?').run(json,leaseId,requestId);
      return null;
    }).immediate();
    if (violation) throw Error(violation);
  }
}
