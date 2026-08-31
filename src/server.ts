import { readFile } from "node:fs/promises";
import { join, normalize } from "node:path";
import { AgentCollector } from "./collector";
import { CampaignControl, type EnqueueActionInput } from "./campaign";
import { CampaignReadService } from "./campaign-read-service";
import { projectObserverProjection } from "./projections";
import { PushService } from "./push";
import { mutationOriginAllowed } from "./security";
import type { ObserverSnapshot } from "./types";
import { RuntimeHealthService } from "./runtime-health-service";
import { AccessPolicy, canMutateScope, canReadProject, filterControlForPrincipal, filterObserverForPrincipal, type AccessPrincipal } from "./access-policy";
import { deriveOperationalGovernance, quotaPolicyFromEnvironment } from "./operational-governance";

const APP_ROOT = join(import.meta.dir, "..");
const PUBLIC_ROOT = join(APP_ROOT, "public");
const DATA_ROOT = process.env.OBSERVER_DATA_DIR ?? join(APP_ROOT, "data");
const PORT = Number(process.env.OBSERVER_PORT ?? 4317);
const HOST = process.env.OBSERVER_HOST ?? "127.0.0.1";
const allowedUsers = new Set(
  (process.env.OBSERVER_ALLOWED_TAILSCALE_USERS ?? "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean),
);
const accessPolicy = new AccessPolicy(process.env.OBSERVER_ACCESS_POLICY_JSON ?? "", allowedUsers);
const globalQuota = quotaPolicyFromEnvironment();

const MIME: Record<string, string> = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webmanifest": "application/manifest+json; charset=utf-8",
};

const staticFiles: Record<string, string> = {
  "/": "index.html",
  "/index.html": "index.html",
  "/ui.js": "ui.js",
  "/ui.css": "ui.css",
  "/styles.css": "styles.css",
  "/manifest.webmanifest": "manifest.webmanifest",
  "/sw.js": "sw.js",
  "/icon.svg": "icon.svg",
};

const securityHeaders = {
  "Content-Security-Policy": "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; manifest-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'",
  "Referrer-Policy": "no-referrer",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
};

const collector = new AgentCollector();
await collector.initialize();
const manifestProjects = ((JSON.parse(await readFile(collector.manifestPath, "utf8")) as { projects?: Array<Record<string, any>> }).projects || []);
const push = await PushService.create(DATA_ROOT);
const campaign = await CampaignControl.create(DATA_ROOT, collector.manifestPath);
const campaignReads = new CampaignReadService(campaign, DATA_ROOT);
const runtimeHealth = new RuntimeHealthService(DATA_ROOT);
let snapshot: ObserverSnapshot = await collector.collect();
await campaign.observe(snapshot);
let digest = JSON.stringify(snapshot.lanes);
let refreshTimer: ReturnType<typeof setTimeout> | null = null;
let refreshing = false;
type BrowserClient = { controller: ReadableStreamDefaultController<Uint8Array>; projectId: string; compact: boolean; principal: AccessPrincipal };
const clients = new Map<ReadableStreamDefaultController<Uint8Array>, BrowserClient>();
const encoder = new TextEncoder();

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": MIME[".json"], "Cache-Control": "no-store", ...securityHeaders },
  });
}

function requestIdentity(request: Request): string {
  return request.headers.get("Tailscale-User-Login")?.trim().toLowerCase() ?? "";
}

function requestPrincipal(request: Request, server: Bun.Server<unknown>): AccessPrincipal | null {
  const address = server.requestIP(request)?.address ?? "";
  const loopback = address === "127.0.0.1" || address === "::1" || address === "::ffff:127.0.0.1";
  return accessPolicy.principal(requestIdentity(request), loopback);
}

function mutationAuthorized(request: Request, principal: AccessPrincipal, projectId: string): boolean {
  if (!canMutateScope(principal, projectId)) return false;
  return mutationOriginAuthorized(request);
}

function mutationOriginAuthorized(request: Request): boolean {
  return mutationOriginAllowed({
    requestUrl: request.url,
    origin: request.headers.get("Origin") ?? "",
    fetchSite: request.headers.get("Sec-Fetch-Site") ?? "",
    hasProxyIdentity: Boolean(requestIdentity(request)),
  });
}

