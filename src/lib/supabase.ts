import { createClient, SupabaseClient } from '@supabase/supabase-js';
import {
  DusunInfo,
  BeritaItem,
  UmkmItem,
  UmkmProduct,
  WisataItem,
  WisataEvent,
  PejabatDusun,
  PotensiSDA,
  StatistikProduksi,
  BudayaItem
} from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

console.log('[Supabase Debug] VITE_SUPABASE_URL:', JSON.stringify(supabaseUrl));
console.log('[Supabase Debug] VITE_SUPABASE_ANON_KEY length:', supabaseAnonKey.length);
console.log('[Supabase Debug] Check YOUR_SUPABASE_URL:', supabaseUrl === 'YOUR_SUPABASE_URL');
console.log('[Supabase Debug] isSupabaseConfigured:', Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'YOUR_SUPABASE_URL' &&
  supabaseAnonKey !== 'YOUR_SUPABASE_ANON_KEY'
));

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'YOUR_SUPABASE_URL' &&
  supabaseAnonKey !== 'YOUR_SUPABASE_ANON_KEY'
);

let supabaseClient: SupabaseClient | null = null;

if (isSupabaseConfigured) {
  try {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  } catch (err) {
    console.warn('Gagal menginisialisasi Supabase client:', err);
  }
}

export const supabase = supabaseClient;

// ──────────────────────────────────────────────────
// INTERFACES
// ──────────────────────────────────────────────────

export interface AllDusunData {
  dusunInfo: DusunInfo | null;
  pejabatList: PejabatDusun[];
  beritaList: BeritaItem[];
  umkmList: UmkmItem[];
  wisataList: WisataItem[];
  wisataEvents: WisataEvent[];
  budayaList: BudayaItem[];
  potensiSDA: PotensiSDA[];
  statistikProduksi: StatistikProduksi[];
}

// ──────────────────────────────────────────────────
// MAPPING HELPERS (snake_case DB → camelCase JS)
// ──────────────────────────────────────────────────

function mapDusunInfo(data: any): DusunInfo {
  return {
    namaDusun: data.nama_dusun,
    desa: data.desa,
    kecamatan: data.kecamatan,
    kabupaten: data.kabupaten,
    provinsi: data.provinsi,
    kodePos: data.kode_pos || '',
    kepalaDusun: data.kepala_dusun || '',
    teleponDusun: data.telepon_dusun || '',
    emailDusun: data.email_dusun || '',
    alamatKantor: data.alamat_kantor || '',
    luasWilayah: data.luas_wilayah || '',
    jumlahPenduduk: data.jumlah_penduduk || 0,
    jumlahKK: data.jumlah_kk || 0,
    slogan: data.slogan || '',
    fotoWilayah: data.foto_wilayah || '',
    sejarah: data.sejarah || { tahunBerdiri: '', pendiri: '', cerita: '', milestone: [] },
    visi: data.visi || '',
    misi: Array.isArray(data.misi) ? data.misi : [],
    sambutanJudul: data.sambutan_judul || '',
    sambutanIsi: data.sambutan_isi || '',
    sambutanJabatan: data.sambutan_jabatan || '',
    sambutanFoto: data.sambutan_foto || ''
  };
}

function mapPejabat(data: any): PejabatDusun {
  return {
    id: data.id,
    nama: data.nama,
    jabatan: data.jabatan,
    foto: data.foto || '',
    kontak: data.kontak || '',
    tugasUtama: data.tugas_utama || ''
  };
}

function mapBerita(data: any): BeritaItem {
  return {
    id: data.id,
    judul: data.judul,
    kategori: data.kategori || 'Berita',
    tanggal: data.tanggal || '',
    penulis: data.penulis || '',
    ringkasan: data.ringkasan || '',
    konten: data.konten || '',
    gambar: data.gambar || '',
    dibaca: data.dibaca || 0
  };
}

