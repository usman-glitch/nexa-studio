"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Helper for ultra-smooth scrolling
  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith("/#")) {
      const id = href.replace("/#", "#");

      // If we are already on the homepage, just scroll
      if (pathname === "/") {
        e.preventDefault();
        const destination = document.querySelector(id);
        if (destination) {
          destination.scrollIntoView({ behavior: "smooth", block: "start" });
          setMobileMenuOpen(false);
        }
      }
      // If we are on another page, Link component handles the navigation to /#id automatically
    }
  };

  const navLinks = [
    { name: "The Work", href: "/work" },
    { name: "Testimonials", href: "/#testimonials" },
    { name: "About", href: "/about" },
  ];

  const whatsappLink = "https://wa.me/923434378026?text=Hi%20NEXA%20Team...";

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 z-[100] w-full px-6 py-4 md:py-6 transition-all duration-500"
    >
      <div
        className={`max-w-[1500px] mx-auto flex items-center justify-between px-6 py-3 transition-all duration-500 rounded-[24px] md:rounded-full ${
          scrolled
            ? "bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-white/20 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)]"
            : "bg-black border border-white/10"
        }`}
      >
        {/* 1. LOGO SECTION */}
        <Link
          href="/"
          aria-label="Nexa Studio Home"
          onClick={(e) => {
            if (pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        >
          <motion.div
            className="relative flex-shrink-0 cursor-pointer group/logo"
            whileHover="hover"
            initial="initial"
          >
            <motion.div
              variants={{
                initial: { scale: 1 },
                hover: { scale: 1.05 },
              }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Image
                src="/logo.png"
                alt="Nexa Studio - Creative Digital Agency Logo"
                width={130}
                height={40}
                style={{ width: "130px", height: "auto" }}
                priority
                className={`object-contain transition-all duration-500 ${
                  scrolled
                    ? "brightness-0 opacity-80 group-hover/logo:brightness-100 group-hover/logo:opacity-100"
                    : "brightness-100 opacity-100 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                }`}
              />
            </motion.div>

            <motion.div
              variants={{
                initial: { opacity: 0 },
                hover: { opacity: 0.3 },
              }}
              className="absolute inset-0 bg-white/20 blur-xl rounded-full -z-10"
              aria-hidden="true"
            />
          </motion.div>
        </Link>

        {/* 2. DESKTOP LINKS (CENTERED) */}
        <nav className="hidden lg:flex items-center gap-10" aria-label="Main Navigation">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.3 }}
            >
              <Link
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`relative text-[10px] font-black uppercase tracking-[0.3em] group transition-colors duration-300 ${
                  scrolled
                    ? "text-gray-900 hover:text-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full ${
                    scrolled ? "bg-black" : "bg-white"
                  }`}
                  aria-hidden="true"
                />
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* 3. RIGHT SIDE: CTA & MOBILE TOGGLE */}
        <div className="flex items-center gap-4">
          <motion.a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`hidden sm:flex items-center gap-2 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
              scrolled
                ? "bg-black text-white hover:bg-gray-800"
                : "bg-white text-black hover:bg-gray-100 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            }`}
          >
            Start a Project <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
          </motion.a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle Menu"
            aria-controls="mobile-menu"
            className={`lg:hidden p-2 rounded-xl transition-colors ${
              scrolled ? "text-black bg-gray-100" : "text-white bg-white/10"
            }`}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* 4. FULLSCREEN MOBILE OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-24 left-6 right-6 bg-black rounded-[32px] overflow-hidden border border-white/10 lg:hidden shadow-2xl"
          >
            <nav className="flex flex-col p-8 gap-6" aria-label="Mobile Navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    scrollToSection(e, link.href);
                    if (!link.href.startsWith("/#") || pathname !== "/") {
                      setMobileMenuOpen(false);
                    }
                  }}
                  className="text-3xl font-bold text-white tracking-tighter hover:text-gray-400 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-white/10 my-2" aria-hidden="true" />
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-5 bg-white text-black rounded-2xl flex items-center justify-center gap-3 font-black uppercase text-xs tracking-widest"
              >
                Start a Project <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}