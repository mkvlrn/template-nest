#!/usr/bin/env bash
#MISE description="Verify the commit message"

set -euo pipefail

mise exec -- commitlint --edit "$1" --default-config
