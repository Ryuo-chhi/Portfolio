import Pin from './Pin'

/**
 * A navigation button, tracking its active state with a pinned treatment.
 * 
 * @param {object} props
 * @param {string} props.id - The section id to navigate to
 * @param {string} props.icon - The emoji icon
 * @param {string} props.label - The text label
 * @param {boolean} props.isActive - Whether this section is currently active
 * @param {function} props.onClick - Click handler
 */
export default function NavPill({ id, icon, label, isActive, onClick }) {
  return (
    <div className="relative isolate">
      <button
        onClick={onClick}
        aria-current={isActive ? 'page' : undefined}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-btn transition-all duration-300 font-bold text-sm
          ${isActive 
            ? 'bg-forest text-sand shadow-sm -rotate-1 translate-y-px z-10' 
            : 'bg-transparent text-ink hover:bg-cream hover:text-forest-deep'
          }
        `}
      >
        <span>{icon}</span>
        <span>{label}</span>
      </button>

      {/* The Pin drops in when active */}
      {isActive && (
        <div className="absolute -top-3 -right-2 z-20 pointer-events-none anim-pin-drop">
          <Pin />
        </div>
      )}
    </div>
  )
}
