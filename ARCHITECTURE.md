# Lane Watch control-plane architecture

Lane Watch is being migrated from one page-sized controller into a set of
durable campaign domains. The migration keeps the current operator workflow
running while authority is moved only after its replacement has explicit
invariants, receipts, and tests.

## Control hierarchy

1. **Epoch strategy** sets the mathematical portfolio, outcome metrics,
   redirection triggers, and provisional resource policy. Independent Sol work
   proposes changes; a human activates a versioned charter.
2. **Wave orchestration** freezes a coherent set of bounded member lanes,
   accounts for every member, and produces one synthesis boundary. A wave may
   contain multiple parallel lanes; a lane is not itself a wave.
3. **Lane execution** answers one falsifiable question under an immutable
   launch contract and returns a structured receipt.
4. **Custody service** repairs, verifies, archives, and preserves provenance
   outside the strategic research queue.

Strategy, research, synthesis, and custody share a metered resource economy.
The resource scheduler and extracted wave aggregate remain projections: they
can explain and freeze recommendations but have no execution authority. The
custody service now has its own narrow, human-gated execution authority.

## Current boundaries

| Boundary | Module | Authority |
| --- | --- | --- |
| Strategy charter and drift | `src/strategy.ts` | Advisory; human-gated activation |
| Strategy governance commands | `src/strategy-command-service.ts` | Foundation, resource-bound epoch/idea-search Sol reviews with exact request provenance, human activation/dismissal, and durable strategy snapshots |
| Shared resource ledger | `src/resources.ts` | Shadow simulation only |
| Receipt-bound resource calibration | `src/resource-calibration.ts` | Read-only statistics and advisory recommendations; no policy or scheduler authority |
| Resource simulation commands | `src/resource-command-service.ts` | Persists digest-bound simulations; never schedules or dispatches |
| Wave aggregate | `src/wave.ts` | Projection only |
| Wave commands and persistence | `src/wave-commands.ts`, `src/wave-repository.ts` | Transactional adoption, observation sync, and dispositions |
| Wave scheduling | `src/wave-schedule.ts`, `src/wave-schedule-repository.ts` | Human-confirmed fixed resource reservation |
| Coordinator sessions | `src/coordinator-session-service.ts` | Task discovery/attachment, read-only conversation, writer recovery, interrupt, and operator messaging |
| Wave semantics and steering | `src/wave-semantic-service.ts` | Frozen triage/synthesis/redirect bundles, read-only Sol interpretation, and explicit human apply gates |
| Semantic lane planning | `src/research-planning-service.ts` | Frozen Sol review bundle, structured checked plan, immutable packet compilation, and human approve/revise/block gate |
| Research execution | `src/research-execution-service.ts` | Checked-plan frontier, exact schedule confirmation, parallel bounded launch, batch evidence intake, and Sol synthesis handoff |
| One-loop autopilot | `src/autopilot-service.ts` | Durable boundary capture, operator pause/stop controls, and one guarded queued action at a time; no direct execution authority |
| Campaign state kernel | `src/campaign-state-service.ts` | Atomic validated workflow transitions with authority/cause provenance; separate non-authoritative activity observations and explicit recovery mismatches |
| Workflow provenance projection | `src/campaign-workflow-provenance.ts` | Read-only explicit-fields-only classification of current phase evidence; never rewrites or backfills the ledger |
| Coordinator interface | `src/campaign-coordination-interface-service.ts` | Derives observe-only, imported-wave, and controller-owned-execution capability boundaries solely from durable human gates |
| Observer synchronization | `src/observation-sync-service.ts` | Observer facts into wave membership, bounded evidence receipts, schedule landing, and non-authoritative activity projection |
| Observer automation policy | `src/observer-automation-policy-service.ts` | Converts settled facts into guarded reconcile, triage, or synthesis proposals; no direct execution authority |
| App Server notification reconciliation | `src/codex-notification-service.ts` | Sanitized live activity plus turn-owned durable completion routing; no independent command authority |
| Durable action queue | `src/action-queue-service.ts` | Idempotent, globally serialized, project-version-checked command settlement; execution supplied by domain dispatch ports |
| Typed action router | `src/campaign-action-router.ts` | Exact compile-time/runtime command catalog and handler parity; no domain authority |
| Campaign schema migrations | `src/campaign-schema-migration-service.ts` | Versioned, transactional campaign schema creation and legacy upgrades; no domain authority |
| Campaign startup recovery | `src/campaign-startup-service.ts` | Project/foundation bootstrap, interrupted action and custody recovery, and the first-observation execution barrier |
| Lane reconciliation | `src/lane-reconciliation-service.ts` | Ownership-gated terminal Windows coordinator process; Mac explicitly unsupported |
| Context registry | `src/context-registry-service.ts` | Bounded project-file discovery, hashing, confinement, and durable context refresh; no workflow authority |
| Runtime health | `src/runtime-health-service.ts` | Read-only current-process identity and bounded watchdog transcript projection; no supervisor control |
| Request access policy | `src/access-policy.ts` | Fail-closed viewer/operator/admin admission and project scoping across HTTP, SSE, actions, routes, and push |
| Operational governance | `src/operational-governance.ts` | Scoped host-support inventory and global quota occupancy projection; no host or scheduler authority |
| Multi-project quota admission | `src/multi-project-quota-service.ts` | Global token/slot enforcement at serialized resource-acquisition commands only |
| App Server approval inbox | `src/codex-approval-service.ts` | Coordinator request capture and explicit operator response; custody requests remain isolated |
| Exceptional authority transition | `src/operator-transition-service.ts` | DOC-A1 exact-byte preflight and explicit human-confirmed Git/state transition |
| Custody contracts | `src/custody.ts` | Human-ready inbox and separate custody slots |
| Custody executor | `src/custody-command-service.ts`, `src/custody-protocol.ts`, `src/custody-executor.ts` | Inbox transitions, exact lease and receipt gates, isolated Terra worktree, recovery, and escalation denial |
| Strategy, custody, and resource reader | `src/campaign-domain-reader.ts` | Read-only SQL composition of the three domain projections |
| Campaign project reader | `src/campaign-project-reader.ts` | Typed-port composition of project, wave, research, history, and index views |
| Browser read projections | `src/campaign-read-service.ts`, `src/campaign-read-repository.ts`, `src/projections.ts` | Project-scoped, read-only summaries with lazy exact detail |
| Program history projection | `src/program-history.ts` | Read-only epoch/wave/lane/custody hierarchy and start/end comparisons; labeled assignment provenance with no backfill |
| Guarded browser commands | `src/ui/campaign-actions.ts` | Serializes UI mutations; server remains authoritative |
| Transitional composition root | `src/campaign.ts` | Existing durable command execution |

