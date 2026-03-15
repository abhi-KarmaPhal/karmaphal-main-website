"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

// The same intricate stagger effect we used in the contact page applied to footer links
const AnimatedFooterLink = ({ href, text, external = false }: { href: string; text: string; external?: boolean }) => {
  return (
    <motion.div initial="rest" whileHover="hover" animate="rest">
      <Link 
        href={href} 
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        className="relative inline-block overflow-hidden py-1"
      >
        <span className="flex">
          {text.split("").map((char, i) => (
            <span key={i} className="relative inline-block overflow-hidden">
              <motion.span
                className="inline-block"
                variants={{
                  rest: { y: 0, opacity: 1 },
                  hover: { y: "-100%", opacity: 0 }
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.02 }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
              <motion.span
                className="absolute top-0 left-0 inline-block text-[#D4AF37]" // Gold
                variants={{
                  rest: { y: "100%", opacity: 0 },
                  hover: { y: 0, opacity: 1 }
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.02 }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            </span>
          ))}
        </span>
        <motion.div 
          className="absolute bottom-0 left-0 w-full h-[1px] bg-[#D4AF37]"
          variants={{
            rest: { scaleX: 0, transformOrigin: "right" },
            hover: { scaleX: 1, transformOrigin: "left" }
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </Link>
    </motion.div>
  );
};

export default function SovereignFooter() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { timeZone: "Asia/Kolkata", hour12: false, hour: "2-digit", minute: "2-digit" }) + " IST");
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative bg-[#010101] text-[#e6e3dd] pt-32 pb-12 overflow-hidden border-t border-white/5">
      
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] max-w-[1200px] max-h-[1200px] bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.03)_0%,transparent_60%)] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Top Grid - Links & Contact */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-32">
          
          <div className="md:col-span-2">
            <h3 className="font-cinzel text-xl md:text-2xl mb-6 text-[#D4AF37]">Initiate Dialogue</h3>
            <p className="font-mono text-sm text-white/50 mb-8 max-w-sm leading-relaxed">
              We operate exclusively in the shadows of the extraordinary. If you are building sovereignty, we are listening.
            </p>
            <div className="text-xl md:text-2xl font-cinzel font-bold">
               <AnimatedFooterLink href="mailto:abhi@karmaphal.in" text="abhi@karmaphal.in" />
            </div>
          </div>

          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 mb-6">Navigation</h4>
            <ul className="space-y-4 font-mono text-sm uppercase tracking-widest">
              <li><AnimatedFooterLink href="/services" text="Services" /></li>
              <li><AnimatedFooterLink href="/about" text="About" /></li>
              <li><AnimatedFooterLink href="/contact" text="Initiate" /></li>
              <li><AnimatedFooterLink href="/vault/export-manifesto" text="Manifesto" /></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 mb-6">Network</h4>
            <ul className="space-y-4 font-mono text-sm uppercase tracking-widest">
              <li><AnimatedFooterLink href="https://instagram.com/houseofkarmaphal" text="Instagram" external /></li>
              <li><AnimatedFooterLink href="https://linkedin.com/company/houseofkarmaphal" text="LinkedIn" external /></li>
              <li><AnimatedFooterLink href="https://x.com/karmaphal_hq" text="Twitter / X" external /></li>
            </ul>
            
            <div className="mt-12">
              <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 mb-2">Local Time</h4>
              <p className="font-mono text-sm text-[#D4AF37]">{time || "00:00 IST"}</p>
            </div>
          </div>

        </div>

        {/* Massive Logotype & Copyright */}
        <div className="flex flex-col items-center border-t border-white/10 pt-12">
          <motion.h1 
            className="text-[12vw] leading-none font-cinzel font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-transparent select-none cursor-default"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            KARMAPHAL
          </motion.h1>
          
          <div className="w-full flex flex-col md:flex-row justify-between items-center mt-8 font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase">
            <span>© {new Date().getFullYear()} Karmaphal Private Digital Studio</span>
            <span className="mt-4 md:mt-0">Architectural Sovereignty</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
