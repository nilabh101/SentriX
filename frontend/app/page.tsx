"use client";
import AgentTile from "@/components/AgentTile";
import QueryBox from "@/components/QueryBox";

interface Agent {
  title: string;
  description: string;
  icon: string;
  color: string;
  href: string;
  active: boolean;
}

export default function Home() {
  const agents: Agent[] = [
    {
      title: "SentriX Security",
      description: "AI-powered automated triage for network alerts and security logs. Protecting digital borders.",
      icon: "🛡️",
      color: "#3b82f6",
      href: "/security",
      active: true
    },
    {
      title: "NyayaAgent (Legal)",
      description: "Simplified legal aid. Understand Indian law, draft notices, and know your rights in seconds.",
      icon: "⚖️",
      color: "#f59e0b",
      href: "/legal",
      active: true
    },
    {
      title: "KrishiAgent (Agri)",
      description: "AI assistant for farmers. Crop disease detection, market prices, and smart farming advice.",
      icon: "🌾",
      color: "#10b981",
      href: "/agri",
      active: true
    },
    {
      title: "Swasthya (Health)",
      description: "Symptom detection and navigation to neighborhood healthcare units and government schemes.",
      icon: "🏩",
      color: "#ef4444",
      href: "/health",
      active: false
    }
  ];

  return (
    <main className="min-h-screen p-8 md:p-16 max-w-7xl mx-auto">
      <header className="mb-20 text-center">
        <div className="inline-block px-4 py-1 mb-6 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-xs tracking-widest uppercase">
          Digital India Initiative
        </div>
        <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-emerald-200 mb-6 pb-2">
          SetuAI Hub
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
          The central bridge connecting citizens to advanced AI assistance.
          Expert agents at your service, across every sector of public life.
        </p>
      </header>

      <QueryBox />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {agents.map((agent, index) => (
          <AgentTile key={index} {...agent} />
        ))}
      </div>

      <footer className="mt-24 pt-8 border-t border-white/5 flex justify-between items-center text-gray-500 text-xs font-mono">
        <div>SETUAI PLATFORM V1.0</div>
        <div className="flex gap-6">
          <button className="hover:text-blue-400 transition-colors uppercase">Multi-lingual Mode (BETA)</button>
          <button className="hover:text-blue-400 transition-colors uppercase">Voice Assistance</button>
        </div>
      </footer>
    </main>
  );
}
