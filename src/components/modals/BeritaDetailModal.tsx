import React from 'react';
import { useDusun } from '../../context/DusunContext';
import { X, Calendar, User, Eye, Tag, Share2 } from 'lucide-react';

export const BeritaDetailModal: React.FC = () => {
  const { selectedBeritaModal, setSelectedBeritaModal } = useDusun();

  if (!selectedBeritaModal) return null;

  const berita = selectedBeritaModal;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: berita.judul,
        text: berita.ringkasan,
        url: window.location.href,
      }).catch(() => {});
    } else {
      alert('Tautan berita berhasil disalin ke papan klip!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 max-h-[90vh] flex flex-col my-auto">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedBeritaModal(null)}
          className="absolute top-4 right-4 bg-white/90 hover:bg-white text-slate-800 p-2 rounded-full shadow-md transition-all cursor-pointer z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="relative h-56 sm:h-72 bg-slate-900 shrink-0">
          <img
            src={berita.gambar}
            alt={berita.judul}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent"></div>
          
          <div className="absolute bottom-4 left-4 right-4 text-white space-y-2">
            <span className={`inline-block font-semibold text-[11px] px-2.5 py-0.5 rounded-full ${
              berita.kategori === 'Pengumuman' ? 'bg-amber-500 text-slate-950 font-bold' :
              berita.kategori === 'Agenda' ? 'bg-blue-500 text-white' : 'bg-emerald-600 text-white'
            }`}>
              <Tag className="w-3 h-3 inline mr-1" />
              {berita.kategori}
            </span>
            <h2 className="text-lg sm:text-2xl font-bold text-white leading-snug">
              {berita.judul}
            </h2>
            <div className="flex items-center gap-4 text-xs text-slate-300 pt-1">
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-emerald-400" /> {berita.tanggal}</span>
              <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-emerald-400" /> {berita.penulis}</span>
              <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5 text-emerald-400" /> {berita.dibaca} kali dibaca</span>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Article Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-slate-700 text-xs sm:text-sm leading-relaxed">
          <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-100 font-medium text-emerald-950 italic">
            "{berita.ringkasan}"
          </div>

          <div className="space-y-3 pt-2 text-slate-800">
            {berita.konten.split('\n\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold px-4 py-2 rounded-xl text-xs transition-colors cursor-pointer border border-emerald-200"
          >
            <Share2 className="w-4 h-4" />
            Bagikan Berita Ini
          </button>

          <button
            onClick={() => setSelectedBeritaModal(null)}
            className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-5 py-2 rounded-xl text-xs transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
