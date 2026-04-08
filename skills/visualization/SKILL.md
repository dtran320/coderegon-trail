---
name: Visualization
description: This skill should be used when generating self-contained HTML game files for interactive code learning experiences. Provides guidelines for pixel art aesthetics, retro game mechanics, and educational framework visualization.
version: 1.0.0
---

# Visualization Skill

Generate self-contained HTML files that present code learning as interactive retro-styled games. The primary format is the Coderegon Trail — a pixel art Oregon Trail-inspired game where the user "travels" through a web framework's request pipeline.

## Core Principles

1. **Shared Engine** — Each game HTML defines only its TRAIL_DATA and per-game overrides. The shared `engine.js` at the repo root handles all rendering, state, audio, and UI. No build step. The only CDN dependency is Shiki for syntax highlighting (loaded async with fallback).
2. **Educational** — The game mechanics ARE the learning. Trail stops map to real framework stages. Events are quiz questions in disguise. Party members represent concepts to master.
3. **Retro Aesthetic** — Pixel art, 8-bit color palettes, monospace code panels, CRT scanline effects. Evocative of 1990s educational games.
4. **Actually Fun** — Humor in death messages, satisfying progression, meaningful choices. The game should make you want to finish the trail.

## HTML Generation Guidelines

### Structure

Each game is a thin HTML file (~200-250 lines) that defines game-specific data, then loads `engine.js`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Coderegon Trail — [Framework Name]</title>
</head>
<body>
<div id="game-container">
  <div id="canvas-area">
    <canvas id="game-canvas" width="320" height="200"></canvas>
    <div id="music-indicator">M: Music</div>
  </div>
  <div id="text-panel"></div>
  <div id="status-bar"></div>
</div>

<script>
window.TRAIL_DATA = { /* trail JSON */ };
window.TRAIL_FLAVORS = [ /* travel flavor strings */ ];
window.TRAIL_CONFIG = { mountainColors: { far: '#AA00AA', near: '#FF55FF' } }; // optional
window.drawCustomEventOverlay = function(time) { /* event animations */ };       // optional
</script>
<script src="../engine.js"></script>
</body>
</html>
```

The shared `engine.js` at the repo root contains all CSS, game state machine, canvas rendering, audio, syntax highlighting (Shiki CDN + fallback), UI rendering, input handling, and animation loop. It auto-initializes on load.

### Size Budget

- Per-game HTML: ~200-250 lines (TRAIL_DATA, TRAIL_FLAVORS, TRAIL_CONFIG, drawCustomEventOverlay)
- Shared engine.js: ~1900 lines (all rendering, state, audio, highlighting)

### Code Display

Code snippets shown at trail stops use Shiki (via `https://esm.sh/shiki@3.2.1/bundle/web`) loaded async in `engine.js`. The engine:
- Pre-highlights all stop code blocks on load, caches results by stop name
- Falls back to a basic EGA-color regex highlighter when Shiki hasn't loaded or fails
- Adds `.shiki-rendered` class for Shiki output CSS integration
- Re-renders the current stop when Shiki finishes loading
- Code blocks are clickable to expand full-screen over the canvas (click again to collapse)
- File path headers link to GitHub when `repoUrl` is set in TRAIL_DATA
- Never exceed 25 lines per snippet

### Music Initialization

- Music defaults to OFF (`musicPlaying = false`)
- `ensureAudio()` only initializes the AudioContext — does NOT auto-start music
- Music only starts when the player presses 'M'

### Canvas Rendering

- Use HTML5 Canvas for the landscape, wagon, and pixel art
- Use DOM elements (divs) for UI panels, text, and choices
- This hybrid approach gives pixel art rendering with accessible text
- Target 60fps for smooth scrolling, but throttle to 30fps when idle
- All pixel art is drawn programmatically — no image assets

### Responsive Design

- Minimum width: 800px
- Maximum width: 1200px
- Center the game on the page
- Scale canvas with devicePixelRatio for crisp pixels
- Fixed aspect ratio: 16:10

## Trail Data Format

Trail data is defined as `window.TRAIL_DATA` in the game HTML file. The @frontend-design agent receives this data and embeds it.

```javascript
const TRAIL_DATA = {
  framework: "nextjs",
  trailName: "The App Router Trail",
  repoUrl: "https://github.com/owner/repo",  // optional — links file paths to GitHub
  stops: [
    {
      name: "Independence, MO",
      subtitle: "The Starting Point",
      concept: "Project initialization and entry point",
      code: {
        file: "app/layout.tsx",
        startLine: 1,
        endLine: 20,
        content: "// actual code here...",
        language: "typescript"
      },
      narration: "Every Next.js app starts with a root layout...",
      landmarkType: "town"  // town | mountain | river | forest | desert | camp
    }
  ],
  events: [
    {
      type: "weather",        // weather | river | encounter | misfortune | fortune
      trigger: "after_stop",  // after_stop | random | milestone
      triggerStop: 2,
      title: "Storm Warning!",
      text: "A storm is coming — your middleware is throwing unhandled errors!",
      choices: [
        { text: "Add try-catch to each handler", correct: false, explanation: "..." },
        { text: "Use a global error middleware", correct: true, explanation: "..." },
        { text: "Ignore it and hope for clear skies", correct: false, explanation: "..." }
      ],
      concept: "Error handling patterns",
      difficulty: "easy"
    }
  ],
  partyMembers: [
    { name: "Server Components", icon: "server", maxHealth: 3 },
    { name: "File Router", icon: "router", maxHealth: 3 },
    { name: "Layouts", icon: "layout", maxHealth: 3 },
    { name: "Data Fetching", icon: "data", maxHealth: 3 }
  ],
  deathMessages: [
    "Here lies your app. It died of unhandled promise rejections.",
    "Lost in the middleware — never found the route handler."
  ]
};
```

## Game State Machine

The game progresses through these states:

| State | Description | Transitions To |
|-------|------------|----------------|
| TITLE | Title screen with pixel art logo | SETUP |
| SETUP | Pick framework (if not pre-selected), name party | TRAVEL |
| TRAVEL | Wagon moving between stops, scrolling landscape | STOP, EVENT |
| STOP | At a trail stop — show code, narration | TRAVEL, EVENT |
| EVENT | Quiz/decision event — weather, river, encounter | TRAVEL, DEATH |
| RIVER | Special river crossing event (major boundary) | TRAVEL, DEATH |
| DEATH | Game over — tombstone with death message | TITLE |
| WIN | Arrived at Response Frontier — score card | TITLE |

## Scoring

| Action | Points |
|--------|--------|
| Correct answer | +10 health, +1 morale streak |
| Partial answer | +5 health |
| Wrong answer | -15 health, reset morale streak, party member takes damage |
| Hint used | -1 supply |
| Streak bonus (3+) | +5 bonus per correct in streak |
| Party member death | Permanent — cannot answer questions about that concept |

## References

- `references/coderegon-trail.md` — Complete game mechanics and event catalog
- `references/pixel-art-style.md` — Visual style guide, color palette, layout specs
- `references/framework-trails.md` — Per-framework trail definitions with stops, events, and quiz data
