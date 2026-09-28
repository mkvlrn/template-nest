#!/usr/bin/env bash
#MISE description="Combine all open Renovate PRs into one PR"

set -euo pipefail

git fetch origin '+refs/heads/*:refs/remotes/origin/*'

batch_branch="renovate-batch"

if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "Working tree is not clean"
  exit 1
fi

git branch -D "$batch_branch" 2>/dev/null || true
git push origin --delete "$batch_branch" 2>/dev/null || true

git switch -c "$batch_branch" origin/main

mapfile -t renovate_branches < <(
  gh pr list \
    --state open \
    --base main \
    --json headRefName \
    --jq '.[] | select(.headRefName | startswith("renovate/")) | .headRefName'
)

if [ -z "${renovate_branches[*]:-}" ]; then
  echo "No open Renovate PRs to batch."
  git switch main
  git branch -D "$batch_branch"
  exit 0
fi

printf '\nRenovate PRs to batch:\n'
printf '  %s\n' "${renovate_branches[@]}"

for branch in "${renovate_branches[@]}"; do
  echo "Merging $branch..."
  git merge --no-ff -m "chore(deps): merge Renovate update for $branch" "origin/$branch"
done

git push -u origin "$batch_branch"

gh pr create \
  --base main \
  --head "$batch_branch" \
  --title "chore(deps): batch Renovate updates" \
  --body "Batches the currently open Renovate PRs."

git switch main
