# Physical exit is required before monitor completion

Daytime continuation, 5 September 2026. Candidate runtime repair; both production
research and custody holds remain. No model or production worker was launched.

## Repair and verification

The watcher no longer accepts a terminal native job record as sufficient evidence
of execution exit. Its port must independently verify the complete owned scope.
Missing, false, rejected or timed-out verification cannot produce a terminal
success. The watcher requests at most two exact-job stop attempts and retains
attention if completion remains unconfirmed. Exit-verification I/O is bounded
and latched closed after timeout, so late replies do not enable parallel retries.

A finite local Bun process with no children was given a simulated failed job
record. The watcher detected that its owned handle remained alive, stopped it,
and verified the actual exit notification. A second actual-process test shows
that killing an owned monitor closes request admission and retains the existing
80-unit request reservation. Missing/failed/hanging exit evidence is also tested.

The first real-process test failed: exitCode stayed null after signal termination,
so that field alone did not establish liveness or exit. The replacement helper
tracks the actual spawn handle's exit promise, plus exit/signal fields for admission.
A rejected exit observation closes admission without asserting physical exit.
The final focused suite passes 53 tests, 220 assertions, in 3.94 seconds;
TypeScript is clean. Bun 1.3.14, Windows. This is a different focused suite from
the previous 60-test accounting checkpoint, not a claim that tests were removed.

Replay from the app repository:

    bun test tests/research-runtime-watch.test.ts tests/bounded-research-watch-port.test.ts tests/research-watch-store.test.ts tests/research-watch-physical-exit.test.ts tests/native-output-watch.test.ts tests/native-output-admission.test.ts tests/research-launch-recovery.test.ts
    bun x tsc --noEmit

## Remaining boundary

The native adapter still lacks a verifier for its complete daemon/PTY/client tree.
It therefore cannot report verified terminal completion under the repaired kernel.
The finite fixture has no descendants and does not prove native tree containment,
monitor responsiveness, provider shutdown or production profile coverage.

Historical monitored/deadline native background probe scripts are now explicitly
held before any fixture creation or process launch: their cleanup depended on
terminal native job state, the exact assumption disproved overnight. Their raw
reports remain preserved. The monitor-handle callback in those scripts is updated
to the new exit witness for when verified tree cleanup makes them runnable again.

Next: bind exact native physical ownership before request release, cover all
descendants, and verify automatic bounded fallback stop when native stop hangs.
Then complete monitor crash/hang supervision and production journal/custody
integration. These candidate changes were not deployed by restarting the server.
