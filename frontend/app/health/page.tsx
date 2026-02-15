"use client";
import React from 'react';
import Link from 'next/link';
import XtractCard from '@/components/XtractCard';
import { useRouter } from 'next/navigation';

export default function HealthPage() {
    const router = useRouter();

    const handleQuery = (text: string) => {
        router.push(`/?q=${encodeURIComponent(text)}`);
    };

    return (
        <main className="min-h-screen bg-black text-white p-8 md:p-24 max-w-7xl mx-auto pb-48 relative z-20">
            <header className="mb-32 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                <div>
                    <Link href="/" className="text-[10px] font-mono text-zinc-500 hover:text-white transition-colors uppercase tracking-widest block mb-12">
                        &larr; Return to Hub
                    </Link>
                    <h1 className="text-6xl font-bold tracking-tight mb-6">SwasthyaAgent</h1>
                    <p className="text-zinc-500 text-lg max-w-2xl leading-relaxed">
                        AI-powered symptom checking, healthcare scheme navigation, and primary care locator for every citizen.
                    </p>
                </div>
                <div className="hidden md:block">
                    <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-3">Health Status</div>
                    <div className="text-white text-xs font-bold font-mono flex items-center gap-2 justify-end uppercase tracking-widest">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Online
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <XtractCard className="p-12" onClick={() => handleQuery("Details about PM-JAY Ayushman Bharat eligibility")}>
                    <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-6">Active Scheme</div>
                    <h3 className="text-3xl font-bold mb-6">Ayushman Bharat</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-10">
                        Check your eligibility for the world's largest health insurance scheme.
                    </p>
                    <div className="text-[10px] font-mono border border-white/10 px-6 py-3 rounded-xl uppercase tracking-widest inline-block">
                        Check Eligibility
                    </div>
                </XtractCard>

                <XtractCard className="p-12" onClick={() => handleQuery("I have a persistent cough and fever for 3 days. What should I do?")}>
                    <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-6">Emergency Tool</div>
                    <h3 className="text-3xl font-bold mb-6">Symptom Checker</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-10">
                        AI guidance for common symptoms and finding nearby PHCs.
                    </p>
                    <div className="text-[10px] font-mono border border-white/10 px-6 py-3 rounded-xl uppercase tracking-widest inline-block">
                        Start Checkup
                    </div>
                </XtractCard>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <XtractCard className="p-8" onClick={() => handleQuery("Where is my nearest Jan Aushadhi Kendra for cheap medicines?")}>
                    <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-4">Affordable Care</div>
                    <h4 className="text-xl font-bold mb-4">Jan Aushadhi</h4>
                    <p className="text-zinc-500 text-xs mb-8 uppercase tracking-widest font-mono">Get generic medicines at 90% lower cost.</p>
                </XtractCard>

                <XtractCard className="p-8" onClick={() => handleQuery("Mental health support and Tele-MANAS helpline numbers")}>
                    <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-4">Support</div>
                    <h4 className="text-xl font-bold mb-4">Tele-MANAS</h4>
                    <p className="text-zinc-500 text-xs mb-8 uppercase tracking-widest font-mono">24/7 mental health counseling for all.</p>
                </XtractCard>

                <XtractCard className="p-8" onClick={() => handleQuery("Pradhan Mantri Matru Vandana Yojana benefits for women")}>
                    <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-4">Maternal</div>
                    <h4 className="text-xl font-bold mb-4">PMMVY</h4>
                    <p className="text-zinc-500 text-xs mb-8 uppercase tracking-widest font-mono">Financial aid for pregnant women.</p>
                </XtractCard>
            </div>

            <XtractCard className="p-12 overflow-hidden relative">
                <div className="relative z-10 w-full">
                    <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-6">Nearby Care</div>
                    <div className="h-48 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center text-zinc-500 font-mono text-xs uppercase tracking-widest">
                        Interactive PHC Map Loading...
                    </div>
                    <div className="mt-8 flex justify-center">
                        <button
                            onClick={() => handleQuery("Locate all PHCs in my district")}
                            className="bg-white text-black font-bold px-10 py-3 rounded-xl transition-all hover:bg-zinc-200 uppercase text-xs tracking-widest font-mono"
                        >
                            Find Local Clinics
                        </button>
                    </div>
                </div>
            </XtractCard>
        </main>
    );
}
