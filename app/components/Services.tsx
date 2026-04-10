"use client";

import { motion } from "framer-motion";
import {
  Code,
  Palette,
  Smartphone,
  Cloud,
  Shield,
  Sparkles,
} from "lucide-react";

const services = [
  {
    title: "Web Development",
    desc: "Modern, fast, and scalable web applications built with the latest frameworks.",
    icon: Code,
  },
  {
    title: "UI/UX Design",
    desc: "Beautiful, intuitive, and user-friendly interfaces designed to convert.",
    icon: Palette,
  },
  {
    title: "SEO & Marketing",
    desc: "Improve your online visibility and drive organic growth through data.",
    icon: Smartphone,
  },
  {
    title: "Content Strategy",
    desc: "Comprehensive content execution and solutions tailored to your voice.",
    icon: Cloud,
  },
  {
    title: "AI Solutions",
    desc: "Cutting-edge artificial intelligence solutions to automate and optimize your business processes.",
    icon: Shield,
  },
  {
    title: "AI Agent Integration",
    desc: "Seamless integration of AI agents to enhance your team's productivity and efficiency.",
    icon: Sparkles,
  },
];

export default function Services() {
  return (
    <section id="services" className="relative w-full px-6 py-24 lg:py-32 bg-gray-50 overflow-hidden scroll-mt-24">
      
      {/* 1. THEME CONSISTENT BACKGROUND (Grid + Glow) */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           aria-hidden="true"
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} 
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0)_0%,rgba(249,250,251,1)_80%)] z-0" aria-hidden="true" />

      <div className="relative z-10 max-w-[1500px] mx-auto">

        {/* HEADER - Widened for Laptop */}
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <p className="text-[10px] font-black tracking-[0.4em] text-gray-400 mb-4 uppercase">
              Our Expertise
            </p>
            {/* UPDATED HEADING STYLE: Poppins Bold */}
            <h2 className="font-poppins font-bold text-5xl md:text-7xl text-gray-900 leading-[0.95] tracking-tighter">
              What We Can Do <br />
              <span className="text-gray-400">For Your Business</span>
            </h2>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-gray-500 text-lg md:text-xl max-w-md lg:text-right font-medium leading-relaxed"
          >
            End-to-end digital solutions designed to scale your impact and streamline your operations.
          </motion.p>
        </header>

        {/* CARDS GRID - Fully Responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12">
          {services.map((service, i) => {
            const Icon = service.icon;

            return (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -12 }}
                aria-labelledby={`service-title-${i}`}
                className="group relative bg-white p-10 xl:p-14 rounded-[40px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 border border-gray-100/50 flex flex-col items-start cursor-pointer"
              >
                {/* ICON - Custom Polished State */}
                <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-gray-50 mb-8 transition-all duration-500 group-hover:bg-black group-hover:rotate-[10deg] group-hover:scale-110" aria-hidden="true">
                  <Icon className="w-8 h-8 text-black group-hover:text-white transition-colors duration-500" />
                </div>

                {/* CONTENT */}
                <h3 id={`service-title-${i}`} className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">
                  {service.title}
                </h3>
                <p className="text-gray-500 leading-relaxed text-base font-medium">
                  {service.desc}
                </p>

                {/* INTERACTIVE FOOTER */}
                <div className="mt-10 flex items-center gap-2 overflow-hidden w-full" aria-hidden="true">
                   <div className="h-[2px] w-0 bg-black group-hover:w-full transition-all duration-700 ease-in-out"></div>
                   <span className="text-[10px] font-black tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-300">Explore</span>
                </div>

                {/* SUBTLE CARD GLOW */}
                <div className="absolute -z-10 inset-0 bg-gradient-to-br from-white to-gray-50 rounded-[40px]" aria-hidden="true" />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}