"use client";
import React from 'react';
import Link from 'next/link';
import XtractCard from '@/components/XtractCard';
import { useRouter } from 'next/navigation';

const LegalPage: React.FC = () => {
    const router = useRouter();
    const commonRights = [
        { title: "RTI", desc: "Access public records instantly." },
        { title: "Consumer Rights", desc: "Against unfair trade practices." },
        { title: "Cyber Laws", desc: "Protection from identity theft." },
        { title: "BNS / IPC", desc: "Simplified Indian penal code." },
        { title: "Women's Rights", desc: "DV Act and safety protocols." },
        { title: "Child POCSO", desc: "Mandatory protection laws." },
        { title: "Traffic Rights", desc: "Detention and fine guidelines." },
        { title: "Senior Citizens", desc: "Welfare and maintenance act." }
    ];

    const handleQuery = (text: string) => {
        router.push(`/?q=${encodeURIComponent(text)}`);
    };

    return (
        <main className="min-h-screen bg-black text-white p-8 md:p-24 max-w-7xl mx-auto pb-48 relative z-20">
            <header className="mb-32">
                <Link href="/" className="text-[10px] font-mono text-zinc-500 hover:text-white transition-colors uppercase tracking-widest block mb-12">
                    &larr; Return to Hub
                </Link>
                <h1 className="text-6xl font-bold tracking-tight mb-6">NyayaAgent</h1>
                <p className="text-zinc-500 text-lg max-w-2xl leading-relaxed">
                    Simplified Indian law (BNS/IPC) for the common citizen. Access justice via AI-driven triage.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-24">
                {commonRights.map((right, idx) => (
                    <XtractCard
                        key={idx}
                        className="p-8 cursor-pointer"
                        onClick={() => handleQuery(right.title)}
                    >
                        <div className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest mb-4">Constitutional Right</div>
                        <h4 className="font-bold mb-3">{right.title}</h4>
                        <p className="text-zinc-500 text-[10px] leading-relaxed uppercase tracking-widest font-mono">{right.desc}</p>
                    </XtractCard>
                ))}
            </div>

            <XtractCard className="text-center py-24">
                <h2 className="text-3xl font-bold mb-6">Legal Query Engine</h2>
                <p className="text-zinc-500 mb-12 max-w-lg mx-auto text-sm leading-relaxed">
                    Ask NyayaAgent about your specific situation. Our AI will analyze BNS sections to provide immediate clarity.
                </p>
                <button
                    onClick={() => handleQuery("Explain my legal rights in India")}
                    className="bg-white text-black font-bold px-10 py-3 rounded-xl transition-all hover:bg-zinc-200 uppercase text-xs tracking-widest font-mono"
                >
                    Consult AI Hub
                </button>
            </XtractCard>
        </main>
    );
};

export default LegalPage;
