import { Database } from "bun:sqlite";
import { randomUUID } from "node:crypto";

export interface CampaignControllerIdentity {
  schema: "lane-watch-controller/v1";
  pid: number;
  instanceId: string;
  acquiredAt: string;
  recoveredFromPid: number | null;
}

interface OwnerRow {
  owner_pid: number;
  owner_nonce: string;
  acquired_at: string;
  released_at: string;
}

function mayBeAlive(pid: number): boolean {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error: any) {
    // Permission errors, unknown errors and PID reuse cannot authorize takeover.
    return error?.code !== "ESRCH";
  }
}

/** One writer per local campaign data directory, acquired before its database
 * is opened or recovered. There is no time-based expiry or forced takeover. */
export class CampaignControllerLease {
  private released = false;

  private constructor(
    private readonly database: Database,
    readonly identity: Readonly<CampaignControllerIdentity>,
  ) {}

  static acquire(path: string): CampaignControllerLease {
    const database = new Database(path, { create: true });
    try {
      database.exec(`PRAGMA busy_timeout=1000; PRAGMA journal_mode=WAL; PRAGMA synchronous=FULL;
        CREATE TABLE IF NOT EXISTS campaign_controller_owner (
          singleton INTEGER PRIMARY KEY CHECK(singleton=1),
          owner_pid INTEGER NOT NULL, owner_nonce TEXT NOT NULL,
          acquired_at TEXT NOT NULL, released_at TEXT NOT NULL DEFAULT '')`);
      const identity = database.transaction((): CampaignControllerIdentity => {
        const previous = database.query("SELECT * FROM campaign_controller_owner WHERE singleton=1").get() as OwnerRow | null;
        if (previous) {
          if (!Number.isSafeInteger(previous.owner_pid) || previous.owner_pid <= 0
            || !/^[0-9a-f-]{36}$/i.test(previous.owner_nonce)
            || !Number.isFinite(Date.parse(previous.acquired_at))
            || previous.released_at !== "" && !Number.isFinite(Date.parse(previous.released_at))) {
            throw new Error("Campaign controller ownership is invalid; startup requires inspection before recovery");
          }
          if (!previous.released_at && mayBeAlive(previous.owner_pid)) {
            throw new Error(`Campaign controller is already owned by live or unverified process ${previous.owner_pid}. No campaign database was opened or recovered by this instance.`);
          }
        }
        const claimed: CampaignControllerIdentity = {
          schema: "lane-watch-controller/v1",
          pid: process.pid,
          instanceId: randomUUID(),
          acquiredAt: new Date().toISOString(),
          recoveredFromPid: previous && !previous.released_at ? previous.owner_pid : null,
        };
        database.query(`INSERT INTO campaign_controller_owner(singleton,owner_pid,owner_nonce,acquired_at,released_at)
          VALUES (1,?,?,?,'') ON CONFLICT(singleton) DO UPDATE SET
          owner_pid=excluded.owner_pid,owner_nonce=excluded.owner_nonce,acquired_at=excluded.acquired_at,released_at=''`)
          .run(claimed.pid, claimed.instanceId, claimed.acquiredAt);
        return claimed;
      }).immediate();
      return new CampaignControllerLease(database, Object.freeze(identity));
    } catch (error) {
      database.close();
      throw error;
    }
  }

  /** Call only after the owner's campaign database has closed. */
  release(): void {
    if (this.released) return;
    try {
      const changed = this.database.query(`UPDATE campaign_controller_owner SET released_at=?
        WHERE singleton=1 AND owner_pid=? AND owner_nonce=? AND released_at=''`)
        .run(new Date().toISOString(), this.identity.pid, this.identity.instanceId).changes;
      if (changed !== 1) throw new Error("Campaign controller ownership changed before release");
    } finally {
      this.database.close();
      this.released = true;
    }
  }
}
