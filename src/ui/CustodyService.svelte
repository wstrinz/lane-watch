<script lang="ts">
  import { campaignState } from "./campaign-state";
  import { settleCampaignAction, type CampaignProject as Project } from "./campaign-actions";

  let project: Project | null = null;
  let custody: Record<string, any> | null = null;
  let working = "";
  let feedback = "";
  let feedbackKind: "pending" | "success" | "error" = "pending";

  type CustodyVerb = "promote" | "park" | "restore" | "lease.prepare" | "lease.confirm" | "lease.dispatch" | "lease.reconcile" | "lease.simulate" | "lease.replay" | "receipt.land" | "receipt.reject";

  function retryExhausted(item: Record<string, any>): boolean {
    const message = String(project?.loop?.error || "");
    return /automatic retry limit/i.test(message) && (!item.task || message.includes(item.task));
  }

  function itemLeases(item: Record<string, any>): Record<string, any>[] {
    return (custody?.protocol?.leases || []).filter((lease: any) => lease.itemId === item.id);
  }

  function failureInfo(item: Record<string, any>): Record<string, any> {
    const leases = itemLeases(item);
    const informative = [item.receipt, ...leases.map((lease: any) => lease.receipt)]
      .filter(Boolean)
      .sort((left: any, right: any) => (right?.checks?.length || 0) - (left?.checks?.length || 0))[0] || {};
    const lastMeasured = leases.find((lease: any) => Number.isFinite(Number(lease.receipt?.usage?.tokens)))?.receipt?.usage?.tokens;
    if (retryExhausted(item)) return {
      state: "CONTRACT TOO LARGE",
      summary: "Four bounded attempts stopped without landing campaign changes. Lease integrity and the frozen producer blobs were verified, but the consolidated replay crossed its token ceiling and combines too many checks for one custody turn.",
      next: "Stop at this boundary. Keep the dependency, then split manifest/provenance verification from the exact replay and resource-scope check.",
      attempts: leases.length,
      tokens: lastMeasured,
      kind: "reshape",
    };
    if (item.capability === "portability" && /macOS|Windows/i.test(`${informative.summary || ""} ${informative.stopReason || ""}`)) return {
      state: "ADAPTER UNAVAILABLE",
      summary: informative.summary || "This Windows steward cannot perform a genuine macOS verification.",
      next: "Park it until a macOS steward is connected. This item is non-blocking and does not need to hold the campaign.",
      attempts: leases.length,
      tokens: lastMeasured,
      kind: "wait-for-mac",
    };
    if (/lease|hash|digest/i.test(`${informative.summary || ""} ${informative.stopReason || ""}`) && !(informative.effects?.changedPaths || []).length) return {
      state: "SAFE TO RETRY",
      summary: informative.summary || "The prior steward stopped before making changes because the old controller supplied an ambiguous lease-hash check.",
      next: "Retry with Terra. The byte-hash instruction and per-turn token meter are now corrected; the same acceptance contract remains in force.",
      attempts: leases.length,
      tokens: lastMeasured,
      kind: "retry",
    };
    return {
      state: "REVIEW REQUIRED",
      summary: informative.summary || item.reason,
      next: "Inspect the exact receipt before retrying or changing this dependency.",
      attempts: leases.length,
      tokens: lastMeasured,
      kind: "review",
    };
  }

  async function stopAtBoundary(): Promise<void> {
    if (!project || working || !["running", "paused", "attention"].includes(project.loop?.status || "")) return;
    working = "loop:stop";
    feedbackKind = "pending";
    feedback = "Stopping autopilot while preserving the current custody boundary…";
    try {
      await settleCampaignAction({ projectId: project.id, type: "loop.stop", scope: "custody-contract-reshape" });
      feedbackKind = "success";
      feedback = "Autopilot stopped here. The failed receipts and dependency remain preserved for contract splitting.";
    } catch (error) {
      feedbackKind = "error";
      feedback = error instanceof Error ? error.message : String(error);
    } finally {
      working = "";
    }
  }

  async function transition(item: Record<string, any>, verb: CustodyVerb, autoDispatch = false): Promise<void> {
    if (!project || working) return;
    if (verb === "park" && item.blocksResearch && !window.confirm("Parking removes this required custody dependency from the active research gate. Continue only if the dependency is no longer wanted.")) return;
    const protocolAction = verb.startsWith("lease.");
    const receiptAction = verb.startsWith("receipt.");
    const type = protocolAction || receiptAction ? `custody.${verb}` : `custody.item.${verb}`;
    const targetId = verb === "lease.prepare" ? item.id : protocolAction ? item.activeLease?.id || "" : item.id;
    const actionTargetId = receiptAction ? item.activeLease?.id || "" : targetId;
    if (!actionTargetId) return;
    working = `${actionTargetId}:${verb}`;
    feedbackKind = "pending";
    feedback = verb === "promote" ? "Checking the immutable custody contract…"
      : verb === "park" ? "Parking this service item…"
      : verb === "restore" ? "Returning this item to the proposed inbox…"
      : verb === "lease.prepare" ? "Freezing the exact revision-bound custody lease…"
      : verb === "lease.confirm" ? "Confirming the exact lease digest…"
      : verb === "lease.dispatch" ? "Creating the detached worktree and starting one Terra steward…"
      : verb === "lease.reconcile" ? "Reconciling the App Server turn and durable custody receipt…"
      : verb === "lease.simulate" ? "Generating a deterministic zero-effect protocol receipt…"
      : verb === "lease.replay" ? "Replaying and verifying the persisted lease and receipt digests…"
      : verb === "receipt.land" ? "Rechecking and landing the exact isolated producer commit…"
      : "Rejecting this receipt without landing its changes…";
    try {
      let result = await settleCampaignAction({
        projectId: project.id,
        type,
        targetId: actionTargetId,
        scope: "custody-service",
        args: verb === "lease.confirm" || verb === "lease.dispatch"
          ? { leaseDigest: item.activeLease?.leaseDigest }
          : verb === "receipt.land" || verb === "receipt.reject"
            ? { receiptDigest: item.activeLease?.receiptDigest, reason: verb === "receipt.reject" ? "Operator rejected the isolated custody result at its landing gate." : undefined }
            : { note: verb === "promote" ? "Operator approved the bounded custody contract for separate steward handoff." : protocolAction ? "Operator exercised the custody lease protocol." : "Operator changed custody inbox disposition." },
      });
      if (verb === "promote" && autoDispatch) {
        const promoted = result.project.custody?.items?.find((candidate: any) => candidate.id === item.id);
        if (promoted?.status === "ready" && !promoted.activeLease) {
          result = await settleCampaignAction({ projectId: project.id, type: "custody.lease.prepare", targetId: item.id, scope: "custody-service-retry" });
        }
        const prepared = result.project.custody?.items?.find((candidate: any) => candidate.id === item.id)?.activeLease;
        if (prepared?.status === "prepared") {
          result = await settleCampaignAction({ projectId: project.id, type: "custody.lease.confirm", targetId: prepared.id, args: { leaseDigest: prepared.leaseDigest }, scope: "custody-service-retry" });
        }
        const confirmed = result.project.custody?.items?.find((candidate: any) => candidate.id === item.id)?.activeLease;
        if (confirmed?.status === "confirmed") {
          await settleCampaignAction({ projectId: project.id, type: "custody.lease.dispatch", targetId: confirmed.id, args: { leaseDigest: confirmed.leaseDigest }, scope: "custody-service-retry" });
        }
      }
      feedbackKind = "success";
      feedback = verb === "promote" && autoDispatch
        ? "A fresh exact lease is running with Terra under the unchanged custody contract."
        : verb === "promote"
        ? "Marked ready. No steward was started and campaign execution was not changed."
        : verb === "park" ? "Item parked outside the active service inbox."
        : verb === "restore" ? "Item restored as a proposed custody contract."
        : verb === "lease.prepare" ? "Immutable lease prepared. No steward has started; review and confirm the exact digest next."
        : verb === "lease.confirm" ? "Exact lease confirmed. The slot is reserved, but no steward has started yet."
        : verb === "lease.dispatch" ? "One Terra steward started inside the lease-bound detached worktree."
        : verb === "lease.reconcile" ? "The interrupted steward state was reconciled into a durable receipt boundary."
        : verb === "lease.simulate" ? "Deterministic zero-effect receipt recorded. The custody item remains ready."
        : verb === "lease.replay" ? "Lease and receipt replay verified with no real effects."
        : verb === "receipt.land" ? "The reviewed custody receipt landed locally. Nothing was pushed and no claim was promoted."
        : "Receipt rejected. Its isolated worktree was not landed.";
    } catch (error) {
      feedbackKind = "error";
      feedback = error instanceof Error ? error.message : String(error);
    } finally {
      working = "";
    }
  }

  $: project = ($campaignState.control?.projects?.find((candidate) => candidate.id === $campaignState.selectedProject) as Project | undefined) || null;
  $: custody = project?.custody || null;
  $: openItems = custody?.items?.filter((item: any) => item.status !== "complete") || [];
