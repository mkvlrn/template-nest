#!/bin/sh
set -e

ROOT="$(cd "$(dirname "$0")/.." && pwd)"

RECREATE=false

for arg in "$@"; do
  case "$arg" in
  --recreate)
    RECREATE=true
    ;;
  *)
    echo "Error: unknown option: $arg" >&2
    exit 1
    ;;
  esac
done

if [ "$RECREATE" = true ]; then
  echo "🔄 Recreating dev container..."

  devcontainer up \
    --workspace-folder "$ROOT" \
    --remove-existing-container
else
  echo "🚀 Creating or starting dev container..."

  devcontainer up \
    --workspace-folder "$ROOT"
fi

echo
echo "✓ Dev container is ready."
