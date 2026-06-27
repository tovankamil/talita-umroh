# Talita Umroh - Design System Guidelines
*(Diadaptasi dari ai-notetaking-boilerplate)*

Dokumen ini memuat panduan gaya visual (Design System) yang akan diimplementasikan pada antarmuka aplikasi Talita Umroh. Design System ini menggunakan Tailwind CSS dengan pendekatan *modern glassmorphism*, *3D staging*, dan *ambient lighting*.

---

## 🎨 1. Color Palette (Tailwind CSS)

Gunakan skema warna berikut di `tailwind.config.ts`. Warna dikelola menggunakan CSS Variables (HSL format) untuk mempermudah transisi ke *Dark Mode*.

### Base Colors (Light Mode)
- **Background**: `hsl(0 0% 100%)` (Putih Murni)
- **Foreground**: `hsl(222.2 84% 4.9%)` (Hitam/Gelap)
- **Primary**: `hsl(221.2 83.2% 53.3%)` (Cyan/Biru Terang)
- **Secondary**: `hsl(210 40% 96%)` (Abu-abu sangat terang)
- **Destructive**: `hsl(0 84.2% 60.2%)` (Merah Peringatan)
- **Muted**: `hsl(210 40% 96%)`
- **Border & Input**: `hsl(214.3 31.8% 91.4%)`

### Base Colors (Dark Mode)
- **Background**: `hsl(222.2 84% 4.9%)`
- **Foreground**: `hsl(210 40% 98%)`
- **Primary**: `hsl(217.2 91.2% 59.8%)`
- **Secondary**: `hsl(217.2 32.6% 17.5%)`
- **Destructive**: `hsl(0 62.8% 30.6%)`

> [!TIP]
> Di Next.js Tailwind 4, Anda bisa mendaftarkan warna-warna ini sebagai token di file `globals.css` (Layer Base).

---

## 📐 2. Layout & Background Environments

Sistem layout menggunakan *layered ambient backgrounds* untuk memberikan kesan kedalaman (3D) dan premium.

### Ambient Backgrounds
Terapkan *class* ini pada kontainer utama / body:
- `.app-shell-bg`: Background dasar dengan gradasi linear subtil (hijau toska & putih tulang).
- `.ambient-shell-layer`: Menambahkan efek pendaran cahaya (glowing orbs) berwarna teal, biru langit, dan kuning emas yang melayang/animasi (*float*).
- `.ambient-shell-grid`: Menambahkan tekstur *grid* atau garis-garis koordinat tipis layaknya *blueprint* di latar belakang.

---

## 💎 3. Components & Surfaces (Glassmorphism & 3D)

Untuk setiap komponen UI (Card, Panel, Modal), gunakan *class* berikut untuk menciptakan kedalaman yang konsisten:

### Panel & Cards
- **`.surface-panel`**: Panel dasar standar. Menggunakan `backdrop-blur`, background putih semi-transparan (`bg-white/90`), dan border tipis.
- **`.dashboard-card`**: Kartu dashboard utama. Sudut melengkung besar (`rounded-[28px]`), bayangan halus (`shadow-sm`).
- **`.dashboard-card-hover`**: Efek interaktif untuk kartu (angkat ke atas `translate-y-1` dan bayangan lebih tebal).
- **`.dashboard-card-soft`**: Kartu dengan efek *glassmorphism* (kaca). Sangat cocok untuk ditumpuk di atas `.ambient-shell-layer`.

### 3D Stage & Panels (Premium Elements)
Sangat cocok untuk halaman *Overview/Dashboard* Talita Umroh yang menonjolkan visual elegan:
- **`.dashboard-3d-stage`**: Kontainer induk untuk elemen 3D.
- **`.dashboard-3d-panel`**: Panel tingkat tinggi dengan pencahayaan buatan (gradient border), pantulan cahaya di dalam panel, dan bayangan tebal. Memberikan kesan objek fisik premium.
- **`.dashboard-3d-panel-soft`**: Versi lebih lembut dari panel 3D.
- **`.dashboard-3d-metric`**: Digunakan khusus untuk kartu statistik/metrik (misal: Total Komisi, Total Jamaah).

---

## 🔘 4. Controls & Inputs

### Interactive Elements
- **`.interactive-control`**: Standar untuk Input Form, Select, Textarea. Border abu-abu terang yang berubah menjadi *glowing teal* (`ring-teal-500/20`) saat aktif (Fokus).
- **`.soft-button`**: Tombol dengan sudut membulat, bayangan ringan, dan animasi ditekan/diangkat (`hover:-translate-y-0.5`).
- **`.dashboard-pill`**: Label/Badge melingkar (misal: Status "Verified", "Pending") dengan font-weight tebal dan border ring.

---

## 📝 5. Typography (Prose)

Untuk area konten artikel, panduan, atau Syarat & Ketentuan, gunakan kustomisasi class `.prose` yang telah diformat:
- **`h1`**: Teks tebal, ukuran 2xl, margin bawah 4 (`mb-4`).
- **`h2`**: Teks semi-tebal, ukuran xl.
- **`p`**: Jarak antar baris lebih rileks (`leading-relaxed`).
- **`blockquote`**: Garis batas kiri tebal, teks miring warna abu-abu.

---

## ✨ 6. Animations & Micro-Interactions

### Loading State
- **`.loading-shimmer`**: Efek kerlipan/shimmering (seperti skeleton loading) menggunakan gradasi warna pastel dan toska. 
  *Gunakan pada skeleton card saat memuat data dari backend.*

### Kursor Kustom (Opsional untuk efek Wow)
Sistem ini membawa dua jenis kursor estetik jika ingin diaktifkan di area tertentu (misal: Landing Page):
- **Particle Cursor**: Kursor dengan cincin bercahaya dan jejak komet (trail).
- **Dragon Cursor**: Kursor animasi dengan segmen yang mengekor (menggunakan warna *cyan* / toska terang).

---

## 🛠️ Cara Implementasi ke Talita Umroh

1. Salin seluruh deklarasi variabel CSS dari `index.css` (boilerplate) ke `src/app/globals.css` Talita Umroh.
2. Update `tailwind.config.ts` di folder Frontend untuk mendaftarkan warna-warna baru (`border`, `input`, `ring`, `primary`, dll).
3. Gunakan class `.app-shell-bg` dan `.ambient-shell-layer` pada `<main>` layout Dashboard Agen Talita Umroh untuk langsung memberikan *feel* elegan.
