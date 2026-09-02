# Lane Watch architecture and recovery handoff

Captured: 2026-09-01 21:16 CDT
Workspace: `C:\Users\wstri\dev\math-research`  
Application: `infrastructure\agent-observer`  
Live project: `cfg23`  
Live UI: <https://desktop-i0p7ic0.tail4f1d0a.ts.net:4317/projects/cfg23>

This is the current canonical handoff. The 2026-08-26 control-plane and
Computer Use handoffs are useful history, but they predate most of the current
architecture and should not be used as descriptions of present capability.

## Copy-ready resume prompt

> Continue the Lane Watch architecture work in
> `C:\Users\wstri\dev\math-research\infrastructure\agent-observer`. Read
> `CONTROL-PLANE-HANDOFF-2026-08-30.md` and `ARCHITECTURE.md` first. Inspect live
> health, current CFG23 control state, active controller actions/runs/custody,
> and observer lanes before changing anything. A separate regular coordinator
> currently owns active CFG23 lanes; do not interrupt, reconcile, adopt, or
> dispatch them. The recovery-aware automation circuit breaker, explicit lane
> ownership classifier, and digest-bound human recovery protocol are now live.
> The CFG23 recovery report was explicitly prepared and then applied on
> 2026-08-31 with the user's exact `ALIGN_WORKFLOW_TO_WAVE` confirmation. The
> workflow and frozen wave are now aligned at `DECISION_REQUIRED`; do not infer
> that the user approved the old synthesis direction or the newly received
> packet as a launch plan. The versioned
> transactional schema-migration service is
> now live. Startup/bootstrap recovery and the first-observation barrier are
> also extracted and live. The typed exact action router and the bounded
> Windows lane-reconciliation service and bounded context registry are now
> live. The composition-root P1 extraction is now complete, including atomic
> authoritative transition provenance. Watchdog restart/crash history is now
> visible in `/api/health`, and README now matches the connected custody,
> multi-member loop, state-kernel, recovery, and dispatch boundaries. The
> supervised runtime is now Bun 1.3.14 with two checksum-verified 1.2.18
> rollback copies. Legacy question/prose-based dispatch reconstruction is now
> removed; only an exact structured checked-plan contract can reach scheduling.
> Historical phase provenance now uses a read-only explicit-fields-only
> projection: missing authority/cause/actor remain unknown and no ledger row is
> rewritten or backfilled. The recovery browser coverage is now split into its
> own spec and locks the exact prepare/apply action envelopes without live
> mutation. The formal coordinator/Lane Watch interface is now live:
> observe-only, imported-wave, and controller-owned-execution are derived from
> existing durable human gates and consumed across every authority path.
> Receipt-bound shadow resource calibration and resource-bound independent
> epoch/idea-search review provenance are now live. Read-only nested epoch →
> wave → lane/custody history and first-class start/end boundary comparisons are
> now live. Per-user/project authorization, scoped push/SSE, explicit host
> capability inventory, and serialized global token/slot admission are now live
> too. The scheduled task loads `config/access-policy.json`; the admitted
> Tailnet identity `wstrinz@github` may read all projects but may submit guarded
> mutations only for `cfg23`, while loopback remains local `admin/*`. Do not
> broaden mutation scope or add Mac reconciliation
> until its ownership and recovery semantics are explicitly proven.
> The operator explicitly approved and applied the received DKC redirect. Its
> four questions then completed a second read-only Sol lane-plan check. The
> checked plan was explicitly approved and its contracts staged; the resulting
> schedule ran only the asymmetric laboratory lane and its accepted evidence was
> synthesized. CFG23 is now version 182 at `RESEARCH_REVIEW`, with zero active
> actions or controlled research runs. The v104 UI refuses one-loop start before
> any workflow transition because the cheapest dependency-ready row-41 contract
> needs 80,000 tokens while the exhausted epoch has only 4,906 schedulable. A
> read-only Sol epoch audit is `drafted` at the separate human activation gate
> and recommends `Epoch 2 — Balanced proof-object frontier`; do not activate it
> without a fresh explicit operator decision. The UI also includes a persistent Campaign
> Interpretation deck and Research Atlas, with typed evidence semantics and an
> explicit interpretation-is-not-authority boundary. Historical run strategy is
> restored from immutable confirmed schedules rather than recomputed from the
> current plan. Redirect launch remains transactionally claimed before the first
> async boundary, preventing duplicate Sol turns.
> Preserve all human gates. Test with `bun run check` and Playwright on localhost
> and the tailnet URL; do not mutate CFG23 merely to exercise UI.

## Executive summary

Lane Watch is no longer the early research-review stub described in the old
handoff. It now has a Svelte PWA, XYFlow workflow/history/replay views, real
multi-lane schedules, immutable launch contracts, bounded research execution,
batch evidence intake, Sol planning and synthesis, one-loop autopilot, a
separate Terra custody executor, strategy governance, a shared shadow resource
economy, compact read projections, and a central campaign-state kernel.

The current architectural seam is not missing research dispatch. It is the
boundary between authoritative campaign workflow and independently managed
worker activity:

- the durable CFG23 workflow and frozen wave are aligned at
  `DECISION_REQUIRED`;
- Lane Watch owns no active action, research run, schedule, or custody lease;
- the observer currently sees no active or blocked external lane in the compact
  CFG23 snapshot;
- historical externally launched lanes remain outside Lane Watch command
  authority and must not be adopted or reconciled by inference.

The state kernel refuses to turn observed motion into workflow progress. Its
two-stage recovery protocol aligned only the historical phase boundary after
an exact human choice; it did not infer a worker result or repair accounting.
Runtime and operator-documentation
hardening, the P2 program-level mechanization boundary, and explicit access-map
activation are complete. The remaining live CFG23 transition is the explicit
human review of the three surviving revised lanes in the current checked plan;
Mac command authority remains deferred. No automatic control-plane mutation is
the next step.

## Continuation checkpoint — 2026-08-31 15:36 CDT

The interpretation/education layer is deployed without consuming a campaign
gate:

- CFG23 remains version `180` at `RESEARCH_REVIEW`; the plan is `drafted`, with
  zero queued/running actions and zero active controlled research runs;
- the director deck now presents North Star → Current Quest → Human Decision,
  followed by a bounded change ledger, progress/scope rail, and explicit
  watchouts;
- the Research Atlas presents coverage, supply, and decision as connected track
  rows with selectable claim/proposal stations, plus an Object Codex for the
  relevant configurations, orientations, automorphism groups, reduced slack,
  liftability deletion, V4/C2, and proof-object concepts;
- `SUPPORTED`, `PROPOSED`, `UNMEASURED`, and `BLOCKED` are distinct visible
  semantics. The inspector links interpretation back to exact evidence, scope,
  expected unlocks, and metrics and states that interpretation is not authority;
- current-plan precedence prevents a stale synthesis from becoming the headline
  during review, and explicit `DROP` records do not appear as proposed moves;
- historical run strategy now resolves against immutable confirmed schedule
  membership first. The completed asymmetric laboratory therefore remains a
  `supply` experiment with its original expected delta even while the current
  plan changes;
- exact-root Git checks now prevent a nested non-repository campaign fixture (or
  campaign directory) from inheriting repository authority from Lane Watch's
  parent checkout. The same boundary protects custody execution;
- the Lane Watch directory is now its own local Git repository on `main`.
  Baseline commit `c513a15` records the pre-interpretation control plane. A
  GitHub remote still requires re-authenticating `gh`; no credential was written
  into the repository;
- PWA shell/cache v103 is live on supervised Bun 1.3.14 PID `36960`.
  `bun run check` passes 154 tests / 835 assertions, TypeScript, and Svelte with
  zero errors or warnings. The five-scenario campaign Playwright suite and the
  separate all-jobs overview scenario pass against the restarted listener;
- visual proof is under `live-proofs/2026-08-31-v103/`, especially
  `campaign-interpretation-atlas-desktop-v103.png`.

The next campaign mutation remains the explicit review decision over the three
surviving revised lanes. UI iteration can continue safely against fixtures and
read-only live projections without approving that plan.

## Continuation checkpoint — 2026-08-31 11:06 CDT

The operator explicitly confirmed the one-lane resource reservation:

- CFG23 is version `172`, phase `RESEARCH_READY`;
- schedule `5bd7d4a0-8663-400b-85ab-b7e34e2364c6` remains bound to
  `sha256:2dc2d4960c81c00cedf063dee46ca2d6bb19640e58ba42b1f52a6526509fd901`;
- its status is `confirmed` and authority is
  `operator-confirmed-reservation`;
- the only reserved member remains
  `asym-reduced-slack-liftability-lab-v1`; three contracts remain budget-deferred;
- the exact Tailnet confirmation proof passed 1/1, zero actions are unsettled,
  and zero controlled research runs are active;
- persistent proof is
  `live-proofs/2026-08-31-v101/04-confirmed-one-lane-reservation.png`.

The next mutation is **Dispatch 1-lane wave**. Unlike confirmation, dispatch
will create and launch the bounded worker, so it requires fresh explicit
operator approval.

## Continuation checkpoint — 2026-08-31 10:20 CDT

The operator explicitly approved and staged all four checked contracts, and the
resource frontier is frozen for the next gate:

- the received packet is durably preserved at commit
  `09036820f3354426addf25986fe3ab50d2136e72`, with its observed content digest
  still `sha256:4e6f782c98e7776376994125927d24dee4358fb2886858ed2f14ef2f40e0442e`;
- the four generated launch packets are frozen at contract commit
  `c7af2777ec959413e6a0819607554e1b27752c0b`;
- the completed `research.review.resolve` receipt records exactly four newly
  approved requests, two question revisions, zero drops/deferred contracts,
  and phase `RESEARCH_READY`;
- CFG23 is version `171`; proposed schedule
  `5bd7d4a0-8663-400b-85ab-b7e34e2364c6` is bound to digest
  `sha256:2dc2d4960c81c00cedf063dee46ca2d6bb19640e58ba42b1f52a6526509fd901`;
