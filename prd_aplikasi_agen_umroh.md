# Product Requirements Document (PRD)
**Produk:** Aplikasi Sistem Keagenan & Pembonusan Umroh
**Versi:** 2.0 — Final (Berdasarkan Analisis Referensi)
**Tanggal:** 26 Juni 2026

---

## 1. Visi & Tujuan Produk
Membangun platform web lengkap yang mencakup: (1) Website publik informatif dan transaksional (Landing Page, Katalog Paket, Booking Seat, Pendaftaran Agen, Gallery, Testimoni), (2) Dashboard Agen/Mitra (Profil, Komisi, Marketing Kit), dan (3) Dashboard Admin (CMS penuh, Verifikasi Pembayaran, KPI). Semua konten publik bisa dikelola oleh Admin tanpa bantuan programmer.

---

## 2. Persona Pengguna

1. **Pengunjung (Visitor):** Melihat paket, membaca testimoni, melihat gallery, dan mendaftar.
2. **Mitra / Agen Aktif:** Memasarkan referal, memesan paket (booking seat), upload bukti transfer, memantau bonus, mengunduh marketing kit.
3. **Admin Pusat:** Mengelola seluruh konten website (CMS), memverifikasi pembayaran, mencairkan komisi, dan memantau KPI.

---

## 3. Kebutuhan Fungsional & User Stories

### 3.1. Website Publik (Public-Facing Pages)

#### 3.1.1. Beranda (Landing Page `/`)
- Hero Slider (gambar + heading + tombol CTA), **dikelola Admin**.
- Section "Tentang Kami" ringkas.
- Daftar Paket Unggulan (3 kartu: Silver, Gold, Diamond).
- Section Testimoni.
- FAQ Accordion.
- CTA "Siap Menuju Baitullah?"
- Floating: Tombol WhatsApp CS & AI Chatbot Widget.

