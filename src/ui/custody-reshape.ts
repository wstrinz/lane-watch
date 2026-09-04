function base(item: any, task: string, reason: string, effortClass: "small" | "medium", acceptanceCriteria: string[], allowedPath: string, stopCondition: string, dependsOnTasks: string[] = []): Record<string, any> {
  return {
    task,
    reason,
    urgency: "NOW",
    blocksResearch: true,
    strategicTrack: item.strategicTrack,
    capability: item.capability,
    repairGeneration: item.repairGeneration,
    effortClass,
    acceptance: {
      acceptanceCriteria,
      allowedPaths: [allowedPath],
      receiptType: item.acceptance?.receiptType || "campaign-custody-protocol-receipt/v1",
      stopCondition,
      dependsOnTasks,
    },
  };
}

export function custodyNeedsReshape(item: any, loopError = ""): boolean {
  const evidence = `${item?.receipt?.summary || ""} ${item?.receipt?.stopReason || ""} ${loopError}`;
  const measuredTokens = Number(item?.receipt?.usage?.tokens || 0);
  const measuredOverrun = item?.capability !== "portability" && measuredTokens > 50_000;
  return (measuredOverrun || /automatic retry limit|exceeded (?:its )?(?:fixed )?[\d,]*-?token|crossed its token ceiling|contract too large|reshape or resize/i.test(evidence))
    && (!loopError || !/automatic retry limit/i.test(loopError) || !item?.task || loopError.includes(item.task));
}

