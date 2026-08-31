import { afterEach, describe, expect, test } from "bun:test";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { parseWatchdogTranscript, RuntimeHealthService } from "../src/runtime-health-service";

const cleanup: string[] = [];

afterEach(async () => {
  while (cleanup.length) await rm(cleanup.pop()!, { recursive: true, force: true });
});

test("parses durable watchdog starts, abnormal exits, and confirmed Bun panics", () => {
  const result = parseWatchdogTranscript(`
[2026-08-29T17:00:00.0000000-05:00] Starting Lane Watch on 127.0.0.1:4317
panic(main thread): Segmentation fault at address 0x0
oh no: Bun has crashed. This indicates a bug in Bun, not your code.
WARNING: [2026-08-29T17:35:34.4525455-05:00] Lane Watch exited with code 3; retrying in 5 seconds
[2026-08-29T17:35:41.4720546-05:00] Starting Lane Watch on 127.0.0.1:4317
WARNING: [2026-08-29T17:45:13.8988426-05:00] Lane Watch exited with code -1; retrying in 5 seconds
[2026-08-29T17:45:20.9042826-05:00] Starting Lane Watch on 127.0.0.1:4317
`);

  expect(result).toEqual({
    available: true,
    source: "watchdog-transcript",
    windowTruncated: false,
    startCount: 3,
    restartCount: 2,
    abnormalExitCount: 2,
    bunPanicCount: 1,
    lastStartedAt: "2026-08-29T17:45:20.9042826-05:00",
    lastExitAt: "2026-08-29T17:45:13.8988426-05:00",
    lastExitCode: -1,
  });
});

describe("runtime health service", () => {
  test("exposes current process identity and watchdog history without mutating it", async () => {
    const root = await mkdtemp(join(tmpdir(), "lane-watch-runtime-health-"));
    cleanup.push(root);
    await mkdir(root, { recursive: true });
    await writeFile(join(root, "scheduled-task.log"), `
[2026-08-30T09:00:00.0000000-05:00] Starting Lane Watch on 127.0.0.1:4317
WARNING: [2026-08-30T10:00:00.0000000-05:00] Lane Watch exited with code -1; retrying in 5 seconds
[2026-08-30T10:00:05.0000000-05:00] Starting Lane Watch on 127.0.0.1:4317
`);
    const health = await new RuntimeHealthService(root, "2026-08-30T10:00:05.000Z", 4317).snapshot() as any;

    expect(health).toMatchObject({
      schema: "lane-watch-runtime-health/v1",
      process: { pid: 4317, startedAt: "2026-08-30T10:00:05.000Z", bunVersion: Bun.version },
      watchdog: { available: true, startCount: 2, restartCount: 1, abnormalExitCount: 1, bunPanicCount: 0, lastExitCode: -1 },
      stability: "ABNORMAL_EXITS_OBSERVED",
    });
    expect(health.process.uptimeSeconds).toBeGreaterThanOrEqual(0);
  });

  test("reports unavailable history explicitly instead of inventing zero-crash stability", async () => {
    const root = await mkdtemp(join(tmpdir(), "lane-watch-runtime-health-"));
    cleanup.push(root);
    const health = await new RuntimeHealthService(root).snapshot() as any;

    expect(health).toMatchObject({
      watchdog: { available: false, startCount: 0, abnormalExitCount: 0, bunPanicCount: 0 },
      stability: "WATCHDOG_HISTORY_UNAVAILABLE",
    });
  });
});
