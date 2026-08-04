import { useState, useEffect } from 'react'

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    const saved = window.localStorage.getItem('workshop-theme')
    if (saved === 'light' || saved === 'dark') return saved
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return 'light'
  })

  useEffect(() => {
    window.localStorage.setItem('workshop-theme', theme)
    document.documentElement.style.colorScheme = theme
    document.documentElement.classList.toggle('night', theme === 'dark')
  }, [theme])

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark')

  return { theme, toggleTheme, setTheme }
}
