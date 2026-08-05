import { useEffect, useRef } from 'react'
import { experience } from '../data/experience'
import SectionLabel from '../components/SectionLabel'
import { useScrollProgress } from '../hooks/useScrollProgress'

/**
 * The blueprint wall timeline. Owns its own scroll logic for the notes.
 */
export default function BlueprintWall() {
  const sectionRef = useRef(null)
  const threadProgress = useScrollProgress(sectionRef)

  // Hand-drawn sketch diagrams
  const Diagram = ({ type }) => {
    const classes = "w-10 h-10 stroke-sage-soft stroke-2 fill-none stroke-linecap-round stroke-linejoin-round"
    switch (type) {
      case 'flow':
        return (
          <svg viewBox="0 0 24 24" className={classes}>
            <rect x="3" y="10" width="6" height="4" rx="1" />
            <rect x="15" y="4" width="6" height="4" rx="1" />
            <rect x="15" y="16" width="6" height="4" rx="1" />
            <path d="M9 12h2v-6h4" />
            <path d="M11 12v6h4" />
          </svg>
        )
      case 'layers':
        return (
          <svg viewBox="0 0 24 24" className={classes}>
            <polygon points="12 4 4 8 12 12 20 8 12 4" />
            <polyline points="4 12 12 16 20 12" />
            <polyline points="4 16 12 20 20 16" />
          </svg>
        )
      case 'signal':
      default:
        return (
          <svg viewBox="0 0 24 24" className={classes}>
            <path d="M3 12h4l3-9 5 18 3-9h3" />
          </svg>
        )
    }
  }

  // Animation logic: observe intersection and swing notes down onto pins
  useEffect(() => {
    const timers = new Map()
    const set = (index, pinned) => {
      const el = document.getElementById(`note-${index}`)
      if (!el) return
      if (pinned) {
        el.style.transform = `rotate(${experience[index].tilt}deg) translateY(0)`
        el.style.opacity = '1'
      } else {
        // start position: hovering off the pin
        el.style.transform = `rotate(-7deg) translateY(-22px)`
        el.style.opacity = '0'
      }
    }

    // Initial state
    experience.forEach((_, i) => set(i, false))

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const i = Number(entry.target.dataset.note)
          // Reversing direction mid-animation would otherwise leave a queued timer
          // that fires late and pins a note you have already scrolled past.
          const pending = timers.get(i)
          if (pending) {
            clearTimeout(pending)
            timers.delete(i)
          }
          if (entry.isIntersecting) {
            timers.set(
              i,
              setTimeout(() => {
                timers.delete(i)
                set(i, true)
              }, i * 200),
            )
          } else {
            set(i, false)
          }
        })
      },
      // the inset margin stops a small scroll near the edge flickering a note in and out
      { threshold: 0, rootMargin: '-12% 0px -12% 0px' }
    )

    const notes = document.querySelectorAll('[data-note]')
    notes.forEach(note => obs.observe(note))

    return () => obs.disconnect()
  }, [])

  return (
    <section 
      id="bench" 
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
    >
      {/* Cyanotype Background with grid */}
      <div className="absolute inset-0 bg-[var(--color-blueprint-bg)] -z-20" />
      
      {/* 16px minor grid */}
      <div 
        className="absolute inset-0 -z-10 opacity-20 mix-blend-overlay"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '16px 16px' }}
      />
      {/* 96px major grid */}
      <div 
        className="absolute inset-0 -z-10 opacity-30 mix-blend-overlay"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)', backgroundSize: '96px 96px' }}
      />
      
      {/* Ghosted Site Plan SVG */}
      <div className="absolute top-1/2 -translate-y-1/2 right-0 -mr-48 opacity-[0.13] mix-blend-screen pointer-events-none -z-10">
        <svg width="600" height="600" viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="0.5">
          <circle cx="50" cy="50" r="40" strokeDasharray="2 1" />
          <circle cx="50" cy="50" r="30" />
          <rect x="25" y="25" width="50" height="50" />
          <line x1="50" y1="10" x2="50" y2="90" />
          <line x1="10" y1="50" x2="90" y2="50" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-6">
        
        {/* Legend */}
        <div className="inline-block relative bg-[var(--color-blueprint-paper)] p-3 shadow-md mb-16 transform -rotate-2">
          {/* Tape */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-ember/80 transform rotate-1 opacity-90 shadow-sm mix-blend-multiply" />
          <div className="font-mono text-xs uppercase tracking-widest text-ink font-bold">
            rev. 03 &middot; scale 1:1 &middot; drawn by hand
          </div>
        </div>

        <div className="relative pl-6 lg:pl-10">
          
          {/* Thread (background ghost) */}
          <div className="absolute top-0 bottom-0 left-0 w-px border-l-2 border-dashed border-white/20" />
          
          {/* Thread (stitched progress) */}
          <div 
            className="absolute top-0 bottom-0 left-0 w-px border-l-2 border-dashed border-white/80 origin-top"
            style={{ transform: `scaleY(${threadProgress})` }}
          />

          <div className="space-y-16 lg:space-y-24">
            {experience.map((exp, i) => (
              <div key={i} data-note={i} className="relative">
                <div 
                  id={`note-${i}`}
                  className="relative bg-cream rounded-sm p-6 lg:p-8 shadow-lift max-w-2xl transition-all duration-700 ease-[var(--ease-cozy)]"
                  style={{ transformOrigin: '2% 8%' }}
                >
                  {/* The Tack */}
                <div className="absolute -left-6 lg:-left-10 top-8 w-2 h-2 rounded-full bg-pin-head shadow-sm border border-pin-edge z-10" />
                {/* The short thread to the note */}
                <div className="absolute -left-5 lg:-left-9 top-9 w-5 lg:w-9 h-px bg-white/60 -z-10" />

                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <div className="font-mono text-sm text-ember font-bold mb-2">
                      {exp.when}
                    </div>
                    <h3 className="font-display font-bold text-2xl text-forest-deep mb-1">
                      {exp.what}
                    </h3>
                    <div className="text-forest font-bold mb-4">
                      {exp.where}
                    </div>
                    <p className="text-ink-soft leading-relaxed mb-6">
                      {exp.detail}
                    </p>
                    <div className="inline-block px-3 py-1.5 bg-ink/5 rounded-md font-mono text-xs text-ink-soft font-bold tracking-wide">
                      {exp.takeaway}
                    </div>
                  </div>

                  {/* Diagram Corner */}
                  <div className="hidden lg:flex shrink-0 w-24 h-24 items-center justify-center bg-sand rounded-sm border border-ink/5 relative transform rotate-3">
                    {/* Corner pin */}
                    <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-ink/20" />
                    <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-ink/20" />
                    <Diagram type={exp.diagram} />
                  </div>
                </div>

                {/* Dog-ear fold */}
                <div className="absolute bottom-0 right-0 w-8 h-8 bg-linear-to-tl from-transparent via-transparent to-ink/5 group overflow-hidden cursor-default">
                  <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[32px] border-l-[32px] border-b-sand border-l-transparent transition-all duration-300 group-hover:border-b-[48px] group-hover:border-l-[48px] shadow-[-2px_-2px_4px_rgba(0,0,0,0.05)]" />
                </div>
              </div>
            </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
