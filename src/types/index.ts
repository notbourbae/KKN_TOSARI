export type PageTab = 'beranda' | 'informasi' | 'umkm' | 'wisata' | 'sda' | 'admin';

export type InfoSubTab = 'profil' | 'sejarah' | 'visi-misi' | 'struktur' | 'berita';

export type UmkmCategory = 'Makanan dan Minuman' | 'Kerajinan' | 'Pertanian' | 'Peternakan' | 'Jasa';

export interface UmkmProduct {
  id: string;
  nama: string;
  harga: number;
  deskripsi: string;
  gambar: string;
}

export interface UmkmItem {
  id: string;
  namaUsaha: string;
  pemilik: string;
  kategori: UmkmCategory;
  deskripsi: string;
  alamat: string;
  whatsapp: string;
  mapUrl?: string;
  status: 'disetujui' | 'menunggu' | 'ditolak';
  tanggalDaftar: string;
  gambar: string;
  produk: UmkmProduct[];
  rating: number;
}

export type WisataCategory = 'Wisata Alam' | 'Wisata Edukasi' | 'Wisata Kuliner';

export interface WisataItem {
  id: string;
  nama: string;
  kategori: WisataCategory;
  deskripsi: string;
  gambar: string;
  fotoLain?: string[];
  googleMapsPin: string;
  jamOperasional: string;
  hargaTiket: string;
  fasilitas: string[];
  kontakPengelola: string;
  rating: number;
  favorit?: boolean;
}

export interface WisataEvent {
  id: string;
  judul: string;
  tanggal: string;
  lokasi: string;
  deskripsi: string;
  kategori: string;
}

export interface BeritaItem {
  id: string;
  judul: string;
  kategori: 'Berita' | 'Pengumuman' | 'Agenda';
  tanggal: string;
  penulis: string;
  ringkasan: string;
  konten: string;
  gambar: string;
  dibaca: number;
}

export interface PejabatDusun {
  id: string;
  nama: string;
  jabatan: string;
  foto: string;
  kontak: string;
  tugasUtama: string;
}

export interface PotensiSDA {
  id: string;
  kategori: 'Pertanian' | 'Perkebunan' | 'Peternakan' | 'Perikanan';
  nama: string;
  deskripsi: string;
  luasAtauJumlah: string;
  estimasiHasil: string;
  gambar: string;
  lokasi: string;
}

export interface StatistikProduksi {
  tahun: string;
  pertanianTonton: number;
  perkebunanTonton: number;
  perikananTonton: number;
  peternakanEkor: number;
}

export interface DusunInfo {
  namaDusun: string;
  desa: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  kodePos: string;
  kepalaDusun: string;
  teleponDusun: string;
  emailDusun: string;
  alamatKantor: string;
  luasWilayah: string;
  jumlahPenduduk: number;
  jumlahKK: number;
  slogan: string;
  fotoWilayah?: string;
  sejarah: {
    tahunBerdiri: string;
    pendiri: string;
    cerita: string;
    milestone: { tahun: string; peristiwa: string }[];
  };
  visi: string;
  misi: string[];
  sambutanJudul: string;
  sambutanIsi: string;
  sambutanJabatan: string;
  sambutanFoto: string;
}
