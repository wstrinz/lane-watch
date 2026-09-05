/** Tracks the actual spawn handle, never a saved PID. A signal exit may leave
 * exitCode null; its exit notification still establishes this process's exit.
 * This does not establish descendant coverage, responsiveness or tree exit. */
export function observeOwnedProcessExit(child:Pick<Bun.Subprocess,'exited'|'exitCode'|'signalCode'>) {
 let state:'running'|'exited'|'unknown'='running';
 const settled=child.exited.then(()=>{state='exited';},()=>{state='unknown';});
 return Object.freeze({
  settled,
  isRunning:()=>state==='running'&&child.exitCode===null&&child.signalCode===null,
  hasExited:()=>state==='exited',
 });
}
