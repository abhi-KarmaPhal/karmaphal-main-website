'use client';

/* ═══════════════════════════════════════════════════════
   SERVICE VISUALS — Animated SVG scenes per discipline.
   ALL coordinates pre-computed within viewBox 0 0 600 250.
   No scale transforms. No guessing. Every point in-bounds.
═══════════════════════════════════════════════════════ */

/* ── 01 BRAND IDENTITY ──
   Logo construction grid — circles, guides, and a geometric mark */
export function BrandVisual() {
  return (
    <svg className="svc-visual-svg" viewBox="0 0 600 250" preserveAspectRatio="xMidYMid meet" fill="none">
      <defs>
        <filter id="gB">
          <feGaussianBlur stdDeviation="5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <linearGradient id="grB" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F0D060" stopOpacity="1" />
          <stop offset="100%" stopColor="#8A6D3B" stopOpacity="0.8" />
        </linearGradient>
        <clipPath id="markClip">
          <rect x="230" y="45" width="140" height="160" />
        </clipPath>
      </defs>

      {/* ═══ CONSTRUCTION CIRCLES ═══ */}
      {/* Primary circle */}
      <circle cx="300" cy="125" r="80" stroke="#D4AF37" strokeWidth="0.7" strokeOpacity="0.2"
        className="svc-draw" style={{ strokeDasharray: 503, strokeDashoffset: 503, animationDelay: '0.1s' }} />
      {/* Secondary circle */}
      <circle cx="300" cy="125" r="55" stroke="#D4AF37" strokeWidth="0.6" strokeOpacity="0.15"
        className="svc-draw" style={{ strokeDasharray: 346, strokeDashoffset: 346, animationDelay: '0.3s' }} />
      {/* Inner circle */}
      <circle cx="300" cy="125" r="30" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.12"
        className="svc-draw" style={{ strokeDasharray: 189, strokeDashoffset: 189, animationDelay: '0.5s' }} />

      {/* Off-center construction circles (logo geometry) */}
      <circle cx="270" cy="110" r="45" stroke="#D4AF37" strokeWidth="0.4" strokeOpacity="0.08"
        className="svc-draw" style={{ strokeDasharray: 283, strokeDashoffset: 283, animationDelay: '0.4s' }} />
      <circle cx="330" cy="140" r="45" stroke="#D4AF37" strokeWidth="0.4" strokeOpacity="0.08"
        className="svc-draw" style={{ strokeDasharray: 283, strokeDashoffset: 283, animationDelay: '0.6s' }} />

      {/* ═══ GUIDE LINES ═══ (crosshairs + diagonals) */}
      <line x1="200" y1="125" x2="400" y2="125" stroke="#D4AF37" strokeWidth="0.4" strokeOpacity="0.1"
        className="svc-draw" style={{ strokeDasharray: 200, strokeDashoffset: 200, animationDelay: '0.7s' }} />
      <line x1="300" y1="30" x2="300" y2="220" stroke="#D4AF37" strokeWidth="0.4" strokeOpacity="0.1"
        className="svc-draw" style={{ strokeDasharray: 190, strokeDashoffset: 190, animationDelay: '0.8s' }} />
      <line x1="240" y1="55" x2="360" y2="195" stroke="#D4AF37" strokeWidth="0.3" strokeOpacity="0.07"
        className="svc-draw" style={{ strokeDasharray: 180, strokeDashoffset: 180, animationDelay: '0.9s' }} />
      <line x1="360" y1="55" x2="240" y2="195" stroke="#D4AF37" strokeWidth="0.3" strokeOpacity="0.07"
        className="svc-draw" style={{ strokeDasharray: 180, strokeDashoffset: 180, animationDelay: '1s' }} />

      {/* ═══ THE LOGO MARK ═══ — bold geometric monogram, reveals last */}
      <g filter="url(#gB)" className="svc-fade" style={{ animationDelay: '1.3s' }}>
        {/* Outer diamond */}
        <path d="M300,50 L365,125 L300,200 L235,125 Z" stroke="url(#grB)" strokeWidth="2.5" fill="none" />
        {/* Inner inverted diamond — creates interlocking effect */}
        <path d="M300,80 L340,125 L300,170 L260,125 Z" stroke="#D4AF37" strokeWidth="1.5" strokeOpacity="0.5" fill="none" />
        {/* Horizontal bar across center */}
        <line x1="252" y1="125" x2="348" y2="125" stroke="#D4AF37" strokeWidth="1.2" strokeOpacity="0.4" />
        {/* Center point */}
        <circle cx="300" cy="125" r="4" fill="#D4AF37" fillOpacity="0.8" className="svc-pulse" />
      </g>

      {/* ═══ TYPOGRAPHY SAMPLE — left side ═══ */}
      <g className="svc-fade" style={{ animationDelay: '1.8s' }}>
        <text x="65" y="90" fontFamily="Georgia, serif" fontSize="22" fill="#D4AF37" fillOpacity="0.2">Aa</text>
        <line x1="65" y1="105" x2="125" y2="105" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.12" />
        <line x1="65" y1="115" x2="110" y2="115" stroke="#D4AF37" strokeWidth="0.6" strokeOpacity="0.08" />
        <line x1="65" y1="123" x2="100" y2="123" stroke="#D4AF37" strokeWidth="0.4" strokeOpacity="0.06" />
      </g>

      {/* ═══ COLOR PALETTE — right side ═══ */}
      <g className="svc-fade" style={{ animationDelay: '2s' }}>
        <rect x="480" y="85" width="18" height="18" rx="2" fill="#D4AF37" fillOpacity="0.35" />
        <rect x="480" y="108" width="18" height="18" rx="2" fill="#8A6D3B" fillOpacity="0.3" />
        <rect x="480" y="131" width="18" height="18" rx="2" fill="#1a1a1a" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.2" />
        <rect x="480" y="154" width="18" height="18" rx="2" fill="#f5f0e8" fillOpacity="0.15" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.1" />
      </g>

      {/* Corner alignment marks */}
      <g className="svc-fade" style={{ animationDelay: '1.6s' }}>
        {/* Top-left */}
        <line x1="218" y1="45" x2="233" y2="45" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.15" />
        <line x1="220" y1="43" x2="220" y2="55" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.15" />
        {/* Top-right */}
        <line x1="367" y1="45" x2="382" y2="45" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.15" />
        <line x1="380" y1="43" x2="380" y2="55" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.15" />
        {/* Bottom-left */}
        <line x1="218" y1="205" x2="233" y2="205" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.15" />
        <line x1="220" y1="195" x2="220" y2="207" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.15" />
        {/* Bottom-right */}
        <line x1="367" y1="205" x2="382" y2="205" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.15" />
        <line x1="380" y1="195" x2="380" y2="207" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.15" />
      </g>

      {/* Measurement dots at circle intersections */}
      <circle cx="220" cy="125" r="2.5" fill="#D4AF37" fillOpacity="0.2" className="svc-pulse" style={{ animationDelay: '1.5s' }} />
      <circle cx="380" cy="125" r="2.5" fill="#D4AF37" fillOpacity="0.2" className="svc-pulse" style={{ animationDelay: '1.7s' }} />
      <circle cx="300" cy="45" r="2.5" fill="#D4AF37" fillOpacity="0.2" className="svc-pulse" style={{ animationDelay: '1.9s' }} />
      <circle cx="300" cy="205" r="2.5" fill="#D4AF37" fillOpacity="0.2" className="svc-pulse" style={{ animationDelay: '2.1s' }} />
    </svg>
  );
}

