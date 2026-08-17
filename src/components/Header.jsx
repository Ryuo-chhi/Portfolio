import { useState, useEffect } from 'react'
import { navigation } from '../data/navigation'
import ThemeToggle from './ThemeToggle'
import NavPill from './NavPill'
import CommandPalette from './CommandPalette'
import Pin from './Pin'
import Icon from './Icon'
import { profile } from '../data/profile'

/**
 * Sticky header with mobile scrolling rail for navigation.
 * 
 * @param {object} props
 * @param {string} props.theme - Current theme ('light' or 'dark')
 * @param {function} props.toggleTheme - Function to toggle the theme
 * @param {string} props.activeSection - The currently active section ID
 */
export default function Header({ theme, toggleTheme, activeSection }) {
  const [isCommandOpen, setIsCommandOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMac, setIsMac] = useState(true) // Default to Mac style

  useEffect(() => {
    // Detect OS for keyboard shortcut display
    if (typeof navigator !== 'undefined') {
      const platform = navigator?.platform || navigator?.userAgent || ''
      if (platform.toLowerCase().includes('win') || platform.toLowerCase().includes('linux')) {
        setIsMac(false)
      }
    }
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) {
      const targetPosition = el.getBoundingClientRect().top + window.scrollY
      const startPosition = window.scrollY
      const distance = targetPosition - startPosition
      const duration = 1200 // Slow, cinematic scroll duration (1.2 seconds)
      let start = null

      // Cubic easing function for very smooth acceleration and deceleration
      const easeInOutCubic = (t, b, c, d) => {
        t /= d / 2
        if (t < 1) return (c / 2) * t * t * t + b
        t -= 2
        return (c / 2) * (t * t * t + 2) + b
      }

      const animation = (currentTime) => {
        if (start === null) start = currentTime
        const timeElapsed = currentTime - start
        const run = easeInOutCubic(timeElapsed, startPosition, distance, duration)
        window.scrollTo(0, run)
        if (timeElapsed < duration) {
          requestAnimationFrame(animation)
        }
      }
      
      requestAnimationFrame(animation)
    }
  }

  const handleNavClick = (id) => {
    setIsMobileMenuOpen(false)
    scrollTo(id)
  }

  // Keyboard shortcut for command palette
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsCommandOpen(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <header className="sticky top-0 z-40 bg-sand/90 backdrop-blur-md px-6 border-b border-ink/5">
        <div className="py-4 max-w-6xl mx-auto flex items-center justify-between gap-4">
          
          {/* Wordmark */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-forest text-cream flex items-center justify-center font-display font-bold text-xl shadow-soft shrink-0">
              {profile.name[0]}
            </div>
            <div className="font-display font-bold text-forest-deep text-lg">
              {profile.name}
            </div>
          </div>

          {/* Desktop Nav Pills */}
          <nav className="hidden lg:flex flex-1 items-center justify-end gap-1">
            {navigation.map((nav) => (
              <NavPill
                key={nav.id}
                id={nav.id}
                icon={nav.icon}
                label={nav.label}
                isActive={activeSection === nav.id}
                onClick={() => handleNavClick(nav.id)}
              />
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <button 
              onClick={() => setIsCommandOpen(true)}
              className="h-[36px] w-[36px] lg:w-auto px-0 lg:px-4 flex items-center justify-center gap-2 text-ink-soft hover:bg-forest/5 hover:text-forest-deep rounded-full transition-colors border border-forest/30 dark:border-sage-soft/30"
              aria-label="Open command palette"
            >
              <div className="hidden lg:flex items-center gap-2">
                <span className={`text-[15px] font-mono ${!isMac ? 'mr-1' : 'mb-[1px] text-lg'}`}>
                  {isMac ? '⌘' : 'Ctrl'}
                </span>
                <span className="text-[13px] font-mono">K</span>
              </div>
              <div className="flex lg:hidden items-center justify-center">
                <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden h-[36px] w-[36px] flex flex-col items-center justify-center gap-[4px] text-ink-soft hover:bg-forest/5 hover:text-forest-deep rounded-full transition-colors border border-forest/30 dark:border-sage-soft/30"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              <span className={`block w-[14px] h-[2px] bg-current rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
              <span className={`block w-[14px] h-[2px] bg-current rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-[14px] h-[2px] bg-current rounded-full transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        <div 
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-[400px] opacity-100 border-t border-ink/5' : 'max-h-0 opacity-0'}`}
        >
          <nav className="flex flex-col py-4 gap-2">
            {navigation.map((nav) => {
              const isActive = activeSection === nav.id
              return (
                <button
                  key={nav.id}
                  onClick={() => handleNavClick(nav.id)}
                  className={`flex items-center px-4 py-3 rounded-xl transition-all duration-300 font-bold ${
                    isActive 
                      ? 'bg-forest text-cream shadow-soft translate-x-2' 
                      : 'text-ink-soft hover:bg-forest/5 hover:text-forest-deep'
                  }`}
                >
                  <div className="relative inline-flex items-center gap-3 pr-2">
                    <Icon name={nav.icon} className="w-5 h-5 shrink-0" />
                    <span>{nav.label}</span>
                    {isActive && (
                      <div className="absolute -top-3 -right-3 z-20 pointer-events-none anim-pin-drop">
                        <Pin />
                      </div>
                    )}
                  </div>
                </button>
              )
            })}
          </nav>
        </div>
      </header>

      <CommandPalette 
        isOpen={isCommandOpen} 
        onClose={() => setIsCommandOpen(false)} 
        onSelect={scrollTo}
      />
    </>
  )
}
