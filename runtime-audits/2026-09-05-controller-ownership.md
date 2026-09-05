# Campaign controller ownership before recovery

5 September 2026. Scope: local Lane Watch campaign database ownership. This is
an actual startup correction, not worker supervision or budget enforcement.

## Source finding

Before this change, CampaignControl.create opened the campaign database,
applied migrations and ran startup recovery without claiming a controller
owner. server.ts called it before Bun.serve bound the listener. Therefore a
second process could reach campaign recovery even if it would later fail to
bind the occupied port. The new launch journal makes that distinction
especially important: a live controller's entered launch is not an
interrupted controller's launch. This source finding does not establish the
cause of the first replacement startup's unrecorded code-1 exit at 10:46 UTC.

## Correction

CampaignControl.create acquires a separate local controller-owner.sqlite claim
before constructing the controller or opening observer.sqlite. A SQLite
immediate transaction serializes claims. The record retains PID, instance
nonce, claim time and explicit release time with WAL/FULL durability and a
one-second database busy timeout. A possibly live PID, PID reuse, permission
uncertainty or invalid ownership record blocks takeover. There is no elapsed
lease expiry or force-recovery switch. A confirmed absent process allows a new
instance to claim ownership; its health identity records the prior PID.

CampaignControl.stop closes its campaign database before releasing the claim.
Repeated stop calls are harmless. A failed startup closes the controller and
releases its claim so a corrected manifest can be used. The health endpoint
adds the controller identity next to the current process identity. It grants
no mutation authority. Existing action/launch recovery still retains uncertain
external effects and does not replay an interrupted action or restart a worker.

This guard applies to updated CampaignControl instances sharing one local
data directory. The first deployment must stop the old controller through the
existing exact-process idle guard. It is not protection against an old binary
which does not participate, arbitrary direct database writes or multiple hosts
sharing an unsupported filesystem. A stale PID which may have been reused
requires inspection; it is never permission to kill that process.

## Validation

Five ownership regressions use the actual CampaignControl.create path with
model-free clients and temporary databases. A duplicate leaves a seeded live
action unchanged; a clean stop allows a new identity; independent directories
coexist; a malformed manifest releases its claim for corrected startup; an
invalid owner record blocks before observer.sqlite creation. The fifth test
starts a real finite Bun controller, confirms it is alive, rejects a second
controller without recovering its action, kills only the owned fixture handle,
and then verifies recovery from the exited PID without replay.

The ownership, startup and launch-recovery set passes 15 tests / 95 assertions.
All 23 existing campaign integration tests and all three runtime-health tests
pass. One architecture assertion initially expected the old literal health
object syntax; it was relaxed to retain its assertion that the health service
is used. The actual service boundary is unchanged. TypeScript passes.

Both research and custody admission holds remain. Single campaign writer
ownership does not bind a native research tree, cancel in-flight provider
requests, enforce a deadline or settle the token-unit policy.

## Live deployment and duplicate development controller

Implementation df16241 exposed a pre-existing Bun development watcher which had
claimed the same data directory. Read-only process inspection bound the exact
chain: `bun run dev` PID 39608, watch supervisor 40316 (both started September 4
at 16:09:44 UTC), and watch child 45188 (started September 5 at 11:06:31.305 UTC).
The child held instance 10960d28-97d1-4bb7-b5f0-59898c5aac69 from
11:06:32.492 UTC but had no network connections or listener. The normal
watchdog's replacement starts were refused while that process remained alive.
Thus source edits could previously enter campaign startup under the development
watcher before the controlled deployment. Earlier unexplained startup exits are
not retroactively assigned a cause by this observation.

The read-only stop preflight found zero queued/running actions, zero active
research or custody executions and no working coordinator. It bound every
process's executable, command, parent and birth time. The first guard refused
an extra child; inspection identified the exact console host 29236, which was
allowed but not targeted. Only the three verified Bun processes were stopped.
Watchdog 29924 was retained; no owner or campaign database row was edited.

At 11:22:58.152 UTC the restored server is PID 25336, started
11:22:14.276 UTC, controller instance a603004e-5eb2-49cb-a249-60ccf58b47e9.
Its durable claim and health identity agree and record recovery from the exited
PID 45188. All three indexed projects are idle. The read-only report is
tmp/controller-ownership-deployment-check.json. Both launch holds remain.

The development command now watches only the UI build, served by the existing
app. It no longer defaults to starting a second controller against live state.
Backend experiments are documented to use isolated data and a fixture manifest.

The live desktop/mobile check at 11:28:08.686 UTC passes with the parked plan,
all 19 CFG23 runs returned, unchanged policy/ledger/plan/schedule, and no page
error, overflow or mutation. The installed Vite CLI completed the new
development command's build/watch operation in 1,997 ms, writing only to the
temporary verification output directory. Its owned process exited after the
check; the live controller PID and nonce remained unchanged. Reports:
tmp/controller-ownership-browser-check.json and tmp/ui-dev-watch-check.json.
