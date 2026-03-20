"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const noop = () => { };

/* ═══════════════════════════════════════════
   SERVICE DATA
═══════════════════════════════════════════ */
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
    glowColor: "rgba(212,175,55,0.06)",
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
    glowColor: "rgba(180,190,210,0.06)",
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
    glowColor: "rgba(212,170,130,0.06)",
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
    glowColor: "rgba(100,200,180,0.06)",
  },
];

/* ═══════════════════════════════════════════
   HERO GEOMETRY
═══════════════════════════════════════════ */
function ServicesGeometry() {
  const { scrollY } = useScroll();
  const rotate1 = useTransform(scrollY, [0, 1000], [0, 45]);
  const rotate2 = useTransform(scrollY, [0, 1000], [45, 0]);
  const scale = useTransform(scrollY, [0, 1000], [1, 1.15]);
  const opacity = useTransform(scrollY, [0, 800], [0.8, 0]);

  return (
    <motion.div
      style={{ scale, opacity }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
    >
      <svg viewBox="0 0 1000 1000" className="w-[80vh] h-[80vh] max-w-full opacity-80">
        <line x1="500" y1="0" x2="500" y2="1000" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.3" />
        <line x1="0" y1="500" x2="1000" y2="500" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.3" />
        <motion.g style={{ rotate: rotate1, transformOrigin: "500px 500px" }}>
          <rect x="150" y="150" width="700" height="700" fill="none" stroke="#D4AF37" strokeWidth="0.8" strokeOpacity="0.4" />
        </motion.g>
        <rect x="250" y="250" width="500" height="500" fill="none" stroke="#D4AF37" strokeWidth="0.3" strokeOpacity="0.2" />
        <rect x="350" y="350" width="300" height="300" fill="none" stroke="#D4AF37" strokeWidth="0.3" strokeOpacity="0.2" />
        <motion.g style={{ rotate: rotate2, transformOrigin: "500px 500px" }}>
          <rect x="150" y="150" width="700" height="700" fill="none" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.5" />
        </motion.g>
        <circle cx="150" cy="150" r="3" fill="#D4AF37" fillOpacity="0.6" />
        <circle cx="850" cy="150" r="3" fill="#D4AF37" fillOpacity="0.6" />
        <circle cx="150" cy="850" r="3" fill="#D4AF37" fillOpacity="0.6" />
        <circle cx="850" cy="850" r="3" fill="#D4AF37" fillOpacity="0.6" />
        <circle cx="500" cy="500" r="5" fill="#D4AF37" fillOpacity="0.8" />
        <circle cx="500" cy="500" r="100" fill="none" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.5" />
        <circle cx="500" cy="500" r="450" fill="none" stroke="#D4AF37" strokeWidth="0.3" strokeOpacity="0.2" strokeDasharray="4 8" />
      </svg>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   PER-SERVICE SVG SIGNATURES (decorative)
═══════════════════════════════════════════ */
function ServiceSignature({ index, theme }: { index: number; theme: "dark" | "light" }) {
  const strokeColor = theme === "dark" ? "#D4AF37" : "rgba(140,110,40,0.35)";
  const signatures = [
    // 01 Brand: Compass rose / radial lines
    <svg key="sig-0" viewBox="0 0 400 400" className="w-full h-full">
      {[0, 30, 60, 90, 120, 150].map(a => (
        <line key={a} x1="200" y1="200" x2={200 + 180 * Math.cos(a * Math.PI / 180)} y2={200 + 180 * Math.sin(a * Math.PI / 180)} stroke={strokeColor} strokeWidth="0.5" />
      ))}
      <circle cx="200" cy="200" r="120" fill="none" stroke={strokeColor} strokeWidth="0.5" />
      <circle cx="200" cy="200" r="60" fill="none" stroke={strokeColor} strokeWidth="0.3" strokeDasharray="3 6" />
      <circle cx="200" cy="200" r="4" fill={strokeColor} opacity="0.5" />
    </svg>,
    // 02 Web: Circuit grid / matrix
    <svg key="sig-1" viewBox="0 0 400 400" className="w-full h-full">
      {[80, 160, 240, 320].map(x => (
        <line key={`v${x}`} x1={x} y1="40" x2={x} y2="360" stroke={strokeColor} strokeWidth="0.3" />
      ))}
      {[80, 160, 240, 320].map(y => (
        <line key={`h${y}`} x1="40" y1={y} x2="360" y2={y} stroke={strokeColor} strokeWidth="0.3" />
      ))}
      {[80, 160, 240, 320].flatMap(x => [80, 160, 240, 320].map(y => (
        <circle key={`n${x}${y}`} cx={x} cy={y} r="2.5" fill={strokeColor} opacity="0.4" />
      )))}
    </svg>,
    // 03 Content: Golden spiral approximation
    <svg key="sig-2" viewBox="0 0 400 400" className="w-full h-full">
      <circle cx="200" cy="200" r="150" fill="none" stroke={strokeColor} strokeWidth="0.4" strokeDasharray="6 4" />
      <circle cx="200" cy="200" r="100" fill="none" stroke={strokeColor} strokeWidth="0.3" />
      <circle cx="200" cy="200" r="55" fill="none" stroke={strokeColor} strokeWidth="0.3" strokeDasharray="4 6" />
      <circle cx="200" cy="200" r="30" fill="none" stroke={strokeColor} strokeWidth="0.3" />
      <circle cx="200" cy="200" r="15" fill="none" stroke={strokeColor} strokeWidth="0.3" />
      <path d="M200,50 Q350,200 200,350 Q50,200 200,50" fill="none" stroke={strokeColor} strokeWidth="0.5" />
    </svg>,
    // 04 AI: Abstract circuit / neural
    <svg key="sig-3" viewBox="0 0 400 400" className="w-full h-full">
      <polygon points="200,60 340,140 340,280 200,360 60,280 60,140" fill="none" stroke={strokeColor} strokeWidth="0.5" />
      <polygon points="200,100 300,160 300,260 200,320 100,260 100,160" fill="none" stroke={strokeColor} strokeWidth="0.3" strokeDasharray="4 4" />
      {[[200, 60], [340, 140], [340, 280], [200, 360], [60, 280], [60, 140]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill={strokeColor} opacity="0.5" />
      ))}
      <circle cx="200" cy="200" r="5" fill={strokeColor} opacity="0.6" />
      {[[200, 60], [340, 140], [340, 280], [200, 360], [60, 280], [60, 140]].map(([x, y], i) => (
        <line key={`l${i}`} x1="200" y1="200" x2={x} y2={y} stroke={strokeColor} strokeWidth="0.3" strokeDasharray="2 4" />
      ))}
    </svg>,
  ];
  return (
    <div
      className="absolute pointer-events-none z-0 opacity-[0.35]"
      style={{
        width: "clamp(250px, 35vw, 450px)",
        height: "clamp(250px, 35vw, 450px)",
        right: index % 2 === 0 ? "5%" : "auto",
        left: index % 2 !== 0 ? "5%" : "auto",
        top: "50%",
        transform: "translateY(-50%)",
      }}
    >
      {signatures[index]}
    </div>
  );
}

/* ═══════════════════════════════════════════
   GOLD SEPARATOR
═══════════════════════════════════════════ */
function GoldSeparator() {
  return (
    <div
      className="w-full h-px"
      style={{
        background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.4) 25%, rgba(212,175,55,0.6) 50%, rgba(212,175,55,0.4) 75%, transparent)",
      }}
    />
  );
}

