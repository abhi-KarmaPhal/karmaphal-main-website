"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Sets up all GSAP ScrollTrigger animations for the V12 sections */
export function useScrollAnimations() {
    useEffect(() => {
        // Small delay to ensure DOM is painted
        const ctx = gsap.context(() => {
            // ── DIVIDERS ──
            gsap.utils.toArray<HTMLElement>(".sdiv").forEach((el) => {
                gsap.to(el, {
                    scaleX: 1,
                    duration: 1.4,
                    ease: "power3.out",
                    scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
                });
            });

            // ── MANIFESTO — REVEALING THE CORE ──
            const manifesto = document.getElementById("manifesto");
            const mfPin = manifesto?.querySelector(".mf-pin") as HTMLElement | null;
            if (manifesto && mfPin) {
                // Pin the section for 2x viewport scroll
                ScrollTrigger.create({
                    trigger: manifesto,
                    start: "top top",
                    end: "+=200%", // Extended for the dramatic reveal
                    pin: mfPin,
                    pinSpacing: true,
                });

                // Master timeline scrubbed to scroll
                const mfTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: manifesto,
                        start: "top top",
                        end: "+=200%",
                        scrub: 1,
                    },
                });

                // Ghost parallax (moves slower now)
                mfTl.to(manifesto.querySelector(".mf-ghost"), {
                    y: -100, ease: "none",
                }, 0);

                // Progress bar
                mfTl.to(manifesto.querySelector(".mf-progress"), {
                    width: "100%", duration: 1, ease: "none",
                }, 0);

                // Track mouse/scroll to move spotlight (simple vertical scrub for now)
                // We expand the clip-path of the statement mask to fully reveal it
                mfTl.to(manifesto.querySelector(".mf-statement-mask"), {
                    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                    duration: 0.5,
                    ease: "power2.inOut",
                }, 0.1);

                // Slowly reveal the spotlight glow behind it
                mfTl.to(manifesto.querySelector(".mf-spotlight"), {
                    opacity: 1,
                    duration: 0.3,
                    ease: "power1.inOut"
                }, 0.1);

                // Move the spotlight down as we read
                mfTl.fromTo(manifesto.querySelector(".mf-spotlight"),
                    { yPercent: -30 },
                    { yPercent: 30, duration: 0.5, ease: "none" },
                    0.1);

                // Reveal gold underline
                mfTl.to(manifesto.querySelector(".mf-underline"), {
                    opacity: 1, duration: 0.1, ease: "power2.out",
                }, 0.5);

                // Fade in ambient text elements as the light hits them
                mfTl.to(manifesto.querySelector(".mf-eyebrow"), {
                    opacity: 1, y: 0, duration: 0.1, ease: "power2.out",
                }, 0.05);

                mfTl.to(manifesto.querySelector(".mf-intro"), {
                    opacity: 1, y: 0, duration: 0.15, ease: "power2.out",
                }, 0.1);

                mfTl.to(manifesto.querySelector(".mf-bottom"), {
                    opacity: 1, y: 0, duration: 0.15, ease: "power2.out",
                }, 0.55);

                // THE CLIMAX: Flash Inversion when "THAT'S US." is fully revealed
                mfTl.to(manifesto.querySelector(".mf-flash"), {
                    opacity: 1,
                    duration: 0.05, // Instantaneous flash
                    ease: "expo.in"
                }, 0.7);

                // Toggle inverted class on the container for text color swaps
                mfTl.call(() => {
                    manifesto.classList.add("inverted");
                }, undefined, 0.72);

                // Reverse it if scrolling back up
                mfTl.call(() => {
                    manifesto.classList.remove("inverted");
                }, undefined, 0.69);
            }

            // ── METRICS — THE FINANCIAL LEDGER ──
            const metrics = document.getElementById("metrics");

            if (metrics) {
                // Animate each cell as it enters the viewport
                gsap.utils.toArray<HTMLElement>(".met-cell").forEach((cell) => {
                    // Fade up the top section (number)
                    gsap.to(cell.querySelector(".met-cell-num"), {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: cell,
                            start: "top 85%",
                        }
                    });

                    // Fade up the bottom section (text) slightly delayed
                    gsap.to(cell.querySelector(".met-cell-bot"), {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        delay: 0.1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: cell,
                            start: "top 85%",
                        }
                    });

                    // Count up animation
                    const numEl = cell.querySelector(".met-cell-num[data-target]") as HTMLElement | null;
                    if (numEl) {
                        const target = parseInt(numEl.dataset.target || "0") || 0;
                        const suffix = numEl.dataset.suffix || "";
                        if (target) {
                            ScrollTrigger.create({
                                trigger: cell,
                                start: "top 85%",
                                once: true,
                                onEnter: () => {
                                    const obj = { val: 0 };
                                    gsap.to(obj, {
                                        val: target,
                                        duration: 2,
                                        ease: "power3.out",
                                        onUpdate: () => {
                                            numEl.innerHTML = String(Math.round(obj.val));
                                        },
                                    });
                                },
                            });
                        }
                    }
                });
            }

            // ── SERVICES ──
            gsap.utils.toArray<HTMLElement>("#services .rv").forEach((el) => {
                gsap.to(el, {
                    opacity: 1, y: 0, duration: 1, ease: "power2.out",
                    scrollTrigger: { trigger: el, start: "top 80%" },
                });
            });
            gsap.utils.toArray<HTMLElement>(".sr").forEach((el, i) => {
                gsap.to(el, {
                    opacity: 1, y: 0, duration: 0.8, delay: i * 0.09, ease: "power3.out",
                    scrollTrigger: { trigger: el, start: "top 88%" },
                });
            });

            // ── TRUST ──
            gsap.utils.toArray<HTMLElement>("#trust .rv").forEach((el) => {
                gsap.to(el, {
                    opacity: 1, y: 0, duration: 1, ease: "power2.out",
                    scrollTrigger: { trigger: el, start: "top 80%" },
                });
            });
            gsap.utils.toArray<HTMLElement>(".tp").forEach((el, i) => {
                gsap.to(el, {
                    opacity: 1, x: 0, duration: 1, delay: i * 0.15, ease: "power3.out",
                    scrollTrigger: { trigger: el, start: "top 85%" },
                });
            });

            // ── TESTIMONIALS ──
            gsap.utils.toArray<HTMLElement>("#testimonials .rv").forEach((el) => {
                gsap.to(el, {
                    opacity: 1, y: 0, duration: 1, ease: "power2.out",
                    scrollTrigger: { trigger: el, start: "top 80%" },
                });
            });
            gsap.utils.toArray<HTMLElement>(".tcard").forEach((el, i) => {
                gsap.to(el, {
                    opacity: 1, y: 0, duration: 0.9, delay: i * 0.11, ease: "power3.out",
                    scrollTrigger: { trigger: el, start: "top 88%" },
                });
            });

            // ── STUDIO ──
            gsap.utils.toArray<HTMLElement>("#studio .rv").forEach((el) => {
                gsap.to(el, {
                    opacity: 1, y: 0, duration: 1, ease: "power2.out",
                    scrollTrigger: { trigger: el, start: "top 80%" },
                });
            });

            // Sanskrit river parallax
            const river = document.querySelector(".studio-river-txt");
            if (river) {
                gsap.to(river, {
                    x: -200, ease: "none",
                    scrollTrigger: { trigger: "#studio", start: "top bottom", end: "bottom top", scrub: 2 },
                });
            }

            // ── CTA ──
            const cta = document.getElementById("cta");
            if (cta) {
                gsap.to(cta.querySelector(".cta-tag"), {
                    opacity: 1, duration: 1,
                    scrollTrigger: { trigger: cta, start: "top 70%" },
                });
                gsap.to(cta.querySelector(".cta-kick"), {
                    opacity: 1, duration: 1, delay: 0.1,
                    scrollTrigger: { trigger: cta, start: "top 70%" },
                });

                // CTA big text lines
                cta.querySelectorAll(".cta-lw").forEach((wrap, i) => {
                    gsap.to(wrap.querySelector(".cta-lt"), {
                        y: 0, duration: 1.3, delay: 0.25 + i * 0.12, ease: "power3.out",
                        scrollTrigger: { trigger: cta, start: "top 65%" },
                    });
                });

                // Gold rule
                gsap.to(cta.querySelector(".cta-rule"), {
                    width: "clamp(80px,26vw,260px)", duration: 1.4, delay: 1.1, ease: "power3.out",
                    scrollTrigger: { trigger: cta, start: "top 65%" },
                });

                gsap.to(cta.querySelector(".cta-body"), {
                    opacity: 1, y: 0, duration: 1.1, delay: 0.4,
                    scrollTrigger: { trigger: cta, start: "top 65%" },
                });
                gsap.to(cta.querySelector(".cta-btns"), {
                    opacity: 1, duration: 1, delay: 0.6,
                    scrollTrigger: { trigger: cta, start: "top 65%" },
                });
                gsap.to(cta.querySelector(".cta-footer-deva"), {
                    opacity: 1, duration: 2, delay: 0.9,
                    scrollTrigger: { trigger: cta, start: "top 65%" },
                });
            }
        });

        return () => ctx.revert();
    }, []);
}
