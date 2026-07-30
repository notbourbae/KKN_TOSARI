import React from 'react';
import { DusunProvider, useDusun } from './context/DusunContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './components/pages/Home';
import { InformasiDusun } from './components/pages/InformasiDusun';
import { Umkm } from './components/pages/Umkm';
import { Wisata } from './components/pages/Wisata';
import { SumberDayaAlam } from './components/pages/SumberDayaAlam';
import { Admin } from './components/pages/Admin';
import { BackgroundDecoration } from './components/BackgroundDecoration';

import { BottomNav } from './components/BottomNav';

import { UmkmDetailModal } from './components/modals/UmkmDetailModal';
import { WisataDetailModal } from './components/modals/WisataDetailModal';
import { BeritaDetailModal } from './components/modals/BeritaDetailModal';
import { UmkmRegisterModal } from './components/modals/UmkmRegisterModal';

const MainContent: React.FC = () => {
  const { activeTab } = useDusun();

  return (
    <div className="relative min-h-screen font-sans text-slate-800 flex flex-col justify-between selection:bg-emerald-200 selection:text-emerald-950">
      {/* Decorative Fixed Background Layer */}
      <BackgroundDecoration />

      <div className="relative z-10 flex-1 flex flex-col justify-between">
        <div>
          <Navbar />
          
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-24 md:py-8">
            {activeTab === 'beranda' && <Home />}
            {activeTab === 'informasi' && <InformasiDusun />}
            {activeTab === 'umkm' && <Umkm />}
            {activeTab === 'wisata' && <Wisata />}
            {activeTab === 'sda' && <SumberDayaAlam />}
            {activeTab === 'admin' && <Admin />}
          </main>
        </div>

        <Footer />
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav />

      {/* Global Modals */}
      <UmkmDetailModal />
      <WisataDetailModal />
      <BeritaDetailModal />
      <UmkmRegisterModal />
    </div>
  );
};


export default function App() {
  return (
    <DusunProvider>
      <MainContent />
    </DusunProvider>
  );
}
