"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Code, Palette, Smartphone, Cloud, Shield, Sparkles } from "lucide-react";

const services = [
  {
    title: "Web Development",
    desc: "Modern, fast, and scalable web applications built with the latest frameworks and performance in mind.",
    icon: Code,
    tag: "Core",
  },
  {
    title: "UI/UX Design",
    desc: "Beautiful, intuitive interfaces engineered to convert — where aesthetics meet purposeful function.",
    icon: Palette,
    tag: "Design",
  },
  {
    title: "SEO & Marketing",
    desc: "Data-driven visibility strategies that drive organic growth and put you in front of the right audience.",
    icon: Smartphone,
    tag: "Growth",
  },
  {
    title: "AI Automation",
    desc: "Intelligent workflow automation that eliminates friction, reduces overhead, and scales effortlessly.",
    icon: Cloud,
    tag: "AI",
  },
  {
    title: "AI Solutions",
    desc: "Bespoke artificial intelligence implementations that optimize your core business processes end-to-end.",
    icon: Shield,
    tag: "AI",
  },
  {
    title: "AI Agent Integration",
    desc: "Seamless AI agent deployment that amplifies your team's output without replacing the human touch.",
    icon: Sparkles,
    tag: "AI",
  },
];

function ServiceCard({ service, index }: { service: (typeof services)[0]; index: number }) {
  const cardRef = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState(false);
  const Icon = service.icon;

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-10px) scale(1.02)`;
  };

  const onMouseLeave = () => {
    setHovered(false);
    const card = cardRef.current;
    if (!card) return;
    card.style.transform =
      "perspective(800px) rotateY(0deg) rotateX(0deg) translateY(0) scale(1)";
    card.style.transition = "transform .5s cubic-bezier(.4,0,.2,1)";
    setTimeout(() => {
      if (card) card.style.transition = "";
    }, 500);
  };

  return (
    <motion.article
      ref={cardRef as React.Ref<HTMLElement>}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.09 }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
      aria-labelledby={`service-title-${index}`}
      style={{
        transformStyle: "preserve-3d",
        willChange: "transform",
        transition: "box-shadow .35s ease",
        boxShadow: hovered
          ? "0 32px 72px -12px rgba(0,0,0,0.13), 0 0 0 1px rgba(0,0,0,0.06)"
          : "0 4px 24px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.05)",
        background: "#fff",
        borderRadius: 28,
        padding: "40px 36px",
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "flex-start",
        cursor: "default",
        overflow: "hidden",
        position: "relative" as const,
      }}
    >
      {/* Hover inner glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(0,0,0,0.04), transparent)",
          opacity: hovered ? 1 : 0,
          transition: "opacity .4s ease",
          pointerEvents: "none",
          borderRadius: "inherit",
        }}
      />

      {/* Tag pill */}
      <div
        style={{
          position: "absolute",
          top: 22,
          right: 22,
          fontSize: 9,
          fontWeight: 800,
          letterSpacing: ".22em",
          textTransform: "uppercase",
          color: "rgba(0,0,0,0.28)",
          border: "1px solid rgba(0,0,0,0.08)",
          padding: "4px 10px",
          borderRadius: 99,
          background: "rgba(0,0,0,0.02)",
        }}
      >
        {service.tag}
      </div>

      {/* Icon */}
      <div
        style={{
          width: 54,
          height: 54,
          borderRadius: 14,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: hovered ? "#0a0a0a" : "#F3F4F6",
          transform: hovered ? "rotate(8deg) scale(1.1)" : "rotate(0deg) scale(1)",
          transition:
            "background .35s ease, transform .35s cubic-bezier(.4,0,.2,1)",
          marginBottom: 26,
          flexShrink: 0,
        }}
      >
        <Icon
          size={22}
          style={{
            color: hovered ? "#fff" : "#111",
            transition: "color .3s ease",
          }}
        />
      </div>

      {/* Index */}
      <div
        style={{
          fontSize: 10,
          fontWeight: 800,
          letterSpacing: ".2em",
          color: "rgba(0,0,0,0.18)",
          marginBottom: 10,
          textTransform: "uppercase",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      <h3
        id={`service-title-${index}`}
        style={{
          fontSize: 20,
          fontWeight: 700,
          color: "#0a0a0a",
          letterSpacing: "-.02em",
          marginBottom: 10,
          lineHeight: 1.15,
        }}
      >
        {service.title}
      </h3>

      <p
        style={{
          fontSize: 14,
          color: "rgba(0,0,0,0.45)",
          lineHeight: 1.78,
          flex: 1,
        }}
      >
        {service.desc}
      </p>

      {/* Animated line footer */}
      <div
        style={{
          marginTop: 30,
          display: "flex",
          alignItems: "center",
          gap: 10,
          width: "100%",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: 1.5,
            background: "#0a0a0a",
            width: hovered ? "100%" : 0,
            transition: "width .6s cubic-bezier(.4,0,.2,1)",
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontSize: 9,
            fontWeight: 800,
            letterSpacing: ".22em",
            textTransform: "uppercase",
            color: "#0a0a0a",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateX(0)" : "translateX(-8px)",
            transition: "opacity .35s .25s ease, transform .35s .25s ease",
            whiteSpace: "nowrap",
          }}
        >
          Explore
        </span>
      </div>
    </motion.article>
  );
}

export default function Services() {
  const [headerVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setHeaderVisible(true);
      },
      { threshold: 0.2 }
    );
    if (headerRef.current) obs.observe(headerRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="services"
      className="relative w-full px-6 py-24 lg:py-36 bg-gray-50 overflow-hidden scroll-mt-24"
    >
      {/* Grid texture */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        aria-hidden="true"
        style={{
          opacity: 0.025,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Radial fade */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,255,255,0) 0%, rgb(249,250,251) 85%)",
        }}
      />

      {/* Ghost BG word */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-5%",
          left: "50%",
          transform: "translateX(-50%)",
          fontWeight: 900,
          fontSize: "clamp(80px,16vw,190px)",
          color: "rgba(0,0,0,0.025)",
          letterSpacing: "-.04em",
          whiteSpace: "nowrap",
          userSelect: "none",
          pointerEvents: "none",
          lineHeight: 1,
          zIndex: 0,
        }}
      >
        SERVICES
      </div>

      <div className="relative z-10 max-w-[1500px] mx-auto">

        {/* ── Section header ── */}
        <header
          ref={headerRef as React.Ref<HTMLElement>}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20"
        >
          <div className="max-w-3xl">
            {/* Badge row */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 20,
                opacity: headerVisible ? 1 : 0,
                transform: headerVisible ? "translateY(0)" : "translateY(12px)",
                transition: "opacity .6s .1s ease, transform .6s .1s ease",
              }}
            >
              <div
                ref={lineRef}
                style={{
                  height: 1,
                  background:
                    "linear-gradient(to right, transparent, rgba(0,0,0,0.22))",
                  width: headerVisible ? 32 : 0,
                  transition: "width .7s .3s ease",
                }}
              />
              <p
                style={{
                  fontSize: 9,
                  fontWeight: 800,
                  letterSpacing: ".38em",
                  textTransform: "uppercase",
                  color: "rgba(0,0,0,0.35)",
                }}
              >
                Our Expertise
              </p>
            </div>

            <h2
              style={{
                fontWeight: 800,
                fontSize: "clamp(38px,6vw,76px)",
                color: "#0a0a0a",
                lineHeight: 0.96,
                letterSpacing: "-.03em",
                opacity: headerVisible ? 1 : 0,
                transform: headerVisible ? "translateY(0)" : "translateY(24px)",
                transition: "opacity .75s .2s ease, transform .75s .2s ease",
              }}
            >
              What We Can Do
              <br />
              <span style={{ color: "rgba(0,0,0,0.18)" }}>For Your Business</span>
            </h2>
          </div>

          {/* Right descriptor */}
          <motion.p
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{
              color: "rgba(0,0,0,0.42)",
              fontSize: 16,
              maxWidth: 360,
              lineHeight: 1.78,
              textAlign: "right",
            }}
            className="hidden lg:block"
          >
            End-to-end digital solutions designed to scale your impact and streamline your operations.
          </motion.p>

          <p
            className="lg:hidden"
            style={{
              color: "rgba(0,0,0,0.42)",
              fontSize: 15,
              lineHeight: 1.78,
              maxWidth: 480,
              opacity: headerVisible ? 1 : 0,
              transition: "opacity .7s .4s ease",
            }}
          >
            End-to-end digital solutions designed to scale your impact and streamline your operations.
          </p>
        </header>

        {/* ── Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-6">
          {services.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} />
          ))}
        </div>

        {/* ── CTA strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            marginTop: 64,
            padding: "36px 44px",
            background: "#0a0a0a",
            borderRadius: 24,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
          }}
        >
          <div>
            <p
              style={{
                fontSize: 9,
                fontWeight: 800,
                letterSpacing: ".3em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.28)",
                marginBottom: 8,
              }}
            >
              Ready to start?
            </p>
            <h3
              style={{
                fontSize: "clamp(18px,2.5vw,28px)",
                fontWeight: 700,
                color: "#fff",
                letterSpacing: "-.02em",
                lineHeight: 1.15,
              }}
            >
              Let's build something remarkable.
            </h3>
          </div>

          <a
            href="/#contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "#fff",
              color: "#0a0a0a",
              padding: "14px 26px",
              borderRadius: 99,
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: ".18em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "background .2s ease, transform .2s ease",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "#efefef";
              (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.04)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "#fff";
              (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
            }}
          >
            Get in touch
            <svg width="11" height="11" viewBox="0 0 10 10" fill="none">
              <path
                d="M1 9L9 1M9 1H3M9 1V7"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
