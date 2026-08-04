/**
 * Mailbox illustration for the contact section.
 * Animated with breathing letter and swaying flag.
 */
export default function Mailbox({ className = '' }) {
  return (
    <div className={`relative w-full max-w-[280px] aspect-square ${className}`}>
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
        role="img"
        aria-label="A wooden mailbox with a letter floating above it"
      >
        {/* Post */}
        <rect x="85" y="140" width="14" height="60" fill="var(--color-bark-light)" stroke="var(--color-ink)" strokeWidth="3" />
        <path d="M92 140V200" stroke="var(--color-bark)" strokeWidth="2" opacity="0.5" />
        
        {/* Mailbox Body Base */}
        <rect x="40" y="80" width="100" height="60" rx="10" fill="var(--color-sage)" stroke="var(--color-ink)" strokeWidth="3" />
        <path d="M40 100 Q90 120 140 100" stroke="var(--color-ink)" strokeWidth="2" opacity="0.2" fill="none" />
        
        {/* Mailbox Front Door */}
        <path d="M40 80 Q20 110 40 140 Z" fill="var(--color-forest)" stroke="var(--color-ink)" strokeWidth="3" strokeLinejoin="round" />
        <circle cx="34" cy="110" r="3" fill="var(--color-ink)" />

        {/* Flag */}
        <g className="anim-sway" style={{ transformOrigin: '120px 110px' }}>
          <rect x="116" y="60" width="6" height="50" rx="3" fill="var(--color-ember-soft)" stroke="var(--color-ink)" strokeWidth="2" />
          <path d="M122 60 H140 V75 H122 Z" fill="var(--color-ember)" stroke="var(--color-ink)" strokeWidth="2" strokeLinejoin="round" />
        </g>

        {/* Floating Letter */}
        <g className="anim-breathe" style={{ transformOrigin: 'center' }}>
          <rect x="60" y="30" width="50" height="34" fill="var(--color-cream)" stroke="var(--color-ink)" strokeWidth="3" strokeLinejoin="round" />
          <path d="M60 30 L85 48 L110 30" fill="none" stroke="var(--color-ink)" strokeWidth="3" strokeLinejoin="round" />
          
          {/* Stamp */}
          <rect x="94" y="36" width="10" height="12" fill="var(--color-sky)" stroke="var(--color-ink)" strokeWidth="1.5" />
        </g>
        
        {/* Little decorative plant at base */}
        <path d="M85 200 Q70 180 65 190 M99 200 Q115 175 120 195" fill="none" stroke="var(--color-sage)" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
  )
}
