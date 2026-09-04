import { defaultResourcePolicy } from "./resources";

export const STRATEGY_TRACKS = [
  {
    id: "coverage",
    label: "Global coverage",
    shortLabel: "Coverage",
    targetShare: 0.5,
    color: "#63d59a",
    purpose: "Bound, enumerate, or calibrate the global universe with explicit denominators and scaling evidence.",
    metrics: ["distinct types covered", "benchmark fraction", "scaling cost"],
  },
  {
    id: "supply",
    label: "Positive supply",
    shortLabel: "Supply",
    targetShare: 0.3,
    color: "#68a9d6",
    purpose: "Generate mathematically diverse candidates and improve the quality of near-witnesses.",
    metrics: ["new nonisomorphic candidates", "candidate diversity", "deficiency improvement"],
  },
  {
    id: "decision",
    label: "Candidate decision",
    shortLabel: "Decision",
    targetShare: 0.2,
    color: "#b49bdd",
    purpose: "Settle supplied candidates cheaply and promote only evidence that changes campaign knowledge.",
    metrics: ["candidates closed", "survivors promoted", "cost per decision"],
  },
] as const;

export type StrategyTrackId = typeof STRATEGY_TRACKS[number]["id"];
export type StrategyWorkKind = "frontier" | "experiment" | "maintenance" | "audit";

export interface StrategyWorkItem {
  runId: string;
  waveId: string;
  taskId: string;
  status: string;
  question: string;
  trackId: StrategyTrackId;
  workKind: StrategyWorkKind;
  source: "inferred" | "declared";
  tokens: number | null;
  wallHours: number;
  createdAt: string;
  completedAt: string;
  profile?: string;
  evidenceDigest?: string;
  measurementSource?: string;
  receiptBound?: boolean;
  measurementComplete?: boolean;
}

interface StrategyStateInput {
  charter: Record<string, any>;
  charterRevision: number;
  charterUpdatedAt: string;
  epoch: {
    id: string;
    label: string;
    status: string;
    charterRevision: number;
    start: Record<string, any>;
    createdAt: string;
    updatedAt: string;
  };
  work: StrategyWorkItem[];
  frontier: { path: string; modifiedAt: string } | null;
  snapshots: Array<Record<string, any>>;
  computedAt?: string;
}

export function defaultStrategyCharter(project: { role: string }): Record<string, any> {
  return {
    schema: "campaign-strategy-charter/v1",
    mode: "shadow",
    question: project.role,
    thesis: "Advance the mathematical frontier through balanced global coverage, candidate supply, and candidate decision.",
    epoch: {
      label: "Epoch 1 · Restore frontier motion",
      objective: "Re-establish measurable frontier motion across a deliberately balanced portfolio.",
      targetWaves: 4,
    },
    tracks: STRATEGY_TRACKS,
    metrics: [
      { id: "coverage-denominator", label: "Explicit coverage denominator", trackId: "coverage", target: "A reproducible numerator/denominator benchmark", unit: "benchmark" },
      { id: "candidate-supply", label: "Distinct candidate supply", trackId: "supply", target: "New nonisomorphic candidates or a justified exhaustion result", unit: "candidates" },
      { id: "candidate-decisions", label: "Candidate decisions", trackId: "decision", target: "Cheap, reproducible closures or promoted survivors", unit: "decisions" },
    ],
    redirectionTriggers: [
      "Three measured runs without a durable frontier delta",
      "Support work exceeds its rolling resource ceiling",
      "One strategic track exceeds 70% without an explicit justification",
    ],
    resourcePolicy: defaultResourcePolicy(),
    maintenancePolicy: {
      rollingShareLimit: 0.15,
      maxAutomaticRepairGeneration: 1,
      chargeToStrategicTrack: true,
      externalBlockerPolicy: "park-until-capability-changes",
    },
    evidenceTiers: [
      { id: "exploration", label: "Exploration-ready", requirement: "Semantic identity and one independent checker." },
      { id: "decision", label: "Decision-grade", requirement: "Reproducible result with independent verification." },
      { id: "promotion", label: "Promotion-grade", requirement: "Archival custody, provenance, and strong replay." },
    ],
    driftThresholds: {
      zeroFrontierRuns: 3,
      maintenanceShare: 0.15,
      trackConcentration: 0.7,
      missingCostReports: 0,
    },
  };
}

