import { describe, expect, test } from "bun:test";
import { Database } from "bun:sqlite";
import { MultiProjectQuotaService, assessQuotaAdmission } from "../src/multi-project-quota-service";

const policy = { tokenCommitments: 240_000, slots: { strategy: 1, research: 3, custody: 1 } };

describe("global multi-project quota admission", () => {
  test("admits an acquisition that fits every shared envelope", () => {
    expect(assessQuotaAdmission(policy,
      { tokenCommitments: 80_000, slots: { strategy: 0, research: 1, custody: 0 } },
      { tokenCommitments: 120_000, slots: { strategy: 1, research: 0, custody: 0 } },
    )).toMatchObject({ admitted: true, projected: { tokenCommitments: 200_000, slots: { strategy: 1, research: 1, custody: 0 } }, violations: [] });
  });

  test("denies token and slot overcommitment with an inspectable explanation", () => {
    const result = assessQuotaAdmission(policy,
      { tokenCommitments: 200_000, slots: { strategy: 0, research: 2, custody: 0 } },
      { tokenCommitments: 80_000, slots: { strategy: 0, research: 2, custody: 0 } },
    ) as any;
    expect(result.admitted).toBe(false);
    expect(result.violations).toEqual(["token commitments 280000 > 240000", "research slots 4 > 3"]);
  });

  test("does not consume quota when merely evaluating an admission", () => {
    const usage = { tokenCommitments: 0, slots: { strategy: 0, research: 0, custody: 0 } };
    assessQuotaAdmission(policy, usage, { tokenCommitments: 20_000, slots: { strategy: 0, research: 0, custody: 1 } });
    expect(usage).toEqual({ tokenCommitments: 0, slots: { strategy: 0, research: 0, custody: 0 } });
  });

  test("denies a second strategy acquisition from the serialized durable occupancy", () => {
    const database = new Database(":memory:");
    database.run("CREATE TABLE campaign_strategy_charters(project_id TEXT, charter_json TEXT)");
    database.run("CREATE TABLE campaign_strategy_reviews(status TEXT, resource_cap INTEGER)");
    database.run("CREATE TABLE campaign_syntheses(wave_id TEXT, status TEXT)");
    database.run("CREATE TABLE campaign_waves(wave_id TEXT, project_id TEXT)");
    database.run("CREATE TABLE campaign_wave_schedules(status TEXT, proposal_json TEXT)");
    database.run("CREATE TABLE campaign_research_runs(status TEXT)");
    database.run("CREATE TABLE campaign_custody_leases(lease_id TEXT, project_id TEXT, status TEXT, lease_json TEXT)");
    database.query("INSERT INTO campaign_strategy_charters VALUES ('arr15', $charter)").run({ $charter: JSON.stringify({ resourcePolicy: { tokenCaps: { strategyReview: 120_000 } } }) });
    database.run("INSERT INTO campaign_strategy_reviews VALUES ('drafting', 120000)");
    const service = new MultiProjectQuotaService(database, policy);
    const action = {
      action_id: "action-1", project_id: "arr15", action_type: "strategy.review.request", target_id: "", idempotency_key: "key", expected_version: 1,
      status: "running", args_json: "{}", result_json: "{}", error: "", created_by: "operator", created_at: "now", started_at: "now", completed_at: "",
    };
    expect(() => service.admit(action)).toThrow("Global quota admission denied: strategy slots 2 > 1");
    expect(service.admit({ ...action, action_type: "project.automation.set" })).toBeNull();
    database.close();
  });
});
