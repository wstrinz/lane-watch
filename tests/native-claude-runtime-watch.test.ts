import {expect,test} from 'bun:test';
import {mkdtemp,mkdir,writeFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {nativeClaudeWatchPort} from '../src/native-claude-runtime-watch';
import type {ResearchWatchLease} from '../src/research-runtime-watch';

test('native adapter treats malformed state as unavailable and refuses a mismatched stop before spawn',async()=>{
  const root=await mkdtemp(join(tmpdir(),'lane-watch-native-'));
  const lease:ResearchWatchLease={jobId:'abc12345',sessionId:'abc12345-0000-4000-8000-000000000000',worktree:'C:/campaign/work',startedAt:'2026-09-05T00:00:00Z',deadlineAt:'2026-09-05T00:01:00Z',tokenCap:100,tokenMetric:'daemon-reported',pollMs:100,telemetryGraceMs:300};
  try {
    const dir=join(root,'jobs',lease.jobId);await mkdir(dir,{recursive:true});
    const state=join(dir,'state.json');
    const port=nativeClaudeWatchPort(lease,{claudeHome:root,executable:'must-not-spawn',eventPath:join(root,'events.jsonl')});
    for(const value of ['null','{}','{"sessionId":123}','partial JSON']){await writeFile(state,value);expect(await port.observe(lease.jobId)).toBeNull();}
    await writeFile(state,JSON.stringify({sessionId:lease.sessionId,cwd:'C:/unrelated',createdAt:lease.startedAt,state:'working',tokens:12}));
    expect(await port.observe(lease.jobId)).toMatchObject({observedTokens:12});
    await expect(port.stop(lease.jobId)).rejects.toThrow('Exact identity could not be revalidated');
  } finally {await rm(root,{recursive:true,force:true});}
});
