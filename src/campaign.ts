import { Database } from "bun:sqlite";
import { mkdir, rename } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { CodexAppServerClient } from "./codex";
import { inferStrategyClassification } from "./strategy";
import { type ResourcePolicy } from "./resources";
import { laneFailure, planWaveProjectionRepair, projectWaveAggregate, waveAccounting } from "./wave";
import { WaveCommandService } from "./wave-commands";
import { WaveRepository, type WaveMemberRecord, type WaveRecord } from "./wave-repository";
import { WaveScheduleRepository } from "./wave-schedule-repository";
import { CampaignDomainReader } from "./campaign-domain-reader";
import { CampaignProjectReader, type CampaignProjectReadOptions } from "./campaign-project-reader";
import { ResourceCommandService } from "./resource-command-service";
import { StrategyCommandService } from "./strategy-command-service";
import { runGit } from "./git";
import { CustodyCommandService } from "./custody-command-service";
import { ResearchExecutionService, type ResearchLauncher, type ResearchLaunchResult, type ResearchLaunchSpec } from "./research-execution-service";
import { CoordinatorSessionService, type CodexCoordinatorCandidate, type CoordinatorRow } from "./coordinator-session-service";
import { ResearchPlanningService } from "./research-planning-service";
import { WaveSemanticService } from "./wave-semantic-service";
import { AutopilotService } from "./autopilot-service";
import { evaluateAutopilotStartReadiness, type AutopilotStartReadiness } from "./autopilot-readiness";
import { ObservationSyncService, assertTerminalResearchReceipt } from "./observation-sync-service";
import { CodexNotificationService, sanitizeCoordinatorConversation } from "./codex-notification-service";
import { ActionQueueService, type ActionQueueRow } from "./action-queue-service";
import { CodexApprovalService } from "./codex-approval-service";
import { ObserverAutomationPolicyService } from "./observer-automation-policy-service";
import { CampaignCoordinationInterfaceService } from "./campaign-coordination-interface-service";
import { LaneOwnershipService } from "./lane-ownership-service";
import { OperatorTransitionService } from "./operator-transition-service";
import { CampaignStateService, type CampaignTransitionContext } from "./campaign-state-service";
import { CampaignRecoveryService } from "./campaign-recovery-service";
import { CampaignSchemaMigrationService } from "./campaign-schema-migration-service";
import { CampaignStartupService, type CampaignProjectDefinition } from "./campaign-startup-service";
import { CampaignActionRouter, type CampaignActionHandlerRegistry, type CampaignActionType } from "./campaign-action-router";
import { LaneReconciliationService } from "./lane-reconciliation-service";
import { ContextRegistryService } from "./context-registry-service";
import { MultiProjectQuotaService } from "./multi-project-quota-service";
import { quotaPolicyFromEnvironment } from "./operational-governance";
import type { LaneSnapshot, ObserverSnapshot } from "./types";

export { deriveCampaignPhase } from "./wave";
export type { ResearchLauncher, ResearchLaunchResult, ResearchLaunchSpec } from "./research-execution-service";
export type { CodexCoordinatorCandidate } from "./coordinator-session-service";
export type { CampaignActionType } from "./campaign-action-router";

export type CampaignPhase =
  | "PLANNING"
  | "RUNNING"
  | "RECONCILING"
  | "SYNTHESIS_READY"
  | "SYNTHESIZING"
  | "RESEARCH_REVIEW"
  | "RESEARCH_READY"
  | "RESEARCH_RUNNING"
  | "RESEARCH_INTAKE"
  | "REVISING"
  | "DECISION_REQUIRED"
  | "NEXT_WAVE_READY"
  | "BLOCKED";

export type AutomationMode = "observe" | "prepare" | "propose" | "bounded";

type ProjectDefinition = CampaignProjectDefinition;

interface ProjectRow {
  project_id: string;
  role: string;
  root_path: string;
  automation_mode: AutomationMode;
  dispatch_profile: ResearchDispatchProfile;
  current_phase: CampaignPhase;
  version: number;
  updated_at: string;
}

type WaveRow = Omit<WaveRecord, "phase"> & { phase: CampaignPhase };
type WaveLaneRow = WaveMemberRecord;

interface DecisionRow {
  decision_id: string;
  project_id: string;
  wave_id: string;
  decision: string;
  note: string;
  actor: string;
  created_at: string;
}

interface ResearchRequestRow {
  request_id: string;
  project_id: string;
  wave_id: string;
  question: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface ResearchRunRow {
  run_id: string;
  request_id: string;
  project_id: string;
  wave_id: string;
  task_id: string;
  status: string;
  profile: string;
  host: string;
  model: string;
  effort: string;
  fanout: number;
  packet_path: string;
  base_ref: string;
  lane_id: string;
  job_id: string;
  worktree: string;
  evidence_path: string;
  evidence_sha256: string;
  evidence_json: string;
  error: string;
  created_at: string;
  updated_at: string;
  completed_at: string;
}

interface ResearchRunSummaryRow extends ResearchRunRow {
  evidence_schema: string;
  evidence_status: string;
  evidence_verdict: string;
  evidence_summary: string;
  evidence_detail_available: number;
}

export interface CampaignSnapshotOptions extends CampaignProjectReadOptions {}

interface ResearchPlanRow {
  wave_id: string;
  project_id: string;
  thread_id: string;
  turn_id: string;
  status: string;
  bundle_path: string;
  evidence_digest: string;
  response_json: string;
  created_at: string;
  updated_at: string;
}

export type ResearchDispatchProfile = "sonnet-worker" | "opus-lead-sonnet" | "research-opus-max";

interface ResearchDispatchProfileDefinition {
  id: ResearchDispatchProfile;
  label: string;
  model: "sonnet" | "opus";
  effort: "high" | "max";
  fanout: number;
  laneKind: "research" | "research-lead" | "external-review";
  useWhen: string;
  budgetClass: "routine" | "coordinated" | "deep-review";
}

const RESEARCH_DISPATCH_PROFILES: Record<ResearchDispatchProfile, ResearchDispatchProfileDefinition> = {
  "sonnet-worker": {
    id: "sonnet-worker",
    label: "Sonnet worker",
    model: "sonnet",
    effort: "high",
    fanout: 0,
    laneKind: "research",
    useWhen: "Default for bounded implementation, checking, experiments, and routine research work.",
    budgetClass: "routine",
  },
  "opus-lead-sonnet": {
    id: "opus-lead-sonnet",
    label: "Opus lead + 3 Sonnet workers",
    model: "opus",
    effort: "high",
    fanout: 3,
    laneKind: "research-lead",
    useWhen: "Use occasionally when one coordinator should decompose a genuinely multi-part run across Sonnet children.",
    budgetClass: "coordinated",
  },
  "research-opus-max": {
    id: "research-opus-max",
    label: "Opus max reviewer",
    model: "opus",
    effort: "max",
    fanout: 0,
    laneKind: "external-review",
    useWhen: "Reserve for synthesis, adversarial cross-checking, and extracting or challenging new ideas from accumulated results.",
    budgetClass: "deep-review",
  },
};

function isResearchDispatchProfile(value: unknown): value is ResearchDispatchProfile {
  return typeof value === "string" && value in RESEARCH_DISPATCH_PROFILES;
}

export interface EnqueueActionInput {
  projectId: string;
  type: CampaignActionType;
  targetId?: string;
  idempotencyKey: string;
  expectedVersion: number;
  args?: Record<string, unknown>;
}

function now(): string {
  return new Date().toISOString();
}

function parseJson<T>(value: string, fallback: T): T {
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function canonical(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    return `{${Object.keys(record).sort().map((key) => `${JSON.stringify(key)}:${canonical(record[key])}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

function digest(value: unknown): string {
  const hasher = new Bun.CryptoHasher("sha256");
  hasher.update(canonical(value));
  return hasher.digest("hex");
}

function synthesisSchema(): Record<string, unknown> {
  return {
    type: "object",
    additionalProperties: false,
    required: ["waveId", "evidenceDigest", "operatorBrief", "waveReview", "laneDispositions", "claimDeltas", "contradictions", "researchRequests", "nextWave", "strategyAssessment", "decision"],
    properties: {
      waveId: { type: "string" },
      evidenceDigest: { type: "string" },
      operatorBrief: {
        type: "object",
        additionalProperties: false,
        required: ["headline", "whereWeAre", "recentProgress", "currentFocus", "nextDecision", "watchouts"],
        properties: {
          headline: { type: "string" },
          whereWeAre: { type: "string" },
          recentProgress: { type: "array", items: { type: "string" } },
          currentFocus: { type: "string" },
          nextDecision: { type: "string" },
          watchouts: { type: "array", items: { type: "string" } },
        },
      },
      waveReview: {
        type: "object",
        additionalProperties: false,
        required: ["summary", "outcome", "quickChecks", "tunnelVisionRisks", "coordinatorGuidance"],
        properties: {
          summary: { type: "string" },
          outcome: { type: "string", enum: ["ADVANCED", "MIXED", "BLOCKED", "INCONCLUSIVE"] },
          quickChecks: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              required: ["check", "status", "detail"],
              properties: {
                check: { type: "string" },
                status: { type: "string", enum: ["PASS", "WARN", "BLOCK"] },
                detail: { type: "string" },
              },
            },
          },
          tunnelVisionRisks: { type: "array", items: { type: "string" } },
          coordinatorGuidance: { type: "string" },
        },
      },
      laneDispositions: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          required: ["laneId", "disposition", "reason"],
          properties: {
            laneId: { type: "string" },
            disposition: { type: "string", enum: ["ADMIT", "REJECT", "REPAIR", "INCONCLUSIVE"] },
            reason: { type: "string" },
          },
        },
      },
      claimDeltas: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          required: ["claimId", "proposedStatus", "summary", "evidence", "objections"],
          properties: {
            claimId: { type: "string" },
            proposedStatus: { type: "string" },
            summary: { type: "string" },
            evidence: { type: "array", items: { type: "string" } },
            objections: { type: "array", items: { type: "string" } },
          },
        },
      },
      contradictions: { type: "array", items: { type: "string" } },
      researchRequests: { type: "array", items: { type: "string" } },
      nextWave: {
        type: "object",
        additionalProperties: false,
        required: ["objective", "lanes", "stopConditions"],
        properties: {
          objective: { type: "string" },
          lanes: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              required: ["taskId", "profile", "fanout", "objective"],
              properties: {
                taskId: { type: "string" },
                profile: { type: "string" },
                fanout: { type: "integer", minimum: 0 },
                objective: { type: "string" },
              },
            },
          },
          stopConditions: { type: "array", items: { type: "string" } },
        },
      },
      strategyAssessment: {
        type: "object",
        additionalProperties: false,
        required: ["summary", "workMix", "progressDeltas", "driftSignals", "recommendedTrackWeights", "strategyDecision"],
        properties: {
          summary: { type: "string" },
          workMix: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              required: ["trackId", "workKind", "summary"],
              properties: {
                trackId: { type: "string", enum: ["coverage", "supply", "decision"] },
                workKind: { type: "string", enum: ["frontier", "experiment", "maintenance", "audit"] },
                summary: { type: "string" },
              },
            },
          },
          progressDeltas: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              required: ["metricId", "status", "before", "after", "evidence"],
              properties: {
                metricId: { type: "string" },
                status: { type: "string", enum: ["ADVANCED", "UNCHANGED", "REGRESSED", "UNKNOWN"] },
                before: { type: "string" },
                after: { type: "string" },
                evidence: { type: "string" },
              },
            },
          },
          driftSignals: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              required: ["id", "status", "detail"],
              properties: {
                id: { type: "string" },
                status: { type: "string", enum: ["CLEAR", "WARN", "BLOCK"] },
                detail: { type: "string" },
              },
            },
          },
          recommendedTrackWeights: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              required: ["trackId", "share", "reason"],
              properties: {
                trackId: { type: "string", enum: ["coverage", "supply", "decision"] },
                share: { type: "number", minimum: 0, maximum: 1 },
                reason: { type: "string" },
              },
            },
          },
          strategyDecision: { type: "string", enum: ["CONTINUE_WITHIN_CHARTER", "REBALANCE_REQUIRED", "EXTERNAL_PERSPECTIVE_REQUIRED", "OPERATOR_RESOURCE_REQUIRED", "CAMPAIGN_COMPLETE", "BLOCKED"] },
        },
      },
      decision: { type: "string", enum: ["READY_FOR_REVIEW", "RESEARCH_REQUIRED", "BLOCKED"] },
    },
  };
}

