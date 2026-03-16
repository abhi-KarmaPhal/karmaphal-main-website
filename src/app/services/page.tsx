"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
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

function FloatingMonolith({ theme }: { theme: "dark" | "light" }) {
  return (
    <motion.div
      className="absolute pointer-events-none z-0"
      initial={{ opacity: 0, rotate: -15, scale: 0.8 }}
      whileInView={{ opacity: 1, rotate: 10, scale: 1 }}
      animate={{ 
        y: [0, -20, 0],
        rotate: [10, 15, 10]
      }}
      transition={{ 
        opacity: { duration: 1.5 },
        rotate: { duration: 2, ease: "easeOut" },
        scale: { duration: 2, ease: "easeOut" },
        y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
      }}
      style={{
        width: "300px",
        height: "500px",
        border: `1px solid ${theme === "dark" ? "rgba(212,175,55,0.15)" : "rgba(212,175,55,0.2)"}`,
        background: theme === "dark" 
          ? "linear-gradient(135deg, rgba(212,175,55,0.03) 0%, transparent 100%)"
          : "linear-gradient(135deg, rgba(212,175,55,0.05) 0%, transparent 100%)",
        right: theme === "dark" ? "10%" : "auto",
        left: theme === "light" ? "10%" : "auto",
        top: "20%",
        display: "block"
      }}
    />
  );
}

