"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Calendar,
  CheckCircle2,
  Copy,
  Check,
  ArrowLeft,
  FileText,
  Clock,
  MessageSquare
} from "lucide-react";

export default function ContactSection() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [copied, setCopied] = useState(false);

  const emailAddress = "agency.nexa.01@gmail.com";
  const whatsappCallLink = "https://wa.me/923434378026?text=Hi%20NEXA%20Team!%20I'd%20like%20to%20book%20a%20consultation%20call%20to%20discuss%20my%20project.";
  
  const welcomeKitLink = "https://your-portfolio-link.com/nexa-2026.pdf";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative w-full px-6 py-24 lg:py-32 bg-white overflow-hidden scroll-mt-24">
      
      <AnimatePresence>
        {status === "success" && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="alert"
            aria-live="polite"
            className="fixed inset-0 z-[300] bg-white flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="max-w-2xl w-full text-center"
            >
              <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter mb-4 leading-none">
                Project Received.
              </h2>
              <p className="text-gray-500 font-medium mb-12 text-lg max-w-md mx-auto">
                Our strategy team is reviewing your details and will get back to you shortly.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                {[
                  { icon: Clock, title: "Review", desc: "Done in 24h" },
                  { icon: MessageSquare, title: "Discovery", desc: "Strategy Call" },
                  { icon: FileText, title: "Kickoff", desc: "Project Start" },
                ].map((step, i) => (
                  <div key={i} className="bg-gray-50 p-6 rounded-3xl border border-gray-100 text-left">
                    <step.icon className="w-5 h-5 mb-3 text-black" aria-hidden="true" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{step.title}</p>
                    <p className="text-sm font-bold text-gray-900">{step.desc}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button 
                  onClick={() => setStatus("idle")}
                  className="w-full sm:w-auto bg-gray-100 text-black px-10 py-5 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-gray-200 transition-colors flex items-center justify-center gap-3"
                >
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back to Site
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           aria-hidden="true"
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} 
      />

      <div className="relative z-10 max-w-[1500px] mx-auto">
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="font-poppins font-bold text-[10px] tracking-[0.4em] text-gray-400 mb-4 uppercase">Get In Touch</p>
            <h2 className="font-poppins font-bold text-5xl md:text-7xl lg:text-8xl text-gray-900 leading-[0.95] tracking-tighter">
              Let's Build <br /> <span className="text-gray-400">Extraordinary</span>
            </h2>
          </motion.div>
          <motion.p initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-gray-500 text-lg md:text-xl max-w-md lg:text-right font-medium leading-relaxed">
            Ready to transform your digital presence? We're currently accepting new projects for 2026.
          </motion.p>
        </header>

        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 xl:gap-20 items-start">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-8">
            <address className="not-italic bg-gray-50 p-10 rounded-[40px] border border-gray-100 space-y-8">
              <h3 className="text-2xl font-bold text-gray-900">Contact Details</h3>
              <div className="space-y-6">
                <button 
                  onClick={copyToClipboard} 
                  aria-label={`Copy email address: ${emailAddress}`}
                  className="flex w-full items-start gap-4 group text-left transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:bg-black transition-colors duration-300">
                    {copied ? <Check className="w-5 h-5 text-green-500" /> : <Mail className="w-5 h-5 text-black group-hover:text-white transition-colors" aria-hidden="true" />}
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                      {copied ? <span className="text-green-600">Copied!</span> : "General"}
                    </p>
                    <p className="text-gray-900 font-bold flex items-center gap-2">
                      {emailAddress} <Copy className="w-3 h-3 opacity-0 group-hover:opacity-40 transition-opacity" aria-hidden="true" />
                    </p>
                  </div>
                </button>
                <a href={whatsappCallLink} aria-label="Call Nexa Studio on WhatsApp" className="flex items-start gap-4 group cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:bg-black transition-colors duration-300">
                    <Phone className="w-5 h-5 text-black group-hover:text-white transition-colors" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Call Us</p>
                    <p className="text-gray-900 font-bold">+92 343 4378026</p>
                  </div>
                </a>
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:bg-black transition-colors duration-300">
                    <MapPin className="w-5 h-5 text-black group-hover:text-white transition-colors" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Office</p>
                    <p className="text-gray-900 font-bold">Lahore, Pakistan</p>
                  </div>
                </div>
              </div>
            </address>

            <motion.div whileHover={{ y: -5 }} className="bg-black text-white p-10 rounded-[40px] shadow-2xl relative overflow-hidden group">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2">Prefer a quick call?</h3>
                <p className="text-gray-400 mb-8 text-sm leading-relaxed">Book a free 30-minute consultation to discuss your vision.</p>
                <a href={whatsappCallLink} target="_blank" rel="noopener noreferrer" className="inline-flex bg-white text-black px-8 py-4 rounded-full font-black uppercase text-[10px] tracking-widest items-center gap-3 hover:bg-gray-200 transition-colors">
                  Schedule Now <Calendar className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
              <Calendar className="absolute -bottom-10 -right-10 w-40 h-40 text-white/5 rotate-12 group-hover:rotate-0 transition-transform duration-700" aria-hidden="true" />
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
            className="bg-white p-10 xl:p-16 rounded-[40px] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.05)] border border-gray-100"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-2">Name</label>
                  <input required id="name" name="name" type="text" placeholder="John Doe" className="w-full p-4 rounded-2xl bg-gray-50 border border-transparent focus:border-black focus:bg-white transition-all outline-none text-gray-900 font-medium" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-2">Email</label>
                  <input required id="email" name="email" type="email" placeholder="john@example.com" className="w-full p-4 rounded-2xl bg-gray-50 border border-transparent focus:border-black focus:bg-white transition-all outline-none text-gray-900 font-medium" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-2">Message</label>
                <textarea required id="message" name="message" rows={5} placeholder="Tell us about your project..." className="w-full p-5 rounded-3xl bg-gray-50 border border-transparent focus:border-black focus:bg-white transition-all outline-none text-gray-900 font-medium resize-none" />
              </div>
              <motion.button 
                disabled={status === "submitting"}
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-black text-white py-5 rounded-full font-black uppercase text-xs tracking-[0.3em] flex items-center justify-center gap-3 shadow-2xl hover:shadow-black/20 transition-all disabled:opacity-50"
              >
                {status === "submitting" ? "Sending..." : "Send Inquiry"}
                <Send className="w-4 h-4" aria-hidden="true" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}