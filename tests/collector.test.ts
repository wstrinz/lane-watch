import { afterEach, describe, expect, test } from "bun:test";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { AgentCollector, classifyLane, normalizeRuntimeActivities, parseJsonText } from "../src/collector";

const fixtureRoot = join(import.meta.dir, "fixtures");
const temporaryRoots: string[] = [];

afterEach(() => {
  for (const root of temporaryRoots.splice(0)) rmSync(root, { recursive: true, force: true });
});

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

  test("hot-loads nested campaign runtimes and exposes recent native jobs as observe-only", async () => {
    const root = mkdtempSync(join(tmpdir(), "lane-watch-collector-"));
    temporaryRoots.push(root);
    const hub = join(root, "hub");
    const owner = join(root, "owner");
    const match4 = join(root, "match4");
    const checkout = join(owner, "_worktrees", "match4-cqc");
    const runtime = join(checkout, "_worktrees", ".agent-runtime");
    const claudeHome = join(root, "claude");
    mkdirSync(runtime, { recursive: true });
    mkdirSync(match4, { recursive: true });
    mkdirSync(join(claudeHome, "jobs", "aaaaaaaa"), { recursive: true });
    mkdirSync(join(claudeHome, "jobs", "bbbbbbbb"), { recursive: true });
    mkdirSync(hub, { recursive: true });
    writeFileSync(join(checkout, "campaign.json"), JSON.stringify({ id: "match4" }));
    writeFileSync(join(runtime, "nested-lane.json"), JSON.stringify({
      taskId: "nested-lane", laneId: "CQW-LSA", latestJobId: "aaaaaaaa", lifecycleStatus: "active",
    }));
    const now = new Date().toISOString();
    writeFileSync(join(claudeHome, "jobs", "aaaaaaaa", "state.json"), JSON.stringify({
      state: "blocked", tempo: "idle", detail: "waiting for coordinator", cwd: checkout, createdAt: now, updatedAt: now,
    }));
    writeFileSync(join(claudeHome, "jobs", "bbbbbbbb", "state.json"), JSON.stringify({
      state: "working", tempo: "idle", name: "sigma-n12", cwd: owner,
      worktreePath: join(owner, ".claude", "worktrees", "sigma-n12"),
      respawnFlags: ["--model", "sonnet", "--effort", "high"],
      inFlight: { tasks: 1, queued: 0 }, createdAt: now, updatedAt: now,
    }));
    const manifestPath = join(hub, "projects.json");
    writeFileSync(manifestPath, JSON.stringify({
      projects: [{ id: "owner", path: "../owner", local_agent_coordinator: "tools/coord.ps1" }],
    }));
    const collector = new AgentCollector({ manifestPath, claudeHome, macHost: "fixture-mac" });
    await collector.initialize();

    const before = await collector.collect();
    expect(before.lanes.map((lane) => lane.task).sort()).toEqual(["native-aaaaaaaa", "sigma-n12"]);
    expect(before.lanes.every((lane) => lane.laneKind === "native-unregistered")).toBe(true);

    writeFileSync(manifestPath, JSON.stringify({ projects: [
      { id: "owner", path: "../owner", local_agent_coordinator: "tools/coord.ps1" },
      { id: "match4", path: "../match4", local_agent_coordinator: "tools/coord.ps1" },
    ] }));
    const snapshot = await collector.collect();

    expect(snapshot.lanes.map((lane) => lane.task).sort()).toEqual(["nested-lane", "sigma-n12"]);
    expect(snapshot.lanes.find((lane) => lane.task === "nested-lane")?.project).toBe("match4");
    expect(snapshot.lanes.find((lane) => lane.task === "sigma-n12")).toMatchObject({
      project: "owner", lane: "UNREGISTERED", laneKind: "native-unregistered",
      landing: "observe-only", attentionReason: "unregistered-native-job", model: "sonnet", effort: "high",
    });
    expect(snapshot.sources.some((source) => source.project === "match4" && source.kind === "coordinator-checkout")).toBe(true);
  });
});
