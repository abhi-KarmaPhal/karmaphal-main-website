"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function SovereignNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-12 py-10 flex justify-between items-center pointer-events-none font-cinzel">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pointer-events-auto"
      >
        <Link href="/" className="font-gotu text-4xl tracking-tighter text-gold hover:text-white transition-all duration-700">
          कर्म
        </Link>
      </motion.div>

      <div className="flex gap-12 pointer-events-auto items-center">
        <Link 
          href="/initiate" 
          className="text-[10px] uppercase tracking-[0.4em] text-silver/40 hover:text-gold transition-all duration-500 border-b border-transparent hover:border-gold/30 pb-1"
        >
          The House
        </Link>
        <Link 
          href="/initiate" 
          className="px-8 py-3 border border-gold/30 text-gold text-[9px] uppercase tracking-[0.3em] hover:bg-gold hover:text-black transition-all duration-700"
        >
          Initiate
        </Link>
      </div>
    </nav>
  );
}
