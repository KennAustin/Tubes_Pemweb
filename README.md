# Aplikasi Review Lagu

## Deskripsi Aplikasi Web
Aplikasi Review Lagu adalah platform web yang memungkinkan pengguna untuk mencari lagu dan memberikan ulasan secara langsung. Aplikasi ini dibangun menggunakan Pyramid (Python) sebagai backend dan React + Vite sebagai frontend, serta menggunakan PostgreSQL untuk penyimpanan data.

## Dependensi Backend
Berikut adalah library yang digunakan pada sisi backend (Python):
- pyramid
- pyramid_jinja2
- sqlalchemy
- psycopg2-binary
- zope.sqlalchemy
- passlib
- waitress

### Cara instalasi backend:
```bash
pip install -e .
```

## Dependensi Frontend
Frontend dibangun menggunakan React dan dikelola menggunakan Vite. Berikut dependensi utamanya:

- `react`
- `react-dom`
- `react-router-dom`
- `bootstrap`
- `react-bootstrap`
- `axios`
- `@popperjs/core`
- `prop-types`

### DevDependencies (untuk development):
- `vite`
- `eslint` dan plugin-plugin terkait
- `@types/react`
- `@types/react-dom`

### Cara instalasi Frontend:
```bash
npm install
npm run dev
```

## Fitur Aplikasi
- Registrasi dan login pengguna (menggunakan Basic Auth di backend)
- Menambahkan dan menghapus ulasan lagu
- Menampilkan daftar lagu dan ulasan pengguna 
- Komunikasi API antara frontend dan backend menggunakan Axios
- Tampilan antarmuka responsif menggunakan React Bootstrap
- Routing frontend antar halaman menggunakan React Router

## Referensi
- Pyramid Documentation
- React Documentation
- SQLAlchemy
- PostgreSQL
- Vite
- Bootstrap
