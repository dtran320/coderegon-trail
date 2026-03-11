# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Claude Code plugin for learning codebases through play. The flagship feature is **Coderegon Trail** (`/fly-visual`) — a retro pixel art Oregon Trail-style game that teaches web framework request pipelines via an interactive HTML game. Also includes TTS-narrated code walkthroughs (`/diff-review`, `/walkthrough`) for PRs, diffs, and codebases. No build step; the plugin is entirely markdown specs + shell scripts following Claude Code plugin conventions.

## Architecture

```
commands/          User-facing CLI commands (markdown specs)
  fly-visual.md      /fly-visual - Coderegon Trail game (primary command)
  diff-review.md     /diff-review - walk through diffs ranked by importance
  walkthrough.md     /walkthrough - guided codebase tour (8 sections)

agents/            Claude-powered analysis agents (model: sonnet)
  trail-data-extractor.md  Detects framework in a repo and extracts trail data for Coderegon Trail
  pr-trail-extractor.md    Analyzes PRs/git ranges and extracts trail data for PR-mode Coderegon Trail
  diff-narrator.md         Analyzes diffs, generates TTS-friendly narration + fly-through snippet plans
  codebase-narrator.md     Analyzes codebase structure for walkthroughs + fly-through snippet plans
  domain-splitter.md       Splits codebase into 2-4 domains for team mode
  quiz-generator.md        Generates comprehension questions from review/walkthrough content

skills/visualization/  Coderegon Trail game generation guidelines
  SKILL.md               Core game principles, HTML generation, state machine, scoring
  references/
    coderegon-trail.md      Complete game mechanics, event types, scoring, death messages
    framework-trails.md  Per-framework trail definitions (stops, events, party members)
    pixel-art-style.md   Visual style guide, color palette, canvas rendering, layout specs
    pr-trail.md          PR-mode theming overrides (title, colors, destination)

skills/narration/  TTS narration generation guidelines
  SKILL.md             Core narration principles, verbosity levels, fly-through + quiz templates
  references/
    ranking.md         Section importance ranking (1-7 scale)
    voice-personas.md  Voice assignments for team mode
    fly-through.md     Snippet plan format, selection guidelines, display template
    quiz.md            Question types, evaluation guidelines, quiz narration style

lib/               Shared cross-cutting instructions
  shared-instructions.md  Navigation commands, display formatting, state tracking

scripts/           Shell infrastructure
  tts.sh             Universal TTS wrapper (macOS say + OpenAI + ElevenLabs with fallback)
  tts-elevenlabs.js  Node.js CLI for ElevenLabs TTS API
  fly-pause.sh       TTS duration estimator + pause for fly-through auto-advance
  open-viz.sh        Write HTML viz file and open in browser
  tts.sh             Universal TTS wrapper (macOS say + OpenAI API fallback)
  fly-pause.sh       TTS duration estimator + pause for fly-through auto-advance
  open-viz.sh        Write HTML viz file and open in browser
  lib/config.sh      Config file loader (JSON via jq)
  lib/utils.sh       Shared shell utilities

config/tts.json    Default TTS configuration
examples/          Example generated game files
```

## Key Execution Flows

**Coderegon Trail (`/fly-visual`):** Parse framework arg (or auto-detect from repo) → extract trail data from `framework-trails.md` or via `trail-data-extractor` agent → generate self-contained HTML game via `frontend-design` skill → write HTML file and open in browser → game plays in browser (title → setup → travel/stop/event loop → win or death)

**Coderegon Trail Game Loop:** Title screen → party setup (4 members = framework concepts) → travel between ~8 stops (each = a pipeline stage with code + narration) → quiz events between stops (weather/river/encounter/misfortune/fortune), filtered by profession difficulty tier → wrong answers damage health and party members → arrive at Response Frontier to win, or die trying

**Coderegon Trail PR Mode:** Parse PR#/URL/git-range → `pr-trail-extractor` agent extracts trail data from diff → generate HTML game with PR theming from `pr-trail.md` → destination is "Merge Frontier" instead of "Response Frontier"

**Supported Frameworks:** Next.js (App Router Trail), Rails (Convention Trail), Django (WSGI Wagon Trail), Express (Middleware Prairie), React/Vite (Component Canyon), Laravel (Artisan Trail), OpenClaw (Gateway Trail). All frameworks have full trail data with 15 events each at three difficulty tiers (easy/medium/hard).

