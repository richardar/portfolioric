import React from 'react'
import { motion } from 'framer-motion'
import resume from '../data/resume.json'
import { EmailIcon, LinkedInIcon, GitHubIcon } from './Icons'

export default function Contact() {
  return (
    <section id="contact" className="section">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="section-title">
        Get In Touch
      </motion.h2>
      <div className="contact-grid">
        <motion.form 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="contact-form" 
          action="https://formspree.io/f/FORM_ID" 
          method="POST">
          <label>
            <span>Name</span>
            <input type="text" name="name" required />
          </label>
          <label>
            <span>Email</span>
            <input type="email" name="email" required />
          </label>
          <label>
            <span>Message</span>
            <textarea name="message" rows="4" required></textarea>
          </label>
          <button type="submit" className="btn">Send Message</button>
        </motion.form>
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="contact-info">
          <div className="about-card">
            <div className="terminal-header">
              <span className="dot" style={{background:'#ef4444'}}/>
              <span className="dot" style={{background:'#f59e0b'}}/>
              <span className="dot" style={{background:'#10b981'}}/>
              <span style={{marginLeft: '12px', fontSize: '13px', color: '#9ca3af'}}>contact.sh</span>
            </div>
            <div className="terminal-body">
              <p>Building <code>Software Products and ML Systems </code> that scale.</p>
              <p>Open to <code>contract work</code> and <code>full-time roles</code>.</p>
            </div>
          </div>
          <ul className="contact-list">
            <li>
              <EmailIcon size={22} />
              <div>
                <strong>Email</strong>
                <a href={`mailto:${resume.email}`}>{resume.email}</a>
              </div>
            </li>
            <li>
              <LinkedInIcon size={22} />
              <div>
                <strong>LinkedIn</strong>
                <a href={resume.linkedin} target="_blank" rel="noopener noreferrer">View Profile</a>
              </div>
            </li>
            <li>
              <GitHubIcon size={22} />
              <div>
                <strong>GitHub</strong>
                <a href={resume.github} target="_blank" rel="noopener noreferrer">@{resume.github.split('/').pop()}</a>
              </div>
            </li>
          </ul>
          <a href="/resume.pdf" className="btn ghost" target="_blank" rel="noopener noreferrer">Download Resume</a>
        </motion.div>
      </div>
    </section>
  )
}