The browser command client gives every Svelte surface one write path:

`refresh → current version → enqueue → poll → bounded stale retry → final refresh`

Mutations are serialized per project so two independently rendered controls do
not manufacture avoidable version races. Idempotency keys remain distinct
across a stale retry. All validation and authority still live on the server.

Tailnet identity is now a request-scoped principal rather than only an audit
string. An explicit policy maps each verified login to `viewer`, `operator`, or
`admin` plus exact projects; unknown users fail closed. Loopback remains local
admin, and the legacy allowlist remains an all-project operator compatibility
mode until an explicit map is configured. Project scope filters compact and full
reads, event streams, lane/detail routes, coordinator events, project HTML, and
push subscriptions. Only operator/admin principals may enter the existing
guarded action path.

`MultiProjectQuotaService` runs inside the globally serialized action queue
after the version check and immediately before resource acquisition. It admits
strategy review, synthesis, schedule confirmation, legacy research dispatch,
and custody confirmation only when their fixed token commitments and slot pools
fit the configured global envelope. It does not select work, confirm a gate, or
dispatch anything. `lane-watch-operational-governance/v1` exposes the same
envelope and a host inventory that distinguishes observed/declarative Windows
and Mac facts from actual controller support; Mac dispatch and reconciliation
remain explicitly unsupported.

## Project-scoped browser read model

