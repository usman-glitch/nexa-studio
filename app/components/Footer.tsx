"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Camera, Share2, Mail, Globe, CheckCircle2, X } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 500);
      return;
    }
    setStatus("submitting");
    const formData = new FormData(e.currentTarget);
    try {
      const response = await fetch("https://formspree.io/f/mvzvkpqe", {
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        setStatus("success");
        setEmail("");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 500);
      }
    } catch (err) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 500);
    }
  };

  return (
    <footer className="relative bg-black text-white px-6 pt-24 pb-12 overflow-hidden">
      
      <AnimatePresence>
        {status === "success" && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="alert"
            className="fixed inset-0 z-[500] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white text-black max-w-sm w-full p-8 rounded-[32px] text-center relative"
            >
              <button 
                onClick={() => setStatus("idle")} 
                aria-label="Close success message"
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold tracking-tighter mb-2">You're on the list!</h3>
              <p className="text-gray-500 text-sm font-medium mb-6">Thanks for joining NEXA. We'll send the latest updates straight to your inbox.</p>
              <button onClick={() => setStatus("idle")} className="w-full bg-black text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-gray-800 transition-colors">
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
        aria-hidden="true"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} 
      />

      <div className="relative z-10 max-w-[1500px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr_1fr] gap-16 xl:gap-24 mb-24">
          
          <div className="max-w-md">
            <p className="text-[10px] font-black tracking-[0.4em] text-gray-500 mb-6 uppercase">Newsletter</p>
            <h3 className="text-3xl font-bold mb-6 tracking-tighter">Stay in the <span className="text-gray-500">loop.</span></h3>
            
            <motion.div 
              initial={{ rotate: 0, opacity: 1 }}
              whileHover={{ 
                rotate: 36000,
                opacity: [1, 1, 0] 
              }} 
              transition={{ 
                duration: 10, 
                ease: "easeIn", 
                repeat: Infinity,
                opacity: { times: [0, 0.7, 1], duration: 10 } 
              }}
              className="mb-8 w-fit"
            >
              <Image 
                src="/icon.png" 
                alt="Nexa Studio Brand Icon" 
                width={50} 
                height={50} 
                className="opacity-100"
              />
            </motion.div>

            <div className="space-y-4">
              <form onSubmit={handleNewsletterSubmit} className="group relative">
                <label htmlFor="footer-email" className="sr-only">Email Address</label>
                <motion.input
                  id="footer-email"
                  animate={status === "error" ? { x: [-10, 10, -10, 10, 0] } : {}}
                  transition={{ duration: 0.4 }}
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className={`w-full bg-white/5 border ${status === "error" ? "border-red-500/50" : "border-white/10"} px-6 py-4 rounded-2xl text-sm outline-none placeholder:text-gray-600 focus:border-white/40 focus:bg-white/10 transition-all`}
                />
                <button 
                  disabled={status === "submitting"} 
                  type="submit" 
                  aria-label="Subscribe to newsletter"
                  className="absolute right-2 top-2 bottom-2 bg-white text-black px-6 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 transition active:scale-95 disabled:opacity-50"
                >
                  <span className="hidden sm:block text-[10px] font-black uppercase tracking-widest">{status === "submitting" ? "..." : "Join"}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </form>
            </div>
          </div>

          <nav className="flex flex-col gap-4" aria-label="Footer Navigation">
            <p className="text-[10px] font-black tracking-[0.4em] text-gray-500 mb-2 uppercase">Explore</p>
            {[
              { name: "Testimonials", href: "/#testimonials" },
              { name: "The Work", href: "/work" },
              { name: "Services", href: "/#services" },
              { name: "About", href: "/about" },
              { name: "Contact", href: "/#contact" }
            ].map((item) => (
              <a key={item.name} href={item.href} className="text-lg font-bold text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 w-fit">{item.name}</a>
            ))}
          </nav>

          <div className="flex flex-col gap-4 lg:items-end lg:text-right">
            <p className="text-[10px] font-black tracking-[0.4em] text-gray-500 mb-2 uppercase">Connect</p>
            <nav className="flex gap-4 mb-6" aria-label="Social Media Links">
              <a href="https://www.instagram.com/nexastudioofficials/" target="_blank" rel="noopener noreferrer" aria-label="Follow Nexa Studio on Instagram" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500">
                <Camera className="w-4 h-4" />
              </a>
              <a href="https://www.facebook.com/share/17dEuyeb1m/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Follow Nexa Studio on Facebook" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="https://www.linkedin.com/company/official-nexa" target="_blank" rel="noopener noreferrer" aria-label="Follow Nexa Studio on LinkedIn" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500">
                <Globe className="w-4 h-4" />
              </a>
              <a href="mailto:contact@nexastudioofficial.com" aria-label="Email Nexa Studio" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500">
                <Mail className="w-4 h-4" />
              </a>
            </nav>
            <address className="space-y-2 not-italic">
              <p className="text-gray-400 font-bold">contact@nexastudioofficial.com</p>
              <nav className="pt-4 flex lg:flex-col items-start lg:items-end gap-4 lg:gap-2" aria-label="Legal Links">
                <a href="/privacy" className="text-[10px] font-black text-gray-600 hover:text-white uppercase tracking-widest transition-colors">Privacy Policy</a>
                <a href="/terms" className="text-[10px] font-black text-gray-600 hover:text-white uppercase tracking-widest transition-colors">Terms & Conditions</a>
              </nav>
            </address>
          </div>
        </div>
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em]">© 2026 NEXA STUDIO — ALL RIGHTS RESERVED</p>
        </div>
      </div>

      {/* BACKGROUND DECORATION */}
      <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none z-0" aria-hidden="true">
        <h2 className="text-[20vw] font-black text-white/[0.06] leading-none tracking-tighter">NEXA</h2>
      </div>
    </footer>
  );
}