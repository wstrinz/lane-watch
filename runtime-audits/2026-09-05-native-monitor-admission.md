# Durable native gate and monitor readiness

5 September 2026. Candidate runtime engineering after the completed morning
handoff. Production research and custody launch holds remain unchanged.

## Implemented boundary

A native output allowance and its closed request gate are created atomically.
The immutable preparation binds worktree/time to the original launch digest,
output cap and deadline. The daemon's exact returned job/session can be attached
once without changing that allowance. Binding alone grants no request admission.

The dedicated output monitor verifies the exact working job before issuing its
readiness receipt. The host checks that receipt against the job digest, supplied
nonce, original deadline and owned child-process handle. Admission then requires
that same live owned handle. A saved released record, PID alone or reopened
store cannot restore authority. Reopened bound preparations also cannot invent
a new release window. A process-local monotonic cutoff prevents clock rollback
from extending native request admission.

The monitor's output value is settled request-ledger output, not the daemon's
counter. Unfinished requests remain separately charged at their full maxima;
a settled count of zero is not proof of zero actual output. The raw native
watch port rejects relabeling daemon tokens as output tokens. Native stop now
uses the same explicit config directory as observation.

Interrupted streaming now sends a fixed SSE error and closes without a terminal
message marker, while retaining an uncertain accounting outcome. This avoids
an unhandled stream rejection in the serving process and never refunds an
unfinished request. A client retry is a separate admission attempt.

## Verification

Sixty tests pass with 2,009 assertions in 6.05 seconds; TypeScript is clean.
Coverage includes atomic closed preparation, immutable returned identity,
monitor-handle loss, reopened-store refusal, monotonic expiry, exact readiness,
separate settled-output sourcing, stream interruption and the existing launch
recovery/production-preflight holds.

The installed background fixture at 13:36:09.199 UTC used the durable gate and
an actual dedicated output monitor. It bound job 771b0dfd to prepared lease
237ce1bb-9e14-403c-af10-c60e031def19 before release. The main stream and two JSON
requests settled 21 fake output units under the unchanged allowance. The fixture
was stopped by the driver; the monitor observed terminal state and exited zero.
This verifies the candidate handshake in an isolated --bare/tool-free client,
not its wiring into production research dispatch or full profile coverage.

## Deadline finding: physical lifetime is still unresolved

The first stalled-stream probe's monitor reported a deadline stop, but a default
server idle timeout and an unhandled stream rejection confound the whole-probe
result. It is not a clean process-tree deadline demonstration.

After fixing those transport issues, the gateway expired the stream and refused
a retry at the deadline. The native job record became failed, so the monitor
returned already-terminal. The request retained its full 32,000-unit reservation.
However, the native supervisor, PTY host and actual client still existed. The
job record had not established physical execution exit. A later exact native
stop command also timed out after five seconds.

The isolated tree was cleaned up manually at 14:04:34.320 UTC after fresh CIM
verification of each PID, exact birth time, parent and fixture directory. The
supervisor/client/PTY host were stopped, and the console host exited during that
cleanup. No remaining descendants were found and no unrelated process was
stopped. A first cleanup guard refused before acting because PowerShell parsed
the JSON time into DateTime; the corrected guard compared exact UTC milliseconds.
This was a script guard, not an approval-review rejection.

The later process checks confirm all three isolated supervisors absent. The
last roster retains stale worker data, whose referenced process is now absent;
no vendor state was edited to manufacture an empty roster. Raw probe outcomes,
process checks and the manual cleanup receipt are retained in
2026-09-05-monitored-admission-probes.json and
2026-09-05-failed-native-fixture-cleanup.json.

## Next required work

First establish exact physical ownership and exit checks independently of native
job status, and an automatic bounded stop when the native stop path hangs.
Exercise that with an owned finite local task so HTTP cutoff cannot stand in for
process cancellation. Then supervise monitor crash/hang and verify all child
routing. Integrate the candidate preparation/binding/release into the production
launch journal before considering admission, preserve the native subscription
and research profile, and complete custody App Server separately.

The current gate checks monitor process liveness, not monitor responsiveness.
The candidate protocol must not be presented as complete runtime enforcement.
No real model, fresh research budget, resource-epoch change or launch enablement
occurred in this work.
