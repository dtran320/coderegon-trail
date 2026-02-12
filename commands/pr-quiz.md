---
description: "Generate an O'Reorg Trail game to test PR understanding with copyable proof"
argument-hint: "<PR# | URL> [--post-proof]"
allowed-tools:
  - Bash(gh:*)
  - Bash(git:*)
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

# PR Quiz — O'Reorg Trail PR Review Edition

You generate and launch a retro pixel art O'Reorg Trail game that tests the user's understanding of a specific PR's code changes. The game produces a copyable proof-of-understanding score that can be posted as a PR comment.

**User input:** "$ARGUMENTS"

Use the `visualization` skill for game generation guidelines. Use `skills/visualization/references/pr-quiz-proof.md` for the proof format spec.

## Step 1: Parse Arguments and Fetch PR Data

Parse the user's input to extract the PR target:

1. If input contains `github.com` and `/pull/` → extract PR number from URL
2. If input is a plain number → GitHub PR number
3. If input is empty → error: "Please specify a PR number or URL. Usage: `/pr-quiz 42` or `/pr-quiz https://github.com/org/repo/pull/42`"

Check for the `--post-proof` flag. If present, auto-post proof as a PR comment after completion (skip the confirmation prompt).

### Fetch PR Context

Run these commands to gather PR data:

```bash
gh pr view <number> --json number,title,body,author,url,state,baseRefName,headRefName
gh pr diff <number>
```

### Validate

- PR must exist (non-empty response from `gh pr view`)
- Diff must be non-empty (PR has actual code changes)
- If PR is merged or closed, warn: "This PR is already {state}. Generating quiz from its final diff."

Extract from `gh pr view` response:
- `number`: PR number
- `title`: PR title
- `author.login`: Author username
- `url`: PR URL

Derive repo from the current git remote:
```bash
gh repo view --json nameWithOwner --jq '.nameWithOwner'
```

## Step 2: Extract Trail Data via Agent

Spawn a `pr-quiz-extractor` agent (via Task tool, subagent_type: general-purpose) with:

**Prompt:**
```
You are the pr-quiz-extractor agent. Follow the instructions in agents/pr-quiz-extractor.md.

Here is the PR metadata:
- Number: {number}
- Title: {title}
- Author: {author}
- URL: {url}
- Repo: {repo}

Here is the full PR diff:

{diff_text}

Analyze this diff and produce a TRAIL_DATA JSON block following the format in your instructions.
```

Parse the returned `TRAIL_DATA:` JSON block from the agent's response.

### Validate Trail Data

Verify the JSON has:
- 4-8 stops (each with name, code, narration, landmarkType)
- 4-8 events (each with type, choices, concept)
- 4 party members
- 8+ death messages
- `prMeta` field with PR metadata

If validation fails, log the issue and retry once with more specific guidance.

## Step 3: Generate the HTML Game via Frontend Design

Use the `frontend-design` skill (via Skill tool) to generate the complete HTML game file — same skill used by `/fly-visual`.

Provide the frontend-design skill with these instructions:

---

**Generate a self-contained HTML file for the O'Reorg Trail PR Quiz game.**

### Game Requirements

1. **Single HTML file** — all CSS, JavaScript, and game data inline. No external dependencies.
2. **Canvas + DOM hybrid** — use Canvas for the scrolling landscape and wagon animation, DOM for UI panels (code display, narration, choices, status bar).
3. **Game state machine** — implement states: TITLE, SETUP, TRAVEL, STOP, EVENT, RIVER, DEATH, WIN
4. **Pixel art aesthetic** — follow the style guide in `skills/visualization/references/pixel-art-style.md`

### Trail Data

Embed this trail data as a JavaScript constant:

```javascript
const TRAIL_DATA = {TRAIL_DATA_JSON};
```

### Title Screen

- "O'REORG TRAIL" in pixel-style text (bold monospace, letter-spacing)
- Subtitle: "PR Review Edition"
- Below subtitle: PR title and number: "PR #{number}: {title}"
- Scrolling landscape animation behind title
- "Click to begin" prompt

### Screen Layout