- the schedule reserves only `asym-reduced-slack-liftability-lab-v1` at an
  80,000-token cap (1 of 3 available slots). C2, BS12 row 41, and BS21 are all
  `PARK_BUDGET` because adding another 80,000-token lane would exceed the
  153,647-token effective wave envelope;
- schedule authority is `none`, status is `proposed`, zero actions are
  unsettled, and zero controlled research runs are active. Confirmation would
  reserve this exact digest but still launch nothing;
- the first staging attempt correctly failed before file writes because the
  received packet was untracked. After its dedicated provenance commit, the
  next attempt exposed a Git porcelain parser defect: trimming stdout removed
  the leading status column and misread `packets/...` as `ackets/...`.
  `runGit` now preserves leading protocol bytes, with a regression covering a
  modified tracked launch packet as the first status row;
- the supervised runtime is Bun 1.3.14 PID `39444`. `bun run check` passes 150
  tests / 808 assertions with TypeScript and Svelte clean; local and Tailnet
  Playwright each pass all 9 scenarios after the proposed-schedule gate was
  added to the live-state-aware assertions.

Persistent proof is
`live-proofs/2026-08-31-v101/03-proposed-wave-schedule.png`. The next mutation is
the explicit **Confirm 1-lane schedule** gate; dispatch remains separate.

## Continuation checkpoint — 2026-08-31 10:02 CDT

The operator approved the packet-grounded redirect, and the next safe planning
pass is complete:

- redirect input `de36be44-2fda-4fb0-80fe-8aa981b3329b` is now `applied`;
- its four proposed questions were staged and consumed by one read-only Sol
  lane-plan turn bound to digest
  `sha256:589f078e932fcc0d4eee9dd009d3904e15587dc421e3340dc7f6649dc47e08af`;
- CFG23 is version `169`, phase `RESEARCH_REVIEW`; plan status is `drafted`,
  decision is `READY_FOR_GATE`, all four requests remain `in_review`, and the
  coordinator is idle;
- zero queued/running actions and zero active controlled research runs remain;
- the checked plan retains four launchable contracts: BS12 row-41 coverage
  (`60191a6…`, medium), C2 first-divergence forensics (`98b65de…`, small), the
  asymmetric 12–20-type lab (`31152ba…`, medium with an inventory stop), and
  the sequential BS21 `a25527ed` proof-object pilot (`2e0e52c…`, large, priority
  2, capped at 6 CPU-hours / 16 GiB);
- Sol classifies the portfolio `IMBALANCED` but within the maintenance ceiling:
  qualitative cost forecast 56% coverage / 22% supply / 22% decision and about
  11% maintenance. It requires the three priority-1 lanes to be gated
  independently and the large BS21 lane to wait for a heavy slot;
- the stale Trade37 plan caused the live primary rail to display zero new
  candidates before the planning turn. `currentRequests` now ignores inactive
  plan IDs and, during an active review, counts only the `in_review` set;
- the deployed shell is PWA cache v101 on supervised Bun 1.3.14 PID `1764`;
- `bun run check` passes 150 tests / 805 assertions with TypeScript and Svelte
  clean. Local and Tailnet Playwright each pass all 9 scenarios, and the exact
  Tailnet human-gate proof passes 1/1.

The next mutation is explicitly human-gated: **Approve & stage 4 lanes** moves
the checked contracts to `RESEARCH_READY` but does not launch them. Persistent
proof is `live-proofs/2026-08-31-v101/01-checked-four-lane-human-gate.png`.

## Continuation checkpoint — 2026-08-31 08:30 CDT

The first real DKC packet completed the safe packet → read-only Sol review →
human-gate portion of the loop:

- redirect input `de36be44-2fda-4fb0-80fe-8aa981b3329b`, input digest
  `sha256:8c722fb68322c7b4b3718270c428d3bd845ac12d55093375a99a17e04ea0ee0d`,
  is `drafted` with decision `READY_FOR_GATE`;
- CFG23 is version `166`, remains `DECISION_REQUIRED`, has no queued/running
  action or controlled research run, and no dispatch occurred;
- Sol recommends four bounded directions: BS12 row-41 chart coverage, one BS21
  `a25527ed` staged proof-object pilot, exact localization of the missing C2
  depth-6 state, and a 12–20-type asymmetric reduced-slack/liftability lab;
- the proposed epoch weights are coverage `0.45`, supply `0.35`, and decision
  `0.20`; Mac retry, generic SAT review, broad follow-on rows, scaled BS21,
  unbounded CAS, and further custody descendants are parked or retired;
- **Use this redirect** remains an explicit human mutation. If confirmed it
  stages at most four proposed research questions and moves to
  `RESEARCH_REVIEW`; it does not dispatch a worker;
- the live pass exposed three concurrent attempts to launch the same queued
  redirect. `WaveSemanticService` now atomically claims the row as `drafting`
  before bundle generation or `startTurn`, and records launch failures as
  durable `failed` inputs. A regression pauses the first launch and fires three
  observers, proving only one Codex turn starts;
- `bun run check` passes 150 tests / 805 assertions with TypeScript and Svelte
  clean. Local and Tailnet Playwright each pass all 9 scenarios after the
  supervised runtime restarted as Bun 1.3.14 PID `34276`.

Persistent visual evidence is under `live-proofs/2026-08-31-v100/`, including
`01-tailnet-all-jobs.png`, `02-tailnet-cfg23-decision-gate.png`, and
`06-sol-redirect-human-gate.png`.

## Continuation checkpoint — 2026-08-31 08:02 CDT

The explicit historical recovery and all-jobs restoration are live:

- the user confirmed `ALIGN_WORKFLOW_TO_WAVE` against report
  `ae0f7ce6-a135-44ac-be81-e6d359c4a363` and digest
  `sha256:2ae236165bf5f3a919095f4814eea8db48de7f9c4e02bc3d39f3c9df38c42685`;
- CFG23 version is now `161`; workflow and frozen wave are both
  `DECISION_REQUIRED`, recovery is `ALIGNED`, and the coordination interface is
  `imported-wave`;
- the historical accounting gap remains exactly `4/5`; no member result,
  accounting repair, dispatch, claim promotion, merge, or push was inferred;
- zero queued/running actions and zero active controlled research runs remain;
- the packet inbox is now `STAGED FOR REVIEW` / `READY FOR SEMANTIC REVIEW`;
- `/` again renders the all-jobs lane dashboard directly instead of hiding it
  in a collapsed campaign workspace; individual `/projects/<id>` routes retain
  the simplified campaign line and supporting workspaces;
- access policy now separates visibility from mutation: `wstrinz@github` reads
  all configured projects but may submit guarded mutations only for `cfg23`;
- the root route is therefore read-only, CFG23 remains mutable behind its
  normal gates, and ARR15/math-stuff remain read-only for that Tailnet identity;
- the deployed shell is PWA cache v100 (the later 08:30 checkpoint records the
  current supervised PID);
- `bun run check` at this checkpoint passed 150 tests / 803 assertions with TypeScript and Svelte
  clean; local and Tailnet Playwright each pass all 9 scenarios.

Live proof screenshots are
`live-proofs/2026-08-31-v100/01-tailnet-all-jobs.png` and
`02-tailnet-cfg23-decision-gate.png`. The next action is not automatic: review
the old one-lane synthesis direction against the newly received DKC packet and
choose approve, revise, or hold. A packet-grounded revision is the recommended
path if the goal is to exercise fresh intake through the next checked plan.

## Continuation checkpoint — 2026-08-31 07:14 CDT

The operator explicitly authorized preparing, but not applying, the live CFG23
historical recovery report. The preparation was exercised through the Tailnet
UI and verified with before/after screenshots:

- report id `ae0f7ce6-a135-44ac-be81-e6d359c4a363` (subsequently applied as
  recorded in the 08:02 checkpoint above);
- bound digest
  `sha256:2ae236165bf5f3a919095f4814eea8db48de7f9c4e02bc3d39f3c9df38c42685`;
- frozen status at preparation was `prepared`, with workflow `BLOCKED`, frozen wave
  `DECISION_REQUIRED`, accounting `4/5`, and controlled execution `0`;
- zero queued/running actions, active controlled research runs, schedules, or
  custody leases; the prior loop is completed;
- the lone historical projection gap,
  `cfg23:windows:trade37-pin-lf-custody-repair-v1`, remains
  `RECONCILIATION_REQUIRED` and is not mechanically repairable because no
  reviewable landing receipt exists;
- `APPLY_VALIDATED_PROJECTION_REPAIR` is consequently unavailable;
- preparation did not change CFG23 version `160`, workflow, wave, accounting,
  schedule, loop, or command authority;
- the live UI kept **Apply selected recovery** disabled without the separate
  confirmation checkbox.

The one-off preparation screenshots and exact live Playwright spec were deleted
after verification. Persistent post-application proof now lives under
`live-proofs/2026-08-31-v100/`. This preparation boundary is superseded by the
explicitly applied recovery recorded in the 08:02 checkpoint above.

## Continuation checkpoint — 2026-08-31 06:25 CDT

The next-wave reception and first UI simplification experiment are live without
changing CFG23 authority:

- `PacketInbox.svelte` projects the five newest context-registry `queue-plan`
  rows, their modification times, sizes, and content-digest prefixes. Its
  watched location is `campaigns/<project>/packets/queue/`.
- Packet reception remains context-only. It cannot create requests, compile a
  launch contract, confirm a schedule, dispatch work, or promote a claim. On
  CFG23 it explicitly reports `STAGED · CONTROL HOLD` because historical
  recovery is still required.
- **Received 2026-08-31 06:54 CDT.** The operator-supplied DKC packet is staged
  as `campaigns/cfg23/packets/queue/2026-08-31-proof-export-toric-v4-c2-forensics.md`.
  Its body matches the supplied attachment after line-ending normalization;
  the queue-context digest is
  `sha256:4e6f782c98e7776376994125927d24dee4358fb2886858ed2f14ef2f40e0442e`.
  It remains an untracked campaign file and an unreviewed recommendation. The
  observer admitted it as the newest of five bounded queue sources without a
  CFG23 version, recovery, action, run, schedule, wave, or loop mutation.
