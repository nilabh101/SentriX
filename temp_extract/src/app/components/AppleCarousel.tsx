import { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselItem {
  id: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  gradient?: string;
}

interface AppleCarouselProps {
  items: CarouselItem[];
}

export default function AppleCarousel({ items }: AppleCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const scrollEl = scrollRef.current;
    if (scrollEl) {
      scrollEl.addEventListener('scroll', checkScroll);
      return () => scrollEl.removeEventListener('scroll', checkScroll);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 400;
    const newScrollLeft = scrollRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
    scrollRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
  };

  return (
    <div className="relative group">
      {/* Navigation buttons */}
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-slate-900/90 backdrop-blur-xl border border-blue-500/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-slate-800/90 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50"
        >
          <ChevronLeft className="w-5 h-5 text-blue-400" />
        </button>
      )}
      
      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-slate-900/90 backdrop-blur-xl border border-blue-500/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-slate-800/90 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50"
        >
          <ChevronRight className="w-5 h-5 text-blue-400" />
        </button>
      )}

      {/* Scrollable container */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide scroll-smooth"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {items.map((item, index) => (
          <CarouselCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </div>
  );
}

function CarouselCard({ item, index }: { item: CarouselItem; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex-shrink-0 w-80 snap-center"
    >
      <motion.div
        animate={{ scale: isHovered ? 1.02 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="relative h-64 rounded-2xl overflow-hidden"
      >
        {/* Background gradient */}
        <div className={`absolute inset-0 ${item.gradient || 'bg-gradient-to-br from-blue-600 to-cyan-600'}`} />
        
        {/* Glow effect */}
        <motion.div
          animate={{ opacity: isHovered ? 0.3 : 0 }}
          className={`absolute inset-0 ${item.gradient || 'bg-gradient-to-br from-blue-400 to-cyan-400'} blur-2xl`}
        />

        {/* Border glow */}
        <div className={`absolute inset-0 rounded-2xl border-2 ${isHovered ? 'border-white/30' : 'border-white/10'} transition-colors`} />

        {/* Content */}
        <div className="relative z-10 p-6 h-full flex flex-col justify-between">
          {item.icon && (
            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
              {item.icon}
            </div>
          )}
          
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
            <p className="text-white/80 text-sm">{item.description}</p>
          </div>
        </div>

        {/* Animated particles */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                initial={{
                  x: Math.random() * 300,
                  y: Math.random() * 200,
                  opacity: 0,
                }}
                animate={{
                  y: [null, -50],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}