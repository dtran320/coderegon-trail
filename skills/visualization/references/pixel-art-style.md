# Coderegon Trail — Pixel Art Style Guide

Visual specifications for the Coderegon Trail game. All rendering is done programmatically on HTML5 Canvas (no image assets).

## Color Palette

### Primary Palette (8-bit inspired)
```
Sky:        #87CEEB (day), #1a1a2e (night), #FF6B35 (sunset)
Ground:     #8B7355 (trail), #4a7c59 (grass), #c2b280 (desert)
Mountains:  #6B7B8D (far), #4a5568 (near), #8B95A2 (snow caps)
Trees:      #2d5016 (dark pine), #3d6b22 (light pine), #8B4513 (trunk)
Water:      #4A90D9 (river), #357ABD (deep), #87CEEB (shallow)
Wagon:      #8B4513 (wood), #D2B48C (canvas), #333333 (wheels)
UI:         #1a1a2e (panel bg), #e2e8f0 (text), #48bb78 (health)
```

### Status Colors
```
Health:     #48bb78 (high), #ecc94b (medium), #f56565 (low)
Morale:     #ffd700 (stars)
Text:       #e2e8f0 (normal), #48bb78 (correct), #f56565 (wrong), #ecc94b (partial)
Code:       #00ff41 (green phosphor) on #0a0a0a (near-black)
```

### Syntax Highlighting (Code Panel)
```
Keywords:   #ff79c6 (pink — function, const, export, async, await, return, if, else)
Strings:    #f1fa8c (yellow — quoted text)
Comments:   #6272a4 (muted blue — // and /* */)
Default:    #f8f8f2 (off-white — everything else)
Numbers:    #bd93f9 (purple)
```

## Layout Specifications

### Screen Regions (top to bottom)

```
┌──────────────────────────────────────────────┐
│  LANDSCAPE REGION (canvas)     40% of height │  ← scrolling terrain + wagon
├──────────────────────────────────────────────┤
│  CODE/NARRATION PANEL (DOM)    45% of height │  ← code snippet or event text
├──────────────────────────────────────────────┤
│  STATUS BAR (DOM)              15% of height │  ← health, supplies, party
└──────────────────────────────────────────────┘
```

### Landscape Region (Canvas)

- **Sky layer** (top 40%): Gradient sky with optional clouds, sun/moon
- **Mountain layer** (20-40%): Parallax mountains, scroll at 0.3x speed
- **Tree layer** (40-60%): Parallax trees/features, scroll at 0.6x speed
- **Ground layer** (bottom 30%): Trail path, grass, rocks, scroll at 1x speed
- **Wagon** (centered on trail): Animated wheels, framework logo as flag

#### Parallax Scrolling
- 3 layers scroll at different speeds for depth effect
- Mountains: 0.3x wagon speed
- Trees/features: 0.6x wagon speed
- Ground: 1.0x wagon speed
- Creates convincing depth with minimal rendering cost

#### Landmark Types
Each stop has a landmark rendered on the landscape:

| Type | Visual |
|------|--------|
| town | Cluster of pixel buildings, signpost with stop name |
| mountain | Prominent peak with snow cap |
| river | Animated blue water band across the trail |
| forest | Dense tree cluster |
| desert | Sandy ground, cacti, minimal trees |
| camp | Campfire, tent, small clearing |

### Code/Narration Panel (DOM)

#### Code Display Mode
```css
.code-panel {
  background: #0a0a0a;
  border: 2px solid #333;
  border-radius: 4px;
  padding: 16px;
  font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;
  font-size: 13px;
  line-height: 1.5;
  overflow-x: auto;
}

.code-header {
  color: #6272a4;
  font-size: 11px;
  margin-bottom: 8px;
  /* Shows: // file/path.ts:15-38 */
}
```

#### Narration Display Mode
```css
.narration-panel {
  background: #1a1a2e;
  border: 2px solid #333;
  padding: 20px;
  font-family: 'Press Start 2P', 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.8;
  color: #e2e8f0;
}
```

#### Event/Choice Display Mode
```css
.event-panel {
  background: #1a1a2e;
  border: 2px solid #ffd700;  /* Gold border for events */
  padding: 20px;
}

.choice-button {
  background: #2d3748;
  border: 2px solid #4a5568;
  color: #e2e8f0;
  padding: 12px 20px;
  margin: 8px 0;
  cursor: pointer;
  font-family: inherit;
  font-size: 14px;
  width: 100%;
  text-align: left;
  transition: border-color 0.2s;
}

.choice-button:hover {
  border-color: #63b3ed;
}

.choice-button.correct {
  border-color: #48bb78;
  background: #1a3a2a;
}

.choice-button.incorrect {
  border-color: #f56565;
  background: #3a1a1a;
}
```

### Status Bar (DOM)

```
┌──────────────────────────────────────────────┐
│ Health: ████████░░ 80 │ Supplies: 5 │ ★★★   │
│ Party: Concept1 ✓  Concept2 ✓  Concept3 ✓   │
│ Stop 4 of 8 — [Current Stop Name]           │
└──────────────────────────────────────────────┘
```

