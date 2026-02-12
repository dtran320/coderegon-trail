# Session Context

## User Prompts

### Prompt 1

Implement the following plan:

# ElevenLabs TTS Integration

## Context

The `elevenlabs-tts` branch exists to add ElevenLabs as a third TTS engine alongside macOS `say` and OpenAI. PLAN.md already captures user decisions: use Node.js + official `@elevenlabs/elevenlabs-js` SDK, keep section-by-section narration, ElevenLabs is opt-in via `DIFF_REVIEW_TTS_ENGINE=elevenlabs`.

## Files to Create

### 1. `package.json`
Minimal Node.js manifest with `@elevenlabs/elevenlabs-js` dependency. Run `npm in...

### Prompt 2

Commit and push this code, and if we're on a feature branch and there's not already a PR against dev, create one. If we're on the default (main or dev) branch, ask for confirmation before pushing:

