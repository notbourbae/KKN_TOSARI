import React, { useState } from 'react';
import { useDusun } from '../../context/DusunContext';
import { X, MapPin, Clock, Ticket, Phone, ExternalLink, Compass, CheckCircle2, Heart } from 'lucide-react';

export const WisataDetailModal: React.FC = () => {
  const { selectedWisataModal, setSelectedWisataModal, toggleFavoriteWisata } = useDusun();
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  if (!selectedWisataModal) return null;

  const wisata = selectedWisataModal;
  const currentPhoto = activePhoto || wisata.gambar;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 max-h-[92vh] flex flex-col my-auto">
        
        {/* Modal Close Button */}
        <button
          onClick={() => { setSelectedWisataModal(null); setActivePhoto(null); }}
          className="absolute top-4 right-4 bg-white/90 hover:bg-white text-slate-800 p-2 rounded-full shadow-md transition-all cursor-pointer z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image & Gallery */}
        <div className="relative h-64 sm:h-80 bg-slate-900 shrink-0">
          <img
            src={currentPhoto}
            alt={wisata.nama}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-all duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent"></div>

          {/* Favorite button */}
          <button
            onClick={() => toggleFavoriteWisata(wisata.id)}
            className="absolute top-4 left-4 bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-all cursor-pointer z-10 flex items-center gap-1 text-xs font-semibold"
          >
            <Heart className={`w-4 h-4 ${wisata.favorit ? 'text-red-500 fill-red-500' : 'text-slate-600'}`} />
            <span>{wisata.favorit ? 'Favorit Saya' : 'Simpan'}</span>
          </button>

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="inline-block bg-teal-600 text-white font-semibold text-xs px-2.5 py-0.5 rounded-full mb-1">
              {wisata.kategori}
            </span>
            <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-sm">
              {wisata.nama}
            </h2>
          </div>
        </div>

        {/* Thumbnails list if multiple photos */}
        {wisata.fotoLain && wisata.fotoLain.length > 0 && (
          <div className="bg-slate-900 p-2 flex gap-2 overflow-x-auto shrink-0 border-t border-slate-800">
            <button
              onClick={() => setActivePhoto(wisata.gambar)}
              className={`relative w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                currentPhoto === wisata.gambar ? 'border-teal-400 scale-105' : 'border-transparent opacity-70'
              }`}
            >
              <img src={wisata.gambar} alt="Thumbnail Utm" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </button>
            {wisata.fotoLain.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActivePhoto(img)}
                className={`relative w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                  currentPhoto === img ? 'border-teal-400 scale-105' : 'border-transparent opacity-70'
                }`}
              >
                <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </button>
            ))}
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-700 text-sm">
          
          {/* Key Facts Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-teal-50/70 p-3.5 rounded-xl border border-teal-100 flex items-start gap-3">
              <Clock className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
              <div>
                <p className="text-[11px] font-bold text-teal-800 uppercase tracking-wider">Jam Operasional</p>
                <p className="font-semibold text-slate-900 text-xs mt-0.5">{wisata.jamOperasional}</p>
              </div>
            </div>

            <div className="bg-amber-50/70 p-3.5 rounded-xl border border-amber-100 flex items-start gap-3">
              <Ticket className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <p className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">Harga Tiket Masuk</p>
                <p className="font-semibold text-slate-900 text-xs mt-0.5">{wisata.hargaTiket}</p>
              </div>
            </div>

            <div className="bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-100 flex items-start gap-3">
              <Phone className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <p className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">Kontak Pengelola</p>
                <p className="font-semibold text-slate-900 text-xs mt-0.5">{wisata.kontakPengelola}</p>
              </div>
            </div>
          </div>

          {/* Deskripsi Wisata */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Compass className="w-5 h-5 text-teal-600" /> Deskripsi Destinasi
            </h3>
            <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
              {wisata.deskripsi}
            </p>
          </div>

          {/* Fasilitas */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-3">Fasilitas Wisata</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {wisata.fasilitas.map((fas, i) => (
                <div key={i} className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{fas}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Google Maps Embed / Pin Card */}
          {Boolean(wisata.googleMapsPin && wisata.googleMapsPin.trim()) && (
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Lokasi Petunjuk Arah</h4>
                  <p className="text-xs text-slate-500">Akses Google Maps untuk rute kendaraan menuju lokasi.</p>
                </div>
              </div>
              <a
                href={wisata.googleMapsPin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-4 py-2 rounded-xl text-xs transition-colors shrink-0"
              >
                Buka Google Maps <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end shrink-0">
          <button
            onClick={() => { setSelectedWisataModal(null); setActivePhoto(null); }}
            className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold px-5 py-2 rounded-xl text-xs transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
