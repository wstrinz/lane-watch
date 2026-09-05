# Lane Watch

Tailnet-only PWA and bounded control plane for observing and coordinating
campaign research. Lane Watch has durable epoch, wave, lane, and custody state;
a version-checked action queue; host-local Codex App Server coordination;
human-confirmed multi-member schedules; digest-bound planning, synthesis, and
recovery; and a separate lease-gated Terra custody executor.

The ongoing domain extraction and authority boundaries are recorded in
[`ARCHITECTURE.md`](ARCHITECTURE.md).

## Campaign play

The campaign home presents a next move, actual activity, recent completed
results, and a bounded autopilot entry point. Ready moves honor queue
dependencies; queue labels do not imply that a worker is running. The collapsed
campaign library retains evidence, history, scheduling, recovery, and settings.
Result cards use the existing hash-verified document reader.

“Explore this move” opens a Sol, Terra, or Astra consultation in the attached
Codex conversation. It sends a version-checked `coordinator.message.send` action
with an explicit adviser model and read-only turn settings. Advice refuses to
steer a working coordinator and does not alter its saved model. Shared context
is not an independent review. Advice does not approve evidence or launch research.

Research autopilot still uses the existing checked loop and resource gates.
Selecting a queue move supplies adviser context; it does not select or authorize
a research dispatch contract. Turning advice into a reviewed successor contract
and smoother decision-to-decision progress remain the next integration steps.

`tests/campaign-adviser.test.ts` checks the server turn boundary;
`e2e/campaign-play.pw.ts` covers desktop/mobile navigation, verified result
reading, and a mocked adviser request. The browser test does not spend model
tokens or launch research.

## Data model

Lane Watch combines the durable coordinator ledgers declared by
`hub/projects.json` with live Claude job state from
`~/.claude/jobs/<job-id>/state.json`. It also reads the latest local timeline
entries and landing-check records. Active Mac ledgers are enriched by one
bounded SSH state refresh against the configured Mac host every 15 seconds.
For local Claude sessions it also joins subagent metadata, reporting the actual
agent type and resolved model rather than inferring either from a display name.

The API deliberately emits a normalized allowlist. It does not serve launch
packets, raw transcripts, environment variables, MCP configuration, or arbitrary
files from worktrees. The coordinator conversation endpoint is a separate
allowlist that projects only user and assistant message text plus turn status;
tool items, reasoning, commands, and raw App Server events remain private.

The PWA uses project-scoped read projections rather than downloading the full
multi-project control plane on every update. `/api/control`, `/api/snapshot`,
`/api/refresh`, and `/api/events` accept `view=compact&project=<id>`. Compact
control responses include a small `projectIndex` for navigation and one selected
project; large research evidence bodies are fetched from `/api/research-run`
only when needed. Compact observer responses omit lane output and timeline
detail, which `/api/lane` supplies when a lane is opened. Campaign history keeps
24 recent events in the live projection and pages older events from
`/api/workflow-history` when Replay or History is opened. That endpoint and exact
research evidence use a dedicated read-only SQLite repository rather than
rebuilding the campaign command aggregate. Unscoped full responses remain
available for compatibility and diagnostics.

History also loads `GET /api/program-history?project=<id>`, a read-only nested
epoch → wave → lane/custody projection with strategy start/end comparisons.
Explicit wave-bound strategy snapshots determine ownership first; otherwise the
projection uses creation-time containment and visibly labels pre-epoch imported
waves. It never rewrites or backfills durable history.

## Campaign control

### Strategy shadow layer

Campaign Control maintains a versioned strategy charter and active campaign
epoch alongside the mechanical lane state machine. The initial charter keeps
three persistent tracks—global coverage, positive supply, and candidate
decision—with configurable allocation targets. Maintenance and audit work are
charged to the track they support; they never become a fourth research track.

Each terminal synthesis records a durable wave-boundary strategy snapshot.
Structured progress deltas distinguish mathematical movement from activity,
while the strategy engine computes measured allocation, known and missing
resource costs, maintenance streaks, track concentration, and absence of
frontier motion. The dashboard exposes these as advisory drift signals.

