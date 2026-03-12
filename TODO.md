# Project Tasks: Pembimbing Andalus

## 1. Documentation
- [x] **Update README.md**: Add project description, features, and usage instructions.

## 2. Bug Fixes & Security
- [x] **Fix Attribute Injection in `src/index.js`**: Ensure that names or roles containing quotes (`"`) do not break the HTML attribute when injecting the copy button.
    - *Step:* Instead of template literals for `data-copy`, use `element.dataset.copy` or `setAttribute`.

## 3. New Features
- [x] **Implement Search/Filter**:
    - [x] **HTML**: Add a search input field above the table in `index.html`.
    - [x] **CSS**: Style the search input for better UX in `src/index.css`.
    - [x] **JS**: Add an event listener to the search input in `src/index.js` to filter table rows based on user input (searching by name or role).

## 4. Final Review
- [x] Verify all features work as expected.
- [x] Ensure responsiveness is maintained.

## 5. Mode Presentasi Baru (Card Mode)
- [x] **View Toggler**:
    - [x] **HTML**: Tambahkan tombol untuk beralih antara "Tampilan Tabel" dan "Tampilan Kartu".
    - [x] **CSS**: Berikan gaya pada tombol pemindah mode agar terlihat modern.
    - [x] **JS**: Implementasikan logika perpindahan *state* (Tabel/Kartu).
- [x] **Card View**:
    - [x] **HTML**: Tambahkan kontainer kosong untuk menampung kartu-kartu yang akan di-generate via JS.
    - [x] **CSS**: Desain tampilan kartu yang responsif (Grid/Flexbox).
    - [x] **JS**: Buat fungsi untuk meng-generate kartu secara dinamis dari data tabel agar data tetap sinkron.
    - [x] **JS**: Pastikan fitur pencarian juga menyaring tampilan kartu.

## 6. Mode Presentasi Tambahan
- [x] **Dashboard Ringkasan (Stats Overview)**:
    - [x] **HTML**: Tambahkan area di atas pencarian untuk menampilkan statistik ringkas.
    - [x] **JS**: Hitung total pembimbing dan kategori unik (kamar) secara dinamis.
- [x] **Pengelompokan & Akordion (Grouped View)**:
    - [x] **HTML/JS**: Tambahkan opsi dropdown/tombol untuk mengaktifkan "Mode Grup".
    - [x] **JS**: Logika untuk mengelompokkan data berdasarkan kata kunci (misal: "Lantai", "Bahasa", "Tahfidz").
    - [x] **CSS**: Styling untuk header grup dan animasi *collapse/expand* (akordion).
