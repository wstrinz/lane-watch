import { Database } from "bun:sqlite";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve, sep } from "node:path";
import { runGit } from "./git";
import { WaveRepository } from "./wave-repository";

interface TransitionProject {
  current_phase: string;
}

interface TransitionActionReceipt {
  project_id: string;
  action_type: string;
  status: string;
  result_json: string;
}

interface TransitionLoop {
  loop_id: string;
  status: string;
}

interface OperatorTransitionPort {
  project(projectId: string): TransitionProject;
  projectRoot(projectId: string): string;
  actionReceipt(actionId: string): TransitionActionReceipt | null;
  activeLoop(projectId: string): TransitionLoop | null;
  requireCleanWorkspace(projectRoot: string): Promise<boolean>;
  touchProject(projectId: string, phase: string): void;
  recordEvent(projectId: string, aggregateType: string, aggregateId: string, eventType: string, payload: unknown): void;
  digest(value: unknown): string;
  now(): string;
}

interface ResearchPlanRow {
  status: string;
  response_json: string;
  evidence_digest: string;
}

interface ResearchRunRow {
  evidence_json: string;
}

function parseJson<T>(value: string, fallback: T): T {
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function within(root: string, candidate: string): boolean {
  const normalizedRoot = resolve(root);
  const normalizedCandidate = resolve(candidate);
  const prefix = normalizedRoot.endsWith(sep) ? normalizedRoot : `${normalizedRoot}${sep}`;
  return normalizedCandidate === normalizedRoot || normalizedCandidate.startsWith(prefix);
}

function sha256Bytes(value: Uint8Array): string {
  const hasher = new Bun.CryptoHasher("sha256");
  hasher.update(value);
  return hasher.digest("hex");
}

async function readGitObject(projectRoot: string, revisionPath: string): Promise<Uint8Array> {
  const child = Bun.spawn(["git", "-c", `safe.directory=${projectRoot}`, "-C", projectRoot, "show", revisionPath], {
    cwd: projectRoot,
    stdout: "pipe",
    stderr: "pipe",
  });
  const [bytes, stderr, exitCode] = await Promise.all([
    new Response(child.stdout).bytes(),
    new Response(child.stderr).text(),
    child.exited,
  ]);
  if (exitCode !== 0) throw new Error(`Could not read frozen Git object ${revisionPath}: ${stderr.trim()}`);
  return bytes;
}

/** Owns the exceptional, explicit-human-gated DOC-A1 authority transition. */
export class OperatorTransitionService {
  constructor(
    private readonly database: Database,
    private readonly waves: WaveRepository,
    private readonly port: OperatorTransitionPort,
  ) {}

  private contract(projectId: string): Record<string, any> {
    const project = this.port.project(projectId);
    const wave = this.waves.latest(projectId);
    if (!wave || project.current_phase !== "RESEARCH_REVIEW") throw new Error("The DOC-A1 operator transition is only available at its checked research-plan boundary");
    const plan = this.database.query("SELECT * FROM campaign_research_plans WHERE wave_id = $wave")
      .get({ $wave: wave.wave_id }) as ResearchPlanRow | null;
    const response = parseJson<Record<string, any>>(plan?.response_json || "{}", {});
    if (!plan || plan.status !== "drafted" || response.decision !== "BLOCKED") throw new Error("A drafted BLOCKED coordinator plan is required before preparing an operator transition");
    const operatorLane = (Array.isArray(response.lanes) ? response.lanes : []).find((lane: any) => lane?.taskId === "operator-doc-a1-canonical-transition");
    if (!operatorLane) throw new Error("The checked plan does not contain the DOC-A1 canonical-transition boundary");
    const run = this.database.query(`
      SELECT * FROM campaign_research_runs
      WHERE project_id = $project AND task_id = 'trade37-v21-doc-a1-authority-instantiation' AND status = 'returned_to_sol'
      ORDER BY completed_at DESC LIMIT 1
    `).get({ $project: projectId }) as ResearchRunRow | null;
    const evidence = parseJson<Record<string, any>>(run?.evidence_json || "{}", {});
    const successor = evidence.successor_commit_and_hashes || {};
    const historical = evidence.historical_commit_and_hashes || {};
    const branch = String(evidence.branch || successor.branch || "");
    const stagedCommit = String(successor.commit || "");
    const contractPath = "artifacts/trade37-v21-doc-a1-authority-instantiation/candidate/CONTRACT.md";
    const preimagePath = "artifacts/trade37-v21-doc-a1-authority-instantiation/candidate/output/preimage-spec.json";
    const contractHash = String(successor.installed_paths?.[contractPath] || successor.expected_contract_sha256 || evidence.stop_condition_check?.expected_contract_sha256 || "");
    const preimageHash = String(successor.installed_paths?.[preimagePath] || successor.expected_preimage_sha256 || evidence.stop_condition_check?.expected_preimage_sha256 || "");
    if (!run || evidence.verdict !== "SUPPORTED" || !/^[0-9a-f]{40}$/i.test(stagedCommit) || !branch || !/^[0-9a-f]{64}$/i.test(contractHash) || !/^[0-9a-f]{64}$/i.test(preimageHash)) {
      throw new Error("The returned authority-instantiation evidence does not provide a complete immutable DOC-A1 transition contract");
    }
    const followupRequestIds = (Array.isArray(response.lanes) ? response.lanes : [])
      .filter((lane: any) => lane?.contract?.status === "AFTER_DEPENDENCY" && typeof lane?.requestId === "string")
      .map((lane: any) => lane.requestId);
    return { wave, plan, response, evidence, branch, stagedCommit, contractPath, preimagePath, contractHash, preimageHash, historical, followupRequestIds };
  }

  async prepare(projectId: string): Promise<Record<string, unknown>> {
    const transition = this.contract(projectId);
    const root = this.port.projectRoot(projectId);
    await this.port.requireCleanWorkspace(root);
    const [head, branch, sourceHead] = await Promise.all([
      runGit(root, ["rev-parse", "HEAD"]),
      runGit(root, ["branch", "--show-current"]),
      runGit(root, ["rev-parse", transition.branch]),
    ]);
    if (head.exitCode !== 0 || !/^[0-9a-f]{40}$/i.test(head.stdout)) throw new Error("Could not resolve the campaign HEAD for transition preview");
    if (branch.exitCode !== 0 || branch.stdout !== "main") throw new Error(`Operator transitions must target the checked-out main branch, not ${branch.stdout || "detached HEAD"}`);
    if (sourceHead.exitCode !== 0 || !/^[0-9a-f]{40}$/i.test(sourceHead.stdout)) throw new Error(`Could not resolve the frozen staging branch ${transition.branch}`);
    const stagedAncestor = await runGit(root, ["merge-base", "--is-ancestor", transition.stagedCommit, sourceHead.stdout]);
    if (stagedAncestor.exitCode !== 0) throw new Error("The staging receipt branch no longer contains the frozen candidate commit");
    const mergePreview = await runGit(root, ["merge-tree", "--write-tree", head.stdout, sourceHead.stdout]);
    if (mergePreview.exitCode !== 0) throw new Error(`The staging lineage does not merge cleanly into main: ${mergePreview.stderr || mergePreview.stdout}`);
    const [contractBytes, preimageBytes] = await Promise.all([
      readGitObject(root, `${sourceHead.stdout}:${transition.contractPath}`),
      readGitObject(root, `${sourceHead.stdout}:${transition.preimagePath}`),
    ]);
    const measuredContract = sha256Bytes(contractBytes);
    const measuredPreimage = sha256Bytes(preimageBytes);
    if (measuredContract !== transition.contractHash || measuredPreimage !== transition.preimageHash) {
      throw new Error("Frozen staging bytes no longer match the coordinator-approved DOC-A1 hashes");
    }
    const preview = {
      kind: "doc-a1-canonical-transition",
      targetBranch: branch.stdout,
      baseHead: head.stdout,
      sourceBranch: transition.branch,
      sourceHead: sourceHead.stdout,
      stagedCommit: transition.stagedCommit,
      mergeTree: mergePreview.stdout.split(/\r?\n/, 1)[0],
      targetPaths: [
        "artifacts/trade37-pin-gate-repair-v2-1/CONTRACT.md",
        "artifacts/trade37-pin-gate-repair-v2-1/output/preimage-spec.json",
        "artifacts/trade37-pin-gate-repair-v2-1/evidence-receipt.json",
      ],
      hashes: { contract: measuredContract, preimage: measuredPreimage },
      historicalCommit: transition.historical.commit || "",
      historicalReceiptHash: transition.historical["evidence-receipt.json_sha256"] || "",
      waveId: transition.wave.wave_id,
      planDigest: transition.plan.evidence_digest,
    };
    return { ...preview, previewDigest: `sha256:${this.port.digest(preview)}`, generatedAt: this.port.now(), clean: true, mergeable: true };
  }

  async execute(projectId: string, args: Record<string, any>, actor: string): Promise<Record<string, unknown>> {
    if (args.confirmation !== "APPROVE DOC-A1") throw new Error("Explicit DOC-A1 approval is required before changing campaign authority");
    const previewActionId = typeof args.previewActionId === "string" ? args.previewActionId : "";
    const previewDigest = typeof args.previewDigest === "string" ? args.previewDigest : "";
    const previewAction = previewActionId ? this.port.actionReceipt(previewActionId) : null;
    if (!previewAction || previewAction.project_id !== projectId || previewAction.action_type !== "campaign.operator-transition.prepare" || previewAction.status !== "completed") {
      throw new Error("Run and review a fresh operator-transition preflight first");
    }
    const recordedPreview = parseJson<Record<string, any>>(previewAction.result_json, {});
    if (!previewDigest || recordedPreview.previewDigest !== previewDigest) throw new Error("The approved transition preview does not match the durable preflight receipt");
    const fresh = await this.prepare(projectId) as Record<string, any>;
    if (fresh.previewDigest !== previewDigest) throw new Error("Campaign Git state changed after preflight; refresh and review a new transition preview");
    const transition = this.contract(projectId);
    const root = this.port.projectRoot(projectId);
    const merge = await runGit(root, ["merge", "--no-ff", "-m", "DKC: intake DOC-A1 staging lineage", fresh.sourceHead]);
    if (merge.exitCode !== 0) {
      await runGit(root, ["merge", "--abort"]);
      throw new Error(`DOC-A1 staging-lineage intake failed without changing authority: ${merge.stderr || merge.stdout}`);
    }
    const mergeCommit = (await runGit(root, ["rev-parse", "HEAD"])).stdout;
    const canonicalContract = resolve(root, "artifacts/trade37-pin-gate-repair-v2-1/CONTRACT.md");
    const canonicalPreimage = resolve(root, "artifacts/trade37-pin-gate-repair-v2-1/output/preimage-spec.json");
    const canonicalReceipt = resolve(root, "artifacts/trade37-pin-gate-repair-v2-1/evidence-receipt.json");
    for (const path of [canonicalContract, canonicalPreimage, canonicalReceipt]) {
      if (!within(root, path)) throw new Error("DOC-A1 transition path escapes the campaign root");
    }
    const [contractBytes, preimageBytes] = await Promise.all([
      readGitObject(root, `${fresh.sourceHead}:${transition.contractPath}`),
      readGitObject(root, `${fresh.sourceHead}:${transition.preimagePath}`),
    ]);
    if (sha256Bytes(contractBytes) !== transition.contractHash || sha256Bytes(preimageBytes) !== transition.preimageHash) {
      throw new Error("Merged candidate bytes do not match the approved DOC-A1 hashes");
    }
    await mkdir(dirname(canonicalPreimage), { recursive: true });
    await Promise.all([writeFile(canonicalContract, contractBytes), writeFile(canonicalPreimage, preimageBytes)]);
    const documentPaths = ["artifacts/trade37-pin-gate-repair-v2-1/CONTRACT.md", "artifacts/trade37-pin-gate-repair-v2-1/output/preimage-spec.json"];
    let git = await runGit(root, ["add", "--", ...documentPaths]);
    if (git.exitCode !== 0) throw new Error(`Could not stage the exact DOC-A1 document transition: ${git.stderr || git.stdout}`);
    git = await runGit(root, ["commit", "-m", "DKC: install DOC-A1 at canonical producer paths", "--", ...documentPaths]);
    if (git.exitCode !== 0) throw new Error(`Could not commit the exact DOC-A1 document transition: ${git.stderr || git.stdout}`);
    const documentCommit = (await runGit(root, ["rev-parse", "HEAD"])).stdout;
    const receipt = {
      schema: "cfg23-research-evidence/v1",
      task_id: "trade37-v21-doc-a1-canonical-transition",
      status: "complete",
      verdict: "SUPPORTED",
      authority: "DKC canonical producer authority",
      amendment_id: "DOC-A1",
      performed_by: actor,
      performed_at: this.port.now(),
      authority_transition: {
        historical_commit: transition.historical.commit || "",
        historical_contract_sha256: transition.historical.CONTRACT_md_sha256 || transition.historical["CONTRACT.md_sha256"] || "",
        historical_preimage_sha256: transition.historical["preimage-spec.json_sha256"] || "",
        historical_receipt_sha256: transition.historical["evidence-receipt.json_sha256"] || "",
        reconciliation_commit: transition.evidence.doc_a1_naming?.reconciliation_commit || "",
        staging_candidate_commit: transition.stagedCommit,
        staging_receipt_commit: fresh.sourceHead,
        dkc_intake_merge_commit: mergeCommit,
        canonical_document_commit: documentCommit,
        contract_sha256: transition.contractHash,
        preimage_spec_sha256: transition.preimageHash,
      },
      changed_path_ledger: {
        document_commit: documentPaths,
        receipt_commit: ["artifacts/trade37-pin-gate-repair-v2-1/evidence-receipt.json"],
      },
      scope_limits: [
        "No candidate pin, manifest semantic value, producer output, digest, or frozen constant was changed by the DOC-A1 document commit.",
        "F-F remains on human hold.",
        "Mac execution and SAT dispatch remain unauthorized.",
        "No geometric existence, realizability, orientability, or stretchability claim is promoted by this authority transition.",
      ],
      next_step: "Run a fresh Sol lane-plan check bound to the receipt-bearing DKC head before dispatching the independent cold replay.",
    };
    await writeFile(canonicalReceipt, `${JSON.stringify(receipt, null, 2)}\n`, { encoding: "utf8", mode: 0o600 });
    const receiptPath = "artifacts/trade37-pin-gate-repair-v2-1/evidence-receipt.json";
    git = await runGit(root, ["add", "--", receiptPath]);
    if (git.exitCode !== 0) throw new Error(`Could not stage the DOC-A1 successor receipt: ${git.stderr || git.stdout}`);
    git = await runGit(root, ["commit", "-m", "DKC: record DOC-A1 authority transition receipt", "--", receiptPath]);
    if (git.exitCode !== 0) throw new Error(`Could not commit the DOC-A1 successor receipt: ${git.stderr || git.stdout}`);
    const receiptCommit = (await runGit(root, ["rev-parse", "HEAD"])).stdout;
    const status = await runGit(root, ["status", "--porcelain=v1", "--untracked-files=all"]);
    if (status.exitCode !== 0 || status.stdout) throw new Error(`DOC-A1 transition commits landed but the campaign worktree is not clean: ${status.stderr || status.stdout}`);
    const stamp = this.port.now();
    const transitionLanes = Array.isArray(transition.response.lanes) ? transition.response.lanes : [];
    const updateTransitionRequest = this.database.query("UPDATE campaign_research_requests SET status = $status, updated_at = $now WHERE request_id = $request");
    for (const lane of transitionLanes) {
      const requestId = typeof lane?.requestId === "string" ? lane.requestId : "";
      if (!requestId) continue;
      const status = transition.followupRequestIds.includes(requestId) ? "proposed" : "plan_excluded";
      updateTransitionRequest.run({ $status: status, $now: stamp, $request: requestId });
    }
    this.database.query("UPDATE campaign_research_plans SET status = 'superseded', updated_at = $now WHERE wave_id = $wave")
      .run({ $now: stamp, $wave: transition.wave.wave_id });
    this.database.query("UPDATE campaign_waves SET phase = 'RESEARCH_REVIEW', updated_at = $now WHERE wave_id = $wave")
      .run({ $now: stamp, $wave: transition.wave.wave_id });
    const loop = this.port.activeLoop(projectId);
    if (loop?.status === "attention") {
      this.database.query("UPDATE campaign_loop_runs SET status = 'running', error = '', updated_at = $now WHERE loop_id = $id")
        .run({ $now: stamp, $id: loop.loop_id });
    }
    this.port.touchProject(projectId, "RESEARCH_REVIEW");
    const result = { kind: "doc-a1-canonical-transition", mergeCommit, documentCommit, receiptCommit, receiptPath, previewDigest, resumedLoopId: loop?.loop_id || "" };
    this.port.recordEvent(projectId, "operator-transition", receiptCommit, "campaign.operator-transition.completed", result);
    return result;
  }
}
