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
