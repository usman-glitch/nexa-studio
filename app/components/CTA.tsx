"use client";

import { motion } from "framer-motion";

export default function CTA() {

  // ✅ WhatsApp link
  const whatsappLink =
    "https://wa.me/923434378026?text=Hi%20NEXA%20Team,%20I%20am%20interested%20in%20your%20services.%20Can%20we%20discuss%20my%20project?";

  // ✅ TRACKING
  const trackWhatsAppClick = () => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "whatsapp_click", {
        event_category: "engagement",
        event_label: "floating_cta",
        value: 1,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 w-full flex justify-center"
      role="complementary"
      aria-label="Contact Call to Action"
    >
      <div className="flex items-center gap-4 backdrop-blur-md bg-black/70 text-white px-5 py-3 rounded-full shadow-lg border border-white/10 max-w-full">

        {/* STATUS */}
        <div className="hidden sm:flex items-center gap-2 text-sm text-gray-300">
          <span 
            className="w-2 h-2 bg-green-400 rounded-full animate-pulse" 
            aria-hidden="true"
          ></span>
          <span>Available for new projects</span>
        </div>

        {/* DIVIDER */}
        <div className="hidden sm:block w-px h-5 bg-gray-600" aria-hidden="true"></div>

        {/* CTA BUTTON */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          title="Chat with NEXA Team on WhatsApp"
          onClick={trackWhatsAppClick}
          className="bg-white text-black px-5 py-2 rounded-full text-sm font-medium hover:scale-105 transition flex items-center gap-1 shadow-lg whitespace-nowrap"
        >
          Chat on WhatsApp
          <span className="ml-1" aria-hidden="true">→</span>
        </a>

      </div>
    </motion.div>
  );
}