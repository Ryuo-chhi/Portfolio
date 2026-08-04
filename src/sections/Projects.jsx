import { useState } from 'react'
import { projects } from '../data/projects'
import SectionLabel from '../components/SectionLabel'
import Stitch from '../components/Stitch'
import Robot from '../components/Robot'

/**
 * The projects shelf. A grid of project boxes sitting on a wooden plank.
 */
export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState(null)

  return (
    <section id="projects" className="py-16 lg:py-24 lg:scroll-mt-20 scroll-mt-36 bg-ink/5">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="flex flex-col lg:flex-row gap-8 lg:items-end mb-12">
          <div className="flex-1">
            <SectionLabel>02. Projects</SectionLabel>
            <h2 className="text-3xl font-bold font-display text-forest-deep">The Shelf</h2>
          </div>
          <div className="hidden lg:block relative" aria-hidden="true">
            {/* The robot points out the hovered project */}
            <div className="absolute bottom-0 right-0 w-[60px]">
              <Robot size={60} />
              {hoveredProject && (
                <div className="absolute bottom-full right-full mb-2 w-[140px] bg-cream text-ink-soft text-sm font-sans p-2 rounded-card shadow-soft text-center anim-rise">
                  Ah, {hoveredProject.name}. Good one.
                  <div className="absolute top-full right-4 w-0 h-0 border-4 border-transparent border-t-cream"></div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {projects.map((project, i) => (
            <div 
              key={i}
              className="relative group flex flex-col h-full"
              onMouseEnter={() => setHoveredProject(project)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* The Plank (Shelf base) */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[110%] md:w-[120%] h-4 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-bark shadow-soft rounded-t-sm" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[86%] h-1 bg-bark-light" />
              </div>

              {/* The Box (Card) */}
              <a 
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="relative z-10 flex flex-col h-full bg-cream rounded-card p-6 border border-ink/5 shadow-soft transition-all duration-500 var(--ease-cozy) group-hover:-translate-y-1.5 group-hover:shadow-lift focus-visible"
              >
                {/* Header row */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  {/* Initial Tile */}
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center font-display font-bold text-xl text-stamp shadow-inner transition-transform duration-500 group-hover:-rotate-6"
                    style={{ backgroundColor: project.hue }}
                  >
                    {project.name.charAt(0)}
                  </div>
                  {/* Tag pill */}
                  <div className="px-2 py-1 rounded-full bg-ink/5 text-ink-soft text-xs font-mono font-bold tracking-wide">
                    {project.tag}
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-display font-bold text-xl text-forest-deep group-hover:text-forest transition-colors">
                    {project.name}
                  </h3>
                  <span className="text-sm font-mono text-ink/40">{project.year}</span>
                </div>

                <p className="text-ink-soft leading-relaxed flex-1 mb-6">
                  {project.blurb}
                </p>

                <div className="mt-auto">
                  {/* Stack Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.stack.map(tech => (
                      <span key={tech} className="text-xs font-mono text-ink-soft/70">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <Stitch />

                  <div className="font-mono text-sm text-ember font-bold">
                    {project.metric}
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
