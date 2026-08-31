import { readFile } from "node:fs/promises";
import { join } from "node:path";

const MAX_TRANSCRIPT_CHARACTERS = 2_000_000;

export interface WatchdogHealthSnapshot {
  available: boolean;
  source: "watchdog-transcript";
  windowTruncated: boolean;
  startCount: number;
  restartCount: number;
  abnormalExitCount: number;
  bunPanicCount: number;
  lastStartedAt: string;
  lastExitAt: string;
  lastExitCode: number | null;
}

export function parseWatchdogTranscript(text: string, windowTruncated = false): WatchdogHealthSnapshot {
  const starts = [...text.matchAll(/^\[([^\]]+)] Starting Lane Watch on /gm)];
  const exits = [...text.matchAll(/^WARNING: \[([^\]]+)] Lane Watch exited with code (-?\d+);/gm)];
  const lastExit = exits.at(-1);
  return {
    available: true,
    source: "watchdog-transcript",
    windowTruncated,
    startCount: starts.length,
    restartCount: Math.max(0, starts.length - 1),
    abnormalExitCount: exits.length,
    bunPanicCount: (text.match(/Bun has crashed/g) ?? []).length,
    lastStartedAt: starts.at(-1)?.[1] ?? "",
    lastExitAt: lastExit?.[1] ?? "",
    lastExitCode: lastExit ? Number(lastExit[2]) : null,
  };
}

/** Projects process identity and durable watchdog history without controlling either runtime. */
export class RuntimeHealthService {
  constructor(
    private readonly dataRoot: string,
    private readonly processStartedAt = new Date().toISOString(),
    private readonly processId = process.pid,
  ) {}

  async snapshot(): Promise<Record<string, unknown>> {
    const watchdog = await this.watchdog();
    return {
      schema: "lane-watch-runtime-health/v1",
      process: {
        pid: this.processId,
        startedAt: this.processStartedAt,
        uptimeSeconds: Math.max(0, Math.floor((Date.now() - new Date(this.processStartedAt).valueOf()) / 1000)),
        bunVersion: Bun.version,
      },
      watchdog,
      stability: watchdog.bunPanicCount > 0
        ? "BUN_PANICS_OBSERVED"
        : watchdog.abnormalExitCount > 0
          ? "ABNORMAL_EXITS_OBSERVED"
          : watchdog.available ? "STABLE_IN_RETAINED_WINDOW" : "WATCHDOG_HISTORY_UNAVAILABLE",
    };
  }

  private async watchdog(): Promise<WatchdogHealthSnapshot> {
    try {
      const full = await readFile(join(this.dataRoot, "scheduled-task.log"), "utf8");
      const truncated = full.length > MAX_TRANSCRIPT_CHARACTERS;
      return parseWatchdogTranscript(truncated ? full.slice(-MAX_TRANSCRIPT_CHARACTERS) : full, truncated);
    } catch {
      return {
        available: false,
        source: "watchdog-transcript",
        windowTruncated: false,
        startCount: 0,
        restartCount: 0,
        abnormalExitCount: 0,
        bunPanicCount: 0,
        lastStartedAt: "",
        lastExitAt: "",
        lastExitCode: null,
      };
    }
  }
}
