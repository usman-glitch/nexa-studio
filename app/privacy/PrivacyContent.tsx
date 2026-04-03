"use client";

import { motion, Variants } from "framer-motion";
import { ShieldCheck, Mail, ArrowRight } from "lucide-react";
import Footer from "../components/Footer";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5, 
      ease: [0.23, 1, 0.32, 1] as const 
    } 
  }
};

const staggerContainer: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.05
    }
  }
};

const sections = [
  {
    title: "Acceptance of Terms",
    content: "By accessing our services or entering into a project agreement with NEXA Studio, you confirm that you have read, understood, and agreed to these Terms and Conditions."
  },
  {
    title: "Services",
    content: "NEXA Studio provides creative services including branding, content creation, video production, digital design, and marketing solutions. All services are delivered based on a mutually agreed project scope."
  },
  {
    title: "Client Obligations",
    content: "Clients are required to provide accurate information, timely feedback, and all necessary materials. Delays in communication may affect timelines and project delivery."
  },
  {
    title: "Fees and Payments",
    content: "All fees are agreed upon prior to the commencement of the project. NEXA Studio follows a three-installment payment structure. The first installment consists of 50% of the total project fee and is required as an initial advance payment before work begins. The second installment consists of 30% and is payable at the mid-point of the project timeline. The final installment consists of 20% and is due upon completion of the project. Final deliverables will only be shared after full payment has been received."
  },
  {
    title: "Revisions",
    content: "A defined number of revisions will be included in each project. Additional revisions or changes beyond the agreed scope may incur extra charges."
  },
  {
    title: "Intellectual Property Rights",
    content: "All work produced by NEXA Studio remains its property until full payment is received. Upon full payment, ownership of final approved deliverables is transferred to the client."
  },
  {
    title: "Confidentiality",
    content: "Both parties agree to maintain confidentiality of any sensitive or proprietary information shared during the course of the project."
  },
  {
    title: "Project Timelines",
    content: "Timelines are estimated and depend on project complexity and client responsiveness. NEXA Studio will communicate any delays when necessary."
  },
  {
    title: "Termination",
    content: "NEXA Studio reserves the right to terminate services in cases of breach of terms, non payment, or inappropriate conduct. Clients may terminate projects, however fees for completed work will apply."
  },
  {
    title: "Limitation of Liability",
    content: "NEXA Studio shall not be held liable for any indirect, incidental, or consequential damages arising from the use of our services."
  },
  {
    title: "Third Party Services",
    content: "NEXA Studio may utilize third party tools or platforms. We are not responsible for any issues arising from those services."
  },
  {
    title: "Modifications",
    content: "NEXA Studio reserves the right to update these Terms and Conditions at any time. Continued use of services indicates acceptance of any changes."
  },
  {
    title: "Governing Law",
    content: "These Terms and Conditions shall be governed by the applicable laws of the operating region of NEXA Studio."
  }
];