/* ── 02 WEBSITES & APPS ──
   Browser wireframe CENTERED. Phone on the right, fully separate. */
export function WebVisual() {
  // Browser: centered horizontally, fills most of the height
  // bx=165, by=15, bw=230, bh=185 → all within 0-600, 0-250
  return (
    <svg className="svc-visual-svg" viewBox="0 0 600 250" preserveAspectRatio="xMidYMid meet" fill="none">
      <defs>
        <filter id="gW">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* ─── BROWSER WINDOW ─── at (165, 15), 230×185 */}
      <g className="svc-fade" style={{ animationDelay: '0.2s' }}>
        {/* Frame */}
        <rect x="165" y="15" width="230" height="185" rx="5" stroke="#4EA8DE" strokeWidth="1.2" strokeOpacity="0.5" />
        {/* Title bar line */}
        <line x1="165" y1="35" x2="395" y2="35" stroke="#4EA8DE" strokeWidth="0.7" strokeOpacity="0.25" />
        {/* Traffic dots */}
        <circle cx="178" cy="25" r="2.5" fill="#4EA8DE" fillOpacity="0.4" />
        <circle cx="188" cy="25" r="2.5" fill="#4EA8DE" fillOpacity="0.25" />
        <circle cx="198" cy="25" r="2.5" fill="#4EA8DE" fillOpacity="0.15" />
        {/* URL bar */}
        <rect x="215" y="20" width="120" height="10" rx="3" stroke="#4EA8DE" strokeWidth="0.5" strokeOpacity="0.2" />

        {/* Hero section */}
        <rect x="178" y="45" width="204" height="42" rx="2" stroke="#4EA8DE" strokeWidth="0.7" strokeOpacity="0.22"
          className="svc-draw" style={{ strokeDasharray: 492, strokeDashoffset: 492, animationDelay: '0.5s' }} />
        {/* Hero text */}
        <line x1="186" y1="60" x2="270" y2="60" stroke="#4EA8DE" strokeWidth="2" strokeOpacity="0.3"
          className="svc-draw" style={{ strokeDasharray: 84, strokeDashoffset: 84, animationDelay: '0.8s' }} />
        <line x1="186" y1="70" x2="240" y2="70" stroke="#4EA8DE" strokeWidth="1" strokeOpacity="0.18"
          className="svc-draw" style={{ strokeDasharray: 54, strokeDashoffset: 54, animationDelay: '0.9s' }} />
        {/* CTA */}
        <rect x="186" y="76" width="38" height="9" rx="2" fill="#4EA8DE" fillOpacity="0.15"
          className="svc-fade" style={{ animationDelay: '1.1s' }} />

        {/* 3 Cards */}
        <rect x="178" y="98" width="63" height="48" rx="2" stroke="#4EA8DE" strokeWidth="0.6" strokeOpacity="0.18"
          className="svc-fade" style={{ animationDelay: '1s' }} />
        <rect x="248" y="98" width="63" height="48" rx="2" stroke="#4EA8DE" strokeWidth="0.6" strokeOpacity="0.18"
          className="svc-fade" style={{ animationDelay: '1.2s' }} />
        <rect x="318" y="98" width="63" height="48" rx="2" stroke="#4EA8DE" strokeWidth="0.6" strokeOpacity="0.18"
          className="svc-fade" style={{ animationDelay: '1.4s' }} />

        {/* Card shimmer lines */}
        <line x1="185" y1="130" x2="220" y2="130" stroke="#4EA8DE" strokeWidth="0.7" strokeOpacity="0.1"
          className="svc-draw" style={{ strokeDasharray: 35, strokeDashoffset: 35, animationDelay: '1.3s' }} />
        <line x1="255" y1="130" x2="290" y2="130" stroke="#4EA8DE" strokeWidth="0.7" strokeOpacity="0.1"
          className="svc-draw" style={{ strokeDasharray: 35, strokeDashoffset: 35, animationDelay: '1.5s' }} />
        <line x1="325" y1="130" x2="360" y2="130" stroke="#4EA8DE" strokeWidth="0.7" strokeOpacity="0.1"
          className="svc-draw" style={{ strokeDasharray: 35, strokeDashoffset: 35, animationDelay: '1.7s' }} />

        {/* Footer */}
        <rect x="178" y="158" width="204" height="30" rx="1" stroke="#4EA8DE" strokeWidth="0.4" strokeOpacity="0.08"
          className="svc-fade" style={{ animationDelay: '1.6s' }} />
      </g>

      {/* ─── PHONE ─── at (440, 50), 50×95 — clearly to the right */}
      <g className="svc-float" style={{ animationDelay: '0.8s' }}>
        <rect x="440" y="50" width="50" height="95" rx="6" stroke="#4EA8DE" strokeWidth="1" strokeOpacity="0.3" />
        <rect x="446" y="62" width="38" height="65" rx="2" stroke="#4EA8DE" strokeWidth="0.4" strokeOpacity="0.12" />
        <circle cx="465" cy="139" r="3" stroke="#4EA8DE" strokeWidth="0.4" strokeOpacity="0.15" />
        {/* Phone content */}
        <line x1="451" y1="74" x2="478" y2="74" stroke="#4EA8DE" strokeWidth="0.7" strokeOpacity="0.1" />
        <rect x="451" y="80" width="28" height="16" rx="1" stroke="#4EA8DE" strokeWidth="0.4" strokeOpacity="0.08" />
        <line x1="451" y1="103" x2="470" y2="103" stroke="#4EA8DE" strokeWidth="0.5" strokeOpacity="0.07" />
      </g>

      {/* Dashed connection */}
      <line x1="397" y1="108" x2="438" y2="98" stroke="#4EA8DE" strokeWidth="0.6" strokeOpacity="0.12" strokeDasharray="4 3"
        className="svc-fade" style={{ animationDelay: '2s' }} />

      {/* Cursor */}
      <g className="svc-fade" style={{ animationDelay: '1.8s' }}>
        <path d="M350,80 L350,94 L354,90.5 L357.5,97 L360,95.5 L356.5,89 L361,88 Z" fill="#4EA8DE" fillOpacity="0.35" filter="url(#gW)" />
      </g>

      {/* Code symbols */}
      <text x="80" y="130" fontFamily="monospace" fontSize="18" fill="#4EA8DE" fillOpacity="0.07" className="svc-float" style={{ animationDelay: '1.5s' }}>&lt;/&gt;</text>
      <text x="520" y="210" fontFamily="monospace" fontSize="14" fill="#4EA8DE" fillOpacity="0.05" className="svc-float" style={{ animationDelay: '2.5s' }}>&#123;&#125;</text>
    </svg>
  );
}

