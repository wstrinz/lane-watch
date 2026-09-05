import { expect, test } from "bun:test";
import { Database } from "bun:sqlite";
import { existsSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { CampaignControl } from "../src/campaign";
import { CampaignControllerLease } from "../src/campaign-controller-lease";
import { noModelCodex, seedRunningAction } from "./helpers/campaign-controller-harness";

function fixture() {
  const root = mkdtempSync(join(tmpdir(), "lane-watch-controller-owner-"));
  const manifest = join(root, "projects.json");
  writeFileSync(manifest, JSON.stringify({ projects: [] }));
  return { root, manifest };
}
function action(root: string): any {
  const db = new Database(join(root, "observer.sqlite"), { readonly: true });
  try { return db.query("SELECT * FROM campaign_actions WHERE action_id='fixture-action'").get(); }
  finally { db.close(); }
}

test("a second controller cannot run recovery against the live owner's campaign", async () => {
  const f = fixture();
  const first = await CampaignControl.create(f.root, f.manifest, noModelCodex() as any);
  try {
    seedRunningAction(f.root);
    const before = action(f.root);
    await expect(CampaignControl.create(f.root, f.manifest, noModelCodex() as any)).rejects.toThrow("already owned");
    expect(action(f.root)).toEqual(before);
    expect(first.controllerIdentity()).toMatchObject({ pid: process.pid, recoveredFromPid: null });
  } finally { first.stop(); first.stop(); }
  const next = await CampaignControl.create(f.root, f.manifest, noModelCodex() as any);
  try {
    expect(next.controllerIdentity().instanceId).not.toBe(first.controllerIdentity().instanceId);
    expect(next.controllerIdentity().recoveredFromPid).toBeNull();
    expect(action(f.root).status).toBe("failed");
    expect(action(f.root).error).toContain("not replayed");
  } finally { next.stop(); }
});

test("different data directories can have controllers in the same process", async () => {
  const a = fixture(), b = fixture();
  const first = await CampaignControl.create(a.root, a.manifest, noModelCodex() as any);
  const second = await CampaignControl.create(b.root, b.manifest, noModelCodex() as any);
  try { expect(first.controllerIdentity().instanceId).not.toBe(second.controllerIdentity().instanceId); }
  finally { first.stop(); second.stop(); }
});

test("failed startup closes its database and releases ownership for a corrected manifest", async () => {
  const f = fixture();
  writeFileSync(f.manifest, "invalid-json");
  await expect(CampaignControl.create(f.root, f.manifest, noModelCodex() as any)).rejects.toThrow();
  writeFileSync(f.manifest, JSON.stringify({ projects: [] }));
  const next = await CampaignControl.create(f.root, f.manifest, noModelCodex() as any);
  try { expect(next.controllerIdentity().recoveredFromPid).toBeNull(); }
  finally { next.stop(); }
});

test("invalid retained ownership fails closed before campaign database creation", async () => {
  const f = fixture(), path = join(f.root, "controller-owner.sqlite");
  const lease = CampaignControllerLease.acquire(path);
  lease.release();
  const db = new Database(path);
  db.run("UPDATE campaign_controller_owner SET owner_nonce='invalid',released_at=''");
  db.close();
  await expect(CampaignControl.create(f.root, f.manifest, noModelCodex() as any)).rejects.toThrow("ownership is invalid");
  expect(existsSync(join(f.root, "observer.sqlite"))).toBe(false);
});

test("a real controller crash permits recovery only after its process has exited", async () => {
  const f = fixture(), marker = join(f.root, "controller.json");
  const child = Bun.spawn([process.execPath, join(import.meta.dir, "helpers", "campaign-controller-harness.ts"), f.root, f.manifest, marker],
    { stdout: "ignore", stderr: "pipe", windowsHide: true });
  let recovered: CampaignControl | undefined;
  try {
    const until = Date.now() + 8000;
    while (!existsSync(marker) && child.exitCode === null && Date.now() < until) await Bun.sleep(50);
    if (!existsSync(marker)) {
      if (child.exitCode === null) { child.kill(); await child.exited; }
      throw new Error("Finite owner did not start: " + await new Response(child.stderr).text());
    }
    const old = JSON.parse(readFileSync(marker, "utf8"));
    expect(old.pid).toBe(child.pid);
    process.kill(child.pid, 0);
    await expect(CampaignControl.create(f.root, f.manifest, noModelCodex() as any)).rejects.toThrow("already owned");
    expect(action(f.root).status).toBe("running");
    child.kill(); await child.exited;
    recovered = await CampaignControl.create(f.root, f.manifest, noModelCodex() as any);
    expect(recovered.controllerIdentity()).toMatchObject({ pid: process.pid, recoveredFromPid: child.pid });
    expect(recovered.controllerIdentity().instanceId).not.toBe(old.instanceId);
    expect(action(f.root).status).toBe("failed");
    expect(action(f.root).error).toContain("not replayed");
  } finally {
    if (child.exitCode === null) { child.kill(); await child.exited; }
    recovered?.stop();
  }
}, 15000);
