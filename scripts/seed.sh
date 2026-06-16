#!/bin/sh
# İlk açılışta DB hazır olunca seed çalıştır.
# Sadece About tablosu boşsa çalışır (idempotent).
set -e

echo "[seed] waiting for database..."
for i in $(seq 1 30); do
  if node -e "
    const { PrismaClient } = require('@prisma/client');
    const p = new PrismaClient();
    p.\$queryRaw\`SELECT 1\`
      .then(() => p.\$disconnect())
      .then(() => process.exit(0))
      .catch(() => p.\$disconnect().then(() => process.exit(1)));
  " 2>/dev/null; then
    break
  fi
  sleep 2
done

echo "[seed] running prisma db push..."
npx prisma db push --skip-generate --accept-data-loss 2>&1 | tail -5

EXISTS=$(node -e "
  const { PrismaClient } = require('@prisma/client');
  const p = new PrismaClient();
  p.about.findUnique({ where: { id: 1 } })
    .then(r => { console.log(r ? 'yes' : 'no'); return p.\$disconnect(); })
    .catch(() => { console.log('no'); return p.\$disconnect(); });
" 2>/dev/null)

if [ "$EXISTS" = "no" ] || [ -z "$EXISTS" ]; then
  echo "[seed] seeding database..."
  npx tsx prisma/seed.ts 2>&1 | tail -15
  echo "[seed] done."
else
  echo "[seed] data already exists, skipping."
fi
