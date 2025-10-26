import React from 'react'
import { motion } from 'framer-motion'
import resume from '../data/resume.json'

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.4 }
    }
  }

  return (
    <section id="skills" className="section">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="section-title">
        Technical Skills
      </motion.h2>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="skills-grid">
        {resume.skills.map((sk, i) => (
          <motion.div 
            key={i} 
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="skill-item">
            <div className="skill-name">{sk.name}</div>
            <div className="skill-bar">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: `${sk.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.05, ease: "easeOut" }}
                className="skill-level" />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
