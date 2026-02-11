
import React, { useState } from 'react';
import { CEO_ANALYTICS, MOCK_MEMBERS, MOCK_ALERTS } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { SecurityAlert } from '../types';

const data = [
  { name: 'Jan', exp: 400, rev: 240 },
  { name: 'Feb', exp: 300, rev: 139 },
  { name: 'Mar', exp: 200, rev: 980 },
  { name: 'Apr', exp: 278, rev: 390 },
  { name: 'May', exp: 189, rev: 480 },
  { name: 'Jun', exp: 239, rev: 380 },
];

const COLORS = ['#d4af37', '#3b82f6', '#22c55e', '#ef4444'];

const CEODashboard: React.FC = () => {
  const [activeAlerts, setActiveAlerts] = useState<SecurityAlert[]>(MOCK_ALERTS);

  const toggleAlert = (id: string) => {
    setActiveAlerts(prev => prev.map(a => a.id === id ? { ...a, fixed: !a.fixed } : a));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tighter">EXECUTIVE COMMAND</h2>
          <p className="text-gray-500 text-sm mt-1">PAR LIBRARY Master Archivist Control</p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-2 bg-red-600/10 border border-red-600/30 text-red-500 text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-red-600 hover:text-white transition-all">
            Initiate Full Lockdown
          </button>
          <button className="px-6 py-2 bg-[#d4af37] text-black text-[10px] font-black uppercase tracking-widest rounded-lg shadow-[0_0_20px_rgba(212,175,55,0.2)]">
            Export Archival Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {[
          { label: 'Annual Revenue', value: `$${(CEO_ANALYTICS.revenue / 1000000).toFixed(1)}M`, sub: '+12% YoY', color: 'text-[#d4af37]' },
          { label: 'OPEX', value: `$${(CEO_ANALYTICS.operatingCosts / 1000).toFixed(0)}K`, sub: '-5% Efficiency', color: 'text-blue-400' },
          { label: 'Network Load', value: CEO_ANALYTICS.networkLoad, sub: 'Stable', color: 'text-green-500' },
          { label: 'Security Grade', value: CEO_ANALYTICS.securityGrade, sub: 'Military Tier', color: 'text-red-500' },
          { label: 'Active Staff', value: CEO_ANALYTICS.staffCount, sub: 'Nodes Active', color: 'text-white' },
          { label: 'Acquisition', value: `$${(CEO_ANALYTICS.acquisitionBudget / 1000000).toFixed(1)}M`, sub: 'Remaining', color: 'text-[#d4af37]/60' },
        ].map((stat, i) => (
          <div key={i} className="glass p-5 rounded-2xl border-white/5">
            <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">{stat.label}</p>
            <h4 className={`text-xl font-black ${stat.color} tracking-tighter`}>{stat.value}</h4>
            <p className="text-[8px] font-bold text-gray-600 mt-1 uppercase mono">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass p-8 rounded-[2rem] border-white/5 flex flex-col min-h-[400px]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xs font-black text-white uppercase tracking-widest">Financial Archival History</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#d4af37] rounded-full"></div>
                <span className="text-[9px] font-bold text-gray-500 uppercase">Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-[9px] font-bold text-gray-500 uppercase">Expenditure</span>
              </div>
            </div>
          </div>
          <div className="flex-1 min-h-[300px] w-full min-w-0">
            <ResponsiveContainer width="99%" height="100%">
              <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis stroke="rgba(255,255,255,0.2)" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{ fill: 'rgba(212,175,55,0.05)' }}
                  contentStyle={{ backgroundColor: '#111', border: '1px solid #d4af37', borderRadius: '8px', fontSize: '10px' }} 
                />
                <Bar dataKey="rev" fill="#d4af37" radius={[4, 4, 0, 0]} barSize={24} />
                <Bar dataKey="exp" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass p-8 rounded-[2rem] border-white/5 flex flex-col min-h-[400px]">
          <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6">Warning Control Matrix</h3>
          <p className="text-[10px] text-gray-500 mb-6 uppercase tracking-widest leading-relaxed">Toggle active system-wide protocols and warnings.</p>
          <div className="space-y-4">
            {activeAlerts.map(alert => (
              <div key={alert.id} className="flex items-center justify-between p-4 bg-white/2 rounded-xl border border-white/5">
                <div>
                  <p className={`text-[10px] font-black uppercase ${alert.level === 'CRITICAL' ? 'text-red-500' : 'text-[#d4af37]'}`}>{alert.level}</p>
                  <p className="text-[9px] text-gray-400 mt-1 line-clamp-1">{alert.message}</p>
                </div>
                <button 
                  onClick={() => toggleAlert(alert.id)}
                  className={`w-10 h-5 rounded-full relative transition-colors ${alert.fixed ? 'bg-gray-800' : 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]'}`}
                >
                  <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${alert.fixed ? 'left-1' : 'right-1'}`}></div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="glass p-8 rounded-[2rem] border-white/5">
        <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6">Prominent Personnel Registry</h3>
        <div className="overflow-x-auto min-w-0">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5">
                <th className="pb-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Identify</th>
                <th className="pb-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Archive Role</th>
                <th className="pb-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Trust Index</th>
                <th className="pb-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Status</th>
                <th className="pb-4 text-[10px] font-black text-gray-500 uppercase tracking-widest text-right">Overrides</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {MOCK_MEMBERS.map(member => (
                <tr key={member.id} className="hover:bg-white/2 transition-colors group">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[10px] font-black text-[#d4af37] group-hover:bg-[#d4af37]/10 transition-colors">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">{member.name}</p>
                        <p className="text-[9px] text-gray-600 mono">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">{member.role}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 w-16 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-[#d4af37]" style={{ width: `${member.trustScore}%` }}></div>
                      </div>
                      <span className="text-[9px] font-black text-white mono">{member.trustScore}%</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 text-[8px] font-black uppercase mono">Clearance S</span>
                  </td>
                  <td className="py-4 text-right">
                    <button className="text-[9px] font-black text-[#d4af37] uppercase tracking-widest hover:text-white transition-colors">Revoke Access</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CEODashboard;
