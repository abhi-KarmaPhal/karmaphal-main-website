import re

page_path = "src/app/page.tsx"
jsx_path = "src/app/v12-jsx.txt"

with open(page_path, "r", encoding="utf-8") as f:
    page_content = f.read()

with open(jsx_path, "r", encoding="utf-8") as f:
    v12_jsx = f.read()

# 1. Add CSS Import
if 'import "./v12-sections.css";' not in page_content:
    page_content = page_content.replace('import DivineEmbers from "../components/DivineEmbers";\n', 'import DivineEmbers from "../components/DivineEmbers";\nimport "./v12-sections.css";\n')

# 2. Add useEffect logic
use_effect_logic = """
  // New useEffect for V12 HTML Vanilla Behaviors
  useEffect(() => {
    // 1. CURSOR
    const cd = document.getElementById("cd");
    const cr = document.getElementById("cr");
    let mx = window.innerWidth / 2, my = window.innerHeight / 2, rx = mx, ry = my;
    const moveCursor = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (cd) {
        cd.style.left = mx + "px";
        cd.style.top = my + "px";
      }
    };
    document.addEventListener("mousemove", moveCursor);
    let rafId: number;
    const animateCursor = () => {
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      if (cr) {
        cr.style.left = rx + "px";
        cr.style.top = ry + "px";
      }
      rafId = requestAnimationFrame(animateCursor);
    };
    animateCursor();

    const addHover = () => document.body.classList.add("hov");
    const removeHover = () => document.body.classList.remove("hov");
    const attachHoverEvents = () => {
      document.querySelectorAll("a, button, .sc, .mc, .tp, .tcard").forEach((el) => {
        el.addEventListener("mouseenter", addHover);
        el.addEventListener("mouseleave", removeHover);
      });
    };
    attachHoverEvents();

    // 2. NAV BEHAVIOR
    const nav = document.getElementById("nav");
    const LIGHT_SECS = ["manifesto", "services", "testimonials", "cta"];
    const secObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting || window.scrollY < 60) return;
        if (nav) nav.className = LIGHT_SECS.includes(e.target.id) ? "scrolled-light" : "scrolled-dark";
        document.body.classList.toggle("lit-cur", LIGHT_SECS.includes(e.target.id));
      });
    }, { threshold: 0.4 });
    document.querySelectorAll("section[id]").forEach((s) => secObs.observe(s));
    
    const handleScrollNav = () => {
      if (window.scrollY < 60) {
        if (nav) nav.className = "";
        document.body.classList.remove("lit-cur");
      }
    };
    window.addEventListener("scroll", handleScrollNav, { passive: true });

    // 3. REVEAL ENGINE
    function revealSection(el: Element) {
      if ((el as HTMLElement).dataset.rev) return;
      (el as HTMLElement).dataset.rev = "1";

      if (el.classList.contains("sdiv") || el.classList.contains("rv")) {
        el.classList.add("in");
        return;
      }
      if (el.id === "manifesto") {
        el.querySelector(".mf-eyebrow")?.classList.add("in");
        setTimeout(() => el.querySelector(".mf-intro")?.classList.add("in"), 100);
        el.querySelectorAll(".ml-wrap").forEach((w, i) => setTimeout(() => w.classList.add("in"), 250 + i * 130));
        setTimeout(() => el.querySelector(".mf-underline")?.classList.add("in"), 800);
        setTimeout(() => el.querySelector(".mf-body")?.classList.add("in"), 900);
        return;
      }
      if (el.id === "metrics") {
        el.querySelectorAll(".mr").forEach((c, i) => setTimeout(() => c.classList.add("in"), i * 120));
        setTimeout(() => el.querySelectorAll("[data-target]").forEach(countUp), 150);
        return;
      }
      if (el.id === "services") {
        el.querySelectorAll(".sr").forEach((c, i) => setTimeout(() => c.classList.add("in"), i * 90));
        return;
      }
      if (el.id === "trust") {
        el.querySelectorAll(".tp").forEach((t, i) => setTimeout(() => t.classList.add("in"), i * 150));
        return;
      }
      if (el.id === "testimonials") {
        el.querySelectorAll(".tcard").forEach((t, i) => setTimeout(() => t.classList.add("in"), i * 110));
        return;
      }
      if (el.id === "cta") {
        el.querySelector(".cta-tag")?.classList.add("in");
        setTimeout(() => el.querySelector(".cta-kick")?.classList.add("in"), 100);
        el.querySelectorAll(".cta-lw").forEach((c, i) => setTimeout(() => c.classList.add("in"), 250 + i * 120));
        setTimeout(() => el.querySelector(".cta-rule")?.classList.add("in"), 700);
        setTimeout(() => el.querySelector(".cta-body")?.classList.add("in"), 600);
        setTimeout(() => el.querySelector(".cta-btns")?.classList.add("in"), 800);
        setTimeout(() => el.querySelector(".cta-footer-deva")?.classList.add("in"), 1100);
        return;
      }
      el.classList.add("in");
    }

    function inView(el: Element) {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight + 120 && r.bottom > -120;
    }

    const WATCH = ".rv,.sdiv,#manifesto,#metrics,#services,#trust,#testimonials,#studio,#cta";
    function checkAll() {
      document.querySelectorAll(WATCH).forEach((el) => {
        if (!(el as HTMLElement).dataset.rev && inView(el)) revealSection(el);
      });
    }

    const checkInterval = setInterval(checkAll, 100);
    window.addEventListener("scroll", checkAll, { passive: true });

    // 4. COUNT UP
    function countUp(el: Element) {
      const htmlEl = el as HTMLElement;
      if (htmlEl.dataset.counted) return;
      htmlEl.dataset.counted = "1";
      const target = parseInt(htmlEl.dataset.target || "0") || 0;
      const suffix = htmlEl.dataset.suffix || "";
      if (!target) return;
      const dur = 2200;
      const start = performance.now();
      const run = (now: number) => {
        const p = Math.min((now - start) / dur, 1);
        el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target) + suffix;
        if (p < 1) requestAnimationFrame(run);
      };
      requestAnimationFrame(run);
    }

    // 5. PARALLAX
    const handleParallax = () => {
      const mf = document.getElementById("manifesto");
      if (mf) {
        const r = mf.getBoundingClientRect();
        const p = -r.top / (r.height + window.innerHeight);
        const g = mf.querySelector(".mf-ghost") as HTMLElement | null;
        const pg = mf.querySelector(".mf-pg") as HTMLElement | null;
        if (g) g.style.transform = `translateY(${p * 120}px)`;
        if (pg) pg.style.transform = `translateY(${p * 70}px)`;
      }
    };
    window.addEventListener("scroll", handleParallax, { passive: true });

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScrollNav);
      window.removeEventListener("scroll", checkAll);
      window.removeEventListener("scroll", handleParallax);
      clearInterval(checkInterval);
    };
  }, []);
"""

if "New useEffect for V12 HTML Vanilla Behaviors" not in page_content:
    page_content = page_content.replace('const handleReveal = useCallback(() => setRevealed(true), []);', 'const handleReveal = useCallback(() => setRevealed(true), []);\n' + use_effect_logic)

# 3. Replace JSX Payload Below Hero
# The target is everything from `{/* ═══════════════════════════════════════════\n          SECTION 2:` to `</footer>\n    </>\n  );\n}`
target_pattern = r'\{\/\* ═══════════════════════════════════════════\s*SECTION 2:.*?</>.*?\n\s*\);'
replacement = v12_jsx + "\n    </>\n  );"

if re.search(target_pattern, page_content, re.DOTALL):
    page_content = re.sub(target_pattern, lambda m: replacement, page_content, flags=re.DOTALL)

with open(page_path, "w", encoding="utf-8") as f:
    f.write(page_content)

print("page.tsx updated successfully.")
