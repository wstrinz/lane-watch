import { expect, test } from "@playwright/test";
import { mkdirSync } from "node:fs";

const url = process.env.LANE_WATCH_URL || "http://127.0.0.1:4317/projects/cfg23";
const outputRoot = process.env.LANE_WATCH_VISUAL_DIR || "test-results/visuals";
mkdirSync(outputRoot, { recursive: true });

async function openWorkspace(page: any, selector: string): Promise<void> {
  const workspace = page.locator(selector);
  await expect(workspace).toBeVisible();
  if (!await workspace.evaluate((element: HTMLDetailsElement) => element.open)) {
    await workspace.locator(":scope > summary").click();
  }
}

test("campaign workflow and durable history remain inspectable on desktop", async ({ page }) => {
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(url);
  await page.waitForTimeout(500);
  expect(pageErrors).toEqual([]);
  const inbox = page.getByRole("region", { name: "Research packet inbox" });
  await expect(inbox).toBeVisible();
  await expect(inbox).toContainText("campaigns/cfg23/packets/queue/");
  await expect(inbox).toContainText("STAGED FOR REVIEW");
  await expect(inbox).toContainText("READY FOR SEMANTIC REVIEW");
  await expect(inbox.locator(".packet-list li")).toHaveCount(5);
  await inbox.screenshot({ path: `${outputRoot}/campaign-packet-inbox-desktop-v105.png` });
  const interpretation = page.getByRole("region", { name: "Campaign interpretation and research atlas" });
  await expect(interpretation).toBeVisible();
  await expect(interpretation.locator(".director-card")).toHaveCount(3);
  await expect(interpretation).toContainText("Understand the mission before choosing the move");
  await expect(interpretation).toContainText("RESEARCH ATLAS");
  await expect(interpretation.locator(".atlas-track")).toHaveCount(3);
  await expect(interpretation.locator(".atlas-station").first()).toBeVisible();
  await expect(interpretation.locator(".object-codex button").first()).toBeVisible();
  await interpretation.locator(".object-codex button").first().click();
  await expect(interpretation.locator(".atlas-inspector")).toContainText("Educational context only");
  const nextAction = page.locator("#next-action");
  await expect(nextAction).toBeVisible();
  await expect(nextAction).toContainText(/CURRENT GROUNDING|Choose the campaign direction|operator|wave|lane/i);
  await page.setViewportSize({ width: 1440, height: 2200 });
  await page.locator(".topbar,#next-action").evaluateAll((elements) => elements.forEach((element) => element.remove()));
  await interpretation.screenshot({ path: `${outputRoot}/campaign-interpretation-atlas-desktop-v105.png` });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await expect(page.locator("#evidence-workspace")).not.toHaveAttribute("open", "");
  await expect(page.locator("#strategy-workspaces")).not.toHaveAttribute("open", "");
  await expect(page.locator("#system-workspace")).not.toHaveAttribute("open", "");
  await openWorkspace(page, "#strategy-workspaces");
  await openWorkspace(page, "#evidence-workspace");
  await openWorkspace(page, "#system-workspace");
  const strategy = page.locator("#campaign-strategy");
  await expect(strategy).toBeVisible();
  await expect(strategy).toContainText("CAMPAIGN STRATEGY");
  await expect(strategy.locator(".strategy-tracks article")).toHaveCount(3);
  await expect(strategy).toContainText(/Global coverage|Support work is consuming the epoch/);
  await strategy.locator("summary").click();
  await expect(strategy).toContainText("Custody service");
  await strategy.screenshot({ path: `${outputRoot}/campaign-strategy-desktop-v81.png` });
  const resources = page.locator("#resource-economy");
  await expect(resources).toBeVisible();
  await resources.locator("summary").first().click();
  await expect(resources).toContainText("Simulation cannot dispatch");
  await expect(resources.getByRole("button", { name: "Freeze scheduler simulation" })).toBeVisible();
  await expect(resources.locator(".slot-pools > div")).toHaveCount(3);
  await expect(resources.locator(".layer-ledger > div")).toHaveCount(4);
  await resources.screenshot({ path: `${outputRoot}/campaign-resource-economy-desktop-v84.png` });
  const strategyWorkspace = page.locator("#strategy-workspace");
  await expect(strategyWorkspace).toBeVisible();
  await expect(strategyWorkspace).toContainText(/Charter revision \d+/);
  if (!await strategyWorkspace.locator(".strategy-workspace-body").isVisible()) await strategyWorkspace.locator("summary").first().click();
  await expect(strategyWorkspace).toContainText("Independent governance lane");
  await expect(strategyWorkspace.getByRole("button", { name: /Ask independent Sol strategist|Activate new epoch/ })).toBeVisible();
  await strategyWorkspace.screenshot({ path: `${outputRoot}/campaign-strategy-workspace-desktop-v81.png` });
  const custody = page.locator("#custody-service");
  await expect(custody).toBeVisible();
  if (!await custody.locator(".custody-body").isVisible()) await custody.locator("summary").first().click();
  await expect(custody).toContainText("Terra local steward");
  await expect(custody).toContainText("No custody contracts are queued");
  await custody.screenshot({ path: `${outputRoot}/campaign-custody-service-desktop-v82.png` });
  const map = page.locator(".campaign-map");
  await expect(map).toBeVisible();
  await expect(map.locator(".wave-aggregate-strip")).toContainText("PROJECTION ONLY");
  const repairPlan = map.locator(".wave-repair-plan");
  if (await repairPlan.count()) {
    await expect(repairPlan).toContainText("BLOCKED ON EVIDENCE");
    await repairPlan.locator("summary").click();
    await expect(repairPlan).toContainText("RECONCILE FIRST");
    await expect(repairPlan).toContainText("NO WRITE AUTHORITY");
  } else {
    await expect(map).not.toContainText("ACCOUNTING GAP");
  }
  const loop = page.locator("#loop-control");
  await expect(loop).toHaveCount(1);
  await expect(loop).toContainText(/END ·/);
  const operatorGate = page.locator("#operator-gate");
  if (await operatorGate.count()) {
    await loop.getByRole("button", { name: /Resolve the required gate|Review & approve DOC-A1/ }).click();
    await expect(operatorGate).toBeInViewport();
    await expect(operatorGate).toContainText("Adopt Proposal A as DOC-A1");
    await expect(operatorGate.getByRole("button", { name: /Check transition readiness|Approve DOC-A1 & continue/ })).toBeVisible();
  } else {
    const loopAction = loop.getByRole("button", { name: /Pause now|Pause automation|Recheck & resume|Run (one|another) complete loop|Continue this loop automatically|Confirm \d+-lane schedule/ });
    if (await loopAction.count()) await expect(loopAction).toBeVisible();
    else {
      await expect(loop).toContainText(/LOOP COMPLETE|PREFLIGHT BLOCKED/);
      if (await loop.getByText("PREFLIGHT BLOCKED", { exact: true }).count()) {
        await expect(loop).toContainText("80,000 required");
        await expect(loop).toContainText("4,906 currently schedulable");
        await expect(loop.getByRole("button", { name: "Start one-loop autopilot" })).toBeVisible();
        await expect(loop.getByRole("button", { name: "Start one-loop autopilot" })).toBeDisabled();
        const resourceGate = loop.getByRole("button", { name: "Review Epoch 2 resource proposal →" });
        await expect(resourceGate).toBeVisible();
        await expect(loop.getByRole("button", { name: "Freeze wave schedule" })).toHaveCount(0);
        await resourceGate.click();
        await expect(strategyWorkspace).toBeInViewport();
      }
    }
  }
  expect(await map.evaluate((element) => {
    const loopElement = document.querySelector("#loop-control");
    return Boolean(loopElement && (element.compareDocumentPosition(loopElement) & Node.DOCUMENT_POSITION_FOLLOWING));
  })).toBe(true);
  await expect(map.getByRole("button", { name: /Packet inbox/ })).toBeVisible();
  await expect(map.locator(".journey-stop")).toHaveCount(5);
  await expect(map.locator(".journey-branch")).toHaveCount(3);
  await map.locator(".journey-stop.current").click();
  await expect(map.locator(".flow-inspector")).not.toHaveClass(/empty/);
  await map.screenshot({ path: `${outputRoot}/campaign-line-workflow-desktop-v105.png` });
  const historyResponse = page.waitForResponse((response) => /\/api\/workflow-history\?/.test(response.url()) && response.ok());
  await map.getByRole("button", { name: "Replay", exact: true }).click();
  await historyResponse;
  const replay = map.locator(".replay-toolbar");
  await expect(replay).toBeVisible();
  const historyStatus = map.locator(".history-load-status");
  await expect(historyStatus).toContainText(/\d+ of \d+ events loaded/);
  for (let pageIndex = 0; pageIndex < 6 && await replay.locator(".replay-now strong").textContent() === "No recorded milestones"; pageIndex++) {
    const loadOlder = historyStatus.getByRole("button", { name: "Load older history" });
    if (!await loadOlder.count()) break;
    const olderHistoryResponse = page.waitForResponse((response) => /\/api\/workflow-history\?/.test(response.url()) && response.url().includes("cursor=") && response.ok());
    await loadOlder.click();
    await olderHistoryResponse;
  }
  await expect(replay.locator(".replay-now strong")).not.toHaveText("No recorded milestones");
  await expect(replay.locator('input[type="range"]')).toBeVisible();
  await replay.getByRole("button", { name: "First milestone" }).click();
  await expect(replay).toContainText(/1 \/ \d+/);
  await replay.getByRole("button", { name: "Next milestone" }).click();
  await expect(replay).toContainText(/2 \/ \d+/);
  await map.screenshot({ path: `${outputRoot}/campaign-flow-xyflow-replay-desktop-v78.png` });
  const programHistoryResponse = page.waitForResponse((response) => /\/api\/program-history\?/.test(response.url()) && response.ok());
  await map.getByRole("button", { name: "History", exact: true }).click();
  await programHistoryResponse;
  await expect(map.locator(".history-filters")).toBeVisible();
  const programHistory = map.getByRole("region", { name: "Program history hierarchy" });
  await expect(programHistory).toBeVisible();
  await expect(programHistory).toContainText("Epoch → wave → lane and custody");
  await expect(programHistory.locator(".program-epoch")).toHaveCount(1);
  await expect(programHistory).toContainText(/pre epoch historical import|explicit strategy snapshot|created at containment/);
  await expect(programHistory.locator(".epoch-boundary")).toContainText("START / END COMPARISON");
  await map.locator(".history-filters").getByRole("button", { name: "Evidence" }).click();
  await expect.poll(async () => map.locator(".svelte-flow__node").count()).toBeGreaterThan(4);
  await map.locator(".svelte-flow__node.current").first().click();
  await expect(map.locator(".flow-inspector")).toContainText(/Recorded payload|Related substeps/);
  await map.screenshot({ path: `${outputRoot}/campaign-flow-xyflow-history-desktop-v78.png` });
  const accounting = page.locator("#wave-accounting");
  await expect(accounting).toBeVisible();
  await expect(accounting.locator("summary")).toContainText(/accounted|members/);
  await accounting.locator("summary").click();
  await expect(accounting).toContainText("Mechanical disposition only");
  const settings = page.locator("#campaign-settings");
  await expect(settings).toBeVisible();
  await expect(settings).toContainText("Sonnet worker");
  await settings.locator("summary").click();
  await expect(settings).toContainText("Signed in as");
  await expect(settings.getByRole("region", { name: "Operational governance" })).toContainText("HOSTS & GLOBAL QUOTAS");
  await expect(settings.getByRole("region", { name: "Operational governance" })).toContainText("ENFORCED AT SERIALIZED RESOURCE ACQUISITION");
  await expect(settings.locator(".dispatch-profile")).toHaveCount(3);
  await expect(settings).toContainText("Defaults, never active mutations");
  await expect(settings).toContainText(/Coordinator interface · (observe-only|imported-wave|controller-owned-execution)/);
  await loop.screenshot({ path: `${outputRoot}/autopilot-control-desktop-v105.png` });
  if (await operatorGate.count()) await operatorGate.screenshot({ path: `${outputRoot}/campaign-operator-gate-desktop-v76.png` });
});

