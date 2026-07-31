import React from 'react';
import { useDusun } from '../../context/DusunContext';
import { X, Phone, MapPin, Store, User, ExternalLink, ShoppingBag, CheckCircle } from 'lucide-react';

export const UmkmDetailModal: React.FC = () => {
  const { selectedUmkmModal, setSelectedUmkmModal } = useDusun();

  if (!selectedUmkmModal) return null;

  const umkm = selectedUmkmModal;
  const waNumber = umkm.whatsapp.startsWith('62') ? umkm.whatsapp : '62' + umkm.whatsapp.replace(/^0/, '');
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(`Halo ${umkm.pemilik}, saya melihat usaha ${umkm.namaUsaha} di Portal Website Dusun. Saya ingin bertanya produk/layanan Anda.`)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 max-h-[90vh] flex flex-col my-auto">

        {/* Modal Header */}
        <div className="relative h-48 sm:h-64 bg-slate-800 shrink-0">
          <img
            src={umkm.gambar}
            alt={umkm.namaUsaha}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent"></div>

          <button
            onClick={() => setSelectedUmkmModal(null)}
            className="absolute top-4 right-4 bg-white/80 hover:bg-white text-slate-800 p-2 rounded-full shadow-md transition-all cursor-pointer z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="inline-block bg-emerald-600 text-white font-semibold text-xs px-2.5 py-0.5 rounded-full mb-1">
              {umkm.kategori}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white drop-shadow-sm">
              {umkm.namaUsaha}
            </h2>
            <div className="flex items-center gap-3 text-xs text-emerald-200 mt-1">
              <span className="flex items-center gap-1 font-medium">
                <User className="w-3.5 h-3.5" /> Pemilik: {umkm.pemilik}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Content Scrollable */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-700 text-sm">

          {/* Business Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Pemilik Usaha</p>
              <p className="font-semibold text-slate-900 mt-0.5 flex items-center gap-1.5">
                <User className="w-4 h-4 text-emerald-600" /> {umkm.pemilik}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Alamat & Lokasi</p>
              <p className="font-semibold text-slate-900 mt-0.5 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0" /> {umkm.alamat}
              </p>
            </div>
          </div>

          {/* Deskripsi Usaha */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Store className="w-5 h-5 text-emerald-600" /> Deskripsi Usaha
            </h3>
            <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
              {umkm.deskripsi}
            </p>
          </div>

          {/* Catalog / Produk & Harga */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-600" /> Produk dan Harga
            </h3>

            {umkm.produk && umkm.produk.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {umkm.produk.map((prod) => (
                  <div key={prod.id} className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs hover:border-emerald-300 transition-colors">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm truncate">{prod.nama}</h4>
                      <p className="text-emerald-700 font-extrabold text-xs mt-0.5">
                        Rp {prod.harga.toLocaleString('id-ID')}
                      </p>
                      {prod.deskripsi && (
                        <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">{prod.deskripsi}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic bg-slate-50 p-3 rounded-lg">
                Belum ada rincian produk khusus. Hubungi pemilik untuk informasi lebih lengkap.
              </p>
            )}
          </div>

          {/* Badges */}
          <div className="flex items-center gap-2 text-xs text-slate-500 pt-2 border-t border-slate-100">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Usaha Terverifikasi oleh Pengurus Dusun Sukamaju</span>
          </div>
        </div>

        {/* Modal Footer Call to Action Buttons */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          {Boolean(umkm.mapUrl && umkm.mapUrl.trim()) && (
            <a
              href={umkm.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-700 font-semibold px-4 py-2.5 rounded-xl border border-slate-300 text-xs transition-colors"
            >
              <MapPin className="w-4 h-4 text-red-500" />
              Pin Lokasi Google Maps
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-colors shadow-md shadow-emerald-700/20"
          >
            <Phone className="w-4 h-4 fill-white" />
            Hubungi via WhatsApp ({umkm.pemilik})
          </a>
        </div>

      </div>
    </div>
  );
};
