"use client";
import React from 'react';
import { motion } from 'framer-motion';

const items = [
    { title: "RTI Filed", desc: "Successfully drafted RTI for Punjab Land Record Society.", date: "Today" },
    { title: "Soil Analysis", desc: "Nitrogen deficiency detected in Sector 42 field.", date: "Yesterday" },
    { title: "Legal Notice", desc: "Sent automated notice to consumer court for delayed shipment.", date: "2 days ago" },
    { title: "Health Triage", desc: "Emergency PHC navigation completed for rural patient.", date: "3 days ago" },
    { title: "Mandi Trend", desc: "Wheat price alert: 5% increase expected in Ludhiana.", date: "5 days ago" },
];

export default function ScrollCarousel() {
    return (
        <div className="w-full overflow-hidden py-12 px-6">
            <motion.div
                className="flex gap-4 cursor-grab active:cursor-grabbing"
                drag="x"
                dragConstraints={{ right: 0, left: -400 }}
            >
                {items.map((item, idx) => (
                    <motion.div
                        key={idx}
                        className="min-w-[300px] h-[200px] p-8 glass rounded-3xl border border-white/5 flex flex-col justify-between group hover:border-blue-500/30 transition-all"
                        whileHover={{ y: -10 }}
                    >
                        <div>
                            <div className="text-[10px] text-gray-500 font-mono uppercase mb-2">{item.date}</div>
                            <h4 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                                {item.title}
                            </h4>
                            <p className="text-gray-400 text-xs mt-2 leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                        <div className="w-8 h-1 bg-blue-500/20 rounded-full group-hover:bg-blue-500 transition-colors" />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
