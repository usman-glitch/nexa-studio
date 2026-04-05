"use client";

import PageTransition from "../components/PageTransition";
// Added 'useMotionValue' and 'useSpring' for the 3D tilt
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Plus, Zap } from "lucide-react";
import Footer from "../components/Footer";
import { useRef, useState } from "react";

const projects = [
  {
    title: "NEXA Intelligence",
    category: "AI Infrastructure / v1.0",
    year: "2026",
    image: "/project1.png",
    description: "Architecting the future of automated branding systems."
  },
  {
    title: "Quantum Motion",
    category: "High-End Animation / UX",
    year: "2026",
    image: "/project2(1).png",
    description: "Pushing the limits of 60fps web interactions."
  },
  {
    title: "Onyx Commerce",
    category: "Luxury E-com / Next.js",
    year: "2025",
    image: "/project3.png",
    description: "A dark-mode shopping experience for boutique labels."
  },
  {
    title: "Titan Branding",
    category: "Identity / 3D Design",
    year: "2025",
    image: "/project4.png",
    description: "Solidifying digital presence for industrial leaders."
  }
];

// --- 3D TILT COMPONENT WRAPPER (Power Addition) ---
function TiltCard({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Springs create smooth, realistic motion
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  // Map mouse position (-0.5 to 0.5) to rotation (-10 to 10 degrees)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d", // Crucial for 3D depth
      }}
      className="relative w-full h-full"
    >
      {children}
    </motion.div>
  );
}

export default function WorkPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  // Adjusted opacity timing slightly to keep header visible longer
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // Kinetic Text Split setup
  const titleText = "WORK";

  return (
    <PageTransition>
      <main 
        ref={containerRef}
        className="relative min-h-screen pt-32 pb-10 md:pb-20 px-6 text-white overflow-hidden"
        style={{
          backgroundColor: "#080808",
          backgroundImage: `url('/carbonfiber2.png')`,
          backgroundSize: "180px",
          backgroundRepeat: "repeat",
          perspective: "1500px", // Enables 3D perspective for the whole page
        }}
      >
        {/* NEON OVERLAY GRADIENT */}
        <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-black/80 via-transparent to-black/90 z-0" />
        
        <div className="max-w-[1500px] mx-auto relative z-10">
          
          {/* HEADER SECTION: KINETIC TYPOGRAPHY (Upgrade) */}
          <header className="mb-24 md:mb-40">
            <motion.div style={{ opacity }}>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-[1px] bg-[#00887a]" />
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#00887a]">
                  Archive 2026
                </p>
              </div>

              {/* Character-by-Character Split (More Power) */}
              <h1 className="text-6xl md:text-[10rem] lg:text-[13rem] font-black tracking-tighter leading-[0.8] mix-blend-difference flex flex-wrap">
                {titleText.split("").map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 50, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ 
                      duration: 0.8, 
                      delay: index * 0.1, 
                      ease: [0.215, 0.61, 0.355, 1] // cubic-bezier.com finish
                    }}
                    style={{ transformOrigin: "top center" }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
                <span className="text-[#00887a]">.</span>
              </h1>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-8 text-gray-500 max-w-md text-sm font-medium leading-relaxed uppercase tracking-widest"
              >
                Selected outputs from the intersection of <br /> 
                <span className="text-white">Design, Code & Strategy.</span>
              </motion.p>
            </motion.div>
          </header>

          {/* PROJECTS GRID: ASYMMETRICAL LAYOUT */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-y-32 md:gap-y-64">
            {projects.map((project, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className={`col-span-1 md:col-span-7 ${i % 2 !== 0 ? "md:col-start-6" : "md:col-start-1"}`}
              >
                <div className="group relative">
                  {/* FLOATING YEAR INDICATOR */}
                  <div className="absolute -top-10 left-0 z-20 font-black text-6xl text-white/5 group-hover:text-[#00887a]/20 transition-colors duration-700">
                    {project.year}
                  </div>

                  {/* MAIN IMAGE CONTAINER (Upgrade with 3D Tilt) */}
                  <TiltCard>
                    <div className="relative aspect-[16/10] overflow-hidden rounded-sm border border-white/10 bg-zinc-900 group-hover:border-[#00887a]/50 transition-colors duration-500 shadow-2xl shadow-black/50">
                      
                      {/* Sub-element with preserve-3d for the image scale */}
                      <div style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }} className="w-full h-full relative">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover scale-110 group-hover:scale-105 transition-transform duration-[2s] ease-out opacity-80 group-hover:opacity-100 grayscale group-hover:grayscale-0"
                        />
                      </div>
                      
                      {/* OVERLAY INTERACTION */}
                      <div className="absolute inset-0 bg-[#00887a]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    </div>
                  </TiltCard>

                  {/* PROJECT META */}
                  <div className="mt-10 flex flex-col md:flex-row justify-between items-start gap-6 relative z-30">
                    <div>
                      <h3 className="text-3xl md:text-5xl font-black tracking-tighter uppercase mb-2 group-hover:text-[#00887a] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs font-bold text-zinc-500 uppercase tracking-[0.3em]">
                        {project.category}
                      </p>
                      <p className="mt-4 text-zinc-400 text-sm max-w-sm leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                    
                    <button className="relative overflow-hidden group/btn flex items-center gap-4 px-6 py-3 border border-white/10 rounded-full hover:border-[#00887a] transition-all">
                      <span className="text-[10px] font-black uppercase tracking-widest relative z-10">Case Study</span>
                      <ArrowUpRight size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform relative z-10" />
                      <div className="absolute inset-0 bg-[#00887a] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </section>

          {/* NEXT LEVEL CTA */}
          <section className="mt-64 mb-32 relative py-40 overflow-hidden rounded-[40px] border border-white/5 bg-zinc-900/50 backdrop-blur-sm text-center">
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "radial-gradient(#00887a 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Zap className="mx-auto text-[#00887a] mb-8" size={48} />
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-12 italic uppercase leading-none">
                Ready for the <br /> <span className="text-[#00887a]">Next Dimension?</span>
              </h2>
              <a 
                href="https://wa.me/923434378026"
                target="_blank"
                className="inline-block bg-white text-black px-12 py-6 rounded-full font-black uppercase text-xs tracking-widest hover:bg-[#00887a] hover:text-white transition-all transform hover:scale-110"
              >
                Launch Project
              </a>
            </motion.div>
          </section>

        </div>
        
        <Footer />
      </main>
    </PageTransition>
  );
}