/** Human-reviewable successor contracts for the two known oversized CFG23 custody boundaries. */
export function custodyReshapeChildren(item: any): Record<string, any>[] {
  if (/asymmetric-laboratory intake replay/i.test(item?.task || "")) return [
    base(
      item,
      "Verify frozen asymmetric manifest, provenance, and control count",
      "Separate source binding and the eleven-type inventory audit from computational replay so a mismatch can stop cheaply.",
      "small",
      [
        "Bind the check to one immutable successor commit and frozen named-pool manifest.",
        "Verify provenance and CLEAN_MINIMAL orientation references for all eleven qualifying types.",
        "Verify the 8-trivial/6-C2 inventory and correct the control count to six.",
        "Limit every accepted statement to the frozen named pools; make no repository-wide ceiling claim.",
      ],
      "results/inbox/asym-lab-manifest-provenance-check-v1/**",
      "Stop at the first source-binding, provenance, orientation, or count mismatch. Do not replay generators, run SAT, modify producer artifacts, or exceed 20,000 tokens.",
    ),
    base(
      item,
      "Replay frozen asymmetric deduplication and reconcile resource scope",
      "Run only the exact role-preserving replay after the manifest check, with runtime accounting isolated from source-provenance inspection.",
      "medium",
      [
        "Consume the verified immutable manifest boundary from the predecessor custody receipt.",
        "Independently reproduce the relevant role-preserving deduplication and 8-trivial/6-C2 automorphism split.",
        "Reconcile the replay token, process wall-time, observer wall-time, and peak-memory scopes.",
        "Emit graph-effect NONE and change no mathematical claim or producer artifact.",
      ],
      "results/inbox/asym-lab-exact-replay-resource-scope-v1/**",
      "Stop on the first changed candidate count, predecessor-receipt mismatch, or resource-ceiling breach. Do not run SAT, generate candidates, measure slack/liftability, or open another repair generation.",
    ),
  ];
  if (/verify frozen asymmetric manifest, provenance, and control count/i.test(item?.task || "")) return [
    base(
      item,
      "Bind the frozen asymmetric manifest and provenance",
      "Keep immutable source binding separate from the eleven-type inventory check so either boundary can settle inside one small lease.",
      "small",
      [
        "Bind the check to one immutable successor commit and frozen named-pool manifest.",
        "Verify provenance and CLEAN_MINIMAL orientation references for all eleven qualifying types.",
        "Limit every accepted statement to the frozen named pools; make no inventory or repository-wide ceiling claim.",
      ],
      "results/inbox/asym-lab-manifest-provenance-binding-v1/**",
      "Stop at the first source-binding, provenance, or orientation mismatch. Do not count types, replay generators, run SAT, modify producer artifacts, or exceed 20,000 tokens.",
    ),
    base(
      item,
      "Verify the frozen asymmetric type inventory and control count",
      "Consume the source-bound manifest receipt and check only the finite inventory arithmetic and six-control correction.",
      "small",
      [
        "Consume the exact predecessor manifest-and-provenance receipt without reopening its source search.",
        "Verify the 8-trivial/6-C2 inventory over the frozen named pools.",
        "Correct the control count to six and emit graph-effect NONE.",
        "Make no repository-wide ceiling claim and change no producer artifact.",
      ],
      "results/inbox/asym-lab-inventory-control-count-v1/**",
      "Stop if the predecessor receipt is absent or the frozen inventory differs. Do not replay generators, run SAT, inspect unrelated candidates, or exceed 20,000 tokens.",
      ["Bind the frozen asymmetric manifest and provenance"],
    ),
  ];
  if (/replay frozen asymmetric deduplication and reconcile resource scope/i.test(item?.task || "")) return [
    base(
      item,
      "Replay the frozen role-preserving asymmetric deduplication core",
      "Run only the exact finite replay; leave accounting and scope policy to a separate receipt-bound check.",
      "medium",
      [
        "Consume the verified immutable manifest boundary from the predecessor custody receipt.",
        "Independently reproduce the relevant role-preserving deduplication and 8-trivial/6-C2 automorphism split.",
        "Record deterministic inputs, outputs, and candidate counts sufficient for a later accounting check.",
        "Emit graph-effect NONE and change no mathematical claim or producer artifact.",
      ],
      "results/inbox/asym-lab-exact-replay-core-v1/**",
      "Stop on the first changed candidate count or predecessor-receipt mismatch. Do not reconcile resource policy, run SAT, generate candidates, measure slack/liftability, or open another repair generation.",
      ["Bind the frozen asymmetric manifest and provenance", "Verify the frozen asymmetric type inventory and control count"],
    ),
    base(
      item,
      "Reconcile frozen asymmetric replay resource measurements",
      "Check only the completed replay's token and timing scopes instead of repeating its mathematics.",
      "small",
      [
        "Consume the exact replay-core receipt without rerunning its mathematical computation.",
        "Reconcile token usage, process wall-time, observer wall-time, and peak-memory scopes.",
        "Preserve unknown measurements as UNKNOWN rather than estimating or imputing zero.",
        "Emit graph-effect NONE and change no mathematical claim or producer artifact.",
      ],
      "results/inbox/asym-lab-replay-resource-measurements-v1/**",
      "Stop if the replay-core receipt is absent or ambiguous. Do not rerun the replay, run SAT, generate candidates, or exceed 20,000 tokens.",
    ),
  ];
  if (/epoch resource provenance/i.test(item?.task || "")) return [
    base(
      item,
      "Bind missing epoch token measurements to their source runs",
      "Recover or explicitly classify the six missing token measurements without mixing that source search with policy reconciliation.",
      "small",
      [
        "Each of the six run IDs receives a source-bound token total or an explicit IRRECOVERABLE/UNKNOWN status.",
        "Unknown values are never imputed as zero.",
        "Receipt-bound, ledger-only, and missing measurements remain distinguished.",
      ],
      "results/inbox/strategy-cost-source-binding-v1/**",
      "One source-binding pass only. Record UNKNOWN with provenance when a measurement cannot be recovered; do not estimate or rerun research.",
    ),
    base(
      item,
      "Reconcile epoch reservation and wall-time scopes",
      "Apply the source-bound measurement inventory to the 148,741-versus-80,000 reservation and process-versus-observer timing discrepancy.",
      "small",
      [
        "Consume the predecessor source-binding receipt without reopening its source search.",
        "Reconcile the 148,741-token observer measurement with the 80,000 reservation.",
        "Define and preserve separate process-time and observer end-to-end wall-time scopes.",
        "Change no mathematical claim, candidate, manifest semantics, or campaign phase.",
      ],
      "results/inbox/strategy-cost-scope-reconciliation-v1/**",
      "Stop if the predecessor receipt is absent or ambiguous. Do not estimate missing usage, rerun research, or create another repair generation.",
    ),
  ];
  if (/bind missing epoch token measurements to their source runs/i.test(item?.task || "")) return [
    base(
      item,
      "Inventory the six epoch run identifiers and token-source locations",
      "Freeze the source map before attempting any token-value recovery so discovery cannot consume the reconciliation lease.",
      "small",
      [
        "Enumerate exactly the six named run IDs from the predecessor contract.",
        "Classify each available source location as receipt-bound, ledger-only, or absent.",
        "Record immutable source references without estimating, copying, or reconciling token values.",
      ],
      "results/inbox/strategy-cost-source-inventory-v1/**",
      "One bounded source-location inventory only. Do not recover values, inspect unrelated runs, estimate usage, or rerun research.",
    ),
    base(
      item,
      "Bind epoch token values to the frozen six-run inventory",
      "Recover values only from the predecessor's exact source map and preserve irrecoverable measurements explicitly.",
      "small",
      [
        "Consume the exact six-run source inventory receipt without reopening discovery.",
        "Give every run a source-bound token total or an explicit IRRECOVERABLE/UNKNOWN status.",
        "Never impute an unknown value as zero and preserve receipt-bound versus ledger-only provenance.",
        "Change no resource policy, mathematical claim, or campaign phase.",
      ],
      "results/inbox/strategy-cost-value-binding-v1/**",
      "Stop when an inventoried source is absent or ambiguous and record UNKNOWN with provenance. Do not estimate, rerun research, or reconcile reservation policy.",
      ["Inventory the six epoch run identifiers and token-source locations"],
    ),
  ];
  if (/reconcile epoch reservation and wall-time scopes/i.test(item?.task || "")) return [
    base(
      item,
      "Define frozen epoch reservation and wall-time accounting scopes",
      "Freeze the exact accounting definitions before applying any measurements so the reconciliation cannot expand into another source search.",
      "small",
      [
        "Consume the exact six-run token-value binding receipt and preserve every UNKNOWN value.",
        "Define reservation, process-time, and observer end-to-end wall-time scopes without applying or estimating measurements.",
        "Bind the definitions to the frozen epoch and six-run inventory.",
        "Change no resource policy, mathematical claim, candidate, or campaign phase.",
      ],
      "results/inbox/strategy-cost-scope-definitions-v1/**",
      "Stop if the six-run value-binding receipt is absent or ambiguous. Do not search for sources, apply measurements, estimate usage, or exceed 20,000 tokens.",
      ["Bind epoch token values to the frozen six-run inventory"],
    ),
    base(
      item,
      "Apply frozen epoch measurements to reservation reconciliation",
      "Apply only the predecessor's frozen scope definitions and source-bound values in one bounded accounting pass.",
      "small",
      [
        "Consume the exact predecessor scope-definition receipt without reopening definitions or source discovery.",
        "Reconcile the 148,741-token observer measurement with the 80,000 reservation while preserving UNKNOWN values.",
        "Report process-time and observer end-to-end wall-time separately.",
        "Emit graph-effect NONE and change no mathematical claim, candidate, or campaign phase.",
      ],
      "results/inbox/strategy-cost-reservation-reconciliation-v1/**",
      "Stop at the first predecessor mismatch or unresolved value. Do not estimate, search other runs, rerun research, or exceed 20,000 tokens.",
    ),
  ];
  return [];
}
