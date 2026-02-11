# Shared Instructions for diff-pair-review Commands

These instructions are used by both `/diff-review` and `/walkthrough` commands.

## TTS Integration

To narrate an explanation:
1. Generate conversational text following the `narration` skill guidelines
2. Execute TTS asynchronously:
   ```
   Bash: ${CLAUDE_PLUGIN_ROOT}/scripts/tts.sh "narration text here"
   ```
3. Display the code/content in the terminal at the same time — don't wait for audio to finish

To use a specific voice (team mode):
```
Bash: ${CLAUDE_PLUGIN_ROOT}/scripts/tts.sh --voice "Daniel" "narration text"
```

To use OpenAI TTS:
```
Bash: ${CLAUDE_PLUGIN_ROOT}/scripts/tts.sh --engine openai --voice nova "narration text"
```

## Interactive Navigation

After displaying each section, present these commands and wait for user input:

| Command | Action |
|---------|--------|
| `next` | Move to the next section |
| `prev` | Go back to the previous section |
| `detail` | Show full content for current section (complete diff or file-by-file explanation) |
| `related` | Find and show files that import/use code from the current section |
| `question <text>` | Answer a question in context of the current section |
| `jump <N>` | Jump to section number N |
| `list` | Show overview table of all sections with viewed/current status |
| `done` | End the session with a summary |
| `fly` | Enter fly-through for current section (auto-advancing code snippets with TTS) |
| `pause` | Pause fly-through auto-advance |
| `resume` | Resume fly-through auto-advance |
| `stop` | Exit fly-through, return to section navigation |
| `skip` | Skip the current quiz question |
| `hint` | Get a hint for the current quiz question |
| `score` | Show quiz score summary |

### How to detect user commands
The user's next message will be one of the above commands (possibly with extra text). Parse it:
- Starts with "next" → advance section
- Starts with "prev" → go back
- Starts with "detail" → show detailed view
- Starts with "related" → grep for connections
- Starts with "question" → answer the rest of the message as a question
- Starts with "jump" → extract number, go to that section
- Starts with "list" → show overview
- Starts with "done" → summarize and end
- Starts with "fly" → enter fly-through mode for current section
- Starts with "pause" → pause fly-through auto-advance
- Starts with "resume" → resume fly-through auto-advance
- Starts with "stop" → exit fly-through mode
- Starts with "skip" → skip current quiz question
- Starts with "hint" → show hint for current quiz question
- Starts with "score" → show quiz score summary
- Anything else → treat as a question about the current section

## Terminal Display Formatting

### Section Header
```
================================================================
  [ICON] SECTION TITLE (Section N of M)
================================================================
```

Icons by section type:
- Overview: book icon or "OVERVIEW"
- Architecture: folder icon or "ARCHITECTURE"
- Entry Points: rocket or "ENTRY POINTS"
- Core Logic: gear or "CORE LOGIC"
- Data Layer: database or "DATA LAYER"
- Integrations: plug or "INTEGRATIONS"
- Testing: test tube or "TESTING"
- Build/Deploy: rocket or "BUILD & DEPLOY"

### Diff Display
Show diffs with:
- File path as header
- Line numbers
- + lines for additions, - lines for deletions
- 3 lines of context around changes

### Navigation Prompt
Always end each section with:
```
Commands: next | fly | detail | related | question | list | done
```

## State Tracking

Track the walkthrough state mentally across turns:
- Current section index
- Which sections have been viewed
- Which sections have been detailed
- The full list of sections with their content

There is no external state file — Claude maintains state through conversation context.

## Fly-Through Display

When in fly-through mode, display each step using this template:

### Step Display
```
────────────────────────────────────────────────
  Step N of M — file/path.ts:15-38
────────────────────────────────────────────────
[code snippet displayed via Read tool]

> 💬 [narration text]

  ▶ Auto-advancing in Ns... (pause | stop)
────────────────────────────────────────────────
```

The `file:line` format is clickable in VS Code terminals.

### Fly-Through Flow
1. Request snippet plan from narrator agent for current section
2. For each snippet in the plan:
   a. Display the step header with file:line range
   b. Read and display the code using the Read tool
   c. Display narration in a quote block
   d. Trigger TTS with the narration text
   e. Pause for estimated TTS duration + buffer (via `scripts/fly-pause.sh`)
   f. Auto-advance to next snippet
3. On `pause`: stop advancing, show "Paused at step N. Type resume or stop."
4. On `resume`: continue from current step
5. On `stop` or after last snippet: return to section navigation with "Fly-through complete. N snippets reviewed."

### Fly-Through State
Track within fly-through mode:
- Current snippet index within the fly-through
- Whether auto-advance is paused
- The full snippet plan for the current section

## Comprehension Quiz

### Quiz Flow
After every 2-3 sections (configurable), automatically trigger a quiz:

1. Call quiz-generator agent with content from the recently covered sections
2. Present each question one at a time:
   ```
   ════════════════════════════════════════════════
     📝 COMPREHENSION CHECK (Question N of M)
   ════════════════════════════════════════════════

   [Question text]

   (Type your answer, or: skip | hint)
   ════════════════════════════════════════════════
   ```
3. Evaluate the user's answer (generously — partial credit for showing understanding)
4. Provide feedback referencing specific code:
   - Correct: "✓ That's right. [elaboration with file:line reference]"
   - Partial: "~ On the right track. [what they got right + what they missed]"
   - Incorrect: "✗ Not quite. [correct answer with file:line reference]"
5. After all questions, show score summary
6. Continue to next section

### Quiz Score Display
```
────────────────────────────────────────────
  Quiz Results: N/M correct
  Running total: X/Y across all quizzes
────────────────────────────────────────────
```

### Quiz State
Track across the session:
- Questions asked (total)
- Questions answered correctly / partially / incorrectly
- Which sections have been quizzed
- Running score for the final summary
