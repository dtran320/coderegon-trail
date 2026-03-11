#!/bin/bash
# scripts/fly-pause.sh - Estimate TTS duration and pause for fly-through auto-advance
# Used between fly-through steps to wait for narration to finish + buffer
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PLUGIN_ROOT="$(dirname "$SCRIPT_DIR")"

source "${SCRIPT_DIR}/lib/utils.sh"
source "${SCRIPT_DIR}/lib/config.sh"

# Defaults
WPM="${DIFF_REVIEW_TTS_RATE:-200}"
BUFFER=2
TEXT=""

# Parse arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --wpm) WPM="$2"; shift 2 ;;
    --buffer) BUFFER="$2"; shift 2 ;;
    --help)
      cat <<'EOF'
Usage: fly-pause.sh [OPTIONS] [TEXT]

Estimates TTS duration from word count and pauses for that duration plus a buffer.
Used by fly-through mode to time auto-advance between code snippets.

OPTIONS:
  --wpm RATE      Words per minute (default: 200, from TTS config)
  --buffer SECS   Additional seconds to wait after estimated duration (default: 2)

ENVIRONMENT:
  DIFF_REVIEW_TTS_RATE   WPM rate (same as tts.sh)
EOF
      exit 0
      ;;
    *) TEXT="$*"; break ;;
  esac
done

# Read from stdin if no text argument
if [[ -z "$TEXT" ]]; then
  TEXT=$(cat)
fi

if [[ -z "$TEXT" ]]; then
  error "No text provided"
  exit 1
fi

# Load config for WPM if not overridden
CONFIG_FILE="${PLUGIN_ROOT}/config/tts.json"
if [[ -f "$CONFIG_FILE" ]]; then
  CONFIG_BUFFER=$(jq -r '.fly_through.auto_pause_buffer // 2' "$CONFIG_FILE")
  if [[ "$BUFFER" == "2" ]]; then
    BUFFER="$CONFIG_BUFFER"
  fi
  if [[ -z "${DIFF_REVIEW_TTS_RATE:-}" ]]; then
    WPM=$(jq -r '.say.rate // 200' "$CONFIG_FILE")
  fi
fi

# Count words
WORD_COUNT=$(echo "$TEXT" | wc -w | tr -d ' ')

# Calculate duration: (words / WPM) * 60 + buffer
if [[ "$WORD_COUNT" -eq 0 ]]; then
  DURATION="$BUFFER"
else
  # Use awk for floating point math
  DURATION=$(awk "BEGIN {printf \"%.1f\", ($WORD_COUNT / $WPM) * 60 + $BUFFER}")
fi

debug "Word count: $WORD_COUNT, WPM: $WPM, Buffer: ${BUFFER}s, Total pause: ${DURATION}s"

# Sleep for the calculated duration
sleep "$DURATION"
