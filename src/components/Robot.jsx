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
export default function Robot({ size, waving, loopWave, className = '', interactive = true, overrideSpeech }) {
  const [isClickedWaving, setIsClickedWaving] = useState(false)
  const [internalSpeech, setInternalSpeech] = useState('')

  const speech = (isClickedWaving && internalSpeech) ? internalSpeech : overrideSpeech

  const actualWaving = waving || isClickedWaving

  useEffect(() => {
    if (isClickedWaving) {
      const timer = setTimeout(() => {
        setIsClickedWaving(false)
        setInternalSpeech('')
      }, 4200) // 1.4s * 3 waves
      return () => clearTimeout(timer)
    }
  }, [isClickedWaving])

  const handleClick = () => {
    if (!interactive || loopWave || isClickedWaving) return
    setIsClickedWaving(true)
    const lines = profile.robot.lines
    setInternalSpeech(lines[Math.floor(Math.random() * lines.length)])
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
        disabled={!interactive}
        className={`w-full h-full block focus-visible text-left p-0 ${interactive ? 'cursor-pointer' : 'cursor-default'}`}
        aria-label={interactive ? "Say hello to Bolt the robot" : "Bolt the robot"}
      >
        <svg
          viewBox="0 0 100 116"
          className="w-full h-full"
          role="img"
          aria-hidden="true"
        >
          {/* antenna */}
          <path
            d="M50 22V12"
            stroke="var(--color-bark)"
            strokeWidth="3.4"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="50" cy="9" r="5" fill="var(--color-ember)" className="anim-glow" />

          {/* head */}
          <rect
            x="20"
            y="20"
            width="60"
            height="46"
            rx="18"
            fill="var(--color-sage)"
            stroke="var(--color-forest-deep)"
            strokeWidth="2.6"
          />
          {/* visor */}
          <rect x="27" y="29" width="46" height="26" rx="12" fill="var(--color-forest-deep)" />
          <g className="anim-blink">
            <circle cx="40" cy="42" r="4.4" fill="var(--color-sky)" />
            <circle cx="60" cy="42" r="4.4" fill="var(--color-sky)" />
          </g>
          {/* cheeks */}
          <ellipse cx="26" cy="52" rx="4" ry="2.6" fill="var(--color-ember-soft)" opacity="0.8" />
          <ellipse cx="74" cy="52" rx="4" ry="2.6" fill="var(--color-ember-soft)" opacity="0.8" />

          {/* body */}
          <rect
            x="27"
            y="68"
            width="46"
            height="36"
            rx="14"
            fill="var(--color-cream)"
            stroke="var(--color-forest-deep)"
            strokeWidth="2.6"
          />
          <rect x="38" y="78" width="24" height="10" rx="5" fill="var(--color-sage-soft)" />
          <circle cx="50" cy="96" r="2.6" fill="var(--color-ember)" />

          {/* left arm */}
          <path
            d="M27 78c-7 2-10 7-10 13"
            stroke="var(--color-forest-deep)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          {/* waving arm */}
          <g className={waveClass} style={{ transformOrigin: '73px 78px' }}>
            <path
              d="M73 78c8-1 13-7 14-15"
              stroke="var(--color-forest-deep)"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            <circle
              cx="88"
              cy="60"
              r="5.2"
              fill="var(--color-ember)"
              stroke="var(--color-forest-deep)"
              strokeWidth="2"
            />
          </g>

          {/* feet */}
          <rect x="32" y="103" width="13" height="7" rx="3.5" fill="var(--color-bark)" />
          <rect x="55" y="103" width="13" height="7" rx="3.5" fill="var(--color-bark)" />
        </svg>
      </button>

      {/* Speech Bubble */}
      {speech && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[220px] bg-sky text-forest-deep font-bold text-sm font-sans p-3 rounded-card shadow-sm z-50 text-center anim-rise border border-ink/10">
          {speech}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-4 border-transparent border-t-sky"></div>
        </div>
      )}
      
      {/* Click Hint Line */}
      {!loopWave && (
        <div className="absolute -bottom-2 left-1/4 right-1/4 h-[2px] bg-ink/10 rounded-full pointer-events-none" />
      )}
    </div>
  )
}
