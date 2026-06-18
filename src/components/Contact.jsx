import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Mail, Linkedin, Github, MapPin, Send, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react'

const SOCIALS = [
  {
    icon: Mail,
    label: 'Email',
    value: 'anirbanshit77@gmail.com',
    href: 'mailto:anirbanshit77@gmail.com',
    color: 'text-accent-cyan',
    bg: 'bg-accent-cyan/10',
    border: 'border-accent-cyan/20',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/anirbanshit',
    href: 'https://www.linkedin.com/in/anirbanshit',
    color: 'text-accent-blue',
    bg: 'bg-accent-blue/10',
    border: 'border-accent-blue/20',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/anirbanshit',
    href: 'https://github.com/anirbanshit',
    color: 'text-slate-300',
    bg: 'bg-white/[0.05]',
    border: 'border-white/[0.08]',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Kolkata, West Bengal, India',
    href: null,
    color: 'text-accent-purple',
    bg: 'bg-accent-purple/10',
    border: 'border-accent-purple/20',
  },
]

export default function Contact() {
  const formRef = useRef(null)
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })

  const handleChange = (e) => {
    setFormData(d => ({ ...d, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')
    // Simulate sending (replace with Formspree / EmailJS / backend)
    setTimeout(() => {
      setStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setStatus('idle'), 4000)
    }, 1500)
  }

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="orb w-[400px] h-[400px] bg-pink-600/8 bottom-[-50px] right-[-100px]" />
      <div className="orb w-[300px] h-[300px] bg-blue-600/8 top-0 left-[-50px]" />

      <div className="max-w-6xl mx-auto px-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-accent-cyan text-sm font-semibold tracking-widest uppercase mb-3">Let's connect</p>
          <h2 className="section-title text-4xl font-black">Get in Touch</h2>
          <div className="section-divider mx-auto mt-4" />
          <p className="text-slate-400 mt-4 max-w-lg mx-auto text-sm">
            Whether you want to collaborate, hire, or just say hello — I'm always open to interesting conversations!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* Left: Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4"
          >
            <div className="glass-card p-6 mb-6">
              <h3 className="text-white font-bold text-lg mb-2">Let's work together!</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                I'm currently open to freelance work, internship opportunities, and exciting open-source collaborations.
                If you have a project that needs a passionate developer, let's talk.
              </p>
            </div>

            {SOCIALS.map(({ icon: Icon, label, value, href, color, bg, border }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`glass-card border ${border} p-4 flex items-center gap-4 group hover:scale-[1.02] transition-transform duration-300 shine`}
              >
                <div className={`w-10 h-10 rounded-xl ${bg} border ${border} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={18} className={color} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-slate-500 font-medium mb-0.5">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className={`text-sm font-semibold ${color} hover:underline flex items-center gap-1 truncate`}
                    >
                      {value}
                      {href.startsWith('http') && <ExternalLink size={11} />}
                    </a>
                  ) : (
                    <p className={`text-sm font-semibold ${color}`}>{value}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right: Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="glass-card p-8 space-y-5"
            >
              <h3 className="text-white font-bold text-lg mb-1">Send a Message</h3>

              <div className="grid sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5" htmlFor="contact-name">
                    Name *
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-slate-600 text-sm focus:outline-none focus:border-accent-cyan/50 focus:bg-white/[0.06] transition-all duration-200"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5" htmlFor="contact-email">
                    Email *
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-slate-600 text-sm focus:outline-none focus:border-accent-cyan/50 focus:bg-white/[0.06] transition-all duration-200"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5" htmlFor="contact-subject">
                  Subject
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-slate-600 text-sm focus:outline-none focus:border-accent-cyan/50 focus:bg-white/[0.06] transition-all duration-200"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5" htmlFor="contact-message">
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or opportunity..."
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-slate-600 text-sm focus:outline-none focus:border-accent-cyan/50 focus:bg-white/[0.06] transition-all duration-200 resize-none"
                />
              </div>

              {/* Status message */}
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm"
                >
                  <CheckCircle size={16} />
                  Message sent! I'll get back to you soon.
                </motion.div>
              )}
              {status === 'error' && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  <AlertCircle size={16} />
                  Something went wrong. Please try again.
                </div>
              )}

              {/* Submit */}
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary flex-1 justify-center shine disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {status === 'sending' ? (
                    <>
                      <span className="w-4 h-4 border-2 border-dark-900/40 border-t-dark-900 rounded-full animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
                <button
                  type="reset"
                  onClick={() => setFormData({ name: '', email: '', subject: '', message: '' })}
                  className="btn-secondary px-5"
                >
                  Reset
                </button>
              </div>

              <p className="text-slate-600 text-xs text-center">
                💡 This form uses a simulated response. Connect a backend (Formspree, EmailJS) to receive real messages.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
