import { useState, useEffect } from 'react'
import { profile } from '../data/profile'

/**
 * The mascot. Reused on the hero desk, beside the projects heading, and in the footer.
 *
 * @param {object} props
 * @param {number} [props.size]      Pixel width. Omit to let CSS size it.
 * @param {boolean} [props.waving]   Wave three times, then rest.
 * @param {boolean} [props.loopWave] Wave forever (footer goodbye).
 * @param {string}  [props.className]
 */
export default function Robot({ size, waving, loopWave, className = '' }) {
  const [isClickedWaving, setIsClickedWaving] = useState(false)
  const [speech, setSpeech] = useState('')

  const actualWaving = waving || isClickedWaving

  useEffect(() => {
    if (isClickedWaving) {
      const timer = setTimeout(() => {
        setIsClickedWaving(false)
        setSpeech('')
      }, 4200) // 1.4s * 3 waves
      return () => clearTimeout(timer)
    }
  }, [isClickedWaving])

  const handleClick = () => {
    if (loopWave || isClickedWaving) return
    setIsClickedWaving(true)
    const lines = profile.robot.lines
    setSpeech(lines[Math.floor(Math.random() * lines.length)])
  }

  const height = size ? (size * 116) / 100 : undefined
  const waveClass = loopWave ? 'anim-wave-loop' : (actualWaving ? 'anim-wave-3' : '')

  return (
    <div 
      className={`relative inline-block ${className}`} 
      style={size ? { width: size, height } : {}}
    >
      <button
        onClick={handleClick}
        className="w-full h-full block focus-visible text-left p-0 cursor-pointer"
        aria-label="Say hello to Sequel the robot"
      >
        <svg
          viewBox="0 0 100 116"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          role="img"
          aria-hidden="true"
        >
          {/* Antenna */}
          <line x1="50" y1="22" x2="50" y2="4" stroke="var(--color-ink)" strokeWidth="3" strokeLinecap="round" />
          <circle cx="50" cy="4" r="4" fill="var(--color-ember)" className="anim-glow" />
          
          {/* Body */}
          <path d="M30 65 Q50 55 70 65 L75 110 L25 110 Z" fill="var(--color-cream)" stroke="var(--color-ink)" strokeWidth="3" strokeLinejoin="round" />
          
          {/* Head */}
          <rect x="25" y="22" width="50" height="46" rx="20" fill="var(--color-sage)" stroke="var(--color-ink)" strokeWidth="3" />
          
          {/* Visor */}
          <rect x="33" y="32" width="34" height="20" rx="8" fill="var(--color-ink)" />
          
          {/* Eyes */}
          <g className="anim-blink">
            <circle cx="42" cy="42" r="3" fill="var(--color-sky)" />
            <circle cx="58" cy="42" r="3" fill="var(--color-sky)" />
          </g>

          {/* Cheeks */}
          <circle cx="33" cy="52" r="2.5" fill="var(--color-ember)" opacity="0.6" />
          <circle cx="67" cy="52" r="2.5" fill="var(--color-ember)" opacity="0.6" />

          {/* Left Arm (static) */}
          <path d="M30 75 Q20 85 24 95" stroke="var(--color-ink)" strokeWidth="4" strokeLinecap="round" />
          
          {/* Right Arm (waving) */}
          <g className={waveClass} style={{ transformOrigin: '70% 75%' }}>
            <path d="M70 75 Q85 65 78 50" stroke="var(--color-ink)" strokeWidth="4" strokeLinecap="round" fill="none" />
            {/* Hand */}
            <circle cx="78" cy="50" r="4" fill="var(--color-sage)" stroke="var(--color-ink)" strokeWidth="2" />
          </g>
        </svg>
      </button>

      {/* Speech Bubble */}
      {speech && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-[160px] bg-cream text-ink-soft text-sm font-sans p-3 rounded-card shadow-soft z-50 text-center anim-rise">
          {speech}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-4 border-transparent border-t-cream"></div>
        </div>
      )}
      
      {/* Click Hint Line */}
      {!loopWave && (
        <div className="absolute -bottom-2 left-1/4 right-1/4 h-[2px] bg-ink/10 rounded-full pointer-events-none" />
      )}
    </div>
  )
}