export function inferStrategyClassification(taskId: string, question = ""): { trackId: StrategyTrackId; workKind: StrategyWorkKind; source: "inferred" } {
  const task = taskId.toLowerCase();
  const value = `${task} ${question}`.toLowerCase();
  const maintenance = /audit|custody|repair|gate|receipt|document|doc-|preflight|portability|replay|reconcil|pin-|authority/.test(value);
  const audit = /audit|review|cross.?check|replay/.test(value);
  let trackId: StrategyTrackId = "decision";
  if (/trade37|class.?68|sat|orient|realiz|ruler|witness|obstruct|decision/.test(task)) trackId = "decision";
  else if (/global|census|enumerat|coverage|deficien|benchmark|topolog|symmetr|c2|v4|universe/.test(task)) trackId = "coverage";
  else if (/candidate|supply|greedy|construct|poncelet|factory|near.?miss|moduli|search/.test(task)) trackId = "supply";
  else if (/global|census|enumerat|coverage|deficien|benchmark|topolog|symmetr|c2|v4|universe/.test(value)) trackId = "coverage";
  else if (/candidate|supply|greedy|construct|poncelet|factory|near.?miss|moduli|search/.test(value)) trackId = "supply";
  return { trackId, workKind: maintenance ? (audit ? "audit" : "maintenance") : "experiment", source: "inferred" };
}

