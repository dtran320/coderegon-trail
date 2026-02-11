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

To use ElevenLabs TTS:
```
Bash: ${CLAUDE_PLUGIN_ROOT}/scripts/tts.sh --engine elevenlabs "narration text"
```

To use a specific ElevenLabs voice (team mode):
```
Bash: ${CLAUDE_PLUGIN_ROOT}/scripts/tts.sh --engine elevenlabs --voice "pNInz6obpgDQGcFmaJgB" "narration text"
```

### ElevenLabs Break Tags

When using the ElevenLabs engine, you can insert pauses in narration using SSML-style break tags:
```
"Let's look at the authentication module. <break time="1.0s" /> The key change here is..."
```
Only use break tags when the TTS engine is `elevenlabs` — other engines will read them literally.

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
Commands: next | prev | detail | related | question | list | done
```

## State Tracking

Track the walkthrough state mentally across turns:
- Current section index
- Which sections have been viewed
- Which sections have been detailed
- The full list of sections with their content

There is no external state file — Claude maintains state through conversation context.
