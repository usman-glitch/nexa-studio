"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useRef, useState } from "react";

export default function BackToTop() {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // 1. Magnetic Motion Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // 2. Smooth Spring Physics
  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const mouseX = useSpring(x, springConfig);
  const mouseY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    x.set((clientX - centerX) * 0.4);
    y.set((clientY - centerY) * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex justify-center py-24 bg-white overflow-hidden">
      <div 
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative"
      >
        {/* RIPPLE EFFECT (Animated Background) */}
        {isHovered && (
          <>
            <motion.div
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                ease: "easeOut" 
              }}
              className="absolute inset-0 bg-gray-100 rounded-full -z-10"
              style={{ x: mouseX, y: mouseY }}
            />
            <motion.div
              initial={{ scale: 0.8, opacity: 0.3 }}
              animate={{ scale: 1.6, opacity: 0 }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                ease: "easeOut",
                delay: 0.5 
              }}
              className="absolute inset-0 bg-gray-200 rounded-full -z-10"
              style={{ x: mouseX, y: mouseY }}
            />
          </>
        )}

        <motion.button
          onClick={scrollToTop}
          style={{ x: mouseX, y: mouseY }}
          whileTap={{ scale: 0.9 }}
          className="group relative flex flex-col items-center gap-6"
        >
          {/* The Magnetic Circle */}
          <div className="w-24 h-24 rounded-full border border-gray-200 flex items-center justify-center transition-colors duration-500 group-hover:bg-black group-hover:border-black">
            <ArrowUp className="w-6 h-6 text-gray-900 group-hover:text-white transition-transform duration-500 group-hover:-translate-y-2" />
          </div>

          {/* The Label */}
          <motion.span 
            className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 group-hover:text-black transition-colors duration-300"
          >
            Back to Top
          </motion.span>
        </motion.button>
      </div>
    </div>
  );
}