function ServiceSection({ service, index }: { service: typeof SERVICES[0]; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yWatermark = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacityWatermark = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  const isEven = index % 2 === 0;
  const theme = isEven ? "dark" : "light";
  
  const bgColor = theme === "dark" ? "#010101" : "#e6e3dd";
  const textColor = theme === "dark" ? "#ffffff" : "#1a1a1a";
  const subTextColor = theme === "dark" ? "rgba(230, 227, 221, 0.85)" : "rgba(26, 26, 26, 0.8)";
  const accentColor = "#D4AF37";
  const cardBg = theme === "dark" ? "rgba(255, 255, 255, 0.02)" : "rgba(0, 0, 0, 0.02)";
  const cardBorder = theme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)";

  return (
    <section
      ref={ref}
      className="relative w-full py-32 md:py-48 px-6 overflow-hidden transition-colors duration-1000"
      style={{ backgroundColor: bgColor }}
    >
      {/* Decorative Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ 
          backgroundImage: `linear-gradient(${theme === "dark" ? "rgba(212,175,55,0.2)" : "rgba(0,0,0,0.2)"} 1px, transparent 1px), linear-gradient(90deg, ${theme === "dark" ? "rgba(212,175,55,0.2)" : "rgba(0,0,0,0.2)"} 1px, transparent 1px)`,
          backgroundSize: "60px 60px"
        }}
      />

      <FloatingMonolith theme={theme} />

      {/* Large number watermark */}
      <motion.div
        className="absolute pointer-events-none select-none z-0"
        style={{
          y: yWatermark,
          opacity: opacityWatermark,
          top: "15%",
          [isEven ? "right" : "left"]: "-5%",
          fontFamily: "var(--font-cinzel), serif",
          fontSize: "clamp(12rem, 30vw, 25rem)",
          fontWeight: "900",
          color: theme === "dark" ? "rgba(212,175,55,0.03)" : "rgba(0,0,0,0.04)",
          lineHeight: 1,
          WebkitTextStroke: theme === "dark" ? "1px rgba(212,175,55,0.05)" : "1px rgba(0,0,0,0.05)",
        }}
      >
        {service.number}
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 md:gap-32 items-center">

        {/* INFO COLUMN */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className={isEven ? "lg:order-1" : "lg:order-2"}
        >
          {/* Top Label */}
          <div className="flex items-center gap-6 mb-10">
            <div className="h-px w-12" style={{ background: accentColor }} />
            <span
              className="font-mono text-[10px] tracking-[0.5em] uppercase"
              style={{ color: accentColor }}
            >
              Protocol {service.number}
            </span>
          </div>

          <h2
            className="font-[var(--font-cinzel)] font-bold mb-6 leading-[1.1] tracking-tight"
            style={{ 
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)", 
              color: textColor,
              textShadow: theme === "dark" ? "0 0 40px rgba(255,255,255,0.1)" : "none"
            }}
          >
            {service.title}
          </h2>

          <div className="flex items-center gap-4 mb-8">
             <span
              style={{
                fontFamily: "var(--font-gotu), serif",
                fontSize: "2.5rem",
                color: accentColor,
                opacity: 0.6,
                lineHeight: 1,
              }}
            >
              {service.devanagari}
            </span>
            <div className="h-px flex-grow" style={{ background: theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" }} />
          </div>

          <p
            className="font-[var(--font-cinzel)] italic mb-8"
            style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.15rem)", color: accentColor, letterSpacing: "0.1em" }}
          >
            {service.tagline}
          </p>

          <p
            className="font-cinzel leading-[1.8] mb-12"
            style={{ fontSize: "clamp(1rem, 1.2vw, 1.125rem)", color: subTextColor, letterSpacing: "0.02em" }}
          >
            {service.description}
          </p>

          {/* Promise Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-8 rounded-sm overflow-hidden relative group"
            style={{ 
              backgroundColor: cardBg,
              border: `1px solid ${cardBorder}`,
              backdropFilter: "blur(10px)"
            }}
          >
             <div className="absolute top-0 left-0 w-1 h-full" style={{ background: accentColor }} />
            <p
              className="font-[var(--font-cinzel)] italic leading-relaxed relative z-10"
              style={{ fontSize: "1rem", color: subTextColor }}
            >
              "{service.promise}"
            </p>
          </motion.div>
        </motion.div>

        {/* LIST COLUMN (Everything Included) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className={isEven ? "lg:order-2" : "lg:order-1"}
        >
          <div 
            className="p-10 md:p-14 relative overflow-hidden"
            style={{ 
              backgroundColor: cardBg,
              border: `1px solid ${cardBorder}`,
              backdropFilter: "blur(20px)"
            }}
          >
            {/* Ambient Background Glow for List */}
            <div 
              className="absolute -top-1/2 -right-1/2 w-full h-full rounded-full blur-[100px] pointer-events-none"
              style={{ background: theme === "dark" ? "rgba(212,175,55,0.05)" : "rgba(212,175,55,0.1)" }}
            />

            <h3
              className="font-mono tracking-[0.4em] uppercase mb-12 flex items-center gap-4"
              style={{ fontSize: "0.7rem", color: accentColor }}
            >
              <span className="w-8 h-px bg-current" />
              Everything included
            </h3>

            <div className="grid md:grid-cols-2 gap-x-12 gap-y-1">
              {service.everything.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="flex items-center gap-3 py-4 group cursor-default"
                  style={{ borderBottom: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)"}` }}
                >
                  <motion.div
                    className="w-1 h-1 rounded-full flex-shrink-0"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                    style={{ background: accentColor }}
                  />
                  <span
                    className="font-cinzel tracking-[0.05em] transition-all duration-300 group-hover:pl-2"
                    style={{ fontSize: "0.85rem", color: subTextColor }}
                  >
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen bg-[#010101] overflow-x-hidden pt-20">

      {/* Cinematic Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-screen bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.08),transparent_70%)]" />
        <div className="ticker dk !opacity-10" aria-hidden="true" style={{ top: "40%" }}>
          <div className="ticker-t">
            <span>SOVEREIGN ARCHITECTURE · PRECISION ENGINEERING · MONOLITHIC DESIGN ·{"\u00A0"}</span>
            <span>SOVEREIGN ARCHITECTURE · PRECISION ENGINEERING · MONOLITHIC DESIGN ·{"\u00A0"}</span>
          </div>
        </div>
      </div>

      <div className="fixed inset-0 z-[50] pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundRepeat: "repeat" }}
      />

      {/* Hero */}
      <section className="relative w-full min-h-[80vh] flex flex-col items-center justify-center text-center px-6 pt-32 pb-32">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 50%, rgba(212,175,55,0.05) 0%, transparent 70%)" }} />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-[10px] md:text-[12px] font-mono tracking-[0.8em] uppercase mb-10 text-white/40"
          >
            High Yield Digital Infrastructure
          </motion.p>

          <h1
            className="font-[var(--font-cinzel)] font-bold text-white leading-[1.1] mb-12 tracking-tighter"
            style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)", maxWidth: "1200px" }}
          >
            The Full Spectrum of<br />
            <motion.span 
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "none" }}
              transition={{ duration: 2, delay: 1 }}
              style={{ color: "#D4AF37", textShadow: "0 0 50px rgba(212,175,55,0.3)" }}
            >
              Digital Sovereignty
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="font-cinzel text-white leading-loose max-w-2xl mx-auto uppercase tracking-[0.3em] text-[10px] md:text-xs"
          >
            One ecosystem. Every touchpoint perfectly aligned. Built to dominate.
          </motion.p>
        </motion.div>

        {/* Floating Orb Detail */}
        <motion.div 
           animate={{ 
             y: [0, -20, 0],
             opacity: [0.2, 0.5, 0.2]
           }}
           transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
           className="absolute bottom-10 w-[1px] h-24 bg-gradient-to-t from-[#D4AF37] to-transparent opacity-30"
        />
      </section>

      {/* Service sections */}
      <div className="relative z-10">
        {SERVICES.map((service, i) => (
          <ServiceSection key={service.number} service={service} index={i} />
        ))}
      </div>

      {/* Final CTA */}
      <section className="relative z-10 w-full py-48 px-6 flex flex-col items-center text-center bg-[#010101]">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 50%, rgba(212,175,55,0.08) 0%, transparent 60%)" }} />

        <motion.div
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 1.2 }}
           viewport={{ once: true }}
           className="relative z-10"
        >
          <h2
            className="font-[var(--font-cinzel)] font-bold text-white mb-10 leading-tight tracking-[0.05em]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", maxWidth: "900px" }}
          >
            Command Your<br />
            <span style={{ color: "#D4AF37" }}>New Reality.</span>
          </h2>

          <p className="font-mono text-[10px] tracking-[0.5em] uppercase text-white/30 mb-16">Accepting Select Collaborations for Q3/Q4</p>

          <motion.div initial="rest" whileHover="hover" animate="rest">
            <Link
              href="/contact"
              className="relative px-16 py-6 overflow-hidden transition-all duration-500 inline-block"
              style={{ backgroundColor: "#D4AF37" }}
            >
              <motion.div 
                className="absolute inset-0 bg-white"
                variants={{ rest: { x: "-101%" }, hover: { x: 0 } }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
              <span className="relative z-10 font-cinzel font-bold text-[11px] tracking-[0.5em] uppercase text-black">
                Initiate Transmission
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
