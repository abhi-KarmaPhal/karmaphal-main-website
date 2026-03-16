"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const noop = () => {};

function SacredDivider() {
  return (
    <div className="flex items-center w-full max-w-2xl mx-auto gap-6 py-16 px-6">
      <motion.div
        initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
        viewport={{ once: true }} transition={{ duration: 1.6 }}
        onUpdate={noop}
        className="flex-1 h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.3))", transformOrigin: "left" }}
      />
      <span style={{ fontFamily: "var(--font-gotu), serif", fontSize: "1.4rem", color: "rgba(212,175,55,0.35)", filter: "drop-shadow(0 0 12px rgba(212,175,55,0.3))" }}>✦</span>
      <motion.div
        initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
        viewport={{ once: true }} transition={{ duration: 1.6 }}
        onUpdate={noop}
        className="flex-1 h-[1px]"
        style={{ background: "linear-gradient(90deg, rgba(212,175,55,0.3), transparent)", transformOrigin: "right" }}
      />
    </div>
  );
}

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-[#010101] overflow-x-hidden">

      {/* Grain */}
      <div className="fixed inset-0 z-[50] pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundRepeat: "repeat" }}
      />

      {/* ── HERO ── */}
      <section className="relative w-full min-h-[70vh] flex flex-col items-center justify-center text-center px-6 pt-32 pb-20 overflow-hidden">
        {/* Background geometry */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.06]">
          <svg viewBox="0 0 1000 1000" className="w-[100vh] h-[100vh]">
            <circle cx="500" cy="500" r="480" fill="none" stroke="#D4AF37" strokeWidth="0.6"/>
            <circle cx="500" cy="500" r="300" fill="none" stroke="#D4AF37" strokeWidth="0.4"/>
            <polygon points="500,120 820,700 180,700" fill="none" stroke="#D4AF37" strokeWidth="0.4"/>
            <polygon points="500,880 180,300 820,300" fill="none" stroke="#D4AF37" strokeWidth="0.4"/>
            {[0,45,90,135,180,225,270,315].map(a => (
              <ellipse key={a} cx="500" cy="350" rx="28" ry="95" fill="none" stroke="#D4AF37" strokeWidth="0.3" transform={`rotate(${a} 500 500)`}/>
            ))}
          </svg>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          onUpdate={noop}
          className="text-[9px] md:text-[11px] font-[var(--font-cinzel)] tracking-[0.5em] uppercase mb-8"
          style={{ color: "rgba(212,175,55,0.4)" }}
        >
          Our Story
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "none" }}
          transition={{ duration: 1.5, delay: 0.4 }}
          onUpdate={noop}
          className="font-[var(--font-cinzel)] font-bold text-white leading-tight mb-6"
          style={{ fontSize: "clamp(2rem, 6vw, 5rem)", letterSpacing: "0.05em", maxWidth: "700px" }}
        >
          Born from <span style={{ background: "linear-gradient(90deg, #D4AF37, #F9E2AF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>karma.</span><br />
          Built for yours.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          onUpdate={noop}
          className="font-[var(--font-cinzel)] leading-loose max-w-xl"
          style={{ fontSize: "clamp(0.75rem, 1.4vw, 1rem)", color: "rgba(192,192,192,0.5)", letterSpacing: "0.06em" }}
        >
          The name means what it says. Your actions have results. We are the architecture between the two.
        </motion.p>
      </section>

      <SacredDivider />

      {/* ── THE PHILOSOPHY ── */}
      <section className="relative z-10 w-full py-20 md:py-28 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            onUpdate={noop}
            className="text-[9px] md:text-[11px] font-[var(--font-cinzel)] tracking-[0.5em] uppercase mb-10"
            style={{ color: "rgba(212,175,55,0.4)" }}
          >
            The Philosophy
          </motion.p>

          {[
            {
              heading: "कर्मण्येवाधिकारस्ते",
              subheading: "You have the right to work, not the fruits alone.",
              body: "The Bhagavad Gita's most profound teaching isn't about detachment — it's about full presence. Do the work. Do it with everything. The result will follow. This is how we approach every project, every brand, every pixel.",
            },
            {
              heading: "Rooted in Bharat.",
              subheading: "Built for the world.",
              body: "India has one of the richest visual and philosophical traditions on earth. Sacred geometry, the divine ratio, mandalas, Sanskrit — these aren't decorations. They are mathematical truths. We bring that depth into modern digital work because the world deserves to see what Indian creativity looks like at its absolute best.",
            },
            {
              heading: "The private team model.",
              subheading: "Not an agency. Not a freelancer. Something better.",
              body: "Agencies have 50 clients. Freelancers disappear. An in-house team knows your voice, your vision, your audience — and is there every day. That's what KarmaPhal is. One dedicated team, working exclusively for the businesses who choose to work with us. Exclusive by design.",
            },
          ].map((block, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: i * 0.1 }}
              onUpdate={noop}
              className="mb-16 md:mb-20 pl-6 md:pl-10 relative"
              style={{ borderLeft: "1px solid rgba(212,175,55,0.12)" }}
            >
              <div
                className="absolute left-[-4px] top-2 w-2 h-2 rounded-full"
                style={{ background: "#D4AF37", boxShadow: "0 0 12px rgba(212,175,55,0.5)" }}
              />
              <h3
                className="font-[var(--font-gotu)] mb-2"
                style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.8rem)", color: "rgba(212,175,55,0.7)" }}
              >
                {block.heading}
              </h3>
              <p
                className="font-[var(--font-cinzel)] italic mb-4"
                style={{ fontSize: "clamp(0.7rem, 1.2vw, 0.9rem)", color: "rgba(212,175,55,0.45)", letterSpacing: "0.06em" }}
              >
                {block.subheading}
              </p>
              <p
                className="font-[var(--font-cinzel)] leading-loose"
                style={{ fontSize: "clamp(0.75rem, 1.2vw, 0.9rem)", color: "rgba(192,192,192,0.55)", letterSpacing: "0.04em" }}
              >
                {block.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <SacredDivider />

      {/* ── WHAT WE BELIEVE ── */}
      <section className="relative z-10 w-full py-20 md:py-28 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            onUpdate={noop}
            className="text-[9px] md:text-[11px] font-[var(--font-cinzel)] tracking-[0.5em] uppercase mb-14 text-center"
            style={{ color: "rgba(212,175,55,0.4)" }}
          >
            What We Believe
          </motion.p>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { belief: "Design is not decoration. It is communication.", },
              { belief: "Your brand should make people feel something before they read anything.", },
              { belief: "The best digital work is so natural, it's invisible.", },
              { belief: "Indian businesses deserve world-class design. Not world-class for India. World-class, full stop.", },
              { belief: "Speed without quality is noise. Quality without speed is irrelevant.", },
              { belief: "The work we do for you should make us both proud.", },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: i * 0.08 }}
                onUpdate={noop}
                className="flex gap-4 items-start py-5 px-2"
                style={{ borderBottom: "1px solid rgba(212,175,55,0.06)" }}
              >
                <span style={{ fontFamily: "var(--font-gotu), serif", color: "rgba(212,175,55,0.3)", fontSize: "1rem", flexShrink: 0, marginTop: "2px" }}>✦</span>
                <p
                  className="font-[var(--font-cinzel)] leading-loose"
                  style={{ fontSize: "clamp(0.7rem, 1.1vw, 0.85rem)", color: "rgba(192,192,192,0.6)", letterSpacing: "0.04em" }}
                >
                  {item.belief}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SacredDivider />

      {/* ── CTA ── */}
      <section className="relative z-10 w-full py-24 md:py-32 px-6 flex flex-col items-center text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          onUpdate={noop}
          className="font-[var(--font-cinzel)] font-bold text-white mb-6 leading-tight"
          style={{ fontSize: "clamp(1.6rem, 4vw, 3rem)", maxWidth: "600px", letterSpacing: "0.05em" }}
        >
          If this vision resonates with you,<br />
          <span style={{ background: "linear-gradient(90deg, #D4AF37, #F9E2AF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            let's build something extraordinary.
          </span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          onUpdate={noop}
          className="flex items-center gap-4 mt-8"
        >
          <Link
            href="/contact"
            className="relative overflow-hidden group text-[10px] md:text-xs font-[var(--font-cinzel)] font-bold tracking-[0.3em] uppercase px-10 py-4 transition-all duration-500 inline-block"
            style={{ background: "linear-gradient(135deg, #8A6D3B, #D4AF37, #C9963F)", color: "#010101" }}
          >
            <span className="relative z-10">Work With Us</span>
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "linear-gradient(135deg, #C9963F, #F9E2AF, #D4AF37)" }}/>
          </Link>
          <Link
            href="/services"
            className="text-[10px] font-[var(--font-cinzel)] tracking-[0.3em] uppercase px-8 py-4 transition-all duration-300"
            style={{ border: "1px solid rgba(212,175,55,0.3)", color: "rgba(212,175,55,0.6)" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(212,175,55,0.7)"; e.currentTarget.style.color = "#D4AF37"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(212,175,55,0.3)"; e.currentTarget.style.color = "rgba(212,175,55,0.6)"; }}
          >
            Our Services
          </Link>
        </motion.div>
      </section>


    </main>
  );
}
