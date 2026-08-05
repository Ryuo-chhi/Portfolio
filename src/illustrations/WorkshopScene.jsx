import { useState, lazy, Suspense, useEffect } from 'react'
import Robot from '../components/Robot'
import { getWorkshopRiveUrl } from '../lib/riveScene'

// Lazy load the Rive scene so that the Rive runtime is code-split
const RiveWorkshopScene = lazy(() => import('../components/RiveWorkshopScene'))
const riveUrl = getWorkshopRiveUrl()

/**
 * The main hero room scene.
 * Dynamically switches to Rive if the workshop.riv file is present.
 * Otherwise, falls back to the SVG graphic with interactive elements.
 */
export default function WorkshopScene({ className = '', onRobotClick, robotWaving }) {
  const [loadError, setLoadError] = useState(false)
  const [isNight, setIsNight] = useState(false)

  // Track the night theme dynamically for the Rive component
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

  // Fallback SVG implementation
  return <SvgWorkshopScene onRobotClick={onRobotClick} robotWaving={robotWaving} />
}

function SvgWorkshopScene({ onRobotClick, robotWaving }) {
  const [leaves, setLeaves] = useState([])
  const [steamy, setSteamy] = useState(false)

  const dropLeaf = () => {
    const id = Date.now()
    setLeaves((l) => [
      ...l,
      { id, x: 96 + Math.random() * 40, y: 300 + Math.random() * 20 },
    ])
    setTimeout(() => setLeaves((l) => l.filter((leaf) => leaf.id !== id)), 3600)
  }

  const puffSteam = () => {
    setSteamy(true)
    setTimeout(() => setSteamy(false), 4200)
  }

  return (
    <div className="relative w-full max-w-[720px] mx-auto">
      <svg
        viewBox="0 0 720 440"
        className="w-full h-auto"
        role="img"
        aria-label="A cozy workshop desk beside a window overlooking mountains, with plants, a coffee mug, monitors and a small robot"
      >
        <defs>
          <clipPath id="win">
            <rect x="410" y="34" width="250" height="168" rx="18" />
          </clipPath>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-sky)" />
            <stop
              offset="100%"
              stopColor="var(--color-ember-soft)"
              stopOpacity="0.45"
            />
          </linearGradient>
          <linearGradient id="lampLight" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor="var(--color-ember)"
              stopOpacity="0.35"
            />
            <stop
              offset="100%"
              stopColor="var(--color-ember)"
              stopOpacity="0"
            />
          </linearGradient>
        </defs>

        {/* ── wall ─────────────────────────────────────────── */}
        <rect x="0" y="0" width="720" height="348" fill="var(--color-cream)" />

        {/* ── window ───────────────────────────────────────── */}
        <g clipPath="url(#win)">
          <rect x="410" y="34" width="250" height="168" fill="url(#skyGrad)" />
          {/* far mountains */}
          <path
            d="M410 150 L470 82 L520 132 L565 92 L620 150 L660 118 L660 202 L410 202Z"
            fill="var(--color-sage-soft)"
            opacity="0.75"
          />
          <path
            d="M410 172 L462 118 L512 168 L560 128 L618 178 L660 152 L660 202 L410 202Z"
            fill="var(--color-sage)"
          />
          {/* snow and clouds keep fixed pale fills — on the night sky, cream
              resolves to navy and they vanish entirely */}
          <path
            d="M455 122 L462 118 L470 128 L462 132Z"
            fill="var(--color-snow)"
          />
          <path
            d="M553 133 L560 128 L568 139 L560 142Z"
            fill="var(--color-snow)"
          />
          {/* hills */}
          <path
            d="M410 186 Q470 168 530 190 T660 184 L660 202 L410 202Z"
            fill="var(--color-forest)"
          />

          {/* clouds */}
          <g className="anim-drift" style={{ animationDuration: "52s" }}>
            <g fill="var(--color-cloud)" opacity="0.9">
              <ellipse cx="440" cy="66" rx="22" ry="11" />
              <ellipse cx="456" cy="60" rx="15" ry="12" />
              <ellipse cx="426" cy="62" rx="12" ry="9" />
            </g>
          </g>
          <g
            className="anim-drift"
            style={{ animationDuration: "78s", animationDelay: "-30s" }}
          >
            <g fill="var(--color-cloud)" opacity="0.7">
              <ellipse cx="500" cy="98" rx="17" ry="8" />
              <ellipse cx="512" cy="94" rx="12" ry="9" />
            </g>
          </g>

          {/* birds */}
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
                <path
                  d="M6.8 -2 L10.4 -0.8 L6.8 0.4 Z"
                  fill="var(--color-ember)"
                />
                <path
                  d="M-1.4 -1.8 Q-8 -10 -15 -7.4 Q-8 -2.6 -1.4 -1.8 Z"
                  fill="var(--color-forest-deep)"
                  style={{
                    animation: "bird-flap-l 0.86s ease-in-out infinite",
                    transformOrigin: "-1.4px -1.8px",
                  }}
                />
                <path
                  d="M0.6 -1.8 Q-4.4 -11.4 2.4 -12.6 Q4.4 -6.4 0.6 -1.8 Z"
                  fill="var(--color-forest-deep)"
                  style={{
                    animation: "bird-flap-r 0.86s ease-in-out infinite",
                    transformOrigin: "0.6px -1.8px",
                  }}
                />
              </g>
            </g>
          ))}
        </g>
        {/* frame */}
        <rect
          x="410"
          y="34"
          width="250"
          height="168"
          rx="18"
          fill="none"
          stroke="var(--color-bark)"
          strokeWidth="7"
        />
        <path d="M535 38v160" stroke="var(--color-bark)" strokeWidth="5" />
        <path d="M414 118h242" stroke="var(--color-bark)" strokeWidth="5" />
        <rect
          x="398"
          y="200"
          width="274"
          height="12"
          rx="6"
          fill="var(--color-bark-light)"
        />

        {/* ── shelf with project boxes ─────────────────────── */}
        <rect
          x="46"
          y="112"
          width="230"
          height="11"
          rx="5.5"
          fill="var(--color-bark)"
        />
        <rect
          x="60"
          y="76"
          width="42"
          height="36"
          rx="8"
          fill="var(--color-ember)"
        />
        <rect
          x="66"
          y="84"
          width="30"
          height="4"
          rx="2"
          fill="var(--color-stamp)"
          opacity="0.4"
        />
        <rect
          x="112"
          y="66"
          width="34"
          height="46"
          rx="8"
          fill="var(--color-forest)"
        />
        <rect
          x="118"
          y="76"
          width="22"
          height="4"
          rx="2"
          fill="var(--color-sage-soft)"
        />
        <rect
          x="156"
          y="84"
          width="48"
          height="28"
          rx="8"
          fill="var(--color-sky)"
          stroke="var(--color-forest-deep)"
          strokeWidth="2"
        />
        <rect
          x="214"
          y="72"
          width="30"
          height="40"
          rx="8"
          fill="var(--color-sage)"
        />
        {/* tiny hanging plant on shelf */}
        <g
          className="anim-sway"
          style={{ animationDuration: "9s", transformOrigin: "258px 118px" }}
        >
          <path
            d="M258 112 q-10 16 -4 30 M258 112 q10 14 3 26"
            stroke="var(--color-sage)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* pinned sticky notes */}
        <g transform="rotate(-5 320 92)">
          <rect
            x="300"
            y="70"
            width="44"
            height="44"
            rx="4"
            fill="var(--color-ember-soft)"
          />
          <path
            d="M308 84h28M308 92h22M308 100h26"
            stroke="var(--color-bark)"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.6"
          />
        </g>
        <g transform="rotate(6 348 140)">
          <rect
            x="330"
            y="124"
            width="36"
            height="34"
            rx="4"
            fill="var(--color-sky)"
          />
          <path
            d="M337 136h22M337 144h16"
            stroke="var(--color-forest)"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.6"
          />
        </g>

        {/* ── desk ─────────────────────────────────────────── */}
        <rect
          x="30"
          y="316"
          width="660"
          height="20"
          rx="10"
          fill="var(--color-bark)"
        />
        <rect
          x="30"
          y="316"
          width="660"
          height="7"
          rx="3.5"
          fill="var(--color-bark-light)"
        />
        <rect
          x="84"
          y="336"
          width="16"
          height="86"
          rx="7"
          fill="var(--color-bark)"
        />
        <rect
          x="620"
          y="336"
          width="16"
          height="86"
          rx="7"
          fill="var(--color-bark)"
        />
        <rect x="0" y="420" width="720" height="20" fill="var(--color-sand)" />

        {/* lamp */}
        <g>
          <path
            d="M600 316v-58q0-18 -20 -18"
            stroke="var(--color-forest)"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />
          <path d="M556 226h48l-14 26h-20z" fill="var(--color-ember)" />
          <path
            d="M556 258 L604 258 L640 316 L520 316Z"
            fill="url(#lampLight)"
            className="anim-glow"
          />
        </g>

        {/* ── monitors ───────────────────────────────────────── */}
        <g>
          <g transform="rotate(-8 140 242)">
            <rect
              x="88"
              y="204"
              width="104"
              height="78"
              rx="10"
              fill="var(--color-forest-deep)"
            />
            <rect
              x="95"
              y="211"
              width="90"
              height="64"
              rx="6"
              fill="var(--color-sky)"
              opacity="0.9"
            />
            <path
              d="M104 258l18-20 14 14 13-18 20 24z"
              fill="var(--color-sage)"
              opacity="0.8"
            />
            <circle cx="160" cy="226" r="6.5" fill="var(--color-ember)" />
          </g>
          <path
            d="M140 282v22"
            stroke="var(--color-forest-deep)"
            strokeWidth="11"
          />
          <rect
            x="116"
            y="304"
            width="48"
            height="12"
            rx="6"
            fill="var(--color-bark-light)"
          />
        </g>

        <g>
          <rect
            x="204"
            y="176"
            width="176"
            height="112"
            rx="12"
            fill="var(--color-forest-deep)"
          />
          <rect
            x="212"
            y="184"
            width="160"
            height="96"
            rx="7"
            fill="var(--color-ink)" /* Used --color-ink instead of missing --color-screen */
          />
          <g
            fontFamily="var(--font-mono)"
            fontSize="9"
            fill="var(--color-sage-soft)"
          >
            <text x="222" y="202">
              const workshop = {"{"}
            </text>
            <text x="230" y="216" fill="var(--color-ember-soft)">
              craft: true,
            </text>
            <text x="230" y="230" fill="var(--color-sky)">
              coffee: 3,
            </text>
            <text x="222" y="244">
              {"}"}
            </text>
          </g>
          <rect
            x="222"
            y="252"
            width="7"
            height="11"
            fill="var(--color-ember)"
            className="anim-caret"
          />
          <path
            d="M292 288v20"
            stroke="var(--color-forest-deep)"
            strokeWidth="18"
          />
          <rect
            x="258"
            y="306"
            width="68"
            height="12"
            rx="6"
            fill="var(--color-bark-light)"
          />
        </g>

        {/* keyboard */}
        <g>
          <rect
            x="256"
            y="318"
            width="128"
            height="15"
            rx="5"
            fill="var(--color-cream)"
            stroke="var(--color-forest-deep)"
            strokeWidth="1.6"
          />
          <g fill="var(--color-ember)" opacity="0.8">
            {Array.from({ length: 11 }).map((_, i) => (
              <rect
                key={`k${i}`}
                x={262 + i * 11}
                y={321}
                width="7.5"
                height="4"
                rx="1.5"
              />
            ))}
          </g>
          <g fill="var(--color-forest-deep)" opacity="0.35">
            {Array.from({ length: 10 }).map((_, i) => (
              <rect
                key={`l${i}`}
                x={266 + i * 11}
                y={327.5}
                width="7.5"
                height="3.5"
                rx="1.5"
              />
            ))}
          </g>
        </g>

        {/* ── maker ──────────────────────────────────────────── */}
        {/* <Maker /> - TODO: Create Maker component if needed */}

        {/* ── coffee mug (clickable) ───────────────────────── */}
        <g
          onClick={puffSteam}
          style={{ cursor: "pointer" }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && puffSteam()}
          aria-label="Pour more steam into the coffee"
        >
          <rect
            x="514"
            y="292"
            width="34"
            height="28"
            rx="9"
            fill="var(--color-cream)"
            stroke="var(--color-forest-deep)"
            strokeWidth="2.4"
          />
          <path
            d="M548 300q12 0 12 8t-12 8"
            stroke="var(--color-forest-deep)"
            strokeWidth="2.4"
            fill="none"
          />
          <rect
            x="518"
            y="304"
            width="26"
            height="4"
            rx="2"
            fill="var(--color-ember)"
          />
          <g
            stroke="var(--color-ink-soft)"
            strokeWidth="2.6"
            strokeLinecap="round"
            fill="none"
          >
            {[0, 1, 2].map((i) => (
              <path
                key={i}
                d={`M${522 + i * 9} 292 q4 -8 0 -14`}
                style={{
                  animation: `steam ${
                    steamy ? 1.8 : 4.5
                  }s ease-out ${i * 0.55}s infinite`,
                  transformOrigin: `${522 + i * 9}px 292px`,
                }}
              />
            ))}
          </g>
        </g>

        {/* ── floor plant (clickable) ──────────────────────── */}
        <g
          onClick={dropLeaf}
          style={{ cursor: "pointer" }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && dropLeaf()}
          aria-label="Shake the plant and drop a leaf"
        >
          <path d="M96 420 l6 -52 h44 l6 52z" fill="var(--color-bark)" />
          <rect
            x="92"
            y="360"
            width="66"
            height="14"
            rx="7"
            fill="var(--color-bark-light)"
          />
          <g className="anim-sway" style={{ transformOrigin: "125px 362px" }}>
            <path
              d="M125 362 q-34 -22 -30 -62 q30 6 30 62z"
              fill="var(--color-sage)"
            />
            <path
              d="M125 362 q34 -18 32 -58 q-30 4 -32 58z"
              fill="var(--color-forest)"
            />
            <path
              d="M125 362 q-4 -46 4 -78 q14 30 -4 78z"
              fill="var(--color-sage-soft)"
            />
          </g>
        </g>

        {/* desk plant */}
        <g
          className="anim-sway"
          style={{ animationDuration: "8.5s", transformOrigin: "660px 316px" }}
        >
          <rect
            x="644"
            y="296"
            width="32"
            height="22"
            rx="7"
            fill="var(--color-ember)"
          />
          <path
            d="M660 296 q-18 -10 -16 -30 q16 6 16 30z"
            fill="var(--color-sage)"
          />
          <path
            d="M660 296 q18 -8 18 -28 q-18 4 -18 28z"
            fill="var(--color-forest)"
          />
        </g>

        {/* books */}
        <g>
          <rect
            x="586"
            y="292"
            width="9"
            height="26"
            rx="2.5"
            fill="var(--color-forest)"
          />
          <rect
            x="597"
            y="286"
            width="9"
            height="32"
            rx="2.5"
            fill="var(--color-ember)"
          />
          <rect
            x="608"
            y="296"
            width="9"
            height="22"
            rx="2.5"
            fill="var(--color-sky)"
          />
        </g>

        {/* falling leaves */}
        {leaves.map((leaf) => (
          <path
            key={leaf.id}
            d={`M${leaf.x} ${leaf.y} q10 -6 12 4 q-10 6 -12 -4z`}
            fill="var(--color-sage)"
            style={{ animation: "leaffall 3.4s ease-in forwards" }}
          />
        ))}
      </svg>

      {/* Bolt sits on the desk — DOM element so it can own focus + click */}
      <div
        role="button"
        tabIndex={0}
        onClick={onRobotClick}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onRobotClick() }}
        className="absolute left-[24.5%] bottom-[4.5%] w-[11%] transition-transform duration-500 ease-[cubic-bezier(0.33,0.02,0.24,1)] hover:-translate-y-2 focus-visible:-translate-y-2 cursor-pointer"
        aria-label="Say hello to Bolt, the workshop robot"
      >
        <Robot size={0} waving={robotWaving} className="w-full h-auto" />
      </div>
    </div>
  )
}
