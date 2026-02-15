"use client";
import React, { useState } from 'react';
import { Alert, startTriage } from '@/lib/api';
import TriageModal from './TriageModal';
import XtractCard from './XtractCard';

interface AlertCardProps {
    alert: Alert;
    onRefresh: () => void;
}

const AlertCard: React.FC<AlertCardProps> = ({ alert, onRefresh }) => {
    const [showModal, setShowModal] = useState(false);

    const [isTriaging, setIsTriaging] = useState(false);

    const handleTriage = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isTriaging) return;

        setIsTriaging(true);
        try {
            await startTriage(alert.id);
            // We poll in AlertList, but let's wait a bit then refresh
            setTimeout(() => {
                onRefresh();
                setIsTriaging(false);
            }, 3000);
        } catch (err) {
            console.error(err);
            setIsTriaging(false);
        }
    };

    return (
        <>
            <XtractCard
                className={`p-10 ${alert.status === 'Triaged' ? 'cursor-pointer' : ''}`}
                onClick={() => alert.status === 'Triaged' && setShowModal(true)}
            >
                <div className="flex justify-between items-start mb-10">
                    <div>
                        <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-4">
                            {alert.severity} / {alert.source}
                        </div>
                        <h3 className="text-2xl font-bold">{alert.title}</h3>
                    </div>
                </div>

                <p className="text-zinc-500 text-sm leading-relaxed mb-12 line-clamp-2">
                    {alert.description}
                </p>

                <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
                        {new Date(alert.timestamp).toLocaleTimeString()}
                    </span>
                    {alert.status === 'Pending' ? (
                        <button
                            onClick={handleTriage}
                            disabled={isTriaging}
                            className="text-[10px] font-mono uppercase tracking-widest text-white border border-white/10 px-6 py-3 rounded-xl hover:bg-white/5 transition-all disabled:opacity-50"
                        >
                            {isTriaging ? "Triaging..." : "Run Triage"}
                        </button>
                    ) : (
                        <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">
                            {alert.status}
                        </span>
                    )}
                </div>
            </XtractCard>

            {showModal && (
                <TriageModal alert={alert} onClose={() => setShowModal(false)} />
            )}
        </>
    );
};

export default AlertCard;
