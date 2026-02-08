#!/bin/bash
# scripts/tts.sh - Universal TTS wrapper for diff-pair-review
# Supports macOS say (default) and OpenAI TTS API with automatic fallback
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PLUGIN_ROOT="$(dirname "$SCRIPT_DIR")"

source "${SCRIPT_DIR}/lib/utils.sh"
source "${SCRIPT_DIR}/lib/config.sh"

# Defaults (overridden by config/env/flags)
ENGINE="${DIFF_REVIEW_TTS_ENGINE:-say}"
VOICE="${DIFF_REVIEW_TTS_VOICE:-}"
RATE="${DIFF_REVIEW_TTS_RATE:-200}"
SPEED="${DIFF_REVIEW_TTS_SPEED:-1.0}"
MODEL="${DIFF_REVIEW_TTS_MODEL:-tts-1}"
DEBUG="${DIFF_REVIEW_DEBUG:-false}"
TEMP_DIR="${TMPDIR:-/tmp}/diff-review-tts"
TEXT=""

# --- Engine implementations ---

exec_say_tts() {
  local text="$1"
  local voice="$2"
  local rate="$3"

  if ! command -v say &>/dev/null; then
    error "say command not found"
    return 1
  fi

  debug "Executing: say -v '$voice' -r $rate"
  say -v "$voice" -r "$rate" "$text" &
}

exec_openai_tts() {
  local text="$1"
  local voice="$2"
  local model="$3"
  local speed="$4"

  if ! command -v curl &>/dev/null; then
    error "curl not found"; return 1
  fi
  if ! command -v afplay &>/dev/null; then
    error "afplay not found"; return 1
  fi
  if [[ -z "${OPENAI_API_KEY:-}" ]]; then
    error "OPENAI_API_KEY not set"; return 1
  fi

  local temp_file="${TEMP_DIR}/tts_$(date +%s%N).mp3"
  local escaped_text
  escaped_text=$(printf '%s' "$text" | jq -Rs .)

  debug "Calling OpenAI TTS API (model=$model, voice=$voice)"
  local http_code
  http_code=$(curl -s -w "%{http_code}" -o "$temp_file" \
    https://api.openai.com/v1/audio/speech \
    -H "Authorization: Bearer ${OPENAI_API_KEY}" \
    -H "Content-Type: application/json" \
    -d "{
      \"model\": \"${model}\",
      \"voice\": \"${voice}\",
      \"input\": ${escaped_text},
      \"speed\": ${speed}
    }")

  if [[ "$http_code" != "200" ]]; then
    error "OpenAI API returned HTTP $http_code"
    rm -f "$temp_file"
    return 1
  fi

  if [[ ! -s "$temp_file" ]]; then
    error "OpenAI API returned empty response"
    return 1
  fi

  debug "Playing audio with afplay"
  afplay "$temp_file" &
  local afplay_pid=$!

  # Clean up temp file after playback finishes
  (wait "$afplay_pid" 2>/dev/null; rm -f "$temp_file") &
}

# --- Argument parsing ---

while [[ $# -gt 0 ]]; do
  case $1 in
    --engine) ENGINE="$2"; shift 2 ;;
    --voice) VOICE="$2"; shift 2 ;;
    --rate) RATE="$2"; shift 2 ;;
    --speed) SPEED="$2"; shift 2 ;;
    --model) MODEL="$2"; shift 2 ;;
    --debug) DEBUG=true; shift ;;
    --help)
      cat <<'EOF'
Usage: tts.sh [OPTIONS] [TEXT]

OPTIONS:
  --engine ENGINE   say or openai (default: say)
  --voice VOICE     Voice name (default: Samantha/alloy)
  --rate RATE       Words per minute for say (default: 200)
  --speed SPEED     Speed multiplier for openai 0.25-4.0 (default: 1.0)
  --model MODEL     OpenAI model: tts-1 or tts-1-hd (default: tts-1)
  --debug           Enable debug output

ENVIRONMENT:
  DIFF_REVIEW_TTS_ENGINE, DIFF_REVIEW_TTS_VOICE, DIFF_REVIEW_TTS_RATE
  DIFF_REVIEW_TTS_SPEED, DIFF_REVIEW_TTS_MODEL, OPENAI_API_KEY
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

# Load config file defaults (for anything not already set)
load_config

# Set default voice based on engine if still empty
if [[ -z "$VOICE" ]]; then
  if [[ "$ENGINE" == "openai" ]]; then
    VOICE="alloy"
  else
    VOICE="Samantha"
  fi
fi

# Create temp directory
mkdir -p "$TEMP_DIR"

# Cleanup on exit
cleanup() { rm -rf "${TEMP_DIR}"/*.mp3 2>/dev/null || true; }
trap cleanup EXIT

# --- Execute ---

case "$ENGINE" in
  say)
    exec_say_tts "$TEXT" "$VOICE" "$RATE"
    ;;
  openai)
    if ! exec_openai_tts "$TEXT" "$VOICE" "$MODEL" "$SPEED"; then
      warn "OpenAI TTS failed, falling back to macOS say"
      exec_say_tts "$TEXT" "${DIFF_REVIEW_TTS_VOICE:-Samantha}" "$RATE"
    fi
    ;;
  *)
    warn "Unknown engine '$ENGINE', falling back to say"
    exec_say_tts "$TEXT" "Samantha" "$RATE"
    ;;
esac
