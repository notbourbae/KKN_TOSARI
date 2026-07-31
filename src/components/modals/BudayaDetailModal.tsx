import React from 'react';
import { useDusun } from '../../context/DusunContext';
import { X, Landmark, MapPin, Tag } from 'lucide-react';

export const BudayaDetailModal: React.FC = () => {
  const { selectedBudayaModal, setSelectedBudayaModal } = useDusun();

  if (!selectedBudayaModal) return null;

  const budaya = selectedBudayaModal;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 max-h-[90vh] flex flex-col my-auto">
        {/* Close Button */}
        <button
          onClick={() => setSelectedBudayaModal(null)}
          className="absolute top-4 right-4 bg-white/90 hover:bg-white text-slate-800 p-2 rounded-full shadow-md transition-all cursor-pointer z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="relative h-56 sm:h-72 bg-slate-900 shrink-0">
          <img
            src={budaya.gambar}
            alt={budaya.nama}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent"></div>

          <div className="absolute bottom-4 left-4 right-4 text-white space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 bg-amber-600 text-white font-semibold text-[11px] px-2.5 py-0.5 rounded-full">
                <Tag className="w-3 h-3" />
                {budaya.kategori}
              </span>
              <span className={`inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                budaya.status === 'aktif' ? 'bg-emerald-600 text-white' : 'bg-blue-700 text-white'
              }`}>
                {budaya.status === 'aktif' ? 'Aktif' : 'Lestari'}
              </span>
            </div>
            <h2 className="text-lg sm:text-2xl font-bold text-white leading-snug">
              {budaya.nama}
            </h2>
            <div className="flex items-center gap-4 text-xs text-slate-300 pt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" /> {budaya.lokasi}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-slate-700 text-xs sm:text-sm leading-relaxed">
          <div className="space-y-3 pt-2 text-slate-800">
            {budaya.deskripsi.split('\n\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <Landmark className="w-4 h-4 text-amber-600" />
            Warisan Budaya Dusun Tosari
          </div>

          <button
            onClick={() => setSelectedBudayaModal(null)}
            className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-5 py-2 rounded-xl text-xs transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
