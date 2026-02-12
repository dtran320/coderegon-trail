#!/usr/bin/env bash
# generate-retro-page.sh — Fetch GitHub repo metadata and produce a games.json
#
# Usage:
#   ./scripts/generate-retro-page.sh <owner/repo> [owner/repo...]
#   ./scripts/generate-retro-page.sh --trending [--since=monthly]
#   ./scripts/generate-retro-page.sh --from-file repos.txt
#
# Output: writes games-data.json to stdout (pipe to file or feed to the template)
# The creative fields (genre, descriptions, ASCII art) are left as placeholders —
# those are filled in by the directory-generator agent.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# ─── Helpers ───

usage() {
  cat <<'EOF'
Usage:
  generate-retro-page.sh <owner/repo> [owner/repo...]
  generate-retro-page.sh --trending [--since=monthly|weekly|daily]
  generate-retro-page.sh --from-file <file>    (one owner/repo per line)

Options:
  --output <file>    Write to file instead of stdout
  --title <title>    Directory title
  --help             Show this help

Output: JSON matching the games-schema.json format.
Creative fields (genre, descriptions, ASCII art) are set to placeholders.
Use the directory-generator agent to fill those in.
EOF
  exit 0
}

# Requires: gh, jq
for cmd in gh jq; do
  if ! command -v "$cmd" &>/dev/null; then
    echo "ERROR: '$cmd' is required but not installed." >&2
    exit 1
  fi
done

# ─── Argument parsing ───

REPOS=()
TRENDING=false
SINCE="monthly"
OUTPUT=""
TITLE=""
FROM_FILE=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --trending) TRENDING=true; shift ;;
    --since=*) SINCE="${1#--since=}"; shift ;;
    --output) OUTPUT="$2"; shift 2 ;;
    --title) TITLE="$2"; shift 2 ;;
    --from-file) FROM_FILE="$2"; shift 2 ;;
    --help|-h) usage ;;
    -*) echo "Unknown option: $1" >&2; exit 1 ;;
    *) REPOS+=("$1"); shift ;;
  esac
done

# Load repos from file
if [[ -n "$FROM_FILE" ]]; then
  while IFS= read -r line; do
    line="$(echo "$line" | sed 's/#.*//' | xargs)"  # strip comments + whitespace
    [[ -n "$line" ]] && REPOS+=("$line")
  done < "$FROM_FILE"
fi

# ─── Fetch trending repos via GitHub search (approximate) ───

if [[ "$TRENDING" == "true" && ${#REPOS[@]} -eq 0 ]]; then
  echo "Fetching trending repos (since=$SINCE)..." >&2

  # Use GitHub search API to approximate trending
  case "$SINCE" in
    daily)   DATE_FILTER="$(date -d '1 day ago' '+%Y-%m-%d' 2>/dev/null || date -v-1d '+%Y-%m-%d')" ;;
    weekly)  DATE_FILTER="$(date -d '7 days ago' '+%Y-%m-%d' 2>/dev/null || date -v-7d '+%Y-%m-%d')" ;;
    monthly) DATE_FILTER="$(date -d '30 days ago' '+%Y-%m-%d' 2>/dev/null || date -v-30d '+%Y-%m-%d')" ;;
    *) DATE_FILTER="$(date -d '30 days ago' '+%Y-%m-%d' 2>/dev/null || date -v-30d '+%Y-%m-%d')" ;;
  esac

  SEARCH_RESULTS=$(gh api "search/repositories?q=created:>$DATE_FILTER+stars:>1000&sort=stars&order=desc&per_page=8" \
    --jq '.items[].full_name' 2>/dev/null || echo "")

  if [[ -z "$SEARCH_RESULTS" ]]; then
    echo "WARNING: Could not fetch trending repos. Provide repos manually." >&2
    exit 1
  fi

  while IFS= read -r repo; do
    REPOS+=("$repo")
  done <<< "$SEARCH_RESULTS"
fi

