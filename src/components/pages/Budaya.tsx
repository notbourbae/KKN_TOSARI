import React, { useState } from 'react';
import { useDusun } from '../../context/DusunContext';
import {
  Landmark,
  Search,
  Music,
  Theater,
  HeartHandshake,
  Hand,
  BookOpen,
  Sparkles
} from 'lucide-react';

const categoryMeta: Record<string, { icon: React.ReactNode; color: string }> = {
  Kesenian: { icon: <Music className="w-4 h-4" />, color: 'bg-purple-600 text-white' },
  'Tarian Tradisional': { icon: <Theater className="w-4 h-4" />, color: 'bg-pink-600 text-white' },
  'Upacara Adat': { icon: <HeartHandshake className="w-4 h-4" />, color: 'bg-amber-600 text-white' },
  'Kerajinan Tradisional': { icon: <Hand className="w-4 h-4" />, color: 'bg-emerald-600 text-white' },
  'Bahasa & Sastra Lisan': { icon: <BookOpen className="w-4 h-4" />, color: 'bg-blue-600 text-white' },
};

export const Budaya: React.FC = () => {
  const { budayaList } = useDusun();

  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { name: 'Semua', icon: <Sparkles className="w-4 h-4" />, color: 'bg-amber-700 text-white' },
    ...Object.entries(categoryMeta).map(([name, meta]) => ({
      name,
      icon: meta.icon,
      color: meta.color
    }))
  ];

  const filteredBudaya = budayaList.filter(b => {
    const matchesCat = selectedCategory === 'Semua' || b.kategori === selectedCategory;
    const matchesSearch = b.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.deskripsi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.lokasi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.kategori.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div id="page-budaya" className="space-y-10 animate-in fade-in duration-300">

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-amber-900 via-orange-800 to-rose-900 text-white p-6 sm:p-10 rounded-3xl shadow-xl border border-amber-800 space-y-6">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-amber-800/80 text-amber-200 px-3 py-0.5 rounded-full text-xs font-semibold">
            <Landmark className="w-3.5 h-3.5 text-amber-300" /> Warisan Budaya & Tradisi Leluhur
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Kebudayaan & Tradisi Dusun Tosari
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            Dusun Tosari kaya akan warisan seni, tradisi, dan kearifan lokal Sunda yang lestari. Mulai dari musik Calung Bambu,
            Tarian Jaipong, hingga upacara adat Seren Taun yang memperkuat identitas dan gotong royong warga.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {Object.entries(categoryMeta).map(([name, meta]) => (
            <div
              key={name}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold shadow-xs ${meta.color}`}
            >
              {meta.icon}
              {name}
            </div>
          ))}
        </div>
      </div>

      {/* Filter & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.name
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat.icon}
              {cat.name}
              <span className="text-[10px] opacity-75 bg-white/20 px-1.5 py-0.5 rounded-full">
                {cat.name === 'Semua' ? budayaList.length : budayaList.filter(b => b.kategori === cat.name).length}
              </span>
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Cari budaya, tradisi, atau kesenian..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all"
          />
        </div>
      </div>

      {/* Budaya Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-extrabold text-slate-900">
            Warisan Budaya
            <span className="text-sm font-normal text-slate-400 ml-2">({filteredBudaya.length} item)</span>
          </h3>
        </div>

        {filteredBudaya.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200/80">
            <Landmark className="w-16 h-16 mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500 font-medium">Tidak ada data budaya yang ditemukan</p>
            <p className="text-xs text-slate-400 mt-1">Coba ubah kata kunci atau filter kategori</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBudaya.map((item) => {
              const meta = categoryMeta[item.kategori] || { icon: <Sparkles className="w-4 h-4" />, color: 'bg-slate-600 text-white' };
              return (
                <div
                  key={item.id}
                  className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-lg hover:border-amber-300 transition-all cursor-pointer flex flex-col"
                >
                  <div className="relative h-48 bg-slate-100 overflow-hidden shrink-0">
                    <img
                      src={item.gambar}
                      alt={item.nama}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <span className={`absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold shadow-xs ${meta.color}`}>
                      {meta.icon}
                      {item.kategori}
                    </span>
                    <span className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full ${
                      item.status === 'aktif' ? 'bg-emerald-600 text-white' : 'bg-blue-700 text-white'
                    }`}>
                      {item.status === 'aktif' ? 'Aktif' : 'Lestari'}
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <h3 className="font-bold text-slate-900 text-sm group-hover:text-amber-700 transition-colors line-clamp-2">
                        {item.nama}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                        {item.deskripsi}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-400 font-medium">
                      <Landmark className="w-3 h-3 text-amber-600 shrink-0" />
                      {item.lokasi}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};