function mapUmkm(data: any): UmkmItem {
  return {
    id: data.id,
    namaUsaha: data.nama_usaha,
    pemilik: data.pemilik,
    kategori: data.kategori || 'Makanan dan Minuman',
    deskripsi: data.deskripsi || '',
    alamat: data.alamat || '',
    whatsapp: data.whatsapp || '',
    mapUrl: data.map_url || '',
    status: data.status || 'menunggu',
    tanggalDaftar: data.tanggal_daftar || '',
    gambar: data.gambar || '',
    rating: data.rating || 5.0,
    produk: Array.isArray(data.produk) ? data.produk.map((p: any) => ({
      id: p.id || '',
      nama: p.nama || '',
      harga: p.harga || 0,
      deskripsi: p.deskripsi || '',
      gambar: p.gambar || ''
    })) : []
  };
}

function mapWisata(data: any): WisataItem {
  return {
    id: data.id,
    nama: data.nama,
    kategori: data.kategori || 'Wisata Alam',
    deskripsi: data.deskripsi || '',
    gambar: data.gambar || '',
    fotoLain: Array.isArray(data.foto_lain) ? data.foto_lain : [],
    googleMapsPin: data.google_maps_pin || '',
    jamOperasional: data.jam_operasional || '',
    hargaTiket: data.harga_tiket || '',
    fasilitas: Array.isArray(data.fasilitas) ? data.fasilitas : [],
    kontakPengelola: data.kontak_pengelola || '',
    rating: data.rating || 5.0,
    favorit: data.favorit || false
  };
}

function mapWisataEvent(data: any): WisataEvent {
  return {
    id: data.id,
    judul: data.judul,
    tanggal: data.tanggal || '',
    lokasi: data.lokasi || '',
    deskripsi: data.deskripsi || '',
    kategori: data.kategori || ''
  };
}

function mapPotensiSDA(data: any): PotensiSDA {
  return {
    id: data.id,
    kategori: data.kategori || 'Pertanian',
    nama: data.nama,
    deskripsi: data.deskripsi || '',
    luasAtauJumlah: data.luas_atau_jumlah || '',
    estimasiHasil: data.estimasi_hasil || '',
    gambar: data.gambar || '',
    lokasi: data.lokasi || ''
  };
}

function mapBudaya(data: any): BudayaItem {
  return {
    id: data.id,
    nama: data.nama,
    kategori: data.kategori || 'Kesenian',
    deskripsi: data.deskripsi || '',
    gambar: data.gambar || '',
    lokasi: data.lokasi || '',
    status: data.status || 'aktif'
  };
}

function mapStatistikProduksi(data: any): StatistikProduksi {
  return {
    tahun: data.tahun || '',
    pertanianTonton: data.pertanian_tonton || 0,
    perkebunanTonton: data.perkebunan_tonton || 0,
    perikananTonton: data.perikanan_tonton || 0,
    peternakanEkor: data.peternakan_ekor || 0
  };
}

// ──────────────────────────────────────────────────
// BULK SYNC — ambil semua data dari Supabase
// ──────────────────────────────────────────────────

export async function syncAllFromSupabase(): Promise<AllDusunData | null> {
  if (!supabase) return null;

  try {
    const [
      { data: dusunInfoRes },
      { data: pejabatRes },
      { data: beritaRes },
      { data: umkmRes },
      { data: wisataRes },
      { data: wisataEventsRes },
      { data: budayaRes },
      { data: potensiSDARes },
      { data: statistikRes }
    ] = await Promise.all([
      supabase.from('dusun_info').select('*').eq('id', 'main').maybeSingle(),
      supabase.from('pejabat').select('*'),
      supabase.from('berita').select('*').order('created_at', { ascending: false }),
      supabase.from('umkm').select('*').order('created_at', { ascending: false }),
      supabase.from('wisata').select('*'),
      supabase.from('wisata_events').select('*').order('created_at', { ascending: false }),
      supabase.from('budaya').select('*'),
      supabase.from('potensi_sda').select('*'),
      supabase.from('statistik_produksi').select('*').order('tahun', { ascending: false })
    ]);

    const hasData = dusunInfoRes || (pejabatRes && pejabatRes.length > 0);
    if (!hasData) return null;

    return {
      dusunInfo: dusunInfoRes ? mapDusunInfo(dusunInfoRes) : null,
      pejabatList: (pejabatRes || []).map(mapPejabat),
      beritaList: (beritaRes || []).map(mapBerita),
      umkmList: (umkmRes || []).map(mapUmkm),
      wisataList: (wisataRes || []).map(mapWisata),
      wisataEvents: (wisataEventsRes || []).map(mapWisataEvent),
      budayaList: (budayaRes || []).map(mapBudaya),
      potensiSDA: (potensiSDARes || []).map(mapPotensiSDA),
      statistikProduksi: (statistikRes || []).map(mapStatistikProduksi)
    };
  } catch (err) {
    console.error('Error syncing from Supabase:', err);
    return null;
  }
}

