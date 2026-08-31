<script lang="ts">
  import { campaignState } from "./campaign-state";
  import { settleCampaignAction, type CampaignAction as Action, type CampaignProject as Project } from "./campaign-actions";

  let project: Project | null = null;
  let workspace: Record<string, any> | null = null;
  let review: Record<string, any> | null = null;
  let working = "";
  let approved = false;
  let reviewKind: "epoch" | "idea-search" = "epoch";
  let requestSource: "operator" | "coordinator-request" = "operator";
  let requestReference = "";
  let reason = "Review whether the current epoch is producing durable frontier motion and whether its portfolio should be rebalanced.";
  let feedback = "";
  let feedbackKind: "pending" | "success" | "error" = "pending";

  const percent = (value: unknown) => `${Math.round(Number(value || 0) * 100)}%`;

  async function submit(type: string, targetId = "", args: Record<string, unknown> = {}): Promise<Action> {
    if (!project || working) throw new Error("Another strategy action is still settling");
    working = type;
    feedbackKind = "pending";
    feedback = type === "strategy.review.request"
      ? "Freezing the epoch ledger and starting an independent read-only Sol task…"
      : type === "strategy.proposal.activate"
        ? "Recording the charter revision and opening a fresh measurement epoch…"
        : "Keeping the current charter and closing this proposal…";
    try {
      const settlement = await settleCampaignAction({ projectId: project.id, type, targetId, args, scope: "strategy-workspace", pollLimit: 160 });
      feedbackKind = "success";
      feedback = type === "strategy.review.request"
        ? "Independent epoch review started. The regular campaign coordinator and campaign phase were not changed."
        : type === "strategy.proposal.activate"
          ? "The new advisory charter is active in a fresh epoch. No work was dispatched."
          : "Proposal closed; the current charter remains active.";
      return settlement.action;
    } catch (error) {
      feedbackKind = "error";
      feedback = error instanceof Error ? error.message : String(error);
      throw error;
    } finally {
      working = "";
    }
  }

  async function requestReview(): Promise<void> {
    await submit("strategy.review.request", "", { triggerKind: "manual", reason, reviewKind, requestSource, requestReference }).catch(() => undefined);
  }

  async function activate(): Promise<void> {
    if (!review || !approved) return;
    await submit("strategy.proposal.activate", review.id, { confirmation: "ACTIVATE STRATEGY REVISION" }).catch(() => undefined);
    approved = false;
  }

  async function dismiss(): Promise<void> {
    if (!review) return;
    await submit("strategy.proposal.dismiss", review.id, { note: "Operator kept the current charter after reviewing the independent proposal." }).catch(() => undefined);
  }

  $: project = ($campaignState.control?.projects?.find((candidate) => candidate.id === $campaignState.selectedProject) as Project | undefined) || null;
  $: workspace = project?.strategy?.workspace || null;
  $: review = workspace?.activeReview || null;
  $: response = review?.response || {};
  $: proposal = response?.proposal || {};
  $: weights = Array.isArray(proposal?.trackWeights) ? proposal.trackWeights : [];
  $: autoOpen = Boolean(review && ["drafting", "drafted"].includes(review.status));
</script>

