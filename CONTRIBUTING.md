# Contributing to Coderegon Trail

Thanks for your interest in contributing! This project teaches web frameworks through an Oregon Trail-style game, so contributions that improve accuracy, add frameworks, or make the games more fun are all welcome.

## Fixing Inaccuracies

The most valuable contribution you can make is **correcting inaccuracies in the game content**. Each game teaches a framework's request pipeline through code snippets, narration, and quiz questions — and these can drift as frameworks evolve.

If you spot something wrong:

1. **Code snippets** that don't match current framework APIs or conventions
2. **Quiz questions** with incorrect answers or outdated options
3. **Narration text** that misexplains how a framework works
4. **Pipeline ordering** that doesn't reflect the actual request lifecycle
5. **Party member names** (framework concepts) that are misleading

Please open an issue or PR. Even small fixes matter — a wrong quiz answer can teach the wrong thing.

### Where game content lives

- **Pre-built games**: `<game>/index.html` — each file contains `TRAIL_DATA` (stops with code snippets and narration) and `TRAIL_FLAVORS` (quiz events)
- **Framework trail definitions**: `skills/visualization/references/framework-trails.md` — canonical trail data for the 7 core frameworks (Next.js, Rails, Django, Express, React, Laravel, OpenClaw)
- **Game mechanics**: `skills/visualization/references/coderegon-trail.md` — event types, scoring, death messages
- **Shared engine**: `engine.js` — rendering, state machine, audio, UI (shared by all games)

### Updating a pre-built game

Each game's `index.html` is self-contained. To fix a code snippet or quiz question:

1. Open the game's `index.html`
2. Find the `TRAIL_DATA` object (stops, code, narration) or `TRAIL_FLAVORS` object (quiz events)
3. Make your fix
4. Test by serving locally: `python3 -m http.server 8080` and opening the game in your browser

### Updating framework trail definitions

If the fix applies to a framework that Claude generates trails for (Next.js, Rails, Django, Express, React, Laravel, OpenClaw), also update the canonical definition in `skills/visualization/references/framework-trails.md`. This ensures future generated games get the fix too.

## Adding a New Game

To add a game for a new framework or project:

1. Create a new directory: `<game-name>/index.html`
2. Follow the pattern of existing games — define `TRAIL_DATA`, `TRAIL_FLAVORS`, and `TRAIL_CONFIG`, then load `engine.js`
3. Map the framework's request/render pipeline to ~8 stops
4. Write 15 quiz events across three difficulty tiers (easy/medium/hard), 5 each
5. Test thoroughly in the browser

Look at `gstack/index.html` or `rails/index.html` as examples.

## Development Setup

No build step. The entire project is markdown specs, shell scripts, and static HTML/JS.

```bash
git clone https://github.com/anthropics/coderegon-trail.git
cd coderegon-trail
python3 -m http.server 8080
# visit http://localhost:8080 to browse games
```

To test the Claude Code plugin commands (`/trail`, `/diff-review`, `/walkthrough`), install the plugin locally:

```bash
claude plugin add ./coderegon-trail
```

### Project structure

- `commands/*.md` — User-facing CLI command specs
- `agents/*.md` — Claude-powered analysis agent prompts
- `skills/` — Game generation and narration guidelines
- `engine.js` — Shared game engine
- `scripts/` — Shell infrastructure (TTS, config)
- `<game>/index.html` — Pre-built game files

### Testing

Testing is manual. After any change:

1. Serve locally and play through the affected game in a browser
2. Verify code snippets render with syntax highlighting
3. Check that quiz events display correctly and answers are scored right
4. For plugin changes, test the relevant `/trail`, `/diff-review`, or `/walkthrough` command in Claude Code

## Conventions

- Game HTML files define only data and overrides — all shared logic lives in `engine.js`
- Commands, agents, and skills are markdown files with YAML frontmatter
- Shell scripts use `set -euo pipefail` and source helpers from `scripts/lib/`
- Narration should be conversational and TTS-friendly: short sentences, say "slash" for `/`, spell out abbreviations

## Submitting Changes

1. Fork the repo and create a branch
2. Make your changes
3. Test locally (see above)
4. Open a PR with a clear description of what you changed and why

For inaccuracy fixes, please mention the framework and what was wrong so reviewers can verify.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