export default function PrivacyContent() {
  return (
    <main className="relative min-h-screen w-full bg-[#050505] overflow-x-hidden text-white selection:bg-[#00887a]">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.15] bg-[url('/carbonfiber.png')]" />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -right-40 w-[400px] md:w-[900px] h-[400px] md:h-[900px] bg-[#00887a]/20 blur-[140px] rounded-full"
        />
      </div>

      <div className="relative z-10 pt-32 pb-24 md:pt-52 md:pb-48 px-6 sm:px-12">
        <article className="max-w-[1400px] mx-auto">
          {/* Header */}
          <motion.header 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-16 md:mb-32"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 bg-[#00887a]/10 rounded-xl border border-[#00887a]/20">
                <ShieldCheck className="w-5 h-5 text-[#00887a]" aria-hidden="true" />
              </div>
              <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.5em] text-gray-500">Privacy Standards</span>
            </div>
            
            <h1 className="text-6xl sm:text-7xl md:text-9xl font-bold tracking-tighter leading-[0.85] mb-8" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Privacy <br />
              <span className="text-gray-400 italic font-serif font-light lowercase">Policy.</span>
            </h1>
            
            <p className="max-w-2xl text-lg md:text-xl text-gray-400 leading-relaxed font-medium">
              Welcome to NEXA Studio. These protocols govern how we protect your digital footprint. By engaging with our agency, you agree to these data management standards.
            </p>
          </motion.header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24">
            {/* Scrollable Content */}
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-8 space-y-12 md:space-y-24"
            >
              {sections.map((section, i) => (
                <motion.section key={i} variants={fadeInUp} className="group relative">
                  <div className="flex items-baseline gap-6 mb-4">
                    <span className="text-[#00887a] font-mono text-xs md:text-sm font-bold opacity-40">
                      /{String(i + 1).padStart(2, '0')}
                    </span>
                    <h2 className="text-2xl md:text-4xl font-bold tracking-tight group-hover:text-[#00887a] transition-colors duration-500">
                      {section.title}
                    </h2>
                  </div>
                  <p className="text-gray-400 text-base md:text-xl leading-relaxed pl-10 md:pl-14 border-l border-white/5 group-hover:border-[#00887a]/40 transition-colors duration-500">
                    {section.content}
                  </p>
                </motion.section>
              ))}
              
              <footer className="pt-12 border-t border-white/5">
                <p className="text-[10px] md:text-xs text-gray-600 font-mono tracking-widest uppercase">
                  Data Protection Revision: April 2026 // NEXA Studio Legal
                </p>
              </footer>
            </motion.div>

            {/* Sidebar Sticky Notice */}
            <aside className="lg:col-span-4">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="sticky top-32 space-y-8"
              >
                {/* Updated Container with continuous motion (floating/pulsing) */}
                <motion.div 
                  animate={{ 
                    y: [0, -10, 0], // Floating motion
                    boxShadow: [
                      "0 25px 50px -12px rgba(0, 136, 122, 0.25)", // Initial shadow
                      "0 35px 60px -12px rgba(0, 136, 122, 0.5)",  // Intense shadow at peak
                      "0 25px 50px -12px rgba(0, 136, 122, 0.25)"  // Back to initial
                    ]
                  }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="p-10 rounded-[40px] bg-[#00887a] text-black shadow-2xl relative overflow-hidden group"
                >
                  {/* Diagonal "Shine" Animation Overlay */}
                  <motion.div 
                    initial={{ x: "-150%", skewX: "-30deg" }}
                    animate={{ x: "200%" }}
                    transition={{ 
                      duration: 1.5, // Speed of the shine sweep
                      repeat: Infinity, 
                      repeatDelay: 2.5, // Pause before next shine (total cycle = 4s)
                      ease: [0.43, 0.13, 0.23, 0.96] // "Sweep" easing
                    }}
                    className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent z-0 pointer-events-none"
                    aria-hidden="true"
                  />

                  {/* Content (z-index added to stay above the shine) */}
                  <div className="relative z-10">
                    <Mail className="w-10 h-10 mb-8 text-black opacity-90" />
                    <h3 className="font-black uppercase tracking-widest text-[10px] mb-4 text-black/60">Inquiries</h3>
                    <p className="font-bold text-2xl leading-[1.1] tracking-tight mb-8 text-black">
                      Questions regarding your data rights?
                    </p>
                    <a 
                      href="mailto:agency.nexa.01@gmail.com" 
                      className="inline-flex items-center gap-2 group-hover:gap-4 transition-all font-black text-sm uppercase tracking-tighter text-black"
                    >
                      Contact Legal <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Decorative element (background circle) */}
                  <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-black/5 rounded-full blur-3xl group-hover:bg-black/10 transition-colors z-0" />
                </motion.div>

                <div className="px-8 py-6 rounded-[30px] border border-white/10 bg-[#00887a]/5 backdrop-blur-xl">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Status</p>
                  <p className="text-sm font-bold text-white uppercase tracking-tighter italic">Verified & Active</p>
                </div>
              </motion.div>
            </aside>
          </div>
        </article>
      </div>
      <Footer />
    </main>
  );
}