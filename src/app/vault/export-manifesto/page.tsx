"use client";

import { motion } from "framer-motion";

export default function ExportManifesto() {
  return (
    <div 
      id="capture-root"
      className="relative bg-[#010101] overflow-hidden flex items-center justify-center antialiased"
      style={{ width: '3840px', height: '3840px' }} // HARD-CODED 4K VIEWPORT
    >
      {/* 1. SACRED GEOMETRY LAYER (1:1 Website DNA) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <svg viewBox="0 0 1000 1000" className="w-[140%] h-[140%] stroke-[#D4AF37] fill-none">
          <circle cx="500" cy="500" r="480" strokeWidth="0.5" />
          <polygon points="500,120 820,700 180,700" strokeWidth="0.4" />
          <polygon points="500,880 180,300 820,300" strokeWidth="0.4" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <ellipse key={angle} cx="500" cy="380" rx="30" ry="120" strokeWidth="0.5" transform={`rotate(${angle} 500 500)`} />
          ))}
        </svg>
      </div>

      {/* 2. THE MANIFESTO (Cinzel Black Authority) */}
      <div className="relative z-10 flex flex-col items-start text-left w-full px-[400px]">
        <div className="border-l-[4px] border-[#D4AF37]/40 pl-24 space-y-16">
          <p className="text-[120px] font-cinzel italic tracking-[0.4em] text-white opacity-90 leading-none">
            ACTION IS THE SEED.
          </p>
          <p className="text-[120px] font-cinzel italic tracking-[0.4em] text-white opacity-90 leading-none">
            RESULT IS THE FRUIT.
          </p>
          <div className="pt-20">
            <h1 className="text-[200px] font-cinzel font-black tracking-tight text-[#D4AF37] leading-[0.9]">
              WE ARCHITECT<br />BOTH.
            </h1>
          </div>
        </div>
      </div>

      {/* 3. THE SIGNATURE (Subdued Watermark) */}
      <div className="absolute bottom-[200px] left-[400px] flex flex-col gap-8 opacity-60">
        <div className="flex items-baseline gap-10">
          <span className="font-gotu text-[150px] text-[#D4AF37]">कर्म</span>
          <div className="w-4 h-4 rounded-full bg-white shadow-[0_0_30px_#D4AF37] mb-6" />
          <span className="font-cinzel font-black text-[120px] text-white tracking-widest uppercase">Phal</span>
        </div>
        <p className="font-mono text-[30px] tracking-[0.8em] text-[#444] uppercase">
          PRIVATE DIGITAL HOUSE // SOVEREIGN_V16_4K
        </p>
      </div>

      {/* 4. CGI DEPTH (Radiance) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,rgba(212,175,55,0.08)_0%,transparent_60%)]" />
    </div>
  );
}