**Diff Review:** Parse target args → fetch diff (git/gh) → group files into logical sections → rank by importance (1=core logic, 7=config) → present overview → walk through sections with TTS narration → handle navigation commands

**Walkthrough:** Parse scope → spawn 3 parallel Explore agents (architecture, entry points, patterns) → synthesize into 8 sections (overview → architecture → entry points → domain logic → data layer → integrations → testing → build/deploy) → present with TTS narration

**Fly-Through Mode (`fly` command):** Within any diff-review/walkthrough section → narrator agent generates a SNIPPET_PLAN (4-8 code snippets ordered by execution flow) → each snippet is displayed via Read tool with TTS narration → auto-advances after estimated TTS duration + buffer → user can pause/resume/stop

**Comprehension Quiz (auto-triggers):** After every 2-3 sections → quiz-generator agent creates 3 questions (why/what-if/trace/connect/spot-the-issue) → presents one at a time with TTS → evaluates free-form answers generously (partial credit) → provides feedback with file:line references → tracks running score → disabled with `--no-quiz`

**Team Mode (`--team`):** Domain splitter agent divides content into 2-4 domains → each domain assigned a voice persona (Lead=Samantha/alloy, Backend=Daniel/echo, Frontend=Karen/nova, Infra=Tom/fable) → lead narrates transitions, specialists narrate their domains → specialists ask quiz questions for their domain

## TTS System

`scripts/tts.sh` is the universal TTS wrapper. Config priority: CLI flags > env vars > `config/tts.json` > defaults.

- **macOS `say`** (default): voice=Samantha, rate=200 WPM
- **OpenAI TTS** (`DIFF_REVIEW_TTS_ENGINE=openai`): requires `OPENAI_API_KEY`, auto-falls back to `say` on failure
- **ElevenLabs TTS** (`DIFF_REVIEW_TTS_ENGINE=elevenlabs`): requires `ELEVENLABS_API_KEY`, uses `scripts/tts-elevenlabs.js` (Node.js), auto-falls back to `say` on failure
- TTS runs asynchronously (non-blocking)
- User overrides go in `config/tts.local.json` (gitignored)

Key env vars: `DIFF_REVIEW_TTS_ENGINE`, `DIFF_REVIEW_TTS_VOICE`, `DIFF_REVIEW_TTS_RATE`, `DIFF_REVIEW_TTS_SPEED`, `OPENAI_API_KEY`, `ELEVENLABS_API_KEY`, `ELEVENLABS_VOICE_ID`, `DIFF_REVIEW_DEBUG`

## Runtime Dependencies

Requires: `bash`, `jq`, `git`, `gh` (GitHub CLI), `say` (macOS), `afplay` (macOS). Optional: `curl` (for OpenAI TTS), `node`/`npm` (for ElevenLabs TTS).

## Development

All "code" is markdown prompts and shell scripts. To modify behavior:

- Edit command specs in `commands/*.md` to change user-facing flow
- Edit agent prompts in `agents/*.md` to change analysis/narration behavior
- Edit `skills/narration/SKILL.md` or its `references/` to change narration quality rules
- Edit `scripts/tts.sh` for TTS engine logic
- Edit `config/tts.json` for default TTS settings

**Debugging**: Set `DIFF_REVIEW_DEBUG=true` or pass `--debug` to `tts.sh` for debug logging to stderr.

**Testing**: Manual only — run `/diff-review` and `/walkthrough` in Claude Code against real repos.

## Conventions

- Commands, agents, and skills are defined as **markdown files with YAML frontmatter** (model, tools, description)
- Agents use model `sonnet`; commands use `opus`
- Coderegon Trail games are self-contained HTML files — all CSS, JS, and game data inline, no external dependencies
- Trail data maps framework request/render pipelines to ~8 stops with code snippets, narration, and quiz events
- Narration must be conversational and TTS-friendly: sentences under 25 words, say "slash" for paths, spell out abbreviations, explain WHY not WHAT, never read code syntax literally
- Navigation state is tracked through conversation context (no external state files), including fly-through position and quiz scores
- Shell scripts use `set -euo pipefail`, source helpers from `scripts/lib/`, use `$PLUGIN_ROOT` for paths
- Fly-through snippets use clickable `file:line` format for VS Code terminal integration
- Quiz questions test understanding (why/what-if/trace), never memorization; evaluation is generous with partial credit