// ──────────────────────────────────────────────────
// DUSUN INFO
// ──────────────────────────────────────────────────

export async function syncDusunInfoFromSupabase(): Promise<DusunInfo | null> {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase.from('dusun_info').select('*').eq('id', 'main').single();
    if (error || !data) return null;
    return mapDusunInfo(data);
  } catch (err) {
    console.error('Error sync dusun_info:', err);
    return null;
  }
}

export async function saveDusunInfoToSupabase(info: DusunInfo) {
  if (!supabase) return;
  try {
    await supabase.from('dusun_info').upsert({
      id: 'main',
      nama_dusun: info.namaDusun,
      desa: info.desa,
      kecamatan: info.kecamatan,
      kabupaten: info.kabupaten,
      provinsi: info.provinsi,
      kode_pos: info.kodePos,
      kepala_dusun: info.kepalaDusun,
      telepon_dusun: info.teleponDusun,
      email_dusun: info.emailDusun,
      alamat_kantor: info.alamatKantor,
      luas_wilayah: info.luasWilayah,
      jumlah_penduduk: info.jumlahPenduduk,
      jumlah_kk: info.jumlahKK,
      slogan: info.slogan,
      foto_wilayah: info.fotoWilayah,
      sejarah: info.sejarah,
      visi: info.visi,
      misi: info.misi,
      sambutan_judul: info.sambutanJudul,
      sambutan_isi: info.sambutanIsi,
      sambutan_jabatan: info.sambutanJabatan,
      sambutan_foto: info.sambutanFoto
    });
  } catch (err) {
    console.error('Error save dusun_info:', err);
  }
}

// ──────────────────────────────────────────────────
// PEJABAT
// ──────────────────────────────────────────────────

export async function createPejabat(data: PejabatDusun) {
  if (!supabase) return;
  await supabase.from('pejabat').insert({
    id: data.id,
    nama: data.nama,
    jabatan: data.jabatan,
    foto: data.foto || '',
    kontak: data.kontak || '',
    tugas_utama: data.tugasUtama || ''
  });
}

export async function updatePejabat(id: string, data: Partial<PejabatDusun>) {
  if (!supabase) return;
  const payload: Record<string, unknown> = {};
  if (data.nama !== undefined) payload.nama = data.nama;
  if (data.jabatan !== undefined) payload.jabatan = data.jabatan;
  if (data.foto !== undefined) payload.foto = data.foto;
  if (data.kontak !== undefined) payload.kontak = data.kontak;
  if (data.tugasUtama !== undefined) payload.tugas_utama = data.tugasUtama;
  await supabase.from('pejabat').update(payload).eq('id', id);
}

export async function deletePejabat(id: string) {
  if (!supabase) return;
  await supabase.from('pejabat').delete().eq('id', id);
}

// ──────────────────────────────────────────────────
// BERITA
// ──────────────────────────────────────────────────

export async function createBerita(data: BeritaItem) {
  if (!supabase) return;
  await supabase.from('berita').insert({
    id: data.id,
    judul: data.judul,
    kategori: data.kategori,
    tanggal: data.tanggal,
    penulis: data.penulis,
    ringkasan: data.ringkasan,
    konten: data.konten,
    gambar: data.gambar,
    dibaca: data.dibaca
  });
}