```
┌─────────────────────────────────────────────┐
│  Scrolling landscape with parallax          │  40% height — Canvas
│  Mountains (0.3x) → Trees (0.6x) → Ground  │
│  Wagon centered on trail                    │
├─────────────────────────────────────────────┤
│  Diff panel OR narration OR event choices   │  45% height — DOM
├─────────────────────────────────────────────┤
│  Health bar | Supplies | Morale | Party     │  15% height — DOM
│  Stop N of M — Current Stop Name            │
└─────────────────────────────────────────────┘
```

### Game Flow Implementation

**Setup Phase:**
- Show 4 party members with their concept names from trail data
- Each has a pixel portrait (simple colored square icons)
- Difficulty selection: Settler / Adventurer / Trail Blazer
- "Hit the trail!" button

**Travel Animation:**
- Wagon scrolls across landscape (2-3 seconds)
- Parallax scrolling: 3 layers at different speeds
- Day counter and progress indicator update

**Stop Phase:**
- Arrival banner with stop name
- Code panel: dark background, monospace, syntax-highlighted diff
- Show `+` lines in green, `-` lines in red, context in white
- File path header above code
- Narration text below code in styled panel
- Three choices: Continue / Examine / Ask about...

**Event Phase:**
- Gold-bordered event panel
- Event title and narrative text
- 3 choice buttons (A, B, C style)
- On answer: green/red flash, explanation text, health/party updates

**River Crossing:**
- Animated river in the landscape
- Higher-stakes presentation
- Same choice mechanic with more dramatic feedback

**Death Screen:**
- Dark overlay fade
- Pixel tombstone
- PR-specific death message typewriter animation
- Partial score card
- "Click to try again"

**Win Screen:**
- Celebration (CSS confetti animation)
- Title: "YOU MADE IT TO PR APPROVAL!"
- Full score card with stats
- Concept mastery breakdown (stars per party member concept)
- **"Copy Proof of Understanding" button** — this is critical:
  - Generates the proof markdown format from `skills/visualization/references/pr-quiz-proof.md`
  - Uses `navigator.clipboard.writeText()` to copy
  - Shows "Copied!" feedback on success
  - Falls back to selectable textarea if clipboard API fails
  - Keyboard shortcut: `C` key copies proof
  - The proof includes: PR link, score, survivors, best streak, date, concept mastery, hash

### Proof Generation (in JavaScript)

```javascript
function generateProofMarkdown() {
  const score = gameState.correctAnswers;
  const total = gameState.totalQuestions;
  const pct = Math.round((score / total) * 100);
  const survivors = gameState.partyMembers.filter(m => m.health > 0).length;
  const streak = gameState.bestStreak;
  const date = new Date().toISOString().split('T')[0];
  const timestamp = Math.floor(Date.now() / 1000);

  // Hash for integrity
  const hash = btoa(`${TRAIL_DATA.prMeta.number}${score}${total}${survivors}${timestamp}`).substring(0, 6);

  // Concept mastery
  const mastery = gameState.partyMembers.map(m => {
    const conceptCorrect = m.questionsCorrect || 0;
    const conceptTotal = m.questionsAsked || 0;
    const pct = conceptTotal > 0 ? conceptCorrect / conceptTotal : 0;
    let stars, summary;
    if (m.health <= 0) { stars = '⭐'; summary = 'party member lost'; }
    else if (pct === 1) { stars = '⭐⭐⭐'; summary = 'all correct'; }
    else if (pct >= 0.5) { stars = '⭐⭐'; summary = 'mostly correct'; }
    else { stars = '⭐'; summary = 'needs review'; }
    return `- ${stars} ${m.name} (${summary})`;
  }).join('\n');

  return `## PR Understanding Proof

