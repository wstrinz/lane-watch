import type { LaneSnapshot } from "./types";
import { WAVE_DISPOSITIONS, deriveCampaignPhase, waveAccounting, type WaveAccounting } from "./wave";
import { WaveRepository, type WaveDispositionInput, type WaveRecord } from "./wave-repository";

export interface WaveCommandResult {
  wave: WaveRecord;
  accounting: WaveAccounting;
  created?: boolean;
}

function validateDisposition(input: WaveDispositionInput): WaveDispositionInput {
  const disposition = input.disposition.trim().toUpperCase();
  const reason = input.reason.trim().slice(0, 1000);
  if (disposition && !WAVE_DISPOSITIONS.has(disposition)) throw new Error(`Invalid lane disposition: ${disposition}`);
  if (disposition && !reason) throw new Error("A reason is required for an explicit lane disposition");
  return { laneId: input.laneId, disposition, reason };
}

export class WaveCommandService {
  constructor(private readonly repository: WaveRepository) {}

  adopt(input: {
    waveId: string;
    projectId: string;
    label: string;
    lanes: LaneSnapshot[];
    createdAt: string;
  }): WaveCommandResult {
    if (!input.lanes.length) throw new Error("No active lanes are available to adopt");
    const laneIds = input.lanes.map((lane) => lane.id);
    if (new Set(laneIds).size !== laneIds.length) throw new Error("A wave cannot contain duplicate lane members");
    const current = this.repository.latest(input.projectId);
    if (current && current.phase !== "NEXT_WAVE_READY") {
      return { wave: current, accounting: this.accounting(current.wave_id), created: false };
    }
    const wave = this.repository.adopt({
      ...input,
      label: input.label.trim() || `Adopted wave ${input.createdAt.slice(0, 10)}`,
      phase: deriveCampaignPhase(input.lanes),
    });
    return { wave, accounting: this.accounting(wave.wave_id), created: true };
  }

  syncObservedMembers(wave: WaveRecord, lanes: LaneSnapshot[], updatedAt: string): WaveAccounting {
    const membership = new Set(this.repository.members(wave.wave_id).map((member) => member.lane_id));
    return this.repository.syncObservedMembers(wave.wave_id, lanes.filter((lane) => membership.has(lane.id)), updatedAt);
  }

  recordDisposition(wave: WaveRecord, input: WaveDispositionInput, updatedAt: string) {
    const validated = validateDisposition(input);
    if (!this.repository.member(wave.wave_id, validated.laneId)) {
      throw new Error(`Lane ${validated.laneId} is not a member of ${wave.wave_id}`);
    }
    return this.repository.recordDisposition(wave.wave_id, validated, updatedAt);
  }

  applyDispositions(wave: WaveRecord, inputs: WaveDispositionInput[], updatedAt: string) {
    const laneIds = inputs.map((input) => input.laneId);
    if (new Set(laneIds).size !== laneIds.length) throw new Error("A disposition batch cannot name the same lane twice");
    return this.repository.applyDispositions(wave.wave_id, inputs.map(validateDisposition), updatedAt);
  }

  accounting(waveId: string): WaveAccounting {
    return waveAccounting(this.repository.members(waveId));
  }
}
