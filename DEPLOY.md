# Coolify Deploy — erkanerdem.online

## Yapı
- **App:** Next.js 16 (App Router, standalone build, multi-stage Dockerfile)
- **DB:** PostgreSQL 16 Alpine, aynı compose stack'inde
- **Reverse proxy:** Coolify Traefik (HTTPS otomatik, Let's Encrypt)

## İlk Deploy

### 1. Coolify'da Yeni Resource
- **Source:** Git repository (bu repo)
- **Build Pack:** Docker Compose
- **Compose Path:** `docker-compose.yml`
- **Domain:** `erkanerdem.online` + `www.erkanerdem.online`

### 2. Environment Variables (Coolify panel)
```
POSTGRES_USER=erkan
POSTGRES_PASSWORD=<güçlü-şifre>
POSTGRES_DB=erkanerdem_db
NEXT_PUBLIC_SITE_URL=https://erkanerdem.online
```

### 3. Volumes (Coolify "Persistent Volumes")
- `postgres_data` → `/var/lib/postgresql/data`
- `app_uploads` → `/app/public/images/uploads` (yüklenen profil resimleri)

### 4. Network
Coolify'da `coolify` external network zaten var. `docker-compose.yml` buna bağlanıyor (`web: external: true`).

### 5. Deploy
Coolify otomatik:
1. `docker compose up -d --build`
2. Postgres healthcheck geçene kadar app bekler
3. App entrypoint: `db push` + seed (idempotent — veri varsa atlar)
4. Next.js production server `node server.js` ile başlar
5. Traefik `erkanerdem.online` → `app:3000` yönlendirir

## Seed Stratejisi
- **İlk deploy:** `About` tablosu boş → `prisma/seed.ts` çalışır, tüm veriler yazılır
- **Sonraki deploy'lar:** Veri var → seed atlanır
- **Sıfırlama:** `docker compose down -v` (volume siler) → DB boşalır → seed yeniden çalışır

## Admin Giriş
- URL: `https://erkanerdem.online/admin/login`
- Kullanıcı adı: `admin`
- Şifre: `518518Erkan` (seed'te tanımlı)
- Şifre değiştirmek için: ilk girişten sonra zorunlu değil (seed `mustChangePassword: false`)

## Manuel Komutlar (server'da)
```bash
# Container'a gir
docker compose exec app sh

# Seed manuel çalıştır (DB sıfırlamadan)
docker compose exec app npx tsx prisma/seed.ts

# Prisma Studio (DB görsel)
docker compose exec app npx prisma studio
```

## Domain DNS
- `erkanerdem.online` A record → Coolify server IP
- `www.erkanerdem.online` CNAME → `erkanerdem.online`
- Traefik Let's Encrypt otomatik SSL sağlar

## Monitoring
- `docker compose logs -f app` — uygulama logları
- `docker compose logs -f postgres` — DB logları
- Healthcheck: `curl https://erkanerdem.online/api/health` (ileride eklenebilir)
