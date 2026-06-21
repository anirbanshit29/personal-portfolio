import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Linkedin, Github, MapPin, Send, CheckCircle } from 'lucide-react'

const f = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
})

const LINKS = [
  { icon: Mail,     label: 'Email',    value: 'anirbanshit77@gmail.com',          href: 'mailto:anirbanshit77@gmail.com' },
  { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/anirbanshit',       href: 'https://www.linkedin.com/in/anirbanshit' },
  { icon: Github,   label: 'GitHub',   value: 'github.com/anirbanshit',            href: 'https://github.com/anirbanshit' },
  { icon: MapPin,   label: 'Location', value: 'Kolkata, West Bengal',              href: null },
]

const FIELD_LABEL = { fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6875rem', color: '#3F3F46', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8, display: 'block' }

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle')

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const submit = e => {
    e.preventDefault()
    setStatus('sending')
    setTimeout(() => {
      setStatus('done')
      setForm({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setStatus('idle'), 4500)
    }, 1400)
  }

  return (
    <section id="contact" className="section">
      <div className="container-main">

        <motion.div {...f(0)} style={{ marginBottom: 48 }}>
          <p className="section-label">contact</p>
          <h2 className="section-heading">Get in Touch</h2>
          <p className="prose-body" style={{ marginTop: 12, maxWidth: 460 }}>
            Open to internships, collaborations, and interesting projects.
            Drop me a message — I read everything and reply promptly.
          </p>
        </motion.div>

        {/* ── Contact links table ── */}
        <motion.div {...f(0.08)} style={{ marginBottom: 40, border: '1px solid #27272A', borderRadius: 10, overflow: 'hidden' }}>
          {LINKS.map(({ icon: Icon, label, value, href }, i) => (
            <div
              key={label}
              style={{
                display: 'grid',
                gridTemplateColumns: '110px 1fr',
                borderBottom: i < LINKS.length - 1 ? '1px solid #18181B' : 'none',
                transition: 'background 0.15s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#111113'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{ padding: '14px 18px', borderRight: '1px solid #18181B', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Icon size={13} color="#3F3F46" />
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6875rem', color: '#3F3F46', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{label}</span>
              </div>
              <div style={{ padding: '14px 18px', display: 'flex', alignItems: 'center' }}>
                {href ? (
                  <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                    style={{ fontSize: '0.875rem', color: '#71717A', textDecoration: 'none', fontWeight: 400, letterSpacing: '-0.01em', transition: 'color 0.15s ease' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#60A5FA'}
                    onMouseLeave={e => e.currentTarget.style.color = '#71717A'}
                  >
                    {value}
                  </a>
                ) : (
                  <span style={{ fontSize: '0.875rem', color: '#71717A', letterSpacing: '-0.01em' }}>{value}</span>
                )}
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── Form ── */}
        <motion.form
          {...f(0.16)}
          onSubmit={submit}
          style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <label>
              <span style={FIELD_LABEL}>Name *</span>
              <input id="contact-name" name="name" required value={form.name} onChange={handle} placeholder="Your name" className="field" />
            </label>
            <label>
              <span style={FIELD_LABEL}>Email *</span>
              <input id="contact-email" name="email" type="email" required value={form.email} onChange={handle} placeholder="you@email.com" className="field" />
            </label>
          </div>

          <label>
            <span style={FIELD_LABEL}>Subject</span>
            <input id="contact-subject" name="subject" value={form.subject} onChange={handle} placeholder="What's this about?" className="field" />
          </label>

          <label>
            <span style={FIELD_LABEL}>Message *</span>
            <textarea id="contact-message" name="message" rows={5} required value={form.message} onChange={handle} placeholder="Tell me about your project or opportunity..." className="field" style={{ resize: 'none' }} />
          </label>

          {status === 'done' && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', borderRadius: 8, background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.2)', color: '#4ADE80', fontSize: '0.875rem', fontWeight: 500 }}
            >
              <CheckCircle size={14} />
              Message sent. I'll get back to you soon.
            </motion.div>
          )}

          <div style={{ display: 'flex', gap: 10 }}>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="btn-primary"
              style={{ opacity: status === 'sending' ? 0.55 : 1, cursor: status === 'sending' ? 'not-allowed' : 'pointer' }}
            >
              {status === 'sending' ? (
                <>
                  <span style={{ width: 13, height: 13, border: '2px solid rgba(0,0,0,0.25)', borderTopColor: '#09090B', borderRadius: '50%', animation: 'spin 0.65s linear infinite', display: 'inline-block' }} />
                  Sending…
                </>
              ) : (
                <><Send size={13} /> Send Message</>
              )}
            </button>
            <button type="reset" onClick={() => setForm({ name: '', email: '', subject: '', message: '' })} className="btn-ghost">
              Clear
            </button>
          </div>

          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.625rem', color: '#27272A', letterSpacing: '0.04em' }}>
            // form is static — connect Formspree or EmailJS for real delivery
          </p>
        </motion.form>

      </div>
    </section>
  )
}