/* ── 03 CREATIVE CONTENT ──
   Film frame + play button + sound waves — all within bounds */
export function ContentVisual() {
  return (
    <svg className="svc-visual-svg" viewBox="0 0 600 250" preserveAspectRatio="xMidYMid meet" fill="none">
      <defs>
        <filter id="gC">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <linearGradient id="grC" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C060F0" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#7B2D8E" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      {/* Aspect ratio frame: x=150..450, y=20..230 */}
      <rect x="150" y="20" width="300" height="210" rx="3" stroke="#B44ADE" strokeWidth="0.8" strokeOpacity="0.2"
        className="svc-draw" style={{ strokeDasharray: 1020, strokeDashoffset: 1020, animationDelay: '0.3s' }} />

      {/* Letterbox bars */}
      <rect x="155" y="22" width="290" height="4" rx="1" fill="#B44ADE" fillOpacity="0.06" className="svc-fade" style={{ animationDelay: '0.2s' }} />
      <rect x="155" y="224" width="290" height="4" rx="1" fill="#B44ADE" fillOpacity="0.06" className="svc-fade" style={{ animationDelay: '0.2s' }} />

      {/* Play button — dead center at (300, 125) */}
      <g filter="url(#gC)">
        <circle cx="300" cy="125" r="28" stroke="url(#grC)" strokeWidth="2" fill="none"
          className="svc-draw" style={{ strokeDasharray: 176, strokeDashoffset: 176, animationDelay: '0.7s' }} />
        <circle cx="300" cy="125" r="36" stroke="#B44ADE" strokeWidth="0.6" strokeOpacity="0.12" fill="none" className="svc-pulse-ring" />
        <path d="M290,113 L316,125 L290,137 Z" fill="#B44ADE" fillOpacity="0.6" className="svc-fade" style={{ animationDelay: '1.2s' }} />
      </g>

      {/* Sound wave — LEFT at x=70..135 */}
      <g className="svc-fade" style={{ animationDelay: '1s' }}>
        {[16, 32, 44, 55, 38, 48, 24, 42, 18].map((h, i) => (
          <rect key={`wl-${i}`} x={70 + i * 8} y={125 - h / 2} width="3.5" height={h} rx="1.5"
            fill="#B44ADE" fillOpacity={0.12 + (i % 3) * 0.06}
            className="svc-wave" style={{ animationDelay: `${1.2 + i * 0.08}s` }} />
        ))}
      </g>

      {/* Sound wave — RIGHT at x=465..535 */}
      <g className="svc-fade" style={{ animationDelay: '1.2s' }}>
        {[28, 46, 20, 52, 34, 48, 26, 40, 55].map((h, i) => (
          <rect key={`wr-${i}`} x={465 + i * 8} y={125 - h / 2} width="3.5" height={h} rx="1.5"
            fill="#B44ADE" fillOpacity={0.12 + (i % 3) * 0.06}
            className="svc-wave" style={{ animationDelay: `${1.4 + i * 0.08}s` }} />
        ))}
      </g>

      {/* Film strip perfs — left edge of frame */}
      {[32, 68, 104, 140, 176, 212].map((y, i) => (
        <rect key={`fl-${i}`} x="153" y={y} width="10" height="7" rx="1" stroke="#B44ADE" strokeWidth="0.5" strokeOpacity="0.12"
          className="svc-fade" style={{ animationDelay: `${0.6 + i * 0.08}s` }} />
      ))}
      {/* Film strip perfs — right edge */}
      {[32, 68, 104, 140, 176, 212].map((y, i) => (
        <rect key={`fr-${i}`} x="437" y={y} width="10" height="7" rx="1" stroke="#B44ADE" strokeWidth="0.5" strokeOpacity="0.12"
          className="svc-fade" style={{ animationDelay: `${0.7 + i * 0.08}s` }} />
      ))}

      {/* Camera lens: centered at (100, 60) */}
      <g className="svc-float" style={{ animationDelay: '2s' }}>
        <circle cx="95" cy="60" r="12" stroke="#B44ADE" strokeWidth="0.6" strokeOpacity="0.18" />
        <circle cx="95" cy="60" r="6" stroke="#B44ADE" strokeWidth="0.4" strokeOpacity="0.12" />
        <circle cx="95" cy="60" r="2.5" fill="#B44ADE" fillOpacity="0.15" />
      </g>

      {/* REC dot at (170, 38) */}
      <g className="svc-pulse" style={{ animationDelay: '2s' }}>
        <circle cx="170" cy="38" r="3" fill="#B44ADE" fillOpacity="0.5" />
        <text x="177" y="42" fontFamily="monospace" fontSize="8" fill="#B44ADE" fillOpacity="0.3">REC</text>
      </g>
    </svg>
  );
}

