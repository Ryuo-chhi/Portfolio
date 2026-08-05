import { useState, useRef, useEffect } from 'react'
import { notebook } from '../data/notebook'
import SectionLabel from '../components/SectionLabel'
import Pin from '../components/Pin'

/**
 * A notebook interface for reading the story tabs.
 */
export default function Story() {
  const [activeTab, setActiveTab] = useState(notebook[0].tab)
  const activeContent = notebook.find(n => n.tab === activeTab)

  const contentRef = useRef(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const el = contentRef.current
    if (!el) return
    const observer = new ResizeObserver(() => {
      setHeight(el.offsetHeight)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="story" className="py-16 lg:py-24 lg:scroll-mt-20 scroll-mt-36">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="max-w-4xl mx-auto">
          <SectionLabel>01. Story</SectionLabel>
          <h2 className="text-3xl font-bold font-display text-forest-deep mb-10">My Notebook</h2>

          <div className="relative bg-cream rounded-panel shadow-lift border border-ink/5 grain">
            {/* Spiral binding */}
            <div className="absolute top-0 left-0 right-0 h-6 -mt-3 flex justify-around px-8 z-10" aria-hidden="true">
              {[...Array(16)].map((_, i) => (
                <div key={i} className="w-2.5 h-6 rounded-full bg-bark shadow-sm border border-ink/20" />
              ))}
            </div>

            <div className="flex flex-col lg:flex-row pt-6">
              
              {/* Left rail / Top row of tabs */}
              <div 
                className="flex lg:flex-col gap-2 p-6 pr-12 lg:pr-0 overflow-x-auto lg:overflow-visible no-scrollbar lg:w-[220px] shrink-0 border-b lg:border-b-0 lg:border-r border-ink/10 scroll-fade-x"
                role="tablist"
                aria-label="Notebook sections"
              >
                {notebook.map((item) => {
                  const isActive = activeTab === item.tab
                  return (
                    <div key={item.tab} className="relative isolate shrink-0 lg:w-full">
                      <button
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setActiveTab(item.tab)}
                        className={`
                          w-full text-left px-4 py-2 rounded-btn font-bold transition-all duration-300 whitespace-nowrap lg:whitespace-normal text-sm
                          ${isActive 
                            ? 'bg-ember text-stamp shadow-sm -rotate-1 translate-y-px z-10' 
                            : 'bg-transparent text-ink-soft hover:bg-forest/5 hover:text-forest-deep'
                          }
                        `}
                      >
                        {item.tab}
                      </button>
                      {isActive && (
                        <div className="absolute -top-2 -right-2 z-20 pointer-events-none anim-pin-drop">
                          <Pin />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Right: Ruled content area */}
              <div 
                className="flex-1 overflow-hidden transition-[height] duration-500 ease-out"
                style={{ height: height > 0 ? `${height}px` : 'auto' }}
              >
                <div ref={contentRef}>
                  <div 
                    key={activeTab} // triggers re-animation
                    className="p-8 lg:p-12 min-h-[300px] anim-rise"
                    role="tabpanel"
                  >
                    <h3 className="font-display font-bold text-2xl text-forest-deep mb-6">
                      {activeContent.tab}
                    </h3>
                    
                    <div className="space-y-6">
                      {activeContent.lines.map((line, i) => (
                        <p 
                          key={i} 
                          className="text-lg text-ink leading-loose border-b border-sky/40 pb-2 relative"
                        >
                          {/* Faint ruled line effect */}
                          <span className="relative z-10">{line}</span>
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
