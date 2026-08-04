import { skills } from '../data/skills'
import SectionLabel from '../components/SectionLabel'
import ToolGlyph from '../components/ToolGlyph'

/**
 * A toolbox containing drawers of skills.
 */
export default function Skills() {
  return (
    <section id="skills" className="py-16 lg:py-24 lg:scroll-mt-20 scroll-mt-36">
      <div className="max-w-4xl mx-auto px-6 text-center lg:text-left">
        
        <SectionLabel>03. Skills</SectionLabel>
        <h2 className="text-3xl font-bold font-display text-forest-deep mb-12">The Toolbox</h2>

        {/* The Outer Toolbox */}
        <div className="bg-bark rounded-panel p-2 md:p-4 shadow-lift relative">
          
          {/* Handle */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-48 h-8 rounded-t-xl border-4 border-b-0 border-bark-light z-0 hidden md:block" />

          {/* Inner cavity */}
          <div className="bg-sand rounded-[20px] p-6 lg:p-10 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 shadow-inner">
            
            {skills.map((drawer, i) => (
              <div key={i} className="flex flex-col">
                <h3 className="font-display font-bold text-lg text-forest-deep mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-ember/60 inline-block" />
                  {drawer.drawer}
                </h3>
                
                {/* The Drawer Panel */}
                <div className="bg-cream rounded-card p-2 shadow-soft border border-ink/5">
                  <ul className="flex flex-col">
                    {drawer.tools.map((tool) => (
                      <li 
                        key={tool.name}
                        className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-forest/5 transition-colors group"
                      >
                        <div className="text-sage group-hover:text-forest transition-colors">
                          <ToolGlyph name={tool.glyph} />
                        </div>
                        <span className="font-mono text-sm text-ink-soft group-hover:text-forest-deep font-bold transition-colors">
                          {tool.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

          </div>
        </div>

      </div>
    </section>
  )
}
