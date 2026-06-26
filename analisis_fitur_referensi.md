# Analisis Fitur Referensi & Tambahan Modul Admin
**Referensi:** [sulthanumroh.com](https://sulthanumroh.com/)
**Tanggal Analisis:** 26 Juni 2026

Berikut adalah hasil analisis menyeluruh dari setiap halaman publik referensi, disertai daftar fitur baru yang **harus dapat dikelola oleh Admin melalui Dashboard**.

---

## 1. Struktur Menu Navigasi Publik (Navbar)

Berdasarkan referensi, navigasi utama website publik terdiri dari:

| No | Menu | URL | Keterangan |
|:--:|:-----|:----|:-----------|
| 1 | Beranda | `/` | Landing page utama (Hero Slider, Paket, Testimoni, FAQ, CTA) |
| 2 | Tentang Kami | `/tentang` | Profil perusahaan, keunggulan, legalitas |
| 3 | Paket Hemat (Dropdown) | | - |
| 3a | → Paket Umroh | `/paket` | Katalog semua paket umroh dengan filter & pencarian |
| 3b | → DP Sejuta | `/pendaftaran/agen` | Form pendaftaran mitra/agen dengan pembayaran DP |
| 4 | Gallery | `/gallery` | Galeri foto & video perjalanan (dengan filter & lightbox) |
| 5 | Webinar | `/webinar` | *(Halaman webinar/event)* |
| 6 | Testimoni | `/testimoni` | Kumpulan testimoni jamaah |
| 7 | Login (Tombol) | `/login` | Halaman login member/agen |

---

## 2. Fitur Baru yang Ditemukan (Belum Ada di PRD Kita)

### 🆕 2.1. Detail Paket yang Sangat Kaya (Admin-Managed)
Dari halaman `/paket/{slug}`, setiap paket umroh memiliki data yang **sangat detail** dan semuanya harus bisa dikelola oleh Admin:

| Data Paket | Contoh | Dapat Dikelola Admin? |
|:-----------|:-------|:---------------------:|
| Nama Paket | PAKET GOLD 13 Hari | ✅ |
| Jenis (Umroh/Haji) | `travel_type: umroh` | ✅ |
| Tanggal Keberangkatan (Multi) | 23 Sep, 21 Okt, 25 Nov 2026 | ✅ |
| Durasi Perjalanan | 13 Hari | ✅ |
| Harga Normal & Harga Promo | Rp 39.600.000 | ✅ |
| Harga per Tipe Kamar (Quad/Triple/Double) | Quad: 39.6Jt, Triple: dst | ✅ |
| Biaya Pendaftaran (DP) | Rp 3.000.000 | ✅ |
| Maskapai (Berangkat & Pulang) | Lion Air | ✅ |
| Hotel Makkah (Nama + Bintang) | ROYAL MAJESTIC (4★) | ✅ |
| Hotel Madinah (Nama + Bintang) | HAYAH PLAZA (4★) | ✅ |
| Kuota & Terisi (Booking Seat) | 100 total, 0 booked | ✅ |
| Keunggulan Paket (Perks) | "FREE ZIARAH THAIF", dll | ✅ |
| **Itinerary Harian (Day-by-Day)** | Hari 1: KNO Medan..., Hari 2: Madinah... | ✅ |
| **Fasilitas Termasuk** | Tiket PP, Hotel, Makan 3x, Zamzam, dll | ✅ |
| **Fasilitas Tidak Termasuk** | Paspor, Vaksin, Kelebihan Bagasi, dll | ✅ |
| **Syarat & Ketentuan (Terms)** | Pembatalan H-30 hangus 100%, dll | ✅ |
| **Persyaratan Dokumen** | Paspor 8 bulan, KTP, Vaksin, Foto 4x6, dll | ✅ |
| Gambar Cover Paket | Upload gambar | ✅ |
| Flyer / Brosur PDF (Download) | Upload PDF brosur paket | ✅ |
| Konfigurasi Komisi Kustom | Per-paket bisa beda komisi | ✅ |

> [!IMPORTANT]
> **Tab Detail Paket (di halaman publik)** memiliki 4 sub-tab yang semuanya diisi dari Admin:
> 1. **Itinerary** – Jadwal perjalanan hari per hari
> 2. **Fasilitas** – Termasuk & Tidak Termasuk
> 3. **Persyaratan** – Dokumen yang harus disiapkan jamaah
> 4. **S & K** – Syarat & Ketentuan (pembatalan, penalti, dll)

---

### 🆕 2.2. Booking Seat (Sidebar Kanan di Detail Paket)
Dari screenshot dan kode, widget Booking menampilkan:
1. **Pilih Jadwal Keberangkatan** – Satu paket bisa memiliki **beberapa tanggal keberangkatan** alternatif (multi-departure) + opsi "Bebas Tentukan Jadwal".
2. **Pilih Tipe Kamar** – Quad / Triple / Double, masing-masing dengan harga berbeda.
3. **Quantity Selector** (+/-) – Jumlah seat/pax yang dipesan.
4. **Total Otomatis** – Kalkulasi harga real-time (Harga Tipe Kamar × Qty).
5. **Tombol "BOOKING SEKARANG"**
6. **Tombol "DOWNLOAD BROSUR"** – Mengunduh file flyer PDF paket.
7. **Tombol "KONSULTASI WA"** – Langsung redirect ke WhatsApp CS.

---

### 🆕 2.3. Halaman Pendaftaran Agen / DP Sejuta (`/pendaftaran/agen`)
Halaman ini adalah form pendaftaran mitra yang terintegrasi dengan pembayaran. Fitur-fitur yang ditemukan:

- **Stepper (Step 1: Data & Pembayaran → Step 2: Konfirmasi)**
- **Field "Wasilah" (Sponsor/Upline)** – Otomatis terisi nama agen yang mengundang (dari link referal). Jika langsung, default ke "Admin".
- **Data Personal:** Nama Lengkap, Email, WhatsApp.
- **Metode Pembayaran:** Pilihan Transfer Manual ke rekening resmi perusahaan (BSI, BRI). Masing-masing menampilkan logo bank, nama PT, dan nomor rekening.
- **Sidebar Ringkasan:** Menampilkan program DP, total biaya (Rp 1.000.000), daftar keuntungan menjadi mitra (Akses Dashboard, Training, Materi Promosi, Bonus), dan hadiah (Parfume).
- **Trust Badges:** "Data terenkripsi", "Dukungan CS", "Proses cepat".

> [!NOTE]
> **Fitur Admin yang Diperlukan:**
> - Admin harus bisa mengatur **Nominal DP Pendaftaran Agen** (saat ini Rp 1.000.000).
> - Admin harus bisa mengatur **daftar rekening tujuan transfer** (Bank Name, No. Rekening, Nama PT, Logo Bank).
> - Admin harus bisa mengatur **daftar benefit/keuntungan** yang ditampilkan di halaman pendaftaran.

---

### 🆕 2.4. Gallery Foto & Video (`/gallery`)
- **Filter:** Semua, Foto, Video.
- **Grid Layout** responsif dengan hover animation.
- **Lightbox Modal** – Klik media untuk memperbesar gambar atau memutar video.
- **Mendukung:** Upload file video langsung (MP4) dan embed YouTube.

> **Admin harus bisa:** Upload foto/video baru, hapus, dan reorder.

---

### 🆕 2.5. Halaman Tentang Kami (`/tentang`)
- **Profil Perusahaan:** Gambar utama + deskripsi narasi.
- **Badge Pencapaian:** "10+ Tahun Pengalaman" (Angka & Teks bisa diubah Admin).
- **Daftar Keunggulan** (Checklist): Bimbingan Syar'i, Amanah, Fasilitas, Proses Mudah.
- **CTA (Call-to-Action):** "Siap Menuju Baitullah?" dengan tombol "DP Sejuta".
- **Legalitas Footer:** PPIU Resmi, IATA, ASITA, AMPHURI.

> **Admin harus bisa:** Mengedit teks profil, gambar, angka pengalaman, daftar keunggulan, dan badge legalitas.

---

### 🆕 2.6. Halaman Login (`/login`)
Dari screenshot yang Anda berikan:
- **Split Layout:** Kiri (visual branding + tagline), Kanan (form login).
- **Field:** Email, Password (dengan toggle show/hide).
- **Checkbox:** "Ingat saya".
- **Link:** "Lupa password?" dan "Buat akun baru".
- **Tombol:** "Masuk ke akun" dan "Kembali ke beranda".

---

### 🆕 2.7. Fitur Tambahan Lainnya dari Kode Sumber
- **AI Chatbot Widget** – Floating chat di kanan bawah (chatbot berbasis AI).
- **Tombol WhatsApp Floating** – Link langsung ke WhatsApp CS.
- **Preloader / Page Loader** – Animasi loading saat halaman pertama kali dibuka.
- **Cookie Consent Banner** – Pemberitahuan privasi & cookie.
- **Halaman Statis (Pages):** Kebijakan Privasi (`/page/kebijakan-privasi`), Syarat & Ketentuan (`/page/syarat-ketentuan`).

---

## 3. Ringkasan Fitur Baru untuk Admin Dashboard

Berikut adalah daftar modul/fitur yang **harus ditambahkan** ke Admin Dashboard agar semua konten publik bisa dikelola secara dinamis:

| No | Modul Admin Baru | Deskripsi |
|:--:|:-----------------|:----------|
| 1 | **CMS Paket Lengkap** | CRUD paket dengan field: Multi-departure, Harga per Tipe Kamar, Hotel (Makkah+Madinah+Bintang), Maskapai, Itinerary harian, Fasilitas Termasuk/Tidak, Persyaratan, S&K, Perks, Flyer PDF, dan Kuota Seat |
| 2 | **Manajemen Rekening Perusahaan** | CRUD daftar rekening tujuan transfer (BSI, BRI, dll) dengan logo bank |
| 3 | **Manajemen Galeri** | Upload/hapus/reorder Foto & Video (file + YouTube embed) |
| 4 | **Manajemen Halaman Tentang Kami** | Edit deskripsi, gambar, badge pengalaman, daftar keunggulan |
| 5 | **Manajemen Testimoni** | CRUD testimoni jamaah (nama, foto, teks, rating) |
| 6 | **Manajemen Webinar / Event** | CRUD jadwal webinar/event |
| 7 | **Manajemen Benefit Pendaftaran** | Edit daftar keuntungan & hadiah yang tampil di form DP Agen |
| 8 | **Pengaturan Umum (Settings)** | Logo, Favicon, Nomor WA CS, Alamat, Legalitas (IATA/ASITA/AMPHURI), Teks Footer |
| 9 | **Halaman Statis (CMS Pages)** | Edit konten Kebijakan Privasi & Syarat Ketentuan |
| 10 | **Hero Slider Manager** | CRUD gambar slider beranda beserta teks heading & tombol CTA |
