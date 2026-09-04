/** Enforce a recorded review, not a machine claim of mathematical validity. */
export function requireExperimentValidity(lanes: Array<Record<string, any>>, checks: Array<Record<string, any>>): void {
  for (const lane of lanes) {
    if (!["KEEP", "REVISE"].includes(lane.action) || lane.strategy?.workKind !== "experiment") continue;
    const matches = checks.filter(check => check.check === "experiment-validity:" + lane.requestId);
    if (matches.length !== 1 || matches[0].status !== "PASS" || !String(matches[0].detail || "").trim()) {
      throw new Error("Experiment validity must pass explicitly before approving " + lane.requestId + "; document the domain, variable outcomes, controls, and decision consequences.");
    }
  }
}
