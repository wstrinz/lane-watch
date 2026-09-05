/** The background adapter currently has no verified token or deadline enforcement.
 * This is an explicit dispatch hold, not a configurable bypass or claimed enforcer.
 * Replace only alongside an end-to-end verified runtime controller.
 */
export const LOCAL_RESEARCH_RUNTIME_HOLD = 'Local research launch is held: this adapter does not yet enforce the frozen token and time limits. Existing results can still be reviewed. Repair and verify the runtime controller before launching.';
export function assertLocalResearchRuntime(): never { throw new Error(LOCAL_RESEARCH_RUNTIME_HOLD); }

export const CUSTODY_RUNTIME_HOLD = 'Custody launch is held: the steward adapter has no verified deadline stop or hard token ceiling. Existing receipts can still be reviewed. Repair and verify runtime enforcement before starting another steward.';
export const CUSTODY_RUNTIME_ADMISSION = Object.freeze({ ready: false, code: 'RUNTIME_UNVERIFIED', reason: CUSTODY_RUNTIME_HOLD });
export function assertCustodyRuntime(): never { throw new Error(CUSTODY_RUNTIME_HOLD); }
