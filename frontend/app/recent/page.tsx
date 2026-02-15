"use client";
import React from 'react';
import ScrollCarousel from '@/components/ScrollCarousel';
import XtractCard from '@/components/XtractCard';

export default function RecentHelpsPage() {
    return (
        <main className="min-h-screen bg-black text-white p-8 md:p-24 max-w-7xl mx-auto pb-48">
            <header className="mb-32 text-center">
                <h1 className="text-7xl font-bold tracking-tighter mb-8 leading-[0.9]">National Impact</h1>
                <p className="text-zinc-500 text-xl max-w-2xl mx-auto leading-relaxed">
                    Real-time pulses from the Setu network, providing assistance where it matters most.
                </p>
            </header>

            <XtractCard className="p-0 overflow-hidden mb-32 border-white/10">
                <ScrollCarousel />
            </XtractCard>

            <section>
                <h3 className="text-[10px] uppercase font-mono tracking-[0.2em] text-zinc-600 mb-16 text-center">Setu Vitality Statistics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { label: "Cases Resolved", val: "1.2M+" },
                        { label: "Rural Outreach", val: "84K Villages" },
                        { label: "Justice Simplified", val: "₹14B Claims" }
                    ].map((stat, i) => (
                        <XtractCard key={i} className="text-center py-12">
                            <div className="text-3xl font-bold mb-3">{stat.val}</div>
                            <div className="text-[10px] uppercase font-mono tracking-widest text-zinc-500">
                                {stat.label}
                            </div>
                        </XtractCard>
                    ))}
                </div>
            </section>
        </main>
    );
}
