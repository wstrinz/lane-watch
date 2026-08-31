import { afterEach, describe, expect, test } from "bun:test";
import { Database } from "bun:sqlite";
import { defaultResourcePolicy } from "../src/resources";
import { buildWaveSchedule, waveScheduleDigest, type ScheduledLaunchSpec, type WaveScheduleCandidate } from "../src/wave-schedule";
import { WaveScheduleRepository } from "../src/wave-schedule-repository";

function candidate(id: string, priority: number, overrides: Partial<WaveScheduleCandidate> = {}): WaveScheduleCandidate {
  const spec: ScheduledLaunchSpec = {
    taskId: `task-${id}`, priority, profile: "sonnet-worker", host: "windows", model: "sonnet", effort: "high", fanout: 0,
    packetPath: `packets/launch/task-${id}.md`, baseRef: "a".repeat(40), evidencePath: `artifacts/task-${id}/evidence-receipt.json`,
    timeoutMinutes: 90, tokenBudget: 80_000, tools: ["repository-read"], outputContract: "cfg23-research-evidence/v1",
  };
  return { requestId: `request-${id}`, question: `Question ${id}`, expectedDelta: `Delta ${id}`, trackId: "coverage", workKind: "frontier", dependencyReady: true, dependencyReason: "", spec, ...overrides };
}

function proposal(candidates: WaveScheduleCandidate[]) {
  const policy = { ...defaultResourcePolicy(), slots: { strategy: 1, research: 3, custody: 1 }, waveTokenBudget: 240_000 };
  return buildWaveSchedule({
    projectId: "demo", waveId: "wave-1", planDigest: "sha256:plan", resourceDigest: "sha256:resource",
    policy, spendableEpochTokens: 500_000, activeResearchSlots: 0, candidates, createdAt: "2026-08-28T13:00:00.000Z",
  });
}

describe("multi-member wave schedules", () => {
  test("reserves the dependency-safe frontier within fixed slots and wave tokens", () => {
    const schedule = proposal([
      candidate("c", 3),
      candidate("a", 1),
      candidate("blocked", 0, { dependencyReady: false, dependencyReason: "Predecessor evidence is pending." }),
      candidate("b", 2),
      candidate("d", 4),
    ]);
    expect(schedule).toMatchObject({
      schema: "campaign-wave-schedule/v1", mode: "human-gated", authority: "none-until-confirmed", status: "PROPOSED",
      budget: { effectiveTokenLimit: 240_000, reservedTokens: 240_000, remainingTokens: 0 },
      slots: { available: 3, reserved: 3 },
      invariants: { valid: true, humanConfirmationRequired: true, dispatched: false },
    });
    expect(schedule.members.map((member) => member.taskId)).toEqual(["task-a", "task-b", "task-c"]);
    expect(schedule.deferred.map((member) => [member.taskId, member.decision])).toEqual([
      ["task-blocked", "WAIT_DEPENDENCY"], ["task-d", "WAIT_SLOT"],
    ]);
  });

  test("does not absorb operator-release or malformed contracts", () => {
    const gated = candidate("gated", 1);
    gated.spec.requiresOperatorRelease = true;
    const malformed = candidate("malformed", 2);
    malformed.spec.baseRef = "";
    const schedule = proposal([gated, malformed]);
    expect(schedule.members).toEqual([]);
    expect(schedule.deferred.map((member) => member.decision)).toEqual(["OPERATOR_GATE", "INVALID_CONTRACT"]);
    expect(schedule.invariants).toMatchObject({ valid: false, nonEmpty: false });
  });

  test("produces a stable content digest", () => {
    const schedule = proposal([candidate("a", 1), candidate("b", 2)]);
    expect(waveScheduleDigest(schedule)).toBe(waveScheduleDigest(JSON.parse(JSON.stringify(schedule))));
    expect(waveScheduleDigest({ ...schedule, summary: "changed" })).not.toBe(waveScheduleDigest(schedule));
  });
});

function scheduleDatabase(): Database {
  const db = new Database(":memory:");
  db.run(`CREATE TABLE campaign_wave_schedules (
    schedule_id TEXT PRIMARY KEY, project_id TEXT NOT NULL, wave_id TEXT NOT NULL, schedule_digest TEXT NOT NULL,
    plan_digest TEXT NOT NULL, resource_digest TEXT NOT NULL, status TEXT NOT NULL, proposal_json TEXT NOT NULL,
    created_by TEXT NOT NULL, confirmed_by TEXT NOT NULL, created_at TEXT NOT NULL, updated_at TEXT NOT NULL,
    confirmed_at TEXT NOT NULL, completed_at TEXT NOT NULL
  )`);
  db.run(`CREATE TABLE campaign_wave_schedule_members (
    schedule_id TEXT NOT NULL, request_id TEXT NOT NULL, task_id TEXT NOT NULL, ordinal INTEGER NOT NULL, status TEXT NOT NULL,
    token_cap INTEGER NOT NULL, launch_spec_json TEXT NOT NULL, member_json TEXT NOT NULL, run_id TEXT NOT NULL,
    error TEXT NOT NULL, updated_at TEXT NOT NULL, PRIMARY KEY(schedule_id, request_id), UNIQUE(schedule_id, task_id)
  )`);
  return db;
}

const open: Database[] = [];
afterEach(() => { while (open.length) open.pop()!.close(); });

describe("wave schedule repository", () => {
  test("persists immutable members and confirms only the exact digest", () => {
    const db = scheduleDatabase(); open.push(db);
    const repository = new WaveScheduleRepository(db);
    const value = proposal([candidate("a", 1), candidate("b", 2)]);
    const scheduleDigest = waveScheduleDigest(value);
    repository.create({ scheduleId: "schedule-1", scheduleDigest, proposal: value, actor: "operator" });
    expect(repository.members("schedule-1")).toHaveLength(2);
    expect(() => repository.confirm("schedule-1", "sha256:wrong", "operator", "2026-08-28T13:01:00.000Z")).toThrow("digest has changed");
    expect(repository.byId("schedule-1")?.status).toBe("proposed");
    expect(repository.confirm("schedule-1", scheduleDigest, "operator", "2026-08-28T13:01:00.000Z")).toMatchObject({ status: "confirmed", confirmed_by: "operator" });
  });

  test("rolls back the schedule when duplicate members violate storage invariants", () => {
    const db = scheduleDatabase(); open.push(db);
    const repository = new WaveScheduleRepository(db);
    const value = proposal([candidate("a", 1)]);
    value.members.push({ ...value.members[0], requestId: "request-duplicate", ordinal: 2 });
    expect(() => repository.create({ scheduleId: "schedule-bad", scheduleDigest: waveScheduleDigest(value), proposal: value, actor: "operator" })).toThrow();
    expect(repository.byId("schedule-bad")).toBeNull();
  });
});
