import {readFileSync,writeFileSync,openSync,readSync,closeSync,existsSync} from 'node:fs';
import {dirname,join} from 'node:path';
import {createHash} from 'node:crypto';
import {performance} from 'node:perf_hooks';

// Existing-history audit only: four named transcript prefixes, <=4 MiB each /
// 16 MiB total, 10 s internal / 20 s caller timeout. No model, network or job control.
// Prefix recovery is permitted only by the original full SHA-256, never by usage similarity.
const started=performance.now(),limit=4*1024*1024;
const check=()=>{if(performance.now()-started>10000)throw Error('Audit exceeded its 10-second internal bound');};
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
const prior=JSON.parse(readFileSync(new URL('../runtime-audits/2026-09-04-bs21-usage-scopes.json',import.meta.url),'utf8'));
const stateBytes=readFileSync('C:/Users/wstri/.claude/jobs/81657050/state.json');
if(hash(stateBytes)!==prior.stateSha256)throw Error('Recorded terminal state changed');
const state=JSON.parse(stateBytes);
if(state.sessionId!=='81657050-7da7-458d-b858-128b99f9c79b'||state.state!=='done')throw Error('Wrong or nonterminal job');
const fields=['input_tokens','cache_creation_input_tokens','cache_read_input_tokens','output_tokens'];
const empty=()=>Object.fromEntries(fields.map(f=>[f,0]));
const sum=rows=>rows.reduce((s,r)=>{for(const f of fields)s[f]+=r[f];return s;},empty());
const reports=[];let totalBytes=0;
for(const source of prior.transcripts){
 check();
 const path=source.scope==='lead'?state.linkScanPath:join(dirname(state.linkScanPath),state.sessionId,'subagents',source.file);
 const fd=openSync(path,'r'),storage=Buffer.alloc(limit+1);let count=0;
 try{while(count<storage.length){const n=readSync(fd,storage,count,storage.length-count,null);if(!n)break;count+=n;check();}}finally{closeSync(fd);}
 if(count>limit||(totalBytes+=count)>16*1024*1024)throw Error('Transcript byte bound exceeded');
 const full=storage.subarray(0,count);let content=full;
 if(hash(content)!==source.sha256){
  const prefixHash=createHash('sha256');let start=0,found=-1,lines=0;
  for(let i=0;i<full.length;i++)if(full[i]===10){
   prefixHash.update(full.subarray(start,i+1));start=i+1;
   if(prefixHash.copy().digest('hex')===source.sha256){found=i+1;break;}
   if(++lines>50000)throw Error('Prefix line bound exceeded');check();
  }
  if(found<0)throw Error('Original transcript hash is not available as an exact prefix: '+source.file);
  content=full.subarray(0,found);
 }
 const raw=[],byId=new Map(),types={},suffixTypes={};let missingIds=0,usageRecords=0;
 const lines=content.toString('utf8').split(/\r?\n/);if(lines.length>50000)throw Error('Transcript line bound exceeded');
 for(const line of lines){
  check();if(!line.trim())continue;
  const record=JSON.parse(line);types[record.type]=(types[record.type]||0)+1;
  if(record.type!=='assistant'||!record.message?.usage)continue;
  const usage=record.message.usage,row=empty();usageRecords++;
  for(const field of fields){const value=usage[field]??0;if(!Number.isSafeInteger(value)||value<0)throw Error('Invalid token counter');row[field]=value;}
  raw.push(row);
  const id=record.message.id;if(typeof id!=='string'||!id){missingIds++;continue;}
  const previous=byId.get(id)||{first:row,max:empty(),last:row,copies:0};
  for(const field of fields)previous.max[field]=Math.max(previous.max[field],row[field]);
  previous.last=row;previous.copies++;byId.set(id,previous);
 }
 for(const line of full.subarray(content.length).toString('utf8').split(/\r?\n/))if(line.trim()){
  const record=JSON.parse(line);suffixTypes[record.type]=(suffixTypes[record.type]||0)+1;
 }
 if(missingIds)throw Error('Assistant usage without a stable message id');
 const max=sum([...byId.values()].map(v=>v.max));
 if(JSON.stringify(max)!==JSON.stringify(source.fieldSums))throw Error('Frozen per-message usage no longer matches the original audit');
 const multiplicity={};for(const value of byId.values())multiplicity[value.copies]=(multiplicity[value.copies]||0)+1;
 reports.push({file:source.file,scope:source.scope,sha256:hash(content),bytes:content.length,observedFileSha256:hash(full),observedFileBytes:full.length,excludedSuffixBytes:full.length-content.length,excludedSuffixRecordTypes:suffixTypes,recordTypes:types,usageRecords,uniqueMessageIds:byId.size,multiplicity,sums:{raw:sum(raw),first:sum([...byId.values()].map(v=>v.first)),max,last:sum([...byId.values()].map(v=>v.last))}});
}
const metrics={output:['output_tokens'],uncachedInputAndOutput:['input_tokens','output_tokens'],inputIncludingCacheCreationAndOutput:['input_tokens','cache_creation_input_tokens','output_tokens'],allFourFields:fields};
const comparisons=[];
for(const scope of ['lead','children','all'])for(const aggregation of ['raw','first','max','last']){
 const scoped=reports.filter(r=>scope==='all'||(scope==='children'?r.scope==='child':r.scope==='lead'));
 const sums=sum(scoped.map(r=>r.sums[aggregation]));
 for(const [metric,keys] of Object.entries(metrics)){
  const tokens=keys.reduce((n,key)=>n+sums[key],0);
  comparisons.push({scope,aggregation,metric,tokens,matchesDaemon:tokens===state.tokens});
 }
}
check();
const report={schema:'lane-watch-token-counter-reconstruction/v1',observedAt:new Date().toISOString(),jobId:prior.jobId,sessionId:state.sessionId,cliVersion:state.cliVersion,stateSha256:hash(stateBytes),daemonReportedTokens:state.tokens,sources:reports,comparisons,exactMatches:comparisons.filter(c=>c.matchesDaemon),elapsedSeconds:(performance.now()-started)/1000,limits:{files:4,bytesPerFile:limit,totalBytes:16*1024*1024,internalSeconds:10,outerSeconds:20},scope:'Numerical reconstruction of one frozen terminal job; not a provider billing definition, supported runtime contract, new ledger metric or launch authorization.'};
const target=new URL('../runtime-audits/2026-09-05-bs21-token-counter-reconstruction.json',import.meta.url);
if(existsSync(target))throw Error('Refusing to overwrite the recorded audit');
writeFileSync(target,JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({exactMatches:report.exactMatches,sources:reports.map(r=>({file:r.file,bytes:r.bytes,excludedSuffixBytes:r.excludedSuffixBytes,excludedSuffixRecordTypes:r.excludedSuffixRecordTypes,usageRecords:r.usageRecords,uniqueMessageIds:r.uniqueMessageIds,sums:r.sums})),elapsedSeconds:report.elapsedSeconds}));
