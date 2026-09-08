#!/bin/sh
set -e

ROOT="$(cd "$(dirname "$0")/.." && pwd)"

if [ "$#" -eq 0 ]; then
  exec devcontainer exec \
    --workspace-folder "$ROOT" \
    fish -l
fi

exec devcontainer exec \
  --workspace-folder "$ROOT" \
  "$@"
