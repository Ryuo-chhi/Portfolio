import React from 'react';

export default function InteractiveMug({ steamIntense, onClick, onKeyDown }) {
  return (
    <g
      className="cursor-pointer pointer-events-auto group outline-none"
      onClick={onClick}
      onKeyDown={onKeyDown}
      tabIndex={0}
      role="button"
      aria-label="Make coffee steam"
    >
      {/* Invisible hit area for easier clicking */}
      <rect x="-5" y="0" width="44" height="60" fill="transparent" />
      <g className="steam-group">
        <path d="M10 20 Q5 10 15 0" fill="none" stroke="var(--color-sky)" strokeWidth="2" strokeLinecap="round" className={steamIntense ? 'anim-steam-fast' : 'anim-steam'} />
        <path d="M17 20 Q12 10 22 0" fill="none" stroke="var(--color-sky)" strokeWidth="2" strokeLinecap="round" className={`${steamIntense ? 'anim-steam-fast' : 'anim-steam'} steam-delay-1`} />
        <path d="M24 20 Q19 10 29 0" fill="none" stroke="var(--color-sky)" strokeWidth="2" strokeLinecap="round" className={`${steamIntense ? 'anim-steam-fast' : 'anim-steam'} steam-delay-2`} />
      </g>
      <rect x="4" y="25" width="26" height="30" rx="4" fill="var(--color-cream)" stroke="var(--color-ink)" strokeWidth="3" strokeLinejoin="round" />
      <path d="M30 35 Q38 35 38 42 Q38 49 30 49" fill="none" stroke="var(--color-ink)" strokeWidth="3" strokeLinecap="round" />
      
      {/* Hover indicator */}
      <line x1="4" y1="62" x2="30" y2="62" stroke="var(--color-ink)" strokeWidth="2" className="opacity-0 group-hover:opacity-20 group-focus:opacity-20 transition-opacity" strokeLinecap="round" />
    </g>
  );
}
