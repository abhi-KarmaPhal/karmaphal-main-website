"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const PHILOSOPHY = [
  {
    number: "01",
    sanskrit: "कर्म",
    heading: "कर्मण्येवाधिकारस्ते",
    subheading: "You have the right to work, not the fruits alone.",
    body: "The Bhagavad Gita's most profound teaching isn't about detachment — it's about full presence. Do the work. Do it with everything. The result will follow. This is how we approach every project, every brand, every pixel.",
    theme: "dark" as const,
    annotation: "Law of Causality"
  },
  {
    number: "02",
    sanskrit: "भारत",
    heading: "ROOTED IN BHARAT.",
    subheading: "Built for the sovereign world.",
    body: "India has one of the richest visual and philosophical traditions on earth. Sacred geometry, the divine ratio, mandalas, Sanskrit — these aren't decorations. They are mathematical truths. We bring that depth into modern digital work because the world deserves to see what Indian creativity looks like at its absolute best.",
    theme: "light" as const,
    annotation: "Cultural Sovereignty"
  },
  {
    number: "03",
    sanskrit: "दर्शन",
    heading: "THE PRIVATE TEAM MODEL.",
    subheading: "Not an agency. Not a freelancer. Something better.",
    body: "Agencies have 50 clients. Freelancers disappear. An in-house team knows your voice, your vision, your audience — and is there every day. That's what KarmaPhal is. One dedicated team, working exclusively for the businesses who choose to work with us. Exclusive by design.",
    theme: "dark" as const,
    annotation: "Visionary Partnership"
  },
];

const BELIEFS = [
  "Design is not decoration. It is communication.",
  "Your brand should make people feel something before they read anything.",
  "The best digital work is so natural, it's invisible.",
  "Indian businesses deserve world-class design. Not world-class for India. World-class, full stop.",
  "Speed without quality is noise. Quality without speed is irrelevant.",
  "The work we do for you should make us both proud.",
];