function researchPlanSchema(): Record<string, unknown> {
  return {
    type: "object",
    additionalProperties: false,
    required: ["waveId", "evidenceDigest", "summary", "portfolioAssessment", "quickChecks", "lanes", "risks", "operatorGuidance", "decision"],
    properties: {
      waveId: { type: "string" },
      evidenceDigest: { type: "string" },
      summary: { type: "string" },
      portfolioAssessment: {
        type: "object",
        additionalProperties: false,
        required: ["summary", "charterFit", "trackCoverage", "maintenanceShareEstimate", "driftResponse"],
        properties: {
          summary: { type: "string" },
          charterFit: { type: "string", enum: ["ALIGNED", "IMBALANCED", "OUTSIDE_CHARTER"] },
          trackCoverage: { type: "array", items: { type: "string", enum: ["coverage", "supply", "decision"] } },
          maintenanceShareEstimate: { type: "number", minimum: 0, maximum: 1 },
          driftResponse: { type: "string" },
        },
      },
      quickChecks: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          required: ["check", "status", "detail"],
          properties: {
            check: { type: "string" },
            status: { type: "string", enum: ["PASS", "WARN", "BLOCK"] },
            detail: { type: "string" },
          },
        },
      },
      lanes: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          required: ["requestId", "action", "question", "taskId", "profile", "priority", "dependsOnTaskIds", "rationale", "stopCondition", "evidenceExpected", "strategy", "contract"],
          properties: {
            requestId: { type: "string" },
            action: { type: "string", enum: ["KEEP", "REVISE", "DROP"] },
            question: { type: "string" },
            taskId: { type: "string" },
            profile: { type: "string", enum: ["sonnet-worker", "opus-lead-sonnet", "research-opus-max"] },
            priority: { type: "integer", minimum: 1 },
            dependsOnTaskIds: { type: "array", items: { type: "string" } },
            rationale: { type: "string" },
            stopCondition: { type: "string" },
            evidenceExpected: { type: "string" },
            strategy: {
              type: "object",
              additionalProperties: false,
              required: ["trackId", "workKind", "expectedDelta", "metricId", "evidenceTier", "parentTaskId", "repairGeneration", "costClass"],
              properties: {
                trackId: { type: "string", enum: ["coverage", "supply", "decision"] },
                workKind: { type: "string", enum: ["frontier", "experiment", "maintenance", "audit"] },
                expectedDelta: { type: "string" },
                metricId: { type: "string" },
                evidenceTier: { type: "string", enum: ["exploration", "decision", "promotion"] },
                parentTaskId: { type: "string" },
                repairGeneration: { type: "integer", minimum: 0 },
                costClass: { type: "string", enum: ["small", "medium", "large"] },
              },
            },
            contract: {
              type: "object",
              additionalProperties: false,
              required: ["status", "baseRef"],
              properties: {
                status: { type: "string", enum: ["READY", "AFTER_DEPENDENCY", "NOT_LAUNCHABLE"] },
                baseRef: { type: "string" },
              },
            },
          },
        },
      },
      risks: { type: "array", items: { type: "string" } },
      operatorGuidance: { type: "string" },
      decision: { type: "string", enum: ["READY_FOR_GATE", "REVISION_REQUIRED", "BLOCKED"] },
    },
  };
}

function waveTriageSchema(): Record<string, unknown> {
  return {
    type: "object",
    additionalProperties: false,
    required: ["waveId", "evidenceDigest", "campaignAssessment", "canClose", "laneRecommendations", "blockers", "researchQuestions", "nextStep"],
    properties: {
      waveId: { type: "string" },
      evidenceDigest: { type: "string" },
      campaignAssessment: { type: "string" },
      canClose: { type: "boolean" },
      laneRecommendations: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          required: ["laneId", "disposition", "reason", "recommendedActions"],
          properties: {
            laneId: { type: "string" },
            disposition: { type: "string", enum: ["NONE", "REPAIR", "SUPERSEDE", "ABANDON", "CARRY_FORWARD"] },
            reason: { type: "string" },
            recommendedActions: { type: "array", items: { type: "string" } },
          },
        },
      },
      blockers: { type: "array", items: { type: "string" } },
      researchQuestions: { type: "array", items: { type: "string" } },
      nextStep: { type: "string" },
    },
  };
}

