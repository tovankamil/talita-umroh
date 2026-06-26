#!/bin/bash
# ============================================================
# server-setup.sh — Initial VPS Setup Script (Ubuntu 22.04)
# Jalankan SEKALI setelah pertama kali akses VPS
# ============================================================

set -e

echo "🔧 Memulai setup VPS..."

# Update system
apt-get update && apt-get upgrade -y

# Install essentials
apt-get install -y \
  curl wget git ufw fail2ban \
  ca-certificates gnupg lsb-release

# ─────────────────────────────────────────
# Setup UFW Firewall
# ─────────────────────────────────────────
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable
echo "✅ Firewall aktif"

# ─────────────────────────────────────────
# Install Docker
# ─────────────────────────────────────────
curl -fsSL https://get.docker.com | sh
systemctl enable docker
systemctl start docker
echo "✅ Docker terinstall"

# Install Docker Compose v2
mkdir -p /usr/local/lib/docker/cli-plugins
curl -SL "https://github.com/docker/compose/releases/latest/download/docker-compose-linux-x86_64" \
  -o /usr/local/lib/docker/cli-plugins/docker-compose
chmod +x /usr/local/lib/docker/cli-plugins/docker-compose
echo "✅ Docker Compose terinstall"

# ─────────────────────────────────────────
# Install Nginx & Certbot
# ─────────────────────────────────────────
apt-get install -y nginx certbot python3-certbot-nginx
systemctl enable nginx
echo "✅ Nginx terinstall"

# ─────────────────────────────────────────
# Buat direktori project
# ─────────────────────────────────────────
mkdir -p /opt/talita-umroh
echo "✅ Direktori /opt/talita-umroh dibuat"

echo ""
echo "🎉 Setup VPS selesai!"
echo "Langkah selanjutnya:"
echo "  1. Clone repo: git clone <repo-url> /opt/talita-umroh"
echo "  2. Buat file .env di /opt/talita-umroh/.env"
echo "  3. Jalankan: docker-compose up -d"
