import { describe, expect, test } from "bun:test";
import { mutationOriginAllowed } from "../src/security";

describe("mutationOriginAllowed", () => {
  test("accepts browser same-origin requests through a loopback reverse proxy", () => {
    expect(mutationOriginAllowed({
      requestUrl: "http://127.0.0.1:4317/api/actions",
      origin: "https://desktop.example.ts.net:4317",
      fetchSite: "same-origin",
      hasProxyIdentity: true,
    })).toBe(true);
  });

  test("rejects cross-site browser mutations", () => {
    expect(mutationOriginAllowed({
      requestUrl: "http://127.0.0.1:4317/api/actions",
      origin: "https://attacker.example",
      fetchSite: "cross-site",
      hasProxyIdentity: false,
    })).toBe(false);
  });

  test("requires proxy identity for an origin mismatch without browser metadata", () => {
    expect(mutationOriginAllowed({
      requestUrl: "http://127.0.0.1:4317/api/actions",
      origin: "https://desktop.example.ts.net:4317",
      fetchSite: "",
      hasProxyIdentity: false,
    })).toBe(false);
  });
});
