
import React, { useState, useEffect } from 'react';
import { getBookSummary, getLibraryInsights, getSecurityAssessment } from '../services/geminiService';
import { MOCK_SECURITY_LOGS } from '../constants';

interface DigitalLibrarianProps {
  selectedBook: any | null;
  onClear: () => void;
  stats: any;
}

const DigitalLibrarian: React.FC<DigitalLibrarianProps> = ({ selectedBook, onClear, stats }) => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [securityBrief, setSecurityBrief] = useState<string>("");

  useEffect(() => {
    const fetchBriefing = async () => {
      const text = await getSecurityAssessment(MOCK_SECURITY_LOGS);
      setSecurityBrief(text);
    };
    fetchBriefing();
  }, []);

  const runAnalysis = async () => {
    if (!selectedBook) return;
    setLoading(true);
    const result = await getBookSummary(selectedBook.title, selectedBook.author);
    setAnalysis(result);
    setLoading(false);
  };

  useEffect(() => {
    if (selectedBook) runAnalysis();
    else setAnalysis(null);
  }, [selectedBook]);

  return (
    <div className="glass rounded-2xl border border-white/10 flex flex-col h-full overflow-hidden">
      <div className="p-5 border-b border-white/5 flex justify-between items-center bg-white/5">
        <h3 className="font-bold flex items-center gap-3 text-sm tracking-widest text-[#d4af37]">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          TRUST GUARDIAN AI
        </h3>
        {selectedBook && (
          <button onClick={onClear} className="text-[10px] text-gray-500 hover:text-white uppercase mono tracking-widest">
            Close
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        {!selectedBook ? (
          <div className="h-full flex flex-col space-y-6">
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-[#d4af37]/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#d4af37]/20">
                <svg className="w-8 h-8 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="text-gray-400 font-bold text-sm uppercase tracking-widest">Verification Required</h4>
              <p className="text-xs text-gray-600 leading-relaxed mt-2 italic">
                Scanning for unauthorized metadata. Select a volume to initiate trust validation.
              </p>
            </div>

            <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/10">
              <p className="text-[10px] font-bold text-blue-400 uppercase mb-3 tracking-widest">Vault Security Brief</p>
              <div className="text-xs text-gray-400 leading-relaxed font-medium">
                {securityBrief || "Connecting to Secure Archival Core..."}
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
            <div className="p-4 bg-[#d4af37]/5 border border-[#d4af37]/20 rounded-xl">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-xs font-black text-[#d4af37] uppercase tracking-[0.2em]">Archival Analysis</h4>
                <div className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 text-[9px] font-bold mono">VERIFIED</div>
              </div>
              
              {loading ? (
                <div className="space-y-3">
                  <div className="h-2 w-3/4 bg-white/10 rounded animate-pulse"></div>
                  <div className="h-2 w-1/2 bg-white/10 rounded animate-pulse"></div>
                </div>
              ) : (
                <div className="text-xs text-gray-300 leading-loose whitespace-pre-wrap font-medium">
                  {analysis}
                </div>
              )}
            </div>
            
            <div className="p-4 border border-white/5 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Trust ID</p>
                <p className="text-xs text-white mono mt-0.5">{selectedBook.id}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Sec Level</p>
                <p className="text-xs text-[#d4af37] mono mt-0.5">LVL-0{selectedBook.securityLevel}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DigitalLibrarian;
