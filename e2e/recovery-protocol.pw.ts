import { expect, test, type Page } from "@playwright/test";
import { mkdirSync } from "node:fs";

const url = process.env.LANE_WATCH_URL || "http://127.0.0.1:4317/projects/cfg23";
const outputRoot = process.env.LANE_WATCH_VISUAL_DIR || "test-results/visuals";
const reportId = "recovery-report-1";
const reportDigest = `sha256:${"a".repeat(64)}`;
mkdirSync(outputRoot, { recursive: true });

async function installRecoveryFixture(page: Page, prepared: boolean): Promise<void> {
  await page.route(/\/api\/events(?:\?.*)?$/, async (route) => route.fulfill({ status: 200, contentType: "text/event-stream", body: "" }));
  await page.route(/\/api\/control(?:\?.*)?$/, async (route) => {
    const response = await route.fetch();
    const control = await response.json() as any;
    const project = control.projects.find((candidate: any) => candidate.id === "cfg23");
    project.phase = "BLOCKED";
    project.controlState = {
      schema: "campaign-control-state/v1",
      workflow: { phase: "BLOCKED", authority: "human-confirmed", cause: "operator-hold", actor: "operator" },
      observation: { phase: "PLANNING", active: 0, running: 0, terminal: 0, workflowMutation: false },
      recovery: {
        required: true, status: "HUMAN_RECONCILIATION_REQUIRED", workflowPhase: "BLOCKED",
        wavePhase: "DECISION_REQUIRED", activeExecution: 0, authority: "human", automaticMutation: false,
        summary: "The workflow is BLOCKED, while the frozen wave is DECISION_REQUIRED. No controlled execution is active, so an operator must inspect and reconcile the historical boundary.",
      },
    };
    project.recoveryReport = prepared ? {
      id: reportId, projectId: "cfg23", waveId: project.wave.id,
      reportDigest,
      status: "prepared", actor: "operator", decision: "", note: "", appliedBy: "",
      createdAt: "2026-08-30T13:30:00.000Z", updatedAt: "2026-08-30T13:30:00.000Z", appliedAt: "",
      snapshot: {
        schema: "campaign-recovery-report/v1",
        project: { phase: "BLOCKED", version: project.version },
        wave: { phase: "DECISION_REQUIRED", accounting: { accounted: 4, total: 5 } },
        controlState: { recovery: { activeExecution: 0 } },
        projectionRepair: { status: "BLOCKED_ON_EVIDENCE", summary: "One historical member still lacks terminal evidence." },
        choices: { preserveHold: true, alignWaveToWorkflow: true, alignWorkflowToWave: true, applyProjectionRepair: false },
      },
    } : null;
    await route.fulfill({ response, json: control });
  });
}

async function captureActions(page: Page): Promise<any[]> {
  const requests: any[] = [];
  await page.route(/\/api\/actions$/, async (route) => {
    const body = route.request().postDataJSON();
    requests.push(body);
    await route.fulfill({
      status: 202,
      contentType: "application/json",
      body: JSON.stringify({ id: `synthetic-${requests.length}`, projectId: body.projectId, type: body.type, status: "completed", result: {} }),
    });
  });
  return requests;
}

test("an idle workflow mismatch becomes one inspectable recovery rail on desktop and mobile", async ({ page }) => {
  await installRecoveryFixture(page, true);
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(url);
  const rail = page.locator("#next-action");
  await expect(rail).toContainText("RECOVERY REVIEW");
  await expect(rail).toContainText("Workflow and frozen wave disagree");
  await expect(rail).toContainText("OBSERVED ACTIVITY · NON-AUTHORITATIVE");
  await expect(rail.getByRole("button", { name: "Inspect workflow history" })).toBeVisible();
  await expect(rail.getByRole("button", { name: "Inspect frozen wave" })).toBeVisible();
  await expect(rail).toContainText("DIGEST FROZEN");
  await expect(rail.getByLabel("Explicit recovery decision")).toBeVisible();
  await expect(rail.getByRole("option", { name: "Apply terminal-evidence projection repair" })).toHaveAttribute("disabled", "");
  const applyRecovery = rail.getByRole("button", { name: "Apply selected recovery" });
  await expect(applyRecovery).toBeDisabled();
  await rail.getByRole("checkbox").check();
  await expect(applyRecovery).toBeEnabled();
  await rail.screenshot({ path: `${outputRoot}/campaign-recovery-rail-desktop-v93.png` });

  await page.setViewportSize({ width: 390, height: 844 });
  await rail.scrollIntoViewIfNeeded();
  await applyRecovery.scrollIntoViewIfNeeded();
  await expect(applyRecovery).toBeInViewport();
  await rail.screenshot({ path: `${outputRoot}/campaign-recovery-rail-mobile-v93.png` });
});

test("freezing recovery sends only a version-bound prepare action", async ({ page }) => {
  await installRecoveryFixture(page, false);
  const requests = await captureActions(page);
  await page.goto(url);
  const rail = page.locator("#next-action");
  await expect(rail).toContainText("REPORT REQUIRED");
  await rail.getByRole("button", { name: "Freeze recovery report" }).click();
  await expect.poll(() => requests.length).toBe(1);
  expect(requests[0]).toMatchObject({
    projectId: "cfg23",
    type: "campaign.recovery.prepare",
    targetId: "",
    args: {},
  });
  expect(requests[0].expectedVersion).toEqual(expect.any(Number));
  expect(requests[0].idempotencyKey).toMatch(/^campaign\.recovery\.prepare:cfg23:primary-rail:/);
  await expect(rail.getByRole("status")).toContainText("The transition settled");
});

test("applying recovery binds the reviewed digest, decision, rationale, and confirmation", async ({ page }) => {
  await installRecoveryFixture(page, true);
  const requests = await captureActions(page);
  await page.goto(url);
  const rail = page.locator("#next-action");
  await rail.getByLabel("Explicit recovery decision").selectOption("ALIGN_WAVE_TO_WORKFLOW");
  await rail.getByLabel("Recovery rationale").fill("Align only the obsolete frozen wave to the durable human hold.");
  await rail.getByRole("checkbox").check();
  await rail.getByRole("button", { name: "Apply selected recovery" }).click();
  await expect.poll(() => requests.length).toBe(1);
  expect(requests[0]).toMatchObject({
    projectId: "cfg23",
    type: "campaign.recovery.apply",
    targetId: "",
    args: {
      reportId,
      reportDigest,
      decision: "ALIGN_WAVE_TO_WORKFLOW",
      note: "Align only the obsolete frozen wave to the durable human hold.",
      confirmation: "APPLY CAMPAIGN RECOVERY",
    },
  });
  expect(requests[0].expectedVersion).toEqual(expect.any(Number));
  expect(requests[0].idempotencyKey).toMatch(/^campaign\.recovery\.apply:cfg23:recovery-rail:/);
  await expect(rail.getByRole("status")).toContainText("No worker result, dispatch, claim promotion, merge, or push was inferred");
});
