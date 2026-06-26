#!/bin/bash
# ============================================================
# deploy.sh — Script deploy manual ke VPS
# Digunakan jika tidak menggunakan GitHub Actions otomatis
# ============================================================

set -e

echo "🚀 Memulai deploy ke VPS..."

# Pull latest code
git pull origin main

# Pull latest Docker images
docker-compose pull

# Restart services
docker-compose up -d --no-deps api web

# Cleanup
docker image prune -f

echo "✅ Deploy selesai: $(date)"
