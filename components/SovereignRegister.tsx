
import React, { useState } from 'react';
import { Book, Member } from '../types';

interface SovereignRegisterProps {
  onRegisterBook: (book: Book) => void;
  onRegisterMember: (member: Member) => void;
}

const SovereignRegister: React.FC<SovereignRegisterProps> = ({ onRegisterBook, onRegisterMember }) => {
  const [activeForm, setActiveForm] = useState<'BOOK' | 'MEMBER'>('BOOK');
  const [loading, setLoading] = useState(false);

  const [bookForm, setBookForm] = useState({
    title: '',
    author: '',
    genre: '',
    location: 'Vault-Omega'
  });

  const [memberForm, setMemberForm] = useState({
    name: '',
    email: '',
    role: 'FACULTY' as any
  });

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const newBook: Book = {
        id: `SVN-${Math.floor(Math.random() * 9000) + 1000}`,
        ...bookForm,
        isbn: 'SOVEREIGN-KEY',
        status: 'VAULTED',
        year: new Date().getFullYear(),
        securityLevel: 5
      };
      onRegisterBook(newBook);
      setBookForm({ title: '', author: '', genre: '', location: 'Vault-Omega' });
      setLoading(false);
    }, 1500);
  };

  const handleMemberSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const newMember: Member = {
        id: `HCL-${Math.floor(Math.random() * 9000) + 1000}`,
        ...memberForm,
        joinedDate: new Date().toISOString().split('T')[0],
        borrowedCount: 0,
        trustScore: 100,
        status: 'ACTIVE'
      };
      onRegisterMember(newMember);
      setMemberForm({ name: '', email: '', role: 'FACULTY' });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-700">
      <div className="text-center space-y-4">
        <div className="inline-block px-4 py-1.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-[10px] font-black tracking-[0.3em] uppercase mono">
          Restricted CEO Operation
        </div>
        <h2 className="text-4xl font-black text-white tracking-tighter uppercase">Sovereign Register</h2>
        <p className="text-gray-500 text-sm max-w-lg mx-auto leading-relaxed">
          Initialize new high-clearance archival nodes or register top-secret volumes directly into the Vault-Omega digital ledger.
        </p>
      </div>

      <div className="flex justify-center gap-4">
        <button 
          onClick={() => setActiveForm('BOOK')}
          className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeForm === 'BOOK' ? 'bg-[#d4af37] text-black shadow-[0_0_30px_rgba(212,175,55,0.3)]' : 'bg-white/5 text-gray-500 hover:text-white'}`}
        >
          Archive Sovereign Volume
        </button>
        <button 
          onClick={() => setActiveForm('MEMBER')}
          className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeForm === 'MEMBER' ? 'bg-[#d4af37] text-black shadow-[0_0_30px_rgba(212,175,55,0.3)]' : 'bg-white/5 text-gray-500 hover:text-white'}`}
        >
          Register Council Member
        </button>
      </div>

      <div className="glass p-10 rounded-[3rem] border border-white/5 relative overflow-hidden">
        {loading && (
          <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-xl flex flex-col items-center justify-center text-center p-12">
            <div className="w-16 h-16 border-4 border-[#d4af37]/20 border-t-[#d4af37] rounded-full animate-spin mb-6"></div>
            <p className="text-[#d4af37] font-black tracking-widest uppercase text-sm">Synchronizing Ledger...</p>
            <p className="text-[10px] text-gray-600 mt-2 mono uppercase">Committing Biometric-Signed Archival Block</p>
          </div>
        )}

        {activeForm === 'BOOK' ? (
          <form onSubmit={handleBookSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Volume Title</label>
              <input 
                required
                type="text" 
                value={bookForm.title}
                onChange={(e) => setBookForm({...bookForm, title: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#d4af37]/40 transition-all text-sm"
                placeholder="Ex: The Lost Codex"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Original Author</label>
              <input 
                required
                type="text" 
                value={bookForm.author}
                onChange={(e) => setBookForm({...bookForm, author: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#d4af37]/40 transition-all text-sm"
                placeholder="Ex: Anonymous"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Arcane Genre</label>
              <input 
                required
                type="text" 
                value={bookForm.genre}
                onChange={(e) => setBookForm({...bookForm, genre: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#d4af37]/40 transition-all text-sm"
                placeholder="Ex: Esoteric History"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Archival Location</label>
              <select 
                value={bookForm.location}
                onChange={(e) => setBookForm({...bookForm, location: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#d4af37]/40 transition-all text-sm appearance-none cursor-pointer"
              >
                <option value="Vault-Omega" className="bg-[#0a0a0c]">Vault-Omega (Core)</option>
                <option value="Deep-Arch-A1" className="bg-[#0a0a0c]">Deep Archive Alpha-1</option>
                <option value="Quantum-Silo" className="bg-[#0a0a0c]">Quantum Data Silo</option>
              </select>
            </div>
            <div className="md:col-span-2 pt-6">
              <button 
                type="submit"
                className="w-full py-5 bg-[#d4af37] text-black font-black uppercase tracking-[0.3em] rounded-2xl shadow-[0_15px_40px_rgba(212,175,55,0.2)] hover:scale-[1.01] transition-all"
              >
                Archive to Omega Ledger
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleMemberSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-2">
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Councillor Name</label>
              <input 
                required
                type="text" 
                value={memberForm.name}
                onChange={(e) => setMemberForm({...memberForm, name: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#d4af37]/40 transition-all text-sm"
                placeholder="Ex: Marcus Aurelius"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Secure Email Identity</label>
              <input 
                required
                type="email" 
                value={memberForm.email}
                onChange={(e) => setMemberForm({...memberForm, email: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#d4af37]/40 transition-all text-sm"
                placeholder="Ex: marcus@highcouncil.ai"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Assigned Unit Role</label>
              <select 
                value={memberForm.role}
                onChange={(e) => setMemberForm({...memberForm, role: e.target.value as any})}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#d4af37]/40 transition-all text-sm appearance-none cursor-pointer"
              >
                <option value="FACULTY" className="bg-[#0a0a0c]">High Faculty</option>
                <option value="ADMIN" className="bg-[#0a0a0c]">Archival Administrator</option>
                <option value="EXTERNAL" className="bg-[#0a0a0c]">Council Observer</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Clearance Protocol</label>
              <div className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-[#d4af37] font-black mono text-xs">
                LEVEL-S SOVEREIGN (100)
              </div>
            </div>
            <div className="md:col-span-2 pt-6">
              <button 
                type="submit"
                className="w-full py-5 bg-[#d4af37] text-black font-black uppercase tracking-[0.3em] rounded-2xl shadow-[0_15px_40px_rgba(212,175,55,0.2)] hover:scale-[1.01] transition-all"
              >
                Ratify Council Member
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass p-8 rounded-3xl border-white/5 flex items-center gap-6 group">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 003 20c0-5.523 4.477-10 10-10s10 4.477 10 10a10.003 10.003 0 01-6.861-10.471l.054.091M12 11V7a4 4 0 018 0v4M5 11V7a4 4 0 018 0v4" />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-black text-white uppercase tracking-widest">Biometric Signatures</h4>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest mono mt-1">Status: Active & Enforced</p>
          </div>
        </div>
        <div className="glass p-8 rounded-3xl border-white/5 flex items-center gap-6 group">
          <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center group-hover:bg-green-500 group-hover:text-white transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-black text-white uppercase tracking-widest">Ledger Immutability</h4>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest mono mt-1">Type: Quantum-Locked Hash</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SovereignRegister;
