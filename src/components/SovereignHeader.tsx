"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

type Theme = "dark" | "light";

// ─── Animated Nav Link ────────────────────────────────────────────────────────
function AnimatedNavLink({ href, text, theme }: { href: string; text: string; theme: Theme }) {
  // theme here is the BACKGROUND SECTION theme.
  // Because our header *contrasts* with the section:
  // Dark section -> White Header -> Black text
  // Light section -> Black Header -> White text
  
  const isDarkSection = theme === "dark";
  const baseColor = isDarkSection ? "#0a0a0a" : "#ffffff";
  // The user asked for "dark color hovering effects". We will use a sleek dark/light grey for the hidden animated text.
  const hoverSlideColor = isDarkSection ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.4)";
  const underlineColor = isDarkSection ? "#0a0a0a" : "#ffffff";

  return (
    <motion.div initial="rest" whileHover="hover" animate="rest">
      <Link href={href} className="relative inline-block overflow-hidden py-1 group">
        <span className="flex font-mono text-[10px] tracking-[0.25em] uppercase">
          {text.split("").map((char, i) => (
            <span key={i} className="relative inline-block overflow-hidden">
              {/* Original visible text */}
              <motion.span
                className="inline-block transition-colors duration-500 font-bold"
                style={{ color: baseColor }}
                variants={{ rest: { y: 0, opacity: 1 }, hover: { y: "-100%", opacity: 0 } }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: i * 0.02 }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
              {/* Hover slide-in text */}
              <motion.span
                className="absolute top-0 left-0 inline-block font-bold"
                style={{ color: hoverSlideColor }}
                variants={{ rest: { y: "100%", opacity: 0 }, hover: { y: 0, opacity: 1 } }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: i * 0.02 }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            </span>
          ))}
        </span>
        {/* Underline reveal */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-[1px]"
          style={{ backgroundColor: underlineColor }}
          variants={{ rest: { scaleX: 0, transformOrigin: "right" }, hover: { scaleX: 1, transformOrigin: "left" } }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </Link>
    </motion.div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function SovereignHeader() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [visible, setVisible] = useState(false);

  const detectTheme = useCallback(() => {
    const sampleY = 50; // vertical midpoint of header

    // 1. Check if manifesto section is currently inverted (GSAP light flash)
    const manifesto = document.getElementById("manifesto");
    if (manifesto) {
      const rect = manifesto.getBoundingClientRect();
      if (rect.top <= sampleY && rect.bottom >= sampleY) {
        // If GSAP has applied the .inverted class (light background revealed)
        const isInverted = manifesto.classList.contains("inverted");
        setTheme(isInverted ? "light" : "dark");
        return;
      }
    }

    // 2. Check all other [data-header-theme] sections
    const sections = document.querySelectorAll<HTMLElement>("[data-header-theme]");
    for (const section of sections) {
      const rect = section.getBoundingClientRect();
      if (rect.top <= sampleY && rect.bottom >= sampleY) {
        setTheme((section.getAttribute("data-header-theme") as Theme) ?? "dark");
        return;
      }
    }
  }, []);

  useEffect(() => {
    // Staggered entrance
    const t = setTimeout(() => setVisible(true), 200);

    detectTheme();
    window.addEventListener("scroll", detectTheme, { passive: true });
    window.addEventListener("resize", detectTheme, { passive: true });

    // Watch for GSAP toggling the .inverted class on #manifesto
    const manifesto = document.getElementById("manifesto");
    let observer: MutationObserver | null = null;
    if (manifesto) {
      observer = new MutationObserver(detectTheme);
      observer.observe(manifesto, { attributes: true, attributeFilter: ["class"] });
    }

    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", detectTheme);
      window.removeEventListener("resize", detectTheme);
      observer?.disconnect();
    };
  }, [detectTheme]);

  // ── Theme tokens (INVERTED HIGH-CONTRAST) ──
  // The header deliberately contrasts the section background.
  const isDarkSection = theme === "dark";

  const headerBg = isDarkSection
    ? "rgba(255, 255, 255, 1)"  // Solid White header over dark sections
    : "rgba(0, 0, 0, 1)";       // Solid Black header over light sections

  const headerBorder = isDarkSection
    ? "rgba(0, 0, 0, 0.05)"
    : "rgba(255, 255, 255, 0.05)";

  const logoColor = isDarkSection ? "#0a0a0a" : "#ffffff";
  const ctaColor = isDarkSection ? "#0a0a0a" : "#ffffff";
  const ctaBorder = isDarkSection ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.3)";
  
  // CTA Hover state logic
  const ctaHoverBg = isDarkSection ? "#0a0a0a" : "#ffffff";
  const ctaHoverText = isDarkSection ? "#ffffff" : "#000000";

  return (
    <motion.header
      className="fixed top-0 left-0 w-full z-[200] pointer-events-none"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: visible ? 1 : 0 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* ── Animated background bar ── */}
      <motion.div
        className="absolute inset-0"
        animate={{
          backgroundColor: headerBg,
          borderBottomColor: headerBorder,
        }}
        style={{ borderBottom: `1px solid ${headerBorder}` }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* ── Content (re-enables pointer events) ── */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 py-5 flex items-center justify-between pointer-events-auto">

        {/* LOGO */}
        <motion.div
          animate={{ color: logoColor }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/"
            className="font-cinzel text-lg md:text-xl font-bold tracking-[0.18em] uppercase hover:opacity-70 transition-opacity duration-500"
            style={{ color: "inherit" }}
          >
            Karmaphal
          </Link>
        </motion.div>

        {/* RIGHT: Nav + CTA */}
        <div className="hidden md:flex items-center gap-10">
          <nav className="flex items-center gap-10">
            <AnimatedNavLink href="/services" text="Services" theme={theme} />
            <AnimatedNavLink href="/about" text="About" theme={theme} />
            <AnimatedNavLink href="/contact" text="Contact" theme={theme} />
          </nav>

          <Link
            href="/contact"
            className="font-mono text-[9px] tracking-[0.3em] font-bold uppercase px-6 py-2.5 transition-all duration-500"
            style={{ color: ctaColor, border: `1px solid ${ctaBorder}` }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = ctaHoverBg;
              e.currentTarget.style.color = ctaHoverText;
              e.currentTarget.style.borderColor = ctaHoverBg;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = ctaColor;
              e.currentTarget.style.borderColor = ctaBorder;
            }}
          >
            Initiate
          </Link>
        </div>

        {/* MOBILE */}
        <motion.button
          className="md:hidden font-mono text-[10px] uppercase font-bold tracking-widest"
          animate={{ color: logoColor }}
          transition={{ duration: 0.5 }}
        >
          Menu
        </motion.button>
      </div>
    </motion.header>
  );
}
