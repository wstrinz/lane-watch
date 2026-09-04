import { describe, expect, test } from "bun:test";
import { buildProgramCompass } from "../src/ui/program-compass";

describe("program compass", () => {
  test("a new charter controls the target despite stale synthesis and row-41 history", () => {
    const objective = "Attempt a25527ed once; hold C2 and retire the constant-score assay.";
    const compass = buildProgramCompass({
      id: "cfg23",
      wave: { synthesis: { response: { nextWave: { objective: "Run the old asymmetric GO assay." } } } },
      strategy: {
        charter: { question: "Does a real geometric (23_4) exist?", epoch: { objective } },
        recentSnapshots: [{ metrics: { progressDeltas: [
          { metricId: "decision-row41", status: "ADVANCED", after: "Six equivariant actions excluded." },
          { metricId: "geometric-23_4-decision", status: "UNCHANGED", after: "Global question open." },
        ] } }],
      },
    });
    expect(compass.nextTarget).toBe(objective);
    expect(compass.changed).toBe("Six equivariant actions excluded.");
    expect(compass.scale).toBe("Global question open.");
    expect(compass.moves).toEqual([]);
    expect(JSON.stringify(compass)).not.toContain("11-type");
  });
  test("uses synthesis as a fallback only without a charter objective", () => {
    const compass = buildProgramCompass({ id: "other", wave: { synthesis: { response: { nextWave: { objective: "Check the frozen witness." } } } } });
    expect(compass.nextTarget).toBe("Check the frozen witness.");
  });
});
