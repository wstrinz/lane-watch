import type {ResearchWatchPort} from './research-runtime-watch';

export interface ResearchWatchIoLimits {
  observationMs:number; auditMs:number; checkpointMs:number; stopMs:number; waitMs:number;
}
const DEFAULT_LIMITS:ResearchWatchIoLimits={observationMs:2000,auditMs:2000,checkpointMs:2000,stopMs:12000,waitMs:2000};

/** Bounds unresolved asynchronous calls while the event loop is responsive.
 * A timeout does not cancel the underlying operation. Latch that operation
 * closed so a late completion is discarded and no parallel retry accumulates.
 * This does not contain synchronous/event-loop hangs or supervise the process.
 */
export function boundedResearchWatchPort(base:ResearchWatchPort,limits:ResearchWatchIoLimits=DEFAULT_LIMITS):ResearchWatchPort {
  for(const value of Object.values(limits))if(!Number.isSafeInteger(value)||value<1||value>30000)throw Error('Invalid bounded watch I/O policy');
  for(const key of Object.keys(DEFAULT_LIMITS) as Array<keyof ResearchWatchIoLimits>)if(limits[key]===undefined)throw Error('Incomplete bounded watch I/O policy');
  function bounded<Args extends unknown[],Result>(name:string,ms:number,operation:(...args:Args)=>Promise<Result>){
    let timedOut:Error|null=null;
    return (...args:Args):Promise<Result>=>{
      if(timedOut)return Promise.reject(timedOut);
      return new Promise((resolve,reject)=>{
        let settled=false;
        const timer=setTimeout(()=>{
          if(settled)return;settled=true;
          timedOut=Error(`Runtime ${name} timed out; further calls are held until process recovery`);
          reject(timedOut);
        },ms);
        // Defer invocation so synchronous throws also clear the timer. A blocking
        // synchronous operation still needs an external process supervisor.
        Promise.resolve().then(()=>operation(...args)).then(value=>{
          if(settled)return;settled=true;clearTimeout(timer);resolve(value);
        },error=>{
          if(settled)return;settled=true;clearTimeout(timer);reject(error);
        });
      });
    };
  }
  return {
    ...base,
    observe:bounded('observation',limits.observationMs,id=>base.observe(id)),
    stop:bounded('stop',limits.stopMs,id=>base.stop(id)),
    ...(base.verifyExit?{verifyExit:bounded('exit verification',limits.observationMs,id=>base.verifyExit!(id))}:{}),
    record:bounded('audit write',limits.auditMs,event=>base.record(event)),
    wait:bounded('poll wait',limits.waitMs,ms=>base.wait(ms)),
    ...(base.checkpoint?{checkpoint:bounded('checkpoint',limits.checkpointMs,state=>base.checkpoint!(state))}:{}),
  };
}
