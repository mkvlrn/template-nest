#!/usr/bin/env bash
#MISE description="Regenerate dependency lockfiles"

rm -f pnpm-lock.yaml
mise exec -- pnpm install

git add pnpm-lock.yaml

if git diff --cached --quiet -- pnpm-lock.yaml; then
  echo "Lockfile unchanged; nothing to commit."
  exit 0
fi

git commit -m "chore(deps): update lockfile"
