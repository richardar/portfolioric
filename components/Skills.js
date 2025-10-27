import React from 'react'
import { motion } from 'framer-motion'
import resume from '../data/resume.json'

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const nodeVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 200,
        damping: 15
      }
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
        Skills
      </motion.h2>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="neural-network">

        {/* Skill nodes */}
        <div className="skill-nodes">
          {resume.skills.map((sk, i) => (
            <motion.div 
              key={i} 
              variants={nodeVariants}
              whileHover={{ 
                scale: 1.15,
                transition: { duration: 0.6 }
              }}
              className="skill-node"
            >
              <div className="node-core">
                <div className="node-ring"></div>
                <div className="node-ring ring-2"></div>
                <div className="node-center">
                  <span className="skill-name">{sk.name}</span>
                  <div className="skill-percentage">{sk.level}%</div>
                </div>
                <div className="node-pulse"></div>
              </div>
              
              {/* Activation bars */}
              <div className="activation-bars">
                {[...Array(5)].map((_, idx) => (
                  <motion.div 
                    key={idx}
                    className={`activation-bar ${idx < Math.ceil(sk.level / 20) ? 'active' : ''}`}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    transition={{ delay: i * 0.1 + idx * 0.05, duration: 0.3 }}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
