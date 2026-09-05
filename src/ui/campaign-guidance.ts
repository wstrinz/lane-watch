export type GuideAction = { key: string; label: string; style?: string; targetId?: string; target?: string; args?: Record<string, any> };
export type GuideFocus = { title: string; detail: string; status: string; actions: GuideAction[] };
const sentence=(value:string)=>/[.!?]$/.test(value.trim())?value.trim():value.trim()+'.';
export function latestResearchRun(project: any): any {
  return [...(project?.researchRuns || [])].sort((a,b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")))[0];
}
export function receiptNeedsAttention(run: any): boolean {
  return run?.status === "awaiting_evidence" || (run?.status === "failed" && /Evidence receipt is not ready/i.test(run.error || ""));
}
/** A parked reviewed plan gets navigation, never an inferred retry/dispatch. */
export function pausedResearchFocus(project:any):GuideFocus|null {
  if(project?.phase!=='BLOCKED'||project.researchPlan?.status!=='block')return null;
  if((project.researchRuns||[]).some((run:any)=>['launching','running','blocked','awaiting_evidence','evidence_ready'].includes(run.status)))return null;
  const queue=project.workQueue?.error?null:project.workQueue;
  const active=queue?.items?.find((item:any)=>item.status==='active');
  const lanes=project.researchPlan.response?.lanes||[];
  const allDrop=lanes.length>0&&lanes.every((lane:any)=>lane.action==='DROP');
  return {
    status:'RESEARCH PAUSED',title:'The research plan is parked',
    detail:(allDrop?`The review recommends dropping all ${lanes.length} proposed lanes; the plan is held.`:'The checked plan is held until its prerequisites or direction change.')+
      (active?` Recorded work in progress: ${active.title}.`:' Review the plan and its reasons before proposing another lane.'),
    actions:[
      ...(queue?[{key:'reveal',label:'View current work',target:'#campaign-work-queue',style:'primary-button'}]:[]),
      {key:'inspect',label:'Inspect plan and reasons',style:queue?'outline-button':'primary-button'},
    ],
  };
}
export function executionFocus(project: any): GuideFocus | null {
  const uncertain=(project.researchRuns||[]).find((run:any)=>run.launchAttempt?.status==='uncertain');
  if(uncertain)return {status:'LAUNCH NEEDS VERIFICATION',title:'Verify the last launch before retrying',
    detail:'The launcher did not return a confirmed outcome. Work may have started. Its frozen attempt and any later receipt are retained; check the exact job before retrying. '+String(uncertain.error||''),
    actions:[{key:'reveal',label:'Inspect launch and evidence',target:'#research-launch-attempts',style:'primary-button'}]};
  const run = latestResearchRun(project);
  const inspect: GuideAction = { key: "reveal", label: "View result and evidence", target: "#evidence-workspace", style: "outline-button" };
  if (receiptNeedsAttention(run)) return {
    status: "RESULT NEEDS CHECKING", title: "Recover the finished result",
    detail: "The worker has stopped. Its evidence needs a custody check before review; restarting the research will not resolve this. " + String(run.error || "The receipt is not yet validated."),
    actions: [{ key: "refresh", label: "Recheck existing receipt", style: "primary-button" }, inspect],
  };
  if (run?.status === "evidence_ready" && ["RESEARCH_READY", "RESEARCH_INTAKE"].includes(project.phase)) return {
    status: "RESULT READY", title: "Review the finished research",
    detail: String(run.evidenceSummary?.verdict || run.evidence?.terminal_state || run.evidence?.verdict || run.evidenceSummary?.status || run.evidence?.status || "Receipt validated") + ". " + sentence(String(project.researchPlan?.response?.lanes?.find((lane: any) => lane.taskId === run.taskId)?.question || run.taskId)) + " Continue to a synthesis of this result; no new research is launched.",
    actions: [{ key: "research.evidence.return", targetId: run.id, label: "Continue to result review", style: "primary-button" }, inspect],
  };
  if (project.phase !== "RESEARCH_READY") return null;
  if (project.custody?.counts?.blocking) return null;
  const schedule = project.researchSchedule;
  if (schedule?.status === "proposed") return { status: "SCHEDULE READY", title: "Review the launch plan", detail: schedule.proposal?.summary || "Confirm this exact set of tasks and its resource reservation.", actions: [{ key: "research.schedule.confirm", targetId: schedule.id, args: { scheduleDigest: schedule.digest }, label: "Confirm schedule", style: "primary-button" }] };
  if (schedule?.status === "confirmed") return { status: "READY TO LAUNCH", title: "Start the confirmed research", detail: "Launch only the tasks in this confirmed schedule.", actions: [{ key: "research.schedule.dispatch", targetId: schedule.id, args: { scheduleDigest: schedule.digest }, label: "Launch research", style: "primary-button" }] };
  if (project.loopStart?.canStart === false && !["SCHEDULE_CONFIRMATION", ""].includes(project.loopStart.code || "")) return { status: "NEW RESEARCH PAUSED", title: "Resolve the launch limit", detail: project.loopStart.blocker || "The current launch checks have not cleared.", actions: [{ key: "reveal", label: "Review resources and strategy", target: "#strategy-workspaces", style: "primary-button" }] };
  return { status: "PLAN APPROVED", title: "Prepare the next launch", detail: "Freeze the approved tasks and their resource reservation for review.", actions: [{ key: "research.schedule.prepare", label: "Prepare schedule", style: "primary-button" }] };
}
