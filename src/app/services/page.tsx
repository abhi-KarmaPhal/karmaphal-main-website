"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const noop = () => { };

const SERVICES = [
  {
    number: "01",
    devanagari: "ब्रांड",
    title: "Brand Identity",
    tagline: "The soul of your business, made visible.",
    description: "Most businesses are forgettable — not because their product is bad, but because their brand doesn't do justice to what they've built. We fix that. From the first mark to a complete, living identity system that works everywhere.",
    everything: [
      "Logo Design & Variations",
      "Brand Identity System",
      "Typography Selection & Pairing",
      "Colour Palette & Usage Rules",
      "Brand Guidelines Document",
      "Business Cards & Stationery",
      "Letterheads & Envelopes",
      "Email Signatures",
      "Social Media Profile Assets",
      "Brand Naming & Taglines",
      "Brand Strategy & Positioning",
      "Packaging Design",
    ],
    promise: "You will never have to explain your brand again. It will speak for itself.",
  },
  {
    number: "02",
    devanagari: "वेब",
    title: "Websites & Apps",
    tagline: "Your most powerful salesperson. Working 24/7.",
    description: "A website is not a brochure. It's your best salesperson — one that works while you sleep, never has a bad day, and makes a first impression in under 3 seconds. We build websites that earn their place.",
    everything: [
      "Website Design & Development",
      "Landing Pages",
      "E-Commerce Stores",
      "Web Applications",
      "Mobile App Design & Development",
      "UI/UX Design",
      "Wireframing & Prototyping",
      "CMS Integration",
      "SEO Foundation",
      "Performance Optimisation",
      "Analytics Setup",
      "Ongoing Maintenance",
    ],
    promise: "When someone visits your website, they should feel the same way they would walking into your best store.",
  },
  {
    number: "03",
    devanagari: "सृजन",
    title: "Creative Content",
    tagline: "Consistent. Beautiful. Always on brand.",
    description: "Your brand isn't just your logo — it's every post, every banner, every presentation, every email. We keep it all consistent, beautiful, and done. So you never have to think about it again.",
    everything: [
      "Social Media Graphics",
      "Instagram / LinkedIn Posts",
      "Story & Reel Templates",
      "Marketing Banners & Ads",
      "Pitch Decks & Presentations",
      "Investor Decks",
      "Company Profiles",
      "Email Newsletter Templates",
      "Infographics",
      "Ad Creatives (Meta, Google)",
      "Event Materials",
      "Brochures & Catalogues",
    ],
    promise: "Every piece of content we create makes your brand stronger. Not just prettier — stronger.",
  },
  {
    number: "04",
    devanagari: "बुद्धि",
    title: "AI & Systems",
    tagline: "The future, built into your business today.",
    description: "The businesses that win the next decade aren't the ones that work harder — they're the ones that build smarter. AI tools, automations, and decentralized systems that give you an unfair advantage.",
    everything: [
      "AI Chatbots & Assistants",
      "Workflow Automation",
      "Custom AI Tools & Integrations",
      "Lead Generation Automation",
      "CRM Automation",
      "Content Generation Systems",
      "Data Dashboards",
      "Business Intelligence Tools",
      "Blockchain & Web3 Solutions",
      "Decentralized Applications",
      "Smart Contract Development",
      "System Integration & APIs",
    ],
    promise: "After working with us, your business will do more with less. That's not a pitch. That's the work.",
  },
];

