# Native research watchdog: verified component, production hold retained

2026-09-05. This is a bound-job monitor, not a production launch controller. `assertLocalResearchRuntime` still refuses research dispatch before schedule/run mutation.

The kernel binds the exact native job ID, full session ID, absolute worktree and creation timestamp. It monitors a finite deadline and the separately named daemon-reported token counter, revalidates ownership immediately before `claude stop ID`, and confirms native terminal state. Missing ownership never authorizes stopping a guessed job. Missing usage with confirmed ownership, counter regression and exceeded thresholds request a stop. Two unsuccessful stop attempts return attention. A backwards wall-clock correction cannot extend the remaining duration. Malformed telemetry is unavailable, not zero usage.

Validation: 11 unit tests / 33 assertions pass, and TypeScript is clean. Tests cover token/deadline stops, transient and sustained missing telemetry, wrong identity, rollback, missing/regressed usage, malformed native JSON, and bounded unconfirmed stops. Native Claude 2.1.258 model-free probes used a finite 15-second Node parent/child fixture. Job 2dc68d09 was working before native stop and stopped afterwards; both process IDs were absent. Job 62d41fbd ran the actual kernel and native adapter with a two-second deadline: one stop request, native state stopped, both processes absent, zero models invoked. Reports are the adjacent native-stop-probe and native-watch-integration JSON files. The earlier dde15903 probe had already completed before observation and is not stop evidence.

The repeatable fixture is `tests/fixtures/runtime-stop-probe.cjs`. In an owned temporary output directory, launch it through `claude --bg --exec 'node <fixture> <output-prefix>'`; immediately read that returned job's state.json, require working and the intended cwd, and create the exact ResearchWatchLease from its sessionId/createdAt. Run `bun src/native-claude-runtime-watch.ts LEASE_JSON CLAUDE_HOME CLAUDE_EXE EVENT_JSONL`, then independently check terminal state and the fixture's parent/child PIDs. Keep launch, watch and verification within one invocation because the fixture self-exits after 15 seconds. These jobs are test fixtures, never CFG23 evidence or research leases.

Production obligations remain:

- Forward the frozen bounds from schedule through launcher into a durable immutable lease, with an atomic launch/bind/monitor handshake. No unmonitored dispatch gap.
- Supervise the supervisor, recover leases after restart, retain stop events even if the event sink fails, and prove safe behavior for missing job state and stale counters. This standalone process can still die or lose ownership telemetry.
- Specify the promised token units and reconcile lead/child usage. The daemon counter is neither billing nor a verified aggregate API counter. The old 776,641 measurement remains untouched.
- Polling is a stop threshold, not a strict ceiling: in-flight generation, telemetry latency and stop latency can overshoot. Prove and disclose the supported bound; do not replace a hard approved cap with a softer policy silently.
- Verify real worker/child and WSL ownership without touching unrelated processes, plus CPU/RSS behavior if those bounds are promised. The native Node fixture proves only the tested process topology.
- Retain the existing exhausted-epoch resource gate. Repairing software does not create a new resource envelope.

