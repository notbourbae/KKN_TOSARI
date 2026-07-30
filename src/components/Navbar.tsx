import React, { useState } from 'react';
import { useDusun } from '../context/DusunContext';
import { PageTab, InfoSubTab } from '../types';
import {
  Home,
  Info,
  Store,
  Compass,
  Landmark,
  Trees,
  ShieldCheck,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  UserCheck,
  PlusCircle,
  Building2
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    activeInfoSubTab,
    setActiveInfoSubTab,
    dusunInfo,
    isAdmin,
    setShowUmkmRegisterModal
  } = useDusun();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [infoDropdownOpen, setInfoDropdownOpen] = useState(false);

  const handleNavClick = (tab: PageTab, subTab?: InfoSubTab) => {
    setActiveTab(tab);
    if (subTab) {
      setActiveInfoSubTab(subTab);
    }
    setMobileMenuOpen(false);
    setInfoDropdownOpen(false);
  };

  return (
    <header id="site-header" className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-xs border-b border-emerald-100">
      {/* Main Header Brand */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo & Title */}
        <div
          onClick={() => handleNavClick('beranda')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-700 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight group-hover:text-emerald-700 transition-colors">
                {dusunInfo.namaDusun}
              </h1>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                PORTAL RESMI
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              {dusunInfo.slogan}
            </p>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            id="btn-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-emerald-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Desktop Main Menu Tabs */}
      <nav id="desktop-nav-menu" className="hidden md:block bg-slate-50/80 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <ul className="flex items-center gap-1 font-medium text-sm text-slate-700 py-1">
            {/* BERANDA */}
            <li>
              <button
                id="nav-tab-beranda"
                onClick={() => handleNavClick('beranda')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all ${
                  activeTab === 'beranda'
                    ? 'bg-emerald-700 text-white font-semibold shadow-xs'
                    : 'hover:bg-slate-200/70 text-slate-700'
                }`}
              >
                <Home className="w-4 h-4" />
                Beranda
              </button>
            </li>

            {/* INFORMASI DUSUN Dropdown */}
            <li className="relative">
              <div
                className="group inline-block"
                onMouseEnter={() => setInfoDropdownOpen(true)}
                onMouseLeave={() => setInfoDropdownOpen(false)}
              >
                <button
                  id="nav-tab-informasi"
                  onClick={() => handleNavClick('informasi', 'profil')}
                  className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg transition-all ${
                    activeTab === 'informasi'
                      ? 'bg-emerald-700 text-white font-semibold shadow-xs'
                      : 'hover:bg-slate-200/70 text-slate-700'
                  }`}
                >
                  <Info className="w-4 h-4" />
                  Informasi Dusun
                  <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                </button>

                {/* Submenu Dropdown */}
                {infoDropdownOpen && (
                  <div className="absolute left-0 top-full w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    <button
                      onClick={() => handleNavClick('informasi', 'profil')}
                      className={`w-full text-left px-4 py-2 text-xs font-medium transition-colors ${
                        activeTab === 'informasi' && activeInfoSubTab === 'profil'
                          ? 'bg-emerald-50 text-emerald-700 font-bold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      • Profil Dusun
                    </button>
                    <button
                      onClick={() => handleNavClick('informasi', 'sejarah')}
                      className={`w-full text-left px-4 py-2 text-xs font-medium transition-colors ${
                        activeTab === 'informasi' && activeInfoSubTab === 'sejarah'
                          ? 'bg-emerald-50 text-emerald-700 font-bold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      • Sejarah Dusun
                    </button>
                    <button
                      onClick={() => handleNavClick('informasi', 'visi-misi')}
                      className={`w-full text-left px-4 py-2 text-xs font-medium transition-colors ${
                        activeTab === 'informasi' && activeInfoSubTab === 'visi-misi'
                          ? 'bg-emerald-50 text-emerald-700 font-bold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      • Visi dan Misi
                    </button>
                    <button
                      onClick={() => handleNavClick('informasi', 'struktur')}
                      className={`w-full text-left px-4 py-2 text-xs font-medium transition-colors ${
                        activeTab === 'informasi' && activeInfoSubTab === 'struktur'
                          ? 'bg-emerald-50 text-emerald-700 font-bold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      • Struktur Pemerintahan Dusun
                    </button>
                    <div className="my-1 border-t border-slate-100"></div>
                    <button
                      onClick={() => handleNavClick('informasi', 'berita')}
                      className={`w-full text-left px-4 py-2 text-xs font-medium transition-colors ${
                        activeTab === 'informasi' && activeInfoSubTab === 'berita'
                          ? 'bg-emerald-50 text-emerald-700 font-bold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      • Berita & Pengumuman
                    </button>
                  </div>
                )}
              </div>
            </li>

            {/* UMKM */}
            <li>
              <button
                id="nav-tab-umkm"
                onClick={() => handleNavClick('umkm')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all ${
                  activeTab === 'umkm'
                    ? 'bg-emerald-700 text-white font-semibold shadow-xs'
                    : 'hover:bg-slate-200/70 text-slate-700'
                }`}
              >
                <Store className="w-4 h-4" />
                UMKM
              </button>
            </li>

            {/* WISATA */}
            <li>
              <button
                id="nav-tab-wisata"
                onClick={() => handleNavClick('wisata')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all ${
                  activeTab === 'wisata'
                    ? 'bg-emerald-700 text-white font-semibold shadow-xs'
                    : 'hover:bg-slate-200/70 text-slate-700'
                }`}
              >
                <Compass className="w-4 h-4" />
                Wisata
              </button>
            </li>

            {/* BUDAYA */}
            <li>
              <button
                id="nav-tab-budaya"
                onClick={() => handleNavClick('budaya')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all ${
                  activeTab === 'budaya'
                    ? 'bg-emerald-700 text-white font-semibold shadow-xs'
                    : 'hover:bg-slate-200/70 text-slate-700'
                }`}
              >
                <Landmark className="w-4 h-4" />
                Budaya
              </button>
            </li>

            {/* SUMBER DAYA ALAM */}
            <li>
              <button
                id="nav-tab-sda"
                onClick={() => handleNavClick('sda')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all ${
                  activeTab === 'sda'
                    ? 'bg-emerald-700 text-white font-semibold shadow-xs'
                    : 'hover:bg-slate-200/70 text-slate-700'
                }`}
              >
                <Trees className="w-4 h-4" />
                Sumber Daya Alam
              </button>
            </li>

            {/* ADMINISTRATOR */}
            <li>
              <button
                id="nav-tab-admin"
                onClick={() => handleNavClick('admin')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all ${
                  activeTab === 'admin'
                    ? 'bg-slate-900 text-amber-400 font-semibold shadow-xs'
                    : 'hover:bg-slate-200/70 text-slate-700'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-amber-500" />
                Administrator
              </button>
            </li>
          </ul>

          <div className="text-xs text-slate-500 font-medium">
            Hari ini: {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </nav>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 p-4 space-y-3 animate-in slide-in-from-top duration-200">
          <button
            onClick={() => handleNavClick('beranda')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm ${
              activeTab === 'beranda' ? 'bg-emerald-700 text-white' : 'text-slate-800 hover:bg-slate-100'
            }`}
          >
            <Home className="w-5 h-5" />
            Beranda
          </button>

          <div className="space-y-1 pl-2 border-l-2 border-emerald-200">
            <div className="text-xs font-bold text-emerald-800 uppercase px-2 py-1 flex items-center gap-2">
              <Info className="w-4 h-4" /> Informasi Dusun
            </div>
            <button
              onClick={() => handleNavClick('informasi', 'profil')}
              className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-emerald-50 rounded-md"
            >
              • Profil Dusun
            </button>
            <button
              onClick={() => handleNavClick('informasi', 'sejarah')}
              className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-emerald-50 rounded-md"
            >
              • Sejarah Dusun
            </button>
            <button
              onClick={() => handleNavClick('informasi', 'visi-misi')}
              className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-emerald-50 rounded-md"
            >
              • Visi dan Misi
            </button>
            <button
              onClick={() => handleNavClick('informasi', 'struktur')}
              className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-emerald-50 rounded-md"
            >
              • Struktur Pemerintahan
            </button>
            <button
              onClick={() => handleNavClick('informasi', 'berita')}
              className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-emerald-50 rounded-md"
            >
              • Berita dan Pengumuman
            </button>
          </div>

          <button
            onClick={() => handleNavClick('umkm')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm ${
              activeTab === 'umkm' ? 'bg-emerald-700 text-white' : 'text-slate-800 hover:bg-slate-100'
            }`}
          >
            <Store className="w-5 h-5" />
            UMKM Dusun
          </button>

          <button
            onClick={() => handleNavClick('wisata')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm ${
              activeTab === 'wisata' ? 'bg-emerald-700 text-white' : 'text-slate-800 hover:bg-slate-100'
            }`}
          >
            <Compass className="w-5 h-5" />
            Wisata Dusun
          </button>

          <button
            onClick={() => handleNavClick('budaya')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm ${
              activeTab === 'budaya' ? 'bg-emerald-700 text-white' : 'text-slate-800 hover:bg-slate-100'
            }`}
          >
            <Landmark className="w-5 h-5" />
            Budaya & Tradisi
          </button>

          <button
            onClick={() => handleNavClick('sda')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm ${
              activeTab === 'sda' ? 'bg-emerald-700 text-white' : 'text-slate-800 hover:bg-slate-100'
            }`}
          >
            <Trees className="w-5 h-5" />
            Sumber Daya Alam
          </button>

          <button
            onClick={() => handleNavClick('admin')}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl font-medium text-sm ${
              activeTab === 'admin' ? 'bg-slate-900 text-amber-400' : 'text-slate-800 hover:bg-slate-100'
            }`}
          >
            <ShieldCheck className="w-5 h-5 text-amber-500" />
            Panel Administrator
          </button>

          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => {
                setShowUmkmRegisterModal(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-amber-500 text-slate-950 font-bold rounded-xl text-sm shadow-xs cursor-pointer active:scale-95 transition-transform"
            >
              <PlusCircle className="w-5 h-5" />
              Daftar UMKM Baru
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
