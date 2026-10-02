#!/usr/bin/env bash
#MISE description="Run Vitest in CI mode"

set -euo pipefail

mise exec -- vitest --bail=1 --reporter=github-actions
