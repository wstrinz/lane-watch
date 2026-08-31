# DKC research packet intake

Place an incoming CFG23 research packet at:

```text
C:\Users\wstri\dev\math-research\campaigns\cfg23\packets\queue\YYYY-MM-DD-short-slug.md
```

Lane Watch admits the five newest Markdown files in that directory into the
bounded context registry by content digest. Reception is read-only: the file
does not create a research request, checked plan, schedule, wave, dispatch, or
mathematical claim.

Each packet should state:

1. the question and intended campaign-knowledge delta;
2. dependencies and exact evidence/commit bases;
3. allowed work, resource bounds, prohibited inference, and stop conditions;
4. proposed lanes or branch structure, clearly labeled as proposals; and
5. what counts as useful negative, inconclusive, or contradictory evidence.

After reception, the normal authority chain remains:

```text
packet context -> Sol review -> human plan gate -> frozen schedule
-> human confirmation -> bounded dispatch -> batch evidence intake
-> synthesis -> direction decision
```

CFG23's historical workflow/wave mismatch was explicitly reconciled on
2026-08-31 by aligning the workflow to the already-frozen human decision
boundary. The first received DKC packet completed its read-only Sol redirect
review, was explicitly approved by the operator, and then completed a separate
read-only checked-plan pass. Its four exact contracts are now waiting at the
**HUMAN LAUNCH GATE** after explicit plan approval. The packet itself is
preserved at commit `09036820f3354426addf25986fe3ab50d2136e72`, and the four
launch contracts are frozen at `c7af2777ec959413e6a0819607554e1b27752c0b`.
The confirmed schedule dispatched only the asymmetric supply lab and kept the
other three contracts parked. That worker has now landed an `INCONCLUSIVE`
receipt: the existing custodied corpus supplies 11 exact, pairwise-
nonisomorphic, trivial-automorphism, fully orientable types, one short of the
packet's 12-type minimum, so the comparative assay correctly did not run. The
receipt and all 26 declared canonical-LF artifact hashes are validated at
branch head `97b7d6513ba4f49bfc75b6b1ddad247a31d287c0` with receipt digest
`sha256:eab8a1a951c5edbe0bc8b1b5dad34bcf903b50cf736fb1b6e0a519d7619755d1`.

The operator accepted that exact receipt through the live landing gate on
2026-08-31. Run `846eca31-fa53-4a52-a5ca-5a1f7a46888e` is now
`returned_to_sol`, the schedule is `completed`, and CFG23 is `SYNTHESIZING` a
frozen read-only bundle with digest
`sha256:70b81e4cecb5bbc3b692ca73132ee7e5eb0e0e045b440f3d99f5db5c1c0d203b`.
Sol completed the bound synthesis and CFG23 is now `DECISION_REQUIRED` with a
`RESEARCH_REQUIRED` recommendation. Its proposed next wave begins with a
bounded replay/scope repair of the 11-type inventory, then favors row-41 exact
coverage and at most one small C2 forensic under a new resource-safe schedule.
This acceptance and synthesis did not promote a claim, merge, push, or dispatch
a successor.