#### 3.1.2. Tentang Kami (`/tentang`)
- Gambar profil perusahaan + narasi deskriptif.
- Badge pencapaian (misal "10+ Tahun Pengalaman"), **dikelola Admin**.
- Daftar keunggulan (Bimbingan Syar'i, Amanah, Fasilitas, Proses Mudah).
- CTA "DP Sejuta".
- Footer dengan info legalitas (PPIU, IATA, ASITA, AMPHURI).

#### 3.1.3. Katalog Paket (`/paket`)
- Grid semua paket dengan **search bar** dan **filter** (Umroh / Haji).
- Setiap kartu menampilkan: Cover Image, Nama, Tanggal Keberangkatan, Maskapai, Hotel Makkah & Madinah (+ Bintang), dan Harga.
- Klik kartu → masuk ke halaman detail paket.

#### 3.1.4. Detail Paket (`/paket/{slug}`)
- Cover image besar + info maskapai + hotel.
- **4 Tab Konten:**
  1. **Itinerary** — Jadwal harian (Hari 1: KNO Medan…, Hari 2: Madinah Rawdah…).
  2. **Fasilitas** — Termasuk (Tiket PP, Hotel, Makan 3x, Zamzam…) & Tidak Termasuk (Paspor, Vaksin…).
  3. **Persyaratan** — Dokumen yang harus disiapkan (Paspor, KTP, Foto, Vaksin…).
  4. **S & K** — Syarat & Ketentuan (penalti pembatalan, penjadwalan ulang, dll).
- **Sidebar Booking Seat:**
  - Pilih Jadwal Keberangkatan (multi-departure, termasuk "Bebas Tentukan Jadwal").
  - Pilih Tipe Kamar (Quad/Triple/Double) dengan harga masing-masing.
  - Quantity Selector (+/-).
  - Kalkulasi Total Otomatis (Harga × Qty).
  - Tombol **"BOOKING SEKARANG"**.
  - Tombol **"DOWNLOAD BROSUR"** (unduh PDF flyer).
  - Tombol **"KONSULTASI WA"** (redirect ke WA CS).

#### 3.1.5. Pendaftaran Agen / DP Umroh (`/pendaftaran/agen`)
- **Stepper:** Step 1 (Data & Pembayaran) → Step 2 (Konfirmasi).
- Field "Wasilah" (Sponsor/Upline) — otomatis terisi dari link referal.
- Data Personal: Nama, Email, WhatsApp.
- **Metode Pembayaran:** Pilih rekening perusahaan tujuan transfer (menampilkan logo bank, nama PT, no. rekening). Daftar rekening **dikelola Admin**.
- **Sidebar Ringkasan:** Program, Total DP, Daftar Keuntungan & Hadiah. Semua **dikelola Admin**.
- Trust Badges: "Data terenkripsi", "Dukungan CS", "Proses cepat".

#### 3.1.6. Gallery (`/gallery`)
- Filter: Semua, Foto, Video.
- Grid responsif (masonry-like).
- Lightbox modal (klik foto: zoom, klik video: play).
- Mendukung upload file langsung (JPG/MP4) dan embed YouTube.

#### 3.1.7. Testimoni (`/testimoni`)
- Daftar testimoni jamaah (nama, foto, teks, rating bintang).

#### 3.1.8. Login (`/login`)
- Split layout: Kiri (visual branding + tagline), Kanan (form).
- Field: Email, Password (toggle show/hide), Checkbox "Ingat saya".
- Link: "Lupa password?", "Buat akun baru", "Kembali ke beranda".

#### 3.1.9. Halaman Statis
- Kebijakan Privasi (`/page/kebijakan-privasi`).
- Syarat & Ketentuan (`/page/syarat-ketentuan`).
- Konten HTML/Markdown **dikelola Admin** via rich-text editor.

---

### 3.2. Dashboard Agen (Agent Portal)
- Profil & Input Rekening Bank (dari Master Banks).
- Riwayat Pesanan & Status Pembayaran.
- Saldo Bonus, Riwayat Komisi, Pengajuan Pencairan (Withdrawal).
- Pusat Unduhan Marketing Kit (Brosur, Business Plan, Flyer).

---

### 3.3. Dashboard Admin (Admin Portal)

#### A. Manajemen Konten (CMS)
| Modul | Deskripsi |
|:------|:----------|
| Hero Slider Manager | CRUD gambar slider beranda + heading + CTA |
| CMS Paket Lengkap | CRUD paket: multi-departure, tipe kamar, itinerary harian, fasilitas, persyaratan, S&K, perks, cover, flyer PDF, kuota seat, komisi kustom |
| Manajemen Galeri | Upload/hapus/reorder foto & video (file + YouTube) |
| Manajemen Testimoni | CRUD testimoni jamaah (nama, foto, teks, rating) |
| Halaman Tentang Kami | Edit gambar, deskripsi, badge, keunggulan, legalitas |
| Halaman Statis | Edit Kebijakan Privasi & Syarat Ketentuan via rich-text |
| Pengaturan Pendaftaran Agen | Edit nominal DP, daftar benefit, hadiah |

#### B. Manajemen Transaksi & Keuangan
| Modul | Deskripsi |
|:------|:----------|
| Verifikasi Pembayaran | Lihat daftar transaksi "Waiting Verification", periksa bukti transfer, Approve/Reject |
| Pencairan Komisi | Lihat daftar withdrawal request, Approve/Reject |
| Rekening Perusahaan | CRUD daftar rekening tujuan transfer (logo, bank, no. rek, nama PT) |

#### C. Manajemen Data & Laporan
| Modul | Deskripsi |
|:------|:----------|
| Manajemen User & Agen | Lihat daftar user, agen, tree referal |
| Marketing Kit | Upload/hapus file brosur, business plan, flyer |
| KPI Dashboard | Grafik pendaftaran agen & transaksi (harian/mingguan/bulanan) |
| Pengaturan Situs | Logo, Favicon, No. WA CS, Alamat, Teks Footer |

---

### 3.4. Notifikasi WhatsApp Otomatis
| Trigger | Penerima | Isi Pesan |
|:--------|:---------|:----------|
| Agen baru mendaftar | Admin + Agen Baru | Info pendaftaran + selamat datang |
| Bukti transfer diupload | Admin | Ada pembayaran butuh verifikasi |
| Admin verifikasi (Paid) | Agen/Pembeli + Upline | Pembayaran diterima + komisi masuk |
| Lupa password | User bersangkutan | Username + Password sementara |
| Laporan KPI Harian | Manajemen | Rekap registrasi + transaksi hari ini |

---

## 4. Kebutuhan Non-Fungsional

1. **Concurrency (Booking Seat):** Row locking di Golang saat pengurangan kuota seat.
2. **Keamanan Upload:** Hanya JPG, PNG, PDF, MP4. Maks 5 MB.
3. **Responsive Design:** Semua halaman publik dan dashboard responsif (desktop, tablet, mobile).
4. **Performance:** Cron Jobs KPI dijalankan via Goroutines, bukan di HTTP request.

---

## 5. Batasan Proyek (Out of Scope)

- Aplikasi mobile native (Flutter/React Native).
- Optimasi SEO Landing Page (Skor > 90).
- Payment Gateway otomatis (real-time VA/QRIS).
- AI Chatbot (bisa diintegrasikan fase berikutnya).
