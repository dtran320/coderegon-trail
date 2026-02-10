# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**diff-pair-review** is a Claude Code plugin that provides AI-narrated code walkthroughs. It walks developers through diffs and codebases as if a staff engineer is pairing with them, using TTS narration. There is no build system, test suite, or package manager — the plugin is Markdown files (commands, agents, skills) plus Bash scripts (TTS).

## Architecture

The plugin follows Claude Code's plugin conventions:

- **`.claude-plugin/plugin.json`** — Plugin manifest (name, version, metadata)
- **`commands/`** — Two entry points: `diff-review.md` and `walkthrough.md`. These are the user-facing `/diff-review` and `/walkthrough` commands. They run on the Opus model and orchestrate agents.
- **`agents/`** — Three Sonnet-model agents that do the analytical work:
  - `diff-narrator.md` — Analyzes diffs, generates narration text
  - `codebase-narrator.md` — Analyzes codebases for guided tours
  - `domain-splitter.md` — Splits codebases into 2-4 domains for team mode (multi-voice)
- **`lib/shared-instructions.md`** — Common instructions (navigation UI, display formatting) shared by both commands
- **`skills/narration/`** — Narration quality guidelines: `SKILL.md` defines conversational style rules, `references/ranking.md` has the 1-7 importance scale, `references/voice-personas.md` has team mode voice assignments
- **`scripts/tts.sh`** — TTS execution wrapper supporting macOS `say` (default) and OpenAI TTS API. Sources `scripts/lib/config.sh` (JSON config loader) and `scripts/lib/utils.sh` (logging)
- **`config/tts.json`** — Default TTS settings (engine, voice, rate, verbosity)

## Key Design Patterns

**Importance ranking**: Diffs are ranked 1 (core business logic) through 7 (config/deps) and presented most-important-first. Boost/reduce factors adjust ranking based on security keywords, breaking changes, file size, etc. Defined in `skills/narration/references/ranking.md`.

**Interactive navigation**: Both commands use a stateful session with commands: next, prev, detail, related, question, jump, list, done. All state is held in conversation context (no external state files). Defined in `lib/shared-instructions.md`.

**TTS config cascade**: CLI flags > environment variables (`DIFF_REVIEW_TTS_*`) > `config/tts.json` > hardcoded defaults. The config loader in `scripts/lib/config.sh` implements this priority.

**Team mode**: The `--team` flag triggers the domain-splitter agent to partition the codebase, then assigns distinct voices (Samantha/Daniel/Karen/Tom for macOS, alloy/echo/nova/fable for OpenAI) to each domain.

**Narration style**: Agents must produce TTS-friendly plain text — no markdown, no code blocks, sentences under 25 words, spell out abbreviations, say "slash" for path separators, explain WHY not WHAT.

## Development

All "code" is Markdown prompts and Bash scripts. To modify behavior:

- Edit command specs in `commands/*.md` to change user-facing flow
- Edit agent prompts in `agents/*.md` to change analysis/narration behavior
- Edit `skills/narration/SKILL.md` or its `references/` to change narration quality rules
- Edit `scripts/tts.sh` for TTS engine logic
- Edit `config/tts.json` for default TTS settings

**Dependencies**: `git`, `gh` (GitHub CLI), `jq`, `curl`, `afplay` (macOS). OpenAI TTS additionally requires `OPENAI_API_KEY`.

**Debugging**: Set `DIFF_REVIEW_DEBUG=true` or pass `--debug` to `tts.sh` to enable debug logging to stderr.

**Testing**: Manual only. Test by running `/diff-review` and `/walkthrough` in Claude Code against real repos. Verify TTS plays, navigation works, and narration is conversational.
