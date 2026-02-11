
import React, { useState } from 'react';
import { AttendanceRecord, Member } from '../types';
import { MOCK_ATTENDANCE, MOCK_MEMBERS } from '../constants';

interface AttendanceManagerProps {
  currentUser: Member;
}

const AttendanceManager: React.FC<AttendanceManagerProps> = ({ currentUser }) => {
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(MOCK_ATTENDANCE);
  const [members, setMembers] = useState<Member[]>(MOCK_MEMBERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<'ALL' | 'ACADEMIC' | 'NON_ACADEMIC'>('ALL');

  const stats = {
    present: members.filter(m => m.status === 'ACTIVE').length,
    absent: members.filter(m => m.status === 'ABSENT').length,
    patients: members.filter(m => m.status === 'MEDICAL_LEAVE').length,
  };

  const markStatus = (memberId: string, status: 'PRESENT' | 'ABSENT' | 'PATIENT') => {
    const newRecord: AttendanceRecord = {
      id: `ATT-${Math.random().toString(36).substr(2, 9)}`,
      memberId,
      date: new Date().toISOString().split('T')[0],
      checkIn: status === 'PRESENT' ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '00:00',
      status: status === 'PRESENT' ? 'PRESENT' : status === 'PATIENT' ? 'PATIENT' : 'ABSENT',
      notes: status === 'PATIENT' ? 'Logged as Medical Leave' : ''
    };
    
    setAttendance([newRecord, ...attendance]);
    setMembers(prev => prev.map(m => m.id === memberId ? { 
      ...m, 
      status: status === 'PRESENT' ? 'ACTIVE' : status === 'PATIENT' ? 'MEDICAL_LEAVE' : 'ABSENT' 
    } : m));
  };

  const filteredMembers = members.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) || m.id.toLowerCase().includes(searchTerm.toLowerCase());
    const isAcademic = ['FACULTY', 'STUDENT', 'ADMIN', 'CEO'].includes(m.role);
    const matchesRole = filterRole === 'ALL' || (filterRole === 'ACADEMIC' && isAcademic) || (filterRole === 'NON_ACADEMIC' && !isAcademic);
    return matchesSearch && matchesRole;
  });

  const canManage = currentUser.role === 'CEO' || currentUser.role === 'ADMIN';

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Status Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/2 p-8 rounded-[2.5rem] border border-white/5">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tighter uppercase">Personnel Pulse & Registry</h2>
          <p className="text-gray-500 text-sm mt-1">Real-time status tracking for faculty, students, and non-academic staff (External).</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="glass px-6 py-3 rounded-2xl border-green-500/20 flex flex-col items-center min-w-[100px]">
            <p className="text-[9px] font-black text-green-500 uppercase tracking-widest mb-1">Present</p>
            <p className="text-2xl font-black text-white mono leading-none">{stats.present}</p>
          </div>
          <div className="glass px-6 py-3 rounded-2xl border-blue-500/20 flex flex-col items-center min-w-[100px]">
            <p className="text-[9px] font-black text-blue-500 uppercase tracking-widest mb-1">Patient Log</p>
            <p className="text-2xl font-black text-white mono leading-none">{stats.patients}</p>
          </div>
          <div className="glass px-6 py-3 rounded-2xl border-red-500/20 flex flex-col items-center min-w-[100px]">
            <p className="text-[9px] font-black text-red-500 uppercase tracking-widest mb-1">Absentees</p>
            <p className="text-2xl font-black text-white mono leading-none">{stats.absent}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Control Panel: Filters & Summary */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass p-6 rounded-[2rem] border-white/5">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Registry Filters</h3>
            <div className="space-y-3">
              <input 
                type="text" 
                placeholder="Search ID/Name..." 
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#d4af37]/40 transition-all mono"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="flex flex-col gap-2 pt-2">
                {[
                  { id: 'ALL', label: 'Universal' },
                  { id: 'ACADEMIC', label: 'Academic' },
                  { id: 'NON_ACADEMIC', label: 'Non-Academic' }
                ].map(opt => (
                  <button 
                    key={opt.id}
                    onClick={() => setFilterRole(opt.id as any)}
                    className={`text-left px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${filterRole === opt.id ? 'bg-[#d4af37] text-black shadow-[0_0_15px_rgba(212,175,55,0.2)]' : 'text-gray-500 hover:bg-white/5'}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="glass p-6 rounded-[2rem] border-white/5 bg-gradient-to-br from-[#d4af37]/5 to-transparent">
             <h3 className="text-[10px] font-black text-[#d4af37] uppercase tracking-widest mb-3">Status Command Center</h3>
             <p className="text-[10px] text-gray-500 leading-relaxed mb-6">
               As an authorized administrator, you can override personnel status to reflect real-world medical or absence events.
             </p>
             <div className="p-4 bg-white/2 border border-white/5 rounded-2xl flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-[9px] font-black text-white uppercase tracking-tighter leading-none">Status: Connected</p>
                  <p className="text-[8px] text-gray-600 uppercase mt-1">Global Sync Active</p>
                </div>
             </div>
          </div>
        </div>

        {/* Right Content Panel: Personnel Ledger */}
        <div className="lg:col-span-3">
          <div className="glass p-8 rounded-[2.5rem] border-white/5 overflow-hidden">
            <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6">Archival Presence Ledger</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="pb-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Personnel</th>
                    <th className="pb-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Type</th>
                    <th className="pb-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Current Pulse</th>
                    {canManage && <th className="pb-4 text-[10px] font-black text-gray-500 uppercase tracking-widest text-right">Rapid Entry</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredMembers.map(member => {
                    const isAcademic = ['FACULTY', 'STUDENT', 'ADMIN', 'CEO'].includes(member.role);
                    return (
                      <tr key={member.id} className="hover:bg-white/2 transition-colors group">
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black border transition-all ${
                              member.status === 'ACTIVE' ? 'bg-green-500/10 border-green-500/30 text-green-500 shadow-[0_0_10px_rgba(34,197,94,0.1)]' :
                              member.status === 'MEDICAL_LEAVE' ? 'bg-blue-500/10 border-blue-500/30 text-blue-500' :
                              'bg-red-500/10 border-red-500/30 text-red-500'
                            }`}>
                              {member.name.charAt(0)}
                            </div>
                            <div>
                              <p className="text-xs font-black text-white">{member.name}</p>
                              <p className="text-[9px] text-gray-500 mono uppercase tracking-widest">{member.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="flex flex-col">
                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{member.role}</span>
                            <span className={`text-[7px] font-black uppercase mt-0.5 ${isAcademic ? 'text-purple-400' : 'text-orange-400'}`}>
                              {isAcademic ? 'Academic Unit' : 'Non-Academic (External)'}
                            </span>
                          </div>
                        </td>
                        <td className="py-4">
                          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${
                            member.status === 'ACTIVE' ? 'bg-green-500/10 border-green-500/20 text-green-500' :
                            member.status === 'MEDICAL_LEAVE' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' :
                            'bg-red-500/10 border-red-500/20 text-red-400'
                          }`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${member.status === 'ACTIVE' ? 'bg-green-500 animate-pulse' : member.status === 'MEDICAL_LEAVE' ? 'bg-blue-500' : 'bg-red-500'}`}></div>
                            <span className="text-[9px] font-black uppercase mono tracking-widest">
                              {member.status.replace('_', ' ')}
                            </span>
                          </div>
                        </td>
                        {canManage && (
                          <td className="py-4 text-right">
                            <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                              <button 
                                onClick={() => markStatus(member.id, 'PRESENT')}
                                title="Mark Present"
                                className="w-8 h-8 bg-green-500/10 hover:bg-green-500 text-green-500 hover:text-white rounded-lg flex items-center justify-center transition-all border border-green-500/20"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                </svg>
                              </button>
                              <button 
                                onClick={() => markStatus(member.id, 'ABSENT')}
                                title="Mark Absent"
                                className="w-8 h-8 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg flex items-center justify-center transition-all border border-red-500/20"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                              <button 
                                onClick={() => markStatus(member.id, 'PATIENT')}
                                title="Log Medical Patient"
                                className="w-8 h-8 bg-blue-500/10 hover:bg-blue-500 text-blue-500 hover:text-white rounded-lg flex items-center justify-center transition-all border border-blue-500/20"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                </svg>
                              </button>
                            </div>
                          </td>
                        )}
                      </tr>
                    );
                  })}
                  {filteredMembers.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-20 text-center">
                        <p className="text-gray-600 text-xs font-bold uppercase tracking-widest italic">No personnel found in current sector</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceManager;