export async function updateBerita(id: string, data: Partial<BeritaItem>) {
  if (!supabase) return;
  const payload: Record<string, unknown> = {};
  if (data.judul !== undefined) payload.judul = data.judul;
  if (data.kategori !== undefined) payload.kategori = data.kategori;
  if (data.tanggal !== undefined) payload.tanggal = data.tanggal;
  if (data.penulis !== undefined) payload.penulis = data.penulis;
  if (data.ringkasan !== undefined) payload.ringkasan = data.ringkasan;
  if (data.konten !== undefined) payload.konten = data.konten;
  if (data.gambar !== undefined) payload.gambar = data.gambar;
  if (data.dibaca !== undefined) payload.dibaca = data.dibaca;
  await supabase.from('berita').update(payload).eq('id', id);
}

export async function deleteBerita(id: string) {
  if (!supabase) return;
  await supabase.from('berita').delete().eq('id', id);
}

// ──────────────────────────────────────────────────
// UMKM
// ──────────────────────────────────────────────────

export async function createUmkm(data: UmkmItem) {
  if (!supabase) return;
  await supabase.from('umkm').insert({
    id: data.id,
    nama_usaha: data.namaUsaha,
    pemilik: data.pemilik,
    kategori: data.kategori,
    deskripsi: data.deskripsi,
    alamat: data.alamat,
    whatsapp: data.whatsapp,
    map_url: data.mapUrl || '',
    status: data.status,
    tanggal_daftar: data.tanggalDaftar,
    gambar: data.gambar,
    produk: data.produk,
    rating: data.rating
  });
}

export async function updateUmkm(id: string, data: Partial<UmkmItem>) {
  if (!supabase) return;
  const payload: Record<string, unknown> = {};
  if (data.namaUsaha !== undefined) payload.nama_usaha = data.namaUsaha;
  if (data.pemilik !== undefined) payload.pemilik = data.pemilik;
  if (data.kategori !== undefined) payload.kategori = data.kategori;
  if (data.deskripsi !== undefined) payload.deskripsi = data.deskripsi;
  if (data.alamat !== undefined) payload.alamat = data.alamat;
  if (data.whatsapp !== undefined) payload.whatsapp = data.whatsapp;
  if (data.mapUrl !== undefined) payload.map_url = data.mapUrl;
  if (data.status !== undefined) payload.status = data.status;
  if (data.tanggalDaftar !== undefined) payload.tanggal_daftar = data.tanggalDaftar;
  if (data.gambar !== undefined) payload.gambar = data.gambar;
  if (data.produk !== undefined) payload.produk = data.produk;
  if (data.rating !== undefined) payload.rating = data.rating;
  await supabase.from('umkm').update(payload).eq('id', id);
}

export async function deleteUmkm(id: string) {
  if (!supabase) return;
  await supabase.from('umkm').delete().eq('id', id);
}

// ──────────────────────────────────────────────────
// WISATA
// ──────────────────────────────────────────────────

export async function createWisata(data: WisataItem) {
  if (!supabase) return;
  await supabase.from('wisata').insert({
    id: data.id,
    nama: data.nama,
    kategori: data.kategori,
    deskripsi: data.deskripsi,
    gambar: data.gambar,
    foto_lain: data.fotoLain || [],
    google_maps_pin: data.googleMapsPin,
    jam_operasional: data.jamOperasional,
    harga_tiket: data.hargaTiket,
    fasilitas: data.fasilitas,
    kontak_pengelola: data.kontakPengelola,
    rating: data.rating,
    favorit: data.favorit || false
  });
}

