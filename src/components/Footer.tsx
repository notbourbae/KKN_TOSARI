import React from 'react';
import { useDusun } from '../context/DusunContext';
import { Building2, MapPin, Phone, Mail, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const { dusunInfo, setActiveTab, setActiveInfoSubTab } = useDusun();

  return (
    <footer id="site-footer" className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-800">

          {/* Col 1: Brand & Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white tracking-wide">{dusunInfo.namaDusun}</h2>
                <p className="text-xs text-emerald-400">{dusunInfo.slogan}</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Portal resmi layanan digital masyarakat, publikasi UMKM lokal, promosi objek wisata, dan transparansi potensi sumber daya alam {dusunInfo.namaDusun}.
            </p>
            <div className="pt-2 flex items-center gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800">
                • Sistem Online 2026
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-blue-950 text-blue-400 border border-blue-800">
                • Terverifikasi Pemdes
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-2">
              Menu Navigasi Utama
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setActiveTab('beranda')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Beranda Portal
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('informasi'); setActiveInfoSubTab('profil'); }}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Profil & Demografi Dusun
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('informasi'); setActiveInfoSubTab('sejarah'); }}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Sejarah & Asal-usul
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('informasi'); setActiveInfoSubTab('struktur'); }}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Struktur Pemerintahan Dusun
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('umkm')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Daftar UMKM & Produk Lokal
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('wisata')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Destinasi Wisata & Ekowisata
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('sda')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Potensi Sumber Daya Alam & Data
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Layanan Publik & Kontak */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-2">
              Kontak Kantor Dusun
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{dusunInfo.alamatKantor}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{dusunInfo.teleponDusun}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{dusunInfo.emailDusun}</span>
              </li>
              <li className="pt-2">
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60 text-[11px]">
                  <p className="font-semibold text-white">Jam Pelayanan Administrasi:</p>
                  <p className="text-slate-400">Senin - Jumat: 08:00 - 15:30 WIB</p>
                  <p className="text-slate-400">Sabtu: 08:00 - 12:00 WIB (Piket)</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Col 4: Pengaturan & Admin Access */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-l-2 border-amber-500 pl-2">
              Layanan Administrator
            </h3>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Pengurus dan pengelola konten informasi dusun dapat masuk ke panel administrator untuk memperbarui berita, verifikasi UMKM, dan statistik.
            </p>
            <button
              onClick={() => setActiveTab('admin')}
              className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold py-2 px-4 rounded-xl text-xs transition-colors shadow-md cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              Kelola Website (Admin)
            </button>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {dusunInfo.namaDusun}, {dusunInfo.desa}. Hak Cipta Dilindungi Undang-Undang.</p>
        </div>
      </div>
    </footer>
  );
};
