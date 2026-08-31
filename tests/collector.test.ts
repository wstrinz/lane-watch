import { describe, expect, test } from "bun:test";
import { join } from "node:path";
import { AgentCollector, classifyLane, normalizeRuntimeActivities, parseJsonText } from "../src/collector";

const fixtureRoot = join(import.meta.dir, "fixtures");

describe("classifyLane", () => {
  test("keeps managed completion distinct from daemon completion", () => {
    expect(classifyLane("active", "done", "idle", 0)).toEqual({
      severity: "attention",
      reason: "terminal-unrecorded",
      status: "Done, reconciliation pending",
    });
    expect(classifyLane("complete", "done", "idle", 0).severity).toBe("complete");
  });

  test("identifies active work and idle checkpoints", () => {
    expect(classifyLane("active", "working", "active", 2).severity).toBe("working");
    expect(classifyLane("active", "working", "idle", 0).severity).toBe("idle");
  });

  test("raises failed and blocked states", () => {
    expect(classifyLane("active", "failed", "idle", 0).severity).toBe("attention");
    expect(classifyLane("active", "blocked", "idle", 0).reason).toBe("blocked-checkpoint");
  });

  test("keeps retired registrations out of live attention", () => {
    expect(classifyLane("retired", "failed", "idle", 0)).toEqual({
      severity: "complete",
      reason: "",
      status: "Retired",
    });
  });
});

test("parseJsonText accepts PowerShell UTF-8 BOM ledgers", () => {
  expect(parseJsonText('\uFEFF{"taskId":"new-lane"}').taskId).toBe("new-lane");
});

test("normalizeRuntimeActivities accepts the current top-level fan schema", () => {
  const activities = normalizeRuntimeActivities({ fan: [{ id: "child-1", kind: "shell", label: "verify" }] });
  expect(activities).toHaveLength(1);
  expect(activities[0].id).toBe("child-1");
});

describe("AgentCollector", () => {
  test("joins coordinator ledger, job state, activity, and timeline", async () => {
    const collector = new AgentCollector({
      manifestPath: join(fixtureRoot, "hub", "projects.json"),
      claudeHome: join(fixtureRoot, "claude"),
      macHost: "fixture-mac",
    });
    await collector.initialize();
    const snapshot = await collector.collect();
    expect(snapshot.counts.total).toBe(1);
    expect(snapshot.counts.working).toBe(1);
    const lane = snapshot.lanes[0];
    expect(lane.id).toBe("demo:windows:prove-the-lemma");
    expect(lane.detail).toBe("checking the final symbolic identity");
    expect(lane.tokens).toBe(12345);
    expect(lane.activities[0].label).toContain("verify.py");
    expect(lane.timeline[0].detail).toBe("assembled the witness");
  });
});
