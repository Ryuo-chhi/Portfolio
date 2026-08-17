/**
 * Crafted vector icons replacing all emojis across the portfolio.
 * Consistent stroke width, round caps, and cohesive craft-workshop aesthetic.
 * 
 * @param {object} props
 * @param {string} props.name - Icon name (workshop, story, projects, skills, bench, contact, wave, etc.)
 * @param {string} [props.className] - CSS classes for styling sizing, colors, animations
 */
export default function Icon({ name, className = 'w-5 h-5' }) {
  const baseStroke = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }

  switch (name) {
    case 'workshop':
    case 'home':
      return (
        <svg viewBox="0 0 24 24" className={className} {...baseStroke}>
          <path d="M3 10.5L12 3l9 7.5V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9.5z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      )

    case 'story':
    case 'book':
    case 'notebook':
      return (
        <svg viewBox="0 0 24 24" className={className} {...baseStroke}>
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          <line x1="8" y1="7" x2="16" y2="7" />
          <line x1="8" y1="11" x2="14" y2="11" />
        </svg>
      )

    case 'projects':
    case 'tools':
    case 'shelf':
      return (
        <svg viewBox="0 0 24 24" className={className} {...baseStroke}>
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      )

    case 'skills':
    case 'bolt':
    case 'toolbox':
      return (
        <svg viewBox="0 0 24 24" className={className} {...baseStroke}>
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      )

    case 'bench':
    case 'ruler':
    case 'blueprint':
      return (
        <svg viewBox="0 0 24 24" className={className} {...baseStroke}>
          <polygon points="3 21 21 21 3 3 3 21" />
          <polygon points="6 18 14 18 6 10 6 18" />
          <line x1="6" y1="14" x2="8.5" y2="14" />
          <line x1="10" y1="18" x2="10" y2="15.5" />
        </svg>
      )

    case 'contact':
    case 'mail':
    case 'letter':
      return (
        <svg viewBox="0 0 24 24" className={className} {...baseStroke}>
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      )

    case 'wave':
    case 'hand':
      return (
        <svg viewBox="0 0 24 24" className={className} {...baseStroke}>
          <path d="M18 11V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2v5" />
          <path d="M14 10V4a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7" />
          <path d="M10 10.5V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2v8" />
          <path d="M18 8a2 2 0 0 1 2 2v4a8 8 0 0 1-8 8h-1a7 7 0 0 1-5.6-2.8L3.4 16.8a1.4 1.4 0 0 1 .2-2l1.6-1.2a1.4 1.4 0 0 1 2 .2L8 15" />
        </svg>
      )

    case 'leaf':
    case 'plant':
      return (
        <svg viewBox="0 0 24 24" className={className} {...baseStroke}>
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
        </svg>
      )

    default:
      return (
        <svg viewBox="0 0 24 24" className={className} {...baseStroke}>
          <circle cx="12" cy="12" r="10" />
        </svg>
      )
  }
}
