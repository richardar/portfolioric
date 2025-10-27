import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import resume from "../data/resume.json";
import { EmailIcon, LinkedInIcon, GitHubIcon } from "./Icons";

function useTypewriter(phrases = [], speed = 100, pause = 3000) {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!phrases.length) return;

    const currentPhrase = phrases[phraseIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing forward
          if (charIndex < currentPhrase.length) {
            setText(currentPhrase.slice(0, charIndex + 1));
            setCharIndex(charIndex + 1);
          } else {
            // Finished typing, pause before deleting
            setTimeout(() => setIsDeleting(true), pause);
          }
        } else {
          // Deleting
          if (charIndex > 0) {
            setText(currentPhrase.slice(0, charIndex - 1));
            setCharIndex(charIndex - 1);
          } else {
            // Finished deleting, move to next phrase
            setIsDeleting(false);
            setPhraseIndex((phraseIndex + 1) % phrases.length);
          }
        }
      },
      isDeleting ? speed / 2 : speed
    );

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, phraseIndex, phrases, speed, pause]);

  return text;
}

export default function Hero() {
  const name = resume.name || "Your Name";
  const summary = resume.summary || "Software & Machine Learning Engineer.";
  const phrases = [
    "Full Stack & ML Engineer",
    "React • Django • PyTorch",
    "I Like Building Production Grade Systems",
  ];
  const typed = useTypewriter(phrases, 100, 3000);

  return (
    <section className="hero">
      <div className="hero-grid">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hero-left"
        >
          <div className="eyebrow">
            {typed}
            <span className="cursor">|</span>
          </div>
          <h1 className="title">{name}</h1>
          <p className="subtitle">{summary}</p>
          <div className="hero-cta">
            <a
              className="btn"
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Resume
            </a>
            <a className="btn ghost" href="#projects">
              View Projects
            </a>
          </div>
          <div className="social-links">
            <a
              href={resume.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="LinkedIn"
            >
              <LinkedInIcon size={24} />
            </a>
            <a
              href={resume.github}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="GitHub"
            >
              <GitHubIcon size={24} />
            </a>
            <a
              href={`mailto:${resume.email}`}
              className="social-icon"
              aria-label="Email"
            >
              <EmailIcon size={24} />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hero-right"
        >
          <div className="code-block">
            <div className="code-header">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
              <span className="code-title">ml_engineer.py</span>
            </div>
            <pre className="snippet">
              <span style={{ color: "#ff79c6" }}>class</span>{" "}
              <span style={{ color: "#50fa7b" }}>FullStackMLEngineer</span>:
              {"\n"} <span style={{ color: "#ff79c6" }}>def</span>{" "}
              <span style={{ color: "#8be9fd" }}>__init__</span>(
              <span style={{ color: "#bd93f9" }}>self</span>):{"\n"}{" "}
              <span style={{ color: "#bd93f9" }}>self</span>.name ={" "}
              <span style={{ color: "#f1fa8c" }}>
                "{resume.name.split(" ")[0]}"
              </span>
              {"\n"} <span style={{ color: "#bd93f9" }}>self</span>.stack ={" "}
              {"{"}
              {"\n"} <span style={{ color: "#f1fa8c" }}>"frontend"</span>: [
              <span style={{ color: "#f1fa8c" }}>"React"</span>,{" "}
              <span style={{ color: "#f1fa8c" }}>"TypeScript"</span>],{"\n"}{" "}
              <span style={{ color: "#f1fa8c" }}>"backend"</span>: [
              <span style={{ color: "#f1fa8c" }}>"Django"</span>,{" "}
              <span style={{ color: "#f1fa8c" }}>"Node JS"</span>,{" "}
              <span style={{ color: "#f1fa8c" }}>"FastAPI"</span>],{"\n"}{" "}
              <span style={{ color: "#f1fa8c" }}>"ml"</span>: [
              <span style={{ color: "#f1fa8c" }}>"PyTorch"</span>,{" "}
              <span style={{ color: "#f1fa8c" }}>"scikit-learn"</span>],{"\n"}{" "}
              <span style={{ color: "#f1fa8c" }}>"devops"</span>: [
              <span style={{ color: "#f1fa8c" }}>"Docker"</span>,{" "}
              <span style={{ color: "#f1fa8c" }}>"CI/CD"</span>]{"\n"} {"}"}
              {"\n"}
              {"\n"} <span style={{ color: "#ff79c6" }}>def</span>{" "}
              <span style={{ color: "#8be9fd" }}>build</span>(
              <span style={{ color: "#bd93f9" }}>self</span>):{"\n"}{" "}
              <span style={{ color: "#ff79c6" }}>return</span>{" "}
              <span style={{ color: "#f1fa8c" }}>"End-to-end ML products"</span>
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
