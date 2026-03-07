"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";

const noop = () => {};

/**
 * CinematicHero
 *
 * Mobile-first full-screen hero. Replace ObliquHero in HomePage.tsx with this.
 *
 * CONCEPT:
 * — Full viewport, centered, nothing cropped
 * — Sacred geometry ring rotates slowly as the background
 * — Wordmark sits in the absolute center at maximum safe size
 * — Gold particle embers rise from below (canvas, zero DOM overhead)
 * — On scroll: entire hero compresses into a thin gold line then disappears
 * — Mobile: identical experience, just tighter spacing
 */

// ── EMBER CANVAS ─────────────────────────────────────────────────────────────
function EmberCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let W = 0, H = 0, raf = 0;

    interface Ember {
      x: number; y: number;
      vx: number; vy: number;
      size: number; life: number;
      maxOp: number; phase: number;
    }

    const embers: Ember[] = [];

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    const spawn = (): Ember => ({
      x: W * 0.2 + Math.random() * W * 0.6,
      y: H + 8,
      vx: (Math.random() - 0.5) * 0.4,
      vy: 0.3 + Math.random() * 0.5,
      size: 0.6 + Math.random() * 1.8,
      life: 0,
      maxOp: 0.2 + Math.random() * 0.45,
      phase: Math.random() * Math.PI * 2,
    });

    let lastSpawn = 0;

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      ctx.clearRect(0, 0, W, H);

      if (embers.length < 20 && now - lastSpawn > 500 + Math.random() * 700) {
        embers.push(spawn());
        lastSpawn = now;
      }

      for (let i = embers.length - 1; i >= 0; i--) {
        const e = embers[i];
        e.x += e.vx + Math.sin(e.life * 3 + e.phase) * 0.2;
        e.y -= e.vy;
        e.life += e.vy / H;

        if (e.y < -10) { embers.splice(i, 1); continue; }

        const op = e.life < 0.12
          ? (e.life / 0.12) * e.maxOp
          : e.life > 0.72
          ? ((1 - e.life) / 0.28) * e.maxOp
          : e.maxOp;

        const g = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, e.size * 4);
        g.addColorStop(0, `rgba(212,175,55,${op})`);
        g.addColorStop(0.5, `rgba(212,175,55,${op * 0.3})`);
        g.addColorStop(1, "rgba(212,175,55,0)");
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,240,180,${op * 1.3})`;
        ctx.fill();
      }
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[2] pointer-events-none w-full h-full"
      style={{ mixBlendMode: "screen" }}
    />
  );
}

// ── HERO ─────────────────────────────────────────────────────────────────────
export default function CinematicHero({ revealed = true }: { revealed?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Parallax layers
  const geoScale   = useTransform(scrollYProgress, [0, 1], [1,   1.3]);
  const geoOpacity = useTransform(scrollYProgress, [0, 0.7], [1,  0]);
  const wordY      = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const wordScale  = useTransform(scrollYProgress, [0, 0.8], [1,  0.75]);
  const wordOpacity= useTransform(scrollYProgress, [0, 0.7], [1,  0]);
  const subY       = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  const d = (t: number) => revealed ? t : 999;

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ height: "100dvh", minHeight: "600px", background: "#010101" }}
    >

      {/* ── LAYER 0: deep warm radial bg ── */}
      <div
        className="absolute inset-0 z-[0] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(18,12,4,1) 0%, rgba(8,5,2,1) 55%, #010101 100%)",
        }}
      />

      {/* ── LAYER 1: sacred geometry ring — fills viewport, rotates ── */}
      <motion.div
        className="absolute inset-0 z-[1] pointer-events-none flex items-center justify-center"
        style={{ scale: geoScale, opacity: geoOpacity }}
      >
        {/* Outer slow ring */}
        <motion.div
          className="absolute"
          style={{ width: "min(130vw, 130vh)", height: "min(130vw, 130vh)" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
          onUpdate={noop}
        >
          <svg viewBox="0 0 1000 1000" className="w-full h-full opacity-[0.07]">
            <circle cx="500" cy="500" r="490" fill="none" stroke="#D4AF37" strokeWidth="0.6" />
            <circle cx="500" cy="500" r="470" fill="none" stroke="#D4AF37" strokeWidth="0.3" />
            {[0,30,60,90,120,150,180,210,240,270,300,330].map(a => (
              <line key={a}
                x1={500 + 470 * Math.cos(a * Math.PI/180)}
                y1={500 + 470 * Math.sin(a * Math.PI/180)}
                x2={500 + 490 * Math.cos(a * Math.PI/180)}
                y2={500 + 490 * Math.sin(a * Math.PI/180)}
                stroke="#D4AF37" strokeWidth="0.8"
              />
            ))}
          </svg>
        </motion.div>

        {/* Middle counter-rotate ring */}
        <motion.div
          className="absolute"
          style={{ width: "min(100vw, 100vh)", height: "min(100vw, 100vh)" }}
          animate={{ rotate: -360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          onUpdate={noop}
        >
          <svg viewBox="0 0 1000 1000" className="w-full h-full opacity-[0.1]">
            <circle cx="500" cy="500" r="480" fill="none" stroke="#D4AF37" strokeWidth="0.4" />
            <circle cx="500" cy="500" r="380" fill="none" stroke="#D4AF37" strokeWidth="0.4" />
            <circle cx="500" cy="500" r="280" fill="none" stroke="#D4AF37" strokeWidth="0.4" />
            <polygon points="500,120 820,700 180,700" fill="none" stroke="#D4AF37" strokeWidth="0.5" />
            <polygon points="500,880 180,300 820,300" fill="none" stroke="#D4AF37" strokeWidth="0.5" />
            <line x1="500" y1="20" x2="500" y2="980" stroke="#D4AF37" strokeWidth="0.25" />
            <line x1="20" y1="500" x2="980" y2="500" stroke="#D4AF37" strokeWidth="0.25" />
            <line x1="146" y1="146" x2="854" y2="854" stroke="#D4AF37" strokeWidth="0.2" />
            <line x1="854" y1="146" x2="146" y2="854" stroke="#D4AF37" strokeWidth="0.2" />
          </svg>
        </motion.div>

        {/* Inner lotus — slow rotate */}
        <motion.div
          className="absolute"
          style={{ width: "min(65vw, 65vh)", height: "min(65vw, 65vh)" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          onUpdate={noop}
        >
          <svg viewBox="0 0 1000 1000" className="w-full h-full opacity-[0.18]">
            <circle cx="500" cy="500" r="180" fill="none" stroke="#D4AF37" strokeWidth="0.5" />
            <circle cx="500" cy="500" r="80"  fill="none" stroke="#D4AF37" strokeWidth="0.5" />
            {[0,45,90,135,180,225,270,315].map(a => (
              <ellipse key={a} cx="500" cy="350" rx="30" ry="100"
                fill="none" stroke="#D4AF37" strokeWidth="0.5"
                transform={`rotate(${a} 500 500)`}
              />
            ))}
            {[22.5,67.5,112.5,157.5,202.5,247.5,292.5,337.5].map(a => (
              <ellipse key={a} cx="500" cy="400" rx="18" ry="58"
                fill="none" stroke="#D4AF37" strokeWidth="0.35"
                transform={`rotate(${a} 500 500)`}
              />
            ))}
          </svg>
        </motion.div>

        {/* Bindu glow */}
        <motion.div
          className="absolute rounded-full"
          animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          onUpdate={noop}
          style={{
            width: 10, height: 10,
            background: "#D4AF37",
            boxShadow: "0 0 30px #D4AF37, 0 0 80px rgba(212,175,55,0.5)",
          }}
        />
      </motion.div>

      {/* ── LAYER 2: ember particles ── */}
      <EmberCanvas />

      {/* ── LAYER 3: ambient breathing glow ── */}
      <motion.div
        className="absolute inset-0 z-[3] pointer-events-none flex items-center justify-center"
        style={{ opacity: geoOpacity }}
      >
        <motion.div
          animate={{ opacity: [0.12, 0.28, 0.12], scale: [1, 1.12, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          onUpdate={noop}
          style={{
            width: "min(90vw, 90vh)", height: "min(90vw, 90vh)",
            background: "radial-gradient(circle, rgba(212,175,55,0.18) 0%, rgba(212,175,55,0.04) 45%, transparent 65%)",
            filter: "blur(60px)",
            borderRadius: "50%",
          }}
        />
      </motion.div>

      {/* ── LAYER 4: wordmark — full center ── */}
      <motion.div
        style={{ y: wordY, scale: wordScale, opacity: wordOpacity }}
        className="absolute inset-0 z-[10] flex flex-col items-center justify-center pointer-events-none"
      >
        {/* Top eyebrow */}
        <motion.div
          className="flex items-center gap-4 mb-6 md:mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: d(0.4) }}
          onUpdate={noop}
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={revealed ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, delay: d(0.6), ease: [0.16,1,0.3,1] }}
            onUpdate={noop}
            className="h-[1px] w-8 md:w-14 origin-right"
            style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.5))" }}
          />
          <span
            className="font-[var(--font-cinzel)] uppercase tracking-[0.45em]"
            style={{ fontSize: "clamp(0.45rem, 1vw, 0.65rem)", color: "rgba(212,175,55,0.45)" }}
          >
            Architecture of the Infinite
          </span>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={revealed ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, delay: d(0.6), ease: [0.16,1,0.3,1] }}
            onUpdate={noop}
            className="h-[1px] w-8 md:w-14 origin-left"
            style={{ background: "linear-gradient(90deg, rgba(212,175,55,0.5), transparent)" }}
          />
        </motion.div>

        {/* THE WORDMARK — stacked on mobile, inline on desktop */}
        <div className="flex flex-col items-center gap-0">

          {/* कर्म — takes full width */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, filter: "blur(24px)" }}
            animate={revealed ? { opacity: 1, scale: 1, filter: "none" } : {}}
            transition={{ duration: 2.4, delay: d(0.7), ease: "easeOut" }}
            onUpdate={noop}
            style={{
              fontFamily: "var(--font-gotu), serif",
              fontSize: "clamp(5.5rem, 22vw, 18rem)",
              lineHeight: 1,
              background: "linear-gradient(180deg, #FFFFFF 0%, #F9E2AF 18%, #D4AF37 50%, #9A7B35 80%, #6B521E 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 80px rgba(212,175,55,0.5))",
              paddingTop: "0.15em",
              letterSpacing: "-0.01em",
            }}
          >
            कर्म
          </motion.div>

          {/* Separator row: line · dot · PHAL · dot · line */}
          <motion.div
            className="flex items-center gap-3 md:gap-5 my-1 md:my-2"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={revealed ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 1.4, delay: d(1.5), ease: [0.16,1,0.3,1] }}
            onUpdate={noop}
          >
            <div className="h-[1px] w-10 md:w-20" style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.6))" }} />
            <div
              className="rounded-full"
              style={{
                width: "clamp(5px,1vw,10px)", height: "clamp(5px,1vw,10px)",
                background: "#D4AF37",
                boxShadow: "0 0 15px #D4AF37, 0 0 40px rgba(212,175,55,0.6)",
              }}
            />
            <motion.span
              initial={{ opacity: 0, letterSpacing: "0em" }}
              animate={revealed ? { opacity: 1, letterSpacing: "0.55em" } : {}}
              transition={{ duration: 1.4, delay: d(1.8) }}
              onUpdate={noop}
              style={{
                fontFamily: "var(--font-cinzel), serif",
                fontWeight: 900,
                fontSize: "clamp(1.8rem, 6vw, 5rem)",
                background: "linear-gradient(180deg, #FFFFFF 0%, #F9E2AF 20%, #D4AF37 55%, #9A7B35 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 0 40px rgba(212,175,55,0.4))",
                textTransform: "uppercase",
              }}
            >
              PHAL
            </motion.span>
            <div
              className="rounded-full"
              style={{
                width: "clamp(5px,1vw,10px)", height: "clamp(5px,1vw,10px)",
                background: "#D4AF37",
                boxShadow: "0 0 15px #D4AF37, 0 0 40px rgba(212,175,55,0.6)",
              }}
            />
            <div className="h-[1px] w-10 md:w-20" style={{ background: "linear-gradient(90deg, rgba(212,175,55,0.6), transparent)" }} />
          </motion.div>
        </div>

        {/* Services line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={revealed ? { opacity: 1 } : {}}
          transition={{ duration: 1.5, delay: d(2.2) }}
          onUpdate={noop}
          className="font-[var(--font-cinzel)] uppercase text-center mt-4 md:mt-5 px-8"
          style={{
            fontSize: "clamp(0.45rem, 1.1vw, 0.72rem)",
            letterSpacing: "clamp(0.15em, 0.35vw, 0.35em)",
            color: "rgba(192,192,192,0.4)",
          }}
        >
          Brands · Websites · Apps · AI · Everything Digital
        </motion.p>
      </motion.div>

      {/* ── LAYER 5: bottom content ── */}
      <motion.div
        style={{ y: subY }}
        className="absolute bottom-0 left-0 right-0 z-[10] pb-8 md:pb-12 flex flex-col items-center gap-5"
      >
        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: d(2.6) }}
          onUpdate={noop}
          className="font-[var(--font-cinzel)] text-center px-8"
          style={{
            fontSize: "clamp(0.65rem, 1.4vw, 0.95rem)",
            letterSpacing: "0.06em",
            color: "rgba(255,255,255,0.55)",
            maxWidth: "360px",
          }}
        >
          Your private in-house digital team.
          <br />
          <span style={{ color: "rgba(212,175,55,0.7)" }}>One team. Everything. Forever.</span>
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: d(3) }}
          onUpdate={noop}
          className="flex items-center gap-3 md:gap-4"
        >
          <Link
            href="/contact"
            className="relative overflow-hidden group inline-block pointer-events-auto"
          >
            <span
              className="block font-[var(--font-cinzel)] font-bold tracking-[0.35em] uppercase px-7 md:px-10 py-3.5 md:py-4 transition-all duration-500"
              style={{
                fontSize: "clamp(0.6rem, 1.1vw, 0.8rem)",
                background: "linear-gradient(135deg, #8A6D3B, #D4AF37, #C9963F)",
                color: "#010101",
              }}
            >
              Work With Us
            </span>
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: "linear-gradient(135deg, #C9963F, #F9E2AF, #D4AF37)" }}
            />
          </Link>

          <Link
            href="/services"
            className="font-[var(--font-cinzel)] tracking-[0.3em] uppercase px-6 md:px-8 py-3.5 md:py-4 transition-all duration-300 pointer-events-auto"
            style={{
              fontSize: "clamp(0.6rem, 1.1vw, 0.8rem)",
              border: "1px solid rgba(212,175,55,0.3)",
              color: "rgba(212,175,55,0.65)",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,175,55,0.7)";
              (e.currentTarget as HTMLElement).style.color = "#D4AF37";
              (e.currentTarget as HTMLElement).style.background = "rgba(212,175,55,0.06)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,175,55,0.3)";
              (e.currentTarget as HTMLElement).style.color = "rgba(212,175,55,0.65)";
              (e.currentTarget as HTMLElement).style.background = "transparent";
            }}
          >
            Our Services
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={revealed ? { opacity: 1 } : {}}
          transition={{ delay: d(3.5), duration: 1 }}
          onUpdate={noop}
          className="flex flex-col items-center gap-1.5 mt-2"
        >
          <motion.div
            animate={{ y: [0, 9, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            onUpdate={noop}
            className="w-[1px] h-8 md:h-10"
            style={{
              background: "linear-gradient(180deg, rgba(212,175,55,0.6), transparent)",
              boxShadow: "0 0 6px rgba(212,175,55,0.3)",
            }}
          />
        </motion.div>
      </motion.div>

      {/* ── LAYER 6: corner ornaments ── */}
      {/* Top left */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={revealed ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1, delay: d(2) }}
        onUpdate={noop}
        className="absolute top-6 left-6 z-[10] pointer-events-none"
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <line x1="0" y1="0" x2="0" y2="14" stroke="rgba(212,175,55,0.3)" strokeWidth="1"/>
          <line x1="0" y1="0" x2="14" y2="0" stroke="rgba(212,175,55,0.3)" strokeWidth="1"/>
        </svg>
      </motion.div>
      {/* Top right */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={revealed ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1, delay: d(2.1) }}
        onUpdate={noop}
        className="absolute top-6 right-6 z-[10] pointer-events-none"
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <line x1="28" y1="0" x2="28" y2="14" stroke="rgba(212,175,55,0.3)" strokeWidth="1"/>
          <line x1="28" y1="0" x2="14" y2="0" stroke="rgba(212,175,55,0.3)" strokeWidth="1"/>
        </svg>
      </motion.div>
      {/* Bottom left */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={revealed ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1, delay: d(2.2) }}
        onUpdate={noop}
        className="absolute bottom-6 left-6 z-[10] pointer-events-none"
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <line x1="0" y1="28" x2="0" y2="14" stroke="rgba(212,175,55,0.3)" strokeWidth="1"/>
          <line x1="0" y1="28" x2="14" y2="28" stroke="rgba(212,175,55,0.3)" strokeWidth="1"/>
        </svg>
      </motion.div>
      {/* Bottom right */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={revealed ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1, delay: d(2.3) }}
        onUpdate={noop}
        className="absolute bottom-6 right-6 z-[10] pointer-events-none"
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <line x1="28" y1="28" x2="28" y2="14" stroke="rgba(212,175,55,0.3)" strokeWidth="1"/>
          <line x1="28" y1="28" x2="14" y2="28" stroke="rgba(212,175,55,0.3)" strokeWidth="1"/>
        </svg>
      </motion.div>
    </section>
  );
}
