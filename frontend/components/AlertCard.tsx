"use client";
import React, { useState } from 'react';
import { Alert, startTriage } from '@/lib/api';
import TriageModal from './TriageModal';

interface AlertCardProps {
    alert: Alert;
    onRefresh: () => void;
}

const AlertCard: React.FC<AlertCardProps> = ({ alert, onRefresh }) => {
    const [showModal, setShowModal] = useState(false);
    const severityColors: Record<string, string> = {
        Low: 'text-blue-400 border-blue-400/20',
        Medium: 'text-yellow-400 border-yellow-400/20',
        High: 'text-orange-400 border-orange-400/20',
        Critical: 'text-red-400 border-red-400/20',
    };

    const handleTriage = async () => {
        try {
            await startTriage(alert.id);
            onRefresh();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <div
                onClick={() => alert.status === 'Triaged' && setShowModal(true)}
                className={`glass p-6 rounded-xl border border-white/10 ${alert.status === 'Triaged' ? 'cursor-pointer' : ''} card-hover transition-all duration-300`}
            >
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <span className={`text-xs font-mono px-2 py-1 rounded border ${severityColors[alert.severity] || 'text-gray-400 border-gray-400/20'}`}>
                            {alert.severity.toUpperCase()}
                        </span>
                        <h3 className="text-xl font-semibold mt-2">{alert.title}</h3>
                    </div>
                    <span className="text-xs text-gray-400 font-mono">
                        {new Date(alert.timestamp).toLocaleTimeString()}
                    </span>
                </div>

                <p className="text-gray-400 text-sm mb-6 line-clamp-2">
                    {alert.description}
                </p>

                <div className="flex justify-between items-center">
                    <span className="text-xs font-mono text-blue-400/70">{alert.source}</span>
                    {alert.status === 'Pending' ? (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleTriage();
                            }}
                            className="px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary text-xs font-semibold rounded-lg border border-primary/20 transition-all"
                        >
                            Run AI Triage
                        </button>
                    ) : (
                        <span className="text-xs font-mono text-accent">{alert.status}</span>
                    )}
                </div>
            </div>

            {showModal && (
                <TriageModal alert={alert} onClose={() => setShowModal(false)} />
            )}
        </>
    );
};

export default AlertCard;
