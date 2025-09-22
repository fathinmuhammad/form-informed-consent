# Formulir Informed Consent

Aplikasi formulir informed consent berbasis web dengan integrasi Google Sheets sebagai database dan Google Drive untuk penyimpanan file.

## Fitur Utama

1. **Form Multi-Step (Wizard)** dengan navigasi yang intuitif
2. **Integrasi dengan Google Sheets** sebagai database
3. **Dua metode tanda tangan**:
   - Upload file gambar (JPEG/PNG, max 10MB)
   - Canvas drawing langsung di aplikasi
4. **Validasi form** yang komprehensif
5. **UI/UX responsif** menggunakan CSS sederhana
6. **Manajemen state** yang efisien untuk form data

## Teknologi yang Digunakan

- **Frontend**: React.js
- **Form Validation**: react-hook-form, Zod
- **Backend**: Google Apps Script
- **Database**: Google Sheets
- **File Storage**: Google Drive

## Struktur Proyek

```
consent-form-app/
├── src/
│   ├── components/
│   │   ├── form/
│   │   │   ├── ConsentForm.js
│   │   │   ├── FileUpload.js
│   │   │   └── SignatureCanvas.js
│   │   └── ui/
│   │       ├── button.js
│   │       ├── input.js
│   │       ├── label.js
│   │       └── select.js
│   ├── App.js
│   └── index.js
├── public/
├── backend/
│   ├── Code.js
│   ├── README.md
│   └── GOOGLE_SHEETS_SCHEMA.md
├── package.json
└── README.md
```

## Instalasi dan Setup

### Prerequisites

- Node.js (v14 atau lebih tinggi)
- npm (biasanya sudah terinstal bersama Node.js)
- Google Account untuk Google Sheets dan Google Drive

### Setup Frontend

1. Clone repository ini
2. Masuk ke direktori proyek:
   ```bash
   cd consent-form-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Jalankan development server:
   ```bash
   npm start
   ```
5. Buka [http://localhost:3000](http://localhost:3000) di browser

### Setup Backend (Google Apps Script)

1. Buka [Google Apps Script](https://script.google.com/)
2. Buat project baru
3. Hapus kode default dan ganti dengan kode dari `backend/Code.js`
4. Simpan project dengan nama "ConsentFormBackend"
5. Klik "Deploy" → "New deployment"
6. Pilih jenis "Web app"
7. Konfigurasi:
   - Description: Consent Form Backend
   - Execute as: Me (your email)
   - Who has access: Anyone (atau "Anyone even anonymous" untuk testing)
8. Klik "Deploy"
9. Salin Web app URL

### Konfigurasi Frontend dengan Backend

1. Buka file `src/components/form/ConsentForm.js`
2. Uncomment bagian kode yang berkaitan dengan fetch request
3. Ganti URL pada fetch request dengan Web app URL yang telah disalin

## Deployment

### Frontend Deployment

Untuk deploy frontend, Anda bisa menggunakan berbagai platform seperti:

1. **Vercel**:
   - Install Vercel CLI: `npm install -g vercel`
   - Jalankan: `vercel` di direktori proyek

2. **Netlify**:
   - Build proyek: `npm run build`
   - Upload folder `build` ke Netlify

3. **GitHub Pages**:
   - Install gh-pages: `npm install gh-pages --save-dev`
   - Tambahkan script ke `package.json`:
     ```json
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
     ```
   - Jalankan: `npm run deploy`

## Penggunaan

1. Buka aplikasi di browser
2. Isi data dasar di Step 1:
   - Pilih tenaga kesehatan
   - Pilih jenis tindakan
   - Masukkan nama pasien/wali
   - Berikan tanda tangan (gambar atau upload)
3. Lanjut ke Step 2 untuk mengisi data lengkap
4. Lanjut ke Step 3 untuk finalisasi dan submit
5. Data akan tersimpan di Google Sheets dan file tanda tangan di Google Drive

## Konfigurasi Google Sheets

Setelah form disubmit, data akan tersimpan di Google Sheets dengan struktur sesuai dokumentasi di `backend/GOOGLE_SHEETS_SCHEMA.md`.

## Konfigurasi Google Drive

File tanda tangan akan disimpan di folder "ConsentFormSignatures" di Google Drive Anda.

## Pengembangan Lebih Lanjut

### Menambahkan Field Baru

1. Tambahkan field baru di form validation schema (`ConsentForm.js`)
2. Tambahkan input field di UI
3. Tambahkan field baru di Google Apps Script backend (`Code.js`)
4. Update header Google Sheets jika perlu

## Troubleshooting

### Error CORS

Pastikan Google Apps Script deployment diatur untuk "Anyone" atau "Anyone even anonymous".

### Error saat menyimpan data

1. Periksa log Google Apps Script
2. Pastikan Anda memiliki akses ke Google Sheets dan Google Drive
3. Periksa koneksi internet

## Keamanan

Untuk produksi, pertimbangkan:
1. Mengatur akses Google Apps Script ke "Only myself"
2. Menambahkan autentikasi pengguna
3. Menambahkan rate limiting
4. Validasi dan sanitasi input data

## Lisensi

MIT License