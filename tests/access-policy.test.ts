import { describe, expect, test } from "bun:test";
import { AccessPolicy, canMutateProject, canMutateScope, canReadProject, filterControlForPrincipal, filterObserverForPrincipal } from "../src/access-policy";

describe("request-scoped access policy", () => {
  test("keeps loopback administrative and preserves the legacy remote allowlist boundary", () => {
    const policy = new AccessPolicy("", new Set(["operator@example.com"]));
    expect(policy.principal("", true)).toEqual({ identity: "local", role: "admin", projects: ["*"], mutableProjects: ["*"], source: "loopback" });
    expect(policy.principal("", false)).toBeNull();
    expect(policy.principal("other@example.com", false)).toBeNull();
    expect(policy.principal("Operator@Example.com", false)).toEqual({ identity: "operator@example.com", role: "operator", projects: ["*"], mutableProjects: ["*"], source: "legacy-allowlist" });
  });

  test("allows all-project observation with a narrower mutation scope", () => {
    const policy = new AccessPolicy(JSON.stringify({ users: {
      "operator@example.com": { role: "operator", projects: ["*"], mutableProjects: ["cfg23"] },
    } }));
    const principal = policy.principal("operator@example.com", false)!;
    expect(canReadProject(principal, "cfg23")).toBe(true);
    expect(canReadProject(principal, "arr15")).toBe(true);
    expect(canMutateProject(principal, "cfg23")).toBe(true);
    expect(canMutateProject(principal, "arr15")).toBe(false);
    expect(canMutateScope(principal, "")).toBe(false);
  });

  test("fails closed for unknown explicit users and separates view from mutation scope", () => {
    const policy = new AccessPolicy(JSON.stringify({ users: {
      "reader@example.com": { role: "viewer", projects: ["cfg23"] },
      "operator@example.com": { role: "operator", projects: ["arr15", "cfg23"] },
    } }));
    const reader = policy.principal("reader@example.com", false)!;
    expect(canReadProject(reader, "cfg23")).toBe(true);
    expect(canReadProject(reader, "arr15")).toBe(false);
    expect(canMutateProject(reader, "cfg23")).toBe(false);
    expect(canMutateProject(policy.principal("operator@example.com", false)!, "arr15")).toBe(true);
    expect(canMutateScope(policy.principal("operator@example.com", false)!, "")).toBe(false);
    expect(canMutateScope(new AccessPolicy().principal("any@example.com", false)!, "")).toBe(true);
    expect(policy.principal("unknown@example.com", false)).toBeNull();
  });

  test("filters project indexes, full control rows, lanes, sources, and counts without mutating inputs", () => {
    const principal = new AccessPolicy(JSON.stringify({ users: { "reader@example.com": { role: "viewer", projects: ["cfg23"] } } })).principal("reader@example.com", false)!;
    const control = { projectIndex: [{ id: "cfg23" }, { id: "arr15" }], projects: [{ id: "cfg23" }, { id: "arr15" }] };
    const observer = { lanes: [
      { project: "cfg23", severity: "working" }, { project: "arr15", severity: "attention" },
    ], sources: [{ project: "cfg23" }, { project: "arr15" }], counts: { total: 2 } };
    expect(filterControlForPrincipal(control, principal)).toEqual({ projectIndex: [{ id: "cfg23" }], projects: [{ id: "cfg23" }] });
    expect(filterObserverForPrincipal(observer, principal)).toMatchObject({ lanes: [{ project: "cfg23" }], sources: [{ project: "cfg23" }], counts: { working: 1, attention: 0, total: 1 } });
    expect(control.projects).toHaveLength(2);
    expect(observer.lanes).toHaveLength(2);
  });

  test("rejects malformed policy documents instead of silently broadening access", () => {
    expect(() => new AccessPolicy("not-json")).toThrow("valid JSON");
    expect(() => new AccessPolicy(JSON.stringify({ users: { x: { role: "owner", projects: ["*"] } } }))).toThrow("Invalid access-policy");
    expect(() => new AccessPolicy(JSON.stringify({ users: { x: { role: "viewer", projects: [] } } }))).toThrow("at least one project");
    expect(() => new AccessPolicy(JSON.stringify({ users: { x: { role: "operator", projects: ["cfg23"], mutableProjects: ["arr15"] } } }))).toThrow("subset of visible projects");
    expect(() => new AccessPolicy(JSON.stringify({ users: { x: { role: "viewer", projects: ["cfg23"], mutableProjects: ["cfg23"] } } }))).toThrow("Viewer access");
  });
});
