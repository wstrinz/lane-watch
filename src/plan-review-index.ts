import { createHash } from 'node:crypto';

/** A bounded navigation index. The immutable full bundle remains the evidence source. */
export function inlinePlanReviewIndex(bundle: Record<string, any>, sourcePath: string, sourceDigest: string, maxCharacters = 48_000): {text: string; digest: string; completeRequestScope: boolean} {
  if (!Array.isArray(bundle.proposedRequests)) throw new Error('Review index needs the complete proposed request list');
  if (!Number.isInteger(maxCharacters) || maxCharacters < 1000) throw new Error('Invalid review index bound');
  const custody = bundle.strategy?.custody;
  const compactCustody = custody ? Object.fromEntries(Object.entries(custody).filter(([key]) => !['items', 'protocol'].includes(key))) : undefined;
  const source = {path: sourcePath, digest: sourceDigest};
  const core = {
    schema: 'lane-watch-plan-review-index/v1',
    scope: 'Navigation and reported context only. Omitted proof evidence still requires source inspection; no claim or launch authority is created.',
    source,
    projectId: bundle.projectId,
    waveId: bundle.waveId,
    proposedRequestCount: bundle.proposedRequests.length,
    completeRequestScope: true,
    proposedRequests: bundle.proposedRequests,
    revision: bundle.revision,
    experimentValidityRequired: bundle.experimentValidityRequired,
    resourceContext: {epoch: bundle.strategy?.epoch, resources: bundle.strategy?.resources, custodyPolicy: custody?.policy, custodyCounts: custody?.counts},
  };
  const index = {
    ...core,
    synthesis: bundle.synthesis ? {summary: bundle.synthesis.summary, operatorBrief: bundle.synthesis.operatorBrief} : null,
    strategy: bundle.strategy ? {...bundle.strategy, custody: compactCustody} : null,
    priorRuns: (Array.isArray(bundle.priorRuns) ? bundle.priorRuns : []).map((run: any) => {
      const {receipt, ...metadata} = run;
      return {...metadata, receiptOmitted: Boolean(receipt)};
    }),
    externalRedirects: (Array.isArray(bundle.externalRedirects) ? bundle.externalRedirects : []).map((input: any) => ({
      id: input.id, title: input.title, status: input.status, sourceUrl: input.sourceUrl, inputDigest: input.inputDigest,
    })),
    staffingProfiles: bundle.staffingProfiles,
    campaignDefaultProfile: bundle.campaignDefaultProfile,
    omittedSections: ['strategy.custody.items', 'strategy.custody.protocol', 'synthesis detail', 'prior-run receipt bodies', 'external redirect bodies'],
  };
  let text = JSON.stringify(index);
  if (text.length > maxCharacters) text = JSON.stringify({...core, omittedSections: ['All supplementary context; inspect the full bundle by named fields.']});
  let completeRequestScope = true;
  if (text.length > maxCharacters) {
    completeRequestScope = false;
    text = JSON.stringify({schema: core.schema, scope: core.scope, source, projectId: bundle.projectId, waveId: bundle.waveId,
      proposedRequestCount: bundle.proposedRequests.length, completeRequestScope,
      reason: 'The complete request scope exceeds the inline limit. Read proposedRequests and revision from the full bundle before returning a plan; no subset is supplied.'});
  }
  if (text.length > maxCharacters) throw new Error('Review source metadata exceeds inline bound');
  return {text, digest: 'sha256:' + createHash('sha256').update(text).digest('hex'), completeRequestScope};
}
