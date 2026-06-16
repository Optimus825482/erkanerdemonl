#!/bin/sh
# Entrypoint: Postgres hazır olana kadar BEKLE, db push, seed, sonra app
# `set -e` script'in herhangi bir başarısızlıkta durmasını sağlar.
set -e

cd /app

echo "[entrypoint] waiting for postgres at $DATABASE_URL..."

# pg_isready ile bekle (max 60s)
RETRIES=0
MAX_RETRIES=30
until node -e "
  const { PrismaClient } = require('@prisma/client');
  const p = new PrismaClient();
  p.\$queryRaw\`SELECT 1\`
    .then(() => { p.\$disconnect(); process.exit(0); })
    .catch(() => { p.\$disconnect().then(() => process.exit(1)); });
" 2>/dev/null; do
  RETRIES=$((RETRIES + 1))
  if [ $RETRIES -ge $MAX_RETRIES ]; then
    echo "[entrypoint] ERROR: postgres not ready after ${MAX_RETRIES} retries"
    exit 1
  fi
  echo "[entrypoint] waiting... ($RETRIES/$MAX_RETRIES)"
  sleep 2
done

echo "[entrypoint] postgres ready, running db push..."
node node_modules/prisma/build/index.js db push --skip-generate --accept-data-loss 2>&1 | tail -10

echo "[entrypoint] checking seed status..."
EXISTS=$(node -e "
  const { PrismaClient } = require('@prisma/client');
  const p = new PrismaClient();
  p.about.findUnique({ where: { id: 1 } })
    .then(r => { console.log(r ? 'yes' : 'no'); return p.\$disconnect(); })
    .catch((e) => { console.log('no', e.message); return p.\$disconnect(); });
" 2>&1 | tail -1)

if echo "$EXISTS" | grep -q "no"; then
  echo "[entrypoint] seeding database..."
  if [ -f node_modules/.bin/tsx ]; then
    node_modules/.bin/tsx prisma/seed.ts 2>&1 | tail -15
  elif [ -f node_modules/tsx/dist/cli.mjs ]; then
    node node_modules/tsx/dist/cli.mjs prisma/seed.ts 2>&1 | tail -15
  else
    echo "[entrypoint] ERROR: tsx not found"
    ls node_modules/ | head -20
    exit 1
  fi
  echo "[entrypoint] seed done."
else
  echo "[entrypoint] data already exists, skipping seed."
fi

echo "[entrypoint] starting application..."
exec "$@"
