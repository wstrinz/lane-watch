import { createHash } from "node:crypto";
import { runGit } from "./git";

import { custodyInputReadiness, type CustodyInputManifest } from "./custody-input-manifest";

/** Read immutable Git blobs, never mutable checkout bytes; start no agent. */
export async function verifyCustodyInputs(repositoryRoot: string, manifest: CustodyInputManifest | undefined, host = process.platform): Promise<void> {
  const readiness = custodyInputReadiness(manifest);
  if (!readiness.ready) throw new Error(`Custody input preflight: ${readiness.reason}`);
  if (manifest!.requiredHost && manifest!.requiredHost !== host) throw new Error(`Custody input preflight: requires ${manifest!.requiredHost}; current host is ${host}.`);
  let totalBytes = 0;
  for (const file of manifest!.files) {
    const ref = `${file.commit}:${file.path}`;
    const type = await runGit(repositoryRoot, ["cat-file", "-t", ref]);
    const size = await runGit(repositoryRoot, ["cat-file", "-s", ref]);
    const bytes = Number(size.stdout);
    if (type.exitCode || type.stdout !== "blob" || size.exitCode || !Number.isSafeInteger(bytes) || bytes < 0) throw new Error(`Custody input preflight: missing source blob ${ref}.`);
    totalBytes += bytes;
    if (bytes > 5 * 1024 * 1024 || totalBytes > 16 * 1024 * 1024) throw new Error("Custody input preflight: source manifest exceeds the bounded 5 MiB/file or 16 MiB total; supply a compact source manifest.");
    const child = Bun.spawn(["git", "-c", `safe.directory=${repositoryRoot}`, "-C", repositoryRoot, "cat-file", "blob", ref], { stdout: "pipe", stderr: "pipe" });
    const [content, , code] = await Promise.all([new Response(child.stdout).arrayBuffer(), new Response(child.stderr).text(), child.exited]);
    const hash = createHash("sha256").update(new Uint8Array(content)).digest("hex");
    if (code || hash !== file.sha256.replace(/^sha256:/i, "").toLowerCase()) throw new Error(`Custody input preflight: source hash mismatch for ${ref}.`);
  }
}