This layer currently runs in **shadow mode**. Its charter and signals are
included in immutable synthesis, redirect, research-intake, and lane-plan
bundles, and Sol must return explicit strategic assessments and lane
classifications. The strategy engine does not yet approve, reject, or dispatch
work. Existing human and immutable-contract gates remain authoritative while
the policy is calibrated against real campaign history.

Epoch governance is deliberately separated from the regular campaign
coordinator. An operator can freeze the current ledger into an independent,
read-only strategy-review bundle and start a dedicated `gpt-5.6-sol` task. That
task cannot message or interrupt the wave coordinator, alter campaign phase,
dispatch work, or activate its own result. Its structured proposal exposes an
epoch diagnosis, exact portfolio weights, metrics, stop/continue/start choices,
redirection triggers, and custody-service candidates.

Activation is a separate human gate. It validates that the proposal still
targets the current charter revision and epoch, requires all three strategic
tracks exactly once with weights summing to one, closes the prior measurement
boundary, records an immutable charter revision, and opens a new shadow epoch.
It intentionally leaves campaign phase, coordinator state, and dispatch state
unchanged. Dismissal is also durable, so rejected strategy alternatives remain
part of campaign history rather than disappearing from the interface.

The control hierarchy is campaign epoch → research wave → lane lifecycle, with
custody as a separately metered service layer. The durable one-loop autopilot
orchestrates one decision-to-decision interval through the same guarded action
queue as the operator. Its research step uses an immutable multi-member wave
schedule; it does not treat one lane as a wave or dispatch around confirmation
gates.

Loop start also has a shared, side-effect-free resource preflight. Before it
creates a loop row or approves a checked plan, the preflight resolves the exact
dependency-ready contracts and proves that at least the cheapest candidate fits
the current wave and epoch envelopes. A blocked start reports the required and
schedulable token amounts without consuming a workflow transition.
The primary autopilot control remains visible in that state, impossible
schedule actions are suppressed, and an enabled resource-gate action opens the
exact strategy proposal needed to unlock the loop.

The campaign page is organized as one stable command center. Autopilot lives in
the sticky application header and exposes Start, Pause, Resume, or the current
blocker without requiring page navigation. A compact five-stage tracker keeps
Plan → Launch → Run → Land → Decide visible above the current action and loop
controls. Objective grounding, packet intake, the full branching map and
history, evidence, strategy, and system controls remain available in collapsed
drawers instead of competing with the active process.

The History surface mirrors that hierarchy from durable rows and keeps the
chronological event graph alongside it. Each epoch shows recorded metric, cost,
and drift values at its start and latest end boundary; an active baseline-only
epoch is labeled as incomplete instead of manufacturing a delta.

### Shared resource economy

The campaign now has one provisional resource ledger spanning independent
strategy reviews, ordinary research, synthesis, and custody. Each versioned
charter carries an epoch token envelope, a smaller wave envelope, per-kind token
caps, a redirect reserve, and separate strategy, research, and custody slot
pools. The ledger distinguishes measured usage, missing usage, already-approved
commitments, spendable capacity, and reserve rather than treating every queued
task as interchangeable activity.

A deterministic shadow scheduler ranks bounded candidates by blocking value,
readiness, frontier value, priority, token cap, and available slot pool. Its
only outputs are `SCHEDULE`, `GATE`, `WAIT`, and `PARK` recommendations. It has
no worker or coordinator handle and cannot dispatch, consume an operator gate,
or alter campaign phase. An operator may freeze the current input and decisions
into an immutable, digest-bound simulation receipt; replayable history makes it
possible to compare planned resource choices with later outcomes before any
real scheduler authority is considered.

Independent Sol epoch reviews must propose and explain the next provisional
resource policy alongside track weights and research objectives. Policy
activation remains the existing human charter gate. Missing token receipts and
overcommitment are first-class warnings, so the system surfaces cost blindness
instead of manufacturing false precision.

The same isolated review lane also supports bounded independent idea search.
Every request records whether it came directly from an operator or from an
exact attached-coordinator thread/turn reference, reserves the current strategy
slot and strategy-review token cap, and runs read-only. Coordinator prose alone
cannot start a review. The result remains an inert charter alternative until a
human activates it; research planning, scheduling, and dispatch retain their
separate gates.

Each review bundle self-describes its SHA-256 binding, canonical JSON
serialization, and digest scope. The semantic digest excludes only the final
top-level `bundleDigest` field and is intentionally distinct from a checksum of
the pretty-printed file bytes.

