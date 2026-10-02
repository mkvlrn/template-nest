#!/usr/bin/env bash
#MISE description="Sync mise and pnpm dependencies"

set -euo pipefail

mise install
mise prune -y
mise exec -- pnpm install --frozen-lockfile