function campaignRedirectSchema(): Record<string, unknown> {
  return {
    type: "object",
    additionalProperties: false,
    required: ["summary", "tunnelVisionAssessment", "perspectiveShift", "assumptionsToRevisit", "keep", "stopOrDeprioritize", "newDirections", "strategyProposal", "nextWaveObjective", "decision"],
    properties: {
      summary: { type: "string" },
      tunnelVisionAssessment: { type: "string" },
      perspectiveShift: { type: "string" },
      assumptionsToRevisit: { type: "array", items: { type: "string" } },
      keep: { type: "array", items: { type: "string" } },
      stopOrDeprioritize: { type: "array", items: { type: "string" } },
      newDirections: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          required: ["question", "rationale", "profile"],
          properties: {
            question: { type: "string" },
            rationale: { type: "string" },
            profile: { type: "string", enum: ["sonnet-worker", "opus-lead-sonnet", "research-opus-max"] },
          },
        },
      },
      strategyProposal: {
        type: "object",
        additionalProperties: false,
        required: ["epochObjective", "trackWeights", "metrics", "park", "retire", "rationale"],
        properties: {
          epochObjective: { type: "string" },
          trackWeights: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              required: ["trackId", "share", "reason"],
              properties: {
                trackId: { type: "string", enum: ["coverage", "supply", "decision"] },
                share: { type: "number", minimum: 0, maximum: 1 },
                reason: { type: "string" },
              },
            },
          },
          metrics: { type: "array", items: { type: "string" } },
          park: { type: "array", items: { type: "string" } },
          retire: { type: "array", items: { type: "string" } },
          rationale: { type: "string" },
        },
      },
      nextWaveObjective: { type: "string" },
      decision: { type: "string", enum: ["READY_FOR_GATE", "NEEDS_MORE_INPUT", "NO_CHANGE"] },
    },
  };
}

function strategyReviewSchema(): Record<string, unknown> {
  return {
    type: "object",
    additionalProperties: false,
    required: ["summary", "assessment", "proposal", "portfolioActions", "recommendation", "operatorDecision"],
    properties: {
      summary: { type: "string" },
      assessment: {
        type: "object",
        additionalProperties: false,
        required: ["epochStatus", "durableProgress", "wheelSpinningEvidence", "resourceAssessment", "tunnelVisionRisks"],
        properties: {
          epochStatus: { type: "string", enum: ["ADVANCING", "DRIFTING", "STALLED", "COMPLETE", "BLOCKED"] },
          durableProgress: { type: "array", items: { type: "string" } },
          wheelSpinningEvidence: { type: "array", items: { type: "string" } },
          resourceAssessment: { type: "string" },
          tunnelVisionRisks: { type: "array", items: { type: "string" } },
        },
      },
      proposal: {
        type: "object",
        additionalProperties: false,
        required: ["thesis", "epochLabel", "epochObjective", "targetWaves", "trackWeights", "metrics", "resourcePolicy", "maintenanceShareLimit", "automaticRepairLimit", "redirectionTriggers", "custodyCandidates", "rationale"],
        properties: {
          thesis: { type: "string" },
          epochLabel: { type: "string" },
          epochObjective: { type: "string" },
          targetWaves: { type: "integer", minimum: 1, maximum: 20 },
          trackWeights: {
            type: "array",
            minItems: 3,
            maxItems: 3,
            items: {
              type: "object",
              additionalProperties: false,
              required: ["trackId", "share", "reason"],
              properties: {
                trackId: { type: "string", enum: ["coverage", "supply", "decision"] },
                share: { type: "number", minimum: 0, maximum: 1 },
                reason: { type: "string" },
              },
            },
          },
          metrics: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              required: ["id", "label", "trackId", "target", "unit"],
              properties: {
                id: { type: "string" },
                label: { type: "string" },
                trackId: { type: "string", enum: ["coverage", "supply", "decision"] },
                target: { type: "string" },
                unit: { type: "string" },
              },
            },
          },
          resourcePolicy: {
            type: "object",
            additionalProperties: false,
            required: ["epochTokenBudget", "waveTokenBudget", "reserveShare", "tokenCaps", "slots", "maxUnreportedRuns", "rationale"],
            properties: {
              epochTokenBudget: { type: "integer", minimum: 100000 },
              waveTokenBudget: { type: "integer", minimum: 20000 },
              reserveShare: { type: "number", minimum: 0, maximum: 0.5 },
              tokenCaps: {
                type: "object",
                additionalProperties: false,
                required: ["routineLane", "coordinatedLane", "synthesis", "strategyReview"],
                properties: {
                  routineLane: { type: "integer", minimum: 10000 }, coordinatedLane: { type: "integer", minimum: 20000 },
                  synthesis: { type: "integer", minimum: 20000 }, strategyReview: { type: "integer", minimum: 20000 },
                },
              },
              slots: {
                type: "object",
                additionalProperties: false,
                required: ["strategy", "research", "custody"],
                properties: {
                  strategy: { type: "integer", minimum: 0, maximum: 4 }, research: { type: "integer", minimum: 0, maximum: 16 }, custody: { type: "integer", minimum: 0, maximum: 8 },
                },
              },
              maxUnreportedRuns: { type: "integer", minimum: 0 },
              rationale: { type: "string" },
            },
          },
          maintenanceShareLimit: { type: "number", minimum: 0, maximum: 0.5 },
          automaticRepairLimit: { type: "integer", minimum: 0, maximum: 3 },
          redirectionTriggers: { type: "array", items: { type: "string" } },
          custodyCandidates: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              required: ["task", "reason", "urgency", "blocksResearch", "strategicTrack", "capability", "repairGeneration", "effortClass", "acceptanceCriteria", "allowedPaths", "receiptType", "stopCondition"],
              properties: {
                task: { type: "string" },
                reason: { type: "string" },
                urgency: { type: "string", enum: ["NOW", "SOON", "PARK"] },
                blocksResearch: { type: "boolean" },
                strategicTrack: { type: "string", enum: ["coverage", "supply", "decision"] },
                capability: { type: "string", enum: ["repair", "verification", "archive", "provenance", "portability"] },
                repairGeneration: { type: "integer", minimum: 0 },
                effortClass: { type: "string", enum: ["small", "medium"] },
                acceptanceCriteria: { type: "array", items: { type: "string" } },
                allowedPaths: { type: "array", items: { type: "string" } },
                receiptType: { type: "string" },
                stopCondition: { type: "string" },
              },
            },
          },
          rationale: { type: "string" },
        },
      },
      portfolioActions: {
        type: "object",
        additionalProperties: false,
        required: ["stop", "continue", "start"],
        properties: {
          stop: { type: "array", items: { type: "string" } },
          continue: { type: "array", items: { type: "string" } },
          start: { type: "array", items: { type: "string" } },
        },
      },
      recommendation: { type: "string", enum: ["ACTIVATE_NEW_EPOCH", "CONTINUE_CURRENT", "NEEDS_HUMAN_INPUT"] },
      operatorDecision: { type: "string" },
    },
  };
}

function researchDispatchSpecFromPlan(request: ResearchRequestRow, planResponse: Record<string, any>): ResearchLaunchSpec | null {
  const lane = (Array.isArray(planResponse.lanes) ? planResponse.lanes : [])
    .find((candidate: any) => candidate?.requestId === request.request_id && ["KEEP", "REVISE"].includes(String(candidate?.action || "")));
  if (!lane || typeof lane.taskId !== "string" || !lane.taskId.trim()) return null;
  const contractStatus = typeof lane.contract?.status === "string" ? lane.contract.status : "";
  if (contractStatus !== "READY") return null;
  const explicitBaseRef = typeof lane.contract?.baseRef === "string" ? lane.contract.baseRef.trim() : "";
  const baseRef = /^[0-9a-f]{40}$/i.test(explicitBaseRef) ? explicitBaseRef : "";
  if (!baseRef) return null;
  const laneProfile: ResearchDispatchProfile = isResearchDispatchProfile(lane.profile) ? lane.profile : "sonnet-worker";
  const profile = RESEARCH_DISPATCH_PROFILES[laneProfile];
  const taskId = lane.taskId.trim();
  const dependsOnTaskIds = Array.isArray(lane.dependsOnTaskIds)
    ? lane.dependsOnTaskIds.filter((value: unknown): value is string => typeof value === "string" && Boolean(value.trim())).map((value: string) => value.trim())
    : [];
  const releaseText = `${lane.question || ""} ${lane.stopCondition || ""}`;
  return {
    taskId,
    priority: Number.isFinite(lane.priority) ? Number(lane.priority) : 100,
    dependsOnTaskId: dependsOnTaskIds[0],
    dependsOnTaskIds,
    dependsOnEvidenceStatuses: ["complete"],
    requiresOperatorRelease: /explicit operator release|operator-release token|distinct operator release/i.test(releaseText),
    profile: profile.id,
    host: "windows",
    model: profile.model,
    effort: profile.effort,
    fanout: profile.fanout,
    packetPath: `packets/launch/${taskId}.md`,
    baseRef,
    evidencePath: `artifacts/${taskId}/evidence-receipt.json`,
    timeoutMinutes: profile.id === "research-opus-max" ? 120 : 90,
    tokenBudget: profile.id === "research-opus-max" ? 120_000 : 80_000,
    tools: ["repository-read", "local-execution"],
    outputContract: "cfg23-research-evidence/v1",
  };
}

