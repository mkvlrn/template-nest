#!/usr/bin/env bash
#MISE description="Run Vitest for staged files"

mise exec -- vitest related --bail=1 --reporter=github-actions "$@"
