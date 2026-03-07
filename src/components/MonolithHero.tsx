"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import SacredGeometry from "./SacredGeometry";

const DivineTorch = dynamic(() => import("./DivineTorch"), { ssr: false });
const SmoothScroll = dynamic(() => import("./SmoothScroll"), { ssr: false });
const Preloader = dynamic(() => import("./Preloader"), { ssr: false });

export default function MonolithHero() {
  const [revealed, setRevealed] = useState(false);
  const handleReveal = useCallback(() => setRevealed(true), []);
  const d = (t: number) => revealed ? t : 999;

  const { scrollYProgress } = useScroll();
  const logoScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.6]);
  const logoOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.1]);

  return (
    <>
      <Preloader onReveal={handleReveal} />
      <SmoothScroll />
      <DivineTorch />

      <section className="relative h-[100vh] w-full flex flex-col items-center justify-center overflow-hidden bg-obsidian">
        <SacredGeometry />

        {/* AMBIENT BREATHING GLOW */}
        <motion.div
          className="absolute z-[1] pointer-events-none w-[80vw] h-[80vw] md:w-[900px] md:h-[900px]"
          animate={{ opacity: [0.08, 0.15, 0.08], scale: [1, 1.08, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -55%)",
            background: "radial-gradient(circle, rgba(212,175,55,0.2) 0%, rgba(212,175,55,0.05) 40%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />

        <motion.div
          className="relative z-10 flex flex-col items-center px-6"
          style={{ scale: logoScale, opacity: logoOpacity }}
        >
          {/* GOLDEN LINE */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={revealed ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 1.5, delay: d(0.5), ease: [0.16, 1, 0.3, 1] }}
            className="w-32 md:w-64 h-[1px] mb-10"
            style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }}
          />

          {/* WORDMARK */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
            animate={revealed ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
            transition={{ duration: 2, delay: d(0.8), ease: "easeOut" }}
            className="flex items-baseline gap-4 md:gap-12"
          >
             {/* SVG FILTER FOR BRUSHED METAL */}
            <svg style={{ position: "absolute", width: 0, height: 0 }}>
              <filter id="brushedGold">
                <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch" />
                <feColorMatrix type="saturate" values="0" />
                <feComponentTransfer>
                  <feFuncR type="linear" slope="1.5" intercept="-0.3" /><feFuncG type="linear" slope="1.5" intercept="-0.3" /><feFuncB type="linear" slope="1.5" intercept="-0.3" />
                </feComponentTransfer>
                <feComposite operator="in" in2="SourceGraphic" />
                <feBlend mode="multiply" in2="SourceGraphic" />
              </filter>
            </svg>

            <h1 className="text-7xl md:text-[12rem] font-[var(--font-gotu)] leading-none text-gold filter drop-shadow-[0_0_60px_rgba(212,175,55,0.3)]">कर्म</h1>
            <div className="h-3 w-3 md:h-5 md:w-5 rounded-full bg-white flex-shrink-0 mb-4 md:mb-12 shadow-[0_0_20px_#D4AF37]" />
            <h2 className="text-6xl md:text-[10rem] font-[var(--font-cinzel)] font-black uppercase tracking-tighter leading-none text-white">Phal</h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={revealed ? { opacity: 0.5 } : {}}
            transition={{ duration: 1, delay: d(2.5) }}
            className="text-[9px] md:text-xs font-[var(--font-cinzel)] tracking-[1em] text-silver uppercase mt-8"
          >
            ARCHITECTURE OF THE INFINITE
          </motion.p>
        </motion.div>

        {/* SCROLL INDICATOR */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={revealed ? { opacity: 1 } : {}}
          transition={{ delay: d(4), duration: 1 }}
          className="absolute bottom-10 z-20 flex flex-col items-center gap-2"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#D4AF37] to-transparent" />
        </motion.div>
      </section>
    </>
  );
}
