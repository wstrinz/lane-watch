import {readFileSync,writeFileSync,existsSync,openSync,readSync,closeSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {performance} from 'node:perf_hooks';

// Follow-up to the bounded transcript audit: one already identified 1,917,947-byte
// lead prefix, pinned by SHA-256, at most 5 s internal / 10 s caller timeout.
// Extract numeric usage fields only. Never launch a worker or alter accounting.
const started=performance.now();
const prior=JSON.parse(readFileSync(new URL('../runtime-audits/2026-09-05-bs21-token-counter-reconstruction.json',import.meta.url),'utf8'));
const source=prior.sources.find(s=>s.scope==='lead');
if(source.observedFileBytes!==1917947||source.observedFileSha256!=='da3c27e975bbc00fc131404fecf5b96c994287ccc41aae735f53692e9fb998bc')throw Error('Unexpected source identity');
const hash=b=>createHash('sha256').update(b).digest('hex');
const stateBytes=readFileSync('C:/Users/wstri/.claude/jobs/81657050/state.json');
if(hash(stateBytes)!==prior.stateSha256)throw Error('Terminal state changed');
const state=JSON.parse(stateBytes),bytes=Buffer.alloc(source.observedFileBytes),fd=openSync(state.linkScanPath,'r');let read=0;
try{while(read<bytes.length){const n=readSync(fd,bytes,read,bytes.length-read,null);if(!n)break;read+=n;}}finally{closeSync(fd);}
if(read!==bytes.length||hash(bytes)!==source.observedFileSha256)throw Error('Pinned lead prefix unavailable');
let offset=0;const records=[];
for(const line of bytes.toString('utf8').split('\n')){
 if(performance.now()-started>5000)throw Error('Audit exceeded 5 seconds');
 const size=Buffer.byteLength(line)+1;
 if(line.trim()){
  const r=JSON.parse(line);
  if(r.type==='cost-state'){
   if(r.sessionId!==prior.sessionId)throw Error('Cost state belongs to another session');
   const modelUsage={};
   for(const [model,usage] of Object.entries(r.modelUsage||{})){
    modelUsage[model]={};
    for(const field of ['inputTokens','outputTokens','thinkingTokens','cacheReadInputTokens','cacheCreationInputTokens']){
     if(!Number.isSafeInteger(usage[field])||usage[field]<0)throw Error('Invalid session token field');
     modelUsage[model][field]=usage[field];
    }
   }
   records.push({offset,recordBytes:size,recordSha256:hash(bytes.subarray(offset,offset+size)),modelUsage,startTime:r.startTime,totalDuration:r.totalDuration});
  }
 }
 offset+=size;
}
if(records.length!==1)throw Error('Expected exactly one identified cost-state record');
const record=records[0],totals={};
for(const field of ['inputTokens','outputTokens','thinkingTokens','cacheReadInputTokens','cacheCreationInputTokens'])totals[field]=Object.values(record.modelUsage).reduce((s,r)=>s+r[field],0);
const transcriptOutputs=prior.sources.reduce((s,r)=>s+r.sums.max.output_tokens,0);
const report={schema:'lane-watch-session-counter-binding/v1',observedAt:new Date().toISOString(),jobId:prior.jobId,sessionId:prior.sessionId,cliVersion:prior.cliVersion,stateSha256:prior.stateSha256,source:{sha256:source.observedFileSha256,bytes:source.observedFileBytes,originalAuditPrefixBytes:source.bytes,originalAuditPrefixSha256:source.sha256},record,totals,daemonReportedTokens:state.tokens,exactOutputMatch:totals.outputTokens===state.tokens,transcriptUniqueOutputTokens:transcriptOutputs,unreconciledOutputDifference:totals.outputTokens-transcriptOutputs,timeScope:{jobCreatedAt:state.createdAt,jobFirstTerminalAt:state.firstTerminalAt,sessionStartTime:new Date(record.startTime).toISOString(),sessionStartMinusJobMilliseconds:record.startTime-Date.parse(state.createdAt),sessionReportedDurationMilliseconds:record.totalDuration},elapsedSeconds:(performance.now()-started)/1000,supersedes:{artifact:'2026-09-05-bs21-session-counter-binding.json',correction:'The initial prose incorrectly said the session start predates the daemon job. The recorded timestamps show it is 1.165 seconds later; the numeric reconstruction was unchanged.'},limitations:['An exact numerical identity for this terminal job does not establish the adapter implementation or a supported metric across jobs.','The cost-state record was appended after the original four-transcript audit; its exact bytes and offset are bound separately.','The session summary contains more output units than deduplicated assistant messages in the four transcripts. No unobserved request, child, compaction or billing explanation is asserted.','No launch-time usage baseline was established. Session timestamps and persisted duration do not establish zero initial usage or active worker time.','Thinking fields are reported separately; their inclusion or overlap with output fields is not assumed.','No historical receipt/ledger, cap, epoch, runtime admission or mathematical authority changed.']};
const target=new URL('../runtime-audits/2026-09-05-bs21-session-counter-binding-v2.json',import.meta.url);
if(existsSync(target))throw Error('Refusing to overwrite recorded binding');
writeFileSync(target,JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({exactOutputMatch:report.exactOutputMatch,totals,transcriptUniqueOutputTokens:transcriptOutputs,unreconciledOutputDifference:report.unreconciledOutputDifference,timeScope:report.timeScope,elapsedSeconds:report.elapsedSeconds}));
