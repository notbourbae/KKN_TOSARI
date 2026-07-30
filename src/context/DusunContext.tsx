import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  PageTab,
  InfoSubTab,
  DusunInfo,
  BeritaItem,
  UmkmItem,
  WisataItem,
  WisataEvent,
  PejabatDusun,
  PotensiSDA,
  StatistikProduksi
} from '../types';
import {
  initialDusunInfo,
  initialPejabat,
  initialBerita,
  initialUmkm,
  initialWisata,
  initialWisataEvents,
  initialPotensiSDA,
  initialStatistikProduksi
} from '../data/initialData';
import {
  syncAllFromSupabase,
  saveDusunInfoToSupabase,
  createPejabat,
  updatePejabat as updatePejabatSupabase,
  deletePejabat as deletePejabatSupabase,
  createBerita,
  deleteBerita as deleteBeritaSupabase,
  createUmkm,
  updateUmkm as updateUmkmSupabase,
  deleteUmkm as deleteUmkmSupabase,
  createWisata,
  deleteWisata as deleteWisataSupabase,
  createPotensiSDA,
  deletePotensiSDA as deletePotensiSDASupabase,
  createWisataEvent,
  saveStatistikProduksi,
  isSupabaseConfigured,
  supabase
} from '../lib/supabase';

function setLocalStorage(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    console.warn('localStorage penuh: tidak bisa menyimpan ' + key + '. Hapus data lama jika perlu.');
  }
}

