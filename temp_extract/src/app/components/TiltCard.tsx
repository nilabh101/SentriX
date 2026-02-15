import { useState, useRef } from 'react';
import { motion } from 'motion/react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export default function TiltCard({ children, className = '', glowColor = 'blue' }: TiltCardProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const rotateXValue = (mouseY / (rect.height / 2)) * -10;
    const rotateYValue = (mouseX / (rect.width / 2)) * 10;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  const glowColors: Record<string, string> = {
    blue: 'shadow-blue-500/50',
    cyan: 'shadow-cyan-500/50',
    purple: 'shadow-purple-500/50',
    green: 'shadow-green-500/50',
    pink: 'shadow-pink-500/50',
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
        scale: isHovered ? 1.05 : 1,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className={`relative ${className}`}
    >
      <div className={`
        relative rounded-2xl p-6 
        bg-gradient-to-br from-slate-900/90 to-slate-800/90 
        backdrop-blur-xl border border-slate-700/50
        transition-shadow duration-300
        ${isHovered ? `shadow-2xl ${glowColors[glowColor as keyof typeof glowColors] || glowColors.blue}` : 'shadow-lg'}
      `}>
        {/* Glow overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-cyan-600/10 rounded-2xl pointer-events-none" />
        )}
        
        {/* Content */}
        <div style={{ transform: 'translateZ(20px)' }} className="relative z-10">
          {children}
        </div>
      </div>
    </motion.div>
  );
}