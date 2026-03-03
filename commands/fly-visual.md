---
description: "Launch an O'Reorg Trail game to learn a web framework's request pipeline — or review a PR"
argument-hint: "[next | rails | django | express | react | laravel | openclaw | PR# | PR-URL | git-range]"
allowed-tools:
  - Bash(git:*)
  - Bash(gh:*)
  - Bash(say:*)
  - Bash(afplay:*)
  - Bash(curl:*)
  - Bash(${CLAUDE_PLUGIN_ROOT}/scripts/*:*)
  - Read
  - Grep
  - Glob
  - Task
  - Skill
  - Write
model: opus
---

# Fly Visual — O'Reorg Trail Game

You generate and launch a retro pixel art Oregon Trail-style game that teaches a web framework's request pipeline — or reviews a pull request. The game is a self-contained HTML file opened in the browser.

**User input:** "$ARGUMENTS"

Use the `visualization` skill for game generation guidelines. Follow the trail data in `skills/visualization/references/framework-trails.md` for framework trails, and `skills/visualization/references/pr-trail.md` for PR trails.

## Step 1: Parse Arguments and Determine Mode

Parse the user's input. **Check for PR inputs first** (before framework name matching):

| Input | Detection | Mode | Action |
|-------|-----------|------|--------|
| `123` (purely numeric) | PR number | PR | → pr-trail-extractor |
| URL containing `/pull/` | PR URL | PR | → pr-trail-extractor (extract PR number from URL) |
| Contains `..` (e.g., `main..feature`) | Git range | PR | → pr-trail-extractor |
| `HEAD~N` pattern | Recent commits | PR | → pr-trail-extractor |
| `next`, `nextjs`, `next.js` | Framework name | Framework | The App Router Trail |
| `rails`, `ruby`, `ror` | Framework name | Framework | The Convention Trail |
| `django`, `python` | Framework name | Framework | The WSGI Wagon Trail |
| `express`, `node` | Framework name | Framework | The Middleware Prairie |
| `react`, `vite` | Framework name | Framework | The Component Canyon |
| `laravel`, `php` | Framework name | Framework | The Artisan Trail |
| `openclaw`, `claw`, `gateway` | Framework name | Framework | The Gateway Trail |
| (empty) | No input | Framework | Auto-detect from repo |

### Auto-Detection (if no framework specified)
Spawn a `trail-data-extractor` agent (via Task tool, subagent_type: general-purpose) to detect the framework from the current repository. If detection confidence is low, ask the user to specify.

## Step 2: Extract Trail Data

### For PR Inputs (PR number, URL, git range, HEAD~N)
1. Spawn a `pr-trail-extractor` agent (via Task tool, subagent_type: general-purpose)
2. Pass the PR source (number, URL, or range) to the agent
3. Agent fetches the diff, groups changes, and returns a TRAIL_DATA JSON block with `trailTheme: "pr"`
4. Parse the returned JSON

### For Canonical Trails (framework specified by name)
1. Read `skills/visualization/references/framework-trails.md`
2. Extract the trail data for the specified framework
3. Format it as the TRAIL_DATA JSON structure defined in the visualization skill

### For Repo Analysis (auto-detected or Phase 3)
1. Spawn a `trail-data-extractor` agent (via Task tool, subagent_type: general-purpose)
2. Agent analyzes the repo and returns a TRAIL_DATA JSON block
3. Parse the returned JSON

## Step 3: Generate the HTML Game

Use the `frontend-design` skill (via Skill tool) to generate the complete HTML game file.

Provide the frontend-design skill with these instructions:

---

**Generate a self-contained HTML file for the O'Reorg Trail game.**

### Game Requirements

1. **Single HTML file** — all CSS, JavaScript, and game data inline. No external dependencies.
2. **Canvas + DOM hybrid** — use Canvas for the scrolling landscape and wagon animation, DOM for UI panels (code display, narration, choices, status bar).
3. **Game state machine** — implement states: TITLE, SETUP, TRAVEL, STOP, EVENT, RIVER, DEATH, WIN
4. **Pixel art aesthetic** — follow the style guide in the visualization skill references

### Trail Data

Embed this trail data as a JavaScript constant:

```javascript
const TRAIL_DATA = {TRAIL_DATA_JSON};
```

### Screen Layout

```
┌─────────────────────────────────────────────┐
│  Scrolling landscape with parallax          │  40% height — Canvas
│  Mountains (0.3x) → Trees (0.6x) → Ground  │
│  Wagon centered on trail                    │
├─────────────────────────────────────────────┤
│  Code panel OR narration OR event choices   │  45% height — DOM
├─────────────────────────────────────────────┤
│  Health bar | Supplies | Morale | Party     │  15% height — DOM
│  Stop N of M — Current Stop Name            │
└─────────────────────────────────────────────┘
```

### Game Flow Implementation

**Title Screen:**
- "O'REORG TRAIL" in pixel-style text (bold monospace, letter-spacing)
- Framework trail name as subtitle
- Scrolling landscape animation behind title
- "Click to begin" prompt

**Setup Phase:**
- Show 4 party members with their concept names
- Each has a pixel portrait (simple colored square icons)
- Player can rename (optional) or keep default names
- Difficulty selection: Settler / Adventurer / Trail Blazer
- "Hit the trail!" button

**Travel Animation:**
- Wagon scrolls across landscape (2-3 seconds)
- Parallax scrolling: 3 layers at different speeds
- Day counter and progress indicator update
- Random travel flavor text

**Stop Phase:**
- Arrival banner with stop name
- Code panel: dark background, monospace, syntax-highlighted
- Basic syntax highlighting: keywords (pink), strings (yellow), comments (blue-grey)
- File path header above code
- Narration text below code in styled panel
- Three interaction choices: Continue / Examine / Ask about...

**Event Phase:**
- Gold-bordered event panel
- Event title and narrative text
- 3 choice buttons (A, B, C style)
- On answer: green/red flash, explanation text, health/party updates
- Smooth transitions between states

**River Crossing (special event):**
- Animated river in the landscape
- Higher-stakes presentation (dramatic text)
- Same choice mechanic but with more dramatic feedback

**Death Screen:**
- Dark overlay fade
- Pixel tombstone (drawn with CSS box-shadow or canvas)
- Death message typewriter animation
- Score summary (partial)
- "Click to try again"

**Win Screen:**
- Celebration (CSS confetti/sparkle animation)
- Full score card with stats
- Concept mastery breakdown (stars)
- Personalized study recommendation
- "Play again" button

### Canvas Rendering

Draw these procedurally (no images):
- **Sky**: linear gradient, changes with progress (dawn → day → sunset → night)
- **Mountains**: triangle shapes at varying sizes, parallax layer
- **Trees**: simple triangle-on-rectangle pine trees, scattered
- **Ground**: brown trail strip with green grass
- **Wagon**: rectangle body, circle wheels, triangle canvas top, small flag
- **River**: animated blue band with sine-wave edges (for river crossings)

### Syntax Highlighting

Simple regex-based highlighting for the code panel:
```javascript
function highlight(code, language) {
  // Keywords: pink (#ff79c6)
  // Strings: yellow (#f1fa8c)
  // Comments: muted blue (#6272a4)
  // Numbers: purple (#bd93f9)
  // Default: off-white (#f8f8f2)
}
```

Support: `typescript`, `ruby`, `python`, `javascript`, `php`

### Status Bar

- Health bar: colored fill (green > yellow > red based on level)
- Supplies count with icon
- Morale stars (★)
- Party member names with health indicators (green/yellow/red/grey+strikethrough)
- Progress: "Stop N of M — [stop name]"

### Scoring Logic

- Correct answer: +10 health, +1 morale streak
- Wrong answer: -15 health, reset streak, damage to related party member
- Hint used: -1 supply
- Streak of 3+: +5 bonus health per correct
- Party member: 3 HP each, 0 = dead

### Keyboard Support

- `1`, `2`, `3` or `A`, `B`, `C` to select choices
- `Enter` or `Space` to continue/advance
- `H` for hint (costs 1 supply)
- `M` to toggle sound
- `Escape` to pause

### Size Target

2000-3000 lines. Prioritize:
1. Complete game loop (all states work)
2. Canvas landscape with parallax scrolling
3. Code display with syntax highlighting
4. Quiz/event mechanics with scoring
5. Polish (animations, sound, CRT toggle)

---

## Step 4: Write and Open the Game

1. Take the generated HTML content
2. Write it to a file using the open-viz script:
   ```
   Bash: echo '{HTML_CONTENT}' | ${CLAUDE_PLUGIN_ROOT}/scripts/open-viz.sh --filename "trail-{framework}-{timestamp}.html"
   ```

   Or write the file directly, then open:
   ```
   # For framework trails:
   Write tool → .diff-review/trail-{framework}.html
   Bash: open .diff-review/trail-{framework}.html

   # For PR trails:
   Write tool → .diff-review/trail-pr-{number-or-range}.html
   Bash: open .diff-review/trail-pr-{number-or-range}.html
   ```

3. Trigger TTS announcement:
   ```
   # For framework trails:
   Bash: ${CLAUDE_PLUGIN_ROOT}/scripts/tts.sh "I've opened the O'Reorg Trail in your browser. You're about to travel the {trail name}. Happy trails, partner."

   # For PR trails:
   Bash: ${CLAUDE_PLUGIN_ROOT}/scripts/tts.sh "I've opened the O'Reorg Trail in your browser. You're about to review PR {number} on the {trail name}. Happy trails, partner."
   ```

## Step 5: Terminal Feedback

### For Framework Trails

Display in the terminal:

```
================================================================
  O'REORG TRAIL — {Trail Name}
================================================================

Game opened in your browser!

Framework:  {Framework Name}
Trail:      {Trail Name}
Stops:      {N} stops along the request pipeline
Events:     {N} quiz events

Party Members:
  1. {concept 1}
  2. {concept 2}
  3. {concept 3}
  4. {concept 4}

Type 'done' when you've finished the trail.
================================================================
```

### For PR Trails

Display in the terminal:

```
================================================================
  O'REORG TRAIL — {Trail Name}
================================================================

Game opened in your browser!

PR:         #{number} — {PR title}
Trail:      {Trail Name}
Stops:      {N} change groups to review
Events:     {N} comprehension challenges
Destination: The Merge Frontier

Party Members:
  1. {domain 1}
  2. {domain 2}
  3. {domain 3}
  4. {domain 4}

Type 'done' when you've finished the trail.
================================================================
```

Then wait for the user to type `done` to end the session.

## Error Handling

- If framework is not supported yet (Phase 2 frameworks without trail data), say: "The {framework} trail is coming soon! Currently available: Next.js, OpenClaw. Try `/fly-visual next` or `/fly-visual openclaw`."
- If auto-detection fails, list available frameworks and ask user to pick.
- If HTML generation fails, show error and suggest retrying with a specific framework.
