import React from 'react'
import { motion } from 'framer-motion'
import projects from '../data/projects.json'

export default function Projects() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, rotateX: -15, y: 50 },
    visible: { 
      opacity: 1, 
      rotateX: 0,
      y: 0,
      transition: { 
        duration: 0.8,
        type: "spring",
        bounce: 0.3
      }
    }
  }

  return (
    <section id="projects" className="section">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="section-title">
        Featured Projects
      </motion.h2>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="projects-showcase">
        {projects.map((proj, i) => {
          const imgSrc = `/assets/projects/${proj.name}.png`
          const fallbackSrc = proj.image || `https://opengraph.githubassets.com/1/${proj.url?.split('github.com/')[1]}`
          
          return (
            <motion.div 
              key={i} 
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                rotateY: 2,
                transition: { duration: 0.3 }
              }}
              className="monitor-container"
              style={{ 
                transformStyle: 'preserve-3d',
                perspective: '1000px'
              }}
            >
              {/* Monitor Frame */}
              <div className="monitor-frame">
                <div className="monitor-bezel">
                  {/* Monitor Header */}
                  <div className="monitor-header">
                    <div className="monitor-dots">
                      <span className="dot" style={{background:'#ef4444'}}/>
                      <span className="dot" style={{background:'#f59e0b'}}/>
                      <span className="dot" style={{background:'#10b981'}}/>
                    </div>
                    <span className="monitor-title">{proj.name}</span>
                    <div className="monitor-actions">
                      <span>━</span>
                      <span>□</span>
                      <span>✕</span>
                    </div>
                    <div className="power-button" title="Power"></div>
                  </div>

                  {/* Monitor Screen */}
                  <div className="monitor-screen">
                    <div className="screen-content">
                      <img 
                        className="project-preview" 
                        src={imgSrc} 
                        alt={proj.name}
                        onError={(e) => { e.currentTarget.src = fallbackSrc }} 
                      />
                      <div className="screen-overlay">
                        <div className="overlay-content">
                          <h4>{proj.name}</h4>
                          <p>{proj.desc || proj.readme_excerpt}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Monitor Footer */}
                  <div className="monitor-footer">
                    <div className="project-meta">
                      {proj.language && (
                        <span className="tech-badge">{proj.language}</span>
                      )}
                      {proj.stars && (
                        <span className="star-count">⭐ {proj.stars}</span>
                      )}
                    </div>
                    <a 
                      href={proj.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="view-project-btn"
                    >
                      View Project →
                    </a>
                  </div>
                </div>

                {/* Monitor Stand */}
                <div className="monitor-stand">
                  <div className="stand-neck"></div>
                  <div className="stand-base"></div>
                </div>
              </div>

              {/* Glow Effect */}
              <div className="monitor-glow"></div>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
