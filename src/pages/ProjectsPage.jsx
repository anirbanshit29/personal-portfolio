import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ── Project data ────────────────────────────────────────────── */
const PROJECTS = [
  {
    id: 1,
    slug: '_alcohol-delivery',
    title: 'Alcohol Delivery Platform',
    description: 'Full-stack delivery web app with product catalog, cart, JWT authentication, real-time order tracking, and admin dashboard for inventory management.',
    tags: ['React', 'Node.js', 'MongoDB', 'JavaScript'],
    status: 'In Progress',
    link: '#',
    gradient: 'linear-gradient(135deg, #1a0a00 0%, #2d1200 40%, #1a0a00 100%)',
    accent: '#FEA55F',
    icon: '🍺',
  },
  {
    id: 2,
    slug: '_portfolio',
    title: 'Developer Portfolio',
    description: 'This site — a VS Code-themed portfolio with a playable Snake game, live code previews, file tree navigation, and interactive project filtering.',
    tags: ['React', 'JavaScript', 'CSS'],
    status: 'Live',
    link: '#',
    gradient: 'linear-gradient(135deg, #001a2d 0%, #002d4a 40%, #001a2d 100%)',
    accent: '#43D9AD',
    icon: '💻',
  },
]

/* ── All available filters ───────────────────────────────────── */
const ALL_TECHS = [
  { label: 'React',      color: '#5BC8F5' },
  { label: 'Node.js',    color: '#43D9AD' },
  { label: 'MongoDB',    color: '#43D9AD' },
  { label: 'JavaScript', color: '#FEA55F' },
  { label: 'CSS',        color: '#C778DD' },
  { label: 'HTML',       color: '#F47067' },
]

function TechIcon({ label, color }) {
  const abbr = { React: 'Re', 'Node.js': 'No', MongoDB: 'Mg', JavaScript: 'JS', CSS: 'CS', HTML: 'HT' }
  return (
    <div className="tech-badge" style={{ borderColor: `${color}30`, color }}>
      {abbr[label] || label.slice(0, 2)}
    </div>
  )
}

function ProjectCard({ project, idx }) {
  return (
    <motion.div
      className="project-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: idx * 0.08 }}
      layout
    >
      {/* Image area */}
      <div className="project-img" style={{ background: project.gradient }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: '3rem', filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.1))' }}>{project.icon}</span>
        </div>
        {/* Status badge */}
        <div style={{
          position: 'absolute', top: 10, right: 10,
          padding: '3px 8px', borderRadius: 3,
          border: `1px solid ${project.accent}40`,
          background: `${project.accent}10`,
          color: project.accent,
          fontSize: '0.6rem', fontFamily: 'JetBrains Mono, monospace',
        }}>
          {project.status}
        </div>
        {/* Stack icons */}
        <div style={{ position: 'absolute', bottom: 8, right: 8, display: 'flex', gap: 4 }}>
          {project.tags.slice(0, 2).map(t => {
            const tech = ALL_TECHS.find(a => a.label === t)
            return tech ? <TechIcon key={t} label={t} color={tech.color} /> : null
          })}
        </div>
      </div>

      <div className="project-body">
        <p className="project-desc">{project.description}</p>
        <a href={project.link} target="_blank" rel="noopener noreferrer" className="view-btn">
          view-project →
        </a>
      </div>
    </motion.div>
  )
}

export default function ProjectsPage() {
  const [checked, setChecked] = useState(new Set())

  const toggle = tech => {
    setChecked(prev => {
      const next = new Set(prev)
      if (next.has(tech)) next.delete(tech)
      else next.add(tech)
      return next
    })
  }

  const filtered = checked.size === 0
    ? PROJECTS
    : PROJECTS.filter(p => p.tags.some(t => checked.has(t)))

  const activeFilters = [...checked]

  return (
    <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

      {/* ── Sidebar: Tech filter ── */}
      <div className="vsc-sidebar">
        <div className="sidebar-section-title" style={{ marginTop: 8 }}>
          <span style={{ color: '#3a5068' }}>▾</span>
          projects
        </div>

        {ALL_TECHS.map(({ label, color }) => {
          const isChecked = checked.has(label)
          return (
            <div
              key={label}
              className="sidebar-item"
              onClick={() => toggle(label)}
              style={{ gap: 8, cursor: 'pointer' }}
            >
              <div
                className={`vsc-checkbox${isChecked ? ' checked' : ''}`}
                onClick={e => { e.stopPropagation(); toggle(label) }}
              >
                {isChecked && <span className="vsc-checkbox-mark">✓</span>}
              </div>
              <TechIcon label={label} color={color} />
              <span style={{ color: isChecked ? '#FFFFFF' : '#607B96', transition: 'color 0.15s' }}>{label}</span>
            </div>
          )
        })}
      </div>

      {/* ── Content ── */}
      <div className="vsc-content">
        {/* Inner tab bar */}
        <div className="vsc-inner-tabs" style={{ alignItems: 'center', gap: 0 }}>
          {activeFilters.length === 0 ? (
            <div className="vsc-inner-tab">
              <span>all projects</span>
            </div>
          ) : (
            activeFilters.map(f => (
              <div key={f} className="vsc-inner-tab">
                <span>{f}</span>
                <span className="close" onClick={() => toggle(f)}>×</span>
              </div>
            ))
          )}
        </div>

        {/* Cards grid */}
        <div className="pane-scroll" style={{ padding: '24px 28px' }}>
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ color: '#3a5068', fontSize: '0.8rem', padding: 40, textAlign: 'center' }}
              >
                // No projects match the selected filters
              </motion.div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
                {filtered.map((p, i) => (
                  <div key={p.id}>
                    <p style={{ color: '#607B96', fontSize: '0.7rem', marginBottom: 10 }}>
                      <span style={{ color: '#43D9AD' }}>Project {i + 1}</span>
                      <span style={{ color: '#3a5068' }}> // {p.slug}</span>
                    </p>
                    <ProjectCard project={p} idx={i} />
                  </div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
