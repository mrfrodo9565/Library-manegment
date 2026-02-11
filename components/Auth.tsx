
import React, { useState, useMemo } from 'react';
import { MOCK_MEMBERS } from '../constants';
import { Member, UserRole } from '../types';
import Logo from './Logo';

interface AuthProps {
  onLogin: (user: Member) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('STUDENT');
  const [customId, setCustomId] = useState('');
  const [sovereignKey, setSovereignKey] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticatingGoogle, setIsAuthenticatingGoogle] = useState(false);

  const generatedIdPreview = useMemo(() => {
    if (selectedRole === 'CEO') return 'PAR-EXEC-X';
    if (customId) return `SID-${customId.toUpperCase()}`;
    return `MB-${Math.floor(Math.random() * 900) + 100}`;
  }, [customId, selectedRole]);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const user = MOCK_MEMBERS.find(m => m.email === email);
      if (user) {
        onLogin(user);
      } else {
        setError('Verification failed. Identity unknown to PAR Library Management.');
      }
    } else {
      if (selectedRole === 'CEO' && sovereignKey !== 'ALEX-CEO-777') {
        setError('Sovereign Key invalid. High-clearance registration denied.');
        return;
      }

      const newUser: Member = {
        id: selectedRole === 'CEO' ? `CEO-${Math.floor(Math.random() * 900) + 100}` : generatedIdPreview,
        name: name,
        email: email,
        role: selectedRole,
        joinedDate: new Date().toISOString().split('T')[0],
        borrowedCount: 0,
        trustScore: selectedRole === 'CEO' ? 100 : 70,
        status: 'ACTIVE'
      };
      onLogin(newUser);
    }
  };

  const handleGoogleLogin = () => {
    setIsAuthenticatingGoogle(true);
    setError('');
    
    setTimeout(() => {
      const googleUser = MOCK_MEMBERS[1]; 
      setIsAuthenticatingGoogle(false);
      onLogin({
        ...googleUser,
        name: "Google Verified: " + googleUser.name
      });
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0c] p-6 overflow-y-auto">
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#d4af37]/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="glass w-full max-w-md p-10 rounded-[2.5rem] border-white/5 shadow-2xl relative overflow-hidden transition-all duration-500 my-auto">
        {isAuthenticatingGoogle && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xl z-50 flex flex-col items-center justify-center text-center p-8 animate-in fade-in duration-300">
             <div className="relative w-20 h-20 mb-6">
                <div className="absolute inset-0 border-4 border-[#d4af37]/20 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-t-[#d4af37] rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                   <Logo size={40} />
                </div>
             </div>
             <h3 className="text-white font-black tracking-widest uppercase text-sm mb-2">Google Sync</h3>
             <p className="text-[10px] text-gray-500 mono uppercase tracking-widest">Verifying Cloud Identity Token...</p>
          </div>
        )}

        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.2)] mb-6 transition-transform hover:scale-105 duration-500">
            <Logo size={42} />
          </div>
          <h1 className="text-xl font-black text-white tracking-[0.2em] mb-1 uppercase">PAR LIBRARY MANAGEMENT</h1>
          <p className="text-[9px] text-[#d4af37] font-bold tracking-[0.4em] uppercase mono">Archival Access Portal</p>
        </div>

        {!isLogin && (
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/5">
              <button 
                onClick={() => setSelectedRole('STUDENT')}
                className={`flex-1 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${selectedRole === 'STUDENT' ? 'bg-white/10 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
              >
                Student
              </button>
              <button 
                onClick={() => setSelectedRole('CEO')}
                className={`flex-1 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${selectedRole === 'CEO' ? 'bg-[#d4af37] text-black shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'text-gray-500 hover:text-[#d4af37]'}`}
              >
                Library CEO
              </button>
            </div>

            {selectedRole === 'STUDENT' && (
              <div className="p-4 bg-white/2 border border-white/5 rounded-2xl animate-in zoom-in-95 duration-300 relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 opacity-5 rotate-12">
                   <Logo size={80} />
                </div>
                <div className="flex justify-between items-start mb-2 relative z-10">
                  <span className="text-[8px] font-black text-[#d4af37] uppercase tracking-widest">Digital ID Card Preview</span>
                  <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                </div>
                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-10 h-10 rounded bg-[#d4af37]/20 flex items-center justify-center text-sm font-black text-white">
                    {name ? name.charAt(0) : '?'}
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-white uppercase truncate max-w-[150px]">{name || 'ARCHIVIST NAME'}</p>
                    <p className="text-[9px] text-gray-500 mono font-bold">{generatedIdPreview}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {isLogin && (
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full bg-white/5 hover:bg-white/10 border border-white/10 py-3.5 rounded-xl flex items-center justify-center gap-3 transition-all mb-6 group"
          >
            <svg className="w-4 h-4 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            <span className="text-[10px] font-bold text-gray-300 tracking-wider uppercase">Sign in with Google</span>
          </button>
        )}

        <div className="relative flex items-center gap-4 mb-6">
          <div className="flex-1 h-[1px] bg-white/5"></div>
          <span className="text-[8px] font-bold text-gray-600 uppercase tracking-[0.2em] mono">Vault Credentials</span>
          <div className="flex-1 h-[1px] bg-white/5"></div>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          {!isLogin && (
            <div className="animate-in fade-in duration-300">
              <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Identity Name</label>
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/5 border border-white/5 rounded-xl px-5 py-3.5 text-xs text-white focus:outline-none focus:border-[#d4af37]/40 transition-all"
                placeholder="Ex: Marcus Aurelius"
              />
            </div>
          )}

          {!isLogin && selectedRole === 'STUDENT' && (
            <div className="animate-in slide-in-from-top-2 duration-300">
              <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1.5 ml-1 flex justify-between">
                Personal Student ID
                <span className="text-[7px] text-[#d4af37] italic tracking-tight lowercase">Leave blank for auto-generation</span>
              </label>
              <input
                type="text"
                value={customId}
                onChange={(e) => setCustomId(e.target.value)}
                className="w-full bg-white/5 border border-white/5 rounded-xl px-5 py-3.5 text-xs text-white focus:outline-none focus:border-[#d4af37]/40 transition-all mono"
                placeholder="Ex: 2409-ARCH"
                maxLength={12}
              />
            </div>
          )}

          <div>
            <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Secure Email Identity</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/5 rounded-xl px-5 py-3.5 text-xs text-white focus:outline-none focus:border-[#d4af37]/40 transition-all mono"
              placeholder="archive@parlibrary.ai"
            />
          </div>
          <div>
            <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Archive Cipher (Pass)</label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/5 rounded-xl px-5 py-3.5 text-xs text-white focus:outline-none focus:border-[#d4af37]/40 transition-all"
              placeholder="••••••••"
            />
          </div>

          {!isLogin && selectedRole === 'CEO' && (
            <div className="animate-in slide-in-from-top-2 duration-500">
              <label className="block text-[9px] font-black text-[#d4af37] uppercase tracking-widest mb-1.5 ml-1 flex items-center gap-2">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Sovereign Access Key
              </label>
              <input
                required
                type="text"
                value={sovereignKey}
                onChange={(e) => setSovereignKey(e.target.value)}
                className="w-full bg-[#d4af37]/5 border border-[#d4af37]/20 rounded-xl px-5 py-3.5 text-xs text-[#d4af37] focus:outline-none focus:border-[#d4af37] transition-all mono"
                placeholder="ALEX-CEO-..."
              />
              <p className="text-[7px] text-gray-600 mt-2 italic uppercase tracking-widest text-center">Identity verification required for High-Sovereign Status</p>
            </div>
          )}

          {error && <p className="text-[9px] text-red-500 font-bold mono text-center bg-red-500/5 py-2 rounded-lg border border-red-500/10">{error}</p>}

          <button
            type="submit"
            className={`w-full py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl mt-4 ${selectedRole === 'CEO' && !isLogin ? 'bg-[#d4af37] text-black shadow-[#d4af37]/20' : 'bg-white/10 text-white hover:bg-white/20'}`}
          >
            {isLogin ? 'Grant Access' : 'Initialize Identity'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={() => { setIsLogin(!isLogin); setSelectedRole('STUDENT'); setError(''); setCustomId(''); }}
            className="text-[9px] text-gray-500 hover:text-white uppercase tracking-[0.2em] font-bold transition-colors"
          >
            {isLogin ? "No Identity? Register Archives" : "Existing Identity? Login Portal"}
          </button>
        </div>

        <div className="mt-8 border-t border-white/5 pt-5 flex justify-center">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
            <span className="text-[8px] font-bold text-gray-600 uppercase tracking-[0.3em] mono">Node Connection: STABLE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
