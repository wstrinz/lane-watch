import { Database } from "bun:sqlite";
import type { LaneSnapshot } from "./types";
import { laneAccountingState, waveAccounting, waveLaneAccounted, type WaveAccounting } from "./wave";

export interface WaveRecord {
  wave_id: string;
  project_id: string;
  label: string;
  phase: string;
  lane_ids_json: string;
  evidence_digest: string;
  bundle_path: string;
  synthesis_turn_id: string;
  created_at: string;
  updated_at: string;
}

export interface WaveMemberRecord {
  wave_id: string;
  lane_id: string;
  accounting_state: string;
  disposition: string;
  reason: string;
  snapshot_json: string;
  updated_at: string;
}

export interface WaveDispositionInput {
  laneId: string;
  disposition: string;
  reason: string;
}

export interface WaveDispositionResult {
  applied: WaveDispositionInput[];
  accounting: WaveAccounting;
  phase: string;
}

type HistoricalWaveMember = WaveMemberRecord & { project_id: string; wave_created_at: string; wave_phase: string };

function parseSnapshot(value: string): Partial<LaneSnapshot> {
  try { return JSON.parse(value || "{}") as Partial<LaneSnapshot>; } catch { return {}; }
}

export function sameLaneExecution(current: LaneSnapshot, historical: WaveMemberRecord): boolean {
  const prior = parseSnapshot(historical.snapshot_json);
  if (current.jobId && prior.jobId) return current.jobId === prior.jobId;
  return Boolean(current.completedAt && prior.completedAt
    && current.completedAt === prior.completedAt
    && current.task === prior.task
    && current.branch === prior.branch);
}

export function waveAdoptionCandidates(lanes: LaneSnapshot[], history: WaveMemberRecord[]): LaneSnapshot[] {
  return lanes.filter((lane) => {
    const prior = history.find((member) => member.lane_id === lane.id && sameLaneExecution(lane, member));
    return !prior || prior.disposition === "CARRY_FORWARD" || !waveLaneAccounted(prior);
  });
}

export class WaveRepository {
  constructor(private readonly database: Database) {}

  latest(projectId: string): WaveRecord | null {
    return this.database.query("SELECT * FROM campaign_waves WHERE project_id = $id AND phase != 'VOIDED' ORDER BY created_at DESC LIMIT 1")
      .get({ $id: projectId }) as WaveRecord | null;
  }

  latestIncludingVoided(projectId: string): WaveRecord | null {
    return this.database.query("SELECT * FROM campaign_waves WHERE project_id = $id ORDER BY created_at DESC LIMIT 1")
      .get({ $id: projectId }) as WaveRecord | null;
  }

  adoptionCandidates(projectId: string, lanes: LaneSnapshot[]): LaneSnapshot[] {
    const history = this.database.query(`
      SELECT member.*, wave.project_id, wave.created_at AS wave_created_at, wave.phase AS wave_phase
      FROM campaign_wave_lanes member
      JOIN campaign_waves wave ON wave.wave_id = member.wave_id
      WHERE wave.project_id = $project AND wave.phase != 'VOIDED'
      ORDER BY wave.created_at DESC, member.updated_at DESC
    `).all({ $project: projectId }) as HistoricalWaveMember[];
    return waveAdoptionCandidates(lanes, history);
  }

  duplicatePredecessors(waveId: string): Array<{ member: WaveMemberRecord; prior: HistoricalWaveMember }> {
    const wave = this.database.query("SELECT * FROM campaign_waves WHERE wave_id = $wave").get({ $wave: waveId }) as WaveRecord | null;
    if (!wave) throw new Error(`Unknown wave: ${waveId}`);
    const history = this.database.query(`
      SELECT member.*, prior.project_id, prior.created_at AS wave_created_at, prior.phase AS wave_phase
      FROM campaign_wave_lanes member
      JOIN campaign_waves prior ON prior.wave_id = member.wave_id
      WHERE prior.project_id = $project AND member.wave_id != $wave AND prior.phase != 'VOIDED'
      ORDER BY prior.created_at DESC, member.updated_at DESC
    `).all({ $project: wave.project_id, $wave: waveId }) as HistoricalWaveMember[];
    return this.members(waveId).map((member) => {
      const current = parseSnapshot(member.snapshot_json) as LaneSnapshot;
      const prior = history.find((candidate) => candidate.lane_id === member.lane_id
        && candidate.disposition !== "CARRY_FORWARD"
        && waveLaneAccounted(candidate)
        && sameLaneExecution(current, candidate));
      if (!prior) throw new Error(`Wave ${waveId} contains a lane execution that was not previously accounted: ${member.lane_id}`);
      return { member, prior };
    });
  }

