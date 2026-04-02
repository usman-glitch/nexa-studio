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

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith("/#")) {
      const id = href.replace("/#", "#");
      if (pathname === "/") {
        e.preventDefault();
        const destination = document.querySelector(id);
        if (destination) {
          destination.scrollIntoView({ behavior: "smooth", block: "start" });
          setMobileMenuOpen(false);
        }
      }
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
      className="fixed top-0 z-[100] w-full px-6 py-4 md:py-6"
    >
      <motion.div
        layout
        initial={false}
        animate={{
          // Dynamic Island Logic: Shrink width instead of scaling
          maxWidth: scrolled ? "800px" : "1500px",
          paddingLeft: scrolled ? "1rem" : "1.5rem",
          paddingRight: scrolled ? "1rem" : "1.5rem",
          backgroundColor: scrolled ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 1)",
        }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 30 
        }}
        className={`mx-auto flex items-center justify-between py-3 border border-white/10 backdrop-blur-xl shadow-2xl rounded-full ${
          scrolled ? "shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)]" : ""
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
            >
              <Image
                src="/logo.png"
                alt="Nexa Studio Logo"
                width={scrolled ? 110 : 130}
                height={40}
                style={{ transition: "width 0.5s ease" }}
                priority
                className="object-contain brightness-100 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
              />
            </motion.div>
          </motion.div>
        </Link>

        {/* 2. DESKTOP LINKS */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Main Navigation">
          {navLinks.map((link, i) => (
            <motion.div key={link.name} layout>
              <Link
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="relative text-[10px] font-black uppercase tracking-[0.2em] group transition-colors duration-300 text-gray-300 hover:text-white"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] transition-all duration-300 group-hover:w-full bg-white" />
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* 3. RIGHT SIDE */}
        <div className="flex items-center gap-4">
          <motion.a
            layout
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-white text-black hover:bg-gray-100 transition-all"
          >
            {scrolled ? "Contact" : "Start a Project"}
            <ArrowUpRight className="w-3 h-3" />
          </motion.a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full text-white bg-white/10"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.div>

      {/* 4. MOBILE OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="absolute top-24 left-6 right-6 bg-black/95 backdrop-blur-2xl rounded-[32px] overflow-hidden border border-white/10 lg:hidden shadow-2xl"
          >
            <nav className="flex flex-col p-8 gap-6">
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
                  className="text-3xl font-bold text-white tracking-tighter"
                >
                  {link.name}
                </Link>
              ))}
              <a
                href={whatsappLink}
                className="w-full py-5 bg-white text-black rounded-2xl flex items-center justify-center gap-3 font-black uppercase text-xs"
              >
                Start a Project <ArrowUpRight className="w-4 h-4" />
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}