Resource calibration is a separate read-only projection. Research token and
wall-time measurements are durably frozen only when the exact terminal evidence
receipt is accepted; custody measurements qualify only from verified completed
receipts with App Server token telemetry. Historical observer totals and live
lane estimates remain useful in the ledger but are explicitly excluded from
calibration. Per-class p50/p90/max statistics and conservative cap suggestions
appear only after minimum sample counts, remain advisory, never lower a current
cap automatically, and cannot change policy or grant scheduler authority.

### Custody service boundary

Custody is now a separate durable inbox rather than a research lane kind.
Human-activated strategy proposals may stage bounded custody candidates, but
staging creates no worker and spends no resources. Every candidate identifies
the strategic track that bears its cost, its required capability, urgency,
blocking status, repair generation, effort class, allowed paths, acceptance
checks, receipt type, and hard stop condition.

The reversible inbox lifecycle is `proposed → ready ↔ parked`. Only a human can
mark a complete contract ready. `ready` deliberately does not mean `running`:
a human must freeze an exact 24-hour `campaign-custody-lease/v1`, review its
digest, and confirm that revision before dispatch. The lease binds the campaign
Git boundary, allowed paths and effects, forbidden effects, acceptance checks,
repair generation, and fixed effort-class budget. Repair generations beyond the
charter limit and incomplete contracts cannot become ready.

After exact confirmation, the connected adapter may start one isolated
`gpt-5.6-terra` steward in a detached worktree with network disabled and no
child-agent authority. Completion is measured against the real worktree and
freezes an exact receipt plus producer commit. A second human gate must review
and land that receipt; dispatch alone cannot change the campaign checkout.
Simulation and replay remain available for zero-effect protocol verification.
Custody cannot choose research direction, promote claims, alter campaign phase,
merge, push, or broaden its own contract.

The dashboard reads authoritative workflow phase from the durable
`CampaignStateService` transition graph. Observer-ledger activity is stored in a
separate projection with `workflowMutation: false`; it can explain motion but
cannot cross a workflow boundary. If workflow and the frozen wave disagree at
an idle boundary, the kernel reports `HUMAN_RECONCILIATION_REQUIRED` and the
recovery rail offers a separately digest-bound human decision. The standing
automation mode is `prepare`: once the current owned wave is fully accounted,
Lane Watch may freeze a private SHA-256-bound evidence bundle under
`data/synthesis-bundles/`. This does not accept claims or edit campaign truth.

The workflow read model includes `provenance` metadata for the event associated
with the current durable phase. Its status is `COMPLETE`, `PARTIAL`,
`STALE_OR_UNMATCHED`, or `MISSING`, and its transition/evidence fields show
exactly what the ledger supports. Missing authority, cause, and actor remain
unknown; a legacy explicit `source` may supply cause evidence but no other
field. This is a read-only `explicit-fields-only-no-ledger-rewrite` policy:
historical events are not rewritten and `backfilled` remains `false`.

The read model also exposes `campaign-coordination-interface/v1`. It has three
derived modes rather than a mutable authority switch: external work is
`observe-only`; explicit human wave adoption creates `imported-wave` mechanics
for accounting, reconciliation, planning, and synthesis; and exact human
confirmation of a digest-bound schedule creates
`controller-owned-execution` for only its reserved members. Imported waves and
schedule proposals cannot dispatch. Recovery disables every command capability,
and observation can never upgrade the mode. The future-run settings panel shows
the current mode and its durable reason.

Waves are first-class before synthesis. **Adopt active lanes** freezes wave
membership, and every member receives an accounting state. Successful custody,
failed reviewable receipts, and blocked work are automatically accounted as
evidence. Running or mechanically unreconciled work requires an explicit
`REPAIR`, `SUPERSEDE`, `ABANDON`, or `CARRY_FORWARD` disposition with a reason
before the wave can close. This lets failure inform synthesis without silently
turning it into accepted campaign truth.

When a stopped wave still has unaccounted lanes, **Ask Sol to triage** resumes
the already attached coordinator task and gives it a frozen, digest-bound copy
of the wave evidence. The turn is read-only and returns structured disposition,
blocker, research, and next-step recommendations. The proposal is persisted in
the dashboard, but it changes no campaign state until a human chooses **Apply
Sol recommendations**. In `propose` or `bounded` mode this triage request is
queued automatically after all wave lanes stop running; application remains an
explicit audited action.

