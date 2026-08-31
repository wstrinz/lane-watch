# Lane Watch control-plane handoff

Captured: 2026-08-26 15:22 CDT  
Workspace: `C:\Users\wstri\dev\math-research`  
Application: `infrastructure\agent-observer`  
Live project: `cfg23`  
Live UI: <https://desktop-i0p7ic0.tail4f1d0a.ts.net:4317/projects/cfg23>

## Resume prompt

Continue building Lane Watch, the local/Tailnet campaign control plane in
`C:\Users\wstri\dev\math-research\infrastructure\agent-observer`. Read this
handoff and `README.md` first. The live `cfg23` campaign is in
`RESEARCH_REVIEW` with five proposed requests. Do not confuse the existing
`research.review.start` status transition with actual research dispatch: no
research agent is launched and no evidence is attached yet. Preserve the
guardrails, do not mutate the live campaign merely to test UI, and run the
browser verifier against localhost before the Tailnet URL.

## Executive state

Lane Watch has grown from a lane observer into a functioning first slice of a
campaign control plane. It uses the Codex App Server as the Sol coordinator
backbone and treats Claude/`claude agents` state as a leaf execution source.
It now has durable project/wave state, guarded actions, coordinator attachment
and chat, live sanitized session activity, terminal-lane triage, frozen
synthesis bundles, synthesis decisions, and a readable research-review queue.

The current loop has reached the research seam:

```text
worker wave -> accounting -> Sol triage -> frozen synthesis bundle
  -> Sol synthesis -> human requested research -> 5 proposed requests
  -> MISSING: dispatch, evidence intake, independent review, return to Sol
```

The next meaningful milestone is not another visual pass. It is to turn the
five proposed research questions into first-class, controllable research runs
with enforced topology, tools, evidence receipts, and a safe return path to Sol.

## Original design intent

The intended standing topology is:

- one Codex Sol coordinator per project;
- bounded work dispatched in waves;
- Opus may be used as a worker/coordinator, but Opus workers may fan out only
  to Sonnet children in the standing profile;
- worker count and child fan-out must be declarative and enforced rather than
  repeated unreliably in prompts;
- terminal waves go through accounting, synthesis, and usually independent
  research review before the next wave;
- a dedicated research lane should have strong web/research tools and high or
  max reasoning;
- Codex App Server is the core control backbone; Claude Agents CLI is a leaf
  execution extension;
- the eventual UI should expose topology, state, evidence, controls, and the
  human-readable coordinator stream across agents and machines.

## Live `cfg23` snapshot

| Field | Value |
|---|---|
| Phase | `RESEARCH_REVIEW` |
| Durable project version | `8` |
| Automation mode | `prepare` |
| Coordinator | `Set up Devils-Kettle campaign · Lane Watch control` |
| Coordinator task | `01a03f09-5f54-7580-89ca-4d1a4cd498f3` |
| Coordinator status | idle |
| Reasoning effort | high |
| Current wave | `cfg23-wave-20260826163530-7f5110ac` |
| Wave accounting | `5/5` |
| Triage | applied |
| Synthesis storage status | drafted |
| Synthesis recommendation | `RESEARCH_REQUIRED` |
| Human synthesis decision | `research` at `2026-08-26T18:54:52.582Z` |
| Research requests | 5, all `proposed` |
| Frozen context | 15 sources |
| Recorded control actions | 8 |
| Observer health | healthy on `127.0.0.1:4317` |

The frozen bundle is:

`data\synthesis-bundles\cfg23-wave-20260826163530-7f5110ac-c8758383.json`

Evidence digest:

`sha256:c87583839283dd268beb6cd79b9b1440168f807ecc5d181ee6b2a82ed94e109c`

Context digest:

`sha256:e100c38836e14caa50c53369dc90bcf900566e947bd0137f5d9f957da20ddcfb`

The synthesis classified the five source lanes as:

- 1 `ADMIT`;
- 2 `INCONCLUSIVE`;
- 2 `REPAIR`.

It proposed seven claim-ledger changes:

- 3 `NO_CHANGE_ACCEPTED`;
- 2 `OPEN`;
- 1 `REPAIR_PENDING`;
- 1 `SUPPORTED_CUSTODY_ONLY`.

It also proposed four next-wave lanes with total requested fan-out of six.
Those lanes have not been dispatched.

### Proposed research questions

1. Rebuild all 37 corrected pins from a clean Git archive and compare canonical
   byte hashes, semantic fingerprints, class IDs, incidence/matroid data, and
   queue order; decide whether both `pin_sha256` and a semantic digest must gate
   every SAT run.
