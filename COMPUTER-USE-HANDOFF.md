# Computer Use verification handoff

Captured: 2026-08-26 14:56 CDT

## Objective

Use the bundled `Computer Use` plugin to drive Microsoft Edge against the running
Lane Watch PWA and visually verify the development build. This handoff exists
because the originating task could see the plugin reference but received no
Computer control capabilities, even after the plugin was updated.

## Computer plugin evidence

- Plugin reference: `computer-use@openai-bundled`
- Installed cache version: `26.820.60940`
- Cache updated: 2026-08-26 14:55 CDT
- Manifest and skill are present locally under:
  `C:\Users\wstri\.codex\plugins\cache\openai-bundled\computer-use\26.820.60940`
- Expected skill file exists at:
  `skills\computer-use\SKILL.md`
- In the originating task, the injected tool list contained **zero** tool names
  matching Computer Use, screen, mouse, keyboard, screenshot, or desktop control.
- Plugin Management was available, but only permission, dependency, and uninstall
  operations were exposed; it offered no search, connect, or install operation.

The next task should first confirm that its available skills include the Computer
Use skill and that actual screen/control capabilities are callable. If they are
still absent, the plugin is installed on disk but is not being injected into new
tasks; report that as the remaining client/plugin-host issue without changing
Lane Watch.

## Lane Watch state

- Project: `C:\Users\wstri\dev\math-research\infrastructure\agent-observer`
- Tailnet PWA: <https://desktop-i0p7ic0.tail4f1d0a.ts.net:4317/>
- Local endpoint: <http://127.0.0.1:4317/>
- Scheduled task: `Lane Watch Agent Observer`
- Scheduled-task state at handoff: `Running`
- Health: `ok: true`, 497 lane ledgers, campaign control enabled
- Snapshot counts: 0 working, 0 idle, 61 attention, 436 complete
- Last automated check in the originating task: 18 tests passing, 0 failing

The observer is localhost-bound and exposed through the existing Tailscale Serve
route. Do not replace or clear unrelated Tailscale Serve routes.

## Computer-driven verification

Once Computer Use is available, follow its own `SKILL.md`, then:

1. Inspect the current screen and open Microsoft Edge.
2. Navigate to the tailnet PWA URL above.
3. Confirm the Lane Watch shell renders without horizontal clipping at the current
   window size: header, summary cards, filter tabs, search, project selector, and
   alert control.
4. Click the circular refresh button beside the connection indicator. Confirm the
   control shows a refresh-in-progress state and returns to `Live` without an error.
5. Confirm displayed summary counts populate and agree with a fresh `/api/refresh`
   response. Counts may legitimately have changed since this handoff.
6. Confirm any `working` cards appear before idle, attention, unknown, and complete
   cards. At handoff there were no working lanes, so record that rather than
   manufacturing a test lane.
7. Open one visible lane card and verify its detail dialog is readable, then close it.
8. Exercise the `Attention` and `Recent` filters and return to `Live`.
9. Capture a final screenshot through Computer Use and report concrete observations.

Do not modify application code unless interactive verification reveals a real bug.
If a bug is found and the user asks for a fix, implement it in this project, run
`bun run check`, restart the scheduled observer safely, and re-run the Computer
verification.

## Copy-ready prompt for the next task

> Use [@Computer](plugin://computer-use@openai-bundled) and read its Computer Use
> skill completely. Follow `infrastructure/agent-observer/COMPUTER-USE-HANDOFF.md`:
> drive Edge to the Lane Watch tailnet PWA, click manual refresh, inspect counts,
> ordering, a lane detail dialog, and filters, then capture and report the final
> visual state. Do not change code unless you find a concrete defect.
