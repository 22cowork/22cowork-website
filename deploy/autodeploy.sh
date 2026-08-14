#!/usr/bin/env bash
# Auto-deploy: pulls main and rebuilds the container only when there is a new
# commit. Runs from cron on the Mini PC every few minutes. Ends manual deploys.
set -euo pipefail

APP_DIR="/opt/22cowork/website/app"
SERVICE="22cowork-website-prod"

cd "$APP_DIR"
git fetch origin main --quiet

LOCAL="$(git rev-parse HEAD)"
REMOTE="$(git rev-parse origin/main)"

if [ "$LOCAL" = "$REMOTE" ]; then
  echo "$(date -u '+%Y-%m-%d %H:%M:%S') up to date ($LOCAL)"
  exit 0
fi

echo "$(date -u '+%Y-%m-%d %H:%M:%S') new commit $REMOTE, deploying..."
git pull origin main --quiet
docker compose build "$SERVICE"
docker compose up -d --force-recreate "$SERVICE"
echo "$(date -u '+%Y-%m-%d %H:%M:%S') deploy complete"
