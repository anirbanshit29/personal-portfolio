import { motion, useInView } from 'framer-motion'

const f = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
})

const QUICK_FACTS = [
  { key: 'degree',   value: 'B.Tech CSE' },
  { key: 'college',  value: 'JGEC · Batch 2028' },
  { key: 'location', value: 'Kolkata, India' },
  { key: 'focus',    value: 'Full-Stack Web Dev' },
  { key: 'langs',    value: 'JS · C++ · HTML · CSS' },
  { key: 'status',   value: 'Open to work' },
]

const NOW = [
  { label: 'Learning',   value: 'React, Node.js, Express, MongoDB' },
  { label: 'Practicing', value: 'DSA on LeetCode & Codeforces' },
  { label: 'Building',   value: 'Alcohol Delivery Platform' },
  { label: 'Seeking',    value: 'Internship / Collaboration' },
]

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container-main">

        <motion.div {...f(0)} style={{ marginBottom: 48 }}>
          <p className="section-label">about</p>
          <h2 className="section-heading">Background</h2>
          <hr className="hr" style={{ marginTop: 16, maxWidth: 80 }} />
        </motion.div>

        {/* Section orb */}
        <div aria-hidden style={{ position: 'absolute', top: 0, right: -100, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none', animation: 'orbitGlow 10s ease-in-out infinite' }} />

        {/* ── Bio ── */}
        <motion.div {...f(0.06)} style={{ marginBottom: 40 }}>
          <p className="prose-body" style={{ marginBottom: 16 }}>
            I'm a Computer Science student with a strong engineering mindset. I build
            full-stack web applications end-to-end — from designing clean, responsive UIs
            to architecting RESTful backends — and I take performance and code quality seriously.
          </p>
          <p className="prose-body">
            My foundation in <span className="code-inline">C++</span> and{' '}
            <span className="code-inline">DSA</span> keeps my problem-solving sharp.
            I believe the best software is simple, fast, and reliable — and I obsess
            over all three.
          </p>
        </motion.div>

        {/* ── Quick facts grid ── */}
        <motion.div {...f(0.12)} style={{ marginBottom: 40 }}>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6875rem', color: '#3F3F46', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>
            // quick facts
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: 1,
              background: '#27272A',
              border: '1px solid #27272A',
              borderRadius: 10,
              overflow: 'hidden',
            }}
          >
            {QUICK_FACTS.map(({ key, value }, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: [0.22,1,0.36,1] }}
                style={{
                  background: '#09090B',
                  padding: '14px 18px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                  transition: 'background 0.15s ease',
                  cursor: 'default',
                }}
                whileHover={{ backgroundColor: '#111113' }}
              >
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.625rem', color: '#3F3F46', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{key}</span>
                <span style={{ fontSize: '0.875rem', color: '#E4E4E7', fontWeight: 500, letterSpacing: '-0.02em' }}>{value}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Right now ── */}
        <motion.div {...f(0.18)}>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6875rem', color: '#3F3F46', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>
            // right now
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, border: '1px solid #27272A', borderRadius: 10, overflow: 'hidden' }}>
            {NOW.map(({ label, value }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.18 + i * 0.07, ease: [0.22,1,0.36,1] }}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 12,
                  padding: '13px 18px',
                  borderBottom: i < NOW.length - 1 ? '1px solid #18181B' : 'none',
                  transition: 'background 0.15s ease',
                }}
                whileHover={{ backgroundColor: '#111113' }}
              >
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6875rem', color: '#60A5FA', minWidth: 80, letterSpacing: '0.01em' }}>{label}</span>
                <span style={{ fontSize: '0.875rem', color: '#71717A', letterSpacing: '-0.01em' }}>{value}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
