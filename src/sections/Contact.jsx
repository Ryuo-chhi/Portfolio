import { useState } from 'react'
import { profile } from '../data/profile'
import SectionLabel from '../components/SectionLabel'
import Mailbox from '../illustrations/Mailbox'
import Robot from '../components/Robot'

/**
 * A letter-style contact form alongside the mailbox illustration.
 */
export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Mock submit
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 8000)
  }

  return (
    <section id="contact" className="py-16 lg:py-24 lg:scroll-mt-20 scroll-mt-36 bg-ink/5">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Copy and Mailbox */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <SectionLabel>05. Contact</SectionLabel>
            <h2 className="text-3xl font-bold font-display text-forest-deep mb-6">Let's talk</h2>
            <p className="text-lg text-ink-soft leading-relaxed mb-12 max-w-md">
              {profile.contact.invitation}
            </p>
            <Mailbox />
          </div>

          {/* Right: The Letter Form */}
          <div className="relative">
            {submitted && (
              <div 
                className="absolute inset-0 bg-cream/90 backdrop-blur-sm z-20 flex flex-col items-center justify-center rounded-panel shadow-lift p-8 text-center anim-rise"
                aria-live="polite"
              >
                <div className="w-24 mb-4">
                  <Robot size={100} waving={true} />
                </div>
                <p className="font-display font-bold text-xl text-forest-deep">
                  {profile.contact.confirmation}
                </p>
              </div>
            )}

            <form 
              onSubmit={handleSubmit}
              className="bg-cream rounded-[24px] p-8 lg:p-10 shadow-sm border border-ink/5 grain"
            >
              <h3 className="font-display text-[22px] font-bold text-forest-deep mb-8">
                Dear {profile.name.split(' ')[0]},
              </h3>

              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div className="flex flex-col">
                    <label htmlFor="name" className="text-[11px] font-mono text-ink-soft/80 font-bold tracking-widest uppercase mb-2">My name is</label>
                    <input 
                      type="text" 
                      id="name" 
                      required
                      className="bg-transparent border border-sage/40 focus:border-sage rounded-2xl px-5 py-4 text-ink-soft text-[15px] outline-none transition-colors font-sans placeholder-ink/30"
                      placeholder="Mira Sandoval"
                    />
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col">
                    <label htmlFor="email" className="text-[11px] font-mono text-ink-soft/80 font-bold tracking-widest uppercase mb-2">Write back to</label>
                    <input 
                      type="email" 
                      id="email" 
                      required
                      className="bg-transparent border border-sage/40 focus:border-sage rounded-2xl px-5 py-4 text-ink-soft text-[15px] outline-none transition-colors font-sans placeholder-ink/30"
                      placeholder="mira@studio.co"
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="message" className="text-[11px] font-mono text-ink-soft/80 font-bold tracking-widest uppercase mb-2">Here is what I'm building</label>
                  <textarea 
                    id="message" 
                    required
                    rows="4"
                    className="bg-transparent border border-sage/40 focus:border-sage rounded-2xl px-5 py-4 text-ink-soft text-[15px] outline-none transition-colors font-sans resize-none placeholder-ink/30"
                    placeholder="We run a small ceramics studio and our order form is held together with tape..."
                  />
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button 
                  type="submit"
                  className="flex items-center justify-center gap-2.5 px-8 py-3.5 bg-ember text-stamp font-bold rounded-2xl shadow-sm hover:brightness-105 hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto"
                >
                  <span className="text-[20px]">📨</span>
                  Send Message
                </button>
              </div>
            </form>
          </div>

        </div>

      </div>
    </section>
  )
}
