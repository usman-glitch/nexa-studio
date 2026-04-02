"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Navigation } from "lucide-react";

export default function Hero() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: i * 0.1, 
        duration: 0.8, 
        ease: [0.215, 0.61, 0.355, 1] as any 
      }
    })
  };

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen w-full flex flex-col justify-center items-center px-6 pt-24 pb-12 overflow-hidden bg-white">
      {/* 1. ACCESSIBILITY/SEO HIDDEN TEXT */}
      <div className="sr-only">
        <h2>Nexa Studio - Digital Agency in Pakistan and UK</h2>
        <p>Specializing in crafting unforgettable visuals and seamless digital experiences.</p>
      </div>

      {/* COORDINATES AT THE TOP */}
      <motion.div
        custom={0}
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="relative z-10 w-full max-w-[1500px] mx-auto text-center mb-6"
      >
        <div className="inline-flex flex-col items-center gap-2 px-6 py-4" aria-label="Nexa Studio Global Locations">
          <div className="flex items-center gap-4">
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative flex items-center justify-center"
            >
              <Navigation className="w-4 h-4 text-blue-500 fill-blue-500 rotate-[15deg] relative z-10" />
              <div className="absolute inset-0 bg-blue-500/10 blur-[8px] rounded-full scale-150" />
            </motion.div>
            
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-950">PK</span>
              <span className="text-[10px] font-bold font-mono text-gray-500 tracking-wider">30.3753° N, 69.3451° E</span>
            </div>
          </div>
          
          <div className="w-[80%] h-[1px] bg-gray-100" />

          <div className="flex items-center gap-4">
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2 
              }}
              className="relative flex items-center justify-center"
            >
              <Navigation className="w-4 h-4 text-gray-400 fill-gray-400 rotate-[15deg] relative z-10" />
            </motion.div>

            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-950">UK</span>
              <span className="text-[10px] font-bold font-mono text-gray-500 tracking-wider">55.3781° N, 3.4360° W</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="relative z-10 w-full max-w-[1500px] mx-auto text-center mb-8 md:mb-12">
        <motion.h1 
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="font-poppins font-bold text-4xl sm:text-5xl md:text-6xl lg:text-8xl text-gray-900 leading-[0.9] tracking-tighter"
        >
          Crafting Visuals That Make <br />
          Brands <span className="text-gray-300 italic font-serif font-light">Unforgettable</span>
          
          <motion.span 
            className="inline-block align-middle ml-4 md:ml-6 relative group/stone"
            animate={{ 
              y: [0, -20, 0],
              rotateZ: [0, 8, -8, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <div className="absolute inset-0 bg-green-500/20 blur-[40px] rounded-full scale-150 group-hover/stone:bg-green-500/40 transition-colors duration-1000" />
            
            <Image 
              src="/kryptonite.png" 
              alt="Nexas Studio creative kryptonite crystal" 
              width={50} 
              height={50} 
              className="relative z-10 drop-shadow-[0_10px_30px_rgba(34,197,94,0.4)] md:w-[65px] md:h-[65px] lg:w-[80px] lg:h-[80px] object-contain cursor-default"
            />
          </motion.span>
        </motion.h1>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        className="relative w-full max-w-[1100px] aspect-[4/3] md:aspect-[16/10] lg:aspect-[21/9] rounded-[30px] md:rounded-[40px] overflow-hidden shadow-[0_40px_100px_-15px_rgba(0,0,0,0.1)] group"
      >
        <Image
          src="/hero.jpg"
          alt="Nexa Studio's premium portfolio showcase"
          fill
          className="object-cover scale-105 group-hover:scale-100 transition-transform duration-[2s] ease-out brightness-[0.85] group-hover:brightness-100"
          priority
          sizes="(max-width: 1100px) 100vw, 1100px"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />

        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-6 right-6 md:top-10 md:right-10 hidden sm:flex w-16 h-16 md:w-24 md:h-24 items-center justify-center rounded-full border border-white/20 backdrop-blur-md"
          aria-hidden="true"
        >
          <p className="text-[6px] md:text-[8px] font-bold text-white text-center uppercase tracking-widest leading-tight">
            Design • Build • Scale •
          </p>
        </motion.div>

        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 lg:p-16">
          <div className="grid lg:grid-cols-2 gap-6 items-end">
            <div className="space-y-3">
              <div style={{ perspective: "1200px" }}>
                <motion.div 
                  custom={2}
                  initial="hidden"
                  whileInView="visible"
                  variants={fadeInUp}
                  className="text-2xl md:text-4xl lg:text-5xl font-black text-white leading-[0.95] tracking-tighter"
                  style={{ transformStyle: "preserve-3d" }}
                  animate={{ 
                    rotateY: [-4, 4, -4],
                    rotateX: [2, -2, 2],
                  }}
                  transition={{
                    rotateY: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                    rotateX: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                  }}
                >
                  <span className="block drop-shadow-[0_10px_10px_rgba(0,0,0,0.4)]">DIGITAL</span>
                  <span className="block drop-shadow-[0_10px_10px_rgba(0,0,0,0.4)]">EXCELLENCE</span>
                </motion.div>
              </div>

              <motion.p 
                custom={3}
                initial="hidden"
                whileInView="visible"
                variants={fadeInUp}
                className="text-gray-300 max-w-[280px] md:max-w-sm text-xs md:text-base lg:text-lg font-medium leading-relaxed"
              >
                We translate complex visions into seamless digital experiences that dominate the market.
              </motion.p>
            </div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex lg:justify-end"
            >
              <a
                href="https://wa.me/923434378026"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center bg-white text-black px-6 py-4 md:px-10 md:py-5 rounded-full overflow-hidden transition-all duration-500 hover:pr-14"
              >
                <span className="relative z-10 text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">
                  Start a Project
                </span>
                <ArrowUpRight className="absolute right-4 md:right-6 w-4 h-4 md:w-5 md:h-5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0" aria-hidden="true" />
                <div className="absolute inset-0 bg-gray-200 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mt-8 md:mt-12 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-gray-300 to-transparent" />
        <span className="text-[8px] font-black uppercase tracking-[0.4em] text-gray-400">Scroll</span>
      </motion.div>

    </section>
  );
}