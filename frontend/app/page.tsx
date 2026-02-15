"use client";
import dynamic from 'next/dynamic';
import AgentTile from "@/components/AgentTile";
import QueryBox from "@/components/QueryBox";
import ScrollCarousel from "@/components/ScrollCarousel";
import XtractCard from "@/components/XtractCard";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const SplineHero = dynamic(() => import('@/components/SplineHero'), { ssr: false });

interface Agent {
  title: string;
  description: string;
  icon: string;
  color: string;
  href: string;
  active: boolean;
}

import { useRouter } from 'next/navigation';

export default function Home() {
  const { t } = useLanguage();
  const router = useRouter();
  const agents: Agent[] = [
    {
      title: t('security_title'),
      description: "Automated network triage and threat hunting for digital borders.",
      icon: "🛡️",
      color: "#ffffff",
      href: "/security",
      active: true
    },
    {
      title: t('legal_title'),
      description: "Simplified legal aid and BNS-aware explanation for citizens.",
      icon: "⚖️",
      color: "#ffffff",
      href: "/legal",
      active: true
    },
    {
      title: t('agri_title'),
      description: "AI-driven farming advice and real-time mandi price insights.",
      icon: "🌾",
      color: "#ffffff",
      href: "/agri",
      active: true
    },
    {
      title: t('health_title'),
      description: "Predictive health symptom checker and nearby care navigation.",
      icon: "🏩",
      color: "#ffffff",
      href: "/health",
      active: true
    }
  ];

  return (
    <main className="min-h-screen relative overflow-x-hidden">
      <SplineHero />

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-48 relative z-20">
        <header className="mb-24 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-3 py-1 rounded-full border border-white/10 text-[10px] uppercase tracking-widest font-mono text-zinc-500 mb-8"
          >
            {t('hub_tagline')}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-7xl md:text-8xl font-bold tracking-tight mb-8 leading-[0.9]"
          >
            {t('hub_title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-zinc-500 text-lg md:text-xl max-w-xl leading-relaxed"
          >
            {t('hub_description')}
          </motion.p>
        </header>

        <section className="mb-32">
          <QueryBox />
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
          {agents.map((agent, index) => (
            <XtractCard
              key={index}
              className={`${!agent.active ? "opacity-40" : "cursor-pointer"}`}
              onClick={() => agent.active && router.push(agent.href)}
            >
              <div className="flex flex-col h-full">
                <div className="text-3xl mb-8">{agent.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{agent.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed mb-12 flex-grow">
                  {agent.description}
                </p>
                {agent.active ? (
                  <div className="text-xs font-mono uppercase tracking-widest text-white flex items-center gap-2">
                    {t('open_dashboard')} <span>&rarr;</span>
                  </div>
                ) : (
                  <span className="text-xs font-mono uppercase tracking-widest text-zinc-600">{t('coming_soon')}</span>
                )}
              </div>
            </XtractCard>
          ))}
        </section>

        <footer className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
          <div>© 2026 SetuAI Platform</div>
          <div className="flex gap-12">
            <a href="#" className="hover:text-white transition-colors">Digital India</a>
            <a href="#" className="hover:text-white transition-colors">Accessibility</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
          </div>
        </footer>
      </div>
    </main>
  );
}
