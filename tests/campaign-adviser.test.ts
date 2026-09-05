import {expect, test} from 'bun:test';
import {CoordinatorSessionService} from '../src/coordinator-session-service';

function fixture(status='idle') {
 const calls:any[]=[],events:any[]=[];
 const row:any={thread_id:'attached',thread_cwd:'C:/campaign',model:'gpt-5.6-sol',effort:'high',status,last_turn_id:status==='working'?'turn_active':''};
 const service=new CoordinatorSessionService(
  {query:()=>({run:()=>{}})} as any,
  {startTurn:async(p:any)=>{calls.push(p);return{id:'turn_new'}},steerTurn:async()=>{throw Error('Advice must not steer')}} as any,
  {workspaceRoot:()=>'',now:()=>new Date().toISOString(),recordEvent:(...e:any[])=>events.push(e)} as any);
 service.get=()=>row;service.writable=async()=>row;
 return {service,calls,events};
}

for(const model of ['gpt-5.6-sol','gpt-5.6-terra','gpt-6-astra'])test(`adviser passes ${model} with read-only consultation bounds`,async()=>{
 const {service,calls,events}=fixture();
 await service.sendMessage('cfg23',{advice:true,model,role:'Challenge',message:'Review this proof'});
 expect(calls).toHaveLength(1);
 expect(calls[0]).toMatchObject({model,approvalPolicy:'never',sandboxPolicy:{type:'readOnly'}});
 expect(calls[0].input[0].text).toContain('Do not edit files, dispatch workers');
 expect(events[0][4]).toMatchObject({purpose:'advice',model,role:'Challenge'});
});

test('advice rejects unsupported models and never steers an active writer',async()=>{
 const idle=fixture();
 await expect(idle.service.sendMessage('cfg23',{advice:true,model:'unknown',message:'Review'})).rejects.toThrow('supported');
 expect(idle.calls).toHaveLength(0);
 const active=fixture('working');
 await expect(active.service.sendMessage('cfg23',{advice:true,model:'gpt-5.6-terra',message:'Review'})).rejects.toThrow('already working');
 expect(active.calls).toHaveLength(0);
});
