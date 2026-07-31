-- Buat tabel di Supabase SQL Editor (SQL > New Query)
-- Jalankan script ini sekali untuk membuat semua tabel yang diperlukan

-- 1. Tabel Informasi Dusun
CREATE TABLE IF NOT EXISTS dusun_info (
  id TEXT PRIMARY KEY DEFAULT 'main',
  nama_dusun TEXT,
  desa TEXT,
  kecamatan TEXT,
  kabupaten TEXT,
  provinsi TEXT,
  kode_pos TEXT,
  kepala_dusun TEXT,
  telepon_dusun TEXT,
  email_dusun TEXT,
  alamat_kantor TEXT,
  luas_wilayah TEXT,
  jumlah_penduduk INTEGER DEFAULT 0,
  jumlah_kk INTEGER DEFAULT 0,
  slogan TEXT,
  foto_wilayah TEXT,
  sejarah JSONB DEFAULT '{"tahunBerdiri":"","pendiri":"","cerita":"","milestone":[]}',
  visi TEXT DEFAULT '',
  misi JSONB DEFAULT '[]',
  sambutan_judul TEXT DEFAULT '',
  sambutan_isi TEXT DEFAULT '',
  sambutan_jabatan TEXT DEFAULT '',
  sambutan_foto TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabel Pejabat Dusun
CREATE TABLE IF NOT EXISTS pejabat (
  id TEXT PRIMARY KEY,
  nama TEXT NOT NULL,
  jabatan TEXT NOT NULL,
  foto TEXT DEFAULT '',
  kontak TEXT DEFAULT '',
  tugas_utama TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Tabel Berita
CREATE TABLE IF NOT EXISTS berita (
  id TEXT PRIMARY KEY,
  judul TEXT NOT NULL,
  kategori TEXT DEFAULT 'Berita',
  tanggal TEXT,
  penulis TEXT DEFAULT '',
  ringkasan TEXT DEFAULT '',
  konten TEXT DEFAULT '',
  gambar TEXT DEFAULT '',
  dibaca INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Tabel UMKM
CREATE TABLE IF NOT EXISTS umkm (
  id TEXT PRIMARY KEY,
  nama_usaha TEXT NOT NULL,
  pemilik TEXT NOT NULL,
  kategori TEXT DEFAULT '',
  deskripsi TEXT DEFAULT '',
  alamat TEXT DEFAULT '',
  whatsapp TEXT DEFAULT '',
  map_url TEXT DEFAULT '',
  status TEXT DEFAULT 'menunggu',
  tanggal_daftar TEXT,
  gambar TEXT DEFAULT '',
  produk JSONB DEFAULT '[]',
  rating REAL DEFAULT 5.0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Tabel Wisata
CREATE TABLE IF NOT EXISTS wisata (
  id TEXT PRIMARY KEY,
  nama TEXT NOT NULL,
  kategori TEXT DEFAULT '',
  deskripsi TEXT DEFAULT '',
  gambar TEXT DEFAULT '',
  foto_lain JSONB DEFAULT '[]',
  google_maps_pin TEXT DEFAULT '',
  jam_operasional TEXT DEFAULT '',
  harga_tiket TEXT DEFAULT '',
  fasilitas JSONB DEFAULT '[]',
  kontak_pengelola TEXT DEFAULT '',
  rating REAL DEFAULT 5.0,
  favorit BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Tabel Event Wisata
CREATE TABLE IF NOT EXISTS wisata_events (
  id TEXT PRIMARY KEY,
  judul TEXT NOT NULL,
  tanggal TEXT,
  lokasi TEXT DEFAULT '',
  deskripsi TEXT DEFAULT '',
  kategori TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Tabel Potensi SDA
CREATE TABLE IF NOT EXISTS potensi_sda (
  id TEXT PRIMARY KEY,
  kategori TEXT DEFAULT '',
  nama TEXT NOT NULL,
  deskripsi TEXT DEFAULT '',
  luas_atau_jumlah TEXT DEFAULT '',
  estimasi_hasil TEXT DEFAULT '',
  gambar TEXT DEFAULT '',
  lokasi TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Tabel Statistik Produksi
CREATE TABLE IF NOT EXISTS statistik_produksi (
  id SERIAL PRIMARY KEY,
  tahun TEXT,
  pertanian_tonton REAL DEFAULT 0,
  perkebunan_tonton REAL DEFAULT 0,
  perikanan_tonton REAL DEFAULT 0,
  peternakan_ekor REAL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────
-- MIGRASI TABEL LAMA
-- Jalankan jika tabel sudah pernah dibuat sebelumnya
-- (CREATE TABLE IF NOT EXISTS TIDAK menambah kolom baru)
-- ─────────────────────────────────────────────
ALTER TABLE wisata ADD COLUMN IF NOT EXISTS foto_lain JSONB DEFAULT '[]';
ALTER TABLE wisata ADD COLUMN IF NOT EXISTS google_maps_pin TEXT DEFAULT '';
ALTER TABLE wisata ADD COLUMN IF NOT EXISTS jam_operasional TEXT DEFAULT '';
ALTER TABLE wisata ADD COLUMN IF NOT EXISTS harga_tiket TEXT DEFAULT '';
ALTER TABLE wisata ADD COLUMN IF NOT EXISTS fasilitas JSONB DEFAULT '[]';
ALTER TABLE wisata ADD COLUMN IF NOT EXISTS kontak_pengelola TEXT DEFAULT '';
ALTER TABLE wisata ADD COLUMN IF NOT EXISTS rating REAL DEFAULT 5.0;
ALTER TABLE wisata ADD COLUMN IF NOT EXISTS favorit BOOLEAN DEFAULT FALSE;
ALTER TABLE wisata ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE wisata ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

ALTER TABLE wisata_events ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE wisata_events ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

ALTER TABLE budaya ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'aktif';

-- Buat index untuk performa query
CREATE INDEX IF NOT EXISTS idx_berita_created ON berita(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_umkm_created ON umkm(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_wisata_events_created ON wisata_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_statistik_tahun ON statistik_produksi(tahun DESC);

-- NONAKTIFKAN RLS (untuk development)
-- Agar anon key bisa membaca/menulis data tanpa policy
ALTER TABLE dusun_info DISABLE ROW LEVEL SECURITY;
ALTER TABLE pejabat DISABLE ROW LEVEL SECURITY;
ALTER TABLE berita DISABLE ROW LEVEL SECURITY;
ALTER TABLE umkm DISABLE ROW LEVEL SECURITY;
ALTER TABLE wisata DISABLE ROW LEVEL SECURITY;
ALTER TABLE wisata_events DISABLE ROW LEVEL SECURITY;
ALTER TABLE potensi_sda DISABLE ROW LEVEL SECURITY;
ALTER TABLE statistik_produksi DISABLE ROW LEVEL SECURITY;