/* ── 04 AI & SYSTEMS ──
   Neural network — all nodes within 80-520, 30-230 */
export function AIVisual() {
  const N = [
    { x: 300, y: 125, r: 7, m: true },
    { x: 200, y: 65, r: 4.5 },
    { x: 220, y: 190, r: 4 },
    { x: 400, y: 60, r: 4.5 },
    { x: 395, y: 195, r: 4 },
    { x: 120, y: 125, r: 3.5 },
    { x: 480, y: 120, r: 3.5 },
    { x: 155, y: 210, r: 3 },
    { x: 450, y: 215, r: 3 },
    { x: 280, y: 40, r: 3 },
    { x: 350, y: 220, r: 2.5 },
    { x: 530, y: 65, r: 2.5 },
    { x: 90, y: 80, r: 2.5 },
  ];

  const C = [
    [0,1],[0,2],[0,3],[0,4],[0,9],[0,10],
    [1,5],[1,9],[1,12],
    [2,5],[2,7],
    [3,6],[3,11],
    [4,6],[4,8],
    [5,12],[6,11],
    [7,2],[8,4],[9,3],[10,8],
  ];

  return (
    <svg className="svc-visual-svg" viewBox="0 0 600 250" preserveAspectRatio="xMidYMid meet" fill="none">
      <defs>
        <filter id="gA">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <linearGradient id="grA" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00F0C8" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#008C72" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      {/* Connection lines */}
      {C.map(([a, b], i) => (
        <line key={`c-${i}`}
          x1={N[a].x} y1={N[a].y} x2={N[b].x} y2={N[b].y}
          stroke="#00DEB8" strokeWidth="0.8" strokeOpacity="0.18"
          className="svc-draw"
          style={{
            strokeDasharray: Math.hypot(N[b].x - N[a].x, N[b].y - N[a].y),
            strokeDashoffset: Math.hypot(N[b].x - N[a].x, N[b].y - N[a].y),
            animationDelay: `${0.2 + i * 0.1}s`
          }}
        />
      ))}

      {/* Data pulses */}
      {[0, 2, 4, 6, 8, 12, 15].map((ci) => {
        const [a, b] = C[ci];
        return (
          <circle key={`p-${ci}`} r="2.5" fill="#00DEB8" fillOpacity="0.8" filter="url(#gA)">
            <animateMotion dur={`${2 + (ci % 3)}s`} repeatCount="indefinite" begin={`${1 + ci * 0.3}s`}
              path={`M${N[a].x},${N[a].y} L${N[b].x},${N[b].y}`} />
            <animate attributeName="opacity" values="0;0.8;0" dur={`${2 + (ci % 3)}s`} repeatCount="indefinite" begin={`${1 + ci * 0.3}s`} />
          </circle>
        );
      })}

      {/* Nodes */}
      {N.map((n, i) => (
        <g key={`n-${i}`} className="svc-fade" style={{ animationDelay: `${0.5 + i * 0.12}s` }}>
          {n.m && (
            <circle cx={n.x} cy={n.y} r={n.r + 10} stroke="#00DEB8" strokeWidth="0.6" strokeOpacity="0.15" className="svc-pulse-ring" />
          )}
          <circle cx={n.x} cy={n.y} r={n.r}
            fill={n.m ? "url(#grA)" : "#00DEB8"}
            fillOpacity={n.m ? 0.7 : 0.2 + (1 / (i + 1)) * 0.3}
            filter={n.m ? "url(#gA)" : undefined} />
          <circle cx={n.x} cy={n.y} r={n.r * 0.35} fill="#00DEB8" fillOpacity="0.6" />
        </g>
      ))}

      {/* Grid dots */}
      {Array.from({ length: 6 }).map((_, r) =>
        Array.from({ length: 12 }).map((_, c) => (
          <circle key={`g-${r}-${c}`} cx={50 + c * 46} cy={20 + r * 42} r="0.6" fill="#00DEB8" fillOpacity="0.05" />
        ))
      )}
    </svg>
  );
}

const VISUAL_MAP: Record<string, React.ComponentType> = {
  'mesh-1': BrandVisual,
  'mesh-2': WebVisual,
  'mesh-3': ContentVisual,
  'mesh-4': AIVisual,
};

export function ServiceVisual({ meshClass }: { meshClass: string }) {
  const Component = VISUAL_MAP[meshClass];
  return Component ? <Component /> : null;
}