| Field | Value |
|-------|-------|
| PR | [#${TRAIL_DATA.prMeta.number} - ${TRAIL_DATA.prMeta.title}](${TRAIL_DATA.prMeta.url}) |
| Score | ${score}/${total} (${pct}%) |
| Survivors | ${survivors}/4 |
| Best Streak | ${streak} |
| Date | ${date} |

### Concept Mastery
${mastery}

*O'Reorg Trail PR Quiz | Hash: \`${hash}\`*`;
}
```

### Canvas Rendering

Draw these procedurally (no images):
- **Sky**: linear gradient, changes with progress (dawn → day → sunset → night)
- **Mountains**: triangle shapes at varying sizes, parallax layer
- **Trees**: simple triangle-on-rectangle pine trees
- **Ground**: brown trail strip with green grass
- **Wagon**: rectangle body, circle wheels, triangle canvas top, small PR flag
- **River**: animated blue band with sine-wave edges (for river crossings)

### Syntax Highlighting

For diff display in the code panel:
```javascript
// Diff lines
// Lines starting with + : green (#48bb78) background tint
// Lines starting with - : red (#f56565) background tint
// Lines starting with @@ : purple (#bd93f9)
// Regular syntax highlighting within:
//   Keywords: pink (#ff79c6)
//   Strings: yellow (#f1fa8c)
//   Comments: muted blue (#6272a4)
//   Numbers: purple (#bd93f9)
//   Default: off-white (#f8f8f2)
```

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
- `C` to copy proof (on win screen only)
- `Escape` to pause

### Size Target

2000-3000 lines. Prioritize:
1. Complete game loop (all states work)
2. Canvas landscape with parallax scrolling
3. Diff display with syntax highlighting
4. Quiz/event mechanics with scoring
5. Proof generation and copy button
6. Polish (animations, sound, CRT toggle)

---

## Step 4: Write and Open the Game

1. Take the generated HTML content
2. Write it to a file:
   ```
   Write tool → .diff-review/pr-quiz-{PR_NUMBER}.html
   ```
3. Open in browser:
   ```
   Bash: open .diff-review/pr-quiz-{PR_NUMBER}.html
   ```
4. Trigger TTS announcement:
   ```
   Bash: ${CLAUDE_PLUGIN_ROOT}/scripts/tts.sh "I've opened the PR Quiz in your browser. You're about to travel the {trail name} for PR {number}. Good luck, partner."
   ```

## Step 5: Terminal Feedback and Proof Handling

Display in the terminal:

```
================================================================
  O'REORG TRAIL — PR Review Edition
  PR #{number}: {title}
================================================================

Game opened in your browser!

Trail:      {Trail Name}
Stops:      {N} stops through the PR changes
Events:     {N} quiz events
Author:     {author}

Party Members (Key Concepts):
  1. {concept 1}
  2. {concept 2}
  3. {concept 3}
  4. {concept 4}

Paste your proof here when done, or type 'done' to exit.
================================================================
```

### Proof Detection and Handling

When the user pastes text, check if it starts with `## PR Understanding Proof`:

1. **Parse the proof** using the regexes from `skills/visualization/references/pr-quiz-proof.md`:
   - PR number, score, survivors, best streak, hash

2. **Display formatted summary**:
   ```
   ================================================================
     PR QUIZ PROOF — #{number}: {title}
   ================================================================

   Score:       {X}/{Y} ({Z}%)
   Survivors:   {N}/4 party members
   Best Streak: {streak} in a row

   Concept Mastery:
     {mastery lines from proof}

   Hash: {hash} ✓
   ================================================================
   ```

3. **Ask about posting** (unless `--post-proof` was passed):
   ```
   Post this as a comment on PR #{number}? (yes/no)
   ```

4. **If yes** (or `--post-proof`):
   ```bash
   gh pr comment {number} --body "{proof_markdown}"
   ```
   Confirm: "Proof posted as a comment on PR #{number}!"

5. **If no**: "Got it. Your proof is in your clipboard if you want to post it later."

### Done Command

When user types `done`: exit without posting.

## Error Handling

- If PR number is missing: "Please specify a PR number or URL. Usage: `/pr-quiz 42`"
- If PR doesn't exist: "PR #{number} not found. Check the number and try again."
- If diff is empty: "PR #{number} has no code changes to quiz on."
- If trail data extraction fails: "Failed to analyze the PR diff. Try again or check if the PR has significant code changes."
- If HTML generation fails: "Failed to generate the game. Retrying..."
- If `gh pr comment` fails: "Failed to post comment. You can paste the proof manually."

## Narration Quality Checklist

Before generating any narration or passing to agents, verify:
- [ ] Uses conversational language, not code-reading
- [ ] Explains WHY, not just WHAT
- [ ] Spells out abbreviations on first use
- [ ] Uses "slash" for path separators in speech
- [ ] Sentences under 25 words
- [ ] Skips boilerplate (imports, formatting)
