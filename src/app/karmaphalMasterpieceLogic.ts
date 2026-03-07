// ══ All logic extracted verbatim from karmaphal-masterpiece.html ══
// Call initKarmaPhal() once the component mounts.

export function initKarmaPhal() {

  /* ══ CURSOR ════════════════════════════════════════ */
  const cd = document.getElementById('cd')!;
  const cr = document.getElementById('cr')!;
  let mx = window.innerWidth / 2, my = window.innerHeight / 2, rx = mx, ry = my;
  document.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; cd.style.left = mx + 'px'; cd.style.top = my + 'px'; });
  (function ri() { rx += (mx - rx) * .1; ry += (my - ry) * .1; cr.style.left = rx + 'px'; cr.style.top = ry + 'px'; requestAnimationFrame(ri); })();
  document.querySelectorAll('a,button,.si,.mb,.mm,.tc').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hov'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hov'));
  });

  /* ══ GEOMETRY — delta-time based, truly smooth slow ═ */
  const gc = document.getElementById('gc') as HTMLCanvasElement;
  const gx = gc.getContext('2d')!;
  let gW = 0, gH = 0;
  function gr() { gW = gc.width = window.innerWidth; gH = gc.height = window.innerHeight; }
  window.addEventListener('resize', gr); gr();
  const RINGS = [
    { r: .66, spd: 2 * Math.PI / 200, op: .055, lw: .4, a: 0 },
    { r: .48, spd: -2 * Math.PI / 140, op: .11, lw: .38, a: 0 },
    { r: .29, spd: 2 * Math.PI / 90, op: .20, lw: .5, a: 0 },
  ];
  const PA = [0, 45, 90, 135, 180, 225, 270, 315];
  let prevT = 0;
  function dg(T: number) {
    requestAnimationFrame(dg);
    const dt = Math.min((T - prevT) / 1000, .05); prevT = T;
    gx.clearRect(0, 0, gW, gH);
    const cx = gW / 2, cy = gH / 2, B = Math.min(gW, gH);
    RINGS.forEach((ring, ri) => {
      ring.a += ring.spd * dt;
      gx.save(); gx.translate(cx, cy); gx.rotate(ring.a);
      gx.strokeStyle = `rgba(201,168,76,${ring.op})`; gx.lineWidth = ring.lw;
      const r = B * ring.r;
      if (ri === 0) {
        gx.beginPath(); gx.arc(0, 0, r, 0, Math.PI * 2); gx.stroke();
        gx.lineWidth = ring.lw * .35; gx.beginPath(); gx.arc(0, 0, r * .965, 0, Math.PI * 2); gx.stroke(); gx.lineWidth = ring.lw;
        [[0, r, 0, -r], [r, 0, -r, 0], [r * .7, r * .7, -r * .7, -r * .7], [r * .7, -r * .7, -r * .7, r * .7]].forEach(([x1, y1, x2, y2]) => { gx.beginPath(); gx.moveTo(x1, y1); gx.lineTo(x2, y2); gx.stroke(); });
      } else if (ri === 1) {
        [r, r * .79, r * .58].forEach(rr => { gx.beginPath(); gx.arc(0, 0, rr, 0, Math.PI * 2); gx.stroke(); });
        [[90, 210, 330], [270, 30, 150]].forEach(ang => {
          gx.beginPath();
          ang.forEach((a, i) => { const rad = a * Math.PI / 180; i === 0 ? gx.moveTo(Math.cos(rad) * r * .79, Math.sin(rad) * r * .79) : gx.lineTo(Math.cos(rad) * r * .79, Math.sin(rad) * r * .79); });
          gx.closePath(); gx.stroke();
        });
      } else {
        gx.beginPath(); gx.arc(0, 0, r, 0, Math.PI * 2); gx.stroke();
        gx.beginPath(); gx.arc(0, 0, r * .44, 0, Math.PI * 2); gx.stroke();
        PA.forEach(a => { const rad = a * Math.PI / 180; gx.save(); gx.rotate(rad); gx.beginPath(); gx.ellipse(0, -r * .56, r * .17, r * .52, 0, 0, Math.PI * 2); gx.stroke(); gx.restore(); });
        const bp = .28 + .28 * Math.sin(T / 1400);
        gx.beginPath(); gx.arc(0, 0, 3.5, 0, Math.PI * 2);
        gx.fillStyle = `rgba(201,168,76,${bp})`; gx.shadowColor = '#C9A84C'; gx.shadowBlur = 14; gx.fill(); gx.shadowBlur = 0;
      }
      gx.restore();
    });
  }
  requestAnimationFrame(dg);

  /* ══ EMBERS ════════════════════════════════════════ */
  const ec = document.getElementById('ec') as HTMLCanvasElement;
  const ex = ec.getContext('2d')!;
  let eW = 0, eH = 0;
  function er() { eW = ec.width = window.innerWidth; eH = ec.height = window.innerHeight; }
  window.addEventListener('resize', er); er();
  type Ember = { x: number; y: number; vx: number; vy: number; sz: number; life: number; max: number; ph: number };
  const pool: Ember[] = [];
  const mkE = (): Ember => ({ x: eW * .15 + Math.random() * eW * .7, y: eH + 8, vx: (Math.random() - .5) * .3, vy: .2 + Math.random() * .46, sz: .5 + Math.random() * 1.8, life: 0, max: .15 + Math.random() * .36, ph: Math.random() * Math.PI * 2 });
  let ls = 0;
  (function de(now: number) {
    requestAnimationFrame(de); ex.clearRect(0, 0, eW, eH);
    if (pool.length < 14 && now - ls > 620 + Math.random() * 900) { pool.push(mkE()); ls = now; }
    for (let i = pool.length - 1; i >= 0; i--) {
      const e = pool[i]; e.x += e.vx + Math.sin(e.life * 3 + e.ph) * .14; e.y -= e.vy; e.life += e.vy / eH;
      if (e.y < -12) { pool.splice(i, 1); continue; }
      const op = e.life < .12 ? (e.life / .12) * e.max : e.life > .72 ? ((1 - e.life) / .28) * e.max : e.max;
      const g = ex.createRadialGradient(e.x, e.y, 0, e.x, e.y, e.sz * 5);
      g.addColorStop(0, `rgba(201,168,76,${op})`); g.addColorStop(.5, `rgba(201,168,76,${op * .2})`); g.addColorStop(1, 'rgba(201,168,76,0)');
      ex.beginPath(); ex.arc(e.x, e.y, e.sz * 5, 0, Math.PI * 2); ex.fillStyle = g; ex.fill();
      ex.beginPath(); ex.arc(e.x, e.y, e.sz * .45, 0, Math.PI * 2); ex.fillStyle = `rgba(255,242,190,${op * 1.5})`; ex.fill();
    }
  })(0);

  /* ══ NAV + CURSOR LIGHT SWITCHING ══════════════════ */
  const nav = document.getElementById('nav')!;
  const LITS = ['manifesto', 'services', 'trust', 'cta'];
  const sObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const isLit = LITS.includes((e.target as HTMLElement).id);
      if (window.scrollY < 60) { nav.className = ''; document.body.classList.remove('lit-cur'); return; }
      nav.className = isLit ? 'lt' : 'dk';
      document.body.classList.toggle('lit-cur', isLit);
    });
  }, { threshold: .4 });
  document.querySelectorAll('section[id]').forEach(s => sObs.observe(s));
  window.addEventListener('scroll', () => {
    if (window.scrollY < 60) { nav.className = ''; document.body.classList.remove('lit-cur'); }
    else if (!nav.className) nav.className = 'dk';
  }, { passive: true });

  /* ══ SCROLL REVEALS ════════════════════════════════ */
  const rvObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target as HTMLElement;
      if (el.classList.contains('sdiv')) { el.classList.add('in'); return; }
      if (el.classList.contains('mlines')) {
        el.querySelectorAll('.line').forEach((l, i) => setTimeout(() => l.classList.add('in'), i * 115));
        setTimeout(() => document.querySelector('.mf-sub')?.classList.add('in'), 680);
      }
      el.querySelectorAll('.mb').forEach((m, i) => setTimeout(() => m.classList.add('in'), i * 150));
      el.querySelectorAll('.mm').forEach((m, i) => setTimeout(() => m.classList.add('in'), i * 130 + 300));
      el.querySelectorAll('.si').forEach((s, i) => setTimeout(() => s.classList.add('in'), i * 95));
      el.querySelectorAll('.tc').forEach((t, i) => setTimeout(() => t.classList.add('in'), i * 155));
      if (el.id === 'cta') {
        setTimeout(() => el.querySelector('.cta-kick')?.classList.add('in'), 100);
        el.querySelectorAll('.cta-lw').forEach((c, i) => setTimeout(() => c.classList.add('in'), i * 120 + 200));
        setTimeout(() => el.querySelector('.cta-body')?.classList.add('in'), 600);
        setTimeout(() => el.querySelector('.cta-btns')?.classList.add('in'), 800);
        setTimeout(() => el.querySelector('.cta-tag')?.classList.add('in'), 1100);
      }
      el.classList.add('in');
    });
  }, { threshold: .1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.rv,.mlines,.sdiv,#metrics,#services,#trust,#studio,#cta').forEach(el => rvObs.observe(el));

  /* ══ COUNT-UP NUMBERS ══════════════════════════════ */
  function countUp(el: Element) {
    const target = parseInt((el as HTMLElement).dataset.target!);
    const suffix = (el as HTMLElement).dataset.suffix || '';
    const dur = 1800; const start = performance.now();
    const run = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(ease * target) + suffix;
      if (p < 1) requestAnimationFrame(run);
    };
    requestAnimationFrame(run);
  }
  const numObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (!e.isIntersecting) return; e.target.querySelectorAll('[data-target]').forEach(countUp); numObs.unobserve(e.target); });
  }, { threshold: .3 });
  document.querySelectorAll('#metrics').forEach(s => numObs.observe(s));

  /* ══ MAGNETIC SERVICE ROWS ═════════════════════════ */
  document.querySelectorAll('.si').forEach(row => {
    row.addEventListener('mousemove', (e) => {
      const ev = e as MouseEvent;
      const r = (row as HTMLElement).getBoundingClientRect();
      const x = (ev.clientX - r.left - r.width / 2) / r.width;
      const y = (ev.clientY - r.top - r.height / 2) / r.height;
      (row as HTMLElement).style.transform = `translateY(${y * 4}px)`;
    });
    row.addEventListener('mouseleave', () => { (row as HTMLElement).style.transform = ''; });
  });

  /* ══ PARALLAX GHOST LETTERS ════════════════════════ */
  window.addEventListener('scroll', () => {
    const sy = window.scrollY;
    const ghost = document.querySelector('.mf-ghost') as HTMLElement;
    if (ghost) ghost.style.transform = `translateY(${sy * .22}px)`;
    document.querySelectorAll('.sw').forEach((w, i) => {
      (w as HTMLElement).style.transform = `translateX(${sy * (i % 2 === 0 ? .06 : -.06)}px)`;
    });
  }, { passive: true });
}
