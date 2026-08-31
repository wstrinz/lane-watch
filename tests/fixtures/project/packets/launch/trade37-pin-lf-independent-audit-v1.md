# Research launch packet — trade37-pin-lf-independent-audit-v1

**Profile:** `sonnet-worker`. **Base:** `1111111111111111111111111111111111111111`. **Graph effect:** `NONE`.
**Dependencies:** none. **Operator release required:** no.

## Bounded question

Rebuild all 37 corrected pins from a clean Git archive and compare their canonical identities.

## Rationale

The revised packet freezes the audit base and preserves independence.

## Stop condition

Stop after the immutable evidence receipt is written.

## Required evidence

cfg23-research-evidence/v1 receipt with the frozen base digest

Write the immutable receipt to `artifacts/trade37-pin-lf-independent-audit-v1/evidence-receipt.json` using `cfg23-research-evidence/v1`.
Before reporting completion, commit every allowed output—including the final receipt—to this isolated lane branch, then verify `git status --short` is empty. Do not merge, rebase, or push.

Allowed writes:

- `artifacts/trade37-pin-lf-independent-audit-v1/**`

## Frozen operator guidance

Approve the corrected bounded audit at immutable base 1111111111111111111111111111111111111111.

## Scope

Do not run SAT unless the bounded question explicitly authorizes it. Do not merge, push, promote claims, mutate Grand Portage, or launch dependent work. Stop on any contract, custody, dependency, or evidence mismatch.
