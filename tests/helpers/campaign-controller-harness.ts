import { Database } from "bun:sqlite";
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { CampaignControl } from "../../src/campaign";

export const noModelCodex = () => ({
  onNotification() {}, onServerRequest() {}, onError() {}, stop() {},
  async connect() { throw new Error("The finite controller fixture cannot contact a model"); },
  async startTurn() { throw new Error("The finite controller fixture cannot start a turn"); },
});

export function seedRunningAction(root: string): void {
  const db = new Database(join(root, "observer.sqlite"));
  try {
    db.query(`INSERT INTO campaign_actions(action_id,project_id,action_type,target_id,idempotency_key,
      expected_version,status,args_json,result_json,error,created_by,created_at,started_at,completed_at)
      VALUES ('fixture-action','fixture','fixture.no-execution','','fixture-key',1,'running','{}','{}','','fixture',?,?,'')`)
      .run(new Date().toISOString(), new Date().toISOString());
  } finally { db.close(); }
}

// A finite model-free process using the actual controller startup entrypoint.
if (import.meta.main) {
  const [root, manifest, marker] = process.argv.slice(2);
  if (!root || !manifest || !marker) throw new Error("Fixture requires its temporary root, manifest and marker");
  setTimeout(() => process.exit(0), 12_000);
  const control = await CampaignControl.create(root, manifest, noModelCodex() as any);
  seedRunningAction(root);
  writeFileSync(marker, JSON.stringify(control.controllerIdentity()));
  await Bun.sleep(12_000);
  control.stop();
}
