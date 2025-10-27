import Head from 'next/head'
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import Projects from '../components/Projects'
import Experience from '../components/Experience'
import Skills from '../components/Skills'
import Contact from '../components/Contact'
import AnimatedBackground from '../components/AnimatedBackground'
import FloatingCode from '../components/FloatingCode'
import InteractiveEffects from '../components/InteractiveEffects'

export default function Home() {
  return (
    <>
      <Head>
        <title>Gratus Anthuvan - Full Stack & ML Engineer</title>
        <meta name="description" content="Full Stack & ML Engineer building end-to-end products with React, Django, and PyTorch" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AnimatedBackground />
      <FloatingCode />
      <InteractiveEffects />
      <div className="app-bg">
        <Nav />
        <Hero />
        <Projects />
        <Experience />
        <Skills />
        
        <section id="about" className="section">
          <h2 className="section-title">About Me</h2>
          <div className="about-card">
            <div className="terminal-header">
              <span className="dot" style={{background:'#ef4444'}}/>
              <span className="dot" style={{background:'#f59e0b'}}/>
              <span className="dot" style={{background:'#10b981'}}/>
              <span style={{marginLeft: '12px', fontSize: '13px', color: '#9ca3af'}}>about.sh</span>
            </div>
            <div className="terminal-body">
              <p><span className="prompt">$</span> whoami</p>
              <p style={{marginLeft: '1.5rem', color: 'var(--text-muted)'}}>
                Hi, I'm <code>Richard Anthuvan Rosario</code> - a Full Stack & ML Engineer who builds end-to-end products, from React frontends to Django backends to production ML models.
              </p>
              <p style={{marginTop: '1rem'}}><span className="prompt">$</span> cat expertise.txt</p>
              <p style={{marginLeft: '1.5rem', color: 'var(--text-muted)'}}>
                <strong style={{color: 'var(--accent)'}}>Frontend:</strong> React, TypeScript, Next.js<br/>
                <strong style={{color: 'var(--accent)'}}>Backend:</strong> Django, FastAPI, PostgreSQL<br/>
                <strong style={{color: 'var(--accent)'}}>ML/AI:</strong> PyTorch, scikit-learn, MLOps<br/>
                <strong style={{color: 'var(--accent)'}}>DevOps:</strong> Docker, CI/CD, AWS, GCP
              </p>
              <p style={{marginTop: '1rem'}}><span className="prompt">$</span> location</p>
              <p style={{marginLeft: '1.5rem', color: 'var(--text-muted)'}}>
                Based in <code>Nottingham, UK</code>. MSc AI @ University of Nottingham.
              </p>
              <p style={{marginTop: '1rem'}}><span className="prompt">$</span> status</p>
              <p style={{marginLeft: '1.5rem', color: 'var(--text-muted)'}}>
                Open to <code>Full Stack Engineer</code>, <code>ML Engineer</code>, and <code>Software Engineer</code> roles building impactful products.
              </p>
            </div>
          </div>
        </section>
        <Contact />
      </div>
    </>
  )
}
