import { useState, useEffect, useRef } from 'react'
import { navigation } from '../data/navigation'

/**
 * ⌘K overlay menu.
 */
export default function CommandPalette({ isOpen, onClose, onSelect }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  const filtered = navigation.filter(n => 
    n.label.toLowerCase().includes(query.toLowerCase()) || 
    n.command.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4">
      <div 
        className="absolute inset-0 bg-ink/20 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div 
        className="relative w-full max-w-lg bg-cream rounded-panel shadow-lift overflow-hidden border border-ink/5 anim-rise"
        role="dialog"
        aria-modal="true"
      >
        <div className="p-4 border-b border-ink/5">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search commands..."
            className="w-full bg-transparent text-lg text-ink placeholder:text-ink-soft/50 focus:outline-none font-sans"
          />
        </div>
        
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="p-4 text-center text-ink-soft font-sans">No commands found.</div>
          ) : (
            filtered.map((nav) => (
              <button
                key={nav.id}
                onClick={() => {
                  onSelect(nav.id)
                  onClose()
                }}
                className="w-full flex items-center justify-between p-3 rounded-card hover:bg-forest/5 text-left transition-colors group focus-visible:bg-forest/5"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{nav.icon}</span>
                  <span className="font-bold text-forest-deep">{nav.label}</span>
                </div>
                <span className="text-sm font-mono text-ink-soft group-hover:text-forest transition-colors">
                  {nav.command}
                </span>
              </button>
            ))
          )}
        </div>

        <div className="p-3 bg-sand/50 border-t border-ink/5 flex justify-between items-center text-xs font-mono text-ink-soft">
          <span>esc to close</span>
          <span className="opacity-30 hover:opacity-100 transition-opacity" title="Konami Code">↑↑↓↓←→←→ba</span>
        </div>
      </div>
    </div>
  )
}
