# Talita Umroh — Sistem Keagenan & Pembonusan

Aplikasi sistem keagenan dan pembonusan untuk perjalanan Umroh. Dibangun dengan **Golang (Gin + GORM)** untuk backend dan **Next.js** untuk frontend.

## 📁 Struktur Monorepo

```
talita-umroh/
├── backend/          # Golang API (Gin + GORM + PostgreSQL)
├── frontend/         # Next.js App (React + Tailwind)
├── nginx/            # Reverse proxy & SSL config
├── scripts/          # Deploy & server setup scripts
└── .github/
    └── workflows/    # CI/CD GitHub Actions
```

## 🔧 Tech Stack

| Layer      | Teknologi                            |
|------------|--------------------------------------|
| Backend    | Golang, Gin, GORM, JWT, Redis        |
| Frontend   | Next.js 16, React 19, Tailwind CSS 4 |
| Database   | PostgreSQL 15                        |
| Cache      | Redis 7                              |
| Proxy      | Nginx + Let's Encrypt SSL            |
| Container  | Docker & Docker Compose              |
| CI/CD      | GitHub Actions                       |

## 🌿 Branch Strategy

| Branch       | Fungsi                        |
|--------------|-------------------------------|
| `main`       | Production (protected)        |
| `develop`    | Staging / Development         |
| `feature/*`  | Pengembangan fitur baru       |

## 🚀 Quick Start (Development)

### Backend
```bash
cd backend
cp ../.env.example .env
go run cmd/main.go
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Docker (Full Stack)
```bash
cp .env.example .env
docker-compose up -d
```

## 🔐 GitHub Secrets yang Diperlukan

Untuk CI/CD otomatis, tambahkan secrets berikut di **Settings → Secrets → Actions**:

| Secret             | Keterangan                        |
|--------------------|-----------------------------------|
| `VPS_HOST`         | IP address VPS                    |
| `VPS_USER`         | Username SSH VPS (misal: `ubuntu`)|
| `SSH_PRIVATE_KEY`  | Private key SSH untuk akses VPS   |
| `DOCKER_USERNAME`  | Username Docker Hub               |
| `DOCKER_PASSWORD`  | Password / Token Docker Hub       |
| `ENV_PROD`         | Isi file `.env` production        |

## 📋 CI/CD Workflow

- **Pull Request → `main` / `develop`**: Otomatis menjalankan lint & test
- **Push → `main`**: Otomatis build Docker image & deploy ke VPS