function researchDependencySatisfied(spec: ResearchLaunchSpec, runs: ResearchRunRow[]): boolean {
  if (spec.requiresOperatorRelease) return false;
  const dependencies = spec.dependsOnTaskIds?.length ? spec.dependsOnTaskIds : spec.dependsOnTaskId ? [spec.dependsOnTaskId] : [];
  if (!dependencies.length) return true;
  const acceptedStatuses = spec.dependsOnEvidenceStatuses ?? ["complete"];
  return dependencies.every((taskId) => runs.some((run) => run.task_id === taskId
      && run.status === "returned_to_sol"
      && acceptedStatuses.includes(parseJson<Record<string, any>>(run.evidence_json, {}).status)));
}

async function launchLocalResearch(projectRoot: string, spec: ResearchLaunchSpec): Promise<ResearchLaunchResult> {
  const launcher = join(projectRoot, "tools", "local_agent_coord.ps1");
  const child = Bun.spawn([
    "powershell.exe",
    "-NoProfile",
    "-ExecutionPolicy",
    "Bypass",
    "-File",
    launcher,
    "launch",
    "-TaskId",
    spec.taskId,
    "-Profile",
    spec.profile,
    "-Packet",
    spec.packetPath,
    "-Base",
    spec.baseRef,
  ], {
    cwd: projectRoot,
    stdout: "pipe",
    stderr: "pipe",
  });
  const [output, error, exitCode] = await Promise.all([
    new Response(child.stdout).text(),
    new Response(child.stderr).text(),
    child.exited,
  ]);
  const combined = [output.trim(), error.trim()].filter(Boolean).join("\n");
  if (exitCode !== 0) throw new Error(`Research launcher exited ${exitCode}: ${combined.slice(0, 3000)}`);
  const laneId = combined.match(/\blane=([A-Z0-9-]+)/)?.[1] ?? "";
  const jobId = combined.match(/\bjob=([0-9a-f]{8})\b/i)?.[1] ?? "";
  const worktree = combined.match(/\bworktree=(.+)$/m)?.[1]?.trim() ?? "";
  if (!laneId || !jobId || !worktree) throw new Error(`Research launcher returned an incomplete receipt: ${combined.slice(0, 3000)}`);
  return { laneId, jobId, worktree, output: combined.slice(0, 4000) };
}

function gitStatusPath(line: string): string {
  const value = line.slice(3).trim();
  const destination = value.includes(" -> ") ? value.split(" -> ").at(-1)! : value;
  return destination.replace(/^"|"$/g, "").replace(/\\/g, "/");
}

export async function requireCleanContractWorkspace(projectRoot: string): Promise<boolean> {
  const repository = await runGit(projectRoot, ["rev-parse", "--show-toplevel"]);
  if (repository.exitCode !== 0 || resolve(repository.stdout) !== resolve(projectRoot)) return false;
  const status = await runGit(projectRoot, ["status", "--porcelain=v1", "--untracked-files=all"]);
  if (status.exitCode !== 0) throw new Error(`Could not inspect the campaign worktree before compiling launch contracts: ${status.stderr || status.stdout}`);
  if (status.stdout) {
    throw new Error("The campaign worktree has uncommitted changes before launch-contract compilation. Preserve or commit them, then retry the plan gate; no contract files were written.");
  }
  return true;
}

export async function freezeResearchLaunchPackets(projectRoot: string, packetPaths: string[], gitRepository: boolean): Promise<string> {
  if (!gitRepository || !packetPaths.length) return "";
  const normalized = packetPaths.map((value) => value.replace(/\\/g, "/"));
  const allowed = new Set(normalized);
  const status = await runGit(projectRoot, ["status", "--porcelain=v1", "--untracked-files=all"]);
  if (status.exitCode !== 0) throw new Error(`Could not inspect compiled launch contracts: ${status.stderr || status.stdout}`);
  const changed = status.stdout ? status.stdout.split(/\r?\n/).filter(Boolean) : [];
  const unexpected = changed.filter((line) => !allowed.has(gitStatusPath(line)));
  if (unexpected.length) {
    throw new Error(`Launch-contract compilation touched unexpected paths: ${unexpected.map(gitStatusPath).join(", ")}. Nothing was staged.`);
  }
  if (changed.length) {
    const add = await runGit(projectRoot, ["add", "--", ...normalized]);
    if (add.exitCode !== 0) throw new Error(`Could not stage the checked launch contracts: ${add.stderr || add.stdout}`);
    const commit = await runGit(projectRoot, ["commit", "-m", "Freeze checked research launch contracts", "--", ...normalized]);
    if (commit.exitCode !== 0) throw new Error(`Could not freeze the checked launch contracts in Git: ${commit.stderr || commit.stdout}`);
  }
  const head = await runGit(projectRoot, ["rev-parse", "HEAD"]);
  if (head.exitCode !== 0 || !/^[0-9a-f]{40}$/i.test(head.stdout)) throw new Error(`Could not resolve the frozen launch-contract commit: ${head.stderr || head.stdout}`);
  return head.stdout;
}

export class CampaignControl {
  private readonly database: Database;
  private readonly campaignState: CampaignStateService;
  private readonly waveRepository: WaveRepository;
  private readonly waveCommands: WaveCommandService;
  private readonly waveScheduleRepository: WaveScheduleRepository;
  private readonly observationSync: ObservationSyncService;
  private readonly coordinationInterface: CampaignCoordinationInterfaceService;
  private readonly laneOwnership: LaneOwnershipService;
  private readonly laneReconciliation: LaneReconciliationService;
  private readonly contextRegistry: ContextRegistryService;
  private readonly campaignRecovery: CampaignRecoveryService;
  private readonly observerAutomationPolicy: ObserverAutomationPolicyService;
  private readonly operatorTransitions: OperatorTransitionService;
  private readonly domainReader: CampaignDomainReader;
  private readonly resourceCommands: ResourceCommandService;
  private readonly strategyCommands: StrategyCommandService;
  private readonly custodyCommands: CustodyCommandService;
  private readonly codexApprovals: CodexApprovalService;
  private readonly coordinatorSessions: CoordinatorSessionService;
  private readonly waveSemantics: WaveSemanticService;
  private readonly researchPlanning: ResearchPlanningService;
  private readonly researchExecution: ResearchExecutionService;
  private readonly actionRouter: CampaignActionRouter;
  private readonly actionQueue: ActionQueueService;
  private readonly multiProjectQuotas: MultiProjectQuotaService;
  private readonly startup: CampaignStartupService;
  private readonly autopilot: AutopilotService;
  private readonly codexNotifications: CodexNotificationService;
  private readonly projectReader: CampaignProjectReader;
  private readonly projects = new Map<string, ProjectDefinition>();
  private readonly bundleRoot: string;
  private latestObserver: ObserverSnapshot | null = null;
  private changeListener: (() => void) | null = null;
  private liveChangeListener: ((activity: Record<string, unknown>) => void) | null = null;

