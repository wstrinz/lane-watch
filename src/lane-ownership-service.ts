import type { LaneSnapshot } from "./types";
import { CampaignCoordinationInterfaceService } from "./campaign-coordination-interface-service";

export interface LaneOwnership {
  laneId: string;
  origin: "controller-run" | "adopted-wave" | "observed-elsewhere";
  controlled: boolean;
  runId: string;
  waveId: string;
  reason: string;
}

/** Gives every observed lane an explicit controller-ownership classification. */
export class LaneOwnershipService {
  constructor(private readonly coordination: CampaignCoordinationInterfaceService) {}

  classify(projectId: string, lanes: LaneSnapshot[]): LaneOwnership[] {
    return this.coordination.snapshot(projectId, lanes).lanes.map((lane) => ({
      laneId: lane.laneId,
      origin: lane.mode === "controller-owned-execution" ? "controller-run"
        : lane.mode === "imported-wave" ? "adopted-wave" : "observed-elsewhere",
      controlled: lane.controlled,
      runId: lane.runId,
      waveId: lane.waveId,
      reason: lane.reason,
    }));
  }

  lane(projectId: string, lane: LaneSnapshot): LaneOwnership {
    return this.classify(projectId, [lane])[0];
  }
}
