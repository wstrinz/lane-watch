import { Database } from "bun:sqlite";
import { readFile, readdir, stat } from "node:fs/promises";
import { join, relative, resolve, sep } from "node:path";
import type { LaneSnapshot } from "./types";

interface ContextRegistryPort {
  projectRoot(projectId: string): string;
}

interface ContextCandidate {
  role: string;
  path: string;
}

const MAX_CONTEXT_CHARACTERS = 512_000;

function sha256Text(value: string): string {
  const hasher = new Bun.CryptoHasher("sha256");
  hasher.update(value);
  return hasher.digest("hex");
}

function within(root: string, candidate: string): boolean {
  const normalizedRoot = resolve(root);
  const normalizedCandidate = resolve(candidate);
  return normalizedCandidate === normalizedRoot || normalizedCandidate.startsWith(`${normalizedRoot}${sep}`);
}

/** Discovers bounded project context and persists its content-addressed registry. */
export class ContextRegistryService {
  constructor(
    private readonly database: Database,
    private readonly port: ContextRegistryPort,
    private readonly clock: () => string = () => new Date().toISOString(),
  ) {}

  async refresh(projectId: string, lanes: LaneSnapshot[]): Promise<void> {
    const root = resolve(this.port.projectRoot(projectId));
    const candidates = new Map<string, ContextCandidate>([
      ["campaign", { role: "campaign-manifest", path: join(root, "campaign.json") }],
      ["charter", { role: "charter", path: join(root, "CHARTER.md") }],
      ["checkpoint", { role: "checkpoint", path: join(root, "CHECKPOINT.md") }],
      ["frontier", { role: "research-frontier", path: join(root, "FRONTIER.md") }],
      ["evidence-policy", { role: "evidence-policy", path: join(root, "EVIDENCE_POLICY.md") }],
      ["operations", { role: "operations", path: join(root, "OPERATIONS.md") }],
      ["topologies", { role: "topology-profiles", path: join(root, "config", "agent-topologies.json") }],
    ]);

    try {
      const queueRoot = join(root, "packets", "queue");
      const queueFiles = (await readdir(queueRoot, { withFileTypes: true }))
        .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".md"))
        .map((entry) => join(queueRoot, entry.name));
      const ranked = await Promise.all(queueFiles.map(async (path) => ({ path, modified: (await stat(path)).mtimeMs })));
      for (const item of ranked.sort((left, right) => right.modified - left.modified).slice(0, 5)) {
        candidates.set(`queue:${relative(root, item.path)}`, { role: "queue-plan", path: item.path });
      }
    } catch {
      // A campaign may not have a queue directory yet.
    }

    for (const lane of lanes) {
      const packetPath = join(root, "packets", "launch", `${lane.task}.md`);
      candidates.set(`packet:${lane.task}`, { role: "lane-packet", path: packetPath });
    }

    const seen: string[] = [];
    for (const [sourceId, candidate] of candidates) {
      try {
        if (!within(root, candidate.path)) continue;
        const [content, metadata] = await Promise.all([readFile(candidate.path, "utf8"), stat(candidate.path)]);
        if (content.length > MAX_CONTEXT_CHARACTERS) continue;
        const sourcePath = relative(root, candidate.path).split(sep).join("/");
        this.database.query(`
          INSERT INTO campaign_context_sources(project_id, source_id, role, path, sha256, bytes, modified_at, content, observed_at)
          VALUES ($project, $source, $role, $path, $sha, $bytes, $modified, $content, $observed)
          ON CONFLICT(project_id, source_id) DO UPDATE SET role = excluded.role, path = excluded.path,
            sha256 = excluded.sha256, bytes = excluded.bytes, modified_at = excluded.modified_at,
            content = excluded.content, observed_at = excluded.observed_at
        `).run({
          $project: projectId,
          $source: sourceId,
          $role: candidate.role,
          $path: sourcePath,
          $sha: `sha256:${sha256Text(content)}`,
          $bytes: metadata.size,
          $modified: metadata.mtime.toISOString(),
          $content: content,
          $observed: this.clock(),
        });
        seen.push(sourceId);
      } catch {
        // Missing optional context is visible by absence and does not stop observation.
      }
    }

    if (seen.length) {
      const placeholders = seen.map(() => "?").join(",");
      this.database.query(`DELETE FROM campaign_context_sources WHERE project_id = ? AND source_id NOT IN (${placeholders})`)
        .run(projectId, ...seen);
    }
  }
}
