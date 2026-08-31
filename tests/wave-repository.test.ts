import { afterEach, describe, expect, test } from "bun:test";
import { Database } from "bun:sqlite";
import type { LaneSnapshot } from "../src/types";
import { WaveCommandService } from "../src/wave-commands";
import { WaveRepository } from "../src/wave-repository";

function observedLane(id: string, daemon = "running", landing = "—"): LaneSnapshot {
  return {
    id, project: "demo", host: "windows", task: id, lane: id, name: id, model: "sonnet", effort: "high",
    laneKind: "worker", parentAgent: "", jobId: "", sessionId: "", lifecycle: "active", daemon,
    tempo: "", status: "", severity: "working", attentionReason: "", detail: "", output: "", tokens: null,
    inFlight: 0, queued: 0, activities: [], topology: null, timeline: [], landing, branch: "", worktree: "",
    launchedAt: "2026-08-28T12:00:00.000Z", updatedAt: "2026-08-28T12:00:00.000Z", completedAt: "",
  };
}

function database(): Database {
  const db = new Database(":memory:");
  db.run(`CREATE TABLE campaign_waves (
    wave_id TEXT PRIMARY KEY, project_id TEXT NOT NULL, label TEXT NOT NULL, phase TEXT NOT NULL,
    lane_ids_json TEXT NOT NULL, evidence_digest TEXT NOT NULL, bundle_path TEXT NOT NULL,
    synthesis_turn_id TEXT NOT NULL DEFAULT '', created_at TEXT NOT NULL, updated_at TEXT NOT NULL
  )`);
  db.run(`CREATE TABLE campaign_wave_lanes (
    wave_id TEXT NOT NULL, lane_id TEXT NOT NULL, accounting_state TEXT NOT NULL, disposition TEXT NOT NULL,
    reason TEXT NOT NULL, snapshot_json TEXT NOT NULL, updated_at TEXT NOT NULL, PRIMARY KEY (wave_id, lane_id)
  )`);
  return db;
}

const open: Database[] = [];
afterEach(() => { while (open.length) open.pop()!.close(); });

describe("transactional wave commands", () => {
  test("adopts fixed multi-lane membership atomically", () => {
    const db = database(); open.push(db);
    const repository = new WaveRepository(db);
    const commands = new WaveCommandService(repository);
    const result = commands.adopt({
      waveId: "wave-1", projectId: "demo", label: "Two lane wave",
      lanes: [observedLane("lane-b"), observedLane("lane-a")], createdAt: "2026-08-28T12:00:00.000Z",
    });
    expect(result).toMatchObject({ created: true, wave: { wave_id: "wave-1", phase: "RUNNING" }, accounting: { total: 2, running: 2 } });
    expect(JSON.parse(result.wave.lane_ids_json)).toEqual(["lane-a", "lane-b"]);
    expect(repository.members("wave-1").map((row) => row.lane_id)).toEqual(["lane-a", "lane-b"]);
  });

  test("rolls back the parent wave when a member insert fails", () => {
    const db = database(); open.push(db);
    const repository = new WaveRepository(db);
    expect(() => repository.adopt({
      waveId: "wave-bad", projectId: "demo", label: "Invalid", phase: "RUNNING",
      lanes: [observedLane("duplicate"), observedLane("duplicate")], createdAt: "2026-08-28T12:00:00.000Z",
    })).toThrow();
    expect(repository.latest("demo")).toBeNull();
    expect(repository.members("wave-bad")).toEqual([]);
  });

  test("commits a disposition batch once and advances only after complete accounting", () => {
    const db = database(); open.push(db);
    const repository = new WaveRepository(db);
    const commands = new WaveCommandService(repository);
    const adopted = commands.adopt({
      waveId: "wave-2", projectId: "demo", label: "Landing",
      lanes: [observedLane("lane-a", "done"), observedLane("lane-b", "done")], createdAt: "2026-08-28T12:00:00.000Z",
    }).wave;
    const first = commands.recordDisposition(adopted, { laneId: "lane-a", disposition: "REPAIR", reason: "Custody repair queued." }, "2026-08-28T12:05:00.000Z");
    expect(first).toMatchObject({ accounting: { accounted: 1, complete: false }, phase: "RECONCILING" });
    const second = commands.applyDispositions(adopted, [{ laneId: "lane-b", disposition: "CARRY_FORWARD", reason: "Bound to the successor wave." }], "2026-08-28T12:06:00.000Z");
    expect(second).toMatchObject({ accounting: { accounted: 2, complete: true }, phase: "SYNTHESIS_READY" });
    expect(repository.latest("demo")?.phase).toBe("SYNTHESIS_READY");
  });

  test("rejects an invalid batch before changing any member", () => {
    const db = database(); open.push(db);
    const repository = new WaveRepository(db);
    const commands = new WaveCommandService(repository);
    const wave = commands.adopt({
      waveId: "wave-3", projectId: "demo", label: "Landing",
      lanes: [observedLane("lane-a", "done")], createdAt: "2026-08-28T12:00:00.000Z",
    }).wave;
    expect(() => commands.applyDispositions(wave, [
      { laneId: "lane-a", disposition: "REPAIR", reason: "Valid candidate." },
      { laneId: "missing", disposition: "ABANDON", reason: "Must reject the batch." },
    ], "2026-08-28T12:10:00.000Z")).toThrow("not a member");
    expect(repository.member("wave-3", "lane-a")).toMatchObject({ disposition: "", reason: "" });
  });
});
