import { Database } from 'bun:sqlite';
import { createHash, randomUUID } from 'node:crypto';
import type { ResearchLaunchResult, ResearchLaunchSpec } from './research-execution-service';

export interface ResearchLaunchContext {
  attemptId: string; runId: string; scheduleId: string; specDigest: string;
  createdAt: string; deadlineAt: string; tokenBudget: number;
  enforcement: 'unverified-reservation';
}
export interface ResearchLaunchAttemptRow {
  attempt_id: string; project_id: string; schedule_id: string; request_id: string; run_id: string;
  launch_spec_json: string; spec_digest: string; created_at: string; deadline_at: string;
  status: 'prepared'|'entered'|'returned'|'uncertain'|'aborted'; receipt_json: string; error: string; updated_at: string;
}
const digest=(value:string)=>createHash('sha256').update(value).digest('hex');

/** Durable launch intent and transport outcome. This is not a running-job monitor or a hard cap. */
export class ResearchLaunchJournal {
  constructor(private readonly db:Database) {}
  prepare(input:{projectId:string;scheduleId:string;requestId:string;runId:string;spec:ResearchLaunchSpec;at:string}):ResearchLaunchContext {
    if(!Number.isSafeInteger(input.spec.tokenBudget)||input.spec.tokenBudget<=0||!Number.isFinite(input.spec.timeoutMinutes)||input.spec.timeoutMinutes<=0)throw Error('Launch intent requires finite positive frozen limits');
    const end=Date.parse(input.at)+input.spec.timeoutMinutes*60_000;
    if(!Number.isFinite(end)||Math.abs(end)>8.64e15)throw Error('Invalid launch intent deadline');
    const json=JSON.stringify(input.spec);if(json.length>64_000)throw Error('Launch intent exceeds 64 KB');
    const id=randomUUID(),sha=digest(json),deadline=new Date(end).toISOString();
    this.db.query(`INSERT INTO campaign_research_launch_attempts
      (attempt_id,project_id,schedule_id,request_id,run_id,launch_spec_json,spec_digest,created_at,deadline_at,status,receipt_json,error,updated_at)
      VALUES (?,?,?,?,?,?,?,?,?,'prepared','{}','',?)`).run(id,input.projectId,input.scheduleId,input.requestId,input.runId,json,sha,input.at,deadline,input.at);
    return Object.freeze({attemptId:id,runId:input.runId,scheduleId:input.scheduleId,specDigest:sha,createdAt:input.at,deadlineAt:deadline,tokenBudget:input.spec.tokenBudget,enforcement:'unverified-reservation'});
  }
  get(id:string):ResearchLaunchAttemptRow {
    const row=this.db.query('SELECT * FROM campaign_research_launch_attempts WHERE attempt_id=?').get(id) as ResearchLaunchAttemptRow|null;
    if(!row||digest(row.launch_spec_json)!==row.spec_digest)throw Error('Launch attempt missing or its frozen spec changed');
    return row;
  }
  enter(id:string,at:string):void {
    const row=this.get(id);
    if(!Number.isFinite(Date.parse(at))||Date.parse(at)>=Date.parse(row.deadline_at))throw Error('Frozen launch deadline expired before adapter entry');
    if(this.db.query("UPDATE campaign_research_launch_attempts SET status='entered',updated_at=? WHERE attempt_id=? AND status='prepared'").run(at,id).changes!==1)throw Error('Launch attempt has already entered the adapter or requires review');
  }
  returned(id:string,result:ResearchLaunchResult,at:string):boolean {
    const row=this.get(id);
    for(const key of ['laneId','jobId','worktree'] as const)if(typeof result?.[key]!=='string'||!result[key].trim()||result[key].length>4096)throw Error('Research launcher returned an incomplete identity receipt');
    const receipt=JSON.stringify(result);if(receipt.length>24_000)throw Error('Research launcher receipt exceeds its bound');
    if(row.status==='uncertain'){
      this.db.query("UPDATE campaign_research_launch_attempts SET receipt_json=?,updated_at=? WHERE attempt_id=? AND status='uncertain'").run(receipt,at,id);
      return false;
    }
    if(this.db.query("UPDATE campaign_research_launch_attempts SET status='returned',receipt_json=?,updated_at=? WHERE attempt_id=? AND status='entered'").run(receipt,at,id).changes!==1)throw Error('Late launch receipt requires reconciliation against the retained attempt');
    return true;
  }
  hold(id:string,error:string,at:string):'uncertain'|'aborted' {
    const row=this.get(id);
    if(row.status==='returned')throw Error('A retained launch receipt cannot be reclassified as an unknown launch');
    const status=['prepared','aborted'].includes(row.status)?'aborted':'uncertain';
    this.db.query('UPDATE campaign_research_launch_attempts SET status=?,error=?,updated_at=? WHERE attempt_id=?').run(status,error.slice(0,4000),at,id);
    return status;
  }
  retainUnverifiedReceipt(id:string,result:unknown,at:string):void {
    let json:string|undefined;
    try{json=JSON.stringify(result);}catch{return;}
    if(!json||json.length>24_000)return;
    this.db.query("UPDATE campaign_research_launch_attempts SET receipt_json=?,updated_at=? WHERE attempt_id=? AND status='uncertain'").run(json,at,id);
  }
  interrupted():ResearchLaunchAttemptRow[] {
    return this.db.query("SELECT * FROM campaign_research_launch_attempts WHERE status IN ('prepared','entered') ORDER BY created_at,attempt_id").all() as ResearchLaunchAttemptRow[];
  }
}
