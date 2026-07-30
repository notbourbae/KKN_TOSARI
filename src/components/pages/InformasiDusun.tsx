import React, { useState } from 'react';
import { useDusun } from '../../context/DusunContext';
import { InfoSubTab, BeritaItem } from '../../types';
import { ImageUploader } from '../ImageUploader';
import {
  MapPin,
  Users,
  Building,
  Target,
  Newspaper,
  History,
  Phone,
  Search,
  Calendar,
  Eye,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Upload,
  Camera,
  X
} from 'lucide-react';

export const InformasiDusun: React.FC = () => {
  const {
    activeInfoSubTab,
    setActiveInfoSubTab,
    dusunInfo,
    setDusunInfo,
    pejabatList,
    beritaList,
    setSelectedBeritaModal
  } = useDusun();

  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [tempFoto, setTempFoto] = useState<string>('');

  const [beritaFilter, setBeritaFilter] = useState<string>('Semua');
  const [beritaSearch, setBeritaSearch] = useState<string>('');

  const filteredBerita = beritaList.filter(b => {
    const matchesCategory = beritaFilter === 'Semua' || b.kategori === beritaFilter;
    const matchesSearch = b.judul.toLowerCase().includes(beritaSearch.toLowerCase()) ||
                          b.ringkasan.toLowerCase().includes(beritaSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div id="page-informasi-dusun" className="space-y-8 animate-in fade-in duration-300">
      
      {/* Subtab Header Navigation Pills */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveInfoSubTab('profil')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
            activeInfoSubTab === 'profil'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <MapPin className="w-4 h-4" />
          Profil Dusun
        </button>

        <button
          onClick={() => setActiveInfoSubTab('sejarah')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
            activeInfoSubTab === 'sejarah'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <History className="w-4 h-4" />
          Sejarah Dusun
        </button>

        <button
          onClick={() => setActiveInfoSubTab('visi-misi')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
            activeInfoSubTab === 'visi-misi'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Target className="w-4 h-4" />
          Visi dan Misi
        </button>

        <button
          onClick={() => setActiveInfoSubTab('struktur')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
            activeInfoSubTab === 'struktur'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Building className="w-4 h-4" />
          Struktur Pemerintahan
        </button>

        <button
          onClick={() => setActiveInfoSubTab('berita')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
            activeInfoSubTab === 'berita'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Newspaper className="w-4 h-4" />
          Berita & Pengumuman
        </button>
      </div>

      {/* SUBTAB 1: PROFIL DUSUN */}
      {activeInfoSubTab === 'profil' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">Profil Geografis & Demografi</h2>
                <p className="text-xs text-slate-500">Data Wilayah dan Kependudukan {dusunInfo.namaDusun}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p>
                  <strong>{dusunInfo.namaDusun}</strong> merupakan salah satu wilayah dusun produktif di bawah naungan {dusunInfo.desa}, {dusunInfo.kecamatan}, {dusunInfo.kabupaten}, Provinsi {dusunInfo.provinsi}.
                </p>
                <p>
                  Wilayah dusun berada pada bentang alam pegunungan dengan ketinggian rata-rata 850 mdpl, memiliki suhu udara sejuk berkisar 19°C – 26°C. Lahan dusun didominasi oleh persawahan padi irigasi teknis, perkebunan kopi robusta, serta kawasan hutan lindung.
                </p>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-emerald-800">
                    Batas-Batas Wilayah Dusun:
                  </h4>
                  <ul className="space-y-1 text-xs text-slate-600">
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-3.5 h-3.5 text-emerald-600" />
                      <strong>Sebelah Utara:</strong> Kawasan Hutan Lindung Pegunungan
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-3.5 h-3.5 text-emerald-600" />
                      <strong>Sebelah Selatan:</strong> Sungai Utama Cikahuripan & Desa Sindang
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-3.5 h-3.5 text-emerald-600" />
                      <strong>Sebelah Timur:</strong> Area Persawahan Blok Sukarasa
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-3.5 h-3.5 text-emerald-600" />
                      <strong>Sebelah Barat:</strong> Dusun Mekar Jaya
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md h-64 bg-slate-100 relative group">
                  <img
                    src={dusunInfo.fotoWilayah || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80'}
                    alt="Peta / Panorama Wilayah Dusun"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex flex-col justify-between p-3">
                    <div className="flex justify-end">
                      <button
                        onClick={() => {
                          setTempFoto(dusunInfo.fotoWilayah || '');
                          setShowUploadModal(true);
                        }}
                        className="bg-white/90 hover:bg-white text-slate-900 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer hover:scale-105"
                      >
                        <Camera className="w-3.5 h-3.5 text-emerald-600" /> Unggah / Ubah Foto
                      </button>
                    </div>
                    <div className="text-white text-xs flex items-center justify-between">
                      <span>Panorama Wilayah {dusunInfo.namaDusun}</span>
                      <span className="bg-emerald-600 px-2 py-0.5 rounded-md font-semibold text-[10px]">
                        {dusunInfo.luasWilayah}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100 text-center">
                    <p className="text-xl font-bold text-emerald-900">{dusunInfo.jumlahPenduduk}</p>
                    <p className="text-[11px] text-emerald-700">Total Jiwa Penduduk</p>
                  </div>
                  <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100 text-center">
                    <p className="text-xl font-bold text-emerald-900">{dusunInfo.jumlahKK}</p>
                    <p className="text-[11px] text-emerald-700">Kepala Keluarga (KK)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: SEJARAH DUSUN */}
      {activeInfoSubTab === 'sejarah' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <History className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">Sejarah & Asal-Usul Dusun</h2>
                <p className="text-xs text-slate-500">Perjalanan Panjang Berdirinya {dusunInfo.namaDusun}</p>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-100 text-amber-950">
                <p className="font-semibold mb-1">Pendiri Utama: {dusunInfo.sejarah.pendiri} (Tahun {dusunInfo.sejarah.tahunBerdiri})</p>
                <p className="text-slate-700">{dusunInfo.sejarah.cerita}</p>
              </div>

              <h3 className="font-bold text-slate-900 text-base pt-4">Linimasa Sejarah & Peristiwa Penting</h3>

              <div className="space-y-4 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-emerald-200 pl-8">
                {dusunInfo.sejarah.milestone.map((m, idx) => (
                  <div key={idx} className="relative space-y-1">
                    <div className="absolute -left-8 top-1.5 w-3.5 h-3.5 rounded-full bg-emerald-600 border-2 border-white shadow-xs"></div>
                    <span className="inline-block bg-emerald-100 text-emerald-800 font-bold text-[11px] px-2 py-0.5 rounded-md">
                      Tahun {m.tahun}
                    </span>
                    <p className="text-slate-800 text-xs sm:text-sm font-medium">{m.peristiwa}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 3: VISI DAN MISI */}
      {activeInfoSubTab === 'visi-misi' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-8">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">Visi & Misi Pembangunan Dusun</h2>
                <p className="text-xs text-slate-500">Arah Kebijakan dan Target Dusun Periode 2025–2030</p>
              </div>
            </div>

            {/* Visi Box */}
            <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-md space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4" /> Visi Utama Dusun
              </div>
              <p className="text-base sm:text-xl font-bold leading-relaxed text-emerald-100 italic">
                "{dusunInfo.visi}"
              </p>
            </div>

            {/* Misi Box */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900">5 Misi Utama Dusun Sukamaju</h3>
              <div className="grid grid-cols-1 gap-3">
                {dusunInfo.misi.map((m, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                    <div className="w-7 h-7 rounded-lg bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">{m}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 4: STRUKTUR PEMERINTAHAN */}
      {activeInfoSubTab === 'struktur' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">Struktur Pemerintahan Dusun</h2>
                <p className="text-xs text-slate-500">Organigram Aparat dan Pengurus Pelayanan Masyarakat</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pejabatList.map((p) => (
                <div key={p.id} className="bg-slate-50 rounded-2xl border border-slate-200 p-5 flex flex-col items-center text-center space-y-3 hover:border-emerald-300 transition-colors">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-emerald-600 shadow-sm shrink-0">
                    <img
                      src={p.foto}
                      alt={p.nama}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{p.nama}</h3>
                    <p className="text-xs font-semibold text-emerald-700 mt-0.5">{p.jabatan}</p>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-3 bg-white p-2.5 rounded-xl border border-slate-100 w-full">
                    {p.tugasUtama}
                  </p>
                  <a
                    href={`https://wa.me/${p.kontak.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-emerald-800 font-bold bg-emerald-100 hover:bg-emerald-200 px-3 py-1.5 rounded-lg transition-colors w-full justify-center"
                  >
                    <Phone className="w-3.5 h-3.5" /> Kontak: {p.kontak}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 5: BERITA DAN PENGUMUMAN */}
      {activeInfoSubTab === 'berita' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Search & Category Filter Header */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Category Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto">
              {['Semua', 'Berita', 'Pengumuman', 'Agenda'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setBeritaFilter(cat)}
                  className={`px-3.5 py-1.5 rounded-lg font-semibold text-xs transition-colors cursor-pointer whitespace-nowrap ${
                    beritaFilter === cat
                      ? 'bg-emerald-700 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Cari kata kunci berita..."
                value={beritaSearch}
                onChange={e => setBeritaSearch(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs focus:ring-2 focus:ring-emerald-500"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>
          </div>

          {/* Berita List Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredBerita.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedBeritaModal(item)}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer flex flex-col sm:flex-row"
              >
                <div className="relative w-full sm:w-48 h-44 bg-slate-100 shrink-0">
                  <img
                    src={item.gambar}
                    alt={item.judul}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <span className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    item.kategori === 'Pengumuman' ? 'bg-amber-500 text-slate-950' :
                    item.kategori === 'Agenda' ? 'bg-blue-600 text-white' : 'bg-emerald-700 text-white'
                  }`}>
                    {item.kategori}
                  </span>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 font-medium mb-1">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-emerald-600" /> {item.tanggal}</span>
                      <span className="flex items-center gap-1"><Eye className="w-3 h-3 text-slate-400" /> {item.dibaca}x</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm line-clamp-2 hover:text-emerald-700 transition-colors">
                      {item.judul}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                      {item.ringkasan}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 inline-flex items-center gap-1 pt-2">
                    Baca Berita →
                  </span>
                </div>
              </div>
            ))}
          </div>

          {filteredBerita.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
              <p className="text-slate-500 text-xs">Tidak ditemukan berita atau pengumuman yang sesuai dengan pencarian Anda.</p>
            </div>
          )}

        </div>
      )}

      {/* MODAL UPLOAD FOTO PROFIL DUSUN */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl p-6 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <Camera className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">Unggah Foto Profil Dusun</h3>
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Unggah foto pemandangan, peta, atau bangunan utama {dusunInfo.namaDusun}. Foto akan langsung ditampilkan pada halaman Profil Dusun.
            </p>

            <ImageUploader
              label="Pilih Foto dari Perangkat / Drag & Drop"
              value={tempFoto}
              onChange={setTempFoto}
              placeholder="https://images.unsplash.com/..."
            />

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  setDusunInfo({
                    ...dusunInfo,
                    fotoWilayah: tempFoto
                  });
                  setShowUploadModal(false);
                  alert('Foto profil dusun berhasil diperbarui!');
                }}
                className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
              >
                <Upload className="w-3.5 h-3.5" /> Simpan Foto
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
