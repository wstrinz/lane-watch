import {expect,test} from "bun:test";
import {executionFocus} from "../src/ui/campaign-guidance";
const ready = {phase:"RESEARCH_READY",loop:{status:"stopped"}};
test("stopped automation does not route schedule preparation or launch through resume",()=>{
  expect(executionFocus(ready)?.actions[0].key).toBe("research.schedule.prepare");
  expect(executionFocus({...ready,researchSchedule:{status:"confirmed",id:"s",digest:"d"}})?.actions[0]).toMatchObject({key:"research.schedule.dispatch",targetId:"s",args:{scheduleDigest:"d"}});
});
test("receipt failures take priority over requeue and budget exhaustion",()=>{
  const p={...ready,loopStart:{canStart:false,code:"EPOCH_BUDGET",blocker:"Budget exhausted"},researchRuns:[{id:"r",status:"failed",error:"Evidence receipt is not ready: invalid map",createdAt:"2026-09-05"}]};
  expect(executionFocus(p)?.actions[0].key).toBe("refresh");
  expect(executionFocus(p)?.title).toContain("finished result");
  expect(executionFocus({...p,researchRuns:[]})?.actions[0].key).toBe("reveal");
});
test("validated inconclusive result can be reviewed without new research budget",()=>{
  const f=executionFocus({...ready,researchRuns:[{id:"r",taskId:"pilot",status:"evidence_ready",evidence:{verdict:"INCONCLUSIVE"}}]});
  expect(f?.actions[0]).toMatchObject({key:"research.evidence.return",targetId:"r"});expect(f?.detail).toContain("INCONCLUSIVE");
});

import {assertRecoveredIntake} from "../src/research-execution-service";
test("explicit receipt intake can recover a requeued job but cannot displace another launch",()=>{
 expect(()=>assertRecoveredIntake("landed",true,0)).not.toThrow();
 expect(()=>assertRecoveredIntake("failed",true,0)).not.toThrow();
 for(const status of ["proposed","confirmed","dispatching","running"]) expect(()=>assertRecoveredIntake(status,true,0)).toThrow();
 expect(()=>assertRecoveredIntake("landed",false,0)).toThrow();
 expect(()=>assertRecoveredIntake("landed",true,1)).toThrow();
});

test("the compact UI snapshot retains the terminal verdict and bounded question",()=>{
 const p={...ready,researchRuns:[{id:"r",taskId:"pilot",status:"evidence_ready",evidenceSummary:{verdict:"INCONCLUSIVE"}}],researchPlan:{response:{lanes:[{taskId:"pilot",question:"Can the single template be closed?"}]}}};
 expect(executionFocus(p)?.detail).toStartWith("INCONCLUSIVE. Can the single template be closed?");
});
