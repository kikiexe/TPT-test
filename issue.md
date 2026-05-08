# [TASK] Product Management Mini App - Fullstack Intern Assessment

## 📌 Deskripsi & Objektif
Membangun aplikasi CRUD manajemen produk sederhana untuk toko online berskala kecil. Waktu pengerjaan maksimal 2 hari. 

Fokus utama adalah pada **clean code**, struktur yang rapi, penanganan *error* yang tepat, dan UI yang fungsional. Kompleksitas tidak diperlukan; eksekusi yang elegan dan profesional adalah targetnya.

---

## 🏗️ Strategi & Tumpukan Teknologi (Tech Stack)

* **Backend:** Python dengan **FastAPI**. Selaras dengan *requirement* dan memungkinkan struktur kode yang sangat rapi serta dokumentasi API otomatis (Swagger UI).
* **Database:** **PostgreSQL**. Jangan gunakan *in-memory storage*. Jalankan menggunakan `docker-compose.yml` untuk menunjukkan kemampuan standardisasi lingkungan kerja (*containerization*).
* **Frontend:** **React + TypeScript + Tailwind CSS**. TypeScript akan mendemonstrasikan prinsip *clean code* via *type safety* yang jelas. Tailwind memastikan *styling* yang bersih dan efisien.

---

## 🎯 Fokus Kritis Penilaian (Wajib Dipertahankan!)

1.  **Struktur Project:** * *Backend:* Pisahkan `routers`, `schemas` (Pydantic *models*), dan `database` (operasi CRUD). Jangan tumpuk logika di satu file.
    * *Frontend:* Komponen wajib modular. Pisahkan *reusable UI components* (*form input*, tombol) dari komponen logika *page*.
2.  **Error Handling:** * *Backend:* Wajib mengembalikan HTTP Status Codes yang tepat (200, 201, 400, 404, 422, 500). Tangani *error* 404 (Not Found) dengan pesan yang jelas.
    * *Frontend:* Wajib ada penanganan *state* saat memuat data (`loading`) dan saat *error*, dengan umpan balik visual yang jelas bagi pengguna.
3.  **Unit Tests:** Wajib ada pengujian menggunakan `pytest` untuk memvalidasi *endpoint* REST API. Ini adalah poin pembeda utama.
4.  **Dokumentasi (README):** Instruksi *setup* harus sangat lugas, menyertakan perintah spesifik untuk menjalankan API, Frontend, dan Container.

---

## 🛠️ Tahap 1: Setup & Infrastruktur (Estimasi: 1-2 Jam)
- [ ] Inisialisasi Git repository (pastikan `.gitignore` terkonfigurasi untuk Python dan Node).
- [ ] Buat `docker-compose.yml` untuk PostgreSQL.
- [ ] Buat kerangka direktori proyek (`/backend` dan `/frontend`).
- [ ] Setup `environment variables` (`.env.example`).

## ⚙️ Tahap 2: Backend Development - FastAPI (Estimasi: 4-6 Jam)
- [ ] Setup inisialisasi FastAPI dan koneksi ke PostgreSQL.
- [ ] Definisikan Pydantic `schemas` dan SQLAlchemy/ORM `models` untuk tabel `Product`:
  - `id`, `name`, `description`, `price`, `stock`, `category`, `isActive`, `createdAt`, `updatedAt`.
- [ ] Implementasikan validasi *input* di tingkat schema (misal: `price` dan `stock` tidak boleh negatif).
- [ ] Bangun REST API Endpoints di dalam `routers`:
  - [ ] `GET /products`
  - [ ] `GET /products/:id` (Wajib *handle* 404)
  - [ ] `POST /products` (Wajib *handle* 422/Validasi)
  - [ ] `PUT /products/:id` (Wajib *handle* 404)
  - [ ] `DELETE /products/:id` (Wajib *handle* 404)
- [ ] Tulis Unit Tests (`pytest`) untuk memvalidasi alur sukses dan alur kegagalan API.

## 🖥️ Tahap 3: Frontend Development - React + TS (Estimasi: 4-6 Jam)
- [ ] Inisialisasi React App dengan Vite + TypeScript.
- [ ] Instalasi dan konfigurasi Tailwind CSS.
- [ ] Setup layanan pemanggilan API (Axios/Fetch) yang terhubung ke backend.
- [ ] Bangun UI Components secara modular:
  - [ ] *Reusable Components*: Button, Input Field, Card/Table Row.
  - [ ] *Page/Feature Components*: Tabel/Daftar Produk, *Form* Tambah, *Form* Edit, Modal Konfirmasi Hapus.
- [ ] Terapkan State Management (*Loading* & *Error*):
  - [ ] Indikator `Loading` saat *fetch*/*submit* data.
  - [ ] Notifikasi/Pesan `Error` visual jika API gagal/validasi ditolak.
- [ ] *Review* UI: pastikan *spacing* konsisten, responsif, dan *form* mudah digunakan sesuai referensi.

## 📦 Tahap 4: Dokumentasi & Submission (Estimasi: 1-2 Jam)
- [ ] Tulis `README.md` yang mencakup:
  - [ ] Instruksi *setup* keseluruhan.
  - [ ] Perintah spesifik: `docker-compose up -d`.
  - [ ] Perintah spesifik menjalankan *backend* (dan migrasi DB).
  - [ ] Perintah spesifik menjalankan *frontend*.
  - [ ] Penjelasan `.env`.
  - [ ] Tautan lokal ke dokumentasi API (Swagger UI FastAPI di `/docs`).
- [ ] Tulis sub-bagian "Tradeoffs" di README.
- [ ] Rekam video demo singkat (1-2 menit) menunjukkan fungsionalitas CRUD, lalu lampirkan tautannya.
- [ ] *Self Code-Review*: bersihkan *console.log*, komentar mati, dan rapikan struktur folder.
- [ ] *Push* terakhir dan kumpulkan URL GitHub.