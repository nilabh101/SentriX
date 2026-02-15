"use client";
import AlertList from "@/components/AlertList";
import Link from 'next/link';

export default function SecurityPage() {
    return (
        <main className="min-h-screen p-8 md:p-16 max-w-7xl mx-auto">
            <header className="mb-12 flex justify-between items-end">
                <div>
                    <Link href="/" className="text-xs font-mono text-blue-400 hover:text-blue-300 transition-colors uppercase mb-4 block">
                        &larr; Back to Hub
                    </Link>
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                        SentriX SOC
                    </h1>
                    <p className="text-gray-400 mt-2 font-mono text-sm">
                        AI-Powered Alert Triage & Response
                    </p>
                </div>
                <div className="text-right hidden md:block">
                    <div className="text-xs font-mono text-blue-400/60 uppercase">System Status</div>
                    <div className="text-emerald-400 font-mono flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        Operational
                    </div>
                </div>
            </header>

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <span className="w-1 h-6 bg-primary rounded-full"></span>
                    Active Alerts
                </h2>
                <AlertList />
            </div>
        </main>
    );
}
