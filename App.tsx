
import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import DigitalLibrarian from './components/DigitalLibrarian';
import CEODashboard from './components/CEODashboard';
import Auth from './components/Auth';
import CameraFeed from './components/CameraFeed';
import AIAssistant from './components/AIAssistant';
import AttendanceManager from './components/AttendanceManager';
import SovereignRegister from './components/SovereignRegister';
import Logo from './components/Logo';
import { MOCK_BOOKS, MOCK_MEMBERS, MOCK_SECURITY_LOGS, MOCK_SEATS, MOCK_ALERTS } from './constants';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Member, Book, Seat, SecurityAlert } from './types';

const chartData = [
  { day: 'Mon', active: 120, threats: 1 },
  { day: 'Tue', active: 150, threats: 0 },
  { day: 'Wed', active: 200, threats: 2 },
  { day: 'Thu', active: 180, threats: 0 },
  { day: 'Fri', active: 250, threats: 1 },
  { day: 'Sat', active: 310, threats: 0 },
  { day: 'Sun', active: 280, threats: 4 },
];

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<Member | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [books, setBooks] = useState<Book[]>(MOCK_BOOKS);
  const [seats, setSeats] = useState<Seat[]>(MOCK_SEATS);
  const [members, setMembers] = useState<Member[]>(MOCK_MEMBERS);
  const [alerts, setAlerts] = useState<SecurityAlert[]>(MOCK_ALERTS);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLetter, setActiveLetter] = useState('ALL');
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [capturedFrame, setCapturedFrame] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          book.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLetter = activeLetter === 'ALL' || book.title.startsWith(activeLetter);
      const isVaulted = activeTab === 'vault' ? book.status === 'VAULTED' : true;
      return matchesSearch && matchesLetter && isVaulted;
    });
  }, [searchQuery, activeLetter, activeTab, books]);

  const stats = {
    totalBooks: books.length,
    borrowed: books.filter(b => b.status === 'BORROWED').length,
    available: books.filter(b => b.status === 'AVAILABLE').length,
    members: members.length,
    securityIncidents: alerts.filter(a => a.level === 'CRITICAL' && !a.fixed).length
  };

  const activeCriticalAlert = alerts.find(a => a.level === 'CRITICAL' && !a.fixed);

  const handleFixAlert = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, fixed: true } : a));
  };

  // Interaction handlers
  const handleBorrow = (bookId: string) => {
    setBooks(prev => prev.map(b => b.id === bookId ? { ...b, status: 'BORROWED' } : b));
  };

  const handleReturn = (bookId: string) => {
    setBooks(prev => prev.map(b => b.id === bookId ? { ...b, status: 'AVAILABLE' } : b));
  };

  const handleReserveSeat = (seatId: string) => {
    if (!currentUser) return;
    setSeats(prev => prev.map(s => s.id === seatId ? { ...s, status: 'RESERVED', currentUser: currentUser.id } : s));
  };

  const handleCancelSeat = (seatId: string) => {
    setSeats(prev => prev.map(s => s.id === seatId ? { ...s, status: 'AVAILABLE', currentUser: undefined } : s));
  };

  const handleRegisterSovereignBook = (book: Book) => {
    setBooks(prev => [book, ...prev]);
  };

  const handleRegisterSovereignMember = (member: Member) => {
    setMembers(prev => [member, ...prev]);
  };

  if (!currentUser) {
    return <Auth onLogin={(user) => setCurrentUser(user)} />;
  }

  const myBooks = books.filter(b => b.status === 'BORROWED');
  const mySeat = seats.find(s => s.currentUser === currentUser.id);

  const cameraMocks = [
    { id: 'CAM-01', name: 'Main Entrance', status: 'OK', resolution: '4K', fps: 60 },
    { id: 'CAM-02', name: 'Vault Alpha Exterior', status: 'OK', resolution: '1080p', fps: 30 },
    { id: 'CAM-03', name: 'Deep Archive North', status: 'ALERT', resolution: '1080p', fps: 30 },
  ];

  return (
    <div className="flex h-screen bg-[#0a0a0c] overflow-hidden selection:bg-[#d4af37]/30 text-gray-300">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        currentUser={currentUser}
        onLogout={() => setCurrentUser(null)}
      />

      <main className="flex-1 flex flex-col overflow-hidden relative">
        {activeCriticalAlert && (
          <div className="bg-red-950/40 border-b border-red-500/30 px-8 py-3 flex items-center justify-between animate-in slide-in-from-top duration-500 z-50">
            <div className="flex items-center gap-3">
              <span className="flex h-2 w-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse"></span>
              <p className="text-[10px] font-black text-red-400 uppercase tracking-[0.2em] mono">
                ACTIVE SECURITY BREACH: {activeCriticalAlert.message}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[9px] text-red-500/60 font-bold mono">TS: {activeCriticalAlert.timestamp}</span>
              <button 
                onClick={() => handleFixAlert(activeCriticalAlert.id)}
                className="bg-red-500 hover:bg-red-400 text-white text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded transition-all shadow-lg hover:shadow-red-500/20"
              >
                Resolve & Clear
              </button>
            </div>
          </div>
        )}

        <header className="h-16 glass border-b border-white/5 flex items-center justify-between px-8 shrink-0 z-20">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <Logo size={20} />
              <h2 className="text-sm font-black text-white tracking-[0.3em] uppercase">
                {activeTab === 'vault' ? 'Archival Vault' : 
                 activeTab === 'seats' ? 'Reading Room Status' : 
                 activeTab === 'ceo_dashboard' ? 'CEO CONTROL' : 
                 activeTab === 'cctv' ? 'Security Feeds' :
                 activeTab === 'my_archive' ? 'Personal Repository' :
                 activeTab === 'attendance' ? 'Personnel Pulse' :
                 activeTab === 'sovereign_register' ? 'SOVEREIGN LEDGER' :
                 activeTab.replace('_', ' ')}
              </h2>
            </div>
            <div className="h-4 w-[1px] bg-white/10"></div>
            <div className="flex items-center gap-4 text-[10px] font-bold text-gray-500 mono">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
                IDENTITY: {currentUser.role}
              </span>
              <span>Uptime: 99.99%</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end">
              <span className="text-xs font-bold text-white mono tracking-tighter">{time}</span>
              <span className="text-[9px] text-gray-500 mono uppercase tracking-widest">Node: A-01</span>
            </div>
            <div className="w-8 h-8 rounded bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center relative">
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full border border-black"></div>
              <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 003 20c0-5.523 4.477-10 10-10s10 4.477 10 10a10.003 10.003 0 01-6.861-10.471l.054.091M12 11V7a4 4 0 018 0v4M5 11V7a4 4 0 018 0v4" />
              </svg>
            </div>
          </div>
        </header>

        <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
          {activeTab === 'ceo_dashboard' && currentUser.role === 'CEO' && <CEODashboard />}

          {activeTab === 'sovereign_register' && currentUser.role === 'CEO' && (
            <SovereignRegister 
              onRegisterBook={handleRegisterSovereignBook}
              onRegisterMember={handleRegisterSovereignMember}
            />
          )}

          {activeTab === 'attendance' && <AttendanceManager currentUser={currentUser} />}

          {activeTab === 'my_archive' && (
            <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="glass p-8 rounded-[2.5rem] border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/5 blur-3xl rounded-full"></div>
                    <h3 className="text-xs font-black text-[#d4af37] uppercase tracking-[0.3em] mb-6">Current Reservation</h3>
                    {mySeat ? (
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-4xl font-black text-white mono mb-2">{mySeat.number}</p>
                          <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">{mySeat.zone} Zone</p>
                        </div>
                        <button 
                          onClick={() => handleCancelSeat(mySeat.id)}
                          className="px-6 py-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all"
                        >
                          Cancel Booking
                        </button>
                      </div>
                    ) : (
                      <div className="py-6 border-2 border-dashed border-white/5 rounded-2xl flex flex-col items-center justify-center">
                        <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest mb-4">No active workstation</p>
                        <button 
                          onClick={() => setActiveTab('seats')}
                          className="text-[#d4af37] text-[10px] font-black uppercase tracking-widest hover:underline"
                        >
                          Reserve a space
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="glass p-8 rounded-[2.5rem] border-white/10 relative overflow-hidden bg-gradient-to-br from-white/[0.03] to-transparent">
                    <div className="absolute -right-8 -bottom-8 opacity-[0.03] -rotate-12 pointer-events-none">
                       <Logo size={200} />
                    </div>
                    <div className="absolute top-4 right-6 text-[8px] font-black text-[#d4af37] uppercase tracking-[0.4em] mono">Official Archival Pass</div>
                    <div className="flex items-start gap-6 relative z-10">
                       <div className="relative group shrink-0">
                          <div className="w-24 h-24 rounded-2xl bg-[#d4af37]/5 border border-[#d4af37]/20 flex items-center justify-center text-3xl font-black text-white overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
                            {currentUser.name.charAt(0)}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-1 left-0 right-0 text-center text-[8px] font-bold text-[#d4af37] uppercase">VERIFIED</div>
                          </div>
                          <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-lg flex items-center justify-center border-2 border-[#0a0a0c]">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                       </div>
                       <div className="flex-1 space-y-3">
                          <div>
                            <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-0.5">Identified Archivist</p>
                            <h3 className="text-xl font-black text-white tracking-tighter truncate">{currentUser.name.replace("Google Verified: ", "")}</h3>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                               <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Personal ID</p>
                               <p className="text-[10px] font-bold text-[#d4af37] mono truncate">{currentUser.id}</p>
                            </div>
                            <div>
                               <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Trust Index</p>
                               <p className="text-[10px] font-bold text-green-400 mono">{currentUser.trustScore}%</p>
                            </div>
                          </div>
                          <div className="pt-2 border-t border-white/5 flex justify-between items-center">
                             <div className="flex gap-1">
                                {[1,2,3,4,5].map(i => (
                                  <div key={i} className={`w-1 h-3 rounded-full ${i <= (currentUser.trustScore / 20) ? 'bg-[#d4af37]' : 'bg-white/5'}`}></div>
                                ))}
                             </div>
                             <p className="text-[7px] text-gray-500 mono uppercase tracking-widest">Clearance: {currentUser.role}</p>
                          </div>
                       </div>
                    </div>
                  </div>
               </div>

               <div className="space-y-6">
                 <h3 className="text-xs font-black text-white uppercase tracking-[0.3em]">Borrowed Volumes ({myBooks.length})</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myBooks.map(book => (
                      <div key={book.id} className="glass p-6 rounded-[2rem] border-white/5 group hover:border-[#d4af37]/20 transition-all">
                        <div className="flex justify-between items-start mb-4">
                          <span className="text-[9px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-black mono uppercase">On Loan</span>
                          <span className="text-[9px] text-gray-500 font-bold mono">ID: {book.id}</span>
                        </div>
                        <h4 className="text-white font-bold mb-1 group-hover:text-[#d4af37] transition-colors">{book.title}</h4>
                        <p className="text-xs text-gray-500 mb-6">{book.author}</p>
                        <button 
                          onClick={() => handleReturn(book.id)}
                          className="w-full py-3 bg-white/5 hover:bg-[#d4af37] text-white hover:text-black border border-white/10 hover:border-transparent text-[10px] font-black uppercase tracking-widest rounded-xl transition-all"
                        >
                          Return to Archival
                        </button>
                      </div>
                    ))}
                    {myBooks.length === 0 && (
                      <div className="col-span-full py-20 glass rounded-[2.5rem] border-dashed border-white/5 flex flex-col items-center justify-center">
                         <p className="text-gray-600 text-xs font-bold uppercase tracking-widest">No active loans in your archive</p>
                      </div>
                    )}
                 </div>
               </div>
            </div>
          )}

          {activeTab === 'cctv' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto animate-in fade-in duration-700">
              <div className="lg:col-span-2 space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black text-white uppercase tracking-widest">Live Surveillance Network</h3>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-[10px] font-bold text-gray-500 mono uppercase">Encrypted Feed</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cameraMocks.map(cam => (
                    <CameraFeed key={cam.id} camera={cam} onCapture={(b64) => setCapturedFrame(b64)} />
                  ))}
                </div>
                
                <div className="glass p-8 rounded-[2.5rem] border-white/5">
                   <h4 className="text-xs font-black text-[#ef4444] uppercase tracking-widest mb-6">Threat History & Warning Logs</h4>
                   <div className="space-y-4">
                      {alerts.map(alert => (
                        <div key={alert.id} className={`flex items-center justify-between p-4 rounded-2xl border ${alert.fixed ? 'bg-white/2 border-white/5 opacity-60' : 'bg-red-500/5 border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.05)]'}`}>
                           <div className="flex items-center gap-4">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs ${alert.level === 'CRITICAL' ? 'bg-red-500/20 text-red-500' : 'bg-[#d4af37]/20 text-[#d4af37]'}`}>
                                {alert.level === 'CRITICAL' ? '!' : 'W'}
                              </div>
                              <div>
                                 <p className={`text-[11px] font-black uppercase ${alert.fixed ? 'text-gray-500 line-through' : 'text-white'}`}>{alert.message}</p>
                                 <p className="text-[9px] text-gray-600 mono mt-1">{alert.timestamp} // {alert.fixed ? 'RESOLVED' : 'ACTIVE'}</p>
                              </div>
                           </div>
                           {!alert.fixed && (
                             <button 
                               onClick={() => handleFixAlert(alert.id)}
                               className="px-4 py-2 bg-red-500 text-white text-[9px] font-black uppercase rounded-lg shadow-lg"
                             >
                               Fix Threat
                             </button>
                           )}
                           {alert.fixed && (
                             <span className="text-[9px] font-black text-green-500 uppercase tracking-widest px-4">Resolved</span>
                           )}
                        </div>
                      ))}
                   </div>
                </div>
              </div>
              <div className="space-y-6 h-full">
                <AIAssistant 
                  capturedImage={capturedFrame} 
                  onClear={() => setCapturedFrame(null)} 
                  incidents={alerts} 
                />
              </div>
            </div>
          )}

          {(activeTab === 'dashboard' || activeTab === 'catalog' || activeTab === 'vault') && (
            <div className="space-y-8 max-w-7xl mx-auto animate-in fade-in duration-700">
              {activeTab === 'dashboard' && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {[
                    { label: 'Total Volume', value: stats.totalBooks, sub: 'Indexed', color: 'text-white' },
                    { label: 'Circulating', value: stats.borrowed, sub: 'Loans', color: 'text-[#d4af37]' },
                    { label: 'Security Threats', value: stats.securityIncidents, sub: 'Active', color: 'text-red-500' },
                    { label: 'Trust Avg', value: '96.2%', sub: 'System Health', color: 'text-green-500' },
                  ].map((stat, i) => (
                    <div key={i} className="glass p-6 rounded-2xl border border-white/5 hover:border-[#d4af37]/30 transition-all">
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">{stat.label}</p>
                      <div className="flex items-baseline justify-between">
                        <h4 className={`text-3xl font-black ${stat.color} tracking-tighter`}>{stat.value}</h4>
                        <span className="text-[9px] font-bold text-gray-600 uppercase mono">{stat.sub}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6 min-w-0">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 ${activeTab === 'vault' ? 'bg-blue-500' : 'bg-[#d4af37]'}`}></span>
                        {activeTab === 'vault' ? 'Restricted Records' : 'Unified Catalog'}
                      </h3>
                      <input 
                        type="text" 
                        placeholder="Search Title or Author..." 
                        className="bg-white/5 border border-white/5 rounded-lg px-4 py-2 text-xs focus:outline-none focus:border-[#d4af37]/40 w-64 text-white"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-wrap gap-1 p-2 glass rounded-xl overflow-x-auto min-h-[3rem]">
                      {['ALL', ...alphabet].map(letter => (
                        <button 
                          key={letter}
                          onClick={() => setActiveLetter(letter)}
                          className={`w-7 h-7 flex items-center justify-center rounded text-[10px] font-bold transition-all shrink-0 ${activeLetter === letter ? 'bg-[#d4af37] text-black' : 'hover:bg-white/5 text-gray-500'}`}
                        >
                          {letter}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredBooks.map(book => (
                      <div 
                        key={book.id} 
                        onClick={() => setSelectedBook(book)}
                        className={`p-5 glass rounded-2xl border transition-all cursor-pointer group relative overflow-hidden ${selectedBook?.id === book.id ? 'border-[#d4af37] bg-[#d4af37]/5' : 'hover:border-white/20'}`}
                      >
                        {book.securityLevel > 3 && (
                          <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none opacity-10">
                             <div className="absolute rotate-45 bg-red-500 text-white text-[8px] font-black w-24 text-center top-4 -right-6">RESTRICTED</div>
                          </div>
                        )}
                        <div className="flex justify-between items-start mb-3">
                          <div className={`text-[9px] px-2 py-0.5 rounded font-bold mono ${
                            book.status === 'AVAILABLE' ? 'bg-green-500/10 text-green-500' :
                            book.status === 'VAULTED' ? 'bg-blue-500/10 text-blue-500' :
                            'bg-[#d4af37]/10 text-[#d4af37]'
                          }`}>
                            {book.status}
                          </div>
                          <span className="text-[10px] font-bold text-gray-600 mono">LVL-{book.securityLevel}</span>
                        </div>
                        <h4 className="text-sm font-bold text-white group-hover:text-[#d4af37] transition-colors">{book.title}</h4>
                        <p className="text-xs text-gray-500 mt-1">{book.author}</p>
                        
                        <div className="mt-4 flex gap-2">
                           {book.status === 'AVAILABLE' && (
                             <button 
                              onClick={(e) => { e.stopPropagation(); handleBorrow(book.id); }}
                              className="px-3 py-1 bg-[#d4af37]/10 hover:bg-[#d4af37] text-[#d4af37] hover:text-black text-[9px] font-black uppercase rounded transition-all"
                             >
                               Borrow
                             </button>
                           )}
                           {book.status === 'BORROWED' && (
                             <button 
                              onClick={(e) => { e.stopPropagation(); handleReturn(book.id); }}
                              className="px-3 py-1 bg-white/5 hover:bg-white/10 text-white text-[9px] font-black uppercase rounded transition-all"
                             >
                               Return
                             </button>
                           )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {activeTab === 'dashboard' && (
                    <div className="glass p-6 rounded-2xl h-80 relative overflow-hidden border border-white/5">
                      <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-4">Traffic vs. Verification Pulse</h4>
                      <div className="w-full h-full min-h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                            <XAxis dataKey="day" stroke="rgba(255,255,255,0.2)" fontSize={10} axisLine={false} tickLine={false} />
                            <Tooltip contentStyle={{ backgroundColor: '#111', border: '1px solid #d4af37', fontSize: '12px' }} />
                            <Area type="monotone" dataKey="active" stroke="#d4af37" fill="rgba(212,175,55,0.05)" strokeWidth={2} />
                            <Area type="step" dataKey="threats" stroke="#3b82f6" fill="rgba(59,130,246,0.05)" strokeWidth={2} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-8">
                  <DigitalLibrarian 
                    selectedBook={selectedBook} 
                    onClear={() => setSelectedBook(null)}
                    stats={stats}
                  />

                  <div className="glass rounded-2xl overflow-hidden border border-white/5">
                    <div className="p-4 border-b border-white/5 bg-white/5 flex justify-between items-center">
                      <h3 className="text-[10px] font-bold text-white uppercase tracking-widest">Access Ledger</h3>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                    <div className="p-4 space-y-3">
                      {MOCK_SECURITY_LOGS.map((log, i) => (
                        <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-white/2 border border-white/5">
                          <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-white uppercase tracking-tight">{log.action}</span>
                            <span className="text-[9px] text-gray-500 mono">{log.subject}</span>
                          </div>
                          <div className={`text-[9px] font-bold mono ${log.status === 'VERIFIED' ? 'text-green-500' : 'text-red-500'}`}>
                            {log.status}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'seats' && (
            <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-black text-white tracking-tighter uppercase">Reading Room Status</h3>
                  <p className="text-gray-500 text-sm">Real-time occupancy tracking for study zones.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {seats.map(seat => (
                  <div key={seat.id} className={`glass p-6 rounded-[2rem] border transition-all relative group ${
                    seat.status === 'AVAILABLE' ? 'hover:border-green-500/40' :
                    seat.status === 'OCCUPIED' ? 'border-[#d4af37]/20 opacity-80' :
                    seat.status === 'RESERVED' ? 'border-blue-500/20' :
                    'opacity-50 grayscale'
                  }`}>
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex flex-col">
                        <span className="text-3xl font-black text-white mono">{seat.number}</span>
                        <div className={`text-[8px] font-black uppercase mt-1 px-1.5 py-0.5 rounded border ${seat.isAC ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : 'bg-orange-500/10 border-orange-500/30 text-orange-400'}`}>
                          {seat.isAC ? 'Climate Control (AC)' : 'Standard (Non-AC)'}
                        </div>
                      </div>
                      <div className="flex gap-1.5">
                        {seat.isAC && (
                           <div className="bg-blue-500/10 p-1.5 rounded-lg border border-blue-500/20">
                            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707" />
                            </svg>
                          </div>
                        )}
                        {seat.powerOutlet && (
                          <div className="bg-[#d4af37]/10 p-1.5 rounded-lg border border-[#d4af37]/20">
                             <svg className="w-4 h-4 text-[#d4af37]" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.381z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">{seat.zone}</p>
                        <div className={`text-[10px] font-black mono px-2 py-0.5 rounded inline-block mt-1 ${
                          seat.status === 'AVAILABLE' ? 'bg-green-500/10 text-green-500' :
                          seat.status === 'OCCUPIED' ? 'bg-[#d4af37]/10 text-[#d4af37]' :
                          'bg-blue-500/10 text-blue-500'
                        }`}>
                          {seat.status}
                        </div>
                      </div>

                      {seat.status === 'AVAILABLE' && (
                        <button 
                          onClick={() => handleReserveSeat(seat.id)}
                          className="w-full py-3 bg-green-500/10 hover:bg-green-500 text-green-500 hover:text-black text-[10px] font-black uppercase tracking-widest rounded-xl transition-all"
                        >
                          Book Now
                        </button>
                      )}
                      {seat.status === 'RESERVED' && seat.currentUser === currentUser.id && (
                        <button 
                          onClick={() => handleCancelSeat(seat.id)}
                          className="w-full py-3 bg-white/5 hover:bg-red-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all"
                        >
                          Cancel Booking
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'members' && (
             <div className="max-w-7xl mx-auto animate-in fade-in duration-700">
               <div className="flex items-center justify-between mb-10">
                 <div>
                   <h2 className="text-2xl font-black text-white tracking-tighter uppercase">Member Registry</h2>
                   <p className="text-gray-500 text-sm">Managing authorized archivist profiles.</p>
                 </div>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {members.map(member => (
                   <div key={member.id} className="glass p-6 rounded-[2rem] border-white/5 flex flex-col gap-4">
                     <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-xl bg-[#d4af37]/10 flex items-center justify-center text-lg font-black text-[#d4af37]">
                         {member.name.charAt(0)}
                       </div>
                       <div>
                         <h4 className="text-sm font-bold text-white">{member.name}</h4>
                         <p className="text-[10px] text-gray-500 mono">{member.id}</p>
                       </div>
                       <div className="ml-auto">
                         <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 text-[8px] font-black uppercase mono">{member.role}</span>
                       </div>
                     </div>
                     <div className="grid grid-cols-2 gap-4 mt-2">
                       <div className="p-3 bg-white/2 rounded-xl">
                         <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Trust Index</p>
                         <p className="text-xs font-bold text-[#d4af37] mono">{member.trustScore}%</p>
                       </div>
                       <div className="p-3 bg-white/2 rounded-xl">
                         <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Status</p>
                         <p className="text-xs font-bold text-white mono uppercase">{member.status}</p>
                       </div>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
          )}

          {activeTab === 'settings' && (
            <div className="max-w-4xl mx-auto glass p-10 rounded-[3rem] border border-white/5 animate-in slide-in-from-bottom-10 duration-700">
              <h3 className="text-2xl font-black mb-2 text-white tracking-tighter">TRUST CONFIGURATION</h3>
              <p className="text-gray-500 text-sm mb-10">Configure multi-layered security protocols for the Alexandria Archival Network.</p>
              
              <div className="space-y-6">
                {[
                  { title: 'Biometric Forced Verification', desc: 'Require retina or fingerprint scan for any Level-3+ assets.', toggle: true },
                  { title: 'Quantum Encryption (AES-512)', desc: 'Encrypt all digital loan tokens with rotating quantum keys.', toggle: true },
                  { title: 'Vault Lockdown Protocol', desc: 'Automatically seal all physical vault gates if risk score exceeds 40%.', toggle: false },
                  { title: 'Anonymized Researcher Mode', desc: 'Mask researcher identities in public logs while maintaining internal audit trails.', toggle: true },
                  { title: 'Metadata Purge Frequency', desc: 'Auto-wipe loan history after a set period of years.', value: 'Life time' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-6 bg-white/2 rounded-2xl border border-white/5 hover:border-[#d4af37]/20 transition-all">
                    <div>
                      <h5 className="font-bold text-white text-sm">{item.title}</h5>
                      <p className="text-xs text-gray-500 mt-1 max-w-sm">{item.desc}</p>
                    </div>
                    {item.value ? (
                      <span className="text-[10px] font-black text-[#d4af37] mono uppercase">{item.value}</span>
                    ) : (
                      <div 
                        className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${item.toggle ? 'bg-[#d4af37]' : 'bg-gray-800'}`}
                        onClick={() => {}} 
                      >
                        <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${item.toggle ? 'right-1' : 'left-1'}`}></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