The Svelte client no longer needs the page-wide campaign and observer objects
for ordinary rendering. Its initial requests and SSE subscription identify one
selected project and request compact, versioned projections. The campaign
projection keeps a small all-project index for navigation but includes only the
selected project's control surface. Historical research receipts retain their
status and evidence summary while large evidence bodies are omitted. Observer
lane cards retain current status and identity while output, activity, and
timeline collections are loaded only when the operator opens a lane. Durable
workflow history keeps a 24-event live preview in the control projection; the
larger ledger is paged backward with an opaque cursor only after Replay or
History is opened.

The server has a separate `CampaignReadService` boundary. Compact HTTP and SSE
updates construct only the selected campaign with summary-only research rows
and 24 recent events, then join a lightweight all-project index. They do not
materialize unrelated strategy, custody, wave, or receipt graphs. A dedicated
read-only SQLite repository serves the complete durable event ledger and exact
research evidence, so opening history or evidence does not rebuild the campaign
command aggregate. The monolithic full snapshot remains a compatibility path,
not the PWA's normal read path.

Project view composition no longer lives in the command aggregate.
`CampaignProjectReader` owns the read queries and shapes the project, wave,
research, coordinator, history, and index views through an explicit typed port.
`CampaignDomainReader` owns the read-only SQL and composition for strategy,
custody, and the shared resource ledger; resource composition calls the other
two projections directly. `CampaignControl` now supplies only narrow read ports
and command-owned state, while `snapshot()` and `indexSnapshot()` delegate.
`StrategyCommandService` owns charter/epoch foundation, independent review
bundles, proposal validation and activation, and strategy boundary receipts.
`ResourceCommandService` owns frozen shadow simulations. Command workflows
retain thin delegates during the migration, so their authority and receipts are
unchanged without duplicating domain logic. `CampaignSchemaMigrationService`
owns the complete campaign SQLite shape and its explicit component version
ledger. Every pending migration is applied in one transaction before any
domain service is constructed; a failed or unknown/non-contiguous upgrade
aborts startup without partially advancing the schema. The ledger is scoped to
the campaign component rather than SQLite's global `user_version`, because the
same database also contains independently owned push tables.
`CampaignStartupService` owns the ordered transition from a constructed control
plane to executable command processing. It loads manifest projects and their
strategy foundations, freezes ambiguously interrupted actions, reconciles
in-flight custody turns, and then remains `awaiting-first-observation`. The
first observer pass may synchronize facts and enqueue guarded proposals while
the action queue is inert. Only after the complete pass settles does the
startup service resume queued execution. A failed bootstrap or failed observer
pass cannot open that barrier.
`ContextRegistryService` owns the bounded filesystem-to-SQL context mirror used
by later planning and synthesis reads. Each observation considers the fixed
campaign documents, at most the five newest Markdown queue plans, and launch
packets named by active observed project lanes. Candidates must resolve inside
the project root, fit the 512,000-character bound, and are stored with byte and
time metadata plus a SHA-256 content address. Successfully observed source IDs
prune stale rows; a pass in which every optional source is absent preserves the
last usable registry. This service cannot interpret content, change campaign
state, enqueue work, or grant an observed lane command authority. The browser
projects those `queue-plan` rows as a receive-only packet inbox. Its
staged/hold state is derived from context plus the existing recovery boundary;
it is not a second workflow state machine and cannot promote a packet into
executable work.
`RuntimeHealthService` projects current process identity and the retained
watchdog transcript into `lane-watch-runtime-health/v1`. It reports starts,
restarts, abnormal exits, confirmed Bun panic markers, latest exit details, and
whether the two-million-character diagnostic window was truncated. Unknown
nonzero exits remain labelled abnormal rather than being promoted to confirmed
panics. The boundary reads but never writes the transcript and has no ability to
spawn, stop, or restart a process; `/api/health` remains a liveness response
while its separate stability field exposes historical reliability.
`CustodyCommandService` owns its
complete command lifecycle as one boundary: inbox state, immutable leases,
isolated Terra dispatch, protocol simulation and replay, turn telemetry and
finalization, producer commit freezing, restart recovery, exact receipt landing
or rejection, and automatic denial of authority expansion. The transitional
root retains only the migration invocation and thin command/notification
routing.
`ResearchExecutionService` now owns the complete mechanical research boundary:
it derives the dependency-safe frontier from the checked plan, binds resources
and launch contracts into a digest, reserves and confirms the exact multi-lane
schedule, launches reserved members in parallel, and accepts validated batch
receipts into an immutable synthesis bundle. Starting the Sol synthesis turn is
part of that evidence handoff; interpreting or approving the resulting plan is
still a separate coordinator and human boundary.
`CoordinatorSessionService` owns task eligibility, attachment, sanitized
conversation access, writer recovery, interrupts, and operator messages. Sol
consumers no longer reproduce active-writer and unreadable-rollout recovery.
`ResearchPlanningService` consumes that session boundary and owns the semantic
lane-plan lifecycle: it freezes synthesis, strategy, redirect, prior-run, and
operator-transition grounding; requests one structured read-only Sol plan; and
compiles only a human-approved, exactly-accounted plan into immutable launch
packets. Plan interpretation remains separate from resource reservation and
execution, so approval cannot silently dispatch work.
Launch-spec resolution is deliberately strict: only a retained checked-plan
lane with `contract.status = READY` and an exact 40-hex `contract.baseRef` can
produce a schedule candidate. Question regexes, operator-guidance prose,
project-default profiles, and historical task-name mappings have no launch
authority. Old requests and completed runs remain readable as durable history;
an incomplete old plan must be revised through the coordinator and human gate.
`WaveSemanticService` owns the semantic transitions around mechanical wave
accounting: terminal-wave triage, synthesis preparation and review, and
external steering intended to break tunnel vision. Each Sol turn reads a
digest-bound bundle under a read-only sandbox. Triage dispositions, synthesis
direction, and redirect proposals remain inert until their corresponding human
gate applies them. The service can pause an active one-loop run when steering
arrives, but it cannot launch research or bypass checked-plan and schedule
confirmation.
`AutopilotService` owns one decision-to-decision loop as durable orchestration
state. It captures exact start and end boundaries, records each attempted
action, implements pause, resume, halt-after-step, stop, and attention states,
and maps the current campaign phase to at most one guarded action. It never
executes a lane or calls a worker directly: every selected step enters the same
version-checked action queue as an operator command. Re-entrant action and
coordinator notifications are coalesced so a phase transition cannot be lost,
while schedule confirmation, blocked synthesis, and unresolved direction stay
explicit human gates.
`CampaignStateService` is the sole durable workflow-state writer. Every phase
change must be an allowed transition and records who or what had authority,
why it changed, and (when available) the actor. Worker activity is stored in a
separate projection with `workflowMutation: false`; it can explain what is
happening without claiming that a human or semantic boundary was crossed. The
authoritative project update and its `project.phase.changed` provenance event
now share one SQLite transaction and timestamp; either both commit or both roll
back. The transaction composes through SQLite savepoints when a domain command
already owns an outer transaction. Observation projection changes and their
non-authoritative events use the same consistency rule without gaining workflow
authority. The project read model exposes both views. Its historical workflow
provenance projection is deliberately evidence-preserving: it reads only fields
that are already present in the matching durable event, treats an older explicit
`source` field as cause evidence only, and reports absent authority, cause, or
actor as unknown. It classifies the boundary as `COMPLETE`, `PARTIAL`,
`STALE_OR_UNMATCHED`, or `MISSING`; it never rewrites the ledger or manufactures
a backfill. If the durable workflow and frozen wave
disagree while no controlled execution remains active, the kernel reports a
human-owned recovery boundary instead of silently choosing one history.
`ObservationSyncService` is the single observer-to-durable-state boundary. It
matches worker lanes to research runs, validates terminal receipts, performs
the narrowly bounded evidence-freezing repair when required, advances exact
schedule members, and publishes derived worker activity without changing the
workflow phase. Its one phase-writing exception is the lifecycle of a durable
research run already owned by the controller: matching a launched run to its
receipt may advance that exact execution boundary. It does not reconcile an
unknown lane, request triage, prepare synthesis, or enqueue work; those remain
separately gated orchestration decisions after observed facts settle.
Only a guarded campaign command, coordinator result, controlled run receipt,
or explicit human decision may cross a workflow boundary. Observer activity
may update facts and wave accounting but cannot manufacture progress.
`ObserverAutomationPolicyService` consumes those settled facts and decides
whether the configured automation mode may propose reconciliation, terminal
wave triage, or synthesis preparation. It has no domain-command callback and
cannot touch campaign or Git state directly: every proposal is an idempotent,
project-version-bound action that must settle through `ActionQueueService`.
The policy is also a recovery and ownership circuit breaker. It proposes
nothing while `CampaignStateService` reports human reconciliation required.
Automatic lane reconciliation is limited to an exact current research run or,
when the workflow and wave are aligned, an explicit member of the current
frozen wave. Synthesis preparation requires that same aligned current wave,
complete accounting, and matching `SYNTHESIS_READY` workflow/wave phases; an
aggregate observer phase can never create that authority.
`CampaignCoordinationInterfaceService` formalizes the relationship between a
regular campaign coordinator and Lane Watch without adding a mutable authority
toggle. External activity is `observe-only`. Explicit human wave adoption
creates an `imported-wave` boundary for bounded accounting, reconciliation,
planning, and synthesis, but never dispatch. Exact human confirmation of a
digest-bound schedule creates `controller-owned-execution` authority only for
its reserved members; a proposal alone has no authority. When controlled
execution settles, the project returns to the imported-wave boundary. Recovery
is a complete circuit breaker for every capability. Planning, wave semantics,
automation, reconciliation, scheduling, dispatch, read projections, and the UI
consume this same `campaign-coordination-interface/v1` contract.
`LaneOwnershipService` is the shared command-authority classifier used by both
observer automation and the manual reconciliation command. A lane is
controller-owned only when it matches an active durable research run in the
current wave, or is an explicit member of the aligned current imported wave.
Everything else is labelled `observed-elsewhere`. In particular, a recovery
boundary removes adopted-wave command authority even if the observer still
shows a terminal lane; displaying activity never grants the dashboard or API
permission to reconcile it.
`LaneReconciliationService` owns the subprocess side of that exact command. It
first requires the shared ownership classification, then a Windows terminal
lane and a configured local coordinator whose resolved path stays inside the
project root. The coordinator is invoked as a fixed argument array from that
root, receives the exact task id, and is killed after five minutes if it does
not settle. Nonzero exits become bounded action failures and successful output
is trimmed into a bounded receipt. Mac execution is deliberately unsupported;
this extraction does not infer platform-equivalent custody or recovery
semantics.
`CampaignRecoveryService` owns the exceptional human historical-recovery
transaction. Preparation is read-only with respect to workflow and wave state:
it freezes the exact idle boundary, event lineage, controlled execution,
observer evidence, projection-repair plan, allowed choices, and invariants in
a durable `campaign-recovery-report/v1` record bound to a SHA-256 digest.
Application requires the prepared report id, exact digest, literal human
confirmation, and one explicit decision. It recomputes the report before any
mutation and rejects stale state. The supported decisions preserve the hold,
align only the wave to workflow, align only workflow to wave, or apply a fully
mechanical projection repair supported by still-present terminal evidence.
No recovery choice infers a worker result, dispatches work, promotes claims,
merges, or pushes.
`CodexNotificationService` owns App Server event reconciliation for the shared
Sol coordinator and independent strategy reviews. It maintains a sanitized,
ephemeral live-turn projection and routes completed turn output to the durable
record that already owns that turn: synthesis, triage, checked planning,
redirect, or strategy review. Custody notifications retain first refusal in
their isolated executor. Notification arrival can wake autopilot after durable
state changes, but the service cannot manufacture or execute an action.
`ActionQueueService` owns the durable command envelope rather than any domain
command. It validates the allowlisted action type, deduplicates the bounded
idempotency key, serializes queued work, rechecks the exact project version at
execution time, and freezes either a result or failure receipt. The
composition root supplies the action-type dispatch callback, so the queue
cannot acquire research, custody, strategy, merge, or approval authority of
its own. Autopilot is notified only after a durable action settles.
`CampaignActionRouter` derives the exported action type and runtime validation
set from one immutable catalog. Its mapped registry requires exactly one
handler for every catalog entry, and construction rejects missing or extra
runtime handlers. The composition root supplies closures into existing domain
services; the router imports no campaign aggregate, database, worker, Git, or
coordinator service and cannot execute anything independently.
On startup, a command still marked `running` is treated as having ambiguous
external effects: it receives a durable recovery-attention failure and is never
replayed automatically. Commands still marked `queued` provably did not cross
the execution boundary; they resume only after the first observer snapshot is
fully synchronized through `CampaignStartupService` and still undergo the
normal project-version check.
`CodexApprovalService` owns App Server approval-request custody. Requests from
the campaign coordinator become visible durable inbox records, and responses
are possible only through the same guarded action queue with an explicit
accept, decline, or cancel decision. Requests owned by the isolated custody
executor are routed there first and never enter the campaign coordinator
inbox.
`OperatorTransitionService` isolates the exceptional DOC-A1 authority change
from routine research orchestration. Its preflight requires a clean checked-out
main branch, proves the frozen staging lineage is mergeable, reads candidate
bytes from immutable Git objects, and binds their hashes into a durable preview
receipt. Execution requires the literal human approval phrase plus that exact
fresh receipt digest, re-runs the preflight, writes only the declared canonical
paths, freezes the successor receipt, and then updates the checked-plan boundary.
It never runs from observer or autopilot policy and does not push.