test("the Svelte-owned shell keeps the primary rail and lane drill-down stable", async ({ page }) => {
  const legacyRequests: string[] = [];
  page.on("request", (request) => { if (/\/app\.js(?:\?|$)/.test(request.url())) legacyRequests.push(request.url()); });
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(url);
  await expect(page.locator("#next-action")).toBeVisible();
  await openWorkspace(page, "#evidence-workspace");
  await expect(page.locator("#observer-lanes")).toBeVisible();
  await expect(page.locator('script[src="/ui.js?v=105"]')).toHaveCount(1);
  await expect(page.locator('link[href="/styles.css?v=105"]')).toHaveCount(1);
  await expect(page.locator('link[href="/ui.css?v=105"]')).toHaveCount(1);
  expect(await page.evaluate(() => fetch("/sw.js?v=105", { cache: "no-store" }).then((response) => response.text()).then((body) => body.includes("lane-watch-v105")))).toBe(true);
  expect(legacyRequests).toEqual([]);

  const readModel = await page.evaluate(async () => {
    const me = await fetch("/api/me", { cache: "no-store" }).then((response) => response.json()) as any;
    const control = await fetch("/api/control?view=compact&project=cfg23", { cache: "no-store" }).then((response) => response.json()) as any;
    const observer = await fetch("/api/snapshot?view=compact&project=cfg23", { cache: "no-store" }).then((response) => response.json()) as any;
    const history = await fetch("/api/workflow-history?project=cfg23&limit=50", { cache: "no-store" }).then((response) => response.json()) as any;
    const runSummary = control.projects[0]?.researchRuns?.find((run: any) => run.evidenceDetailAvailable);
    const laneSummary = observer.lanes?.[0];
    const runDetail = runSummary
      ? await fetch(`/api/research-run?project=cfg23&id=${encodeURIComponent(runSummary.id)}`, { cache: "no-store" }).then((response) => response.json())
      : null;
    const laneDetail = laneSummary
      ? await fetch(`/api/lane?id=${encodeURIComponent(laneSummary.id)}`, { cache: "no-store" }).then((response) => response.json())
      : null;
    return {
      controlSchema: control.projection?.schema,
      observerSchema: observer.projection?.schema,
      projectCount: control.projects?.length,
      projectIndexCount: control.projectIndex?.length,
      projectIndexIds: control.projectIndex?.map((project: any) => project.id).sort(),
      authorizedProjects: me.projects,
      historySchema: history.schema,
      historyPreviewCount: control.projects[0]?.workflowHistory?.length,
      historyTotal: control.projects[0]?.workflowHistorySummary?.total,
      historyPageReturned: history.returned,
      campaignStateSchema: control.projects[0]?.controlState?.schema,
      coordinationSchema: control.projects[0]?.coordinationInterface?.schema,
      coordinationMode: control.projects[0]?.coordinationInterface?.mode,
      observationIsNonAuthoritative: control.projects[0]?.controlState?.observation?.workflowMutation === false,
      laneCount: observer.lanes?.length,
      compactLaneDetailsOmitted: observer.lanes?.every((lane: any) => !lane.output && !lane.activities?.length && !lane.timeline?.length),
      compactEvidenceOmitted: control.projects[0]?.researchRuns?.every((run: any) => !("evidence" in run)),
      fullRunHasEvidence: Boolean(runDetail?.evidence),
      fullLaneMatches: Boolean(laneDetail?.id && laneDetail.id === laneSummary?.id),
    };
  });
  expect(readModel).toMatchObject({
    controlSchema: "lane-watch-control-projection/v1",
    observerSchema: "lane-watch-observer-projection/v1",
    projectCount: 1,
    historySchema: "lane-watch-workflow-history-page/v1",
    campaignStateSchema: "campaign-control-state/v1",
    coordinationSchema: "campaign-coordination-interface/v1",
    observationIsNonAuthoritative: true,
    historyPreviewCount: 24,
    historyPageReturned: 50,
    compactLaneDetailsOmitted: true,
    compactEvidenceOmitted: true,
    fullRunHasEvidence: true,
    fullLaneMatches: true,
  });
  if (readModel.authorizedProjects.includes("*")) {
    expect(readModel.projectIndexCount).toBeGreaterThan(1);
  } else {
    expect(readModel.projectIndexIds).toEqual([...readModel.authorizedProjects].sort());
  }
  expect(["observe-only", "imported-wave", "controller-owned-execution"]).toContain(readModel.coordinationMode);
  expect(readModel.historyTotal).toBeGreaterThan(readModel.historyPreviewCount);
  expect(readModel.laneCount).toBeGreaterThan(0);

  const selectable = page.locator("#next-action p").first();
  const selectedText = await selectable.evaluate((element) => {
    const selection = getSelection();
    const range = document.createRange();
    range.selectNodeContents(element);
    selection?.removeAllRanges();
    selection?.addRange(range);
    return selection?.toString() || "";
  });
  expect(selectedText.length).toBeGreaterThan(10);
  await page.waitForTimeout(1200);
  expect(await page.evaluate(() => getSelection()?.toString() || "")).toBe(selectedText);

  const liveFilter = page.getByRole("button", { name: "Live", exact: true });
  await liveFilter.scrollIntoViewIfNeeded();
  await liveFilter.click();
  const firstLane = page.locator(".lane-card").first();
  if (await firstLane.count()) {
    await firstLane.click();
    await expect(page.locator(".lane-dialog")).toBeVisible();
    await expect(page.locator(".lane-dialog .dialog-section").first()).toContainText("Snapshot");
    await page.getByRole("button", { name: "Close lane details" }).click();
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator("#next-action").scrollIntoViewIfNeeded();
  await expect(page.locator("#next-action")).toBeInViewport();
  const railButtons = page.locator("#next-action .rail-actions button");
  if (await railButtons.count()) await expect(railButtons.first()).toBeInViewport();
  await page.screenshot({ path: `${outputRoot}/lane-watch-svelte-v105-mobile-ready.png`, fullPage: true });
});

test("campaign map and redirect intake are workable on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(url);
  await openWorkspace(page, "#strategy-workspaces");
  await openWorkspace(page, "#evidence-workspace");
  await openWorkspace(page, "#system-workspace");
  const strategy = page.locator("#campaign-strategy");
  await expect(strategy).toBeVisible();
  await expect(strategy.locator(".strategy-vitals > div")).toHaveCount(4);
  await expect(strategy.locator(".strategy-tracks article")).toHaveCount(3);
  await strategy.locator("summary").click();
  await expect(strategy).toContainText("Custody service");
  await strategy.screenshot({ path: `${outputRoot}/campaign-strategy-mobile-v81.png` });
  const resources = page.locator("#resource-economy");
  await expect(resources).toBeVisible();
  await resources.locator("summary").first().click();
  await expect(resources).toContainText("Simulation cannot dispatch");
  const freezeSimulation = resources.getByRole("button", { name: "Freeze scheduler simulation" });
  await freezeSimulation.scrollIntoViewIfNeeded();
  await expect(freezeSimulation).toBeInViewport();
  await expect(resources.locator(".slot-pools > div")).toHaveCount(3);
  await resources.screenshot({ path: `${outputRoot}/campaign-resource-economy-mobile-v84.png` });
  const strategyWorkspace = page.locator("#strategy-workspace");
  await expect(strategyWorkspace).toBeVisible();
  if (!await strategyWorkspace.locator(".strategy-workspace-body").isVisible()) await strategyWorkspace.locator("summary").first().click();
  await expect(strategyWorkspace).toContainText("Independent governance lane");
  await expect(strategyWorkspace.getByRole("button", { name: /Ask independent Sol strategist|Activate new epoch/ })).toBeVisible();
  await strategyWorkspace.screenshot({ path: `${outputRoot}/campaign-strategy-workspace-mobile-v81.png` });
  const custody = page.locator("#custody-service");
  await expect(custody).toBeVisible();
  if (!await custody.locator(".custody-body").isVisible()) await custody.locator("summary").first().click();
  await expect(custody).toContainText("Terra local steward");
  await expect(custody).toContainText("No custody contracts are queued");
  await custody.screenshot({ path: `${outputRoot}/campaign-custody-service-mobile-v82.png` });
  const loop = page.locator("#loop-control");
  const operatorGate = page.locator("#operator-gate");
  if (await operatorGate.count()) {
    await loop.getByRole("button", { name: /Resolve the required gate|Review & approve DOC-A1/ }).click();
    await expect(operatorGate).toBeInViewport();
    const approval = operatorGate.getByText("Approve Proposal A’s exact bytes as DOC-A1.");
    await expect(approval).toBeVisible();
    await expect(approval).toBeInViewport();
    const approveButton = operatorGate.getByRole("button", { name: "Approve DOC-A1 & continue" });
    await expect(approveButton).toBeInViewport();
    const checkbox = operatorGate.getByRole("checkbox");
    await checkbox.check();
    await expect(approveButton).toBeEnabled();
    await checkbox.uncheck();
    await operatorGate.screenshot({ path: `${outputRoot}/campaign-operator-gate-mobile-v76.png` });
  } else {
    const loopAction = loop.getByRole("button", { name: /Pause now|Pause automation|Recheck & resume|Run (one|another) complete loop|Continue this loop automatically|Confirm \d+-lane schedule/ });
    if (await loopAction.count()) await expect(loopAction).toBeVisible();
    else await expect(loop).toContainText(/LOOP COMPLETE|PREFLIGHT BLOCKED/);
    await loop.screenshot({ path: `${outputRoot}/autopilot-control-mobile-v105.png` });
  }
  const redirect = page.locator("#external-perspective");
  await expect(redirect).toBeVisible();
  if (!await redirect.locator("#redirect-content").isVisible()) await redirect.locator("summary").first().click();
  await expect(redirect.locator("#redirect-content")).toBeVisible();
  await redirect.screenshot({ path: `${outputRoot}/campaign-redirect-svelte-mobile-v72.png` });
  const settings = page.locator("#campaign-settings");
  await settings.locator("summary").click();
  await expect(settings.locator(".dispatch-profile")).toHaveCount(3);
  await expect(settings.locator(".automation-setting select")).toBeVisible();
  const map = page.locator(".campaign-map");
  await expect(map).toBeVisible();
  await expect(map.locator(".wave-aggregate-strip")).toContainText("PROJECTION ONLY");
  const repairPlan = map.locator(".wave-repair-plan");
  if (await repairPlan.count()) {
    await repairPlan.locator("summary").click();
    await expect(repairPlan).toContainText("RECONCILE FIRST");
    await expect(repairPlan).toContainText("NO WRITE AUTHORITY");
    await repairPlan.screenshot({ path: `${outputRoot}/campaign-wave-repair-mobile-v86.png` });
  } else {
    await expect(map).not.toContainText("ACCOUNTING GAP");
  }
  const historyResponse = page.waitForResponse((response) => /\/api\/workflow-history\?/.test(response.url()) && response.ok());
  await map.getByRole("button", { name: "Replay", exact: true }).click();
  await historyResponse;
  await expect(map.locator(".replay-toolbar")).toBeVisible();
  await expect(map.locator(".replay-buttons").getByRole("button", { name: "Play" })).toBeVisible();
  await map.screenshot({ path: `${outputRoot}/campaign-flow-xyflow-replay-mobile-v78.png` });
  await map.getByRole("button", { name: "Workflow" }).click();
  await expect(map.locator(".journey-stop")).toHaveCount(5);
  await map.screenshot({ path: `${outputRoot}/campaign-line-workflow-mobile-v105.png` });
  await page.locator("#loop-control").screenshot({ path: `${outputRoot}/autopilot-control-mobile-v105.png` });
});