function ServiceSection({ service, index }: { service: typeof SERVICES[0]; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const isEven = index % 2 === 0;

  return (
    <section
      ref={ref}
      className="relative w-full py-28 md:py-40 px-6 overflow-hidden"
      style={{ borderTop: "1px solid rgba(212,175,55,0.06)" }}
    >
      {/* Large number watermark */}
      <motion.div
        className="absolute pointer-events-none select-none"
        style={{
          y,
          top: "10%",
          [isEven ? "right" : "left"]: "-2%",
          fontFamily: "var(--font-cinzel), serif",
          fontSize: "clamp(8rem, 22vw, 18rem)",
          fontWeight: "900",
          color: "rgba(212,175,55,0.03)",
          lineHeight: 1,
        }}
      >
        {service.number}
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-16 md:gap-24 items-start">

        {/* Left — info */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          onUpdate={noop}
          className={isEven ? "md:order-1" : "md:order-2"}
        >
          {/* Number + Devanagari */}
          <div className="flex items-end gap-4 mb-8">
            <span
              className="font-[var(--font-cinzel)]"
              style={{ fontSize: "0.65rem", letterSpacing: "0.4em", color: "rgba(212,175,55,0.3)" }}
            >
              {service.number}
            </span>
            <span
              style={{
                fontFamily: "var(--font-gotu), serif",
                fontSize: "clamp(2rem, 5vw, 4rem)",
                color: "rgba(212,175,55,0.15)",
                lineHeight: 1,
              }}
            >
              {service.devanagari}
            </span>
          </div>

          <h2
            className="font-[var(--font-cinzel)] font-bold text-white mb-3 leading-tight"
            style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.8rem)", letterSpacing: "0.05em" }}
          >
            {service.title}
          </h2>

          <p
            className="font-[var(--font-cinzel)] italic mb-6"
            style={{ fontSize: "clamp(0.75rem, 1.3vw, 1rem)", color: "rgba(212,175,55,0.6)", letterSpacing: "0.08em" }}
          >
            {service.tagline}
          </p>

          <p
            className="font-[var(--font-cinzel)] leading-loose mb-10"
            style={{ fontSize: "clamp(0.75rem, 1.2vw, 0.9rem)", color: "rgba(192,192,192,0.55)", letterSpacing: "0.04em" }}
          >
            {service.description}
          </p>

          {/* Promise */}
          <div
            className="px-5 py-4 mb-8"
            style={{ borderLeft: "2px solid rgba(212,175,55,0.3)", background: "rgba(212,175,55,0.03)" }}
          >
            <p
              className="font-[var(--font-cinzel)] italic leading-loose"
              style={{ fontSize: "clamp(0.7rem, 1.1vw, 0.85rem)", color: "rgba(212,175,55,0.6)", letterSpacing: "0.06em" }}
            >
              "{service.promise}"
            </p>
          </div>
        </motion.div>

        {/* Right — everything list */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? 30 : -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.2, delay: 0.15, ease: "easeOut" }}
          onUpdate={noop}
          className={isEven ? "md:order-2" : "md:order-1"}
        >
          <p
            className="font-[var(--font-cinzel)] tracking-[0.4em] uppercase mb-7"
            style={{ fontSize: "0.6rem", color: "rgba(212,175,55,0.35)" }}
          >
            Everything included
          </p>
          <div className="grid grid-cols-1 gap-0">
            {service.everything.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                onUpdate={noop}
                className="flex items-center gap-4 py-3.5"
                style={{ borderBottom: "1px solid rgba(212,175,55,0.06)" }}
              >
                <div
                  className="w-1 h-1 rounded-full flex-shrink-0"
                  style={{ background: "rgba(212,175,55,0.4)" }}
                />
                <span
                  className="font-[var(--font-cinzel)] tracking-[0.08em]"
                  style={{ fontSize: "clamp(0.65rem, 1vw, 0.8rem)", color: "rgba(192,192,192,0.55)" }}
                >
                  {item}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen bg-[#010101] overflow-x-hidden">

      {/* Grain */}
      <div className="fixed inset-0 z-[50] pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundRepeat: "repeat" }}
      />

      {/* Hero */}
      <section className="relative w-full min-h-[55vh] flex flex-col items-center justify-center text-center px-6 pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(212,175,55,0.05) 0%, transparent 70%)" }} />

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.2 }}
          onUpdate={noop}
          className="text-[9px] md:text-[11px] font-[var(--font-cinzel)] tracking-[0.5em] uppercase mb-6"
          style={{ color: "rgba(212,175,55,0.4)" }}
        >
          What We Handle
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "none" }}
          transition={{ duration: 1.5, delay: 0.4 }}
          onUpdate={noop}
          className="font-[var(--font-cinzel)] font-bold text-white leading-tight mb-6"
          style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)", letterSpacing: "0.05em", maxWidth: "700px" }}
        >
          Everything your business<br />
          <span style={{ background: "linear-gradient(90deg, #D4AF37, #F9E2AF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            needs. Done.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.9 }}
          onUpdate={noop}
          className="font-[var(--font-cinzel)] leading-loose max-w-lg"
          style={{ fontSize: "clamp(0.75rem, 1.3vw, 0.95rem)", color: "rgba(192,192,192,0.5)", letterSpacing: "0.05em" }}
        >
          One team. All of this. So you can focus on building your business instead of managing your brand.
        </motion.p>
      </section>

      {/* Service sections */}
      {SERVICES.map((service, i) => (
        <ServiceSection key={service.number} service={service} index={i} />
      ))}

      {/* CTA */}
      <section className="relative z-10 w-full py-28 md:py-36 px-6 flex flex-col items-center text-center" style={{ borderTop: "1px solid rgba(212,175,55,0.06)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(139,26,26,0.07) 0%, transparent 70%)" }} />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          onUpdate={noop}
          className="font-[var(--font-cinzel)] font-bold text-white mb-6 leading-tight relative z-10"
          style={{ fontSize: "clamp(1.6rem, 4vw, 3rem)", maxWidth: "600px", letterSpacing: "0.05em" }}
        >
          Ready to take everything<br />
          <span style={{ background: "linear-gradient(90deg, #D4AF37, #F9E2AF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            off your plate?
          </span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          onUpdate={noop}
          className="relative z-10"
        >
          <Link
            href="/contact"
            className="relative overflow-hidden group text-[10px] md:text-xs font-[var(--font-cinzel)] font-bold tracking-[0.3em] uppercase px-10 py-4 transition-all duration-500 inline-block"
            style={{ background: "linear-gradient(135deg, #8A6D3B, #D4AF37, #C9963F)", color: "#010101" }}
          >
            <span className="relative z-10">Begin the Conversation</span>
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "linear-gradient(135deg, #C9963F, #F9E2AF, #D4AF37)" }} />
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 w-full py-10 px-6 flex flex-col items-center gap-4" style={{ borderTop: "1px solid rgba(212,175,55,0.08)" }}>
        <span style={{ fontFamily: "var(--font-gotu), serif", fontSize: "1.5rem", color: "rgba(212,175,55,0.15)" }}>ॐ</span>
        <p className="text-[9px] font-[var(--font-cinzel)] tracking-[0.3em] uppercase" style={{ color: "rgba(192,192,192,0.2)" }}>
          © 2026 KARMAPHAL · ALL RIGHTS RESERVED
        </p>
      </footer>
    </main>
  );
}
