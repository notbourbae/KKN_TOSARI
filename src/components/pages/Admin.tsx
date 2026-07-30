import React, { useState } from 'react';
import { useDusun } from '../../context/DusunContext';
import {
  ShieldCheck,
  Lock,
  LogOut,
  LayoutDashboard,
  Info,
  Building,
  Newspaper,
  Store,
  Compass,
  Trees,
  Users,
  Plus,
  Trash2,
  Edit3,
  CheckCircle,
  XCircle,
  AlertCircle,
  Save,
  Phone,
  Map,
  MapPin,
  Copy,
  Check,
  Database,
  Mail,
  Calendar,
  Sparkles,
  Quote
} from 'lucide-react';
import { BeritaItem, UmkmItem, WisataItem, WisataEvent, PotensiSDA, PejabatDusun } from '../../types';
import { ImageUploader } from '../ImageUploader';

export const Admin: React.FC = () => {
  const {
    isAdmin,
    setIsAdmin,
    loginAdmin,
    dusunInfo,
    setDusunInfo,
    saveDusunInfoToSupabaseAction,
    pejabatList,
    addPejabat,
    updatePejabat,
    deletePejabat,
    beritaList,
    addBerita,
    deleteBerita,
    umkmList,
    approveUmkm,
    rejectUmkm,
    deleteUmkm,
    wisataList,
    addWisata,
    deleteWisata,
    wisataEvents,
    addWisataEvent,
    updateWisataEvent,
    deleteWisataEvent,
    potensiSDA,
    addPotensiSDA,
    deletePotensiSDA
  } = useDusun();

  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [adminTab, setAdminTab] = useState<'dashboard' | 'informasi' | 'struktur' | 'berita' | 'umkm' | 'wisata' | 'sda' | 'agenda' | 'pengguna'>('dashboard');
  const [copiedSql, setCopiedSql] = useState(false);
  const [saveNotice, setSaveNotice] = useState<string | null>(null);

  // Pejabat Form State
  const [newPejabatNama, setNewPejabatNama] = useState('');
  const [newPejabatJabatan, setNewPejabatJabatan] = useState('');
  const [newPejabatKontak, setNewPejabatKontak] = useState('');
  const [newPejabatFoto, setNewPejabatFoto] = useState('');
  const [newPejabatTugas, setNewPejabatTugas] = useState('');

  const [editingPejabatId, setEditingPejabatId] = useState<string | null>(null);
  const [editPejabatForm, setEditPejabatForm] = useState<PejabatDusun | null>(null);

  // New Berita Form State
  const [newBeritaTitle, setNewBeritaTitle] = useState('');
  const [newBeritaCategory, setNewBeritaCategory] = useState<'Berita' | 'Pengumuman' | 'Agenda'>('Berita');
  const [newBeritaSummary, setNewBeritaSummary] = useState('');
  const [newBeritaContent, setNewBeritaContent] = useState('');
  const [newBeritaImg, setNewBeritaImg] = useState('');

  // New Wisata Form State
  const [newWisataName, setNewWisataName] = useState('');
  const [newWisataCat, setNewWisataCat] = useState<'Wisata Alam' | 'Wisata Budaya' | 'Wisata Edukasi' | 'Wisata Kuliner'>('Wisata Alam');
  const [newWisataDesc, setNewWisataDesc] = useState('');
  const [newWisataHours, setNewWisataHours] = useState('08:00 - 17:00 WIB');
  const [newWisataTicket, setNewWisataTicket] = useState('Rp 10.000 / Orang');
  const [newWisataImg, setNewWisataImg] = useState('');
  const [newWisataMap, setNewWisataMap] = useState('');

  // New Agenda / Event Form State
  const [newEvJudul, setNewEvJudul] = useState('');
  const [newEvTanggal, setNewEvTanggal] = useState('');
  const [newEvLokasi, setNewEvLokasi] = useState('');
  const [newEvKategori, setNewEvKategori] = useState('Festival Budaya');
  const [newEvDeskripsi, setNewEvDeskripsi] = useState('');

  const [editingEvId, setEditingEvId] = useState<string | null>(null);
  const [editEvForm, setEditEvForm] = useState<WisataEvent | null>(null);

  // New SDA Form State
  const [newSdaName, setNewSdaName] = useState('');
  const [newSdaCat, setNewSdaCat] = useState<'Pertanian' | 'Perkebunan' | 'Peternakan' | 'Perikanan' | 'Hutan dan Lingkungan'>('Pertanian');
  const [newSdaDesc, setNewSdaDesc] = useState('');
  const [newSdaLuas, setNewSdaLuas] = useState('');
  const [newSdaHasil, setNewSdaHasil] = useState('');
  const [newSdaImg, setNewSdaImg] = useState('');

  const pendingUmkm = umkmList.filter(u => u.status === 'menunggu');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(passcode);
    if (!success) {
      setLoginError(true);
    } else {
      setLoginError(false);
    }
  };

  const handleCreatePejabat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPejabatNama || !newPejabatJabatan) return;

    addPejabat({
      nama: newPejabatNama,
      jabatan: newPejabatJabatan,
      kontak: newPejabatKontak || '081234567890',
      foto: newPejabatFoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      tugasUtama: newPejabatTugas || 'Mengelola pelayanan dan ketertiban masyarakat dusun.'
    });

    setNewPejabatNama('');
    setNewPejabatJabatan('');
    setNewPejabatKontak('');
    setNewPejabatFoto('');
    setNewPejabatTugas('');
    alert('Pejabat / pengurus dusun baru berhasil ditambahkan!');
  };

  const startEditPejabat = (pejabat: PejabatDusun) => {
    setEditingPejabatId(pejabat.id);
    setEditPejabatForm({ ...pejabat });
  };

  const handleSaveEditPejabat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPejabatId || !editPejabatForm) return;

    updatePejabat(editingPejabatId, editPejabatForm);
    setEditingPejabatId(null);
    setEditPejabatForm(null);
    alert('Data pejabat / pengurus dusun berhasil diperbarui!');
  };

  const handleCreateBerita = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBeritaTitle || !newBeritaSummary) return;

    addBerita({
      judul: newBeritaTitle,
      kategori: newBeritaCategory,
      tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      penulis: 'Admin Dusun',
      ringkasan: newBeritaSummary,
      konten: newBeritaContent || newBeritaSummary,
      gambar: newBeritaImg || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80'
    });

    setNewBeritaTitle('');
    setNewBeritaSummary('');
    setNewBeritaContent('');
    setNewBeritaImg('');
    alert('Berita baru berhasil diterbitkan!');
  };

  const handleCreateWisata = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWisataName || !newWisataDesc) return;

    addWisata({
      nama: newWisataName,
      kategori: newWisataCat,
      deskripsi: newWisataDesc,
      gambar: newWisataImg || 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800&auto=format&fit=crop&q=80',
      googleMapsPin: newWisataMap || 'https://maps.google.com',
      jamOperasional: newWisataHours,
      hargaTiket: newWisataTicket,
      fasilitas: ['Area Parkir', 'Toilet', 'Musholla'],
      kontakPengelola: dusunInfo.teleponDusun
    });

    setNewWisataName('');
    setNewWisataDesc('');
    setNewWisataImg('');
    setNewWisataMap('');
    alert('Destinasi wisata baru berhasil ditambahkan!');
  };

  const handleCreateWisataEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvJudul || !newEvTanggal) return;

    addWisataEvent({
      judul: newEvJudul,
      tanggal: newEvTanggal,
      lokasi: newEvLokasi || 'Dusun Tosari',
      kategori: newEvKategori,
      deskripsi: newEvDeskripsi || newEvJudul
    });

    setNewEvJudul('');
    setNewEvTanggal('');
    setNewEvLokasi('');
    setNewEvDeskripsi('');
    setNewEvKategori('Festival Budaya');
    alert('Agenda / Festival Wisata berhasil ditambahkan!');
  };

  const startEditWisataEvent = (ev: WisataEvent) => {
    setEditingEvId(ev.id);
    setEditEvForm({ ...ev });
  };

  const handleSaveEditWisataEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvId || !editEvForm) return;

    updateWisataEvent(editingEvId, editEvForm);
    setEditingEvId(null);
    setEditEvForm(null);
    alert('Agenda / Festival Wisata berhasil diperbarui!');
  };

  const handleDeleteWisataEvent = (id: string, judul: string) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus agenda "${judul}"?`)) {
      deleteWisataEvent(id);
    }
  };

  const handleCreateSda = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSdaName || !newSdaDesc) return;

    addPotensiSDA({
      nama: newSdaName,
      kategori: newSdaCat,
      deskripsi: newSdaDesc,
      luasAtauJumlah: newSdaLuas || '10 Hektar',
      estimasiHasil: newSdaHasil || '100 Ton / Tahun',
      gambar: newSdaImg || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80',
      lokasi: 'Dusun Tosari'
    });

    setNewSdaName('');
    setNewSdaDesc('');
    setNewSdaLuas('');
    setNewSdaHasil('');
    alert('Potensi SDA berhasil ditambahkan!');
  };

  // LOGIN SCREEN FOR UNAUTHENTICATED USERS
  if (!isAdmin) {
    return (
      <div id="admin-login-view" className="max-w-md mx-auto my-12 bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-6">
        <div className="w-16 h-16 bg-slate-900 text-amber-400 rounded-2xl flex items-center justify-center mx-auto shadow-md">
          <ShieldCheck className="w-8 h-8" />
        </div>

        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">Masuk Administrator Dusun</h2>
          <p className="text-xs text-slate-500 mt-1">Masukkan kata sandi pengelola untuk mengedit konten website.</p>
        </div>

        <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Kata Sandi Administrator</label>
            <div className="relative">
              <input
                type="password"
                placeholder="Masukkan kata sandi (contoh: admin123)"
                value={passcode}
                onChange={e => setPasscode(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs focus:ring-2 focus:ring-emerald-500 font-mono"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
            {loginError && (
              <p className="text-[11px] text-red-500 mt-1 font-semibold flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> Kata sandi salah. Gunakan <strong>admin123</strong>
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold py-3 rounded-xl text-xs transition-colors shadow-md cursor-pointer flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" /> Masuk Panel Administrator
          </button>
        </form>

        <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-2">
          <p>Atau klik tombol cepat di bawah untuk demo langsung:</p>
          <button
            onClick={() => loginAdmin('admin123')}
            className="bg-amber-100 text-amber-900 font-bold px-4 py-2 rounded-xl text-xs hover:bg-amber-200 transition-colors w-full cursor-pointer"
          >
            ⚡ Masuk Otomatis (Demo Mode)
          </button>
        </div>
      </div>
    );
  }

  // AUTHENTICATED ADMIN DASHBOARD
  return (
    <div id="page-admin" className="space-y-8 animate-in fade-in duration-300">

      {/* Top Header Bar */}
      <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-md">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Panel Kelola Administrator Dusun</h2>
            <p className="text-xs text-amber-400">Status: Sesi Administrator Aktif</p>
          </div>
        </div>

        <button
          onClick={() => setIsAdmin(false)}
          className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-red-950 hover:text-red-300 text-slate-300 px-4 py-2 rounded-xl text-xs font-semibold transition-colors border border-slate-700 cursor-pointer"
        >
          <LogOut className="w-4 h-4" /> Keluar Admin
        </button>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-1 overflow-x-auto">
        <button
          onClick={() => setAdminTab('dashboard')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${adminTab === 'dashboard' ? 'bg-slate-900 text-amber-400' : 'text-slate-700 hover:bg-slate-100'
            }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          Dashboard
        </button>

        <button
          onClick={() => setAdminTab('informasi')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${adminTab === 'informasi' ? 'bg-slate-900 text-amber-400' : 'text-slate-700 hover:bg-slate-100'
            }`}
        >
          <Info className="w-4 h-4" />
          Kelola Profil & Demografi
        </button>

        <button
          onClick={() => setAdminTab('struktur')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${adminTab === 'struktur' ? 'bg-slate-900 text-amber-400' : 'text-slate-700 hover:bg-slate-100'
            }`}
        >
          <Building className="w-4 h-4" />
          Kelola Struktur Pemerintahan ({pejabatList.length})
        </button>

        <button
          onClick={() => setAdminTab('berita')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${adminTab === 'berita' ? 'bg-slate-900 text-amber-400' : 'text-slate-700 hover:bg-slate-100'
            }`}
        >
          <Newspaper className="w-4 h-4" />
          Kelola Berita ({beritaList.length})
        </button>

        <button
          onClick={() => setAdminTab('umkm')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${adminTab === 'umkm' ? 'bg-slate-900 text-amber-400' : 'text-slate-700 hover:bg-slate-100'
            }`}
        >
          <Store className="w-4 h-4" />
          Kelola UMKM {pendingUmkm.length > 0 && <span className="bg-amber-500 text-slate-950 font-black text-[10px] px-1.5 py-0.2 rounded-full">{pendingUmkm.length}</span>}
        </button>

        <button
          onClick={() => setAdminTab('wisata')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${adminTab === 'wisata' ? 'bg-slate-900 text-amber-400' : 'text-slate-700 hover:bg-slate-100'
            }`}
        >
          <Compass className="w-4 h-4" />
          Kelola Wisata ({wisataList.length})
        </button>

        <button
          onClick={() => setAdminTab('agenda')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${adminTab === 'agenda' ? 'bg-slate-900 text-amber-400' : 'text-slate-700 hover:bg-slate-100'
            }`}
        >
          <Calendar className="w-4 h-4" />
          Kelola Kalender Agenda ({wisataEvents.length})
        </button>

        <button
          onClick={() => setAdminTab('sda')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${adminTab === 'sda' ? 'bg-slate-900 text-amber-400' : 'text-slate-700 hover:bg-slate-100'
            }`}
        >
          <Trees className="w-4 h-4" />
          Kelola Potensi SDA ({potensiSDA.length})
        </button>
      </div>

      {/* ADMIN TAB 1: DASHBOARD STATS OVERVIEW */}
      {adminTab === 'dashboard' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <p className="text-xs text-slate-500 font-medium">Total Berita / Pengumuman</p>
              <p className="text-3xl font-black text-slate-900">{beritaList.length}</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <p className="text-xs text-slate-500 font-medium">Pendaftaran UMKM Menunggu Verifikasi</p>
              <p className="text-3xl font-black text-amber-600">{pendingUmkm.length}</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <p className="text-xs text-slate-500 font-medium">Total UMKM Aktif Disetujui</p>
              <p className="text-3xl font-black text-emerald-600">{umkmList.filter(u => u.status === 'disetujui').length}</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <p className="text-xs text-slate-500 font-medium">Destinasi Wisata Terdata</p>
              <p className="text-3xl font-black text-blue-600">{wisataList.length}</p>
            </div>
          </div>

          {/* Pending UMKM alert section */}
          {pendingUmkm.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl space-y-4">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                <span>Ada {pendingUmkm.length} Pendaftaran UMKM Baru Perlu Persetujuan</span>
              </div>
              <div className="space-y-3">
                {pendingUmkm.map(u => (
                  <div key={u.id} className="bg-white p-4 rounded-xl border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{u.namaUsaha}</h4>
                      <p className="text-slate-600">Pemilik: {u.pemilik} | HP/WA: {u.whatsapp}</p>
                      <p className="text-slate-500 text-[11px] mt-0.5">{u.alamat}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => approveUmkm(u.id)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <CheckCircle className="w-3.5 h-3.5" /> Disetujui
                      </button>
                      <button
                        onClick={() => rejectUmkm(u.id)}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <XCircle className="w-3.5 h-3.5" /> Tolak
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-xs text-slate-600 leading-relaxed space-y-4">
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-2">Petunjuk Penggunaan Panel Admin:</h4>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>Pilih menu tab di atas untuk mengelola modul informasi, struktur pemerintahan, berita, UMKM, wisata, dan potensi alam.</li>
                <li>Setiap perubahan yang Anda simpan akan tersimpan secara instan di penyimpanan browser (localStorage).</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ADMIN TAB 2: KELOLA INFORMASI & DEMOGRAFI DUSUN */}
      {adminTab === 'informasi' && (
        <div className="space-y-6 text-xs text-slate-800 animate-in fade-in duration-200">

          {/* Live Preview Bar - Matching Home Page Statistics */}
          <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white p-5 sm:p-6 rounded-3xl shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-emerald-800/80 pb-3">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">Live Preview Statistik Beranda Dusun</h3>
              </div>
              <span className="text-[11px] bg-emerald-800/60 text-emerald-200 px-2.5 py-0.5 rounded-full font-semibold">
                Perubahan Otomatis Terlihat di Beranda
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-black text-white">{dusunInfo.jumlahPenduduk.toLocaleString('id-ID')}</p>
                  <p className="text-xs text-emerald-200 font-medium">Jiwa Penduduk ({dusunInfo.jumlahKK} KK)</p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center shrink-0">
                  <Map className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-black text-white">{dusunInfo.luasWilayah || '0 Hektar'}</p>
                  <p className="text-xs text-teal-200 font-medium">Luas Wilayah Dusun</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form 1: Data Demografi & Stat Dusun */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4 shadow-xs">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Users className="w-5 h-5 text-emerald-600" />
              <div>
                <h3 className="text-base font-bold text-slate-900">1. Data Demografi & Wilayah Dusun</h3>
                <p className="text-slate-500 text-[11px]">Ubah data Jumlah Penduduk (Jiwa), Jumlah KK, dan Luas Wilayah Dusun</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Jumlah Penduduk (Jiwa) *</label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    value={dusunInfo.jumlahPenduduk}
                    onChange={e => setDusunInfo({ ...dusunInfo, jumlahPenduduk: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500"
                    placeholder="Contoh: 1850"
                  />
                  <span className="absolute right-3 top-2.5 text-slate-400 font-medium">Jiwa</span>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Jumlah Kepala Keluarga (KK) *</label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    value={dusunInfo.jumlahKK}
                    onChange={e => setDusunInfo({ ...dusunInfo, jumlahKK: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500"
                    placeholder="Contoh: 480"
                  />
                  <span className="absolute right-3 top-2.5 text-slate-400 font-medium">KK</span>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Luas Wilayah Dusun *</label>
                <input
                  type="text"
                  value={dusunInfo.luasWilayah}
                  onChange={e => setDusunInfo({ ...dusunInfo, luasWilayah: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500"
                  placeholder="Contoh: 145.8 Hektar"
                />
              </div>
            </div>
          </div>

          {/* Form 2: Profil & Slogan Dusun */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4 shadow-xs">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Building className="w-5 h-5 text-emerald-600" />
              <div>
                <h3 className="text-base font-bold text-slate-900">2. Profil & Identitas Dusun</h3>
                <p className="text-slate-500 text-[11px]">Nama dusun, kepala dusun, slogan, dan foto sampul wilayah</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nama Dusun</label>
                <input
                  type="text"
                  value={dusunInfo.namaDusun}
                  onChange={e => setDusunInfo({ ...dusunInfo, namaDusun: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Kepala Dusun (Kasun)</label>
                <input
                  type="text"
                  value={dusunInfo.kepalaDusun}
                  onChange={e => setDusunInfo({ ...dusunInfo, kepalaDusun: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Slogan / Tagline Dusun</label>
              <input
                type="text"
                value={dusunInfo.slogan}
                onChange={e => setDusunInfo({ ...dusunInfo, slogan: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs"
              />
            </div>

            <ImageUploader
              label="Foto Wilayah / Sampul Profil Dusun"
              value={dusunInfo.fotoWilayah || ''}
              onChange={val => setDusunInfo({ ...dusunInfo, fotoWilayah: val })}
              placeholder="https://images.unsplash.com/..."
            />
          </div>

          {/* Form 3: Alamat Kantor & Kontak Resmi */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4 shadow-xs">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <MapPin className="w-5 h-5 text-emerald-600" />
              <div>
                <h3 className="text-base font-bold text-slate-900">3. Wilayah Administrasi & Kontak Office</h3>
                <p className="text-slate-500 text-[11px]">Lokasi desa, kecamatan, kantor, telepon, dan email resmi</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Desa</label>
                <input
                  type="text"
                  value={dusunInfo.desa}
                  onChange={e => setDusunInfo({ ...dusunInfo, desa: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Kecamatan</label>
                <input
                  type="text"
                  value={dusunInfo.kecamatan}
                  onChange={e => setDusunInfo({ ...dusunInfo, kecamatan: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Kabupaten</label>
                <input
                  type="text"
                  value={dusunInfo.kabupaten}
                  onChange={e => setDusunInfo({ ...dusunInfo, kabupaten: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Kode Pos</label>
                <input
                  type="text"
                  value={dusunInfo.kodePos}
                  onChange={e => setDusunInfo({ ...dusunInfo, kodePos: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Telepon / WhatsApp Resmi</label>
                <input
                  type="text"
                  value={dusunInfo.teleponDusun}
                  onChange={e => setDusunInfo({ ...dusunInfo, teleponDusun: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Email Resmi Dusun</label>
                <input
                  type="email"
                  value={dusunInfo.emailDusun}
                  onChange={e => setDusunInfo({ ...dusunInfo, emailDusun: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Alamat Kantor Dusun</label>
              <input
                type="text"
                value={dusunInfo.alamatKantor}
                onChange={e => setDusunInfo({ ...dusunInfo, alamatKantor: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Visi Dusun</label>
              <textarea
                rows={2}
                value={dusunInfo.visi}
                onChange={e => setDusunInfo({ ...dusunInfo, visi: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs"
              />
            </div>
          </div>

          {/* Form 4: Sekapur Sirih & Sambutan Kepala Dusun */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Quote className="w-5 h-5 text-emerald-600" />
                <div>
                  <h3 className="text-base font-bold text-slate-900">4. Sekapur Sirih & Sambutan Kepala Dusun</h3>
                  <p className="text-slate-500 text-[11px]">Kelola judul, foto, jabatan, dan isi kalimat sambutan Kepala Dusun untuk halaman Beranda (Home)</p>
                </div>
              </div>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full">
                Tampil di Beranda
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nama Kepala Dusun</label>
                <input
                  type="text"
                  value={dusunInfo.kepalaDusun || ''}
                  onChange={e => setDusunInfo({ ...dusunInfo, kepalaDusun: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-semibold"
                  placeholder="Contoh: Bapak H. Sukarna S.T."
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Jabatan Resmi Sambutan</label>
                <input
                  type="text"
                  value={dusunInfo.sambutanJabatan || `Kepala Dusun ${dusunInfo.namaDusun}`}
                  onChange={e => setDusunInfo({ ...dusunInfo, sambutanJabatan: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-semibold"
                  placeholder="Contoh: Kepala Dusun Tosari"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Judul Sekapur Sirih / Sambutan</label>
              <input
                type="text"
                value={dusunInfo.sambutanJudul || ''}
                onChange={e => setDusunInfo({ ...dusunInfo, sambutanJudul: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-semibold"
                placeholder="Contoh: Sekapur Sirih: Bersama Mewujudkan Dusun Mandiri, Asri, dan Berdaya Saing Digital"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Isi Lengkap Sambutan Kepala Dusun</label>
              <textarea
                rows={5}
                value={dusunInfo.sambutanIsi || ''}
                onChange={e => setDusunInfo({ ...dusunInfo, sambutanIsi: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs leading-relaxed"
                placeholder="Tuliskan pesan sambutan..."
              />
            </div>

            <ImageUploader
              label="Foto Profil Kepala Dusun (Untuk Kartu Sambutan)"
              value={dusunInfo.sambutanFoto || ''}
              onChange={val => setDusunInfo({ ...dusunInfo, sambutanFoto: val })}
              placeholder="https://images.unsplash.com/..."
            />

            {/* Live Preview Card */}
            <div className="bg-gradient-to-br from-emerald-950 to-slate-900 text-white p-5 rounded-2xl border border-emerald-800/80 space-y-3 mt-4">
              <div className="flex items-center justify-between border-b border-emerald-800/60 pb-2">
                <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-emerald-400">
                  Pratinjau Langsung (Beranda)
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-md">
                  Tampilan Publik
                </span>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <img
                  src={dusunInfo.sambutanFoto || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80"}
                  alt="Preview Foto Sambutan"
                  className="w-20 h-20 rounded-full object-cover border-2 border-emerald-400 shadow-md shrink-0"
                />
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="font-bold text-sm text-emerald-100">{dusunInfo.sambutanJudul || 'Judul Sambutan'}</h4>
                  <p className="text-[11px] text-slate-300 line-clamp-2">{dusunInfo.sambutanIsi}</p>
                  <p className="text-[10px] text-emerald-400 font-bold pt-1">— {dusunInfo.kepalaDusun} ({dusunInfo.sambutanJabatan || 'Kepala Dusun'})</p>
                </div>
              </div>
            </div>
          </div>



          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-emerald-50 border border-emerald-200 p-4 rounded-2xl">
            <button
              onClick={async () => {
                await saveDusunInfoToSupabaseAction();
                setSaveNotice('Profil & Data Demografi Dusun Berhasil Disimpan!');
                setTimeout(() => setSaveNotice(null), 4000);
              }}
              className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" /> Simpan Perubahan Profil & Demografi
            </button>

            {saveNotice && (
              <span className="text-emerald-800 font-bold text-xs bg-emerald-200/70 px-3 py-1.5 rounded-lg flex items-center gap-1.5 animate-in fade-in">
                <CheckCircle className="w-4 h-4 text-emerald-700" /> {saveNotice}
              </span>
            )}
          </div>

        </div>
      )}

      {/* ADMIN TAB 2.5: KELOLA STRUKTUR PEMERINTAHAN DUSUN */}
      {adminTab === 'struktur' && (
        <div className="space-y-8 animate-in fade-in duration-200">

          {/* Form Tambah Pejabat Baru */}
          <form onSubmit={handleCreatePejabat} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Plus className="w-4 h-4 text-emerald-600" /> Tambah Pejabat / Pengurus Dusun Baru
              </h3>
              <span className="text-slate-500 text-[11px]">Daftar akan langsung tampil di menu Struktur Pemerintahan</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nama Lengkap & Gelar *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Drs. Ahmad Hidayat"
                  value={newPejabatNama}
                  onChange={e => setNewPejabatNama(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Jabatan / Peran *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Sekretaris Dusun / Ketua RT 01"
                  value={newPejabatJabatan}
                  onChange={e => setNewPejabatJabatan(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Nomor WhatsApp / HP Kontak</label>
                <input
                  type="text"
                  placeholder="Contoh: 081234567890"
                  value={newPejabatKontak}
                  onChange={e => setNewPejabatKontak(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <ImageUploader
              label="Foto Profil Pejabat (Opsional)"
              value={newPejabatFoto}
              onChange={setNewPejabatFoto}
              placeholder="https://images.unsplash.com/... (Kosongkan jika menggunakan foto default)"
            />

            <div>
              <label className="block font-bold text-slate-700 mb-1">Tugas Utama & Tanggung Jawab</label>
              <textarea
                rows={2}
                placeholder="Jelaskan peran dan pelayanan masyarakat yang ditangani..."
                value={newPejabatTugas}
                onChange={e => setNewPejabatTugas(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-5 py-2.5 rounded-xl transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" /> Tambahkan Pejabat
            </button>
          </form>

          {/* List Pejabat Saat Ini */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Building className="w-5 h-5 text-blue-600" /> Daftar Aparat & Pengurus Dusun ({pejabatList.length})
              </h3>
              <span className="text-slate-500 text-xs">Klik Edit untuk mengubah data pejabat</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pejabatList.map((p) => {
                const isEditing = editingPejabatId === p.id && editPejabatForm !== null;

                if (isEditing && editPejabatForm) {
                  return (
                    <form
                      key={p.id}
                      onSubmit={handleSaveEditPejabat}
                      className="bg-emerald-50/70 p-4 rounded-2xl border-2 border-emerald-400 space-y-3 text-xs"
                    >
                      <h4 className="font-bold text-emerald-950 flex items-center gap-1">
                        <Edit3 className="w-4 h-4 text-emerald-700" /> Edit Pejabat
                      </h4>

                      <div>
                        <label className="block font-bold mb-1">Nama Pejabat</label>
                        <input
                          type="text"
                          required
                          value={editPejabatForm.nama}
                          onChange={e => setEditPejabatForm({ ...editPejabatForm, nama: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs"
                        />
                      </div>

                      <div>
                        <label className="block font-bold mb-1">Jabatan</label>
                        <input
                          type="text"
                          required
                          value={editPejabatForm.jabatan}
                          onChange={e => setEditPejabatForm({ ...editPejabatForm, jabatan: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs"
                        />
                      </div>

                      <div>
                        <label className="block font-bold mb-1">Kontak / WA</label>
                        <input
                          type="text"
                          value={editPejabatForm.kontak}
                          onChange={e => setEditPejabatForm({ ...editPejabatForm, kontak: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs"
                        />
                      </div>

                      <ImageUploader
                        label="Foto Profil Pejabat"
                        value={editPejabatForm.foto}
                        onChange={val => setEditPejabatForm({ ...editPejabatForm, foto: val })}
                      />

                      <div>
                        <label className="block font-bold mb-1">Tugas Utama</label>
                        <textarea
                          rows={2}
                          value={editPejabatForm.tugasUtama}
                          onChange={e => setEditPejabatForm({ ...editPejabatForm, tugasUtama: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs"
                        />
                      </div>

                      <div className="flex items-center gap-2 pt-2">
                        <button
                          type="submit"
                          className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2 rounded-lg text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Save className="w-3.5 h-3.5" /> Simpan
                        </button>
                        <button
                          type="button"
                          onClick={() => { setEditingPejabatId(null); setEditPejabatForm(null); }}
                          className="px-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-2 rounded-lg text-xs transition-colors cursor-pointer"
                        >
                          Batal
                        </button>
                      </div>
                    </form>
                  );
                }

                return (
                  <div key={p.id} className="bg-slate-50 rounded-2xl border border-slate-200 p-5 flex flex-col justify-between space-y-3 hover:border-emerald-300 transition-colors">
                    <div className="flex flex-col items-center text-center space-y-2">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-emerald-600 shadow-xs shrink-0">
                        <img
                          src={p.foto}
                          alt={p.nama}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{p.nama}</h4>
                        <p className="text-xs font-semibold text-emerald-700 mt-0.5">{p.jabatan}</p>
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-3 bg-white p-2.5 rounded-xl border border-slate-200/80 w-full text-left">
                        {p.tugasUtama}
                      </p>
                      <div className="flex items-center gap-1 text-[11px] text-slate-600 font-medium">
                        <Phone className="w-3.5 h-3.5 text-emerald-600" /> Kontak: {p.kontak}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-3 border-t border-slate-200/80">
                      <button
                        onClick={() => startEditPejabat(p)}
                        className="flex-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-bold py-1.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Apakah Anda yakin ingin menghapus ${p.nama} dari struktur pemerintahan?`)) {
                            deletePejabat(p.id);
                          }
                        }}
                        className="bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-bold p-1.5 rounded-xl text-xs transition-colors flex items-center justify-center cursor-pointer"
                        title="Hapus Pejabat"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* ADMIN TAB 3: KELOLA BERITA */}
      {adminTab === 'berita' && (
        <div className="space-y-8">
          {/* Add Berita Form */}
          <form onSubmit={handleCreateBerita} className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4 text-xs">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Plus className="w-4 h-4 text-emerald-600" /> Tulis Berita atau Pengumuman Baru
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Judul Artikel</label>
                <input
                  type="text"
                  required
                  placeholder="Judul Berita..."
                  value={newBeritaTitle}
                  onChange={e => setNewBeritaTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Kategori</label>
                <select
                  value={newBeritaCategory}
                  onChange={e => setNewBeritaCategory(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs"
                >
                  <option value="Berita">Berita</option>
                  <option value="Pengumuman">Pengumuman</option>
                  <option value="Agenda">Agenda</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Ringkasan Singkat</label>
              <input
                type="text"
                required
                placeholder="Ringkasan 1-2 kalimat..."
                value={newBeritaSummary}
                onChange={e => setNewBeritaSummary(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Isi Berita Lengkap</label>
              <textarea
                rows={4}
                placeholder="Tuliskan isi berita secara detail..."
                value={newBeritaContent}
                onChange={e => setNewBeritaContent(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs"
              />
            </div>

            <ImageUploader
              label="Gambar Utama Berita / Pengumuman (Opsional)"
              value={newBeritaImg}
              onChange={setNewBeritaImg}
              placeholder="https://images.unsplash.com/..."
            />

            <button
              type="submit"
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-6 py-2 rounded-xl transition-colors cursor-pointer"
            >
              Terbitkan Berita
            </button>
          </form>

          {/* List Berita with Delete */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900">Daftar Berita & Pengumuman Active</h3>
            <div className="space-y-3">
              {beritaList.map(b => (
                <div key={b.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-4 text-xs">
                  <div>
                    <span className="font-bold text-emerald-800">[{b.kategori}]</span>{' '}
                    <span className="font-bold text-slate-900">{b.judul}</span>
                    <p className="text-slate-500 text-[11px]">{b.tanggal} • Dibaca {b.dibaca} kali</p>
                  </div>
                  <button
                    onClick={() => deleteBerita(b.id)}
                    className="text-red-600 hover:text-red-800 p-1 font-bold text-xs cursor-pointer flex items-center gap-1"
                  >
                    <Trash2 className="w-4 h-4" /> Hapus
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ADMIN TAB 4: KELOLA UMKM */}
      {adminTab === 'umkm' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-6 text-xs">
          <h3 className="text-base font-bold text-slate-900">Daftar Seluruh UMKM ({umkmList.length})</h3>
          <div className="space-y-3">
            {umkmList.map(u => (
              <div key={u.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-900 text-sm">{u.namaUsaha}</h4>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${u.status === 'disetujui' ? 'bg-emerald-100 text-emerald-800' :
                      u.status === 'menunggu' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                      }`}>
                      {u.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-slate-600">Pemilik: {u.pemilik} | WA: {u.whatsapp} | Kategori: {u.kategori}</p>
                </div>

                <div className="flex items-center gap-2">
                  {u.status === 'menunggu' && (
                    <button
                      onClick={() => approveUmkm(u.id)}
                      className="bg-emerald-600 text-white font-bold px-3 py-1.5 rounded-lg text-xs"
                    >
                      Setujui
                    </button>
                  )}
                  <button
                    onClick={() => deleteUmkm(u.id)}
                    className="text-red-600 hover:text-red-800 font-bold p-1 cursor-pointer flex items-center gap-1"
                  >
                    <Trash2 className="w-4 h-4" /> Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ADMIN TAB 5: KELOLA WISATA */}
      {adminTab === 'wisata' && (
        <div className="space-y-8 text-xs">
          <form onSubmit={handleCreateWisata} className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Plus className="w-4 h-4 text-teal-600" /> Tambah Destinasi Wisata Baru
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-bold mb-1">Nama Destinasi</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Saung Bambu Tosari"
                  value={newWisataName}
                  onChange={e => setNewWisataName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Kategori</label>
                <select
                  value={newWisataCat}
                  onChange={e => setNewWisataCat(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2"
                >
                  <option value="Wisata Alam">Wisata Alam</option>
                  <option value="Wisata Budaya">Wisata Budaya</option>
                  <option value="Wisata Edukasi">Wisata Edukasi</option>
                  <option value="Wisata Kuliner">Wisata Kuliner</option>
                </select>
              </div>

              <div>
                <label className="block font-bold mb-1">Link / Pin Google Maps</label>
                <input
                  type="url"
                  placeholder="https://maps.google.com/?q=..."
                  value={newWisataMap}
                  onChange={e => setNewWisataMap(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold mb-1">Deskripsi Destinasi</label>
              <textarea
                rows={3}
                required
                value={newWisataDesc}
                onChange={e => setNewWisataDesc(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2"
              />
            </div>

            <ImageUploader
              label="Foto / Gambar Destinasi Wisata"
              value={newWisataImg}
              onChange={setNewWisataImg}
              placeholder="https://images.unsplash.com/..."
            />

            <button
              type="submit"
              className="bg-teal-700 hover:bg-teal-800 text-white font-bold px-6 py-2 rounded-xl cursor-pointer"
            >
              Tambah Destinasi
            </button>
          </form>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-3">
            <h3 className="text-base font-bold text-slate-900">Daftar Tempat Wisata Active</h3>
            {wisataList.map(w => (
              <div key={w.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-slate-900">{w.nama}</h4>
                  <p className="text-slate-500 text-[11px]">{w.kategori} • Tiket: {w.hargaTiket}</p>
                </div>
                <button
                  onClick={() => deleteWisata(w.id)}
                  className="text-red-600 hover:text-red-800 font-bold p-1 cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" /> Hapus
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ADMIN TAB 6: KELOLA POTENSI SDA */}
      {adminTab === 'sda' && (
        <div className="space-y-8 text-xs">
          <form onSubmit={handleCreateSda} className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Plus className="w-4 h-4 text-emerald-600" /> Tambah Potensi Sumber Daya Alam Baru
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold mb-1">Nama Sektor / Potensi</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Perkebunan Teh Dusun"
                  value={newSdaName}
                  onChange={e => setNewSdaName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Kategori</label>
                <select
                  value={newSdaCat}
                  onChange={e => setNewSdaCat(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2"
                >
                  <option value="Pertanian">Pertanian</option>
                  <option value="Perkebunan">Perkebunan</option>
                  <option value="Peternakan">Peternakan</option>
                  <option value="Perikanan">Perikanan</option>
                  <option value="Hutan dan Lingkungan">Hutan dan Lingkungan</option>
                </select>
              </div>

              <div>
                <label className="block font-bold mb-1">Luas Lahan / Jumlah Populasi</label>
                <input
                  type="text"
                  placeholder="Contoh: 15 Hektar / 200 Ekor"
                  value={newSdaLuas}
                  onChange={e => setNewSdaLuas(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Estimasi Produksi / Hasil</label>
                <input
                  type="text"
                  placeholder="Contoh: 50 Ton / Tahun"
                  value={newSdaHasil}
                  onChange={e => setNewSdaHasil(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold mb-1">Deskripsi Singkat</label>
              <textarea
                rows={3}
                required
                value={newSdaDesc}
                onChange={e => setNewSdaDesc(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2"
              />
            </div>

            <ImageUploader
              label="Foto Sampul Potensi SDA (Opsional)"
              value={newSdaImg}
              onChange={setNewSdaImg}
              placeholder="https://images.unsplash.com/..."
            />

            <button
              type="submit"
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-6 py-2 rounded-xl cursor-pointer"
            >
              Tambah Potensi SDA
            </button>
          </form>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-3">
            <h3 className="text-base font-bold text-slate-900">Daftar Potensi SDA Terdata ({potensiSDA.length})</h3>
            {potensiSDA.map(sda => (
              <div key={sda.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-slate-900">{sda.nama}</h4>
                  <p className="text-slate-500 text-[11px]">{sda.kategori} • {sda.luasAtauJumlah} • {sda.estimasiHasil}</p>
                </div>
                <button
                  onClick={() => deletePotensiSDA(sda.id)}
                  className="text-red-600 hover:text-red-800 font-bold p-1 cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" /> Hapus
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ADMIN TAB 7: KELOLA KALENDER KEGIATAN & FESTIVAL WISATA */}
      {adminTab === 'agenda' && (
        <div className="space-y-8 text-xs text-slate-800 animate-in fade-in duration-200">

          {/* Modal Edit Agenda / Event */}
          {editingEvId && editEvForm && (
            <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-slate-200 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                    <Calendar className="w-5 h-5 text-teal-600" />
                    <span>Edit Agenda / Festival Wisata</span>
                  </div>
                  <button
                    onClick={() => { setEditingEvId(null); setEditEvForm(null); }}
                    className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveEditWisataEvent} className="space-y-4">
                  <div>
                    <label className="block font-bold mb-1">Judul Agenda / Festival</label>
                    <input
                      type="text"
                      required
                      value={editEvForm.judul}
                      onChange={e => setEditEvForm({ ...editEvForm, judul: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold mb-1">Tanggal Pelaksanaan</label>
                      <input
                        type="text"
                        required
                        value={editEvForm.tanggal}
                        onChange={e => setEditEvForm({ ...editEvForm, tanggal: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                      />
                    </div>

                    <div>
                      <label className="block font-bold mb-1">Kategori Agenda</label>
                      <select
                        value={editEvForm.kategori}
                        onChange={e => setEditEvForm({ ...editEvForm, kategori: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                      >
                        <option value="Festival Budaya">Festival Budaya</option>
                        <option value="Seni & Seni Pertunjukan">Seni & Seni Pertunjukan</option>
                        <option value="Olahraga & Rekreasi">Olahraga & Rekreasi</option>
                        <option value="Keagamaan & Pengajian">Keagamaan & Pengajian</option>
                        <option value="Bazar & Pameran UMKM">Bazar & Pameran UMKM</option>
                        <option value="Lainnya">Lainnya</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Lokasi Kegiatan</label>
                    <input
                      type="text"
                      required
                      value={editEvForm.lokasi}
                      onChange={e => setEditEvForm({ ...editEvForm, lokasi: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Deskripsi Singkat Agenda</label>
                    <textarea
                      rows={3}
                      required
                      value={editEvForm.deskripsi}
                      onChange={e => setEditEvForm({ ...editEvForm, deskripsi: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => { setEditingEvId(null); setEditEvForm(null); }}
                      className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-100 cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <Save className="w-4 h-4" /> Simpan Perubahan
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Header Bar */}
          <div className="bg-gradient-to-r from-teal-900 to-slate-900 text-white p-6 rounded-3xl shadow-md border border-teal-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-300 flex items-center justify-center shrink-0">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Kelola Kalender Kegiatan & Festival Wisata Dusun</h3>
                <p className="text-xs text-teal-200">Agenda Kebudayaan, Panen Raya, dan Olahraga Tahun 2026</p>
              </div>
            </div>
            <div className="bg-teal-800/60 px-4 py-2 rounded-2xl border border-teal-700 text-center shrink-0">
              <p className="text-xl font-black text-amber-300">{wisataEvents.length} Agenda Active</p>
              <p className="text-[10px] text-teal-200">Tampil di Halaman Wisata</p>
            </div>
          </div>

          {/* Form Tambah Agenda Baru */}
          <form onSubmit={handleCreateWisataEvent} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Plus className="w-5 h-5 text-teal-600" />
              Tambah Agenda / Festival Wisata Baru
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block font-bold mb-1">Judul Agenda / Festival <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Festival Panen Raya & Seduh 1000 Cangkir Kopi"
                  value={newEvJudul}
                  onChange={e => setNewEvJudul(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Tanggal Pelaksanaan <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: 17 Agustus 2026"
                  value={newEvTanggal}
                  onChange={e => setNewEvTanggal(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Kategori Agenda</label>
                <select
                  value={newEvKategori}
                  onChange={e => setNewEvKategori(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:ring-2 focus:ring-teal-500"
                >
                  <option value="Festival Budaya">Festival Budaya</option>
                  <option value="Seni & Seni Pertunjukan">Seni & Seni Pertunjukan</option>
                  <option value="Olahraga & Rekreasi">Olahraga & Rekreasi</option>
                  <option value="Keagamaan & Pengajian">Keagamaan & Pengajian</option>
                  <option value="Bazar & Pameran UMKM">Bazar & Pameran UMKM</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold mb-1">Lokasi Kegiatan <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Lapangan Dusun Tosari / Sanggar Seni"
                  value={newEvLokasi}
                  onChange={e => setNewEvLokasi(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold mb-1">Deskripsi Singkat Agenda <span className="text-red-500">*</span></label>
                <textarea
                  rows={3}
                  required
                  placeholder="Jelaskan mengenai rangkuman acara, fasilitas, peserta, atau perayaan..."
                  value={newEvDeskripsi}
                  onChange={e => setNewEvDeskripsi(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-teal-700 hover:bg-teal-800 text-white font-bold px-6 py-2.5 rounded-xl cursor-pointer shadow-md transition-all inline-flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" /> Tambah Agenda Wisata Baru
            </button>
          </form>

          {/* Daftar Agenda Aktif */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-teal-600" />
                Daftar Agenda & Festival Wisata Aktif ({wisataEvents.length})
              </h3>
            </div>

            {wisataEvents.length === 0 ? (
              <p className="text-slate-500 text-center py-6">Belum ada agenda atau festival wisata terdaftar.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {wisataEvents.map((ev) => (
                  <div key={ev.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <span className="inline-block bg-teal-100 text-teal-800 font-extrabold text-[10px] px-2.5 py-0.5 rounded-md">
                        {ev.kategori}
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm leading-snug">{ev.judul}</h4>
                      <p className="text-slate-600 text-xs flex items-center gap-1.5 pt-1">
                        <Calendar className="w-3.5 h-3.5 text-teal-600" /> {ev.tanggal}
                      </p>
                      <p className="text-slate-600 text-xs flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-teal-600" /> {ev.lokasi}
                      </p>
                      <p className="text-[11px] text-slate-500 pt-2 border-t border-slate-200 leading-relaxed">{ev.deskripsi}</p>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
                      <button
                        onClick={() => startEditWisataEvent(ev)}
                        className="bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold px-3 py-1.5 rounded-lg text-[11px] transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteWisataEvent(ev.id, ev.judul)}
                        className="bg-red-100 hover:bg-red-200 text-red-700 font-bold px-3 py-1.5 rounded-lg text-[11px] transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Live Preview Tampilan Kalender Wisata */}
          <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl space-y-6 border border-slate-800 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Live Preview: Tampilan Halaman Wisata</h3>
                  <p className="text-xs text-teal-300">Kalender Kegiatan & Festival Wisata Dusun Tosari</p>
                </div>
              </div>
              <span className="text-[11px] bg-teal-900 text-teal-200 px-3 py-1 rounded-full font-semibold">
                Pratinjau Publik
              </span>
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
          </div>

        </div>
      )}

    </div>
  );
};
