#!/usr/bin/env bash
#MISE description="Merge all open Renovate PRs into main"

set -euo pipefail

git fetch origin '+refs/heads/*:refs/remotes/origin/*'

if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "Working tree is not clean"
  exit 1
fi

current_branch=$(git branch --show-current)
if [ "$current_branch" != "main" ]; then
  echo "This task must be run from the main branch"
  exit 1
fi

git pull --ff-only origin main

mapfile -t renovate_branches < <(
  gh pr list \
    --state open \
    --base main \
    --json headRefName \
    --jq '.[] | select(.headRefName | startswith("renovate/")) | .headRefName'
)

if [ -z "${renovate_branches[*]:-}" ]; then
  printf '\n\033[1;31m══════════════════════════════════════════\033[0m\n'
  printf '\033[1;31m        NO RENOVATE PRs TO BATCH\033[0m\n'
  printf '\033[1;31m══════════════════════════════════════════\033[0m\n\n'
  exit 0
fi

printf '\n\033[1;32m╔══════════════════════════════════════════╗\033[0m\n'
printf '\033[1;32m║          RENOVATE PRs TO BATCH           ║\033[0m\n'
for branch in "${renovate_branches[@]}"; do
  printf '\033[1;32m║  %-40s║\033[0m\n' "$branch"
done
printf '\033[1;32m╚══════════════════════════════════════════╝\033[0m\n\n'

for branch in "${renovate_branches[@]}"; do
  echo
  echo "Merging $branch..."
  git merge --no-ff -m "chore(deps): merge Renovate update for $branch" "origin/$branch"
done
