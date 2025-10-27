import React from 'react'
import { motion } from 'framer-motion'
import resume from '../data/resume.json'

export default function Experience() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.6,
        ease: [0.175, 0.885, 0.32, 1.275]
      }
    }
  }

  const bulletVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.4
      }
    })
  }

  const iconEmojis = ['💼', '🚀', '🔬', '📊'];

  return (
    <section id="experience" className="section">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="section-title">
        Experience Timeline
      </motion.h2>
      <motion.div 
        className="experience-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {resume.experience.map((exp, i) => (
          <motion.div 
            key={i} 
            variants={cardVariants}
            whileHover={{ 
              y: -8,
              transition: { duration: 0.3 }
            }}
            className="experience-card"
          >
            {/* Icon Badge */}
            <div className="exp-icon-badge">
              {iconEmojis[i % iconEmojis.length]}
            </div>

            {/* Side Accent */}
            <div className="exp-side-accent"></div>

            <div className="experience-card-content">
              <motion.div 
                className="exp-header"
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <h3 className="exp-role">{exp.role}</h3>
                <div className="exp-org">{exp.org}</div>
                <div className="exp-meta">
                  <span className="exp-period">📅 {exp.period}</span>
                  <span className="exp-location">📍 {exp.location}</span>
                </div>
              </motion.div>
              
              <div className="exp-bullets">
                {exp.bullets.map((b, j) => (
                  <motion.div 
                    key={j}
                    custom={j}
                    variants={bulletVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="exp-bullet"
                  >
                    <span className="bullet-dot"></span>
                    <span className="bullet-text">{b}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
