#!/usr/bin/env bash
#MISE description="Check files with Biome"

mise exec -- biome check --no-errors-on-unmatched "$@"
