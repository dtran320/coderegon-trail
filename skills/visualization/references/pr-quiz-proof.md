# PR Quiz — Proof of Understanding Format

Defines the proof format that the HTML game generates on the win screen, and the terminal command parses when pasted back.

## Proof Format (Markdown)

The game generates this markdown when the player clicks "Copy Proof of Understanding":

```markdown
## PR Understanding Proof

| Field | Value |
|-------|-------|
| PR | [#42 - Add authentication flow](https://github.com/org/repo/pull/42) |
| Score | 5/6 (83%) |
| Survivors | 3/4 |
| Best Streak | 4 |
| Date | 2026-02-12 |

### Concept Mastery
- ⭐⭐⭐ Input Validation (all correct)
- ⭐⭐ Error Handling (mostly correct)
- ⭐ API Contract (needs review)

*O'Reorg Trail PR Quiz | Hash: `a3f8b2`*
```

## Field Definitions

| Field | Source | Format |
|-------|--------|--------|
| PR | `prMeta.number` + `prMeta.title` + `prMeta.url` | Markdown link: `[#N - Title](url)` |
| Score | Correct answers / total questions | `X/Y (Z%)` |
| Survivors | Living party members / total (4) | `N/4` |
| Best Streak | Longest consecutive correct streak | Integer |
| Date | Date game was completed | `YYYY-MM-DD` |

## Concept Mastery

Each party member's concept gets a mastery rating based on quiz performance:

| Stars | Meaning | Criteria |
|-------|---------|----------|
| ⭐⭐⭐ | All correct | 100% of questions for this concept answered correctly |
| ⭐⭐ | Mostly correct | 50-99% correct, party member survived |
| ⭐ | Needs review | <50% correct, or party member died |

Format: `- {stars} {concept name} ({summary})`

Summary text:
- `(all correct)` — 100%
- `(mostly correct)` — 50-99%
- `(needs review)` — <50%
- `(party member lost)` — party member died (0 HP)

## Integrity Hash

Simple integrity check to verify proof wasn't fabricated:

```javascript
function generateHash(prNumber, score, totalQuestions, survivors, timestamp) {
  const input = `${prNumber}${score}${totalQuestions}${survivors}${timestamp}`;
  return btoa(input).substring(0, 6);
}
```

- `prNumber`: PR number (integer)
- `score`: Correct answers (integer)
- `totalQuestions`: Total questions (integer)
- `survivors`: Living party members (integer)
- `timestamp`: Unix timestamp when game completed (integer, seconds)

The hash appears at the bottom: `*O'Reorg Trail PR Quiz | Hash: \`{hash}\`*`

## Win Screen Copy Button

### Visual Spec

After the score card on the win screen, show a "Copy Proof of Understanding" button:

```
┌──────────────────────────────────────────────┐
│                                              │
│    YOU MADE IT TO PR APPROVAL!               │
│                                              │
│    [Score card stats...]                     │
│    [Concept mastery...]                      │
│                                              │
│    ┌──────────────────────────────────┐      │
│    │  📋 Copy Proof of Understanding │      │
│    └──────────────────────────────────┘      │
│                                              │
│    Press C to copy  |  Play Again            │
│                                              │
└──────────────────────────────────────────────┘
```

### Implementation

```javascript
// Button click handler
async function copyProof() {
  const proof = generateProofMarkdown();
  try {
    await navigator.clipboard.writeText(proof);
    showCopiedFeedback();
  } catch (err) {
    // Fallback: show selectable textarea
    showSelectableProof(proof);
  }
}

// Keyboard shortcut
document.addEventListener('keydown', (e) => {
  if (gameState === 'WIN' && e.key.toLowerCase() === 'c') {
    copyProof();
  }
});
```

### Copied Feedback

When proof is copied successfully:
1. Button text changes to "Copied!" with a checkmark
2. Button border flashes green
3. Revert to original text after 2 seconds

### Fallback (clipboard API unavailable)

If `navigator.clipboard.writeText()` fails:
1. Show a textarea with the proof markdown pre-selected
2. Label: "Select all and copy (Cmd+C / Ctrl+C):"
3. The textarea is auto-focused and text is pre-selected

## Terminal Proof Detection

When the user pastes proof back in the terminal, detect it by the `## PR Understanding Proof` header.

### Parsing

Extract these fields from the pasted markdown:

```
PR number:     regex: /#(\d+)/
Score:         regex: /Score \| (\d+)\/(\d+)/
Survivors:     regex: /Survivors \| (\d+)\/4/
Best Streak:   regex: /Best Streak \| (\d+)/
Hash:          regex: /Hash: `([a-zA-Z0-9+/=]{6})`/
```

### Display in Terminal

After parsing, show a formatted summary:

```
================================================================
  PR QUIZ PROOF — #42: Add authentication flow
================================================================

Score:       5/6 (83%)
Survivors:   3/4 party members
Best Streak: 4 in a row

Concept Mastery:
  ⭐⭐⭐ Input Validation (all correct)
  ⭐⭐  Error Handling (mostly correct)
  ⭐    API Contract (needs review)

Hash: a3f8b2 ✓
================================================================
```
