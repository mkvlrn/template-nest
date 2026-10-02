#!/usr/bin/env bash
#MISE description="Check files with Biome"

set -euo pipefail

mise exec -- biome check --no-errors-on-unmatched "$@"