function getLocalStorage<T>(key: string, fallback: T): T {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

interface DusunContextType {
  activeTab: PageTab;
  setActiveTab: (tab: PageTab) => void;
  activeInfoSubTab: InfoSubTab;
  setActiveInfoSubTab: (subTab: InfoSubTab) => void;

  dusunInfo: DusunInfo;
  setDusunInfo: React.Dispatch<React.SetStateAction<DusunInfo>>;
  pejabatList: PejabatDusun[];
  setPejabatList: React.Dispatch<React.SetStateAction<PejabatDusun[]>>;
  addPejabat: (pejabat: Omit<PejabatDusun, 'id'>) => void;
  updatePejabat: (id: string, pejabat: Partial<PejabatDusun>) => void;
  deletePejabat: (id: string) => void;

  beritaList: BeritaItem[];
  addBerita: (berita: Omit<BeritaItem, 'id' | 'dibaca'>) => void;
  updateBerita: (id: string, berita: Partial<BeritaItem>) => void;
  deleteBerita: (id: string) => void;

  umkmList: UmkmItem[];
  addUmkmRegistration: (umkmData: Omit<UmkmItem, 'id' | 'status' | 'tanggalDaftar' | 'rating' | 'produk'> & { produkList?: { nama: string; harga: number; deskripsi: string; gambar: string }[] }) => void;
  approveUmkm: (id: string) => void;
  rejectUmkm: (id: string) => void;
  updateUmkm: (id: string, data: Partial<UmkmItem>) => void;
  deleteUmkm: (id: string) => void;

  wisataList: WisataItem[];
  addWisata: (wisata: Omit<WisataItem, 'id' | 'rating'>) => void;
  updateWisata: (id: string, data: Partial<WisataItem>) => void;
  deleteWisata: (id: string) => void;
  toggleFavoriteWisata: (id: string) => void;

  wisataEvents: WisataEvent[];
  addWisataEvent: (event: Omit<WisataEvent, 'id'>) => void;

  potensiSDA: PotensiSDA[];
  addPotensiSDA: (sda: Omit<PotensiSDA, 'id'>) => void;
  updatePotensiSDA: (id: string, data: Partial<PotensiSDA>) => void;
  deletePotensiSDA: (id: string) => void;

  statistikProduksi: StatistikProduksi[];
  setStatistikProduksi: React.Dispatch<React.SetStateAction<StatistikProduksi[]>>;

  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
  loginAdmin: (passcode: string) => boolean;

  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedUmkmModal: UmkmItem | null;
  setSelectedUmkmModal: (item: UmkmItem | null) => void;
  selectedWisataModal: WisataItem | null;
  setSelectedWisataModal: (item: WisataItem | null) => void;
  selectedBeritaModal: BeritaItem | null;
  setSelectedBeritaModal: (item: BeritaItem | null) => void;
  showUmkmRegisterModal: boolean;
  setShowUmkmRegisterModal: (show: boolean) => void;

  resetToDefaultData: () => void;

  // Supabase integration
  loading: boolean;
  refreshFromSupabase: () => Promise<void>;
  saveDusunInfoToSupabaseAction: () => Promise<void>;
}

const DusunContext = createContext<DusunContextType | undefined>(undefined);

export const DusunProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<PageTab>('beranda');
  const [activeInfoSubTab, setActiveInfoSubTab] = useState<InfoSubTab>('profil');

  const [loading, setLoading] = useState(true);

  // Local storage state initialization with fallbacks
  const [dusunInfo, setDusunInfo] = useState<DusunInfo>(() => getLocalStorage('dusun_info_v1', initialDusunInfo));

  const [pejabatList, setPejabatList] = useState<PejabatDusun[]>(() => getLocalStorage('dusun_pejabat_v1', initialPejabat));

  const [beritaList, setBeritaList] = useState<BeritaItem[]>(() => getLocalStorage('dusun_berita_v1', initialBerita));

  const [umkmList, setUmkmList] = useState<UmkmItem[]>(() => getLocalStorage('dusun_umkm_v1', initialUmkm));

  const [wisataList, setWisataList] = useState<WisataItem[]>(() => getLocalStorage('dusun_wisata_v1', initialWisata));

  const [wisataEvents, setWisataEvents] = useState<WisataEvent[]>(() => getLocalStorage('dusun_wisata_events_v1', initialWisataEvents));

  const [potensiSDA, setPotensiSDA] = useState<PotensiSDA[]>(() => getLocalStorage('dusun_sda_v1', initialPotensiSDA));

  const [statistikProduksi, setStatistikProduksi] = useState<StatistikProduksi[]>(() => getLocalStorage('dusun_statistik_v1', initialStatistikProduksi));

  const [isAdmin, setIsAdmin] = useState<boolean>(() => localStorage.getItem('dusun_is_admin_v1') === 'true');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUmkmModal, setSelectedUmkmModal] = useState<UmkmItem | null>(null);
  const [selectedWisataModal, setSelectedWisataModal] = useState<WisataItem | null>(null);
  const [selectedBeritaModal, setSelectedBeritaModal] = useState<BeritaItem | null>(null);
  const [showUmkmRegisterModal, setShowUmkmRegisterModal] = useState(false);

  // Sync to local storage
  useEffect(() => { setLocalStorage('dusun_info_v1', dusunInfo); }, [dusunInfo]);
  useEffect(() => { setLocalStorage('dusun_pejabat_v1', pejabatList); }, [pejabatList]);
  useEffect(() => { setLocalStorage('dusun_berita_v1', beritaList); }, [beritaList]);
  useEffect(() => { setLocalStorage('dusun_umkm_v1', umkmList); }, [umkmList]);
  useEffect(() => { setLocalStorage('dusun_wisata_v1', wisataList); }, [wisataList]);
  useEffect(() => { setLocalStorage('dusun_wisata_events_v1', wisataEvents); }, [wisataEvents]);
  useEffect(() => { setLocalStorage('dusun_sda_v1', potensiSDA); }, [potensiSDA]);
  useEffect(() => { setLocalStorage('dusun_statistik_v1', statistikProduksi); }, [statistikProduksi]);
  useEffect(() => { try { localStorage.setItem('dusun_is_admin_v1', String(isAdmin)); } catch {} }, [isAdmin]);

  // ─── Initial load from Supabase ───────────────────
  const loadFromSupabase = useCallback(async () => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
      return;
    }
    try {
      const data = await syncAllFromSupabase();
      if (data) {
        if (data.dusunInfo) {
          setDusunInfo(data.dusunInfo);
          setLocalStorage('dusun_info_v1', data.dusunInfo);
        }
        if (data.pejabatList.length > 0) {
          setPejabatList(data.pejabatList);
          setLocalStorage('dusun_pejabat_v1', data.pejabatList);
        }
        if (data.beritaList.length > 0) {
          setBeritaList(data.beritaList);
          setLocalStorage('dusun_berita_v1', data.beritaList);
        }
        if (data.umkmList.length > 0) {
          setUmkmList(data.umkmList);
          setLocalStorage('dusun_umkm_v1', data.umkmList);
        }
        if (data.wisataList.length > 0) {
          setWisataList(data.wisataList);
          setLocalStorage('dusun_wisata_v1', data.wisataList);
        }
        if (data.wisataEvents.length > 0) {
          setWisataEvents(data.wisataEvents);
          setLocalStorage('dusun_wisata_events_v1', data.wisataEvents);
        }
        if (data.potensiSDA.length > 0) {
          setPotensiSDA(data.potensiSDA);
          setLocalStorage('dusun_sda_v1', data.potensiSDA);
        }
        if (data.statistikProduksi.length > 0) {
          setStatistikProduksi(data.statistikProduksi);
          setLocalStorage('dusun_statistik_v1', data.statistikProduksi);
        }
      }
    } catch (err) {
      console.warn('Gagal sync dari Supabase, pakai cache lokal:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFromSupabase();
  }, [loadFromSupabase]);

  const refreshFromSupabase = useCallback(async () => {
    setLoading(true);
    await loadFromSupabase();
  }, [loadFromSupabase]);

  // ─── Manual save dusunInfo to Supabase ────────────
  const saveDusunInfoToSupabaseAction = useCallback(async () => {
    if (!isSupabaseConfigured || !supabase) {
      alert('⚠️ Supabase tidak terhubung. Data hanya disimpan di browser.\nCek file .env.local dan restart server.');
      return;
    }
    try {
      await saveDusunInfoToSupabase(dusunInfo);
      alert('✅ Data profil dusun berhasil disimpan ke database Supabase!');
    } catch (err) {
      console.error('Gagal simpan profil dusun ke Supabase:', err);
      alert('❌ Gagal menyimpan ke Supabase: ' + (err as Error).message);
    }
  }, [dusunInfo]);

  // ─── Admin auth ───────────────────────────────────
  const loginAdmin = (passcode: string) => {
    if (passcode === 'Tosari2026') {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  // ─── Actions with Supabase sync ──────────────────

  const addPejabat = (data: Omit<PejabatDusun, 'id'>) => {
    const newItem: PejabatDusun = {
      ...data,
      id: 'pj_' + Date.now()
    };
    setPejabatList(prev => [...prev, newItem]);
    if (isSupabaseConfigured && supabase) {
      createPejabat(newItem).catch(err => console.error('Gagal simpan pejabat ke Supabase:', err));
    }
  };

  const updatePejabat = (id: string, data: Partial<PejabatDusun>) => {
    setPejabatList(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
    if (isSupabaseConfigured && supabase) {
      updatePejabatSupabase(id, data).catch(err => console.error('Gagal update pejabat di Supabase:', err));
    }
  };

  const deletePejabat = (id: string) => {
    setPejabatList(prev => prev.filter(p => p.id !== id));
    if (isSupabaseConfigured && supabase) {
      deletePejabatSupabase(id).catch(err => console.error('Gagal hapus pejabat dari Supabase:', err));
    }
  };

  const addBerita = (newItem: Omit<BeritaItem, 'id' | 'dibaca'>) => {
    const created: BeritaItem = {
      ...newItem,
      id: 'b_' + Date.now(),
      dibaca: 0
    };
    setBeritaList(prev => [created, ...prev]);
    if (isSupabaseConfigured && supabase) {
      createBerita(created).catch(err => console.error('Gagal simpan berita ke Supabase:', err));
    }
  };

  const updateBerita = (id: string, data: Partial<BeritaItem>) => {
    setBeritaList(prev => prev.map(b => b.id === id ? { ...b, ...data } : b));
    // No Supabase update for berita yet
  };

  const deleteBerita = (id: string) => {
    setBeritaList(prev => prev.filter(b => b.id !== id));
    if (isSupabaseConfigured && supabase) {
      deleteBeritaSupabase(id).catch(err => console.error('Gagal hapus berita dari Supabase:', err));
    }
  };

  const addUmkmRegistration = (data: Omit<UmkmItem, 'id' | 'status' | 'tanggalDaftar' | 'rating' | 'produk'> & { produkList?: { nama: string; harga: number; deskripsi: string; gambar: string }[] }) => {
    const today = new Date();
    const formattedDate = `${today.getDate()} ${['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'][today.getMonth()]} ${today.getFullYear()}`;

    const formattedProducts = (data.produkList || []).map((p, idx) => ({
      id: 'p_' + Date.now() + '_' + idx,
      nama: p.nama,
      harga: p.harga,
      deskripsi: p.deskripsi,
      gambar: p.gambar || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&auto=format&fit=crop&q=80'
    }));

    const newUmkm: UmkmItem = {
      id: 'u_' + Date.now(),
      namaUsaha: data.namaUsaha,
      pemilik: data.pemilik,
      kategori: data.kategori,
      deskripsi: data.deskripsi,
      alamat: data.alamat,
      whatsapp: data.whatsapp.replace(/[^0-9]/g, ''),
      mapUrl: data.mapUrl || `https://maps.google.com/?q=${encodeURIComponent(data.alamat)}`,
      status: 'menunggu',
      tanggalDaftar: formattedDate,
      gambar: data.gambar || 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&auto=format&fit=crop&q=80',
      rating: 5.0,
      produk: formattedProducts
    };

    setUmkmList(prev => [newUmkm, ...prev]);
    if (isSupabaseConfigured && supabase) {
      createUmkm(newUmkm).catch(err => console.error('Gagal simpan UMKM ke Supabase:', err));
    }
  };

  const approveUmkm = (id: string) => {
    setUmkmList(prev => prev.map(u => u.id === id ? { ...u, status: 'disetujui' } : u));
    if (isSupabaseConfigured && supabase) {
      updateUmkmSupabase(id, { status: 'disetujui' }).catch(err => console.error('Gagal update UMKM di Supabase:', err));
    }
  };

  const rejectUmkm = (id: string) => {
    setUmkmList(prev => prev.map(u => u.id === id ? { ...u, status: 'ditolak' } : u));
    if (isSupabaseConfigured && supabase) {
      updateUmkmSupabase(id, { status: 'ditolak' }).catch(err => console.error('Gagal update UMKM di Supabase:', err));
    }
  };

  const updateUmkm = (id: string, data: Partial<UmkmItem>) => {
    setUmkmList(prev => prev.map(u => u.id === id ? { ...u, ...data } : u));
    if (isSupabaseConfigured && supabase) {
      updateUmkmSupabase(id, data).catch(err => console.error('Gagal update UMKM di Supabase:', err));
    }
  };

  const deleteUmkm = (id: string) => {
    setUmkmList(prev => prev.filter(u => u.id !== id));
    if (isSupabaseConfigured && supabase) {
      deleteUmkmSupabase(id).catch(err => console.error('Gagal hapus UMKM dari Supabase:', err));
    }
  };

  const addWisata = (data: Omit<WisataItem, 'id' | 'rating'>) => {
    const newItem: WisataItem = {
      ...data,
      id: 'w_' + Date.now(),
      rating: 5.0
    };
    setWisataList(prev => [newItem, ...prev]);
    if (isSupabaseConfigured && supabase) {
      createWisata(newItem).catch(err => console.error('Gagal simpan wisata ke Supabase:', err));
    }
  };

  const updateWisata = (id: string, data: Partial<WisataItem>) => {
    setWisataList(prev => prev.map(w => w.id === id ? { ...w, ...data } : w));
    // No Supabase update for wisata yet
  };

  const deleteWisata = (id: string) => {
    setWisataList(prev => prev.filter(w => w.id !== id));
    if (isSupabaseConfigured && supabase) {
      deleteWisataSupabase(id).catch(err => console.error('Gagal hapus wisata dari Supabase:', err));
    }
  };

  const toggleFavoriteWisata = (id: string) => {
    setWisataList(prev => prev.map(w => w.id === id ? { ...w, favorit: !w.favorit } : w));
  };

  const addWisataEvent = (event: Omit<WisataEvent, 'id'>) => {
    const newEv: WisataEvent = {
      ...event,
      id: 'e_' + Date.now()
    };
    setWisataEvents(prev => [newEv, ...prev]);
    if (isSupabaseConfigured && supabase) {
      createWisataEvent(newEv).catch(err => console.error('Gagal simpan event ke Supabase:', err));
    }
  };

  const addPotensiSDA = (sda: Omit<PotensiSDA, 'id'>) => {
    const newItem: PotensiSDA = {
      ...sda,
      id: 'sda_' + Date.now()
    };
    setPotensiSDA(prev => [newItem, ...prev]);
    if (isSupabaseConfigured && supabase) {
      createPotensiSDA(newItem).catch(err => console.error('Gagal simpan SDA ke Supabase:', err));
    }
  };

  const updatePotensiSDA = (id: string, data: Partial<PotensiSDA>) => {
    setPotensiSDA(prev => prev.map(s => s.id === id ? { ...s, ...data } : s));
    // No Supabase update for SDA yet
  };

  const deletePotensiSDA = (id: string) => {
    setPotensiSDA(prev => prev.filter(s => s.id !== id));
    if (isSupabaseConfigured && supabase) {
      deletePotensiSDASupabase(id).catch(err => console.error('Gagal hapus SDA dari Supabase:', err));
    }
  };

  // Sync statistik to Supabase when it changes
  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      saveStatistikProduksi(statistikProduksi).catch(err => console.error('Gagal simpan statistik ke Supabase:', err));
    }
  }, [statistikProduksi]);

  const resetToDefaultData = () => {
    if (window.confirm('Apakah Anda yakin ingin mengembalikan semua data ke pengaturan awal?')) {
      setDusunInfo(initialDusunInfo);
      setPejabatList(initialPejabat);
      setBeritaList(initialBerita);
      setUmkmList(initialUmkm);
      setWisataList(initialWisata);
      setWisataEvents(initialWisataEvents);
      setPotensiSDA(initialPotensiSDA);
      setStatistikProduksi(initialStatistikProduksi);
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <DusunContext.Provider
      value={{
        activeTab,
        setActiveTab,
        activeInfoSubTab,
        setActiveInfoSubTab,
        dusunInfo,
        setDusunInfo,
        pejabatList,
        setPejabatList,
        addPejabat,
        updatePejabat,
        deletePejabat,
        beritaList,
        addBerita,
        updateBerita,
        deleteBerita,
        umkmList,
        addUmkmRegistration,
        approveUmkm,
        rejectUmkm,
        updateUmkm,
        deleteUmkm,
        wisataList,
        addWisata,
        updateWisata,
        deleteWisata,
        toggleFavoriteWisata,
        wisataEvents,
        addWisataEvent,
        potensiSDA,
        addPotensiSDA,
        updatePotensiSDA,
        deletePotensiSDA,
        statistikProduksi,
        setStatistikProduksi,
        isAdmin,
        setIsAdmin,
        loginAdmin,
        searchQuery,
        setSearchQuery,
        selectedUmkmModal,
        setSelectedUmkmModal,
        selectedWisataModal,
        setSelectedWisataModal,
        selectedBeritaModal,
        setSelectedBeritaModal,
        showUmkmRegisterModal,
        setShowUmkmRegisterModal,
        resetToDefaultData,
        loading,
        refreshFromSupabase,
        saveDusunInfoToSupabaseAction
      }}
    >
      {children}
    </DusunContext.Provider>
  );
};

export const useDusun = () => {
  const context = useContext(DusunContext);
  if (!context) {
    throw new Error('useDusun must be used within a DusunProvider');
  }
  return context;
};
