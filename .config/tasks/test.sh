#!/usr/bin/env bash
#MISE description="Run Vitest with coverage"

set -euo pipefail

mise exec -- vitest --coverage
