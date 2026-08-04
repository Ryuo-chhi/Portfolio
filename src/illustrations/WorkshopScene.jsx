import { useState } from 'react'
import Robot from '../components/Robot'

/**
 * The main hero room scene.
 * Contains interactive elements: the robot, the mug, the plant.
 */
export default function WorkshopScene({ className = '' }) {
  const [steamIntense, setSteamIntense] = useState(false)
  const [leafFalling, setLeafFalling] = useState(false)

  const handleMugClick = () => {
    setSteamIntense(true)
    setTimeout(() => setSteamIntense(false), 3000)
  }

  const handlePlantClick = () => {
    if (leafFalling) return
    setLeafFalling(true)
    setTimeout(() => setLeafFalling(false), 3500)
  }

  const handleKeydown = (e, handler) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handler()
    }
  }

  return (
    <div className={`relative w-full aspect-[1.64] max-w-[720px] mx-auto ${className}`}>
      <svg
        viewBox="0 0 720 440"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
        aria-hidden="true"
      >
        {/* Background / Wall */}
        <rect width="720" height="440" fill="transparent" />

        {/* Window */}
        <g>
          {/* Frame Outer */}
          <rect x="420" y="40" width="220" height="160" rx="8" fill="var(--color-bark)" stroke="var(--color-ink)" strokeWidth="4" />
          {/* Glass */}
          <rect x="428" y="48" width="204" height="144" rx="4" fill="var(--color-sky)" stroke="var(--color-ink)" strokeWidth="3" />
          
          <g style={{ clipPath: 'url(#window-clip)' }}>
            {/* Mountains */}
            <path d="M400 192 L470 120 L550 192 Z" fill="var(--color-sage-soft)" stroke="var(--color-ink)" strokeWidth="2" strokeLinejoin="round" />
            <path d="M470 120 L505 155 L435 155 Z" fill="var(--color-cream)" stroke="var(--color-ink)" strokeWidth="2" strokeLinejoin="round" />
            
            <path d="M510 192 L580 90 L650 192 Z" fill="var(--color-sage)" stroke="var(--color-ink)" strokeWidth="2" strokeLinejoin="round" />
            <path d="M580 90 L615 140 L545 140 Z" fill="var(--color-cream)" stroke="var(--color-ink)" strokeWidth="2" strokeLinejoin="round" />
            
            {/* Clouds */}
            <path className="anim-drift-slow" d="M450 80 Q460 70 470 80 Q485 75 495 85 Q500 95 490 100 H440 Q430 90 450 80 Z" fill="var(--color-cream)" opacity="0.8" />
            <path className="anim-drift-fast" d="M550 110 Q560 100 570 110 Q585 105 595 115 Q600 125 590 130 H540 Q530 120 550 110 Z" fill="var(--color-cream)" opacity="0.6" />
            
            {/* Bird */}
            <g className="anim-flyby">
              <path className="anim-flap" d="M0 0 Q 5 -5 10 0 Q 5 5 0 0 M10 0 Q 15 -5 20 0 Q 15 5 10 0" fill="none" stroke="var(--color-ink)" strokeWidth="2" strokeLinecap="round" />
            </g>
          </g>

          {/* Window Sill */}
          <rect x="410" y="196" width="240" height="12" rx="4" fill="var(--color-bark-light)" stroke="var(--color-ink)" strokeWidth="4" />
        </g>

        {/* Shelf */}
        <g>
          <rect x="60" y="80" width="260" height="12" rx="4" fill="var(--color-bark)" stroke="var(--color-ink)" strokeWidth="4" />
          {/* Boxes on shelf */}
          <rect x="80" y="50" width="40" height="30" rx="2" fill="var(--color-ember)" stroke="var(--color-ink)" strokeWidth="3" strokeLinejoin="round" />
          <rect x="130" y="40" width="20" height="40" rx="2" fill="var(--color-sage)" stroke="var(--color-ink)" strokeWidth="3" strokeLinejoin="round" />
          <rect x="160" y="60" width="50" height="20" rx="2" fill="var(--color-sky)" stroke="var(--color-ink)" strokeWidth="3" strokeLinejoin="round" />
          {/* Books */}
          <rect x="230" y="30" width="14" height="50" rx="2" fill="var(--color-forest)" stroke="var(--color-ink)" strokeWidth="3" strokeLinejoin="round" transform="rotate(10 230 80)" />
          <rect x="250" y="30" width="14" height="50" rx="2" fill="var(--color-sage-soft)" stroke="var(--color-ink)" strokeWidth="3" strokeLinejoin="round" transform="rotate(15 250 80)" />
        </g>

        {/* Hanging Plant */}
        <g className="anim-sway" style={{ transformOrigin: '330px -10px' }}>
          <path d="M330 -10 V60" stroke="var(--color-ink)" strokeWidth="2" />
          <path d="M310 60 Q330 90 350 60 Z" fill="var(--color-forest)" stroke="var(--color-ink)" strokeWidth="3" strokeLinejoin="round" />
          {/* Hanging leaves */}
          <path d="M315 65 Q310 90 320 110" fill="none" stroke="var(--color-sage)" strokeWidth="4" strokeLinecap="round" />
          <path d="M345 65 Q350 80 340 100" fill="none" stroke="var(--color-sage)" strokeWidth="4" strokeLinecap="round" />
        </g>

        {/* Pinned Notes */}
        <g>
          <rect x="70" y="140" width="40" height="40" fill="var(--color-ember-soft)" stroke="var(--color-ink)" strokeWidth="2" transform="rotate(-5 90 160)" />
          <circle cx="85" cy="145" r="3" fill="var(--color-pin-head)" stroke="var(--color-pin-edge)" strokeWidth="1.5" />
          
          <rect x="130" y="150" width="45" height="35" fill="var(--color-sky)" stroke="var(--color-ink)" strokeWidth="2" transform="rotate(8 152 167)" />
          <circle cx="152" cy="155" r="3" fill="var(--color-pin-head)" stroke="var(--color-pin-edge)" strokeWidth="1.5" />
        </g>

        {/* Desk */}
        <g>
          {/* Desk Legs */}
          <rect x="100" y="280" width="16" height="160" fill="var(--color-bark-light)" stroke="var(--color-ink)" strokeWidth="4" />
          <rect x="600" y="280" width="16" height="160" fill="var(--color-bark-light)" stroke="var(--color-ink)" strokeWidth="4" />
          {/* Desk Top */}
          <rect x="40" y="260" width="640" height="20" rx="4" fill="var(--color-bark)" stroke="var(--color-ink)" strokeWidth="4" />
        </g>

        {/* Monitor 1 (Main) */}
        <g>
          {/* Stand */}
          <path d="M260 260 L240 210 H320 L300 260 Z" fill="var(--color-ink-soft)" stroke="var(--color-ink)" strokeWidth="3" strokeLinejoin="round" />
          <rect x="220" y="254" width="120" height="6" rx="2" fill="var(--color-ink)" />
          {/* Screen */}
          <rect x="140" y="100" width="240" height="140" rx="8" fill="var(--color-ink)" stroke="var(--color-ink)" strokeWidth="4" />
          {/* Code */}
          <rect x="150" y="110" width="150" height="8" rx="4" fill="var(--color-sage)" />
          <rect x="150" y="126" width="100" height="8" rx="4" fill="var(--color-sky)" />
          <rect x="160" y="142" width="180" height="8" rx="4" fill="var(--color-ember)" />
          <rect x="160" y="158" width="120" height="8" rx="4" fill="var(--color-cream)" opacity="0.6" />
          <rect x="150" y="174" width="80" height="8" rx="4" fill="var(--color-sky)" />
          {/* Caret */}
          <rect x="238" y="174" width="8" height="10" fill="var(--color-ember)" className="anim-caret" />
        </g>

        {/* Monitor 2 (Vertical/Tilted) */}
        <g transform="translate(390, 120) rotate(8)">
          <path d="M70 140 L60 100 H100 L90 140 Z" fill="var(--color-ink-soft)" stroke="var(--color-ink)" strokeWidth="3" strokeLinejoin="round" />
          <rect x="50" y="136" width="60" height="4" rx="2" fill="var(--color-ink)" />
          <rect x="30" y="20" width="100" height="140" rx="6" fill="var(--color-ink)" stroke="var(--color-ink)" strokeWidth="4" />
          {/* Chart */}
          <rect x="40" y="120" width="16" height="30" rx="2" fill="var(--color-sage)" />
          <rect x="62" y="90" width="16" height="60" rx="2" fill="var(--color-sky)" />
          <rect x="84" y="60" width="16" height="90" rx="2" fill="var(--color-ember)" />
        </g>

        {/* Keyboard */}
        <g transform="translate(180, 245) rotate(-2)">
          <rect x="0" y="0" width="160" height="40" rx="4" fill="var(--color-cream)" stroke="var(--color-ink)" strokeWidth="3" />
          <rect x="10" y="10" width="20" height="20" rx="2" fill="var(--color-ink-soft)" />
          <rect x="35" y="10" width="20" height="20" rx="2" fill="var(--color-ink-soft)" />
          <rect x="60" y="10" width="20" height="20" rx="2" fill="var(--color-ember)" />
          <rect x="85" y="10" width="65" height="20" rx="2" fill="var(--color-ink-soft)" />
        </g>

        {/* Lamp */}
        <g>
          <path d="M520 260 L540 160 L480 100" fill="none" stroke="var(--color-ink)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="520" cy="260" r="14" fill="var(--color-forest-deep)" stroke="var(--color-ink)" strokeWidth="3" />
          <path d="M480 100 L440 130" stroke="var(--color-ink)" strokeWidth="6" strokeLinecap="round" />
          <path d="M430 110 L470 150 L450 160 L410 120 Z" fill="var(--color-sage)" stroke="var(--color-ink)" strokeWidth="3" strokeLinejoin="round" />
          {/* Light cone */}
          <path d="M440 140 L300 260 L480 260 Z" fill="url(#lamp-glow)" className="anim-glow" style={{ mixBlendMode: 'overlay' }} />
        </g>

        {/* Maker (The human) */}
        <g>
          {/* Shoulders / Body */}
          <path d="M500 440 Q500 320 580 320 Q660 320 660 440 Z" fill="var(--color-forest)" stroke="var(--color-ink)" strokeWidth="4" strokeLinejoin="round" />
          {/* Head */}
          <circle cx="580" cy="280" r="45" fill="var(--color-ember-soft)" stroke="var(--color-ink)" strokeWidth="4" />
          {/* Hair */}
          <path d="M535 280 Q535 210 580 210 Q625 210 625 280 Q625 240 580 240 Q535 240 535 280 Z" fill="var(--color-ink)" stroke="var(--color-ink)" strokeWidth="2" strokeLinejoin="round" />
          {/* Glasses */}
          <rect x="540" y="260" width="30" height="20" rx="4" fill="none" stroke="var(--color-ink)" strokeWidth="3" />
          <path d="M570 270 H625" stroke="var(--color-ink)" strokeWidth="3" />
          {/* Eye */}
          <g className="anim-blink">
            <circle cx="555" cy="270" r="3" fill="var(--color-ink)" />
          </g>
          {/* Arm reaching out */}
          <path d="M520 340 Q460 360 420 310" fill="none" stroke="var(--color-forest)" strokeWidth="24" strokeLinecap="round" />
          <path d="M520 340 Q460 360 420 310" fill="none" stroke="var(--color-ink)" strokeWidth="32" strokeLinecap="round" style={{ opacity: 0.1 }} />
          <path d="M420 310 Q400 290 380 280" fill="none" stroke="var(--color-ember-soft)" strokeWidth="16" strokeLinecap="round" />
        </g>

        {/* Desk Plant (Interactive) */}
        <g transform="translate(560, 210)">
          <path d="M0 50 Q10 10 -20 0" fill="none" stroke="var(--color-sage)" strokeWidth="6" strokeLinecap="round" />
          <path d="M0 50 Q-10 20 20 10" fill="none" stroke="var(--color-sage)" strokeWidth="6" strokeLinecap="round" />
          {leafFalling && (
            <path className="anim-leaffall" d="M20 10 Q30 5 35 15 Q25 20 20 10 Z" fill="var(--color-forest)" />
          )}
          {!leafFalling && (
            <path d="M20 10 Q30 5 35 15 Q25 20 20 10 Z" fill="var(--color-forest)" />
          )}
          <rect x="-15" y="50" width="30" height="30" rx="4" fill="var(--color-bark)" stroke="var(--color-ink)" strokeWidth="3" strokeLinejoin="round" />
        </g>

        {/* Floor Plant */}
        <g transform="translate(680, 360)">
          <path d="M0 80 Q-20 20 -40 10" fill="none" stroke="var(--color-sage)" strokeWidth="8" strokeLinecap="round" />
          <path d="M0 80 Q10 30 20 0" fill="none" stroke="var(--color-sage)" strokeWidth="8" strokeLinecap="round" />
          <path d="M0 80 Q-5 40 10 30" fill="none" stroke="var(--color-sage)" strokeWidth="8" strokeLinecap="round" />
          <path d="M-40 10 Q-30 -10 -20 0 Z" fill="var(--color-forest-deep)" />
          <path d="M20 0 Q35 -5 30 15 Z" fill="var(--color-forest-deep)" />
          <rect x="-25" y="80" width="50" height="60" rx="8" fill="var(--color-cream)" stroke="var(--color-ink)" strokeWidth="4" strokeLinejoin="round" />
        </g>

        <defs>
          <clipPath id="window-clip">
            <rect x="428" y="48" width="204" height="144" rx="4" />
          </clipPath>
          <linearGradient id="lamp-glow" x1="440" y1="140" x2="390" y2="260" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--color-ember)" stopOpacity="0.4" />
            <stop offset="1" stopColor="var(--color-ember)" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Interactive overlays positioned over the SVG */}
      
      {/* Robot Overlay */}
      <div className="absolute top-[160px] left-[60px] w-[80px] h-[100px]">
        <Robot size={80} />
      </div>

      {/* Mug (Interactive) */}
      <button 
        className="absolute top-[215px] left-[450px] w-[34px] h-[55px] cursor-pointer group focus-visible"
        onClick={handleMugClick}
        onKeyDown={(e) => handleKeydown(e, handleMugClick)}
        aria-label="Make coffee steam"
      >
        <svg viewBox="0 0 34 55" className="w-full h-full overflow-visible">
          <g className="steam-group">
            <path d="M10 20 Q5 10 15 0" fill="none" stroke="var(--color-sky)" strokeWidth="2" strokeLinecap="round" className={steamIntense ? 'anim-steam-fast' : 'anim-steam'} />
            <path d="M17 20 Q12 10 22 0" fill="none" stroke="var(--color-sky)" strokeWidth="2" strokeLinecap="round" className={`${steamIntense ? 'anim-steam-fast' : 'anim-steam'} steam-delay-1`} />
            <path d="M24 20 Q19 10 29 0" fill="none" stroke="var(--color-sky)" strokeWidth="2" strokeLinecap="round" className={`${steamIntense ? 'anim-steam-fast' : 'anim-steam'} steam-delay-2`} />
          </g>
          <rect x="4" y="25" width="26" height="30" rx="4" fill="var(--color-cream)" stroke="var(--color-ink)" strokeWidth="3" strokeLinejoin="round" />
          <path d="M30 35 Q38 35 38 42 Q38 49 30 49" fill="none" stroke="var(--color-ink)" strokeWidth="3" strokeLinecap="round" />
        </svg>
        <div className="absolute -bottom-2 left-2 right-4 h-[2px] bg-ink/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </button>

      {/* Plant (Interactive) */}
      <button
        className="absolute top-[190px] left-[525px] w-[70px] h-[90px] cursor-pointer group focus-visible"
        onClick={handlePlantClick}
        onKeyDown={(e) => handleKeydown(e, handlePlantClick)}
        aria-label="Drop a leaf"
      >
        <div className="absolute -bottom-2 left-4 right-4 h-[2px] bg-ink/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </button>

    </div>
  )
}
