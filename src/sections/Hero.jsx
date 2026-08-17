import { profile } from '../data/profile'
import WorkshopScene from '../illustrations/WorkshopScene'
import Icon from '../components/Icon'

/**
 * The hero section. Asymmetric split with copy left and the interactive workshop scene right.
 */
export default function Hero() {
  return (
    <section id="workshop" className="pt-8 pb-16 lg:pt-16 lg:pb-24 lg:scroll-mt-20 scroll-mt-36">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] gap-12 items-center">
          
          {/* Left: Copy */}
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold font-display text-forest-deep mb-6">
              Hello <span className="inline-flex align-middle text-ember anim-wave-loop origin-bottom-center ml-1"><Icon name="wave" className="w-9 h-9 lg:w-11 lg:h-11 inline-block" /></span><br />
              I'm {profile.name}.
            </h1>
            
            <p className="text-lg lg:text-xl text-ink-soft leading-relaxed mb-8 max-w-lg">
              {profile.tagline}
            </p>
            
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-10">
              <a 
                href="#projects" 
                className="w-full sm:w-auto text-center px-6 py-3 bg-forest text-cream font-bold rounded-btn shadow-soft hover:-translate-y-0.5 hover:shadow-lift transition-all duration-300 border border-transparent"
              >
                Explore My Workshop
              </a>
              <a 
                href="#contact" 
                className="w-full sm:w-auto text-center px-6 py-3 bg-cream text-forest-deep font-bold rounded-btn shadow-soft hover:-translate-y-0.5 hover:shadow-lift transition-all duration-300 border border-ink/5"
              >
                Let's Talk
              </a>
            </div>
            
            <div className="flex flex-wrap gap-6 pt-6 border-t border-ink/10">
              {profile.stats.map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="font-mono text-sm text-forest-deep font-bold mb-1 tracking-wide">{stat.value}</span>
                  <span className="text-sm text-ink-soft">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Illustration */}
          <div className="bg-cream rounded-panel p-6 shadow-soft border border-ink/5 relative overflow-hidden grain">
            <WorkshopScene />
          </div>

        </div>
      </div>
    </section>
  )
}
