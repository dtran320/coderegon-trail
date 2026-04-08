#!/usr/bin/env bash
set -euo pipefail

# Generate a game HTML file from a trail data JSON file + customizations
# Usage: ./scripts/generate-game.sh <game-dir> <trail-data.json> <customizations.js>
#
# trail-data.json: The TRAIL_DATA JSON object
# customizations.js: File containing:
#   - TITLE: single line with the <title> text
#   - FLAVORS: the travelFlavors array (JS)
#   - OVERLAYS: the drawEventOverlay function body (JS)

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
TEMPLATE="$PROJECT_ROOT/openclaw/index.html"

GAME_DIR="${1:?Usage: generate-game.sh <game-dir> <trail-data.json> <customizations.js>}"
TRAIL_DATA_FILE="${2:?Missing trail-data.json}"
CUSTOMIZATIONS_FILE="${3:?Missing customizations.js}"

# Create game directory
mkdir -p "$PROJECT_ROOT/$GAME_DIR"

OUTPUT="$PROJECT_ROOT/$GAME_DIR/index.html"

# Read customizations file sections
TITLE=$(sed -n '/^\/\/ TITLE$/,/^\/\/ END TITLE$/{ /^\/\//d; p; }' "$CUSTOMIZATIONS_FILE")
FLAVORS=$(sed -n '/^\/\/ FLAVORS$/,/^\/\/ END FLAVORS$/{ /^\/\/ \(END \)\?FLAVORS$/d; p; }' "$CUSTOMIZATIONS_FILE")
OVERLAYS=$(sed -n '/^\/\/ OVERLAYS$/,/^\/\/ END OVERLAYS$/{ /^\/\/ \(END \)\?OVERLAYS$/d; p; }' "$CUSTOMIZATIONS_FILE")

# Read trail data
TRAIL_DATA=$(cat "$TRAIL_DATA_FILE")

# Build the game HTML by extracting template sections and inserting custom parts
{
  # Lines 1-5: HTML header before title
  sed -n '1,5p' "$TEMPLATE"

  # Custom title
  echo "<title>$TITLE</title>"

  # Lines 7-137: CSS and HTML structure after title
  sed -n '7,137p' "$TEMPLATE"

  # Trail data line
  echo "const TRAIL_DATA=$TRAIL_DATA;"

  # Lines 139-188: Game state (identical across games)
  sed -n '139,188p' "$TEMPLATE"

  # Custom travel flavors
  echo "$FLAVORS"

  # Lines 206-489: Shared engine (canvas, rendering, etc.) up to overlay function header
  sed -n '206,489p' "$TEMPLATE"

  # Custom event overlays (inside drawEventOverlay function)
  echo "$OVERLAYS"

  # Close drawEventOverlay function + rest of engine
  echo "}"
  echo ""
  sed -n '711,$p' "$TEMPLATE"

} > "$OUTPUT"

echo "Generated $OUTPUT ($(wc -c < "$OUTPUT" | tr -d ' ') bytes)"
