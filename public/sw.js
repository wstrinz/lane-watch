const CACHE = "lane-watch-v105";
const APP_SHELL = ["/", "/styles.css?v=105", "/ui.css?v=105", "/ui.js?v=105", "/manifest.webmanifest?v=65", "/icon.svg"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET" || new URL(event.request.url).pathname.startsWith("/api/")) return;
  event.respondWith(fetch(event.request, { cache: "no-store" }).then((response) => {
    const copy = response.clone();
    caches.open(CACHE).then((cache) => cache.put(event.request, copy));
    return response;
  }).catch(() => caches.match(event.request).then((response) => response || caches.match("/"))));
});

self.addEventListener("push", (event) => {
  const message = event.data?.json() ?? { title: "Lane Watch", body: "An agent lane changed state." };
  const actions = [self.registration.showNotification(message.title, {
      body: message.body,
      tag: message.tag,
      data: { url: message.url || "/" },
      icon: "/icon.svg",
      badge: "/icon.svg",
    })];
  if ("setAppBadge" in self.navigator && Number.isFinite(message.badgeCount)) {
    if (message.badgeCount > 0) actions.push(self.navigator.setAppBadge(message.badgeCount));
    else if ("clearAppBadge" in self.navigator) actions.push(self.navigator.clearAppBadge());
  }
  event.waitUntil(Promise.all(actions));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = new URL(event.notification.data?.url || "/", self.location.origin).href;
  event.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(async (clients) => {
    for (const client of clients) {
      if ("focus" in client) {
        await client.navigate(url);
        return client.focus();
      }
    }
    return self.clients.openWindow(url);
  }));
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") self.skipWaiting();
});
