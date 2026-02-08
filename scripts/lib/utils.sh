#!/bin/bash
# Shared utilities for diff-pair-review scripts

debug() {
  if [[ "${DEBUG:-false}" == "true" ]]; then
    echo "[DEBUG] $*" >&2
  fi
}

warn() {
  echo "[WARN] $*" >&2
}

error() {
  echo "[ERROR] $*" >&2
}

info() {
  echo "[INFO] $*" >&2
}
