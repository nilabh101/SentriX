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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="glass w-full max-w-2xl rounded-2xl border border-white/10 overflow-hidden animate-in fade-in zoom-in duration-300">
                <div className="p-6 border-b border-white/10 flex justify-between items-center">
                    <h2 className="text-xl font-bold">AI Triage Details</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">&times;</button>
                </div>

                <div className="p-8 max-h-[70vh] overflow-y-auto">
                    {loading ? (
                        <div className="text-center py-10 text-blue-400 font-mono animate-pulse">Consulting AI Analyst...</div>
                    ) : triage ? (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                                <span className="text-sm font-mono text-blue-400">PRIORITY SCORE</span>
                                <span className="text-3xl font-bold text-blue-400">{triage.priority_score}/10</span>
                            </div>

                            <div>
                                <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">Explanation</h4>
                                <p className="text-gray-300 leading-relaxed text-sm">{triage.explanation}</p>
                            </div>

                            <div>
                                <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">Recommended Action</h4>
                                <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                                    <p className="text-emerald-400 text-sm font-medium">{triage.recommended_action}</p>
                                </div>
                            </div>

                            {triage.threat_actor && (
                                <div>
                                    <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">Potential Threat Actor</h4>
                                    <span className="px-3 py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded-full text-xs font-mono">
                                        {triage.threat_actor}
                                    </span>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="text-center py-10 text-red-400 font-mono">
                            Triage data not yet available. Please trigger AI triage first.
                        </div>
                    )}
                </div>

                <div className="p-6 border-t border-white/10 text-right">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-all"
                    >
                        Dismiss
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TriageModal;
