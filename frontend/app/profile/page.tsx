"use client";
import React from 'react';
import { motion } from 'framer-motion';
import XtractCard from '@/components/XtractCard';

export default function ProfilePage() {
    return (
        <main className="min-h-screen bg-black text-white p-8 md:p-24 max-w-7xl mx-auto pb-48">
            <header className="mb-32">
                <h1 className="text-6xl font-bold tracking-tight mb-6">Your Profile</h1>
                <p className="text-zinc-500 text-lg max-w-2xl leading-relaxed">
                    Manage your digital footprint and security posture within the SetuAI network.
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <XtractCard className="lg:col-span-1 text-center py-16">
                    <div className="w-20 h-20 bg-white/5 rounded-full mx-auto mb-8 flex items-center justify-center text-2xl border border-white/10">
                        🇮🇳
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Indian Citizen</h2>
                    <p className="text-zinc-600 font-mono text-[10px] uppercase tracking-widest">Verified / Active</p>
                </XtractCard>

                <XtractCard className="lg:col-span-2">
                    <h3 className="text-lg font-bold mb-10 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        Security Posture
                    </h3>
                    <div className="space-y-10">
                        <div>
                            <div className="flex justify-between items-end mb-4">
                                <span className="text-zinc-500 text-[10px] uppercase tracking-widest font-mono">Encryption</span>
                                <span className="text-white text-xs font-bold uppercase tracking-widest">Secure Pulse On</span>
                            </div>
                            <div className="h-[2px] w-full bg-white/5 overflow-hidden">
                                <div className="h-full bg-white w-[98%]" />
                            </div>
                        </div>
                        <p className="text-zinc-600 text-[10px] leading-relaxed max-w-md uppercase tracking-widest font-mono">
                            Your identity is protected by cross-sector SentriX protocols.
                        </p>
                    </div>
                </XtractCard>
            </div>
        </main>
    );
}
