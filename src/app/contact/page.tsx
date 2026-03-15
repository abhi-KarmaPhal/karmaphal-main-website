"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import "./contact.css";

const AnimatedLink = ({ href, text, isEmail = false }: { href: string; text: string; isEmail?: boolean }) => {
  return (
    <motion.a 
      href={href} 
      className={isEmail ? "ct-footer-link" : "ct-social-link"}
      initial="rest"
      whileHover="hover"
      animate="rest"
      target={isEmail ? "" : "_blank"}
      rel="noreferrer"
    >
      <span className="ct-link-text">
        {text.split("").map((char, i) => (
          <span key={i} className="ct-char-wrap">
            <motion.span
              className="ct-char"
              variants={{
                rest: { y: 0, opacity: 1 },
                hover: { y: "-100%", opacity: 0 } // slide up and fade out
              }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.02 }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
            <motion.span
              className="ct-char-alt"
              variants={{
                rest: { y: "100%", opacity: 0 }, // wait below
                hover: { y: 0, opacity: 1 } // slide up and fade in
              }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.02 }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          </span>
        ))}
      </span>
      <motion.div 
        className="ct-link-line"
        variants={{
          rest: { scaleX: 0, transformOrigin: "right" },
          hover: { scaleX: 1, transformOrigin: "left" }
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      />
    </motion.a>
  );
};

const SERVICES = [
  { name: "Brand Identity", sym: "चिह्न" },
  { name: "Website / App", sym: "जाल" },
  { name: "Social Media & Content", sym: "वाणी" },
  { name: "Pitch Decks & Presentations", sym: "प्रस्तुति" },
  { name: "AI & Automation", sym: "यंत्र" },
  { name: "Everything — Full Team", sym: "सर्व" },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "", business: "", email: "", services: [] as string[], vision: "",
  });
  const [state, setState] = useState<"idle" | "loading" | "success">("idle");

  const toggleService = (s: string) => {
    setForm(f => ({
      ...f,
      services: f.services.includes(s) ? f.services.filter(x => x !== s) : [...f.services, s],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");
    try {
      const res = await fetch("https://karmaphal.in/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, source: "contact-page-v2" }),
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
    <main className="ct-split-main">
      
      {/* ── LEFT HALF: THE CANVAS (WHITE) ── */}
      <section data-header-theme="light" className="ct-canvas">
        {/* Faint OM Watermark Background */}
        <div className="ct-canvas-om">ॐ</div>
        
        <motion.div 
          className="ct-canvas-content"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="ct-tag">§ 007 — Initiate</div>
          
          <h1 className="ct-headline">
            Stop managing your brand. 
            <strong>Start owning it.</strong>
          </h1>
          
          <p className="ct-sub">
            We don&apos;t take on every project. We take on the right ones — and give them everything we have. Tell us what you&apos;re building.
          </p>
        </motion.div>

        <motion.div 
          className="ct-footer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="ct-footer-col">
            <span className="ct-footer-label">Direct Line</span>
            <AnimatedLink href="mailto:abhi@karmaphal.in" text="abhi@karmaphal.in" isEmail={true} />
          </div>
          
          <div className="ct-footer-col">
            <span className="ct-footer-label">Network</span>
            <div className="ct-social-links">
              <AnimatedLink href="https://instagram.com/houseofkarmaphal" text="Instagram" />
              <AnimatedLink href="https://linkedin.com/company/houseofkarmaphal" text="LinkedIn" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── RIGHT HALF: THE VOID (DARK) ── */}
      <section data-header-theme="dark" className="ct-void">
        <div className="ct-form-wrap">
          {state === "success" ? (
            /* SUCCESS STATE */
            <div className="ct-success">
              <div className="ct-success-om">ॐ</div>
              <h2 className="ct-success-title">Received.</h2>
              <p className="ct-success-body">
                We review every enquiry personally. If we&apos;re the right fit, you&apos;ll hear from us within 48 hours.
              </p>
              <div className="ct-divider" />
              <p className="ct-motto">कर्म ही धर्म है</p>
            </div>
          ) : (
            /* FORM */
            <form onSubmit={handleSubmit}>
              
              {/* Name */}
              <motion.div 
                className="ct-field"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <label className="ct-label">1. Your Name</label>
                <input
                  type="text" required
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="John Doe"
                  className="ct-input"
                />
                <span className="ct-input-line" />
              </motion.div>

              {/* Business */}
              <motion.div 
                className="ct-field"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <label className="ct-label">2. Company / Project Name</label>
                <input
                  type="text" required
                  value={form.business}
                  onChange={e => setForm(f => ({ ...f, business: e.target.value }))}
                  placeholder="Acme Corp"
                  className="ct-input"
                />
                <span className="ct-input-line" />
              </motion.div>

              {/* Email */}
              <motion.div 
                className="ct-field"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <label className="ct-label">3. Email Address</label>
                <input
                  type="email" required
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="hello@company.com"
                  className="ct-input"
                />
                <span className="ct-input-line" />
              </motion.div>

              {/* Services List (Pills) */}
              <motion.div 
                className="ct-field"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <label className="ct-label">4. What do you need? (Select all that apply)</label>
                <div className="ct-glyphs-grid">
                  {SERVICES.map((s, i) => {
                    const selected = form.services.includes(s.name);
                    return (
                      <motion.button
                        key={s.name}
                        type="button"
                        onClick={() => toggleService(s.name)}
                        className={`ct-glyph ${selected ? "selected" : ""}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.4 + i * 0.05 }}
                        viewport={{ once: true }}
                      >
                        <span className="ct-glyph-sym">{s.sym}</span>
                        {s.name}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>

              {/* Vision (Textarea) */}
              <motion.div 
                className="ct-field"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <label className="ct-label">5. The Vision</label>
                <textarea
                  rows={4} required
                  value={form.vision}
                  onChange={e => setForm(f => ({ ...f, vision: e.target.value }))}
                  placeholder="What are you building? What does success look like for you?"
                  className="ct-input ct-textarea"
                />
                <span className="ct-input-line" />
              </motion.div>

              {/* Submit Button */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <button
                  type="submit"
                  disabled={state === "loading"}
                  className="ct-submit"
                >
                  <span>
                    {state === "loading" ? "Transmitting..." : "Begin the Journey"}
                  </span>
                </button>
                <p className="ct-note">
                  Response expected within 48 hours.
                </p>
              </motion.div>

            </form>
          )}
        </div>
      </section>

    </main>
  );
}
