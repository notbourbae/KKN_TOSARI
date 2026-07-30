import React, { useState } from 'react';
import { useDusun } from '../../context/DusunContext';
import { UmkmCategory } from '../../types';
import {
  Store,
  Search,
  PlusCircle,
  Phone,
  Star,
  MapPin,
  Tag,
  Utensils,
  Palette,
  Sprout,
  Beef,
  Wrench,
  CheckCircle2
} from 'lucide-react';

export const Umkm: React.FC = () => {
  const { umkmList, setSelectedUmkmModal, setShowUmkmRegisterModal } = useDusun();

  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const approvedUmkm = umkmList.filter(u => u.status === 'disetujui');

  const categories: { name: string; icon: React.ReactNode; color: string }[] = [
    { name: 'Semua', icon: <Store className="w-4 h-4" />, color: 'bg-emerald-700 text-white' },
    { name: 'Makanan dan Minuman', icon: <Utensils className="w-4 h-4" />, color: 'bg-amber-600 text-white' },
    { name: 'Kerajinan', icon: <Palette className="w-4 h-4" />, color: 'bg-purple-600 text-white' },
    { name: 'Pertanian', icon: <Sprout className="w-4 h-4" />, color: 'bg-emerald-600 text-white' },
    { name: 'Peternakan', icon: <Beef className="w-4 h-4" />, color: 'bg-red-600 text-white' },
    { name: 'Jasa', icon: <Wrench className="w-4 h-4" />, color: 'bg-blue-600 text-white' },
  ];

  const filteredUmkm = approvedUmkm.filter(u => {
    const matchesCat = selectedCategory === 'Semua' || u.kategori === selectedCategory;
    const matchesSearch = u.namaUsaha.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.pemilik.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.deskripsi.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div id="page-umkm" className="space-y-8 animate-in fade-in duration-300">

      {/* Banner Pendaftaran UMKM */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald-700">
        <div className="space-y-2 max-w-2xl text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 bg-emerald-700 text-emerald-200 px-3 py-0.5 rounded-full text-xs font-semibold">
            <Store className="w-3.5 h-3.5" /> Program Pemberdayaan Ekonomi Dusun Tosari
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Katalog UMKM & Produk Lokal</h2>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            Dukung produk buatan warga Dusun Tosari. Anda pelaku UMKM dusun? Daftarkan usaha Anda untuk mendapatkan fasilitas promosi digital!
          </p>
        </div>
        <button
          onClick={() => setShowUmkmRegisterModal(true)}
          className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-6 py-3 rounded-2xl text-xs sm:text-sm shadow-lg transition-all transform hover:-translate-y-0.5 shrink-0 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          Daftarkan Usaha Saya
        </button>
      </div>

      {/* Category Pills & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">

        {/* Category Cards */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${selectedCategory === cat.name
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
            >
              {cat.icon}
              {cat.name}
              <span className="text-[10px] opacity-75 bg-white/20 px-1.5 py-0.5 rounded-full">
                {cat.name === 'Semua' ? approvedUmkm.length : approvedUmkm.filter(u => u.kategori === cat.name).length}
              </span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Cari berdasarkan nama usaha, nama pemilik, atau jenis produk..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs focus:ring-2 focus:ring-emerald-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* UMKM Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUmkm.map((u) => {
          const waNumber = u.whatsapp.startsWith('62') ? u.whatsapp : '62' + u.whatsapp.replace(/^0/, '');
          const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(`Halo ${u.pemilik}, saya ingin pesan produk ${u.namaUsaha}.`)}`;

          return (
            <div
              key={u.id}
              className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-lg hover:border-emerald-300 transition-all flex flex-col justify-between"
            >
              {/* Card Image */}
              <div
                onClick={() => setSelectedUmkmModal(u)}
                className="relative h-48 bg-slate-100 overflow-hidden cursor-pointer shrink-0 group"
              >
                <img
                  src={u.gambar}
                  alt={u.namaUsaha}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-emerald-700 text-white font-semibold text-[10px] px-2.5 py-0.5 rounded-full shadow-xs">
                  {u.kategori}
                </span>
                <span className="absolute top-3 right-3 bg-slate-900/80 text-amber-300 font-bold text-[11px] px-2 py-0.5 rounded-full flex items-center gap-1 backdrop-blur-xs">
                  <Star className="w-3 h-3 fill-amber-300" /> {u.rating}
                </span>
              </div>

              {/* Card Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2 cursor-pointer" onClick={() => setSelectedUmkmModal(u)}>
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 text-base hover:text-emerald-700 transition-colors">
                      {u.namaUsaha}
                    </h3>
                  </div>
                  <p className="text-xs font-semibold text-emerald-800">Pemilik: {u.pemilik}</p>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{u.deskripsi}</p>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1 pt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" /> {u.alamat}
                  </p>
                </div>

                {/* Card Action */}
                <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => setSelectedUmkmModal(u)}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-2 rounded-xl transition-colors cursor-pointer text-center"
                  >
                    Detail & Produk
                  </button>

                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs p-2.5 rounded-xl transition-colors shrink-0 flex items-center justify-center shadow-xs"
                    title="Chat WhatsApp"
                  >
                    <Phone className="w-4 h-4 fill-white" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredUmkm.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 space-y-3">
          <Store className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-700">Tidak ada UMKM ditemukan</h3>
          <p className="text-xs text-slate-500">Coba ubah kata kunci pencarian atau pilih kategori lain.</p>
        </div>
      )}

    </div>
  );
};
