"use client";
import React from 'react';
import Link from 'next/link';

const LegalPage: React.FC = () => {
    const commonRights = [
        { title: "RTI (Right to Information)", desc: "Request data from public authorities." },
        { title: "Consumer Protection", desc: "File complaints against unfair trade." },
        { title: "Motor Vehicle Act", desc: "Know your traffic rights and penalties." },
        { title: "Arrest Rights", desc: "Guidelines for fair arrest and detention." }
    ];

    return (
        <main className="min-h-screen p-8 md:p-16 max-w-7xl mx-auto">
            <header className="mb-12">
                <Link href="/" className="text-xs font-mono text-orange-400 hover:text-orange-300 transition-colors uppercase mb-4 block">
                    &larr; Back to Hub
                </Link>
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-500">
                    NyayaAgent Legal Aid
                </h1>
                <p className="text-gray-400 mt-2 font-mono text-sm leading-relaxed">
                    Democratizing Law for every Indian citizen. Simple, Accurate, and Accessible.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {commonRights.map((right, idx) => (
                    <div key={idx} className="glass p-6 rounded-2xl border border-orange-500/10 hover:border-orange-500/30 transition-all cursor-pointer">
                        <h4 className="text-orange-400 font-bold mb-2">{right.title}</h4>
                        <p className="text-gray-500 text-xs">{right.desc}</p>
                    </div>
                ))}
            </div>

            <div className="glass p-12 rounded-3xl border border-white/5 text-center">
                <h2 className="text-2xl font-bold mb-4">Have a Legal Query?</h2>
                <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                    Ask our AI about Indian laws, BNS sections, or how to handle a specific situation.
                    Use the global search on the Home page for an immediate AI triage of your case.
                </p>
                <Link href="/" className="bg-orange-500 hover:bg-orange-400 text-black font-bold px-8 py-3 rounded-xl transition-all">
                    Ask NyayaAgent on Hub
                </Link>
            </div>

            <section className="mt-20">
                <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                    <span className="w-1 h-6 bg-orange-500 rounded-full"></span>
                    Recent Case Triage
                </h3>
                <div className="text-center py-20 text-gray-600 font-mono border-2 border-dashed border-white/5 rounded-2xl">
                    Start a new query on the Hub to see your legal triage here.
                </div>
            </section>
        </main>
    );
};

export default LegalPage;
