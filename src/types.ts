export type HostKind = "windows" | "macbook";

export interface Activity {
  id: string;
  kind: string;
  label: string;
  startedAt?: string;
  agentType?: string;
  model?: string;
  status?: string;
  depth?: number;
}

export interface TopologySnapshot {
  profile: string;
  compliance: string;
  parentAgent: string;
  parentModel: string;
  childAgentType: string;
  childModel: string;
  exactCount: number;
  launchedCount: number;
  runningCount: number;
  violations: number;
}

export interface TimelineEntry {
  at: string;
  state: string;
  detail: string;
  text: string;
}

export type LaneSeverity = "working" | "idle" | "attention" | "complete" | "unknown";

export interface LaneSnapshot {
  id: string;
  project: string;
  host: HostKind;
  task: string;
  lane: string;
  name: string;
  model: string;
  effort: string;
  laneKind: string;
  parentAgent: string;
  jobId: string;
  sessionId: string;
  lifecycle: string;
  daemon: string;
  tempo: string;
  status: string;
  severity: LaneSeverity;
  attentionReason: string;
  detail: string;
  output: string;
  tokens: number | null;
  inFlight: number;
  queued: number;
  activities: Activity[];
  topology: TopologySnapshot | null;
  timeline: TimelineEntry[];
  landing: string;
  branch: string;
  worktree: string;
  launchedAt: string;
  updatedAt: string;
  completedAt: string;
}

export interface ObserverSnapshot {
  generatedAt: string;
  version: number;
  lanes: LaneSnapshot[];
  counts: {
    working: number;
    idle: number;
    attention: number;
    complete: number;
    total: number;
  };
  sources: Array<{
    project: string;
    host: HostKind;
    path: string;
    kind?: "canonical" | "coordinator-checkout";
    available: boolean;
  }>;
}
