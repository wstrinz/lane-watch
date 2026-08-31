const { chromium } = require("C:/Users/wstri/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright");

const target = process.argv[2] || "http://127.0.0.1:4317/projects/cfg23";
const screenshotPath = process.argv[3] || "data/conversation-browser-proof.png";
const viewportWidth = Number(process.argv[4] || 1440);

(async () => {
  const browser = await chromium.launch({ headless: true, channel: "msedge" });
  const page = await browser.newPage({ viewport: { width: viewportWidth, height: 1100 } });
  try {
    await page.goto(target, { waitUntil: "domcontentloaded" });
    await page.locator(".lifecycle-focus").waitFor({ state: "visible", timeout: 30_000 });
    // A newly installed PWA shell may claim the page once. Let that controlled
    // reload settle before taking a state snapshot.
    await page.waitForTimeout(1_500);
    await page.locator(".lifecycle-focus").waitFor({ state: "visible", timeout: 30_000 });
    const campaignState = await page.evaluate(async () => {
      const body = await fetch("/api/control").then((response) => response.json());
      return body.projects.find((project) => project.id === "cfg23");
    });
    if (["RESEARCH_REVIEW", "RESEARCH_READY", "RESEARCH_RUNNING", "RESEARCH_INTAKE"].includes(campaignState.phase)) {
      const review = page.locator(".research-review-panel.active");
      await review.waitFor({ state: "visible", timeout: 30_000 });
      const plannedRequestCount = Array.isArray(campaignState.researchPlan?.response?.lanes)
        ? campaignState.researchPlan.response.lanes.length
        : campaignState.researchRequests.filter((request) => request.waveId === campaignState.wave?.id).length;
      if (await review.locator(".research-request-list article").count() !== plannedRequestCount) throw new Error("Displayed candidate-lane count does not match the current checked plan");
      for (const selector of [".synthesis-history", ".coordinator-history", ".source-wave-history"]) {
        if (await page.locator(selector).getAttribute("open") !== null) throw new Error(`${selector} is expanded by default`);
      }
      await page.locator(".coordinator-history").evaluate((details) => { details.open = true; });
    }
    const panel = page.locator(".coordinator-conversation");
    await panel.waitFor({ state: "visible", timeout: 30_000 });
    await page.locator(".conversation-message").first().waitFor({ state: "visible", timeout: 30_000 });

    const transcript = page.locator("#conversation-transcript");
    const textarea = page.locator("#coordinator-message");
    const send = page.locator('[data-control-action="send-coordinator-message"]');
    const copiedText = await page.locator(".lifecycle-focus h3").evaluate((element) => {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(element);
      selection.removeAllRanges();
      selection.addRange(range);
      return selection.toString();
    });
    await page.locator('[data-control-action="refresh-conversation"]').evaluate((button) => button.click());
    await page.waitForFunction((expected) => window.getSelection()?.toString() === expected, copiedText);
    await page.waitForFunction(() => {
      const button = document.querySelector('[data-control-action="refresh-conversation"]');
      return button && !button.disabled && button.textContent.includes("Sync history");
    });
    if (await page.evaluate(() => window.getSelection()?.toString()) !== copiedText) throw new Error("Live refresh discarded an ordinary page-text selection");
    await page.evaluate(() => window.getSelection()?.removeAllRanges());
    await page.waitForTimeout(100);
    const draft = "Draft preservation probe — do not send";
    await textarea.fill(draft);
    const editBefore = await textarea.evaluate((element) => {
      element.focus({ preventScroll: true });
      element.setSelectionRange(9, 21);
      return { id: document.activeElement?.id, start: element.selectionStart, end: element.selectionEnd, pageScrollY: window.scrollY };
    });
    const beforeScroll = await transcript.evaluate((element) => {
      const top = Math.round((element.scrollHeight - element.clientHeight) * 0.43);
      element.scrollTop = top;
      element.dispatchEvent(new Event("scroll"));
      return { top: element.scrollTop, max: element.scrollHeight - element.clientHeight };
    });
    await page.locator('[data-control-action="refresh-conversation"]').evaluate((button) => button.click());
    await page.waitForFunction((expected) => document.querySelector("#coordinator-message")?.value === expected, draft);
    await page.waitForFunction(() => {
      const button = document.querySelector('[data-control-action="refresh-conversation"]');
      return button && !button.disabled && button.textContent.includes("Sync history");
    });
    const afterScroll = await transcript.evaluate((element) => ({ top: element.scrollTop, max: element.scrollHeight - element.clientHeight }));
    const editAfter = await textarea.evaluate((element) => ({ id: document.activeElement?.id, start: element.selectionStart, end: element.selectionEnd, pageScrollY: window.scrollY }));

    const apiProjection = await page.evaluate(async () => {
      const response = await fetch("/api/codex/conversation?project=cfg23");
      return { status: response.status, body: await response.json() };
    });
    if (apiProjection.status !== 200) throw new Error(apiProjection.body?.error || "Conversation API failed");
    if (!apiProjection.body.messages?.length) throw new Error("Conversation API returned no projected messages");
    if (JSON.stringify(apiProjection.body).includes("commandExecution")) throw new Error("Raw tool items leaked into the projection");
    if (await textarea.inputValue() !== draft) throw new Error("Live refresh discarded the message draft");
    if (editAfter.id !== "coordinator-message" || editAfter.start !== editBefore.start || editAfter.end !== editBefore.end) throw new Error(`Live refresh discarded editing focus or selection: ${JSON.stringify({ editBefore, editAfter })}`);
    if (Math.abs(editAfter.pageScrollY - editBefore.pageScrollY) > 2) throw new Error(`Live refresh moved the page from ${editBefore.pageScrollY} to ${editAfter.pageScrollY}`);
    if (await send.isDisabled()) throw new Error("Send control stayed disabled with a non-empty draft");
    if (Math.abs(afterScroll.top - beforeScroll.top) > 3) throw new Error(`Transcript scroll moved from ${beforeScroll.top} to ${afterScroll.top}`);
    const lifecycle = await page.locator(".lifecycle-focus").innerText();
    if (!/HUMAN LAUNCH GATE|HUMAN WAVE-PLAN GATE|BOUNDED WAVE ACTIVE|EVIDENCE INTAKE|CURRENT LIFECYCLE STAGE/.test(lifecycle)) throw new Error(`Lifecycle focus is unclear: ${lifecycle}`);
    if (campaignState.phase === "SYNTHESIS_READY" && (!lifecycle.includes("Ready for synthesis") || !lifecycle.includes("5/5 lanes accounted"))) throw new Error(`Synthesis readiness is unclear: ${lifecycle}`);
    if (campaignState.phase === "DECISION_REQUIRED") {
      if (!lifecycle.includes("Synthesis decision required") || !lifecycle.includes("Sol recommends research before advancing")) throw new Error(`Decision state is unclear: ${lifecycle}`);
      if (!await page.locator('.lifecycle-focus [data-control-action="review-synthesis"][data-decision="research"]').isVisible()) throw new Error("Recommended research action is not foregrounded");
      if (!await page.locator('.lifecycle-focus [data-control-action="review-synthesis"][data-decision="accept"]').isVisible()) throw new Error("Approve and advance action is not foregrounded");
      const proposal = page.locator("#synthesis-review");
      const rundown = await proposal.locator(".proposal-rundown").innerText();
      const normalizedRundown = rundown.toLowerCase();
      if (!normalizedRundown.includes("wave result") || !normalizedRundown.includes("claim ledger") || !normalizedRundown.includes("proposed next wave")) throw new Error(`Proposal rundown is incomplete: ${rundown}`);
      if (await proposal.locator(".proposal-raw").getAttribute("open") !== null) throw new Error("Raw synthesis JSON is expanded by default");
      if (!await page.locator(".synthesis-message-card").last().isVisible()) throw new Error("Synthesis JSON was not replaced by a compact conversation card");
    }
    if (campaignState.phase === "RESEARCH_REVIEW") {
      const proposed = campaignState.researchRequests.filter((request) => request.status === "proposed").length;
      const inReview = campaignState.researchRequests.filter((request) => request.status === "in_review").length;
      if (proposed && (!lifecycle.includes("Research plan queued") || !lifecycle.includes("not under review"))) throw new Error(`Queued research-plan state is unclear: ${lifecycle}`);
      if (proposed && !await page.locator('[data-control-action="research-review-start"]').first().isVisible()) throw new Error("Research plan review has no foregrounded start action");
      if (inReview && (!lifecycle.includes("Research plan review in progress") || !lifecycle.includes("No research has run yet"))) throw new Error(`Active plan-review state is unclear: ${lifecycle}`);
      if (!await page.locator(".synthesis-brief").isVisible()) throw new Error("Research review lacks a visible situation synthesis");
      const stats = await page.locator(".campaign-stat-row").innerText();
      if (!stats.replace(/\s+/g, " ").includes("0 dispatched")) throw new Error(`Research dispatch state is unclear: ${stats}`);
      if (await page.locator(".coordinator-history").getAttribute("open") === null) throw new Error("Opened coordinator history did not survive a live rerender");
    }
    if (campaignState.phase === "RESEARCH_READY") {
      if (!lifecycle.includes("Wave launch is ready") || !lifecycle.includes("Nothing is dispatching")) throw new Error(`Research-ready state is unclear: ${lifecycle}`);
      const operations = await page.locator("#research-operations").innerText();
      for (const label of ["READY TO LAUNCH", "0 dispatching", "0 running", "0 evidence", "DISPATCH PREVIEW", "Launch from the persistent Next action control"]) {
        if (!operations.replace(/\s+/g, " ").includes(label)) throw new Error(`Research operations deck is missing ${label}: ${operations}`);
      }
      if (!await page.locator('.lifecycle-focus [data-control-action="research-dispatch-start"]').isVisible()) throw new Error("The persistent confirmed research launch control is not visible");
    }
    if (campaignState.canRequestSynthesis && !await page.locator('.lifecycle-focus [data-control-action="request-synthesis"]').isVisible()) throw new Error("Synthesis next action is not foregrounded");
    if (await page.locator(".triage-proposal.historical-record").getAttribute("open") !== null) throw new Error("Applied triage is expanded by default");
    if (await page.locator(".wave-accounting.historical-record").getAttribute("open") !== null) throw new Error("Completed accounting is expanded by default");
    if (!await page.locator(".structured-message").last().isVisible()) throw new Error("Structured coordinator output was not formatted");
    const progress = await page.locator(".coordinator-progress").innerText();
    if (!progress.includes("SESSION ACTIVITY") || !progress.includes("Session details")) throw new Error(`Coordinator progress panel is incomplete: ${progress}`);
    const horizontalOverflow = await page.evaluate(() => ({
      viewport: innerWidth,
      document: document.documentElement.scrollWidth,
      offenders: [...document.querySelectorAll("body *")].map((element) => ({
        tag: element.tagName,
        className: typeof element.className === "string" ? element.className : "",
        width: Math.round(element.getBoundingClientRect().width),
        right: Math.round(element.getBoundingClientRect().right),
        scrollWidth: element.scrollWidth,
      })).filter((item) => item.right > innerWidth + 2 || item.width > innerWidth + 2).slice(0, 8),
    }));
    if (horizontalOverflow.document > horizontalOverflow.viewport + 2) throw new Error(`Page overflows horizontally: ${JSON.stringify(horizontalOverflow)}`);
    if (["RESEARCH_REVIEW", "RESEARCH_READY", "RESEARCH_RUNNING", "RESEARCH_INTAKE"].includes(campaignState.phase)) await page.locator(".coordinator-history").evaluate((details) => { details.open = false; });

    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(JSON.stringify({
      url: page.url(),
      messageCount: apiProjection.body.messages.length,
      firstRole: apiProjection.body.messages[0].role,
      lastRole: apiProjection.body.messages.at(-1).role,
      sendLabel: await send.innerText(),
      draftPreserved: true,
      copiedTextPreserved: copiedText,
      editingStatePreserved: { before: editBefore, after: editAfter },
      scrollPreserved: { before: beforeScroll, after: afterScroll },
      lifecycle: lifecycle.replaceAll("\n", " · "),
      progress: progress.slice(0, 500).replaceAll("\n", " · "),
      horizontalOverflow,
      screenshotPath,
    }));
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error?.stack || String(error));
  process.exitCode = 1;
});