- `PACKET-INTAKE.md` records the exact CFG23 drop path, minimum packet contract,
  and the complete packet → Sol review → human plan gate → schedule → human
  confirmation → dispatch → batch intake → synthesis → decision chain.
- The default campaign visualization is now a five-stop horizontal line:
  packet inbox → checked plan → bounded wave → evidence return → synthesis and
  decision. Animated connectors identify the active onward segment. External
  packet/redirect, idea/strategy, and custody/replay appear as subordinate
  branches that rejoin through explicit gates.
- Replay and durable program history retain the richer XYFlow graph. The main
  page now keeps only the current action, packet inbox, campaign line, and live
  loop/gate in the primary scan path; wave/evidence, strategy, and system tools
  live in three labeled expandable workspaces.
- The deployed shell is PWA cache v99. Local and Tailnet Playwright each pass
  all 8 scenarios, including the receive-only inbox, five-stop line, three
  branches, collapsed workspaces, recovery protocol, replay/history, schedule,
  and custody fixtures. No live recovery, adoption, dispatch, or claim action
  was submitted.

## Continuation checkpoint — 2026-08-30 08:28 CDT

The first recovery/ownership tranche has now landed in the working filesystem
and is live under the watchdog:

- observer automation returns without proposing any action whenever the state
  kernel reports `HUMAN_RECONCILIATION_REQUIRED`;
- terminal-lane reconciliation requires an exact current durable research run
  or, at an aligned boundary, explicit membership in the current frozen wave;
- automatic synthesis preparation no longer consumes the aggregate observed
  phase and instead requires aligned workflow/wave `SYNTHESIS_READY` state plus
  complete accounting;
- four focused policy regressions cover recovery, externally owned lanes,
  controller-owned lanes, and synthesis ownership; and
- the two legacy synthesis integration tests now cross explicit `wave.adopt`
  authority before prepare-mode automation freezes a bundle.

`bun run check` passes 86 tests, 509 assertions, TypeScript, and Svelte with no
errors or warnings. A pre-change filesystem checkpoint is stored at
`tmp/lane-watch-pre-recovery-ownership-p0-2026-08-30.zip`. The watchdog reloaded
the verified Bun listener without changing CFG23 project version 160, workflow
`BLOCKED`, frozen-wave `DECISION_REQUIRED`, controlled execution 0, or the
empty action/run/custody queues.

The remaining P0 frontier is the digest-bound historical recovery command and
the corresponding recovery-rail action. The lane/workflow UI should also label
external observation separately from controller-owned execution.

## Continuation checkpoint — 2026-08-30 09:16 CDT

The second P0 tranche is implemented, verified, and live:

- `LaneOwnershipService` gives each active lane one shared command-authority
  classification: `controller-run`, `adopted-wave`, or `observed-elsewhere`;
- both manual reconciliation and observer automation consume that classifier,
  so the UI and backend enforce the same boundary;
- `CampaignRecoveryService` persists a `campaign-recovery-report/v1` snapshot
  and SHA-256 digest without changing workflow or wave state;
- recovery application requires the exact report id, exact fresh digest,
  literal confirmation, explicit decision, and an idle unchanged boundary;
- the only choices are preserve hold, align wave to workflow, align workflow to
  wave, or apply a fully supported terminal-evidence projection repair;
- the recovery event records actor, rationale, before/after state, and explicit
  denial of inferred results, dispatch, claim promotion, merge, or push;
- the Svelte recovery rail exposes the full digest, frozen facts, explicit
  choice, rationale, and confirmation instead of auto-applying anything; and
- external active lanes are visibly `Observed elsewhere` and have no reconcile
  button.

`bun run check` passes 93 tests, 540 assertions, TypeScript, and Svelte with no
errors or warnings. All 6 Playwright scenarios pass on localhost and all 6 pass
through Tailnet. The pre-change filesystem checkpoint is
`tmp/lane-watch-pre-recovery-command-p0-2026-08-30.zip`.

The verified listener restarted as Bun PID `210796`. CFG23 remained version
160 with workflow `BLOCKED`, frozen wave `DECISION_REQUIRED`, controlled
execution 0, and zero unsettled actions, controlled runs, active schedules, or
custody leases. No live recovery report was prepared or applied. All three
active observer lanes, including
`cfg23:windows:poncelet24-exceptional-stratum-scout-v1`, are live-classified
`observed-elsewhere`; no new reconciliation action was created.

## Continuation checkpoint — 2026-08-30 09:46 CDT

The first P1 composition-root tranche is implemented and live:

- `CampaignSchemaMigrationService` owns all campaign tables, indexes, and
  legacy additive repairs previously embedded in `CampaignControl`;
- `campaign_schema_migrations` records explicit component versions 1
  (`campaign-baseline`) and 2 (`digest-bound-recovery`), without using the
  database-global `PRAGMA user_version` shared with the push subsystem;
- all pending versions run in one transaction, and startup rejects unknown or
  non-contiguous ledgers instead of guessing;
- legacy coordinator provenance is backfilled from the original thread id,
  while dispatch profile, evidence JSON, and custody execution fields preserve
  their prior defaults;
- tests cover fresh creation, idempotence, representative unversioned legacy
  upgrades, whole-batch rollback, and future/invalid version refusal; and
- the composition root invokes migration before constructing domain services
  and no longer contains `CREATE TABLE` or `ALTER TABLE` statements.

A consistent backup of the live WAL database was migrated first; SQLite
integrity remained `ok` and CFG23 stayed `BLOCKED` at version 160. The deployed
database then recorded versions 1 and 2 in one startup transaction and again
reported integrity `ok`. The listener restarted as Bun PID `197420`; CFG23
remained version 160 with wave `DECISION_REQUIRED`, controlled execution 0,
zero unsettled actions/runs/schedules/custody, and no recovery report.

`bun run check` passes 98 tests, 563 assertions, TypeScript, and Svelte with no
errors or warnings. All 6 Playwright scenarios pass on localhost and all 6 pass
through Tailnet. The pre-change filesystem checkpoint is
`tmp/lane-watch-pre-schema-migration-p1-2026-08-30.zip`.

## Continuation checkpoint — 2026-08-30 10:36 CDT

The second P1 composition-root tranche is implemented and live:

- `CampaignStartupService` owns manifest project registration, strategy
  foundation bootstrap, interrupted-action recovery, custody-turn recovery,
  and the first-observation execution barrier;
- startup phases are explicit from `constructed` through
  `awaiting-first-observation`, `ready`, or `failed`;
- running actions with ambiguous effects are frozen before custody recovery,
  while merely queued actions remain inert;
- the first observer pass can synchronize facts and enqueue guarded proposals,
  but the action queue becomes executable only after that entire pass settles;
- failed bootstrap or premature observation settlement cannot resume actions;
  and
- `CampaignControl` now delegates both `create()` recovery and `observe()`
  readiness to the startup service rather than owning either sequence.

Focused tests cover exact ordering, manifest/BOM loading, project defaults,
provenance-preserving persistence, idempotent initialization, repeated settled
observations, premature resume refusal, and failed custody recovery. `bun run
check` passes 101 tests, 588 assertions, TypeScript, and Svelte with no errors
or warnings. All 6 Playwright scenarios pass on localhost and all 6 pass
through Tailnet. The pre-change filesystem checkpoint is
`tmp/lane-watch-pre-startup-extraction-p1-2026-08-30.zip`.

The listener restarted as Bun PID `304036`. CFG23 remained version 160 with
workflow `BLOCKED`, frozen wave `DECISION_REQUIRED`, controlled execution 0,
zero unsettled actions/runs/schedules/custody, no recovery report, schema
versions 1 and 2, and SQLite integrity `ok`.

## Continuation checkpoint — 2026-08-30 10:55 CDT

The third P1 composition-root tranche is implemented and live:

- `CAMPAIGN_ACTION_TYPES` is the single immutable 46-action catalog and derives
  the exported `CampaignActionType` plus runtime validation;
- `CampaignActionHandlerRegistry` requires exactly one typed handler for every
  catalog entry;
- `CampaignActionRouter` rejects unsupported actions before dispatch and
  rejects missing or extra runtime registrations at construction;
- `ActionQueueService` now delegates both validation and execution to the same
  router instance;
- the composition root retains only the explicit handler-to-domain-service
  wiring and no longer contains an action switch; and
- the router imports no campaign aggregate, database, worker, Git, or
  coordinator service and therefore acquires no independent authority.

Direct tests cover catalog uniqueness, complete-envelope routing, unsupported
action rejection, and missing/extra handler rejection. Architecture tests lock
the no-switch and no-authority boundaries. `bun run check` passes 105 tests,
607 assertions, TypeScript, and Svelte with no errors or warnings. All 6
Playwright scenarios pass on localhost and all 6 pass through Tailnet. The
pre-change filesystem checkpoint is
`tmp/lane-watch-pre-action-router-p1-2026-08-30.zip`.

The listener restarted as Bun PID `308264`. CFG23 remained version 160 with
workflow `BLOCKED`, frozen wave `DECISION_REQUIRED`, controlled execution 0,
zero unsettled actions/runs/schedules/custody, no recovery report, and SQLite
integrity `ok`.

## Continuation checkpoint — 2026-08-30 14:03 CDT

The fourth P1 composition-root tranche is implemented and live:

- `LaneReconciliationService` owns the bounded local-coordinator process for
  manual and automatic `lane.reconcile` actions;
- it consumes the shared `LaneOwnershipService` classification and refuses an
  externally observed lane before inspecting platform, terminal state, or
  coordinator configuration;
- Windows reconciliation still requires a terminal daemon, a configured
  coordinator confined to the project root, an argument-array PowerShell
  invocation, and a five-minute process bound;
- nonzero process receipts preserve stderr-first failure reporting, while
  successful output remains trimmed to the last 8,000 characters;
