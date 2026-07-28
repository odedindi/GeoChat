#!/usr/bin/env bash
set -euo pipefail
ROOT=$(cd "$(dirname "$0")/.." && pwd)
cd "$ROOT"

LOGDIR="$ROOT/.local-ci-logs"
mkdir -p "$LOGDIR"
COUNT=0

while true; do
  COUNT=$((COUNT+1))
  echo "[CI-LOCAL] Run #$COUNT: $(date)" | tee -a "$LOGDIR/ci.log"

  echo "[CI-LOCAL] 1) Run server tests" | tee -a "$LOGDIR/ci.log"
  (cd server && npm test --silent) 2>&1 | tee -a "$LOGDIR/server-test.log" || echo "[CI-LOCAL] server tests failed" | tee -a "$LOGDIR/ci.log"

  echo "[CI-LOCAL] 2) Build web" | tee -a "$LOGDIR/ci.log"
  (cd web && npm run build --silent) 2>&1 | tee -a "$LOGDIR/web-build.log" || echo "[CI-LOCAL] web build failed" | tee -a "$LOGDIR/ci.log"

  echo "[CI-LOCAL] 3) Run integration (once)" | tee -a "$LOGDIR/ci.log"
  (cd server && npm run integration --silent) 2>&1 | tee -a "$LOGDIR/integration.log" || echo "[CI-LOCAL] integration failed" | tee -a "$LOGDIR/ci.log"

  echo "[CI-LOCAL] Sleeping 10s before next run" | tee -a "$LOGDIR/ci.log"
  sleep 10
done