if [[ ${#REPOS[@]} -eq 0 ]]; then
  echo "ERROR: No repos specified. Use --trending or provide owner/repo arguments." >&2
  usage
fi

# ─── Fetch repo metadata ───

GAMES_JSON="[]"
COLOR_CYCLE=("red" "cyan" "magenta" "amber" "bright-blue" "green" "orange" "blue")

for i in "${!REPOS[@]}"; do
  repo="${REPOS[$i]}"
  color="${COLOR_CYCLE[$((i % ${#COLOR_CYCLE[@]}))]}"

  echo "Fetching metadata for $repo..." >&2

  # Fetch repo data via gh api
  REPO_DATA=$(gh api "repos/$repo" 2>/dev/null || echo "{}")

  if echo "$REPO_DATA" | jq -e '.message' &>/dev/null 2>&1; then
    echo "WARNING: Could not fetch $repo ($(echo "$REPO_DATA" | jq -r '.message')). Skipping." >&2
    continue
  fi

  NAME=$(echo "$REPO_DATA" | jq -r '.name // "unknown"')
  FULL_NAME=$(echo "$REPO_DATA" | jq -r '.full_name // "unknown/unknown"')
  DESCRIPTION=$(echo "$REPO_DATA" | jq -r '.description // "No description"')
  STARS=$(echo "$REPO_DATA" | jq -r '.stargazers_count // 0')
  LANGUAGE=$(echo "$REPO_DATA" | jq -r '.language // "Unknown"')
  LICENSE=$(echo "$REPO_DATA" | jq -r '.license.spdx_id // "UNLICENSED"')

  # Generate a short slug from repo name
  SLUG=$(echo "$NAME" | tr '[:upper:]' '[:lower:]' | tr -c '[:alnum:]' '-' | head -c 10 | sed 's/-$//')

  # Truncate name for .EXE format (max 8 chars, DOS style)
  EXE_NAME=$(echo "$NAME" | tr '[:lower:]' '[:upper:]' | tr -c '[:alnum:]' '' | head -c 8)

  # Build the game entry
  GAME_ENTRY=$(jq -n \
    --arg id "$SLUG" \
    --arg name "${EXE_NAME}.EXE" \
    --arg repo "$FULL_NAME" \
    --arg language "$LANGUAGE" \
    --arg license "$LICENSE" \
    --arg genre "GENRE_PLACEHOLDER" \
    --argjson stars "$STARS" \
    --arg trend "+NEW" \
    --arg description "$DESCRIPTION" \
    --arg color "$color" \
    '{
      id: $id,
      name: $name,
      repo: $repo,
      language: $language,
      license: $license,
      genre: $genre,
      stars: $stars,
      trend: $trend,
      description: $description,
      color: $color,
      detail: {
        title: ($name + " — TITLE_PLACEHOLDER"),
        asciiArt: "  ╔═══════════════════════════════╗\n  ║  " + $name + "              ║\n  ║  ★ " + ($stars | tostring) + " stars              ║\n  ║  " + $language + "                     ║\n  ╚═══════════════════════════════╝",
        paragraphs: [$description, "DETAIL_PLACEHOLDER — Fill in with the directory-generator agent."],
        tags: [
          { label: ($language | ascii_upcase), color: $color },
          { label: $license, color: "dark-gray" }
        ]
      }
    }')

  GAMES_JSON=$(echo "$GAMES_JSON" | jq --argjson entry "$GAME_ENTRY" '. + [$entry]')
done

# ─── Assemble final JSON ───

TOTAL_STARS=$(echo "$GAMES_JSON" | jq '[.[].stars] | add // 0')
GAME_COUNT=$(echo "$GAMES_JSON" | jq 'length')
NOW=$(date -u '+%Y-%m-%dT%H:%M:%SZ')

if [[ -z "$TITLE" ]]; then
  TITLE="GITHUB GAME DIRECTORY — ${GAME_COUNT} PROGRAMS"
fi

RESULT=$(jq -n \
  --arg title "$TITLE" \
  --arg subtitle "GAME DIRECTORY v2.026" \
  --arg source "Generated $(date '+%b %Y')" \
  --arg sourceUrl "" \
  --arg generated "$NOW" \
  --argjson games "$GAMES_JSON" \
  '{
    title: $title,
    subtitle: $subtitle,
    source: $source,
    sourceUrl: $sourceUrl,
    generated: $generated,
    games: $games
  }')

if [[ -n "$OUTPUT" ]]; then
  echo "$RESULT" | jq '.' > "$OUTPUT"
  echo "Wrote $OUTPUT ($GAME_COUNT games, $TOTAL_STARS total stars)" >&2
else
  echo "$RESULT" | jq '.'
fi
