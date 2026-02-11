
import React from 'react';
import { Member } from '../types';
import Logo from './Logo';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentUser: Member;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, currentUser, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Library Atrium', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'my_archive', label: 'My Archive', icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4' },
    { id: 'catalog', label: 'A-Z Catalog', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
    { id: 'attendance', label: 'Personnel Log', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { id: 'seats', label: 'Study Spaces', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
  ];

  const isGoogleUser = currentUser.name.startsWith("Google Verified: ");
  const displayName = isGoogleUser ? currentUser.name.replace("Google Verified: ", "") : currentUser.name;

  if (currentUser.role === 'CEO' || currentUser.role === 'ADMIN') {
    menuItems.push({ id: 'cctv', label: 'Security Feeds', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' });
    menuItems.push({ id: 'members', label: 'Member Registry', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' });
  }

  if (currentUser.role === 'CEO') {
    menuItems.push({ id: 'ceo_dashboard', label: 'CEO Control', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' });
    menuItems.push({ id: 'sovereign_register', label: 'Sovereign Register', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' });
  }

  menuItems.push({ id: 'settings', label: 'System Config', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' });

  return (
    <div className="w-64 glass h-screen flex flex-col border-r border-white/5 sticky top-0 z-10">
      <div className="p-8 border-b border-white/5">
        <div className="flex flex-col gap-2">
          <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.1)]">
            <Logo size={28} />
          </div>
          <div className="mt-3">
            <h1 className="font-extrabold text-white tracking-widest text-base leading-tight">PAR LIBRARY</h1>
            <h1 className="font-medium text-gray-500 tracking-[0.1em] text-[10px] uppercase">Management Suite</h1>
            <p className="text-[9px] text-[#d4af37] font-bold tracking-[0.3em] mono uppercase mt-1">Archival Security</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
              activeTab === item.id
                ? 'bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/20 shadow-[0_0_15px_rgba(212,175,55,0.1)]'
                : 'text-gray-500 hover:text-gray-200 hover:bg-white/5'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
            </svg>
            <span className="font-semibold text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-white/5 space-y-4">
        <div className="p-3 bg-white/2 border border-white/5 rounded-xl flex items-center gap-3 group relative">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#d4af37] to-blue-500 flex items-center justify-center text-[10px] font-black text-white shrink-0">
            {displayName.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="text-[10px] font-bold text-white truncate">{displayName}</p>
              {isGoogleUser && (
                <svg className="w-2.5 h-2.5 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                </svg>
              )}
            </div>
            <p className="text-[9px] text-gray-500 mono uppercase tracking-widest">{currentUser.role}</p>
          </div>
          <button onClick={onLogout} className="text-gray-600 hover:text-red-500 transition-colors shrink-0">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
        
        <div className="p-3 bg-blue-500/5 border border-blue-500/10 rounded-xl">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-[9px] font-bold text-blue-400 uppercase tracking-widest">Quantum Guard</span>
          </div>
          <p className="text-[10px] text-gray-400 mono">Keys: ROTATING</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
