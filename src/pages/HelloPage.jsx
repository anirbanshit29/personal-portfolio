import { motion } from 'framer-motion'
import SnakeGame from '../components/SnakeGame'

const f = { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }

const RESUME_PATH = '/resume.pdf'
const RESUME_FILENAME = 'Anirbanshit-Resume.pdf'

const outlineBtn = {
  padding: '8px 20px',
  border: '1px solid #43D9AD',
  background: 'transparent',
  color: '#43D9AD',
  fontFamily: 'JetBrains Mono, monospace',
  fontSize: '0.75rem',
  cursor: 'pointer',
  borderRadius: 4,
  transition: 'all 0.2s',
  textDecoration: 'none',
  display: 'inline-block',
}

export default function HelloPage({ onNavigate }) {
  return (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '40px 60px', gap: 60, overflow: 'hidden' }}>

      {/* ── Left: Intro text ── */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <motion.div {...f} transition={{ ...f.transition, delay: 0.05 }}>
          <p style={{ color: '#607B96', fontSize: '0.8rem', marginBottom: 10, fontStyle: 'italic' }}>
            Hi all. I am
          </p>
        </motion.div>

        <motion.h1 {...f} transition={{ ...f.transition, delay: 0.12 }}
          style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 10 }}
        >
          Anirban Shit
        </motion.h1>

        <motion.p {...f} transition={{ ...f.transition, delay: 0.2 }}
          style={{ fontSize: '1rem', color: '#43D9AD', marginBottom: 32, display: 'flex', alignItems: 'center', gap: 6 }}
        >
          <span style={{ color: '#607B96' }}>&gt;</span>
          Full-Stack Web Developer
        </motion.p>

        <motion.div {...f} transition={{ ...f.transition, delay: 0.28 }}
          style={{ color: '#3a5068', fontSize: '0.75rem', lineHeight: 2, marginBottom: 24 }}
        >
          <div>// B.Tech CSE @ JGEC — Batch 2028</div>
          <div>// Building real-world web applications</div>
          <div>// Check out my GitHub:</div>
          <div style={{ marginTop: 4 }}>
            <span style={{ color: '#C778DD' }}>const </span>
            <span style={{ color: '#5BC8F5' }}>githubLink</span>
            <span style={{ color: '#607B96' }}> = </span>
            <a
              href="https://github.com/anirbanshit"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#43D9AD', textDecoration: 'underline', textDecorationColor: 'rgba(67,217,173,0.3)' }}
            >
              "https://github.com/anirbanshit"
            </a>
          </div>
          <div style={{ marginTop: 8 }}>// Download my resume:</div>
          <div style={{ marginTop: 4 }}>
            <span style={{ color: '#C778DD' }}>const </span>
            <span style={{ color: '#5BC8F5' }}>resumeLink</span>
            <span style={{ color: '#607B96' }}> = </span>
            <a
              href={RESUME_PATH}
              download={RESUME_FILENAME}
              style={{ color: '#43D9AD', textDecoration: 'underline', textDecorationColor: 'rgba(67,217,173,0.3)' }}
            >
              "{RESUME_PATH}"
            </a>
          </div>
        </motion.div>

        <motion.div {...f} transition={{ ...f.transition, delay: 0.36 }} style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          <button
            onClick={() => onNavigate('contact')}
            style={outlineBtn}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(67,217,173,0.08)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            contact-me
          </button>
          <a
            href={RESUME_PATH}
            download={RESUME_FILENAME}
            style={outlineBtn}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(67,217,173,0.08)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            download-resume
          </a>
        </motion.div>
      </div>

      {/* ── Right: Snake game ── */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ flexShrink: 0 }}
      >
        <SnakeGame onSkip={() => onNavigate('about')} />
      </motion.div>
    </div>
  )
}
