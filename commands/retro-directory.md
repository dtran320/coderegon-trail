---
model: opus
tools:
  - Bash
  - Read
  - Write
  - Task
  - WebFetch
description: "/retro-directory — Generate a retro DOS-style game directory page for GitHub repos"
user_invocable: true
---

# /retro-directory

Generate a retro DOS-style game directory page that presents GitHub repositories as shareware games from 1993. Each repo gets a game genre, ASCII box art, and a detail panel — all rendered in a CRT-phosphor terminal aesthetic.

## Usage

```
/retro-directory <owner/repo> [owner/repo...]     # specific repos
/retro-directory --trending                        # top trending repos
/retro-directory --pr <PR-URL-or-number>           # repos touched by a PR
/retro-directory --file repos.txt                  # repos from a file
```

## Options

- `--title "Custom Title"` — Override the directory title
- `--output <path>` — Where to write the generated HTML (default: `retro-directory/index.html`)
- `--data-only` — Only generate the games.json, skip HTML generation
- `--no-creative` — Skip the AI-generated creative content (use placeholder descriptions)

## Execution Flow

### Step 1: Gather Repos
Parse the arguments to determine which repos to include:
- Direct `owner/repo` args → use as-is
- `--trending` → use `scripts/generate-retro-page.sh --trending`
- `--pr <url>` → extract changed files, map to repos
- `--file <path>` → read repos from file

### Step 2: Fetch Metadata
Run `scripts/generate-retro-page.sh` with the repo list to produce a skeleton `games.json` with real GitHub metadata (stars, language, description) but placeholder creative fields.

```bash
bash scripts/generate-retro-page.sh owner/repo1 owner/repo2 --output data/generated-games.json
```

### Step 3: Generate Creative Content
Unless `--no-creative` is set, spawn the `directory-generator` agent to fill in:
- Game genre mappings
- ASCII art for each repo
- Game-style descriptions and detail paragraphs
- Tag assignments

The agent reads the skeleton `games.json`, enriches it, and writes the result back.

### Step 4: Assemble HTML
Copy `templates/directory.html` to the output location. Place the final `games.json` alongside it so the template can load it.

If `--output` points to a single HTML file, inline the JSON data into the HTML using:
```html
<script>window.GAME_DATA = { ... };</script>
```

### Step 5: Present Result
- Show the user the output path
- If possible, suggest opening it: `open <path>` or `python3 -m http.server`
- Show a summary: N repos, total stars, genres assigned

## Output Structure

```
<output-dir>/
  index.html          # The retro directory page (from template)
  games.json          # The data file
```

Or if `--output` is a single file:
```
<output>.html         # Self-contained HTML with inlined data
```

## Example

```
/retro-directory anthropics/claude-code openai/codex remotion-dev/remotion

Generating retro directory for 3 repos...
  ✓ Fetched metadata for anthropics/claude-code (45,231 ★)
  ✓ Fetched metadata for openai/codex (12,891 ★)
  ✓ Fetched metadata for remotion-dev/remotion (36,201 ★)
  ✓ Generated creative content (3 entries)
  ✓ Assembled HTML → retro-directory/index.html

Open with: open retro-directory/index.html
```

## Template System

The HTML template (`templates/directory.html`) is fully data-driven:
- Loads `games.json` from multiple fallback paths
- Supports `?data=URL` query param for custom data sources
- Supports `window.GAME_DATA` for inlined data
- All rendering (list, detail panels, boot sequence) is generated from the JSON

The data schema is defined in `templates/games-schema.json`.
