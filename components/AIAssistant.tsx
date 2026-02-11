
import React, { useState, useEffect } from 'react';
import { analyzeSecurityFrame, getExecutiveBriefing } from '../services/geminiService';

interface AIAssistantProps {
  capturedImage: string | null;
  onClear: () => void;
  incidents: any[];
}

const AIAssistant: React.FC<AIAssistantProps> = ({ capturedImage, onClear, incidents }) => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [briefing, setBriefing] = useState<string>("");

  useEffect(() => {
    const fetchBriefing = async () => {
      const text = await getExecutiveBriefing(incidents);
      setBriefing(text);
    };
    fetchBriefing();
  }, [incidents]);

  const runAnalysis = async () => {
    if (!capturedImage) return;
    setLoading(true);
    const result = await analyzeSecurityFrame(capturedImage, "High-security executive facility");
    setAnalysis(result);
    setLoading(false);
  };

  useEffect(() => {
    if (capturedImage) runAnalysis();
  }, [capturedImage]);

  return (
    <div className="glass rounded-2xl border border-white/10 flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
        <h3 className="font-bold flex items-center gap-2">
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          SENTINEL ANALYSIS
        </h3>
        {capturedImage && (
          <button onClick={onClear} className="text-[10px] text-gray-400 hover:text-white uppercase mono tracking-widest">
            Dismiss
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {!capturedImage && (
          <div className="h-full flex flex-col items-center justify-center text-center p-6">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h4 className="text-gray-400 font-medium mb-2">No Active Target</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Capture a frame from any CCTV feed for immediate AI-powered threat assessment and verification.
            </p>
            <div className="mt-8 text-left w-full space-y-4">
              <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                <p className="text-[10px] font-bold text-green-500 uppercase mb-2 tracking-widest">Executive Briefing</p>
                <div className="text-[11px] text-gray-300 leading-relaxed italic">
                  {briefing || "Gathering intelligence..."}
                </div>
              </div>
            </div>
          </div>
        )}

        {capturedImage && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="aspect-video rounded-xl overflow-hidden border border-white/20 relative group">
              <img src={`data:image/jpeg;base64,${capturedImage}`} className="w-full h-full object-cover" alt="Captured Frame" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-3 text-[10px] font-bold text-white mono uppercase bg-black/40 backdrop-blur px-2 py-1 rounded">
                Target Verification Phase
              </div>
            </div>

            <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">AI Result</span>
                {loading && (
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-green-500 rounded-full animate-bounce"></div>
                    <div className="w-1 h-1 bg-green-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1 h-1 bg-green-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                )}
              </div>
              
              <div className="text-sm text-gray-200 leading-relaxed whitespace-pre-wrap mono">
                {loading ? "Neural processing in progress..." : analysis}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAssistant;
