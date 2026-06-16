#!/bin/sh
# Entrypoint: DB migrate + seed (idempotent) → uygulamayı başlat
set -e

echo "[entrypoint] running database setup..."
./scripts/seed.sh || echo "[entrypoint] seed failed, continuing..."

echo "[entrypoint] starting application..."
exec "$@"
