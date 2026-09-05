import { describe, expect, test } from "bun:test";
import { matchResearchRunLane } from "../src/observation-sync-service";
import type { LaneSnapshot } from "../src/types";

function lane(jobId: string): LaneSnapshot {
  return {
    id: "cfg23:windows:task-a", project: "cfg23", host: "windows", task: "task-a", lane: "DKW-LSA",
    name: "task-a", model: "sonnet", effort: "high", laneKind: "research", parentAgent: "worker", jobId,
    sessionId: jobId, lifecycle: "active", daemon: "failed", tempo: "idle", status: "Failed", severity: "attention",
    attentionReason: "terminal-unrecorded", detail: "old job failed", output: "", tokens: 0, inFlight: 0, queued: 0,
    activities: [], topology: null, timeline: [], landing: "FAILED", branch: "agent/task-a", worktree: "C:/tmp/task-a",
    launchedAt: "2026-09-02T00:00:00Z", updatedAt: "2026-09-02T00:00:01Z", completedAt: "2026-09-02T00:00:01Z",
  };
}

describe("research run observation identity", () => {
  test("does not bind a launching retry to the prior terminal job by task ID", () => {
    const stale = lane("oldjob01");
    expect(matchResearchRunLane({ status: "launching", task_id: "task-a", lane_id: "", job_id: "" }, [stale])).toBeUndefined();
  });

  test("requires exact job identity once a retry receipt is recorded", () => {
    const stale = lane("oldjob01");
    const current = { ...lane("newjob02"), daemon: "working", status: "Working", severity: "working" } as LaneSnapshot;
    expect(matchResearchRunLane({ status: "running", task_id: "task-a", lane_id: "DKW-LSA", job_id: "newjob02" }, [stale, current]))?.toBe(current);
  });
});

import {Database} from "bun:sqlite";
import {ObservationSyncService} from "../src/observation-sync-service";
import {mkdtempSync,mkdirSync,writeFileSync,rmSync} from "node:fs";
import {join} from "node:path";import {tmpdir} from "node:os";
test("a failed receipt import returns to intake and recovers the same job after correction",async()=>{
 const root=mkdtempSync(join(tmpdir(),"intake-recovery-")); const db=new Database(":memory:");
 try {
 db.exec("CREATE TABLE campaign_research_runs(run_id TEXT, request_id TEXT, project_id TEXT, wave_id TEXT, task_id TEXT,status TEXT,lane_id TEXT,job_id TEXT,worktree TEXT,evidence_path TEXT,evidence_sha256 TEXT,evidence_json TEXT,error TEXT,created_at TEXT,updated_at TEXT,completed_at TEXT,measured_tokens INTEGER,measured_wall_seconds REAL,measurement_source TEXT,measurement_at TEXT); CREATE TABLE campaign_research_requests(request_id TEXT,status TEXT,updated_at TEXT);");
 const pre="artifacts/task-a";mkdirSync(join(root,pre),{recursive:true});
 const hash=new Bun.CryptoHasher("sha256").update("correct").digest("hex");
 writeFileSync(join(root,pre,"proof.txt"),"wrong");
 writeFileSync(join(root,pre,"evidence-receipt.json"),JSON.stringify({schema:"cfg23-research-evidence/v1",task_id:"task-a",terminal_state:"INCONCLUSIVE",artifact_paths:{[pre+"/proof.txt"]:hash}}));
 db.query("INSERT INTO campaign_research_runs VALUES ('r','q','cfg23','w','task-a','failed','','job1',?,'artifacts/task-a/evidence-receipt.json','','{}','Evidence receipt is not ready: old importer','2026-09-04T00:00:00Z','','',NULL,0,'','')").run(root);db.exec("INSERT INTO campaign_research_requests VALUES ('q','approved_for_dispatch','')");
 let phase="RESEARCH_READY";const port={project:()=>({current_phase:phase}),observeActivity:()=>{},transitionProject:(_p:string,p:string)=>{phase=p;},recordEvent:()=>{},now:()=>"2026-09-05T00:00:00Z"};
 const service=new ObservationSyncService(db,{latest:()=>null} as any,{} as any,{latest:()=>null} as any,port);
 await service.synchronizeProject("cfg23",[lane("job1")]);
 expect(phase).toBe("RESEARCH_INTAKE");expect(db.query("SELECT status FROM campaign_research_runs").get()).toEqual({status:"awaiting_evidence"});
 writeFileSync(join(root,pre,"proof.txt"),"correct");await service.synchronizeProject("cfg23",[lane("job1")]);
 expect(db.query("SELECT status,job_id FROM campaign_research_runs").get()).toEqual({status:"evidence_ready",job_id:"job1"});expect(phase).toBe("RESEARCH_INTAKE");
 } finally {db.close();rmSync(root,{recursive:true,force:true});}
});
