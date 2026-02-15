import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Sparkles, Layers, BarChart3, User, Clock, Shield, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';

const dockItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Sparkles, label: 'Features', path: '/features' },
  { icon: Layers, label: 'Sectors', path: '/sectors' },
  { icon: BarChart3, label: 'Dashboard', path: '/dashboard' },
  { icon: User, label: 'Profile', path: '/profile' },
  { icon: Clock, label: 'Recent', path: '/recent-helps' },
  { icon: Shield, label: 'Security', path: '/profile' },
  { icon: AlertTriangle, label: 'Alerts', path: '/dashboard' },
];

export default function MacDock() {
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getScale = (index: number) => {
    if (hoveredIndex === null) return 1;
    const distance = Math.abs(hoveredIndex - index);
    if (distance === 0) return 1.5;
    if (distance === 1) return 1.3;
    if (distance === 2) return 1.15;
    return 1;
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
        className="relative"
      >
        {/* Dock background with glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-blue-950/90 to-slate-900/90 backdrop-blur-2xl rounded-2xl border border-blue-500/30 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-2xl" />
        </div>
        
        {/* Dock items */}
        <div
          className="relative flex items-end gap-2 px-4 py-3"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {dockItems.map((item, index) => {
            const Icon = item.icon;
            const scale = getScale(index);
            const isActive = location.pathname === item.path;

            return (
              <motion.button
                key={item.label}
                onClick={() => navigate(item.path)}
                onMouseEnter={() => setHoveredIndex(index)}
                animate={{ scale }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="relative group"
              >
                {/* Icon container */}
                <div className={`
                  w-12 h-12 rounded-xl flex items-center justify-center
                  transition-all duration-300
                  ${isActive 
                    ? 'bg-gradient-to-br from-blue-600 to-cyan-600 shadow-lg shadow-blue-500/50' 
                    : 'bg-slate-800/50 hover:bg-slate-700/50'
                  }
                  border ${isActive ? 'border-blue-400/50' : 'border-slate-700/50'}
                  hover:shadow-xl hover:shadow-blue-500/30
                `}>
                  <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'} transition-colors`} />
                </div>

                {/* Tooltip */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="bg-slate-900 text-white text-xs px-3 py-1.5 rounded-lg border border-blue-500/30 whitespace-nowrap">
                    {item.label}
                  </div>
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 border-r border-b border-blue-500/30 rotate-45" />
                </div>

                {/* Active indicator dot */}
                {isActive && (
                  <motion.div
                    layoutId="dock-indicator"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}