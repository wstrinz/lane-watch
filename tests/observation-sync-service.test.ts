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
