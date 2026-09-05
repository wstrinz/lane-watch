# Custody runtime admission audit

Date: 2026-09-05T08:05:37.336Z. App implementation 0808117. This is a containment correction, not completed runtime enforcement. No model worker was launched for this audit.

## Actual launch-route finding

At preceding app 474f274, native research dispatch was already held by assertLocalResearchRuntime. The independent CustodyCommandService.dispatchLease route started a Terra App Server turn directly after Git/input/lease checks. It had no deadline timer or deadline stop; maxMinutes entered its prompt and the final receipt check. Token notifications triggered one interrupt request at custodyInterruptThreshold(maxTokens), currently 70%. That fraction does not bound telemetry latency, in-flight usage or interruption latency. Missing token observations did not establish an enforced zero-use bound. Startup recovery reconciled recorded running/finalizing turns; the turn started before the lease acquired its running thread/turn binding. These source facts do not prove the native Claude adapter and App Server have the same usage metric or process topology.

Source locations: src/custody-command-service.ts dispatchLease, custodyTokenTotal, handleExecutionNotification and recoverExecutions; src/custody-executor.ts custodyInterruptThreshold, custodyExecutorPrompt and verifyCustodyExecutionReceipt. No historical receipt or measured counter was rewritten.

## Deployed correction

The default custody admission check refuses an exact confirmed lease before source verification, worktree creation, model calls or lease mutation. This check is not an HTTP/configuration bypass. The dependency injection used by the existing isolated-execution integration fixture is explicitly model-free; production construction retains the default hold. Receipt simulation, reconciliation, verification and landing remain available under their existing checks.

Read projections expose runtimeAdmission.ready=false, distinguish contractEligible from executorEligible, advertise no runnable custody candidates, and label the adapter launch-held. Autopilot returns attention before automatic preparation/retry/dispatch while held, and retains running-turn reconciliation and landable-receipt paths. The main guide and custody drawer show the same reason; the dispatch control is disabled. The old 70% comment and prompt now describe a heuristic rather than a guaranteed ceiling.

Twenty focused admission/protocol/autopilot tests pass with 50 assertions. The changed autopilot/admission subset passes again (12 tests / 30 assertions). The DOC-A1, explicit operator repair, isolated fake-executor/receipt and independent strategy integration tests pass; Svelte and TypeScript report no errors or warnings. The first test attempt ran before the multi-file patch had finished and caught the still-old autopilot selector; the completed patch passes. No native research or custody model fixture was needed.

After verifying all three project coordinators, pending actions, research and custody runs idle and binding the exact loopback server process/listener/parent, the existing watchdog restarted PID 41640. New PID 42692 started 2026-09-05T08:02:23.246Z with 0808117. Its live CFG23 projection is BLOCKED with runtime admission held and zero eligible custody executors. Desktop 1280x950 and mobile 390x844 navigation have no overflow, page errors or mutating requests. Browser report: tmp/custody-runtime-hold-browser-check.json; screenshots: tmp/custody-runtime-hold-{desktop,mobile}.png.

## Remaining obligations

Both launch routes need an actual launch-to-monitor handshake, supervision/recovery, exact ownership, measured usage semantics and a supported stop/overshoot policy. Custody additionally needs a real deadline stop; a warning fraction and after-the-fact receipt rejection cannot supply it. The existing epoch is exhausted. Neither a controller component nor a changed status creates a new resource envelope. The held adapters must not be enabled on the strength of the prior finite native bound-job probes alone.
