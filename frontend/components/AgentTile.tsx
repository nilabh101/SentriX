"use client";
import React from 'react';
import Link from 'next/link';

interface AgentTileProps {
    title: string;
    description: string;
    icon: string;
    color: string;
    href: string;
    active?: boolean;
}

const AgentTile: React.FC<AgentTileProps> = ({ title, description, icon, color, href, active = true }) => {
    return (
        <Link href={active ? href : "#"} className={`group relative glass rounded-2xl border border-white/10 p-8 card-hover transition-all duration-300 ${!active ? 'opacity-50 cursor-not-allowed' : ''}`}>
            <div className={`w-14 h-14 rounded-xl mb-6 flex items-center justify-center text-3xl transition-transform group-hover:scale-110`} style={{ backgroundColor: `${color}20`, border: `1px solid ${color}40`, color: color }}>
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors">{title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{description}</p>

            {!active && (
                <span className="absolute top-4 right-4 text-[10px] font-mono bg-white/5 px-2 py-0.5 rounded border border-white/10 text-gray-400 uppercase">
                    Coming Soon
                </span>
            )}

            {active && (
                <div className="mt-6 flex items-center text-xs font-mono tracking-widest uppercase" style={{ color: color }}>
                    Access Dashboard &rarr;
                </div>
            )}
        </Link>
    );
};

export default AgentTile;
