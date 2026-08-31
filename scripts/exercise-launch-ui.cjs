const { chromium } = require("C:/Users/wstri/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright");

const target = process.argv[2] || "http://127.0.0.1:4317/projects/cfg23";
const screenshotPath = process.argv[3] || "data/launch-browser-proof.png";

(async () => {
  const browser = await chromium.launch({ headless: true, channel: "msedge" });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
  try {
    await page.goto(target, { waitUntil: "domcontentloaded" });
    await page.locator(".lifecycle-focus").waitFor({ state: "visible", timeout: 30_000 });
    await page.waitForTimeout(1_500);
    const before = await page.evaluate(async () => {
      const body = await fetch("/api/control").then((response) => response.json());
      return body.projects.find((project) => project.id === "cfg23");
    });
    const activeBefore = before.researchRuns.filter((run) => ["launching", "running"].includes(run.status));
    if (before.phase !== "RESEARCH_READY") throw new Error(`Expected RESEARCH_READY, found ${before.phase}`);
    if (activeBefore.length) throw new Error(`Refusing duplicate dispatch: ${activeBefore.length} run(s) already active`);
    const requestId = before.researchDispatch?.nextRequestId;
    const taskId = before.researchDispatch?.spec?.taskId;
    if (!requestId || !taskId) throw new Error("No checked launch contract is available");
    const launch = page.locator(`.lifecycle-focus [data-control-action="research-dispatch-start"][data-request-id="${requestId}"]`);
    await launch.waitFor({ state: "visible", timeout: 30_000 });
    await launch.click();
    await page.waitForFunction(async ({ taskId }) => {
      const body = await fetch("/api/control").then((response) => response.json());
      const project = body.projects.find((candidate) => candidate.id === "cfg23");
      const run = project.researchRuns.find((candidate) => candidate.taskId === taskId);
      return run && ["running", "failed"].includes(run.status);
    }, { taskId }, { timeout: 90_000 });
    let after;
    for (let attempt = 0; attempt < 20; attempt++) {
      after = await page.evaluate(async () => {
        const body = await fetch("/api/control").then((response) => response.json());
        return body.projects.find((project) => project.id === "cfg23");
      });
      const candidate = after.researchRuns.find((item) => item.taskId === taskId);
      if (candidate?.status === "running") break;
      if (candidate?.status === "failed") throw new Error(`Launch failed: ${candidate.error}`);
      await page.waitForTimeout(250);
    }
    const run = after.researchRuns.find((candidate) => candidate.taskId === taskId);
    const activeAfter = after.researchRuns.filter((candidate) => ["launching", "running"].includes(candidate.status));
    if (run?.status !== "running") throw new Error(`Launch did not reach running: ${run?.error || run?.status || "missing run"}`);
    if (activeAfter.length !== 1 || activeAfter[0].id !== run.id) throw new Error(`Expected exactly one active run, found ${activeAfter.length}`);
    await page.locator(".lifecycle-focus").waitFor({ state: "visible" });
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(JSON.stringify({
      phaseBefore: before.phase,
      phaseAfter: after.phase,
      requestId,
      taskId,
      runId: run.id,
      laneId: run.laneId,
      jobId: run.jobId,
      profile: run.profile,
      activeRuns: activeAfter.length,
      screenshotPath,
    }));
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error?.stack || String(error));
  process.exitCode = 1;
});
