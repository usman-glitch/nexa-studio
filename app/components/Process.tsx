"use client";

import { motion } from "framer-motion";
import { MessageSquare, Lightbulb, Code, Rocket, ArrowRight, CheckCircle2 } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "R&D Phase",
    desc: "Before anything is created, we take a step back and understand. We look into your brand, audience, and competitors to find the direction that actually works.",
    icon: MessageSquare,
  },
  {
    number: "02",
    title: "Design & Creation",
    desc: "Ideas turn into visuals. We focus on details, composition, and storytelling. Everything is created with intention—nothing is left to chance.",
    icon: Lightbulb,
  },
  {
    number: "03",
    title: "Launch & Amplify",
    desc: "The other half of the job is making sure it reaches the right people. We guide how and where your content should be launched to perform.",
    icon: Code,
  },
  {
    number: "04",
    title: "Brand Growth",
    desc: "We offer creative and digital services designed to help brands grow, stand out, and stay consistent across every digital touchpoint.",
    icon: Rocket,
  },
];

export default function Process() {
  /* WhatsApp link constant */
  const whatsappCallLink = "https://wa.me/923434378026?text=Hi%20NEXA%20Team!%20I'd%20like%20to%20book%20a%20consultation%20call%20to%20discuss%20my%20project.";

  return (
    <section className="relative w-full px-6 py-24 lg:py-32 bg-black text-white overflow-hidden">
      
      {/* 1. THEME CONSISTENT BACKGROUND (Dark Grid) */}
      <div className="absolute inset-0 z-0 opacity-[0.06] pointer-events-none" 
           aria-hidden="true"
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} 
      />
      
      {/* 2. GLOW EFFECT */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-900/20 rounded-full blur-[120px] z-0" aria-hidden="true" />

      <div className="relative z-10 max-w-[1500px] mx-auto">

        {/* HEADER - Split for Widescreen */}
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[10px] font-black tracking-[0.4em] text-gray-500 mb-4 uppercase">
              Our Methodology
            </p>
            <h2 className="text-5xl md:text-7xl font-black text-white leading-[0.95] tracking-tighter">
              The Path To <br />
              <span className="text-gray-600">Digital Impact</span>
            </h2>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-gray-400 text-lg md:text-xl max-w-md lg:text-right font-medium leading-relaxed"
          >
            A streamlined, four-step approach to turning complex challenges into high-performance digital results.
          </motion.p>
        </header>

        {/* STEP CARDS - Semantic List for SEO */}
        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative bg-gray-900/40 backdrop-blur-md p-8 xl:p-10 rounded-[32px] border border-white/5 hover:border-white/20 transition-all duration-500 list-none"
              >
                <div className="flex justify-between items-start mb-10">
                  <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/5 group-hover:bg-white transition-all duration-500 group-hover:rotate-[10deg]">
                    <Icon className="w-7 h-7 text-white group-hover:text-black transition-colors" aria-hidden="true" />
                  </div>
                  <span 
                    className="text-4xl font-black text-white/5 group-hover:text-white/10 transition-colors uppercase"
                    aria-label={`Step ${step.number}`}
                  >
                    {step.number}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed font-medium">
                  {step.desc}
                </p>
                
                {/* Visual Connector for Laptop */}
                {i < 3 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-20" aria-hidden="true">
                    <ArrowRight className="w-6 h-6 text-white/10 group-hover:text-white/40 group-hover:translate-x-1 transition-all" />
                  </div>
                )}
              </motion.li>
            );
          })}
        </ol>

        {/* BOTTOM SERVICES STRIP */}
        <div className="mt-24 pt-20 border-t border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">Expert Services</h3>
              <p className="text-gray-500 text-lg max-w-xl">
                Beyond our process, we offer specialized execution across the digital landscape to ensure your brand stays consistent.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="list" aria-label="Nexa Studio Core Service Offerings">
              {[
                "Social Management", "Graphic Design", 
                "AI Content Production", "Web Development"
              ].map((service, idx) => (
                <div key={idx} role="listitem" className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                  <CheckCircle2 className="w-5 h-5 text-gray-400" aria-hidden="true" />
                  <span className="text-sm font-bold text-white uppercase tracking-wider">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA SECTION */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-24 p-12 rounded-[40px] bg-gradient-to-r from-gray-900 to-black border border-white/10 text-center relative overflow-hidden"
        >
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-black mb-6">Ready to start?</h3>
            <a 
              href={whatsappCallLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Book a consultation call with Nexa Studio on WhatsApp"
              className="bg-white text-black px-10 py-4 rounded-full font-black uppercase text-xs tracking-[0.2em] hover:bg-gray-200 transition-colors inline-flex items-center gap-3"
            >
              Get Started Today
              <Rocket className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
          {/* Subtle decoration inside CTA */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" aria-hidden="true" />
        </motion.div>

      </div>
    </section>
  );
}