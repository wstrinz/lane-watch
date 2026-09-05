import type { LaneSnapshot } from './types';

/** A logical task name cannot settle or display an unbound new launch attempt. */
export function matchResearchRunLane(run:{status:string;task_id:string;lane_id:string;job_id:string},lanes:LaneSnapshot[]):LaneSnapshot|undefined {
  if(run.job_id)return lanes.find(candidate=>candidate.jobId===run.job_id);
  if(run.status==='launching')return undefined;
  return lanes.find(candidate=>candidate.task===run.task_id||candidate.id===run.lane_id);
}