- Mac reconciliation remains explicitly unsupported; no platform authority was
  inferred during this extraction; and
- `campaign.ts` now contains only the reconciliation service port wiring and
  exact action route, not process discovery or execution.

Direct tests cover the success receipt, unknown and externally owned lanes,
platform and terminal gates, coordinator absence and root escape, process
failure precedence, and output bounding. Architecture tests lock the extracted
ownership and process boundary. `bun run check` passes 111 tests, 632
assertions, TypeScript, and Svelte with no errors or warnings. All 6 Playwright
scenarios pass on localhost and all 6 pass through Tailnet. The pre-change
filesystem checkpoint is
`tmp/lane-watch-pre-lane-reconciliation-p1-2026-08-30.zip`.

The verified listener restarted as Bun PID `323376`. CFG23 remained version
160 with workflow `BLOCKED`, frozen wave `DECISION_REQUIRED`, controlled
execution 0, zero unsettled actions/runs/schedules/custody, no recovery report,
schema versions 1 and 2, and SQLite integrity `ok`. No reconciliation action or
historical recovery command was issued against live CFG23. Bun later recycled
under the existing watchdog after browser verification; PID `334936` was
verified as the replacement `bun.exe src/server.ts`, and the same CFG23 safety
boundary remained unchanged.

## Continuation checkpoint — 2026-08-30 14:29 CDT

The fifth P1 composition-root tranche is implemented and live:

- `ContextRegistryService` owns discovery, bounded reads, hashing, and durable
  upsert/pruning for campaign context sources;
- it preserves the seven fixed campaign candidates, five newest Markdown queue
  plans, and one launch-packet candidate per active observed project lane;
- every stored source retains its project-relative path, filesystem byte count,
  modified time, full bounded content, and SHA-256 content address;
- sources over 512,000 characters are excluded, missing optional sources do not
  fail observation, and an all-missing pass preserves the last usable registry;
- lane-derived paths are now lexically confined to the project root before any
  file read; and
- `campaign.ts` now supplies only the project-root port and calls the registry
  after observation synchronization.

Direct tests cover fixed and ranked source selection, content hashes and
metadata, stale pruning, all-absent preservation, oversize exclusion, and path
escape rejection. Architecture tests lock discovery, hashing, and persistence
outside the composition root. `bun run check` passes 116 tests, 660 assertions,
TypeScript, and Svelte with no errors or warnings. All 6 Playwright scenarios
pass on localhost and all 6 pass through Tailnet. The pre-change filesystem
checkpoint is `tmp/lane-watch-pre-context-registry-p1-2026-08-30.zip`.

The verified listener restarted as Bun PID `335108`. CFG23 remained version
160 with workflow `BLOCKED`, frozen wave `DECISION_REQUIRED`, controlled
execution 0, zero unsettled actions/runs/schedules/custody, no recovery report,
schema versions 1 and 2, and SQLite integrity `ok`. The live registry remained
exactly 13 sources with the same identity/role/path/hash/byte digest
`253e5c3056d351bedcbe967a0a1f1daadfa83f5dbb638b9ae621569f5f8160d5`.
No live recovery or command action was issued.

## Continuation checkpoint — 2026-08-30 14:45 CDT

The sixth and final P1 composition-root tranche is implemented and live:

- `CampaignStateService` now owns insertion of `project.phase.changed`
  provenance instead of calling back into the composition root after updating
  the project row;
- authoritative phase, version, settings columns, update timestamp, and phase
  provenance settle in one SQLite transaction;
- the project update and provenance event share one timestamp, so the state
  kernel cannot expose a newer authoritative phase with missing or later
  provenance;
- a failed provenance insert rolls back the phase and version, and a surrounding
  domain transaction can roll back both together through a nested savepoint;
- observation projection changes and their explicitly non-authoritative events
  now receive the same atomic consistency without acquiring workflow authority;
  and
- generic domain events remain in their existing services; this change does not
  centralize unrelated event semantics or broaden the state kernel.

Direct tests force phase-event and activity-event insertion failures and prove
the corresponding state rolls back. A nested-transaction regression proves an
outer domain failure removes both authoritative state and provenance. Existing
transition-graph, human-recovery, and observation-authority tests remain green.
`bun run check` passes 119 tests, 674 assertions, TypeScript, and Svelte with no
errors or warnings. All 6 Playwright scenarios pass on localhost and all 6 pass
through Tailnet. The pre-change filesystem checkpoint is
`tmp/lane-watch-pre-atomic-transition-p1-2026-08-30.zip`.

The verified listener restarted as Bun PID `382044`. CFG23 remained version
160 and retained the exact `updatedAt` value, event count 547, and last phase
event ID/payload/timestamp. Workflow remained `BLOCKED`, the frozen wave stayed
`DECISION_REQUIRED`, controlled execution stayed 0, and actions, runs,
schedules, custody, and recovery reports stayed empty. Schema versions 1 and 2
and SQLite integrity `ok` were unchanged. No live state transition or recovery
command was issued.

## Continuation checkpoint — 2026-08-30 15:55 CDT

The first runtime-hardening tranche is implemented and live:

- `RuntimeHealthService` exposes `lane-watch-runtime-health/v1` through the
  existing loopback/Tailnet-authorized `/api/health` endpoint;
- current-process telemetry includes PID, start time, uptime, and Bun version;
- durable supervisor telemetry parses the retained watchdog transcript into
  start, restart, abnormal-exit, and confirmed Bun-panic counts plus latest
  start/exit timestamps and exit code;
- nonzero or forced exits are reported as abnormal and are never mislabelled as
  confirmed Bun panics without an explicit transcript marker;
- transcript absence and two-million-character window truncation are explicit;
  and
- the service is read-only and cannot write supervisor state, spawn a process,
  stop a process, or restart Lane Watch.

Direct parser and service tests cover exact counts, current-process projection,
and unavailable-history behavior. Architecture tests lock the no-control
boundary. `bun run check` passes 123 tests, 685 assertions, TypeScript, and
Svelte with no errors or warnings. All 6 Playwright scenarios pass on localhost
and all 6 pass through Tailnet. The pre-change filesystem checkpoint is
`tmp/lane-watch-pre-runtime-health-p1-2026-08-30.zip`.

The verified listener restarted as Bun PID `389628`. Live health reported 95
starts, 94 restarts, 93 abnormal exits, and 2 confirmed Bun panic markers in the
complete retained transcript, with Bun `1.2.18` and no truncation. CFG23 stayed
version 160 with its exact update timestamp, workflow `BLOCKED`, frozen wave
`DECISION_REQUIRED`, zero controlled execution, and zero unsettled
actions/runs/schedules/custody. No recovery report was prepared, schema versions
1 and 2 remained intact, and SQLite integrity remained `ok`.

## Continuation checkpoint — 2026-08-30 16:01 CDT

The stale operator documentation is reconciled with the deployed architecture:

- README no longer presents Campaign Control as an initial synthesis-only slice
  or one lane as the wave abstraction;
- custody now documents the connected, isolated Terra executor, exact lease
  confirmation, measured producer receipt, and second human landing gate;
- workflow phase is correctly attributed to the durable state kernel, with
  observer activity explicitly non-authoritative and idle divergence routed to
  digest-bound historical recovery;
- research dispatch is documented as an exact checked-plan plus separately
  confirmed multi-member schedule rather than as unavailable;
- the allowlisted control inventory now includes schedule intake, one-loop
  controls, recovery, strategy/resource governance, and custody lifecycle
  commands; and
- runtime-health fields and their liveness-versus-stability meaning are included
  in Windows watchdog operations.

The documented `run.ps1`, `install-task.ps1`, `bun run check`, endpoints, and
architecture link were verified against the current workspace. This was a
documentation-only continuation after the already verified 123-test runtime
health deployment; live health remained available on PID `389628` and no CFG23
state was touched.

## Continuation checkpoint — 2026-08-30 16:30 CDT

The controlled runtime migration is verified and live:

- the official Bun 1.3.14 Windows x64 archive was pinned from release
  `bun-v1.3.14` and matched published SHA-256
  `0a0620930b6675d7ba440e81f4e0e00d3cfbe096c4b140d3fff02205e9e18922`;
- the extracted candidate reported revision `1.3.14+0d9b296af` and passed the
  exact build, 123-test/685-assertion suite, TypeScript, and Svelte checks before
  installation;
- the full synthesis/App Server integration test now has a realistic 30-second
  per-test budget. It passed alone in 11.2 seconds and under the full candidate
  suite after the former 15-second budget proved load-sensitive;
- the live preflight found zero queued/running actions, zero active controlled
  research runs, no active schedule, a completed loop, no custody work or
  leases, and recovery-required active execution 0;
- only the exact validated loopback Bun listener was stopped. The candidate was
  installed with an atomic same-directory replacement, and the existing
  watchdog relaunched it without changing supervision or network binding;
- the installed executable now reports Bun `1.3.14` and SHA-256
  `0187f68d843f825a72ada4a7eca60db896ed753759a7f8252edcd31ac1bf1b9c`;
- the previous Bun `1.2.18+0d4089ea7` executable is preserved at
  `C:\Users\wstri\.bun\bin\bun-1.2.18-lane-watch-rollback.exe` and
  `tmp/bun-runtime-backups/bun-1.2.18-0d4089ea7.exe`, both with SHA-256
  `c58077970af24e5b45ba78b83cc693ae5825f3cd7435636cbf5919679a79d7ec`;
  and
- the pre-change control-plane checkpoint is
  `tmp/lane-watch-pre-bun-runtime-upgrade-2026-08-30.zip`.

The installed runtime then passed `bun run check` through its normal nested
commands, all 6 Playwright scenarios on localhost, and all 6 through Tailnet.
The live listener is Bun PID `386520` (ephemeral) and remained on that PID
through final verification. CFG23 remained version 160 with updated timestamp
`2026-08-30T01:01:56.135Z`, workflow `BLOCKED`, frozen-wave
`DECISION_REQUIRED`, `HUMAN_RECONCILIATION_REQUIRED`, controlled execution 0,
and no recovery report or unsettled action/run/schedule/custody state. Schema
versions 1 and 2 remained intact and SQLite integrity remained `ok`.

