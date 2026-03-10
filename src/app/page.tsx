"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import SacredGeometry from "../components/SacredGeometry";
import ServiceTeaser from "../components/ServiceTeaser";
import MagneticButton from "../components/MagneticButton";
import AmbientSanskrit from "../components/AmbientSanskrit";
import DivineEmbers from "../components/DivineEmbers";
import AmbientParticles from "../components/AmbientParticles";
import { useScrollAnimations } from "../hooks/useScrollAnimations";
import "./v12-sections.css";

// No-op handler: forces Framer Motion JS engine instead of WAAPI (Safari iOS blink fix)
const noop = () => { };

const SmoothScroll = dynamic(() => import("../components/SmoothScroll"), { ssr: false });
const Preloader = dynamic(() => import("../components/Preloader"), { ssr: false });

/* ── MOBILE DETECTION ── */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isMobile;
}

const HERO_BASE_DELAY = 0; // additional offset after reveal fires

/* ── COUNTDOWN (client-only) ── */
function useCountdown(targetMs: number) {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    setMounted(true);
    const tick = () => {
      const diff = targetMs - Date.now();
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [targetMs]);
  return { timeLeft, mounted };
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="text-2xl sm:text-3xl md:text-6xl font-[var(--font-cinzel)] font-bold tabular-nums min-w-[50px] sm:min-w-[55px] md:min-w-[100px] text-center text-white px-2 sm:px-3 md:px-5 py-2 md:py-4 border border-white/10 rounded-sm"
        style={{
          background: "rgba(255,255,255,0.02)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 0 30px rgba(0,0,0,0.5), inset 0 0 20px rgba(212,175,55,0.03)",
        }}
      >
        {String(value).padStart(2, "0")}
      </div>
      <span className="text-[9px] md:text-[11px] font-[var(--font-mono)] text-[#D4AF37] tracking-[0.3em] uppercase mt-3">
        {label}
      </span>
    </div>
  );
}

const SERVICES_DATA = [
  {
    num: "01",
    name: "Brand Identity",
    meshClass: "mesh-1",
    desc: "The soul of your business, built to last decades. From your first mark to your complete visual language — crafted with intention.",
    btnText: "Build Your Brand",
    list: ["Logo & Visual Systems", "Strategy & Positioning", "Packaging & Labels", "Icons, Decks, Banners"]
  },
  {
    num: "02",
    name: "Websites & Apps",
    meshClass: "mesh-2",
    desc: "Your hardest-working, most honest salesperson. Designed for beauty, engineered for performance, built to convert.",
    btnText: "Start Web Project",
    list: ["Web Design & Development", "Mobile Apps", "E-Commerce", "SaaS & Web Apps"]
  },
  {
    num: "03",
    name: "Creative Content",
    meshClass: "mesh-3",
    desc: "Every post, every day, perfectly and unmistakably on brand. Content that builds equity with every single impression.",
    btnText: "Plan Content",
    list: ["Social Media Content", "Ads & Campaigns", "Motion & Video", "Copywriting"]
  },
  {
    num: "04",
    name: "AI & Systems",
    meshClass: "mesh-4",
    desc: "The future, built directly into your business today. Automation and intelligence that compound your competitive advantage daily.",
    btnText: "Automate Now",
    list: ["AI Tools", "Automation Systems", "Dashboards", "Custom GPTs"]
  }
];

