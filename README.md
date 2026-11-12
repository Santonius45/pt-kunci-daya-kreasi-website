# PT Kunci Daya Kreasi Website

Website company profile berbasis TypeScript dan Vite.

## Menjalankan project

1. Pastikan Node.js dan npm sudah terpasang.
2. Buka terminal pada folder project.
3. Jalankan `npm install`.
4. Jalankan `npm run dev` untuk development.
5. Jalankan `npm run build` untuk membuat production build.
6. Jalankan `npm run preview` untuk melihat hasil production build secara lokal.

## Pembaruan pada versi ini

- Informasi kontak diperbarui sesuai data dari klien:
  - Alamat: Tangerang Selatan, Banten, Indonesia
  - Email: admin@penerbitkunci.id
  - Website: https://penerbitkunci.id
- Logo resmi KDK dari file aset klien dipasang pada header dan footer.
- Sampul buku `Spirit and Truth: Third Reformation` dari file aset klien digunakan pada beranda, katalog, dan halaman detail buku.
- Aset gambar berada di `public/assets/`.
- Struktur aplikasi, routing SPA, konten utama, dan styling yang sudah ada dipertahankan dengan perubahan terbatas.

## Catatan fungsional

Formulir kontak pada versi dasar masih berupa validasi sisi browser dan notifikasi antarmuka. Formulir tersebut belum terhubung ke backend/email service, sehingga notifikasi di halaman tidak berarti pesan benar-benar terkirim ke email perusahaan. Integrasi pengiriman pesan memerlukan layanan backend atau email API.

## Integrasi formulir kontak (Resend + Vercel Functions)

Formulir Kontak sekarang mengirim data ke endpoint server `POST /api/contact`. Endpoint mengirim email menggunakan Resend, dengan penerima default `admin@penerbitkunci.id`. API key hanya dibaca di sisi server dan tidak dimasukkan ke bundle browser.

### Persiapan sebelum formulir aktif di website publik

1. Buat akun di [Resend](https://resend.com/) dan tambahkan/verifikasi domain `penerbitkunci.id` sesuai instruksi Resend (termasuk DNS record yang diminta).
2. Buat API Key di Resend.
3. Deploy project ke Vercel dengan **Root Directory** diarahkan ke folder `site` (folder yang berisi `package.json`, `src`, dan `api`). Framework preset: Vite.
4. Di Vercel, buka **Project Settings → Environment Variables**, lalu tambahkan:
   - `RESEND_API_KEY` = API Key Resend (secret; jangan pernah memakai awalan `VITE_`).
   - `CONTACT_FROM_EMAIL` = `PT Kunci Daya Kreasi <website@penerbitkunci.id>` (alamat/domain pengirim harus sudah diverifikasi di Resend).
   - `CONTACT_TO_EMAIL` = `admin@penerbitkunci.id`.
5. Aktifkan untuk Production (dan Preview bila diperlukan), simpan, lalu lakukan redeploy.
6. Uji formulir dari domain website yang sudah live. Pastikan email masuk ke Inbox atau folder Spam/Junk `admin@penerbitkunci.id`.

### Catatan penting

- File `.env.example` hanya contoh nama variabel. Jangan menggantinya dengan API key sungguhan lalu mengunggahnya ke GitHub.
- `CONTACT_FROM_EMAIL` wajib memakai alamat pada domain yang sudah diverifikasi di Resend. Jika domain belum diverifikasi, pengiriman ke alamat tujuan klien dapat ditolak oleh Resend.
- Pengiriman email belum bisa diuji dari ZIP lokal tanpa konfigurasi Resend dan deployment serverless. `npm run dev` menjalankan Vite saja; endpoint `/api/contact` tersedia setelah project dideploy sebagai Vercel Functions.
- Pesan pengunjung dikirim sebagai teks biasa dan alamat pengunjung dipasang sebagai `Reply-To`, sehingga admin dapat membalas langsung ke pengirim.
- Formulir memiliki validasi, batas panjang input, dan honeypot sederhana untuk mengurangi spam. Untuk trafik publik yang besar, tambahkan layanan rate limiting/WAF.
