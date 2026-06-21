import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HelloPage    from './pages/HelloPage'
import AboutPage    from './pages/AboutPage'
import SkillsPage   from './pages/SkillsPage'
import ProjectsPage from './pages/ProjectsPage'
import ContactPage  from './pages/ContactPage'

/* ── Section config ──────────────────────────────────────────── */
const SECTIONS = [
  { id: 'hello',    label: '_hello',      Component: HelloPage },
  { id: 'about',    label: '_about-me',   Component: AboutPage },
  { id: 'skills',   label: '_skills',     Component: SkillsPage },
  { id: 'projects', label: '_projects',   Component: ProjectsPage },
  { id: 'contact',  label: '_contact-me', Component: ContactPage },
]

/* ── SVG Icons ───────────────────────────────────────────────── */
function LinkedinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  )
}

/* ── Scroll-nav dots (right side) ────────────────────────────── */
function ScrollDots({ active, onDotClick }) {
  return (
    <div style={{
      position: 'fixed',
      right: 14,
      top: '50%',
      transform: 'translateY(-50%)',
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      zIndex: 100,
    }}>
      {SECTIONS.map(s => (
        <button
          key={s.id}
          title={s.label}
          onClick={() => onDotClick(s.id)}
          style={{
            width: active === s.id ? 8 : 5,
            height: active === s.id ? 8 : 5,
            borderRadius: '50%',
            background: active === s.id ? '#43D9AD' : '#1e2d3d',
            border: active === s.id ? '1px solid rgba(67,217,173,0.5)' : '1px solid #1e2d3d',
            cursor: 'pointer',
            padding: 0,
            transition: 'all 0.25s ease',
            boxShadow: active === s.id ? '0 0 8px rgba(67,217,173,0.5)' : 'none',
          }}
        />
      ))}
    </div>
  )
}

/* ── Scroll hint arrow ───────────────────────────────────────── */
function ScrollHint({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'absolute',
            bottom: 12,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            pointerEvents: 'none',
            zIndex: 10,
          }}
        >
          <span style={{ fontSize: '0.55rem', color: '#3a5068', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.1em' }}>scroll</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ color: '#3a5068', fontSize: '0.8rem' }}
          >
            ↓
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ── Main App ────────────────────────────────────────────────── */
export default function App() {
  const [active, setActive] = useState('hello')
  const mainRef = useRef(null)
  const sectionRefs = useRef({})

  // Scroll to a section
  const scrollTo = useCallback((id) => {
    const el = sectionRefs.current[id]
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setActive(id)
  }, [])

  // IntersectionObserver: update active tab as you scroll
  useEffect(() => {
    const container = mainRef.current
    if (!container) return

    const observers = SECTIONS.map(({ id }) => {
      const el = sectionRefs.current[id]
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id)
        },
        {
          root: container,
          threshold: 0.4,       // 40% visible triggers active state
        }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(obs => obs?.disconnect())
  }, [])

  return (
    <div className="vsc-app">

      {/* ══ Fixed Tab Bar ════════════════════════════════════════ */}
      <header className="vsc-tabbar">
        <div className="vsc-logo">anirban-shit</div>

        <div className="vsc-tabs">
          {SECTIONS.map(s => (
            <button
              key={s.id}
              className={`vsc-tab${active === s.id ? ' active' : ''}`}
              onClick={() => scrollTo(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>
      </header>

      {/* ══ Scrollable sections container ════════════════════════ */}
      <div
        ref={mainRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          scrollSnapType: 'y mandatory',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {SECTIONS.map(({ id, Component }, idx) => (
          <div
            key={id}
            id={`section-${id}`}
            ref={el => { sectionRefs.current[id] = el }}
            style={{
              height: 'calc(100vh - 70px)', // 42px tabbar + 28px statusbar
              display: 'flex',
              overflow: 'hidden',
              position: 'relative',
              borderTop: idx > 0 ? '1px solid #1e2d3d' : 'none',
              scrollSnapAlign: 'start',
              scrollSnapStop: 'always',
            }}
          >
            {/* Section label watermark */}
            <div style={{
              position: 'absolute',
              top: 8,
              right: 28,
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.6rem',
              color: '#1e2d3d',
              letterSpacing: '0.1em',
              pointerEvents: 'none',
              zIndex: 0,
            }}>
              // {String(idx + 1).padStart(2, '0')} — {id}
            </div>

            <Component onNavigate={scrollTo} />

            {/* Scroll hint on every section except last */}
            {idx < SECTIONS.length - 1 && (
              <ScrollHint visible={active === id} />
            )}
          </div>
        ))}
      </div>

      {/* ══ Fixed Status Bar ═════════════════════════════════════ */}
      <footer className="vsc-statusbar">
        <span>find me in:</span>
        <a href="https://www.linkedin.com/in/anirbanshit" target="_blank" rel="noopener noreferrer" title="LinkedIn">
          <LinkedinIcon />
        </a>
        <a href="https://github.com/anirbanshit29" target="_blank" rel="noopener noreferrer" title="GitHub">
          <GithubIcon />
        </a>
        <span style={{ marginLeft: 'auto', color: '#3a5068', fontSize: '0.65rem' }}>
          B.Tech CSE @ JGEC · Batch 2028
        </span>

        {/* Scroll position counter */}
        <span style={{
          color: '#3a5068',
          fontSize: '0.6rem',
          fontFamily: 'JetBrains Mono, monospace',
          borderLeft: '1px solid #1e2d3d',
          paddingLeft: 10,
          marginLeft: 4,
        }}>
          {String(SECTIONS.findIndex(s => s.id === active) + 1)}/{SECTIONS.length}
        </span>
      </footer>

      {/* ══ Scroll nav dots ══════════════════════════════════════ */}
      <ScrollDots active={active} onDotClick={scrollTo} />
    </div>
  )
}
