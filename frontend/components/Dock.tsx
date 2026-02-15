"use client";
import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Home, Shield, Gavel, Sprout, Heart, User, Clock, Languages, Mic, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

const icons = [
    { id: "home", icon: Home, label: "Home", href: "/" },
    { id: "features", icon: Sparkles, label: "Features", href: "/features" },
    { id: "security", icon: Shield, label: "Security", href: "/security" },
    { id: "legal", icon: Gavel, label: "Legal", href: "/legal" },
    { id: "agri", icon: Sprout, label: "Agri", href: "/agri" },
    { id: "health", icon: Heart, label: "Health", href: "/health" },
    { id: "lang", icon: Languages, label: "Languages", href: "#" },
    { id: "voice", icon: Mic, label: "Voice Search", href: "#" },
];

export default function Dock() {
    const mouseX = useMotionValue(Infinity);
    const { language, setLanguage } = useLanguage();
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const handleSpecialClick = (id: string) => {
        if (id === "lang") {
            const langs: ('en' | 'hi' | 'bn')[] = ['en', 'hi', 'bn'];
            const nextIndex = (langs.indexOf(language) + 1) % langs.length;
            setLanguage(langs[nextIndex]);
        } else if (id === "voice") {
            window.dispatchEvent(new CustomEvent("activate-voice"));
        }
    };

    return (
        <motion.div
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => {
                mouseX.set(Infinity);
                setHoveredIndex(null);
            }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 flex h-20 items-end gap-3 rounded-[30px] bg-slate-900/40 border border-blue-500/20 px-6 pb-4 backdrop-blur-3xl z-50 shadow-2xl shadow-blue-500/10"
        >
            {icons.map((item, index) => (
                <IconContainer
                    key={item.id}
                    mouseX={mouseX}
                    index={index}
                    hoveredIndex={hoveredIndex}
                    setHoveredIndex={setHoveredIndex}
                    {...item}
                    onClick={() => handleSpecialClick(item.id)}
                    label={item.id === "lang" ? `Language: ${language.toUpperCase()}` : item.label}
                />
            ))}
        </motion.div>
    );
}

interface IconContainerProps {
    mouseX: any;
    index: number;
    hoveredIndex: number | null;
    setHoveredIndex: (idx: number | null) => void;
    icon: any;
    label: string;
    href: string;
    onClick?: () => void;
    id: string;
}

function IconContainer({ mouseX, index, hoveredIndex, setHoveredIndex, icon: Icon, label, href, onClick, id }: IconContainerProps) {
    const ref = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const isActive = pathname === href;

    const getScale = (idx: number) => {
        if (hoveredIndex === null) return 1;
        const distance = Math.abs(hoveredIndex - idx);
        if (distance === 0) return 1.6;
        if (distance === 1) return 1.3;
        if (distance === 2) return 1.1;
        return 1;
    };

    const scale = getScale(index);

    const content = (
        <motion.div
            ref={ref}
            onMouseEnter={() => setHoveredIndex(index)}
            animate={{
                scale,
                y: isActive ? -4 : 0
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onClick={href === "#" ? onClick : undefined}
            className={`
                w-12 h-12 rounded-xl flex items-center justify-center relative group transition-all duration-300
                ${isActive
                    ? "bg-gradient-to-br from-blue-600 to-cyan-600 shadow-lg shadow-blue-500/50"
                    : "bg-white/[0.03] border border-white/10 hover:bg-white/10"
                } 
                ${href === "#" ? "cursor-pointer" : ""}
            `}
        >
            <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-zinc-500 group-hover:text-white"} transition-colors`} />

            {/* Tooltip */}
            <div className="absolute -top-14 left-1/2 -translate-x-1/2 px-3 py-2 rounded-xl bg-slate-900 border border-blue-500/20 text-[10px] text-white opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap font-mono uppercase tracking-widest shadow-2xl">
                {label}
            </div>

            {/* Indicator */}
            {isActive && (
                <motion.div
                    layoutId="dock-active"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                />
            )}
        </motion.div>
    );

    if (href === "#") return content;

    return (
        <Link href={href}>
            {content}
        </Link>
    );
}
