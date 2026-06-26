# 🖥️ Dokumentasi Setup VPS — Talita Umroh

**Server:** Ubuntu 22.04 LTS  
**VPS IP:** 103.23.198.98  
**User:** tovan  
**Project Dir:** /opt/talita-umroh

---

## 📋 Daftar Isi

1. [Persiapan Awal](#1-persiapan-awal)
2. [Generate SSH Key](#2-generate-ssh-key)
3. [Akses VPS Pertama Kali](#3-akses-vps-pertama-kali)
4. [Setup Firewall (UFW)](#4-setup-firewall-ufw)
5. [Install Docker](#5-install-docker)
6. [Install Docker Compose](#6-install-docker-compose)
7. [Install Nginx & Certbot](#7-install-nginx--certbot)
8. [Setup Direktori Project](#8-setup-direktori-project)
9. [Hardening SSH](#9-hardening-ssh)
10. [Konfigurasi GitHub Actions Secrets](#10-konfigurasi-github-actions-secrets)
11. [Setup SSL Certificate](#11-setup-ssl-certificate)
12. [Deploy Pertama Kali](#12-deploy-pertama-kali)
13. [Monitoring & Maintenance](#13-monitoring--maintenance)
14. [Troubleshooting](#14-troubleshooting)

---

## 1. Persiapan Awal

### Yang dibutuhkan:
- VPS Ubuntu 22.04 LTS aktif
- Akses awal via password (dari provider VPS)
- Akun GitHub dengan repo `tovankamil/talita-umroh`
- Akun Docker Hub

### Informasi VPS:
```
IP Address  : 103.23.198.98
OS          : Ubuntu 22.04 LTS
User        : tovan
Project Dir : /opt/talita-umroh
```

---

## 2. Generate SSH Key

> ✅ **Sudah dilakukan** — Key tersimpan di:
> - Private: `C:\Users\mdtsk\.ssh\talita-umroh-deploy`
> - Public:  `C:\Users\mdtsk\.ssh\talita-umroh-deploy.pub`

Jika perlu generate ulang (di komputer lokal):

**Windows (PowerShell):**
```powershell
ssh-keygen -t ed25519 -C "github-actions@talita-umroh" -f "$HOME\.ssh\talita-umroh-deploy"
```

**Mac / Linux:**
```bash
ssh-keygen -t ed25519 -C "github-actions@talita-umroh" -f ~/.ssh/talita-umroh-deploy
```

**Tampilkan private key (untuk GitHub Secrets):**
```powershell
Get-Content "$HOME\.ssh\talita-umroh-deploy"
```

**Tampilkan public key:**
```powershell
Get-Content "$HOME\.ssh\talita-umroh-deploy.pub"
```

---

## 3. Akses VPS Pertama Kali

### Dengan password (pertama kali):
```bash
ssh tovan@103.23.198.98
```

### Dengan SSH key (setelah setup):
```powershell
# Windows
ssh -i "$HOME\.ssh\talita-umroh-deploy" tovan@103.23.198.98
```

```bash
# Mac / Linux
ssh -i ~/.ssh/talita-umroh-deploy tovan@103.23.198.98
```

### Copy public key ke VPS:
```powershell
# Windows PowerShell
$pubkey = Get-Content "$HOME\.ssh\talita-umroh-deploy.pub"
ssh tovan@103.23.198.98 "mkdir -p ~/.ssh && echo '$pubkey' >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys && chmod 700 ~/.ssh"
```

```bash
# Mac / Linux
ssh-copy-id -i ~/.ssh/talita-umroh-deploy.pub tovan@103.23.198.98
```

---

## 4. Setup Firewall (UFW)

> ✅ **Sudah dilakukan**

```bash
# Izinkan SSH
sudo ufw allow OpenSSH

# Izinkan HTTP & HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Aktifkan firewall
sudo ufw --force enable

# Cek status
sudo ufw status verbose
```

**Output yang diharapkan:**
```
Status: active

To                         Action      From
--                         ------      ----
OpenSSH                    ALLOW IN    Anywhere
80/tcp                     ALLOW IN    Anywhere
443/tcp                    ALLOW IN    Anywhere
```

---

## 5. Install Docker

> ✅ **Sudah dilakukan** — Docker 29.6.1

```bash
# Install Docker via official script
curl -fsSL https://get.docker.com | sudo sh

# Enable & start Docker service
sudo systemctl enable docker
sudo systemctl start docker

# Tambahkan user ke group docker (agar tidak perlu sudo)
sudo usermod -aG docker tovan

# Re-login atau jalankan ini untuk apply group sekarang
newgrp docker

# Verifikasi
docker --version
# Output: Docker version 29.6.1, build 8900f1d

docker ps
# Output: CONTAINER ID   IMAGE   COMMAND   CREATED   STATUS   PORTS   NAMES
```

---

## 6. Install Docker Compose

> ✅ **Sudah dilakukan** — Docker Compose v5.2.0

```bash
# Buat direktori plugins
sudo mkdir -p /usr/local/lib/docker/cli-plugins

# Download Docker Compose
sudo curl -SL "https://github.com/docker/compose/releases/latest/download/docker-compose-linux-x86_64" \
  -o /usr/local/lib/docker/cli-plugins/docker-compose

# Beri izin eksekusi
sudo chmod +x /usr/local/lib/docker/cli-plugins/docker-compose

# Verifikasi
docker compose version
# Output: Docker Compose version v5.2.0
```

---

## 7. Install Nginx & Certbot

> ✅ **Sudah dilakukan**

```bash
# Install Nginx dan Certbot
sudo apt-get install -y nginx certbot python3-certbot-nginx

# Enable & start Nginx
sudo systemctl enable nginx
sudo systemctl start nginx

# Verifikasi
sudo systemctl status nginx
# Output: ● nginx.service - A high performance web server...
#            Active: active (running)

# Test Nginx dari browser: http://103.23.198.98
```

---

## 8. Setup Direktori Project

> ✅ **Sudah dilakukan**

```bash
# Buat direktori project
sudo mkdir -p /opt/talita-umroh

# Set ownership ke user tovan
sudo chown tovan:tovan /opt/talita-umroh

# Verifikasi
ls -la /opt/talita-umroh
# Output: drwxr-xr-x 2 tovan tovan 4096 Jun 26 19:57 .
```

**Struktur folder di VPS:**
```
/opt/talita-umroh/
├── docker-compose.yml   ← dari repo GitHub
├── .env                 ← dibuat manual (TIDAK di-commit)
├── nginx/
│   └── nginx.conf
└── (volumes Docker: postgres_data, redis_data, uploads_data)
```

---

## 9. Hardening SSH

> ✅ **Sudah dilakukan**

```bash
# Disable root login
sudo sed -i 's/^PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config

# Disable password authentication (key-only)
sudo sed -i 's/^#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
sudo sed -i 's/^PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config

# Reload SSH service
sudo systemctl reload ssh

# Verifikasi konfigurasi
sudo sshd -T | grep -E "permitrootlogin|passwordauthentication"
# Output:
# permitrootlogin no
# passwordauthentication no
```

> ⚠️ **Penting:** Setelah ini, login hanya bisa dengan SSH key:
> ```bash
> ssh -i ~/.ssh/talita-umroh-deploy tovan@103.23.198.98
> ```

---

## 10. Konfigurasi GitHub Actions Secrets

> ✅ **Sudah dilakukan** — Semua 5 secrets aktif

### Lokasi di GitHub:
`Settings → Secrets and variables → Actions → Repository secrets`

### Daftar Secrets:

| Secret Name | Nilai | Status |
|---|---|---|
| `VPS_HOST` | `103.23.198.98` | ✅ |
| `VPS_USER` | `tovan` | ✅ |
| `SSH_PRIVATE_KEY` | Isi file `talita-umroh-deploy` | ✅ |
| `DOCKER_USERNAME` | Username Docker Hub | ✅ |
| `DOCKER_PASSWORD` | Docker Hub Access Token | ✅ |

### Cara melihat/update secrets:
1. Buka [github.com/tovankamil/talita-umroh/settings/secrets/actions](https://github.com/tovankamil/talita-umroh/settings/secrets/actions)
2. Klik nama secret untuk update
3. Paste nilai baru → klik **Update secret**

### Membuat Docker Hub Access Token baru:
1. Login [hub.docker.com](https://hub.docker.com)
2. Avatar → **Account Settings** → **Security**
3. **New Access Token**
4. Name: `github-actions-talita-umroh`
5. Permission: **Read & Write**
6. Klik **Generate** → **Copy** (hanya tampil sekali!)

---

## 11. Setup SSL Certificate

> ⏳ **Belum dilakukan** — Lakukan setelah domain diarahkan ke VPS

### Prasyarat:
- Domain sudah dibeli (misal: `talitaumroh.com`)
- DNS A record diarahkan ke `103.23.198.98`
- Tunggu propagasi DNS (5-30 menit)

### Generate SSL dengan Certbot:
```bash
# Login ke VPS
ssh -i ~/.ssh/talita-umroh-deploy tovan@103.23.198.98

# Generate certificate
sudo certbot --nginx \
  -d talitaumroh.com \
  -d www.talitaumroh.com \
  --non-interactive \
  --agree-tos \
  -m admin@talitaumroh.com

# Verifikasi auto-renewal
sudo certbot renew --dry-run
sudo systemctl status certbot.timer
```

**Auto-renewal otomatis** berjalan via systemd timer — tidak perlu cron job manual.

---

## 12. Deploy Pertama Kali

### Step 1 — Clone repo ke VPS
```bash
# Login ke VPS
ssh -i ~/.ssh/talita-umroh-deploy tovan@103.23.198.98

# Clone repo
cd /opt/talita-umroh
git clone https://github.com/tovankamil/talita-umroh.git .
```

### Step 2 — Buat file .env production
```bash
# Di VPS, buat file .env
nano /opt/talita-umroh/.env
```

**Isi file .env:**
```env
APP_ENV=production
APP_PORT=8080
FRONTEND_URL=https://talitaumroh.com

# Database
DB_HOST=postgres
DB_PORT=5432
DB_USER=talita_user
DB_PASSWORD=GANTI_PASSWORD_KUAT
DB_NAME=talita_umroh

# Redis
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=GANTI_REDIS_PASSWORD

# JWT
JWT_SECRET=GANTI_JWT_SECRET_PANJANG_DAN_RANDOM
JWT_EXPIRE_HOURS=24

# WhatsApp Gateway
WA_API_URL=https://your-wa-gateway.com
WA_API_KEY=your_wa_api_key

# Frontend
NEXT_PUBLIC_API_URL=https://talitaumroh.com/api
```

### Step 3 — Jalankan containers
```bash
cd /opt/talita-umroh
docker compose up -d

# Cek status semua container
docker compose ps
```

**Output yang diharapkan:**
```
NAME              IMAGE                    STATUS         PORTS
talita_postgres   postgres:15-alpine       Up (healthy)   5432/tcp
talita_redis      redis:7-alpine           Up (healthy)   6379/tcp
talita_api        talita-umroh-api:latest  Up             0.0.0.0:8080->8080/tcp
talita_web        talita-umroh-web:latest  Up             0.0.0.0:3000->3000/tcp
talita_nginx      nginx:alpine             Up             0.0.0.0:80->80, 443->443
```

---

## 13. Monitoring & Maintenance

### Cek logs container:
```bash
# Log API
docker compose logs -f api

# Log Web
docker compose logs -f web

# Log semua service
docker compose logs -f

# Log 100 baris terakhir
docker compose logs --tail=100 api
```

### Restart service:
```bash
# Restart semua
docker compose restart

# Restart service tertentu
docker compose restart api
docker compose restart web
```

### Update / Deploy ulang:
```bash
cd /opt/talita-umroh

# Pull code terbaru
git pull origin main

# Pull image terbaru dari Docker Hub
docker compose pull

# Restart dengan image baru
docker compose up -d --no-deps api web

# Bersihkan image lama
docker image prune -f
```

### Cek penggunaan resource:
```bash
# CPU & Memory container
docker stats

# Disk usage
df -h
du -sh /opt/talita-umroh

# Ukuran Docker volumes
docker system df
```

### Backup database:
```bash
# Manual backup PostgreSQL
docker exec talita_postgres pg_dump -U talita_user talita_umroh > \
  /opt/backup/talita_umroh_$(date +%Y%m%d_%H%M%S).sql

# Buat folder backup
sudo mkdir -p /opt/backup
sudo chown tovan:tovan /opt/backup
```

### Setup backup otomatis (cron harian jam 02:00):
```bash
crontab -e
```
Tambahkan:
```
0 2 * * * docker exec talita_postgres pg_dump -U talita_user talita_umroh > /opt/backup/talita_umroh_$(date +\%Y\%m\%d).sql
```

---

## 14. Troubleshooting

### Container tidak mau start:
```bash
# Cek error detail
docker compose logs api
docker inspect talita_api
```

### Database connection refused:
```bash
# Cek apakah postgres berjalan
docker compose ps postgres
docker compose logs postgres

# Test koneksi dari container api
docker exec talita_api ping postgres
```

### Nginx 502 Bad Gateway:
```bash
# Pastikan api & web running
docker compose ps

# Cek konfigurasi nginx
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

### SSH key tidak bisa login:
```bash
# Cek permissions file authorized_keys di VPS
ls -la ~/.ssh/
# Seharusnya: drwx------ (700) untuk .ssh
#             -rw------- (600) untuk authorized_keys
```

### Container kehabisan disk:
```bash
# Bersihkan image dan volume tidak terpakai
docker system prune -a

# Bersihkan volume tidak terpakai
docker volume prune
```

---

## 🔑 Quick Reference

```bash
# Login ke VPS
ssh -i "$HOME\.ssh\talita-umroh-deploy" tovan@103.23.198.98  # Windows
ssh -i ~/.ssh/talita-umroh-deploy tovan@103.23.198.98          # Mac/Linux

# Ke direktori project
cd /opt/talita-umroh

# Cek status semua container
docker compose ps

# Lihat log realtime
docker compose logs -f

# Restart semua service
docker compose restart

# Deploy update
git pull && docker compose pull && docker compose up -d

# Test API health
curl http://103.23.198.98:8080/health
```

---

*Dokumentasi ini dibuat otomatis pada: 27 Juni 2026*  
*Repository: https://github.com/tovankamil/talita-umroh*
