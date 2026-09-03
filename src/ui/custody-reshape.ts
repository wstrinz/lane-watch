function base(item: any, task: string, reason: string, effortClass: "small" | "medium", acceptanceCriteria: string[], allowedPath: string, stopCondition: string): Record<string, any> {
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
  return [];
}