`GET /api/research-run?project=…&id=…` and `GET /api/lane?id=…` are explicit
lazy-detail boundaries. `GET /api/workflow-history?project=…&limit=…&cursor=…`
is the chronological history boundary. `GET /api/program-history?project=…`
derives the nested epoch → wave → lane/custody view and its recorded strategy
boundary deltas. It prefers explicit wave-bound snapshots, then creation-time
containment, and labels pre-epoch historical imports without writing a backfill.
These routes return full allowlisted records or
pages without adding write authority. The original unscoped `/api/control` and
`/api/snapshot` responses remain temporarily available for compatibility, while
the browser uses `view=compact` for initial refresh, manual refresh, and SSE.
Project changes close the old event stream before opening a newly scoped one,
and stale stream events are ignored by generation so they cannot overwrite the
current view.

## Wave aggregate invariants

`campaign-wave-aggregate/v1` makes the intended multi-lane boundary explicit:

- membership is frozen when the wave is adopted;
- duplicate members and unknown dispositions are invalid;
- every member must be mechanically accounted or explicitly dispositioned;
- synthesis requires complete wave accounting;
- a closed wave is immutable history, not a queue for successor work; and
- the projection cannot dispatch, reconcile, synthesize, or change phase.

If a legacy campaign has already crossed synthesis while a member still has an
unaccounted runtime state, the projection reports
`CLOSED_WITH_ACCOUNTING_GAP`. It does not revive or disturb that worker. The
gap remains an explicit migration invariant to repair before the aggregate can
receive write authority.

