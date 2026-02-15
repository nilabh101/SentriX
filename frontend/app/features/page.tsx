"use client";
import React from 'react';
import XtractCard from '@/components/XtractCard';
import { motion } from 'framer-motion';

const features = [
    { title: "Multi-Agent Routing", desc: "Intelligent query distribution to specialized agents.", icon: "🤖" },
    { title: "3D Perspective Hub", desc: "Interactive UI with depth and motion feedback.", icon: "✨" },
    { title: "Voice & Multi-lingual", desc: "Breaking barriers with Bhashini (BETA).", icon: "🎙️" },
    { title: "Offline Capabilities", desc: "Rural-first PWA design for low-connectivity.", icon: "📶" },
    { title: "Legal Logic Engine", desc: "BNS-aware reasoning for simplified justice.", icon: "⚖️" },
    { title: "Agri Analytics", desc: "Real-time crop advice and mandi price monitoring.", icon: "🌾" },
];

export default function FeaturesPage() {
    return (
        <main className="min-h-screen bg-black text-white p-8 md:p-24 max-w-7xl mx-auto pb-48">
            <header className="mb-32">
                <h1 className="text-6xl font-bold tracking-tight mb-6">Core Capabilities</h1>
                <p className="text-zinc-500 text-lg max-w-2xl leading-relaxed">
                    The technological pillars supporting India's Public AI Hub, designed for scale and accessibility.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((f, i) => (
                    <XtractCard key={i} className="h-[280px] flex flex-col justify-center">
                        <div className="text-3xl mb-8">{f.icon}</div>
                        <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                        <p className="text-zinc-500 text-sm leading-relaxed">{f.desc}</p>
                    </XtractCard>
                ))}
            </div>
        </main>
    );
}
