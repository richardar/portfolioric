import { useEffect, useState } from 'react';

const InteractiveEffects = () => {
  const [particles, setParticles] = useState([]);
  const [ripples, setRipples] = useState([]);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Mouse move effect - trailing particles
    const handleMouseMove = (e) => {
      setCursor({ x: e.clientX, y: e.clientY });
      
      // Add particle on mouse move (throttled)
      if (Math.random() > 0.7) {
        const particle = {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 8 + 4,
          speedX: (Math.random() - 0.5) * 2,
          speedY: (Math.random() - 0.5) * 2,
          life: 1
        };
        setParticles(prev => [...prev.slice(-20), particle]);
      }
    };

    // Click effect - ripples
    const handleClick = (e) => {
      const ripple = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY
      };
      setRipples(prev => [...prev, ripple]);
      
      // Add explosion particles
      for (let i = 0; i < 12; i++) {
        const angle = (Math.PI * 2 * i) / 12;
        const particle = {
          id: Date.now() + i + Math.random(),
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 6 + 3,
          speedX: Math.cos(angle) * (Math.random() * 3 + 2),
          speedY: Math.sin(angle) * (Math.random() * 3 + 2),
          life: 1
        };
        setParticles(prev => [...prev, particle]);
      }
      
      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== ripple.id));
      }, 800);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    // Particle animation loop
    const interval = setInterval(() => {
      setParticles(prev => 
        prev
          .map(p => ({
            ...p,
            x: p.x + p.speedX,
            y: p.y + p.speedY,
            life: p.life - 0.02
          }))
          .filter(p => p.life > 0)
      );
    }, 16);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {/* Custom Cursor */}
      <div 
        className="custom-cursor"
        style={{
          left: cursor.x,
          top: cursor.y
        }}
      />
      
      {/* Particles */}
      <div className="particles-container">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              opacity: particle.life
            }}
          />
        ))}
      </div>

      {/* Click Ripples */}
      <div className="ripples-container">
        {ripples.map(ripple => (
          <div
            key={ripple.id}
            className="ripple"
            style={{
              left: ripple.x,
              top: ripple.y
            }}
          />
        ))}
      </div>
    </>
  );
};

export default InteractiveEffects;
