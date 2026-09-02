import type { ActionQueueRow } from "./action-queue-service";

export const CAMPAIGN_ACTION_TYPES = [
  "coordinator.attach",
  "coordinator.interrupt",
  "coordinator.message.send",
  "lane.reconcile",
  "lane.disposition.set",
  "project.automation.set",
  "project.dispatch-profile.set",
  "wave.adopt",
  "wave.triage.request",
  "wave.triage.apply",
  "synthesis.prepare",
  "synthesis.request",
  "synthesis.review",
  "research.review.start",
  "research.review.resolve",
  "research.schedule.prepare",
  "research.schedule.confirm",
  "research.schedule.dispatch",
  "research.dispatch.start",
  "research.failure.requeue",
  "research.evidence.return",
  "loop.start",
  "loop.pause",
  "loop.resume",
  "loop.halt-after-step",
  "loop.stop",
  "campaign.redirect.submit",
  "campaign.redirect.apply",
  "campaign.recovery.prepare",
  "campaign.recovery.apply",
  "strategy.review.request",
  "strategy.proposal.activate",
  "strategy.proposal.dismiss",
  "custody.item.promote",
  "custody.item.park",
  "custody.item.restore",
  "custody.lease.prepare",
  "custody.lease.confirm",
  "custody.lease.dispatch",
  "custody.lease.simulate",
  "custody.lease.replay",
  "custody.receipt.land",
  "custody.receipt.reject",
  "resource.schedule.simulate",
  "campaign.operator-transition.prepare",
  "campaign.operator-transition.execute",
  "approval.respond",
] as const;

export type CampaignActionType = typeof CAMPAIGN_ACTION_TYPES[number];
export type CampaignActionResult = Record<string, unknown>;
export type CampaignActionHandler = (
  action: ActionQueueRow,
  args: Record<string, any>,
) => CampaignActionResult | Promise<CampaignActionResult>;
export type CampaignActionHandlerRegistry = {
  [Type in CampaignActionType]: CampaignActionHandler;
};

const ACTION_TYPE_SET = new Set<string>(CAMPAIGN_ACTION_TYPES);

/** Validates and routes the exact campaign command catalog; owns no domain authority. */
export class CampaignActionRouter {
  constructor(private readonly handlers: CampaignActionHandlerRegistry) {
    const registered = Object.keys(handlers);
    const missing = CAMPAIGN_ACTION_TYPES.filter((type) => typeof handlers[type] !== "function");
    const extra = registered.filter((type) => !ACTION_TYPE_SET.has(type));
    if (missing.length || extra.length) {
      throw new Error(`Campaign action registry mismatch; missing=[${missing.join(",")}], extra=[${extra.join(",")}]`);
    }
  }

  validate(type: string): asserts type is CampaignActionType {
    if (!ACTION_TYPE_SET.has(type)) throw new Error(`Unsupported campaign action: ${type}`);
  }

  execute(action: ActionQueueRow, args: Record<string, any>): Promise<CampaignActionResult> {
    this.validate(action.action_type);
    return Promise.resolve(this.handlers[action.action_type](action, args));
  }

  registeredTypes(): readonly CampaignActionType[] {
    return CAMPAIGN_ACTION_TYPES;
  }
}
