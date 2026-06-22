import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Linkedin, Github, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { validateContactForm, validateName, validateEmail, validateMessage } from '../utils/validateContact'
import { sendContactEmail } from '../services/emailService'

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
  const [form, setForm]       = useState({ name: '', email: '', message: '' })
  const [errors, setErrors]   = useState({ name: '', email: '', message: '' })
  const [touched, setTouched] = useState({ name: false, email: false, message: false })
  const [status, setStatus]   = useState('idle') // idle | sending | done | error

  /* ── Field validators (for onBlur) ── */
  const validators = {
    name:    validateName,
    email:   validateEmail,
    message: validateMessage,
  }

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validators[name](value) }))
    }
  }, [touched])

  const handleBlur = useCallback((e) => {
    const { name, value } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    setErrors(prev => ({ ...prev, [name]: validators[name](value) }))
  }, [])

  const submit = useCallback(async (e) => {
    e.preventDefault()

    const { isValid, errors: validationErrors } = validateContactForm(form)
    setErrors(validationErrors)
    setTouched({ name: true, email: true, message: true })

    if (!isValid) return

    setStatus('sending')

    const result = await sendContactEmail(form)

    if (result.success) {
      setStatus('done')
      setForm({ name: '', email: '', message: '' })
      setTouched({ name: false, email: false, message: false })
      setErrors({ name: '', email: '', message: '' })
      setTimeout(() => setStatus('idle'), 5000)
    } else {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }, [form])

  const clearForm = useCallback(() => {
    setForm({ name: '', email: '', message: '' })
    setErrors({ name: '', email: '', message: '' })
    setTouched({ name: false, email: false, message: false })
    setStatus('idle')
  }, [])

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
          noValidate
          style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {/* Name */}
            <label>
              <span style={FIELD_LABEL}>Name *</span>
              <input
                id="contact-name"
                name="name"
                value={form.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Your name"
                autoComplete="name"
                className={`field${touched.name && errors.name ? ' has-error' : ''}`}
              />
              <AnimatePresence>
                {touched.name && errors.name && (
                  <motion.p
                    key="name-err"
                    className="contact-error"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    {errors.name}
                  </motion.p>
                )}
              </AnimatePresence>
            </label>
            {/* Email */}
            <label>
              <span style={FIELD_LABEL}>Email *</span>
              <input
                id="contact-email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="you@email.com"
                autoComplete="email"
                className={`field${touched.email && errors.email ? ' has-error' : ''}`}
              />
              <AnimatePresence>
                {touched.email && errors.email && (
                  <motion.p
                    key="email-err"
                    className="contact-error"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    {errors.email}
                  </motion.p>
                )}
              </AnimatePresence>
            </label>
          </div>

          {/* Message */}
          <label>
            <span style={FIELD_LABEL}>Message *</span>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Tell me about your project or opportunity..."
              className={`field${touched.message && errors.message ? ' has-error' : ''}`}
              style={{ resize: 'none' }}
            />
            <AnimatePresence>
              {touched.message && errors.message && (
                <motion.p
                  key="msg-err"
                  className="contact-error"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  {errors.message}
                </motion.p>
              )}
            </AnimatePresence>
          </label>

          {/* Toast Notifications */}
          <AnimatePresence mode="wait">
            {status === 'done' && (
              <motion.div
                key="toast-done"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', borderRadius: 8, background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.2)', color: '#4ADE80', fontSize: '0.875rem', fontWeight: 500 }}
              >
                <CheckCircle size={14} />
                ✅ Your message has been sent successfully. I'll get back to you soon.
              </motion.div>
            )}
            {status === 'error' && (
              <motion.div
                key="toast-error"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', borderRadius: 8, background: 'rgba(244,112,103,0.06)', border: '1px solid rgba(244,112,103,0.2)', color: '#F47067', fontSize: '0.875rem', fontWeight: 500 }}
              >
                <AlertCircle size={14} />
                ❌ Failed to send message. Please try again later.
              </motion.div>
            )}
          </AnimatePresence>

          <div style={{ display: 'flex', gap: 10 }}>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="btn-primary"
              style={{ opacity: status === 'sending' ? 0.55 : 1, cursor: status === 'sending' ? 'not-allowed' : 'pointer' }}
            >
              {status === 'sending' ? (
                <>
                  <span className="send-spinner" />
                  {' Sending…'}
                </>
              ) : (
                <><Send size={13} /> Send Message</>
              )}
            </button>
            <button type="button" onClick={clearForm} className="btn-ghost">
              Clear
            </button>
          </div>
        </motion.form>

      </div>
    </section>
  )
}
