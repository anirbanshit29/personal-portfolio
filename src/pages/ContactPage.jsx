import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { validateContactForm, validateName, validateEmail, validateMessage } from '../utils/validateContact'
import { sendContactEmail } from '../services/emailService'

export default function ContactPage() {
  const [form, setForm]       = useState({ name: '', email: '', message: '' })
  const [errors, setErrors]   = useState({ name: '', email: '', message: '' })
  const [touched, setTouched] = useState({ name: false, email: false, message: false })
  const [status, setStatus]   = useState('idle') // idle | sending | sent | error

  // Today's date for the code preview
  const today = new Date().toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })

  const SOCIAL = [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/anirbanshit', icon: '↗' },
    { label: 'GitHub',   href: 'https://github.com/anirbanshit',          icon: '↗' },
  ]

  /* ── Field validators (for onBlur) ── */
  const validators = {
    name:    validateName,
    email:   validateEmail,
    message: validateMessage,
  }

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))

    // Clear error on type if field was touched
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validators[name](value) }))
    }
  }, [touched])

  const handleBlur = useCallback((e) => {
    const { name, value } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    setErrors(prev => ({ ...prev, [name]: validators[name](value) }))
  }, [])

  /* ── Submit ── */
  const submit = useCallback(async (e) => {
    e.preventDefault()

    // Validate all fields
    const { isValid, errors: validationErrors } = validateContactForm(form)
    setErrors(validationErrors)
    setTouched({ name: true, email: true, message: true })

    if (!isValid) return

    setStatus('sending')

    const result = await sendContactEmail(form)

    if (result.success) {
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
      setTouched({ name: false, email: false, message: false })
      setErrors({ name: '', email: '', message: '' })
      // Auto-dismiss success after 5s
      setTimeout(() => setStatus('idle'), 5000)
    } else {
      setStatus('error')
      // Auto-dismiss error after 5s
      setTimeout(() => setStatus('idle'), 5000)
    }
  }, [form])

  return (
    <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

      {/* ── Sidebar ── */}
      <div className="vsc-sidebar">
        <div className="sidebar-section-title" style={{ marginTop: 8 }}>
          <span style={{ color: '#3a5068' }}>▾</span>
          contacts
        </div>
        <div className="sidebar-item" style={{ gap: 6 }}>
          <span style={{ color: '#3a5068', fontSize: '0.65rem' }}>✉</span>
          <span style={{ fontSize: '0.65rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            anirbanshit77@gmail.com
          </span>
        </div>

        <div className="sidebar-section-title" style={{ marginTop: 10 }}>
          <span style={{ color: '#3a5068' }}>▾</span>
          find-me-also-in
        </div>
        {SOCIAL.map(({ label, href, icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="sidebar-item"
            style={{ gap: 6, display: 'flex', alignItems: 'center', textDecoration: 'none' }}
          >
            <span style={{ color: '#3a5068', fontSize: '0.7rem' }}>{icon}</span>
            <span>{label}</span>
          </a>
        ))}
      </div>

      {/* ── Middle: Form ── */}
      <div className="contact-form-panel" style={{ flex: '0 0 340px', borderRight: '1px solid #1e2d3d', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div className="vsc-inner-tabs">
          <div className="vsc-inner-tab">
            <span>contacts</span>
            <span className="close">×</span>
          </div>
        </div>

        <div className="pane-scroll" style={{ padding: '32px 28px' }}>
          <form onSubmit={submit} noValidate>

            {/* Name Field */}
            <div className="contact-field">
              <label className="contact-label">_name:</label>
              <input
                id="c-name"
                name="name"
                className={`contact-input${touched.name && errors.name ? ' has-error' : ''}`}
                value={form.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Your name"
                autoComplete="name"
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
            </div>

            {/* Email Field */}
            <div className="contact-field">
              <label className="contact-label">_email:</label>
              <input
                id="c-email"
                name="email"
                type="email"
                className={`contact-input${touched.email && errors.email ? ' has-error' : ''}`}
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="your@email.com"
                autoComplete="email"
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
            </div>

            {/* Message Field */}
            <div className="contact-field">
              <label className="contact-label">_message:</label>
              <textarea
                id="c-message"
                name="message"
                className={`contact-textarea${touched.message && errors.message ? ' has-error' : ''}`}
                value={form.message}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Your message here ..."
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
            </div>

            {/* Toast Notifications */}
            <AnimatePresence mode="wait">
              {status === 'sent' && (
                <motion.div
                  key="toast-success"
                  className="contact-toast success"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  ✅ Your message has been sent successfully. I'll get back to you soon.
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div
                  key="toast-error"
                  className="contact-toast error"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  ❌ Failed to send message. Please try again later.
                </motion.div>
              )}
            </AnimatePresence>

            {/* Send Button */}
            <button
              type="submit"
              className={`send-btn${status === 'sent' ? ' sent' : ''}`}
              disabled={status === 'sending'}
            >
              {status === 'sending' ? (
                <>
                  <span className="send-spinner" />
                  {' sending...'}
                </>
              ) : status === 'sent' ? (
                '✓ message-sent'
              ) : (
                'send-message'
              )}
            </button>
          </form>
        </div>
      </div>

      {/* ── Right: Live code preview ── */}
      <div className="contact-preview-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div className="vsc-inner-tabs" style={{ width: '100%' }} />
        <div className="code-editor">
          <div className="line-numbers">
            {Array.from({ length: 15 }).map((_, i) => <div key={i}>{i + 1}</div>)}
          </div>
          <div className="code-content" style={{ whiteSpace: 'pre' }}>
            <div>
              <span className="s-keyword">const </span>
              <span className="s-fn">button</span>
              <span> = </span>
              <span className="s-fn">document</span>
              <span>.</span>
              <span className="s-fn">querySelector</span>
              <span>(</span>
              <span className="s-string">'#sendBtn'</span>
              <span>);</span>
            </div>
            <div>&nbsp;</div>
            <div>
              <span className="s-keyword">const </span>
              <span className="s-fn">message</span>
              <span> = {'{'}</span>
            </div>
            <div>
              <span>{'  '}</span>
              <span className="s-prop">name</span>
              <span>: </span>
              <span className="s-string">"{form.name || ''}"</span>
              <span>,</span>
            </div>
            <div>
              <span>{'  '}</span>
              <span className="s-prop">email</span>
              <span>: </span>
              <span className="s-string">"{form.email || ''}"</span>
              <span>,</span>
            </div>
            <div>
              <span>{'  '}</span>
              <span className="s-prop">message</span>
              <span>: </span>
              <span className="s-string">"{form.message ? form.message.slice(0, 28) + (form.message.length > 28 ? '...' : '') : ''}"</span>
              <span>,</span>
            </div>
            <div>
              <span>{'  '}</span>
              <span className="s-prop">date</span>
              <span>: </span>
              <span className="s-string">"{today}"</span>
              <span>,</span>
            </div>
            <div>
              <span>{'  '}</span>
              <span className="s-prop">portfolio</span>
              <span>: </span>
              <span className="s-string">"Anirban Shit — Dev Portfolio"</span>
            </div>
            <div>{'}'}</div>
            <div>&nbsp;</div>
            <div>
              <span className="s-fn">button</span>
              <span>.</span>
              <span className="s-fn">addEventListener</span>
              <span>(</span>
              <span className="s-string">'click'</span>
              <span>, () </span>
              <span className="s-keyword">=&gt;</span>
              <span> {'{'}</span>
            </div>
            <div>
              <span>{'  '}</span>
              <span className="s-fn">emailjs</span>
              <span>.</span>
              <span className="s-fn">send</span>
              <span>(</span>
              <span className="s-fn">message</span>
              <span>);</span>
            </div>
            <div>{'}'}<span>)</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}
