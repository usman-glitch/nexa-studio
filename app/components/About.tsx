"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="relative w-full px-6 py-20 lg:py-32 bg-white overflow-hidden">
      
      {/* 1. BACKGROUND DECORATION */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           aria-hidden="true"
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} 
      />
      
      {/* 2. SOFT GRADIENT GLOW */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-gray-100 rounded-full blur-[120px] z-0" aria-hidden="true" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-gray-50 rounded-full blur-[100px] z-0" aria-hidden="true" />

      <div className="relative z-10 max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-24 items-center">

        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="inline-block px-3 py-1 mb-6 text-[10px] font-black tracking-[0.4em] text-white bg-black rounded-full uppercase">
            EST. 2023
          </p>

          <h2 className="text-5xl md:text-7xl xl:text-8xl font-black text-gray-900 leading-[0.95] tracking-tighter">
            Building <br />
            Digital <span className="text-gray-300">Excellence</span>
          </h2>

          <p className="text-gray-500 mt-10 text-lg md:text-xl lg:text-2xl leading-relaxed max-w-[650px]">
            We are a premium digital agency dedicated to transforming ideas
            into powerful digital experiences using cutting-edge technology.
          </p>

          <div className="mt-14 border-t border-gray-100 pt-10">
            <h3 className="sr-only">Our Core Services</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-8 gap-x-4">
              {[
                "Full-Stack", "Marketing", "UI/UX Design", 
                "Content", "Consulting", "Strategy"
              ].map((item, idx) => (
                <div key={idx} className="group">
                  <p className="text-xs font-bold text-gray-400 group-hover:text-black transition-colors duration-300 tracking-widest uppercase">
                    {item}
                  </p>
                  <div className="h-[2px] w-8 bg-gray-200 mt-2 group-hover:w-16 group-hover:bg-black transition-all duration-500" aria-hidden="true" />
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative grid gap-6"
        >
          {/* Card 1 - Expertise */}
          <motion.article 
            whileHover={{ y: -10, scale: 1.02 }}
            className="backdrop-blur-xl bg-black/95 text-white p-10 xl:p-14 rounded-[40px] shadow-2xl cursor-default transition-shadow hover:shadow-black/20"
          >
            <h4 className="font-bold text-3xl mb-4">Expertise</h4>
            <p className="text-gray-400 text-lg leading-relaxed">
              Delivering exceptional digital solutions that push the boundaries of what is possible.
            </p>
          </motion.article>

          {/* Card 2 - Team */}
          <motion.article 
            whileHover={{ y: -10, scale: 1.02 }}
            className="bg-gray-50 p-10 xl:p-14 rounded-[40px] border border-gray-200 lg:-ml-20 xl:-ml-32 shadow-xl relative z-20 cursor-default transition-shadow hover:shadow-2xl"
          >
            <h4 className="font-bold text-3xl text-gray-900 mb-4">Team</h4>
            <p className="text-gray-500 text-lg leading-relaxed">
              A passionate collective of digital architects, designers, and growth strategists.
            </p>
          </motion.article>

          {/* STATS - Semantic data points */}
          <div className="grid grid-cols-3 gap-6 mt-6" role="list" aria-label="Nexa Studio Achievement Statistics">
            <div className="text-left border-l-2 border-gray-100 pl-6" role="listitem">
              <h3 className="text-4xl font-black text-gray-900">150+</h3>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Projects</p>
            </div>
            <div className="text-left border-l-2 border-gray-100 pl-6" role="listitem">
              <h3 className="text-4xl font-black text-gray-900">50+</h3>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Clients</p>
            </div>
            <div className="text-left border-l-2 border-gray-100 pl-6" role="listitem">
              <h3 className="text-4xl font-black text-gray-900">99%</h3>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Success</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}