import { describe, expect, test } from "bun:test";
import { defaultStrategyCharter, deriveStrategyState, inferStrategyClassification, type StrategyWorkItem } from "../src/strategy";

const charter = defaultStrategyCharter({ role: "Resolve a difficult mathematical campaign" });
const epoch = {
  id: "epoch-1",
  label: "Epoch 1 · Restore frontier motion",
  status: "active",
  charterRevision: 1,
  start: {},
  createdAt: "2026-08-26T00:00:00.000Z",
  updatedAt: "2026-08-27T00:00:00.000Z",
};

function work(overrides: Partial<StrategyWorkItem> = {}): StrategyWorkItem {
  return {
    runId: crypto.randomUUID(),
    waveId: "wave-1",
    taskId: "global-generator-benchmark",
    status: "complete",
    question: "Reproduce the complete benchmark with an explicit denominator.",
    trackId: "coverage",
    workKind: "experiment",
    source: "declared",
    tokens: 100,
    wallHours: 1,
    createdAt: "2026-08-26T01:00:00.000Z",
    completedAt: "2026-08-26T02:00:00.000Z",
    ...overrides,
  };
}

describe("strategy classification", () => {
  test("charges custody work to the strategic track it supports", () => {
    expect(inferStrategyClassification("trade37-pin-gate-independent-audit-v2")).toEqual({
      trackId: "decision",
      workKind: "audit",
      source: "inferred",
    });
    expect(inferStrategyClassification("deficiency-graph-19-4-benchmark")).toMatchObject({ trackId: "coverage", workKind: "experiment" });
    expect(inferStrategyClassification("cuntz-moduli-biased-candidate-search")).toMatchObject({ trackId: "supply", workKind: "experiment" });
  });
});

describe("strategy drift", () => {
  test("detects support capture, absent frontier motion, and track concentration", () => {
    const maintenance = Array.from({ length: 4 }, (_, index) => work({
      runId: `repair-${index}`,
      taskId: `trade37-custody-repair-${index}`,
      trackId: "decision",
      workKind: "maintenance",
      tokens: 100,
    }));
    const strategy = deriveStrategyState({
      charter,
      charterRevision: 1,
      charterUpdatedAt: "2026-08-27T00:00:00.000Z",
      epoch,
      work: maintenance,
      frontier: { path: "FRONTIER.md", modifiedAt: "2026-08-26T08:00:00.000Z" },
      snapshots: [],
      computedAt: "2026-08-27T08:00:00.000Z",
    });
    expect(strategy.drift.status).toBe("attention");
    expect(strategy.drift.signals.map((signal: any) => signal.id)).toEqual([
      "maintenance-capture",
      "frontier-motion-unrecorded",
      "track-concentration",
    ]);
    expect(strategy.cost).toMatchObject({ runs: 4, knownTokens: 400, maintenanceShare: 1, maintenanceStreak: 4 });
    expect(strategy.tracks.find((track: any) => track.id === "decision").actualShare).toBe(1);
  });

  test("stays steady when the measured portfolio advances and matches the charter", () => {
    const balanced = [
      work({ runId: "coverage-a", trackId: "coverage", tokens: 300 }),
      work({ runId: "coverage-b", trackId: "coverage", tokens: 200 }),
      work({ runId: "supply", trackId: "supply", tokens: 300 }),
      work({ runId: "decision", trackId: "decision", tokens: 200 }),
    ];
    const strategy = deriveStrategyState({
      charter,
      charterRevision: 1,
      charterUpdatedAt: "2026-08-27T00:00:00.000Z",
      epoch,
      work: balanced,
      frontier: { path: "FRONTIER.md", modifiedAt: "2026-08-27T07:00:00.000Z" },
      snapshots: [{ metrics: { progressDeltas: [{ metricId: "benchmark-fraction", status: "ADVANCED", before: "0/4028", after: "4028/4028", evidence: "exact set equality" }] } }],
      computedAt: "2026-08-27T08:00:00.000Z",
    });
    expect(strategy.drift).toMatchObject({ status: "steady", signals: [] });
    expect(strategy.progress.advancedDeltaCount).toBe(1);
  });
});