```css
.status-bar {
  background: #0d1117;
  border-top: 2px solid #333;
  padding: 12px 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 8px;
  font-family: 'SF Mono', monospace;
  font-size: 12px;
  color: #e2e8f0;
}

.health-bar {
  height: 12px;
  background: #2d3748;
  border-radius: 2px;
  overflow: hidden;
}

.health-fill {
  height: 100%;
  transition: width 0.5s ease;
  /* Color changes based on health level */
}
```

## Pixel Art Rendering (Canvas)

### Wagon Sprite (drawn programmatically)

```javascript
function drawWagon(ctx, x, y, frameworkColor) {
  // Wheels (2 circles with spokes)
  // Body (rectangle with wooden plank texture)
  // Canvas cover (arc with cloth texture)
  // Framework flag (small triangle at top with framework color)
  // Oxen (2 simple pixel rectangles in front)
}
```

- Wagon width: ~60px at game scale
- Wheel animation: rotate based on travel state
- Framework flag color: framework-specific accent color

### Framework Accent Colors
```
Next.js:   #000000 (black) with white text
Rails:     #CC0000 (red)
Django:    #092E20 (dark green)
Express:   #353535 (dark grey)
React:     #61DAFB (cyan)
Laravel:   #FF2D20 (red-orange)
```

### Tree Drawing

```javascript
function drawPineTree(ctx, x, y, size) {
  // Triangle layers (3 overlapping, decreasing size)
  // Brown trunk rectangle
  // Slight size/shade variation for organic feel
}
```

### Mountain Drawing

```javascript
function drawMountain(ctx, x, y, width, height, color) {
  // Triangle with slight irregularity
  // Snow cap (white triangle at peak, smaller)
  // Layered for parallax (far = lighter, near = darker)
}
```

### River Drawing

```javascript
function drawRiver(ctx, y, width, frame) {
  // Animated blue band across the screen
  // Wavy top and bottom edges (sin wave, animated by frame)
  // Lighter blue highlights for flow effect
}
```

## Typography

### Pixel Font (for titles, event headers)
- Use CSS with a chunky pixel aesthetic
- Fallback: `'Courier New', monospace` with `font-weight: bold` and `letter-spacing: 2px`
- Can use `@font-face` with a base64-encoded small pixel font if size permits

### Body Text (narration, descriptions)
- `font-family: 'SF Mono', 'Fira Code', 'Consolas', 'Courier New', monospace`
- `font-size: 14px`
- `line-height: 1.8` for readability
- `letter-spacing: 0.5px`

### Code Text
- Same monospace stack
- `font-size: 13px`
- `line-height: 1.5`

## CRT Effect (Optional Toggle)

```css
.crt-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.15) 0px,
    rgba(0, 0, 0, 0.15) 1px,
    transparent 1px,
    transparent 3px
  );
}
```

Toggle via a small "CRT" button in the corner. Off by default.

## Animations

### Wagon Travel
- Wagon centered horizontally
- Landscape scrolls left behind the wagon
- Wheel rotation synced to scroll speed
- Gentle wagon bounce (1-2px vertical oscillation)

### Arrival at Stop
- Wagon decelerates (easing function)
- Landmark appears and grows into view
- Stop name banner slides down from top
- Code panel slides up from bottom

### Event Appearance
- Screen flash (brief gold overlay)
- Event panel slides in with border glow
- Choices appear one by one with slight stagger (200ms each)

### Answer Feedback
- Correct: Green flash, choice pulses, health bar animates up, "+10" floats up
- Wrong: Red flash, screen shake (2px, 200ms), health bar animates down, "-15" floats up
- Party damage: Portrait flashes red, health pip disappears

### Death Sequence
- Screen slowly fades to dark
- Tombstone rises from bottom center
- Death message typewriter-animates onto tombstone
- "Press any key" fades in after message completes

### Win Sequence
- Fireworks: random position colored pixel explosions (8-10 bursts)
- Score card slides in from right
- Stats count up from 0 to final values (satisfying animation)
- Study recommendation typewriter-animates last

## Sound (Web Audio API — Optional)

All sounds are generated via Web Audio API oscillators. No audio files needed.

| Event | Sound |
|-------|-------|
| Travel start | Rising 3-note arpeggio (C-E-G) |
| Stop arrival | Descending chime (G-E-C) |
| Correct answer | Happy jingle (C-E-G-C♯) |
| Wrong answer | Descending buzz (low frequency) |
| Party member death | Sad descending tone |
| Win | Triumphant 8-bar melody |
| Death | Low somber 4-note phrase |
| River crossing | Water-like oscillation |
| Event appear | Alert tone (2 quick beeps) |

Toggle via a speaker icon in the corner. **Off by default** — opt-in.

## Accessibility

- All choice buttons are keyboard-navigable (Tab + Enter)
- Arrow keys navigate choices
- Code panel has proper contrast ratios (WCAG AA on dark backgrounds)
- Status bar text has sufficient contrast
- Screen reader: choices have aria-labels
- No auto-playing sound
