<script lang="ts">
  import { campaignState } from "./campaign-state";

  let project: Record<string, any> | null = null;
  let copied = false;

  function filename(path: string): string {
    return path.replaceAll("\\", "/").split("/").at(-1)?.replace(/\.md$/i, "") || path;
  }

  function shortDigest(value: string): string {
    return value.replace(/^sha256:/, "").slice(0, 12);
  }

  async function copyDropPath(): Promise<void> {
    if (!project || !navigator.clipboard) return;
    const root = String(project.root || "").replace(/[\\/]$/, "");
    await navigator.clipboard.writeText(`${root}\\packets\\queue`);
    copied = true;
    setTimeout(() => copied = false, 1600);
  }

  $: project = $campaignState.control?.projects?.find((item) => item.id === $campaignState.selectedProject) || $campaignState.control?.projects?.[0] || null;
  $: packets = (Array.isArray(project?.context?.sources) ? project.context.sources : [])
    .filter((source: any) => source.role === "queue-plan")
    .sort((a: any, b: any) => String(b.modifiedAt || "").localeCompare(String(a.modifiedAt || "")));
  $: recoveryHold = Boolean(project?.controlState?.recovery?.required);
  $: intakeState = !packets.length ? "WAITING FOR PACKET" : recoveryHold ? "STAGED · CONTROL HOLD" : "STAGED FOR REVIEW";
  $: dropPath = project ? `campaigns/${project.id}/packets/queue/` : "campaigns/<project>/packets/queue/";
</script>

{#if project}
  <section class="packet-inbox" id="packet-inbox" aria-label="Research packet inbox">
    <header>
      <div><p>RESEARCH PACKET INBOX</p><h2>Drop context here; promote it through explicit gates</h2><span>A packet may shape the next plan. It cannot dispatch, adopt a wave, or become mathematical authority by appearing here.</span></div>
      <strong class:hold={recoveryHold}>{intakeState}</strong>
    </header>

    <div class="packet-drop">
      <div><span>WATCHED DROP POINT</span><code>{dropPath}</code><small>The context registry hashes the five newest Markdown packets on its next observation pass.</small></div>
      <button class="outline-button compact" onclick={copyDropPath}>{copied ? "Copied" : "Copy full path"}</button>
    </div>

    <div class="packet-intake-grid">
      <section>
        <div class="packet-section-title"><span>RECEIVED CONTEXT</span><strong>{packets.length}/5 bounded slots</strong></div>
        {#if packets.length}
          <ol class="packet-list">
            {#each packets as packet, index (packet.id)}
              <li class:newest={index === 0}>
                <span>{index === 0 ? "NEWEST" : `QUEUE ${index + 1}`}</span>
                <div><strong>{filename(packet.path)}</strong><small>{new Date(packet.modifiedAt).toLocaleString()} · {Number(packet.bytes || 0).toLocaleString()} bytes</small></div>
                <code title={packet.sha256}>{shortDigest(packet.sha256)}</code>
              </li>
            {/each}
          </ol>
        {:else}
          <p class="packet-empty">No queue packets are currently in the bounded context window.</p>
        {/if}
      </section>

      <section class="packet-contract">
        <div class="packet-section-title"><span>MINIMUM PACKET CONTRACT</span><strong>Markdown · context only</strong></div>
        <ol>
          <li><b>1</b><span><strong>Question and intended delta</strong><small>What should change in campaign knowledge if the work succeeds?</small></span></li>
          <li><b>2</b><span><strong>Dependencies and exact evidence base</strong><small>Name required receipts, commits, or unresolved gates.</small></span></li>
          <li><b>3</b><span><strong>Allowed work and stop conditions</strong><small>Bound scope, resources, prohibited inference, and honest failure.</small></span></li>
          <li><b>4</b><span><strong>Proposed lanes, never authority</strong><small>Sol review and later human confirmation compile any launch contract.</small></span></li>
        </ol>
      </section>
    </div>

    <footer class:hold={recoveryHold}>
      <b>{recoveryHold ? "RECEIVE-ONLY BOUNDARY" : "READY FOR SEMANTIC REVIEW"}</b>
      <span>{recoveryHold ? "CFG23 can receive and hash the packet now, but recovery must be resolved before it can become a checked plan." : "The packet is visible to the next bounded Sol planning turn; launch gates remain separate."}</span>
    </footer>
  </section>
{/if}
