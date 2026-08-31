import { afterEach, describe, expect, test } from "bun:test";
import { Database } from "bun:sqlite";
import { createHash } from "node:crypto";
import { mkdir, mkdtemp, rm, unlink, utimes, writeFile } from "node:fs/promises";
import { basename, dirname, join, relative, sep } from "node:path";
import { tmpdir } from "node:os";
import { ContextRegistryService } from "../src/context-registry-service";
import type { LaneSnapshot } from "../src/types";

interface ContextRow {
  project_id: string;
  source_id: string;
  role: string;
  path: string;
  sha256: string;
  bytes: number;
  modified_at: string;
  content: string;
  observed_at: string;
}

const cleanupPaths: string[] = [];

afterEach(async () => {
  while (cleanupPaths.length) await rm(cleanupPaths.pop()!, { recursive: true, force: true });
});

function lane(overrides: Partial<LaneSnapshot> = {}): LaneSnapshot {
  return {
    id: "demo:windows:prove-the-lemma",
    project: "demo",
    host: "windows",
    task: "prove-the-lemma",
    lane: "DKW-LSA",
    name: "prove the lemma",
    model: "sonnet",
    effort: "high",
    laneKind: "research",
    parentAgent: "",
    jobId: "job-owned",
    sessionId: "session-owned",
    lifecycle: "active",
    daemon: "working",
    tempo: "working",
    status: "Working",
    severity: "working",
    attentionReason: "",
    detail: "",
    output: "",
    tokens: 100,
    inFlight: 1,
    queued: 0,
    activities: [],
    topology: null,
    timeline: [],
    landing: "—",
    branch: "agent/local-sonnet/prove-the-lemma",
    worktree: "C:/tmp/prove-the-lemma",
    launchedAt: "2026-08-30T00:00:00.000Z",
    updatedAt: "2026-08-30T01:00:00.000Z",
    completedAt: "",
    ...overrides,
  };
}

function database(): Database {
  const result = new Database(":memory:");
  result.run(`CREATE TABLE campaign_context_sources (
    project_id TEXT NOT NULL, source_id TEXT NOT NULL, role TEXT NOT NULL, path TEXT NOT NULL,
    sha256 TEXT NOT NULL, bytes INTEGER NOT NULL, modified_at TEXT NOT NULL, content TEXT NOT NULL,
    observed_at TEXT NOT NULL, PRIMARY KEY(project_id, source_id)
  )`);
  return result;
}

async function root(): Promise<string> {
  const path = await mkdtemp(join(tmpdir(), "lane-watch-context-"));
  cleanupPaths.push(path);
  return path;
}

function rows(db: Database): ContextRow[] {
  return db.query("SELECT * FROM campaign_context_sources ORDER BY role, path").all() as ContextRow[];
}

describe("context registry service", () => {
  test("registers fixed context, the five newest queue plans, and active lane packets by content digest", async () => {
    const projectRoot = await root();
    const queueRoot = join(projectRoot, "packets", "queue");
    const launchRoot = join(projectRoot, "packets", "launch");
    await mkdir(queueRoot, { recursive: true });
    await mkdir(launchRoot, { recursive: true });
    await writeFile(join(projectRoot, "campaign.json"), "{\"id\":\"demo\"}\n");
    await writeFile(join(projectRoot, "CHARTER.md"), "# Charter\n");
    await writeFile(join(queueRoot, "ignored.txt"), "not context");
    for (let index = 0; index < 6; index++) {
      const path = join(queueRoot, `queue-${index}.md`);
      await writeFile(path, `queue ${index}\n`);
      const modified = new Date(`2026-08-30T00:00:0${index}.000Z`);
      await utimes(path, modified, modified);
    }
    await writeFile(join(launchRoot, "prove-the-lemma.md"), "launch packet\n");

    const db = database();
    const registry = new ContextRegistryService(db, { projectRoot: () => projectRoot }, () => "2026-08-30T02:00:00.000Z");
    await registry.refresh("demo", [lane()]);

    const observed = rows(db);
    expect(observed).toHaveLength(8);
    expect(observed.map((row) => row.role)).toEqual(expect.arrayContaining([
      "campaign-manifest", "charter", "queue-plan", "lane-packet",
    ]));
    expect(observed.some((row) => row.source_id === `queue:${relative(projectRoot, join(queueRoot, "queue-0.md"))}`)).toBe(false);
    for (let index = 1; index < 6; index++) {
      expect(observed.some((row) => row.source_id === `queue:${relative(projectRoot, join(queueRoot, `queue-${index}.md`))}`)).toBe(true);
    }
    const campaign = observed.find((row) => row.source_id === "campaign")!;
    expect(campaign.path).toBe("campaign.json");
    expect(campaign.sha256).toBe(`sha256:${createHash("sha256").update("{\"id\":\"demo\"}\n").digest("hex")}`);
    expect(campaign.bytes).toBe(Buffer.byteLength("{\"id\":\"demo\"}\n"));
    expect(observed.find((row) => row.source_id === "packet:prove-the-lemma")?.path).toBe("packets/launch/prove-the-lemma.md");
    expect(new Set(observed.map((row) => row.observed_at))).toEqual(new Set(["2026-08-30T02:00:00.000Z"]));
    db.close();
  });

  test("prunes stale rows after a successful observation but preserves the last registry when every optional source is absent", async () => {
    const projectRoot = await root();
    await writeFile(join(projectRoot, "CHARTER.md"), "# Current charter\n");
    const db = database();
    db.query(`INSERT INTO campaign_context_sources VALUES
      ('demo', 'stale', 'queue-plan', 'packets/queue/stale.md', 'sha256:stale', 5, '', 'stale', '')`).run();
    const registry = new ContextRegistryService(db, { projectRoot: () => projectRoot }, () => "2026-08-30T02:00:00.000Z");

    await registry.refresh("demo", []);
    expect(rows(db).map((row) => row.source_id)).toEqual(["charter"]);

    await unlink(join(projectRoot, "CHARTER.md"));
    await registry.refresh("demo", []);
    expect(rows(db).map((row) => row.source_id)).toEqual(["charter"]);
    db.close();
  });

  test("excludes oversized sources and removes their stale row when another bounded source is observed", async () => {
    const projectRoot = await root();
    await writeFile(join(projectRoot, "campaign.json"), "x".repeat(512_001));
    await writeFile(join(projectRoot, "CHARTER.md"), "# Bounded\n");
    const db = database();
    db.query(`INSERT INTO campaign_context_sources VALUES
      ('demo', 'campaign', 'campaign-manifest', 'campaign.json', 'sha256:old', 3, '', 'old', '')`).run();
    const registry = new ContextRegistryService(db, { projectRoot: () => projectRoot });

    await registry.refresh("demo", []);

    expect(rows(db).map((row) => row.source_id)).toEqual(["charter"]);
    db.close();
  });

  test("never reads a lane-derived packet path outside the project root", async () => {
    const projectRoot = await root();
    const outside = join(dirname(projectRoot), `${basename(projectRoot)}-outside.md`);
    cleanupPaths.push(outside);
    await writeFile(outside, "must not enter registry\n");
    const task = `..${sep}..${sep}..${sep}${basename(projectRoot)}-outside`;
    const db = database();
    const registry = new ContextRegistryService(db, { projectRoot: () => projectRoot });

    await registry.refresh("demo", [lane({ id: "demo:windows:escaped", task })]);

    expect(rows(db)).toEqual([]);
    db.close();
  });
});
