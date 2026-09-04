/** Use the same anomaly boundary in resources and repair-family history. */
export function custodyMeasuredTokens(lease: Record<string, any>): number | null {
  const value = lease.receipt?.usage?.tokens;
  const cap = Number(lease.lease?.budget?.maxTokens || 0);
  if (value === null || value === undefined || !Number.isFinite(Number(value)) || Number(value) < 0) return null;
  return cap > 0 && Number(value) > cap * 4 ? null : Number(value);
}

export function custodyLineageCosts(items: Array<Record<string, any>>, leases: Array<Record<string, any>>): Map<string, { attempts: number; knownTokens: number; unreported: number; landed: number }> {
  const byId = new Map(items.map(item => [item.id, item]));
  const root = (id: string): string => {
    const seen = new Set<string>();
    while (!seen.has(id)) {
      seen.add(id);
      const item = byId.get(id);
      if (item?.sourceType !== "custody-reshape" || !byId.has(item.sourceId)) return id;
      id = item.sourceId;
    }
    return [...seen].sort()[0];
  };
  const totals = new Map<string, { attempts: number; knownTokens: number; unreported: number; landed: number }>();
  for (const lease of leases) {
    if (!["running", "finalizing", "awaiting_review", "completed", "blocked", "failed", "rejected"].includes(lease.status)) continue;
    const id = root(lease.itemId);
    const total = totals.get(id) || { attempts: 0, knownTokens: 0, unreported: 0, landed: 0 };
    const tokens = custodyMeasuredTokens(lease);
    total.attempts += 1;
    total.knownTokens += tokens ?? 0;
    total.unreported += tokens === null ? 1 : 0;
    total.landed += lease.status === "completed" ? 1 : 0;
    totals.set(id, total);
  }
  return new Map(items.map(item => [item.id, totals.get(root(item.id)) || { attempts: 0, knownTokens: 0, unreported: 0, landed: 0 }]));
}
