# Pembimbing Andalus

[English](README.md) | **Bahasa Indonesia**

Aplikasi web sederhana, responsif, dan mudah digunakan untuk menampilkan daftar pembimbing kamar.

## Fitur
- **Tabel Responsif**: Tabel data terstruktur dengan baik yang dapat diakses di semua perangkat.
- **Mode Kartu (Grid View)**: Tampilan visual modern yang lebih nyaman untuk pengguna HP.
- **Pengelompokan & Akordion**: Kelompokkan pembimbing berdasarkan kategori kamar dan sembunyikan/tampilkan sesuai kebutuhan.
- **Dashboard Ringkasan**: Lihat total pembimbing dan kamar secara instan.
- **Salin ke Clipboard**: Salin nama atau tugas pembimbing dengan mudah hanya dengan satu klik.
- **Cari & Filter**: Temukan pembimbing dengan cepat berdasarkan nama atau kamar.

## Arsitektur
Proyek ini dibangun sebagai **Single-Page Application (SPA)** menggunakan pendekatan "pure web" murni tanpa framework eksternal atau langkah build.

- **`index.html`**: Titik masuk utama, berisi struktur semantik dan tabel data awal.
- **`src/index.css`**: CSS modern untuk tata letak, gaya, dan responsivitas, menggunakan properti kustom (CSS Variables).
- **`src/index.js`**: JavaScript Vanilla untuk perenderan dinamis, pengelompokan, pencarian, dan fitur penyalinan teks.

## Teknologi yang Digunakan
- **HTML5**: Markup semantik untuk struktur data.
- **CSS3**: Penataan modern dengan properti kustom dan responsivitas.
- **JavaScript (Vanilla)**: Logika bersih dan sesuai standar untuk fitur interaktif.

## Penggunaan
### Pengembangan Lokal
1. Klon repositori ini:
   ```bash
   git clone https://github.com/litfill/pembimbing-andalus.git
   ```
2. Buka `index.html` di browser web modern apa pun.

### Fitur Interaktif
- **Pencarian**: Gunakan bilah pencarian untuk memfilter pembimbing berdasarkan nama atau kamar.
- **Ganti Tampilan**: Beralih antara "Mode Tabel" dan "Mode Kartu" menggunakan tombol di kanan atas.
- **Kelompokkan Data**: Gunakan menu pilihan untuk mengelompokkan pembimbing berdasarkan kategori (misal: Bahasa, Tahfidz).
- **Salin Teks**: Klik tombol "📄 Salin" di samping teks apa pun untuk menyalinnya ke clipboard Anda.

## Deployment
Proyek ini dikonfigurasi untuk **GitHub Pages**. Setiap perubahan yang didorong (push) ke cabang `main` akan dideploy secara otomatis melalui GitHub Actions.

- **URL**: [https://litfill.github.io/pembimbing-andalus/](https://litfill.github.io/pembimbing-andalus/)

## Lisensi
MIT