Native documentation supports model-free background shell jobs and targeted stop ([agent view](https://code.claude.com/docs/en/agent-view)). Hooks can stop an agent with continue:false, but PreToolUse timeout can allow the action to continue, so hooks alone are not a fail-closed external controller ([hooks reference](https://code.claude.com/docs/en/hooks)). The tests above, rather than documentation alone, establish the observed local stop behavior.

## Audit-write failure follow-up

A rejected audit write previously threw before the stop request, allowing a
known owned job to continue. The kernel now records unconfirmed audit events
in the returned result and requests a bounded stop when the sink fails. An
identity mismatch or missing ownership still forbids a guessed stop. Native
CLI exit status is nonzero when audit writes failed, even after a confirmed
stop. Fourteen watcher/adapter tests now pass (46 assertions), including startup
sink failure, failure at the stop event, and unavailable/mismatched ownership.

These returned events are an in-memory recovery record, not a durable journal;
a rejected append can also have partially persisted. A hung I/O operation,
process crash or supervisor crash is not solved by this patch. Durable
supervision, recovery, launch binding and aggregate/hard-token policy remain
unverified, and production dispatch stays held.

## Durable monitor recovery follow-up

Q2 now has a separate SQLite bound-job registry and dedicated monitor runner. Frozen identity/deadline/token fields cannot be rebound; concurrent claims conservatively refuse a potentially live owner; recovery preserves the observed token high-water mark and stops an exactly revalidated job instead of granting more runtime. Attention/terminal records do not automatically retry. This is a component of enforcement, not a launch controller.

Twenty-one focused watcher/store/adapter tests pass (70 assertions), and TypeScript is clean. A finite native model-free crash probe killed only its own first monitor (PID 12224), confirmed it absent, then recovered job ceca4df5 / session ceca4df5-fc0d-43a8-8855-80a1a17d182d. Generation advanced 1 to 2 with unchanged bounds; the job changed working to stopped and fixture parent 50224 / child 39680 were absent. Total 4,551 ms from job creation, before its 15-second self-exit. No model was invoked. The report and exact raw/Git-normalized source hashes are in runtime-audits/2026-09-05-durable-watch-{crash-probe,source-manifest}.json in the app repo. An earlier helper parser failure created a finite fixture (2f4b3dac) that self-exited and was confirmed done; it is not runtime-enforcement evidence.

Next: bound hanging asynchronous I/O and develop actual launch/monitor supervision. Synchronous process hangs, automatic recovery supervision, an atomic schedule-to-launch handshake, aggregate token semantics/hard overshoot bounds and WSL ownership remain unverified. The production launch hold and exhausted epoch remain unchanged. Lane Watch continues to show Q2 active and the reviewed research portfolio blocked; no new research worker or claim promotion.


The registry uses WAL/FULL synchronization and immutable lease fields in a separate database. An owner nonce and generation reject stale writers. An uncertain or reused owner PID conservatively blocks recovery; no monitor is killed by a guessed PID. This is neither a tamper-proof security boundary nor supervision of a live-but-hung owner. Replay the finite probe with bun scripts/probe-durable-research-watch.ts in the normal native runtime context. Preserve the original report before any changed-source replay.


## 2026-09-05T06:33:34.891Z bounded asynchronous I/O checkpoint

Q2's durable runner now bounds unresolved observation, audit, checkpoint, stop and polling calls while its event loop remains responsive. A timed-out operation is held closed: late results are discarded and no parallel retries accumulate. Durable stop/terminal events are still journaled when the external sink hangs. POSIX/WSL path comparisons preserve case; Windows drive paths retain their case-insensitive comparison. The runtime deadline is checked again after observation/checkpoint latency.

Thirty-one focused tests pass (102 assertions across four files, with the new durable sink test rerun in its eight-test file), and TypeScript is clean. The changed sources passed a second finite native crash-recovery probe: exact job 33e22be9 / session 33e22be9-5479-4e6c-9b87-48732bfb1149, owned monitor 6256 deliberately exited, generation 1 to 2, unchanged lease, one stop, terminal native state and absent parent 38624 / child 38456 in 3,244 ms from creation. No model was invoked. The new report runtime-audits/2026-09-05-durable-watch-bounded-io-probe.json embeds exact raw and Git-normalized source hashes; the earlier crash report remains unchanged. The probe now refuses to overwrite evidence.

Limit: a timeout does not cancel the underlying I/O. Synchronous/event-loop hangs, automatic monitor supervision and an atomic launch handshake remain unverified. A hung poll exits for external recovery, which is still manual in this component. The native CLI's current help advertises a print-mode dollar cap; that does not establish an enforceable aggregate token ceiling for the existing background lead/child topology. No resource cap or units have been changed. Live Lane Watch remains BLOCKED with idle coordinator, blocked plan, no pending actions and every research run returned_to_sol. The 50-minute heartbeat remains active.

Default responsive-event-loop limits are 2 seconds for observation/audit/checkpoint/polling calls and 12 seconds for the stop call. These add latency and are not a hard research token cap. stopAttempts counts kernel attempts; a timed-out native stop is not submitted twice. Missing exact ownership still returns attention without a guessed stop.
