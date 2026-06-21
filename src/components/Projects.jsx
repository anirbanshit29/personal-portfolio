import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react'

const PROJECTS = [
  {
    id: 'alcohol-delivery',
    num: '01',
    title: 'Alcohol Delivery Platform',
    subtitle: 'Full-stack delivery web application',
    description: 'End-to-end delivery platform with product catalog, cart system, JWT authentication, real-time order tracking, and an admin dashboard. Designed for production scale.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'REST API'],
    status: { label: 'In Progress', color: '#F59E0B' },
    links: { live: '#', source: '#' },
    accentColor: 'rgba(245,158,11,',
    highlights: [
      'JWT-based auth with protected routes',
      'Admin dashboard for inventory management',
      'Real-time order status tracking',
      'Responsive mobile-first UI',
    ],
  },
  {
    id: 'portfolio',
    num: '02',
    title: 'Developer Portfolio',
    subtitle: 'This very site',
    description: 'Personal portfolio built with React + Vite + Tailwind CSS. Features a FAANG-inspired design system, star particle hero, animated gradient name, border beam cards, and staggered reveals.',
    stack: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    status: { label: 'Live', color: '#4ADE80' },
    links: { live: '#', source: '#' },
    accentColor: 'rgba(96,165,250,',
    highlights: [
      'Animated star particle canvas background',
      'Line-by-line code typewriter animation',
      'Border beam + spotlight glow on cards',
      'Count-up stats & staggered tag reveals',
    ],
  },
]

function ProjectCard({ project, index }) {
  const cardRef = useRef(null)
  const inView  = useInView(cardRef, { once: true, margin: '-60px' })
  const [hov, setHov] = useState(false)
  const [mouse, setMouse] = useState({ x: 50, y: 50 })
  const [tilt, setTilt]   = useState({ x: 0, y: 0 })

  const onMove = e => {
    const r = cardRef.current?.getBoundingClientRect()
    if (!r) return
    const rx = (e.clientX - r.left) / r.width
    const ry = (e.clientY - r.top)  / r.height
    setMouse({ x: rx * 100, y: ry * 100 })
    setTilt({ x: (rx - 0.5) * 12, y: (ry - 0.5) * -12 })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="card-glow"
    >
      <article
        ref={cardRef}
        onMouseMove={onMove}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => { setHov(false); setTilt({ x: 0, y: 0 }); setMouse({ x: 50, y: 50 }) }}
        className="card-glow-inner"
        style={{
          padding: 0, overflow: 'hidden',
          transform: hov
            ? `perspective(900px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateY(-5px) scale(1.012)`
            : 'perspective(900px) rotateX(0) rotateY(0) translateY(0) scale(1)',
          transition: 'transform 0.25s cubic-bezier(0.22,1,0.36,1)',
          willChange: 'transform',
        }}
      >
        {/* Spotlight */}
        <div
          aria-hidden
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', borderRadius: 15,
            background: `radial-gradient(320px circle at ${mouse.x}% ${mouse.y}%, ${project.accentColor}0.07) 0%, transparent 60%)`,
            opacity: hov ? 1 : 0,
            transition: 'opacity 0.3s ease',
            zIndex: 0,
          }}
        />

        {/* Top accent bar */}
        <div style={{
          height: 2,
          background: hov
            ? `linear-gradient(90deg, transparent, ${project.accentColor}0.7), ${project.accentColor}0.4), transparent)`
            : `linear-gradient(90deg, transparent, ${project.accentColor}0.2), transparent)`,
          transition: 'all 0.4s ease',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Header row */}
          <div style={{ padding: '20px 24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6875rem', color: 'rgba(255,255,255,0.1)', fontWeight: 700 }}>
              {project.num}
            </span>
            <motion.div
              animate={project.status.label === 'In Progress' ? { opacity: [1, 0.5, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 5, background: `${project.status.color}12`, border: `1px solid ${project.status.color}28` }}
            >
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: project.status.color, boxShadow: `0 0 6px ${project.status.color}` }} />
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.625rem', color: project.status.color, fontWeight: 600, letterSpacing: '0.04em' }}>
                {project.status.label}
              </span>
            </motion.div>
          </div>

          <div style={{ padding: '0 24px 26px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FAFAFA', letterSpacing: '-0.04em', marginBottom: 4, transition: 'color 0.2s ease' }}>
              {project.title}
            </h3>
            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6875rem', color: '#60A5FA', marginBottom: 16, letterSpacing: '0.01em' }}>
              {project.subtitle}
            </p>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.78, color: '#52525B', letterSpacing: '-0.01em', marginBottom: 20 }}>
              {project.description}
            </p>

            {/* Highlights */}
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 22 }}>
              {project.highlights.map((h, hi) => (
                <motion.li
                  key={h}
                  initial={{ opacity: 0, x: -14 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -14 }}
                  transition={{ duration: 0.45, delay: index * 0.15 + hi * 0.07 + 0.3 }}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.8125rem', color: '#52525B', letterSpacing: '-0.01em' }}
                >
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', color: '#60A5FA', flexShrink: 0 }}>–</span>
                  {h}
                </motion.li>
              ))}
            </ul>

            {/* Stack tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 22 }}>
              {project.stack.map(t => <span key={t} className="tag">{t}</span>)}
            </div>

            <div style={{ height: 1, background: 'rgba(255,255,255,0.04)', marginBottom: 18 }} />

            {/* Links */}
            <div style={{ display: 'flex', gap: 20 }}>
              {[
                { href: project.links.live,   Icon: ExternalLink, label: 'Live Demo',   color: '#60A5FA' },
                { href: project.links.source, Icon: Github,       label: 'Source',      color: '#374151' },
              ].map(({ href, Icon, label, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 3, color: label === 'Source' ? '#71717A' : '#93C5FD' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                  style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.8125rem', fontWeight: 600, color, textDecoration: 'none', letterSpacing: '-0.01em' }}
                >
                  <Icon size={12} /> {label}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </article>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 40 }}
        >
          <div>
            <p className="section-label">projects</p>
            <h2 className="section-heading">Selected Work</h2>
          </div>
          <motion.a
            href="https://github.com/anirbanshit"
            target="_blank" rel="noopener noreferrer"
            whileHover={{ x: 4, color: '#71717A' }}
            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
            style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: '#27272A', textDecoration: 'none' }}
          >
            github.com/anirbanshit <ArrowUpRight size={12} />
          </motion.a>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {PROJECTS.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
        </div>
      </div>
    </section>
  )
}
