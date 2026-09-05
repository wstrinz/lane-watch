/** The background adapter currently has no verified token or deadline enforcement.
 * This is an explicit dispatch hold, not a configurable bypass or claimed enforcer.
 * Replace only alongside an end-to-end verified runtime controller.
 */
export const LOCAL_RESEARCH_RUNTIME_HOLD = 'Local research launch is held: this adapter does not yet enforce the frozen token and time limits. Existing results can still be reviewed. Repair and verify the runtime controller before launching.';
export function assertLocalResearchRuntime(): never { throw new Error(LOCAL_RESEARCH_RUNTIME_HOLD); }
