import { useState, useEffect } from 'react'
import { navigation } from '../data/navigation'
import ThemeToggle from './ThemeToggle'
import NavPill from './NavPill'
import CommandPalette from './CommandPalette'

/**
 * Sticky header with mobile scrolling rail for navigation.
 */
export default function Header({ theme, toggleTheme, activeSection }) {
  const [isCommandOpen, setIsCommandOpen] = useState(false)
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
      <header className="sticky top-0 z-40 bg-sand/90 backdrop-blur-md pt-4 pb-4 px-6 border-b border-ink/5">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Top row on mobile, left on desktop */}
          <div className="flex items-center justify-between w-full lg:w-auto">
            {/* Wordmark */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-forest text-cream flex items-center justify-center font-display font-bold text-xl shadow-soft">
                C
              </div>
              <div className="font-display font-bold text-forest-deep text-lg">
                Chhunhour
              </div>
            </div>

            {/* Actions for mobile (right side of top row) */}
            <div className="flex items-center gap-3 lg:hidden">
              <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
              <button 
                onClick={() => setIsCommandOpen(true)}
                className="h-[36px] px-3 flex items-center justify-center gap-2 text-ink-soft hover:bg-forest/5 hover:text-forest-deep rounded-full transition-colors border border-forest/30 dark:border-sage-soft/30"
                aria-label="Open command palette"
              >
                <span className={`text-[15px] font-mono ${!isMac ? 'mr-1' : 'mb-[1px] text-lg'}`}>
                  {isMac ? '⌘' : 'Ctrl'}
                </span>
                <span className="text-[13px] font-mono">K</span>
              </button>
            </div>
          </div>

          {/* Nav Pills - horizontally scrolling rail on mobile, row on desktop */}
          <nav className="flex-1 overflow-x-auto lg:overflow-visible no-scrollbar py-4 -my-4 -mx-6 px-6 lg:mx-0 lg:px-0">
            <div className="flex items-center gap-1 lg:justify-end min-w-max">
              {navigation.map((nav) => (
                <NavPill
                  key={nav.id}
                  id={nav.id}
                  icon={nav.icon}
                  label={nav.label}
                  isActive={activeSection === nav.id}
                  onClick={() => scrollTo(nav.id)}
                />
              ))}
            </div>
          </nav>

          {/* Actions for desktop */}
          <div className="hidden lg:flex items-center gap-4">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <button 
              onClick={() => setIsCommandOpen(true)}
              className="h-[36px] px-4 flex items-center justify-center gap-3 text-ink-soft hover:bg-forest/5 hover:text-forest-deep rounded-full transition-colors border border-forest/30 dark:border-sage-soft/30"
              aria-label="Open command palette"
            >
              <span className={`text-[15px] font-mono ${!isMac ? 'mr-1' : 'mb-[1px] text-lg'}`}>
                {isMac ? '⌘' : 'Ctrl'}
              </span>
              <span className="text-[13px] font-mono">K</span>
            </button>
          </div>

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
