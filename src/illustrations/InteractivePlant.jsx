import React from 'react';

export default function InteractivePlant({ leafFalling, onClick, onKeyDown }) {
  return (
    <g
      className="cursor-pointer pointer-events-auto group outline-none"
      onClick={onClick}
      onKeyDown={onKeyDown}
      tabIndex={0}
      role="button"
      aria-label="Drop a leaf"
    >
      {/* Invisible hit area */}
      <rect x="-25" y="-10" width="70" height="100" fill="transparent" />
      <path d="M0 50 Q10 10 -20 0" fill="none" stroke="var(--color-sage)" strokeWidth="6" strokeLinecap="round" />
      <path d="M0 50 Q-10 20 20 10" fill="none" stroke="var(--color-sage)" strokeWidth="6" strokeLinecap="round" />
      
      <path 
        className={leafFalling ? "anim-leaffall" : ""} 
        d="M20 10 Q30 5 35 15 Q25 20 20 10 Z" 
        fill="var(--color-forest)" 
      />
      
      <rect x="-15" y="50" width="30" height="30" rx="4" fill="var(--color-bark)" stroke="var(--color-ink)" strokeWidth="3" strokeLinejoin="round" />
      
      {/* Hover indicator */}
      <line x1="-15" y1="88" x2="15" y2="88" stroke="var(--color-ink)" strokeWidth="2" className="opacity-0 group-hover:opacity-20 group-focus:opacity-20 transition-opacity" strokeLinecap="round" />
    </g>
  );
}