export async function updateWisata(id: string, data: Partial<WisataItem>) {
  if (!supabase) return;
  const payload: Record<string, unknown> = {};
  if (data.nama !== undefined) payload.nama = data.nama;
  if (data.kategori !== undefined) payload.kategori = data.kategori;
  if (data.deskripsi !== undefined) payload.deskripsi = data.deskripsi;
  if (data.gambar !== undefined) payload.gambar = data.gambar;
  if (data.fotoLain !== undefined) payload.foto_lain = data.fotoLain;
  if (data.googleMapsPin !== undefined) payload.google_maps_pin = data.googleMapsPin;
  if (data.jamOperasional !== undefined) payload.jam_operasional = data.jamOperasional;
  if (data.hargaTiket !== undefined) payload.harga_tiket = data.hargaTiket;
  if (data.fasilitas !== undefined) payload.fasilitas = data.fasilitas;
  if (data.kontakPengelola !== undefined) payload.kontak_pengelola = data.kontakPengelola;
  if (data.rating !== undefined) payload.rating = data.rating;
  if (data.favorit !== undefined) payload.favorit = data.favorit;
  await supabase.from('wisata').update(payload).eq('id', id);
}

export async function deleteWisata(id: string) {
  if (!supabase) return;
  await supabase.from('wisata').delete().eq('id', id);
}

// ──────────────────────────────────────────────────
// WISATA EVENTS
// ──────────────────────────────────────────────────

export async function createWisataEvent(data: WisataEvent) {
  if (!supabase) return;
  await supabase.from('wisata_events').insert({
    id: data.id,
    judul: data.judul,
    tanggal: data.tanggal,
    lokasi: data.lokasi,
    deskripsi: data.deskripsi,
    kategori: data.kategori
  });
}

// ──────────────────────────────────────────────────
// POTENSI SDA
// ──────────────────────────────────────────────────

export async function createPotensiSDA(data: PotensiSDA) {
  if (!supabase) return;
  await supabase.from('potensi_sda').insert({
    id: data.id,
    kategori: data.kategori,
    nama: data.nama,
    deskripsi: data.deskripsi,
    luas_atau_jumlah: data.luasAtauJumlah,
    estimasi_hasil: data.estimasiHasil,
    gambar: data.gambar,
    lokasi: data.lokasi
  });
}

export async function updatePotensiSDA(id: string, data: Partial<PotensiSDA>) {
  if (!supabase) return;
  const payload: Record<string, unknown> = {};
  if (data.kategori !== undefined) payload.kategori = data.kategori;
  if (data.nama !== undefined) payload.nama = data.nama;
  if (data.deskripsi !== undefined) payload.deskripsi = data.deskripsi;
  if (data.luasAtauJumlah !== undefined) payload.luas_atau_jumlah = data.luasAtauJumlah;
  if (data.estimasiHasil !== undefined) payload.estimasi_hasil = data.estimasiHasil;
  if (data.gambar !== undefined) payload.gambar = data.gambar;
  if (data.lokasi !== undefined) payload.lokasi = data.lokasi;
  await supabase.from('potensi_sda').update(payload).eq('id', id);
}

export async function deletePotensiSDA(id: string) {
  if (!supabase) return;
  await supabase.from('potensi_sda').delete().eq('id', id);
}

// ──────────────────────────────────────────────────
// STATISTIK PRODUKSI
// ──────────────────────────────────────────────────

export async function saveStatistikProduksi(list: StatistikProduksi[]) {
  if (!supabase) return;
  const rows = list.map(s => ({
    tahun: s.tahun,
    pertanian_tonton: s.pertanianTonton,
    perkebunan_tonton: s.perkebunanTonton,
    perikanan_tonton: s.perikananTonton,
    peternakan_ekor: s.peternakanEkor
  }));
  await supabase.from('statistik_produksi').upsert(rows, { onConflict: 'tahun' });
}

// ──────────────────────────────────────────────────
// BUDAYA
// ──────────────────────────────────────────────────

export async function createBudaya(data: BudayaItem) {
  if (!supabase) return;
  await supabase.from('budaya').insert({
    id: data.id,
    nama: data.nama,
    kategori: data.kategori,
    deskripsi: data.deskripsi,
    gambar: data.gambar,
    lokasi: data.lokasi,
    status: data.status
  });
}

export async function deleteBudaya(id: string) {
  if (!supabase) return;
  await supabase.from('budaya').delete().eq('id', id);
}
