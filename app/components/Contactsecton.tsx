"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useAnimationFrame,
  motionValue,
} from "framer-motion";
import {
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  Check,
  Sparkles,
  ArrowUpRight,
  Zap,
} from "lucide-react";

/* ─────────────────────────────────────────────
   PARTICLE FIELD  (canvas-based, GPU-friendly)
───────────────────────────────────────────── */
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let raf: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    type P = { x: number; y: number; vx: number; vy: number; r: number; alpha: number; pulse: number };
    const particles: P[] = Array.from({ length: 120 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.5 + 0.1,
      pulse: Math.random() * Math.PI * 2,
    }));

    const draw = (t: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.02;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        const a = p.alpha * (0.6 + 0.4 * Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,200,170,${a})`;
        ctx.fill();
      });

      // draw faint connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,180,160,${0.08 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
}

/* ─────────────────────────────────────────────
   HOLOGRAPHIC GRID LINES
───────────────────────────────────────────── */
function HoloGrid() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ perspective: "800px" }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,200,170,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,200,170,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          transform: "rotateX(60deg) translateY(-40%) scale(2.5)",
          transformOrigin: "50% 100%",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 40%, black 70%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 40%, black 70%, transparent 100%)",
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   SCANNING LINE EFFECT
───────────────────────────────────────────── */
function ScanLine() {
  return (
    <motion.div
      className="absolute left-0 right-0 h-px pointer-events-none z-20"
      style={{
        background: "linear-gradient(90deg, transparent, rgba(0,200,170,0.6), transparent)",
        boxShadow: "0 0 20px rgba(0,200,170,0.4)",
      }}
      animate={{ top: ["0%", "100%", "0%"] }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    />
  );
}

/* ─────────────────────────────────────────────
   GLITCH TEXT
───────────────────────────────────────────── */
function GlitchText({ children, className, style }: { children: string; className?: string; style?: React.CSSProperties }) {
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 200);
    }, 4000 + Math.random() * 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={`relative inline-block ${className}`}>
      {children}
      {glitching && (
        <>
          <span
            className="absolute inset-0 text-cyan-400"
            style={{ clipPath: "polygon(0 15%, 100% 15%, 100% 40%, 0 40%)", transform: "translateX(-3px)", opacity: 0.8 }}
            aria-hidden
          >
            {children}
          </span>
          <span
            className="absolute inset-0 text-red-400"
            style={{ clipPath: "polygon(0 60%, 100% 60%, 100% 80%, 0 80%)", transform: "translateX(3px)", opacity: 0.6 }}
            aria-hidden
          >
            {children}
          </span>
        </>
      )}
    </span>
  );
}

/* ─────────────────────────────────────────────
   MORPHING ORB
───────────────────────────────────────────── */
function MorphingOrb({ style }: { style?: React.CSSProperties }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        background: "radial-gradient(circle, rgba(0,200,170,0.25) 0%, rgba(0,150,130,0.1) 50%, transparent 70%)",
        filter: "blur(40px)",
        ...style,
      }}
      animate={{
        scale: [1, 1.3, 0.9, 1.2, 1],
        borderRadius: ["50%", "40% 60% 70% 30%", "60% 40% 30% 70%", "50%"],
      }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

/* ─────────────────────────────────────────────
   3D CARD WRAPPER
───────────────────────────────────────────── */
function Card3D({
  children,
  className,
  depth = 0,
}: {
  children: React.ReactNode;
  className?: string;
  depth?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sRx = useSpring(rx, { stiffness: 150, damping: 20 });
  const sRy = useSpring(ry, { stiffness: 150, damping: 20 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current!;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    rx.set(-dy * 10);
    ry.set(dx * 10);
  };

  const handleLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX: sRx,
        rotateY: sRy,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className={className}
    >
      <div style={{ transform: `translateZ(${depth}px)`, transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   CORNER DECORATIONS
───────────────────────────────────────────── */
function CornerDeco({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const posStyle: Record<string, React.CSSProperties> = {
    tl: { top: 12, left: 12, borderTop: "1px solid", borderLeft: "1px solid" },
    tr: { top: 12, right: 12, borderTop: "1px solid", borderRight: "1px solid" },
    bl: { bottom: 12, left: 12, borderBottom: "1px solid", borderLeft: "1px solid" },
    br: { bottom: 12, right: 12, borderBottom: "1px solid", borderRight: "1px solid" },
  };
  return (
    <div
      className="absolute w-5 h-5 pointer-events-none"
      style={{ ...posStyle[position], borderColor: "rgba(0,200,170,0.4)" }}
    />
  );
}

/* ─────────────────────────────────────────────
   HOLOGRAPHIC INPUT
───────────────────────────────────────────── */
function HoloInput({
  label,
  name,
  type = "text",
  placeholder,
  textarea,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  textarea?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const Tag = textarea ? "textarea" : "input";

  return (
    <div className="relative group">
      <label
        className="block text-[9px] font-black uppercase tracking-[0.35em] mb-2 transition-colors duration-300"
        style={{ color: focused ? "#00c8aa" : "rgba(255,255,255,0.35)" }}
      >
        {label}
      </label>
      <div className="relative">
        {/* Animated border */}
        <div
          className="absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none"
          style={{
            background: focused
              ? "linear-gradient(135deg, #00c8aa, #00887a, #004d45, #00c8aa)"
              : "transparent",
            padding: "1px",
            opacity: focused ? 1 : 0,
            borderRadius: "16px",
          }}
        >
          <div className="w-full h-full rounded-2xl" style={{ background: "#0a0a0a" }} />
        </div>

        <Tag
          required
          name={name}
          type={type}
          placeholder={placeholder}
          rows={textarea ? 5 : undefined}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="relative w-full bg-white/[0.03] border rounded-2xl p-5 text-white text-sm outline-none resize-none transition-all duration-300 placeholder:text-white/20 z-10"
          style={{
            borderColor: focused ? "transparent" : "rgba(255,255,255,0.07)",
            boxShadow: focused ? "0 0 30px rgba(0,200,170,0.08), inset 0 0 20px rgba(0,200,170,0.03)" : "none",
          }}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function ContactSection() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [copied, setCopied] = useState(false);

  const emailAddress = "agency.nexa.01@gmail.com";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        e.currentTarget.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full min-h-screen py-24 overflow-hidden flex items-center justify-center"
      style={{ background: "#030303" }}
    >
      {/* ── BG LAYER ── */}
      <ParticleField />
      <HoloGrid />
      <ScanLine />

      <MorphingOrb
        style={{ width: 600, height: 600, top: "-15%", left: "-15%", opacity: 0.6 }}
      />
      <MorphingOrb
        style={{ width: 400, height: 400, bottom: "-10%", right: "-5%", opacity: 0.4 }}
      />

      {/* Hex grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpath d='M28 66L0 50V18L28 2l28 16v32L28 66zm0-2.31L54 50V20L28 4.62 2 20v30L28 63.69z' fill='%2300c8aa'/%3E%3C/svg%3E")`,
          backgroundSize: "56px 100px",
        }}
      />

      {/* ── CONTENT ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">

        {/* HEADER */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8 border"
            style={{
              background: "rgba(0,200,170,0.05)",
              borderColor: "rgba(0,200,170,0.2)",
              backdropFilter: "blur(10px)",
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles size={11} style={{ color: "#00c8aa" }} />
            </motion.div>
            <span
              className="text-[9px] font-black uppercase tracking-[0.4em]"
              style={{ color: "#00c8aa" }}
            >
              Contact Intelligence
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-black italic uppercase leading-none tracking-tighter"
            style={{
              fontSize: "clamp(3.5rem, 10vw, 8rem)",
              fontFamily: "'Arial Black', sans-serif",
            }}
          >
            <span className="text-white">Start </span>
            <GlitchText
              className="text-transparent"
              style={{
                WebkitTextStroke: "2px #00c8aa",
                textShadow: "0 0 80px rgba(0,200,170,0.4)",
              } as React.CSSProperties}
            >
              The
            </GlitchText>
            <br />
            <span
              className="text-transparent"
              style={{
                WebkitTextFillColor: "transparent",
                background: "linear-gradient(135deg, #00c8aa 0%, #00ffd5 40%, #00887a 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                textShadow: "none",
                filter: "drop-shadow(0 0 40px rgba(0,200,170,0.5))",
              }}
            >
              Mission
            </span>
          </motion.h2>

          {/* Animated underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="h-px w-64 mx-auto mt-6"
            style={{
              background: "linear-gradient(90deg, transparent, #00c8aa, transparent)",
              boxShadow: "0 0 10px #00c8aa",
            }}
          />
        </div>

        {/* GRID */}
        <div className="grid lg:grid-cols-[1fr_1.7fr] gap-6">

          {/* ── LEFT COLUMN ── */}
          <div className="flex flex-col gap-5">

            {/* Info Card */}
            <Card3D depth={20}>
              <motion.div
                initial={{ opacity: 0, x: -50, rotateY: -15 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-[32px] overflow-hidden p-8"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  backdropFilter: "blur(30px)",
                  boxShadow: "0 40px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
                }}
              >
                <CornerDeco position="tl" />
                <CornerDeco position="tr" />
                <CornerDeco position="bl" />
                <CornerDeco position="br" />

                {/* Internal glow */}
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(0,200,170,0.5), transparent)" }}
                />

                <h3
                  className="text-[9px] font-black uppercase tracking-[0.4em] mb-8"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  System Access
                </h3>

                <div className="space-y-7">
                  {/* Email */}
                  <motion.button
                    onClick={copyToClipboard}
                    className="flex items-center gap-4 group w-full text-left"
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <div className="relative">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300"
                        style={{
                          background: "linear-gradient(135deg, #00887a, #00c8aa)",
                          boxShadow: "0 0 30px rgba(0,200,170,0.3), 0 8px 20px rgba(0,0,0,0.3)",
                        }}
                      >
                        <AnimatePresence mode="wait">
                          {copied ? (
                            <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                              <Check className="text-black" size={20} strokeWidth={3} />
                            </motion.div>
                          ) : (
                            <motion.div key="mail" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                              <Mail className="text-black" size={20} strokeWidth={2} />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <motion.div
                        className="absolute inset-0 rounded-2xl"
                        style={{ border: "1px solid rgba(0,200,170,0.5)" }}
                        animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0, 0.8] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                    <div>
                      <p
                        className="text-[8px] font-black uppercase tracking-[0.4em] mb-1"
                        style={{ color: "rgba(255,255,255,0.25)" }}
                      >
                        Email Interface
                      </p>
                      <p
                        className="font-bold text-sm transition-colors duration-300 group-hover:text-[#00c8aa]"
                        style={{ color: "rgba(255,255,255,0.85)" }}
                      >
                        {emailAddress}
                      </p>
                    </div>
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight size={14} style={{ color: "#00c8aa" }} />
                    </div>
                  </motion.button>

                  <div className="h-px" style={{ background: "rgba(255,255,255,0.05)" }} />

                  {/* Location */}
                  <motion.div
                    className="flex items-center gap-4 group"
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      <MapPin className="text-white/50" size={20} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p
                        className="text-[8px] font-black uppercase tracking-[0.4em] mb-1"
                        style={{ color: "rgba(255,255,255,0.25)" }}
                      >
                        Base of Operations
                      </p>
                      <p className="font-bold text-sm text-white/80">Lahore, Pakistan</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </Card3D>

            {/* Availability Card */}
            <Card3D depth={30}>
              <motion.div
                initial={{ opacity: 0, x: -50, rotateY: -15 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-[32px] overflow-hidden p-8"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(0,200,170,0.15)",
                  backdropFilter: "blur(30px)",
                  boxShadow: "0 40px 80px rgba(0,0,0,0.5), 0 0 60px rgba(0,200,170,0.05)",
                }}
              >
                {/* Animated teal background glow */}
                <motion.div
                  className="absolute inset-0 pointer-events-none rounded-[32px]"
                  style={{
                    background: "radial-gradient(ellipse at 50% 100%, rgba(0,200,170,0.08) 0%, transparent 70%)",
                  }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <Zap size={14} style={{ color: "#00c8aa" }} />
                    <span
                      className="text-[9px] font-black uppercase tracking-[0.4em]"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                      Availability
                    </span>
                  </div>

                  <p className="text-white font-bold text-lg leading-snug mb-6">
                    Currently accepting high-impact projects{" "}
                    <span style={{ color: "#00c8aa" }}>Q2 2026</span>
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="relative flex items-center justify-center w-4 h-4">
                      <div
                        className="absolute w-4 h-4 rounded-full"
                        style={{ background: "rgba(0,200,170,0.3)", animation: "ping 1.5s cubic-bezier(0,0,0.2,1) infinite" }}
                      />
                      <div
                        className="relative w-2 h-2 rounded-full"
                        style={{ background: "#00c8aa", boxShadow: "0 0 8px #00c8aa" }}
                      />
                    </div>
                    <span
                      className="text-[9px] font-black uppercase tracking-[0.4em]"
                      style={{ color: "#00c8aa" }}
                    >
                      Live · Ready to Initialize
                    </span>
                  </div>
                </div>
              </motion.div>
            </Card3D>
          </div>

          {/* ── RIGHT: FORM ── */}
          <Card3D depth={40}>
            <motion.div
              initial={{ opacity: 0, x: 60, rotateY: 15 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-[40px] overflow-hidden p-10 xl:p-14"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                backdropFilter: "blur(40px)",
                boxShadow: "0 60px 120px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
            >
              <CornerDeco position="tl" />
              <CornerDeco position="tr" />
              <CornerDeco position="bl" />
              <CornerDeco position="br" />

              {/* Top shimmer */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background: "linear-gradient(90deg, transparent 0%, rgba(0,200,170,0.6) 40%, rgba(0,200,170,0.6) 60%, transparent 100%)",
                }}
              />

              {/* Internal ambient glow */}
              <div
                className="absolute -top-20 left-1/2 -translate-x-1/2 w-3/4 h-40 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse, rgba(0,200,170,0.06) 0%, transparent 70%)",
                  filter: "blur(20px)",
                }}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <h3
                      className="text-[9px] font-black uppercase tracking-[0.4em] mb-2"
                      style={{ color: "#00c8aa" }}
                    >
                      Secure Transmission
                    </h3>
                    <p className="text-white/40 text-xs">End-to-end encrypted inquiry protocol</p>
                  </div>
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center"
                    style={{
                      background: "rgba(0,200,170,0.08)",
                      border: "1px solid rgba(0,200,170,0.2)",
                    }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Send size={14} style={{ color: "#00c8aa" }} strokeWidth={1.5} />
                    </motion.div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-7">
                  <div className="grid md:grid-cols-2 gap-6">
                    <HoloInput label="Identity" name="name" placeholder="Your Name" />
                    <HoloInput label="Protocol" name="email" type="email" placeholder="Email Address" />
                  </div>

                  <HoloInput
                    label="Mission Brief"
                    name="subject"
                    placeholder="Subject / Project Type"
                  />

                  <HoloInput
                    label="Transmission"
                    name="message"
                    placeholder="Project details, goals, timeline…"
                    textarea
                  />

                  {/* Submit button */}
                  <motion.button
                    disabled={status === "submitting"}
                    type="submit"
                    className="relative w-full overflow-hidden rounded-2xl py-5 font-black uppercase text-[10px] tracking-[0.5em] text-black flex items-center justify-center gap-4 disabled:opacity-50"
                    style={{
                      background: "linear-gradient(135deg, #00c8aa 0%, #00887a 50%, #00c8aa 100%)",
                      backgroundSize: "200% 100%",
                      boxShadow: "0 0 40px rgba(0,200,170,0.3), 0 8px 24px rgba(0,0,0,0.3)",
                    }}
                    whileHover={{ scale: 1.02, boxShadow: "0 0 60px rgba(0,200,170,0.5), 0 12px 30px rgba(0,0,0,0.4)" }}
                    whileTap={{ scale: 0.98 }}
                    animate={
                      status !== "submitting"
                        ? { backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"] }
                        : {}
                    }
                    transition={{ backgroundPosition: { duration: 3, repeat: Infinity } }}
                  >
                    {/* Shimmer overlay */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)",
                      }}
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
                    />

                    {status === "submitting" ? (
                      <>
                        <motion.div
                          className="w-4 h-4 rounded-full border-2 border-black border-t-transparent"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        />
                        Encrypting…
                      </>
                    ) : (
                      <>
                        Transmit Inquiry
                        <Send size={16} strokeWidth={3} />
                      </>
                    )}
                  </motion.button>

                  {/* Error state */}
                  <AnimatePresence>
                    {status === "error" && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-center text-[11px] text-red-400"
                      >
                        Transmission failed. Please retry or contact directly.
                      </motion.p>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </motion.div>
          </Card3D>
        </div>
      </div>

      {/* ── SUCCESS MODAL ── */}
      <AnimatePresence>
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] flex items-center justify-center p-6"
            style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(30px)" }}
          >
            {/* Background particles for modal */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full"
                  style={{
                    background: "#00c8aa",
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -100],
                    opacity: [0, 0.6, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            <motion.div
              initial={{ scale: 0.7, y: 60, rotateX: 20 }}
              animate={{ scale: 1, y: 0, rotateX: 0 }}
              exit={{ scale: 0.7, y: 60 }}
              transition={{ type: "spring", stiffness: 180, damping: 20 }}
              className="relative text-center max-w-md w-full rounded-[40px] p-14"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(0,200,170,0.2)",
                backdropFilter: "blur(40px)",
                boxShadow: "0 0 100px rgba(0,200,170,0.1), 0 60px 120px rgba(0,0,0,0.8)",
              }}
            >
              <CornerDeco position="tl" />
              <CornerDeco position="tr" />
              <CornerDeco position="bl" />
              <CornerDeco position="br" />

              {/* Success icon */}
              <div className="relative mx-auto mb-8 w-24 h-24">
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ border: "1px solid rgba(0,200,170,0.4)" }}
                  animate={{ scale: [1, 1.6], opacity: [0.8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ border: "1px solid rgba(0,200,170,0.2)" }}
                  animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                />
                <div
                  className="relative w-24 h-24 rounded-full flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #00887a, #00c8aa)",
                    boxShadow: "0 0 60px rgba(0,200,170,0.5)",
                  }}
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                  >
                    <CheckCircle2 size={40} className="text-black" strokeWidth={2} />
                  </motion.div>
                </div>
              </div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl font-black text-white tracking-tighter uppercase italic mb-3"
              >
                Transmission
                <br />
                <span style={{ color: "#00c8aa" }}>Received</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-white/40 text-sm leading-relaxed mb-10"
              >
                NEXA systems have logged your inquiry. Expect a response within one orbital cycle (24h).
              </motion.p>

              <motion.button
                onClick={() => setStatus("idle")}
                className="px-10 py-4 rounded-full font-black uppercase text-[9px] tracking-[0.4em] text-black transition-all"
                style={{
                  background: "linear-gradient(135deg, #00c8aa, #00887a)",
                  boxShadow: "0 0 30px rgba(0,200,170,0.3)",
                }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(0,200,170,0.5)" }}
                whileTap={{ scale: 0.97 }}
              >
                Return to Base
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </section>
  );
}