## Continuation checkpoint — 2026-08-30 17:02 CDT

Legacy dispatch reconstruction is quarantined from every authority path:

- the four CFG23 question-regex mappings that manufactured task IDs, bases,
  packet/evidence paths, profiles, dependencies, and budgets were removed;
- a checked lane now yields a launch spec only when its own structured contract
  says `READY` and binds an exact 40-hex `baseRef`;
- base refs are no longer extracted from lane prose or single-lane operator
  guidance, and a project default profile cannot rewrite an approved lane;
- projections, shadow resource candidates, next-dispatch selection, schedule
  construction, and focus-task reuse all consume the same strict structured
  resolver;
- focus-task reuse now requires the task to appear in the current checked plan;
  an approved request matched only by old question text is not authority;
- old requests and completed runs remain readable from their durable rows, but
  an old plan without a structured immutable contract must be revised through
  Sol planning and the human approval gate; and
- architecture coverage locks the absence of the legacy catalog and the strict
  `READY`/40-hex boundary. An integration regression deletes the checked plan,
  proves the historical question has no projected dispatch spec, and proves a
  schedule attempt fails before persistence or launch.

`bun run check` passes 124 tests and 695 assertions under Bun 1.3.14, followed
by TypeScript and Svelte with zero diagnostics. The pre-change filesystem
checkpoint is `tmp/lane-watch-pre-legacy-dispatch-quarantine-p1-2026-08-30.zip`.
The supervised restart loaded the change on Bun PID `404112`. Initial
observation/bootstrap took about two minutes, but the process did not exit,
panic, or duplicate; it then remained healthy. All 6 Playwright scenarios pass
on localhost and all 6 pass through Tailnet. CFG23 remained version 160 at
`2026-08-30T01:01:56.135Z`, workflow `BLOCKED`, frozen-wave
`DECISION_REQUIRED`, human recovery required, controlled execution 0, and no
recovery report or unsettled action/run/schedule/custody state. Schema versions
1 and 2 and SQLite integrity `ok` remain intact.

## Continuation checkpoint — 2026-08-30 17:18 CDT

Historical workflow provenance now has an evidence-preserving read policy:

- `campaign-workflow-provenance/v1` classifies the event associated with the
  current durable phase as `COMPLETE`, `PARTIAL`, `STALE_OR_UNMATCHED`, or
  `MISSING`;
- it reads only explicit durable fields. A legacy explicit `source` may supply
  cause evidence, but missing authority, cause, or actor remain unknown;
- stale or unmatched events are not attributed to the current phase, missing
  events do not manufacture a transition, and `backfilled` is always `false`;
- no historical row is rewritten. CFG23 still has exactly 23
  `project.phase.changed` events; and
- the current event `9368d65b-a5b9-4eac-82bd-92579c8ec612` records
  `RUNNING → BLOCKED`, matches the current phase, and is projected `PARTIAL`
  because authority, cause, and actor are absent.

`bun run check` passes 129 tests and 705 assertions under Bun 1.3.14, followed
by TypeScript and Svelte with zero diagnostics. The pre-change filesystem
checkpoint is `tmp/lane-watch-pre-provenance-policy-p1-2026-08-30.zip`.
The guarded restart loaded the change on Bun PID `441860`. All 6 Playwright
scenarios pass on localhost and all 6 pass through Tailnet. CFG23 remained
version 160 at `2026-08-30T01:01:56.135Z`, workflow `BLOCKED`, frozen-wave
`DECISION_REQUIRED`, `HUMAN_RECONCILIATION_REQUIRED`, controlled execution 0,
and no recovery report or unsettled action/run/schedule/custody state. Schema
versions 1 and 2 and SQLite integrity `ok` remain intact.

## Continuation checkpoint — 2026-08-30 17:27 CDT

Recovery browser coverage is now separated from the general campaign-flow
suite and verifies the action protocol directly:

- `e2e/recovery-protocol.pw.ts` owns recovery presentation and protocol tests;
- the prepare case proves the UI sends only a version-bound
  `campaign.recovery.prepare` action with no apply decision or digest authority;
- the apply case proves the UI binds the exact report ID, SHA-256 digest,
  explicit recovery decision, operator rationale, and literal
  `APPLY CAMPAIGN RECOVERY` confirmation;
- every recovery action request is intercepted and settled by the browser
  fixture, so no mutation reaches the live API; and
- the live database still contains zero CFG23 recovery actions and no recovery
  report.

The focused recovery spec passes 3/3. `bun run check` remains at 129 tests and
705 assertions with zero TypeScript/Svelte diagnostics. The complete split
Playwright suite passes 8/8 on localhost and 8/8 through Tailnet. The
pre-change filesystem checkpoint is
`tmp/lane-watch-pre-recovery-ui-playwright-p1-2026-08-30.zip`.
No production code changed, so no restart was required and the listener remains
Bun PID `441860`. CFG23 remained version 160 at
`2026-08-30T01:01:56.135Z`, workflow `BLOCKED`, provenance `PARTIAL`,
frozen-wave `DECISION_REQUIRED`, `HUMAN_RECONCILIATION_REQUIRED`, controlled
execution 0, exactly 23 phase events, and no recovery report or unsettled
action/run/schedule/custody state. SQLite integrity remains `ok`.

## Continuation checkpoint — 2026-08-30 17:58 CDT

The regular-coordinator/Lane Watch interface is now formal and live as
`campaign-coordination-interface/v1`:

- external worker activity is `observe-only` and cannot grant command
  authority;
- explicit human wave adoption creates an `imported-wave` boundary for bounded
  accounting, reconciliation, planning, and synthesis, but not dispatch;
- a proposed schedule remains imported and has no execution authority;
- exact human confirmation of the schedule digest creates
  `controller-owned-execution` only for its reserved members;
- a current durable research run owns only its exactly matched lane, and
  controlled execution settlement returns the project to imported-wave; and
- `HUMAN_RECONCILIATION_REQUIRED` is a complete capability circuit breaker.

The central classifier is consumed by lane ownership, manual reconciliation,
observer automation, wave accounting/semantics, research planning, schedule
preparation/confirmation/dispatch, compact/full projections, and the read-only
settings explanation. No mutable authority toggle or schema migration was
added. The PWA shell advanced to v94 so clients load that current authority
surface.

`bun run check` passes 134 tests and 724 assertions across 25 files under Bun
1.3.14, followed by TypeScript and Svelte with zero diagnostics. The pre-change
filesystem checkpoint is
`tmp/lane-watch-pre-coordination-interface-p2-2026-08-30.zip`. The guarded
restart loaded the change on Bun PID `458908`; all 8 Playwright scenarios pass
on localhost and all 8 pass through Tailnet. CFG23 projects `observe-only`,
authority `none`, one `observed-elsewhere` active lane, and no capabilities
beyond observation. It remained version 160 at `2026-08-30T01:01:56.135Z`,
workflow `BLOCKED`, provenance `PARTIAL`, frozen-wave `DECISION_REQUIRED`,
`HUMAN_RECONCILIATION_REQUIRED`, controlled execution 0, exactly 23 phase
events, and no recovery report or unsettled action/run/schedule/custody state.
Schema versions 1 and 2 and SQLite integrity `ok` remain intact.

## Continuation checkpoint — 2026-08-30 18:20 CDT

Receipt-bound resource calibration is implemented as
`campaign-resource-calibration/v1` with no scheduler or policy authority:

- schema migration v3 adds nullable measured tokens, measured wall seconds,
  measurement source, and measurement timestamp to durable research runs;
- exact evidence settlement freezes positive observer token telemetry and
  duration in the same update as the evidence digest, with no historical
  backfill;
- the general ledger still reports historical/live lane token telemetry, but
  marks it unbound and excludes it from calibration;
- verified completed custody receipts qualify only with App Server token
  measurement and positive duration;
- routine, coordinated, custody, synthesis, and strategy-review classes expose
  receipt-bound p50/p90/max statistics and minimum sample counts; and
- recommendations require at least three samples, use 120% of p90 rounded up
  to 10,000 tokens, never automatically lower an existing cap, remain advisory,
  and cannot mutate policy, schedule work, or grant authority.

The existing CFG23 ledger has eight known historical research token totals and
six unknown totals, but none is durably receipt-bound. The honest live
calibration result is therefore `INSUFFICIENT` with zero eligible samples and
all legacy/live estimates excluded. The PWA shell advances to v95 and presents
that distinction directly. The pre-change filesystem checkpoint is
`tmp/lane-watch-pre-resource-calibration-p2-2026-08-30.zip`.

`bun run check` passes 137 tests and 740 assertions across 26 files under Bun
1.3.14, followed by TypeScript and Svelte with zero diagnostics. The guarded
restart applied schema v3 and loaded Bun PID `462180`; all 8 Playwright
scenarios pass on localhost and all 8 pass through Tailnet. SQLite integrity is
`ok`. CFG23 remained version 160 at `2026-08-30T01:01:56.135Z`, workflow
`BLOCKED`, frozen-wave `DECISION_REQUIRED`, recovery-required, coordination
`observe-only`, controlled execution 0, exactly 23 phase events, no recovery
report, and no unsettled action/run/schedule/custody state. Its 14 historical
research rows remain unmodified with zero durable measurements.

## Continuation checkpoint — 2026-08-30 18:46 CDT

Independent strategy governance now distinguishes `epoch` and `idea-search`
reviews without creating a second execution system. Schema v4 records review
kind, request source, exact request reference, and the frozen strategy-review
token cap. Operator requests are explicit; a coordinator-requested review is
accepted only when its reference exactly matches the attached regular
coordinator thread or last turn, and still requires the operator to enqueue the
guarded action. Each request requires an available strategy slot, freezes a v2
bundle with `schedulerAuthority: none`, and starts one separate read-only Sol
thread. Idea-search output can name falsifiable directions but cannot create
research requests, launch contracts, schedules, or work. The existing human
charter activation/dismissal gate remains the only way to adopt the exact
proposal, with later research approval and dispatch gates still independent.

