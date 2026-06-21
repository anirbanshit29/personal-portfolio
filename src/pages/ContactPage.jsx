import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ContactPage() {
  const [form, setForm]     = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle|sending|sent

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = e => {
    e.preventDefault()
    setStatus('sending')
    setTimeout(() => setStatus('sent'), 1500)
  }

  // Today's date
  const today = new Date().toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })

  const SOCIAL = [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/anirbanshit', icon: '↗' },
    { label: 'GitHub',   href: 'https://github.com/anirbanshit',          icon: '↗' },
  ]

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
      <div style={{ flex: '0 0 340px', borderRight: '1px solid #1e2d3d', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div className="vsc-inner-tabs">
          <div className="vsc-inner-tab">
            <span>contacts</span>
            <span className="close">×</span>
          </div>
        </div>

        <div className="pane-scroll" style={{ padding: '32px 28px' }}>
          <form onSubmit={submit}>
            <div className="contact-field">
              <label className="contact-label">_name:</label>
              <input
                id="c-name"
                name="name"
                className="contact-input"
                value={form.name}
                onChange={handle}
                placeholder="Your name"
                required
              />
            </div>
            <div className="contact-field">
              <label className="contact-label">_email:</label>
              <input
                id="c-email"
                name="email"
                type="email"
                className="contact-input"
                value={form.email}
                onChange={handle}
                placeholder="your@email.com"
                required
              />
            </div>
            <div className="contact-field">
              <label className="contact-label">_message</label>
              <textarea
                id="c-message"
                name="message"
                className="contact-textarea"
                value={form.message}
                onChange={handle}
                placeholder="your message here ..."
                required
              />
            </div>

            <AnimatePresence mode="wait">
              {status === 'sent' ? (
                <motion.p
                  key="sent"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ color: '#43D9AD', fontSize: '0.75rem', marginBottom: 12 }}
                >
                  ✓ message sent successfully!
                </motion.p>
              ) : null}
            </AnimatePresence>

            <button
              type="submit"
              className={`send-btn${status === 'sent' ? ' sent' : ''}`}
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'sending...' : status === 'sent' ? '✓ message-sent' : 'send-message'}
            </button>
          </form>
        </div>
      </div>

      {/* ── Right: Live code preview ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div className="vsc-inner-tabs" style={{ width: '100%' }} />
        <div className="code-editor">
          <div className="line-numbers">
            {Array.from({ length: 13 }).map((_, i) => <div key={i}>{i + 1}</div>)}
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
              <span className="s-fn">form</span>
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
