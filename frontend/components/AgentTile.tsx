"use client";
import React from 'react';
import Link from 'next/link';
import TiltCard from './TiltCard';

interface AgentTileProps {
    title: string;
    description: string;
    icon: string;
    color: string;
    href: string;
    active: boolean;
}

const AgentTile: React.FC<AgentTileProps> = ({ title, description, icon, color, href, active }) => {
    const content = (
        <TiltCard glowColor={active ? "blue" : "gray"} className="h-full">
            <div className="flex flex-col h-full">
                <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform duration-500">
                    {icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                    {description}
                </p>
                <div className="flex items-center justify-between">
                    <span className={`text-[10px] uppercase font-mono tracking-widest px-2 py-0.5 rounded ${active ? "bg-blue-500/20 text-blue-400" : "bg-white/5 text-gray-500"
                        }`}>
                        {active ? "Active" : "Coming Soon"}
                    </span>
                    {active && (
                        <span className="text-blue-400 group-hover:translate-x-1 transition-transform">
                            &rarr;
                        </span>
                    )}
                </div>
            </div>
        </TiltCard>
    );

    if (active) {
        return (
            <Link href={href}>
                {content}
            </Link>
        );
    }

    return <div className="opacity-60 grayscale-[0.5]">{content}</div>;
};

export default AgentTile;
