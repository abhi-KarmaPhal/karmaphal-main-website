"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import AmbientParticles from "../../components/AmbientParticles";
import "./contact.css";

/* ── ANIMATED LINK (character-by-character hover) ── */
const AnimatedLink = ({
  href,
  text,
  className = "ritual-link",
}: {
  href: string;
  text: string;
  className?: string;
}) => {
  return (
    <motion.a
      href={href}
      className={className}
      initial="rest"
      whileHover="hover"
      animate="rest"
      target={className === "ritual-social-link" ? "_blank" : ""}
      rel="noreferrer"
    >
      <span className="ritual-link-text">
        {text.split("").map((char, i) => (
          <span key={i} className="ritual-char-wrap">
            <motion.span
              className="ritual-char"
              variants={{
                rest: { y: 0, opacity: 1 },
                hover: { y: "-100%", opacity: 0 },
              }}
              transition={{
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
                delay: i * 0.02,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
            <motion.span
              className="ritual-char-alt"
              variants={{
                rest: { y: "100%", opacity: 0 },
                hover: { y: 0, opacity: 1 },
              }}
              transition={{
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
                delay: i * 0.02,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          </span>
        ))}
      </span>
      <motion.div
        className="ritual-link-line"
        variants={{
          rest: { scaleX: 0, transformOrigin: "right" },
          hover: { scaleX: 1, transformOrigin: "left" },
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      />
    </motion.a>
  );
};

/* ── SERVICE DEFINITIONS ── */
const SERVICES = [
  { name: "Brand Identity", sym: "चिह्न" },
  { name: "Website / App", sym: "जाल" },
  { name: "Social Media & Content", sym: "वाणी" },
  { name: "Pitch Decks & Presentations", sym: "प्रस्तुति" },
  { name: "AI & Automation", sym: "यंत्र" },
  { name: "Everything — Full Team", sym: "सर्व" },
];

/* ── TRANSMISSION PULSE — Unique to contact page ── */
const RINGS = [1, 2, 3, 4, 5];
const ORBITS = [
  { rx: 320, ry: 180, rot: -15, dur: 18, delay: 0 },
  { rx: 420, ry: 120, rot: 35, dur: 24, delay: 2 },
  { rx: 260, ry: 260, rot: 60, dur: 30, delay: 5 },
];

function TransmissionPulse() {
  return (
    <div className="transmission-pulse">
      <svg viewBox="0 0 1000 1000" className="transmission-svg">
        {/* Pulsing concentric rings */}
        {RINGS.map((ring) => (
          <circle
            key={`pulse-${ring}`}
            cx="500"
            cy="500"
            r={80 + ring * 70}
            fill="none"
            stroke="#D4AF37"
            strokeWidth="0.8"
            className="transmission-ring"
            style={{
              animationDelay: `${ring * 1.2}s`,
              animationDuration: `${6 + ring * 0.5}s`,
            }}
          />
        ))}

        {/* Orbital paths with traveling dots */}
        {ORBITS.map((orbit, i) => (
          <g
            key={`orbit-${i}`}
            transform={`rotate(${orbit.rot} 500 500)`}
          >
            {/* The orbital path */}
            <ellipse
              cx="500"
              cy="500"
              rx={orbit.rx}
              ry={orbit.ry}
              fill="none"
              stroke="#D4AF37"
              strokeWidth="0.5"
              strokeDasharray="4 8"
              opacity="0.3"
            />
            {/* Traveling dot */}
            <circle r="4" fill="#D4AF37" opacity="0.6">
              <animateMotion
                dur={`${orbit.dur}s`}
                begin={`${orbit.delay}s`}
                repeatCount="indefinite"
                path={`M${500 + orbit.rx},500 A${orbit.rx},${orbit.ry} 0 1,1 ${500 - orbit.rx},500 A${orbit.rx},${orbit.ry} 0 1,1 ${500 + orbit.rx},500`}
              />
            </circle>
            {/* Dot glow trail */}
            <circle r="12" fill="#D4AF37" opacity="0.15">
              <animateMotion
                dur={`${orbit.dur}s`}
                begin={`${orbit.delay}s`}
                repeatCount="indefinite"
                path={`M${500 + orbit.rx},500 A${orbit.rx},${orbit.ry} 0 1,1 ${500 - orbit.rx},500 A${orbit.rx},${orbit.ry} 0 1,1 ${500 + orbit.rx},500`}
              />
            </circle>
          </g>
        ))}

        {/* Center bindu — the signal origin */}
        <circle cx="500" cy="500" r="5" fill="#D4AF37" opacity="0.7" className="transmission-bindu" />
        <circle cx="500" cy="500" r="14" fill="none" stroke="#D4AF37" strokeWidth="0.8" opacity="0.4" className="transmission-bindu" />

        {/* Cross-hair lines through center */}
        <line x1="500" y1="100" x2="500" y2="900" stroke="#D4AF37" strokeWidth="0.4" opacity="0.12" />
        <line x1="100" y1="500" x2="900" y2="500" stroke="#D4AF37" strokeWidth="0.4" opacity="0.12" />
      </svg>
    </div>
  );
}

/* ── STAGGER VARIANTS ── */
const stagger = (delay: number) => ({
  initial: { opacity: 0, y: 25 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  viewport: { once: true },
});

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    business: "",
    email: "",
    services: [] as string[],
    vision: "",
  });
  const [state, setState] = useState<"idle" | "loading" | "success">("idle");

  const toggleService = (s: string) => {
    setForm((f) => ({
      ...f,
      services: f.services.includes(s)
        ? f.services.filter((x) => x !== s)
        : [...f.services, s],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");
    try {
      const res = await fetch("https://karmaphal.in/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, source: "contact-page-v3" }),
      });
      if (res.ok) {
        setState("success");
      } else {
        setState("idle");
      }
    } catch (error) {
      setState("idle");
      console.error(error);
    }
  };

  return (
    <main className="ritual-page">
      <AmbientParticles />

      {/* ═══════════════════════════════════════════
          HERO ZONE — THE ENTRY STATEMENT
      ═══════════════════════════════════════════ */}
      <section className="ritual-hero">
        {/* Transmission Pulse — signal rings unique to contact page */}
        <TransmissionPulse />

        {/* Ghost OM watermark */}
        <div className="ritual-hero-ghost" aria-hidden="true">ॐ</div>

        {/* Architectural corner brackets */}
        <div className="ritual-corners" aria-hidden="true">
          <span className="ritual-corner tl" />
          <span className="ritual-corner tr" />
          <span className="ritual-corner bl" />
          <span className="ritual-corner br" />
        </div>

        <motion.div
          className="ritual-hero-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Eyebrow */}
          <motion.div
            className="ritual-eyebrow"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="ritual-ey-line" />
            <span className="ritual-ey-txt">§ 007 — Initiate</span>
            <span className="ritual-ey-dot" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="ritual-headline"
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="ritual-headline-top">This is</span>
            <span className="ritual-headline-gold">the beginning.</span>
          </motion.h1>

          {/* Subline */}
          <motion.p
            className="ritual-sub"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            We don&apos;t take on every project. We take on the right ones — and
            give them everything we have. Tell us what you&apos;re building.
          </motion.p>

          {/* Gold hairline */}
          <motion.div
            className="ritual-hairline"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Contact details */}
          <motion.div
            className="ritual-details"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <div className="ritual-detail-col">
              <span className="ritual-detail-label">Direct Line</span>
              <AnimatedLink
                href="mailto:abhi@karmaphal.in"
                text="abhi@karmaphal.in"
                className="ritual-link"
              />
            </div>
            <div className="ritual-detail-col">
              <span className="ritual-detail-label">Network</span>
              <div className="ritual-social-row">
                <AnimatedLink
                  href="https://instagram.com/houseofkarmaphal"
                  text="Instagram"
                  className="ritual-social-link"
                />
                <AnimatedLink
                  href="https://linkedin.com/company/houseofkarmaphal"
                  text="LinkedIn"
                  className="ritual-social-link"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="ritual-scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
        >
          <span className="ritual-scroll-text">Scroll</span>
          <motion.div
            className="ritual-scroll-bar"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          THE SANCTUM — FORM SECTION
      ═══════════════════════════════════════════ */}
      <section className="ritual-sanctum">
        <motion.div className="ritual-sanctum-frame" {...stagger(0)}>
          {/* Ghost watermark */}
          <div className="ritual-ghost" aria-hidden="true">
            संवाद
          </div>

          {/* Sanctum header */}
          <div className="ritual-sanctum-header">
            <motion.h2 className="ritual-sanctum-title" {...stagger(0.1)}>
              Begin the Conversation
            </motion.h2>
            <motion.p className="ritual-sanctum-sub" {...stagger(0.2)}>
              Every great collaboration starts with a single message
            </motion.p>
          </div>

          {state === "success" ? (
            /* ── SUCCESS STATE ── */
            <div className="ritual-success">
              <div className="ritual-success-om">ॐ</div>
              <h2 className="ritual-success-title">Received.</h2>
              <p className="ritual-success-body">
                We review every enquiry personally. If we&apos;re the right fit,
                you&apos;ll hear from us within 48 hours.
              </p>
              <div className="ritual-success-divider" />
              <p className="ritual-success-motto">कर्म ही धर्म है</p>
            </div>
          ) : (
            /* ── FORM ── */
            <form className="ritual-form" onSubmit={handleSubmit}>
              {/* Name + Business — 2-column row */}
              <div className="ritual-row">
                <motion.div className="ritual-field" {...stagger(0.15)}>
                  <label className="ritual-label">Your Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    placeholder="John Doe"
                    className="ritual-input"
                  />
                  <span className="ritual-input-line" />
                </motion.div>

                <motion.div className="ritual-field" {...stagger(0.2)}>
                  <label className="ritual-label">Company / Project</label>
                  <input
                    type="text"
                    required
                    value={form.business}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, business: e.target.value }))
                    }
                    placeholder="Acme Corp"
                    className="ritual-input"
                  />
                  <span className="ritual-input-line" />
                </motion.div>
              </div>

              {/* Email — full width */}
              <motion.div className="ritual-field" {...stagger(0.25)}>
                <label className="ritual-label">Email Address</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                  placeholder="hello@company.com"
                  className="ritual-input"
                />
                <span className="ritual-input-line" />
              </motion.div>

              {/* Service Cards Grid */}
              <motion.div className="ritual-field" {...stagger(0.3)}>
                <span className="ritual-services-label">
                  What do you need?
                </span>
                <div className="ritual-services-grid">
                  {SERVICES.map((s, i) => {
                    const selected = form.services.includes(s.name);
                    return (
                      <motion.button
                        key={s.name}
                        type="button"
                        onClick={() => toggleService(s.name)}
                        className={`ritual-service-card ${selected ? "selected" : ""}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.35 + i * 0.06,
                        }}
                        viewport={{ once: true }}
                      >
                        <span className="ritual-card-sym">{s.sym}</span>
                        <span className="ritual-card-name">{s.name}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>

              {/* Vision — textarea with corner brackets */}
              <motion.div className="ritual-field" {...stagger(0.4)}>
                <label className="ritual-label">The Vision</label>
                <div className="ritual-vision-wrap">
                  <textarea
                    rows={4}
                    required
                    value={form.vision}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, vision: e.target.value }))
                    }
                    placeholder="What are you building? What does success look like for you?"
                    className="ritual-input ritual-textarea"
                  />
                  <span className="ritual-input-line" />
                </div>
              </motion.div>

              {/* Submit */}
              <motion.div className="ritual-submit-area" {...stagger(0.5)}>
                <button
                  type="submit"
                  disabled={state === "loading"}
                  className="ritual-submit"
                >
                  <span>
                    {state === "loading"
                      ? "Transmitting..."
                      : "Begin the Journey"}
                  </span>
                </button>

                <div className="ritual-closing">
                  <span className="ritual-deva-mark">कर्म ही धर्म है</span>
                  <p className="ritual-note">
                    Response expected within 48 hours.
                  </p>
                </div>
              </motion.div>
            </form>
          )}
        </motion.div>
      </section>

      <div className="ritual-bottom-space" />
    </main>
  );
}
