#!/usr/bin/env bash
set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
DIM='\033[2m'
BOLD='\033[1m'
RESET='\033[0m'

# --- Resolve bump type ---
BUMP="${1:-}"
if [[ -z "$BUMP" ]]; then
  echo -e "\n  ${BOLD}Usage:${RESET} ./release.sh <patch|minor|major>\n"
  exit 1
fi

if [[ "$BUMP" != "patch" && "$BUMP" != "minor" && "$BUMP" != "major" ]]; then
  echo -e "\n  ${RED}Invalid bump type: $BUMP${RESET} (use patch, minor, or major)\n"
  exit 1
fi

# --- Check clean working tree ---
if [[ -n "$(git status --porcelain)" ]]; then
  echo -e "\n  ${RED}Working tree is dirty.${RESET} Commit or stash changes first.\n"
  exit 1
fi

# --- Read current version ---
CURRENT=$(node -p "require('./package.json').version")
IFS='.' read -r MAJOR MINOR PATCH <<< "$CURRENT"

case "$BUMP" in
  patch) PATCH=$((PATCH + 1)) ;;
  minor) MINOR=$((MINOR + 1)); PATCH=0 ;;
  major) MAJOR=$((MAJOR + 1)); MINOR=0; PATCH=0 ;;
esac

VERSION="$MAJOR.$MINOR.$PATCH"

echo -e "\n  ${BOLD}sher release${RESET} ${DIM}$CURRENT → $VERSION${RESET}\n"

# --- Bump version in package.json and constants.ts ---
echo -e "  ${DIM}[1/6]${RESET} Bumping version to ${BOLD}$VERSION${RESET}"
npm version "$VERSION" --no-git-tag-version --quiet
sed -i '' "s/export const VERSION = \".*\"/export const VERSION = \"$VERSION\"/" src/constants.ts

# --- Build CLI ---
echo -e "  ${DIM}[2/6]${RESET} Building CLI"
npm run build --silent

# --- Deploy worker ---
echo -e "  ${DIM}[3/6]${RESET} Deploying worker"
(cd worker && npx wrangler deploy --quiet 2>&1)

# --- Commit + tag ---
echo -e "  ${DIM}[4/6]${RESET} Committing v$VERSION"
git add -A
git commit -m "release v$VERSION" --quiet
git tag "v$VERSION"

# --- Push ---
echo -e "  ${DIM}[5/6]${RESET} Pushing to GitHub"
git push --quiet
git push --tags --quiet

# --- Publish to npm ---
echo -e "  ${DIM}[6/6]${RESET} Publishing to npm"
npm publish

echo -e "\n  ${GREEN}${BOLD}Released v$VERSION${RESET}\n"
