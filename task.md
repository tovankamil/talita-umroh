# Daftar Tugas Proyek (Task List)
**Aplikasi Sistem Keagenan & Pembonusan Umroh**

## Phase 1: Setup & Environment

### 🐙 Task 1.1: Setup GitHub Repository ✅
- `[x]` Buat repository & push kode ke GitHub → https://github.com/tovankamil/talita-umroh
- `[x]` Inisialisasi repo dengan struktur monorepo:
  - `[x]` `/backend` — Golang API
  - `[x]` `/frontend` — Next.js App
  - `[x]` `/nginx` — Reverse proxy config (placeholder)
  - `[x]` `/scripts` — Deploy & migration scripts
- `[x]` Setup `.gitignore` (Go, Node, `.env`)
- `[x]` Buat branch strategy:
  - `[x]` `main` → Production (sudah di-push)
  - `[x]` `develop` → Staging/Dev (sudah di-push)
  - `feature/*` → Fitur baru (dibuat saat development)
- `[x]` Setup GitHub Actions CI/CD:
  - `[x]` Workflow: `lint & test` on pull request → `.github/workflows/ci.yml`
  - `[x]` Workflow: `build & deploy` on push to `main` → `.github/workflows/deploy.yml`
  - `[ ]` Store secrets di GitHub Settings → `VPS_HOST`, `VPS_USER`, `SSH_PRIVATE_KEY`, `DOCKER_USERNAME`, `DOCKER_PASSWORD`
- `[ ]` Protect branch `main` di GitHub Settings → Branch protection rules

---

### 🖥️ Task 1.2: Setup VPS

> **Rekomendasi VPS** untuk aplikasi Umroh dengan ± 100–500 agent aktif:

| Komponen       | Spesifikasi Minimum       | Spesifikasi Rekomendasi    |
|----------------|---------------------------|----------------------------|
| **CPU**        | 2 vCPU                    | 4 vCPU                     |
| **RAM**        | 4 GB                      | 8 GB                       |
| **Storage**    | 50 GB SSD                 | 100 GB SSD NVMe            |
| **Bandwidth**  | 1 TB/bulan                | Unlimited / 2 TB           |
| **OS**         | Ubuntu 22.04 LTS          | Ubuntu 22.04 LTS           |
| **Network**    | 100 Mbps                  | 200 Mbps                   |

> **Provider yang direkomendasikan** (Indonesia / latency rendah):
> - 🇮🇩 **IDCloudHost** — Terjangkau, datacenter Jakarta
> - 🇮🇩 **Niagahoster / Hostinger VPS** — Mudah dikelola
> - 🌏 **DigitalOcean** (Singapore region) — Stabil & banyak dokumentasi
> - 🌏 **Vultr** (Singapore) — Harga kompetitif

**Stack yang akan di-deploy di VPS:**
```
VPS Ubuntu 22.04
├── Docker & Docker Compose
├── Nginx (Reverse Proxy + SSL)
├── Certbot (Let's Encrypt SSL)
├── PostgreSQL 15 (container)
├── Redis 7 (container)
├── Golang API (container)
└── Next.js App (container)
```

- `[ ]` Beli & aktivasi VPS
- `[ ]` Initial server setup (user, SSH key, disable root login, UFW firewall)
- `[ ]` Install Docker & Docker Compose
- `[ ]` Install Nginx + Certbot (SSL)
- `[ ]` Setup domain DNS → arahkan ke IP VPS

---

### ⚙️ Task 1.3: Setup Struktur Proyek (Backend & Frontend) ✅
- `[x]` Initialize Golang project (Gin & GORM) di folder `/backend`
  - `[x]` Install dependencies: Gin, GORM, JWT, Redis, Cron, godotenv
  - `[x]` Buat entry point `cmd/main.go`
  - `[x]` Buat struktur internal: `database/`, `middleware/`, `handlers/`, `routes/`
  - `[x]` Verifikasi: `go build ./...` berhasil ✅
- `[x]` Initialize Next.js project (React & Tailwind) di folder `/frontend`
  - `[x]` Next.js 16 + React 19 + TypeScript + Tailwind 4
  - `[x]` Enable `output: standalone` di `next.config.ts` (untuk Docker)
- `[x]` Buat `.env.example` template untuk semua service

---

### 🐳 Task 1.4: Setup Docker Environment ✅
- `[x]` Create `docker-compose.yml` (PostgreSQL 15, Redis 7, Golang API, Next.js, Nginx)
- `[x]` Create `Dockerfile` untuk `/backend` (multi-stage: builder → alpine runner)
- `[x]` Create `Dockerfile` untuk `/frontend` (multi-stage: deps → builder → runner)
- `[x]` Create `nginx/nginx.conf` (reverse proxy + SSL + gzip + static caching)

---

## Phase 2: Database & Backend API (Golang)
- `[ ]` Task 2.1: Model & Database Migration (GORM)
  - `[ ]` Create `Users`, `AgentProfiles`, `MasterBanks` models
  - `[ ]` Create `UmrohPackages`, `Transactions`, `Commissions` models
  - `[ ]` Create `MarketingKits`, `Withdrawals` models
- `[ ]` Task 2.2: Auth & JWT API
  - `[ ]` Implement Registration (with/without Referral)
  - `[ ]` Implement Login (JWT generation)
  - `[ ]` Implement Reset Password (Temporary Password logic)
- `[ ]` Task 2.3: Commission & Transaction Logic
  - `[ ]` Create Package & Upload Payment API
  - `[ ]` Admin Verification & Commission Triggers API
- `[ ]` Task 2.4: Marketing Kit API
  - `[ ]` Upload/Download Marketing Kits API

## Phase 3: Frontend Web (Next.js)
- `[ ]` Task 3.1: Public Landing Page
  - `[ ]` Build UI Layouts (referring to sulthanumroh.com)
  - `[ ]` Integrate Registration Form
- `[ ]` Task 3.2: Agent Dashboard
  - `[ ]` Profile & Bank Settings UI
  - `[ ]` Order & Upload Payment UI
  - `[ ]` Ledger, Withdraw & Download Center UI
- `[ ]` Task 3.3: Admin Dashboard
  - `[ ]` Payment Verification & Withdraw Approval UI
  - `[ ]` KPI Dashboard UI

## Phase 4: Integrations & Scheduler
- `[ ]` Task 4.1: WA Notifikasi
  - `[ ]` Integrate WA Gateway API Client (Golang)
- `[ ]` Task 4.2: Cron Jobs / Scheduler
  - `[ ]` Build nightly KPI logic and send to WA

## Phase 5: Deployment & Go Live
- `[ ]` Task 5.1: Clone repo dari GitHub ke VPS & setup `.env` production
- `[ ]` Task 5.2: Jalankan `docker-compose up -d` (first deploy)
- `[ ]` Task 5.3: Verifikasi semua service berjalan (`docker ps`)
- `[ ]` Task 5.4: End-to-end testing (Register → Order → Pembayaran → Komisi)
- `[ ]` Task 5.5: Load testing ringan (simulasi 50 concurrent user)
- `[ ]` Task 5.6: Setup monitoring (Uptime Robot / Grafana)
- `[ ]` Task 5.7: Backup otomatis PostgreSQL (cron harian)
- `[ ]` Task 5.8: Go Live 🚀
