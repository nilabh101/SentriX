"use client";
import React, { useEffect, useState } from 'react';
import { Alert, fetchAlerts, startTriage } from '@/lib/api';
import AlertCard from './AlertCard';

const AlertList: React.FC = () => {
    const [alerts, setAlerts] = useState<Alert[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadAlerts = React.useCallback(async () => {
        try {
            setLoading(true);
            const data = await fetchAlerts();
            setAlerts(data);
        } catch (err) {
            setError("Failed to load security alerts.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadAlerts();
        // Poll for updates every 10 seconds
        const interval = setInterval(loadAlerts, 10000);
        return () => clearInterval(interval);
    }, [loadAlerts]);

    if (loading && alerts.length === 0) return <div className="text-center py-20 text-blue-400 font-mono animate-pulse uppercase tracking-[0.2em] text-[10px]">Scanning network for threats...</div>;

    if (error) return (
        <div className="text-center py-20">
            <div className="text-red-400 font-mono text-sm mb-6">{error}</div>
            <button
                onClick={loadAlerts}
                className="text-[10px] font-mono border border-white/10 px-6 py-3 rounded-xl uppercase tracking-widest hover:bg-white/5 transition-all"
            >
                Retry Connection
            </button>
        </div>
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {alerts.map((alert) => (
                <AlertCard key={alert.id} alert={alert} onRefresh={loadAlerts} />
            ))}
            {alerts.length === 0 && (
                <div className="col-span-full text-center py-20 text-gray-500 font-mono border border-dashed border-white/10 rounded-2xl mx-12">
                    <div className="text-[10px] uppercase tracking-widest opacity-40">No security alerts detected. System secure.</div>
                </div>
            )}
        </div>
    );
};

export default AlertList;
