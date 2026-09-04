import { expect, test } from "bun:test";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createHash } from "node:crypto";
import { runGit } from "../src/git";
import { custodyInputReadiness } from "../src/custody-input-manifest";
import { verifyCustodyInputs } from "../src/custody-inputs";
import { custodyLineageCosts } from "../src/custody-cost";
import { nextCustodyAutopilotStep } from "../src/autopilot-service";

test("missing explicit inputs stop autopilot before any lease action", () => {
  const inputReadiness = custodyInputReadiness(undefined);
  expect(nextCustodyAutopilotStep({ items: [{ id: "missing", task: "Inventory six runs", status: "ready", blocksResearch: true, inputReadiness }] })).toMatchObject({ kind: "attention" });
  expect(custodyInputReadiness({ files: [{ commit: "a".repeat(40), path: "manifest.json", sha256: "b".repeat(64) }], requiredRecordCount: 6, recordIds: [] })).toMatchObject({ ready: false });
});

test("preflight uses exact blob bytes despite checkout drift and rejects missing inputs", async () => {
  const root = mkdtempSync(join(tmpdir(), "lane-watch-input-test-"));
  async function git(...args: string[]) { const result = await runGit(root, args); expect(result.exitCode).toBe(0); return result.stdout; }
  await git("init");
  const source = "{\"runs\":[\"run-a\"]}\r\n";
  writeFileSync(join(root, "manifest.json"), source);
  await git("-c", "core.autocrlf=false", "add", "manifest.json");
  await git("-c", "user.name=Test", "-c", "user.email=test@example.invalid", "commit", "-m", "fixture");
  const commit = await git("rev-parse", "HEAD");
  const manifest = { files: [{ commit, path: "manifest.json", sha256: createHash("sha256").update(source).digest("hex") }], requiredRecordCount: 1, recordIds: ["run-a"] };
  writeFileSync(join(root, "manifest.json"), "changed checkout");
  await verifyCustodyInputs(root, manifest);
  await expect(verifyCustodyInputs(root, { ...manifest, files: [{ ...manifest.files[0], path: "missing.json" }] })).rejects.toThrow("missing source blob");
  await expect(verifyCustodyInputs(root, { ...manifest, files: [{ ...manifest.files[0], sha256: "0".repeat(64) }] })).rejects.toThrow("hash mismatch");
  await expect(verifyCustodyInputs(root, { ...manifest, requiredHost: "darwin" }, "win32")).rejects.toThrow("requires darwin");
  expect(custodyInputReadiness({ files: [{ ...manifest.files[0], path: "../outside" }] }).ready).toBe(false);
});

test("all attempts remain charged through splits and unknown usage is explicit", () => {
  const items = [{ id: "parent" }, { id: "child", sourceType: "custody-reshape", sourceId: "parent" }, { id: "grandchild", sourceType: "custody-reshape", sourceId: "child" }];
  const leases = [{ itemId: "parent", status: "failed", receipt: { usage: { tokens: 200 } } }, { itemId: "child", status: "blocked", receipt: {} }, { itemId: "grandchild", status: "completed", receipt: { usage: { tokens: 50 } } }];
  expect(custodyLineageCosts(items, leases).get("grandchild")).toEqual({ attempts: 3, knownTokens: 250, unreported: 1, landed: 1 });
});

test("a missing-input branch preserves its hold while an independent ready root advances", () => {
  const stopped = { id: "missing", task: "Missing sources", status: "proposed", blocksResearch: true, inputReadiness: { ready: false, reason: "Missing manifest" }, createdAt: "2026-09-01" };
  const ready = { id: "ready", task: "Independent check", status: "ready", blocksResearch: true, inputReadiness: { ready: true }, createdAt: "2026-09-02" };
  expect(nextCustodyAutopilotStep({ items: [stopped, ready] })).toMatchObject({ kind: "action", type: "custody.lease.prepare", targetId: "ready" });
});
