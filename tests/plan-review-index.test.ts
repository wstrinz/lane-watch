import {test,expect} from 'bun:test';
import {inlinePlanReviewIndex} from '../src/plan-review-index';

test('review index preserves complete requests and custody policy while omitting heavy histories',()=>{
  const b={projectId:'p',waveId:'w',proposedRequests:[{id:'r1',question:'First question'},{id:'r2',question:'Second question'}],revision:{operatorDirection:'Keep the resource hold'},strategy:{custody:{policy:{gate:'REQUIRED'},items:['large history'],protocol:{history:'large protocol'}}},priorRuns:[{taskId:'done',evidenceSha256:'abc',receipt:{private:'receipt body'}}]};
  const original=JSON.stringify(b),out=inlinePlanReviewIndex(b,'full.json','sha256:full');const index=JSON.parse(out.text);
  expect(index.proposedRequests).toEqual(b.proposedRequests);expect(index.revision).toEqual(b.revision);
  expect(index.strategy.custody.policy.gate).toBe('REQUIRED');expect(out.text).not.toContain('large history');expect(out.text).not.toContain('large protocol');expect(out.text).not.toContain('receipt body');
  expect(index.priorRuns[0].evidenceSha256).toBe('abc');expect(index.source.digest).toBe('sha256:full');expect(out.completeRequestScope).toBe(true);expect(JSON.stringify(b)).toBe(original);
});

test('oversized supplementary context falls back to all requests without truncating questions',()=>{
  const b={proposedRequests:[{id:'r',question:'Exact question'}],strategy:{charter:'x'.repeat(5000)}};
  const out=inlinePlanReviewIndex(b,'full.json','sha256:full',1000);
  expect(out.text.length).toBeLessThanOrEqual(1000);expect(JSON.parse(out.text).proposedRequests).toEqual(b.proposedRequests);expect(out.completeRequestScope).toBe(true);
});

test('oversized request scope is explicitly unavailable instead of silently supplying a subset',()=>{
  const out=inlinePlanReviewIndex({proposedRequests:[{id:'r',question:'x'.repeat(3000)}]},'full.json','sha256:full',1000);
  const index=JSON.parse(out.text);expect(out.completeRequestScope).toBe(false);expect(index.proposedRequests).toBeUndefined();expect(index.proposedRequestCount).toBe(1);expect(index.reason).toContain('no subset');
});
