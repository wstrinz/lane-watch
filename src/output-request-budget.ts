import { Database } from 'bun:sqlite';
import { createHash } from 'node:crypto';

export interface OutputBudgetContract {
  leaseId: string;
  launchDigest: string;
  outputTokenCap: number;
  deadlineAt: string;
}
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
  constructor(path: string) {
    this.db = new Database(path, { create: true });
    this.db.exec(`PRAGMA journal_mode=WAL; PRAGMA synchronous=FULL; PRAGMA busy_timeout=1000;
      CREATE TABLE IF NOT EXISTS output_budget_contracts (
        lease_id TEXT PRIMARY KEY, contract_json TEXT NOT NULL, contract_digest TEXT NOT NULL);
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
  close(): void { this.db.close(); }
  bind(contract: OutputBudgetContract): void {
    identifier(contract.leaseId); sha(contract.launchDigest); integer(contract.outputTokenCap, 1);
    const deadline = Date.parse(contract.deadlineAt);
    if (!Number.isFinite(deadline) || new Date(deadline).toISOString() !== contract.deadlineAt) throw Error('Deadline must be canonical UTC');
    const json = JSON.stringify({ leaseId: contract.leaseId, launchDigest: contract.launchDigest,
      outputTokenCap: contract.outputTokenCap, deadlineAt: contract.deadlineAt });
    this.db.transaction(() => {
      this.db.query('INSERT INTO output_budget_contracts VALUES(?,?,?) ON CONFLICT(lease_id) DO NOTHING').run(contract.leaseId, json, hash(json));
      if (JSON.stringify(this.contract(contract.leaseId)) !== json) throw Error('Cannot replace a frozen output budget');
    }).immediate();
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
      const state = this.snapshot(leaseId);
      if (state.holdReason) throw Error('Output budget held: ' + state.holdReason);
      if (Date.now() >= Date.parse(state.contract.deadlineAt)) throw Error('Output request deadline reached');
      if (maxOutputTokens > state.remainingOutputTokens) throw Error('Output allowance insufficient');
      this.db.query('INSERT INTO output_budget_requests VALUES(?,?,?,?,NULL)').run(leaseId, requestId, requestDigest, maxOutputTokens);
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
