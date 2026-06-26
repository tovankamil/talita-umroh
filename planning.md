# Perencanaan Pembuatan Aplikasi Umroh dengan Sistem Referral

Dokumen ini merupakan rancangan dan rencana pengembangan (planning) untuk aplikasi Umroh yang dilengkapi dengan fitur **Referral (Agen/Mitra)**. 

---

## 1. Executive Summary
Aplikasi ini bertujuan untuk memudahkan calon jamaah dalam mencari, memilih, dan mendaftar paket Umroh secara digital. Selain itu, aplikasi ini memiliki fitur **Referral** yang memungkinkan pengguna (jamaah atau agen) untuk mendapatkan komisi, komisi jaringan (multi-level), serta hadiah pencapaian (reward) dengan cara merekomendasikan layanan ini kepada orang lain.

---

## 2. Fitur Utama

### A. Aplikasi Pengguna (Calon Jamaah)
- **Registrasi & Login**: Autentikasi via Email, Nomor HP (OTP), atau Google.
- **Katalog Paket Umroh**: Daftar paket umroh beserta detail (jadwal, maskapai, hotel, itinerary). *(Contoh Harga Paket referensi: Rp 49.700.000)*
- **Pemesanan & Pembayaran**: Sistem pembayaran bertahap:
  - DP (Down Payment)
  - Booking Seat
  - Pelunasan (Cash/Tunai)
- **Manajemen Dokumen**: Upload paspor, KTP, KK, visa, dan dokumen kesehatan langsung dari aplikasi.
- **Panduan Umroh & Manasik**: Jadwal manasik, doa-doa, dan panduan ibadah (teks/video/audio).

### B. Sistem Referral & Komisi (Agen / Mitra)
- **Syarat Aktivasi Referral**: Pengguna **wajib** sudah melakukan pembayaran (minimal DP, Booking Seat, atau Cash/Lunas) untuk bisa mulai mendapatkan komisi dan mengikuti program referral.
- **Dashboard Referral & Jaringan**: Halaman khusus untuk melihat statistik klik, jumlah jamaah terdaftar, status pembayaran mereka, serta melihat hierarki/pohon jaringan (hingga 5 kedalaman/level).
- **Withdrawal / Penarikan Dana**: Permintaan penarikan komisi ke rekening bank pengguna, serta klaim hadiah barang (Motor/Mobil) jika target tercapai.

---

## 3. Skema Komisi & Hadiah Referral

Terdapat alokasi *budget bonus* untuk mitra sebesar **Rp 2.775.000** dari harga paket lunas (Rp 49.700.000). Skema pembagiannya adalah sebagai berikut:

### A. Komisi Mengajak Langsung (Direct Bonus)
Komisi yang didapatkan bergantung pada jenis pembayaran yang dilakukan oleh jamaah yang diajak:
1. **Bayar DP (Rp 1.000.000)** ➔ Komisi: **Rp 300.000**
2. **Bayar Booking Seat (Rp 5.000.000)** ➔ Komisi: **Rp 1.000.000**
3. **Bayar Cash/Tunai (Rp 49.700.000)** ➔ Komisi: **Rp 2.000.000**

### B. Komisi Jaringan / Tambahan (Komisi Seller)
Komisi ini didapatkan dari jamaah dalam jaringan di bawah mitra yang dibantu untuk bersyiar. 
*Syarat: Komisi ini hanya cair jika jamaah di jaringan tersebut sudah **melunasi** biaya perjalanan umroh (Lunas).*
- **Seller Level 1**: Rp 50.000
- **Seller Level 2**: Rp 50.000
- **Seller Level 3**: Rp 50.000
- **Seller Level 4**: Rp 50.000
- **Seller Level 5**: Rp 50.000
*(Berlaku kelipatan hingga 5 tingkat/kedalaman jaringan dari jamaah yang dikembangkan).*

### C. Reward / Hadiah Pencapaian (Prestasi Syiar)
Hadiah tambahan diberikan kepada jamaah aktif yang berprestasi dalam mendatangkan jamaah yang **membayar lunas**.
- **Hadiah 1 (Motor senilai Rp 15.000.000)** 
  *Syarat*: Berhasil mengajak langsung 20 jamaah pribadi dan semuanya membayar lunas biaya perjalanan umroh.
- **Hadiah 2 (Mobil Brio)** 
  *Syarat*: Berhasil membantu 20 mitra jamaah langsungnya (di bawahnya langsung) untuk masing-masing mendapatkan 20 jamaah yang lunas (membantu 20 mitra mencapai target Hadiah 1).

---

## 4. Alur Kerja (Workflow) Referral dalam Sistem

1. **Aktivasi Akun Referral**: User mendaftar, membayar DP/Booking/Cash, lalu sistem mengaktifkan kode/link referral miliknya.
2. **Share Link**: User membagikan link referral miliknya.
3. **Pendaftaran Downline**: Jamaah baru mendaftar menggunakan link tersebut.
4. **Pencatatan Komisi Langsung**: 
   - Jika downline bayar DP -> saldo komisi User bertambah Rp 300.000 (status *Approved*).
   - Jika downline bayar Booking Seat -> saldo bertambah.
5. **Pencatatan Komisi Jaringan**: Saat downline melunasi pembayaran (Cash), sistem mengecek *Upline* hingga 5 tingkat ke atas, dan masing-masing tingkat diberikan Rp 50.000.
6. **Perhitungan Reward**: Sistem otomatis menghitung jumlah downline langsung yang berstatus "Lunas". 
   - Jika menyentuh angka 20, muncul tombol **"Klaim Hadiah 1 (Motor)"**.
   - Sistem juga menghitung pencapaian downline level 1. Jika 20 downline level 1 sudah mengklaim Motor, maka User mendapatkan tombol **"Klaim Hadiah 2 (Mobil Brio)"**.

---

## 5. Spesifikasi Teknis (Rekomendasi)

- **Frontend (Mobile App)**: Flutter atau React Native.
- **Frontend (Web Admin)**: React.js / Next.js / Vue.js + Tailwind CSS.
- **Backend**: **Golang (Go)**. Sangat direkomendasikan karena Golang memiliki performa tinggi (concurrency) dan sangat efisien dalam menangani *request* berjumlah besar secara bersamaan, terutama untuk menghitung alur hierarki referral (MLM 5 level) secara real-time. Framework yang bisa digunakan antara lain *Gin* atau *Fiber*.
- **Database**: PostgreSQL / MySQL (Mendukung query hierarki untuk level referral 1-5).
- **Payment Gateway**: Midtrans, Xendit, atau Duitku.
- **Notifikasi**: Firebase Cloud Messaging (FCM) & WhatsApp API.

---

## 6. Tahapan Pengembangan (Roadmap)

1. **Requirement & UI/UX Design** (2 - 3 Minggu)
2. **Pengembangan Backend (Golang), Struktur MLM/Referral, & Database** (4 Minggu)
3. **Pengembangan Frontend App & Web Admin** (4 - 6 Minggu)
4. **Testing & UAT** (2 Minggu) - *Termasuk stress-test perhitungan komisi tiering 5 level dan simulasi klaim Motor/Mobil.*
5. **Deployment & Launching** (1 Minggu)
