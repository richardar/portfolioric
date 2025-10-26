import React from 'react'
import { motion } from 'framer-motion'
import projects from '../data/projects.json'

export default function Projects() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
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
        className="projects-grid">
        {projects.map((proj, i) => {
          const imgSrc = `/assets/projects/${proj.name}.png`
          const fallbackSrc = proj.image || `https://opengraph.githubassets.com/1/${proj.url?.split('github.com/')[1]}`
          
          return (
            <motion.div 
              key={i} 
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="project-card">
              <img 
                className="proj-img" 
                src={imgSrc} 
                alt={proj.name}
                onError={(e) => { e.currentTarget.src = fallbackSrc }} 
              />
              <div className="proj-body">
                <h3>{proj.name}</h3>
                <p>{proj.desc || proj.readme_excerpt}</p>
                <div className="tags">
                  {proj.language && <span className="tag">{proj.language}</span>}
                </div>
                <div className="meta">
                  {proj.stars && <span>★ {proj.stars}</span>}
                  <a href={proj.url} target="_blank" rel="noopener noreferrer">View Project →</a>
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
