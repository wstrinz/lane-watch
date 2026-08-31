export interface WorkflowPhaseEventEvidence {
  event_id: string;
  payload_json: string;
  created_at: string;
}

function parsePayload(value: string): Record<string, unknown> {
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed as Record<string, unknown> : {};
  } catch {
    return {};
  }
}

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/**
 * Projects only evidence already present in the durable phase event. Legacy
 * `source` is an explicit cause alias; no authority, actor, or transition is
 * inferred and this policy never rewrites the event ledger.
 */
export function workflowProvenance(
  currentPhase: string,
  projectUpdatedAt: string,
  event: WorkflowPhaseEventEvidence | null,
): Record<string, unknown> {
  const payload = parsePayload(event?.payload_json || "");
  const from = text(payload.from);
  const to = text(payload.to);
  const matchesCurrentPhase = Boolean(event && to && to === currentPhase);
  const explicitAuthority = matchesCurrentPhase ? text(payload.authority) : "";
  const explicitCause = matchesCurrentPhase ? text(payload.cause) : "";
  const legacySource = matchesCurrentPhase ? text(payload.source) : "";
  const cause = explicitCause || legacySource;
  const actor = matchesCurrentPhase ? text(payload.actor) : "";
  const missingFields = [
    ...(!explicitAuthority ? ["authority"] : []),
    ...(!cause ? ["cause"] : []),
    ...(!actor ? ["actor"] : []),
  ];
  const status = !event ? "MISSING"
    : !matchesCurrentPhase ? "STALE_OR_UNMATCHED"
      : missingFields.length ? "PARTIAL"
        : "COMPLETE";
  return {
    phase: currentPhase,
    authority: explicitAuthority || "unknown",
    cause: cause || "unknown",
    actor,
    changedAt: matchesCurrentPhase ? event!.created_at : projectUpdatedAt,
    provenance: {
      schema: "campaign-workflow-provenance/v1",
      status,
      eventId: event?.event_id || "",
      transition: { from, to, matchesCurrentPhase },
      evidence: {
        authorityRecorded: Boolean(explicitAuthority),
        causeRecorded: Boolean(cause),
        causeField: explicitCause ? "cause" : legacySource ? "source" : "",
        actorRecorded: Boolean(actor),
      },
      missingFields,
      backfilled: false,
      policy: "explicit-fields-only-no-ledger-rewrite",
    },
  };
}
