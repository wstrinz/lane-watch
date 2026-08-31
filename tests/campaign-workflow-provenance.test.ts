import { describe, expect, test } from "bun:test";
import { workflowProvenance } from "../src/campaign-workflow-provenance";

const event = (payload: Record<string, unknown>) => ({
  event_id: "event-1",
  payload_json: JSON.stringify(payload),
  created_at: "2026-08-30T01:01:56.139Z",
});

describe("workflow provenance projection", () => {
  test("reports complete provenance only from explicit matching evidence", () => {
    expect(workflowProvenance("BLOCKED", "project-time", event({
      from: "RUNNING", to: "BLOCKED", authority: "human-confirmed", cause: "operator-hold", actor: "operator-a",
    }))).toMatchObject({
      authority: "human-confirmed", cause: "operator-hold", actor: "operator-a", changedAt: "2026-08-30T01:01:56.139Z",
      provenance: { status: "COMPLETE", transition: { from: "RUNNING", to: "BLOCKED", matchesCurrentPhase: true }, missingFields: [], backfilled: false },
    });
  });

  test("preserves an explicit legacy source as cause without inventing authority or actor", () => {
    expect(workflowProvenance("RESEARCH_INTAKE", "project-time", event({
      from: "RESEARCH_RUNNING", to: "RESEARCH_INTAKE", source: "research-runs",
    }))).toMatchObject({
      authority: "unknown", cause: "research-runs", actor: "",
      provenance: {
        status: "PARTIAL", evidence: { authorityRecorded: false, causeRecorded: true, causeField: "source", actorRecorded: false },
        missingFields: ["authority", "actor"], backfilled: false,
      },
    });
  });

  test("keeps an unattributed matching transition partial and explicitly unknown", () => {
    expect(workflowProvenance("BLOCKED", "project-time", event({ from: "RUNNING", to: "BLOCKED" }))).toMatchObject({
      authority: "unknown", cause: "unknown", actor: "",
      provenance: { status: "PARTIAL", missingFields: ["authority", "cause", "actor"], policy: "explicit-fields-only-no-ledger-rewrite" },
    });
  });

  test("does not attribute a stale event to the current phase", () => {
    expect(workflowProvenance("BLOCKED", "project-time", event({
      from: "PLANNING", to: "RUNNING", authority: "system", cause: "startup", actor: "daemon",
    }))).toMatchObject({
      authority: "unknown", cause: "unknown", actor: "", changedAt: "project-time",
      provenance: { status: "STALE_OR_UNMATCHED", transition: { matchesCurrentPhase: false }, backfilled: false },
    });
  });

  test("reports a missing ledger boundary without synthesizing one", () => {
    expect(workflowProvenance("PLANNING", "project-time", null)).toMatchObject({
      authority: "unknown", cause: "unknown", actor: "", changedAt: "project-time",
      provenance: { status: "MISSING", eventId: "", missingFields: ["authority", "cause", "actor"], backfilled: false },
    });
  });
});
