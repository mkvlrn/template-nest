#!/usr/bin/env bash
#MISE description="Run TypeScript type checking"

set -euo pipefail

mise exec -- tsc