  voidDuplicate(waveId: string, updatedAt: string): Array<{ laneId: string; priorWaveId: string }> {
    const matches = this.duplicatePredecessors(waveId);
    if (!matches.length) throw new Error("The current wave has no members to classify as duplicates");
    const apply = this.database.transaction(() => {
      const update = this.database.query(`
        UPDATE campaign_wave_lanes SET disposition = 'DUPLICATE', reason = $reason, updated_at = $now
        WHERE wave_id = $wave AND lane_id = $lane
      `);
      for (const match of matches) {
        update.run({
          $wave: waveId,
          $lane: match.member.lane_id,
          $reason: `Same execution already accounted in ${match.prior.wave_id}; no new evidence or claim transition.`,
          $now: updatedAt,
        });
      }
      this.database.query("UPDATE campaign_waves SET phase = 'VOIDED', updated_at = $now WHERE wave_id = $wave")
        .run({ $wave: waveId, $now: updatedAt });
    });
    apply();
    return matches.map((match) => ({ laneId: match.member.lane_id, priorWaveId: match.prior.wave_id }));
  }

  members(waveId: string): WaveMemberRecord[] {
    return this.database.query("SELECT * FROM campaign_wave_lanes WHERE wave_id = $wave ORDER BY lane_id")
      .all({ $wave: waveId }) as WaveMemberRecord[];
  }

  member(waveId: string, laneId: string): WaveMemberRecord | null {
    return this.database.query("SELECT * FROM campaign_wave_lanes WHERE wave_id = $wave AND lane_id = $lane")
      .get({ $wave: waveId, $lane: laneId }) as WaveMemberRecord | null;
  }

  adopt(input: {
    waveId: string;
    projectId: string;
    label: string;
    phase: string;
    lanes: LaneSnapshot[];
    createdAt: string;
  }): WaveRecord {
    const insert = this.database.transaction((value: typeof input) => {
      const laneIds = value.lanes.map((lane) => lane.id).sort();
      this.database.query(`
        INSERT INTO campaign_waves(wave_id, project_id, label, phase, lane_ids_json, evidence_digest, bundle_path, synthesis_turn_id, created_at, updated_at)
        VALUES ($wave, $project, $label, $phase, $lanes, '', '', '', $now, $now)
      `).run({
        $wave: value.waveId,
        $project: value.projectId,
        $label: value.label,
        $phase: value.phase,
        $lanes: JSON.stringify(laneIds),
        $now: value.createdAt,
      });
      const insertMember = this.database.query(`
        INSERT INTO campaign_wave_lanes(wave_id, lane_id, accounting_state, disposition, reason, snapshot_json, updated_at)
        VALUES ($wave, $lane, $state, '', '', $snapshot, $now)
      `);
      for (const lane of value.lanes) {
        insertMember.run({
          $wave: value.waveId,
          $lane: lane.id,
          $state: laneAccountingState(lane),
          $snapshot: JSON.stringify(lane),
          $now: value.createdAt,
        });
      }
    });
    insert(input);
    return this.latest(input.projectId)!;
  }

  syncObservedMembers(waveId: string, lanes: LaneSnapshot[], updatedAt: string): WaveAccounting {
    const synchronize = this.database.transaction((observed: LaneSnapshot[]) => {
      const update = this.database.query(`
        UPDATE campaign_wave_lanes SET accounting_state = $state, snapshot_json = $snapshot, updated_at = $now
        WHERE wave_id = $wave AND lane_id = $lane
      `);
      for (const lane of observed) {
        update.run({
          $state: laneAccountingState(lane),
          $snapshot: JSON.stringify(lane),
          $now: updatedAt,
          $wave: waveId,
          $lane: lane.id,
        });
      }
    });
    synchronize(lanes);
    return waveAccounting(this.members(waveId));
  }

  recordDisposition(waveId: string, input: WaveDispositionInput, updatedAt: string): WaveDispositionResult {
    return this.applyDispositions(waveId, [input], updatedAt, false);
  }

  applyDispositions(waveId: string, inputs: WaveDispositionInput[], updatedAt: string, skipAccounted = true): WaveDispositionResult {
    const apply = this.database.transaction((dispositions: WaveDispositionInput[]) => {
      const rows = new Map(this.members(waveId).map((row) => [row.lane_id, row]));
      for (const disposition of dispositions) {
        if (!rows.has(disposition.laneId)) throw new Error(`Lane ${disposition.laneId} is not a member of ${waveId}`);
      }
      const update = this.database.query(`
        UPDATE campaign_wave_lanes SET disposition = $disposition, reason = $reason, updated_at = $now
        WHERE wave_id = $wave AND lane_id = $lane
      `);
      const applied: WaveDispositionInput[] = [];
      for (const disposition of dispositions) {
        const row = rows.get(disposition.laneId)!;
        if (skipAccounted && waveLaneAccounted(row)) continue;
        update.run({
          $disposition: disposition.disposition,
          $reason: disposition.reason,
          $now: updatedAt,
          $wave: waveId,
          $lane: disposition.laneId,
        });
        applied.push(disposition);
      }
      const accounting = waveAccounting(this.members(waveId));
      if (accounting.complete) {
        this.database.query("UPDATE campaign_waves SET phase = 'SYNTHESIS_READY', updated_at = $now WHERE wave_id = $wave")
          .run({ $now: updatedAt, $wave: waveId });
      }
      const wave = this.database.query("SELECT phase FROM campaign_waves WHERE wave_id = $wave")
        .get({ $wave: waveId }) as { phase: string } | null;
      if (!wave) throw new Error(`Unknown wave: ${waveId}`);
      return { applied, accounting, phase: wave.phase };
    });
    return apply(inputs);
  }
}
