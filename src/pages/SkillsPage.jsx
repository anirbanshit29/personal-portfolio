import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ── Skills data ─────────────────────────────────────────────── */
const SKILL_MAP = {
  languages: {
    label:    'languages',
    varName:  'languages',
    dot:      'dot-orange',
    colorKey: 'languages',
    comment:  '// ─── Languages I know ──────────────────────',
    type:     'string[]',
    items:    ['C++', 'JavaScript (ES2024)', 'HTML5', 'CSS3'],
  },
  frameworks: {
    label:    'frameworks',
    varName:  'frameworks',
    dot:      'dot-blue',
    colorKey: 'frameworks',
    comment:  '// ─── Frameworks & Libraries ────────────────',
    type:     'string[]',
    items:    ['React', 'Node.js', 'Express.js', 'Tailwind CSS'],
  },
  tools: {
    label:    'tools',
    varName:  'tools',
    dot:      'dot-purple',
    colorKey: 'tools',
    comment:  '// ─── Tools & Platforms ─────────────────────',
    type:     'string[]',
    items:    ['Git', 'GitHub', 'MongoDB', 'REST APIs', 'VS Code', 'Responsive Design'],
  },
  cs: {
    label:    'core-concepts',
    varName:  'csFundamentals',
    dot:      'dot-red',
    colorKey: 'cs',
    comment:  '// ─── CS Fundamentals ───────────────────────',
    type:     'string[]',
    items:    [
      'Data Structures & Algorithms',
      'Object Oriented Programming',
      'Database Management System',
      'Operating System',
    ],
  },
}

const TECH_SIDEBAR = ['languages', 'frameworks', 'tools']
const CS_SIDEBAR   = ['cs']

/* ── Color palette ───────────────────────────────────────────── */
const COLORS = {
  languages: { bg: 'rgba(254,165,95,0.08)',  border: 'rgba(254,165,95,0.3)',  text: '#FEA55F' },
  frameworks: { bg: 'rgba(91,200,245,0.08)', border: 'rgba(91,200,245,0.3)',  text: '#5BC8F5' },
  tools:      { bg: 'rgba(199,120,221,0.08)',border: 'rgba(199,120,221,0.3)', text: '#C778DD' },
  cs:         { bg: 'rgba(67,217,173,0.08)', border: 'rgba(67,217,173,0.3)',  text: '#43D9AD' },
}

/* ── Build code lines for one skill group ────────────────────── */
function buildLines(key) {
  const s = SKILL_MAP[key]
  return [
    { t: '/**',                                         c: 's-comment' },
    { t: ` * ${s.label}.ts`,                            c: 's-comment' },
    { t: ` * Anirban Shit — ${s.label}`,                c: 's-comment' },
    { t: ' */',                                         c: 's-comment' },
    { t: '',                                            c: '' },
    { t: s.comment,                                     c: 's-comment' },
    { t: '',                                            c: '' },
    { raw: true, content: [
      { t: 'const ',     c: 's-keyword' },
      { t: s.varName,    c: 's-fn' },
      { t: ': ',         c: '' },
      { t: s.type,       c: 's-type' },
      { t: ' = [',       c: '' },
    ]},
    ...s.items.map(item => ({
      raw: true,
      content: [
        { t: '  ', c: '' },
        { t: `"${item}"`, c: 's-string' },
        { t: ',',  c: '' },
      ],
    })),
    { t: ']',            c: '' },
    { t: '',             c: '' },
    { raw: true, content: [
      { t: 'export ', c: 's-keyword' },
      { t: 'default ', c: 's-keyword' },
      { t: s.varName, c: 's-fn' },
    ]},
  ]
}

function renderLine(line, i) {
  if (!line.t && !line.raw) return <div key={i}>&nbsp;</div>
  if (line.raw) {
    return (
      <div key={i} style={{ display: 'flex', flexWrap: 'wrap' }}>
        {line.content.map((tok, j) => (
          <span key={j} className={tok.c}>{tok.t}</span>
        ))}
      </div>
    )
  }
  return <div key={i} className={line.c}>{line.t || '\u00a0'}</div>
}

/* ── Skill pill ──────────────────────────────────────────────── */
function SkillPill({ label, colorKey, delay = 0 }) {
  const c = COLORS[colorKey]
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8, y: 6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.28, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '5px 12px',
        margin: '4px',
        borderRadius: 4,
        border: `1px solid ${c.border}`,
        background: c.bg,
        color: c.text,
        fontSize: '0.72rem',
        fontFamily: 'JetBrains Mono, monospace',
        fontWeight: 500,
        cursor: 'default',
        userSelect: 'none',
      }}
      whileHover={{ scale: 1.06, boxShadow: `0 0 12px ${c.border}` }}
    >
      {label}
    </motion.span>
  )
}

/* ── Stats bar ───────────────────────────────────────────────── */
const ALL_STATS = [
  { key: 'languages',  label: 'languages',   val: 4, max: 6 },
  { key: 'frameworks', label: 'frameworks',  val: 4, max: 6 },
  { key: 'tools',      label: 'tools',       val: 6, max: 6 },
  { key: 'cs',         label: 'cs-concepts', val: 4, max: 6 },
]