  private constructor(
    private readonly dataDir: string,
    private readonly manifestPath: string,
    private readonly codex: CodexAppServerClient,
    private readonly researchLauncher: ResearchLauncher,
  ) {
    this.bundleRoot = join(dataDir, "synthesis-bundles");
    this.database = new Database(join(dataDir, "observer.sqlite"), { create: true });
    this.database.run("PRAGMA journal_mode = WAL");
    new CampaignSchemaMigrationService(this.database, now).migrate();
    this.campaignState = new CampaignStateService(this.database, {
      activeExecutionCount: (projectId) => {
        const actions = this.database.query(`
          SELECT COUNT(*) AS count FROM campaign_actions
          WHERE project_id = $project AND status IN ('queued', 'running')
            AND action_type NOT IN ('campaign.recovery.prepare', 'campaign.recovery.apply')
        `).get({ $project: projectId }) as { count: number } | null;
        const research = this.database.query("SELECT COUNT(*) AS count FROM campaign_research_runs WHERE project_id = $project AND status IN ('launching', 'running', 'blocked', 'awaiting_evidence', 'evidence_ready')").get({ $project: projectId }) as { count: number } | null;
        const custody = this.database.query("SELECT COUNT(*) AS count FROM campaign_custody_leases WHERE project_id = $project AND status IN ('confirmed', 'dispatching', 'running', 'awaiting_review')").get({ $project: projectId }) as { count: number } | null;
        return Number(actions?.count || 0) + Number(research?.count || 0) + Number(custody?.count || 0);
      },
      now,
    });
    this.waveRepository = new WaveRepository(this.database);
    this.waveCommands = new WaveCommandService(this.waveRepository);
    this.waveScheduleRepository = new WaveScheduleRepository(this.database);
    this.coordinationInterface = new CampaignCoordinationInterfaceService(this.database, this.waveRepository, {
      controlState: (projectId, wavePhase) => this.campaignState.snapshot(projectId, wavePhase),
    });
    this.laneOwnership = new LaneOwnershipService(this.coordinationInterface);
    this.laneReconciliation = new LaneReconciliationService({
      observer: () => this.latestObserver,
      definition: (projectId) => this.projects.get(projectId) ?? null,
      ownership: (projectId, lane) => this.laneOwnership.lane(projectId, lane),
    });
    this.contextRegistry = new ContextRegistryService(this.database, {
      projectRoot: (projectId) => this.projectRoot(projectId),
    }, now);
    this.campaignRecovery = new CampaignRecoveryService(this.database, this.waveRepository, {
      project: (projectId) => this.getProject(projectId),
      controlState: (projectId, wavePhase) => this.campaignState.snapshot(projectId, wavePhase),
      observer: () => this.latestObserver,
      transitionWorkflow: (projectId, phase, actor) => this.updateProject(projectId, { phase: phase as CampaignPhase }, { authority: "human-confirmed", cause: "campaign-recovery", actor }),
      touchProject: (projectId) => this.updateProject(projectId, {}, { authority: "human-confirmed", cause: "campaign-recovery" }),
      recordEvent: (projectId, aggregateType, aggregateId, eventType, payload) => this.recordEvent(projectId, aggregateType, aggregateId, eventType, payload),
      digest: (value) => digest(value),
      now,
    });
    this.observationSync = new ObservationSyncService(this.database, this.waveRepository, this.waveCommands, this.waveScheduleRepository, {
      project: (projectId) => this.getProject(projectId),
      observeActivity: (projectId, activity) => this.campaignState.observeActivity(projectId, activity),
      transitionProject: (projectId, phase, cause) => this.updateProject(projectId, { phase: phase as CampaignPhase }, { authority: "observer", cause }),
      recordEvent: (projectId, aggregateType, aggregateId, eventType, payload) => this.recordEvent(projectId, aggregateType, aggregateId, eventType, payload),
      now,
    });
    this.coordinatorSessions = new CoordinatorSessionService(this.database, this.codex, {
      definition: (projectId) => this.projects.get(projectId) ?? null,
      projectRoot: (projectId) => this.projectRoot(projectId),
      workspaceRoot: () => dirname(dirname(this.manifestPath)),
      touchProject: (projectId) => this.updateProject(projectId, {}),
      recordEvent: (projectId, aggregateType, aggregateId, eventType, payload) => this.recordEvent(projectId, aggregateType, aggregateId, eventType, payload),
      sanitizeConversation: (projectId, coordinator, thread) => sanitizeCoordinatorConversation(projectId, coordinator, thread),
      now,
    });
    this.waveSemantics = new WaveSemanticService(this.database, this.codex, this.bundleRoot, this.waveRepository, this.waveCommands, this.coordinatorSessions, {
      project: (projectId) => this.getProject(projectId),
      coordinationInterface: (projectId) => this.coordinationInterface.snapshot(projectId),
      projectRoot: (projectId) => this.projectRoot(projectId),
      workspaceRoot: () => dirname(dirname(this.manifestPath)),
      observer: () => this.latestObserver,
      adoptWave: (projectId, lanes) => this.adoptWaveFromLanes(projectId, lanes),
      syncWave: (projectId, lanes) => { this.observationSync.syncWaveMembers(projectId, lanes); },
      activeLoop: (projectId) => this.autopilot.activeLoop(projectId),
      strategyBundleContext: (projectId) => this.strategyBundleContext(projectId),
      synthesisSchema: () => synthesisSchema(),
      triageSchema: () => waveTriageSchema(),
      redirectSchema: () => campaignRedirectSchema(),
      touchProject: (projectId, phase) => this.updateProject(projectId, phase ? { phase: phase as CampaignPhase } : {}, { authority: "domain-command", cause: "wave-semantics" }),
      recordEvent: (projectId, aggregateType, aggregateId, eventType, payload) => this.recordEvent(projectId, aggregateType, aggregateId, eventType, payload),
      digest: (value) => digest(value),
      now,
    });
    this.researchPlanning = new ResearchPlanningService(this.database, this.codex, this.bundleRoot, this.coordinatorSessions, {
      project: (projectId) => this.getProject(projectId),
      coordinationInterface: (projectId) => this.coordinationInterface.snapshot(projectId),
      latestWave: (projectId) => this.latestWave(projectId),
      projectRoot: (projectId) => this.projectRoot(projectId),
      workspaceRoot: () => dirname(dirname(this.manifestPath)),
      strategyBundleContext: (projectId) => this.strategyBundleContext(projectId),
      redirectContext: (projectId) => this.waveSemantics.redirectContext(projectId),
      staffingProfiles: () => Object.values(RESEARCH_DISPATCH_PROFILES),
      resolveResearchSpec: (request, planResponse) => researchDispatchSpecFromPlan(request as ResearchRequestRow, planResponse),
      requireCleanContractWorkspace,
      freezeLaunchPackets: freezeResearchLaunchPackets,
      planSchema: () => researchPlanSchema(),
      touchProject: (projectId, phase) => this.updateProject(projectId, { phase: phase as CampaignPhase }, { authority: "domain-command", cause: "research-planning" }),
      recordEvent: (projectId, aggregateType, aggregateId, eventType, payload) => this.recordEvent(projectId, aggregateType, aggregateId, eventType, payload),
      digest: (value) => digest(value),
      now,
    });
    this.domainReader = new CampaignDomainReader({
      definition: (projectId) => this.projects.get(projectId)!,
      observer: () => this.latestObserver,
      queryAll: <T>(sql: string, params: Record<string, unknown>) => this.database.query(sql).all(params as any) as T[],
      queryOne: <T>(sql: string, params: Record<string, unknown>) => this.database.query(sql).get(params as any) as T | null,
      project: (projectId) => this.getProject(projectId),
      resolveResearchSpec: (request, planResponse) => researchDispatchSpecFromPlan(request as ResearchRequestRow, planResponse),
      researchDependencySatisfied: (spec, runs) => researchDependencySatisfied(spec, runs as ResearchRunRow[]),
      inferStrategy: (taskId, question) => inferStrategyClassification(taskId, question),
    });
    this.resourceCommands = new ResourceCommandService(this.database, this.domainReader, {
      project: (projectId) => this.getProject(projectId),
      touchProject: (projectId) => this.updateProject(projectId, {}),
      recordEvent: (projectId, aggregateType, aggregateId, eventType, payload) => this.recordEvent(projectId, aggregateType, aggregateId, eventType, payload),
      digest: (value) => digest(value),
      now,
    });
    this.strategyCommands = new StrategyCommandService(this.database, this.domainReader, this.codex, this.bundleRoot, {
      definition: (projectId) => this.projects.get(projectId)!,
      project: (projectId) => this.getProject(projectId),
      projectRoot: (projectId) => this.projectRoot(projectId),
      touchProject: (projectId) => this.updateProject(projectId, {}),
      recordEvent: (projectId, aggregateType, aggregateId, eventType, payload) => this.recordEvent(projectId, aggregateType, aggregateId, eventType, payload),
      digest: (value) => digest(value),
      reviewSchema: () => strategyReviewSchema(),
      now,
    });
    this.custodyCommands = new CustodyCommandService(this.database, this.domainReader, this.codex, this.bundleRoot, {
      project: (projectId) => this.getProject(projectId),
      projectRoot: (projectId) => this.projectRoot(projectId),
      touchProject: (projectId) => this.updateProject(projectId, {}),
      recordEvent: (projectId, aggregateType, aggregateId, eventType, payload) => this.recordEvent(projectId, aggregateType, aggregateId, eventType, payload),
      notifyChanged: () => this.changeListener?.(),
      now,
    });
    this.codexApprovals = new CodexApprovalService(this.database, this.codex, {
      handleCustody: (request) => this.custodyCommands.handleServerRequest(request),
      recordEvent: (projectId, aggregateType, aggregateId, eventType, payload) => this.recordEvent(projectId, aggregateType, aggregateId, eventType, payload),
      notifyChanged: () => this.changeListener?.(),
      now,
    });
    this.researchExecution = new ResearchExecutionService(this.database, this.waveScheduleRepository, this.codex, this.bundleRoot, this.researchLauncher, {
      project: (projectId) => this.getProject(projectId),
      coordinationInterface: (projectId) => this.coordinationInterface.snapshot(projectId),
      latestWave: (projectId) => this.latestWave(projectId),
      projectRoot: (projectId) => this.projectRoot(projectId),
      coordinatorFallbackCwd: () => dirname(dirname(this.manifestPath)),
      resourceSnapshot: (projectId) => this.resourceSnapshot(projectId),
      startReadiness: (projectId) => this.autopilotStartReadiness(projectId),
      coordinator: (projectId) => this.coordinator(projectId),
      writableCoordinator: (projectId) => this.writableCoordinator(projectId),
      strategyBundleContext: (projectId) => this.strategyBundleContext(projectId),
      redirectContext: (projectId) => this.waveSemantics.redirectContext(projectId),
      resolveResearchSpec: (request, planResponse) => researchDispatchSpecFromPlan(request as ResearchRequestRow, planResponse),
      researchDependencySatisfied: (spec, runs) => researchDependencySatisfied(spec, runs as ResearchRunRow[]),
      inferStrategy: (taskId, question) => inferStrategyClassification(taskId, question),
      validateTerminalReceipt: (receipt, taskId) => assertTerminalResearchReceipt(receipt, taskId),
      synthesisSchema: () => synthesisSchema(),
      touchProject: (projectId, phase) => this.updateProject(projectId, phase ? { phase: phase as CampaignPhase } : {}, { authority: "domain-command", cause: "research-execution" }),
      recordEvent: (projectId, aggregateType, aggregateId, eventType, payload) => this.recordEvent(projectId, aggregateType, aggregateId, eventType, payload),
      notifyChanged: () => this.changeListener?.(),
      digest: (value) => digest(value),
      now,
    });
    this.actionRouter = new CampaignActionRouter(this.actionHandlers());
    this.multiProjectQuotas = new MultiProjectQuotaService(this.database, quotaPolicyFromEnvironment());
    this.actionQueue = new ActionQueueService(this.database, {
      validateType: (type) => this.actionRouter.validate(type),
      projectVersion: (projectId) => this.getProject(projectId).version,
      admit: (action) => { this.multiProjectQuotas.admit(action); },
      execute: (action, args) => this.actionRouter.execute(action, args),
      recordEvent: (projectId, aggregateType, aggregateId, eventType, payload) => this.recordEvent(projectId, aggregateType, aggregateId, eventType, payload),
      notifyChanged: () => this.changeListener?.(),
      afterSettled: (projectId) => { void this.autopilot.advance(projectId); },
      now,
    });
    this.startup = new CampaignStartupService(this.database, this.manifestPath, {
      registerProject: (project) => { this.projects.set(project.id, project); },
      ensureStrategyFoundation: (projectId) => this.strategyCommands.ensureFoundation(projectId),
      recoverInterruptedActions: () => this.actionQueue.recoverInterrupted(),
      recoverCustodyExecutions: () => this.custodyCommands.recoverExecutions(),
      resumeActions: () => this.actionQueue.resume(),
    }, now);
    this.observerAutomationPolicy = new ObserverAutomationPolicyService(this.database, this.waveRepository, this.coordinationInterface, this.laneOwnership, {
      project: (projectId) => this.getProject(projectId),
      controlState: (projectId, wavePhase) => this.campaignState.snapshot(projectId, wavePhase),
      coordinatorAvailable: (projectId) => Boolean(this.coordinator(projectId)),
      enqueueAction: (input, actor) => this.enqueueAction(input as EnqueueActionInput, actor),
      digest: (value) => digest(value),
    });
    this.operatorTransitions = new OperatorTransitionService(this.database, this.waveRepository, {
      project: (projectId) => this.getProject(projectId),
      projectRoot: (projectId) => this.projectRoot(projectId),
      actionReceipt: (actionId) => this.actionQueue.byId(actionId),
      activeLoop: (projectId) => this.autopilot.activeLoop(projectId),
      requireCleanWorkspace: (projectRoot) => requireCleanContractWorkspace(projectRoot),
      touchProject: (projectId, phase) => this.updateProject(projectId, { phase: phase as CampaignPhase }, { authority: "human-confirmed", cause: "operator-authority-transition" }),
      recordEvent: (projectId, aggregateType, aggregateId, eventType, payload) => this.recordEvent(projectId, aggregateType, aggregateId, eventType, payload),
      digest: (value) => digest(value),
      now,
    });
    this.autopilot = new AutopilotService(this.database, this.waveRepository, this.waveScheduleRepository, {
      project: (projectId) => this.getProject(projectId),
      observer: () => this.latestObserver,
      nextDispatchTarget: (projectId) => this.researchExecution.nextDispatchTarget(projectId),
      startReadiness: (projectId) => this.autopilotStartReadiness(projectId),
      enqueueAction: (input, actor) => this.enqueueAction(input as EnqueueActionInput, actor),
      touchProject: (projectId) => this.updateProject(projectId, {}),
      recordEvent: (projectId, aggregateType, aggregateId, eventType, payload) => this.recordEvent(projectId, aggregateType, aggregateId, eventType, payload),
      now,
    });
    this.codexNotifications = new CodexNotificationService(this.database, {
      handleCustody: (notification) => this.custodyCommands.handleNotification(notification),
      touchProject: (projectId, phase) => this.updateProject(projectId, phase ? { phase: phase as CampaignPhase } : {}, { authority: "coordinator-result", cause: "codex-turn-settlement" }),
      recordEvent: (projectId, aggregateType, aggregateId, eventType, payload) => this.recordEvent(projectId, aggregateType, aggregateId, eventType, payload),
      recordStrategyWaveSnapshot: (projectId, waveId) => this.recordStrategyWaveSnapshot(projectId, waveId),
      notifyChanged: () => this.changeListener?.(),
      notifyLive: (activity) => this.liveChangeListener?.(activity),
      advanceAutopilot: (projectId) => { void this.autopilot.advance(projectId); },
      startQueuedRedirect: (projectId) => { void this.waveSemantics.startQueuedRedirect(projectId); },
      now,
    });
    this.projectReader = new CampaignProjectReader({
      definitions: () => [...this.projects.values()],
      observer: () => this.latestObserver,
      queryAll: <T>(sql: string, params: Record<string, unknown>) => this.database.query(sql).all(params as any) as T[],
      queryOne: <T>(sql: string, params: Record<string, unknown>) => this.database.query(sql).get(params as any) as T | null,
      project: (projectId) => this.getProject(projectId),
      campaignState: (projectId, wavePhase) => this.campaignState.snapshot(projectId, wavePhase),
      coordinationInterface: (projectId, lanes) => this.coordinationInterface.snapshot(projectId, lanes),
      laneOwnership: (projectId, lanes) => this.laneOwnership.classify(projectId, lanes),
      recoveryReport: (projectId) => this.campaignRecovery.latest(projectId),
      coordinator: (projectId) => this.coordinator(projectId),
      latestWave: (projectId) => this.latestWave(projectId),
      waveLanes: (waveId) => this.waveLanes(waveId),
      latestLoop: (projectId) => this.autopilot.latestLoop(projectId),
      activeLoop: (projectId) => this.autopilot.activeLoop(projectId),
      loopSnapshot: (row) => this.autopilot.snapshot(row),
      loopStartReadiness: (projectId) => this.autopilotStartReadiness(projectId),
      researchSchedule: (projectId, waveId) => this.researchExecution.scheduleSnapshot(this.waveScheduleRepository.latest(projectId, waveId)),
      actionSnapshot: (row) => this.actionQueue.snapshot(row as ActionQueueRow),
      liveTurn: (projectId) => this.codexNotifications.liveTurn(projectId),
      dispatchProfiles: () => Object.values(RESEARCH_DISPATCH_PROFILES),
      selectedDispatchProfile: (value) => isResearchDispatchProfile(value) ? value : "sonnet-worker",
      resolveResearchSpec: (request, planResponse) => researchDispatchSpecFromPlan(request, planResponse),
      researchDependencySatisfied: (spec, runs) => researchDependencySatisfied(spec, runs),
      inferStrategy: (taskId, question) => inferStrategyClassification(taskId, question),
      contextDigest: (contexts) => digest(contexts),
    }, this.domainReader);
    this.codex.onNotification((notification) => this.codexNotifications.handle(notification));
    this.codex.onServerRequest((request) => this.codexApprovals.capture(request));
    this.codex.onError((error) => {
      this.recordEvent("system", "codex", "app-server", "codex.connection.error", { message: error.message });
      this.changeListener?.();
    });
  }

