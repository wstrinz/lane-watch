<script lang="ts">
  import { campaignState } from "./campaign-state";
  import { settleCampaignAction, type CampaignProject as Project } from "./campaign-actions";

  let project: Project | null = null;
  let loadedProjectId = "";
  let title = "";
  let sourceUrl = "";
  let content = "";
  let working = "";
  let feedback = "";
  let feedbackKind: "pending" | "success" | "error" = "pending";

  function storageKey(projectId: string): string { return `lane-watch-redirect:${projectId}`; }
  function loadDraft(projectId: string): void {
    loadedProjectId = projectId;
    let draft = { title: "", sourceUrl: "", content: "" };
    try { draft = JSON.parse(sessionStorage.getItem(storageKey(projectId)) || JSON.stringify(draft)); } catch { /* Keep an empty draft. */ }
    ({ title, sourceUrl, content } = draft);
  }
  function persistDraft(): void {
    if (!project) return;
    try { sessionStorage.setItem(storageKey(project.id), JSON.stringify({ title, sourceUrl, content })); } catch { /* In-memory inputs remain usable. */ }
  }
  function compact(value: unknown, limit = 420): string {
    const text = String(value || "").trim().replace(/\s+/g, " ");
    return text.length <= limit ? text : `${text.slice(0, limit).replace(/\s+\S*$/, "")}…`;
  }
  function relativeTime(value = ""): string {
    const delta = Date.now() - new Date(value).valueOf();
    if (!Number.isFinite(delta)) return value || "unknown";
    const [unit, divisor] = Math.abs(delta) < 3_600_000 ? ["m", 60_000] : Math.abs(delta) < 86_400_000 ? ["h", 3_600_000] : ["d", 86_400_000];
    return `${Math.max(1, Math.round(Math.abs(delta) / divisor))}${unit} ago`;
  }

  async function submit(): Promise<void> {
    if (!project || !content.trim() || working) return;
    persistDraft();
    working = "submit";
    feedbackKind = "pending";
    feedback = "Freezing the input and starting a read-only Sol redirect pass…";
    try {
      await settleCampaignAction({ projectId: project.id, type: "campaign.redirect.submit", args: { title, sourceUrl, content }, scope: "external-perspective", pollLimit: 160 });
      title = ""; sourceUrl = ""; content = "";
      try { sessionStorage.removeItem(storageKey(project.id)); } catch { /* Nothing else to clear. */ }
      feedbackKind = "success";
      feedback = "The external perspective is frozen. Sol is comparing it with the campaign ledger.";
    } catch (error) {
      feedbackKind = "error";
      feedback = error instanceof Error ? error.message : String(error);
    } finally { working = ""; }
  }

  async function apply(inputId: string, mode: "context-only" | "stage-directions"): Promise<void> {
    if (!project || working) return;
    working = "apply";
    feedbackKind = "pending";
    feedback = mode === "context-only" ? "Keeping the review as campaign context…" : "Staging the proposed questions for plan review…";
    try {
      await settleCampaignAction({ projectId: project.id, type: "campaign.redirect.apply", targetId: inputId, args: { mode }, scope: "external-perspective" });
      feedbackKind = "success";
      feedback = mode === "context-only" ? "Kept as campaign context. No research requests were added; the current plan is unchanged." : "Questions are staged for plan review. No worker was launched.";
    } catch (error) {
      feedbackKind = "error";
      feedback = error instanceof Error ? error.message : String(error);
    } finally { working = ""; }
  }

  $: project = ($campaignState.control?.projects?.find((candidate) => candidate.id === $campaignState.selectedProject) as Project | undefined) || null;
  $: if (project?.id && project.id !== loadedProjectId) loadDraft(project.id);
  $: inputs = Array.isArray(project?.externalInputs) ? project.externalInputs : [];
  $: latest = inputs[0] || null;
  $: response = latest?.response && typeof latest.response === "object" ? latest.response : {};
  $: directions = Array.isArray(response?.newDirections) ? response.newDirections : [];
  $: drafting = inputs.some((input: any) => ["queued", "drafting"].includes(input.status));
  $: statusLabel = ({ queued: "QUEUED", drafting: "SOL RESHAPING", drafted: "HUMAN GATE", applied: "APPLIED", failed: "FAILED" } as Record<string, string>)[latest?.status] || "OPEN";
