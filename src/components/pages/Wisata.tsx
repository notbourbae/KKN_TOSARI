import React, { useState } from 'react';
import { useDusun } from '../../context/DusunContext';
import { WisataCategory } from '../../types';
import {
  Compass,
  Trees,
  Landmark,
  GraduationCap,
  UtensilsCrossed,
  Search,
  MapPin,
  Clock,
  Ticket,
  Calendar,
  ChevronRight
} from 'lucide-react';

export const Wisata: React.FC = () => {
  const { wisataList, wisataEvents, setSelectedWisataModal } = useDusun();

  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { name: 'Semua', icon: <Compass className="w-4 h-4" /> },
    { name: 'Wisata Alam', icon: <Trees className="w-4 h-4" /> },
    { name: 'Wisata Edukasi', icon: <GraduationCap className="w-4 h-4" /> },
    { name: 'Wisata Kuliner', icon: <UtensilsCrossed className="w-4 h-4" /> },
  ];

  const filteredWisata = wisataList.filter(w => {
    const matchesCat = selectedCategory === 'Semua' || w.kategori === selectedCategory;
    const matchesSearch = w.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          w.deskripsi.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div id="page-wisata" className="space-y-12 animate-in fade-in duration-300">
      
      {/* Wisata Banner */}
      <div className="bg-gradient-to-r from-teal-900 to-emerald-950 text-white p-6 sm:p-10 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-teal-800">
        <div className="space-y-3 max-w-2xl text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 bg-teal-800 text-teal-200 px-3 py-0.5 rounded-full text-xs font-semibold">
            <Compass className="w-3.5 h-3.5" /> Pesona Pesawahan & Air Terjun Dusun Sukamaju
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">Destinasi Ekowisata Ramah Keluarga</h2>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            Nikmati udara pegunungan segar, gemericik air terjun Curug Cikahuripan, petik kopi segar, hingga sajian kuliner lesehan saung sawah khas Sunda.
          </p>
        </div>
        <div className="bg-teal-800/60 p-4 rounded-2xl border border-teal-700 backdrop-blur-xs text-center shrink-0 w-full md:w-auto">
          <p className="text-2xl font-black text-amber-300">{wisataList.length} Destinasi</p>
          <p className="text-xs text-teal-200">Dikelola oleh Pokdarwis Dusun</p>
        </div>
      </div>

      {/* Category Pills & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.name
                  ? 'bg-teal-700 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat.icon}
              {cat.name}
              <span className="text-[10px] opacity-75 bg-white/20 px-1.5 py-0.5 rounded-full">
                {cat.name === 'Semua' ? wisataList.length : wisataList.filter(w => w.kategori === cat.name).length}
              </span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Cari tempat wisata, curug, saung, atau tempat kemping..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs focus:ring-2 focus:ring-teal-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Wisata Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWisata.map((w) => (
          <div
            key={w.id}
            className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl hover:border-teal-300 transition-all flex flex-col justify-between"
          >
            {/* Card Header & Image */}
            <div
              onClick={() => setSelectedWisataModal(w)}
              className="relative h-52 bg-slate-900 overflow-hidden cursor-pointer shrink-0"
            >
              <img
                src={w.gambar}
                alt={w.nama}
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-3 left-3 bg-teal-800 text-white font-semibold text-[10px] px-2.5 py-0.5 rounded-full shadow-xs">
                {w.kategori}
              </span>

            </div>

            {/* Card Content */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2 cursor-pointer" onClick={() => setSelectedWisataModal(w)}>
                <h3 className="font-bold text-slate-900 text-base group-hover:text-teal-700 transition-colors">
                  {w.nama}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{w.deskripsi}</p>
                
                <div className="space-y-1.5 pt-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span className="truncate">{w.jamOperasional}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ticket className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span className="font-semibold text-slate-900">{w.hargaTiket}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => setSelectedWisataModal(w)}
                className="w-full bg-teal-50 hover:bg-teal-100 text-teal-900 font-bold text-xs py-2.5 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1"
              >
                Lihat Detail, Foto & Maps
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredWisata.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
          <Compass className="w-12 h-12 text-slate-300 mx-auto mb-2" />
          <h3 className="text-base font-bold text-slate-700">Tidak ada tempat wisata ditemukan</h3>
          <p className="text-xs text-slate-500">Coba gunakan kata kunci lain.</p>
        </div>
      )}

      {/* KALENDER KEGIATAN WISATA & FESTIVAL */}
      <section className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Kalender Kegiatan & Festival Wisata Dusun</h3>
            <p className="text-xs text-teal-300">Agenda Kebudayaan, Panen Raya, dan Olahraga Tahun 2026</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {wisataEvents.map((ev) => (
            <div key={ev.id} className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-2">
              <span className="inline-block bg-teal-500 text-slate-950 font-extrabold text-[10px] px-2 py-0.5 rounded-md">
                {ev.kategori}
              </span>
              <h4 className="font-bold text-white text-sm">{ev.judul}</h4>
              <p className="text-xs text-slate-300 flex items-center gap-1.5 pt-1">
                <Calendar className="w-3.5 h-3.5 text-teal-400" /> {ev.tanggal}
              </p>
              <p className="text-xs text-slate-300 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-teal-400" /> {ev.lokasi}
              </p>
              <p className="text-[11px] text-slate-400 pt-2 border-t border-slate-700">{ev.deskripsi}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