function broadcast(next: ObserverSnapshot): void {
  for (const [controller, client] of clients) {
    try {
      const visible = filterObserverForPrincipal(next, client.principal) as ObserverSnapshot;
      const body = client.compact ? projectObserverProjection(visible, client.projectId) : visible;
      const payload = encoder.encode(`event: snapshot\ndata: ${JSON.stringify(body)}\n\n`);
      controller.enqueue(payload);
    } catch {
      clients.delete(controller);
    }
  }
}

function broadcastCampaign(): void {
  let full: Record<string, any> | null = null;
  const compact = new Map<string, Record<string, any>>();
  for (const [controller, client] of clients) {
    try {
      let body: Record<string, any>;
      if (client.compact) {
        const key = `${client.principal.identity}:${client.principal.projects.join(",")}:${client.projectId}`;
        body = compact.get(key) ?? filterControlForPrincipal(campaignReads.compactSnapshot(client.projectId), client.principal);
        compact.set(key, body);
      } else {
        full ??= campaignReads.fullSnapshot();
        body = filterControlForPrincipal(full, client.principal);
      }
      const payload = encoder.encode(`event: campaign\ndata: ${JSON.stringify(body)}\n\n`);
      controller.enqueue(payload);
    } catch {
      clients.delete(controller);
    }
  }
}

const pendingCoordinatorActivity = new Map<string, Record<string, unknown>>();
let coordinatorBroadcastTimer: ReturnType<typeof setTimeout> | null = null;

function queueCoordinatorBroadcast(activity: Record<string, unknown>): void {
  const projectId = typeof activity.projectId === "string" ? activity.projectId : "";
  if (!projectId) return;
  const previous = pendingCoordinatorActivity.get(projectId);
  pendingCoordinatorActivity.set(projectId, {
    ...activity,
    refreshHistory: Boolean(activity.refreshHistory || previous?.refreshHistory),
  });
  if (coordinatorBroadcastTimer) return;
  coordinatorBroadcastTimer = setTimeout(() => {
    coordinatorBroadcastTimer = null;
    for (const payload of pendingCoordinatorActivity.values()) {
      const message = encoder.encode(`event: coordinator\ndata: ${JSON.stringify(payload)}\n\n`);
      for (const [controller, client] of clients) {
        if (client.projectId && client.projectId !== payload.projectId) continue;
        if (!canReadProject(client.principal, String(payload.projectId || ""))) continue;
        try {
          controller.enqueue(message);
        } catch {
          clients.delete(controller);
        }
      }
    }
    pendingCoordinatorActivity.clear();
  }, 80);
  coordinatorBroadcastTimer.unref();
}

campaign.onChange(broadcastCampaign);
campaign.onLiveChange(queueCoordinatorBroadcast);

async function refresh(forceRemote = false): Promise<ObserverSnapshot> {
  if (refreshing) return snapshot;
  refreshing = true;
  try {
    const next = await collector.collect({ forceRemote });
    await campaign.observe(next);
    const nextDigest = JSON.stringify(next.lanes);
    if (nextDigest !== digest) {
      const previous = snapshot;
      snapshot = next;
      digest = nextDigest;
      broadcast(next);
      void push.observe(previous, next);
    } else {
      snapshot.generatedAt = next.generatedAt;
    }
  } catch (error) {
    console.error("observer refresh failed", error);
  } finally {
    refreshing = false;
  }
  return snapshot;
}

function scheduleRefresh(): void {
  if (refreshTimer) clearTimeout(refreshTimer);
  refreshTimer = setTimeout(() => void refresh(), 300);
}

collector.onChange(scheduleRefresh);
collector.startWatching();
setInterval(() => void refresh(), 10_000).unref();
setInterval(() => {
  const heartbeat = encoder.encode(": heartbeat\n\n");
  for (const controller of clients.keys()) {
    try {
      controller.enqueue(heartbeat);
    } catch {
      clients.delete(controller);
    }
  }
}, 25_000).unref();

