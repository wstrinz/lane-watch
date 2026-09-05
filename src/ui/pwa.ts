import { writable } from "svelte/store";

export type AlertState = "loading" | "unsupported" | "disabled" | "enabled" | "error";
export const alertState = writable<AlertState>("loading");

function decodeVapidKey(value: string): Uint8Array<ArrayBuffer> {
  const padding = "=".repeat((4 - value.length % 4) % 4);
  const raw = atob((value + padding).replace(/-/g, "+").replace(/_/g, "/"));
  return Uint8Array.from([...raw].map((character) => character.charCodeAt(0))) as Uint8Array<ArrayBuffer>;
}

export async function refreshAlertState(): Promise<void> {
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
    alertState.set("unsupported");
    return;
  }
  try {
    const registration = await navigator.serviceWorker.ready;
    alertState.set(await registration.pushManager.getSubscription() ? "enabled" : "disabled");
  } catch {
    alertState.set("error");
  }
}

export async function toggleAlerts(): Promise<void> {
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) return;
  alertState.set("loading");
  try {
    const registration = await navigator.serviceWorker.ready;
    const existing = await registration.pushManager.getSubscription();
    if (existing) {
      await fetch("/api/push/unsubscribe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ endpoint: existing.endpoint }) });
      await existing.unsubscribe();
    } else {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        alertState.set("disabled");
        return;
      }
      const me = await fetch("/api/me", { cache: "no-store" }).then((response) => response.json()) as { pushPublicKey: string };
      const subscription = await registration.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: decodeVapidKey(me.pushPublicKey) });
      const response = await fetch("/api/push/subscribe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(subscription) });
      if (!response.ok) throw new Error("Could not register push subscription");
    }
    await refreshAlertState();
  } catch {
    alertState.set("error");
  }
}

export function registerPwa(): () => void {
  if (!("serviceWorker" in navigator)) {
    alertState.set("unsupported");
    return () => undefined;
  }
  // The initial page already fetched current assets. Taking control for the
  // first time must not reload it and discard a click or an open drawer.
  const controlledOnLoad = Boolean(navigator.serviceWorker.controller);
  const controllerChanged = () => {
    if (!controlledOnLoad) return;
    const reloadKey = "lane-watch-controller-v91";
    if (sessionStorage.getItem(reloadKey)) return;
    sessionStorage.setItem(reloadKey, "1");
    location.reload();
  };
  navigator.serviceWorker.addEventListener("controllerchange", controllerChanged);
  navigator.serviceWorker.register("/sw.js?v=104", { updateViaCache: "none" }).then(async (registration) => {
    registration.waiting?.postMessage({ type: "SKIP_WAITING" });
    await registration.update();
    await refreshAlertState();
  }).catch(() => alertState.set("error"));
  return () => navigator.serviceWorker.removeEventListener("controllerchange", controllerChanged);
}
