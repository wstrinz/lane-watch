export interface GitResult {
  exitCode: number;
  stdout: string;
  stderr: string;
}

export async function runGit(projectRoot: string, args: string[]): Promise<GitResult> {
  const child = Bun.spawn(["git", "-c", `safe.directory=${projectRoot}`, "-c", "commit.gpgsign=false", "-C", projectRoot, ...args], {
    cwd: projectRoot,
    stdout: "pipe",
    stderr: "pipe",
  });
  const [stdout, stderr, exitCode] = await Promise.all([
    new Response(child.stdout).text(),
    new Response(child.stderr).text(),
    child.exited,
  ]);
  // Preserve leading porcelain status columns (for example ` M path`).
  // Trimming the whole stream turns the first such row into `M path`, which
  // corrupts exact-path allowlist checks. Git's trailing newline is noise;
  // leading bytes are part of the protocol.
  return { exitCode, stdout: stdout.trimEnd(), stderr: stderr.trim() };
}
