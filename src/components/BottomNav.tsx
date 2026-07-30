import React from 'react';
import { useDusun } from '../context/DusunContext';
import { PageTab } from '../types';
import {
  Home,
  Info,
  Store,
  Compass,
  Trees
} from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, setActiveInfoSubTab } = useDusun();

  const handleTabSelect = (tab: PageTab) => {
    setActiveTab(tab);
    if (tab === 'informasi') {
      setActiveInfoSubTab('profil');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { id: 'beranda' as PageTab, label: 'Beranda', icon: <Home className="w-5 h-5" /> },
    { id: 'informasi' as PageTab, label: 'Informasi', icon: <Info className="w-5 h-5" /> },
    { id: 'umkm' as PageTab, label: 'UMKM', icon: <Store className="w-5 h-5" /> },
    { id: 'wisata' as PageTab, label: 'Wisata', icon: <Compass className="w-5 h-5" /> },
    { id: 'sda' as PageTab, label: 'SDA', icon: <Trees className="w-5 h-5" /> },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-2xl px-2 py-1.5 flex items-center justify-around">
      {navItems.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => handleTabSelect(item.id)}
            className={`flex flex-col items-center justify-center py-1.5 px-3 min-w-[60px] rounded-xl transition-all active:scale-95 cursor-pointer ${
              isActive
                ? 'text-emerald-700 font-bold bg-emerald-50'
                : 'text-slate-500 font-medium hover:text-slate-800'
            }`}
          >
            <div className={`p-1 rounded-lg transition-colors ${isActive ? 'bg-emerald-700 text-white shadow-xs' : ''}`}>
              {item.icon}
            </div>
            <span className="text-[10px] tracking-tight mt-0.5">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
