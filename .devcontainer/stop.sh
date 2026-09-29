#!/bin/sh
set -e

# -----------------------------------------------------------------------------
# Configuration
# -----------------------------------------------------------------------------

ROOT="$(cd "$(dirname "$0")/.." && pwd)"

# -----------------------------------------------------------------------------
# Container
# -----------------------------------------------------------------------------

# Dev Container CLI labels containers with their local workspace folder. Use
# that label to find the container belonging to this project.
CONTAINER_ID="$(
  docker container ls -aq \
    --filter "label=devcontainer.local_folder=$ROOT" |
    head -n 1
)"

if [ -n "$CONTAINER_ID" ]; then
  echo "⏹️ Stopping dev container..."
  docker stop "$CONTAINER_ID" >/dev/null

  echo "✓ Dev container stopped."
else
  echo "Dev container does not exist."
fi