`campaign-wave-projection-repair/v1` is the read-only diagnostic companion to
that invariant. It compares each gap with current observer evidence and reports
whether the system must wait, inspect durable history, reconcile custody, or
could prepare a separately gated projection-sync proposal. It always declares
`authority: none`, `mutation: none`, and `applicable: false`; diagnosis alone
can never rewrite history or infer a terminal worker outcome.

Wave adoption, member observation updates, and single or batched dispositions
now pass through `WaveCommandService` and one transactional `WaveRepository`.
CampaignControl remains the composition root for project-version changes,
events, Sol turns, and later phase commands while the rest of its wave writes
are migrated. The aggregate continues to provide no execution authority.

## Resource-bounded wave schedules

`campaign-wave-schedule/v1` replaces the one-lane pilot selector with an
immutable dependency-frontier schedule. It ranks the checked contracts, then
reserves as many independent members as fit both the available research slots
and the smaller of the wave token cap and spendable epoch envelope. It records
every deferred contract as `WAIT_DEPENDENCY`, `WAIT_SLOT`, `PARK_BUDGET`,
`OPERATOR_GATE`, or `INVALID_CONTRACT`; deferred work is never silently
dropped or borrowed into the launch set.

A proposed schedule declares `authority: none-until-confirmed` and cannot
launch. The operator must confirm its exact content digest after the control
plane rechecks the checked-plan and resource bindings. Dispatch then reserves
all members transactionally before launching them concurrently. Partial launch
failure is explicit and cannot duplicate the members that did launch.