Synthesis bundle v2 also freezes a context registry: the campaign manifest,
charter, checkpoint, frontier, evidence policy, operations guide, topology
profiles, recent queue plans, and wave launch packets, each with a SHA-256
digest. The UI exposes context freshness without serving source contents.

Incoming DKC research context belongs in
`campaigns/<project-id>/packets/queue/YYYY-MM-DD-short-slug.md`. The packet
inbox shows the five newest bounded queue plans and their digests. Dropping a
file there is receive-only: it does not create requests, compile a launch
contract, confirm a schedule, or dispatch work. See `PACKET-INTAKE.md` for the
recommended packet fields and the full authority chain.

Use **Find Codex tasks** to attach one durable Sol coordinator to a project.
Codex task discovery uses App Server's local stdio protocol; no raw App Server
WebSocket is exposed to the browser or tailnet. Starting a synthesis turn is a
separate explicit action. It uses a read-only sandbox and a structured output
schema. Any App Server command or file approval is projected back into the UI
for an explicit decision.

If the attached task is already owned by another App Server writer (for example,
the desktop app), Lane Watch creates one persistent control-plane fork, preserves
the original task ID as provenance, and rebinds future control turns to that
fork. This retains stored coordinator history without interrupting or stealing
the interactive desktop writer. The coordinator card shows both IDs.

An attached coordinator also has a rudimentary conversation panel. History is
read with App Server `thread/read` without acquiring another writer. Sending a
message starts a read-only turn when Sol is idle or uses `turn/steer` when its
current turn is still active. Live task events refresh the transcript, and any
supported approval request remains an explicit dashboard decision. The panel
preserves the reader's scroll position across those refreshes, renders a safe
Markdown subset, and presents structured triage output as readable sections.

While a turn runs, Lane Watch projects App Server events into a separate live
session surface over SSE: streamed Sol commentary, readable reasoning
summaries, plan-step status, and expandable command, file, web, MCP, and
subagent activity metadata. It auto-syncs durable history when message items or
the turn complete. Raw reasoning, stdout/stderr, diffs, and arbitrary tool
argument values are intentionally excluded from the browser projection.

The project page foregrounds one lifecycle focus card with the current stage,
the facts that justify it, and the next available guarded action. Applied
triage, completed wave accounting, context, and control history collapse into
closed records so prior evidence remains inspectable without competing with the
current decision.

Completed structured synthesis enters a decision inbox. `Accept proposal`,
`Request research`, `Request revision`, and `Block` create durable decision
records. Research requests from Sol become a visible proposed run-plan queue
with an explicit `queued → plan review → approved for dispatch/revision
requested/blocked` human gate. Approval moves the campaign to
`RESEARCH_READY`; it does not claim independent research occurred, create
evidence, or dispatch a worker.

The recommended layout is to start the Sol control-plane task at the shared
repository root. Attaching it to a campaign creates an explicit logical binding;
it does not require the task cwd to equal the campaign directory. Lane work and
reconciliation remain rooted in the campaign directory, while synthesis keeps
the Sol task's original cwd so it can also inspect shared infrastructure. Tasks
outside the shared repository are shown for clarity but cannot be attached.

The allowlisted controls are:

- attach or interrupt the Sol coordinator;
- read its sanitized conversation and start or steer a read-only turn;
- adopt active lanes into a first-class wave and record lane dispositions;
- ask the attached Sol task to triage unaccounted terminal lanes, then explicitly
  apply its digest-bound recommendations;
- run local mechanical reconciliation for a terminal Claude lane;
- select the project automation mode;
- prepare a frozen synthesis bundle;
- ask the attached Sol task for a synthesis proposal;
- review a synthesis proposal and materialize its research requests; and
- begin and resolve the human research-review gate without dispatching workers;
- freeze, confirm, and dispatch an exact resource-bounded multi-member schedule;
- return a fully settled schedule as one bounded evidence-intake boundary;
- pause, resume, halt, or stop one durable decision-to-decision autopilot loop;
- prepare and explicitly apply a digest-bound historical recovery decision;
- govern shadow strategy revisions and resource simulations through their own
  human gates;
