#!/usr/bin/env bash
#MISE description="Fix files with Biome"

set -euo pipefail

mise exec -- biome check --no-errors-on-unmatched --write