2. Repair and freeze `INTERFACE.md` sections 2–3, then independently replay the
   Class 61/63/64 ruler profiles using bare-safe frames and the declared
   scalar-cost grammar.
3. Inventory the preserved Class-61 CEGAR worktree/checkpoint without trusting
   solver summaries; decide whether it is resumable, needs custody salvage, or
   should be superseded by a clean v2 run.
4. Cold-resolve fixed-matroid orientation for Classes 61, 63, and 64. Any UNSAT
   closes only `CLEAN_MINIMAL` unless all compatible completions are covered.
5. After the pin audit, run the 37 Trade candidates sequentially or in
   deterministic shards. A checker-accepted orientation preempts the queue for
   exact geometry; proof-carrying UNSAT remains fixed-matroid scoped.

### State discrepancy worth addressing

The campaign phase is correctly held at `RESEARCH_REVIEW`, but the global lane
observer currently reports 5 active lanes, 1 running, and 4 blocked. These are
the old adopted-wave lane registrations and can visually conflict with the
fact that wave accounting is closed at 5/5. The UI now foregrounds the research
handoff and folds the source wave away, but the underlying lifecycle vocabulary
still needs an explicit distinction between active registration, active
execution, historical wave membership, and current campaign work.

## What is built

### Observation and normalization

- Joins durable coordinator ledgers with local Claude job state, timelines,
  landing checks, and subagent metadata.
- Performs bounded Mac enrichment over SSH.
- Reports actual Claude agent type/model and topology observations.
- Emits an allowlisted snapshot; raw launch packets, transcripts, environment,
  MCP configuration, and arbitrary worktree files are not exposed.

### Durable campaign state

- SQLite-backed projects, coordinators, waves, wave lanes, triage, synthesis,
  context sources, decisions, research requests, approvals, events, and queued
  actions.
- Every mutation uses an idempotency key and expected project version.
- Project/lane/phase/host/task state is revalidated at execution time.
- First-class wave adoption and per-lane accounting.
- Explicit `REPAIR`, `SUPERSEDE`, `ABANDON`, and `CARRY_FORWARD` dispositions.

### Sol coordinator via Codex App Server

- Discovers attachable Codex tasks from the campaign or shared workspace root.
- Attaches one durable coordinator per project.
- If another App Server owns the source task writer, creates and remembers a
  control-plane fork rather than stealing the interactive writer.
- Reads sanitized conversation history without taking a writer.
- Starts read-only turns when idle and steers the active turn when running.
- Projects supported command/file approval requests for explicit human action.
- Streams sanitized commentary, readable reasoning summaries, plan state, and
  tool/activity metadata over SSE.
- Excludes raw reasoning, stdout/stderr, diffs, and arbitrary tool arguments.

### Wave accounting, triage, and synthesis

- Adopts active lanes into a frozen wave membership.
- Derives mechanical/reviewable accounting states.
- Sends an unaccounted terminal wave to Sol for structured triage.
- Requires explicit human application of Sol's triage proposal.
- Freezes a SHA-256-bound synthesis bundle and 15-source context registry.
- Requests structured synthesis from the attached Sol task.
- Renders synthesis JSON as a readable rundown with expandable lane, claim,
  contradiction, research, next-wave, and raw-audit sections.
- Exposes human `accept`, `research`, `revise`, and `block` decisions.

### Research-review slice

- A `research` synthesis decision materializes structured requests in SQLite as
  `proposed`.
- The current UI clearly foregrounds those requests and folds completed
  synthesis/session/source-wave material into persistent drawers.
- The backend supports:
  - `research.review.start`: atomically relabels all current-wave requests from
    `proposed` to `in_review`;
  - `research.review.resolve`: relabels all `in_review` requests as `approved`,
    `revision_requested`, or `blocked` and moves the campaign to
    `NEXT_WAVE_READY`, `REVISING`, or `BLOCKED`.
- These two actions are tested but are not exposed in the current UI.

Crucially, those actions are semantic bookkeeping only. `start` does not launch
an agent, create a task, select tools/model/host, or attach an evidence receipt.
`resolve` currently verifies only that every request is `in_review`; it does not
verify that any independent research actually happened. Treat this as a stub,
not a research harness.

### UI/PWA

- Tailnet-only installable PWA with project routes at `/projects/<id>`.
- Lifecycle ribbon, current-stage focus, guarded action buttons, lane grid,
  coordinator identity, session activity, chat, approvals, and notifications.
- Live SSE refresh and safe Markdown/structured-response rendering.
- Current app shell/cache generation is `v19`.
- Draft preservation now survives full campaign rerenders:
  - coordinator and decision text;
  - focus and cursor/selection;
  - textarea, transcript, and page scroll;
  - open/closed campaign-history drawers.
