import React from 'react';
import { useDusun } from '../../context/DusunContext';
import {
  Users,
  Map,
  Store,
  Compass,
  ArrowRight,
  Newspaper,
  Phone,
  Trees,
  Quote,
  Building2,
  Calendar,
  Landmark
} from 'lucide-react';

export const Home: React.FC = () => {
  const {
    dusunInfo,
    beritaList,
    umkmList,
    wisataList,
    budayaList,
    setActiveTab,
    setActiveInfoSubTab,
    setSelectedUmkmModal,
    setSelectedWisataModal,
    setSelectedBeritaModal,
    setShowUmkmRegisterModal
  } = useDusun();

  const approvedUmkm = umkmList.filter(u => u.status === 'disetujui');
  const featuredBerita = beritaList.slice(0, 3);
  const featuredUmkm = approvedUmkm.slice(0, 3);
  const featuredWisata = wisataList.slice(0, 3);

  return (
    <div id="page-home" className="space-y-16 animate-in fade-in duration-300">

      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden bg-slate-900 text-white shadow-2xl border border-emerald-900/30">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&auto=format&fit=crop&q=80"
            alt="Pemandangan Dusun Tosari"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-70 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/40 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-4xl px-6 sm:px-12 py-16 sm:py-24 space-y-6">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md">
            <Building2 className="w-4 h-4 text-emerald-400" />
            Selamat Datang di Website Resmi {dusunInfo.namaDusun}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-md">
            Portal Informasi, UMKM, Wisata & Potensi Alam Dusun
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
            {dusunInfo.slogan}. Mewujudkan transparansi pelayanan publik, pemberdayaan ekonomi masyarakat lokal, dan promosi potensi ekowisata secara digital.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={() => { setActiveTab('informasi'); setActiveInfoSubTab('profil'); }}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl text-xs sm:text-sm shadow-lg shadow-emerald-700/30 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              Jelajahi Profil Dusun
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('umkm')}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl text-xs sm:text-sm backdrop-blur-md border border-white/20 transition-all cursor-pointer"
            >
              <Store className="w-4 h-4 text-emerald-300" />
              Katalog UMKM Dusun
            </button>

            <button
              onClick={() => setActiveTab('budaya')}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-3 rounded-xl text-xs sm:text-sm backdrop-blur-md border border-white/20 transition-all cursor-pointer"
            >
              <Landmark className="w-4 h-4 text-amber-300" />
              Kebudayaan & Tradisi
            </button>

            <button
              onClick={() => setShowUmkmRegisterModal(true)}
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-3 rounded-xl text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            >
              Daftar UMKM Baru
            </button>
          </div>
        </div>
      </section>

      {/* Quick Statistics Banner */}
      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4 hover:border-emerald-300 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">{dusunInfo.jumlahPenduduk.toLocaleString('id-ID')}</p>
            <p className="text-xs text-slate-500 font-medium">Jiwa Penduduk ({dusunInfo.jumlahKK} KK)</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4 hover:border-emerald-300 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center text-teal-700 shrink-0">
            <Map className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">{dusunInfo.luasWilayah}</p>
            <p className="text-xs text-slate-500 font-medium">Luas Wilayah Dusun</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4 hover:border-emerald-300 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
            <Store className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">{approvedUmkm.length}</p>
            <p className="text-xs text-slate-500 font-medium">UMKM Lokal Aktif</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4 hover:border-emerald-300 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 shrink-0">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">{wisataList.length}</p>
            <p className="text-xs text-slate-500 font-medium">Destinasi Wisata</p>
          </div>
        </div>

        <div
          onClick={() => setActiveTab('budaya')}
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4 hover:border-amber-400 transition-colors cursor-pointer col-span-2 sm:col-span-1"
        >
          <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 shrink-0">
            <Landmark className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">{budayaList.length}</p>
            <p className="text-xs text-slate-500 font-medium">Warisan Kebudayaan</p>
          </div>
        </div>
      </section>

      {/* Sambutan Kepala Dusun */}
      <section className="bg-gradient-to-br from-emerald-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="flex flex-col items-center text-center space-y-3 md:border-r md:border-emerald-800/80 md:pr-8">
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-emerald-500 shadow-xl">
              <img
                src={dusunInfo.sambutanFoto}
                alt="Foto Kepala Dusun"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">{dusunInfo.kepalaDusun}</h3>
              <p className="text-xs text-emerald-300 font-medium">{dusunInfo.sambutanJabatan}</p>
            </div>
          </div>

          <div className="md:col-span-2 space-y-4">
            <Quote className="w-10 h-10 text-emerald-500 opacity-60" />
            <h2 className="text-xl sm:text-2xl font-bold text-emerald-100 leading-snug">
              "{dusunInfo.sambutanJudul}"
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {dusunInfo.sambutanIsi}
            </p>
            <div className="pt-2">
              <button
                onClick={() => { setActiveTab('informasi'); setActiveInfoSubTab('visi-misi'); }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 underline cursor-pointer"
              >
                Lihat Visi & Misi Pembangunan Dusun →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Berita & Pengumuman Terkini */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider">
              <Newspaper className="w-4 h-4" /> Informasi Publik
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-1">Berita & Pengumuman Terbaru</h2>
          </div>
          <button
            onClick={() => { setActiveTab('informasi'); setActiveInfoSubTab('berita'); }}
            className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-bold text-xs cursor-pointer"
          >
            Lihat Semua Berita <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredBerita.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedBeritaModal(item)}
              className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer flex flex-col"
            >
              <div className="relative h-44 bg-slate-100 overflow-hidden shrink-0">
                <img
                  src={item.gambar}
                  alt={item.judul}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-0.5 rounded-full ${item.kategori === 'Pengumuman' ? 'bg-amber-500 text-slate-950' :
                  item.kategori === 'Agenda' ? 'bg-blue-600 text-white' : 'bg-emerald-700 text-white'
                  }`}>
                  {item.kategori}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-emerald-600" /> {item.tanggal}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-emerald-700 transition-colors line-clamp-2">
                    {item.judul}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                    {item.ringkasan}
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-700 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform pt-2">
                  Baca Selengkapnya →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* UMKM Unggulan Section */}
      <section className="space-y-6 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200/80">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider">
              <Store className="w-4 h-4" /> Ekonomi Lokal
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-1">Produk UMKM Unggulan Dusun</h2>
          </div>
          <button
            onClick={() => setActiveTab('umkm')}
            className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-bold text-xs cursor-pointer"
          >
            Lihat Semua UMKM ({approvedUmkm.length}) <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredUmkm.map((u) => (
            <div
              key={u.id}
              onClick={() => setSelectedUmkmModal(u)}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col"
            >
              <div className="relative h-48 bg-slate-100 overflow-hidden shrink-0">
                <img
                  src={u.gambar}
                  alt={u.namaUsaha}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-emerald-700 text-white font-semibold text-[10px] px-2.5 py-0.5 rounded-full">
                  {u.kategori}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-bold text-slate-900 text-base">{u.namaUsaha}</h3>
                  <p className="text-xs text-slate-500 font-medium">Pemilik: {u.pemilik}</p>
                  <p className="text-xs text-slate-600 line-clamp-2">{u.deskripsi}</p>
                </div>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium">{u.produk.length} Produk Katalog</span>
                  <button className="bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-bold text-xs px-3 py-1.5 rounded-lg transition-colors">
                    Lihat Detail & Beli
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Wisata Pilihan Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2 text-teal-700 font-bold text-xs uppercase tracking-wider">
              <Compass className="w-4 h-4" /> Pesona Ekowisata
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-1">Destinasi Wisata Pilihan</h2>
          </div>
          <button
            onClick={() => setActiveTab('wisata')}
            className="inline-flex items-center gap-1 text-teal-700 hover:text-teal-800 font-bold text-xs cursor-pointer"
          >
            Lihat Semua Destinasi <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredWisata.map((w) => (
            <div
              key={w.id}
              onClick={() => setSelectedWisataModal(w)}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col"
            >
              <div className="relative h-48 bg-slate-900 overflow-hidden shrink-0">
                <img
                  src={w.gambar}
                  alt={w.nama}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-teal-700 text-white font-semibold text-[10px] px-2.5 py-0.5 rounded-full">
                  {w.kategori}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-bold text-slate-900 text-base group-hover:text-teal-700 transition-colors">
                    {w.nama}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2">{w.deskripsi}</p>
                </div>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-teal-800">{w.hargaTiket}</span>
                  <span className="text-slate-400 font-medium">Buka: {w.jamOperasional.split('(')[0]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Potensi Sumber Daya Alam Quick CTA */}
      <section className="bg-emerald-900 text-white p-8 sm:p-10 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 max-w-xl text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-emerald-800 text-emerald-200 px-3 py-1 rounded-full text-xs font-semibold">
            <Trees className="w-4 h-4" /> Kekayaan Alam Dusun Tosari
          </div>
          <h3 className="text-2xl font-bold">Potensi Pertanian, Perkebunan & Sumber Daya Alam</h3>
          <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
            Dusun Tosari dianugerahi tanah subur 145 Hektar, hasil panen padi organik, kopi petik merah, serta sumber mata air murni pegunungan Cikahuripan.
          </p>
        </div>
        <button
          onClick={() => {
            setActiveTab('sda');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="bg-white hover:bg-emerald-50 text-emerald-900 font-extrabold px-6 py-3 rounded-xl text-xs sm:text-sm shadow-md transition-all shrink-0 cursor-pointer flex items-center gap-2 transform hover:-translate-y-0.5"
        >
          <span>Jelajahi Potensi Sumber Daya Alam (SDA)</span>
          <ArrowRight className="w-4 h-4 text-emerald-700" />
        </button>
      </section>

    </div>
  );
};
