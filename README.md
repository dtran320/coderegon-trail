# diff-pair-review

A Claude Code plugin that walks you through code changes and codebases like a staff engineer pairing with you — with TTS narration.

## Commands

### `/diff-review [target]`

Walk through a PR or local diff, ranked from most to least important.

```
/diff-review              # uncommitted changes
/diff-review 123          # GitHub PR #123
/diff-review main..feat   # branch comparison
/diff-review HEAD~3       # last 3 commits
/diff-review --team       # multi-voice team mode
```

### `/walkthrough [scope]`

Explore an unfamiliar codebase with a guided tour.

```
/walkthrough              # full repo tour
/walkthrough src/api      # scoped to a directory
/walkthrough auth         # scoped to a topic
/walkthrough --quick      # abbreviated overview
/walkthrough --team       # multi-voice team mode
```

## Navigation

Both commands support interactive navigation:

| Command | Action |
|---------|--------|
| `next` | Next section |
| `prev` | Previous section |
| `detail` | Deep dive into current section |
| `related` | Show connected code |
| `question <text>` | Ask about current section |
| `jump <N>` | Jump to section N |
| `list` | Show all sections |
| `done` | End with summary |

## Team Mode

Pass `--team` to split the codebase into domains, each narrated by a different voice:

- **Lead** (Samantha/alloy) — big picture and transitions
- **Backend** (Daniel/echo) — API, services, data flow
- **Frontend** (Karen/nova) — components, state, UX
- **Infrastructure** (Tom/fable) — deploy, config, schemas

## TTS Configuration

Default: macOS `say` command. Configure via environment variables or `config/tts.json`:

```bash
# Use OpenAI TTS
export DIFF_REVIEW_TTS_ENGINE=openai
export OPENAI_API_KEY=sk-...
export DIFF_REVIEW_TTS_VOICE=nova

# Adjust macOS say
export DIFF_REVIEW_TTS_VOICE=Daniel
export DIFF_REVIEW_TTS_RATE=220
```

## Installation

Install via the Claude Code plugin system:
```
/plugins install diff-pair-review
```

Or clone and install locally:
```
git clone <repo-url> ~/.claude/plugins/diff-pair-review
```