  static async create(
    dataDir: string,
    manifestPath: string,
    codex = new CodexAppServerClient(),
    researchLauncher: ResearchLauncher = launchLocalResearch,
  ): Promise<CampaignControl> {
    await mkdir(dataDir, { recursive: true });
    const control = new CampaignControl(dataDir, manifestPath, codex, researchLauncher);
    await control.startup.initialize();
    return control;
  }

  onChange(listener: () => void): void {
    this.changeListener = listener;
  }

  onLiveChange(listener: (activity: Record<string, unknown>) => void): void {
    this.liveChangeListener = listener;
  }

  private strategySnapshot(projectId: string): Record<string, any> {
    return this.domainReader.strategySnapshot(projectId);
  }

  private ensureStrategyBaseline(projectId: string): void {
    this.strategyCommands.ensureBaseline(projectId);
  }
  private strategyBundleContext(projectId: string): Record<string, any> {
    return this.strategyCommands.bundleContext(projectId);
  }
  private recordStrategyWaveSnapshot(projectId: string, waveId: string): void {
    this.strategyCommands.recordWaveSnapshot(projectId, waveId);
  }
  private custodySnapshot(projectId: string): Record<string, any> {
    return this.domainReader.custodySnapshot(projectId);
  }

  private resourceSnapshot(projectId: string): Record<string, any> {
    return this.domainReader.resourceSnapshot(projectId);
  }