- Decision drafts are kept in `sessionStorage`, keyed by project and wave, and
  cleared only after a successful decision action.
- Desktop and 390px layouts have browser regressions for horizontal overflow.

### Security boundaries

- Server stays on `127.0.0.1`; Tailscale Serve provides HTTPS and identity.
- Browser mutations require allowed origin/proxy identity.
- There is no arbitrary command endpoint.
- The current release does not merge, push, dispatch a next wave, or promote
  campaign claims.

## Architecture and important files

```text
Claude ledgers/jobs --------> collector.ts ----+
                                                |
Codex App Server <---------> codex.ts           +--> campaign.ts / SQLite
                                                |          |
browser actions -----------> server.ts ---------+          +--> SSE snapshots/events
                                                           |
public/app.js + styles.css <--------------------------------+
```

| Path | Purpose |
|---|---|
| `src/campaign.ts` | Core durable state machine, SQLite schema, guarded action queue, Sol turns, live event projection |
| `src/codex.ts` | Local Codex App Server stdio client and thread/turn operations |
| `src/collector.ts` | Claude/coordinator/job/timeline normalization and host enrichment |
| `src/server.ts` | HTTP, SSE, PWA assets, Tailnet identity checks, API routing |
| `src/security.ts` | Mutation-origin and proxy-identity validation |
| `src/types.ts` | Normalized observer/API types |
| `public/app.js` | Project routing, campaign UI, lifecycle controls, conversation/progress rendering, draft preservation |
| `public/styles.css` | Desktop/mobile control-plane presentation |
| `public/sw.js` | PWA shell cache and push handling; currently `v19` |
| `tests/campaign.test.ts` | Campaign state/action/App Server behavior tests |
| `scripts/verify-conversation-ui.cjs` | Non-mutating desktop/mobile/Tailnet browser regression |
| `data/observer.sqlite` | Private durable live control state |
| `data/synthesis-bundles/` | Private digest-bound synthesis inputs |
| `run.ps1` | Health-supervised Bun service loop |
| `README.md` | Current operator and architecture overview |
| `COMPUTER-USE-HANDOFF.md` | Earlier browser/computer-use integration notes |

This workspace is not currently a Git repository. `git status` and
`git rev-parse` fail from both `math-research` and `agent-observer`. Preserve
files carefully and create a backup/checkpoint before large rewrites.

## API and action surface

Read/API routes:

- `GET /api/health`
- `GET /api/me`
- `GET /api/snapshot`
- `GET /api/control`
- `GET /api/codex/threads?project=<id>`
- `GET /api/codex/conversation?project=<id>`
- `GET /api/events` (SSE)
- `POST /api/refresh`
- `POST /api/actions`
- push subscribe/unsubscribe routes

Current allowlisted action types:

- `coordinator.attach`
- `coordinator.interrupt`
- `coordinator.message.send`
- `lane.reconcile`
- `lane.disposition.set`
- `project.automation.set`
- `wave.adopt`
- `wave.triage.request`
- `wave.triage.apply`
- `synthesis.prepare`
- `synthesis.request`
- `synthesis.review`
- `research.review.start`
- `research.review.resolve`
- `approval.respond`

## Verification and operations

From `infrastructure\agent-observer`:

```powershell
bun run check
node --check public/app.js
node --check scripts/verify-conversation-ui.cjs
```

The latest verified result is 18 tests, 83 assertions, zero failures.

Non-mutating browser verification:

```powershell
node scripts/verify-conversation-ui.cjs `
  http://127.0.0.1:4317/projects/cfg23 `
  data/research-review-after-cleanup.png `
  1440

node scripts/verify-conversation-ui.cjs `
  http://127.0.0.1:4317/projects/cfg23 `
  data/research-review-mobile-proof.png `
  390
```

The verifier opens/reads history and fills a local unsent draft, but it does not
record a campaign decision or dispatch work. The latest Tailnet proof is
`data\research-review-tailnet-proof.png`.

Health/state checks:

```powershell
Invoke-RestMethod http://127.0.0.1:4317/api/health
Invoke-RestMethod http://127.0.0.1:4317/api/control
```

Local run:

```powershell
pwsh -NoProfile -File .\run.ps1
```

The deployed service is already supervised by `run.ps1`; its transcript is
`data\scheduled-task.log`. Keep the server bound to loopback. The external URL
is supplied by Tailscale Serve; do not use Funnel.

## Frontier, in recommended order

### P0 — make research real and close the current loop

1. Introduce first-class `research_runs` and evidence receipts rather than
   treating a request status as proof of work.
