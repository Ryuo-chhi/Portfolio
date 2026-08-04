import { profile } from '../data/profile'
import Robot from '../components/Robot'
import Stitch from '../components/Stitch'
import ThemeToggle from '../components/ThemeToggle'

/**
 * The page footer.
 */
export default function Footer({ theme, toggleTheme }) {
  return (
    <footer className="py-16 text-center overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 flex flex-col items-center">
        
        <div className="w-[100px] mb-6">
          <Robot size={100} loopWave={true} />
        </div>

        <h2 className="font-display font-bold text-2xl text-forest-deep mb-2">
          Thanks for visiting my workshop.
        </h2>
        <p className="text-ink-soft mb-8">
          Have a wonderful day.
        </p>

        <div className="w-full max-w-md mx-auto mb-8">
          <Stitch />
        </div>

        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 text-sm font-mono tracking-wide text-ink-soft">
          <div className="flex gap-6">
            {profile.links.map((link, i) => (
              <a 
                key={i} 
                href={link.href} 
                target="_blank" 
                rel="noreferrer"
                className="hover:text-forest transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a 
              href={`mailto:${profile.email}`} 
              className="hover:text-forest transition-colors"
            >
              Email
            </a>
          </div>
          
          <div className="hidden md:block w-1 h-1 rounded-full bg-ink/20" />
          
          <div className="flex items-center gap-3">
            <span>Theme</span>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>
        </div>

      </div>
    </footer>
  )
}
