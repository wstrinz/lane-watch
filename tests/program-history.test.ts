import { describe, expect, test } from "bun:test";
import { deriveProgramHistory } from "../src/program-history";

describe("read-only program history", () => {
  test("nests waves, lanes, and custody under epochs with explicit assignment provenance", () => {
    const input = {
      projectId: "demo", projectVersion: 17,
      epochs: [
        { epoch_id: "epoch-1", label: "First epoch", status: "completed", charter_revision: 1, start_json: "{\"objective\":\"start\"}", end_json: "{\"objective\":\"done\"}", created_at: "2026-01-02T00:00:00Z", completed_at: "2026-02-01T00:00:00Z" },
        { epoch_id: "epoch-2", label: "Second epoch", status: "active", charter_revision: 2, start_json: "{}", end_json: "{}", created_at: "2026-02-01T00:00:00Z", completed_at: "" },
      ],
      waves: [
        { wave_id: "wave-imported", label: "Imported", phase: "DONE", created_at: "2026-01-01T00:00:00Z", updated_at: "2026-01-01T02:00:00Z", evidence_digest: "sha256:old" },
        { wave_id: "wave-contained", label: "Contained", phase: "DONE", created_at: "2026-01-10T00:00:00Z", updated_at: "2026-01-11T00:00:00Z", evidence_digest: "sha256:one" },
        { wave_id: "wave-timed", label: "Timed", phase: "DONE", created_at: "2026-01-15T00:00:00Z", updated_at: "2026-01-16T00:00:00Z", evidence_digest: "sha256:timed" },
        { wave_id: "wave-explicit", label: "Explicit", phase: "RUNNING", created_at: "2026-01-20T00:00:00Z", updated_at: "2026-02-02T00:00:00Z", evidence_digest: "sha256:two" },
      ],
      runs: [
        { run_id: "run-1", wave_id: "wave-contained", task_id: "lemma", status: "returned_to_sol", profile: "sonnet-worker", evidence_sha256: "sha256:evidence", measured_tokens: 42000, created_at: "2026-01-10T01:00:00Z", completed_at: "2026-01-10T02:00:00Z" },
      ],
      members: [{ wave_id: "wave-contained", lane_id: "demo:lane", accounting_state: "accounted", disposition: "accepted" }],
      custody: [
        { item_id: "custody-pre", source_type: "maintenance", source_id: "legacy", task: "Imported repair", status: "completed", created_at: "2026-01-01T12:00:00Z", completed_at: "2026-01-03T00:00:00Z" },
        { item_id: "custody-explicit", source_type: "wave", source_id: "wave-explicit", task: "Exact repair", status: "running", created_at: "2026-01-10T03:00:00Z", completed_at: "" },
      ],
      leases: [{ lease_id: "lease-1", item_id: "custody-explicit", status: "running", receipt_digest: "", created_at: "2026-01-10T04:00:00Z", started_at: "2026-01-10T05:00:00Z", completed_at: "" }],
      snapshots: [
        { snapshot_id: "baseline-1", epoch_id: "epoch-1", wave_id: "", kind: "epoch_baseline", metrics_json: "{\"coverage\":2}", cost_json: "{\"tokens\":100}", drift_json: "{\"stale\":false}", created_at: "2026-01-02T00:00:00Z" },
        { snapshot_id: "end-1", epoch_id: "epoch-1", wave_id: "wave-contained", kind: "wave_end", metrics_json: "{\"coverage\":4}", cost_json: "{\"tokens\":180}", drift_json: "{\"stale\":true}", created_at: "2026-01-11T00:00:00Z" },
        { snapshot_id: "explicit-2", epoch_id: "epoch-2", wave_id: "wave-explicit", kind: "wave_end", metrics_json: "{\"coverage\":5}", cost_json: "{\"tokens\":220}", drift_json: "{\"stale\":false}", created_at: "2026-02-02T00:00:00Z" },
      ],
    };

    const frozen = JSON.stringify(input);
    const history = deriveProgramHistory(input) as any;
    expect(JSON.stringify(input)).toBe(frozen);
    expect(history).toMatchObject({
      schema: "campaign-program-history/v1", projectId: "demo", projectVersion: 17, mode: "read-only",
      counts: { epochs: 2, waves: 4, lanes: 1, custody: 2 },
    });
    expect(history.ownershipPolicy).toContain("no backfill");
    expect(history.epochs[0].waves.map((wave: any) => [wave.id, wave.assignment.basis])).toEqual([
      ["wave-imported", "pre-epoch-historical-import"], ["wave-contained", "explicit-strategy-snapshot"],
      ["wave-timed", "created-at-containment"],
    ]);
    expect(history.epochs[1].waves[0].assignment).toEqual({ epochId: "epoch-2", basis: "explicit-strategy-snapshot" });
    expect(history.epochs[0].waves[1].lanes[0]).toMatchObject({ id: "run-1", tokens: 42000 });
    expect(history.epochs[0].waves[1].observedMembers[0]).toMatchObject({ laneId: "demo:lane", accountingState: "accounted" });
    expect(history.epochs[0].custody.map((item: any) => item.id)).toEqual(["custody-pre"]);
    expect(history.epochs[1].custody[0].leases[0]).toMatchObject({ id: "lease-1", startedAt: "2026-01-10T05:00:00Z" });
    const nestedCustody = history.epochs.flatMap((epoch: any) => epoch.waves).flatMap((wave: any) => wave.custody).map((item: any) => item.id);
    expect(nestedCustody).toEqual(["custody-pre", "custody-explicit"]);
    expect(new Set(nestedCustody).size).toBe(nestedCustody.length);
    expect(history.epochs[0].boundary.metrics.find((item: any) => item.key === "coverage")).toEqual({ key: "coverage", start: 2, end: 4, changed: true });
    expect(history.epochs[0].boundary.cost.find((item: any) => item.key === "tokens").changed).toBe(true);
    expect(history.epochs[0].boundary.drift.find((item: any) => item.key === "stale").changed).toBe(true);
  });
});
