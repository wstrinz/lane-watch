<script lang="ts">
  import { campaignState } from "./campaign-state";
  import { settleCampaignAction, type CampaignAction as Action, type CampaignProject } from "./campaign-actions";

  let project: CampaignProject | null = null;
  let working = "";
  let approved = false;
  let feedback = "";
  let feedbackKind: "pending" | "success" | "error" = "pending";

  function shortHash(value = ""): string {
    return value ? `${value.slice(0, 10)}…${value.slice(-6)}` : "not recorded";
  }

  async function submit(type: string, args: Record<string, unknown> = {}): Promise<Action> {
    if (!project || working) throw new Error("Another gate action is still settling");
    working = type;
    feedbackKind = "pending";
    feedback = type.endsWith("prepare") ? "Checking the exact lineage, byte hashes, clean worktree, and merge preview…" : "Applying the explicitly approved local authority transition…";
    try {
      const settlement = await settleCampaignAction({ projectId: project.id, type, args, scope: "operator-gate" });
      feedbackKind = "success";
      feedback = type.endsWith("prepare")
        ? "Preflight passed. Review the frozen source, target paths, and exact hashes below."
        : "DOC-A1 landed locally with a successor receipt. Autopilot is asking Sol to bind the cold replay to the new head.";
      return settlement.action;
    } catch (error) {
      feedbackKind = "error";
      feedback = error instanceof Error ? error.message : String(error);
      throw error;
    } finally {
      working = "";
    }
  }

  async function prepare(): Promise<void> {
    await submit("campaign.operator-transition.prepare").catch(() => undefined);
  }

  async function execute(): Promise<void> {
    if (!preflight || !approved) return;
    await submit("campaign.operator-transition.execute", {
      confirmation: "APPROVE DOC-A1",
      previewActionId: preflight.id,
      previewDigest: preflight.result?.previewDigest,
    }).catch(() => undefined);
  }

  $: project = ($campaignState.control?.projects?.find((candidate) => candidate.id === $campaignState.selectedProject) as CampaignProject | undefined) || null;
  $: plan = project?.researchPlan;
  $: operatorLane = plan?.response?.lanes?.find((lane: any) => lane?.taskId === "operator-doc-a1-canonical-transition");
  $: visible = project?.phase === "RESEARCH_REVIEW" && plan?.status === "drafted" && plan?.response?.decision === "BLOCKED" && Boolean(operatorLane);
  $: actions = project?.actions || [];
  $: preflight = actions.find((action) => action.type === "campaign.operator-transition.prepare" && action.status === "completed") || null;
  $: lastPreflight = actions.find((action) => action.type === "campaign.operator-transition.prepare") || null;
</script>

{#if visible}
  <section class="operator-gate" id="operator-gate" aria-live="polite">
    <div class="operator-gate-heading">
      <div>
        <p class="eyebrow">REQUIRED OPERATOR TRANSITION</p>
        <h2>Adopt Proposal A as DOC-A1</h2>
        <p>This is the missing bridge between the checked staging evidence and the next runnable cold-replay lane.</p>
      </div>
      <span class="operator-gate-status">HUMAN GATE</span>
    </div>

    <div class="operator-gate-path" aria-label="Operator transition progress">
      <span class:done={Boolean(preflight)}>✓ Verified</span><i>→</i><span class="current">Your approval</span><i>→</i><span>Sol replans</span>
    </div>

    {#if !preflight}
      <div class="operator-gate-callout">
        <strong>The first action is read-only</strong>
        <p>It resolves the exact source commit, confirms both approved SHA-256 hashes, checks that main is clean, and previews the lineage merge. It changes no Git or campaign authority.</p>
        <button class="primary-button" disabled={Boolean(working)} onclick={prepare}>{working ? "Checking readiness…" : "Check transition readiness"}</button>
      </div>
      {#if lastPreflight?.status === "failed" && !feedback}<div class="gate-feedback error" role="alert"><span>{lastPreflight.error}</span></div>{/if}
    {:else}
      <div class="operator-gate-preview">
        <div class="operator-gate-ready">
          <div>
            <span>READINESS CHECK PASSED</span>
            <strong>Exact DOC-A1 transition is ready</strong>
            <small>3 local custody commits · no push · no worker dispatch</small>
          </div>
          <label class="operator-gate-confirm"><input type="checkbox" bind:checked={approved} /><span>Approve Proposal A’s exact bytes as DOC-A1.</span></label>
          <button class="primary-button operator-gate-approve" disabled={!approved || Boolean(working)} onclick={execute}>{working.endsWith("execute") ? "Applying transition…" : "Approve DOC-A1 & continue"}</button>
        </div>
        <details class="operator-gate-technical">
          <summary>Inspect commits, paths, hashes, and effects <strong>Preflight receipt</strong></summary>
          <div class="operator-gate-summary">
            <div><span>FROM FROZEN STAGING HEAD</span><strong>{shortHash(preflight.result?.sourceHead)}</strong><small>{preflight.result?.sourceBranch}</small></div>
            <div><span>INTO CLEAN MAIN</span><strong>{shortHash(preflight.result?.baseHead)}</strong><small>Conflict-free preview · {shortHash(preflight.result?.mergeTree)}</small></div>
          </div>
          <ul>
            <li><code>CONTRACT.md</code><span>{preflight.result?.hashes?.contract}</span></li>
            <li><code>output/preimage-spec.json</code><span>{preflight.result?.hashes?.preimage}</span></li>
            <li><code>evidence-receipt.json</code><span>new DKC successor receipt</span></li>
          </ul>
          <div class="operator-gate-effects">
            <strong>BOUNDARY EFFECTS</strong>
            <p>Creates one local lineage-intake merge, one exact document commit, and one successor-receipt commit. It does not push, dispatch a worker, authorize SAT or Mac work, or promote a mathematical claim.</p>
          </div>
          <button class="outline-button compact" disabled={Boolean(working)} onclick={prepare}>Recheck readiness</button>
        </details>
      </div>
    {/if}
    {#if feedback}<div class="gate-feedback {feedbackKind}" role="status"><span>{feedback}</span></div>{/if}
  </section>
{/if}
