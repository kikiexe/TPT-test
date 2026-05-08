# Product Management Mini App

A fullstack product management application built with **FastAPI** (Backend) and **React + TypeScript + Tailwind CSS** (Frontend).

## Fitur Utama
- **CRUD Produk**: Tambah, Lihat, Edit, dan Hapus produk.
- **Validasi Data**: Validasi input (harga/stok tidak boleh negatif) di tingkat schema (Backend & Frontend).
- **Clean UI**: Antarmuka modern menggunakan Tailwind CSS dengan state *Loading* dan *Error*.
- **Database**: Persistensi data menggunakan PostgreSQL.
- **API Documentation**: Dokumentasi interaktif otomatis via Swagger UI.

---

## Tech Stack
- **Backend**: Python 3.14+, FastAPI, SQLAlchemy, Pydantic, PostgreSQL.
- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS 4, Axios, Lucide React.
- **Infrastructure**: Docker & Docker Compose.

---

## Setup & Instalasi

### 1. Prasyarat
- Docker & Docker Compose installed.
- Python 3.14+ (untuk menjalankan backend secara lokal).
- Node.js & npm (untuk menjalankan frontend secara lokal).

### 2. Jalankan Database (Docker)
```bash
docker-compose up -d
```

### 3. Setup Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Linux/macOS
# venv\Scripts\activate   # Windows
pip install -r requirements.txt
uvicorn main:app --reload
```
API akan tersedia di: [http://localhost:8000](http://localhost:8000)  
Swagger UI: [http://localhost:8000/docs](http://localhost:8000/docs)

### 4. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```
Aplikasi akan tersedia di: [http://localhost:5173](http://localhost:5173)

---

## Pengujian (Unit Tests)
Jalankan pengujian backend menggunakan `pytest`:
```bash
cd backend
source venv/bin/activate
pytest
```

---

## Tradeoffs & Decisions
1. **SQLite untuk Testing**: Menggunakan SQLite *in-memory* untuk unit tests agar eksekusi cepat dan tidak bergantung pada database eksternal saat CI/CD atau testing lokal.
2. **Psycopg 3**: Menggunakan `psycopg[binary]` (v3) karena lebih kompatibel dengan versi Python terbaru (3.14) dibandingkan `psycopg2` yang sering mengalami masalah kompilasi pada environment tanpa headers development.
3. **Pydantic V2**: Memanfaatkan Pydantic v2 untuk validasi data yang lebih cepat dan sintaks yang lebih bersih.
4. **Tailwind CSS 4**: Menggunakan versi terbaru untuk performa build yang lebih baik dan konfigurasi yang lebih sederhana (zero-config).
5. **CORS**: Menggunakan `CORSMiddleware` dengan `allow_origins=["*"]` untuk mempermudah pengembangan lokal.

---

## Submission
Dikerjakan sebagai bagian dari **Fullstack Intern Assessment**.
Fokus pada: *Clean Code*, *Modular Components*, dan *Error Handling*.
