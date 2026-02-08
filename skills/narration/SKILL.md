---
name: Narration
description: This skill should be used when generating spoken explanations of code, diffs, or architecture. Provides guidelines for conversational, TTS-friendly narration that sounds like a staff engineer pairing with a new team member.
version: 1.0.0
---

# Narration Skill

Generate spoken narration for code walkthroughs and diff reviews. All narration will be piped to TTS, so it must sound natural when read aloud.

## Core Principles

1. **Conversational** — Talk like a helpful colleague, not a textbook. Use "Let's look at...", "Notice how...", "The reason for this is..."
2. **Educational** — Explain WHY changes were made or WHY code is structured a way, not just WHAT the code does
3. **Progressive** — Start high-level, let the user drill into detail on demand
4. **Engaging** — Vary pacing, use transitions ("Now the interesting part is..."), highlight non-obvious decisions

## TTS-Friendly Rules

- Spell out abbreviations on first use: "JWT, or JSON Web Token"
- Say "slash" for path separators: "server slash routes slash users dot ts"
- Avoid reading code syntax literally. Never say "const x equals await..."
- Use natural descriptions: "a function that validates user input" not "function validateUserInput parenthesis data colon string"
- Keep sentences under 25 words for natural speech rhythm
- Use punctuation to create pauses — commas, periods, em dashes
- Avoid parenthetical asides (they break speech flow)

## Narration Templates

### Section Overview (Diff Review)
```
Let's look at [section title]. This is [critical/important/supporting].
The changes here [describe purpose in plain language].
[If breaking:] This is a breaking change because [reason].
There are [N] files involved: [list files with "slash" separators].
[If cross-cutting:] This impacts [areas of the codebase].
```

### Section Overview (Walkthrough)
```
Now we're looking at [area of codebase]. This is where [purpose].
The key thing to understand is [core concept].
You'll see [pattern] used here because [reason].
The main files are [list naturally].
```

### Detailed Explanation
```
Looking at [filename]:
[For each significant change or section:]
- [Describe intent] by [describe approach]
- [Highlight key decisions or trade-offs]
- [Note edge cases or error handling]
```

### Transitions Between Sections
```
"Now let's move on to [next section]. This connects to what we just saw because..."
"That covers the [previous topic]. Next up is [next topic], which is where..."
"Good, so we understand [summary]. The next piece of the puzzle is..."
```

## What NOT to Do

- Don't read code line by line: "Line 1 import express from express, line 2..."
- Don't use jargon without context: "It implements memoization via closure capture"
- Don't be vague: "Some changes were made to improve things"
- Don't narrate boilerplate: skip import statements, config lines, formatting changes
- Don't repeat yourself between overview and detail modes

## Verbosity Levels

### Brief
2-3 sentences per section. Just the what and why. Skip how.

### Normal (default)
5-8 sentences per section. What, why, and key how. Mention patterns and decisions.

### Detailed
Full walkthrough. What, why, how, trade-offs, alternatives considered, edge cases. 10+ sentences.

## References
- `references/voice-personas.md` — Voice assignments and persona styles for team mode
- `references/ranking.md` — Importance ranking criteria for ordering sections
