/**
 * A desk-lamp switch for toggling between light and dark themes.
 * 
 * @param {object} props
 * @param {string} props.theme - 'light' or 'dark'
 * @param {function} props.toggleTheme - Function to switch themes
 * @param {string} [props.className] - Additional classes
 */
export default function ThemeToggle({ theme, toggleTheme, className = '' }) {
  const dark = theme === 'dark'
  const onToggle = toggleTheme

  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label={dark ? 'Switch to daylight' : 'Switch to lamplight'}
      title={dark ? 'Daylight' : 'Lamplight'}
      onClick={onToggle}
      className={`relative h-9 w-[68px] shrink-0 overflow-hidden rounded-full border-2 border-forest/70 transition-colors duration-700 ease-[cubic-bezier(0.33,0.02,0.24,1)] ${className}`}
      style={{
        background: dark
          ? 'linear-gradient(150deg, var(--color-toggle-night-start), var(--color-toggle-night-end))'
          : 'linear-gradient(150deg, var(--color-toggle-day-start), var(--color-toggle-day-end))',
      }}
    >
      {/* stars — pale, but only ever shown against the night track */}
      <span
        className="absolute inset-0 transition-opacity duration-700"
        style={{ opacity: dark ? 1 : 0 }}
        aria-hidden="true"
      >
        <span className="absolute left-2.5 top-2 h-[3px] w-[3px] rounded-full bg-[var(--color-pin-halo)]" />
        <span className="absolute left-5 top-5 h-[2px] w-[2px] rounded-full bg-[var(--color-pin-halo)] opacity-80" />
        <span className="absolute left-3.5 top-[22px] h-[2px] w-[2px] rounded-full bg-[var(--color-pin-halo)] opacity-70" />
      </span>

      {/* a passing cloud — drawn in sage so it reads on the bright day sky */}
      <span
        className="absolute right-2.5 top-[11px] transition-opacity duration-700"
        style={{ opacity: dark ? 0 : 1 }}
        aria-hidden="true"
      >
        <span className="block h-[6px] w-3.5 rounded-full bg-[var(--color-toggle-cloud)]" />
        <span className="absolute -top-1 right-1 h-[7px] w-[7px] rounded-full bg-[var(--color-toggle-cloud)]" />
      </span>

      {/* knob */}
      <span
        className="absolute top-1/2 h-7 w-7 -translate-y-1/2 rounded-full border-2 transition-all duration-700 ease-[cubic-bezier(0.33,0.02,0.24,1)]"
        aria-hidden="true"
        style={{
          left: dark ? 'calc(100% - 32px)' : '4px',
          background: dark ? 'var(--color-toggle-moon)' : 'var(--color-toggle-sun)',
          borderColor: 'var(--color-pin-edge)',
          boxShadow: dark
            ? '0 1px 3px rgba(0,0,0,0.45)'
            : '0 1px 3px rgba(58,42,22,0.35), 0 0 0 4px rgba(220,138,30,0.22)',
        }}
      >
        {/* sun rays retract as the moon's craters fade in */}
        <span
          className="absolute inset-0 transition-opacity duration-500"
          style={{ opacity: dark ? 0 : 1 }}
        >
          <svg viewBox="0 0 24 24" className="h-full w-full">
            <g
              stroke="var(--color-pin-edge)"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.75"
            >
              <path d="M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2M6 6l1.4 1.4M16.6 16.6L18 18M18 6l-1.4 1.4M7.4 16.6L6 18" />
            </g>
          </svg>
        </span>
        <span
          className="absolute inset-0 transition-opacity duration-500"
          style={{ opacity: dark ? 1 : 0 }}
        >
          <span className="absolute left-[6px] top-[5px] h-[5px] w-[5px] rounded-full bg-[var(--color-toggle-crater)]" />
          <span className="absolute left-[13px] top-[12px] h-[6px] w-[6px] rounded-full bg-[var(--color-toggle-crater)] opacity-85" />
          <span className="absolute left-[6px] top-[15px] h-[3px] w-[3px] rounded-full bg-[var(--color-toggle-crater)] opacity-75" />
        </span>
      </span>
    </button>
  )
}
