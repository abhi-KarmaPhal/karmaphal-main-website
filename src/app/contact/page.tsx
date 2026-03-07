"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const noop = () => { };

const SERVICES = [
  "Brand Identity",
  "Website / App",
  "Social Media & Content",
  "Pitch Decks & Presentations",
  "AI & Automation",
  "Everything — full in-house team",
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "", business: "", email: "", services: [] as string[], vision: "", budget: "",
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
        // Only sending the necessary fields that the API endpoint currently supports
        body: JSON.stringify({ email: form.email, source: "contact-page" }),
      });
      // Currently the original API only explicitly took `email` but optionally can save others 
      // based on if they expand the API route. Sending all the form data just in case:
      // body: JSON.stringify({ ...form, source: "contact-page" })

      if (res.ok) {
        setState("success");
      } else {
        setState("idle");
        // Could handle error here
      }
    } catch (error) {
      setState("idle");
      console.error(error);
    }
  };

  return (
    <main className="relative min-h-screen bg-[#010101] overflow-x-hidden">

      {/* Grain */}
      <div className="fixed inset-0 z-[50] pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundRepeat: "repeat" }}
      />

      {/* Background geometry */}
      <div className="fixed inset-0 z-[0] flex items-center justify-end pointer-events-none opacity-[0.05] pr-0">
        <svg viewBox="0 0 1000 1000" className="w-[80vh] h-[80vh]">
          <circle cx="500" cy="500" r="480" fill="none" stroke="#D4AF37" strokeWidth="0.5" />
          <circle cx="500" cy="500" r="300" fill="none" stroke="#D4AF37" strokeWidth="0.4" />
          <polygon points="500,120 820,700 180,700" fill="none" stroke="#D4AF37" strokeWidth="0.4" />
          <polygon points="500,880 180,300 820,300" fill="none" stroke="#D4AF37" strokeWidth="0.4" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map(a => (
            <ellipse key={a} cx="500" cy="350" rx="28" ry="95" fill="none" stroke="#D4AF37" strokeWidth="0.3" transform={`rotate(${a} 500 500)`} />
          ))}
        </svg>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 pt-32 pb-24">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          onUpdate={noop}
          className="mb-16 md:mb-20"
        >
          <p className="text-[9px] md:text-[11px] font-[var(--font-cinzel)] tracking-[0.5em] uppercase mb-6" style={{ color: "rgba(212,175,55,0.4)" }}>
            Begin the Conversation
          </p>
          <h1
            className="font-[var(--font-cinzel)] font-bold text-white leading-tight mb-4"
            style={{ fontSize: "clamp(1.8rem, 5vw, 3.5rem)", letterSpacing: "0.04em" }}
          >
            Tell us about<br />
            <span style={{ background: "linear-gradient(90deg, #D4AF37, #F9E2AF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              your business.
            </span>
          </h1>
          <p
            className="font-[var(--font-cinzel)] leading-loose"
            style={{ fontSize: "clamp(0.7rem, 1.2vw, 0.9rem)", color: "rgba(192,192,192,0.5)", letterSpacing: "0.05em" }}
          >
            We don't take on every project. We take on the right ones — and give them everything we have.
          </p>
        </motion.div>

        {state === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            onUpdate={noop}
            className="flex flex-col items-center text-center py-20 gap-6"
          >
            <div style={{ fontFamily: "var(--font-gotu), serif", fontSize: "3rem", color: "rgba(212,175,55,0.6)", filter: "drop-shadow(0 0 20px rgba(212,175,55,0.4))" }}>ॐ</div>
            <h2 className="font-[var(--font-cinzel)] font-bold text-white" style={{ fontSize: "clamp(1.2rem, 3vw, 2rem)", letterSpacing: "0.1em" }}>
              Received.
            </h2>
            <p className="font-[var(--font-cinzel)] leading-loose max-w-sm" style={{ fontSize: "0.85rem", color: "rgba(192,192,192,0.55)", letterSpacing: "0.05em" }}>
              We review every enquiry personally. If we're the right fit, you'll hear from us within 48 hours.
            </p>
            <div className="w-16 h-[1px] mt-2" style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)" }} />
            <p className="font-[var(--font-cinzel)] tracking-[0.3em] uppercase text-[9px]" style={{ color: "rgba(212,175,55,0.3)" }}>
              कर्म ही धर्म है
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            onUpdate={noop}
            onSubmit={handleSubmit}
            className="flex flex-col gap-10"
          >
            {/* Name */}
            <div className="flex flex-col gap-2">
              <label className="text-[9px] font-[var(--font-cinzel)] tracking-[0.4em] uppercase" style={{ color: "rgba(212,175,55,0.4)" }}>
                Your Name
              </label>
              <input
                type="text" required
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="Full name"
                className="bg-transparent border-b outline-none py-3 font-[var(--font-cinzel)] text-white placeholder:text-white/20 tracking-wide transition-colors duration-300"
                style={{ borderColor: "rgba(212,175,55,0.2)", fontSize: "clamp(0.8rem,1.4vw,1rem)" }}
                onFocus={e => (e.target.style.borderColor = "rgba(212,175,55,0.6)")}
                onBlur={e => (e.target.style.borderColor = "rgba(212,175,55,0.2)")}
              />
            </div>

            {/* Business */}
            <div className="flex flex-col gap-2">
              <label className="text-[9px] font-[var(--font-cinzel)] tracking-[0.4em] uppercase" style={{ color: "rgba(212,175,55,0.4)" }}>
                Your Business
              </label>
              <input
                type="text" required
                value={form.business}
                onChange={e => setForm(f => ({ ...f, business: e.target.value }))}
                placeholder="Company or project name"
                className="bg-transparent border-b outline-none py-3 font-[var(--font-cinzel)] text-white placeholder:text-white/20 tracking-wide transition-colors duration-300"
                style={{ borderColor: "rgba(212,175,55,0.2)", fontSize: "clamp(0.8rem,1.4vw,1rem)" }}
                onFocus={e => (e.target.style.borderColor = "rgba(212,175,55,0.6)")}
                onBlur={e => (e.target.style.borderColor = "rgba(212,175,55,0.2)")}
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-[9px] font-[var(--font-cinzel)] tracking-[0.4em] uppercase" style={{ color: "rgba(212,175,55,0.4)" }}>
                Email Address
              </label>
              <input
                type="email" required
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="your@email.com"
                className="bg-transparent border-b outline-none py-3 font-[var(--font-cinzel)] text-white placeholder:text-white/20 tracking-wide transition-colors duration-300"
                style={{ borderColor: "rgba(212,175,55,0.2)", fontSize: "clamp(0.8rem,1.4vw,1rem)" }}
                onFocus={e => (e.target.style.borderColor = "rgba(212,175,55,0.6)")}
                onBlur={e => (e.target.style.borderColor = "rgba(212,175,55,0.2)")}
              />
            </div>

            {/* Services */}
            <div className="flex flex-col gap-4">
              <label className="text-[9px] font-[var(--font-cinzel)] tracking-[0.4em] uppercase" style={{ color: "rgba(212,175,55,0.4)" }}>
                What Do You Need? (Select all that apply)
              </label>
              <div className="flex flex-wrap gap-2.5">
                {SERVICES.map(s => {
                  const selected = form.services.includes(s);
                  return (
                    <button
                      key={s} type="button"
                      onClick={() => toggleService(s)}
                      className="px-4 py-2.5 text-[9px] font-[var(--font-cinzel)] tracking-[0.15em] uppercase transition-all duration-300"
                      style={{
                        border: selected ? "1px solid rgba(212,175,55,0.8)" : "1px solid rgba(212,175,55,0.2)",
                        color: selected ? "#D4AF37" : "rgba(192,192,192,0.4)",
                        background: selected ? "rgba(212,175,55,0.08)" : "transparent",
                      }}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Vision */}
            <div className="flex flex-col gap-2">
              <label className="text-[9px] font-[var(--font-cinzel)] tracking-[0.4em] uppercase" style={{ color: "rgba(212,175,55,0.4)" }}>
                Tell Us Your Vision
              </label>
              <textarea
                rows={4} required
                value={form.vision}
                onChange={e => setForm(f => ({ ...f, vision: e.target.value }))}
                placeholder="What are you building? What does success look like?"
                className="bg-transparent border-b outline-none py-3 font-[var(--font-cinzel)] text-white placeholder:text-white/20 tracking-wide resize-none transition-colors duration-300"
                style={{ borderColor: "rgba(212,175,55,0.2)", fontSize: "clamp(0.8rem,1.4vw,0.9rem)" }}
                onFocus={e => (e.target.style.borderColor = "rgba(212,175,55,0.6)")}
                onBlur={e => (e.target.style.borderColor = "rgba(212,175,55,0.2)")}
              />
            </div>

            {/* Submit */}
            <div className="flex flex-col items-start gap-4 mt-4">
              <button
                type="submit"
                disabled={state === "loading"}
                className="relative overflow-hidden group text-[10px] md:text-xs font-[var(--font-cinzel)] font-bold tracking-[0.3em] uppercase px-10 py-4 transition-all duration-500 disabled:opacity-50"
                style={{ background: "linear-gradient(135deg, #8A6D3B, #D4AF37, #C9963F)", color: "#010101" }}
              >
                <span className="relative z-10">
                  {state === "loading" ? "Sending..." : "Submit Enquiry"}
                </span>
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "linear-gradient(135deg, #C9963F, #F9E2AF, #D4AF37)" }} />
              </button>

              <p className="text-[9px] font-[var(--font-cinzel)] tracking-[0.2em]" style={{ color: "rgba(192,192,192,0.25)" }}>
                We review every enquiry personally. Response within 48 hours.
              </p>
            </div>
          </motion.form>
        )}

        {/* Direct contact */}
        <div className="mt-20 pt-10" style={{ borderTop: "1px solid rgba(212,175,55,0.08)" }}>
          <p className="text-[9px] font-[var(--font-cinzel)] tracking-[0.4em] uppercase mb-4" style={{ color: "rgba(212,175,55,0.25)" }}>
            Or reach us directly
          </p>
          <a
            href="mailto:abhi@karmaphal.in"
            className="font-[var(--font-cinzel)] tracking-wide transition-colors duration-300"
            style={{ fontSize: "clamp(0.8rem,1.4vw,1rem)", color: "rgba(192,192,192,0.4)" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#D4AF37")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(192,192,192,0.4)")}
          >
            abhi@karmaphal.in
          </a>
        </div>
      </div>
    </main>
  );
}
