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

            // ── MANIFESTO — CINEMATIC TEXT STAGE ──
            const manifesto = document.getElementById("manifesto");
            const mfPin = manifesto?.querySelector(".mf-pin") as HTMLElement | null;
            if (manifesto && mfPin) {
                // Pin the section for 2x viewport scroll
                ScrollTrigger.create({
                    trigger: manifesto,
                    start: "top top",
                    end: "+=150%",
                    pin: mfPin,
                    pinSpacing: true,
                });

                // Master timeline scrubbed to scroll
                const mfTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: manifesto,
                        start: "top top",
                        end: "+=150%",
                        scrub: 1,
                    },
                });

                // Ghost parallax
                mfTl.to(manifesto.querySelector(".mf-ghost"), {
                    y: -150, ease: "none",
                }, 0);

                // Progress bar
                mfTl.to(manifesto.querySelector(".mf-progress"), {
                    width: "100%", duration: 1, ease: "none",
                }, 0);

                // Reveal sequence
                mfTl.to(manifesto.querySelector(".mf-eyebrow"), {
                    opacity: 1, y: 0, duration: 0.1, ease: "power2.out",
                }, 0.05);

                mfTl.to(manifesto.querySelector(".mf-intro"), {
                    opacity: 1, y: 0, duration: 0.1, ease: "power2.out",
                }, 0.1);

                // Cinematic word cascades
                const words = manifesto.querySelectorAll(".mf-word");
                words.forEach((word, i) => {
                    mfTl.to(word, {
                        opacity: 1, y: 0, duration: 0.15, ease: "power3.out",
                    }, 0.15 + i * 0.08);
                });

                // Gold underline
                mfTl.to(manifesto.querySelector(".mf-underline"), {
                    width: "clamp(100px,25vw,280px)", duration: 0.15, ease: "power3.out",
                }, 0.5);

                // Bottom footer content
                mfTl.to(manifesto.querySelector(".mf-bottom"), {
                    opacity: 1, y: 0, duration: 0.15, ease: "power2.out",
                }, 0.6);
            }

            // ── METRICS — HORIZONTAL SCROLL THEATER ──
            const metrics = document.getElementById("metrics");
            const metPin = metrics?.querySelector(".met-pin") as HTMLElement | null;
            const metTrack = metrics?.querySelector(".met-track") as HTMLElement | null;

            if (metrics && metPin && metTrack) {
                // Determine horizontal scroll distance
                const getScrollAmount = () => -(metTrack.scrollWidth - window.innerWidth + 100); // 100px padding buffer

                // Pin and scroll horizontally
                const metTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: metrics,
                        start: "top top",
                        end: () => `+=${getScrollAmount() * -1}`,
                        pin: metPin,
                        scrub: 1,
                        invalidateOnRefresh: true,
                        onUpdate: (self) => {
                            // Update dots based on progress
                            const dots = metrics.querySelectorAll(".met-dot");
                            const totalDots = dots.length;
                            const activeIndex = Math.min(
                                Math.floor(self.progress * totalDots),
                                totalDots - 1
                            );

                            dots.forEach((dot, i) => {
                                if (i === activeIndex) {
                                    dot.classList.add("active");
                                } else {
                                    dot.classList.remove("active");
                                }
                            });
                        }
                    }
                });

                // Move track horizontally
                metTl.to(metTrack, {
                    x: getScrollAmount,
                    ease: "none"
                }, 0);

                // Progress line
                metTl.to(metrics.querySelector(".met-progress"), {
                    width: "100%", ease: "none"
                }, 0);

                // Count-up animations when cards enter viewport
                metrics.querySelectorAll(".met-card-num[data-target]").forEach((el) => {
                    const htmlEl = el as HTMLElement;
                    const target = parseInt(htmlEl.dataset.target || "0") || 0;
                    const suffix = htmlEl.dataset.suffix || "";
                    if (!target) return;

                    ScrollTrigger.create({
                        trigger: el.closest(".met-card"),
                        start: "left 85%", // Trigger based on horizontal position (via a container trigger)
                        containerAnimation: metTl, // VERY IMPORTANT: tie it to the horizontal scroll timeline
                        once: true,
                        onEnter: () => {
                            const obj = { val: 0 };
                            gsap.to(obj, {
                                val: target, duration: 2, ease: "power3.out",
                                onUpdate: () => {
                                    el.innerHTML = Math.round(obj.val) + suffix;
                                },
                            });
                        },
                    });
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