export function deriveStrategyState(input: StrategyStateInput): Record<string, any> {
  const { charter, work } = input;
  const knownTokens = work.reduce((sum, item) => sum + (item.tokens || 0), 0);
  const totalWallHours = work.reduce((sum, item) => sum + item.wallHours, 0);
  const maintenance = work.filter((item) => item.workKind === "maintenance" || item.workKind === "audit");
  const maintenanceKnownTokens = maintenance.reduce((sum, item) => sum + (item.tokens || 0), 0);
  const maintenanceShare = knownTokens > 0 ? maintenanceKnownTokens / knownTokens : work.length ? maintenance.length / work.length : 0;
  const tracks = (Array.isArray(charter.tracks) ? charter.tracks : STRATEGY_TRACKS).map((track: any) => {
    const trackWork = work.filter((item) => item.trackId === track.id);
    const trackTokens = trackWork.reduce((sum, item) => sum + (item.tokens || 0), 0);
    return {
      ...track,
      actualShare: knownTokens > 0 ? trackTokens / knownTokens : work.length ? trackWork.length / work.length : 0,
      runs: trackWork.length,
      knownTokens: trackTokens,
      maintenanceRuns: trackWork.filter((item) => item.workKind === "maintenance" || item.workKind === "audit").length,
    };
  });
  const recordedDeltas = input.snapshots.flatMap((snapshot) => Array.isArray(snapshot.metrics?.progressDeltas) ? snapshot.metrics.progressDeltas : []);
  const advancedDeltas = recordedDeltas.filter((delta: any) => String(delta?.status || "").toUpperCase() === "ADVANCED");
  let maintenanceStreak = 0;
  for (const item of [...work].reverse()) {
    if (item.workKind !== "maintenance" && item.workKind !== "audit") break;
    maintenanceStreak += 1;
  }
  const limits = charter.maintenancePolicy || {};
  const thresholds = charter.driftThresholds || {};
  const signals: Array<Record<string, any>> = [];
  if (work.length >= 3 && maintenanceShare > Number(limits.rollingShareLimit ?? 0.15)) {
    signals.push({
      id: "maintenance-capture",
      severity: "attention",
      label: "Support work is consuming the epoch",
      detail: `${Math.round(maintenanceShare * 100)}% of measured resources are maintenance or audit work; the charter ceiling is ${Math.round(Number(limits.rollingShareLimit ?? 0.15) * 100)}%.`,
      evidence: `${maintenance.length}/${work.length} runs; ${maintenanceStreak} consecutive support runs`,
      action: "Rebalance the next wave toward frontier-moving experiments and park non-critical support descendants.",
    });
  }
  if (work.length >= Number(thresholds.zeroFrontierRuns ?? 3) && advancedDeltas.length === 0) {
    signals.push({
      id: "frontier-motion-unrecorded",
      severity: "attention",
      label: "Execution is not producing recorded frontier motion",
      detail: `${work.length} runs are recorded in this epoch without a structured ADVANCED progress delta.`,
      evidence: input.frontier?.modifiedAt ? `Frontier source last changed ${input.frontier.modifiedAt}` : "No durable frontier source was detected.",
      action: "Require the next synthesis to name a denominator, claim change, candidate supply delta, or decision delta.",
    });
  }
  const dominant = [...tracks].sort((left, right) => right.actualShare - left.actualShare)[0];
  if (work.length >= 3 && dominant && dominant.actualShare > Number(thresholds.trackConcentration ?? 0.7)) {
    signals.push({
      id: "track-concentration",
      severity: "warning",
      label: "The portfolio is concentrated in one track",
      detail: `${dominant.label} accounts for ${Math.round(dominant.actualShare * 100)}% of measured work against a ${Math.round(Number(dominant.targetShare || 0) * 100)}% target.`,
      evidence: `${dominant.runs}/${work.length} epoch runs`,
      action: "Ask Sol to justify the concentration or restore the charter mix.",
    });
  }
  const unreportedRuns = work.filter((item) => item.tokens === null).length;
  if (unreportedRuns > Number(thresholds.missingCostReports ?? 0)) {
    signals.push({
      id: "cost-blindness",
      severity: "warning",
      label: "Some resource costs are unreported",
      detail: `${unreportedRuns} of ${work.length} runs have no durable token count.`,
      evidence: "Allocation shares use known tokens and fall back to run counts only when no token data exists.",
      action: "Persist terminal usage with the research receipt so later epochs remain comparable.",
    });
  }
  const driftStatus = signals.some((signal) => signal.severity === "attention") ? "attention" : signals.length ? "watch" : "steady";
  return {
    mode: "shadow",
    charter: { ...charter, revision: input.charterRevision, updatedAt: input.charterUpdatedAt },
    epoch: { ...input.epoch, waveCount: new Set(work.map((item) => item.waveId).filter(Boolean)).size },
    layers: [
      { id: "epoch", label: "Campaign epoch", cadence: "several waves", owner: "Sol / Opus strategic critic + human gate", purpose: "Set track weights, metrics, assumptions, and redirection criteria." },
      { id: "wave", label: "Research wave", cadence: "hours", owner: "Sol portfolio coordinator", purpose: "Choose a balanced bounded portfolio and synthesize its measured deltas." },
      { id: "lane", label: "Lane lifecycle", cadence: "minutes to hours", owner: "Sonnet workers", purpose: "Execute falsifiable questions under immutable contracts." },
      { id: "custody", label: "Custody service", cadence: "as needed", owner: "Terra / steward adapter", purpose: "Repair, verify, and archive evidence without becoming a strategic research track.", status: "shadow" },
    ],
    tracks,
    progress: {
      frontierPath: input.frontier?.path || "",
      frontierUpdatedAt: input.frontier?.modifiedAt || "",
      recordedDeltas,
      advancedDeltaCount: advancedDeltas.length,
      latestDeltas: recordedDeltas.slice(0, 8),
      snapshotCount: input.snapshots.length,
    },
    cost: {
      scope: "research-epoch",
      runs: work.length,
      knownTokenRuns: work.length - unreportedRuns,
      unreportedRuns,
      knownTokens,
      wallHours: totalWallHours,
      maintenanceRuns: maintenance.length,
      maintenanceKnownTokens,
      maintenanceShare,
      maintenanceStreak,
    },
    drift: { status: driftStatus, signals, computedAt: input.computedAt || new Date().toISOString() },
    recentSnapshots: input.snapshots,
    work: work.slice(-24).reverse(),
  };
}
