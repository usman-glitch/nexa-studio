"use client";
// 1. FIXED THE IMPORT PATH BELOW
import PageTransition from "../components/PageTransition";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Plus } from "lucide-react";
import Footer from "../components/Footer"; // Ensure this path matches your file structure


const projects = [
  {
    title: "SM Rice Traders",
    category: "Product Design / Development",
    year: "2024",
    image: "/project1.png",
    color: "#E5E7EB"
  },
  {
    title: "Nike Air Max Campaign",
    category: "Identity / Motion",
    year: "2023",
    image: "/project2(1).png",
    color: "#D1D5DB"
  },
  {
    title: "Adidas UX Overhaul",
    category: "UI/UX / Strategy",
    year: "2024",
    image: "/project3.png",
    color: "#F3F4F6"
  },
  {
    title: "Adidas Sportswear",
    category: "Full Stack / Design",
    year: "2023",
    image: "/project4.png",
    color: "#E2E8F0"
  }
];

export default function WorkPage() {
  return (
    <PageTransition>
      <main className="bg-white min-h-screen pt-32 pb-10 md:pb-20 px-6">
        <div className="max-w-[1500px] mx-auto">
          
          {/* PAGE HEADER */}
          <header className="mb-16 md:mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-6">
                Portfolio
              </p>
              <h1 className="text-5xl md:text-8xl lg:text-9xl font-black text-gray-900 tracking-tighter leading-[0.85] mb-8">
                Selected <br />
                <span className="text-gray-200">Works.</span>
              </h1>
            </motion.div>
          </header>

          {/* PROJECTS GRID */}
          <section aria-label="Portfolio Project Showcase" className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 md:gap-y-24">
            {projects.map((project, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i % 2 * 0.2 }}
                className="group" 
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[30px] md:rounded-[40px] bg-gray-100 mb-6 md:mb-8 cursor-pointer">
                  {/* IMAGE */}
                  <Image
                    src={project.image}
                    alt={`Case study for ${project.title} - ${project.category}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out grayscale group-hover:grayscale-0"
                  />
                  
                  {/* HOVER OVERLAY */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center" aria-hidden="true">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
                      <ArrowUpRight className="text-black w-6 h-6 md:w-8 md:h-8" />
                    </div>
                  </div>

                  {/* YEAR TAG */}
                  <div className="absolute top-6 left-6 md:top-8 left-8">
                    <span className="px-3 py-1.5 md:px-4 md:py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[9px] md:text-[10px] font-bold text-white uppercase tracking-widest">
                      {project.year}
                    </span>
                  </div>
                </div>

                {/* PROJECT INFO */}
                <div className="flex justify-between items-start px-1 md:px-2">
                  <div className="max-w-[80%]">
                    <h3 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tighter mb-2">
                      {project.title}
                    </h3>
                    <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">
                      {project.category}
                    </p>
                  </div>
                  <button 
                    aria-label={`View details for ${project.title}`}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-black group-hover:border-black transition-all duration-300 flex-shrink-0"
                  >
                    <Plus className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-white group-hover:rotate-90 transition-all duration-500" aria-hidden="true" />
                  </button>
                </div>
              </motion.article>
            ))}
          </section>

          {/* BOTTOM CTA */}
          <section className="mt-32 md:mt-48 py-16 md:py-24 border-t border-gray-100 text-center">
            <h2 className="text-3xl md:text-6xl font-black tracking-tighter mb-8 md:mb-10">
              Have a vision? <br />
              <span className="text-gray-300">Let's bring it to life.</span>
            </h2>
            <a 
              href="https://wa.me/923434378026"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Start a project with Nexa Studio via WhatsApp"
              className="inline-flex items-center gap-3 md:gap-4 bg-black text-white px-8 py-4 md:px-12 md:py-6 rounded-full text-[10px] md:text-xs font-black uppercase tracking-[0.2em] hover:scale-105 transition-transform"
            >
              Start a Project <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4" aria-hidden="true" />
            </a>
          </section>

        </div>
        
        {/* RESPONSIVE FOOTER WRAPPER */}
        <div className="w-full mt-10 md:mt-20 border-t border-gray-50">
          <Footer />
        </div>
      </main>
    </PageTransition>
  );
}