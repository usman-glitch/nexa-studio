"use client";

import { motion, Variants } from "framer-motion";
import { Scale, FileText } from "lucide-react";
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
    content: "All fees are agreed upon prior to the commencement of the project. NEXA Studio follows a three-installment payment structure. The first installment consists of 50% of the total project fee and is required as an initial advance payment before work begins. The second installment consists of 30% and is payable at the mid-point of the project timeline. The final installment consists of 20% and is due upon completion of the project. Final deliverables will only be shared after full payment has been received. All payments are non-refundable unless otherwise agreed in writing."
  },
  {
    title: "Revisions",
    content: "A defined number of revisions will be included in each project. Additional revisions or changes beyond the agreed scope may incur extra charges."
  },
  {
    title: "Intellectual Property Rights",
    content: "All work produced by NEXA Studio remains its property until full payment is received. Upon full payment, ownership of final approved deliverables is transferred to the client. NEXA Studio retains the right to use completed work for portfolio and promotional purposes."
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

export default function TermsContent() {
  return (
    <main className="relative min-h-screen w-full bg-[#050505] overflow-x-hidden text-white selection:bg-[#00887a] selection:text-white">
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 opacity-10 bg-[url('/carbonfiber.png')]" />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-20 -left-20 w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-[#00887a]/20 blur-[120px] rounded-full"
        />
      </div>

      <div className="relative z-10 pt-32 pb-24 md:pt-56 md:pb-48 px-6 sm:px-10">
        <article className="max-w-[1400px] mx-auto">
          <motion.header 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="mb-16 md:mb-32"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-[#00887a]/10 rounded-lg">
                <Scale className="w-5 h-5 text-[#00887a]" aria-hidden="true" />
              </div>
              <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.5em] text-gray-500">Legal Framework</span>
            </div>
            
            <h1 className="text-6xl sm:text-7xl md:text-9xl font-bold tracking-tighter leading-[0.85] mb-8">
              Terms of <br />
              <span className="text-gray-400 italic font-serif font-light lowercase">Service.</span>
            </h1>
            
            <p className="max-w-2xl text-lg md:text-xl text-gray-400 leading-relaxed font-medium">
              Welcome to NEXA Studio. These Terms and Conditions govern your use of our services. By engaging with NEXA Studio, you agree to comply with and be bound by the following terms.
            </p>
          </motion.header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24">
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-8 space-y-12 md:space-y-20"
            >
              {sections.map((section, i) => (
                <motion.section key={i} variants={fadeInUp} className="group">
                  <div className="flex items-baseline gap-4 mb-4">
                    <span className="text-[#00887a] font-mono text-sm opacity-50">0{i + 1}</span>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight group-hover:text-[#00887a] transition-colors duration-300">
                      {section.title}
                    </h2>
                  </div>
                  <p className="text-gray-400 text-base md:text-lg leading-relaxed pl-9 border-l border-white/5 group-hover:border-[#00887a]/30 transition-colors">
                    {section.content}
                  </p>
                </motion.section>
              ))}
            </motion.div>

            <aside className="lg:col-span-4">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="sticky top-32 space-y-8"
              >
                <section className="p-10 rounded-[40px] bg-[#00887a] text-black shadow-[0_30px_60px_rgba(0,136,122,0.25)] relative overflow-hidden group">
                  <div className="relative z-10">
                    <FileText className="w-8 h-8 mb-6 opacity-80" />
                    <h3 className="font-black uppercase tracking-widest text-[10px] mb-4 opacity-70">Project Agreement</h3>
                    <p className="font-bold text-2xl leading-[1.1] tracking-tight">
                      Agreement to these terms is required before any project commencement.
                    </p>
                  </div>
                  <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-black/5 rounded-full blur-3xl group-hover:bg-black/10 transition-colors" />
                </section>
                <div className="px-6">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Last Updated</p>
                  <p className="text-sm font-bold text-white uppercase tracking-tighter">April 2026</p>
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