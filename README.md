# Coderegon Trail

A [Claude Code](https://docs.anthropic.com/en/docs/claude-code) plugin for learning codebases through play.

The flagship feature is **Coderegon Trail** — a retro pixel art Oregon Trail-style game that teaches web framework request pipelines. Travel through ~8 stops representing stages of a framework's request lifecycle, answer quiz events disguised as trail decisions, and try to keep your party alive long enough to reach Response Frontier.

Also includes TTS-narrated code walkthroughs for PRs, diffs, and codebases.

## Coderegon Trail (`/trail`)

Launch a retro pixel art game that teaches a web framework's request pipeline:

```
/trail next          # Next.js App Router Trail
/trail rails         # Rails Convention Trail
/trail django        # Django WSGI Wagon Trail
/trail express       # Express Middleware Prairie
/trail react         # React/Vite Component Canyon
/trail laravel       # Laravel Artisan Trail
/trail openclaw      # OpenClaw Gateway Trail
/trail               # auto-detect from current repo
```

You can also play against a PR:

```
/trail pr 123        # PR #123 becomes the trail
/trail pr main..feat # branch comparison
```

**How it works:**
1. Generates a self-contained HTML game file (no build step)
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

### Pre-built games

13 games ship ready to play in your browser — no Claude Code required:

| Game | Framework | Trail Name |
|------|-----------|------------|
| [gstack](gstack/) | GStack | GStack Trail |
| [openclaw](openclaw/) | OpenClaw | Gateway Trail |
| [rails](rails/) | Rails | Convention Trail |
| [django](django/) | Django | WSGI Wagon Trail |
| [express](express/) | Express | Middleware Prairie |
| [react](react/) | React/Vite | Component Canyon |
| [laravel](laravel/) | Laravel | Artisan Trail |
| [qmd](qmd/) | QMD | QMD Trail |
| [pi-mono](pi-mono/) | Pi Mono | Pi Mono Trail |
| [ruview](ruview/) | RuView | RuView Trail |
| [shannon](shannon/) | Shannon | Shannon Trail |
| [spacetimedb](spacetimedb/) | SpacetimeDB | SpacetimeDB Trail |
| [superpowers](superpowers/) | Superpowers | Superpowers Trail |

To play, serve the repo locally and open any game in your browser:

```bash
python3 -m http.server 8080
# then visit http://localhost:8080/gstack/index.html
```

Or open the [hub page](index.html) at `http://localhost:8080` to browse all games.

## Diff Review (`/diff-review`)

Walk through a PR or local diff with TTS narration, ranked from most to least important:

```
/diff-review              # uncommitted changes
/diff-review 123          # GitHub PR #123
/diff-review main..feat   # branch comparison
/diff-review HEAD~3       # last 3 commits
/diff-review --team       # multi-voice team mode
```

## Walkthrough (`/walkthrough`)

Explore an unfamiliar codebase with a TTS-narrated guided tour:

```
/walkthrough              # full repo tour
/walkthrough src/api      # scoped to a directory
/walkthrough auth         # scoped to a topic
/walkthrough --quick      # abbreviated overview
/walkthrough --team       # multi-voice team mode
```

## Navigation

Both TTS commands support interactive navigation during playback:

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

Pass `--team` to split content into domains, each narrated by a different voice:

- **Lead** (Samantha/alloy) — big picture and transitions
- **Backend** (Daniel/echo) — API, services, data flow
- **Frontend** (Karen/nova) — components, state, UX
- **Infrastructure** (Tom/fable) — deploy, config, schemas

## Installation

Install as a Claude Code plugin:

```bash
claude plugin add /path/to/coderegon-trail
```

Or clone and install:

```bash
git clone https://github.com/anthropics/coderegon-trail.git
claude plugin add ./coderegon-trail
```

### Requirements

- [Claude Code](https://docs.anthropic.com/en/docs/claude-code)
- `bash`, `jq`, `git`, `gh` (GitHub CLI)
- `say` (macOS, for TTS — optional)

### Optional TTS engines

Default TTS uses the macOS `say` command. You can configure alternatives:

```bash
# OpenAI TTS
export DIFF_REVIEW_TTS_ENGINE=openai
export OPENAI_API_KEY=sk-...

# ElevenLabs TTS
export DIFF_REVIEW_TTS_ENGINE=elevenlabs
export ELEVENLABS_API_KEY=...
```

See `config/tts.json` for all options. Local overrides go in `config/tts.local.json` (gitignored).

## Architecture

```
commands/          CLI commands (markdown specs)
agents/            Claude-powered analysis agents
skills/            Game generation + narration guidelines
engine.js          Shared game engine (rendering, state, audio, UI)
<game>/index.html  Per-game HTML (trail data + overrides, loads engine.js)
scripts/           Shell infrastructure (TTS, config, utilities)
config/            Default configuration
```

Each game HTML file is a thin wrapper that defines `TRAIL_DATA` (stops, events, quiz questions) and loads the shared `engine.js` for all rendering, state management, audio, and UI. No build step — everything runs directly in the browser.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines, especially if you spot inaccuracies in the game content.

## License

[MIT](LICENSE)
