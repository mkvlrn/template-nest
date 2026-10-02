#!/usr/bin/env bash
#MISE description="Run the application in watch mode"

set -euo pipefail

mise exec -- node --watch src/main.ts
