# Proletar Sticker Studio

Aplikasi web untuk menyiapkan desain stiker dan lembar cetak, langsung dari browser.

**Buka aplikasi:** [proletartech.github.io/Proletar-Sticker-Generator-UMKM](https://proletartech.github.io/Proletar-Sticker-Generator-UMKM/)

## Mulai menggunakan

1. Buka aplikasi melalui tautan di atas. Untuk memasang sebagai aplikasi, buka menu browser lalu pilih **Tambahkan ke layar utama** atau **Install app** jika tersedia.
2. Pilih tab sesuai pekerjaan: **Studio Warna**, **Cut Image**, **Hapus Latar**, **Upscaler**, **Lembar Stiker**, **Vektor Trace**, **Pratinjau File**, atau **Invoice**.
3. Unggah gambar, atur hasil, lalu unduh file yang dibutuhkan.

Navigasi menampilkan alat utama terlebih dahulu; **More tools** berisi Vektor Trace, Pratinjau File, dan Invoice. Di **Sticker Sheet**, **Quick setup** menampilkan alur dasar dan ekspor PDF, sedangkan **All settings** membuka seluruh kontrol dan format ekspor lanjutan. Tidak ada fitur yang dihapus.

Navigasi alat mendukung keyboard: gunakan **Tab** lalu tombol **← / →**, **Home**, atau **End** untuk berpindah tab. Buka **More tools** dengan **Enter** atau **Space**, dan tekan **Esc** untuk menutupnya. Tombol langkah pada Quick setup dapat dipilih untuk lompat ke upload, pilihan bentuk, atau ekspor.

Gunakan browser modern. Instalasi dan dukungan offline bergantung pada browser dan perangkat; buka aplikasi sekali saat online agar asetnya dapat tersimpan.

## Fitur dan format ekspor

- **Studio Warna:** buat variasi warna logo, simpan PNG satu per satu, atau buat batch hingga 100 desain sebagai ZIP. Mode warna dapat dinavigasi dengan tombol panah kiri/kanan, Home, dan End. Perkiraan CMYK ditampilkan untuk kedua ujung warna gradient; nilainya merupakan simulasi dari RGB, bukan profil warna cetak.
- **Vektor Trace:** jalur khusus untuk mengubah logo atau ilustrasi menjadi SVG vektor, terpisah dari Studio Warna dan Lembar Stiker.
- Hasil Vektor Trace dikirim ke alat lain lewat tombol **Kirim**, bukan diproses otomatis atau terhubung permanen.
- Pengaturan bentuk pada setiap logo Lembar Stiker dapat berbeda sehingga satu lembar dapat memuat kombinasi stiker bulat, kotak, oval, heksagon, dan bentuk lainnya.
- **Pratinjau File:** buka PDF, SVG/SVGZ, PNG, JPG, WebP, GIF, BMP, dan AVIF dalam satu menu. CDR dan beberapa format vektor dicoba lewat gambar pratinjau tertanam bila tersedia; file diproses lokal di browser.
- **Invoice:** buat, cetak, dan kelola riwayat invoice dari tab baru. Data Invoice disimpan terpisah secara lokal di browser perangkat ini.
- **Hapus Latar:** hapus latar otomatis atau area warna tersambung; tersedia undo/redo dan unduhan PNG.
- **Upscaler:** perbesar gambar 2×, 3×, atau 4× dengan interpolasi browser. Fitur ini menghaluskan pembesaran, bukan menghasilkan detail baru seperti upscaler AI.
- **Cut Image:** potong gambar ke bentuk persegi panjang, lingkaran, oval, persegi panjang membulat, atau heksagon dengan ukuran fisik dalam mm. Atur skala dan posisi artwork, gunakan kuas hapus dengan ukuran serta hardness yang bisa diubah, undo/redo, lalu ekspor PNG transparan pada 150/300/600 dpi (resolusi cetak disimpan dalam metadata PNG) atau kirim langsung ke Sticker Sheet. Ekspor dibatasi 25 megapiksel dan 12.000 px per sisi.
- **Lembar Stiker:** susun beberapa desain pada ukuran kertas termasuk A3+, atur ukuran stiker, jarak, margin, bleed, dan garis potong. Pilih layout **Standar** untuk baris lurus non-zigzag, **Efisien** untuk memilih hasil terbaik antara grid dan susunan rapat, atau **Zigzag** untuk memaksa baris selang-seling; susunan rapat hanya berlaku untuk stiker bulat. Untuk grid, posisi semua bentuk dan ukuran dihitung agar muat sebanyak mungkin; sisa ruang dibagi ke jarak antarstiker tanpa mengurangi jarak minimum, dan stiker yang melampaui area bermargin tidak ditempatkan. Warna latar stiker mengisi area kosong di dalam bentuk potong; memilih warna manual otomatis menonaktifkan sampling warna dari sudut gambar. Preset **Die Cut Prima** memakai halaman lanskap **48,3 × 32,5 cm** dengan area kerja **42 × 28 cm** dan marka titik di sudut, tanda silang di tengah sisi, serta panah; **Kiss Cut Prima** memakai halaman potret **32,5 × 48,3 cm** dengan area kerja **29 × 43 cm** dan marka siku di sudut serta titik registrasi. Margin dihitung dari ukuran halaman dan target area tersebut, lalu layout stiker dihitung ulang agar tetap berada di dalam area cetak yang tepat. Bentuk, posisi, dan bobot garis marka mengikuti PDF referensi. Bingkai magenta menunjukkan area kerja di preview saja, bukan jalur potong stiker dan tidak diekspor. Templat CDR lain memakai halaman **32,5 × 48,5 cm** dan bingkai **30,5 × 43,5 cm**. Kontur potong stiker tetap magenta sesuai ukuran stiker; lingkaran batas aman hitam tidak digunakan. Tambahkan teks kustom di tepi bawah lembar; teks ini tidak dicetak pada masing-masing stiker.
- Ekspor lembar cetak tersedia sebagai **PDF** dan **PNG**; file potong tersedia sebagai **SVG**, **DXF**, dan **PLT**.
- Pilihan warna PDF **RGB / CMYK** tersedia sebagai switch di Sticker Sheet dan berlaku untuk ekspor PDF. CMYK memakai DeviceCMYK dengan konversi generik dari RGB, bukan profil ICC percetakan; pada PDF Hybrid, artwork yang sudah ditrace tetap berupa vektor. Hasil akhir dapat berbeda menurut mesin dan bahan, jadi konfirmasikan profil yang diminta dengan percetakan. Ekspor SVG tidak berubah.
- **SVG untuk CorelDRAW** menyematkan artwork seluruh lembar sebagai satu PNG pada DPI cetak, dengan garis potong dan marka registrasi tetap vektor. Gunakan opsi ini jika gambar SVG lain tidak tampil di CorelDRAW.
- Ekspor terpisah untuk CorelDRAW tersedia sebagai dua PDF sinkron: PDF 1 berisi artwork stiker dan marka registrasi untuk dicetak, tanpa kontur potong; PDF 2 berisi marka registrasi yang sama dan kontur potong magenta, tanpa artwork. Unduh PDF 1 dahulu, lalu PDF 2; aplikasi memastikan unggahan dan pengaturan tidak berubah di antara ekspor. Jika ada perubahan, unduh ulang keduanya. Impor pada ukuran dan posisi asli tanpa mengubah skala atau posisi.
- Tombol **Download 2-page print + cut PDF** membuat satu PDF sinkron: halaman pertama berisi artwork stiker dan marka registrasi tanpa kontur potong; halaman kedua berisi marka registrasi yang sama dan kontur potong magenta tanpa artwork. Kedua halaman memakai ukuran kertas dan posisi yang identik.
- Tombol **Download both PDFs as ZIP** membuat satu arsip ZIP berisi kedua PDF sinkron di atas sekaligus.
- Dalam mode RGB, gambar PNG pada PDF lembar stiker dikompresi secara lossless untuk mengurangi ukuran file tanpa mengubah piksel atau menurunkan resolusi. Mode CMYK merasterkan artwork raster sesuai DPI PDF yang dipilih, sementara artwork vektor pada PDF Hybrid tetap vektor; opsi lossless hanya berlaku untuk RGB. PDF Invoice memakai dialog cetak browser.
- **SVG tanpa gambar** berisi kontur potong dan marka registrasi sebagai vektor; pengaturan bentuk, layout, offset, dan marka tetap diterapkan.
- Nama ekspor lembar cetak dapat mencantumkan pesanan, bahan, laminasi, finishing, potongan, ukuran kertas, bentuk, dan ukuran stiker.

**Catatan produksi:** informasi bahan, laminasi, finishing, dan jenis potongan hanya menjadi label nama file. Pilihan tersebut tidak mengubah proses finishing atau geometri potong secara otomatis. Konfirmasikan spesifikasi produksi dan margin aman dengan percetakan.

## Batas pemrosesan

- Tidak ada batas ukuran file atau megapiksel untuk unggahan gambar.
- Hasil ekspor dibatasi hingga **25 megapiksel** dan sisi terpanjang **12.000 piksel**. Jika perangkat mencapai batas memori, aplikasi menyediakan opsi untuk mencoba lagi dengan resolusi lebih rendah atau membatalkan.
- SVG lembar menyematkan gambar PNG/JPEG sumber sekali per desain dan memakainya ulang pada stiker duplikat, sehingga file tetap ringkas dan resolusi tidak ditentukan oleh DPI ekspor. Artwork yang perlu efek berbasis piksel mengikuti DPI ekspor; garis potong tetap berupa vektor. SVG Hybrid juga mempertahankan artwork hasil trace sebagai vektor.
- Total PNG dalam batch Studio Warna dibatasi hingga **64 MB**.
- Penghapus latar dan upscaler bekerja dengan piksel yang berdekatan/warna yang dipilih dan interpolasi; periksa tepi desain sebelum mengirim ke percetakan.

## Berkas proyek

- `index.html` — aplikasi utama dan tab Studio Warna tertanam; entry point GitHub Pages.
- `Studio Warna.html` — Studio Warna mandiri.
- `Proletar Tech · Invoice.html` — aplikasi Invoice yang juga tersedia sebagai tab tertanam di aplikasi utama.
- `BACA-SAYA.txt` — catatan penggunaan dan batas pemrosesan.
- `manifest.webmanifest`, `sw.js`, ikon, dan logo — aset instalasi/PWA.
- `LICENSE` — lisensi proyek.
- `NOTICE.md` — penjelasan lisensi kode dan batas penggunaan merek/aset Proletar.

Perubahan pada branch `main` dipublikasikan melalui GitHub Pages.

## Lisensi dan atribusi

Kode asli Proletar dilisensikan di bawah **GNU GPL v3.0** dan boleh digunakan, diubah, serta didistribusikan, termasuk secara komersial, dengan mengikuti GPLv3 dan ketentuan atribusi tambahan yang dijelaskan di [NOTICE.md](NOTICE.md). Komponen pihak ketiga mengikuti lisensi dan pemberitahuannya masing-masing.

Nama dan logo Proletar merupakan identitas merek terpisah dan tidak mendapat izin penggunaan dari lisensi kode. Baca [NOTICE.md](NOTICE.md) sebelum memakai atau mendistribusikan fork