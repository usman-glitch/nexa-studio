"use client";

import { motion } from "framer-motion";
import { Quote, Star, Plus } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    content: "Working with NEXA felt easy. They understood what we wanted, even when we couldn't fully explain it ourselves.",
    author: "Client Partner",
    size: "large",
  },
  {
    content: "Our brand finally feels like it has an identity. The difference before and after is clear.",
    author: "Founder & CEO",
    size: "medium",
  },
  {
    content: "They pay attention to details most people ignore — and that's what makes their work stand out.",
    author: "Creative Lead",
    size: "medium",
  },
  {
    content: "You can tell they actually care about the outcome, not just the delivery.",
    author: "Project Manager",
    size: "large",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-32 bg-white overflow-hidden scroll-mt-32">
      <div className="max-w-[1500px] mx-auto px-6">
        
        {/* HEADER SECTION */}
        <header className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-end">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-6"
            >
              <div className="w-10 h-[1px] bg-black" aria-hidden="true" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black">
                Kind Words
              </span>
            </motion.div>

            <h2 className="font-poppins font-bold text-5xl md:text-7xl lg:text-8xl text-gray-900 tracking-tighter leading-[0.85]">
              Real Impact. <br />
              <span className="text-gray-400">Honest Feedback.</span>
            </h2>
          </div>
          
          <div className="lg:pb-4">
            <p className="text-gray-500 max-w-md text-lg leading-relaxed font-medium">
              We don't just complete projects; we build lasting identities. Here is how our partners describe the NEXA experience.
            </p>
          </div>
        </header>

        {/* TESTIMONIAL GRID */}
        <div className="columns-1 md:columns-2 gap-6 space-y-6">
          {testimonials.map((item, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`break-inside-avoid relative p-10 rounded-[40px] border border-gray-100 bg-gray-50/50 flex flex-col justify-between group hover:bg-black transition-all duration-700 cursor-default shadow-sm hover:shadow-2xl`}
            >
              <div className="mb-12 flex justify-between items-start">
                <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/20 transition-all">
                  <Quote className="w-5 h-5 text-black group-hover:text-white" aria-hidden="true" />
                </div>

                <div className="flex gap-1" role="img" aria-label="5 star rating">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-black text-black group-hover:fill-white group-hover:text-white transition-colors" />
                  ))}
                </div>
              </div>

              <blockquote className="mb-12">
                <p className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-white leading-snug tracking-tight transition-colors">
                  "{item.content}"
                </p>
              </blockquote>

              <figcaption className="flex items-center justify-between border-t border-gray-200 group-hover:border-white/10 pt-8 transition-colors">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 group-hover:text-gray-500">
                  {item.author} — Verified Result 2026
                </span>
                <Plus className="w-4 h-4 text-gray-300 group-hover:rotate-45 transition-transform duration-500" aria-hidden="true" />
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>

      {/* LOGO CLOUD SECTION - INFINITE SEAMLESS LOOP */}
      <div className="w-full mt-32 pt-12 overflow-hidden relative min-h-[14rem] flex flex-col justify-center gap-12">
        
        {/* ROW 1: Logos 1-11 */}
        <div className="flex w-full">
          <motion.div 
            className="flex whitespace-nowrap gap-16 items-center flex-shrink-0"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ 
              duration: 35, 
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop"
            }}
          >
            {[...Array(22)].map((_, i) => {
              const logoNum = (i % 11) + 1;
              const isLargeLogo = logoNum === 17 || logoNum === 8;
              // Hard-coded override for logo8 to bypass caching/case issues
              const logoSrc = logoNum === 8 ? "/partner-logo-v8.png" : `/logo${logoNum}.png`;
              
              return (
                <div 
                  key={`r1-${i}`} 
                  className={`${isLargeLogo ? 'w-72 h-40' : 'w-52 h-28'} relative flex-shrink-0 transition-transform duration-500 hover:scale-110`}
                >
                  <Image
                    src={logoSrc}
                    alt="Partner Logo"
                    fill
                    sizes={isLargeLogo ? "288px" : "208px"}
                    className="object-contain"
                    priority={logoNum <= 5}
                  />
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* ROW 2: Logos 12-22 */}
        <div className="flex w-full">
          <motion.div 
            className="flex whitespace-nowrap gap-16 items-center flex-shrink-0"
            animate={{ x: ["-50%", "0%"] }}
            transition={{ 
              duration: 35, 
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop"
            }}
          >
            {[...Array(22)].map((_, i) => {
              const logoNum = (i % 11) + 12;
              const isLargeLogo = logoNum === 17;
              return (
                <div 
                  key={`r2-${i}`} 
                  className={`${isLargeLogo ? 'w-72 h-40' : 'w-52 h-28'} relative flex-shrink-0 transition-transform duration-500 hover:scale-110`}
                >
                  <Image
                    src={`/logo${logoNum}.png`}
                    alt="Partner Logo"
                    fill
                    sizes={isLargeLogo ? "288px" : "208px"}
                    className="object-contain"
                  />
                </div>
              );
            })}
          </motion.div>
        </div>

      </div>
    </section>
  );
}