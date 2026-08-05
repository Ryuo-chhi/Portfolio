import { useEffect } from 'react'

/**
 * A modal overlay displaying project details.
 * 
 * @param {object} props
 * @param {object} props.project - The project object to display
 * @param {function} props.onClose - Function to call to close the modal
 */
export default function ProjectModal({ project, onClose }) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  if (!project) return null

  // If clicking on the backdrop, close the modal.
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-ink/30 backdrop-blur-sm transition-opacity"
        onClick={handleBackdropClick}
      />
      
      {/* Modal Card */}
      <div 
        className="relative w-full max-w-2xl bg-cream rounded-[24px] shadow-lift overflow-hidden anim-rise z-10 border border-ink/5"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center hover:bg-ink/5 text-ink-soft transition-colors"
          aria-label="Close"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="p-6 sm:p-8 md:p-12">
          <div className="flex items-center gap-5 mb-8">
            <div 
              className="w-14 h-14 rounded-2xl flex items-center justify-center font-display font-bold text-[24px] text-forest-deep shadow-sm shrink-0"
              style={{ backgroundColor: project.hue }}
            >
              {project.name.charAt(0)}
            </div>
            <div>
              <h2 id="modal-title" className="font-display font-bold text-2xl sm:text-[28px] text-forest-deep leading-tight">
                {project.name}
              </h2>
              <div className="text-[15px] font-mono text-ink-soft/70 mt-1">{project.year} • {project.tag}</div>
            </div>
          </div>

          <p className="text-[17px] text-ink-soft leading-relaxed mb-10">
            {project.blurb}
          </p>

          <div className="mb-12">
            <h3 className="text-[13px] font-bold font-mono text-ink/40 uppercase tracking-widest mb-4">Technologies Used</h3>
            <div className="flex flex-wrap gap-2 sm:gap-2.5">
              {project.stack.map(tech => (
                <span key={tech} className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/60 border border-ink/10 text-xs sm:text-[13px] font-mono text-ink-soft shadow-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <a 
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full border border-ink/15 bg-white text-forest-deep font-bold hover:bg-ink/5 transition-colors shadow-sm text-[15px]"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              Source Code
            </a>
            
            {/* If project.live doesn't exist, we fallback to project.href so there is a primary call to action, or just keep Source Code. We will add Live Preview anyway, linking to href if live is missing. */}
            <a 
              href={project.live || project.href}
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-ember text-stamp font-bold hover:brightness-105 shadow-sm transition-all text-[15px]"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
              {project.live ? 'Live Preview' : 'View Project'}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
