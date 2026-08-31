export type AccessRole = "viewer" | "operator" | "admin";

export interface AccessPrincipal {
  identity: string;
  role: AccessRole;
  /** Projects visible to this principal. */
  projects: string[];
  /** Projects in which guarded mutations may be submitted. */
  mutableProjects: string[];
  source: "loopback" | "explicit-policy" | "legacy-allowlist";
}

type PolicyDocument = { users?: Record<string, { role?: string; projects?: unknown; mutableProjects?: unknown }> };

function normalizeProjects(value: unknown, field = "projects", allowEmpty = false): string[] {
  if (!Array.isArray(value)) throw new Error(`Access-policy ${field} must be an array`);
  const projects = [...new Set(value.map((item) => typeof item === "string" ? item.trim() : "").filter(Boolean))];
  if (!allowEmpty && !projects.length) throw new Error("Access-policy users require at least one project or '*'");
  return projects.includes("*") ? ["*"] : projects.sort();
}

/** Request-scoped admission. It grants no campaign capability and stores no secrets. */
export class AccessPolicy {
  private readonly users = new Map<string, { role: AccessRole; projects: string[]; mutableProjects: string[] }>();
  private readonly explicit: boolean;

  constructor(policyJson = "", private readonly legacyAllowedUsers = new Set<string>()) {
    this.explicit = Boolean(policyJson.trim());
    if (!this.explicit) return;
    let document: PolicyDocument;
    try { document = JSON.parse(policyJson) as PolicyDocument; } catch { throw new Error("OBSERVER_ACCESS_POLICY_JSON must be valid JSON"); }
    if (!document.users || typeof document.users !== "object" || Array.isArray(document.users)) {
      throw new Error("OBSERVER_ACCESS_POLICY_JSON requires a users object");
    }
    for (const [rawIdentity, entry] of Object.entries(document.users)) {
      const identity = rawIdentity.trim().toLowerCase();
      const role = entry?.role;
      if (!identity || !["viewer", "operator", "admin"].includes(String(role))) {
        throw new Error(`Invalid access-policy identity or role: ${rawIdentity}`);
      }
      const projects = normalizeProjects(entry.projects);
      const mutableProjects = entry.mutableProjects === undefined
        ? role === "viewer" ? [] : [...projects]
        : normalizeProjects(entry.mutableProjects, "mutableProjects", true);
      if (role === "viewer" && mutableProjects.length) throw new Error(`Viewer access cannot include mutableProjects: ${rawIdentity}`);
      if (!projects.includes("*") && (mutableProjects.includes("*") || mutableProjects.some((project) => !projects.includes(project)))) {
        throw new Error(`Access-policy mutableProjects must be a subset of visible projects: ${rawIdentity}`);
      }
      this.users.set(identity, { role: role as AccessRole, projects, mutableProjects });
    }
  }

  principal(identity: string, loopback: boolean): AccessPrincipal | null {
    const normalized = identity.trim().toLowerCase();
    if (!normalized) return loopback ? { identity: "local", role: "admin", projects: ["*"], mutableProjects: ["*"], source: "loopback" } : null;
    const explicit = this.users.get(normalized);
    if (explicit) return { identity: normalized, ...explicit, source: "explicit-policy" };
    if (this.explicit) return null;
    if (this.legacyAllowedUsers.size && !this.legacyAllowedUsers.has(normalized)) return null;
    return { identity: normalized, role: "operator", projects: ["*"], mutableProjects: ["*"], source: "legacy-allowlist" };
  }
}

export function canReadProject(principal: AccessPrincipal, projectId: string): boolean {
  return Boolean(projectId) && (principal.projects.includes("*") || principal.projects.includes(projectId));
}

export function canMutateProject(principal: AccessPrincipal, projectId: string): boolean {
  return principal.role !== "viewer" && Boolean(projectId)
    && (principal.mutableProjects.includes("*") || principal.mutableProjects.includes(projectId));
}

export function canMutateScope(principal: AccessPrincipal, projectId: string): boolean {
  return projectId ? canMutateProject(principal, projectId) : principal.role !== "viewer" && principal.mutableProjects.includes("*");
}

export function filterControlForPrincipal<T extends Record<string, any>>(value: T, principal: AccessPrincipal): T {
  if (principal.projects.includes("*")) return value;
  const visible = new Set(principal.projects);
  return {
    ...value,
    projectIndex: Array.isArray(value.projectIndex) ? value.projectIndex.filter((project: any) => visible.has(project.id)) : value.projectIndex,
    projects: Array.isArray(value.projects) ? value.projects.filter((project: any) => visible.has(project.id)) : value.projects,
  };
}

export function filterObserverForPrincipal<T extends Record<string, any>>(value: T, principal: AccessPrincipal): T {
  if (principal.projects.includes("*")) return value;
  const visible = new Set(principal.projects);
  const lanes = Array.isArray(value.lanes) ? value.lanes.filter((lane: any) => visible.has(lane.project)) : [];
  const sources = Array.isArray(value.sources) ? value.sources.filter((source: any) => visible.has(source.project)) : [];
  return {
    ...value, lanes, sources,
    counts: {
      working: lanes.filter((lane: any) => lane.severity === "working").length,
      idle: lanes.filter((lane: any) => lane.severity === "idle").length,
      attention: lanes.filter((lane: any) => lane.severity === "attention" || lane.severity === "unknown").length,
      complete: lanes.filter((lane: any) => lane.severity === "complete").length,
      total: lanes.length,
    },
  };
}
