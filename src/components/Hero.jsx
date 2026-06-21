import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Download, ArrowRight, Github, Linkedin } from 'lucide-react'

/* ── Star particle canvas ────────────────────────────────────── */
function StarCanvas() {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.2,
      a: Math.random(),
      speed: Math.random() * 0.003 + 0.002,
      drift: (Math.random() - 0.5) * 0.12,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      stars.forEach(s => {
        s.a += s.speed
        const alpha = (Math.sin(s.a) * 0.5 + 0.5) * 0.6
        s.x += s.drift
        if (s.x < 0) s.x = canvas.width
        if (s.x > canvas.width) s.x = 0
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(148,163,184,${alpha})`
        ctx.fill()
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(raf) }
  }, [])
  return <canvas ref={ref} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />
}

/* ── Typewriter code window ──────────────────────────────────── */
const CODE_LINES = [
  [{ t: 'const ',    c: 'token-keyword' }, { t: 'developer', c: 'token-prop' }, { t: ' = {', c: 'token-bracket' }],
  [{ t: '  name',    c: 'token-prop' }, { t: ':      ', c: 'token-bracket' }, { t: '"Anirban Shit"',          c: 'token-string' }, { t: ',', c: 'token-bracket' }],
  [{ t: '  role',    c: 'token-prop' }, { t: ':      ', c: 'token-bracket' }, { t: '"Full-Stack Developer"',  c: 'token-string' }, { t: ',', c: 'token-bracket' }],
  [{ t: '  college', c: 'token-prop' }, { t: ':   ', c: 'token-bracket' }, { t: '"JGEC · CSE · 2028"',      c: 'token-string' }, { t: ',', c: 'token-bracket' }],
  [{ t: '  stack',   c: 'token-prop' }, { t: ':     ', c: 'token-bracket' }, { t: '["React", "Node.js", "MongoDB"]', c: 'token-string' }, { t: ',', c: 'token-bracket' }],
  [{ t: '  status',  c: 'token-prop' }, { t: ':   ', c: 'token-bracket' }, { t: '"open to opportunities"',  c: 'token-string' }],
  [{ t: '}', c: 'token-bracket' }],
  [],
  [{ t: 'export default ', c: 'token-keyword' }, { t: 'developer', c: 'token-prop' }],
]

function CodeWindow() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true })
  const [lines, setLines] = useState(0)

  useEffect(() => {
    if (!inView) return
    let i = 0
    const id = setInterval(() => { i++; setLines(i); if (i >= CODE_LINES.length) clearInterval(id) }, 120)
    return () => clearInterval(id)
  }, [inView])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="code-window"
    >
      <div className="code-window-bar">
        <div className="code-window-dot" style={{ background: '#FF5F57' }} />
        <div className="code-window-dot" style={{ background: '#FFBD2E' }} />
        <div className="code-window-dot" style={{ background: '#28C840' }} />
        <span style={{ marginLeft: 10, fontSize: '0.6875rem', color: '#374151', fontFamily: 'JetBrains Mono, monospace' }}>developer.ts</span>
      </div>
      <div className="code-window-body" style={{ minHeight: 210 }}>
        <pre style={{ margin: 0 }}>
          {CODE_LINES.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={i < lines ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              style={{ minHeight: '1.75em', display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}
            >
              {line.map((tok, j) => <span key={j} className={tok.c}>{tok.t}</span>)}
              {i === lines - 1 && lines === CODE_LINES.length && (
                <span style={{ color: '#60A5FA', animation: 'blink 1.1s step-end infinite' }}>|</span>
              )}
            </motion.div>
          ))}
          {lines < CODE_LINES.length && (
            <span style={{ color: '#60A5FA', animation: 'blink 0.6s step-end infinite' }}>|</span>
          )}
        </pre>
      </div>
    </motion.div>
  )
}

/* ── Stagger helpers ─────────────────────────────────────────── */
const container = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } } }
const item = { hidden: { opacity: 0, y: 26, filter: 'blur(4px)' }, show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } }

export default function Hero() {
  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="home" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
      {/* Stars */}
      <StarCanvas />

      {/* Hero glow behind heading */}
      <motion.div
        aria-hidden
        animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.12, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%,-50%)',
          width: 800, height: 500, pointerEvents: 'none',
          background: 'radial-gradient(ellipse, rgba(96,165,250,0.08) 0%, rgba(139,92,246,0.05) 40%, transparent 70%)',
        }}
      />

      <div className="container-main" style={{ position: 'relative', zIndex: 2, paddingTop: 130, paddingBottom: 80 }}>

        {/* ── Text block ── */}
        <motion.div variants={container} initial="hidden" animate="show" style={{ maxWidth: 680, marginBottom: 48 }}>

          {/* Status */}
          <motion.div variants={item} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 28 }}>
            <span className="status-dot" />
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6875rem', color: '#52525B', letterSpacing: '0.06em' }}>
              available · open to opportunities
            </span>
          </motion.div>

          {/* Animated gradient name */}
          <motion.h1
            variants={item}
            style={{
              fontSize: 'clamp(2.8rem, 7vw, 4.8rem)',
              fontWeight: 900, letterSpacing: '-0.06em', lineHeight: 1.04,
              marginBottom: 12,
            }}
          >
            <span className="gradient-name">Anirban Shit</span>
          </motion.h1>

          {/* Role */}
          <motion.p
            variants={item}
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 'clamp(0.875rem, 2vw, 1.0625rem)',
              letterSpacing: '0.01em', marginBottom: 22,
              display: 'flex', alignItems: 'center', gap: 8,
            }}
          >
            <span style={{ color: '#4ADE80' }}>{'>'}</span>
            <span style={{ color: '#60A5FA' }}>Full-Stack Web Developer</span>
            <span style={{ color: '#374151', animation: 'blink 1.4s step-end infinite' }}>_</span>
          </motion.p>

          {/* Bio */}
          <motion.p
            variants={item}
            style={{ fontSize: '0.9375rem', lineHeight: 1.8, color: '#52525B', letterSpacing: '-0.01em', marginBottom: 32, maxWidth: 500 }}
          >
            B.Tech CSE student at JGEC (Batch 2028). I build performant,
            clean web applications end to end — with strong roots in algorithms
            and a passion for great user experiences.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 36 }}>
            <a href="/resume.pdf" download className="btn-primary">
              <Download size={14} /> Download Resume
            </a>
            <button className="btn-ghost" onClick={() => scrollTo('projects')}>
              View Projects <ArrowRight size={14} />
            </button>
          </motion.div>

          {/* Socials */}
          <motion.div variants={item} style={{ display: 'flex', gap: 24 }}>
            {[
              { href: 'https://github.com/anirbanshit',          Icon: Github,   label: 'GitHub' },
              { href: 'https://www.linkedin.com/in/anirbanshit', Icon: Linkedin, label: 'LinkedIn' },
            ].map(({ href, Icon, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                whileHover={{ y: -2, color: '#93C5FD' }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <Icon size={15} /> {label}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Code window ── */}
        <CodeWindow />

        {/* ── Scroll cue ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8, duration: 0.8 }}
          style={{ position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}
        >
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5625rem', color: '#27272A', letterSpacing: '0.14em', textTransform: 'uppercase' }}>scroll</span>
          <motion.div
            animate={{ scaleY: [1, 0.3, 1], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: 1, height: 32, background: 'linear-gradient(to bottom, #60A5FA, transparent)', transformOrigin: 'top' }}
          />
        </motion.div>
      </div>
    </section>
  )
}