function HeroGeometry() {
  const { scrollY } = useScroll();
  const rotate = useTransform(scrollY, [0, 1000], [0, 45]);
  const scale = useTransform(scrollY, [0, 1000], [1, 1.15]);
  const opacity = useTransform(scrollY, [0, 500], [0.4, 0]);

  return (
    <motion.div
      style={{ rotate, scale, opacity }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
    >
      <svg viewBox="0 0 1000 1000" className="w-[80vh] h-[80vh]">
        <circle cx="500" cy="500" r="480" fill="none" stroke="#D4AF37" strokeWidth="0.8" strokeOpacity="0.5" />
        <circle cx="500" cy="500" r="300" fill="none" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.4" />
        <motion.polygon
          points="500,100 900,800 100,800"
          fill="none"
          stroke="#D4AF37"
          strokeWidth="0.8"
          strokeOpacity="0.6"
          animate={{ strokeDasharray: ["0 100", "100 0"] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <polygon points="500,900 100,200 900,200" fill="none" stroke="#D4AF37" strokeWidth="0.6" strokeOpacity="0.3" />
        {[0, 60, 120, 180, 240, 300].map(a => (
          <ellipse key={a} cx="500" cy="500" rx="120" ry="420" fill="none" stroke="#D4AF37" strokeWidth="0.3" strokeOpacity="0.25" transform={`rotate(${a} 500 500)`} />
        ))}
      </svg>
    </motion.div>
  );
}

function PhilosophyPillar({ block, index }: { block: typeof PHILOSOPHY[0]; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yWatermark = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const opacityWatermark = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.6, 0]);

  const theme = block.theme;
  const isDark = theme === "dark";
  const bgColor = isDark ? "#010101" : "#e6e3dd";
  const textColor = isDark ? "#ffffff" : "#1a1a1a";
  const accentColor = "#D4AF37";
  const subTextColor = isDark ? "rgba(255,255,255,0.7)" : "rgba(26,26,26,0.8)";

  return (
    <section
      ref={ref}
      className="relative w-full py-20 lg:py-50 md:py-30 px-6 overflow-hidden transition-colors duration-1000"
      style={{ backgroundColor: bgColor }}
    >
      <motion.div
        className="absolute pointer-events-none select-none z-0"
        style={{
          y: yWatermark,
          opacity: opacityWatermark,
          top: "20%",
          [index % 2 === 0 ? "right" : "left"]: "5%",
          fontFamily: "var(--font-gotu), serif",
          fontSize: "clamp(15rem, 40vw, 35rem)",
          color: isDark ? "rgba(212,175,55,0.03)" : "rgba(0,0,0,0.04)",
          lineHeight: 1,
          WebkitTextStroke: isDark ? "1px rgba(212,175,55,0.05)" : "1px rgba(0,0,0,0.05)",
        }}
      >
        {block.sanskrit}
      </motion.div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-[auto_1fr] gap-12 md:gap-24">
          {/* Marginalia Annotation */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.3 }}
            className="hidden md:block pt-4"
          >
            <p className="text-[10px] font-mono uppercase tracking-[0.5em] vertical-text" style={{ color: textColor }}>
              {block.annotation}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="pl-8 md:pl-16 border-l-2"
            style={{ borderColor: accentColor }}
          >
            <motion.p
              className="text-[10px] md:text-[11px] font-mono tracking-[0.6em] uppercase mb-10 font-bold"
              style={{ color: accentColor }}
            >
              Origin Pillar // {block.number}
            </motion.p>

            <h3 className="font-[var(--font-cinzel)] font-black mb-8 leading-[1.1] tracking-tight" style={{ fontSize: "clamp(2.2rem, 4.5vw, 4rem)", color: textColor }}>
              {block.heading}
            </h3>

            <p className="font-[var(--font-gotu)] italic mb-12 text-lg md:text-xl" style={{ color: accentColor, opacity: 0.9 }}>
              {block.subheading}
            </p>

            <p className="font-[var(--font-cinzel)] leading-[1.8] max-w-2xl font-medium tracking-wide" style={{ fontSize: "clamp(1rem, 1.2vw, 1.25rem)", color: subTextColor }}>
              {block.body}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function BeliefTablet({ belief, index, className }: { belief: string; index: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -10 }}
      className={`relative group overflow-hidden flex flex-col justify-center ${className}`}
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(24px)",
        padding: "4rem 3rem",
        minHeight: "350px"
      }}
    >
      <motion.div className="absolute inset-0" initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <div className="absolute inset-0 border border-[#D4AF37]/20" />
        <motion.div animate={{ left: ["-100%", "200%"], top: ["-100%", "200%"] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="absolute w-24 h-24 bg-[#D4AF37]/10 blur-[40px]" />
      </motion.div>
      <div className="relative z-10">
        <motion.span animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="font-gotu text-2xl text-[#D4AF37] mb-8 block w-fit">✦</motion.span>
        <p className="font-[var(--font-cinzel)] text-white font-bold leading-[1.6] tracking-[0.05em] text-xl group-hover:text-[#D4AF37] transition-all duration-500">
          {belief}
        </p>
      </div>
      <div className="absolute -bottom-8 -right-8 font-gotu text-[12rem] text-[#D4AF37]/[0.02] pointer-events-none select-none">✦</div>
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-[#010101] overflow-x-hidden">
      <div className="fixed inset-0 z-[1] pointer-events-none opacity-[0.03] noise-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundRepeat: "repeat" }} />

      <section className="relative w-full h-[100dvh] min-h-[600px] flex flex-col items-center justify-center text-center px-6">
        <HeroGeometry />
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.06)_0%,transparent_70%)]" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="text-[10px] md:text-[11px] font-mono tracking-[1em] uppercase mb-12 text-[#D4AF37] font-bold">The Monolith Origin</motion.p>
          <h1 className="font-[var(--font-cinzel)] font-black text-white leading-[1] mb-12 tracking-tighter" style={{ fontSize: "clamp(2.8rem, 8vw, 6rem)" }}>
            BORN FROM <br />
            <motion.span initial={{ opacity: 0, filter: "blur(10px)" }} animate={{ opacity: 1, filter: "none" }} transition={{ duration: 2, delay: 0.8 }} style={{ color: "#D4AF37", textShadow: "0 0 50px rgba(212,175,55,0.3)" }}>KARMA.</motion.span><br />
            BUILT FOR <motion.span initial={{ opacity: 0, filter: "blur(10px)" }} animate={{ opacity: 1, filter: "none" }} transition={{ duration: 2, delay: 1.2 }} className="ml-4" style={{ textShadow: "0 0 40px rgba(255,255,255,0.15)" }}>YOURS.</motion.span>
          </h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 1.5 }} className="h-px w-32 mx-auto mb-12" style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }} />
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ duration: 1, delay: 1.8 }} className="font-cinzel text-white leading-loose max-w-xl mx-auto uppercase tracking-[0.5em] text-[10px] md:text-xs font-bold">
            The name means what it says. Your actions have results. We are the architecture between the two.
          </motion.p>
        </div>
        <motion.div animate={{ y: [0, 20, 0], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 4, repeat: Infinity }} className="absolute bottom-10 w-px h-16 bg-gradient-to-b from-[#D4AF37] to-transparent z-20" />
      </section>

      <div className="relative z-10">
        {PHILOSOPHY.map((block, i) => (
          <PhilosophyPillar key={block.number} block={block} index={i} />
        ))}
      </div>

      {/* OBSIDIAN RIFT DIVIDER */}
      <div className="relative w-full py-12 md:py-24 flex items-center justify-center z-20 pointer-events-none bg-[#010101]">
        <div className="w-full max-w-4xl h-[4px] relative flex flex-col justify-between px-8">
          {/* Top Edge (White/Silver) */}
          <div className="w-full h-px opacity-30" style={{ background: "linear-gradient(90deg, transparent, #ffffff, transparent)" }} />
          
          {/* Glowing Karmic Core (Gold) */}
          <motion.div 
            animate={{ opacity: [0.3, 0.8, 0.3], scaleX: [0.95, 1.05, 0.95] }} 
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-[16px] blur-[16px]" 
            style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)", rotate: "0.01deg" }} 
          />
          
          {/* Bottom Edge (Gold) */}
          <div className="w-full h-px opacity-50" style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }} />
        </div>
      </div>

      <section className="relative z-10 w-full py-20 lg:py-50 md:py-30 px-6 bg-[#010101]">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-20">
          <svg className="w-full h-full" viewBox="0 0 1440 1000">
            <motion.path d="M0,200 L1440,800 M1440,200 L0,800 M720,0 L720,1000 M0,500 L1440,500" stroke="#D4AF37" strokeWidth="1.5" fill="none" animate={{ pathLength: [0, 1, 0], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto text-center mb-32 relative z-10">
          <motion.p initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} className="text-[10px] md:text-[12px] font-mono tracking-[1.5em] uppercase mb-10 text-[#D4AF37] font-bold">The Monolith Credo</motion.p>
          <h2 className="font-[var(--font-cinzel)] font-black text-white text-5xl md:text-8xl tracking-tight leading-[1]">
            What We <span className="italic font-medium text-[#D4AF37]">Believe.</span>
          </h2>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10">
          <BeliefTablet belief={BELIEFS[0]} index={0} className="md:col-span-7" />
          <BeliefTablet belief={BELIEFS[1]} index={1} className="md:col-span-5" />
          <BeliefTablet belief={BELIEFS[2]} index={2} className="md:col-span-4" />
          <BeliefTablet belief={BELIEFS[3]} index={3} className="md:col-span-8" />
          <BeliefTablet belief={BELIEFS[4]} index={4} className="md:col-span-6" />
          <BeliefTablet belief={BELIEFS[5]} index={5} className="md:col-span-6" />
        </div>
      </section>

      <section className="relative z-10 w-full py-20 lg:py-50 md:py-30 px-6 flex flex-col items-center text-center bg-[#010101]">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 50%, rgba(212,175,55,0.08) 0%, transparent 60%)" }} />
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} viewport={{ once: true }} className="relative z-10">
          <p className="text-[10px] md:text-[12px] font-mono tracking-[1.2em] uppercase mb-12 text-[#D4AF37] font-bold">Initiate Resonance</p>
          <h2 className="font-[var(--font-cinzel)] font-black text-white mb-16 leading-[1.1] tracking-[0.02em]" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", maxWidth: "1000px" }}>
            IF THIS VISION RESONATES WITH YOU,<br /><span className="italic font-medium text-[#D4AF37]">Let's Build Something Extraordinary.</span>
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <motion.div initial="rest" whileHover="hover" animate="rest">
              <Link href="/contact" className="relative px-16 py-6 overflow-hidden transition-all duration-500 inline-block" style={{ backgroundColor: "#D4AF37" }}>
                <motion.div className="absolute inset-0 bg-white" variants={{ rest: { x: "-101%" }, hover: { x: 0 } }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} />
                <span className="relative z-10 font-cinzel font-black text-[11px] tracking-[0.5em] uppercase text-black">Work With Us</span>
              </Link>
            </motion.div>
            <Link href="/services" className="group relative px-16 py-6 bg-transparent border border-white/20 hover:border-[#D4AF37]/50 transition-all duration-500">
              <span className="font-cinzel font-black text-[11px] tracking-[0.5em] uppercase text-white/50 group-hover:text-[#D4AF37] transition-colors duration-500">View Services</span>
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