{#if project?.strategy && workspace}
  <details id="strategy-workspace" class="strategy-workspace" open={autoOpen}>
    <summary>
      <span><small>STRATEGY WORKSPACE</small><strong>Charter revision {project.strategy.charter.revision}</strong></span>
      <span class="strategy-workspace-state">{review?.status === "drafting" ? "SOL REVIEW RUNNING" : review?.status === "drafted" ? "HUMAN GATE" : "NO STRATEGY JOB RUNNING"}</span>
    </summary>
    <div class="strategy-workspace-body">
      <div class="strategy-workspace-boundary">
        <strong>Independent governance lane</strong>
        <p>Epoch and idea-search reviews run in one dedicated read-only Sol lane. Each request binds its strategy slot and token cap, and cannot interrupt the regular coordinator, change campaign phase, dispatch workers, or activate its own proposal.</p>
      </div>

      {#if !review}
        <div class="strategy-review-request">
          <div>
            <span>CURRENT EPOCH</span>
            <strong>{project.strategy.epoch.label}</strong>
            <p>{project.strategy.charter.epoch?.objective || project.strategy.charter.thesis}</p>
          </div>
          <label><span>Review focus</span><textarea bind:value={reason} rows="3" maxlength="2000"></textarea></label>
          <div class="strategy-review-provenance">
            <label><span>Review kind</span><select bind:value={reviewKind}><option value="epoch">Epoch audit</option><option value="idea-search">Independent idea search</option></select></label>
            <label><span>Request source</span><select bind:value={requestSource}><option value="operator">Operator</option><option value="coordinator-request">Coordinator request</option></select></label>
            {#if requestSource === "coordinator-request"}<label><span>Exact thread or turn ID</span><input bind:value={requestReference} maxlength="500" placeholder="Attached coordinator reference" /></label>{/if}
          </div>
          <button class="primary-button" disabled={Boolean(working) || !workspace.reviewAvailable || !reason.trim() || (requestSource === "coordinator-request" && !requestReference.trim())} onclick={requestReview}>
            {working === "strategy.review.request" ? "Starting independent review…" : "Ask independent Sol strategist"}
          </button>
        </div>
      {:else if review.status === "drafting" || review.status === "queued"}
        <div class="strategy-review-running">
          <span class="strategy-pulse"></span>
          <div><strong>{review.reviewKind === "idea-search" ? "Searching for independent directions" : "Reviewing the epoch ledger"}</strong><p>{review.triggerReason}</p><small>{review.requestSource} · cap {Number(review.resourceCap || 0).toLocaleString()} · frozen bundle {review.bundleDigest || "being prepared"}</small></div>
        </div>
      {:else if review.status === "drafted"}
        <div class="strategy-proposal">
          <header>
            <div><span>{review.reviewKind?.replaceAll("-", " ") || "REVIEW"} · {response.assessment?.epochStatus || "COMPLETE"}</span><h3>{response.summary || "Independent strategy proposal"}</h3></div>
            <strong>{response.recommendation?.replaceAll("_", " ")}</strong>
          </header>
          <div class="strategy-proposal-objective">
            <span>PROPOSED EPOCH</span>
            <strong>{proposal.epochLabel}</strong>
            <p>{proposal.epochObjective}</p>
          </div>
          <div class="strategy-proposal-weights" aria-label="Proposed track weights">
            {#each weights as weight (weight.trackId)}
              <div><span>{weight.trackId}</span><strong>{percent(weight.share)}</strong><small>{weight.reason}</small></div>
            {/each}
          </div>
          <div class="strategy-action-diff">
            {#each [["STOP", response.portfolioActions?.stop], ["CONTINUE", response.portfolioActions?.continue], ["START", response.portfolioActions?.start]] as group}
              <section class={`strategy-action-${String(group[0]).toLowerCase()}`}><strong>{group[0]}</strong>{#if Array.isArray(group[1]) && group[1].length}<ul>{#each group[1] as item}<li>{item}</li>{/each}</ul>{:else}<p>None proposed.</p>{/if}</section>
            {/each}
          </div>
          {#if proposal.custodyCandidates?.length}
            <details class="custody-candidates"><summary>Inspect {proposal.custodyCandidates.length} custody handoff candidate{proposal.custodyCandidates.length === 1 ? "" : "s"}</summary><ul>{#each proposal.custodyCandidates as item}<li><strong>{item.task}</strong><span>{item.urgency} · {item.blocksResearch ? "blocks research" : "does not block research"}</span><p>{item.reason}</p></li>{/each}</ul></details>
          {/if}
          <div class="strategy-human-gate">
            <div><span>HUMAN ACTIVATION GATE</span><strong>{response.operatorDecision}</strong><small>Activation records revision {project.strategy.charter.revision + 1} and resets measurement boundaries. Campaign phase and dispatch state remain unchanged.</small></div>
            {#if workspace.activationAvailable}
              <label><input type="checkbox" bind:checked={approved} /><span>I approve this exact advisory charter as the next epoch.</span></label>
              <div><button class="outline-button" disabled={Boolean(working)} onclick={dismiss}>Keep current charter</button><button class="primary-button" disabled={!approved || Boolean(working)} onclick={activate}>{working === "strategy.proposal.activate" ? "Activating revision…" : "Activate new epoch"}</button></div>
            {:else}
              <button class="outline-button" disabled={Boolean(working)} onclick={dismiss}>Close proposal and keep current charter</button>
            {/if}
          </div>
        </div>
      {/if}

      {#if feedback}<div class="strategy-workspace-feedback {feedbackKind}" role="status">{feedback}</div>{/if}
      {#if workspace.charterHistory?.length}
        <details class="strategy-history"><summary>Charter history <strong>{workspace.charterHistory.length} revision{workspace.charterHistory.length === 1 ? "" : "s"}</strong></summary><ol>{#each workspace.charterHistory as item}<li><span>REV {item.revision}</span><div><strong>{item.charter.epoch?.label || "Campaign charter"}</strong><small>{item.actor} · {new Date(item.createdAt).toLocaleString()}</small></div></li>{/each}</ol></details>
      {/if}
      {#if workspace.reviews?.length}
        <details class="strategy-history strategy-review-history"><summary>Independent review history <strong>{workspace.reviews.length} review{workspace.reviews.length === 1 ? "" : "s"}</strong></summary><ol>{#each workspace.reviews as item}<li><span>{item.status.toUpperCase()}</span><div><strong>{item.response?.summary || item.triggerReason}</strong><small>{item.reviewKind} · {item.requestSource} · cap {Number(item.resourceCap || 0).toLocaleString()} · revision {item.baseRevision} · {new Date(item.createdAt).toLocaleString()}{item.error ? ` · ${item.error}` : ""}</small></div></li>{/each}</ol></details>
      {/if}
    </div>
  </details>
{/if}

<style>
  .strategy-review-history li { grid-template-columns: 74px 1fr; }
  .strategy-review-history li > span { overflow: hidden; text-overflow: ellipsis; }
  .strategy-review-provenance { display:grid; gap:5px; }
  .strategy-review-provenance label { display:grid; gap:3px; }
  .strategy-review-provenance span { color:#8ea295; font-size:.55rem; }
  .strategy-review-provenance select,.strategy-review-provenance input { box-sizing:border-box; color:#dbe7de; background:#0a120d; border:1px solid #3c5746; border-radius:7px; min-height:32px; padding:5px 7px; font:inherit; font-size:.56rem; }
</style>
