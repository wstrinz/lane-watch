import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  testMatch: /.*\.pw\.ts/,
  timeout: 30_000,
  use: {
    browserName: "chromium",
    headless: true,
    serviceWorkers: "block",
  },
  reporter: "line",
});
