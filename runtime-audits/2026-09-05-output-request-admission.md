# Output request admission checkpoint

5 September 2026. Engineering only; no research or custody launch is enabled.

The user selected output tokens for the next enforced budget, with input/cache
reported separately. The existing native receipts and exhausted epoch keep
their original units and values.

`OutputRequestBudget` freezes a lease/launch digest, output cap and deadline in
an isolated SQLite store. An immediate transaction reserves each request's
maximum before transport. Other children and connections see that reservation.
A missing reply retains the maximum across restart. Reusing a request identity
never permits another send. Complete, exactly bound terminal usage releases
only unused output allowance; separate input/cache fields cannot replenish it.
Conflicting receipts are rejected. A reported provider-ceiling violation holds
all future admission durably. No reset, cap increase or forced retry API exists.

`BudgetedMessageTransport` exercises this boundary with actual HTTP requests.
It serializes and hashes a frozen payload, reserves first, then makes one POST
with no redirect or retry. It accepts only bounded non-streaming plain Messages
requests. Its request/response sizes are bounded at 1/4 MiB. A transport error,
truncated response or missing terminal usage retains the reservation. The local
I/O timeout is at most 30 seconds and no later than the recorded deadline at
entry; aborting local waiting does not establish provider or worker shutdown.

## Validation

Bun 1.3.14: nine tests, 49 assertions, passing in 0.682 seconds before final
configuration-copy hardening. The final rerun is recorded in the queue ledger.
Tests use isolated temporary databases and loopback fake-provider servers:
reservation visible at HTTP entry; overlapping child allowance refusal;
terminal settlement; two database connections; reopen after a truncated reply;
duplicate and conflicting receipts; invalid counts/deadlines; redirect refusal;
unsupported streaming; and durable hold after an observed provider overrun.
TypeScript passed. No provider/model call, credential read, CLI worker, live
campaign database write or backend restart occurred.

## Supported source boundary and next integration

The [Messages API reference](https://platform.claude.com/docs/en/api/http/messages/create)
describes `max_tokens` as the per-request generation maximum. This supports
reserving that maximum; it does not prove the historical CLI counter or the
coverage of all requests made by an agent.

The current [gateway overview](https://code.claude.com/docs/en/llm-gateway)
documents routing with `ANTHROPIC_BASE_URL`. A base URL alone can retain the
saved subscription credential; configuring a gateway credential instead changes
the account used. No authentication or billing configuration was changed here.

The [gateway compatibility guide](https://code.claude.com/docs/en/llm-gateway-protocol)
requires live streaming and preservation of feature fields and capability
headers. It documents session/agent attribution headers and a beta query on the
Messages path. These are concrete requirements for the next adapter, not
features of this limited transport. The native launcher currently invokes
`--bg` through `tools/local_agent_coord.ps1` without this request boundary.

Next: implement the native-compatible streaming gateway, bind every request to
the exact prepared launch/session and monitor-ready release, and exercise the
installed CLI against a bounded local fake upstream. Preserve subscription and
profile semantics; do not replace the campaign's native multi-agent profile with
this plain-message fixture. Establish no bypass by owned children, safe stream
settlement, monitor crash/hang supervision and exact process-tree deadline
stopping. The App Server custody route remains a separate integration obligation.
Both production holds remain active. This checkpoint implements request
accounting and a candidate transport, not end-to-end runtime enforcement.
