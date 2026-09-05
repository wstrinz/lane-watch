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
