"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

/* ─────────────────────────────────────────────
   Inline SVG icon helpers (no external deps)
───────────────────────────────────────────── */
const IconMail = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-10 7L2 7" />
  </svg>
);
const IconPhone = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.12-.45c.9.362 1.847.574 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const IconMapPin = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 13-8 13s-8-7-8-13a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
const IconArrow = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);
const IconCheckCircle = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <path d="M22 4 12 14.01l-3-3" />
  </svg>
);
const IconSend = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="M22 2 11 13" />
  </svg>
);

/* ─────────────────────────────────────────────
   Poppins font loader (inject once)
───────────────────────────────────────────── */
const PoppinsLoader = () => {
  useEffect(() => {
    if (document.getElementById("poppins-font")) return;
    const link = document.createElement("link");
    link.id = "poppins-font";
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap";
    document.head.appendChild(link);
  }, []);
  return null;
};

/* ─────────────────────────────────────────────
   Contact card row
───────────────────────────────────────────── */
interface ContactRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: React.ReactNode;
  onClick?: () => void;
  href?: string;
}
const ContactRow = ({ icon, label, value, sub, onClick, href }: ContactRowProps) => {
  const Tag = href ? "a" : "button";
  const extra = href
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { type: "button" as const, onClick };

  return (
    <motion.div whileHover={{ x: 7 }} transition={{ type: "spring", stiffness: 300, damping: 25 }}>
      <Tag
        {...(extra as any)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          width: "100%",
          padding: "16px 18px",
          borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(255,255,255,0.03)",
          color: "#fff",
          textDecoration: "none",
          cursor: "pointer",
          textAlign: "left",
          transition: "background 0.25s, border-color 0.25s",
          fontFamily: "'Poppins', sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
        onMouseEnter={(e: React.MouseEvent<HTMLElement>) => {
          (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)";
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.18)";
        }}
        onMouseLeave={(e: React.MouseEvent<HTMLElement>) => {
          (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
        }}
      >
        <div
          style={{
            width: 46,
            height: 46,
            borderRadius: 14,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.07)",
            color: "#fff",
          }}
        >
          {icon}
        </div>
        <div>
          <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 3 }}>
            {label}
          </p>
          <p style={{ fontSize: 13.5, fontWeight: 500, color: "#fff" }}>{value}</p>
          {sub && <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{sub}</div>}
        </div>
      </Tag>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
