"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

// ─── Animated Nav Link ────────────────────────────────────────────────────────
function AnimatedNavLink({ href, text, onClick, isActive }: { href: string; text: string; onClick?: () => void; isActive?: boolean }) {
  const baseColor = isActive ? "#D4AF37" : "#e6e3dd";
  const hoverColor = "#D4AF37";
  const underlineColor = "#D4AF37";

  return (
    <motion.div initial="rest" whileHover="hover" animate="rest">
      <Link 
        href={href} 
        onClick={onClick}
        className="relative inline-block overflow-hidden py-1 group"
      >
        <span className="flex font-mono text-[10px] md:text-[10px] text-[14px] tracking-[0.25em] uppercase">
          {text.split("").map((char, i) => (
            <span key={i} className="relative inline-block overflow-hidden">
              <motion.span
                className="inline-block transition-colors duration-500"
                style={{ color: baseColor }}
                variants={{ rest: { y: 0, opacity: 1 }, hover: { y: "-100%", opacity: 0 } }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: i * 0.02 }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
              <motion.span
                className="absolute top-0 left-0 inline-block"
                style={{ color: hoverColor }}
                variants={{ rest: { y: "100%", opacity: 0 }, hover: { y: 0, opacity: 1 } }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: i * 0.02 }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            </span>
          ))}
        </span>
        <motion.div
          className="absolute bottom-0 left-0 w-full h-[1px]"
          style={{ backgroundColor: underlineColor }}
          variants={{ rest: { scaleX: isActive ? 1 : 0, transformOrigin: "right" }, hover: { scaleX: 1, transformOrigin: "left" } }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </Link>
    </motion.div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function SovereignHeader() {
  const [visible, setVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  // ── Universal Theme tokens ──
  const headerBg = "rgba(10, 10, 10, 0.45)"; // Deep Obsidian Glass
  const headerBorder = "rgba(255, 255, 255, 0.05)";
  const logoColor = "#e6e3dd";
  const ctaColor = "#D4AF37";
  const ctaBorder = "rgba(212, 175, 55, 0.4)";

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 w-full z-[200] pointer-events-none"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: visible ? 1 : 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* ── Frosted Background Bar ── */}
        <div 
          className="absolute inset-0"
          style={{ 
            backgroundColor: headerBg, 
            borderBottom: `1px solid ${headerBorder}`,
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)" // for safari
          }}
        />

        {/* ── Content ── */}
        <div className="relative z-10 container mx-auto px-6 md:px-12 py-5 flex items-center justify-between pointer-events-auto">

          {/* LOGO */}
          <div>
            <Link
              href="/"
              className="font-cinzel text-lg md:text-xl font-bold tracking-[0.18em] uppercase hover:opacity-70 transition-opacity duration-500"
              style={{ color: logoColor }}
            >
              Karmaphal
            </Link>
          </div>

          {/* RIGHT: Nav + CTA (Desktop) */}
          <div className="hidden md:flex items-center gap-10">
            <nav className="flex items-center gap-10">
              <AnimatedNavLink href="/services" text="Services" isActive={pathname === "/services"} />
              <AnimatedNavLink href="/about" text="About" isActive={pathname === "/about"} />
              <AnimatedNavLink href="/contact" text="Contact" isActive={pathname === "/contact"} />
            </nav>

            <motion.div whileHover="hover" initial="rest" animate="rest">
              <Link
                href="/contact"
                className="font-mono text-[9px] tracking-[0.3em] uppercase px-6 py-2.5 transition-all duration-500 block relative"
                style={{ border: `1px solid ${ctaBorder}` }}
              >
                <motion.div 
                  className="absolute inset-0 bg-[#D4AF37]"
                  variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
                  transition={{ duration: 0.4 }}
                />
                <motion.span 
                  className="relative z-10 block"
                  style={{ color: ctaColor }}
                  variants={{ rest: { color: ctaColor }, hover: { color: "#000000" } }}
                  transition={{ duration: 0.4 }}
                >
                  Initiate
                </motion.span>
              </Link>
            </motion.div>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden font-mono text-[10px] uppercase tracking-widest relative z-50 flex items-center gap-2"
            style={{ color: logoColor }}
          >
            <span>{isMobileMenuOpen ? "Close" : "Menu"}</span>
            <div className="flex flex-col gap-1 w-4">
              <motion.div 
                className="h-px w-full bg-current" 
                animate={isMobileMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              />
              <motion.div 
                className="h-px w-full bg-current" 
                animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              />
              <motion.div 
                className="h-px w-full bg-current" 
                animate={isMobileMenuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              />
            </div>
          </button>
        </div>
      </motion.header>

      {/* ── MOBILE MENU OVERLAY ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[190] bg-black flex flex-col items-center justify-center pointer-events-auto"
          >
            {/* Background elements (Optional) */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.1),transparent_70%)]" />
            </div>

            <nav className="flex flex-col items-center gap-12 relative z-10">
              <AnimatedNavLink href="/services" text="Services" onClick={() => setIsMobileMenuOpen(false)} isActive={pathname === "/services"} />
              <AnimatedNavLink href="/about" text="About" onClick={() => setIsMobileMenuOpen(false)} isActive={pathname === "/about"} />
              <AnimatedNavLink href="/contact" text="Contact" onClick={() => setIsMobileMenuOpen(false)} isActive={pathname === "/contact"} />
              
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-4 font-mono text-[11px] tracking-[0.4em] uppercase px-12 py-4 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-500"
              >
                Initiate
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