  private autopilotStartReadiness(projectId: string): AutopilotStartReadiness {
    const project = this.getProject(projectId);
    const wave = this.latestWave(projectId);
    const plan = wave ? this.database.query("SELECT status, response_json FROM campaign_research_plans WHERE wave_id = $wave")
      .get({ $wave: wave.wave_id }) as { status: string; response_json: string } | null : null;
    const response = parseJson<Record<string, any>>(plan?.response_json || "{}", {});
    const requests = wave ? this.database.query("SELECT * FROM campaign_research_requests WHERE project_id = $project AND wave_id = $wave")
      .all({ $project: projectId, $wave: wave.wave_id }) as ResearchRequestRow[] : [];
    const runs = this.database.query("SELECT * FROM campaign_research_runs WHERE project_id = $project ORDER BY created_at")
      .all({ $project: projectId }) as ResearchRunRow[];
    const candidates = requests
      .filter((request) => project.current_phase !== "RESEARCH_READY" || request.status === "approved_for_dispatch")
      .flatMap((request) => {
        const spec = researchDispatchSpecFromPlan(request, response);
        return spec ? [{
          taskId: spec.taskId,
          tokenBudget: spec.tokenBudget,
          dependencyReady: researchDependencySatisfied(spec, runs),
          requiresOperatorRelease: Boolean(spec.requiresOperatorRelease),
        }] : [];
      });
    const resources = this.resourceSnapshot(projectId);
    const schedule = wave ? this.waveScheduleRepository.latest(projectId, wave.wave_id) : null;
    return evaluateAutopilotStartReadiness({
      phase: project.current_phase,
      planStatus: plan?.status || "",
      planDecision: String(response.decision || ""),
      candidates,
      spendableEpochTokens: Number(resources.ledger?.remainingBeforeCommitments || 0),
      waveTokenBudget: Number(resources.policy?.waveTokenBudget || 0),
      availableResearchSlots: Number(resources.slots?.available?.research || 0),
      scheduleStatus: schedule?.status || "",
    });
  }

  private simulateResourceSchedule(projectId: string, actor: string): Record<string, unknown> {
    return this.resourceCommands.simulate(projectId, actor);
  }

  private transitionCustodyItem(projectId: string, itemId: string, transition: "promote" | "park" | "restore", args: Record<string, any>, actor: string): Record<string, unknown> {
    return this.custodyCommands.transitionItem(projectId, itemId, transition, args, actor);
  }

  private prepareCustodyLease(projectId: string, itemId: string, actor: string): Promise<Record<string, unknown>> {
    return this.custodyCommands.prepareLease(projectId, itemId, actor);
  }

  private confirmCustodyLease(projectId: string, leaseId: string, args: Record<string, any>, actor: string): Promise<Record<string, unknown>> {
    return this.custodyCommands.confirmLease(projectId, leaseId, args, actor);
  }

  private dispatchCustodyLease(projectId: string, leaseId: string, args: Record<string, any>, actor: string): Promise<Record<string, unknown>> {
    return this.custodyCommands.dispatchLease(projectId, leaseId, args, actor);
  }

  private simulateCustodyLease(projectId: string, leaseId: string, actor: string): Record<string, unknown> {
    return this.custodyCommands.simulateLease(projectId, leaseId, actor);
  }

  private replayCustodyLease(projectId: string, leaseId: string, actor: string): Record<string, unknown> {
    return this.custodyCommands.replayLease(projectId, leaseId, actor);
  }

  private landCustodyReceipt(projectId: string, leaseId: string, args: Record<string, any>, actor: string): Promise<Record<string, unknown>> {
    return this.custodyCommands.landReceipt(projectId, leaseId, args, actor);
  }

  private rejectCustodyReceipt(projectId: string, leaseId: string, args: Record<string, any>, actor: string): Record<string, unknown> {
    return this.custodyCommands.rejectReceipt(projectId, leaseId, args, actor);
  }
  private requestStrategyReview(projectId: string, args: Record<string, any>, actor: string): Promise<Record<string, unknown>> {
    return this.strategyCommands.requestReview(projectId, args, actor);
  }
  private activateStrategyProposal(projectId: string, reviewId: string, args: Record<string, any>, actor: string): Record<string, unknown> {
    return this.strategyCommands.activateProposal(projectId, reviewId, args, actor);
  }
  private dismissStrategyProposal(projectId: string, reviewId: string, args: Record<string, any>, actor: string): Record<string, unknown> {
    return this.strategyCommands.dismissProposal(projectId, reviewId, args, actor);
  }
  projectRoot(projectId: string): string {
    const project = this.projects.get(projectId);
    if (!project) throw new Error(`Unknown project: ${projectId}`);
    return project.root;
  }

  async listCodexThreads(projectId: string): Promise<CodexCoordinatorCandidate[]> {
    return this.coordinatorSessions.listCandidates(projectId);
  }

  async coordinatorConversation(projectId: string): Promise<Record<string, unknown>> {
    return this.coordinatorSessions.conversation(projectId);
  }
  async observe(observer: ObserverSnapshot): Promise<void> {
    this.latestObserver = observer;
    for (const project of this.projects.values()) {
      if (!project.managed) continue;
      const lanes = observer.lanes.filter((lane) => lane.project === project.id);
      const { activeLanes, accounting } = await this.observationSync.synchronizeProject(project.id, lanes);
      await this.contextRegistry.refresh(project.id, activeLanes);
      await this.observerAutomationPolicy.propose(project.id, lanes, activeLanes, accounting);
      this.ensureStrategyBaseline(project.id);
      void this.autopilot.advance(project.id);
      void this.waveSemantics.startQueuedRedirect(project.id);
    }
    this.startup.observationSettled();
    this.changeListener?.();
  }

  private getProject(projectId: string): ProjectRow {
    if (!this.projects.has(projectId)) throw new Error(`Unknown project: ${projectId}`);
    return this.campaignState.project(projectId) as ProjectRow;
  }

  private updateProject(
    projectId: string,
    changes: { phase?: CampaignPhase; automation?: AutomationMode; dispatchProfile?: ResearchDispatchProfile },
    context: CampaignTransitionContext = { authority: "system", cause: "durable-project-touch" },
  ): void {
    this.getProject(projectId);
    this.campaignState.change(projectId, changes, context);
  }

  private coordinator(projectId: string): CoordinatorRow | null {
    return this.coordinatorSessions.get(projectId);
  }

  private writableCoordinator(projectId: string): Promise<CoordinatorRow> {
    return this.coordinatorSessions.writable(projectId);
  }
  private latestWave(projectId: string): WaveRow | null {
    return this.waveRepository.latest(projectId) as WaveRow | null;
  }

  private waveLanes(waveId: string): WaveLaneRow[] {
    return this.waveRepository.members(waveId);
  }

  private recordEvent(projectId: string, aggregateType: string, aggregateId: string, eventType: string, payload: unknown): void {
    this.database.query(`
      INSERT INTO campaign_events(event_id, project_id, aggregate_type, aggregate_id, event_type, payload_json, created_at)
      VALUES ($event, $project, $aggregateType, $aggregateId, $type, $payload, $now)
    `).run({
      $event: crypto.randomUUID(),
      $project: projectId,
      $aggregateType: aggregateType,
      $aggregateId: aggregateId,
      $type: eventType,
      $payload: JSON.stringify(payload),
      $now: now(),
    });
  }

