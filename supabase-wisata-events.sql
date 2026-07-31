-- KALENDER KEGIATAN & FESTIVAL WISATA DUSUN
-- Jalankan di: Supabase Dashboard -> SQL Editor -> New query -> Run

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

CREATE INDEX IF NOT EXISTS idx_wisata_events_created ON wisata_events(created_at DESC);

-- Nonaktifkan RLS agar anon key bisa membaca/menulis (mode development)
ALTER TABLE wisata_events DISABLE ROW LEVEL SECURITY;

-- (Opsional) Jika tabel sudah pernah dibuat tapi kolom created_at belum ada:
ALTER TABLE wisata_events ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE wisata_events ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();
