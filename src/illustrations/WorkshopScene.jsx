import { useState, lazy, Suspense, useEffect } from 'react'
import Robot from '../components/Robot'
import { getWorkshopRiveUrl } from '../lib/riveScene'

// Lazy load the Rive scene so that the Rive runtime is code-split
const RiveWorkshopScene = lazy(() => import('../components/RiveWorkshopScene'))
const riveUrl = getWorkshopRiveUrl()

/**
 * The main hero room scene.
 * Dynamically switches to Rive if the workshop.riv file is present.
 * Otherwise, falls back to the richly detailed SVG graphic with interactive elements.
 */
export default function WorkshopScene({ className = '', onRobotClick, robotWaving }) {
  const [loadError, setLoadError] = useState(false)
  const [isNight, setIsNight] = useState(false)

  // Track the night theme dynamically
  useEffect(() => {
    const checkTheme = () => setIsNight(document.documentElement.classList.contains('night'))
    checkTheme()
    
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  if (riveUrl && !loadError) {
    return (
      <div className={`relative w-full aspect-[1.64] max-w-[720px] mx-auto ${className}`}>
        <Suspense fallback={<div className="w-full h-full bg-transparent" />}>
          <RiveWorkshopScene 
            src={riveUrl} 
            night={isNight}
            onRobotClick={onRobotClick}
            onError={() => setLoadError(true)}
          />
        </Suspense>
      </div>
    )
  }

  // High-fidelity SVG workshop scene
  return <SvgWorkshopScene onRobotClick={onRobotClick} robotWaving={robotWaving} isNight={isNight} />
}

function SvgWorkshopScene({ onRobotClick, robotWaving, isNight }) {
  const [leaves, setLeaves] = useState([])
  const [puffs, setPuffs] = useState([])
  const [lampOn, setLampOn] = useState(true)

  const dropLeaf = () => {
    const id = Date.now()
    setLeaves((l) => [
      ...l,
      { id, x: 80 + Math.random() * 40, y: 340 + Math.random() * 20 },
    ])
    setTimeout(() => setLeaves((l) => l.filter((leaf) => leaf.id !== id)), 3600)
  }

  const puffSteam = () => {
    const id = Date.now()
    setPuffs((prev) => [...prev, id])
    setTimeout(() => setPuffs((prev) => prev.filter((p) => p !== id)), 1900)
  }

  const toggleLamp = () => {
    setLampOn((prev) => !prev)
  }

  return (
    <div className="relative w-full max-w-[720px] mx-auto select-none">
      <svg
        viewBox="0 0 720 440"
        className="w-full h-auto drop-shadow-sm"
        role="img"
        aria-label="A cozy developer workshop with dual monitors, code editor, terminal, interactive desk lamp, coffee, and robot companion"
      >
        <defs>
          {/* Window clipping */}
          <clipPath id="winClip">
            <rect x="412" y="32" width="252" height="170" rx="18" />
          </clipPath>

          {/* Day Sky Gradient */}
          <linearGradient id="skyDayGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-sky)" />
            <stop offset="65%" stopColor="var(--color-sand)" />
            <stop offset="100%" stopColor="var(--color-ember-soft)" stopOpacity="0.6" />
          </linearGradient>

          {/* Night Sky Gradient */}
          <linearGradient id="skyNightGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#121b28" />
            <stop offset="70%" stopColor="#1e2c3d" />
            <stop offset="100%" stopColor="#283a4e" />
          </linearGradient>

          {/* Monitor Screen Backlight Glow */}
          <radialGradient id="screenBackGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-sky)" stopOpacity="0.28" />
            <stop offset="60%" stopColor="var(--color-sky)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="var(--color-sky)" stopOpacity="0" />
          </radialGradient>

          {/* Warm Ambient Lamp Glow */}
          <radialGradient id="lampWallGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-ember)" stopOpacity="0.45" />
            <stop offset="50%" stopColor="var(--color-ember)" stopOpacity="0.18" />
            <stop offset="100%" stopColor="var(--color-ember)" stopOpacity="0" />
          </radialGradient>

          {/* Desk Lamp Light Cone */}
          <linearGradient id="lampLightCone" x1="0.4" y1="0" x2="0.6" y2="1">
            <stop offset="0%" stopColor="var(--color-ember)" stopOpacity="0.5" />
            <stop offset="40%" stopColor="var(--color-ember)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--color-ember)" stopOpacity="0" />
          </linearGradient>

          {/* Desk Mat Pattern */}
          <pattern id="deskMatStitch" width="12" height="12" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="12" y2="0" stroke="var(--color-sage-soft)" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.3" />
          </pattern>
        </defs>

        {/* ── 1. Room Wall ─────────────────────────────────────────── */}
        <rect x="0" y="0" width="720" height="348" fill="var(--color-cream)" />

        {/* Ambient Backlight Glows on Wall */}
        <ellipse cx="292" cy="228" rx="140" ry="85" fill="url(#screenBackGlow)" />
        
        {/* Lamp ambient wall glow when turned on */}
        <circle 
          cx="580" 
          cy="240" 
          r="135" 
          fill="url(#lampWallGlow)" 
          className="transition-opacity duration-700 pointer-events-none"
          style={{ opacity: lampOn ? 1 : 0 }} 
        />

        {/* ── 2. Wall Blueprint / System Architecture Card ────────── */}
        <g transform="rotate(-2 80 50)">
          {/* Paper backing */}
          <rect x="42" y="16" width="124" height="82" rx="4" fill="var(--color-sand)" stroke="var(--color-ink)" strokeWidth="1.2" opacity="0.85" />
          {/* Grid lines inside blueprint */}
          <g stroke="var(--color-ink)" strokeWidth="0.4" opacity="0.15">
            <line x1="42" y1="36" x2="166" y2="36" />
            <line x1="42" y1="56" x2="166" y2="56" />
            <line x1="42" y1="76" x2="166" y2="76" />
            <line x1="73" y1="16" x2="73" y2="98" />
            <line x1="104" y1="16" x2="104" y2="98" />
            <line x1="135" y1="16" x2="135" y2="98" />
          </g>
          {/* Architecture sketch */}
          <rect x="50" y="26" width="24" height="14" rx="2" fill="var(--color-forest)" opacity="0.75" />
          <text x="62" y="35" fontSize="5" fontFamily="var(--font-mono)" fill="var(--color-snow)" textAnchor="middle" fontWeight="bold">UI</text>
          
          <path d="M74 33 H88" stroke="var(--color-ember)" strokeWidth="1.4" strokeDasharray="2 1" />
          
          <rect x="88" y="26" width="30" height="14" rx="2" fill="var(--color-forest-deep)" opacity="0.85" />
          <text x="103" y="35" fontSize="5" fontFamily="var(--font-mono)" fill="var(--color-sage-soft)" textAnchor="middle" fontWeight="bold">API</text>
          
          <path d="M118 33 H132" stroke="var(--color-ember)" strokeWidth="1.4" strokeDasharray="2 1" />
          
          <rect x="132" y="26" width="26" height="14" rx="2" fill="var(--color-sage)" opacity="0.8" />
          <text x="145" y="35" fontSize="5" fontFamily="var(--font-mono)" fill="var(--color-forest-deep)" textAnchor="middle" fontWeight="bold">DB</text>

          {/* Subtitle notes */}
          <text x="50" y="52" fontSize="5.5" fontFamily="var(--font-mono)" fill="var(--color-forest-deep)" fontWeight="bold">Toub POS</text>
          <text x="50" y="62" fontSize="4.5" fontFamily="var(--font-mono)" fill="var(--color-ink-soft)">auth • queue • telegram</text>
          <path d="M50 72 h65" stroke="var(--color-sage)" strokeWidth="1" />
          <circle cx="120" cy="72" r="2.5" fill="var(--color-ember)" />

          {/* Tape on top */}
          <rect x="88" y="12" width="32" height="8" rx="1.5" fill="var(--color-ember-soft)" opacity="0.85" />
        </g>

        {/* ── 3. Window with Day / Night Scene ────────────────────── */}
        <g clipPath="url(#winClip)">
          {/* Sky background */}
          <rect 
            x="412" 
            y="32" 
            width="252" 
            height="170" 
            fill={isNight ? "url(#skyNightGrad)" : "url(#skyDayGrad)"} 
          />

          {/* Stars & Moon (Night Mode) */}
          {isNight && (
            <g>
              {/* Moon */}
              <circle cx="620" cy="65" r="15" fill="#fef08a" opacity="0.9" />
              <circle cx="625" cy="61" r="14" fill="#1e2c3d" />
              {/* Stars */}
              {[
                { cx: 435, cy: 55, r: 1.2 },
                { cx: 470, cy: 45, r: 1.5 },
                { cx: 505, cy: 68, r: 1 },
                { cx: 535, cy: 48, r: 1.4 },
                { cx: 565, cy: 62, r: 1.2 },
                { cx: 585, cy: 45, r: 1.5 },
                { cx: 645, cy: 50, r: 1 },
              ].map((star, i) => (
                <circle 
                  key={i} 
                  cx={star.cx} 
                  cy={star.cy} 
                  r={star.r} 
                  fill="#ffffff" 
                  className="anim-glow" 
                  style={{ animationDelay: `${i * 0.7}s` }} 
                />
              ))}
            </g>
          )}

          {/* Far mountain silhouette */}
          <path
            d="M410 152 L468 86 L518 134 L565 96 L620 152 L664 122 L664 204 L410 204Z"
            fill="var(--color-sage-soft)"
            opacity={isNight ? "0.35" : "0.75"}
          />
          {/* Mid mountain silhouette */}
          <path
            d="M410 174 L462 120 L512 170 L560 130 L618 180 L664 154 L664 204 L410 204Z"
            fill="var(--color-sage)"
            opacity={isNight ? "0.55" : "1"}
          />
          {/* Snowcaps on peaks */}
          <path d="M455 124 L462 120 L470 130 L462 134Z" fill="var(--color-snow)" opacity="0.9" />
          <path d="M553 135 L560 130 L568 141 L560 144Z" fill="var(--color-snow)" opacity="0.9" />
          
          {/* Forefront hills */}
          <path
            d="M410 188 Q470 170 530 192 T664 186 L664 204 L410 204Z"
            fill="var(--color-forest)"
            opacity={isNight ? "0.75" : "1"}
          />

          {/* Drifting Day Clouds (Day Mode) */}
          {!isNight && (
            <>
              <g className="anim-drift" style={{ animationDuration: "52s" }}>
                <g fill="var(--color-cloud)" opacity="0.92">
                  <ellipse cx="440" cy="66" rx="22" ry="11" />
                  <ellipse cx="456" cy="60" rx="15" ry="12" />
                  <ellipse cx="426" cy="62" rx="12" ry="9" />
                </g>
              </g>
              <g className="anim-drift" style={{ animationDuration: "78s", animationDelay: "-30s" }}>
                <g fill="var(--color-cloud)" opacity="0.75">
                  <ellipse cx="500" cy="98" rx="17" ry="8" />
                  <ellipse cx="512" cy="94" rx="12" ry="9" />
                </g>
              </g>
              {/* Birds */}
              {[
                { y: 0, scale: 1, delay: "0s", dur: "26s" },
                { y: 30, scale: 0.7, delay: "-9s", dur: "34s" },
              ].map((b) => (
                <g
                  key={b.delay}
                  className="anim-bird"
                  style={{ animationDelay: b.delay, animationDuration: b.dur }}
                >
                  <g transform={`translate(430 ${64 + b.y}) scale(${b.scale})`}>
                    <g fill="var(--color-forest-deep)">
                      <ellipse cx="0" cy="0" rx="5.4" ry="3.1" />
                      <circle cx="4.6" cy="-1.8" r="2.5" />
                      <path d="M-4.8 -0.6 L-11 -3 L-9.6 1.6 Z" />
                    </g>
                    <path d="M6.8 -2 L10.4 -0.8 L6.8 0.4 Z" fill="var(--color-ember)" />
                    <path
                      d="M-1.4 -1.8 Q-8 -10 -15 -7.4 Q-8 -2.6 -1.4 -1.8 Z"
                      fill="var(--color-forest-deep)"
                      style={{ animation: "bird-flap-l 0.86s ease-in-out infinite", transformOrigin: "-1.4px -1.8px" }}
                    />
                    <path
                      d="M0.6 -1.8 Q-4.4 -11.4 2.4 -12.6 Q4.4 -6.4 0.6 -1.8 Z"
                      fill="var(--color-forest-deep)"
                      style={{ animation: "bird-flap-r 0.86s ease-in-out infinite", transformOrigin: "0.6px -1.8px" }}
                    />
                  </g>
                </g>
              ))}
            </>
          )}
        </g>

        {/* Window Wooden Frame */}
        <rect
          x="412"
          y="32"
          width="252"
          height="170"
          rx="18"
          fill="none"
          stroke="var(--color-bark)"
          strokeWidth="7"
        />
        {/* Muntin dividers */}
        <path d="M538 36v162" stroke="var(--color-bark)" strokeWidth="5" />
        <path d="M416 116h244" stroke="var(--color-bark)" strokeWidth="5" />
        {/* Window sill */}
        <rect x="400" y="198" width="276" height="13" rx="6.5" fill="var(--color-bark-light)" stroke="var(--color-ink)" strokeWidth="0.8" opacity="0.95" />

        {/* ── 4. Wall Shelf with Craft Tools & Plants (Top Left) ──── */}
        <rect x="180" y="112" width="210" height="11" rx="5.5" fill="var(--color-bark)" />
        <rect x="180" y="112" width="210" height="4" rx="2" fill="var(--color-bark-light)" />

        {/* Pencil/Stylus Cup on Shelf */}
        <rect x="194" y="80" width="22" height="32" rx="4" fill="var(--color-forest)" stroke="var(--color-ink)" strokeWidth="1" />
        <line x1="200" y1="80" x2="197" y2="65" stroke="var(--color-ember)" strokeWidth="3" strokeLinecap="round" />
        <line x1="205" y1="80" x2="206" y2="60" stroke="var(--color-sky)" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="210" y1="80" x2="213" y2="67" stroke="var(--color-sage-soft)" strokeWidth="2" strokeLinecap="round" />

        {/* Storage Jar with Coffee Beans */}
        <rect x="226" y="74" width="28" height="38" rx="6" fill="var(--color-sky)" stroke="var(--color-forest-deep)" strokeWidth="1.6" opacity="0.8" />
        <rect x="229" y="70" width="22" height="5" rx="2" fill="var(--color-bark-light)" />
        <circle cx="236" cy="88" r="3" fill="var(--color-bark)" />
        <circle cx="244" cy="85" r="3.2" fill="var(--color-bark)" />
        <circle cx="240" cy="94" r="3" fill="var(--color-bark)" />

        {/* Mini Potted Succulent with trailing vine on shelf */}
        <rect x="264" y="86" width="26" height="26" rx="5" fill="var(--color-ember)" stroke="var(--color-forest-deep)" strokeWidth="1.2" />
        <path d="M277 86 Q266 72 260 78 Q272 82 277 86 Z" fill="var(--color-sage)" />
        <path d="M277 86 Q288 72 294 78 Q282 82 277 86 Z" fill="var(--color-forest)" />
        {/* Trailing vine */}
        <g className="anim-sway" style={{ animationDuration: "8s", transformOrigin: "288px 112px" }}>
          <path d="M288 112 q-8 18 -3 32 M288 112 q8 16 2 28" stroke="var(--color-sage)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </g>

        {/* Reference Tech Books on Shelf */}
        <rect x="302" y="72" width="10" height="40" rx="2" fill="var(--color-forest-deep)" />
        <rect x="313" y="66" width="12" height="46" rx="2" fill="var(--color-ember)" />
        <rect x="326" y="76" width="9" height="36" rx="2" fill="var(--color-sage)" />
        <rect x="336" y="82" width="11" height="30" rx="2" fill="var(--color-sky)" />

        {/* Sticky Notes on Wall with Pins */}
        <g transform="rotate(-6 365 75)">
          <rect x="350" y="52" width="40" height="40" rx="4" fill="var(--color-ember-soft)" filter="drop-shadow(0 2px 3px rgba(0,0,0,0.08))" />
          <circle cx="370" cy="57" r="2.5" fill="var(--color-pin-head)" stroke="var(--color-pin-edge)" strokeWidth="0.8" />
          <text x="356" y="70" fontSize="5" fontFamily="var(--font-mono)" fill="var(--color-forest-deep)" fontWeight="bold">TODO</text>
          <text x="356" y="78" fontSize="4.2" fontFamily="var(--font-mono)" fill="var(--color-ink-soft)">✓ Toub POS API</text>
          <text x="356" y="85" fontSize="4.2" fontFamily="var(--font-mono)" fill="var(--color-ink-soft)">• Ship to booths</text>
        </g>
        <g transform="rotate(5 385 115)">
          <rect x="368" y="98" width="36" height="34" rx="4" fill="var(--color-sky)" filter="drop-shadow(0 2px 3px rgba(0,0,0,0.08))" />
          <circle cx="386" cy="103" r="2.5" fill="var(--color-sage)" stroke="var(--color-forest-deep)" strokeWidth="0.8" />
          <text x="373" y="116" fontSize="4.5" fontFamily="var(--font-mono)" fill="var(--color-forest-deep)" fontWeight="bold">MySQL</text>
          <text x="373" y="124" fontSize="3.8" fontFamily="var(--font-mono)" fill="var(--color-ink-soft)">Sequelize DB</text>
        </g>

        {/* ── 5. The Desk & Ground ─────────────────────────────────── */}
        {/* Main Desk Top Slab */}
        <rect x="24" y="316" width="672" height="20" rx="10" fill="var(--color-bark)" />
        {/* Beveled Top Edge highlight */}
        <rect x="24" y="316" width="672" height="6" rx="3" fill="var(--color-bark-light)" />
        
        {/* Desk Legs */}
        <rect x="76" y="336" width="16" height="86" rx="7" fill="var(--color-bark)" />
        <rect x="628" y="336" width="16" height="86" rx="7" fill="var(--color-bark)" />
        
        {/* Floor Ground */}
        <rect x="0" y="420" width="720" height="20" fill="var(--color-sand)" />

        {/* Desk Mat with Stitching */}
        <rect x="150" y="312" width="345" height="12" rx="4" fill="var(--color-forest-deep)" opacity="0.8" />
        <rect x="152" y="313" width="341" height="10" rx="3" fill="url(#deskMatStitch)" />

        {/* ── 6. Secondary Monitor (Live Terminal & Metrics) ───────── */}
        <g>
          {/* Angled Monitor group */}
          <g transform="rotate(-7 136 238)">
            {/* Monitor Stand Base & Stem */}
            <rect x="110" y="296" width="48" height="10" rx="5" fill="var(--color-bark-light)" />
            <rect x="131" y="274" width="10" height="24" rx="4" fill="var(--color-forest-deep)" />
            
            {/* Outer Bezel */}
            <rect x="84" y="196" width="104" height="82" rx="10" fill="var(--color-forest-deep)" stroke="var(--color-ink)" strokeWidth="1.2" />
            {/* Screen */}
            <rect x="90" y="202" width="92" height="70" rx="6" fill="#141d24" />
            
            {/* Terminal Window Header Bar */}
            <rect x="90" y="202" width="92" height="10" rx="6" fill="#1e2c38" />
            <circle cx="96" cy="207" r="1.8" fill="#ff5f56" />
            <circle cx="101" cy="207" r="1.8" fill="#ffbd2e" />
            <circle cx="106" cy="207" r="1.8" fill="#27c93f" />
            <text x="136" y="209" fontSize="4.2" fontFamily="var(--font-mono)" fill="var(--color-sage-soft)" textAnchor="middle">term — zsh</text>

            {/* Terminal Lines */}
            <text x="95" y="220" fontSize="4.5" fontFamily="var(--font-mono)" fill="var(--color-sage)">
              $ vite dev --host
            </text>
            <text x="95" y="228" fontSize="4.2" fontFamily="var(--font-mono)" fill="var(--color-ember-soft)">
              &gt; ready in 140ms
            </text>
            
            {/* Live DB connection status */}
            <circle cx="97" cy="237" r="2" fill="#22c55e" className="anim-glow" />
            <text x="103" y="239" fontSize="4.2" fontFamily="var(--font-mono)" fill="#4ade80" fontWeight="bold">
              DB: connected
            </text>
            
            <text x="95" y="249" fontSize="4" fontFamily="var(--font-mono)" fill="var(--color-sky)">
              GET /api/v1/stalls 200
            </text>
            <text x="95" y="257" fontSize="4" fontFamily="var(--font-mono)" fill="var(--color-sage-soft)">
              POST /auth/login 200
            </text>

            {/* Mini sound/metric wave bars */}
            <g transform="translate(142, 260)" fill="var(--color-ember)" opacity="0.85">
              <rect x="0" y="2" width="2" height="6" rx="1" />
              <rect x="4" y="0" width="2" height="8" rx="1" />
              <rect x="8" y="3" width="2" height="5" rx="1" />
              <rect x="12" y="1" width="2" height="7" rx="1" />
              <rect x="16" y="4" width="2" height="4" rx="1" />
            </g>
          </g>
        </g>

        {/* ── 7. Main Center Monitor (Craft VS Code IDE) ───────────── */}
        <g>
          {/* Monitor Stand Base & Arm */}
          <rect x="262" y="304" width="68" height="12" rx="6" fill="var(--color-bark-light)" />
          <path d="M292 284v22" stroke="var(--color-forest-deep)" strokeWidth="16" strokeLinecap="round" />

          {/* Outer Bezel */}
          <rect
            x="200"
            y="166"
            width="186"
            height="124"
            rx="12"
            fill="var(--color-forest-deep)"
            stroke="var(--color-ink)"
            strokeWidth="1.5"
            filter="drop-shadow(0 6px 12px rgba(0,0,0,0.18))"
          />
          {/* Main Code Screen */}
          <rect x="207" y="173" width="172" height="110" rx="7" fill="#161f28" />

          {/* IDE Window Top Titlebar */}
          <rect x="207" y="173" width="172" height="14" rx="7" fill="#202c38" />
          <circle cx="215" cy="180" r="2.2" fill="#ff5f56" />
          <circle cx="221" cy="180" r="2.2" fill="#ffbd2e" />
          <circle cx="227" cy="180" r="2.2" fill="#27c93f" />

          {/* Active Tab: workshop.js */}
          <rect x="238" y="175" width="64" height="11" rx="3" fill="#161f28" />
          <circle cx="244" cy="180.5" r="1.5" fill="var(--color-ember)" />
          <text x="250" y="183" fontSize="5.2" fontFamily="var(--font-mono)" fill="var(--color-snow)" fontWeight="bold">
            workshop.js
          </text>

          {/* Code Gutter & Line Numbers */}
          <g fontFamily="var(--font-mono)" fontSize="5.8" fill="var(--color-ink-soft)" opacity="0.6">
            <text x="214" y="200">1</text>
            <text x="214" y="213">2</text>
            <text x="214" y="226">3</text>
            <text x="214" y="239">4</text>
            <text x="214" y="252">5</text>
            <text x="214" y="265">6</text>
          </g>
          <line x1="222" y1="187" x2="222" y2="280" stroke="var(--color-forest-deep)" strokeWidth="0.8" opacity="0.6" />

          {/* High-Fidelity Code Content */}
          <g fontFamily="var(--font-mono)" fontSize="5.8">
            {/* Line 1 */}
            <text x="227" y="200">
              <tspan fill="var(--color-ember)" fontWeight="bold">const</tspan>
              <tspan fill="var(--color-sky)"> server </tspan>
              <tspan fill="var(--color-sage-soft)">=</tspan>
              <tspan fill="var(--color-ember-soft)"> express</tspan>
              <tspan fill="var(--color-sage-soft)">()</tspan>
            </text>

            {/* Line 2 */}
            <text x="227" y="213">
              <tspan fill="var(--color-sky)">server</tspan>
              <tspan fill="var(--color-sage-soft)">.</tspan>
              <tspan fill="var(--color-ember-soft)">use</tspan>
              <tspan fill="var(--color-sage-soft)">(</tspan>
              <tspan fill="var(--color-sage)">authMiddleware</tspan>
              <tspan fill="var(--color-sage-soft)">)</tspan>
            </text>

            {/* Line 3 */}
            <text x="227" y="226">
              <tspan fill="var(--color-sky)">server</tspan>
              <tspan fill="var(--color-sage-soft)">.</tspan>
              <tspan fill="var(--color-ember-soft)">get</tspan>
              <tspan fill="var(--color-sage-soft)">(</tspan>
              <tspan fill="var(--color-sage)">'/ship'</tspan>
              <tspan fill="var(--color-sage-soft)">, () </tspan>
              <tspan fill="var(--color-ember)" fontWeight="bold">=&gt;</tspan>
              <tspan fill="var(--color-sage-soft)"> &#123;</tspan>
            </text>

            {/* Line 4 */}
            <text x="235" y="239">
              <tspan fill="var(--color-ember)" fontWeight="bold">return</tspan>
              <tspan fill="var(--color-sage-soft)"> &#123; </tspan>
              <tspan fill="var(--color-ember-soft)">craft</tspan>
              <tspan fill="var(--color-sage-soft)">: </tspan>
              <tspan fill="#4ade80" fontWeight="bold">true</tspan>
              <tspan fill="var(--color-sage-soft)">, </tspan>
              <tspan fill="var(--color-ember-soft)">coffee</tspan>
              <tspan fill="var(--color-sage-soft)">: </tspan>
              <tspan fill="var(--color-sky)">3</tspan>
              <tspan fill="var(--color-sage-soft)"> &#125;</tspan>
            </text>

            {/* Line 5 */}
            <text x="227" y="252">
              <tspan fill="var(--color-sage-soft)">&#125;)</tspan>
            </text>

            {/* Line 6 */}
            <text x="227" y="265">
              <tspan fill="var(--color-sky)">server</tspan>
              <tspan fill="var(--color-sage-soft)">.</tspan>
              <tspan fill="var(--color-ember-soft)">listen</tspan>
              <tspan fill="var(--color-sage-soft)">(</tspan>
              <tspan fill="var(--color-sky)">8080</tspan>
              <tspan fill="var(--color-sage-soft)">)</tspan>
            </text>
          </g>

          {/* Animated Blinking Caret */}
          <rect x="272" y="259" width="4.5" height="7.5" fill="var(--color-ember)" className="anim-caret" />

          {/* Monitor Power LED on bottom chin */}
          <circle cx="293" cy="287" r="1.4" fill="var(--color-ember)" opacity="0.9" className="anim-glow" />
        </g>

        {/* ── 8. Mechanical Keyboard & Mouse ──────────────────────── */}
        <g>
          {/* Keyboard Chassis */}
          <rect
            x="248"
            y="315"
            width="134"
            height="18"
            rx="5"
            fill="var(--color-cream)"
            stroke="var(--color-forest-deep)"
            strokeWidth="1.6"
            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.12))"
          />

          {/* ESC key accent */}
          <rect x="253" y="318" width="8" height="4.5" rx="1.5" fill="var(--color-ember)" />

          {/* Function & Top row keycaps */}
          {Array.from({ length: 10 }).map((_, i) => (
            <rect
              key={`top-${i}`}
              x={263 + i * 11}
              y={318}
              width="8"
              height="4.5"
              rx="1.5"
              fill="var(--color-forest-deep)"
              opacity="0.75"
            />
          ))}

          {/* Home row keycaps */}
          {Array.from({ length: 11 }).map((_, i) => (
            <rect
              key={`mid-${i}`}
              x={253 + i * 11}
              y={324}
              width="8"
              height="4"
              rx="1.5"
              fill="var(--color-sage)"
              opacity="0.8"
            />
          ))}

          {/* Spacebar Accent & Bottom row */}
          <rect x="286" y="329" width="46" height="3" rx="1.5" fill="var(--color-ember)" />

          {/* Wireless Mouse */}
          <rect
            x="400"
            y="316"
            width="18"
            height="14"
            rx="7"
            fill="var(--color-cream)"
            stroke="var(--color-forest-deep)"
            strokeWidth="1.5"
            filter="drop-shadow(0 2px 3px rgba(0,0,0,0.1))"
          />
          {/* Mouse wheel */}
          <rect x="407.5" y="318" width="3" height="4.5" rx="1.5" fill="var(--color-ember)" />
        </g>

        {/* ── 9. Coffee Mug (Interactive Steam) ────────────────────── */}
        <g
          onClick={puffSteam}
          className="cursor-pointer group select-none"
          style={{ outline: 'none', WebkitTapHighlightColor: 'transparent' }}
          role="button"
          tabIndex={-1}
          aria-label="Click to puff warm coffee steam"
        >
          {/* Mug body */}
          <rect
            x="504"
            y="290"
            width="34"
            height="29"
            rx="9"
            fill="var(--color-cream)"
            stroke="var(--color-forest-deep)"
            strokeWidth="2.4"
            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.08))"
          />
          {/* Handle */}
          <path
            d="M538 297 q12 0 12 8 t-12 8"
            stroke="var(--color-forest-deep)"
            strokeWidth="2.4"
            fill="none"
          />
          {/* Warm decorative band */}
          <rect x="508" y="303" width="26" height="4.5" rx="2" fill="var(--color-ember)" />

          {/* High-visibility, compact coffee steam */}
          <g 
            stroke={isNight ? "rgba(226, 232, 240, 0.8)" : "rgba(87, 83, 78, 0.65)"} 
            strokeWidth="2.4" 
            strokeLinecap="round" 
            fill="none"
          >
            {/* Left gentle wisp */}
            <path
              d="M514 288 Q510 280 514 274"
              className="anim-steam"
              style={{ transformOrigin: "514px 288px" }}
            />
            {/* Center gentle wisp */}
            <path
              d="M521 288 Q526 278 521 270"
              className="anim-steam steam-delay-1"
              style={{ transformOrigin: "521px 288px" }}
            />
            {/* Right gentle wisp */}
            <path
              d="M528 288 Q525 280 529 275"
              className="anim-steam steam-delay-2"
              style={{ transformOrigin: "528px 288px" }}
            />

            {/* Extra puff particle when clicked without interrupting continuous steam */}
            {puffs.map((id) => (
              <g key={id} className="anim-steam-rise" style={{ transformOrigin: "521px 280px" }}>
                <path d="M517 280 Q521 273 525 268" strokeWidth="2.6" />
                <circle cx="521" cy="266" r="2.2" fill={isNight ? "rgba(226, 232, 240, 0.6)" : "rgba(87, 83, 78, 0.45)"} />
              </g>
            ))}
          </g>
        </g>

        {/* ── 10. Stack of Developer Notebooks ─────────────────────── */}
        <g>
          {/* Book 1 (Bottom, Forest Green) */}
          <rect x="580" y="292" width="10" height="26" rx="2.5" fill="var(--color-forest)" stroke="var(--color-forest-deep)" strokeWidth="1" />
          {/* Book 2 (Middle, Ember Orange) */}
          <rect x="592" y="284" width="10" height="34" rx="2.5" fill="var(--color-ember)" stroke="var(--color-forest-deep)" strokeWidth="1" />
          {/* Book 3 (Top, Sky Blue) */}
          <rect x="604" y="294" width="9" height="24" rx="2.5" fill="var(--color-sky)" stroke="var(--color-forest-deep)" strokeWidth="1" />
          {/* Bookmark ribbon */}
          <path d="M597 284 v-6 l2 2 2 -2 v6" fill="var(--color-forest-deep)" />
        </g>

        {/* ── 11. Desk Succulent Plant ─────────────────────────────── */}
        <g className="anim-sway" style={{ animationDuration: "8.5s", transformOrigin: "660px 316px" }}>
          {/* Pot */}
          <rect x="646" y="295" width="30" height="22" rx="6" fill="var(--color-ember)" stroke="var(--color-forest-deep)" strokeWidth="1.2" />
          {/* Succulent leaves */}
          <path d="M661 295 q-18 -10 -16 -30 q16 6 16 30z" fill="var(--color-sage)" />
          <path d="M661 295 q18 -8 18 -28 q-18 4 -18 28z" fill="var(--color-forest)" />
          <circle cx="661" cy="275" r="4" fill="var(--color-sage-soft)" />
        </g>

        {/* ── 12. Interactive Desk Lamp ────────────────────────────── */}
        <g
          onClick={toggleLamp}
          className="cursor-pointer group select-none"
          style={{ outline: 'none', WebkitTapHighlightColor: 'transparent' }}
          role="button"
          tabIndex={-1}
          aria-label={lampOn ? "Turn off desk lamp" : "Turn on desk lamp"}
        >
          {/* Gooseneck arm */}
          <path
            d="M604 316 v-64 q0 -24 -24 -28"
            stroke="var(--color-forest)"
            strokeWidth="5.5"
            fill="none"
            strokeLinecap="round"
          />
          {/* Symmetrical Lamp shade */}
          <path 
            d="M566 224 H594 L604 254 H556 Z" 
            fill={lampOn ? "var(--color-ember)" : "var(--color-forest-deep)"} 
            stroke="var(--color-forest-deep)" 
            strokeWidth="1.6"
            strokeLinejoin="round"
            className="transition-colors duration-500"
          />
          {/* Light bulb perfectly at middle center of the shade */}
          {lampOn && (
            <g>
              <circle cx="580" cy="242" r="7.5" fill="#fef08a" opacity="0.3" className="anim-glow" />
              <circle cx="580" cy="242" r="5" fill="#fef08a" stroke="var(--color-forest-deep)" strokeWidth="1.2" className="anim-glow" />
            </g>
          )}

          {/* Light cone radiating symmetrically from the lampshade onto the desk */}
          <path
            d="M556 254 L604 254 L654 316 L506 316 Z"
            fill="url(#lampLightCone)"
            className="transition-opacity duration-700 pointer-events-none"
            style={{ opacity: lampOn ? 1 : 0 }}
          />

          {/* Lamp switch base on desk */}
          <rect x="594" y="312" width="20" height="6" rx="3" fill="var(--color-forest-deep)" />
          <circle 
            cx="604" 
            cy="315" 
            r="2" 
            fill={lampOn ? "#22c55e" : "var(--color-ember)"} 
            className="transition-colors duration-300"
          />
        </g>

        {/* ── 13. Floor Plant (Interactive Falling Leaf) ───────────── */}
        <g
          onClick={dropLeaf}
          className="cursor-pointer group select-none"
          style={{ outline: 'none', WebkitTapHighlightColor: 'transparent' }}
          role="button"
          tabIndex={-1}
          aria-label="Click to drop a leaf from the floor plant"
        >
          {/* Planter pot */}
          <path d="M84 420 l6 -52 h46 l6 52z" fill="var(--color-bark)" stroke="var(--color-forest-deep)" strokeWidth="1.2" />
          <rect x="80" y="360" width="68" height="14" rx="7" fill="var(--color-bark-light)" />

          {/* Plant leaves */}
          <g className="anim-sway" style={{ transformOrigin: "114px 362px" }}>
            <path d="M114 362 q-36 -24 -32 -64 q32 6 32 64z" fill="var(--color-sage)" />
            <path d="M114 362 q36 -20 34 -60 q-32 4 -34 60z" fill="var(--color-forest)" />
            <path d="M114 362 q-4 -48 6 -82 q16 32 -6 82z" fill="var(--color-sage-soft)" />
          </g>
        </g>

        {/* Falling Leaves Animation Elements */}
        {leaves.map((leaf) => (
          <path
            key={leaf.id}
            d={`M${leaf.x} ${leaf.y} q10 -6 12 4 q-10 6 -12 -4z`}
            fill="var(--color-sage)"
            style={{ animation: "leaffall 3.4s ease-in forwards" }}
          />
        ))}
      </svg>

      {/* ── 14. Robot Mascot ("Bolt / Sequel") sitting proudly on Desk ─ */}
      <div
        role="button"
        tabIndex={0}
        onClick={onRobotClick}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onRobotClick() }}
        className="absolute left-[8%] bottom-[27.2%] w-[11.5%] transition-transform duration-500 ease-[cubic-bezier(0.33,0.02,0.24,1)] hover:-translate-y-2 focus-visible:-translate-y-2 cursor-pointer z-20"
        aria-label="Say hello to Sequel, the workshop robot mascot"
      >
        <Robot size={0} waving={robotWaving} bubbleAlign="left" className="w-full h-auto drop-shadow-sm" />
      </div>
    </div>
  )
}
