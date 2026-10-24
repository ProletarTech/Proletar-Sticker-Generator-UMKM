# Proletar Sticker Studio

Aplikasi web untuk menyiapkan desain stiker dan lembar cetak, langsung dari browser.

**Buka aplikasi:** [proletartech.github.io/Proletar-Sticker-Generator-UMKM](https://proletartech.github.io/Proletar-Sticker-Generator-UMKM/)

## Mulai menggunakan

1. Buka aplikasi melalui tautan di atas. Untuk memasang sebagai aplikasi, buka menu browser lalu pilih **Tambahkan ke layar utama** atau **Install app** jika tersedia.
2. Pilih tab sesuai pekerjaan: **Studio Warna**, **Hapus Latar**, **Upscaler**, atau **Lembar Stiker**.
3. Unggah gambar, atur hasil, lalu unduh file yang dibutuhkan.

Gunakan browser modern. Instalasi dan dukungan offline bergantung pada browser dan perangkat; buka aplikasi sekali saat online agar asetnya dapat tersimpan.

## Fitur dan format ekspor

- **Studio Warna:** buat variasi warna logo, simpan PNG satu per satu, atau buat batch hingga 100 desain sebagai ZIP.
- **Hapus Latar:** hapus latar otomatis atau area warna tersambung; tersedia undo/redo dan unduhan PNG.
- **Upscaler:** perbesar gambar 2×, 3×, atau 4× dengan interpolasi browser. Fitur ini menghaluskan pembesaran, bukan menghasilkan detail baru seperti upscaler AI.
- **Lembar Stiker:** susun beberapa desain pada ukuran kertas termasuk A3+, atur ukuran stiker, jarak, margin, bleed, dan garis potong.
- Ekspor lembar cetak tersedia sebagai **PDF** dan **PNG**; file potong tersedia sebagai **SVG**, **DXF**, dan **PLT**.
- Nama ekspor lembar cetak dapat mencantumkan pesanan, bahan, laminasi, finishing, potongan, ukuran kertas, bentuk, dan ukuran stiker.

**Catatan produksi:** informasi bahan, laminasi, finishing, dan jenis potongan hanya menjadi label nama file. Pilihan tersebut tidak mengubah proses finishing atau geometri potong secara otomatis. Konfirmasikan spesifikasi produksi dan margin aman dengan percetakan.

## Batas pemrosesan

- Gambar unggahan dibatasi hingga **25 MB** dan **25 megapiksel** per gambar. Gambar di atas 12 megapiksel meminta konfirmasi karena dapat memakai banyak memori.
- Hasil ekspor dibatasi hingga **25 megapiksel** dan sisi terpanjang **12.000 piksel**. Jika perangkat mencapai batas memori, aplikasi menyediakan opsi untuk mencoba lagi dengan resolusi lebih rendah atau membatalkan.
- Total PNG dalam batch Studio Warna dibatasi hingga **64 MB**.
- Penghapus latar dan upscaler bekerja dengan piksel yang berdekatan/warna yang dipilih dan interpolasi; periksa tepi desain sebelum mengirim ke percetakan.

## Berkas proyek

- `index.html` — aplikasi utama dan tab Studio Warna tertanam; entry point GitHub Pages.
- `Studio Warna.html` — Studio Warna mandiri.
- `BACA-SAYA.txt` — catatan penggunaan dan batas pemrosesan.
- `manifest.webmanifest`, `sw.js`, ikon, dan logo — aset instalasi/PWA.
- `LICENSE` — lisensi proyek.

Perubahan pada branch `main` dipublikasikan melalui GitHub Pages.
