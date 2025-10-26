import React from 'react'
import { motion } from 'framer-motion'
import resume from '../data/resume.json'

export default function Experience() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      rotateY: 90,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      rotateY: 0,
      scale: 1,
      transition: { 
        duration: 0.8,
        type: "spring",
        bounce: 0.4
      }
    }
  }

  const bulletVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  }

  const getGradient = (index) => {
    const gradients = [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    ];
    return gradients[index % gradients.length];
  }

  return (
    <section id="experience" className="section">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="section-title">
        Experience
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
              scale: 1.03,
              rotateY: 5,
              transition: { duration: 0.3 }
            }}
            className="experience-card"
            style={{ 
              transformStyle: 'preserve-3d',
              perspective: '1000px'
            }}
          >
            <div 
              className="experience-card-gradient" 
              style={{ background: getGradient(i) }}
            />
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
                <div className="exp-period">{exp.period}</div>
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
                    <span className="bullet-icon">▹</span>
                    {b}
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
