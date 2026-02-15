"use client";
import React, { useEffect, useState } from 'react';
import { Alert, Triage, fetchTriage } from '@/lib/api';

interface TriageModalProps {
    alert: Alert;
    onClose: () => void;
}

const TriageModal: React.FC<TriageModalProps> = ({ alert, onClose }) => {
    const [triage, setTriage] = useState<Triage | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTriage = async () => {
            try {
                const data = await fetchTriage(alert.id);
                setTriage(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadTriage();
    }, [alert.id]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/90 backdrop-blur-3xl">
            <div className="bg-[#0c0c0c] w-full max-w-2xl rounded-[32px] border border-white/5 overflow-hidden animate-in fade-in zoom-in duration-500 shadow-2xl">
                <div className="p-10 border-b border-white/5 flex justify-between items-center">
                    <div>
                        <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-2">Security Analysis</div>
                        <h2 className="text-2xl font-bold">AI Triage Results</h2>
                    </div>
                    <button onClick={onClose} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-500 hover:text-white transition-colors">&times;</button>
                </div>

                <div className="p-10 max-h-[60vh] overflow-y-auto custom-scrollbar">
                    {loading ? (
                        <div className="text-center py-20 text-zinc-500 font-mono text-[10px] uppercase tracking-widest animate-pulse">Consulting Analysis Engine...</div>
                    ) : triage ? (
                        <div className="space-y-12">
                            <div className="flex items-center justify-between p-8 bg-white/[0.02] rounded-2xl border border-white/5">
                                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Priority Score</span>
                                <span className="text-4xl font-bold">{triage.priority_score}<span className="text-lg text-zinc-700">/10</span></span>
                            </div>

                            <div>
                                <h4 className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-6">Analyst Explanation</h4>
                                <p className="text-zinc-400 leading-relaxed text-sm font-light">{triage.explanation}</p>
                            </div>

                            <div>
                                <h4 className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-6">Protocol Recommendation</h4>
                                <div className="p-6 border border-white/10 rounded-2xl bg-white/[0.01]">
                                    <p className="text-white text-sm font-medium leading-relaxed">{triage.recommended_action}</p>
                                </div>
                            </div>

                            {triage.threat_actor && (
                                <div>
                                    <h4 className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-6">Source/Actor Attribution</h4>
                                    <span className="px-5 py-2 border border-white/10 rounded-full text-[10px] font-mono uppercase tracking-widest text-white/60">
                                        {triage.threat_actor}
                                    </span>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="text-center py-20 text-white font-mono text-[10px] uppercase tracking-widest">
                            No analysis data detected.
                        </div>
                    )}
                </div>

                <div className="p-10 border-t border-white/5 text-right">
                    <button
                        onClick={onClose}
                        className="px-10 py-3 bg-white text-black font-bold rounded-xl transition-all hover:bg-zinc-200 uppercase text-[10px] tracking-widest"
                    >
                        Dismiss Analysis
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TriageModal;
