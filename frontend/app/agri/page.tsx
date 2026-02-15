"use client";
import React from 'react';
import Link from 'next/link';

const AgriPage: React.FC = () => {
    const cropUpdates = [
        { crop: "Wheat", price: "₹2,275/q", status: "Steady" },
        { crop: "Rice", price: "₹2,320/q", status: "Rising" },
        { crop: "Onion", price: "₹1,800/q", status: "Volatile" },
        { crop: "Tomato", price: "₹1,200/q", status: "Falling" }
    ];

    return (
        <main className="min-h-screen p-8 md:p-16 max-w-7xl mx-auto">
            <header className="mb-12">
                <Link href="/" className="text-xs font-mono text-emerald-400 hover:text-emerald-300 transition-colors uppercase mb-4 block">
                    &larr; Back to Hub
                </Link>
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-500">
                    KrishiAgent (AgriHelp)
                </h1>
                <p className="text-gray-400 mt-2 font-mono text-sm leading-relaxed">
                    Smart Farming. Real-time Market Prices. Better Yields.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {cropUpdates.map((update, idx) => (
                    <div key={idx} className="glass p-6 rounded-2xl border border-emerald-500/10 active:scale-95 transition-all">
                        <div className="text-emerald-500 font-mono text-[10px] uppercase mb-1">Mandi Price</div>
                        <h4 className="text-white font-bold text-lg">{update.crop}</h4>
                        <div className="flex justify-between items-end mt-4">
                            <span className="text-emerald-400 font-mono text-xl">{update.price}</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded ${update.status === 'Rising' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                                {update.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 glass p-10 rounded-3xl border border-white/5">
                    <h3 className="text-xl font-bold mb-6">Expert Advice</h3>
                    <p className="text-gray-400 mb-6 font-mono text-sm uppercase">Currently Sowing: Wheat</p>
                    <div className="p-6 bg-white/5 rounded-2xl border border-white/10 mb-8">
                        <p className="text-gray-300 leading-relaxed italic text-sm">
                            "It's the ideal time for sowing Wheat in Punjab and Haryana. Ensure soil moisture is adequate.
                            Consider using high-yield varieties like HD 2967 for better resistance to Rust."
                        </p>
                    </div>
                    <Link href="/" className="inline-block bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-3 rounded-xl transition-all">
                        Ask KrishiAgent for Advice
                    </Link>
                </div>

                <div className="glass p-10 rounded-3xl border border-white/5 bg-gradient-to-br from-emerald-500/5 to-transparent">
                    <h3 className="text-xl font-bold mb-6">Market Trends</h3>
                    <div className="space-y-4">
                        <div className="text-xs text-gray-500 font-mono">NORTH INDIA HUB</div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 w-[65%]"></div>
                        </div>
                        <p className="text-xs text-gray-400 font-mono uppercase">Arrival Volume: High</p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default AgriPage;
