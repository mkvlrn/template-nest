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
  echo "No open Renovate PRs to batch."
  exit 0
fi

printf '\nRenovate PRs to batch:\n'
printf '  %s\n' "${renovate_branches[@]}"

for branch in "${renovate_branches[@]}"; do
  echo "Merging $branch..."
  git merge --no-ff -m "chore(deps): merge Renovate update for $branch" "origin/$branch"
done