- prepare, confirm, dispatch, review, land, or reject an isolated custody lease;
- answer supported Codex command or file-change approvals.

Every mutation is queued with an idempotency key and expected project version.
The service validates project, version, coordination mode, ownership, lane,
phase, host, schedule, and task state again before execution. There is no
arbitrary command endpoint.
Research dispatch requires an exact checked plan and separately human-confirmed
schedule; custody dispatch requires an exact confirmed lease. Lane Watch does
not merge, push, or promote `FRONTIER.md` claims, and no observer or autopilot
policy may consume a human gate.

A retained lane becomes schedulable only when its checked-plan entry declares
`contract.status: READY` and an exact 40-hex `contract.baseRef`. Historical
question text, operator prose, old task-name patterns, and project profile
defaults cannot reconstruct a launch contract. Historical requests and runs
remain readable from their durable records, but missing structured authority
must go back through planning and the human gate.

### Campaign interpretation and Research Atlas

The project page places a persistent interpretation layer between packet intake
and the operational campaign line. Its director deck answers three distinct
questions: the campaign's North Star, the current quest, and the human decision
that is actually available now. A change ledger and scope/watchout rail keep the
latest evidence from silently becoming a broader conclusion than its receipt
supports.

The Research Atlas renders the same read model as three connected strategy
tracks: global coverage, positive supply, and candidate decision. Claims,
checked proposals, and historical runs appear as typed stations. Selecting a
station opens its evidence, scope, expected unlocks, and educational context;
the Object Codex explains the mathematical objects and proof machinery without
asserting new campaign facts.

Interpretation is deliberately not authority. Visible status words preserve the
boundary: `SUPPORTED` means supported only within displayed evidence and scope;
`PROPOSED` is a checked or suggested next move that has not run; `UNMEASURED`
marks a missing measurement; and `BLOCKED` records a refutation, stop condition,
or unresolved blocker. Only durable receipts, checked plans, schedules, and
existing human gates may change campaign state. Historical run strategy is read
from its immutable confirmed schedule when available, so a newer plan cannot
retroactively reclassify old work.

## Run locally

```powershell
bun install
pwsh -NoProfile -File .\run.ps1
```

Then open `http://127.0.0.1:4317`.

Project selection is addressable and persistent at `/projects/<project-id>`;
for example, `/projects/cfg23`. The server returns the application shell for
those routes, so reload, installed-PWA relaunch, and browser Back/Forward retain
the selected campaign. Shell assets are versioned and revalidated rather than
held in the HTTP cache across deployments.

For a reboot-safe Windows deployment, register and start the included task from
an elevated PowerShell session. It triggers at startup and user logon, uses stable
executable paths, and supervises the server if Bun exits:

```powershell
pwsh -NoProfile -File .\install-task.ps1 `
  -AllowedTailscaleUsers "your-login@example.com"
