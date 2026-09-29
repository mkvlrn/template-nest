#!/usr/bin/env bash
#MISE description="Verify the commit message"

mise exec -- commitlint --edit "$1" --default-config