  async enqueueAction(input: EnqueueActionInput, actor: string): Promise<Record<string, unknown>> {
    return this.actionQueue.enqueue(input, actor);
  }
  private actionHandlers(): CampaignActionHandlerRegistry {
    return {
      "coordinator.attach": (action, args) => this.coordinatorSessions.attach(action.project_id, args),
      "coordinator.interrupt": (action) => this.coordinatorSessions.interrupt(action.project_id),
      "coordinator.message.send": (action, args) => this.coordinatorSessions.sendMessage(action.project_id, args),
      "lane.reconcile": (action) => this.laneReconciliation.reconcile(action.project_id, action.target_id),
      "lane.disposition.set": (action, args) => this.setLaneDisposition(action.project_id, action.target_id, args, action.created_by),
      "project.automation.set": (action, args) => this.setAutomation(action.project_id, args),
      "project.dispatch-profile.set": (action, args) => this.setDispatchProfile(action.project_id, args, action.created_by),
      "wave.adopt": (action, args) => this.adoptWave(action.project_id, args),
      "wave.triage.request": (action) => this.waveSemantics.requestTriage(action.project_id),
      "wave.triage.apply": (action, args) => this.waveSemantics.applyTriage(action.project_id, args, action.created_by),
      "synthesis.prepare": (action) => this.waveSemantics.prepareSynthesis(action.project_id),
      "synthesis.request": (action) => this.waveSemantics.requestSynthesis(action.project_id),
      "synthesis.review": (action, args) => this.waveSemantics.reviewSynthesis(action.project_id, args, action.created_by),
      "research.review.start": (action) => this.researchPlanning.startReview(action.project_id, action.created_by),
      "research.review.resolve": (action, args) => this.researchPlanning.resolveReview(action.project_id, args, action.created_by),
      "research.schedule.prepare": (action) => this.researchExecution.prepareSchedule(action.project_id, action.created_by),
      "research.schedule.confirm": (action, args) => this.researchExecution.confirmSchedule(action.project_id, action.target_id, args, action.created_by),
      "research.schedule.dispatch": (action, args) => this.researchExecution.dispatchSchedule(action.project_id, action.target_id, args, action.created_by),
      "research.dispatch.start": () => { throw new Error("Direct one-lane dispatch is retired; freeze, confirm, and dispatch the resource-bounded wave schedule instead"); },
      "research.evidence.return": (action) => this.researchExecution.returnEvidence(action.project_id, action.target_id, action.created_by),
      "loop.start": (action) => this.autopilot.start(action.project_id, action.created_by),
      "loop.pause": (action) => this.autopilot.pause(action.project_id, action.created_by),
      "loop.resume": (action) => this.autopilot.resume(action.project_id, action.created_by),
      "loop.halt-after-step": (action) => this.autopilot.haltAfterStep(action.project_id, action.created_by),
      "loop.stop": (action) => this.autopilot.stop(action.project_id, action.created_by),
      "campaign.redirect.submit": (action, args) => this.waveSemantics.submitRedirect(action.project_id, args, action.created_by),
      "campaign.redirect.apply": (action) => this.waveSemantics.applyRedirect(action.project_id, action.target_id, action.created_by),
      "campaign.recovery.prepare": (action) => this.campaignRecovery.prepare(action.project_id, action.created_by),
      "campaign.recovery.apply": (action, args) => this.campaignRecovery.apply(action.project_id, args, action.created_by),
      "strategy.review.request": (action, args) => this.requestStrategyReview(action.project_id, args, action.created_by),
      "strategy.proposal.activate": (action, args) => this.activateStrategyProposal(action.project_id, action.target_id, args, action.created_by),
      "strategy.proposal.dismiss": (action, args) => this.dismissStrategyProposal(action.project_id, action.target_id, args, action.created_by),
      "custody.item.promote": (action, args) => this.transitionCustodyItem(action.project_id, action.target_id, "promote", args, action.created_by),
      "custody.item.park": (action, args) => this.transitionCustodyItem(action.project_id, action.target_id, "park", args, action.created_by),
      "custody.item.restore": (action, args) => this.transitionCustodyItem(action.project_id, action.target_id, "restore", args, action.created_by),
      "custody.lease.prepare": (action) => this.prepareCustodyLease(action.project_id, action.target_id, action.created_by),
      "custody.lease.confirm": (action, args) => this.confirmCustodyLease(action.project_id, action.target_id, args, action.created_by),
      "custody.lease.dispatch": (action, args) => this.dispatchCustodyLease(action.project_id, action.target_id, args, action.created_by),
      "custody.lease.simulate": (action) => this.simulateCustodyLease(action.project_id, action.target_id, action.created_by),
      "custody.lease.replay": (action) => this.replayCustodyLease(action.project_id, action.target_id, action.created_by),
      "custody.receipt.land": (action, args) => this.landCustodyReceipt(action.project_id, action.target_id, args, action.created_by),
      "custody.receipt.reject": (action, args) => this.rejectCustodyReceipt(action.project_id, action.target_id, args, action.created_by),
      "resource.schedule.simulate": (action) => this.simulateResourceSchedule(action.project_id, action.created_by),
      "campaign.operator-transition.prepare": (action) => this.operatorTransitions.prepare(action.project_id),
      "campaign.operator-transition.execute": (action, args) => this.operatorTransitions.execute(action.project_id, args, action.created_by),
      "approval.respond": (action, args) => this.codexApprovals.respond(action.project_id, args),
    };
  }

  private adoptWaveFromLanes(projectId: string, lanes: LaneSnapshot[], label = ""): WaveRow {
    const coordination = this.coordinationInterface.snapshot(projectId, lanes);
    if (!coordination.capabilities.importWave) {
      throw new Error(`Wave import is unavailable from ${coordination.mode}: ${coordination.reason}`);
    }
    const createdAt = now();
    const waveId = `${projectId}-wave-${createdAt.replace(/[-:TZ.]/g, "").slice(0, 14)}-${digest(lanes.map((lane) => lane.id)).slice(0, 8)}`;
    const result = this.waveCommands.adopt({ waveId, projectId, label, lanes, createdAt });
    if (result.created) {
      this.updateProject(projectId, { phase: result.wave.phase as CampaignPhase }, { authority: "domain-command", cause: "wave-adoption" });
      this.recordEvent(projectId, "wave", result.wave.wave_id, "wave.adopted", { laneIds: lanes.map((lane) => lane.id), label });
    }
    return result.wave as WaveRow;
  }

  private async adoptWave(projectId: string, args: Record<string, any>): Promise<Record<string, unknown>> {
    const lanes = (this.latestObserver?.lanes ?? [])
      .filter((lane) => lane.project === projectId && lane.lifecycle === "active")
      .sort((a, b) => a.id.localeCompare(b.id));
    const wave = this.adoptWaveFromLanes(projectId, lanes, typeof args.label === "string" ? args.label : "");
    return { waveId: wave.wave_id, laneCount: this.waveLanes(wave.wave_id).length, accounting: waveAccounting(this.waveLanes(wave.wave_id)) };
  }

  private async setLaneDisposition(projectId: string, laneId: string, args: Record<string, any>, actor: string): Promise<Record<string, unknown>> {
    const wave = this.latestWave(projectId);
    if (!wave) throw new Error("Adopt a wave before recording lane dispositions");
    if (!this.coordinationInterface.snapshot(projectId).capabilities.account) {
      throw new Error("Lane dispositions require an aligned imported-wave or controller-owned boundary");
    }
    const disposition = typeof args.disposition === "string" ? args.disposition.trim().toUpperCase() : "";
    const reason = typeof args.reason === "string" ? args.reason.trim().slice(0, 1000) : "";
    const result = this.waveCommands.recordDisposition(wave, { laneId, disposition, reason }, now());
    const accounting = result.accounting;
    if (accounting.complete) {
      this.updateProject(projectId, { phase: "SYNTHESIS_READY" }, { authority: "human-confirmed", cause: "lane-disposition-completed-accounting", actor });
    } else {
      this.updateProject(projectId, {});
    }
    this.recordEvent(projectId, "lane", laneId, "lane.disposition.recorded", { waveId: wave.wave_id, disposition, reason, actor });
    return { waveId: wave.wave_id, laneId, disposition, reason, accounting };
  }

  private async setAutomation(projectId: string, args: Record<string, any>): Promise<Record<string, unknown>> {
    const mode = args.mode as AutomationMode;
    if (!["observe", "prepare", "propose", "bounded"].includes(mode)) throw new Error(`Invalid automation mode: ${mode}`);
    this.updateProject(projectId, { automation: mode });
    this.recordEvent(projectId, "project", projectId, "project.automation.changed", { mode });
    return { mode };
  }

  private async setDispatchProfile(projectId: string, args: Record<string, any>, actor: string): Promise<Record<string, unknown>> {
    const profile = args.profile;
    if (!isResearchDispatchProfile(profile)) throw new Error(`Invalid research dispatch profile: ${String(profile)}`);
    const previous = this.getProject(projectId).dispatch_profile;
    this.updateProject(projectId, { dispatchProfile: profile });
    this.recordEvent(projectId, "project", projectId, "project.dispatch-profile.changed", { previous, profile, actor });
    return { previous, profile, appliesTo: "future research launches" };
  }

  snapshot(options: CampaignSnapshotOptions = {}): Record<string, unknown> {
    return this.projectReader.snapshot(options);
  }

  indexSnapshot(): Record<string, unknown> {
    return this.projectReader.indexSnapshot();
  }
  stop(): void {
    this.codex.stop();
    this.database.close();
  }
}