`bun run check` passes 138 tests and 750 assertions across 26 files with zero
TypeScript or Svelte diagnostics. The pre-change checkpoint is
`tmp/lane-watch-pre-strategy-request-provenance-p2-2026-08-30.zip`. The guarded
restart applied schema v4 and loaded Bun PID `478656`; all 8 Playwright
scenarios pass on localhost and all 8 pass through Tailnet. SQLite integrity is
`ok`. CFG23 stayed version 160 at `2026-08-30T01:01:56.135Z`, `BLOCKED`, frozen
wave `DECISION_REQUIRED`, recovery-required, and `observe-only`, with zero
controlled execution, no active review or unsettled action/run/schedule/custody
state, exactly 23 phase events, and no recovery report.

## Live service state

| Field | Captured value |
| --- | --- |
| Health | `ok: true` |
| Observer ledgers | 647 |
| Local endpoint | <http://127.0.0.1:4317/> |
| Tailnet endpoint | <https://desktop-i0p7ic0.tail4f1d0a.ts.net:4317/> |
| Binding | loopback only; Tailscale Serve supplies HTTPS |
| PWA shell | `v96` |
| Runtime | Bun `1.3.14` (`1.3.14+0d9b296af`) |
| Supervision | `run.ps1` watchdog / scheduled task |
| Listener at latest checkpoint | Bun PID `478656` (ephemeral; re-resolve before restart) |
| Runtime stability signal | `/api/health` → `runtime`; retained window currently complete |
| Hourly Codex heartbeat | canceled; no matching automation file found |
| Computer Use in this task | not injected; Playwright is available and verified |

The watchdog remains important. Retained history contains repeated Bun 1.2.18
abnormal exits and two confirmed panic markers; those historical counters do
not reset when the runtime changes. Bun 1.3.14 is now live, so future starts and
exits must be evaluated against the migration timestamp rather than treating
the retained aggregate as evidence that the new runtime has already crashed.

## Live CFG23 state: authority versus activity

### Authoritative campaign state

| Field | Value |
| --- | --- |
| Project version | `160` |
| Workflow phase | `BLOCKED` |
| Workflow provenance | `PARTIAL`; recorded `RUNNING → BLOCKED`, authority/cause/actor unknown, no backfill |
| Coordinator interface | `observe-only`; authority `none`; recovery circuit breaker active |
| Automation mode | `prepare` |
| Default dispatch profile | `sonnet-worker` |
| Frozen wave | `cfg23-wave-20260826163530-7f5110ac` |
| Frozen-wave phase | `DECISION_REQUIRED` |
| Recovery | `HUMAN_RECONCILIATION_REQUIRED` |
| Controller-owned execution | `0` |
| One-loop run | completed, `DECISION_REQUIRED → DECISION_REQUIRED` |
| Attached Lane Watch Sol | idle control fork |
| Current schedule | none |
| Research runs | 14, all `returned_to_sol` |
| Custody inbox | empty |
| Pending approvals | none |
| External steering inputs | none |

The completed one-loop run started at version 142 and ended at version 151. It
successfully crossed checked planning, plan application, bounded dispatch,
evidence return, and a new decision boundary. Its last run was
`trade37-v21-mac-no-sat-portability-preflight`, returned to Sol with a bound
evidence receipt.

The current research-request ledger contains:

- 3 `returned_to_sol`;
- 1 `approved_for_dispatch`;
- 1 `planned_followup`; and
- 15 `plan_excluded`.

There is no current resource schedule, so the remaining approved record is not
launch authority.

### Frozen old-wave accounting

The old five-member wave currently projects 4/5 accounted:

- 1 member explicitly dispositioned `REPAIR`;
- 3 members `FAILED_REVIEWABLE`; and
- `trade37-pin-lf-custody-repair-v1` still projected as `RUNNING` and
  unaccounted.

The wave record itself remains `DECISION_REQUIRED`, and its synthesis is stored
as `drafted` with decision `READY_FOR_REVIEW`. The wave aggregate reports
`EXECUTING` because of the stale running member, while the project is
`BLOCKED`. This is historical/projection disagreement, not evidence that Lane
Watch has an active worker.

The existing `campaign-wave-projection-repair/v1` diagnostic says
`NOT_NEEDED`, which is too weak for this case. It understands post-closure
accounting gaps but not the full workflow/wave/observer ownership mismatch.

### Observed external activity

One CFG23 lane is currently active and owned by the separate regular
coordinator rather than Lane Watch's durable research-run tables:

| Task | Host | Kind/model |
| --- | --- | --- |
| `v4-b01-bs21-quotient-certificate-repair-v1` | Mac | external review / Opus |

Consequently the non-authoritative activity projection says `RUNNING` with 1
active worker. `workflowMutation` is correctly `false`; the coordination
interface classifies the lane `observed-elsewhere`, and the state kernel still
reports zero controller-owned execution.

The CFG23 checkout itself was clean and synchronized at capture:

```text
branch: main...origin/main
HEAD: 7d99e91d139516489fba2866dcfaad13b5aa059e
subject: cfg23: record morning lane dispatch
```

Do not alter or stop that worker as part of Lane Watch architecture work.

## Why recovery is now required

Before the campaign-state kernel was deployed, observer-derived lane phases
could write directly into `campaign_projects.current_phase`. Durable history on
2026-08-29 contains transitions such as:

```text
DECISION_REQUIRED → RUNNING → SYNTHESIS_READY → PLANNING → RUNNING → BLOCKED
```

Those older `project.phase.changed` events do not carry authority, cause, or
actor metadata. The latest transition to `BLOCKED` does durably record
`RUNNING → BLOCKED`, so the read model reports matching `PARTIAL` provenance
while leaving authority, cause, and actor unknown. New transitions go through
`CampaignStateService` and record complete provenance. The old boundary has
intentionally not been guessed, rewritten, or backfilled.

Recent prepare-mode actions also demonstrate the ownership problem:

- several automatic `lane.reconcile` actions failed because legacy launch
  packets had no parseable `Allowed writes` list;
- some also failed `git diff --check` or topology-compliance checks;
- two later automatic reconciliations completed only to
  `CUSTODY_READY_CHECKS_REQUIRED`; and
- an automatic `synthesis.prepare` failed because the old wave still had one
  unaccounted member.

The state kernel prevents these observations from crossing the human gate, but
the automation policy should not have proposed the commands while recovery was
unresolved or for lanes it did not explicitly own.

## What is complete

### Frontend and operator experience

- Svelte owns the entire app shell; the old vanilla browser adapter is gone.
- One persistent primary action rail presents the current decision and guarded
  actions without forcing the operator to hunt down the page.
- SSE updates preserve scroll, text selection, open details, drafts, and keyed
  component state.
- XYFlow provides workflow, event-history, evidence-filter, and replay modes.
- History and lane/research evidence load lazily from project-scoped endpoints.
- Desktop and 390px mobile layouts have automated coverage.
- A recovery rail shows workflow/wave disagreement and non-authoritative
  activity, freezes an exact report, and applies only a separately confirmed
  digest-bound historical decision.

### Research wave lifecycle

- Sol synthesis can create proposed follow-up questions.
- Sol checked planning accounts for each request exactly once as keep/revise/
  drop and compiles immutable launch packets.
- Human approval is distinct from resource reservation and dispatch.
- `campaign-wave-schedule/v1` freezes a dependency-safe multi-member frontier
  under slot and token limits.
- Exact-digest human confirmation is required before dispatch.
- Bounded members can launch in parallel.
- Evidence receipts are validated, frozen, and returned to Sol as one batch
  intake boundary.
- The legacy direct one-lane dispatch action is rejected.

### One-loop autopilot

- One decision-to-decision loop is durable and inspectable.
- Start/end snapshots and every attempted step are captured.
- Pause, resume, halt-after-step, stop, attention, and completion states exist.
- Autopilot can select at most one version-checked action at a time; it has no
  direct worker authority.
- Schedule confirmation, direction, and other semantic boundaries remain human
  gates.

### Strategy, resources, steering, and custody

- Strategy has a versioned charter, epochs, three persistent tracks, measured
  progress/cost, drift signals, and independent Sol governance reviews.
- Strategy proposals cannot activate themselves; activation/dismissal are
  durable human decisions.
- External steering packets create read-only Sol redirect proposals before a
  human apply gate.
- The resource economy spans strategy, research, synthesis, and custody, but
  its scheduler remains shadow/advisory only.
- Custody is a separate inbox with immutable leases, a constrained Terra
  executor, restart recovery, measured receipts, and a second human landing
  gate.
- Custody cannot choose research direction or promote claims.

### Backend boundaries

- `ActionQueueService` owns idempotency, version checking, serialization, and
  interrupted-command recovery.
- `CampaignStateService` is the workflow-state kernel and separates observed
  activity from authoritative phase.
- `ObservationSyncService` handles worker facts, exact research receipts, wave
  member observations, and schedule landing.
- `ObserverAutomationPolicyService` can only enqueue guarded proposals, not
  execute commands directly.
- Coordinator sessions, App Server notifications, approvals, research
  planning, research execution, wave semantics, strategy, resources, custody,
  and operator transitions have extracted service boundaries.
- Browser reads use compact project projections plus dedicated history and
  evidence repositories.
- Browser mutations share one serialized stale-version-aware client.

## Current code shape

The application has 53 TypeScript modules, 26 unit/integration test files, 14 Svelte
components, a five-scenario general Playwright suite, and a three-scenario
recovery-protocol Playwright suite. Important boundaries:

