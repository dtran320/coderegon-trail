#!/bin/bash
# scripts/open-viz.sh - Write an HTML visualization file and open it in the browser
# Used by /fly-visual to display the Oregon Code Trail game
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PLUGIN_ROOT="$(dirname "$SCRIPT_DIR")"

source "${SCRIPT_DIR}/lib/utils.sh"

# Defaults
OUTPUT_DIR="${PLUGIN_ROOT}/.diff-review"
FILENAME=""
OPEN_BROWSER=true

# Parse arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --output-dir) OUTPUT_DIR="$2"; shift 2 ;;
    --filename) FILENAME="$2"; shift 2 ;;
    --no-open) OPEN_BROWSER=false; shift ;;
    --help)
      cat <<'EOF'
Usage: open-viz.sh [OPTIONS] < HTML_CONTENT

Reads HTML content from stdin, writes it to a file, and opens it in the browser.

OPTIONS:
  --output-dir DIR   Directory to write the HTML file (default: .diff-review/)
  --filename NAME    Output filename (default: trail-{timestamp}.html)
  --no-open          Write file but don't open in browser

EXAMPLE:
  echo "<html>...</html>" | open-viz.sh --filename "trail-nextjs.html"
  open-viz.sh --filename "trail-rails.html" < game.html
EOF
      exit 0
      ;;
    *) error "Unknown option: $1"; exit 1 ;;
  esac
done

# Read HTML content from stdin
HTML_CONTENT=$(cat)

if [[ -z "$HTML_CONTENT" ]]; then
  error "No HTML content provided on stdin"
  exit 1
fi

# Create output directory
mkdir -p "$OUTPUT_DIR"

# Generate filename if not provided
if [[ -z "$FILENAME" ]]; then
  FILENAME="trail-$(date +%Y%m%d-%H%M%S).html"
fi

OUTPUT_PATH="${OUTPUT_DIR}/${FILENAME}"

# Write the HTML file
printf '%s' "$HTML_CONTENT" > "$OUTPUT_PATH"
info "Wrote visualization to ${OUTPUT_PATH}"

# Open in browser
if [[ "$OPEN_BROWSER" == true ]]; then
  if command -v open &>/dev/null; then
    open "$OUTPUT_PATH"
    info "Opened in browser"
  elif command -v xdg-open &>/dev/null; then
    xdg-open "$OUTPUT_PATH"
    info "Opened in browser"
  else
    warn "Could not detect browser opener. File is at: ${OUTPUT_PATH}"
  fi
fi

# Print the path for the caller
echo "$OUTPUT_PATH"
