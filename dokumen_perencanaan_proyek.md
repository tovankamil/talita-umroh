# Dokumen Perencanaan dan Estimasi Anggaran Proyek
**Nama Proyek:** Pengembangan Aplikasi Sistem Keagenan & Pembonusan Umroh
**Update:** 26 Juni 2026 (Scope Lengkap — Berdasarkan Analisis Referensi)

---

## 1. Ringkasan Eksekutif
Proyek ini membangun platform web lengkap untuk manajemen mitra/agen umroh. Platform terdiri dari: (1) Website publik informatif dan transaksional, (2) Dashboard Agen untuk memantau komisi, dan (3) Dashboard Admin (CMS penuh) untuk mengelola seluruh konten dan transaksi.

**Tech Stack:** Golang (Gin + GORM) · Next.js (React + Tailwind) · PostgreSQL · Redis · Docker

---

## 2. Ruang Lingkup (Scope of Work)

### 2.1. In-Scope (Dikerjakan Fase Ini)

#### A. Website Publik (9 Halaman)
| Halaman | Fitur Utama |
|:--------|:------------|
| Beranda (Landing Page) | Hero Slider, Preview Paket, Testimoni, FAQ, CTA |
| Tentang Kami | Profil, Badge, Keunggulan, Legalitas |
| Katalog Paket | Grid paket + Search + Filter (Umroh/Haji) |
| Detail Paket | Itinerary, Fasilitas, Persyaratan, S&K, Booking Seat (Multi-departure, Tipe Kamar, Qty) |
| Pendaftaran Agen (DP) | Form + Pilih Metode Bayar + Sidebar Ringkasan |
| Gallery | Grid foto & video + Lightbox + Filter |
| Testimoni | Daftar testimoni jamaah |
| Login | Split layout, Lupa Password via WA |
| Halaman Statis | Privasi, S&K (Rich-text CMS) |

#### B. Dashboard Agen
Profil & Rekening Bank, Riwayat Pesanan, Saldo Bonus & Komisi, Pengajuan Withdrawal, Download Marketing Kit.

#### C. Dashboard Admin (CMS Penuh)
Hero Slider, CMS Paket Lengkap (Multi-departure, Tipe Kamar, Itinerary, Fasilitas, S&K, Kuota), Galeri, Testimoni, Tentang Kami, Halaman Statis, Pengaturan Pendaftaran Agen, Rekening Perusahaan, Verifikasi Pembayaran, Approval Withdrawal, Marketing Kit, KPI Dashboard, Site Settings.

#### D. Integrasi & Otomatisasi
Notifikasi WhatsApp (Registrasi, Verifikasi, Bonus, Lupa Password), Cron Job Laporan KPI ke WA Manajemen.

### 2.2. Out-of-Scope (Ditunda)
- Aplikasi Mobile Native (Flutter/React Native)
- Optimasi SEO Landing Page (Skor > 90)
- Payment Gateway Otomatis (VA/QRIS)
- AI Chatbot

---

## 3. Estimasi Anggaran (Budget & Timeline)

> [!WARNING]
> Dengan penambahan **CMS penuh** (10+ modul admin), **Booking Seat** yang kompleks (multi-departure + tipe kamar + kuota), serta **halaman publik** yang lebih banyak (9 halaman), estimasi anggaran dan waktu perlu **disesuaikan naik** dari versi sebelumnya.

| Komponen / Peran Tim | Estimasi Waktu | Estimasi Biaya (IDR) |
| :--- | :--- | :--- |
| **System Analyst / PM** (Arsitektur database 18 tabel, desain CMS, alur booking) | 2 Bulan | Rp 12.000.000 - Rp 18.000.000 |
| **Backend Developer (Golang)** (API: Auth, Booking Engine, Commission Engine, CMS CRUD, WA Integration, Cron Jobs) | 2,5 - 3 Bulan | Rp 35.000.000 - Rp 50.000.000 |
| **Frontend Developer (Next.js)** (9 Halaman Publik + Dashboard Agen + Dashboard Admin + KPI Chart) | 2,5 - 3 Bulan | Rp 25.000.000 - Rp 40.000.000 |
| **Quality Assurance (QA)** (Testing alur booking multi-departure, komisi, referal, upload, WA) | 3 - 4 Minggu | Rp 7.000.000 - Rp 10.000.000 |
| **Server, Domain, & API Services** (Setup Cloud, Docker, domain, SSL, WA API Provider) | Setup Awal | Rp 5.000.000 - Rp 7.000.000 |
| **TOTAL ESTIMASI** | **~ 3 hingga 3,5 Bulan** | **Rp 84.000.000 - Rp 125.000.000** |

> [!NOTE]
> **Catatan Biaya Pihak Ketiga (Bulanan, di luar scope dev):**
> - Sewa Cloud/VPS: Rp 200.000 - 500.000/bulan
> - WhatsApp API Provider: Rp 150.000 - 350.000/bulan (tergantung volume pesan)
> - Domain & SSL: Rp 150.000 - 300.000/tahun

---

## 4. Dokumen Pendukung

| Dokumen | Link |
|:--------|:-----|
| PRD (Spesifikasi Fitur) | [prd_aplikasi_agen_umroh.md](file:///C:/Users/mdtsk/.gemini/antigravity-ide/brain/2679d42f-09c9-4356-a089-81cba9d2b909/prd_aplikasi_agen_umroh.md) |
| ERD (Struktur Database) | [erd_aplikasi_agen_umroh.md](file:///C:/Users/mdtsk/.gemini/antigravity-ide/brain/2679d42f-09c9-4356-a089-81cba9d2b909/erd_aplikasi_agen_umroh.md) |
| Analisis Fitur Referensi | [analisis_fitur_referensi.md](file:///C:/Users/mdtsk/.gemini/antigravity-ide/brain/2679d42f-09c9-4356-a089-81cba9d2b909/analisis_fitur_referensi.md) |
| Implementation Plan | [implementation_plan.md](file:///C:/Users/mdtsk/.gemini/antigravity-ide/brain/2679d42f-09c9-4356-a089-81cba9d2b909/implementation_plan.md) |
