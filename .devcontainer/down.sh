#!/bin/sh
set -e

# -----------------------------------------------------------------------------
# Configuration
# -----------------------------------------------------------------------------

ROOT="$(cd "$(dirname "$0")/.." && pwd)"

# -----------------------------------------------------------------------------
# Container
# -----------------------------------------------------------------------------

# Find the Docker container belonging to this workspace.
CONTAINER_ID="$(
  docker container ls -aq \
    --filter "label=devcontainer.local_folder=$ROOT" |
    head -n 1
)"

if [ -n "$CONTAINER_ID" ]; then
  echo "🗑️ Removing dev container..."
  docker rm -f "$CONTAINER_ID" >/dev/null
fi

# -----------------------------------------------------------------------------
# Feedback
# -----------------------------------------------------------------------------

echo "✓ Dev container removed."
