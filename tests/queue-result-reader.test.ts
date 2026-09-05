import {beforeAll,expect,test} from 'bun:test';
import {mkdtemp,writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {readQueueResult,MAX_QUEUE_RESULT_BYTES} from '../src/queue-result-reader';
import {parseCampaignWorkQueue} from '../src/campaign-work-queue';
import {documentBlocks,documentInline} from '../src/ui/document-blocks';

let root='',revision='';
const body='# Frozen result\n\n**Scope:** existing result only.\n';
const hash=(s:string)=>createHash('sha256').update(s).digest('hex');
const git=(...args:string[])=>execFileSync('git',['-c',`safe.directory=${root}`,'-C',root,...args],{encoding:'utf8',timeout:5000,windowsHide:true}).trim();
const queue=(overrides:Record<string,unknown>={})=>parseCampaignWorkQueue(JSON.stringify({schema:'lane-watch-work-queue/v1',title:'Queue',updatedAt:'2026-09-05T00:00:00Z',cutoffAt:'2026-09-05T13:00:00Z',cadenceMinutes:50,items:[{id:'Q5',title:'Read existing result',status:'done',kind:'campaign',detail:'No launch',dependsOn:[],results:[{id:'note',title:'family note',path:'NOTE.md',revision,sha256:hash(body),...overrides}]}]}))!;

beforeAll(async()=>{
 root=await mkdtemp(join(tmpdir(),'lane-watch-result-reader-'));
 git('init','-q');git('config','user.name','Queue Reader Fixture');git('config','user.email','fixture@example.invalid');git('config','core.autocrlf','false');
 await writeFile(join(root,'NOTE.md'),body);
 await writeFile(join(root,'LARGE.md'),'x'.repeat(MAX_QUEUE_RESULT_BYTES+1));
 await writeFile(join(root,'BINARY.txt'),'hidden\0payload');
 git('add','.');git('-c','commit.gpgsign=false','commit','-qm','Frozen result fixture');revision=git('rev-parse','HEAD');
 await writeFile(join(root,'NOTE.md'),'Later uncommitted change, not the reviewed result.');
});
// Small temporary fixtures are retained for inspection; no recursive cleanup across shells.
test('reads immutable bytes even after the working file changes; never grants authority',async()=>{
 const result=await readQueueResult(root,queue(),'Q5','note');
 expect(result).toMatchObject({content:body,sha256:hash(body),revision,verified:true,bytes:Buffer.byteLength(body)});
 expect(result).not.toHaveProperty('authority');
});
test('unknown item or result cannot become an arbitrary path request',async()=>{
 expect(await readQueueResult('not-a-repository',queue(),'missing','note')).toBeNull();
 expect(await readQueueResult('not-a-repository',queue(),'Q5','../../NOTE.md')).toBeNull();
});
test('rejects hash changes, oversized blobs, binary and unavailable frozen sources',async()=>{
 await expect(readQueueResult(root,queue({sha256:'0'.repeat(64)}),'Q5','note')).rejects.toThrow('hash does not match');
 await expect(readQueueResult(root,queue({path:'LARGE.md'}),'Q5','note')).rejects.toThrow('256 KiB');
 await expect(readQueueResult(root,queue({path:'BINARY.txt',sha256:hash('hidden\0payload')}),'Q5','note')).rejects.toThrow('not a text document');
 await expect(readQueueResult(root,queue({revision:'0'.repeat(40)}),'Q5','note')).rejects.toThrow('recorded result could not be read');
});
test('queue rejects traversal, external paths, revision expressions and unbounded references',()=>{
 for(const path of ['../NOTE.md','folder/../NOTE.md','/NOTE.md','C:/NOTE.md','\\\\server\\NOTE.md','a:NOTE.md','https://host/NOTE.md'])expect(queue({path}).error).toBeTruthy();
 expect(queue({revision:'HEAD'}).error).toBeTruthy();
 expect(queue({sha256:'wrong'}).error).toBeTruthy();
 const duplicate=queue();duplicate.items[0].results!.push(duplicate.items[0].results![0]);
 expect(parseCampaignWorkQueue(JSON.stringify({...duplicate,schema:'lane-watch-work-queue/v1'}))?.error).toBeTruthy();
});
test('reading view preserves formula blocks, table data and literal unsafe content',()=>{
 const blocks=documentBlocks('# Title\n\n    x = y\n    z = 2\n\n1. First\n   continued\n2. Second\n\n| A | B |\n| --- | --- |\n| 1 | 2 |\n\n<script>alert(1)</script>');
 expect(blocks).toEqual([{kind:'heading',level:1,text:'Title'},{kind:'code',text:'x = y\nz = 2'},{kind:'list',ordered:true,items:['First continued','Second']},{kind:'table',rows:[['A','B'],['1','2']]},{kind:'paragraph',text:'<script>alert(1)</script>'}]);
 expect(documentInline('[link](javascript:alert) **claim** `x<y`')).toEqual([{kind:'reference',text:'link',target:'javascript:alert'},{kind:'text',text:' '},{kind:'strong',text:'claim'},{kind:'text',text:' '},{kind:'code',text:'x<y'}]);
});
