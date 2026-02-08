#!/bin/bash
# Configuration loader for diff-pair-review TTS
# Priority: CLI flags > env vars > config file > defaults

load_config() {
  local config_file="${PLUGIN_ROOT}/config/tts.json"

  if [[ ! -f "$config_file" ]]; then
    debug "No config file found at $config_file, using defaults"
    return
  fi

  debug "Loading config from $config_file"

  if [[ -z "${DIFF_REVIEW_TTS_ENGINE:-}" ]]; then
    ENGINE=$(jq -r '.engine // "say"' "$config_file")
  fi

  if [[ -z "${DIFF_REVIEW_TTS_VOICE:-}" ]]; then
    if [[ "$ENGINE" == "say" ]]; then
      VOICE=$(jq -r '.say.voice // "Samantha"' "$config_file")
    else
      VOICE=$(jq -r '.openai.voice // "alloy"' "$config_file")
    fi
  fi

  if [[ -z "${DIFF_REVIEW_TTS_RATE:-}" ]]; then
    RATE=$(jq -r '.say.rate // 200' "$config_file")
  fi

  if [[ -z "${DIFF_REVIEW_TTS_SPEED:-}" ]]; then
    SPEED=$(jq -r '.openai.speed // 1.0' "$config_file")
  fi

  if [[ -z "${DIFF_REVIEW_TTS_MODEL:-}" ]]; then
    MODEL=$(jq -r '.openai.model // "tts-1"' "$config_file")
  fi
}
