# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Claude Code plugin that provides TTS-narrated code walkthroughs — walking through PRs, diffs, and codebases like a staff engineer pairing with you. No build step; the plugin is entirely markdown specs + shell scripts following Claude Code plugin conventions.

## Architecture

```
commands/          User-facing CLI commands (markdown specs)
  diff-review.md     /diff-review - walk through diffs ranked by importance
  walkthrough.md     /walkthrough - guided codebase tour (8 sections)

agents/            Claude-powered analysis agents (model: sonnet)
  diff-narrator.md      Analyzes diffs, generates TTS-friendly narration
  codebase-narrator.md  Analyzes codebase structure for walkthroughs
  domain-splitter.md    Splits codebase into 2-4 domains for team mode

skills/narration/  Narration generation guidelines
  SKILL.md             Core narration principles and verbosity levels
  references/
    ranking.md         Section importance ranking (1-7 scale)
    voice-personas.md  Voice assignments for team mode

lib/               Shared cross-cutting instructions
  shared-instructions.md  Navigation commands, display formatting, state tracking

scripts/           Shell infrastructure
  tts.sh             Universal TTS wrapper (macOS say + OpenAI API fallback)
  lib/config.sh      Config file loader (JSON via jq)
  lib/utils.sh       Shared shell utilities

config/tts.json    Default TTS configuration
```

## Key Execution Flows

**Diff Review:** Parse target args → fetch diff (git/gh) → group files into logical sections → rank by importance (1=core logic, 7=config) → present overview → walk through sections with TTS narration → handle navigation commands

**Walkthrough:** Parse scope → spawn 3 parallel Explore agents (architecture, entry points, patterns) → synthesize into 8 sections (overview → architecture → entry points → domain logic → data layer → integrations → testing → build/deploy) → present with TTS narration

**Team Mode (`--team`):** Domain splitter agent divides content into 2-4 domains → each domain assigned a voice persona (Lead=Samantha/alloy, Backend=Daniel/echo, Frontend=Karen/nova, Infra=Tom/fable) → lead narrates transitions, specialists narrate their domains

## TTS System

`scripts/tts.sh` is the universal TTS wrapper. Config priority: CLI flags > env vars > `config/tts.json` > defaults.

- **macOS `say`** (default): voice=Samantha, rate=200 WPM
- **OpenAI TTS** (`DIFF_REVIEW_TTS_ENGINE=openai`): requires `OPENAI_API_KEY`, auto-falls back to `say` on failure
- TTS runs asynchronously (non-blocking)
- User overrides go in `config/tts.local.json` (gitignored)

Key env vars: `DIFF_REVIEW_TTS_ENGINE`, `DIFF_REVIEW_TTS_VOICE`, `DIFF_REVIEW_TTS_RATE`, `DIFF_REVIEW_TTS_SPEED`, `OPENAI_API_KEY`, `DIFF_REVIEW_DEBUG`

## Runtime Dependencies

Requires: `bash`, `jq`, `git`, `gh` (GitHub CLI), `say` (macOS), `afplay` (macOS). Optional: `curl` (for OpenAI TTS).

## Conventions

- Commands, agents, and skills are defined as **markdown files with YAML frontmatter** (model, tools, description)
- Agents use model `sonnet`; commands use `opus`
- Narration must be conversational and TTS-friendly: sentences under 25 words, say "slash" for paths, spell out abbreviations, explain WHY not WHAT, never read code syntax literally
- Navigation state is tracked through conversation context (no external state files)
- Shell scripts use `set -euo pipefail`, source helpers from `scripts/lib/`, use `$PLUGIN_ROOT` for paths
