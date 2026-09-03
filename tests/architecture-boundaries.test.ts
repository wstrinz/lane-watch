import { describe, expect, test } from "bun:test";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

describe("campaign composition boundaries", () => {
  test("revalidates landed research receipts and their artifact hashes", async () => {
    const source = await readFile(join(import.meta.dir, "..", "src", "observation-sync-service.ts"), "utf8");

    expect(source).toContain("'awaiting_evidence', 'evidence_ready'");
    expect(source).toContain("await validateReceiptArtifacts(run.worktree, run.evidence_path, receipt)");
    expect(source.indexOf("await validateReceiptArtifacts(run.worktree, run.evidence_path, receipt)"))
      .toBeLessThan(source.indexOf("await committedWorktreeFileMatches(run.worktree, run.evidence_path)"));

    const campaign = await readFile(join(import.meta.dir, "..", "src", "campaign.ts"), "utf8");
    const coordination = await readFile(join(import.meta.dir, "..", "src", "campaign-coordination-interface-service.ts"), "utf8");
    expect(campaign).toContain("'awaiting_evidence', 'evidence_ready'");
    expect(coordination).toContain('"awaiting_evidence", "evidence_ready"');
  });

  test("routes the mechanical research lifecycle through its extracted service", async () => {
    const source = await readFile(join(import.meta.dir, "..", "src", "campaign.ts"), "utf8");

    expect(source).toContain('"research.schedule.prepare": (action) => this.researchExecution.prepareSchedule');
    expect(source).toContain('"research.schedule.dispatch": (action, args) => this.researchExecution.dispatchSchedule');
    expect(source).toContain('"research.failure.requeue": (action) => this.researchExecution.requeueFailed');
    expect(source).toContain('"research.receipt.reconcile": async (action) =>');
    expect(source).toContain('"research.evidence.return": (action) => this.researchExecution.returnEvidence');
    expect(source).not.toContain("private async dispatchScheduledWave(");
    expect(source).not.toContain("private async returnResearchEvidence(");
    expect(source).not.toContain("private async dispatchResearch(");
  });

  test("requires structured checked contracts instead of reconstructing legacy dispatch authority", async () => {
    const root = join(import.meta.dir, "..", "src");
    const source = await readFile(join(root, "campaign.ts"), "utf8");
    const semantics = await readFile(join(root, "wave-semantic-service.ts"), "utf8");

    expect(source).toContain('if (contractStatus !== "READY") return null');
    expect(source).toContain('const baseRef = /^[0-9a-f]{40}$/i.test(explicitBaseRef) ? explicitBaseRef : ""');
    expect(source).not.toContain("function researchDispatchSpec(question");
    expect(source).not.toContain("produce v2\\.1 that removes float_quarantine");
    expect(source).not.toContain("implement a v2 layered gate");
    expect(source).not.toContain("independently audit the v2 gate");
    expect(source).not.toContain("rebuild all 37 corrected pins");
    expect(semantics).not.toContain("legacyResearchTaskId");
  });

  test("routes semantic planning and coordinator sessions through dedicated services", async () => {
    const source = await readFile(join(import.meta.dir, "..", "src", "campaign.ts"), "utf8");

    expect(source).toContain('"research.review.start": (action) => this.researchPlanning.startReview');
    expect(source).toContain('"research.review.resolve": (action, args) => this.researchPlanning.resolveReview');
    expect(source).toContain('"coordinator.attach": (action, args) => this.coordinatorSessions.attach');
    expect(source).toContain("return this.coordinatorSessions.listCandidates(projectId)");
    expect(source).not.toContain("private async startResearchReview(");
    expect(source).not.toContain("private async resolveResearchReview(");
    expect(source).not.toContain("private async attachCoordinator(");
    expect(source).not.toContain("private async sendCoordinatorMessage(");
  });

  test("routes wave interpretation and steering through the semantic service", async () => {
    const source = await readFile(join(import.meta.dir, "..", "src", "campaign.ts"), "utf8");

    expect(source).toContain('"wave.triage.request": (action) => this.waveSemantics.requestTriage');
    expect(source).toContain('"synthesis.prepare": (action) => this.waveSemantics.prepareSynthesis');
    expect(source).toContain('"synthesis.reconcile": (action) => this.waveSemantics.reconcileSynthesis');
    expect(source).toContain('"synthesis.review": (action, args) => this.waveSemantics.reviewSynthesis');
    expect(source).toContain('"campaign.redirect.submit": (action, args) => this.waveSemantics.submitRedirect');
    expect(source).not.toContain("private async requestWaveTriage(");
    expect(source).not.toContain("private async prepareSynthesis(");
    expect(source).not.toContain("private async reviewSynthesis(");
    expect(source).not.toContain("private async submitCampaignRedirect(");
  });

  test("routes one-loop orchestration through the autopilot service", async () => {
    const source = await readFile(join(import.meta.dir, "..", "src", "campaign.ts"), "utf8");

    expect(source).toContain('"loop.start": (action) => this.autopilot.start');
    expect(source).toContain('"loop.resume": (action) => this.autopilot.resume');
    expect(source).toContain("afterSettled: (projectId) => { void this.autopilot.advance(projectId); }");
    expect(source).not.toContain("private async startLoop(");
    expect(source).not.toContain("private async advanceAutomationLoop(");
    expect(source).not.toContain("private loopBoundary(");
  });

  test("routes observer facts through the observation synchronization boundary", async () => {
    const source = await readFile(join(import.meta.dir, "..", "src", "campaign.ts"), "utf8");

    expect(source).toContain("await this.observationSync.synchronizeProject(project.id, lanes)");
    expect(source).toContain("this.observationSync.syncWaveMembers(projectId, lanes)");
    expect(source).not.toContain("private async syncResearchRuns(");
    expect(source).not.toContain("private syncWaveLanes(");
    expect(source).not.toContain("freezeCompletedResearchEvidence(");
  });

  test("routes durable workflow state through one kernel and keeps activity observation non-authoritative", async () => {
    const root = join(import.meta.dir, "..", "src");
    const source = await readFile(join(root, "campaign.ts"), "utf8");
    const observation = await readFile(join(root, "observation-sync-service.ts"), "utf8");
    const state = await readFile(join(root, "campaign-state-service.ts"), "utf8");
    const provenance = await readFile(join(root, "campaign-workflow-provenance.ts"), "utf8");

    expect(source).toContain("new CampaignStateService(");
    expect(source).toContain("this.campaignState.change(projectId, changes, context)");
    expect(source).toContain("this.campaignState.observeActivity(projectId, activity)");
    expect(state).toContain("this.database.transaction(");
    expect(state).toContain("INSERT INTO campaign_events");
    expect(state).not.toContain("this.port.recordEvent");
    expect(observation).toContain("this.port.observeActivity(projectId");
    expect(observation).not.toContain("touchProject(projectId, derived");
    expect(observation).not.toContain("UPDATE campaign_projects");
    expect(state).toContain("workflow: workflowProvenance(project.current_phase, project.updated_at, event)");
    expect(provenance).toContain('policy: "explicit-fields-only-no-ledger-rewrite"');
    expect(provenance).toContain("backfilled: false");
    expect(provenance).not.toContain("Database");
    expect(provenance).not.toContain("INSERT INTO");
  });

  test("routes observer-triggered proposals through a no-direct-execution policy", async () => {
    const root = join(import.meta.dir, "..", "src");
    const source = await readFile(join(root, "campaign.ts"), "utf8");
    const policy = await readFile(join(root, "observer-automation-policy-service.ts"), "utf8");

    expect(source).toContain("await this.observerAutomationPolicy.propose(project.id, lanes, activeLanes, accounting)");
    expect(source).not.toContain('idempotencyKey: `auto-reconcile:v2:');
    expect(source).not.toContain('idempotencyKey: `auto-triage:');
    expect(policy).toContain("this.port.enqueueAction(");
    expect(policy).not.toContain("executeAction(");
  });

  test("routes lane authority through one shared ownership classifier", async () => {
    const root = join(import.meta.dir, "..", "src");
    const source = await readFile(join(root, "campaign.ts"), "utf8");
    const policy = await readFile(join(root, "observer-automation-policy-service.ts"), "utf8");
    const ownership = await readFile(join(root, "lane-ownership-service.ts"), "utf8");
    const coordination = await readFile(join(root, "campaign-coordination-interface-service.ts"), "utf8");
    const planning = await readFile(join(root, "research-planning-service.ts"), "utf8");
    const execution = await readFile(join(root, "research-execution-service.ts"), "utf8");
    const reconciliation = await readFile(join(root, "lane-reconciliation-service.ts"), "utf8");

    expect(source).toContain("new CampaignCoordinationInterfaceService(");
    expect(source).toContain("new LaneOwnershipService(");
    expect(policy).toContain("private readonly coordination: CampaignCoordinationInterfaceService");
    expect(policy).toContain("private readonly ownership: LaneOwnershipService");
    expect(policy).toContain("this.ownership.classify(projectId, observedLanes)");
    expect(reconciliation).toContain("this.port.ownership(projectId, lane)");
    expect(reconciliation).toContain("if (!ownership.controlled) throw new Error");
    expect(ownership).toContain('lane.mode === "imported-wave" ? "adopted-wave" : "observed-elsewhere"');
    expect(coordination).toContain('schema: "campaign-coordination-interface/v1"');
    expect(coordination).toContain('mode = "controller-owned-execution"');
    expect(coordination).toContain('mode = "imported-wave"');
    expect(coordination).toContain("observationIsAuthority: false");
    expect(planning).toContain("this.port.coordinationInterface(projectId).capabilities.plan");
    expect(execution).toContain("this.port.coordinationInterface(projectId).capabilities.dispatch");
  });

  test("routes bounded Windows lane reconciliation through its dedicated service", async () => {
    const root = join(import.meta.dir, "..", "src");
    const source = await readFile(join(root, "campaign.ts"), "utf8");
    const reconciliation = await readFile(join(root, "lane-reconciliation-service.ts"), "utf8");

    expect(source).toContain("new LaneReconciliationService({");
    expect(source).toContain('"lane.reconcile": (action) => this.laneReconciliation.reconcile');
    expect(source).not.toContain("private async reconcileLane(");
    expect(source).not.toContain("OBSERVER_PWSH_BIN");
    expect(reconciliation).toContain("TERMINAL_DAEMONS.has(lane.daemon)");
    expect(reconciliation).toContain("Local coordinator path escapes the project root");
    expect(reconciliation).toContain("Bun.spawn([");
    expect(reconciliation).toContain("5 * 60_000");
    expect(reconciliation).toContain("Mac reconciliation is not implemented");
  });

  test("routes bounded context discovery and hashing through its dedicated registry", async () => {
    const root = join(import.meta.dir, "..", "src");
    const source = await readFile(join(root, "campaign.ts"), "utf8");
    const registry = await readFile(join(root, "context-registry-service.ts"), "utf8");

    expect(source).toContain("new ContextRegistryService(this.database");
    expect(source).toContain("await this.contextRegistry.refresh(project.id, activeLanes)");
    expect(source).not.toContain("private async refreshContextSources(");
    expect(source).not.toContain("campaign_context_sources");
    expect(source).not.toContain("512_000");
    expect(registry).toContain('role: "queue-plan"');
    expect(registry).toContain('role: "lane-packet"');
    expect(registry).toContain("MAX_CONTEXT_CHARACTERS = 512_000");
    expect(registry).toContain("sha256Text(content)");
    expect(registry).toContain("if (!within(root, candidate.path)) continue");
    expect(registry).toContain("DELETE FROM campaign_context_sources");
  });

  test("routes historical recovery through the digest-bound recovery service", async () => {
    const root = join(import.meta.dir, "..", "src");
    const source = await readFile(join(root, "campaign.ts"), "utf8");
    const recovery = await readFile(join(root, "campaign-recovery-service.ts"), "utf8");

    expect(source).toContain("new CampaignRecoveryService(");
    expect(source).toContain('"campaign.recovery.prepare": (action) => this.campaignRecovery.prepare');
    expect(source).toContain('"campaign.recovery.apply": (action, args) => this.campaignRecovery.apply');
    expect(recovery).toContain('schema: "campaign-recovery-report/v1"');
    expect(recovery).toContain('args.confirmation !== "APPLY CAMPAIGN RECOVERY"');
    expect(recovery).toContain("if (freshDigest !== report.report_digest)");
    expect(recovery).not.toContain("enqueueAction(");
  });

  test("routes campaign schema ownership through the versioned migration service", async () => {
    const root = join(import.meta.dir, "..", "src");
    const source = await readFile(join(root, "campaign.ts"), "utf8");
    const migrations = await readFile(join(root, "campaign-schema-migration-service.ts"), "utf8");

    expect(source).toContain("new CampaignSchemaMigrationService(this.database, now).migrate()");
    expect(source).not.toContain("private createSchema(");
    expect(source).not.toContain("CREATE TABLE");
    expect(source).not.toContain("ALTER TABLE");
    expect(migrations).toContain("LATEST_CAMPAIGN_SCHEMA_VERSION");
    expect(migrations).toContain("campaign_schema_migrations");
    expect(migrations).toContain("this.database.transaction(");
  });

  test("routes App Server notifications through a dedicated reconciliation service", async () => {
    const source = await readFile(join(import.meta.dir, "..", "src", "campaign.ts"), "utf8");

    expect(source).toContain("this.codex.onNotification((notification) => this.codexNotifications.handle(notification))");
    expect(source).toContain("liveTurn: (projectId) => this.codexNotifications.liveTurn(projectId)");
    expect(source).not.toContain("private handleCodexNotification(");
    expect(source).not.toContain("private updateLiveActivity(");
    expect(source).not.toContain("private handleStrategyReviewNotification(");
  });

  test("routes durable command settlement through the action queue service", async () => {
    const source = await readFile(join(import.meta.dir, "..", "src", "campaign.ts"), "utf8");

    expect(source).toContain("return this.actionQueue.enqueue(input, actor)");
    expect(source).toContain("execute: (action, args) => this.actionRouter.execute(action, args)");
    expect(source).toContain("actionSnapshot: (row) => this.actionQueue.snapshot(row as ActionQueueRow)");
    expect(source).toContain("recoverInterruptedActions: () => this.actionQueue.recoverInterrupted()");
    expect(source).toContain("resumeActions: () => this.actionQueue.resume()");
    expect(source).not.toContain("private async processActions(");
    expect(source).not.toContain("private actionSnapshot(");
    expect(source).not.toContain("private actionById(");
  });

  test("routes the exact command catalog through a typed no-authority router", async () => {
    const root = join(import.meta.dir, "..", "src");
    const source = await readFile(join(root, "campaign.ts"), "utf8");
    const router = await readFile(join(root, "campaign-action-router.ts"), "utf8");

    expect(source).toContain("new CampaignActionRouter(this.actionHandlers())");
    expect(source).toContain("validateType: (type) => this.actionRouter.validate(type)");
    expect(source).not.toContain("switch (action.action_type)");
    expect(source).not.toContain("private async executeAction(");
    expect(router).toContain("export const CAMPAIGN_ACTION_TYPES = [");
    expect(router).toContain("[Type in CampaignActionType]: CampaignActionHandler");
    expect(router).toContain("Campaign action registry mismatch");
    expect(router).not.toContain("CampaignControl");
    expect(router).not.toContain("Database");
  });

  test("routes bootstrap recovery through the first-observation startup barrier", async () => {
    const root = join(import.meta.dir, "..", "src");
    const source = await readFile(join(root, "campaign.ts"), "utf8");
    const startup = await readFile(join(root, "campaign-startup-service.ts"), "utf8");

    expect(source).toContain("await control.startup.initialize()");
    expect(source).toContain("this.startup.observationSettled()");
    expect(source).toContain("recoverCustodyExecutions: () => this.custodyCommands.recoverExecutions()");
    expect(source).not.toContain("private async loadProjects(");
    expect(source).not.toContain("private async recoverCustodyExecutions(");
    expect(startup).toContain('this.phase = "recovering-actions"');
    expect(startup).toContain('this.phase = "recovering-custody"');
    expect(startup).toContain('this.phase = "awaiting-first-observation"');
    expect(startup).toContain("this.port.resumeActions()");
  });

  test("routes App Server approval requests through an isolated inbox", async () => {
    const source = await readFile(join(import.meta.dir, "..", "src", "campaign.ts"), "utf8");

    expect(source).toContain("this.codex.onServerRequest((request) => this.codexApprovals.capture(request))");
    expect(source).toContain('"approval.respond": (action, args) => this.codexApprovals.respond');
    expect(source).not.toContain("private async respondApproval(");
    expect(source).not.toContain("private handleCodexServerRequest(");
  });

  test("projects watchdog history through a read-only runtime health boundary", async () => {
    const root = join(import.meta.dir, "..", "src");
    const server = await readFile(join(root, "server.ts"), "utf8");
    const runtime = await readFile(join(root, "runtime-health-service.ts"), "utf8");

    expect(server).toContain("new RuntimeHealthService(DATA_ROOT)");
    expect(server).toContain("runtime: await runtimeHealth.snapshot()");
    expect(runtime).toContain('source: "watchdog-transcript"');
    expect(runtime).toContain("abnormalExitCount");
    expect(runtime).toContain("bunPanicCount");
    expect(runtime).not.toContain("Bun.spawn");
    expect(runtime).not.toContain("writeFile");
  });

  test("routes the exceptional DOC-A1 authority change through its exact preflight service", async () => {
    const source = await readFile(join(import.meta.dir, "..", "src", "campaign.ts"), "utf8");

    expect(source).toContain('"campaign.operator-transition.prepare": (action) => this.operatorTransitions.prepare');
    expect(source).toContain('"campaign.operator-transition.execute": (action, args) => this.operatorTransitions.execute');
    expect(source).not.toContain("private docA1Transition(");
    expect(source).not.toContain("private async prepareOperatorTransition(");
    expect(source).not.toContain("private async executeOperatorTransition(");
  });
});
