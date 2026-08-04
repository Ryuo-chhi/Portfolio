/**
 * Hand-drawn tool marks. Geometric, round-joined.
 * 
 * @param {object} props
 * @param {string} props.name - The glyph name (atom, triangle, wind, etc.)
 */
export default function ToolGlyph({ name }) {
  const baseClasses = "w-6 h-6 stroke-current stroke-2 fill-none stroke-linecap-round stroke-linejoin-round"
  
  switch (name) {
    case 'atom':
      return (
        <svg viewBox="0 0 24 24" className={baseClasses}>
          <ellipse cx="12" cy="12" rx="4" ry="10" transform="rotate(45 12 12)" />
          <ellipse cx="12" cy="12" rx="4" ry="10" transform="rotate(-45 12 12)" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
      )
    case 'triangle':
      return (
        <svg viewBox="0 0 24 24" className={baseClasses}>
          <path d="M12 4L4 18H20L12 4Z" />
        </svg>
      )
    case 'wind':
      return (
        <svg viewBox="0 0 24 24" className={baseClasses}>
          <path d="M4 12H16" />
          <path d="M16 12C18.2091 12 20 10.2091 20 8C20 5.79086 18.2091 4 16 4" />
          <path d="M4 18H12" />
          <path d="M12 18C14.2091 18 16 19.7909 16 22C16 24.2091 14.2091 26 12 26" />
        </svg>
      )
    case 'brackets':
      return (
        <svg viewBox="0 0 24 24" className={baseClasses}>
          <path d="M8 6L2 12L8 18" />
          <path d="M16 6L22 12L16 18" />
        </svg>
      )
    case 'flame':
      return (
        <svg viewBox="0 0 24 24" className={baseClasses}>
          <path d="M12 2C12 2 4 8 4 14C4 18.4183 7.58172 22 12 22C16.4183 22 20 18.4183 20 14C20 8 12 2 12 2Z" />
          <path d="M12 10C12 10 9 13 9 15C9 16.6569 10.3431 18 12 18C13.6569 18 15 16.6569 15 15C15 13 12 10 12 10Z" />
        </svg>
      )
    case 'server':
      return (
        <svg viewBox="0 0 24 24" className={baseClasses}>
          <rect x="3" y="4" width="18" height="6" rx="1" />
          <rect x="3" y="14" width="18" height="6" rx="1" />
          <circle cx="7" cy="7" r="1" fill="currentColor" />
          <circle cx="7" cy="17" r="1" fill="currentColor" />
        </svg>
      )
    case 'flask':
      return (
        <svg viewBox="0 0 24 24" className={baseClasses}>
          <path d="M9 3H15" />
          <path d="M10 3V9L5 19C4.7 19.5 5 21 6 21H18C19 21 19.3 19.5 19 19L14 9V3" />
          <path d="M6.5 16H17.5" />
        </svg>
      )
    case 'stack':
      return (
        <svg viewBox="0 0 24 24" className={baseClasses}>
          <path d="M12 2L3 7L12 12L21 7L12 2Z" />
          <path d="M3 12L12 17L21 12" />
          <path d="M3 17L12 22L21 17" />
        </svg>
      )
    case 'barrel':
      return (
        <svg viewBox="0 0 24 24" className={baseClasses}>
          <ellipse cx="12" cy="5" rx="8" ry="3" />
          <path d="M4 5V19C4 20.6569 7.58172 22 12 22C16.4183 22 20 20.6569 20 19V5" />
          <path d="M4 12C4 13.6569 7.58172 15 12 15C16.4183 15 20 13.6569 20 12" />
        </svg>
      )
    case 'branch':
      return (
        <svg viewBox="0 0 24 24" className={baseClasses}>
          <circle cx="6" cy="18" r="3" />
          <circle cx="6" cy="6" r="3" />
          <circle cx="18" cy="12" r="3" />
          <path d="M6 9V15" />
          <path d="M9 18C14 18 14 12 15 12" />
        </svg>
      )
    case 'box':
      return (
        <svg viewBox="0 0 24 24" className={baseClasses}>
          <path d="M12 22V12" />
          <path d="M12 12L2 7L12 2L22 7L12 12Z" />
          <path d="M2 7V17L12 22L22 17V7" />
        </svg>
      )
    case 'cloud':
      return (
        <svg viewBox="0 0 24 24" className={baseClasses}>
          <path d="M7.5 19H17.5C19.9853 19 22 16.9853 22 14.5C22 12.1834 20.2458 10.2796 18 10.0355V10C18 6.68629 15.3137 4 12 4C9.17646 4 6.80931 5.95294 6.13604 8.60155C3.79155 8.94828 2 10.9634 2 13.5C2 16.5376 4.46243 19 7.5 19Z" />
        </svg>
      )
    case 'wrench':
      return (
        <svg viewBox="0 0 24 24" className={baseClasses}>
          <path d="M14.7 6.3C15.3 5.7 16.3 5.4 17.3 5.6C18.6 5.8 19.8 7 20 8.3C20.2 9.3 19.9 10.3 19.3 10.9L12 18.2C11 19.2 9.4 19.2 8.4 18.2L5.8 15.6C4.8 14.6 4.8 13 5.8 12L13.1 4.7" />
          <path d="M14 10L10 14" />
        </svg>
      )
    case 'leaf':
      return (
        <svg viewBox="0 0 24 24" className={baseClasses}>
          <path d="M12 22C12 22 4 15 4 8C4 4 8 2 12 2C16 2 20 4 20 8C20 15 12 22 12 22Z" />
          <path d="M12 22V12" />
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 24 24" className={baseClasses}>
          <circle cx="12" cy="12" r="10" />
        </svg>
      )
  }
}
