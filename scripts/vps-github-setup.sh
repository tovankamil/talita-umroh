#!/bin/bash
# ================================================================
# vps-github-setup.sh
# Setup VPS lengkap + generate semua credentials untuk GitHub Actions
# Jalankan script ini di LOCAL machine (bukan di VPS)
# ================================================================
#
# CARA PAKAI:
#   1. Edit variabel di bagian CONFIGURATION di bawah
#   2. chmod +x vps-github-setup.sh
#   3. bash vps-github-setup.sh
#
# YANG AKAN DILAKUKAN SCRIPT INI:
#   ✅ Generate SSH key pair
#   ✅ Copy public key ke VPS
#   ✅ Setup VPS (Docker, Nginx, Firewall, folder project)
#   ✅ Print semua nilai yang perlu di-paste ke GitHub Secrets
# ================================================================

set -e

# ──────────────────────────────────────────
# CONFIGURATION — Edit sesuai data Anda
# ──────────────────────────────────────────
VPS_IP="103.23.198.98"              # Contoh: 103.123.45.67
VPS_USER="tovan"                  # User default Ubuntu VPS
SSH_KEY_NAME="talita-umroh-deploy" # Nama file SSH key
DOCKER_USERNAME="your_dockerhub"   # Username Docker Hub
# ──────────────────────────────────────────

echo ""
echo "╔════════════════════════════════════════╗"
echo "║   Talita Umroh — VPS GitHub Setup     ║"
echo "╚════════════════════════════════════════╝"
echo ""

# ─────────────────────────────────────────
# STEP 1: Generate SSH Key Pair
# ─────────────────────────────────────────
echo "🔑 [1/4] Generate SSH key pair..."

if [ -f "$HOME/.ssh/${SSH_KEY_NAME}" ]; then
  echo "   ⚠️  SSH key sudah ada: ~/.ssh/${SSH_KEY_NAME}"
  echo "   Skip generate, gunakan key yang sudah ada."
else
  ssh-keygen -t ed25519 -C "github-actions@talita-umroh" \
    -f "$HOME/.ssh/${SSH_KEY_NAME}" -N ""
  echo "   ✅ SSH key dibuat: ~/.ssh/${SSH_KEY_NAME}"
fi

# ─────────────────────────────────────────
# STEP 2: Copy Public Key ke VPS
# ─────────────────────────────────────────
echo ""
echo "📤 [2/4] Copy public key ke VPS ${VPS_IP}..."
echo "   (Masukkan password root VPS jika diminta)"

ssh-copy-id -i "$HOME/.ssh/${SSH_KEY_NAME}.pub" "${VPS_USER}@${VPS_IP}"
echo "   ✅ Public key berhasil di-copy ke VPS"

# ─────────────────────────────────────────
# STEP 3: Setup VPS via SSH
# ─────────────────────────────────────────
echo ""
echo "🔧 [3/4] Setup VPS (Docker, Nginx, Firewall)..."

ssh -i "$HOME/.ssh/${SSH_KEY_NAME}" "${VPS_USER}@${VPS_IP}" << 'REMOTE_SCRIPT'
set -e

echo "→ Update sistem..."
sudo apt-get update -qq && sudo apt-get upgrade -y -qq

echo "→ Install dependencies..."
sudo apt-get install -y -qq curl wget git ufw fail2ban ca-certificates gnupg

echo "→ Setup UFW Firewall..."
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable

echo "→ Install Docker..."
curl -fsSL https://get.docker.com | sudo sh
sudo systemctl enable docker
sudo systemctl start docker
sudo usermod -aG docker $USER
# Apply docker group tanpa re-login
newgrp docker << 'DOCKERGROUP'
echo "   Docker group aktif"
DOCKERGROUP

echo "→ Install Docker Compose..."
sudo mkdir -p /usr/local/lib/docker/cli-plugins
sudo curl -SL "https://github.com/docker/compose/releases/latest/download/docker-compose-linux-x86_64" \
  -o /usr/local/lib/docker/cli-plugins/docker-compose
sudo chmod +x /usr/local/lib/docker/cli-plugins/docker-compose

# Verifikasi Docker
docker --version
docker compose version

echo "→ Install Nginx & Certbot..."
sudo apt-get install -y -qq nginx certbot python3-certbot-nginx
sudo systemctl enable nginx

echo "→ Buat direktori project..."
sudo mkdir -p /opt/talita-umroh
sudo chown $USER:$USER /opt/talita-umroh

echo "→ Hardening SSH config..."
sudo sed -i 's/^PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
sudo sed -i 's/^#PermitRootLogin.*/PermitRootLogin no/' /etc/ssh/sshd_config
# Ubuntu 22.04 pakai 'ssh', bukan 'sshd'
if sudo systemctl is-active --quiet ssh; then
  sudo systemctl reload ssh
elif sudo systemctl is-active --quiet sshd; then
  sudo systemctl reload sshd
fi

echo "✅ Setup VPS selesai!"
REMOTE_SCRIPT

# ─────────────────────────────────────────
# STEP 4: Print GitHub Secrets
# ─────────────────────────────────────────
echo ""
echo "📋 [4/4] Nilai GitHub Secrets yang perlu di-input:"
echo ""
echo "════════════════════════════════════════════════════════"
echo ""
echo "  Secret Name  : VPS_HOST"
echo "  Secret Value : ${VPS_IP}"
echo ""
echo "  Secret Name  : VPS_USER"
echo "  Secret Value : ${VPS_USER}"
echo ""
echo "  Secret Name  : SSH_PRIVATE_KEY"
echo "  Secret Value :"
cat "$HOME/.ssh/${SSH_KEY_NAME}"
echo ""
echo "  Secret Name  : DOCKER_USERNAME"
echo "  Secret Value : ${DOCKER_USERNAME}"
echo ""
echo "  Secret Name  : DOCKER_PASSWORD"
echo "  Secret Value : (gunakan Docker Hub Access Token, bukan password!)"
echo "                 Buat di: https://hub.docker.com/settings/security"
echo ""
echo "════════════════════════════════════════════════════════"
echo ""
echo "📌 Copy nilai di atas ke:"
echo "   GitHub → Settings → Secrets → Actions → New repository secret"
echo ""
echo "🎉 Selesai! VPS siap menerima deploy dari GitHub Actions."
