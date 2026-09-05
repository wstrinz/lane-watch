# Durable launch intent and restart recovery

Recorded 5 September 2026. This change integrates a durable invocation journal
into ResearchExecutionService and CampaignStartupService. It is containment and
recovery infrastructure, not completed token or deadline enforcement. Both
production launch holds and the exhausted campaign epoch remain in force.

## Actual execution path

Migration 6 adds immutable launch identity, serialized checked specification,
SHA-256, original reservation and absolute deadline. SQLite uses WAL and FULL
synchronous writes. The attempt, staged run, request, schedule members and
dispatch-start events commit together before entering any adapter. The adapter
receives that same frozen context. Default production admission still refuses
before these writes or any worker invocation.

The journal records adapter entry before invocation. A returned transport
receipt and the running run/request/member state commit together. Losing the
reply after entry, including a publication failure after receiving it, retains
an uncertain attempt. The run remains launching, its request dispatching and
its schedule attention; the project is BLOCKED. There is no inferred worker
termination or new retry allowance. A late receipt is retained as unverified
context without reopening the attempt. An attempt that never entered the
adapter can close as aborted and requires a fresh checked schedule.

Startup processes interrupted launch attempts before custody recovery and
before the first-observation action barrier opens. It preserves the original
specification, identity and deadline and never invokes or signals a worker.
Recovery is idempotent. Observations of another job cannot clear an uncertain
launch's BLOCKED phase. The project reader and observation service now share
exact job matching; an unbound launching run cannot borrow an old task's job.

The main campaign guide directs an uncertain launch to its recorded attempt in
the existing evidence workspace. The details distinguish a reserved deadline
from verified runtime enforcement and identify late transport receipts as
awaiting reconciliation. No additional mutation control is introduced.

## Validation and limits of the fixtures

37 campaign integration, launch recovery, startup and migration tests passed
with 450 assertions. This includes all 23 existing campaign integration tests.
12 observation, projection and workflow-provenance tests passed with 37
assertions. TypeScript and Svelte checks report zero errors or warnings; the UI
build passed. Local logs are in tmp/launch-recovery-tests.log.

The recovery tests exercise the actual ResearchExecutionService with isolated
SQLite databases. They check atomic intent/event rollback, unchanged production
preflight, frozen reservation agreement, expired pre-entry deadline, immutable
identity, reply loss, late receipts, failed running-state publication and
startup recovery. One test starts an owned finite Node process and verifies it
is alive while its lost reply holds the attempt, then cleans up through the
owned process handle. A separate test starts a real Bun controller and finite
Node child, kills the controller after observing the child's creation, reopens
SQLite and uses the actual startup barrier to recover the same attempt. That
test does not establish whether the child survives the controller kill; it
establishes that recovery does not infer its termination or start a duplicate.
All fixtures are model-free and have finite self-exit timers.

The browser check at 2026-09-05T10:25:28.448Z uses a synthetic response only in
the test browser. It inserted no production attempt. Desktop and mobile have
no overflow or page errors; opening the attempt sent no mutation request, and
live campaign state remained unchanged. Report and screenshots are in
tmp/launch-uncertainty-browser-check.json and
tmp/launch-uncertainty-fixture-{desktop,mobile}.png. The mobile detail view was
also visually inspected.

## Still required before admission

The invocation journal is not the existing ResearchWatchStore lease and does
not establish monitor readiness, own the full native child/WSL tree, stop at a
deadline, supervise a hung monitor or provide a hard provider-request budget.
The current native --bg route starts work before returning a job identity and
does not forward the checked timeout/token fields into an enforcing runtime.
A receipt with job/lane/worktree is transport evidence, not a verified full
session/process/request binding. Exact reconciliation of an uncertain attempt
remains a separate obligation; no automatic retry or manual status override
was added. The App Server custody adapter remains separately held.

These gaps must be addressed on the adapter actually used. The historical
776,641 counter's one-job numerical match does not define a general token unit
or a supported maximum in-flight allowance. No policy, cap, epoch, receipt or
mathematical claim changes with this engineering slice.

## Deployment checkpoint

Implementation 18e2b83 is deployed as PID 40284, started
2026-09-05T10:46:49.122Z under retained watchdog 29924. All three projects were
checked idle before stopping only the previous server, PID 27216. One first
replacement exited with code 1; its cause is absent from the watchdog
transcript. The following start is healthy. Read-only inspection confirms
migration 6 and zero attempt rows; no legacy attempt was fabricated.

The live browser check at 10:52:10.622 UTC shows all 19 CFG23 runs returned to
Sol, unchanged phase/plan/schedule/resource policy/ledger, both launch holds,
and no fixture row, overflow, page error or mutation. The normal desktop guide
was visually inspected. Report: tmp/launch-recovery-deployment-check.json.
An additional 25 redirect/architecture checks pass with 179 assertions. The
redirect upgrade fixture now reconstructs version 4 before applying 5 and 6,
preserving its historical response/status assertions.
