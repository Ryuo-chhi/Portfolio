import { useState } from 'react'
import { projects } from '../data/projects'
import SectionLabel from '../components/SectionLabel'
import Stitch from '../components/Stitch'
import Robot from '../components/Robot'
import ProjectModal from '../components/ProjectModal'

/**
 * The projects shelf. A grid of project boxes sitting on a wooden plank.
 */
export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <section id="projects" className="py-16 lg:py-24 lg:scroll-mt-20 scroll-mt-36 bg-ink/5">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="flex flex-col lg:flex-row gap-8 lg:items-end mb-12">
          <div className="flex-1">
            <SectionLabel>02. Projects</SectionLabel>
            <h2 className="text-3xl font-bold font-display text-forest-deep">The Shelf</h2>
          </div>
          <div className="hidden lg:block relative" aria-hidden="true">
            <div className="absolute bottom-0 right-0 w-[60px]">
              <Robot size={60} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {projects.map((project, i) => (
            <div 
              key={i}
              className="relative group flex flex-col h-full"
            >
              {/* The Plank (Shelf base) */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[105%] h-3 bg-bark rounded-b-md z-0 pointer-events-none" />
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-[95%] h-2 bg-bark-light rounded-b-md z-0 pointer-events-none" />

              {/* The Box (Card) - Cozy flat design */}
              <button 
                onClick={() => setSelectedProject(project)}
                className="relative z-10 flex flex-col h-full bg-cream rounded-[24px] p-7 md:p-8 border border-ink/5 shadow-sm transition-transform duration-500 ease-out hover:-translate-y-1.5 focus-visible text-left cursor-pointer w-full"
              >
                {/* Header row */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  {/* Initial Tile */}
                  <div 
                    className="w-[52px] h-[52px] rounded-2xl flex items-center justify-center font-display font-bold text-[22px] text-forest-deep shadow-sm"
                    style={{ backgroundColor: project.hue }}
                  >
                    {project.name.charAt(0)}
                  </div>
                  
                  {/* Tag pill */}
                  <div className="px-3.5 py-1.5 rounded-full bg-forest/10 text-forest-deep text-[11px] uppercase font-mono font-bold tracking-widest">
                    {project.tag}
                  </div>
                </div>

                <div className="flex items-baseline gap-3 mb-4">
                  <h3 className="font-display font-bold text-[26px] text-forest-deep">
                    {project.name}
                  </h3>
                  <span className="text-sm font-mono text-ink-soft/60">{project.year}</span>
                </div>

                <p className="text-ink-soft leading-relaxed flex-1 mb-8 text-[17px] line-clamp-3">
                  {project.blurb}
                </p>

                <div className="mt-auto">
                  {/* Stack Tags */}
                  <div className="flex flex-wrap gap-2.5 mb-6">
                    {project.stack.map(tech => (
                      <span key={tech} className="px-3 py-1 rounded-full border border-ink/15 text-[12px] font-mono text-ink-soft/80">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <Stitch />

                  <div className="font-mono text-[13px] text-ember font-bold tracking-widest uppercase mt-6">
                    {project.metric}
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>

        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </div>
    </section>
  )
}