Research intake is a wave boundary rather than a first-finisher boundary. The
controller waits until every scheduled member is evidence-ready, failed, or
already returned, then freezes `campaign-research-intake/v2` with every valid
receipt and any launch failures. Only that batch is returned to Sol synthesis.
The legacy direct one-lane action remains recognizable for old receipts but is
rejected as an execution path.

## Isolated custody execution

Custody work has a distinct lifecycle and never borrows the campaign
coordinator or a research slot:

`ready contract → frozen lease → exact confirmation → detached Terra worktree
→ measured receipt → human landing gate`

The lease binds the campaign Git revision, acceptance criteria, allowed path
globs, repair generation, effort class, wall-time/path/token envelopes, and the
authority exclusions. Confirmation reserves that exact digest but starts no
worker. Dispatch creates one detached worktree, gives only that worktree write
access, disables network access, and runs `gpt-5.6-terra` without permission to
spawn children, redirect research, promote claims, merge, or push.

At turn completion the controller compares the structured steward report with
the actual worktree, checks that Git history still equals the lease base,
meters App Server tokens when reported, and freezes allowed changes as a
detached producer commit. The item becomes `verifying`; no campaign checkout
changes yet. A second exact-digest human gate either rejects the receipt or
rechecks a clean, conflict-free landing and cherry-picks the producer commit.
The landing creates no push and grants no mathematical claim authority.

