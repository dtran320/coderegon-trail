# PR Trail — Theming Reference

Theming overrides for PR-sourced O'Reorg Trail games. When `TRAIL_DATA.trailTheme === "pr"`, the visualization skill consults this reference for PR-specific copy, colors, and icons.

## Title Screen

- Logo: "O'REORG TRAIL" (unchanged)
- Subtitle: **"A PR Review Adventure"** (not "A [Framework] Learning Adventure")
- Trail name from PR title: "The {Key Concept} Trail"

## Win Destination

- Destination name: **"The Merge Frontier"** (not "Response Frontier")
- Win banner: "YOU MADE IT TO THE MERGE FRONTIER!"
- Win message: "Your PR has been thoroughly reviewed and is ready to merge."

## Wagon Flag Color

- PR trails use GitHub purple: `#6f42c1`
- Framework trails keep their default flag color

## Party Member Icons

PR party members represent domains/layers touched by the PR, not framework concepts. Use geometric shapes to distinguish them:

| Domain Type | Icon Shape | Color |
|------------|-----------|-------|
| api | Diamond ◆ | `#58a6ff` (blue) |
| service | Circle ● | `#f78166` (orange) |
| data | Square ■ | `#d2a8ff` (purple) |
| test | Triangle ▲ | `#7ee787` (green) |
| ui | Star ★ | `#ff7b72` (red) |
| config | Hexagon ⬡ | `#79c0ff` (light blue) |
| auth | Shield 🛡 | `#ffa657` (amber) |
| general | Dot ● | `#8b949e` (grey) |

Draw these as simple filled shapes in the canvas party portrait area (16x16 pixel grid).

## Death Messages

### Universal PR Death Messages (always included)

1. "Died of merge conflicts. Nobody resolved them in time."
2. "Your PR was mass-approved without review. The bugs were fatal."
3. "Starved waiting for CI to pass. The pipeline timed out."

### Additional PR-Themed Death Messages (mix in with PR-specific ones)

4. "Lost in a rebase gone wrong. The commits were never seen again."
5. "Buried under a mountain of review comments."
6. "Died of scope creep. The PR grew too large to review."
7. "The force push wiped out everyone's local branches."
8. "Killed by a flaky test. It passed locally but failed in CI."
9. "Your branch diverged too far from main. No way back."
10. "Died waiting for the required approvals. Nobody was online."

## Narration Framing

PR trails use different framing language than framework trails:

| Framework Trail | PR Trail |
|----------------|----------|
| "Follow a request through the pipeline" | "Travel through the codebase changes in this PR" |
| "This stage of the request..." | "This change group..." |
| "The framework handles..." | "The author chose to..." |
| "Response Frontier" | "Merge Frontier" |
| "request pipeline" | "code review journey" |
| "framework concepts" | "PR domains" |

## Score Card (Win Screen)

```
╔══════════════════════════════════════════╗
║   YOU MADE IT TO THE MERGE FRONTIER!    ║
╠══════════════════════════════════════════╣
║                                          ║
║  PR: #{number} — {title}                ║
║  Party Survivors: N/4                    ║
║    [status icon] [Name] ([health])       ║
║    ... (for each party member)           ║
║                                          ║
║  Quiz Score: X/Y (Z%)                   ║
║  Hints Used: N                           ║
║  Streak Best: N in a row                 ║
║  Stops Examined: N/M                     ║
║                                          ║
║  Domains Mastered:                       ║
║    ★★★ [domain] (all correct)           ║
║    ★★☆ [domain] (mostly correct)        ║
║    ★☆☆ [domain] (needs work)            ║
║    ☆☆☆ [domain] (party member died)     ║
║                                          ║
║  "Ready to approve — LGTM!"             ║
╚══════════════════════════════════════════╝
```

## Landscape Theming

PR trails optionally adjust the landscape palette to feel more "code review" themed:

- Sky gradient: slightly cooler tones (dawn blue → twilight purple)
- Ground color: dark charcoal (`#1e1e1e` — like a code editor background) with lighter trail
- Trees can include occasional "code block" shapes (rectangular canopy instead of triangular)
- Wagon flag: GitHub purple `#6f42c1`

These are suggestions for the visualization skill — the core landscape rendering is unchanged.

## Stop Subtitle Format

Framework trail stops show pipeline stages ("The Entry Point", "Middleware Pass"). PR trail stops show the change group context:

| Framework Trail Subtitle | PR Trail Subtitle |
|-------------------------|-------------------|
| "The Entry Point" | "PR Overview" |
| "Middleware Pass" | "Core Logic Changes" |
| "Route Resolution" | "API Surface Changes" |

PR stop subtitles should describe the nature of the change group: "Authentication Refactor", "New Endpoint", "Schema Migration", "Test Coverage", etc.