| Path | Responsibility |
| --- | --- |
| `src/campaign-state-service.ts` | atomic authoritative phase/provenance settlement, observed activity, recovery diagnosis |
| `src/campaign-coordination-interface-service.ts` | three-mode regular-coordinator/Lane Watch capability boundary derived from durable human gates |
| `src/campaign-schema-migration-service.ts` | versioned transactional schema and legacy upgrades |
| `src/campaign-startup-service.ts` | ordered bootstrap recovery and first-observation execution barrier |
| `src/campaign-action-router.ts` | exact action catalog, validation, and handler parity without domain authority |
| `src/lane-reconciliation-service.ts` | ownership-gated terminal Windows coordinator process; Mac explicitly unsupported |
| `src/context-registry-service.ts` | bounded project context discovery, hashing, confinement, and durable registry refresh |
| `src/runtime-health-service.ts` | current-process and retained-watchdog health projection without supervisor control |
| `src/resource-calibration.ts` | receipt-bound sample qualification, class statistics, and advisory cap recommendations without authority |
| `src/observation-sync-service.ts` | observer-to-durable facts and exact receipt intake |
| `src/observer-automation-policy-service.ts` | guarded proposals derived from observation |
| `src/action-queue-service.ts` | command envelope, idempotency, stale versions, restart recovery |
| `src/autopilot-service.ts` | one-loop orchestration and boundary capture |
| `src/research-planning-service.ts` | Sol checked plan and immutable packet compilation |
| `src/research-execution-service.ts` | schedule, confirmation, dispatch, and batch intake |
| `src/wave-semantic-service.ts` | triage, synthesis, decisions, and external redirects |
| `src/custody-command-service.ts` | separate Terra custody lifecycle |
| `src/strategy-command-service.ts` | charter/epoch governance and snapshots |
| `src/campaign-project-reader.ts` | complete project read-model composition |
| `src/campaign-read-service.ts` | compact browser projections and lazy details |
| `src/ui/PrimaryActionRail.svelte` | persistent operator decision/action surface |
| `src/ui/CampaignFlow.svelte` | XYFlow workflow, history, filtering, and replay |
| `ARCHITECTURE.md` | current authority model and migration status |

`src/campaign.ts` is now 1,395 lines. It is mostly composition and shared
wiring, but it still owns:

- wave adoption/disposition and project-setting delegates; and
- event insertion plus numerous narrow service ports.

There is no Git repository around `math-research` or `agent-observer`, so there
is no local source history for this control-plane code. The CFG23 campaign is a
separate Git repository. Make a dated filesystem checkpoint before broad
control-plane rewrites and never treat CFG23 Git history as rollback for Lane
Watch itself.

## Remaining work, in priority order

### Completed P0 — recovery-aware automation and lane ownership

Implemented and live at the 09:16 CDT continuation checkpoint. The numbered
items remain below as the acceptance record.

1. Give `ObserverAutomationPolicyService` an explicit recovery/authority input
   and return without proposing commands whenever
   `controlState.recovery.required` is true.
2. Stop treating every active project lane as Lane Watch-owned. Add an explicit
   ownership/origin model. At minimum, automatic reconciliation should require
   an exact current schedule/run or explicitly adopted-wave membership plus an
   aligned campaign boundary.
3. Do not infer `synthesis.prepare` eligibility solely from the aggregate
   observed phase. It must be tied to the current owned wave and complete
   accounting.
4. Add regression tests proving that independently managed terminal lanes do
   not enqueue reconciliation, synthesis, adoption, or dispatch actions.
5. Surface “observed elsewhere” separately from “controlled by this loop” in
   lane cards and the workflow view.

This is the safest first implementation tranche. It can be tested entirely
with fixtures and read-only live verification; it should not change CFG23
state.

### Completed P0 — explicit historical recovery command

Implemented and live at the 09:16 CDT continuation checkpoint. Live CFG23 has
not had a report prepared or applied; that remains a deliberate human action.

The UI currently says recovery is required but offers no way to resolve it.
Add two narrowly scoped commands:

1. `campaign.recovery.prepare` freezes a read-only, digest-bound report of the
   project phase, wave phase/accounting, event lineage, controlled execution
   tables, active observer lanes, and stale/missing wave members.
2. `campaign.recovery.apply` requires an explicit human choice and the exact
   fresh digest. It may align a historical boundary, preserve a hold, or apply
   a separately validated projection repair. It must never infer a terminal
   worker result, dispatch work, accept claims, merge, or push.

Record authority, cause, actor, and before/after state in the event ledger. Add
the resulting single primary action to the recovery rail. The design should
make “archive/close an obsolete wave” distinct from “change current research
direction.”

Also strengthen `campaign-wave-projection-repair/v1` so a frozen member that is
absent or stale in the observer cannot remain indefinitely `RUNNING` while the
diagnostic says `NOT_NEEDED`.

### Completed P1 — composition-root extraction

1. **Completed 2026-08-30 09:46 CDT.** Schema creation is now a versioned,
   transactional migration service with representative legacy upgrade and
   rollback tests.
2. **Completed 2026-08-30 10:36 CDT.** Startup/bootstrap recovery now owns
   project loading, interrupted actions, custody-turn recovery, and the
   first-observation readiness barrier.
3. **Completed 2026-08-30 10:55 CDT.** The 46-action catalog and exact handler
   registry now share one typed no-authority router; the composition root has
   no action switch.
4. **Completed 2026-08-30 14:03 CDT.** Windows lane reconciliation now lives in
   a dedicated ownership-gated, terminal-only, project-root-confined process
   service. Mac remains explicitly unsupported pending separately proven
   ownership/recovery semantics.
5. **Completed 2026-08-30 14:29 CDT.** Context-source discovery, bounded reads,
   hashing, confinement, upsert, and pruning now live in a dedicated registry.
6. **Completed 2026-08-30 14:45 CDT.** Authoritative phase/version updates and
   their provenance events now settle atomically in the state kernel, including
   rollback and nested-transaction coverage. Observation-change events receive
   the same consistency while remaining non-authoritative.

The goal is for `campaign.ts` to be composition only, not to move domain logic
into another monolith.

### P1 — runtime and documentation hardening

- **Completed 2026-08-30 16:30 CDT.** Bun 1.3.14 was checksum-pinned, tested in
  isolation, atomically installed under the existing watchdog, and verified on
  localhost and Tailnet. Two checksum-verified Bun 1.2.18 rollback binaries are
  retained.
- **Completed 2026-08-30 15:55 CDT.** `/api/health` now exposes bounded retained
  watchdog starts, restarts, abnormal exits, confirmed Bun panics, and current
  process identity without supervisor-control authority.
- **Completed 2026-08-30 16:01 CDT.** README now matches connected custody,
  authoritative state/observation separation, multi-member schedules and loop,
  recovery, runtime health, and the actual guarded command inventory.
- **Completed 2026-08-30 17:02 CDT.** Legacy question/prose-based dispatch
  reconstruction was removed from projections, resource simulation, focus-task
  reuse, and scheduling. Only a current structured `READY` contract with an
  exact 40-hex base can create a launch spec; historical rows remain read-only.
- **Completed 2026-08-30 17:18 CDT.** Old phase provenance is not durably
  backfilled. A pure read-only classifier exposes only explicit matching event
  evidence, preserves a legacy `source` as cause only, marks absent fields
  unknown, and reports `backfilled: false` without rewriting the ledger.
- **Completed 2026-08-30 17:27 CDT.** Recovery presentation and protocol tests
  now live in a separate spec. Direct intercepted-action coverage locks the
  version-bound prepare envelope and exact digest/decision/rationale/
  confirmation apply envelope without mutating CFG23.

### P2 — program-level mechanization

- **Completed 2026-08-30 17:58 CDT.** A central capability classifier derives
  `observe-only`, `imported-wave`, and `controller-owned-execution` solely from
  durable human gates and is enforced across ownership, automation, planning,
  synthesis/accounting, scheduling, dispatch, projections, and UI.
- **Completed 2026-08-30 18:20 CDT.** Receipt-bound measurements and conservative
  read-only calibration now distinguish durable samples from ledger-only
  telemetry. No policy mutation or scheduler authority was added.
- **Completed 2026-08-30 18:46 CDT.** Operator and exact coordinator-requested
  epoch/idea-search reviews now bind source provenance, the current strategy
  slot and token cap, a read-only Sol task, and a separate human activation gate.
- **Completed 2026-08-30 19:35 CDT.** `campaign-program-history/v1` now derives a
  read-only epoch → wave → lane/custody hierarchy from durable rows. Wave
  ownership is explicit-snapshot-first, then time-contained, with older imported
  waves labeled rather than backfilled. The History UI exposes nested records and
  first-class metric/cost/drift start/end comparisons. CFG23 currently projects
  one epoch, one labeled pre-epoch imported wave, fourteen lanes, and zero
  custody items without rewriting history.
- **Completed 2026-08-30 20:10 CDT.** Verified Tailnet identities may now be
  fail-closed `viewer`, `operator`, or `admin` principals with exact project
  scopes. The scope covers reads, SSE, coordinator events, project routes,
  details, actions, and push. `lane-watch-operational-governance/v1` exposes
  honest Windows/Mac support plus global token/slot occupancy. Resource
  acquisitions are denied inside the globally serialized action queue when the
  shared envelope would be exceeded; the gate does not select or dispatch work.
- **Activated 2026-08-30 20:39 CDT.** The scheduled task now loads the reviewed
  `config/access-policy.json` through `run.ps1 -AccessPolicyPath`. The only
  admitted Tailnet identity, `wstrinz@github`, is `operator` for `cfg23` only;
  unknown identities fail closed and ARR15 is out of scope. Loopback remains
  local `admin/*`. A browser-level Tailnet probe verified `/api/me`, CFG23
  admission, and 403 responses for both the ARR15 API and project route.
- Keep merge, push, claim promotion, strategy activation, dispatch, and
  historical recovery independently gated.

## Verification captured with this handoff

From `infrastructure\agent-observer`:

```powershell
bun run check
```

Result on 2026-08-30:

- Vite production build passed;
- 149 tests passed, 0 failed;
- 796 assertions passed;
- TypeScript passed;
- Svelte reported 0 errors and 0 warnings.

Browser verification:

