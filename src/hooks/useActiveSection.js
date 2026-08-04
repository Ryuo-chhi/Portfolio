import { useState, useEffect, useRef } from 'react'
import { navigation } from '../data/navigation'

export function useActiveSection() {
  const [active, setActive] = useState(navigation[0].id)
  const headerRef = useRef(null)

  useEffect(() => {
    let frame = 0
    const measure = () => {
      frame = 0
      // Use a proportional probe: 40% of the viewport height.
      // This ensures that when a section is scrolled into the upper middle of the screen, it activates.
      const probe = window.innerHeight * 0.4
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10
      if (atBottom) {
        setActive(navigation[navigation.length - 1].id)
        return
      }
      
      let current = navigation[0].id
      for (const { id } of navigation) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= probe) {
          current = id
        }
      }
      setActive(current)
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  return { active, headerRef }
}
