export const PROGRAM_HISTORY_SCHEMA = "campaign-program-history/v1";

function parse(value: string | undefined): Record<string, any> {
  try { return JSON.parse(value || "{}") as Record<string, any>; } catch { return {}; }
}

function delta(start: Record<string, any>, end: Record<string, any>): Array<Record<string, unknown>> {
  return [...new Set([...Object.keys(start), ...Object.keys(end)])].sort().map((key) => ({
    key, start: start[key] ?? null, end: end[key] ?? null,
    changed: JSON.stringify(start[key] ?? null) !== JSON.stringify(end[key] ?? null),
  }));
}

function snapshot(row: Record<string, any> | undefined): Record<string, any> | null {
  return row ? {
    id: row.snapshot_id, kind: row.kind, waveId: row.wave_id, capturedAt: row.created_at,
    metrics: parse(row.metrics_json), cost: parse(row.cost_json), drift: parse(row.drift_json),
  } : null;
}

/** Builds a read-only hierarchy. Assignment provenance stays explicit; no historical row is rewritten. */
export function deriveProgramHistory(input: {
  projectId: string; projectVersion: number;
  epochs: Array<Record<string, any>>; waves: Array<Record<string, any>>; runs: Array<Record<string, any>>;
  members: Array<Record<string, any>>; custody: Array<Record<string, any>>; leases: Array<Record<string, any>>;
  snapshots: Array<Record<string, any>>;
}): Record<string, any> {
  const epochs = [...input.epochs].sort((a, b) => String(a.created_at).localeCompare(String(b.created_at)));
  const waves = [...input.waves].sort((a, b) => String(a.created_at).localeCompare(String(b.created_at)));
  const assignment = new Map<string, { epochId: string; basis: string }>();
  for (const wave of waves) {
    const explicit = input.snapshots.find((row) => row.wave_id === wave.wave_id && epochs.some((epoch) => epoch.epoch_id === row.epoch_id));
    if (explicit) { assignment.set(wave.wave_id, { epochId: explicit.epoch_id, basis: "explicit-strategy-snapshot" }); continue; }
    const containing = epochs.find((epoch, index) => String(wave.created_at) >= String(epoch.created_at)
      && (!epochs[index + 1] || String(wave.created_at) < String(epochs[index + 1].created_at)));
    if (containing) { assignment.set(wave.wave_id, { epochId: containing.epoch_id, basis: "created-at-containment" }); continue; }
    if (epochs.length) assignment.set(wave.wave_id, { epochId: epochs[0].epoch_id, basis: "pre-epoch-historical-import" });
  }
  const waveIds = new Set(waves.map((wave) => wave.wave_id));
  const epochViews = epochs.map((epoch, epochIndex) => {
    const nextEpochAt = String(epochs[epochIndex + 1]?.created_at || "");
    const ownedWaves = waves.filter((wave) => assignment.get(wave.wave_id)?.epochId === epoch.epoch_id);
    const epochSnapshots = input.snapshots.filter((row) => row.epoch_id === epoch.epoch_id).sort((a, b) => String(a.created_at).localeCompare(String(b.created_at)));
    const startSnapshot = snapshot(epochSnapshots.find((row) => row.kind === "epoch_baseline") || epochSnapshots[0]);
    const endSnapshot = snapshot([...epochSnapshots].reverse().find((row) => row.kind === "wave_end") || epochSnapshots.at(-1));
    const epochCustody = input.custody.filter((item) => {
      const explicitWave = waveIds.has(item.source_id) ? assignment.get(item.source_id) : null;
      if (explicitWave) return explicitWave.epochId === epoch.epoch_id;
      const inWindow = String(item.created_at) >= String(epoch.created_at) && (!nextEpochAt || String(item.created_at) < nextEpochAt);
      return inWindow || (epochIndex === 0 && String(item.created_at) < String(epoch.created_at));
    });
    const custodyView = (item: Record<string, any>) => ({
      id: item.item_id, sourceType: item.source_type, sourceId: item.source_id, task: item.task, status: item.status,
      startedAt: item.created_at, completedAt: item.completed_at,
      leases: input.leases.filter((lease) => lease.item_id === item.item_id).map((lease) => ({
        id: lease.lease_id, status: lease.status, receiptDigest: lease.receipt_digest,
        startedAt: lease.started_at || lease.created_at, completedAt: lease.completed_at,
      })),
    });
    return {
      id: epoch.epoch_id, label: epoch.label, status: epoch.status, charterRevision: epoch.charter_revision,
      startedAt: epoch.created_at, completedAt: epoch.completed_at, start: parse(epoch.start_json), end: parse(epoch.end_json),
      boundary: {
        complete: Boolean(epoch.completed_at), startSnapshot, endSnapshot,
        metrics: delta(startSnapshot?.metrics || {}, endSnapshot?.metrics || {}),
        cost: delta(startSnapshot?.cost || {}, endSnapshot?.cost || {}),
        drift: delta(startSnapshot?.drift || {}, endSnapshot?.drift || {}),
      },
      custody: epochCustody.map(custodyView),
      waves: ownedWaves.map((wave, waveIndex) => {
        const nextWaveAt = String(ownedWaves[waveIndex + 1]?.created_at || nextEpochAt);
        const waveCustody = epochCustody.filter((item) => item.source_id === wave.wave_id
          || (!waveIds.has(item.source_id) && String(item.created_at) >= String(wave.created_at)
            && (!nextWaveAt || String(item.created_at) < nextWaveAt)));
        const waveSnapshot = snapshot(epochSnapshots.find((row) => row.wave_id === wave.wave_id && row.kind === "wave_end"));
        return {
          id: wave.wave_id, label: wave.label, phase: wave.phase, assignment: assignment.get(wave.wave_id),
          startedAt: wave.created_at, updatedAt: wave.updated_at, evidenceDigest: wave.evidence_digest, endSnapshot: waveSnapshot,
          lanes: input.runs.filter((run) => run.wave_id === wave.wave_id).map((run) => ({
            id: run.run_id, taskId: run.task_id, status: run.status, profile: run.profile,
            evidenceDigest: run.evidence_sha256, tokens: run.measured_tokens ?? null,
            startedAt: run.created_at, completedAt: run.completed_at,
          })),
          observedMembers: input.members.filter((member) => member.wave_id === wave.wave_id).map((member) => ({
            laneId: member.lane_id, accountingState: member.accounting_state, disposition: member.disposition,
          })),
          custody: waveCustody.map(custodyView),
        };
      }),
    };
  });
  return {
    schema: PROGRAM_HISTORY_SCHEMA, projectId: input.projectId, projectVersion: input.projectVersion,
    mode: "read-only", ownershipPolicy: "explicit-snapshot-then-time-containment-with-labeled-pre-epoch-import; no backfill",
    counts: { epochs: epochViews.length, waves: waves.length, lanes: input.runs.length, custody: input.custody.length },
    epochs: epochViews,
  };
}
