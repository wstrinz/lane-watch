import { describe, expect, test } from "bun:test";
import { buildProgramCompass } from "../src/ui/program-compass";

describe("program compass", () => {
  test("turns the row-41 result into a diversified CFG23 target hierarchy", () => {
    const compass = buildProgramCompass({
      id: "cfg23",
      strategy: {
        charter: { question: "Does a real geometric (23_4) exist?" },
        recentSnapshots: [{ metrics: { progressDeltas: [
          { metricId: "decision-row41", status: "ADVANCED" },
          { metricId: "geometric-23_4-decision", status: "UNCHANGED" },
        ] } }],
      },
    });
    expect(compass.status).toBe("REBALANCE NEXT WAVE");
    expect(compass.moves.map((move) => move.id)).toEqual(["c2-forensics", "asymmetric-supply", "bs21-proof-object"]);
    expect(compass.moves.map((move) => move.timing)).toEqual(["NOW", "PARALLEL", "HOLD"]);
    expect(compass.scale).toContain("unrestricted geometric (23₄) question remains open");
    expect(compass.antiLoop).toContain("custody, not research");
  });
});
