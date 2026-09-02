import { describe, expect, test } from "bun:test";
import { compactLoopSteps } from "../src/autopilot-service";

describe("autopilot durable step replay", () => {
  test("collapses replayed references to one completed action before scheduling a new attempt", () => {
    const steps = compactLoopSteps([
      { index: 1, key: "prepare", actionId: "action-1", status: "completed", attemptCount: 1 },
      { index: 2, key: "prepare", actionId: "action-1", status: "completed", attemptCount: 1 },
      { index: 3, key: "dispatch", actionId: "action-2", status: "failed", attemptCount: 1 },
    ] as any);
    expect(steps.map((step) => step.actionId)).toEqual(["action-1", "action-2"]);
    expect(steps.map((step) => step.index)).toEqual([1, 2]);
  });
});
