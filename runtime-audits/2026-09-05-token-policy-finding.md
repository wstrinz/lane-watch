# BS21 token accounting: exact match and remaining contract

This audit concerns terminal native job 81657050 / session
81657050-7da7-458d-b858-128b99f9c79b, CLI 2.1.258. It changes no historical
receipt, resource ledger, epoch, cap or launch authority.

The daemon's 776,641 reported tokens equal the sum of the outputTokens fields
in the session's persisted cost-state modelUsage: 168,498 plus 608,143.
This is an exact numerical reconstruction for one terminal job, not a verified
implementation-level definition for every native job. The session summary also
contains 224,797 inputTokens, 198,604,656 cacheReadInputTokens and 2,436,025
cacheCreationInputTokens. Its separate 363,028 thinkingTokens are not added
again: their overlap with output fields is unverified here. No billing claim is
made from this local bookkeeping.

The original four transcript hashes remain bound. Three child files are
unchanged. The original lead hash is recovered as an exact 1,916,864-byte prefix;
1,083 later bytes contain one last-prompt and one cost-state record. The latter
is separately bound by full prefix SHA-256, byte offset and record hash. No
message or prompt text is exported. The original audit is not replaced by a
different live file.

Deduplicating assistant usage by message ID and taking each field's maximum
reproduces all four earlier field sums, including 386,762 output tokens across
the lead and three children. None of 48 predeclared combinations of scope,
deduplication and token categories matches the daemon counter. The new session
summary match leaves 389,879 output units unreconciled with those assistant
records. This audit does not assign that gap to hidden requests, compaction,
thinking, retries or a particular child without evidence.

The persisted session starts at 21:58:00.367 UTC, 1.165 seconds after the daemon
job's 21:57:59.202 creation. Its recorded duration is a session-duration field,
not independently measured active worker time. The initial follow-up report
mistakenly described the session as starting earlier; corrected binding-v2
preserves the original numeric data, records the correction and supersedes that
prose. The initial artifact and execution record remain available.

## Reproduction and scope

- scripts/audit-bs21-token-counter.mjs was frozen at 795876f before execution.
  Four named sources, 4 MiB/file and 16 MiB total, 10-second internal and
  20-second outer bounds; observed 0.127 seconds. Its immutable output and
  execution record are 2026-09-05-bs21-token-counter-{reconstruction,execution}.json.
- scripts/audit-bs21-session-counter.mjs reads one exact previously bound prefix,
  five-second internal and ten-second outer limits. The corrected pass took
  0.022 seconds; use 2026-09-05-bs21-session-counter-binding-v2.json and
  2026-09-05-bs21-session-counter-execution-v2.json. Both scripts refuse to
  overwrite existing reports. Existing reports are reviewed without rerunning
  these one-shot collectors.
- No model worker, provider call, network access, solver or new research ran.
  These counters are infrastructure observations with no mathematical authority.

## Required next contract

Before enabling either native research or App Server custody, freeze a named
unit and its scope: output only, input plus output with explicit cache treatment,
or another explicitly approved resource metric. These choices are not silently
interchangeable. Preserve the existing ledger's native-reported units. Capture
a launch-time baseline and bind every owned child/request so replay and resumed
sessions cannot be charged ambiguously. The native and App Server counters need
separate source evidence; this native finding does not define Terra usage.

A polling warning and interrupt request cannot establish a hard token ceiling.
The actual adapter must either refuse each request before its worst-case usage
can exceed the remaining allowance, or supply a supported, verified bound with
explicit stop latency and overshoot semantics. Changing a hard ceiling to an
approximate stop threshold requires a deliberate policy decision. The deadline,
launch-to-monitor handshake, crash/hang supervision and real process ownership
remain separate engineering obligations. The exhausted epoch also requires its
own reviewed resource decision; none of these findings opens it.

The default holds stay in place. A custody receipt generated after a threshold
interruption now reports the interruption and last observed counter, without
claiming it stopped before an overrun or reserved proven cancellation headroom.
Previously stored receipts retain their original bytes and status.
