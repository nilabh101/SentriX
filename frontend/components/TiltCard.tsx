"use client";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
    glowColor?: string;
}

export default function TiltCard({ children, className = "", glowColor = "blue" }: TiltCardProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotX = (y - centerY) / 10;
        const rotY = (centerX - x) / 10;

        setRotateX(rotX);
        setRotateY(rotY);
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
    };

    return (
        <motion.div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ rotateX, rotateY }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            style={{ transformStyle: "preserve-3d" }}
            className={`relative glass p-8 rounded-3xl border border-white/5 overflow-hidden group ${className}`}
        >
            <div
                className={`absolute inset-0 bg-gradient-to-br from-${glowColor}-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                style={{ transform: "translateZ(-10px)" }}
            />
            <div style={{ transform: "translateZ(20px)" }}>
                {children}
            </div>
        </motion.div>
    );
}
