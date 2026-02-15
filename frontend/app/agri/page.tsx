"use client";
import React from 'react';
import Link from 'next/link';
import XtractCard from '@/components/XtractCard';
import { useRouter } from 'next/navigation';

const AgriPage: React.FC = () => {
    const router = useRouter();
    const cropUpdates = [
        { crop: "Wheat", price: "₹2,275/q", status: "Steady" },
        { crop: "Rice", price: "₹2,320/q", status: "Rising" },
        { crop: "Cotton", price: "₹7,200/q", status: "Steady" },
        { crop: "Sugar", price: "₹3,400/q", status: "Rising" },
        { crop: "Onion", price: "₹1,800/q", status: "Volatile" },
        { crop: "Tomato", price: "₹1,200/q", status: "Falling" },
        { crop: "Potato", price: "₹1,500/q", status: "Steady" },
        { crop: "Pulse", price: "₹6,800/q", status: "Rising" }
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
                <h1 className="text-6xl font-bold tracking-tight mb-6">KrishiAgent</h1>
                <p className="text-zinc-500 text-lg max-w-2xl leading-relaxed">
                    Smart farming and Mandi analytics for the modern Indian farmer.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-24">
                {cropUpdates.map((update, idx) => (
                    <XtractCard
                        key={idx}
                        className="p-8 cursor-pointer"
                        onClick={() => handleQuery(`Real-time analytics for ${update.crop} prices`)}
                    >
                        <div className="text-zinc-600 font-mono text-[10px] uppercase mb-4 tracking-widest">Mandi / {update.crop}</div>
                        <div className="text-3xl font-bold mb-4">{update.price}</div>
                        <div className={`text-[10px] font-mono uppercase tracking-widest ${update.status === 'Rising' ? 'text-white' : 'text-zinc-600'}`}>
                            {update.status}
                        </div>
                    </XtractCard>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <XtractCard className="p-12">
                    <h3 className="text-xl font-bold mb-10">Expert Advisory</h3>
                    <div className="space-y-8">
                        <p className="text-zinc-500 italic text-sm leading-relaxed border-l border-white/10 pl-6">
                            "Ideal time for sowing Wheat in Punjab. Ensure soil moisture is adequate. High-yield varieties recommended."
                        </p>
                        <button
                            onClick={() => handleQuery("Get expert advisory for Wheat sowing")}
                            className="inline-block text-[10px] font-mono uppercase tracking-widest border border-white/10 px-6 py-3 rounded-xl hover:bg-white/5 transition-colors"
                        >
                            Consult Agent &rarr;
                        </button>
                    </div>
                </XtractCard>

                <XtractCard className="p-12 cursor-pointer" onClick={() => handleQuery("Indian Mandi Sentiment Analysis")}>
                    <h3 className="text-xl font-bold mb-10">Market Pulse</h3>
                    <div className="space-y-6">
                        <div className="h-[1px] w-full bg-white/5" />
                        <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest">
                            <span className="text-zinc-500">Arrival Vol</span>
                            <span className="text-white">High</span>
                        </div>
                        <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest">
                            <span className="text-zinc-500">Mandi Sentiment</span>
                            <span className="text-white">Positive</span>
                        </div>
                        <div className="h-[1px] w-full bg-white/5" />
                    </div>
                </XtractCard>
            </div>
        </main>
    );
};

export default AgriPage;