test("a proposed multi-member schedule is clear and actionable on desktop and mobile", async ({ page }) => {
  await page.route(/\/api\/events(?:\?.*)?$/, async (route) => route.fulfill({ status: 200, contentType: "text/event-stream", body: "" }));
  await page.route(/\/api\/control(?:\?.*)?$/, async (route) => {
    const response = await route.fetch();
    const control = await response.json() as any;
    const project = control.projects.find((candidate: any) => candidate.id === "cfg23");
    project.phase = "RESEARCH_READY";
    project.researchSchedule = {
      id: "synthetic-schedule",
      digest: `sha256:${"a".repeat(64)}`,
      status: "proposed",
      authority: "none",
      canConfirm: true,
      canDispatch: false,
      proposal: {
        budget: { reservedTokens: 160000, effectiveTokenLimit: 240000, remainingTokens: 80000 },
        slots: { capacity: 3, active: 0, available: 3, reserved: 2 },
        invariants: { valid: true, humanConfirmationRequired: true, dispatched: false },
      },
      members: [
        { requestId: "request-a", ordinal: 1, taskId: "rctl-omega-target-character-transport", profile: "sonnet-worker", tokenCap: 80000, trackId: "coverage", workKind: "frontier", expectedDelta: "Audit the exact target-character dictionary and every scalar normalization.", status: "reserved" },
        { requestId: "request-b", ordinal: 2, taskId: "rctl-defect3-aa-witness", profile: "sonnet-worker", tokenCap: 80000, trackId: "supply", workKind: "experiment", expectedDelta: "Compute defect three on the complete defect-two variety.", status: "reserved" },
      ],
      deferred: [
        { requestId: "request-c", taskId: "rctl-source-to-middle-image", decision: "WAIT_DEPENDENCY", decisionReason: "Waiting for the target-character dictionary receipt." },
      ],
    };
    await route.fulfill({ response, json: control });
  });
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(url);
  const loop = page.locator("#loop-control");
  await expect(loop).toBeVisible();
  await expect(loop).toContainText("Confirm 2-lane schedule");
  await expect(loop).toContainText("160,000 tokens reserved");
  await expect(loop).toContainText("2/3 available slots");
  await expect(loop).toContainText("NO DISPATCH AUTHORITY");
  await expect(loop.getByRole("button", { name: "Confirm 2-lane schedule" })).toBeVisible();
  await loop.screenshot({ path: `${outputRoot}/campaign-wave-schedule-desktop-v87.png` });
  await page.setViewportSize({ width: 390, height: 844 });
  await loop.scrollIntoViewIfNeeded();
  await expect(loop.getByRole("button", { name: "Confirm 2-lane schedule" })).toBeInViewport();
  await expect(loop).toContainText("rctl-omega-target-character-transport");
  await expect(loop).toContainText("Deferred candidates");
  await loop.screenshot({ path: `${outputRoot}/campaign-wave-schedule-mobile-v87.png` });
});

