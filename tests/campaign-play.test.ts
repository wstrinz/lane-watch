import {expect,test} from 'bun:test';
import {campaignMoves,campaignActivity,adviserPrompt,structuredAdvice} from '../src/ui/campaign-play';
test('structured planning replies are recognized without treating arbitrary JSON as a plan',()=>{
 expect(structuredAdvice('{"summary":"Reviews held","decision":"BLOCKED"}')?.summary).toBe('Reviews held');
 expect(structuredAdvice('```json\n{"summary":"Ready","newDirections":[]}\n```')?.summary).toBe('Ready');
 expect(structuredAdvice('{"summary":"A mathematical variable"}')).toBeNull();
 expect(structuredAdvice('An ordinary reply')).toBeNull();
});
test('moves honor dependencies and keep useful research ahead of infrastructure',()=>{
 const p:any={workQueue:{items:[{id:'runtime',kind:'tooling',status:'active',dependsOn:[]},{id:'review',kind:'campaign',status:'ready',dependsOn:['proof']},{id:'solve',kind:'campaign',status:'held',dependsOn:[]},{id:'missing',kind:'campaign',status:'ready',dependsOn:['nope']},{id:'proof',status:'done'}]}};
 expect(campaignMoves(p).map((x:any)=>x.id)).toEqual(['review','runtime']);
 expect(campaignActivity(p).busy).toBe(false);
});
test('actual activity is separate from queue labels and returned runs',()=>{
 const p:any={researchRuns:[{status:'returned_to_sol'},{status:'running'}],actions:[{status:'completed'},{status:'queued'}],coordinator:{status:'working'},custody:{items:[{activeLease:{status:'running'}}]}};
 expect(campaignActivity(p)).toMatchObject({busy:true,advising:true});expect(campaignActivity(p).research).toHaveLength(1);
});
test('advice includes exact evidence references and does not authorize research',()=>{
 const p:any={id:'cfg23',workQueue:{items:[{kind:'campaign',title:'Proof',results:[{path:'proof.md',revision:'a'.repeat(40),sha256:'b'.repeat(64)}]}]}};
 const prompt=adviserPrompt(p,{title:'Review',detail:'Check scope'},'Challenge','Is this complete?');
 expect(prompt).toContain('proof.md at '+ 'a'.repeat(40));expect(prompt).toContain('Do not edit files');expect(prompt).toContain('Challenge');
});
