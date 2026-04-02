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

            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 tracking-tighter leading-[0.85]">
              Real Impact. <br />
              <span className="text-gray-300">Honest Feedback.</span>
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

        {/* LOGO CLOUD SECTION */}
        <div className="mt-32 pt-12 border-t border-gray-100 overflow-hidden relative min-h-[14rem] flex flex-col justify-center gap-12">
          <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-white to-transparent z-10" />

          {/* ROW 1 */}
          <div className="flex">
            <motion.div 
              className="flex whitespace-nowrap gap-16 items-center flex-shrink-0"
              animate={{ 
                x: ["0%", "-50%"],
                scale: [1, 1.03, 1],
                rotate: [-0.8, 0.8, -0.8],
                opacity: [0.7, 0.9, 0.7]
              }}
              transition={{ 
                x: { ease: "linear", duration: 32, repeat: Infinity },
                scale: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
                opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              {Array.from({ length: 38 }, (_, i) => {
                const logoNum = ((i % 19) + 1);
                return (
                  <motion.div 
                    key={`r1-${i}`} 
                    className="w-48 h-24 relative flex-shrink-0 shadow-2xl hover:shadow-3xl hover:drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)] transition-all duration-400 cursor-pointer border border-gray-100/50 hover:border-gray-200/70 rounded-2xl hover:bg-white/30 backdrop-blur-sm"
                    whileHover={{ 
                      y: -12, 
                      scale: 1.2,
                      rotate: [0, 5, -5, 0],
                      transition: { duration: 0.6 }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Image
                      src={`/logo${logoNum}.png`}
                      alt={`Partner logo ${logoNum}`}
                      fill
                      sizes="192px"
                      className="object-contain brightness-130 saturate-175 hover:brightness-160 hover:saturate-200 hover:drop-shadow-lg"
                      priority={logoNum <= 5}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* ROW 2 */}
          <div className="flex">
            <motion.div 
              className="flex whitespace-nowrap gap-16 items-center flex-shrink-0"
              animate={{ 
                x: ["-50%", "0%"],
                scale: [1, 1.03, 1],
                rotate: [0.8, -0.8, 0.8],
                opacity: [0.7, 0.9, 0.7]
              }}
              transition={{ 
                x: { ease: "linear", duration: 38, repeat: Infinity },
                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                opacity: { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              {Array.from({ length: 38 }, (_, i) => {
                const logoNum = ((i % 19) + 1);
                return (
                  <motion.div 
                    key={`r2-${i}`} 
                    className="w-48 h-24 relative flex-shrink-0 shadow-2xl hover:shadow-3xl hover:drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)] transition-all duration-400 cursor-pointer border border-gray-100/50 hover:border-gray-200/70 rounded-2xl hover:bg-white/30 backdrop-blur-sm"
                    whileHover={{ 
                      y: -12, 
                      scale: 1.2,
                      rotate: [0, 5, -5, 0],
                      transition: { duration: 0.6 }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Image
                      src={`/logo${logoNum}.png`}
                      alt={`Partner logo ${logoNum}`}
                      fill
                      sizes="192px"
                      className="object-contain brightness-130 saturate-175 hover:brightness-160 hover:saturate-200 hover:drop-shadow-lg"
                      priority={logoNum <= 5}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}