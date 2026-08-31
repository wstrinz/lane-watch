import { describe, expect, test } from "bun:test";
import { compactCampaignProject, compactLane, projectCampaignProjection, projectObserverProjection, researchRunDetail, workflowHistoryPage } from "../src/projections";
import type { LaneSnapshot, ObserverSnapshot } from "../src/types";

function lane(project: string, id: string): LaneSnapshot {
  return {
    id, project, host: "windows", task: id, lane: "LSA", name: id, model: "sonnet", effort: "high", laneKind: "research", parentAgent: "", jobId: id,
    sessionId: id, lifecycle: "active", daemon: "working", tempo: "active", status: "Working", severity: "working", attentionReason: "", detail: "x".repeat(700),
    output: "large output", tokens: 10, inFlight: 1, queued: 0, activities: [{ id: "activity", kind: "command", label: "work" }], topology: null,
    timeline: [{ at: "2026-08-28T00:00:00Z", state: "working", detail: "detail", text: "text" }], landing: "—", branch: "branch", worktree: "root",
    launchedAt: "2026-08-28T00:00:00Z", updatedAt: "2026-08-28T00:00:01Z", completedAt: "",
  };
}

describe("browser read projections", () => {
  test("keeps a project index while returning only the selected compact project", () => {
    const evidence = { schema: "receipt/v1", status: "complete", verdict: "SUPPORTED", summary: "bounded", payload: "z".repeat(10_000) };
    const full = { projects: [
      { id: "one", role: "first", phase: "RUNNING", version: 2, laneCounts: { active: 1 }, coordinator: { attached: true, name: "Sol", status: "idle" }, researchRuns: [{ id: "run", taskId: "task", evidence }] },
      { id: "two", role: "second", phase: "PLANNING", version: 1, laneCounts: {}, coordinator: { attached: false }, researchRuns: [] },
    ] };
    const projection = projectCampaignProjection(full, "one");
    expect(projection.projectIndex.map((project) => project.id)).toEqual(["one", "two"]);
    expect(projection.projects).toHaveLength(1);
    expect(projection.projects[0].researchRuns[0]).not.toHaveProperty("evidence");
    expect(projection.projects[0].researchRuns[0]).toMatchObject({ evidenceDetailAvailable: true, evidenceSummary: { schema: "receipt/v1", verdict: "SUPPORTED" } });
    expect(JSON.stringify(projection).length).toBeLessThan(JSON.stringify(full).length / 4);
    expect(researchRunDetail(full, "one", "run")?.evidence).toEqual(evidence);
  });

  test("produces card-sized lane snapshots and project-scoped counts without changing the source", () => {
    const first = lane("one", "lane-one");
    const second = lane("two", "lane-two");
    const snapshot: ObserverSnapshot = { generatedAt: "now", version: 1, lanes: [first, second], counts: { working: 2, idle: 0, attention: 0, complete: 0, total: 2 }, sources: [
      { project: "one", host: "windows", path: "one", available: true }, { project: "two", host: "windows", path: "two", available: true },
    ] };
    const projection = projectObserverProjection(snapshot, "one");
    expect(projection.lanes).toHaveLength(1);
    expect(projection.counts).toEqual({ working: 1, idle: 0, attention: 0, complete: 0, total: 1 });
    expect(projection.lanes[0]).toMatchObject({ output: "", activities: [], timeline: [] });
    expect(projection.lanes[0].detail.length).toBe(640);
    expect(first.output).toBe("large output");
    expect(compactLane(first).id).toBe(first.id);
  });

  test("does not mutate the full project while compacting research receipts", () => {
    const project = { id: "one", researchRuns: [{ id: "run", evidence: { payload: "full" } }], workflowHistory: Array.from({ length: 30 }, (_, index) => ({ id: `event-${index}`, createdAt: `2026-08-28T00:00:${String(index).padStart(2, "0")}Z` })) };
    const compact = compactCampaignProject(project);
    expect(compact.researchRuns[0].evidence).toBeUndefined();
    expect(compact.workflowHistory).toHaveLength(24);
    expect(compact.workflowHistory[0].id).toBe("event-6");
    expect(compact.workflowHistorySummary).toMatchObject({ total: 30, returned: 24, detailAvailable: true });
    expect(project.researchRuns[0].evidence.payload).toBe("full");
    expect(project.workflowHistory).toHaveLength(30);
  });

  test("pages workflow history backward while preserving chronological order", () => {
    const history = Array.from({ length: 7 }, (_, index) => ({ id: `event-${index}`, createdAt: String(index) }));
    const full = { projects: [{ id: "one", version: 9, workflowHistory: history }] };
    const latest = workflowHistoryPage(full, "one", "", 3)!;
    expect(latest).toMatchObject({ projectId: "one", projectVersion: 9, total: 7, returned: 3, nextCursor: "4" });
    expect(latest.items.map((event) => event.id)).toEqual(["event-4", "event-5", "event-6"]);
    const older = workflowHistoryPage(full, "one", latest.nextCursor!, 3)!;
    expect(older.nextCursor).toBe("1");
    expect(older.items.map((event) => event.id)).toEqual(["event-1", "event-2", "event-3"]);
    const oldest = workflowHistoryPage(full, "one", older.nextCursor!, 3)!;
    expect(oldest.nextCursor).toBeNull();
    expect(oldest.items.map((event) => event.id)).toEqual(["event-0"]);
  });
});
