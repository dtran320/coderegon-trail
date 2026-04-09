#!/usr/bin/env bash
set -euo pipefail

# Generate a thin game HTML file from trail data JSON + customizations.
# The thin HTML defines TRAIL_DATA + overrides and loads shared engine.js.
#
# Usage: ./scripts/generate-game.sh <game-dir> <trail-data.json> <customizations.js>

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PLUGIN_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
source "$SCRIPT_DIR/lib/utils.sh"

GAME_DIR="${1:?Usage: generate-game.sh <game-dir> <trail-data.json> <customizations.js>}"
TRAIL_DATA_FILE="${2:?Missing trail-data.json}"
CUSTOMIZATIONS_FILE="${3:?Missing customizations.js}"

mkdir -p "$PLUGIN_ROOT/$GAME_DIR"
OUTPUT="$PLUGIN_ROOT/$GAME_DIR/index.html"

# Extract sections from customizations file
TITLE=$(sed -n '/^\/\/ TITLE$/,/^\/\/ END TITLE$/{ /^\/\//d; p; }' "$CUSTOMIZATIONS_FILE" | head -1)
FLAVORS=$(sed -n '/^\/\/ FLAVORS$/,/^\/\/ END FLAVORS$/{ /^\/\/ \(END \)\?FLAVORS$/d; p; }' "$CUSTOMIZATIONS_FILE")
OVERLAYS=$(sed -n '/^\/\/ OVERLAYS$/,/^\/\/ END OVERLAYS$/{ /^\/\/ \(END \)\?OVERLAYS$/d; p; }' "$CUSTOMIZATIONS_FILE")

TRAIL_DATA=$(cat "$TRAIL_DATA_FILE")

cat > "$OUTPUT" <<HTMLEOF
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${TITLE}</title>
</head>
<body>
<div id="game-container">
  <div id="canvas-area">
    <canvas id="game-canvas" width="320" height="200"></canvas>
    <div id="music-indicator">M: Music</div>
  </div>
  <div id="text-panel"></div>
  <div id="status-bar"></div>
</div>

<script>
window.TRAIL_DATA = ${TRAIL_DATA};

HTMLEOF

# Append flavors
echo "$FLAVORS" | sed 's/^const travelFlavors/window.TRAIL_FLAVORS/' >> "$OUTPUT"

# Append overlays as drawCustomEventOverlay
cat >> "$OUTPUT" <<'JSEOF'

window.drawCustomEventOverlay = function(time) {
  if (!currentEventType && !currentEventTitle) return;
  var t = (time || 0) * 0.001;

JSEOF

echo "$OVERLAYS" >> "$OUTPUT"

cat >> "$OUTPUT" <<'HTMLEOF'
};
</script>
<script src="../engine.js"></script>
</body>
</html>
HTMLEOF

echo "Generated $OUTPUT ($(wc -c < "$OUTPUT" | tr -d ' ') bytes)"
