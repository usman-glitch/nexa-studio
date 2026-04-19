"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, X } from "lucide-react";
import Image from "next/image";

const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/nexastudioofficials/",
    svg: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/17dEuyeb1m/?mibextid=wwXIfr",
    svg: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/official-nexa",
    svg: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:contact@nexastudioofficial.com",
    svg: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
];

const navLinks = [
  { name: "Testimonials", href: "/#testimonials" },
  { name: "The Work", href: "/work" },
  { name: "Services", href: "/#services" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/#contact" },
];

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
        headers: { Accept: "application/json" },
      });
      if (response.ok) {
        setStatus("success");
        setEmail("");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 500);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 500);
    }
  };

  return (
    <footer className="relative bg-black text-white overflow-hidden">

      {/* ── Success Modal ── */}
      <AnimatePresence>
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="alert"
            className="fixed inset-0 z-[500] bg-black/85 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.92, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 24 }}
              className="bg-white text-black max-w-sm w-full p-8 rounded-[32px] text-center relative"
            >
              <button
                onClick={() => setStatus("idle")}
                aria-label="Close"
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold tracking-tighter mb-2">You're on the list!</h3>
              <p className="text-gray-500 text-sm font-medium mb-6">
                Thanks for joining NEXA. We'll send the latest updates straight to your inbox.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="w-full bg-black text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-gray-800 transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Grid texture ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        aria-hidden="true"
        style={{
          opacity: 0.022,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* ── Top separator ── */}
      <div className="relative z-10 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)" }}
      />

      <div className="relative z-10 max-w-[1500px] mx-auto px-6 pt-20">

        {/* ── Main 3-col grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr_1fr] gap-16 xl:gap-28 mb-20">

          {/* ── Newsletter ── */}
          <div className="max-w-md">
            <p className="text-[9px] font-black tracking-[0.4em] text-white/25 mb-5 uppercase">
              Newsletter
            </p>
            <h3 className="text-[2rem] font-bold mb-6 tracking-tighter leading-tight">
              Stay in the{" "}
              <span className="text-white/25">loop.</span>
            </h3>

            <motion.div
              initial={{ rotate: 0, opacity: 1 }}
              whileHover={{ rotate: 36000, opacity: [1, 1, 0] }}
              transition={{ duration: 10, ease: "easeIn", repeat: Infinity, opacity: { times: [0, 0.7, 1], duration: 10 } }}
              className="mb-8 w-fit"
            >
              <Image src="/icon.png" alt="Nexa Studio icon" width={46} height={46} />
            </motion.div>

            <form onSubmit={handleNewsletterSubmit} className="relative">
              <label htmlFor="footer-email" className="sr-only">Email address</label>
              <motion.input
                id="footer-email"
                animate={status === "error" ? { x: [-10, 10, -10, 10, 0] } : {}}
                transition={{ duration: 0.4 }}
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className={`w-full bg-white/[0.04] border px-6 py-4 rounded-2xl text-sm outline-none
                  placeholder:text-white/18 focus:bg-white/[0.06] transition-all
                  ${status === "error" ? "border-red-500/40" : "border-white/8 focus:border-white/22"}`}
              />
              <button
                disabled={status === "submitting"}
                type="submit"
                aria-label="Subscribe"
                className="absolute right-2 top-2 bottom-2 bg-white text-black px-5 rounded-xl
                  flex items-center gap-2 hover:bg-gray-100 transition-colors active:scale-95 disabled:opacity-50"
              >
                <span className="hidden sm:block text-[10px] font-black uppercase tracking-widest">
                  {status === "submitting" ? "···" : "Join"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
            <p className="text-[10px] text-white/18 mt-3 tracking-wide">
              No spam. Unsubscribe anytime.
            </p>
          </div>

          {/* ── Explore nav ── */}
          <nav aria-label="Footer navigation" className="flex flex-col">
            <p className="text-[9px] font-black tracking-[0.4em] text-white/25 mb-6 uppercase">
              Explore
            </p>
            <div className="flex flex-col gap-0.5">
              {navLinks.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 420, damping: 26 }}
                  className="group flex items-center gap-3 py-2.5 text-white/30 hover:text-white transition-colors duration-200 w-fit"
                >
                  <span className="block h-px bg-white/12 group-hover:bg-white/60 transition-all duration-300"
                    style={{ width: 16 }}
                  />
                  <span className="text-[13px] font-semibold tracking-wide">{item.name}</span>
                </motion.a>
              ))}
            </div>
          </nav>

          {/* ── Connect ── */}
          <div className="flex flex-col lg:items-end">
            <p className="text-[9px] font-black tracking-[0.4em] text-white/25 mb-6 uppercase lg:self-end">
              Connect
            </p>

            {/* Social icons */}
            <div className="flex gap-2.5 mb-8 flex-wrap lg:justify-end">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  whileHover={{ y: -4, scale: 1.12 }}
                  whileTap={{ scale: 0.94 }}
                  transition={{ type: "spring", stiffness: 420, damping: 20 }}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center
                    text-white/35 hover:text-white hover:border-white/35 hover:bg-white/6
                    transition-colors duration-250"
                >
                  {s.svg}
                </motion.a>
              ))}
            </div>

            <address className="not-italic flex flex-col lg:items-end gap-2">
              <a
                href="mailto:contact@nexastudioofficial.com"
                className="text-[13px] font-semibold text-white/30 hover:text-white transition-colors duration-200 tracking-wide"
              >
                contact@nexastudioofficial.com
              </a>
              <div className="flex gap-5 lg:flex-col lg:items-end mt-5 lg:gap-2">
                {[{ label: "Privacy Policy", href: "/privacy" }, { label: "Terms & Conditions", href: "/terms" }].map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    className="text-[10px] font-black text-white/18 hover:text-white uppercase tracking-widest transition-colors duration-200"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </address>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          className="py-6 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <p className="text-[10px] font-black text-white/18 uppercase tracking-[0.3em]">
            © {new Date().getFullYear()} Nexa Studio — All Rights Reserved
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">
              Available for projects
            </span>
          </div>
        </div>
      </div>

      {/* ── Ghost wordmark ── */}
      <div
        className="absolute bottom-[-6%] left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        <h2 className="text-[20vw] font-black leading-none tracking-tighter"
          style={{ color: "rgba(255,255,255,0.03)" }}>
          NEXA
        </h2>
      </div>
    </footer>
  );
}
