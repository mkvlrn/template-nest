#!/usr/bin/env bash
#MISE description="Run Vitest in CI mode"

mise exec -- vitest --bail=1 --reporter=github-actions