</script>

{#if custody}
  <details id="custody-service" class="custody-service" open={custody.counts.open > 0}>
    <summary>
      <span><small>CUSTODY SERVICE</small><strong>{custody.counts.open ? `${custody.counts.open} item${custody.counts.open === 1 ? "" : "s"} in the service inbox` : "Mechanical work has its own boundary"}</strong></span>
      <span class="custody-summary-counts"><b>{custody.counts.blocking} blocking</b><b>{custody.counts.active} active</b><i>SEPARATE EXECUTOR</i></span>
    </summary>
    <div class="custody-body">
      <div class="custody-boundary">
        <div><span>ADAPTER</span><strong>Terra local steward</strong><small>{custody.executorConnected ? "ready on demand · isolated worktree" : "simulation only"}</small></div>
        <p>Terra may repair small mechanical or mathematical mistakes only inside the listed paths and acceptance checks. It cannot choose direction, spawn children, promote claims, merge, or push.</p>
        <div><span>AUTOPILOT RULE</span><strong>Land verified custody</strong><small>active loop may dispatch · only exact landable receipts integrate</small></div>
      </div>

      {#if openItems.length}
        <div class="custody-inbox">
          {#each openItems as item (item.id)}
            {@const failure = failureInfo(item)}
            <article class:blocking={item.blocksResearch} class:parked={item.status === "parked"}>
              <header>
                <div><span>{item.urgency} · {item.capability} · {item.strategicTrack}</span><strong>{item.task}</strong></div>
                <b class={`custody-status-${item.status}`}>{item.status.toUpperCase()}</b>
              </header>
              <p>{item.reason}</p>
              <div class="custody-item-facts">
                <span>{item.blocksResearch ? "BLOCKS RESEARCH" : "NON-BLOCKING"}</span>
                <span>repair generation {item.repairGeneration}/{custody.policy.maxAutomaticRepairGeneration}</span>
                <span>{item.effortClass} effort</span>
                <span>{item.contractComplete ? "contract complete" : "contract incomplete"}</span>
              </div>
              <details class="custody-contract">
                <summary>Inspect acceptance contract <strong>{item.acceptance.receiptType || "receipt missing"}</strong></summary>
                <div><span>ACCEPT WHEN</span><ul>{#each item.acceptance.acceptanceCriteria as criterion}<li>{criterion}</li>{/each}</ul></div>
                <div><span>ALLOWED PATHS</span><code>{item.acceptance.allowedPaths.length ? item.acceptance.allowedPaths.join(" · ") : "No paths declared"}</code></div>
                <div><span>HARD STOP</span><p>{item.acceptance.stopCondition || "No stop condition declared"}</p></div>
              </details>
              {#if ["blocked", "failed"].includes(item.status)}
                <section class={`custody-failure ${failure.kind}`}>
                  <header><span>WHAT HAPPENED</span><strong>{failure.state}</strong></header>
                  <p>{failure.summary}</p>
                  <div><span>RECOMMENDED NEXT</span><b>{failure.next}</b></div>
                  <small>{failure.attempts} lease attempt{failure.attempts === 1 ? "" : "s"}{failure.tokens ? ` · latest measured ${Number(failure.tokens).toLocaleString()} tokens` : ""} · 0 changes landed</small>
                </section>
              {/if}
              {#if ["ready", "assigned", "verifying"].includes(item.status)}
                <div class="custody-protocol-lab execution" class:attention={item.activeLease?.status === "awaiting_review"}>
                  <div>
                    <span>{item.activeLease?.status === "awaiting_review" ? "RECEIPT LANDING GATE" : item.activeLease?.status === "running" || item.activeLease?.status === "finalizing" ? "ISOLATED STEWARD ACTIVE" : "CUSTODY ACTION RAIL"}</span>
                    <strong>{!item.activeLease ? "1. Freeze the exact lease" : item.activeLease.status === "prepared" ? "2. Confirm this revision and contract" : item.activeLease.status === "confirmed" ? "3. Dispatch one bounded Terra steward" : item.activeLease.status === "running" ? "Steward working in detached custody" : item.activeLease.status === "finalizing" ? "Measuring paths, usage, and checks" : item.activeLease.status === "awaiting_review" ? "4. Review and land—or reject" : `Lease ${item.activeLease.status}`}</strong>
                    <small>{item.activeLease?.receiptDigest || item.activeLease?.leaseDigest || "Preparing a lease changes no files and starts no worker."}</small>
                  </div>
                  {#if !item.activeLease}
                    <button class="primary-button compact" disabled={Boolean(working)} onclick={() => transition(item, "lease.prepare")}>{working === `${item.id}:lease.prepare` ? "Freezing…" : "Freeze custody lease"}</button>
                  {:else if item.activeLease.lease?.adapter?.executionMode === "disconnected" && item.activeLease.status === "prepared"}
                    <button class="outline-button compact" disabled={Boolean(working)} onclick={() => transition(item, "lease.simulate")}>{working === `${item.activeLease.id}:lease.simulate` ? "Simulating…" : "Simulate zero-effect receipt"}</button>
                  {:else if item.activeLease.status === "prepared"}
                    <button class="primary-button compact" disabled={Boolean(working)} onclick={() => transition(item, "lease.confirm")}>{working === `${item.activeLease.id}:lease.confirm` ? "Confirming…" : "Confirm exact lease"}</button>
                  {:else if item.activeLease.status === "confirmed"}
                    <button class="primary-button compact" disabled={Boolean(working)} onclick={() => transition(item, "lease.dispatch")}>{working === `${item.activeLease.id}:lease.dispatch` ? "Starting…" : "Dispatch Terra steward"}</button>
                  {:else if ["running", "finalizing"].includes(item.activeLease.status) && Date.now() - Date.parse(item.activeLease.updatedAt || item.activeLease.startedAt || "") >= 60_000}
                    <button class="outline-button compact" disabled={Boolean(working)} onclick={() => transition(item, "lease.reconcile")}>{working === `${item.activeLease.id}:lease.reconcile` ? "Reconciling…" : "Recheck interrupted steward"}</button>
                  {:else if item.activeLease.status === "simulated"}
                    <button class="outline-button compact" disabled={Boolean(working)} onclick={() => transition(item, "lease.replay")}>{working === `${item.activeLease.id}:lease.replay` ? "Verifying replay…" : "Replay & verify receipt"}</button>
                  {/if}
                </div>
                {#if item.activeLease?.status === "awaiting_review"}
                  <div class="custody-receipt-review">
                    <header><div><span>MEASURED RESULT</span><strong>{item.activeLease.receipt?.summary || "Custody result ready"}</strong></div><b>{item.activeLease.receipt?.status}</b></header>
                    <div class="custody-receipt-metrics"><span>{item.activeLease.receipt?.effects?.changedPaths?.length || 0} changed path{item.activeLease.receipt?.effects?.changedPaths?.length === 1 ? "" : "s"}</span><span>{item.activeLease.receipt?.usage?.tokens ?? "unmetered"} tokens</span><span>{Math.ceil(item.activeLease.receipt?.usage?.minutes || 0)} min</span><span>{item.activeLease.verification?.warnings?.length || 0} warning{item.activeLease.verification?.warnings?.length === 1 ? "" : "s"}</span></div>
                    {#if item.activeLease.receipt?.effects?.changedPaths?.length}<code>{item.activeLease.receipt.effects.changedPaths.join(" · ")}</code>{/if}
                    <details><summary>Inspect checks, worktree, and immutable bindings</summary><div><b>Producer</b><code>{item.activeLease.producerCommit || "verification-only · no file commit"}</code><b>Worktree</b><code>{item.activeLease.worktreePath}</code>{#each item.activeLease.receipt?.checks || [] as check}<b>{check.status}</b><p>{check.detail}</p>{/each}</div></details>
                    <footer><button class="outline-button compact" disabled={Boolean(working)} onclick={() => transition(item, "receipt.reject")}>Reject result</button><button class="primary-button" disabled={Boolean(working) || !item.activeLease.verification?.landable} onclick={() => transition(item, "receipt.land")}>{working === `${item.activeLease.id}:receipt.land` ? "Landing…" : item.activeLease.producerCommit ? "Accept & land locally" : "Accept verification receipt"}</button></footer>
                    <small>Landing rechecks the exact receipt and clean checkout, then cherry-picks only the frozen producer commit. It never pushes or promotes a claim.</small>
                  </div>
                {/if}
              {/if}
              <footer>
                {#if item.status === "proposed"}
                  <button class="outline-button compact" disabled={Boolean(working)} onclick={() => transition(item, "park")}>Park</button>
                  <button class="primary-button" disabled={Boolean(working) || !item.eligibleToReady} onclick={() => transition(item, "promote")}>{working === `${item.id}:promote` ? "Checking contract…" : "Mark ready for steward"}</button>
                {:else if item.status === "ready"}
                  <span>{item.activeLease ? "Lease sequence is controlled above." : "Eligible for the separate custody executor; still not dispatched."}</span><button class="outline-button compact" disabled={Boolean(working) || Boolean(item.activeLease)} onclick={() => transition(item, "park")}>Park</button>
                {:else if item.status === "assigned"}
                  <span>Research continues independently while this isolated steward works.</span>
                {:else if item.status === "verifying"}
                  <span>The measured receipt above has no landing authority until you accept it.</span>
                {:else if ["blocked", "failed"].includes(item.status)}
                  <span>{retryExhausted(item) ? "Automatic retries are exhausted. Split or resize this exact contract; parking would bypass the dependency." : item.receipt?.effects?.changedPaths?.length ? "The steward stopped after bounded changes; inspect before retrying." : "Nothing landed. Retry the same bounded contract, or park only if this dependency is no longer wanted."}</span>
                  {#if failure.kind === "reshape"}
                    <div class="custody-footer-actions"><button class="primary-button" disabled={Boolean(working) || !["running", "paused", "attention"].includes(project?.loop?.status || "")} onclick={stopAtBoundary}>{working === "loop:stop" ? "Stopping…" : project?.loop?.status === "stopped" ? "Boundary preserved" : "Stop at this boundary"}</button></div>
                  {:else if failure.kind === "wait-for-mac"}
                    <div class="custody-footer-actions"><button class="primary-button" disabled={Boolean(working)} onclick={() => transition(item, "park")}>Park until macOS is available</button></div>
                  {:else}
                    <div class="custody-footer-actions"><button class="outline-button compact" disabled={Boolean(working)} onclick={() => transition(item, "park")}>{item.blocksResearch ? "Remove dependency…" : "Park"}</button><button class="primary-button" disabled={Boolean(working) || !item.eligibleToRetry} onclick={() => transition(item, "promote", true)}>{working ? "Starting Terra…" : "Retry with Terra"}</button></div>
                  {/if}
                {:else if item.status === "parked"}
                  <span>Outside the active service queue.</span><button class="outline-button compact" disabled={Boolean(working)} onclick={() => transition(item, "restore")}>Restore to inbox</button>
                {/if}
              </footer>
            </article>
          {/each}
        </div>
      {:else}
        <div class="custody-empty"><strong>No custody contracts are queued</strong><p>Future strategy reviews can stage bounded candidates here. Until then, the service has no authority and consumes no resources.</p></div>
      {/if}

      {#if custody.protocol?.leases?.length}
        <details class="custody-protocol-history"><summary>Custody lease and receipt history <strong>{custody.protocol.leases.length} lease{custody.protocol.leases.length === 1 ? "" : "s"}</strong></summary><ol>{#each custody.protocol.leases as lease}<li><span>{lease.status.toUpperCase()}</span><div><strong>{lease.receiptDigest || lease.leaseDigest}</strong><small>{lease.adapterId} · {new Date(lease.createdAt).toLocaleString()}{lease.producerCommit ? " · isolated commit frozen" : lease.verification?.ok ? " · receipt verified" : ""}</small></div></li>{/each}</ol></details>
      {/if}

      {#if custody.violations?.length}
        <div class="custody-violations"><strong>{custody.violations.length} contract warning{custody.violations.length === 1 ? "" : "s"}</strong>{#each custody.violations as violation}<p>{violation.detail}</p>{/each}</div>
      {/if}
      {#if feedback}<div class="custody-feedback {feedbackKind}" role="status">{feedback}</div>{/if}
    </div>
  </details>
{/if}

<style>
  .custody-service { color:#e2ebe5; background:#0a1412; border:1px solid #3b5550; border-radius:13px; margin:-4px 0 12px; scroll-margin-top:90px; }
  .custody-service > summary { display:flex; align-items:center; justify-content:space-between; gap:12px; cursor:pointer; list-style:none; padding:10px 13px; }
  .custody-service > summary::-webkit-details-marker { display:none; }
  .custody-service > summary > span:first-child { display:flex; align-items:baseline; gap:9px; }
  .custody-service > summary small { color:#76bdb5; letter-spacing:.1em; font:760 .53rem/1.2 ui-monospace,monospace; }
  .custody-service > summary strong { font-size:.66rem; }
  .custody-service[open] > summary { border-bottom:1px solid #29423d; }
  .custody-summary-counts { display:flex; align-items:center; gap:6px; color:#859b96; font:.51rem/1 ui-monospace,monospace; }
  .custody-summary-counts b { background:#101f1c; border:1px solid #35534d; border-radius:999px; padding:5px 7px; font-weight:700; }
  .custody-summary-counts i { color:#8bc9c1; letter-spacing:.08em; font-style:normal; font-weight:760; }
  .custody-body { display:grid; gap:8px; padding:11px; }
  .custody-boundary { display:grid; grid-template-columns:minmax(180px,.35fr) 1fr minmax(200px,.4fr); align-items:center; gap:12px; background:#0e1c19; border:1px solid #36544d; border-radius:9px; padding:9px 10px; }
  .custody-boundary > div { display:grid; gap:2px; }
  .custody-boundary span { color:#79bdb4; letter-spacing:.08em; font:760 .5rem/1.2 ui-monospace,monospace; }
  .custody-boundary strong { font-size:.63rem; }
  .custody-boundary small { color:#758d87; font-size:.51rem; }
  .custody-boundary p { color:#91a7a1; border-right:1px solid #29433c; border-left:1px solid #29433c; margin:0; padding:0 12px; font-size:.55rem; line-height:1.45; }
  .custody-inbox { display:grid; gap:7px; }
  .custody-inbox > article { display:grid; gap:7px; background:#0d1815; border:1px solid #314a44; border-left:3px solid #629b91; border-radius:9px; padding:10px; }
  .custody-inbox > article.blocking { border-left-color:#ef8d72; }
  .custody-inbox > article.parked { opacity:.72; border-left-style:dashed; }
  .custody-inbox header { display:flex; align-items:flex-start; justify-content:space-between; gap:12px; }
  .custody-inbox header > div { display:grid; gap:3px; }
  .custody-inbox header span { text-transform:uppercase; color:#74b5ac; letter-spacing:.07em; font:750 .5rem/1.2 ui-monospace,monospace; }
  .custody-inbox header strong { font-size:.7rem; }
  .custody-inbox header b { flex:none; border:1px solid #49635d; border-radius:999px; padding:5px 7px; font:760 .5rem/1 ui-monospace,monospace; }
  .custody-status-proposed { color:#d6bd72; background:#252115; border-color:#75653b !important; }
  .custody-status-ready { color:#9be1b6; background:#14251a; border-color:#4d7d5d !important; }
  .custody-status-assigned { color:#9bc8e6; background:#14212a; border-color:#4a6f88 !important; }
  .custody-status-verifying { color:#e7d18d; background:#292515; border-color:#7b6b3f !important; }
  .custody-status-blocked,.custody-status-failed { color:#efad99; background:#2a1813; border-color:#8a5143 !important; }
  .custody-status-parked { color:#92a19c; }
  .custody-inbox > article > p { color:#96aaa4; margin:0; font-size:.57rem; line-height:1.45; }
  .custody-item-facts { display:flex; flex-wrap:wrap; gap:5px; }
  .custody-item-facts span { color:#81958f; background:#101e1a; border:1px solid #2c443e; border-radius:999px; padding:4px 6px; font:.49rem/1 ui-monospace,monospace; }
  .custody-failure { display:grid; gap:6px; background:#131b18; border:1px solid #3b514b; border-radius:8px; padding:9px 10px; }
  .custody-failure > header { align-items:center; }
  .custody-failure > header span,.custody-failure > div span { color:#82afa7; letter-spacing:.08em; font:760 .48rem/1.2 ui-monospace,monospace; }
  .custody-failure > header strong { color:#d9e3df; font:.55rem/1 ui-monospace,monospace; }
  .custody-failure > p { color:#9cafaa; margin:0; font-size:.55rem; line-height:1.45; }
  .custody-failure > div { display:grid; grid-template-columns:112px 1fr; gap:8px; border-top:1px solid #31453f; padding-top:6px; }
  .custody-failure > div b { color:#d8e2dd; font-size:.55rem; line-height:1.4; }
  .custody-failure > small { color:#7f938d; font:.48rem/1.35 ui-monospace,monospace; }
  .custody-failure.reshape { background:#211b11; border-color:#866840; }
  .custody-failure.reshape > header strong,.custody-failure.reshape > div span { color:#e0c77c; }
  .custody-failure.retry { background:#102019; border-color:#47705b; }
  .custody-failure.retry > header strong,.custody-failure.retry > div span { color:#9bd6ac; }
  .custody-failure.wait-for-mac { background:#111b21; border-color:#476273; }
  .custody-failure.wait-for-mac > header strong,.custody-failure.wait-for-mac > div span { color:#9dc3da; }
  .custody-contract { background:#0a1311; border:1px solid #293f3a; border-radius:7px; padding:7px 8px; }
  .custody-contract > summary { display:flex; justify-content:space-between; gap:8px; color:#a4b9b3; cursor:pointer; font-size:.54rem; }
  .custody-contract > summary strong { color:#74aaa3; font:700 .49rem/1.3 ui-monospace,monospace; }
  .custody-contract > div { display:grid; grid-template-columns:90px 1fr; gap:7px; border-top:1px solid #223630; margin-top:6px; padding-top:6px; }
  .custody-contract > div > span { color:#72aaa2; letter-spacing:.07em; font:740 .49rem/1.3 ui-monospace,monospace; }
  .custody-contract ul { margin:0; padding-left:15px; }
  .custody-contract li,.custody-contract p,.custody-contract code { color:#8fa39d; margin:0; font-size:.51rem; line-height:1.4; }
  .custody-contract code { overflow-wrap:anywhere; }
  .custody-protocol-lab { display:grid; grid-template-columns:1fr auto; align-items:center; gap:8px; background:#111722; border:1px solid #3b4d66; border-radius:7px; padding:8px; }
  .custody-protocol-lab.execution { background:#101b19; border-color:#3d6259; }
  .custody-protocol-lab.attention { background:#211f13; border-color:#796b3d; }
  .custody-protocol-lab > div { display:grid; gap:2px; min-width:0; }
  .custody-protocol-lab span { color:#8eb5e0; letter-spacing:.07em; font:750 .49rem/1.2 ui-monospace,monospace; }
  .custody-protocol-lab strong { font-size:.58rem; }
  .custody-protocol-lab small { overflow:hidden; color:#7e90a5; text-overflow:ellipsis; white-space:nowrap; font:.49rem/1.3 ui-monospace,monospace; }
  .custody-protocol-lab button { min-height:38px; }
  .custody-receipt-review { display:grid; gap:7px; background:#171a10; border:1px solid #76693d; border-radius:9px; padding:9px; }
  .custody-receipt-review > header { display:flex; justify-content:space-between; gap:10px; }
  .custody-receipt-review > header > div { display:grid; gap:3px; }
  .custody-receipt-review > header span { color:#d8bf69; letter-spacing:.08em; font:760 .49rem/1.2 ui-monospace,monospace; }
  .custody-receipt-review > header strong { font-size:.62rem; }
  .custody-receipt-review > header b { color:#e5cf86; font:.52rem/1 ui-monospace,monospace; }
  .custody-receipt-metrics { display:flex; flex-wrap:wrap; gap:5px; }
  .custody-receipt-metrics span { color:#a9ad91; background:#242416; border:1px solid #625c36; border-radius:999px; padding:4px 6px; font:.49rem/1 ui-monospace,monospace; }
  .custody-receipt-review > code,.custody-receipt-review details code { color:#9cad9a; overflow-wrap:anywhere; font:.5rem/1.4 ui-monospace,monospace; }
  .custody-receipt-review details { border-top:1px solid #4a472a; padding-top:6px; }
  .custody-receipt-review details summary { color:#b8b89b; cursor:pointer; font-size:.53rem; }
  .custody-receipt-review details > div { display:grid; grid-template-columns:70px 1fr; gap:5px 7px; margin-top:7px; }
  .custody-receipt-review details b { color:#d0bd73; font:.48rem/1.3 ui-monospace,monospace; }
  .custody-receipt-review details p { color:#999d85; margin:0; font-size:.51rem; line-height:1.35; }
  .custody-receipt-review > footer { display:flex; justify-content:flex-end; gap:6px; }
  .custody-receipt-review > small { color:#8f927a; font-size:.5rem; line-height:1.4; }
  .custody-inbox footer { display:flex; justify-content:flex-end; align-items:center; gap:7px; border-top:1px solid #263b35; padding-top:7px; }
  .custody-inbox footer > span { color:#80948e; margin-right:auto; font-size:.52rem; }
  .custody-inbox footer button { min-height:38px; }
  .custody-footer-actions { display:flex; gap:7px; }
  .custody-empty { display:grid; place-items:center; gap:3px; border:1px dashed #34514b; border-radius:9px; padding:14px; text-align:center; }
  .custody-empty strong { font-size:.65rem; }
  .custody-empty p { color:#849a94; margin:0; max-width:80ch; font-size:.55rem; line-height:1.45; }
  .custody-violations { background:#251d13; border:1px solid #76623c; border-radius:8px; padding:8px; }
  .custody-violations strong { color:#dfc67b; font-size:.58rem; }
  .custody-violations p { color:#b7aa86; margin:3px 0 0; font-size:.52rem; }
  .custody-feedback { border:1px solid #46624f; border-radius:8px; padding:9px; font-size:.58rem; }
  .custody-feedback.success { color:#b5d9c0; background:#112119; }
  .custody-feedback.error { color:#efb4a3; background:#271813; border-color:#8d5545; }
  .custody-feedback.pending { color:#d8ca97; background:#242114; border-color:#76683c; }
  .custody-protocol-history { border-top:1px solid #29423d; padding-top:7px; }
  .custody-protocol-history > summary { display:flex; justify-content:space-between; color:#91a7a1; cursor:pointer; font-size:.55rem; }
  .custody-protocol-history ol { display:grid; list-style:none; gap:4px; margin:7px 0 0; padding:0; }
  .custody-protocol-history li { display:grid; grid-template-columns:72px 1fr; gap:7px; align-items:center; background:#0d1715; border-radius:6px; padding:6px; }
  .custody-protocol-history li > span { color:#8eb5e0; font:740 .49rem/1 ui-monospace,monospace; }
  .custody-protocol-history li > div { display:grid; gap:2px; min-width:0; }
  .custody-protocol-history li strong { overflow:hidden; color:#a5b7c9; text-overflow:ellipsis; white-space:nowrap; font:.51rem/1.2 ui-monospace,monospace; }
  .custody-protocol-history li small { color:#718781; font-size:.48rem; }
  @media (max-width:700px) {
    .custody-service > summary { align-items:flex-start; padding:10px; }
    .custody-service > summary > span:first-child { display:grid; gap:2px; }
    .custody-summary-counts { display:grid; justify-items:end; }
    .custody-summary-counts b { padding:4px 6px; }
    .custody-body { padding:9px; }
    .custody-boundary { grid-template-columns:1fr; }
    .custody-boundary p { border:0; border-top:1px solid #29433c; border-bottom:1px solid #29433c; padding:7px 0; }
    .custody-inbox header { display:grid; }
    .custody-inbox header b { justify-self:start; }
    .custody-contract > summary { display:grid; }
    .custody-contract > div { grid-template-columns:1fr; }
    .custody-failure > div { grid-template-columns:1fr; }
    .custody-inbox footer { display:grid; grid-template-columns:1fr; }
    .custody-inbox footer > span { margin:0; }
    .custody-inbox footer button { width:100%; min-height:46px; }
    .custody-footer-actions { display:grid; grid-template-columns:1fr; width:100%; }
    .custody-protocol-lab { grid-template-columns:1fr; }
    .custody-protocol-lab button { width:100%; min-height:44px; }
    .custody-receipt-review > header { display:grid; }
    .custody-receipt-review details > div { grid-template-columns:1fr; }
    .custody-receipt-review > footer { display:grid; grid-template-columns:1fr; }
    .custody-receipt-review > footer button { width:100%; min-height:46px; }
  }
</style>