export default function ContactSection() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  /* Tilt effect */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const mxSpring = useSpring(mx, { stiffness: 180, damping: 28 });
  const mySpring = useSpring(my, { stiffness: 180, damping: 28 });
  const rotateX = useTransform(mySpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mxSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  const onMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 0.35);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 0.35);
  };
  const onMouseLeave = () => { mx.set(0); my.set(0); };

  const EMAIL = "agency.nexa.01@gmail.com";

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch (_) {}
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch("https://formspree.io/f/mvzvkpqe", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  /* ── Shared style tokens ── */
  const panel: React.CSSProperties = {
    background: "rgba(255,255,255,0.028)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 24,
    padding: "36px 32px",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    fontFamily: "'Poppins', sans-serif",
    position: "relative",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 12,
    padding: "13px 16px",
    color: "#fff",
    fontFamily: "'Poppins', sans-serif",
    fontSize: 13.5,
    fontWeight: 400,
    outline: "none",
    transition: "border-color 0.25s, background 0.25s",
    appearance: "none" as const,
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: "0.09em",
    textTransform: "uppercase" as const,
    color: "rgba(255,255,255,0.4)",
    marginBottom: 8,
    fontFamily: "'Poppins', sans-serif",
  };

  return (
    <>
      <PoppinsLoader />

      {/* ── Global keyframes injected once ── */}
      <style>{`
        @keyframes _gridShift {
          0%   { background-position: 0 0; }
          100% { background-position: 44px 44px; }
        }
        @keyframes _orbPulse {
          0%, 100% { opacity: .55; transform: scale(1); }
          50%       { opacity: .9;  transform: scale(1.07); }
        }
        @keyframes _dotBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: .4; }
        }
        @keyframes _spin {
          to { transform: rotate(360deg); }
        }
        @keyframes _fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
        ._cs-input:focus {
          border-color: rgba(255,255,255,0.35) !important;
          background: rgba(255,255,255,0.07) !important;
        }
        ._cs-input::placeholder { color: rgba(255,255,255,0.22); }
        ._cs-btn:hover  { background: #e8e8e8 !important; box-shadow: 0 8px 32px rgba(255,255,255,0.1) !important; transform: translateY(-1px) !important; }
        ._cs-btn:active { transform: scale(0.98) !important; }
        ._cs-btn:disabled { opacity: .5; cursor: not-allowed !important; transform: none !important; }
      `}</style>

      <section
        id="contact"
        style={{
          position: "relative",
          width: "100%",
          padding: "88px 24px 96px",
          background: "#080808",
          overflow: "hidden",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        {/* ── Background grid ── */}
        <div
          aria-hidden
          style={{
            position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            animation: "_gridShift 18s linear infinite",
          }}
        />

        {/* ── Orbs ── */}
        <div aria-hidden style={{ position:"absolute", width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle, rgba(255,255,255,0.055) 0%, transparent 68%)", top:-130, right:-110, pointerEvents:"none", zIndex:0, animation:"_orbPulse 8s ease-in-out infinite" }} />
        <div aria-hidden style={{ position:"absolute", width:380, height:380, borderRadius:"50%", background:"radial-gradient(circle, rgba(255,255,255,0.038) 0%, transparent 68%)", bottom:-80, left:-70, pointerEvents:"none", zIndex:0, animation:"_orbPulse 10s ease-in-out infinite reverse" }} />

        {/* ── Noise texture ── */}
        <div aria-hidden style={{ position:"absolute", inset:0, zIndex:0, pointerEvents:"none", opacity:0.018, backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize:"200px" }} />

        {/* ── Inner ── */}
        <div style={{ position:"relative", zIndex:1, maxWidth:980, margin:"0 auto" }}>

          {/* ── Header ── */}
          <motion.div
            initial={{ opacity:0, y:36 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            transition={{ duration:0.75, ease:[0.22,1,0.36,1] }}
            style={{ textAlign:"center", marginBottom:56 }}
          >
            {/* Badge */}
            <div style={{ display:"inline-flex", alignItems:"center", gap:10, padding:"8px 22px", borderRadius:100, border:"1px solid rgba(255,255,255,0.12)", background:"rgba(255,255,255,0.04)", backdropFilter:"blur(12px)", marginBottom:28 }}>
              <div style={{ width:7, height:7, borderRadius:"50%", background:"#fff", animation:"_dotBlink 2.2s ease-in-out infinite" }} />
              <span style={{ fontSize:11, fontWeight:500, letterSpacing:"0.13em", textTransform:"uppercase", color:"rgba(255,255,255,0.7)" }}>Get In Touch</span>
            </div>

            {/* Headline */}
            <h2 style={{ margin:0, fontFamily:"'Poppins', sans-serif", fontWeight:700, fontSize:"clamp(38px, 6vw, 64px)", lineHeight:1.08, color:"#fff" }}>
              Ready to build
              <span style={{ display:"block", fontWeight:800, fontSize:"clamp(36px, 5.6vw, 60px)", background:"linear-gradient(135deg, #fff 0%, #606060 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", marginTop:6 }}>
                something extraordinary?
              </span>
            </h2>
          </motion.div>

          {/* ── Two-column grid ── */}
          <motion.div
            ref={containerRef}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={{ rotateX, rotateY, transformStyle:"preserve-3d" }}
          >
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))", gap:24, alignItems:"start" }}>

              {/* ── LEFT: Contact info ── */}
              <motion.div
                initial={{ opacity:0, x:-32 }}
                whileInView={{ opacity:1, x:0 }}
                viewport={{ once:true }}
                transition={{ duration:0.7, delay:0.15, ease:[0.22,1,0.36,1] }}
                style={{ ...panel, transform:"translateZ(28px)" }}
              >
                <p style={{ fontSize:15, fontWeight:600, color:"rgba(255,255,255,0.88)", letterSpacing:"0.01em", marginBottom:28, fontFamily:"'Poppins', sans-serif" }}>
                  Connect With Us
                </p>

                <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                  <ContactRow
                    icon={<IconMail />}
                    label="Email"
                    value={EMAIL}
                    sub={
                      <AnimatePresence mode="wait">
                        {copied ? (
                          <motion.span key="ok" initial={{ opacity:0, y:4 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }} style={{ display:"flex", alignItems:"center", gap:4, color:"#ccc" }}>
                            <IconCheck /> Copied!
                          </motion.span>
                        ) : (
                          <motion.span key="hint" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
                            Click to copy
                          </motion.span>
                        )}
                      </AnimatePresence>
                    }
                    onClick={copyEmail}
                  />

                  <ContactRow
                    icon={<IconPhone />}
                    label="WhatsApp"
                    value="+92 343 4378026"
                    sub="Open WhatsApp ↗"
                    href="https://wa.me/923434378026"
                  />

                  <ContactRow
                    icon={<IconMapPin />}
                    label="Location"
                    value="Lahore, Pakistan"
                  />
                </div>

                {/* Divider */}
                <div style={{ height:1, background:"rgba(255,255,255,0.07)", margin:"22px 0" }} />

                <p style={{ fontSize:12, color:"rgba(255,255,255,0.28)", lineHeight:1.75, fontFamily:"'Poppins', sans-serif" }}>
                  We typically respond within 24 hours. For urgent matters, reach us directly via WhatsApp.
                </p>
              </motion.div>

              {/* ── RIGHT: Contact form ── */}
              <motion.div
                initial={{ opacity:0, x:32 }}
                whileInView={{ opacity:1, x:0 }}
                viewport={{ once:true }}
                transition={{ duration:0.7, delay:0.28, ease:[0.22,1,0.36,1] }}
                style={{ ...panel, transform:"translateZ(48px)" }}
              >
                <form onSubmit={handleSubmit}>
                  {/* Name + Email row */}
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:18 }}>
                    <div>
                      <label style={labelStyle}>Full Name</label>
                      <input
                        required
                        name="name"
                        type="text"
                        placeholder="Your name"
                        className="_cs-input"
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Email</label>
                      <input
                        required
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        className="_cs-input"
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div style={{ marginBottom:22 }}>
                    <label style={labelStyle}>Your Project</label>
                    <textarea
                      required
                      name="message"
                      rows={6}
                      placeholder="Tell us about your vision..."
                      className="_cs-input"
                      style={{ ...inputStyle, resize:"vertical", lineHeight:1.65 }}
                    />
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={status === "submitting"}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.97 }}
                    className="_cs-btn"
                    style={{
                      width: "100%",
                      padding: "15px 20px",
                      borderRadius: 14,
                      border: "none",
                      background: "#fff",
                      color: "#080808",
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 9,
                      letterSpacing: "0.01em",
                      transition: "background 0.2s, box-shadow 0.2s, transform 0.15s",
                    }}
                  >
                    {status === "submitting" ? (
                      <>
                        <span>Sending…</span>
                        <div style={{ width:16, height:16, border:"2px solid rgba(0,0,0,0.18)", borderTopColor:"#080808", borderRadius:"50%", animation:"_spin 0.7s linear infinite" }} />
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <IconArrow />
                      </>
                    )}
                  </motion.button>

                  {/* Error hint */}
                  <AnimatePresence>
                    {status === "error" && (
                      <motion.p
                        initial={{ opacity:0, y:6 }}
                        animate={{ opacity:1, y:0 }}
                        exit={{ opacity:0 }}
                        style={{ marginTop:12, textAlign:"center", fontSize:12, color:"rgba(255,120,120,0.9)", fontFamily:"'Poppins', sans-serif" }}
                      >
                        Something went wrong — please try again.
                      </motion.p>
                    )}
                  </AnimatePresence>
                </form>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* ── Success modal ── */}
        <AnimatePresence>
          {status === "success" && (
            <motion.div
              initial={{ opacity:0 }}
              animate={{ opacity:1 }}
              exit={{ opacity:0 }}
              style={{ position:"fixed", inset:0, zIndex:50, display:"flex", alignItems:"center", justifyContent:"center", padding:24, background:"rgba(0,0,0,0.85)", backdropFilter:"blur(18px)", WebkitBackdropFilter:"blur(18px)" }}
            >
              <motion.div
                initial={{ scale:0.88, y:20 }}
                animate={{ scale:1, y:0 }}
                exit={{ scale:0.88, y:20 }}
                transition={{ type:"spring", stiffness:260, damping:22 }}
                style={{ background:"rgba(255,255,255,0.06)", backdropFilter:"blur(32px)", WebkitBackdropFilter:"blur(32px)", border:"1px solid rgba(255,255,255,0.14)", borderRadius:28, padding:"52px 44px", maxWidth:400, width:"100%", textAlign:"center", fontFamily:"'Poppins', sans-serif" }}
              >
                {/* Icon */}
                <div style={{ width:68, height:68, borderRadius:20, background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.14)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 24px", color:"#fff" }}>
                  <IconCheckCircle />
                </div>

                <h3 style={{ fontSize:26, fontWeight:700, color:"#fff", marginBottom:10 }}>Message Sent!</h3>
                <p style={{ fontSize:14, color:"rgba(255,255,255,0.55)", lineHeight:1.7, marginBottom:28 }}>
                  Thank you for reaching out. We'll get back to you within 24 hours.
                </p>

                <motion.button
                  whileHover={{ scale:1.04 }}
                  whileTap={{ scale:0.96 }}
                  onClick={() => setStatus("idle")}
                  style={{ padding:"12px 36px", borderRadius:12, border:"1px solid rgba(255,255,255,0.2)", background:"rgba(255,255,255,0.07)", color:"#fff", fontFamily:"'Poppins', sans-serif", fontSize:14, fontWeight:500, cursor:"pointer", transition:"background 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.14)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
                >
                  Done
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}
