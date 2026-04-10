import PageTransition from "./components/PageTransition";
import Hero from "./components/Hero";
import About from "./components/About";
import CTA from "./components/CTA";
import Services from "./components/Services";
import Process from "./components/Process";
import Testimonials from "./components/Testimonials";
import ContactSection from "./components/Contactsecton";
import Footer from "./components/Footer";
import Backtotop from "./components/Backtotop";

export default function Home() {
  return (
    <PageTransition> 
      <main className="bg-white min-h-screen"> 
        {/* Changed bg-gray-100 to bg-white to match the clean agency look */}
        
        <header>
          <Hero />
        </header>

        <section id="about">
          <About />
        </section>

        <aside>
          <CTA />
        </aside>

        <section id="services">
          <Services />
        </section>

        <section id="process">
          <Process />
        </section>
        
        {/* 2. Add Testimonials here with the ID for Navbar navigation */}
        <section id="testimonials">
          <Testimonials />
        </section>
        
        <section id="contact">
          <ContactSection />
        </section>

        <Backtotop /> 
        
        <footer>
          <Footer />
        </footer>
      </main>
    </PageTransition>
  );
}