<script lang="ts">
  import { campaignState } from "./campaign-state";
  import { settleCampaignAction, type CampaignProject as Project } from "./campaign-actions";

  let project: Project | null = null;
  let message = "";
  let working = "";
  let feedback = "";
  let conversation: any = null;
  let conversationProjectId = "";
  let loadingConversation = false;
  let candidates: any[] | null = null;

  async function loadConversation(force = false): Promise<void> {
    if (!project?.coordinator?.attached || loadingConversation || (!force && conversationProjectId === project.id && conversation)) return;
    loadingConversation = true;
    try {
      const response = await fetch(`/api/codex/conversation?project=${encodeURIComponent(project.id)}`, { cache: "no-store" });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || "Could not read coordinator history");
      conversation = body;
      conversationProjectId = project.id;
    } catch (error) { feedback = error instanceof Error ? error.message : String(error); }
    finally { loadingConversation = false; }
  }

  async function action(type: string, args: Record<string, unknown> = {}, targetId = ""): Promise<void> {
    if (!project || working) return;
    working = type;
    feedback = "Working…";
    try {
      await settleCampaignAction({ projectId: project.id, type, targetId, args, scope: "coordinator-console", pollLimit: 160 });
      feedback = "Coordinator control settled.";
      if (type === "coordinator.message.send") { message = ""; setTimeout(() => void loadConversation(true), 500); }
    } catch (error) { feedback = error instanceof Error ? error.message : String(error); }
    finally { working = ""; }
  }

  async function discover(): Promise<void> {
    if (!project || working) return;
    working = "discover";
    try {
      const response = await fetch(`/api/codex/threads?project=${encodeURIComponent(project.id)}`, { cache: "no-store" });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || "Could not list Codex tasks");
      candidates = body.threads || [];
    } catch (error) { feedback = error instanceof Error ? error.message : String(error); }
    finally { working = ""; }
  }

  function compact(value: unknown, limit = 900): string {
    const text = String(value || "").trim();
    return text.length <= limit ? text : `${text.slice(0, limit)}…`;
  }

  $: project = ($campaignState.control?.projects?.find((candidate) => candidate.id === $campaignState.selectedProject) as Project | undefined) || null;
  $: coordinator = project?.coordinator || null;
  $: messages = (conversation?.turns || []).flatMap((turn: any) => turn.messages || []).slice(-12);
  $: approvals = Array.isArray(project?.approvals) ? project.approvals.filter((approval: any) => approval.status === "pending") : [];
</script>

{#if project}
  <details class="coordinator-console" id="coordinator-console" ontoggle={(event) => { if ((event.currentTarget as HTMLDetailsElement).open) void loadConversation(); }}>
    <summary><span><small>SOL COORDINATOR</small><strong>{coordinator?.attached ? coordinator.name : "No coordinator attached"}</strong></span><span class="coordinator-state {coordinator?.status || "detached"}">{coordinator?.status || "DETACHED"}{approvals.length ? ` · ${approvals.length} approval` : ""}</span></summary>
    <div class="coordinator-console-body">
      {#if coordinator?.attached}
        <div class="coordinator-boundary"><strong>Semantic coordinator</strong><p>Plans, synthesizes, and checks direction. Dispatch, claim promotion, merges, pushes, and tool approvals remain separate gates.</p></div>
        {#if approvals.length}<section class="coordinator-approvals"><h3>Tool approval requests</h3>{#each approvals as approval}<article><div><strong>{approval.title || approval.tool || "Approval requested"}</strong><p>{approval.reason || approval.detail}</p></div>{#if approval.supported}<div><button class="outline-button compact" onclick={() => action("approval.respond", { requestId: approval.id, decision: "decline" })}>Decline</button><button class="danger-button" onclick={() => action("approval.respond", { requestId: approval.id, decision: "accept" })}>Accept</button></div>{/if}</article>{/each}</section>{/if}
        <div class="coordinator-transcript" aria-live="polite">
          {#if loadingConversation}<p>Syncing coordinator history…</p>
          {:else if messages.length}{#each messages as item (item.id)}<article class={item.role}><span>{item.role}</span><p>{compact(item.text)}</p></article>{/each}
          {:else}<p>No coordinator messages are loaded yet.</p>{/if}
        </div>
        <div class="coordinator-composer"><textarea rows="3" maxlength="12000" placeholder="Message Sol…" bind:value={message}></textarea><div><small>Messages may steer an active turn; they do not bypass campaign gates.</small><button class="primary-button" disabled={!message.trim() || Boolean(working)} onclick={() => action("coordinator.message.send", { message })}>{working === "coordinator.message.send" ? "Sending…" : "Send message"}</button></div></div>
        <div class="coordinator-utility"><button class="outline-button compact" disabled={loadingConversation} onclick={() => loadConversation(true)}>Sync history</button>{#if coordinator.status === "working" && coordinator.lastTurnId}<button class="danger-button" disabled={Boolean(working)} onclick={() => action("coordinator.interrupt")}>Interrupt turn</button>{/if}</div>
      {:else}
        <div class="coordinator-boundary"><strong>Attach an existing Codex task</strong><p>Lane Watch will verify workspace eligibility before attaching it as the campaign’s semantic coordinator.</p></div>
        <button class="primary-button" disabled={Boolean(working)} onclick={discover}>{working === "discover" ? "Finding tasks…" : "Find Codex tasks"}</button>
        {#if candidates}<div class="coordinator-candidates">{#each candidates.filter((candidate) => candidate.eligible !== false).slice(0, 12) as candidate}<button disabled={Boolean(working)} onclick={() => action("coordinator.attach", { threadId: candidate.id })}><strong>{candidate.name}</strong><span>{candidate.cwd}</span></button>{/each}{#if !candidates.some((candidate) => candidate.eligible !== false)}<p>No attachable workspace tasks found.</p>{/if}</div>{/if}
      {/if}
      {#if feedback}<div class="gate-feedback" role="status">{feedback}</div>{/if}
    </div>
  </details>
{/if}