```

The watchdog transcript is written to `data/scheduled-task.log`. Its retained
history is also exposed read-only at `GET /api/health` under
`runtime.watchdog`: start/restart counts, abnormal exits, confirmed Bun panic
markers, and the latest exit code and timestamps. `runtime.process` reports the
current PID, Bun version, start time, and uptime. Historical abnormal exits do
not make the currently healthy listener fail its liveness check; inspect the
separate `runtime.stability` value when evaluating runtime reliability.

`run.ps1` launches the exact `%USERPROFILE%\.bun\bin\bun.exe` path. Treat a Bun
change as a supervised deployment: checksum and test the candidate in isolation,
preserve the current executable, confirm the controller has no active work,
replace only after validating the exact loopback listener, then rerun the full
localhost and Tailnet browser matrices. The currently verified deployment is
Bun 1.3.14; machine-specific rollback hashes and paths are recorded in the
canonical control-plane handoff.

## Tailnet deployment

The app must stay bound to localhost. Expose it with Tailscale Serve:

```powershell
tailscale serve --bg http://127.0.0.1:4317
```

Serve provides HTTPS, tailnet access control, and verified
`Tailscale-User-Login` headers. Set `OBSERVER_ALLOWED_TAILSCALE_USERS` (or pass
`-AllowedTailscaleUsers` to `run.ps1`) to a comma-separated allowlist. Direct
headerless access is accepted only from loopback.

For per-user roles and project scopes, set `OBSERVER_ACCESS_POLICY_JSON`, pass
`-AccessPolicyJson`, or pass `-AccessPolicyPath` to `run.ps1`. A file-backed
policy is preferred for the scheduled task because its exact contents remain
reviewable without command-line quoting. An explicit policy takes precedence over
the legacy allowlist and fails closed for unknown users:

```powershell
$env:OBSERVER_ACCESS_POLICY_JSON = '{"users":{"reader@example.com":{"role":"viewer","projects":["cfg23"]},"operator@example.com":{"role":"operator","projects":["*"],"mutableProjects":["cfg23"]}}}'
```

This deployment's scheduled task loads `config/access-policy.json`. Its current
Tailnet admission lets `wstrinz@github` read all projects while submitting
guarded mutations only for `cfg23`; update that reviewed file and restart the
supervised listener when the access map must change.

`viewer` may read only its listed `projects`. `operator` and `admin` may submit
guarded actions only in `mutableProjects` (which defaults to `projects` for
backward compatibility); campaign gates remain authoritative. Mutation scope
must be a subset of read scope. Loopback without a proxy identity is local admin. HTTP reads,
project indexes, SSE, coordinator activity, project routes, lane details, and
push delivery all use the same scope. When no explicit policy is configured,
the existing allowlist remains backward-compatible as operator access to all
projects.

Do not use Tailscale Funnel for this service.

## PWA notifications

The first server start creates VAPID keys and a small SQLite database under
`data/`. Select **Enable alerts** from the installed PWA to subscribe. Push
notifications are emitted for managed completion, failure/blocking, and the
transition where Claude is terminal but coordinator reconciliation remains.
The installed icon badge is the number of currently working or idle lanes;
lane-start and terminal pushes keep it updated while the PWA is closed.
Subscriptions retain the authenticated project scope and never receive lane
events from another scope.
The header refresh button forces an immediate local rescan and Mac SSH state
refresh instead of waiting for the watcher/heartbeat cycle.

On iOS, add the page to the Home Screen before enabling alerts.

## Environment

`bun run dev` watches and rebuilds the UI served by the existing Lane Watch
server. It does not start another campaign controller. Refresh the existing
page after the build. Use the normal supervised server for the live campaign;
backend experiments need an isolated `OBSERVER_DATA_DIR`, fixture
`OBSERVER_PROJECT_MANIFEST` and separate port.

Campaign startup claims one local writer before opening or recovering its
database. `/api/health` includes the process and controller instance identity.
A possibly live owner blocks takeover; there is no time-based expiry or forced
unlock. Stop only a verified obsolete controller, then let the normal watchdog
recover. Worker termination and launch recovery remain separate checks.

- `OBSERVER_PORT` — local port, default `4317`
- `OBSERVER_HOST` — bind address, default and required deployment value `127.0.0.1`
- `OBSERVER_ALLOWED_TAILSCALE_USERS` — comma-separated login allowlist
- `OBSERVER_ACCESS_POLICY_JSON` — fail-closed viewer/operator/admin and project map
- `OBSERVER_GLOBAL_TOKEN_COMMITMENT_QUOTA` — shared active commitment cap, default `240000`
- `OBSERVER_GLOBAL_STRATEGY_SLOT_QUOTA` — shared active strategy/synthesis slots, default `1`
- `OBSERVER_GLOBAL_RESEARCH_SLOT_QUOTA` — shared active controlled research slots, default `3`
- `OBSERVER_GLOBAL_CUSTODY_SLOT_QUOTA` — shared active custody slots, default `1`
- `OBSERVER_MAC_HOST` — SSH host for Mac job-state enrichment, default `macbook`
- `OBSERVER_PROJECT_MANIFEST` — alternate research hub manifest
- `OBSERVER_CLAUDE_HOME` — alternate local Claude state directory
- `OBSERVER_DATA_DIR` — alternate private state directory
- `OBSERVER_VAPID_SUBJECT` — VAPID contact URI
- `OBSERVER_CODEX_BIN` — optional path or command name for the local Codex CLI
- `OBSERVER_PWSH_BIN` — optional PowerShell executable for coordinator actions;
  defaults to `pwsh`, then Windows PowerShell on Windows

## Verification

```powershell
bun run check
```

## September 4 research reset

Executable custody leases now require an explicit inputManifest in the acceptance
contract: immutable Git commit/path/SHA-256 entries, explicit record IDs and an
expected count when needed, and an optional host requirement. Preparation and
dispatch verify exact blob bytes before creating an agent. Legacy contracts
without a manifest remain visible and cannot dispatch; a revised review or
reshape must supply their inputs. These checks establish input availability,
not mathematical acceptance. Source checks are bounded to 32 files, 5 MiB per
file, and 16 MiB total.

Custody counts distinguish landed receipts from superseded contracts. Each
item displays the full cost of its reshape ancestry and descendants, including
unknown measurements. Research strategy costs are explicitly scoped to research;
the overview also shows all-layer campaign spend from the resource ledger.

New planning bundles require a PASS experiment-validity:<requestId> check for
each retained experiment. Its justification covers the legal domain, possible
outcomes, controls, and decision consequences. The controller enforces review
completion; it does not decide mathematical validity automatically.

Redirect intake offers two distinct choices. Keeping a review as campaign
context records `mode: context-only`, preserves its complete response for later
review, and adds no research requests or phase/schedule changes. Staging the
directions records `mode: stage-directions` and uses the existing planning
gate; this remains the legacy API default when mode is omitted. Schema migration
5 preserves the application mode, and future planning/strategy context carries
it explicitly. Neither mode activates strategy, resources, claims or workers.

An operator-applied redirect that stages directions can reopen an idle RESEARCH_READY launch gate,
superseding the old plan and unconfirmed schedules. Confirmed schedules and
unsettled research prevent this transition. The strategy workspace can reconcile
an exact recorded review turn after a lost completion notification, without
starting another agent or accepting interrupted commentary as a proposal.

## Guided campaign page and terminal receipt recovery

The main campaign page presents a compact stage indicator and one next-action
card. The compass, full automation controls, process ledger, and specialist
workspaces remain available in expandable context sections. Schedule preparation
and dispatch call their own commands; they do not require resuming an old loop.
An exhausted launch budget does not prevent receipt intake.

A valid terminal verdict with invalid artifact custody is awaiting_evidence,
not a failed research launch. Existing failed imports carrying a receipt error
are rechecked against the same job identity; they can recover without another
worker. artifact_paths supports the existing path-to-hash map or a directory
allowlist accompanied by a task-relative artifact_hashes_file. Referenced files
must have exact SHA-256 entries and stay inside the task directory. A wildcard
alone never passes validation.

Known runtime gap found on September 5 UTC: launchLocalResearch passes task,
profile, packet and base to local_agent_coord.ps1, but does not forward
ResearchLaunchSpec.tokenBudget or timeoutMinutes. The BS21 pilot recorded
776,641 tokens against an 80,000-token reservation. Reservations must not be
represented as enforced runtime ceilings. The resource workspace explicitly
shows this limitation. No larger budget, retry, or new research is authorized
by receipt recovery; fix and verify worker-runtime enforcement before further
local research. Custody and semantic authority remain separate from execution
status; an inconclusive result does not change the accepted denominator.

The production local research adapter now refuses dispatch during runtime preflight, before run/request/schedule mutation, while token/time enforcement remains unverified. This is containment, not a runtime cap. Result review remains available.

Campaigns can publish a bounded receive-only work queue at `packets/queue/campaign-queue.json` (`lane-watch-work-queue/v1`). The existing context registry hashes it and the campaign guide renders its status and dependencies in one expandable section. Queue records never authorize dispatch. The overnight execution ledger is `OVERNIGHT-QUEUE.md`.

Queue items may include up to six `results`: `{ id, title, path, revision, sha256 }`, with a project-relative Markdown/text/JSON path, full Git commit and raw blob SHA-256. The read-only `/api/queue-result?project=…&item=…&result=…` route resolves only a declared reference after the normal project access check. It reads the frozen Git blob with a 256 KiB limit and five-second timeout per Git command, checks its hash and never follows checkout symlinks, hydrates cold objects or executes content. The queue reader displays escaped text, basic document structure and source details; raw Markdown remains available. Source references are shown as text. Reading a result does not stage a request, accept evidence or add its full contents to coordinator context.