2. Define a research dispatch profile: model, reasoning effort, tools/web
   access, host, isolation, fan-out, stop conditions, output schema, and budget.
3. Decide whether each of the five questions is one run, a grouped wave, or a
   dependency graph. R1 (pin audit) is an obvious gate for R5 (Trade runs).
4. Implement an explicit preview/confirm/dispatch action. Never make the current
   `research.review.start` silently acquire dispatch semantics.
5. Attach every result to immutable source/evidence metadata and show claim,
   contradiction, and question coverage in the UI.
6. Tighten `research.review.resolve` so approval requires completed evidence or
   an explicit human waiver; then send the evidence bundle back to Sol for
   synthesis/revision.

### P0 — enforce worker topology at the control boundary

1. Create declarative, versioned topology profiles, for example:

   ```yaml
   coordinator: codex-sol
   workers:
     - model: opus
       count: 1
       child_policy:
         model: sonnet
         max_fanout: 3
     - model: sonnet
       count: 3
       max_fanout: 0
   ```

2. Validate dispatch packets against the profile server-side; prompt text is
   advisory, not enforcement.
3. Record desired versus observed topology and block/noncompliantly flag runs
   that spawn the wrong type/count.
4. Add profile selection and a topology diagram to the project/wave UI.
5. Treat Claude Agents CLI as an adapter implementing a generic lane-dispatch
   contract, not as the global state authority.

### P1 — wave landing and gradual orchestration

1. Add landing receipts and a prepare-only landing plan: inspect result,
   reconcile, integrate, test, then explicitly approve merge/push.
2. Let Sol propose the next wave from research+synthesis, but keep dispatch and
   claim promotion independently gated.
3. Expand automation modes into a documented state machine. Today `prepare`,
   `propose`, and `bounded` automate only limited triage/bundle steps; they do
   not orchestrate full waves.
4. Add structured coordinator tools or an MCP server so Sol updates campaign
   state through typed operations instead of returning JSON blobs that the
   browser interprets.
5. Add event-driven reconciliation and synthesis triggers with audit-friendly
   pause points.

### P1 — navigation and durable operator UX

1. Add routes for individual waves, research requests/runs, lanes, coordinator
   sessions, and decisions.
2. Move the giant global lane grid behind an explicit execution/legacy view on
   held phases such as research review.
3. Add breadcrumbs and persistent primary navigation rather than relying on one
   long project document.
4. Add a compact campaign timeline showing wave -> synthesis -> decision ->
   research -> next wave.
5. Preserve drafts in durable local storage only if multi-tab semantics and
   sensitive-note retention are explicitly designed; current `sessionStorage`
   is intentionally tab/session scoped.

### P2 — multi-project, multi-host control plane

1. Normalize Codex and Claude execution adapters behind one lane/run model.
2. Add host capability/health inventory and routing constraints.
3. Add per-user authorization and audit display beyond the current Tailnet
   allowlist.
4. Add quotas/budgets and concurrency controls per project/profile/host.
5. Build a unified topology/state view only after the run and evidence models
   are stable.

## Known limitations and sharp edges

- Research `start`/`resolve` are status-only and can currently produce a false
  sense of completion if exposed naively.
- No agent dispatch, next-wave dispatch, landing, merge, push, or claim
  promotion exists.
- No actual topology enforcement exists; the observer can report some topology
  metadata/violations, but does not own child spawning.
- Coordinator model metadata is blank in the current durable binding, so the UI
  falls back to a generic Sol label.
- Synthesis storage still says `drafted` after the human chose research; phase
  and decisions are authoritative, but the label is semantically confusing.
- Global observer counts cover hundreds of historical/registered lanes and do
  not map cleanly onto current campaign work.
- The browser conversation is intentionally sanitized and read-only with
  respect to tools. It is not a full Codex desktop replacement.
- The app uses a single large vanilla `public/app.js`; lifecycle-specific views
  are becoming difficult to evolve safely without component/state boundaries.
- The PWA service-worker cache must be bumped whenever shell assets change.
- There is no Git history in this workspace for rollback.

## Recommended first next change

Do not add a generic “Start research” button that merely calls the existing
status transition. Instead, design the research-run contract and show a preview
for the five current questions:

- dependency/order;
- selected model and reasoning effort;
- tools and web access;
- host and working directory;
- fan-out and topology profile;
- expected evidence/output schema;
- stop/timeout/budget;
- human confirmation.

Once that preview is trustworthy, implement dispatch for one bounded research
request (preferably the clean pin audit), intake its evidence, and prove the
round trip back into Sol synthesis before generalizing to the other four.

