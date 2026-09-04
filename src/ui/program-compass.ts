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

export function buildProgramCompass(project: any): ProgramCompass {
  const strategy = project?.strategy || {};
  const charter = strategy.charter || {};
  const snapshot = Array.isArray(strategy.recentSnapshots) ? strategy.recentSnapshots[0] : null;
  const metrics = deltas(project);
  const advanced = metrics.find((item) => String(item?.status || "").toUpperCase() === "ADVANCED");
  const unchanged = metrics.find((item) => String(item?.status || "").toUpperCase() === "UNCHANGED");
  const topSignal = strategy?.drift?.signals?.[0];
  return {
    objective: compact(charter.question || project?.role, "Advance the campaign's central mathematical question."),
    status: topSignal ? "STRATEGY CHECK" : "PROGRAM COMPASS",
    headline: compact(topSignal?.label || charter?.epoch?.objective, "Choose work by its expected knowledge delta, not its proximity to the last task."),
    changed: compact(advanced?.after || advanced?.evidence, "No accepted frontier change is recorded for the latest wave."),
    scale: compact(unchanged?.after || unchanged?.evidence, "The campaign-level consequence has not yet been recorded."),
    nextTarget: compact(charter?.epoch?.objective || project?.wave?.synthesis?.response?.nextWave?.objective || snapshot?.metrics?.note, "Choose a bounded move that changes a named denominator, supply measure, or decision."),
    rationale: compact(topSignal?.detail || charter.thesis, "The portfolio should balance coverage, supply, and candidate decision."),
    antiLoop: compact(topSignal?.action, "Stop descendants that only repeat custody, repair, or audit work without changing a program metric."),
    moves: [],
  };
}