/* ═══════════════════════════════════════════
   SERVICE SECTION
═══════════════════════════════════════════ */
function ServiceSection({ service, index }: { service: typeof SERVICES[0]; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yWatermark = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacityWatermark = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  const isEven = index % 2 === 0;
  const theme = isEven ? "dark" : "light";

  const bgColor = theme === "dark" ? "#010101" : "#e6e3dd";
  const textColor = theme === "dark" ? "#ffffff" : "#111111";
  const subTextColor = theme === "dark" ? "rgba(255, 255, 255, 0.85)" : "rgba(17, 17, 17, 0.85)";
  const accentColor = theme === "dark" ? "#D4AF37" : "#8A6D1E";
  const cardBg = theme === "dark" ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)";
  const cardBorder = theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)";
  const cardHoverBg = theme === "dark" ? "rgba(212,175,55,0.06)" : "rgba(212,175,55,0.12)";
  const gridColor = theme === "dark" ? "rgba(212,175,55,0.15)" : "rgba(0,0,0,0.06)";

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >
      {/* Depth: Faint grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          opacity: 0.4,
          maskImage: "radial-gradient(ellipse 70% 70% at center, black 20%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 70% at center, black 20%, transparent 80%)",
        }}
      />

      {/* Depth: Ambient glow unique to each service */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 50% at ${isEven ? "70%" : "30%"} 50%, ${service.glowColor}, transparent 70%)`,
        }}
      />

      {/* Decorative SVG signature */}
      <ServiceSignature index={index} theme={theme} />

      {/* Large number watermark */}
      <motion.div
        className="absolute pointer-events-none select-none z-0"
        style={{
          y: yWatermark,
          opacity: opacityWatermark,
          top: "10%",
          [isEven ? "right" : "left"]: "-5%",
          fontFamily: "var(--font-cinzel), serif",
          fontSize: "clamp(12rem, 30vw, 25rem)",
          fontWeight: "900",
          color: theme === "dark" ? "rgba(212,175,55,0.04)" : "rgba(0,0,0,0.04)",
          lineHeight: 1,
          WebkitTextStroke: theme === "dark" ? "1px rgba(212,175,55,0.1)" : "1px rgba(0,0,0,0.08)",
          WebkitTextFillColor: theme === "dark" ? "rgba(212,175,55,0.04)" : "rgba(0,0,0,0.04)",
        }}
      >
        {service.number}
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 md:py-48 grid lg:grid-cols-2 gap-16 md:gap-24 items-start">

        {/* ── INFO COLUMN ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className={isEven ? "lg:order-1" : "lg:order-2"}
        >
          {/* Protocol Label */}
          <div className="flex items-center gap-6 mb-10">
            <div className="h-px w-12" style={{ background: accentColor }} />
            <span
              className="font-mono text-[10px] tracking-[0.5em] uppercase"
              style={{ color: accentColor }}
            >
              Protocol {service.number}
            </span>
          </div>

          {/* Title */}
          <h2
            className="font-[var(--font-cinzel)] font-bold mb-6 leading-[1.05] tracking-tight"
            style={{
              fontSize: "clamp(2.8rem, 5.5vw, 5rem)",
              color: textColor,
              textShadow: theme === "dark" ? "0 0 60px rgba(255,255,255,0.08)" : "none"
            }}
          >
            {service.title}
          </h2>

          {/* Devanagari accent */}
          <div className="flex items-center gap-4 mb-8">
            <span
              style={{
                fontFamily: "var(--font-gotu), serif",
                fontSize: "2.8rem",
                color: accentColor,
                opacity: theme === "dark" ? 0.5 : 0.7,
                lineHeight: 1,
              }}
            >
              {service.devanagari}
            </span>
            <div className="h-px flex-grow" style={{ background: theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" }} />
          </div>

          {/* Tagline */}
          <p
            className="font-[var(--font-cinzel)] italic mb-8"
            style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.2rem)", color: accentColor, letterSpacing: "0.08em" }}
          >
            {service.tagline}
          </p>

          {/* Description */}
          <p
            className="font-cinzel leading-[1.85] mb-12"
            style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)", color: subTextColor, letterSpacing: "0.02em" }}
          >
            {service.description}
          </p>

          {/* Promise — Editorial Pull-Quote */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative mt-8 pl-8"
          >
            <div className="absolute top-0 left-0 w-[2px] h-full" style={{ background: `linear-gradient(180deg, ${accentColor}, transparent)` }} />
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-[9px] tracking-[0.4em] uppercase" style={{ color: accentColor }}>
                The Monolith Guarantee
              </span>
              <div className="h-px w-8" style={{ background: theme === "dark" ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.2)" }} />
            </div>
            <p
              className="font-[var(--font-cinzel)] italic leading-relaxed"
              style={{ fontSize: "clamp(1.05rem, 1.5vw, 1.25rem)", color: textColor }}
            >
              &ldquo;{service.promise}&rdquo;
            </p>
          </motion.div>
        </motion.div>

        {/* ── CAPABILITIES COLUMN (Cards Grid) ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className={isEven ? "lg:order-2" : "lg:order-1"}
        >
          <div className="mb-8 flex items-center gap-4">
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase" style={{ color: accentColor }}>
              Capabilities
            </span>
            <div className="h-px flex-grow" style={{ background: theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" }} />
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {service.everything.map((item, i) => {
              const paddedIndex = (i + 1).toString().padStart(2, "0");
              return (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.04 }}
                  whileHover={{ y: -3, transition: { duration: 0.3 } }}
                  className="group relative overflow-hidden cursor-default"
                  style={{
                    padding: "clamp(0.8rem, 1.5vw, 1.2rem)",
                    border: `1px solid ${cardBorder}`,
                    background: cardBg,
                    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = theme === "dark" ? "rgba(212,175,55,0.3)" : "rgba(140,110,40,0.3)";
                    e.currentTarget.style.background = cardHoverBg;
                    e.currentTarget.style.boxShadow = theme === "dark"
                      ? "0 8px 25px rgba(0,0,0,0.4), 0 0 15px rgba(212,175,55,0.05)"
                      : "0 8px 25px rgba(0,0,0,0.08), 0 0 15px rgba(212,175,55,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = cardBorder;
                    e.currentTarget.style.background = cardBg;
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {/* Gold left accent bar on hover */}
                  <div
                    className="absolute left-0 top-0 w-[2px] h-0 group-hover:h-full transition-all duration-500"
                    style={{ background: accentColor }}
                  />

                  {/* Index badge */}
                  <span
                    className="font-mono text-[9px] tracking-widest block mb-2"
                    style={{ color: accentColor, opacity: 0.6 }}
                  >
                    {paddedIndex}
                  </span>

                  {/* Capability name */}
                  <span
                    className="font-cinzel tracking-[0.04em] block leading-[1.4] group-hover:translate-x-1 transition-transform duration-300"
                    style={{
                      fontSize: "clamp(0.78rem, 1vw, 0.9rem)",
                      color: subTextColor,
                    }}
                  >
                    {item}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* CTA link */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] uppercase transition-all duration-400 hover:gap-5"
              style={{ color: accentColor }}
            >
              Start This Protocol
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════ */
export default function ServicesPage() {
  return (
    <main className="relative min-h-screen bg-[#010101] overflow-x-hidden">

      {/* Fixed noise texture */}
      <div className="fixed inset-0 z-[50] pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundRepeat: "repeat" }}
      />

      {/* ── HERO ── */}
      <section className="relative w-full h-[100dvh] min-h-[600px] flex flex-col items-center justify-center text-center px-6">
        <ServicesGeometry />
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
            className="font-[var(--font-cinzel)] font-bold text-white leading-[1.1] mb-8 tracking-tighter"
            style={{ fontSize: "clamp(2.8rem, 8vw, 6rem)", maxWidth: "1000px" }}
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

          {/* Gold hairline */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-32 md:w-48 h-px mx-auto mb-8"
            style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }}
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 1, delay: 1.8 }}
            className="font-cinzel text-white leading-loose max-w-2xl mx-auto uppercase tracking-[0.3em] text-[10px] md:text-xs"
          >
            One ecosystem. Every touchpoint perfectly aligned. Built to dominate.
          </motion.p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 20, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 md:bottom-24 w-[2px] h-20 bg-gradient-to-b from-[#D4AF37] to-transparent z-20 shadow-[0_0_10px_rgba(212,175,55,0.4)]"
        />
      </section>

      {/* ── SERVICE CHAPTERS ── */}
      <div className="relative z-10">
        {SERVICES.map((service, i) => (
          <div key={service.number}>
            <GoldSeparator />
            <ServiceSection service={service} index={i} />
          </div>
        ))}
        <GoldSeparator />
      </div>

      {/* ── FINAL CTA ── */}
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
