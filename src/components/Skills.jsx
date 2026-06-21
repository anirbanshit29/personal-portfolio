import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

/* ── Count-up hook ───────────────────────────────────────────── */
function useCountUp(target, duration = 1400) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const isNum = /^\d+/.test(target)
    if (!isNum) { setVal(target); return }
    const num = parseInt(target)
    const plus = target.includes('+')
    let start = 0
    const step = Math.ceil(num / (duration / 16))
    const id = setInterval(() => {
      start += step
      if (start >= num) { start = num; clearInterval(id) }
      setVal(start + (plus ? '+' : ''))
    }, 16)
    return () => clearInterval(id)
  }, [inView, target, duration])

  return [ref, val]
}

/* ── Staggered group reveal ──────────────────────────────────── */
const groupContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045 } },
}
const tagItem = {
  hidden: { opacity: 0, scale: 0.85, y: 8 },
  show:   { opacity: 1, scale: 1,    y: 0, transition: { duration: 0.35, ease: [0.22,1,0.36,1] } },
}

const GROUPS = [
  { label: 'languages',               items: ['C++', 'JavaScript (ES2024)', 'HTML5', 'CSS3'] },
  { label: 'frameworks & libraries',  items: ['React', 'Node.js', 'Express.js', 'Tailwind CSS'] },
  { label: 'cs fundamentals',         items: ['Data Structures & Algorithms', 'Object Oriented Programming', 'Database Management System', 'Operating System'] },
  { label: 'tools & platforms',       items: ['Git', 'GitHub', 'MongoDB', 'REST APIs', 'VS Code', 'Responsive Web Design'] },
]

const STATS = [
  { raw: '2',    label: 'Projects' },
  { raw: '500+', label: 'Connections' },
  { raw: '2+',   label: 'Yrs Coding' },
  { raw: 'CSE',  label: 'Major' },
]

/* ── Stat card with count-up ─────────────────────────────────── */
function StatCard({ raw, label }) {
  const [ref, val] = useCountUp(raw)
  const [hov, setHov] = useState(false)

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? '#111113' : '#09090B',
        padding: '22px 16px',
        textAlign: 'center',
        transition: 'background 0.2s ease',
        cursor: 'default',
      }}
    >
      <p style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '1.5rem', fontWeight: 700,
        color: hov ? '#60A5FA' : '#FAFAFA',
        letterSpacing: '-0.04em', marginBottom: 5,
        transition: 'color 0.2s ease',
      }}>
        {val || raw}
      </p>
      <p style={{ fontSize: '0.6875rem', color: '#3F3F46', fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{label}</p>
    </div>
  )
}

const f = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container-main">

        <motion.div {...f(0)} style={{ marginBottom: 48 }}>
          <p className="section-label">skills</p>
          <h2 className="section-heading">Tech Stack</h2>
          <hr className="hr" style={{ marginTop: 16, maxWidth: 80 }} />
        </motion.div>

        {/* Section orb */}
        <div aria-hidden style={{ position: 'absolute', bottom: 0, left: -80, width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle, rgba(52,211,153,0.05) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none', animation: 'orbitGlow 12s ease-in-out infinite 3s' }} />

        {/* ── Table layout ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, border: '1px solid #27272A', borderRadius: 12, overflow: 'hidden', marginBottom: 40 }}>
          {GROUPS.map(({ label, items }, gi) => {
            const rowRef = useRef(null)
            const rowInView = useInView(rowRef, { once: true, margin: '-40px' })
            return (
              <motion.div
                key={label}
                ref={rowRef}
                initial={{ opacity: 0, x: -16 }}
                animate={rowInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
                transition={{ duration: 0.55, delay: gi * 0.08, ease: [0.22,1,0.36,1] }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '160px 1fr',
                  borderBottom: gi < GROUPS.length - 1 ? '1px solid #18181B' : 'none',
                }}
              >
                {/* Label column */}
                <div style={{ padding: '18px 20px', borderRight: '1px solid #18181B', display: 'flex', alignItems: 'flex-start', paddingTop: 20 }}>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6875rem', color: '#3F3F46', letterSpacing: '0.05em', textTransform: 'uppercase', lineHeight: 1.5 }}>
                    {label}
                  </span>
                </div>

                {/* Tags column — staggered */}
                <motion.div
                  variants={groupContainer}
                  initial="hidden"
                  animate={rowInView ? 'show' : 'hidden'}
                  style={{ padding: '14px 18px', display: 'flex', flexWrap: 'wrap', gap: 6, alignContent: 'flex-start' }}
                >
                  {items.map(item => (
                    <motion.span key={item} variants={tagItem} className="tag">{item}</motion.span>
                  ))}
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* ── Stats with count-up ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22,1,0.36,1] }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 1,
            background: '#27272A',
            border: '1px solid #27272A',
            borderRadius: 10,
            overflow: 'hidden',
          }}
        >
          {STATS.map(s => <StatCard key={s.label} {...s} />)}
        </motion.div>

      </div>
    </section>
  )
}
