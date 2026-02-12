# diff-pair-review

A Claude Code plugin for learning codebases through play. The flagship feature is **O'Reorg Trail** — a retro pixel art Oregon Trail-style game that teaches web framework request pipelines. Also includes TTS-narrated code walkthroughs for PRs, diffs, and codebases.

## Commands

### `/fly-visual [framework]` — O'Reorg Trail

Launch a retro pixel art game that teaches a web framework's request pipeline. Travel through ~8 stops, answer quiz events disguised as trail decisions, and keep your party alive.

```
/fly-visual next          # Next.js App Router trail
/fly-visual rails         # Rails Convention trail
/fly-visual django        # Django WSGI Wagon trail
/fly-visual express       # Express Middleware Prairie
/fly-visual react         # React/Vite Component Canyon
/fly-visual laravel       # Laravel Artisan trail
/fly-visual openclaw      # OpenClaw Gateway trail
/fly-visual               # auto-detect from current repo
```

**How it works:**
1. Generates a self-contained HTML game file (no dependencies, no build step)
2. Opens it in your browser
3. You travel through the framework's request pipeline as trail stops
4. Quiz events test your understanding — wrong answers cost health and can kill party members
5. Arrive at Response Frontier to win, or die of unhandled exceptions trying

**Game features:**
- Canvas parallax landscape with pixel art wagon
- Code snippets with syntax highlighting at each stop
- 5 event types: weather, river crossings, encounters, misfortunes, fortunes
- Party of 4 members representing key framework concepts
- Health, supplies, morale, and scoring systems
- Keyboard controls (1/2/3 for choices, H for hints, Enter to continue)

### `/diff-review [target]`

Walk through a PR or local diff with TTS narration, ranked from most to least important.

```
/diff-review              # uncommitted changes
/diff-review 123          # GitHub PR #123
/diff-review main..feat   # branch comparison
/diff-review HEAD~3       # last 3 commits
/diff-review --team       # multi-voice team mode
```

### `/walkthrough [scope]`

Explore an unfamiliar codebase with a TTS-narrated guided tour.

```
/walkthrough              # full repo tour
/walkthrough src/api      # scoped to a directory
/walkthrough auth         # scoped to a topic
/walkthrough --quick      # abbreviated overview
/walkthrough --team       # multi-voice team mode
```

## Navigation (diff-review & walkthrough)

Both TTS commands support interactive navigation:

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

## Team Mode (diff-review & walkthrough)

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