/* ── MAIN ── */
export default function MonolithHero() {
  const { timeLeft: countdown, mounted } = useCountdown(new Date("2026-03-09T05:55:00+05:30").getTime());
  const [email, setEmail] = useState("");
  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "duplicate" | "error">("idle");
  const [formMessage, setFormMessage] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const isMobile = useIsMobile();
  const heroRef = useRef<HTMLDivElement>(null);

  // On mobile, skip the feTurbulence SVG filter — it forces CPU rasterization on
  // Safari which causes a full-page repaint blink every time any animation ends.
  const goldFilter = isMobile
    ? "drop-shadow(0 0 60px rgba(212, 175, 55, 0.3))"
    : "url(#brushedGold) drop-shadow(0 0 60px rgba(212, 175, 55, 0.3))";

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const logoScale = useTransform(scrollYProgress, [0, 1], [1, 0.6]);
  const logoOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || formState === "loading") return;

    setFormState("loading");
    try {
      // Client-side Honeypot Check (catches simple bots immediately)
      const form = e.target as HTMLFormElement;
      const honeypotInput = form.querySelector('input[name="website"]') as HTMLInputElement;
      if (honeypotInput && honeypotInput.value) {
        setFormState("success");
        setFormMessage("You're on the list!");
        setEmail("");
        return;
      }

      // Hit the standard API Route instead of a Server Action
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "coming-soon", ip_address: "" }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        if (result.type === "duplicate") {
          setFormState("duplicate");
          setFormMessage(result.message);
        } else {
          setFormState("success");
          setFormMessage(result.message || "You're on the list!");
          setEmail("");
        }
      } else {
        setFormState("error");
        setFormMessage(result.message);
        // Reset error after 4 seconds
        setTimeout(() => setFormState("idle"), 4000);
      }
    } catch {
      setFormState("error");
      setFormMessage("Something went wrong. Please try again.");
      setTimeout(() => setFormState("idle"), 4000);
    }
  };

  const handleReveal = useCallback(() => setRevealed(true), []);

  // GSAP ScrollTrigger animations for all V12 sections
  useScrollAnimations();

  // Custom cursor + nav behavior
  useEffect(() => {
    // Skip cursor on touch devices
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch) return;

    const cd = document.getElementById("cd");
    const cr = document.getElementById("cr");
    let mx = window.innerWidth / 2, my = window.innerHeight / 2, rx = mx, ry = my;

    const moveCursor = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (cd) { cd.style.left = mx + "px"; cd.style.top = my + "px"; }
    };
    document.addEventListener("mousemove", moveCursor);

    let rafId: number;
    const animateCursor = () => {
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      if (cr) { cr.style.left = rx + "px"; cr.style.top = ry + "px"; }
      rafId = requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Hover class
    const addHover = () => document.body.classList.add("hov");
    const removeHover = () => document.body.classList.remove("hov");
    document.querySelectorAll("a, button, .sc, .mc, .tp, .tcard, .sr, .btn-g, .btn-blk, .btn-wh, .btn-ghost").forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    // Cursor label morphing
    document.querySelectorAll(".tcard").forEach((el) => {
      el.addEventListener("mouseenter", () => document.body.classList.add("cursor-view"));
      el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-view"));
    });
    document.querySelectorAll(".sr").forEach((el) => {
      el.addEventListener("mouseenter", () => document.body.classList.add("cursor-explore"));
      el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-explore"));
    });

    // Nav behavior
    const nav = document.getElementById("nav");
    const LIGHT_SECS = ["manifesto", "services", "testimonials", "cta"];
    const secObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting || window.scrollY < 60) return;
        if (nav) nav.className = LIGHT_SECS.includes(e.target.id) ? "scrolled-light" : "scrolled-dark";
        document.body.classList.toggle("lit-cur", LIGHT_SECS.includes(e.target.id));
      });
    }, { threshold: 0.4 });
    document.querySelectorAll("section[id]").forEach((s) => secObs.observe(s));

    const handleScrollNav = () => {
      if (window.scrollY < 60) {
        if (nav) nav.className = "";
        document.body.classList.remove("lit-cur");
      }
    };
    window.addEventListener("scroll", handleScrollNav, { passive: true });

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScrollNav);
      secObs.disconnect();
    };
  }, []);


  // Delay offsets for hero entrance (only animate after preloader reveal)
  const d = (t: number) => revealed ? HERO_BASE_DELAY + t : 999;

  return (
    <>
      <Preloader onReveal={handleReveal} />
      <SmoothScroll />
      <DivineEmbers revealed={revealed} />

      {/* GRAIN TEXTURE OVERLAY (entire page) */}
      <div
        className="fixed inset-0 z-[50] pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* ═══════════════════════════════════════════
          SECTION 1: CINEMATIC HERO — FULL VIEWPORT
      ═══════════════════════════════════════════ */}
      <section ref={heroRef} className="relative h-[100dvh] w-full overflow-hidden bg-obsidian">

        {/* OPTICAL CENTERING WRAPPER (Shifts content up on tall mobile screens) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center -translate-y-[6vh] md:translate-y-0">

          {/* SACRED GEOMETRY — only mount after preloader exits, freeing iOS GPU during loading */}
          {revealed && <SacredGeometry />}
          {revealed && <AmbientSanskrit />}

          {/* AMBIENT BREATHING GLOW */}
          <motion.div
            className="absolute z-[1] pointer-events-none w-[80vw] h-[80vw] md:w-[900px] md:h-[900px]"
            animate={{ opacity: [0.08, 0.15, 0.08], scale: [1, 1.08, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            onUpdate={noop}
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -55%)",
              background: "radial-gradient(circle, rgba(212,175,55,0.2) 0%, rgba(212,175,55,0.05) 40%, transparent 65%)",
              filter: "blur(80px)",
            }}
          />

          {/* ── CINEMATIC SEQUENCE ── */}
          <motion.div
            className="relative z-10 flex flex-col items-center px-6"
            style={{ scale: logoScale, opacity: logoOpacity, y: contentY, willChange: "transform, opacity" }}
          >
            {/* STEP 1: GOLDEN LINE */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={revealed ? { scaleX: 1, opacity: 1 } : {}}
              transition={{ duration: 1.5, delay: d(0.5), ease: [0.16, 1, 0.3, 1] }}
              onUpdate={noop}
              className="w-32 md:w-64 h-[1px] mb-10"
              style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }}
            />

            {/* STEP 2: THE LOGO — CSS RENDERED WITH BRUSHED GOLD */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
              animate={revealed ? { opacity: 1, scale: 1, filter: "none" } : {}}
              transition={{ duration: 2, delay: d(0.8), ease: "easeOut" }}

              className="flex flex-col items-center overflow-visible"
              style={{ WebkitBackfaceVisibility: "hidden", backfaceVisibility: "hidden", WebkitTransform: "translateZ(0)", willChange: "transform, filter, opacity" }}
            >
              {/* SVG FILTER FOR BRUSHED METAL TEXTURE */}
              <svg style={{ position: "absolute", width: 0, height: 0 }}>
                <filter id="brushedGold">
                  <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch" />
                  <feColorMatrix type="saturate" values="0" />
                  <feComponentTransfer>
                    <feFuncR type="linear" slope="1.5" intercept="-0.3" />
                    <feFuncG type="linear" slope="1.5" intercept="-0.3" />
                    <feFuncB type="linear" slope="1.5" intercept="-0.3" />
                  </feComponentTransfer>
                  <feComposite operator="in" in2="SourceGraphic" />
                  <feBlend mode="multiply" in2="SourceGraphic" />
                </filter>
              </svg>

              {/* WORDMARK */}
              <div className="flex items-baseline gap-[clamp(0.5rem,2vw,1.25rem)] overflow-visible">
                <h1
                  className="text-[clamp(3.5rem,12vw,12rem)] leading-none overflow-visible"
                  style={{
                    background: "linear-gradient(180deg, #FFF 0%, #F9E2AF 25%, #D4AF37 55%, #8A6D3B 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    filter: goldFilter,
                    paddingTop: "0.4em",
                    marginTop: "-0.2em",
                    fontFamily: "var(--font-gotu), serif"
                  }}
                >
                  कर्म
                </h1>
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={revealed ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: d(1.5), ease: "easeOut" }}
                  onUpdate={noop}
                  className="rounded-full bg-white flex-shrink-0"
                  style={{
                    width: "clamp(0.5rem, 1.25vw, 0.75rem)",
                    height: "clamp(0.5rem, 1.25vw, 0.75rem)",
                    marginBottom: "clamp(0.6rem, 2.5vw, 2rem)",
                    boxShadow: "0 0 20px #D4AF37, 0 0 60px #D4AF37"
                  }}
                />
                <h2
                  className="text-[clamp(2.5rem,9.5vw,10rem)] tracking-[clamp(0.05em,0.2vw,0.15em)] font-[var(--font-cinzel)] font-black uppercase leading-none"
                  style={{
                    background: "linear-gradient(180deg, #FFF 0%, #F9E2AF 25%, #D4AF37 55%, #8A6D3B 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    filter: goldFilter,
                  }}
                >
                  Phal
                </h2>
              </div>
            </motion.div>

            {/* STEP 3: TAGLINE — LETTER BY LETTER REVEAL */}
            <motion.p
              initial="hidden"
              animate={revealed ? "visible" : "hidden"}
              className="text-[clamp(0.6rem,1.6vw,1.125rem)] tracking-[clamp(0.1em,0.6vw,0.6em)] font-[var(--font-cinzel)] text-[#D4AF37] uppercase mt-[clamp(1rem,3vw,1.5rem)] flex justify-center"
              style={{ textShadow: "0 0 40px rgba(212,175,55,0.4)", width: "max-content", maxWidth: "100%" }}
            >
              {"Architecture of the Infinite".split("").map((char, i) => (
                <motion.span
                  key={`hero-tagline-char-${i}`}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.4, delay: d(1.8 + i * 0.04), ease: "easeOut" }}
                  onUpdate={noop}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.p>

            {/* STEP 4: SERVICES */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={revealed ? { opacity: 0.9 } : {}}
              transition={{ duration: 1, delay: d(3) }}
              onUpdate={noop}
              className="text-[clamp(0.5rem,1.2vw,0.875rem)] tracking-[clamp(0.05em,0.3vw,0.3em)] font-[var(--font-cinzel)] text-[#C0C0C0] uppercase mt-4 text-center whitespace-nowrap"
            >
              Brands · Websites · Apps · AI · Decentralized Systems
            </motion.p>
          </motion.div>

        </div> {/* END OPTICAL CENTERING WRAPPER */}

        {/* SCROLL INDICATOR */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={revealed ? { opacity: 1 } : {}}
          transition={{ delay: d(4), duration: 1 }}
          onUpdate={noop}
          className="absolute bottom-10 z-20 flex flex-col items-center gap-2 left-1/2 -translate-x-1/2"
        >
          <span className="text-[10px] md:text-xs font-[var(--font-mono)] text-[#D4AF37] tracking-[0.4em] uppercase" style={{ textShadow: "0 0 10px rgba(212,175,55,0.4)" }}>Scroll</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            onUpdate={noop}
            className="w-[1px] h-10 bg-gradient-to-b from-[#D4AF37] to-transparent"
            style={{ boxShadow: "0 0 6px rgba(212,175,55,0.3)" }}
          />
        </motion.div>
      </section >

      <div id="cd"></div><div id="cr"></div><div id="noise"></div>
      <div className="sdiv"></div>
      <div className="ticker dk" aria-hidden="true"><div className="ticker-t"><span>PRIVATE DIGITAL STUDIO · BRANDS · WEBSITES · APPS · AI · कर्म ही धर्म है ·{"\u00A0"}</span><span>PRIVATE DIGITAL STUDIO · BRANDS · WEBSITES · APPS · AI · कर्म ही धर्म है ·{"\u00A0"}</span><span>PRIVATE DIGITAL STUDIO · BRANDS · WEBSITES · APPS · AI · कर्म ही धर्म है ·{"\u00A0"}</span><span>PRIVATE DIGITAL STUDIO · BRANDS · WEBSITES · APPS · AI · कर्म ही धर्म है ·{"\u00A0"}</span></div></div>

      {/*  ══ MANIFESTO ════════════════════════════════════════  */}
      <section id="manifesto">
        <div className="mf-flash" aria-hidden="true"></div>
        <div className="mf-spotlight" aria-hidden="true"></div>

        <div className="mf-pin">
          <div className="mf-pg" aria-hidden="true">001</div>
          <div className="mf-ghost" aria-hidden="true">फल</div>
          <div className="mf-progress"></div>

          <div className="mf-eyebrow">
            <span className="mf-ey-line"></span>
            <span className="mf-ey-txt">§ 001 — The Vision</span>
            <span className="mf-ey-dot"></span>
          </div>

          <p className="mf-intro">Most businesses are brilliant at what they do. Everything else — the brand, the website, the content, the systems — is where great companies quietly lose ground.</p>

          {/* Masking container for the dramatic reveal */}
          <div className="mf-statement-mask">
            <div className="mf-statement">
              <span className="mf-line">
                <span className="mf-word w-sm">EVERYTHING</span>
              </span>
              <span className="mf-line">
                <span className="mf-word w-lg gold">ELSE?</span>
              </span>
              <span className="mf-line">
                <span className="mf-word w-sm">THAT&apos;S</span>
                <span className="mf-word w-sm gold">US.</span>
              </span>
            </div>
          </div>
          <div className="mf-underline"></div>

          <div className="mf-bottom">
            <div className="mf-bottom-left">
              <p className="mf-body-text">We are your private in-house digital team — handling every logo, website, banner, pitch deck, app, and AI system. So you can do what you were born to do. Without distraction. Without compromise.</p>
              <a href="/about" className="mf-link">Our Philosophy →</a>
            </div>
            <div className="mf-bottom-right">
              <span className="mf-quote-deva">कर्म ही धर्म है</span>
              <span className="mf-quote-en">The fruit of great karma is extraordinary output. We exist to make your brand&apos;s actions produce results worthy of the name you&apos;ve built.</span>
            </div>
          </div>
        </div>
      </section>

      <div className="sdiv"></div>
      <div className="ticker lt" aria-hidden="true"><div className="ticker-t"><span>ONE TEAM · EVERY DISCIPLINE · ALWAYS ON · ALWAYS YOURS · कर्म ही धर्म है ·{"\u00A0"}</span><span>ONE TEAM · EVERY DISCIPLINE · ALWAYS ON · ALWAYS YOURS · कर्म ही धर्म है ·{"\u00A0"}</span><span>ONE TEAM · EVERY DISCIPLINE · ALWAYS ON · ALWAYS YOURS · कर्म ही धर्म है ·{"\u00A0"}</span><span>ONE TEAM · EVERY DISCIPLINE · ALWAYS ON · ALWAYS YOURS · कर्म ही धर्म है ·{"\u00A0"}</span></div></div>

      {/*  ══ METRICS ══════════════════════════════════════════  */}
      <section id="metrics">
        <AmbientParticles />
        <div className="met-container">
          <div className="met-hdr">
            <div>
              <div className="met-tag">§ 002 — Why It Works</div>
              <h2 className="met-title">Numbers that speak<br /><em>without apology.</em></h2>
            </div>
            <p className="met-note">Every number here is a promise — not a pitch.</p>
          </div>

          <div className="met-ledger">
            {/* Cell 1 */}
            <div className="met-cell">
              <span className="met-cell-deva" aria-hidden="true">एकता</span>
              <div className="met-cell-top">
                <span className="met-cell-num" data-target="100" data-suffix="%">0</span>
              </div>
              <div className="met-cell-bot">
                <div className="met-cell-label">In-House. Always.</div>
                <div className="met-cell-desc">Not outsourced. Not freelancers. Your permanent team — embedded in your brand.</div>
              </div>
            </div>
            {/* Cell 2 */}
            <div className="met-cell">
              <span className="met-cell-deva" aria-hidden="true">निरंतर</span>
              <div className="met-cell-top">
                <span className="met-cell-num" data-target="24" data-suffix="/7">0</span>
              </div>
              <div className="met-cell-bot">
                <div className="met-cell-label">No Office Hours.</div>
                <div className="met-cell-desc">Your brand never sleeps and neither do we. A banner at 10pm, a deck by Friday.</div>
              </div>
            </div>
            {/* Cell 3 */}
            <div className="met-cell">
              <span className="met-cell-deva" aria-hidden="true">ज्ञान</span>
              <div className="met-cell-top">
                <span className="met-cell-num" data-target="4" data-suffix="" data-pad="0">0</span>
              </div>
              <div className="met-cell-bot">
                <div className="met-cell-label">Full Disciplines</div>
                <div className="met-cell-desc">Brand · Web · Content · AI. Every digital direction covered under one roof.</div>
              </div>
            </div>
            {/* Cell 4 */}
            <div className="met-cell">
              <span className="met-cell-deva" aria-hidden="true">अनंत</span>
              <div className="met-cell-top">
                <span className="met-cell-num">∞</span>
              </div>
              <div className="met-cell-bot">
                <div className="met-cell-label">Unlimited Requests</div>
                <div className="met-cell-desc">One flat retainer. No scoping logic fees. Just extraordinary work endlessly.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div id="cd"></div><div id="cr"></div><div id="noise"></div>
      <div className="sdiv"></div>
      <div className="ticker dk" aria-hidden="true"><div className="ticker-t"><span>PRIVATE DIGITAL STUDIO · BRANDS · WEBSITES · APPS · AI · कर्म ही धर्म है ·{"\u00A0"}</span><span>PRIVATE DIGITAL STUDIO · BRANDS · WEBSITES · APPS · AI · कर्म ही धर्म है ·{"\u00A0"}</span><span>PRIVATE DIGITAL STUDIO · BRANDS · WEBSITES · APPS · AI · कर्म ही धर्म है ·{"\u00A0"}</span><span>PRIVATE DIGITAL STUDIO · BRANDS · WEBSITES · APPS · AI · कर्म ही धर्म है ·{"\u00A0"}</span></div></div>
      {/* <div className="section-blend-light"></div> */}

      {/*  ══ SERVICES ════════════════════════════════════════  */}
      <section id="services">
        <div className="svc-hdr rv">
          <div>
            <div className="svc-tag">§ 003 — What We Handle</div>
            <h2 className="svc-title">Everything<br /><em>digital.</em></h2>
          </div>
          <span className="svc-count rv" style={{ transitionDelay: '.15s' }}>04 Disciplines — All In-House</span>
        </div>
        <div className="svc-grid">
          <div className="svc-list">
            {SERVICES_DATA.map((s, i) => (
              <div
                key={i}
                className={`sr ${activeService === i ? 'active' : ''}`}
                onMouseEnter={() => !isMobile && setActiveService(i)}
                onClick={() => isMobile && setActiveService(activeService === i ? -1 : i)}
              >
                <div className="sr-face">
                  <span className="sr-num">{s.num}</span>
                  <span className="sr-name">{s.name}</span>
                  <div className="sr-arr">↗</div>
                </div>
                {/* Mobile Accordion Reveal */}
                <div className={`sr-reveal mobile-only ${activeService === i ? 'open' : ''}`}>
                  <div className="sr-reveal-inner">
                    <div className={`sr-hero-visual ${s.meshClass}`}></div>
                    <div className="sr-content-split">
                      <div className="sr-pitch-card">
                        <p className="sr-desc">{s.desc}</p>
                        <a href="#contact" className="sr-start-btn">{s.btnText} <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg></a>
                      </div>
                      <div>
                        <h4 className="sr-list-header">This package includes:</h4>
                        <ul className="sr-list">
                          {s.list.map((item, j) => <li key={j}>{item}</li>)}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Sticky Stage */}
          <div className="svc-stage desktop-only">
            {SERVICES_DATA.map((s, i) => (
              <div key={i} className={`sr-reveal stage-reveal ${activeService === i ? 'active' : ''}`}>
                <div className={`sr-hero-visual ${s.meshClass}`}></div>
                <div className="sr-content-split">
                  <div className="sr-pitch-card">
                    <p className="sr-desc">{s.desc}</p>
                    <a href="#contact" className="sr-start-btn">{s.btnText} <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg></a>
                  </div>
                  <div>
                    <h4 className="sr-list-header">This package includes:</h4>
                    <ul className="sr-list">
                      {s.list.map((item, j) => <li key={j}>{item}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="svc-ftr">
          <a href="/services" className="svc-cta">See everything we handle →</a>
          <span className="svc-note">One team. Every discipline. Always yours.</span>
        </div>
      </section>

      <div className="sdiv"></div>
      <div className="ticker lt" aria-hidden="true"><div className="ticker-t"><span>ONE TEAM · EVERY DISCIPLINE · ALWAYS ON · ALWAYS YOURS · कर्म ही धर्म है ·{"\u00A0"}</span><span>ONE TEAM · EVERY DISCIPLINE · ALWAYS ON · ALWAYS YOURS · कर्म ही धर्म है ·{"\u00A0"}</span><span>ONE TEAM · EVERY DISCIPLINE · ALWAYS ON · ALWAYS YOURS · कर्म ही धर्म है ·{"\u00A0"}</span><span>ONE TEAM · EVERY DISCIPLINE · ALWAYS ON · ALWAYS YOURS · कर्म ही धर्म है ·{"\u00A0"}</span></div></div>

      {/*  ══ TRUST ════════════════════════════════════════════  */}
      <section id="trust">
        <div className="trust-inner">
          <div className="tr-left rv">
            <div className="tr-syms" aria-hidden="true">
              <span className="tr-sym">एक</span>
              <span className="tr-sym">सदा</span>
              <span className="tr-sym">श्रेष्ठ</span>
            </div>
            <div className="tr-left-top">
              <div className="tr-etag">§ 004 — The Difference</div>
              <h2 className="tr-stmt">Not an agency.<br />Not a freelancer.<br /><span className="au">Something<br />better.</span></h2>
            </div>
            <div className="tr-left-bot">
              <span className="tr-deva-sm">कर्म ही धर्म है</span>
              <p className="tr-note">The fruit of your actions, delivered with uncompromising excellence.</p>
            </div>
          </div>
          <div className="tr-right">
            <div className="tp"><span className="tp-sym">एक</span><div><div className="tp-title">One team. Everything digital.</div><p className="tp-body">No briefing a new designer every month. No inconsistency. One team that knows your brand as well as you do — and shows up every single day without fail.</p><span className="tp-tag">Continuity</span></div></div>
            <div className="tp" style={{ transitionDelay: '.18s' }}><span className="tp-sym">सदा</span><div><div className="tp-title">Always on. Always yours.</div><p className="tp-body">Need a banner at 10pm? A deck by Friday? Your in-house team doesn't keep office hours. We work like we're inside your company — because for you, we are.</p><span className="tp-tag">Availability</span></div></div>
            <div className="tp" style={{ transitionDelay: '.36s' }}><span className="tp-sym">श्रेष्ठ</span><div><div className="tp-title">No compromises. Ever.</div><p className="tp-body">We built our own brand to the highest standard in the world. That's the only standard we know. Every pixel. Every word. Every interaction. Uncompromising.</p><span className="tp-tag">Excellence</span></div></div>
          </div>
        </div>
      </section>

      <div id="cd"></div><div id="cr"></div><div id="noise"></div>
      <div className="sdiv"></div>
      <div className="ticker dk" aria-hidden="true"><div className="ticker-t"><span>PRIVATE DIGITAL STUDIO · BRANDS · WEBSITES · APPS · AI · कर्म ही धर्म है ·{"\u00A0"}</span><span>PRIVATE DIGITAL STUDIO · BRANDS · WEBSITES · APPS · AI · कर्म ही धर्म है ·{"\u00A0"}</span><span>PRIVATE DIGITAL STUDIO · BRANDS · WEBSITES · APPS · AI · कर्म ही धर्म है ·{"\u00A0"}</span><span>PRIVATE DIGITAL STUDIO · BRANDS · WEBSITES · APPS · AI · कर्म ही धर्म है ·{"\u00A0"}</span></div></div>

      {/*  ══ TESTIMONIALS ══════════════════════════════════════  */}
      <section id="testimonials">
        <div className="tes-hdr rv">
          <div>
            <div className="tes-tag">§ 005 — Client Stories</div>
            <h2 className="tes-title">Trusted by<br /><em>ambitious brands.</em></h2>
          </div>
        </div>
        <div className="tes-grid">
          <div className="tcard">
            <div className="tc-stars"><span className="tc-star">★</span><span className="tc-star">★</span><span className="tc-star">★</span><span className="tc-star">★</span><span className="tc-star">★</span></div>
            <span className="tc-q">{"\u201C"}</span>
            <p className="tc-text">KarmaPhal didn't just design our brand — they understood our vision better than we could articulate it. Every asset they deliver feels like it was made for a company ten times our size.</p>
            <div className="tc-author">
              <div className="tc-avatar"><span>RK</span></div>
              <div className="tc-info"><span className="tc-name">Rahul Kapoor</span><span className="tc-company">Founder, NovaBrand India</span></div>
            </div>
          </div>
          <div className="tcard" style={{ transitionDelay: '.12s' }}>
            <div className="tc-stars"><span className="tc-star">★</span><span className="tc-star">★</span><span className="tc-star">★</span><span className="tc-star">★</span><span className="tc-star">★</span></div>
            <span className="tc-q">{"\u201C"}</span>
            <p className="tc-text">Having KarmaPhal as our in-house digital team has been transformative. We stopped worrying about design and marketing entirely — it's just handled. Perfectly. Every time.</p>
            <div className="tc-author">
              <div className="tc-avatar"><span>AS</span></div>
              <div className="tc-info"><span className="tc-name">Ananya Shah</span><span className="tc-company">CEO, Luxe Retail Co.</span></div>
            </div>
          </div>
          <div className="tcard" style={{ transitionDelay: '.24s' }}>
            <div className="tc-stars"><span className="tc-star">★</span><span className="tc-star">★</span><span className="tc-star">★</span><span className="tc-star">★</span><span className="tc-star">★</span></div>
            <span className="tc-q">{"\u201C"}</span>
            <p className="tc-text">The website they built for us became our best sales tool overnight. The combination of design quality and business thinking is something I've never experienced from any agency.</p>
            <div className="tc-author">
              <div className="tc-avatar"><span>VM</span></div>
              <div className="tc-info"><span className="tc-name">Vikram Mehta</span><span className="tc-company">Director, Apex Technologies</span></div>
            </div>
          </div>
        </div>
      </section>

      <div className="sdiv"></div>

      {/*  ══ STUDIO ══════════════════════════════════════════  */}
      <section id="studio">
        <AmbientParticles />
        <div className="studio-glow"></div>
        <div className="studio-river" aria-hidden="true">
          <span className="studio-river-txt">कर्म · फल · सृजन · धर्म · ज्ञान · कर्म · फल · सृजन · धर्म</span>
        </div>
        <div className="studio-in">
          <div className="rv">
            <div className="stu-tag">§ 006 — Private Digital Studio</div>
            <h3 className="stu-hed">Built to handle everything<br />so you handle <span className="au">nothing.</span></h3>
            <div className="stu-quote rv" style={{ transitionDelay: '.3s' }}>
              <span className="stu-q-deva">कर्म ही धर्म है</span>
              <span className="stu-q-en">Your work is your highest duty — we make sure it shines.</span>
            </div>
          </div>
          <div className="rv" style={{ transitionDelay: '.18s' }}>
            <p className="stu-body">We're not a vendor you hire for a project. We're the digital arm of your business — embedded, trusted, and relentless. From your first logo to your hundredth campaign to your AI infrastructure, we are there.</p>
            <p className="stu-body">No onboarding. No handoffs. No gaps. Just the extraordinary work of a world-class team who has chosen to be yours — completely and permanently.</p>
            <div className="stu-btns">
              <a href="/contact" className="btn-g"><span>Start Today</span></a>
              <a href="/about" className="btn-wh">Our Story</a>
            </div>
          </div>
        </div>
      </section>

      <div className="sdiv"></div>

      {/*  ══ CTA ══════════════════════════════════════════════  */}
      <section id="cta">
        <div className="cta-om" aria-hidden="true">ॐ</div>
        <div className="cta-in">
          <div className="cta-tag">§ 007 — Begin</div>
          <p className="cta-kick">For businesses who refuse to settle —</p>
          <div className="cta-lw"><span className="cta-lt">Stop managing</span></div>
          <div className="cta-lw" style={{ transitionDelay: '.13s' }}><span className="cta-lt">your brand.</span></div>
          <div className="cta-lw" style={{ transitionDelay: '.26s' }}><span className="cta-lt au">Start owning it.</span></div>
          <div className="cta-rule"></div>
          <p className="cta-body">Tell us about your business. We'll tell you exactly what we can take off your plate — and how we'd make every single piece of it extraordinary.</p>
          <div className="cta-btns">
            <a href="/contact" className="btn-blk"><span>Begin the Conversation</span></a>
            <a href="/services" className="btn-ghost">See Our Services</a>
          </div>
          <p className="cta-footer-deva">कर्म ही धर्म है — The fruit of your karma, delivered.</p>
        </div>
      </section>

      {/*  ══ FOOTER ══════════════════════════════════════════  */}
      <footer>
        <div className="ft">
          <div className="ft-top">
            <div>
              <a href="/" className="logo"><span className="lk">कर्म</span><span className="ldot"></span><span className="lp">Phal</span></a>
              <p className="ft-tagline">Your private in-house digital team. Handling everything so you can focus on what you were born to do.</p>
              <div className="ft-social">
                <a href="https://instagram.com/houseofkarmaphal" target="_blank" aria-label="Instagram"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg></a>
                <a href="https://linkedin.com/company/houseofkarmaphal" target="_blank" aria-label="LinkedIn"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg></a>
                <a href="/cdn-cgi/l/email-protection#cda5a8a1a1a28da6acbfa0acbda5aca1e3a4a3" aria-label="Email"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" /></svg></a>
              </div>
            </div>
            <div><span className="ft-col-label">Navigate</span><div className="ft-links"><a href="/services">Services</a><a href="/about">About</a><a href="/contact">Contact</a><a href="/contact">Work With Us</a></div></div>
            <div><span className="ft-col-label">Connect</span><div className="ft-contacts"><a href="/cdn-cgi/l/email-protection#442c2128282b042f25362925342c25286a2d2a"><span className="__cf_email__" data-cfemail="1078757c7c7f507b71627d716078717c3e797e">[email&#160;protected]</span></a><a href="https://instagram.com/houseofkarmaphal" target="_blank">@houseofkarmaphal</a><a href="https://linkedin.com/company/houseofkarmaphal" target="_blank">LinkedIn</a></div></div>
          </div>
          <div className="ft-bot"><p className="ft-copy">© 2026 KarmaPhal · All Rights Reserved</p><p className="ft-dharma">कर्म ही धर्म है</p></div>
        </div>
      </footer>
    </>
  );
}