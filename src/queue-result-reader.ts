import { execFile } from 'node:child_process';
import { createHash } from 'node:crypto';
import { promisify } from 'node:util';
import { isQueueResultPath, type CampaignQueueResult, type CampaignWorkQueue } from './campaign-work-queue';

const exec = promisify(execFile);
export const MAX_QUEUE_RESULT_BYTES = 256 * 1024;
export interface QueueResultDocument extends CampaignQueueResult { content: string; bytes: number; verified: true; }

/** Only a queue-declared, immutable Git blob may be read. Nothing is hydrated or executed. */
export async function readQueueResult(root: string, queue: CampaignWorkQueue | null, itemId: string, resultId: string): Promise<QueueResultDocument | null> {
 const result=queue?.items.find(item=>item.id===itemId)?.results?.find(result=>result.id===resultId);
 if(!result)return null;
 if(!isQueueResultPath(result.path)||!/^[a-f0-9]{40}$/.test(result.revision)||!/^[a-f0-9]{64}$/.test(result.sha256))throw Error('Invalid result reference');
 const prefix=['-c',`safe.directory=${root}`,'-C',root,'cat-file'];
 const ref=`${result.revision}:${result.path}`;
 try {
  const size=await exec('git',[...prefix,'-s',ref],{timeout:5000,maxBuffer:1024,windowsHide:true});
  const bytes=Number(size.stdout.trim());
  if(!Number.isSafeInteger(bytes)||bytes<0||bytes>MAX_QUEUE_RESULT_BYTES)throw Error('Result exceeds the 256 KiB reading limit');
  const blob=await exec('git',[...prefix,'blob',ref],{timeout:5000,maxBuffer:MAX_QUEUE_RESULT_BYTES,encoding:'buffer',windowsHide:true});
  if(blob.stdout.length!==bytes||createHash('sha256').update(blob.stdout).digest('hex')!==result.sha256)throw Error('Result hash does not match its queue reference');
  const content=new TextDecoder('utf-8',{fatal:true}).decode(blob.stdout);
  if(content.includes('\0'))throw Error('Result is not a text document');
  return {...result,content,bytes,verified:true};
 } catch(error) {
  const message=error instanceof Error?error.message:'';
  if(message.startsWith('Result '))throw error;
  // Do not expose Git stderr, absolute paths or process details through the reader.
  throw Error('The recorded result could not be read. Its commit or text blob may be unavailable.');
 }
}
