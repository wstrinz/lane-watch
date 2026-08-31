import { Database } from "bun:sqlite";
import type { WaveScheduleMember, WaveScheduleProposal } from "./wave-schedule";

export interface WaveScheduleRow {
  schedule_id: string;
  project_id: string;
  wave_id: string;
  schedule_digest: string;
  plan_digest: string;
  resource_digest: string;
  status: string;
  proposal_json: string;
  created_by: string;
  confirmed_by: string;
  created_at: string;
  updated_at: string;
  confirmed_at: string;
  completed_at: string;
}

export interface WaveScheduleMemberRow {
  schedule_id: string;
  request_id: string;
  task_id: string;
  ordinal: number;
  status: string;
  token_cap: number;
  launch_spec_json: string;
  member_json: string;
  run_id: string;
  error: string;
  updated_at: string;
}

export class WaveScheduleRepository {
  constructor(private readonly database: Database) {}

  latest(projectId: string, waveId = ""): WaveScheduleRow | null {
    const condition = waveId ? "project_id = $project AND wave_id = $wave" : "project_id = $project";
    return this.database.query(`SELECT * FROM campaign_wave_schedules WHERE ${condition} ORDER BY created_at DESC LIMIT 1`)
      .get({ $project: projectId, $wave: waveId }) as WaveScheduleRow | null;
  }

  byId(scheduleId: string): WaveScheduleRow | null {
    return this.database.query("SELECT * FROM campaign_wave_schedules WHERE schedule_id = $id").get({ $id: scheduleId }) as WaveScheduleRow | null;
  }

  members(scheduleId: string): WaveScheduleMemberRow[] {
    return this.database.query("SELECT * FROM campaign_wave_schedule_members WHERE schedule_id = $id ORDER BY ordinal")
      .all({ $id: scheduleId }) as WaveScheduleMemberRow[];
  }

  create(input: {
    scheduleId: string;
    scheduleDigest: string;
    proposal: WaveScheduleProposal;
    actor: string;
  }): WaveScheduleRow {
    const insert = this.database.transaction((value: typeof input) => {
      this.database.query(`
        UPDATE campaign_wave_schedules SET status = 'superseded', updated_at = $now
        WHERE project_id = $project AND wave_id = $wave AND status = 'proposed'
      `).run({ $project: value.proposal.projectId, $wave: value.proposal.waveId, $now: value.proposal.createdAt });
      this.database.query(`
        INSERT INTO campaign_wave_schedules(
          schedule_id, project_id, wave_id, schedule_digest, plan_digest, resource_digest, status,
          proposal_json, created_by, confirmed_by, created_at, updated_at, confirmed_at, completed_at
        ) VALUES ($id, $project, $wave, $digest, $plan, $resource, 'proposed', $proposal, $actor, '', $now, $now, '', '')
      `).run({
        $id: value.scheduleId, $project: value.proposal.projectId, $wave: value.proposal.waveId,
        $digest: value.scheduleDigest, $plan: value.proposal.planDigest, $resource: value.proposal.resourceDigest,
        $proposal: JSON.stringify(value.proposal), $actor: value.actor, $now: value.proposal.createdAt,
      });
      const memberInsert = this.database.query(`
        INSERT INTO campaign_wave_schedule_members(
          schedule_id, request_id, task_id, ordinal, status, token_cap, launch_spec_json, member_json, run_id, error, updated_at
        ) VALUES ($schedule, $request, $task, $ordinal, 'reserved', $tokens, $spec, $member, '', '', $now)
      `);
      for (const member of value.proposal.members) {
        memberInsert.run({
          $schedule: value.scheduleId, $request: member.requestId, $task: member.taskId, $ordinal: member.ordinal,
          $tokens: member.tokenCap, $spec: JSON.stringify(member.launchSpec), $member: JSON.stringify(member), $now: value.proposal.createdAt,
        });
      }
    });
    insert(input);
    return this.byId(input.scheduleId)!;
  }

  confirm(scheduleId: string, expectedDigest: string, actor: string, confirmedAt: string): WaveScheduleRow {
    const confirm = this.database.transaction(() => {
      const schedule = this.byId(scheduleId);
      if (!schedule) throw new Error(`Unknown wave schedule: ${scheduleId}`);
      if (schedule.schedule_digest !== expectedDigest) throw new Error("The wave schedule digest has changed");
      if (schedule.status === "confirmed") return schedule;
      if (schedule.status !== "proposed") throw new Error(`Wave schedule cannot be confirmed from ${schedule.status}`);
      if (!this.members(scheduleId).length) throw new Error("An empty wave schedule cannot be confirmed");
      this.database.query(`
        UPDATE campaign_wave_schedules SET status = 'confirmed', confirmed_by = $actor, confirmed_at = $now, updated_at = $now
        WHERE schedule_id = $id
      `).run({ $id: scheduleId, $actor: actor, $now: confirmedAt });
      return this.byId(scheduleId)!;
    });
    return confirm();
  }

  transitionMember(scheduleId: string, requestId: string, status: string, runId: string, error: string, updatedAt: string): void {
    const result = this.database.query(`
      UPDATE campaign_wave_schedule_members SET status = $status, run_id = $run, error = $error, updated_at = $now
      WHERE schedule_id = $schedule AND request_id = $request
    `).run({ $schedule: scheduleId, $request: requestId, $status: status, $run: runId, $error: error, $now: updatedAt });
    if (!result.changes) throw new Error(`Request ${requestId} is not reserved by ${scheduleId}`);
  }

  transitionSchedule(scheduleId: string, status: string, updatedAt: string): void {
    this.database.query(`
      UPDATE campaign_wave_schedules SET status = $status, updated_at = $now,
        completed_at = CASE WHEN $status IN ('completed', 'failed', 'partial') THEN $now ELSE completed_at END
      WHERE schedule_id = $id
    `).run({ $id: scheduleId, $status: status, $now: updatedAt });
  }
}
