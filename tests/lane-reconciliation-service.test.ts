import { describe, expect, test } from "bun:test";
import { resolve } from "node:path";
import {
  LaneReconciliationService,
  type LaneReconciliationProcessInput,
  type LaneReconciliationProcessResult,
} from "../src/lane-reconciliation-service";
import type { LaneOwnership } from "../src/lane-ownership-service";
import type { LaneSnapshot, ObserverSnapshot } from "../src/types";

function lane(overrides: Partial<LaneSnapshot> = {}): LaneSnapshot {
  return {
    id: "demo:windows:prove-the-lemma",
    project: "demo",
    host: "windows",
    task: "prove-the-lemma",
    lane: "DKW-LSA",
    name: "prove the lemma",
    model: "sonnet",
    effort: "high",
    laneKind: "research",
    parentAgent: "",
    jobId: "job-owned",
    sessionId: "session-owned",
    lifecycle: "active",
    daemon: "done",
    tempo: "idle",
    status: "Done",
    severity: "attention",
    attentionReason: "terminal-unrecorded",
    detail: "Terminal result is waiting for reconciliation.",
    output: "",
    tokens: 100,
    inFlight: 0,
    queued: 0,
    activities: [],
    topology: null,
    timeline: [],
    landing: "—",
    branch: "agent/local-sonnet/prove-the-lemma",
    worktree: "C:/tmp/prove-the-lemma",
    launchedAt: "2026-08-30T00:00:00.000Z",
    updatedAt: "2026-08-30T01:00:00.000Z",
    completedAt: "2026-08-30T01:00:00.000Z",
    ...overrides,
  };
}

function observer(lanes: LaneSnapshot[]): ObserverSnapshot {
  return {
    generatedAt: "2026-08-30T01:00:00.000Z",
    version: 1,
    lanes,
    counts: { working: 0, idle: 0, attention: lanes.length, complete: 0, total: lanes.length },
    sources: [],
  };
}

function ownership(overrides: Partial<LaneOwnership> = {}): LaneOwnership {
  return {
    laneId: "demo:windows:prove-the-lemma",
    origin: "controller-run",
    controlled: true,
    runId: "run-1",
    waveId: "wave-1",
    reason: "This lane matches a current durable Lane Watch research run.",
    ...overrides,
  };
}

function harness(input: {
  lanes?: LaneSnapshot[];
  owned?: LaneOwnership;
  root?: string;
  coordinator?: string;
  result?: LaneReconciliationProcessResult;
} = {}) {
  const calls: LaneReconciliationProcessInput[] = [];
  const projectRoot = input.root ?? resolve("C:/campaign/demo");
  const service = new LaneReconciliationService({
    observer: () => observer(input.lanes ?? [lane()]),
    definition: () => ({ root: projectRoot, localCoordinator: input.coordinator ?? "scripts/coordinator.ps1" }),
    ownership: () => input.owned ?? ownership(),
  }, async (request) => {
    calls.push(request);
    return input.result ?? { exitCode: 0, stdout: "  reconciled\n", stderr: "" };
  });
  return { calls, projectRoot, service };
}

describe("lane reconciliation service", () => {
  test("executes the bounded Windows coordinator for an owned terminal lane", async () => {
    const { calls, projectRoot, service } = harness();

    await expect(service.reconcile("demo", "demo:windows:prove-the-lemma")).resolves.toEqual({
      laneId: "demo:windows:prove-the-lemma",
      taskId: "prove-the-lemma",
      output: "reconciled",
    });
    expect(calls).toEqual([{
      coordinatorPath: resolve(projectRoot, "scripts/coordinator.ps1"),
      projectRoot,
      taskId: "prove-the-lemma",
    }]);
  });

  test("rejects unknown and externally owned lanes before process execution", async () => {
    const missing = harness({ lanes: [] });
    await expect(missing.service.reconcile("demo", "missing")).rejects.toThrow("Unknown lane: missing");
    expect(missing.calls).toHaveLength(0);

    const external = harness({ owned: ownership({
      controlled: false,
      origin: "observed-elsewhere",
      reason: "observer activity has no command authority",
    }) });
    await expect(external.service.reconcile("demo", "demo:windows:prove-the-lemma"))
      .rejects.toThrow("Lane Watch does not own this lane: observer activity has no command authority");
    expect(external.calls).toHaveLength(0);
  });

  test("keeps Mac explicitly unsupported and requires terminal Windows state", async () => {
    const mac = harness({ lanes: [lane({ host: "macbook" })] });
    await expect(mac.service.reconcile("demo", "demo:windows:prove-the-lemma"))
      .rejects.toThrow("Mac reconciliation is not implemented by the campaign coordinator yet");
    expect(mac.calls).toHaveLength(0);

    const active = harness({ lanes: [lane({ daemon: "working" })] });
    await expect(active.service.reconcile("demo", "demo:windows:prove-the-lemma"))
      .rejects.toThrow("Lane must be terminal before reconciliation");
    expect(active.calls).toHaveLength(0);
  });

  test("requires a coordinator confined to the project root", async () => {
    const absent = harness({ coordinator: "" });
    await expect(absent.service.reconcile("demo", "demo:windows:prove-the-lemma"))
      .rejects.toThrow("Project demo has no local coordinator");
    expect(absent.calls).toHaveLength(0);

    const escaped = harness({ coordinator: "../outside.ps1" });
    await expect(escaped.service.reconcile("demo", "demo:windows:prove-the-lemma"))
      .rejects.toThrow("Local coordinator path escapes the project root");
    expect(escaped.calls).toHaveLength(0);
  });

  test("prefers process stderr and bounds successful receipt output", async () => {
    const failed = harness({ result: { exitCode: 7, stdout: "stdout fallback", stderr: "  exact failure\n" } });
    await expect(failed.service.reconcile("demo", "demo:windows:prove-the-lemma"))
      .rejects.toThrow("exact failure");

    const longOutput = ` prefix ${"x".repeat(8_100)} `;
    const succeeded = harness({ result: { exitCode: 0, stdout: longOutput, stderr: "ignored" } });
    const receipt = await succeeded.service.reconcile("demo", "demo:windows:prove-the-lemma");
    expect(receipt.output).toBe("x".repeat(8_000));
  });
});
