# Streaming request accounting and installed CLI probe

5 September 2026. Request-boundary engineering; production launch holds remain.

The streaming transport reserves before HTTP, relays SSE bytes and pings as
received under backpressure, and inspects bounded incremental UTF-8 events.
Only a complete message start/delta/stop sequence followed by clean EOF settles
usage. Delta output counts are cumulative, not additive. An error, cancellation,
unknown event, invalid framing, open content block or truncated stream retains
the original reservation. Reported overrun or unexpected multi-attempt usage
holds further admission durably. The same multi-attempt hold now covers the
non-streaming transport. No raw prompt or provider credential is stored by the
accounting implementation.

The transport forwards supported request fields and supplied capability headers
without stripping them. It rejects unsupported requests as a whole. The current
implementation is deliberately version-scoped: explicit client tools and
context clearing are supported; server tools, server compaction, fallback and
unreviewed options are not yet admitted. It is not a generally compatible proxy.

## Validation

Nineteen tests pass, 1,834 assertions, 1.85 seconds on Bun 1.3.14; TypeScript is
clean. The parser is exercised at every byte split and byte-by-byte, including
UTF-8 and CRLF boundaries. Local HTTP fixtures verify ping delivery before
completion, cumulative settlement, cancelled/truncated/error streams, a stalled
unread stream reaching its local deadline, context-field preservation, refusal
of server compaction/fallback, and admission holds after output overrun or
unexpected multi-attempt usage. The previous durable/reopen/concurrency checks
also pass. This proves no process-tree shutdown or provider cancellation bound.

The installed native CLI completed a foreground, tool-free, `--bare` request
through an isolated local gateway and fake upstream at 12:53:19.633 UTC:

- Supplied session 10b77c10-826a-4cd2-9180-32b66fd400f9 matched its request header.
- No upstream entry occurred before the fixture's explicit release.
- Exactly one request reserved its declared 32,000 maximum before transmission.
- The fake provider's completed stream settled seven output units and reported
  ten input units separately; no cache usage was invented.
- The CLI returned the expected fixture text with exit code zero. The child
  exited, both local servers stopped and the isolated budget database closed.

The probe uses a dummy API key, isolated configuration, no tools and a local
fake provider. It neither changes real credentials nor calls a real model.
It verifies foreground routing and stream compatibility, not the production
background daemon, subscription authentication, research profile, subagents,
no-bypass process ownership, monitor-ready lease protocol or deadline shutdown.

All five probe records are retained in 2026-09-05-native-stream-probes.json.
The first invocation accidentally supplied its prompt to the variadic MCP
option; the initial harness classified that terminal error as an observation
timeout. The improved harness records early exit and stderr. Adding the option
terminator fixed the invocation. Subsequent refusals identified native
context_management/clear_thinking_20251015. This documented non-generating
clearing operation was admitted intact; the final probe then passed. Failed
probes made zero fake-upstream calls and spent no reservation.

## Source findings and remaining integration

The [streaming reference](https://platform.claude.com/docs/en/build-with-claude/streaming)
defines the event sequence and cumulative delta usage. The inspector relies on
that accounting sequence while preserving content bytes independently.

[Server fallback documentation](https://platform.claude.com/docs/en/build-with-claude/refusals-and-fallback)
shows that one request may contain multiple generation attempts and that
usage.iterations records them. A final model's output counter cannot silently
stand for every attempt. Support needs a reviewed bound over the full attempt
chain; no refusal bypass or fallback behavior is implemented here.

[Context editing documentation](https://platform.claude.com/docs/en/build-with-claude/context-editing)
distinguishes clearing prior tool/thinking content before model input from
summary-generating compaction. Only the two documented clearing strategies are
admitted by this checkpoint.

Next bind this request boundary into the actual background prepare/monitor/
release protocol using the exact persisted launch identity. Verify inherited
routing and accounting for every owned child, preserve subscription/profile
semantics, and supervise monitor/process-tree lifetime. The local 30-second I/O
bound and abort are not the worker deadline controller. App Server custody
remains separate. No new epoch, cap or production launch is authorized.
