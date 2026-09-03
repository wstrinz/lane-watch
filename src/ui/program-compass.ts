export type ProgramCompassMove = {
  id: string;
  track: string;
  title: string;
  detail: string;
  payoff: string;
  timing: "NOW" | "PARALLEL" | "HOLD";
};

export type ProgramCompass = {
  objective: string;
  status: string;
  headline: string;
  changed: string;
  scale: string;
  nextTarget: string;
  rationale: string;
  antiLoop: string;
  moves: ProgramCompassMove[];
};

function compact(value: unknown, fallback: string, limit = 260): string {
  const normalized = typeof value === "string" ? value.trim().replace(/\s+/g, " ") : "";
  const text = normalized || fallback;
  return text.length <= limit ? text : `${text.slice(0, limit).replace(/\s+\S*$/, "")}…`;
}

function deltas(project: any): any[] {
  const current = project?.wave?.synthesis?.response?.progressDeltas;
  if (Array.isArray(current)) return current;
  const snapshots = Array.isArray(project?.strategy?.recentSnapshots) ? project.strategy.recentSnapshots : [];
  return Array.isArray(snapshots[0]?.metrics?.progressDeltas) ? snapshots[0].metrics.progressDeltas : [];
}

function hasMetric(items: any[], id: string, status?: string): boolean {
  return items.some((item) => String(item?.metricId || "") === id && (!status || String(item?.status || "").toUpperCase() === status));
}

export function buildProgramCompass(project: any): ProgramCompass {
  const strategy = project?.strategy || {};
  const charter = strategy.charter || {};
  const snapshot = Array.isArray(strategy.recentSnapshots) ? strategy.recentSnapshots[0] : null;
  const metrics = deltas(project);
  const cfg23 = String(project?.id || "").toLowerCase() === "cfg23" || /23[_ ]?4/i.test(String(charter.question || project?.role || ""));
  const row41Advanced = hasMetric(metrics, "decision-row41", "ADVANCED");
  const globalOpen = hasMetric(metrics, "geometric-23_4-decision", "UNCHANGED");

  if (cfg23 && row41Advanced) {
    return {
      objective: "Decide whether a real geometric (23₄) exists: produce an exact real witness, or an exact exclusion whose coverage is genuinely global.",
      status: "REBALANCE NEXT WAVE",
      headline: "Row 41 moved. The program now needs breadth, not another descendant audit.",
      changed: "The row-41 audit reportedly covers all 6/6 decorated projective-V₄ actions and identifies radical guard forcing (minimal exponent five).",
      scale: globalOpen
        ? "This is a real local theorem candidate, but only for six decorated V₄ action presentations. The unrestricted geometric (23₄) question remains open."
        : "This advances a bounded V₄ denominator; its promotion and global scope remain separate questions.",
      nextTarget: "Run the C₂ missing-state diagnosis and the 11-type asymmetric supply decision as a deliberately mixed two-lane wave.",
      rationale: "C₂ decides whether a promising coverage architecture is mathematically sound or only miscounted. The asymmetric lane restores contact with candidate supply. Together they change two different program denominators without reopening row 41.",
      antiLoop: "Keep row-41 semantic/cost correction in custody, not research. Do not open rows 42–44 merely because they are adjacent. Hold the heavy BS21 pilot until the cap overrun is reconciled and the mixed wave reports complete costs.",
      moves: [
        {
          id: "c2-forensics", track: "COVERAGE", timing: "NOW",
          title: "Localize the 352nd C₂ depth-6 state",
          detail: "Find the first producer decision that omitted or merged it; stop before a recount, repair, or census.",
          payoff: "Classifies the C₂ blocker as bookkeeping, keying, parent logic, or ingestion—and decides whether that architecture deserves another wave.",
        },
        {
          id: "asymmetric-supply", track: "SUPPLY", timing: "PARALLEL",
          title: "Decide the 11-type asymmetric laboratory",
          detail: "Independently replay the actual named pool and make an explicit GO/PARK decision at 11; do not chase a twelfth type by default.",
          payoff: "Restores a non-symmetric route toward witnesses or justifiably parks the representation with a frozen denominator.",
        },
        {
          id: "bs21-proof-object", track: "DECISION", timing: "HOLD",
          title: "Reserve the a25527ed BS21 proof-object pilot",
          detail: "Try bounded sparse ideal membership, then toric residue only if the first stage hits its declared limit.",
          payoff: "Could move BS21 from 34/42 to 35/42 and validate a reusable proof compiler, but it is the expensive third move—not the whole program.",
        },
      ],
    };
  }

  const advanced = metrics.find((item) => String(item?.status || "").toUpperCase() === "ADVANCED");
  const unchanged = metrics.find((item) => String(item?.status || "").toUpperCase() === "UNCHANGED");
  const topSignal = strategy?.drift?.signals?.[0];
  return {
    objective: compact(charter.question || project?.role, "Advance the campaign's central mathematical question."),
    status: topSignal ? "STRATEGY CHECK" : "PROGRAM COMPASS",
    headline: compact(topSignal?.label || charter?.epoch?.objective, "Choose work by its expected knowledge delta, not its proximity to the last task."),
    changed: compact(advanced?.after || advanced?.evidence, "No accepted frontier change is recorded for the latest wave."),
    scale: compact(unchanged?.after || unchanged?.evidence, "The campaign-level consequence has not yet been recorded."),
    nextTarget: compact(project?.wave?.synthesis?.response?.nextWave?.objective || snapshot?.metrics?.note, "Choose a bounded move that changes a named denominator, supply measure, or decision."),
    rationale: compact(topSignal?.detail || charter.thesis, "The portfolio should balance coverage, supply, and candidate decision."),
    antiLoop: compact(topSignal?.action, "Stop descendants that only repeat custody, repair, or audit work without changing a program metric."),
    moves: [],
  };
}
