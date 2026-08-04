import { useState, useEffect } from 'react'

export function useScrollProgress(ref) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0
    const measure = () => {
      frame = 0
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      // How much of the element has scrolled past the middle of the viewport?
      const viewportMid = window.innerHeight / 2
      const totalDist = rect.height
      const currentDist = viewportMid - rect.top
      
      let p = currentDist / totalDist
      if (p < 0) p = 0
      if (p > 1) p = 1
      setProgress(p)
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
  }, [ref])

  return progress
}
