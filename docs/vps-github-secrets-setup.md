# 🔐 Panduan Setup VPS + GitHub Actions Secrets

Panduan lengkap step-by-step untuk menghubungkan VPS dengan GitHub Actions
agar deploy otomatis berjalan saat push ke branch `main`.

---

## 📋 Daftar Secrets yang Dibutuhkan

| Secret Name | Keterangan | Contoh Nilai |
|---|---|---|
| `VPS_HOST` | IP address VPS | `103.123.45.67` |
| `VPS_USER` | Username SSH VPS | `ubuntu` |
| `SSH_PRIVATE_KEY` | Private key SSH (isi seluruhnya) | `-----BEGIN OPENSSH PRIVATE KEY-----...` |
| `DOCKER_USERNAME` | Username Docker Hub | `tovankamil` |
| `DOCKER_PASSWORD` | Docker Hub Access Token | `dckr_pat_xxx...` |

---

## STEP 1 — Generate SSH Key Pair

> Lakukan di **komputer lokal** (bukan di VPS)

**Windows (PowerShell):**
```powershell
ssh-keygen -t ed25519 -C "github-actions@talita-umroh" -f "$HOME\.ssh\talita-umroh-deploy"
```

**Mac/Linux:**
```bash
ssh-keygen -t ed25519 -C "github-actions@talita-umroh" -f ~/.ssh/talita-umroh-deploy
```

Ini akan menghasilkan **2 file**:
- `talita-umroh-deploy` → **Private key** (untuk `SSH_PRIVATE_KEY`)
- `talita-umroh-deploy.pub` → **Public key** (di-copy ke VPS)

---

## STEP 2 — Copy Public Key ke VPS

```bash
# Ganti YOUR_VPS_IP dengan IP VPS Anda
ssh-copy-id -i ~/.ssh/talita-umroh-deploy.pub ubuntu@YOUR_VPS_IP
```

Atau jika ssh-copy-id tidak tersedia (Windows):
```powershell
# PowerShell
$pubkey = Get-Content "$HOME\.ssh\talita-umroh-deploy.pub"
ssh ubuntu@YOUR_VPS_IP "mkdir -p ~/.ssh && echo '$pubkey' >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys"
```

**Test koneksi:**
```bash
ssh -i ~/.ssh/talita-umroh-deploy ubuntu@YOUR_VPS_IP
```

---

## STEP 3 — Setup VPS (Jalankan di VPS)

```bash
# Login ke VPS dulu
ssh ubuntu@YOUR_VPS_IP

# Jalankan setup script
bash /dev/stdin << 'EOF'

# Update sistem
sudo apt-get update && sudo apt-get upgrade -y

# UFW Firewall
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable

# Install Docker
curl -fsSL https://get.docker.com | sudo sh
sudo systemctl enable docker
sudo usermod -aG docker ubuntu
newgrp docker

# Docker Compose
sudo mkdir -p /usr/local/lib/docker/cli-plugins
sudo curl -SL "https://github.com/docker/compose/releases/latest/download/docker-compose-linux-x86_64" \
  -o /usr/local/lib/docker/cli-plugins/docker-compose
sudo chmod +x /usr/local/lib/docker/cli-plugins/docker-compose

# Verifikasi
docker --version
docker compose version

# Nginx + Certbot
sudo apt-get install -y nginx certbot python3-certbot-nginx
sudo systemctl enable nginx

# Buat folder project
sudo mkdir -p /opt/talita-umroh
sudo chown ubuntu:ubuntu /opt/talita-umroh

echo "✅ Setup VPS selesai!"
EOF
```

---

## STEP 4 — Buat Docker Hub Access Token

1. Login ke [hub.docker.com](https://hub.docker.com)
2. Klik avatar → **Account Settings**
3. **Security** → **New Access Token**
4. Name: `github-actions-talita-umroh`
5. Permission: **Read, Write, Delete**
6. Klik **Generate** → **Copy token** (hanya tampil sekali!)

> ⚠️ Gunakan **Access Token**, bukan password Docker Hub

---

## STEP 5 — Input Secrets ke GitHub

1. Buka repo: [github.com/tovankamil/talita-umroh](https://github.com/tovankamil/talita-umroh)
2. **Settings** → **Secrets and variables** → **Actions**
3. Klik **"New repository secret"** untuk setiap secret:

### VPS_HOST
```
103.123.45.67
```
*(ganti dengan IP VPS Anda)*

### VPS_USER
```
ubuntu
```

### SSH_PRIVATE_KEY
```
# Tampilkan private key (Windows PowerShell):
Get-Content "$HOME\.ssh\talita-umroh-deploy"

# Mac/Linux:
cat ~/.ssh/talita-umroh-deploy
```
> ⚠️ Copy **seluruh isi file** termasuk baris `-----BEGIN OPENSSH PRIVATE KEY-----` dan `-----END OPENSSH PRIVATE KEY-----`

### DOCKER_USERNAME
```
tovankamil
```
*(ganti dengan username Docker Hub Anda)*

### DOCKER_PASSWORD
```
dckr_pat_xxxxxxxxxxxxx
```
*(paste Access Token dari Step 4)*

---

## STEP 6 — Verifikasi Deploy Workflow

Setelah semua secrets diinput, test dengan push ke `main`:

```bash
# Sudah di branch main
git add .
git commit -m "ci: test deployment pipeline"
git push origin main
```

Pantau di: **GitHub → Actions** → pilih workflow **"CD — Build & Deploy to VPS"**

### Alur Deploy yang Akan Terjadi:
```
Push ke main
    ↓
GitHub Actions trigger
    ↓
Build Docker image (Go API)     Build Docker image (Next.js)
    ↓                               ↓
Push ke Docker Hub ──────────────────┘
    ↓
SSH ke VPS (menggunakan SSH_PRIVATE_KEY)
    ↓
docker pull latest images
    ↓
docker-compose up -d (restart services)
    ↓
✅ App live di VPS
```

---

## STEP 7 — Setup SSL dengan Certbot (di VPS)

Setelah domain DNS diarahkan ke IP VPS:

```bash
ssh ubuntu@YOUR_VPS_IP

# Generate SSL certificate
sudo certbot --nginx -d talitaumroh.com -d www.talitaumroh.com \
  --non-interactive --agree-tos -m admin@talitaumroh.com

# Auto-renew (cek apakah sudah ada)
sudo systemctl status certbot.timer
```

---

## ✅ Checklist Akhir

- [ ] SSH key pair di-generate di komputer lokal
- [ ] Public key berhasil di-copy ke VPS
- [ ] Test SSH login berhasil: `ssh -i ~/.ssh/talita-umroh-deploy ubuntu@VPS_IP`
- [ ] Docker & Docker Compose terinstall di VPS
- [ ] Folder `/opt/talita-umroh` dibuat di VPS
- [ ] Docker Hub Access Token dibuat
- [ ] 5 GitHub Secrets sudah diinput:
  - [ ] `VPS_HOST`
  - [ ] `VPS_USER`
  - [ ] `SSH_PRIVATE_KEY`
  - [ ] `DOCKER_USERNAME`
  - [ ] `DOCKER_PASSWORD`
- [ ] Test push ke `main` → GitHub Actions berjalan sukses
- [ ] SSL Certificate terpasang dengan Certbot