</script>

{#if project}
  <section class="redirect-intake {latest?.status || "open"}" id="external-perspective">
    <div class="redirect-heading"><div><p class="eyebrow">EXTERNAL PERSPECTIVE</p><h3>Widen or redirect the campaign</h3><p>Drop in a paper, argument, observation, or reframing. It pauses autopilot at a safe boundary and asks Sol to reshape direction without dispatching or invalidating landed evidence.</p></div><span class="redirect-status">{statusLabel}</span></div>
    <details class="redirect-composer" open={!inputs.length}>
      <summary><span>{inputs.length ? "Add another perspective" : "Add an external perspective"}</span><strong>Sol read-only pass</strong></summary>
      <div class="redirect-fields"><input maxlength="240" placeholder="Short title (optional)" bind:value={title} oninput={persistDraft} /><input maxlength="2000" inputmode="url" placeholder="Source link (optional)" bind:value={sourceUrl} oninput={persistDraft} /></div>
      <textarea id="redirect-content" rows="6" maxlength="24000" placeholder="Paste the relevant idea, critique, external result, or your own reframing…" bind:value={content} oninput={persistDraft}></textarea>
      <div class="redirect-submit"><small>This becomes an immutable input bundle. Sol compares it with the current synthesis, checked plan, and run history.</small><button class="primary-button" disabled={!content.trim() || drafting || Boolean(working)} onclick={submit}>{drafting ? "Redirect already running" : working === "submit" ? "Freezing perspective…" : "Ask Sol to reshape the campaign"}</button></div>
    </details>
    {#if latest}
      <article class="redirect-proposal">
        <div class="redirect-proposal-heading"><div><span>{latest.status} · {relativeTime(latest.updatedAt)}</span><strong>{latest.title}</strong></div>{#if latest.sourceUrl}<a href={latest.sourceUrl} target="_blank" rel="noreferrer">Open source ↗</a>{/if}</div>
        {#if latest.error}<p class="redirect-error">{latest.error}</p>{/if}
        <p>{response.summary || (latest.status === "drafting" ? "Sol is comparing this input against the current evidence, plan, and campaign assumptions." : compact(latest.content, 360))}</p>
        {#if response.perspectiveShift}<div class="redirect-shift"><span>Proposed shift</span><strong>{response.perspectiveShift}</strong></div>{/if}
        {#if directions.length}<details><summary>Inspect {directions.length} proposed direction{directions.length === 1 ? "" : "s"}</summary><div class="redirect-direction-list">{#each directions as direction}<div><span>{direction.profile || "sonnet-worker"}</span><strong>{direction.question || "Direction"}</strong><p>{direction.rationale || ""}</p></div>{/each}</div></details>{/if}
        {#if latest.status === "drafted"}<div class="redirect-gate"><small>Keep the review as context, or stage its questions for a separate plan review.</small><button class="primary-button" disabled={Boolean(working)} onclick={() => apply(latest.id, "context-only")}>{working === "apply" ? "Applying…" : "Keep as campaign context"}</button>{#if response.decision === "READY_FOR_GATE" && directions.length}<button class="outline-button" disabled={Boolean(working)} onclick={() => apply(latest.id, "stage-directions")}>Stage {directions.length} proposed question{directions.length === 1 ? "" : "s"}</button>{/if}</div>{/if}
        {#if latest.status === "applied" && latest.applicationMode === "context-only"}<p>Kept as campaign context. Its proposed questions were not staged.</p>{/if}
      </article>
    {/if}
    {#if inputs.length > 1}<details class="redirect-history"><summary>Earlier external inputs <strong>{inputs.length - 1}</strong></summary>{#each inputs.slice(1) as input}<div><span>{input.status}</span><strong>{input.title}</strong><small>{relativeTime(input.updatedAt)}</small></div>{/each}</details>{/if}
    {#if feedback}<div class="gate-feedback redirect-feedback {feedbackKind}" role="status">{feedback}</div>{/if}
  </section>
{/if}
