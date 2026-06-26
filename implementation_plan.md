# Architecture & Implementation Plan
**Proyek:** Aplikasi Sistem Keagenan & Pembonusan Umroh

Dokumen ini memuat usulan Arsitektur Sistem, Tech Stack, dan Pembagian Tugas (*Task Breakdown*) dari awal hingga *deployment*.

---

## 1. Arsitektur Sistem (System Architecture)

Berdasarkan pilihan Anda, kita akan menggunakan kombinasi arsitektur modern (*Headless / API-Driven*) yang memisahkan antara sistem Backend (Logika & Data) dan Frontend (Tampilan UI).

*   **Backend & Core Engine API:** **Golang (Go)**. Golang sangat unggul dalam performa *high concurrency*, pemrosesan latar belakang (*background jobs* / Goroutines), dan efisiensi memori. Sangat cocok untuk *Commission Engine* yang butuh kecepatan presisi.
*   **Frontend (Landing Page & Dashboard):** **Next.js (React.js)** dipadukan dengan **Tailwind CSS**.
    *   *Referensi Desain:* Bagian *Landing Page* publik akan dibuat semirip mungkin secara struktur, estetika (warna Gold/Hijau premium), dan nuansa *trust-building* dari referensi **[sulthanumroh.com](https://sulthanumroh.com/)**.
*   **Database:** **PostgreSQL** atau **MySQL 8** (tergantung preferensi, namun PostgreSQL umumnya sangat tangguh disandingkan dengan Golang).
*   **Queue & Background Jobs:** **Redis**. Digunakan untuk menyimpan *cache* dan mengelola antrean notifikasi WhatsApp agar sistem tidak macet (*blocking*) saat mengirim ratusan pesan WA.
*   **Infrastruktur & Server:** **Docker**. Lingkungan `golang-api`, `nextjs-web`, `database`, dan `redis` akan dibungkus dalam *container* menggunakan `docker-compose` agar proses *deployment* ke VPS (Linux) berjalan mulus tanpa isu dependensi.

---

## 2. Rencana Eksekusi Tugas (Task Breakdown)

Berikut adalah struktur pekerjaan (*Work Breakdown Structure*) yang akan dieksekusi secara bertahap:

### Phase 1: Setup & UI/UX Design
- `[ ]` **Task 1.1 - UI/UX Landing Page:** Membangun *layout Landing Page* responsif (Hero Slider, Daftar Paket Hemat, Testimoni) meniru gaya visual referensi `sulthanumroh.com` menggunakan Tailwind CSS.
- `[ ]` **Task 1.2 - UI/UX Dashboard:** Menyiapkan struktur antarmuka (UI) Dasbor Admin & Agen yang senada dengan identitas visual *Landing Page*.
- `[ ]` **Task 1.3 - Docker Environment:** Membuat file `docker-compose.yml` untuk lingkungan *Development* (menggabungkan servis `go-app`, `node-app`, `mysql/postgres`, dan `redis`).

### Phase 2: Backend API (Golang)
- `[ ]` **Task 2.1 - Go Project Setup & DB:** Inisialisasi *module* Golang, *setup* koneksi database, dan pembuatan *Struct / Model Migration* berdasarkan ERD.
- `[ ]` **Task 2.2 - Auth & JWT API:** Membuat *endpoint* REST API untuk Registrasi Referal, Login (menghasilkan *JWT Token*), dan Lupa Password.
- `[ ]` **Task 2.3 - Commission & Transaction API:** Membuat logika perhitungan komisi di sisi Golang, API validasi pesanan, upload bukti transfer manual, dan *approval* admin.
- `[ ]` **Task 2.4 - Marketing Kit API:** CRUD (Create, Read, Update, Delete) *endpoint* untuk file *Marketing Kit*.

### Phase 3: Frontend Web (Next.js)
- `[ ]` **Task 3.1 - Public Pages:** Integrasi API ke halaman utama (Landing Page) dan form Pendaftaran Agen.
- `[ ]` **Task 3.2 - Agent Portal:** 
    - Integrasi Dasbor Agen (Manajemen Rekening Bank Nasional).
    - Halaman Pemesanan & Upload Bukti Transfer.
    - Halaman riwayat komisi dan pencairan (*Withdrawal*).
    - Halaman pengunduhan Brosur/Marketing.
- `[ ]` **Task 3.3 - Admin Portal:**
    - Dasbor verifikasi manual bukti bayar (*Approve / Reject*).
    - Persetujuan *Withdrawal*.
    - Menampilkan *Chart/Grafik* performa (KPI).

### Phase 4: Integrasi External & Cron Jobs (Goroutines)
- `[ ]` **Task 4.1 - WA API Client:** Membuat *service* HTTP client di Golang untuk berinteraksi dengan API WhatsApp pihak ketiga guna mengirim notifikasi otomatis.
- `[ ]` **Task 4.2 - Scheduler KPI:** Memanfaatkan *Cron scheduler* internal Golang (misal package `robfig/cron`) untuk merekap data KPI setiap malam pkl 23:59 dan mengirimkannya ke WA manajemen.

### Phase 5: Server Deployment (Production)
- `[ ]` **Task 5.1 - Server Provisioning:** Menyiapkan VPS (misal Ubuntu 22.04), mengatur UFW (Firewall), dan memasang Docker.
- `[ ]` **Task 5.2 - Build & Deploy:** Mem-*build binary* dari Golang dan menjalankan *build* Next.js, kemudian mengangkat semuanya via Docker Compose mode *Production*.
- `[ ]` **Task 5.3 - Nginx & HTTPS:** Konfigurasi Nginx sebagai *Reverse Proxy* untuk membagi *traffic* domain (`/api` ke Golang, sisanya ke Next.js) dan memasang SSL (*Let's Encrypt*).

---

> [!IMPORTANT]
> ## 🛑 User Review Required
> 
> Silakan tinjau **Arsitektur (Golang + Next.js)** dan **Daftar Tugas** di atas. 
> 
> **Pertanyaan Terbuka untuk Anda:**
> 1. Di sisi Golang, apakah Anda punya *framework* khusus yang disukai (misal: **Gin**, **Fiber**, atau **Echo**)?
> 2. Untuk Database ORM di Golang, apakah Anda terbiasa dengan **GORM**, **sqlx**, atau *raw SQL*?
>
> **Klik tombol PROCEED/SETUJU** jika Anda setuju dengan rancangan eksekusi ini. Setelah disetujui, kita bisa langsung membuat *task list* (TODO) dan memulai eksekusinya dengan membuat direktori proyek Golang & Next.js beserta file `docker-compose.yml`.
