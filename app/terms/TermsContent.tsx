"use client";

import { motion, Variants } from "framer-motion";
import { Scale, FileText } from "lucide-react";
import Footer from "../components/Footer";

// Move your Variants and Sections array here too
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] as const } 
  }
};

const sections = [ /* ... your sections array ... */ ];

export default function TermsContent() {
  return (
    <main className="relative min-h-screen w-full bg-[#050505] overflow-x-hidden text-white">
      {/* ... All your existing JSX (the return statement from before) ... */}
    </main>
  );
}