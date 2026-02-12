---
description: "Generate a retro DOS-style game directory page for GitHub repos"
argument-hint: "[owner/repo... | --trending | --pr <#>]"
allowed-tools:
  - Bash(gh:*)
  - Bash(git:*)
  - Bash(jq:*)
  - Bash(${CLAUDE_PLUGIN_ROOT}/scripts/*:*)
  - Bash(open:*)
  - Bash(python3:*)
  - Read
  - Grep
  - Glob
  - Task
  - Write
model: opus
---

# Retro Directory — DOS-Style Game Directory Generator

You generate retro DOS-style game directory pages that present GitHub repositories as shareware games from 1993. Each repo gets a game genre, ASCII box art, and a detail panel — rendered in a CRT-phosphor terminal aesthetic.

**User input:** "$ARGUMENTS"

Use `templates/games-schema.json` for the data format. Use `templates/directory.html` as the rendering template.

## Step 1: Parse Arguments and Determine Repos

Parse the user's input to determine which repos to include:

1. If input contains `owner/repo` patterns (e.g. `anthropics/claude-code`) → collect all repos
2. If input contains `--trending` → fetch trending repos via: `${CLAUDE_PLUGIN_ROOT}/scripts/generate-retro-page.sh --trending`
3. If input contains `--pr` followed by a number or URL → extract the repo from the PR
4. If input contains `--file` followed by a path → read repos from that file (one per line)
5. If input is empty → check current repo with `git remote get-url origin`, offer to generate for it

Check for flags:
- `--title "Custom Title"` → override directory title
- `--output <path>` → custom output path (default: `.diff-review/retro-directory/`)
- `--data-only` → only generate games.json, skip HTML
- `--no-creative` → use placeholder descriptions instead of AI-generated content

## Step 2: Fetch Repo Metadata

Run the generator script to fetch real GitHub metadata for each repo:

```bash
${CLAUDE_PLUGIN_ROOT}/scripts/generate-retro-page.sh owner/repo1 owner/repo2 \
  --output .diff-review/retro-directory/games.json
```

This produces a skeleton `games.json` with real data (stars, language, description, license) but placeholder creative fields (`GENRE_PLACEHOLDER`, `TITLE_PLACEHOLDER`, `DETAIL_PLACEHOLDER`).

If the script fails (e.g. `gh` not authenticated), fall back to manual metadata fetching:
```bash
gh api repos/owner/repo --jq '{name: .name, stars: .stargazers_count, language: .language, description: .description, license: .license.spdx_id}'
```

## Step 3: Generate Creative Content

Unless `--no-creative` was specified, YOU generate the creative content directly. For each repo in the skeleton JSON:

### 3a. Game Genre Mapping
Map the repo's purpose to a retro game genre:
- AI agents, automation → "Strategy/Agent Sim"
- Code editors, coding tools, IDEs → "RPG/Coding Quest"
- Security, pentesting → "Hacking Sim"
- Prompt extraction, reverse engineering → "Espionage/Stealth"
- UI frameworks, component libraries → "Platformer/Builder"
- Data/RAG/search tools → "Dungeon/Knowledge"
- Video, media, creative tools → "Creative/Studio"
- DevOps, infra, deployment → "City Builder/Ops"
- ML, neural networks → "Neural Sim"
- Skills, plugins, extensions → "Skill Tree RPG"

### 3b. EXE Name
Truncate repo name to 8 chars DOS-style, uppercase: `REPONAME.EXE`

### 3c. One-Line Tagline
A punchy game-catalog tagline under 80 chars. Should feel like 1993 shareware.

### 3d. Detail Title
Format: `NAME.EXE — SUBTITLE` (2-3 word game fantasy subtitle)

### 3e. ASCII Art (8-12 lines)
Create box-drawing ASCII art for each detail panel:
- Use `╔═╗║╚╝┌─┐│└┘` box characters
- Include progress bars: `████████░░`
- Max 40 chars wide, 8-12 lines tall
- Thematic to the repo
- At least one stat or progress indicator

### 3f. Detail Paragraphs (2)
- **Paragraph 1**: Factual-but-exciting overview — what it does, key numbers, why it matters. Written like a game manual intro.
- **Paragraph 2**: The game fantasy — describe using the project as if it were the game. Mechanics metaphors, power-ups, boss fights.

### 3g. Color Assignment
Cycle through: `red`, `cyan`, `magenta`, `amber`, `bright-blue`, `green`, `orange`, `blue`

### 3h. Tags
2-3 tags per entry: `[{label: "LANGUAGE", color: game_color}, {label: "CATEGORY", color: contrasting_color}, {label: "LICENSE", color: "dark-gray"}]`

Read the skeleton JSON, fill in all placeholders with the creative content above, and write the enriched JSON back.

## Step 4: Assemble HTML

Read the template from `${CLAUDE_PLUGIN_ROOT}/templates/directory.html`.

Generate a **self-contained HTML file** by inlining the JSON data:

1. Read the template HTML
2. Read the enriched `games.json`
3. Inject the data by adding this before the closing `</script>` or `boot()` call:
   ```javascript
   window.GAME_DATA = {THE_JSON_DATA};
   ```
4. Write the combined file to the output path:
   - Default: `.diff-review/retro-directory/index.html`
   - Or the path specified by `--output`

If `--data-only` was specified, skip this step and just write the JSON.

## Step 5: Open and Present

1. Try to open the file in the browser:
   ```bash
   open .diff-review/retro-directory/index.html  # macOS
   ```
   If `open` is not available, suggest: `python3 -m http.server 8080 -d .diff-review/retro-directory/`

2. Display a summary in the terminal:

```
════════════════════════════════════════════════════
  RETRO GAME DIRECTORY — GENERATED
════════════════════════════════════════════════════

  Programs:  {N} repos
  Stars:     {total} ★ total
  Output:    {path}

  Directory:
    1. {NAME.EXE}  {genre}  {stars} ★
    2. {NAME.EXE}  {genre}  {stars} ★
    ...

  Open: {path}
════════════════════════════════════════════════════
```

## Error Handling

- If `gh` is not installed or not authenticated: fall back to public API via `curl`
- If a repo doesn't exist: warn and skip it, continue with remaining repos
- If no repos could be fetched: show error with usage examples
- If output directory doesn't exist: create it with `mkdir -p`
