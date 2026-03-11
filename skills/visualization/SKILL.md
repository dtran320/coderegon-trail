---
name: Visualization
description: This skill should be used when generating self-contained HTML game files for interactive code learning experiences. Provides guidelines for pixel art aesthetics, retro game mechanics, and educational framework visualization.
version: 1.0.0
---

# Visualization Skill

Generate self-contained HTML files that present code learning as interactive retro-styled games. The primary format is the Coderegon Trail — a pixel art Oregon Trail-inspired game where the user "travels" through a web framework's request pipeline.

## Core Principles

1. **Self-Contained** — Every game is a single HTML file with inline CSS, JS, and assets. No external dependencies. No CDN links. No build step.
2. **Educational** — The game mechanics ARE the learning. Trail stops map to real framework stages. Events are quiz questions in disguise. Party members represent concepts to master.
3. **Retro Aesthetic** — Pixel art, 8-bit color palettes, monospace code panels, CRT scanline effects. Evocative of 1990s educational games.
4. **Actually Fun** — Humor in death messages, satisfying progression, meaningful choices. The game should make you want to finish the trail.

## HTML Generation Guidelines

### Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Coderegon Trail — [Framework Name]</title>
  <style>/* All CSS inline */</style>
</head>
<body>
  <canvas id="game"></canvas>
  <div id="ui"><!-- Game UI overlays --></div>
  <script>/* All JS inline — game engine, data, rendering */</script>
</body>
</html>
```

### Size Budget

- Target: 2000-3000 lines total
- Canvas rendering: ~400-600 lines (landscape, wagon, sprites)
- Game state machine: ~300-400 lines
- UI / event handling: ~300-400 lines
- Trail data (stops, events, quizzes): ~400-600 lines
- Code display + syntax highlighting: ~200-300 lines
- CSS: ~200-300 lines

### Code Display

Code snippets shown at trail stops MUST:
- Use a monospace font (system monospace stack)
- Have basic syntax highlighting (keywords, strings, comments — 3-4 colors max)
- Show file path and line range as a header
- Be readable at the game's resolution
- Never exceed 25 lines per snippet

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

Trail data is injected as a JavaScript object. The @frontend-design agent receives this data and embeds it in the HTML.

```javascript
const TRAIL_DATA = {
  framework: "nextjs",
  trailName: "The App Router Trail",
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
