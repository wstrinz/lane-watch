import { expect, test } from "@playwright/test";
import { mkdirSync } from "node:fs";

const campaignUrl = new URL(process.env.LANE_WATCH_URL || "http://127.0.0.1:4317/projects/cfg23");
const rootUrl = new URL("/", campaignUrl).href;
const outputRoot = process.env.LANE_WATCH_VISUAL_DIR || "test-results/visuals";
const target = campaignUrl.hostname === "127.0.0.1" || campaignUrl.hostname === "localhost" ? "local" : "tailnet";
mkdirSync(outputRoot, { recursive: true });

test("the root page restores a visible all-jobs lane overview", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(rootUrl, { waitUntil: "domcontentloaded" });

  await expect(page.getByRole("heading", { name: "Every visible lane, in one place" })).toBeVisible();
  await expect(page.locator("#observer-lanes")).toBeVisible();
  await expect(page.locator("#evidence-workspace")).toHaveCount(0);
  await expect(page.getByLabel("Filter by project")).toHaveValue("");
  await expect(page.getByLabel("Filter by project").locator("option")).toContainText(["All projects", "arr15", "cfg23", "math-stuff"]);
  await expect(page.locator(".lane-card").first()).toBeVisible();
  await expect(page.locator('script[src^="/ui.js?v="]')).toHaveCount(1);

  const scopes = await page.evaluate(async () => {
    const [root, cfg23, arr15] = await Promise.all([
      fetch("/api/me", { cache: "no-store" }).then((response) => response.json()),
      fetch("/api/me?project=cfg23", { cache: "no-store" }).then((response) => response.json()),
      fetch("/api/me?project=arr15", { cache: "no-store" }).then((response) => response.json()),
    ]);
    return { root, cfg23, arr15 } as any;
  });
  expect(scopes.root.projects).toContain("*");
  expect(scopes.cfg23.canMutate).toBe(true);
  if (scopes.root.identity === "wstrinz@github") {
    expect(scopes.root.mutableProjects).toEqual(["cfg23"]);
    expect(scopes.root.canMutate).toBe(false);
    expect(scopes.arr15.canMutate).toBe(false);
  }

  await page.screenshot({ path: `${outputRoot}/all-jobs-overview-${target}-v106.png`, fullPage: true });
});
