const { chromium } = require("C:/Users/wstri/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright");

const target = process.argv[2] || "http://127.0.0.1:4317/projects/cfg23";
const screenshotPath = process.argv[3] || "data/triage-browser-proof.png";

async function projectState(page) {
  return page.evaluate(async () => {
    const control = await fetch("/api/control").then((response) => response.json());
    const project = control.projects.find((candidate) => candidate.id === "cfg23");
    const action = project.actions.find((candidate) => candidate.type === "wave.triage.request");
    return {
      action,
      coordinator: project.coordinator,
      triage: project.wave?.triage,
      approvals: project.approvals,
      canRequestWaveTriage: project.canRequestWaveTriage,
      canApplyWaveTriage: project.canApplyWaveTriage,
    };
  });
}

(async () => {
  const browser = await chromium.launch({ headless: true, channel: "msedge" });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
  try {
    await page.goto(target, { waitUntil: "networkidle" });
    const button = page.locator('[data-control-action="request-wave-triage"]');
    if (!await button.isVisible().catch(() => false)) {
      const existingState = await projectState(page);
      if (existingState.triage?.status !== "drafted") throw new Error("Neither a triage request nor a drafted proposal is available");
      await page.locator(".triage-proposal").waitFor({ state: "visible", timeout: 15_000 });
      await page.screenshot({ path: screenshotPath, fullPage: true });
      console.log(JSON.stringify({
        stage: "verified-existing",
        state: existingState,
        triagePanel: await page.locator(".triage-proposal").innerText(),
        coordinatorPanel: await page.locator(".coordinator-card").innerText(),
        screenshotPath,
      }));
      return;
    }
    await button.waitFor({ state: "visible", timeout: 15_000 });
    console.log(JSON.stringify({ stage: "rendered", url: page.url(), button: await button.innerText() }));
    await button.click();
    console.log(JSON.stringify({ stage: "clicked" }));
    let afterAction;
    for (let attempt = 0; attempt < 180; attempt += 1) {
      afterAction = await projectState(page);
      if (afterAction.action && !["queued", "running"].includes(afterAction.action.status)) break;
      await page.waitForTimeout(500);
    }
    console.log(JSON.stringify({ stage: "action-complete", state: afterAction }));
    if (afterAction.action?.status !== "completed") throw new Error(afterAction.action?.error || "Triage action did not complete");
    let finalState;
    for (let attempt = 0; attempt < 360; attempt += 1) {
      finalState = await projectState(page);
      if (finalState.triage?.status !== "drafting" || finalState.approvals?.length > 0) break;
      await page.waitForTimeout(500);
    }
    await page.reload({ waitUntil: "domcontentloaded" });
    finalState = await projectState(page);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(JSON.stringify({
      stage: "verified",
      state: finalState,
      triagePanel: await page.locator(".triage-proposal").innerText(),
      coordinatorPanel: await page.locator(".coordinator-card").innerText(),
      screenshotPath,
    }));
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error?.stack || String(error));
  process.exitCode = 1;
});
