#!/usr/bin/env bash
#MISE description="Fix files with Biome"

mise exec -- biome check --no-errors-on-unmatched --write