```powershell
bunx playwright test --config playwright.flow.config.ts

$env:LANE_WATCH_URL = 'https://desktop-i0p7ic0.tail4f1d0a.ts.net:4317/projects/cfg23'
bunx playwright test --config playwright.flow.config.ts
```

Both localhost and tailnet runs passed all 8 scenarios. The suites check the
desktop workflow/history/replay view including the nested program hierarchy and
boundary comparison, Svelte state stability, the recovery
rail on desktop/mobile, mobile redirect and map use, multi-member schedule
presentation, the separate custody executor rail, and the exact recovery
prepare/apply request envelopes. Recovery POSTs are intercepted by fixtures;
the suites do not dispatch or record a live CFG23 decision.

The deployed shell is PWA cache v99 on Bun 1.3.14 PID `35824`, supervised by
PowerShell PID `35012` with the explicit policy path in its command line.
Watchdog history shows 106 starts and 105 restarts with the two older retained
panic markers.
Post-deploy SQLite integrity is `ok`; campaign migrations remain versions 1–4.
CFG23 remains version 160 at `2026-08-30T01:01:56.135Z`, workflow `BLOCKED`,
frozen wave `DECISION_REQUIRED`, with zero controlled actions, runs, schedules,
custody work, reviews, or active loop execution. The current external Mac lane
was observed as blocked and was not reconciled, adopted, interrupted, or otherwise
mutated.

## Safe operations

Read-only state checks:

```powershell
Invoke-RestMethod 'http://127.0.0.1:4317/api/health'
Invoke-RestMethod 'http://127.0.0.1:4317/api/control?view=compact&project=cfg23'
Invoke-RestMethod 'http://127.0.0.1:4317/api/snapshot?view=compact&project=cfg23'
```

Before restarting:

1. Re-read control state.
2. Confirm zero queued/running actions, controlled research runs, and custody
   leases.
3. Resolve the exact loopback listener PID with `netstat -ano`.
4. Verify that PID is Bun; stop only that process.
5. Let `run.ps1` restart it.
6. Confirm health and compare project version, workflow phase, wave phase, and
   active controlled execution before/after.

Never stop the Tailscale listener, clear Serve routes, expose Bun beyond
loopback, or use Funnel. Do not delete `data\observer.sqlite`, synthesis
bundles, receipts, or campaign worktrees. A build rewrites `public\ui.js` and
`public\ui.css`; bump the PWA shell/cache version whenever shell assets change.

## Guardrails that remain non-negotiable

- Inspect live controller state before any action; never duplicate dispatch.
- Observer activity is evidence, not workflow authority.
- A human gate remains required for research direction, checked-plan approval,
  schedule confirmation, dispatch, historical recovery, strategy activation,
  claim promotion, merges, and pushes.
- Sonnet is the routine worker default.
- Opus-led fan-out is exceptional and limited to Sonnet children.
- `research-opus-max` is for synthesis, adversarial review, and idea extraction,
  not ordinary work.
- Custody work stays outside the frontier queue and cannot acquire mathematical
  authority.
- Do not test control mutations against live CFG23 when fixtures or mocked
  browser projections suffice.
- This task still lacks injected Computer Use controls. Use Playwright for
  automated browser verification unless a future task actually exposes the
  Computer Use skill and screen/mouse/keyboard tools.

## 2026-08-31 asymmetric-lab live wave and landing boundary

- The operator-confirmed schedule `5bd7d4a0-8663-400b-85ab-b7e34e2364c6`
  dispatched only `asym-reduced-slack-liftability-lab-v1`; the other three
  checked contracts remain parked under the token envelope.
- The Sonnet worker landed commit
  `0422728da6772a0d3122038960c2be252db7787a`. Two separate coordinator
  compatibility/custody commits followed on the same isolated branch:
  `f09577f01fd5ee1fe489a1a6e07449af684fb2c5` adds the canonical terminal
  `verdict`, and `97b7d6513ba4f49bfc75b6b1ddad247a31d287c0` refreshes three documentation
  hashes that had become stale after the receipt was first generated.
- Result: `INCONCLUSIVE` at the packet's explicit inventory stop. The primary
  37-class corpus yielded 14 fully orientable types and 8 with trivial
  automorphism. Three additional already-custodied types also qualified. All
  11 combined types are pairwise nonisomorphic, leaving an exact 11/12 gap.
  Reduced-slack and liftability measurements were therefore not run.
- The final committed receipt digest is
  `sha256:eab8a1a951c5edbe0bc8b1b5dad34bcf903b50cf736fb1b6e0a519d7619755d1`.
  All 26 declared artifacts independently reproduce from canonical-LF bytes.
- Lane Watch now revalidates hashes for committed and already-`evidence_ready`
  receipts, honors CFG23's canonical-LF digest convention, and treats
  `evidence_ready` as an unsettled controlled execution boundary. This prevents
  both committed-receipt hash bypass and the false historical-recovery rail
  that previously hid normal `RESEARCH_INTAKE`.
- Full verification after these changes: Vite build passed; 152 tests and 816
  assertions passed; TypeScript passed; Svelte reported 0 errors and 0
  warnings. The supervised deployment is Bun 1.3.14 PID `2180`.
- Live proofs:
  `live-proofs/2026-08-31-v101/06-asymmetric-lab-live-execution.png` and
  `live-proofs/2026-08-31-v101/07-asymmetric-lab-receipt-landing-gate.png`.
- The operator accepted the exact receipt through the live **Accept receipt &
  continue** gate at `2026-08-31T19:17:15Z`. Action
  `08983ad4-437d-451c-b5b5-fe9ef2fe7fff` completed, the schedule is
  `completed`, and run `846eca31-fa53-4a52-a5ca-5a1f7a46888e` is
  `returned_to_sol`.
- CFG23 advanced to version 176 and `SYNTHESIZING` with no recovery required.
  The frozen read-only synthesis bundle is
  `data/synthesis-bundles/cfg23-wave-20260826163530-7f5110ac-research-70b81e4c.json`
  with digest
  `sha256:70b81e4cecb5bbc3b692ca73132ee7e5eb0e0e045b440f3d99f5db5c1c0d203b`.
  Sol turn `01a05941-203d-7cd2-a524-205c9f0694ec` completed at
  `2026-08-31T19:24:59Z`. CFG23 is now version 177 at `DECISION_REQUIRED` with
  synthesis decision `RESEARCH_REQUIRED`. The operator brief reports the exact
  11/12 inventory gap, recommends bounded semantic replay/scope repair, and
  keeps the reduced-slack/liftability assay and large BS21 pilot parked. No
  claim was promoted and no successor was dispatched.
- Acceptance proof:
  `live-proofs/2026-08-31-v101/08-asymmetric-lab-receipt-accepted.png`.
- Resource warning: observer telemetry reports 148,741 tokens against the
  schedule's 80,000-token reservation. The current scheduler treats the cap as
  admission accounting rather than a hard runtime stop. Review this overrun
  before dispatching the next reserved lane.

## 2026-09-01 budget preflight and Epoch 2 proposal gate

- PWA cache v104 adds a shared loop-start readiness contract. Live CFG23 now
  reports `canStartLoop=false`, `code=EPOCH_BUDGET`, 80,000 tokens required,
  and 4,906 schedulable. The guard executes before loop creation or checked-plan
  approval, so the blocked attempt consumes no workflow transition.
- The exact live independent epoch review is
  `162f3f55-eb3f-4795-a656-2fc9e3d0c1ec`, bound by
  `sha256:d69fb087f0604517786d102c0bc46043a63c849a616b4fc2939e1aa2108ebc9e`.
  It completed read-only with zero scheduler authority and recommends
  `ACTIVATE_NEW_EPOCH`, but remains `drafted` and unactivated.
- The proposal is a three-wave, 1,000,000-token shadow epoch with 240,000 per
  wave, a 15% reserve, two research slots, zero tolerated unreported runs, and
  40/30/30 coverage/supply/decision weights. Row 41 and bounded C2 forensics
  come first; a single BS21 proof-object pilot waits for demonstrated budget
  discipline. Three custody candidates remain inert unless the exact charter
  is activated and each lease later passes its own human gate.
- The review exposed a digest-documentation ambiguity: a strategist initially
  compared the canonical semantic digest with the pretty-printed file hash.
  Bundle schema v3 now embeds algorithm, canonicalization, and digest-scope
  metadata, and the prompt states the distinction explicitly.
- Verification: 157 unit/integration tests with 840 assertions, TypeScript and
  Svelte with zero diagnostics, and all 9 live Playwright scenarios passed
  after deployment. The supervised listener is Bun 1.3.14 PID 32036.
- Proofs:
  `live-proofs/2026-09-01-v104/all-jobs-overview-local-v104.png`,
  `live-proofs/2026-09-01-v104/autopilot-preflight-mobile-v104.png`,
  `live-proofs/2026-09-01-v104/campaign-line-workflow-desktop-v104.png`, and
  `live-proofs/2026-09-01-v104/strategy-epoch-2-proposal-gate-v104.png`.

## 2026-09-01 persistent autopilot control

- The operator advanced the checked research plan to `RESEARCH_READY`, making
  CFG23 version 183, but did not activate the drafted Epoch 2 charter. The old
  epoch therefore still has only 4,906 schedulable tokens.
- PWA cache v105 keeps **Start one-loop autopilot** visible while blocked,
  removes the impossible **Freeze wave schedule** action, and provides a live
  **Review Epoch 2 resource proposal** route that opens and scrolls to the
  exact human activation gate.
- Direct `research.schedule.prepare` calls now use the same shared readiness
  contract and return the actionable resource-envelope blocker before schedule
  construction instead of leaking `PARK_BUDGET` internals.
- Verification remained 157 tests / 841 assertions with zero TypeScript or
  Svelte diagnostics. All nine live Playwright scenarios passed as a set; the
  final desktop and mobile focused checks also passed after the copy adjustment.
  No live mutation was submitted during verification.
- Proof: `live-proofs/2026-09-01-v105/autopilot-control-desktop-v105.png`.