function StatBar({ label, val, max, colorKey, isActive }) {
  const c = COLORS[colorKey]
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: '0.65rem' }}>
        <span style={{ color: isActive ? c.text : '#607B96', transition: 'color 0.2s', fontFamily: 'JetBrains Mono, monospace' }}>
          {label}
        </span>
        <span style={{ color: isActive ? c.text : '#3a5068', transition: 'color 0.2s' }}>{val}</span>
      </div>
      <div style={{ height: 3, background: '#1e2d3d', borderRadius: 2, overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(val / max) * 100}%` }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height: '100%',
            background: isActive
              ? `linear-gradient(90deg, ${c.text}, ${c.text}99)`
              : 'linear-gradient(90deg, #43D9AD, #5BC8F5)',
            borderRadius: 2,
            transition: 'background 0.3s ease',
          }}
        />
      </div>
    </div>
  )
}

/* ── Main component ──────────────────────────────────────────── */
export default function SkillsPage() {
  const [activeKey, setActiveKey] = useState('languages')
  const [openTech, setOpenTech]   = useState(true)
  const [openCS,   setOpenCS]     = useState(true)

  const current  = SKILL_MAP[activeKey]
  const lines    = buildLines(activeKey)
  const c        = COLORS[current.colorKey]

  return (
    <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

      {/* ── Sidebar ── */}
      <div className="vsc-sidebar">

        {/* Technical Skills */}
        <div
          className="sidebar-section-title"
          style={{ cursor: 'pointer', marginTop: 8 }}
          onClick={() => setOpenTech(o => !o)}
        >
          <span style={{ color: '#3a5068' }}>{openTech ? '▾' : '▸'}</span>
          technical-skills
        </div>
        {openTech && TECH_SIDEBAR.map(key => (
          <div
            key={key}
            className={`sidebar-item${activeKey === key ? ' active' : ''}`}
            onClick={() => setActiveKey(key)}
            style={{ cursor: 'pointer' }}
          >
            <div className={`dot ${SKILL_MAP[key].dot}`} />
            {SKILL_MAP[key].label}
          </div>
        ))}

        {/* CS Fundamentals */}
        <div
          className="sidebar-section-title"
          style={{ cursor: 'pointer', marginTop: 8 }}
          onClick={() => setOpenCS(o => !o)}
        >
          <span style={{ color: '#3a5068' }}>{openCS ? '▾' : '▸'}</span>
          cs-fundamentals
        </div>
        {openCS && CS_SIDEBAR.map(key => (
          <div
            key={key}
            className={`sidebar-item${activeKey === key ? ' active' : ''}`}
            onClick={() => setActiveKey(key)}
            style={{ cursor: 'pointer' }}
          >
            <div className={`dot ${SKILL_MAP[key].dot}`} />
            {SKILL_MAP[key].label}
          </div>
        ))}

      </div>

      {/* ── Middle: Code editor (updates on click) ── */}
      <div style={{ flex: 1, minWidth: 0, borderRight: '1px solid #1e2d3d', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Inner tab — shows current file name */}
        <div className="vsc-inner-tabs">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeKey}
              className="vsc-inner-tab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <span style={{ color: c.text }}>{current.label}</span>
              <span className="close">×</span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Code view — swaps out on category change */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeKey}
            className="code-editor"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{ flex: 1, overflow: 'hidden' }}
          >
            <div className="line-numbers">
              {lines.map((_, i) => <div key={i}>{i + 1}</div>)}
            </div>
            <div className="code-content" style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', overflowY: 'auto' }}>
              {lines.map((line, i) => renderLine(line, i))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Right: Skill pills (updates on click) ── */}
      <div style={{ flex: '0 0 300px', display: 'flex', flexDirection: 'column', overflow: 'hidden', borderLeft: '1px solid #1e2d3d' }}>
        <div className="vsc-inner-tabs">
          <div className="vsc-inner-tab" style={{ color: '#607B96', fontSize: '0.7rem' }}>
            // skill-overview
          </div>
        </div>
        <div className="pane-scroll" style={{ padding: '16px 12px' }}>

          {/* Active category heading */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeKey}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <p style={{
                fontSize: '0.6rem',
                color: c.text,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: 12,
                fontFamily: 'JetBrains Mono, monospace',
                borderLeft: `2px solid ${c.border}`,
                paddingLeft: 8,
              }}>
                // {current.label}
              </p>

              {/* Pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: 24 }}>
                {current.items.map((item, i) => (
                  <SkillPill key={item} label={item} colorKey={current.colorKey} delay={i * 0.05} />
                ))}
              </div>

              {/* Item count */}
              <p style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.65rem',
                color: '#3a5068',
                marginBottom: 20,
              }}>
                <span style={{ color: c.text }}>{current.items.length}</span> {current.label} listed
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Divider */}
          <div style={{ height: 1, background: '#1e2d3d', marginBottom: 16 }} />

          {/* Stats bars — always visible, active one highlighted */}
          <p style={{ fontSize: '0.6rem', color: '#3a5068', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10, fontFamily: 'JetBrains Mono, monospace' }}>
            // stats
          </p>
          {ALL_STATS.map(stat => (
            <StatBar
              key={stat.key}
              label={stat.label}
              val={stat.val}
              max={stat.max}
              colorKey={stat.key}
              isActive={activeKey === stat.key}
            />
          ))}

        </div>
      </div>

    </div>
  )
}
