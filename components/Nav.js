import { useState, useEffect } from 'react'
import resume from '../data/resume.json'

export default function Nav(){
  const greetings = [
    "👋 Hey there!",
    "💻 Welcome!",
    "🚀 Hello!",
    "✨ Hi!",
    "👨‍💻 Greetings!"
  ]
  
  const [currentGreeting, setCurrentGreeting] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGreeting((prev) => (prev + 1) % greetings.length)
    }, 3000)
    
    return () => clearInterval(interval)
  }, [])
  
  return (
    <nav>
      <a href="#" className="brand greeting-animated">
        {greetings[currentGreeting]}
      </a>
      <div className="nav-links">
        <a href="#projects">Projects</a>
        <a href="#skills">Skills</a>
        <a href="#experience">Experience</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  )
}
