"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Globe, Lightbulb, Zap, Target, Navigation } from "lucide-react";
import Footer from "../components/Footer"; // Ensure this path matches your file structure

export default function AboutPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.215, 0.61, 0.355, 1] as any 
      } 
    }
  };

  return (
    <main 
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#050505] overflow-x-hidden text-white"
    >
      {/* 3D TOPOGRAPHICAL / MOON SURFACE EFFECT - FIXED POSITIONING */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 opacity-20 bg-[url('/carbonfiber.png')]" />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1] 
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-0 -right-20 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#00887a]/10 blur-[100px] md:blur-[150px] rounded-full"
        />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#00887a]/5 to-transparent" />
      </div>

      <div className="relative z-10 py-24 md:py-32 lg:py-48 px-4 sm:px-6 md:px-10">
        <article className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            
            {/* HEADER SECTION */}
            <header className="lg:col-span-8 space-y-6 md:space-y-8">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
              >
                <div className="flex items-center gap-3 mb-4 md:mb-6">
                  <Navigation className="w-3 h-3 md:w-4 md:h-4 text-[#00887a] fill-[#00887a] rotate-[15deg]" aria-hidden="true" />
                  <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-gray-500">
                    Creative by Nature. Technical by Design.
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[1] md:leading-[0.9] tracking-tighter" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  We Build Br<span className="font-serif italic font-bold">a</span>nds <br className="hidden sm:block" />
                  That <span className="text-gray-400 italic font-serif font-light">Lead</span> The Era.
                </h1>
              </motion.div>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-gray-400 text-lg md:text-xl lg:text-2xl leading-relaxed max-w-3xl font-medium"
              >
                At NEXA Studio, we help brands stand out in today’s fast-moving digital world through 
                creative design, digital marketing, and strategic branding solutions.
              </motion.p>
            </header>

            {/* SIDEBAR PHILOSOPHY */}
            <aside className="lg:col-span-4 lg:pt-4">
              <div className="p-6 md:p-8 rounded-[32px] md:rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-md">
                  <p className="text-sm text-gray-400 leading-relaxed font-medium">
                    As a modern creative studio, we specialize in building strong and impactful 
                    brand identities that capture attention, increase engagement, and drive real results.
                  </p>
              </div>
            </aside>
          </div>

          {/* CONTENT GRID */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16 md:mt-24" aria-label="Our Services and Expertise">
            <div className="lg:col-span-2 space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {[
                  { title: "Visual Content", desc: "High-quality visual content creation tailored for modern platforms." },
                  { title: "Web Excellence", desc: "Responsive website design and development with a focus on performance." },
                  { title: "Strategic Growth", desc: "Professional social media management and digital growth strategies." },
                  { title: "User Experience", desc: "Delivering user-friendly experiences that convert audiences into loyal customers." }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -5 }}
                    className="p-8 md:p-10 rounded-[28px] md:rounded-[32px] bg-gradient-to-br from-white/5 to-transparent border border-white/5"
                  >
                    <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4 tracking-tight" style={{ fontFamily: "'Poppins', sans-serif" }}>{item.title}</h2>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>

              <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-4xl">
                With a deep understanding of branding, content strategy, and digital growth, every project 
                at NEXA Studio is executed with precision and purpose — helping businesses grow, compete, 
                and lead in an evolving online landscape.
              </p>
            </div>

            <div className="space-y-6 md:space-y-8">
              <div className="aspect-square relative rounded-[32px] md:rounded-[40px] overflow-hidden border border-white/10 group">
                <div className="absolute inset-0 bg-[#0a0a0a]" aria-hidden="true" />
                <motion.div 
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                    opacity: [0.3, 0.5, 0.3] 
                  }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-1/2 -left-1/2 w-full h-full bg-[#00887a]/20 blur-[80px] md:blur-[120px] rounded-full"
                  aria-hidden="true"
                />
                
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-10" aria-hidden="true" />
                
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8 md:p-12 text-center">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="mb-6 md:mb-8 w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md"
                  >
                    <Zap className="w-4 h-4 md:w-5 md:h-5 text-[#00887a] fill-[#00887a]/20" aria-hidden="true" />
                  </motion.div>

                  <blockquote className="text-xl md:text-2xl lg:text-3xl font-serif italic text-white leading-tight tracking-tight">
                    "Great design goes beyond <span className="bg-[#00887a]">aesthetics</span> — it’s about creating meaningful brand connections."
                  </blockquote>
                  
                  <div className="mt-6 md:mt-8 w-12 h-[1px] bg-gradient-to-r from-transparent via-[#00887a]/50 to-transparent" aria-hidden="true" />
                </div>
              </div>
              
              <section className="p-6 md:p-8 rounded-[32px] md:rounded-[40px] bg-[#00887a] text-black shadow-[0_20px_50px_rgba(0,136,122,0.2)]">
                <h3 className="font-black uppercase tracking-widest text-[8px] md:text-[10px] mb-2 opacity-70">The Goal</h3>
                <p className="font-bold text-lg md:text-xl leading-tight tracking-tight">Visually compelling, strategically effective, and aligned with long-term goals.</p>
              </section>
            </div>
          </section>

          {/* FOOTER COORDINATE ELEMENT */}
          <footer className="mt-24 md:mt-32 pt-8 md:pt-12 border-t border-white/5 flex justify-between items-end" aria-label="Studio Details">
            <div className="space-y-1">
              <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-white">NEXA Studio</span>
              <p className="text-[8px] md:text-[10px] font-mono text-gray-600" aria-label="Location coordinates">30.3753° N, 69.3451° E</p>
            </div>
            <div className="text-right">
              <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-gray-600 italic" aria-label="Established in 2026">Est. 2026</p>
            </div>
          </footer>
        </article>
      </div>

      <Footer />
    </main>
  );
}