test("the separate custody executor has a compact lease and receipt rail on desktop and mobile", async ({ page }) => {
  await page.route(/\/api\/events(?:\?.*)?$/, async (route) => route.fulfill({ status: 200, contentType: "text/event-stream", body: "" }));
  await page.route(/\/api\/control(?:\?.*)?$/, async (route) => {
    const response = await route.fetch();
    const control = await response.json() as any;
    const project = control.projects.find((candidate: any) => candidate.id === "cfg23");
    const acceptance = {
      acceptanceCriteria: ["The receipt index contains the accepted content hash."],
      allowedPaths: ["custody/index.json"],
      receiptType: "campaign-custody-execution-receipt/v1",
      stopCondition: "Stop if any other path must change.",
    };
    const preparedLease = {
      id: "custody-lease-prepared", itemId: "custody-ready", adapterId: "terra-local-steward", status: "prepared",
      leaseDigest: `sha256:${"b".repeat(64)}`, receiptDigest: "", producerCommit: "", createdAt: new Date().toISOString(),
      lease: { adapter: { executionMode: "isolated-worktree" }, budget: { maxTokens: 20000, maxMinutes: 30, maxChangedPaths: 8 }, workspace: { baseCommit: "a".repeat(40) } },
      verification: {}, receipt: {},
    };
    const reviewLease = {
      id: "custody-lease-review", itemId: "custody-review", adapterId: "terra-local-steward", status: "awaiting_review",
      leaseDigest: `sha256:${"c".repeat(64)}`, receiptDigest: `sha256:${"d".repeat(64)}`, producerCommit: "e".repeat(40), createdAt: new Date().toISOString(),
      worktreePath: "C:/Temp/lane-watch-custody/cfg23/custody-lease-review",
      lease: { adapter: { executionMode: "isolated-worktree" } },
      receipt: {
        status: "COMPLETED", summary: "Indexed the accepted receipt without touching campaign semantics.",
        effects: { changedPaths: ["custody/index.json"] }, usage: { tokens: 6250, minutes: 8, tokenMeasurement: "app-server" },
        checks: [{ id: "index-entry", status: "PASS", detail: "The content hash appears exactly once." }],
      },
      verification: { ok: true, landable: true, warnings: [] },
    };
    project.custody = {
      schema: "campaign-custody-service/v1", mode: "human-gated", executorConnected: true, executorEligible: 1,
      counts: { total: 2, open: 2, proposed: 0, ready: 1, parked: 0, active: 1, complete: 0, blocking: 0 },
      policy: { maxAutomaticRepairGeneration: 1, readyDoesNotDispatch: true, leaseConfirmationAuthority: "human", receiptLandingAuthority: "human" },
      violations: [],
      items: [
        { id: "custody-ready", task: "Archive the admitted receipt", reason: "Keep mechanical provenance outside the frontier queue.", urgency: "SOON", capability: "archive", strategicTrack: "decision", blocksResearch: false, repairGeneration: 0, effortClass: "small", contractComplete: true, generationAllowed: true, eligibleToReady: false, status: "ready", acceptance, activeLease: preparedLease },
        { id: "custody-review", task: "Repair the bounded receipt index", reason: "One admitted hash was absent from the mechanical index.", urgency: "NOW", capability: "repair", strategicTrack: "decision", blocksResearch: false, repairGeneration: 1, effortClass: "small", contractComplete: true, generationAllowed: true, eligibleToReady: false, status: "verifying", acceptance, activeLease: reviewLease },
      ],
      protocol: { mode: "human-gated-execution", executorConnected: true, counts: { prepared: 1, confirmed: 0, running: 0, awaitingReview: 1, completed: 0 }, leases: [reviewLease, preparedLease] },
    };
    await route.fulfill({ response, json: control });
  });
  await page.setViewportSize({ width: 1280, height: 1000 });
  await page.goto(url);
  await openWorkspace(page, "#evidence-workspace");
  const custody = page.locator("#custody-service");
  await expect(custody).toBeVisible();
  await expect(custody).toContainText("SEPARATE EXECUTOR");
  await expect(custody).toContainText("2. Confirm this revision and contract");
  await expect(custody.getByRole("button", { name: "Confirm exact lease" })).toBeVisible();
  await expect(custody).toContainText("4. Review and land—or reject");
  await expect(custody.getByRole("button", { name: "Accept & land locally" })).toBeVisible();
  await expect(custody).toContainText("custody/index.json");
  await custody.screenshot({ path: `${outputRoot}/campaign-custody-executor-desktop-v88.png` });
  await page.setViewportSize({ width: 390, height: 844 });
  const land = custody.getByRole("button", { name: "Accept & land locally" });
  await land.scrollIntoViewIfNeeded();
  await expect(land).toBeInViewport();
  await expect(custody.getByRole("button", { name: "Reject result" })).toBeVisible();
  await custody.screenshot({ path: `${outputRoot}/campaign-custody-executor-mobile-v88.png` });
});
