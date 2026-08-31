import { describe, expect, test } from "bun:test";
import { buildCampaignInterpretation, interpretationAuthority } from "../src/ui/campaign-interpretation";

describe("campaign interpretation", () => {
  test("turns frozen synthesis into a grounded brief and typed research atlas", () => {
    const result = buildCampaignInterpretation({
      id: "cfg23",
      phase: "DECISION_REQUIRED",
      role: "Resolve geometric (23_4)",
      strategy: { charter: {
        question: "Does a real geometric (23_4) exist?",
        thesis: "Balance coverage, supply, and decision.",
        tracks: [
          { id: "coverage", label: "Global coverage", targetShare: 0.5, purpose: "Bound the universe.", metrics: ["fraction covered"] },
          { id: "supply", label: "Positive supply", targetShare: 0.3, purpose: "Supply diverse candidates.", metrics: ["candidate diversity"] },
        ],
      } },
      researchRuns: [{ status: "returned_to_sol", strategy: { trackId: "supply" } }],
      wave: { synthesis: { response: {
        operatorBrief: {
          headline: "The asymmetric laboratory found 11 qualifying types.",
          whereWeAre: "The sample gate stopped at 11 of 12.",
          recentProgress: ["Eight trade candidates are asymmetric."],
          currentFocus: "Replay the inventory before more geometry.",
          nextDecision: "Park, extend supply, or authorize an 11-type assay.",
          watchouts: ["Orientation is not realizability."],
        },
        claimDeltas: [
          { claimId: "supply", proposedStatus: "SUPPORTED_PENDING_INDEPENDENT_INTAKE", summary: "Eleven named-pool candidates qualify.", evidence: ["8 + 3 = 11"], objections: ["Not exhaustive."] },
          { claimId: "measurement", proposedStatus: "UNMEASURED", summary: "Liftability remains unknown." },
          { claimId: "ceiling", proposedStatus: "NOT_SUPPORTED_AS_STATED", summary: "A global ceiling is unsupported." },
        ],
        nextWave: { objective: "Secure the inventory without threshold chasing.", lanes: [
          { taskId: "inventory-replay", objective: "Replay the 11-type inventory." },
        ] },
      } } },
      researchPlan: { response: { lanes: [
        { taskId: "inventory-replay", question: "Does the inventory replay?", rationale: "Independent intake is required.", stopCondition: "Stop before SAT.", evidenceExpected: "Exact replay ledger.", strategy: { trackId: "supply", workKind: "audit", expectedDelta: "Admit or reject the inventory." } },
      ] } },
    });

    expect(result.source).toBe("frozen-synthesis");
    expect(result.objective.title).toContain("23_4");
    expect(result.quest.state).toBe("SUPPORTED");
    expect(result.tracks.find((track) => track.trackId === "supply")?.state).toBe("ACTIVE");
    expect(result.claims.map((claim) => claim.state)).toEqual(["SUPPORTED", "UNMEASURED", "BLOCKED"]);
    expect(result.proposals[0]).toMatchObject({ trackId: "supply", state: "PROPOSED" });
    expect(result.proposals[0].scope).toEqual(["Stop before SAT."]);
    expect(result.concepts.map((concept) => concept.title)).toContain("Geometric (23₄) configuration");
    expect(result.concepts.map((concept) => concept.title)).toContain("Automorphism group");
    expect(result.concepts.map((concept) => concept.title)).toContain("Liftability deletion width");
  });

  test("falls back to checked planning before synthesis exists", () => {
    const result = buildCampaignInterpretation({
      phase: "RESEARCH_REVIEW",
      role: "A bounded campaign",
      strategy: { charter: { tracks: [
        { id: "decision", label: "Decision" },
        { id: "supply", label: "Supply" },
      ] } },
      researchPlan: { response: {
        summary: "Choose one direct lane.",
        operatorGuidance: "Prefer the smallest decisive question.",
        lanes: [
          { taskId: "direct-lane", action: "KEEP", question: "Can this candidate be decided?", strategy: { trackId: "decision" } },
          { taskId: "clerical-duplicate", action: "DROP", question: "Repeat the ledger update?", strategy: { trackId: "supply" } },
        ],
      } },
    });

    expect(result.source).toBe("checked-plan");
    expect(result.quest.title).toBe("Choose one direct lane.");
    expect(result.decision.title).toBe("Approve, revise, or block the checked next-wave plan.");
    expect(result.decision.summary).toBe("Prefer the smallest decisive question.");
    expect(result.proposals).toHaveLength(1);
    expect(result.tracks.find((track) => track.trackId === "decision")?.state).toBe("ACTIVE");
    expect(result.tracks.find((track) => track.trackId === "supply")?.state).toBe("OPEN");
    expect(interpretationAuthority("PROPOSED")).toContain("no launch or claim authority");
  });
});
