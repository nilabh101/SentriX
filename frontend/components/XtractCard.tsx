"use client";
import React, { useRef, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface XtractCardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export default function XtractCard({ children, className = "", onClick }: XtractCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const x = useSpring(0, { stiffness: 300, damping: 20 });
    const y = useSpring(0, { stiffness: 300, damping: 20 });

    const rotateX = useTransform(y, [-100, 100], [10, -10]);
    const rotateY = useTransform(x, [-100, 100], [-10, 10]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set(e.clientX - centerX);
        y.set(e.clientY - centerY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                perspective: 1000,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{
                opacity: 1,
                y: 0,
                scale: isHovered ? 1.02 : 1
            }}
            className={`relative group ${className} ${onClick ? 'cursor-pointer' : ''}`}
        >
            <div
                className={`
                    h-full w-full rounded-2xl p-8
                    bg-white/[0.03] border border-white/10
                    backdrop-blur-xl transition-all duration-300
                    group-hover:bg-white/[0.05] group-hover:border-white/20
                    shadow-[0_0_0_1px_rgba(255,255,255,0.05)]
                `}
                onClick={(e) => {
                    if (onClick) {
                        e.stopPropagation();
                        onClick();
                    }
                }}
            >
                {/* Shine Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <div style={{ transform: "translateZ(30px)" }} className="relative z-10">
                    {children}
                </div>
            </div>
        </motion.div>
    );
}
