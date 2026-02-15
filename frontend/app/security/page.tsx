"use client";
import XtractCard from "@/components/XtractCard";
import AlertList from "@/components/AlertList";
import Link from 'next/link';

export default function SecurityPage() {
    return (
        <main className="min-h-screen bg-black text-white p-8 md:p-24 max-w-7xl mx-auto pb-48">
            <header className="mb-32 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                <div>
                    <Link href="/" className="text-[10px] font-mono text-zinc-500 hover:text-white transition-colors uppercase tracking-widest block mb-12">
                        &larr; Return to Hub
                    </Link>
                    <h1 className="text-6xl font-bold tracking-tight mb-6">SentriX SOC</h1>
                    <p className="text-zinc-500 text-lg max-w-2xl leading-relaxed">
                        Automated network triage and real-time threat detection for the Digital India perimeter.
                    </p>
                </div>
                <div className="text-right">
                    <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-3">System Pulse</div>
                    <div className="text-white text-xs font-bold font-mono flex items-center gap-2 justify-end uppercase tracking-widest">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        Operational
                    </div>
                </div>
            </header>

            <section>
                <h2 className="text-[10px] uppercase font-mono tracking-[0.2em] text-zinc-600 mb-12 flex items-center gap-4">
                    Active Alerts
                    <div className="h-[1px] flex-grow bg-white/5" />
                </h2>
                <XtractCard className="p-0 overflow-hidden border-white/10">
                    <AlertList />
                </XtractCard>
            </section>
        </main>
    );
}
