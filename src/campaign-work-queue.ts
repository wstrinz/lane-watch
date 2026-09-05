export interface CampaignQueueResult { id: string; title: string; path: string; revision: string; sha256: string; }
export interface CampaignQueueItem { id: string; title: string; status: 'ready'|'active'|'held'|'done'; kind: 'campaign'|'tooling'|'handoff'; detail: string; dependsOn: string[]; results?: CampaignQueueResult[]; }
export interface CampaignWorkQueue { title: string; updatedAt: string; cutoffAt: string; cadenceMinutes: number; items: CampaignQueueItem[]; authority: 'planning-only'; error?: string; }
/** Bounded, declarative planning context. Never consumed by dispatch or authority code. */
export function parseCampaignWorkQueue(content?: string): CampaignWorkQueue | null {
 if (!content) return null;
 try {
  if (content.length > 64000) throw Error('Queue exceeds 64 KB');
  const q=JSON.parse(content);
  const str=(v: unknown,max: number)=>{if(typeof v!=='string'||v.length>max)throw Error('Invalid queue text');return v;};
  if(q.schema!=='lane-watch-work-queue/v1'||!Array.isArray(q.items)||q.items.length>32)throw Error('Invalid queue schema');
  const items: CampaignQueueItem[]=q.items.map((i:any)=>{
   if(!/^[A-Za-z0-9_-]{1,40}$/.test(i.id)||!['ready','active','held','done'].includes(i.status)||!['campaign','tooling','handoff'].includes(i.kind)||!Array.isArray(i.dependsOn)||i.dependsOn.length>32||i.dependsOn.some((d:unknown)=>typeof d!=='string'))throw Error('Invalid queue item');
   let results: CampaignQueueResult[] | undefined;
   if(i.results!==undefined){
    if(!Array.isArray(i.results)||i.results.length>6)throw Error('Invalid queue results');
    results=i.results.map((r:any)=>{
     if(!r||!/^[A-Za-z0-9_-]{1,40}$/.test(r.id)||!isQueueResultPath(r.path)||!/^[a-f0-9]{40}$/.test(r.revision)||!/^[a-f0-9]{64}$/.test(r.sha256))throw Error('Invalid queue result reference');
     return {id:r.id,title:str(r.title,160),path:r.path,revision:r.revision,sha256:r.sha256};
    });
    if(new Set(results!.map(r=>r.id)).size!==results!.length)throw Error('Duplicate queue result');
   }
   return {id:i.id,title:str(i.title,160),status:i.status,kind:i.kind,detail:str(i.detail,1600),dependsOn:i.dependsOn,...(results?{results}:{})};
  });
  const ids=new Set(items.map(i=>i.id));
  if(ids.size!==items.length||items.some(i=>i.dependsOn.some(d=>!ids.has(d)||d===i.id)))throw Error('Invalid queue dependency');
  const visited=new Set<string>(),visiting=new Set<string>();
  const visit=(id:string)=>{if(visiting.has(id))throw Error('Cyclic queue dependency');if(visited.has(id))return;visiting.add(id);items.find(i=>i.id===id)!.dependsOn.forEach(visit);visiting.delete(id);visited.add(id);};
  items.forEach(i=>visit(i.id));
  if(!Number.isInteger(q.cadenceMinutes)||q.cadenceMinutes<1||q.cadenceMinutes>1440||!Number.isFinite(Date.parse(q.updatedAt))||!Number.isFinite(Date.parse(q.cutoffAt)))throw Error('Invalid queue timing');
  return {title:str(q.title,160),updatedAt:q.updatedAt,cutoffAt:q.cutoffAt,cadenceMinutes:q.cadenceMinutes,items,authority:'planning-only'};
 }catch(error){return {title:'Work queue needs attention',updatedAt:'',cutoffAt:'',cadenceMinutes:0,items:[],authority:'planning-only',error:error instanceof Error?error.message:'Invalid queue'};}
}

/** Git blob paths only; no revision expressions, external paths or traversal. */
export function isQueueResultPath(path: unknown): path is string {
 return typeof path==='string' && path.length<=320 && /^(?:[A-Za-z0-9_.-]+\/)*[A-Za-z0-9_.-]+\.(?:md|txt|json)$/i.test(path)
  && path.split('/').every(segment=>segment!=='.'&&segment!=='..');
}
