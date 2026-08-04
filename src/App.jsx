import { useTheme } from './hooks/useTheme'
import { useActiveSection } from './hooks/useActiveSection'

import Header from './components/Header'
import Hero from './sections/Hero'
import Story from './sections/Story'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import BlueprintWall from './sections/BlueprintWall'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

function App() {
  const { theme, toggleTheme, setTheme } = useTheme()
  const { active: activeSection } = useActiveSection()

  // Konami Code Easter Egg
  let konamiPosition = 0
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
  
  const handleKeyDown = (e) => {
    if (e.key === konamiCode[konamiPosition]) {
      konamiPosition++
      if (konamiPosition === konamiCode.length) {
        toggleTheme()
        konamiPosition = 0
      }
    } else {
      konamiPosition = 0
    }
  }

  return (
    <div 
      className="min-h-screen relative selection:bg-ember-soft selection:text-forest-deep"
      onKeyDown={handleKeyDown}
      tabIndex={-1}
      style={{ outline: 'none' }} // to catch key events anywhere if focused
    >
      <Header theme={theme} toggleTheme={toggleTheme} activeSection={activeSection} />
      
      <main>
        <Hero />
        <Story />
        <Projects />
        <Skills />
        <BlueprintWall />
        <Contact />
      </main>

      <Footer theme={theme} toggleTheme={toggleTheme} />
    </div>
  )
}

export default App