Running executor turns are keyed durably by lease, thread, and turn. On restart
the controller resumes their App Server subscriptions and finalizes any turn
that completed while the observer was unavailable. Any unexpected sandbox or
network escalation request is declined rather than converted into a new gate.

## Migration sequence

1. Move all Svelte mutations to the shared guarded command client. **Complete.**
2. Extract and expose the read-only multi-lane wave aggregate. **Complete.**
3. Move wave adoption, observer member transitions, and disposition batches
   into a transactional wave repository and command service. **Complete.**
4. Replace one-lane autopilot steps with a human-gated wave schedule that can
   reserve several dependency-safe members under the resource policy, launch
   them concurrently, and return one batch evidence boundary. **Complete.**
5. Connect custody through its lease protocol as a separate executor and queue.
   **Complete.**
6. Remove the legacy browser adapter after its remaining controls have Svelte
   equivalents and one persistent action rail. **Complete.** The browser now
   has one Svelte-owned event store for observer snapshots, campaign state,
   coordinator activity, routing, connection health, and manual refresh. Live
   updates mutate keyed components instead of replacing page markup, so
   selection, scroll, open inspectors, and input drafts remain stable.
7. Centralize workflow state, provenance, activity observation, and recovery
   mismatch handling. **Complete.** The browser now receives a versioned
   `campaign-control-state/v1` view and surfaces idle historical divergence as
   an explicit recovery review rather than an inferred phase rewrite.
8. Calibrate resource policy from complete receipts before considering any
   scheduler authority beyond recommendations. **Complete as an advisory
   boundary.** Schema v3 freezes explicit research token/wall-time measurements
   with accepted evidence receipts, excludes unbound telemetry, and projects
   per-class sample sufficiency and conservative recommendations without policy
   mutation. Scheduler authority remains `none`.

At every step, strategy changes, dispatch, synthesis acceptance, claim
promotion, merge, and push remain explicit gates until separately authorized.
