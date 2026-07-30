import React, { useState } from 'react';
import { useDusun } from '../../context/DusunContext';
import { PotensiSDA } from '../../types';
import {
  Trees,
  Sprout,
  Beef,
  Fish,
  Droplets,
  Mountain,
  Pickaxe,
  MapPin,
  CheckCircle2,
  Search,
  X,
  Maximize2,
  Leaf
} from 'lucide-react';

export const SumberDayaAlam: React.FC = () => {
  const { potensiSDA } = useDusun();
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSdaDetail, setSelectedSdaDetail] = useState<PotensiSDA | null>(null);

  const categories = [
    { name: 'Semua', icon: <Trees className="w-4 h-4" /> },
    { name: 'Pertanian', icon: <Sprout className="w-4 h-4 text-emerald-600" /> },
    { name: 'Perkebunan', icon: <Leaf className="w-4 h-4 text-amber-600" /> },
    { name: 'Peternakan', icon: <Beef className="w-4 h-4 text-red-600" /> },
    { name: 'Perikanan', icon: <Fish className="w-4 h-4 text-blue-600" /> },
  ];

  const filteredSDA = potensiSDA.filter(s => {
    const matchesCat = selectedCategory === 'Semua' || s.kategori === selectedCategory;
    const matchesSearch = s.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.deskripsi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.lokasi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.kategori.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const getCategoryIcon = (kategori: string) => {
    switch (kategori) {
      case 'Pertanian': return <Sprout className="w-4 h-4 text-emerald-600" />;
      case 'Perkebunan': return <Leaf className="w-4 h-4 text-amber-600" />;
      case 'Peternakan': return <Beef className="w-4 h-4 text-red-600" />;
      case 'Perikanan': return <Fish className="w-4 h-4 text-blue-600" />;
      default: return <Trees className="w-4 h-4 text-emerald-600" />;
    }
  };

  return (
    <div id="page-sda" className="space-y-10 animate-in fade-in duration-300">

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-900 text-white p-6 sm:p-10 rounded-3xl shadow-xl border border-emerald-800 space-y-6">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-emerald-800/80 text-emerald-200 px-3 py-0.5 rounded-full text-xs font-semibold">
            <Trees className="w-3.5 h-3.5 text-emerald-300" /> Inventarisasi & Konservasi Sumber Daya Alam
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Potensi Pertanian, Perkebunan & Kekayaan Alam Dusun
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            Dusun Tosari memiliki potensi agraris yang melimpah, mengelola persawahan organik, perkebunan kopi pegunungan, sumber mata air jernih, dan kawasan konservasi hutan secara berkelanjutan.
          </p>
        </div>


      </div>

      {/* POTENSI SUMBER DAYA ALAM LIST & FILTER */}
      <section className="space-y-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-2xl font-extrabold text-slate-900">Rincian Potensi & Sektor Alam Dusun</h3>
            <p className="text-xs text-slate-500">Peta Sebaran Lahan, Hasil Komoditas, dan Pelestarian Lingkungan</p>
          </div>

          {/* Search & Category Filter Controls */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${selectedCategory === cat.name
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                >
                  {cat.icon}
                  {cat.name}
                  <span className="text-[10px] opacity-75 bg-white/20 px-1.5 py-0.2 rounded-full">
                    {cat.name === 'Semua' ? potensiSDA.length : potensiSDA.filter(s => s.kategori === cat.name).length}
                  </span>
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Cari potensi SDA (contoh: sawah, kopi, ternak, mata air, lokasi)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2 text-xs font-bold text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* SDA Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSDA.map((sda) => (
            <div
              key={sda.id}
              className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-lg hover:border-emerald-300 transition-all flex flex-col justify-between group"
            >
              {/* Image & Category Tag */}
              <div
                onClick={() => setSelectedSdaDetail(sda)}
                className="relative h-48 bg-slate-900 overflow-hidden cursor-pointer shrink-0"
              >
                <img
                  src={sda.gambar}
                  alt={sda.nama}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-slate-900/80 text-white backdrop-blur-xs font-semibold text-[10px] px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs border border-white/10">
                  {getCategoryIcon(sda.kategori)}
                  {sda.kategori}
                </div>
                <button
                  onClick={() => setSelectedSdaDetail(sda)}
                  className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-slate-900 p-2 rounded-xl shadow-md transition-all cursor-pointer text-xs font-bold flex items-center gap-1 backdrop-blur-xs"
                >
                  <Maximize2 className="w-3.5 h-3.5" /> Detail
                </button>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2 cursor-pointer" onClick={() => setSelectedSdaDetail(sda)}>
                  <h4 className="font-bold text-slate-900 text-base group-hover:text-emerald-700 transition-colors">
                    {sda.nama}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{sda.deskripsi}</p>

                  <div className="bg-emerald-50/60 p-3 rounded-xl border border-emerald-100/80 text-xs space-y-1.5">
                    <p className="flex items-center justify-between text-slate-700">
                      <span className="font-semibold text-slate-500">Luas / Populasi:</span>
                      <strong className="text-slate-900">{sda.luasAtauJumlah}</strong>
                    </p>
                    <p className="flex items-center justify-between text-slate-700">
                      <span className="font-semibold text-slate-500">Estimasi Hasil:</span>
                      <strong className="text-emerald-800">{sda.estimasiHasil}</strong>
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> {sda.lokasi}
                  </span>
                  <span className="flex items-center gap-1 text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Terdata Pemdes
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty Search State */}
        {filteredSDA.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 space-y-3">
            <Trees className="w-12 h-12 text-slate-300 mx-auto" />
            <h4 className="text-base font-bold text-slate-700">Tidak ada data potensi SDA ditemukan</h4>
            <p className="text-xs text-slate-500">Coba ubah kata kunci pencarian atau ganti pilihan kategori.</p>
          </div>
        )}
      </section>

      {/* SDA MODAL DETAIL */}
      {selectedSdaDetail && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 space-y-0 relative max-h-[90vh] flex flex-col">
            {/* Modal Header Image */}
            <div className="relative h-60 bg-slate-900 shrink-0">
              <img
                src={selectedSdaDetail.gambar}
                alt={selectedSdaDetail.nama}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedSdaDetail(null)}
                className="absolute top-4 right-4 bg-slate-900/80 hover:bg-slate-900 text-white p-2 rounded-full backdrop-blur-xs transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="absolute bottom-4 left-4 bg-emerald-800 text-white font-semibold text-xs px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                {getCategoryIcon(selectedSdaDetail.kategori)}
                {selectedSdaDetail.kategori}
              </span>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900">{selectedSdaDetail.nama}</h3>
                <p className="text-xs text-slate-500 flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-emerald-600" /> Lokasi: {selectedSdaDetail.lokasi}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Deskripsi & Pengelolaan</h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{selectedSdaDetail.deskripsi}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
                <div>
                  <p className="text-slate-500 font-medium">Luas Lahan / Populasi</p>
                  <p className="text-sm font-bold text-slate-900">{selectedSdaDetail.luasAtauJumlah}</p>
                </div>
                <div>
                  <p className="text-slate-500 font-medium">Estimasi Produksi / Hasil</p>
                  <p className="text-sm font-bold text-emerald-800">{selectedSdaDetail.estimasiHasil}</p>
                </div>
              </div>

              <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-xs space-y-1 text-emerald-950">
                <p className="font-bold flex items-center gap-1 text-emerald-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Terdaftar dalam Program Konservasi Pemdes
                </p>
                <p className="text-emerald-800/90 text-[11px] leading-relaxed">
                  Pengelolaan potensi SDA ini berada di bawah pengawasan Lembaga Masyarakat Desa dan Kelompok Tani Dusun Tosari untuk menjaga keberlanjutan ekosistem lingkungan.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end shrink-0">
              <button
                onClick={() => setSelectedSdaDetail(null)}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-2 rounded-xl text-xs transition-colors cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

