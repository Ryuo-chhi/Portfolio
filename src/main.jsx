import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'

function Root() {
  // Global focus key listener for Konami code backup
  useEffect(() => {
    document.getElementById('root')?.focus()
  }, [])

  return (
    <StrictMode>
      <App />
    </StrictMode>
  )
}

createRoot(document.getElementById('root')).render(<Root />)
