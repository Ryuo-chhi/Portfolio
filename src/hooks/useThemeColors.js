import { useState, useEffect } from 'react'

export function useThemeColors() {
  const [colors, setColors] = useState({})
  const [isNight, setIsNight] = useState(false)

  useEffect(() => {
    // A helper to grab colors out of the cascade
    const updateColors = () => {
      const styles = getComputedStyle(document.body)
      const parseHex = (hexStr) => {
        const h = hexStr.trim().replace('#', '')
        if (h.length === 6) {
          return {
            r: parseInt(h.substring(0, 2), 16),
            g: parseInt(h.substring(2, 4), 16),
            b: parseInt(h.substring(4, 6), 16),
          }
        }
        return { r: 0, g: 0, b: 0 }
      }

      setColors({
        wall: parseHex(styles.getPropertyValue('--color-cream')),
        floor: parseHex(styles.getPropertyValue('--color-sand')),
        wood: parseHex(styles.getPropertyValue('--color-bark')),
        woodLight: parseHex(styles.getPropertyValue('--color-bark-light')),
        forest: parseHex(styles.getPropertyValue('--color-forest')),
        forestDeep: parseHex(styles.getPropertyValue('--color-forest-deep')),
        sage: parseHex(styles.getPropertyValue('--color-sage')),
        sageSoft: parseHex(styles.getPropertyValue('--color-sage-soft')),
        ember: parseHex(styles.getPropertyValue('--color-ember')),
        emberSoft: parseHex(styles.getPropertyValue('--color-ember-soft')),
        sky: parseHex(styles.getPropertyValue('--color-sky')),
      })
      setIsNight(document.documentElement.classList.contains('night'))
    }

    // Initial read
    updateColors()

    // Listen for class changes on document.documentElement (for theme)
    const observer = new MutationObserver(updateColors)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    
    // Also re-eval on resize or media query changes if necessary, but mutation observer is enough for class toggles.
    // Let's add a window resize listener just in case layout shifts need it, though colors won't change
    window.addEventListener('resize', updateColors)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updateColors)
    }
  }, [])

  return { colors, isNight }
}
