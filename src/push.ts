import { Database } from "bun:sqlite";
import { existsSync, mkdirSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import webpush from "web-push";
import type { LaneSnapshot, ObserverSnapshot } from "./types";

interface StoredKeys {
  publicKey: string;
  privateKey: string;
}

interface PushMessage {
  projectId: string;
  title: string;
  body: string;
  tag: string;
  url: string;
  severity: string;
  badgeCount: number;
}

export class PushService {
  readonly publicKey: string;
  private readonly privateKey: string;
  private readonly database: Database;

  private constructor(dataDir: string, keys: StoredKeys) {
    this.publicKey = keys.publicKey;
    this.privateKey = keys.privateKey;
    this.database = new Database(join(dataDir, "observer.sqlite"), { create: true });
    this.database.run("PRAGMA journal_mode = WAL");
    this.database.run(`
      CREATE TABLE IF NOT EXISTS push_subscriptions (
        endpoint TEXT PRIMARY KEY,
        subscription_json TEXT NOT NULL,
        created_at TEXT NOT NULL,
        last_success_at TEXT
      )
    `);
    const subscriptionColumns = new Set((this.database.query("PRAGMA table_info(push_subscriptions)").all() as Array<{ name: string }>).map((column) => column.name));
    if (!subscriptionColumns.has("identity")) this.database.run("ALTER TABLE push_subscriptions ADD COLUMN identity TEXT NOT NULL DEFAULT ''");
    if (!subscriptionColumns.has("projects_json")) this.database.run("ALTER TABLE push_subscriptions ADD COLUMN projects_json TEXT NOT NULL DEFAULT '[\"*\"]'");
    this.database.run(`
      CREATE TABLE IF NOT EXISTS delivered_events (
        event_key TEXT PRIMARY KEY,
        delivered_at TEXT NOT NULL
      )
    `);
    webpush.setVapidDetails(
      process.env.OBSERVER_VAPID_SUBJECT ?? "mailto:agent-observer@localhost",
      this.publicKey,
      this.privateKey,
    );
  }

  static async create(dataDir: string): Promise<PushService> {
    mkdirSync(dataDir, { recursive: true });
    const keyPath = join(dataDir, "vapid.json");
    let keys: StoredKeys;
    if (existsSync(keyPath)) {
      keys = JSON.parse(await readFile(keyPath, "utf8"));
    } else {
      keys = webpush.generateVAPIDKeys();
      await writeFile(keyPath, `${JSON.stringify(keys, null, 2)}\n`, { encoding: "utf8", mode: 0o600 });
    }
    return new PushService(dataDir, keys);
  }

  subscribe(subscription: webpush.PushSubscription, identity: string, projects: string[]): void {
    if (!subscription?.endpoint || !subscription.keys?.p256dh || !subscription.keys?.auth) {
      throw new Error("Invalid push subscription");
    }
    this.database
      .query(`
        INSERT INTO push_subscriptions(endpoint, subscription_json, identity, projects_json, created_at)
        VALUES ($endpoint, $json, $identity, $projects, $now)
        ON CONFLICT(endpoint) DO UPDATE SET subscription_json = excluded.subscription_json,
          identity = excluded.identity, projects_json = excluded.projects_json
      `)
      .run({
        $endpoint: subscription.endpoint,
        $json: JSON.stringify(subscription),
        $identity: identity,
        $projects: JSON.stringify(projects),
        $now: new Date().toISOString(),
      });
  }

  unsubscribe(endpoint: string, identity = ""): void {
    if (identity) this.database.query("DELETE FROM push_subscriptions WHERE endpoint = $endpoint AND identity = $identity").run({ $endpoint: endpoint, $identity: identity });
    else this.database.query("DELETE FROM push_subscriptions WHERE endpoint = $endpoint").run({ $endpoint: endpoint });
  }

  private eventFor(previous: LaneSnapshot | undefined, current: LaneSnapshot, badgeCount: number): PushMessage | null {
    if (!previous && (current.severity === "working" || current.severity === "idle")) {
      return {
        projectId: current.project,
        title: `${current.lane} started`,
        body: current.detail || `${current.model} lane ${current.task} is active.`,
        tag: `started:${current.id}:${current.jobId}`,
        url: `/projects/${encodeURIComponent(current.project)}?lane=${encodeURIComponent(current.id)}`,
        severity: "working",
        badgeCount,
      };
    }
    if (!previous) return null;
    if (previous.lifecycle !== "complete" && current.lifecycle === "complete") {
      return {
        projectId: current.project,
        title: `${current.lane} complete`,
        body: current.output || current.detail || current.task,
        tag: `complete:${current.id}`,
        url: `/projects/${encodeURIComponent(current.project)}?lane=${encodeURIComponent(current.id)}`,
        severity: "complete",
        badgeCount,
      };
    }
    if (previous.daemon !== current.daemon && ["failed", "error", "crashed", "blocked"].includes(current.daemon)) {
      return {
        projectId: current.project,
        title: `${current.lane} needs attention`,
        body: current.detail || `${current.task}: ${current.status}`,
        tag: `attention:${current.id}:${current.daemon}`,
        url: `/projects/${encodeURIComponent(current.project)}?lane=${encodeURIComponent(current.id)}`,
        severity: "attention",
        badgeCount,
      };
    }
    if (previous.daemon !== current.daemon && current.attentionReason === "terminal-unrecorded") {
      return {
        projectId: current.project,
        title: `${current.lane} finished`,
        body: current.output || current.detail || "Claude finished; coordinator reconciliation is pending.",
        tag: `terminal:${current.id}:${current.jobId}`,
        url: `/projects/${encodeURIComponent(current.project)}?lane=${encodeURIComponent(current.id)}`,
        severity: "attention",
        badgeCount,
      };
    }
    return null;
  }

  async observe(previous: ObserverSnapshot, current: ObserverSnapshot): Promise<void> {
    const prior = new Map(previous.lanes.map((lane) => [lane.id, lane]));
    for (const lane of current.lanes) {
      const badgeCount = current.lanes.filter((candidate) => candidate.project === lane.project && ["working", "idle"].includes(candidate.severity)).length;
      const before = prior.get(lane.id);
      const message = this.eventFor(before, lane, badgeCount);
      if (!message) continue;
      const eventKey = `${message.tag}:${lane.updatedAt}`;
      const exists = this.database.query("SELECT 1 FROM delivered_events WHERE event_key = $key").get({ $key: eventKey });
      if (exists) continue;
      this.database.query("INSERT INTO delivered_events(event_key, delivered_at) VALUES ($key, $now)").run({
        $key: eventKey,
        $now: new Date().toISOString(),
      });
      await this.broadcast(message);
    }
  }

  private async broadcast(message: PushMessage): Promise<void> {
    const subscriptions = this.database
      .query("SELECT endpoint, subscription_json, projects_json FROM push_subscriptions")
      .all() as Array<{ endpoint: string; subscription_json: string; projects_json: string }>;
    const payload = JSON.stringify(message);
    await Promise.allSettled(
      subscriptions.map(async ({ endpoint, subscription_json, projects_json }) => {
        try {
          const projects = JSON.parse(projects_json || "[]") as string[];
          if (!projects.includes("*") && !projects.includes(message.projectId)) return;
          await webpush.sendNotification(JSON.parse(subscription_json), payload, { TTL: 3600, urgency: "high" });
          this.database
            .query("UPDATE push_subscriptions SET last_success_at = $now WHERE endpoint = $endpoint")
            .run({ $endpoint: endpoint, $now: new Date().toISOString() });
        } catch (error: any) {
          if (error?.statusCode === 404 || error?.statusCode === 410) this.unsubscribe(endpoint);
        }
      }),
    );
  }
}
