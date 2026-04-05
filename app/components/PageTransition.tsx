"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Controls how long the loading animation stays visible
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#080808]"
            style={{
              backgroundImage: `url('/carbonfiber2.png')`,
              backgroundSize: "180px",
            }}
          >
            {/* ROTATING FAVICON */}
            <motion.div
              animate={{ 
                rotate: 360,
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2, 
                ease: "linear" 
              }}
              className="relative w-16 h-16 md:w-24 md:h-24"
            >
              <Image
                src="/favicon.png"
                alt="Loading..."
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* YOUR ORIGINAL PAGE ANIMATION */}
      {!isLoading && (
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1], 
          }}
        >
          {children}
        </motion.div>
      )}
    </>
  );
}