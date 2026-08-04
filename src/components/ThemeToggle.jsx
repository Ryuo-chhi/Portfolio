/**
 * A desk-lamp switch for toggling between light and dark themes.
 * 
 * @param {object} props
 * @param {string} props.theme - 'light' or 'dark'
 * @param {function} props.toggleTheme - Function to switch themes
 */
export default function ThemeToggle({ theme, toggleTheme }) {
  const isDark = theme === 'dark'

  return (
    <button
      role="switch"
      aria-checked={isDark}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      onClick={toggleTheme}
      className={`
        relative w-[68px] h-[36px] rounded-full overflow-hidden transition-colors duration-500
        border-2 border-forest/70 shadow-inset
        ${isDark ? 'bg-sky-900' : 'bg-sky-200'}
      `}
    >
      {/* Track Background Day */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${isDark ? 'opacity-0' : 'opacity-100'}`}>
        <div className="absolute top-1 right-2 text-sage-soft text-lg">☁</div>
      </div>
      
      {/* Track Background Night */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${isDark ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute top-1 left-3 text-[10px] text-white">✨</div>
        <div className="absolute top-4 left-6 text-[8px] text-white">✨</div>
      </div>

      {/* The Knob */}
      <div
        className={`
          absolute top-[2px] left-[2px] w-[28px] h-[28px] rounded-full flex items-center justify-center
          transition-transform duration-500 var(--ease-cozy)
          border-2 border-pin-edge
          ${isDark ? 'translate-x-[32px] bg-sage' : 'translate-x-0 bg-ember'}
        `}
        style={{
          borderColor: 'var(--color-pin-edge)'
        }}
      >
        {/* Sun rays (day) */}
        {!isDark && (
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-ember-soft opacity-50 scale-110" />
        )}
        {/* Moon craters (night) */}
        {isDark && (
          <>
            <div className="absolute w-[6px] h-[6px] rounded-full bg-sage-soft top-[4px] left-[6px]" />
            <div className="absolute w-[4px] h-[4px] rounded-full bg-sage-soft bottom-[6px] right-[6px]" />
          </>
        )}
      </div>
    </button>
  )
}