const server = Bun.serve({
  hostname: HOST,
  port: PORT,
  idleTimeout: 60,
  async fetch(request, server) {
    const principal = requestPrincipal(request, server);
    if (!principal) return json({ error: "forbidden" }, 403);
    const url = new URL(request.url);

    if (url.pathname === "/api/health") {
      return json({
        ok: true,
        generatedAt: snapshot.generatedAt,
        lanes: (filterObserverForPrincipal(snapshot, principal) as ObserverSnapshot).counts.total,
        campaignControl: true,
        runtime: await runtimeHealth.snapshot(),
      });
    }
    if (url.pathname === "/api/me") {
      const projectId = url.searchParams.get("project") ?? "";
      return json({
        identity: principal.identity,
        role: principal.role,
        projects: principal.projects,
        mutableProjects: principal.mutableProjects,
        canMutate: canMutateScope(principal, projectId),
        source: principal.source,
        pushPublicKey: push.publicKey,
      });
    }
    if (url.pathname === "/api/governance" && request.method === "GET") {
      const projectId = url.searchParams.get("project") ?? "";
      if (projectId && !canReadProject(principal, projectId)) return json({ error: "forbidden" }, 403);
      const control = filterControlForPrincipal(campaignReads.fullSnapshot(), principal);
      const projects = Array.isArray(control.projects) ? control.projects.filter((project: any) => !projectId || project.id === projectId) : [];
      const observer = filterObserverForPrincipal(snapshot, principal) as ObserverSnapshot;
      const visibleIds = new Set(projects.map((project: any) => project.id));
      return json(deriveOperationalGovernance({
        projects, observer, quota: globalQuota, generatedAt: new Date().toISOString(),
        manifestProjects: manifestProjects.filter((project) => visibleIds.has(project.id)),
      }));
    }
    if (url.pathname === "/api/snapshot") {
      const projectId = url.searchParams.get("project") ?? "";
      if (projectId && !canReadProject(principal, projectId)) return json({ error: "forbidden" }, 403);
      const visible = filterObserverForPrincipal(snapshot, principal) as ObserverSnapshot;
      return json(url.searchParams.get("view") === "compact" ? projectObserverProjection(visible, projectId) : visible);
    }
    if (url.pathname === "/api/control") {
      const projectId = url.searchParams.get("project") ?? "";
      if (projectId && !canReadProject(principal, projectId)) return json({ error: "forbidden" }, 403);
      const body = url.searchParams.get("view") === "compact" ? campaignReads.compactSnapshot(projectId) : campaignReads.fullSnapshot();
      return json(filterControlForPrincipal(body, principal));
    }
    if (url.pathname === "/api/lane" && request.method === "GET") {
      const laneId = url.searchParams.get("id") ?? "";
      const lane = snapshot.lanes.find((candidate) => candidate.id === laneId);
      if (lane && !canReadProject(principal, lane.project)) return json({ error: "forbidden" }, 403);
      return lane ? json(lane) : json({ error: "Lane not found" }, 404);
    }
    if (url.pathname === "/api/research-run" && request.method === "GET") {
      const projectId = url.searchParams.get("project") ?? "";
      if (!canReadProject(principal, projectId)) return json({ error: "forbidden" }, 403);
      const runId = url.searchParams.get("id") ?? "";
      const run = campaignReads.researchRun(projectId, runId);
      return run ? json(run) : json({ error: "Research run not found" }, 404);
    }
    if (url.pathname === "/api/workflow-history" && request.method === "GET") {
      const projectId = url.searchParams.get("project") ?? "";
      if (!canReadProject(principal, projectId)) return json({ error: "forbidden" }, 403);
      const page = campaignReads.workflowHistory(projectId, url.searchParams.get("cursor") ?? "", Number(url.searchParams.get("limit") || 100));
      return page ? json(page) : json({ error: "Project not found" }, 404);
    }
    if (url.pathname === "/api/program-history" && request.method === "GET") {
      const projectId = url.searchParams.get("project") ?? "";
      if (!canReadProject(principal, projectId)) return json({ error: "forbidden" }, 403);
      const history = campaignReads.programHistory(projectId);
      return history ? json(history) : json({ error: "Project not found" }, 404);
    }
    if (url.pathname === "/api/codex/threads" && request.method === "GET") {
      const projectId = url.searchParams.get("project") ?? "";
      if (!canReadProject(principal, projectId)) return json({ error: "forbidden" }, 403);
      try {
        return json({ projectId, threads: await campaign.listCodexThreads(projectId) });
      } catch (error: any) {
        return json({ error: error?.message ?? "Could not list Codex tasks" }, 400);
      }
    }
    if (url.pathname === "/api/codex/conversation" && request.method === "GET") {
      const projectId = url.searchParams.get("project") ?? "";
      if (!canReadProject(principal, projectId)) return json({ error: "forbidden" }, 403);
      try {
        return json(await campaign.coordinatorConversation(projectId));
      } catch (error: any) {
        return json({ error: error?.message ?? "Could not read coordinator conversation" }, 400);
      }
    }
    if (url.pathname === "/api/actions" && request.method === "POST") {
      try {
        const input = await request.json() as EnqueueActionInput;
        if (!mutationAuthorized(request, principal, input.projectId)) return json({ error: "forbidden" }, 403);
        return json(await campaign.enqueueAction(input, principal.identity), 202);
      } catch (error: any) {
        return json({ error: error?.message ?? "Invalid campaign action" }, 400);
      }
    }
    if (url.pathname === "/api/refresh" && request.method === "POST") {
      const projectId = url.searchParams.get("project") ?? "";
      if (!mutationAuthorized(request, principal, projectId)) return json({ error: "forbidden" }, 403);
      const next = filterObserverForPrincipal(await refresh(true), principal) as ObserverSnapshot;
      return json(url.searchParams.get("view") === "compact" ? projectObserverProjection(next, projectId) : next);
    }
    if (url.pathname === "/api/events") {
      const projectId = url.searchParams.get("project") ?? "";
      if (projectId && !canReadProject(principal, projectId)) return json({ error: "forbidden" }, 403);
      const compact = url.searchParams.get("view") === "compact";
      let ownController: ReadableStreamDefaultController<Uint8Array> | null = null;
      const stream = new ReadableStream<Uint8Array>({
        start(controller) {
          ownController = controller;
          clients.set(controller, { controller, projectId, compact, principal });
          const visibleObserver = filterObserverForPrincipal(snapshot, principal) as ObserverSnapshot;
          const observerBody = compact ? projectObserverProjection(visibleObserver, projectId) : visibleObserver;
          const campaignBody = filterControlForPrincipal(compact ? campaignReads.compactSnapshot(projectId) : campaignReads.fullSnapshot(), principal);
          controller.enqueue(encoder.encode(`event: snapshot\ndata: ${JSON.stringify(observerBody)}\n\n`));
          controller.enqueue(encoder.encode(`event: campaign\ndata: ${JSON.stringify(campaignBody)}\n\n`));
        },
        cancel() {
          if (ownController) clients.delete(ownController);
        },
      });
      return new Response(stream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache, no-transform",
          Connection: "keep-alive",
          ...securityHeaders,
        },
      });
    }
    if (url.pathname === "/api/push/subscribe" && request.method === "POST") {
      if (!mutationOriginAuthorized(request)) return json({ error: "forbidden" }, 403);
      try {
        push.subscribe(await request.json(), principal.identity, principal.projects);
        return json({ ok: true });
      } catch (error: any) {
        return json({ error: error?.message ?? "invalid subscription" }, 400);
      }
    }
    if (url.pathname === "/api/push/unsubscribe" && request.method === "POST") {
      if (!mutationOriginAuthorized(request)) return json({ error: "forbidden" }, 403);
      const body = (await request.json()) as { endpoint?: string };
      if (body.endpoint) push.unsubscribe(body.endpoint, principal.identity);
      return json({ ok: true });
    }

    const projectRoute = /^\/projects\/[^/]+\/?$/.test(url.pathname);
    const routeProjectId = projectRoute ? decodeURIComponent(url.pathname.split("/")[2] || "") : "";
    if (routeProjectId && !canReadProject(principal, routeProjectId)) return json({ error: "forbidden" }, 403);
    const leaf = projectRoute ? "index.html" : staticFiles[url.pathname];
    if (!leaf) return new Response("Not found", { status: 404, headers: securityHeaders });
    const path = normalize(join(PUBLIC_ROOT, leaf));
    if (!path.startsWith(normalize(PUBLIC_ROOT))) return new Response("Not found", { status: 404 });
    try {
      const extension = leaf.slice(leaf.lastIndexOf("."));
      return new Response(await readFile(path), {
        headers: {
          "Content-Type": MIME[extension] ?? "application/octet-stream",
          "Cache-Control": ["sw.js", "index.html", "ui.js", "styles.css", "ui.css", "manifest.webmanifest"].includes(leaf)
            ? "no-cache, no-store, must-revalidate"
            : "public, max-age=3600",
          ...(leaf === "sw.js" ? { "Service-Worker-Allowed": "/" } : {}),
          ...securityHeaders,
        },
      });
    } catch {
      return new Response("Not found", { status: 404, headers: securityHeaders });
    }
  },
});

console.log(`Agent Observer listening on http://${server.hostname}:${server.port}`);
console.log(`Loaded ${snapshot.counts.total} lane ledgers from ${snapshot.sources.filter((source) => source.available).length} sources`);

function shutdown(): void {
  collector.stopWatching();
  campaign.stop();
  server.stop(true);
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
