export interface CustodyInputManifest {
  files: Array<{ commit: string; path: string; sha256: string }>;
  recordIds?: string[];
  requiredRecordCount?: number | null;
  requiredHost?: "win32" | "darwin" | "linux" | null;
}

/** Structural readiness is separate from proof or provenance acceptance. */
export function custodyInputReadiness(manifest: CustodyInputManifest | undefined): { ready: boolean; reason: string } {
  if (!manifest || !Array.isArray(manifest.files) || !manifest.files.length) {
    return { ready: false, reason: "Supply a frozen input manifest with exact source commits, paths, and SHA-256 hashes before dispatch." };
  }
  if (manifest.files.length > 32 || manifest.files.some((file) =>
    !/^[a-f0-9]{40}$/i.test(file.commit) || !/^(sha256:)?[a-f0-9]{64}$/i.test(file.sha256)
    || !file.path || /[\\:\x00-\x1f]/.test(file.path) || file.path.startsWith("/")
    || file.path.split("/").some((part) => !part || part === "." || part === ".."))) {
    return { ready: false, reason: "Every input needs a full commit, a confined repository-relative path, and a SHA-256 hash (at most 32 files)." };
  }
  if (manifest.requiredHost && !["win32", "darwin", "linux"].includes(manifest.requiredHost)) {
    return { ready: false, reason: "Unsupported required input host." };
  }
  const ids = manifest.recordIds;
  if (ids !== undefined && (!Array.isArray(ids) || ids.length > 1000 || ids.some((id) => typeof id !== "string" || !id.trim()) || new Set(ids).size !== ids.length)) {
    return { ready: false, reason: "Record IDs must be explicit, nonempty, unique, and bounded to 1,000 entries." };
  }
  if (manifest.requiredRecordCount != null && (!Number.isInteger(manifest.requiredRecordCount)
    || manifest.requiredRecordCount < 0 || manifest.requiredRecordCount > 1000 || ids?.length !== manifest.requiredRecordCount)) {
    return { ready: false, reason: `The input manifest must name exactly ${manifest.requiredRecordCount} record IDs; none may be inferred by the executor.` };
  }
  return { ready: true, reason: "Input references are explicit; frozen blob bytes and host are checked before lease preparation and dispatch." };
}

