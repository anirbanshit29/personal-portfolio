import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Download, MessageCircle, ArrowRight, MapPin, Users, Github, Linkedin } from 'lucide-react'
import { useTypewriter } from '../hooks/useTypewriter'

const TYPED_ROLES = [
  'Full-Stack Web Developer',
]

// Particle canvas component
function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let particles = []

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    class Particle {
      constructor() { this.reset() }
      reset() {
        this.x  = Math.random() * canvas.width
        this.y  = Math.random() * canvas.height
        this.r  = Math.random() * 1.5 + 0.3
        this.vx = (Math.random() - 0.5) * 0.3
        this.vy = (Math.random() - 0.5) * 0.3
        this.a  = Math.random() * 0.5 + 0.1
      }
      update() {
        this.x += this.vx
        this.y += this.vy
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset()
      }
      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(96,165,250,${this.a})`
        ctx.fill()
      }
    }

    for (let i = 0; i < 80; i++) particles.push(new Particle())

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      // Draw connecting lines
      particles.forEach((p, i) => {
        particles.slice(i + 1).forEach(q => {
          const d = Math.hypot(p.x - q.x, p.y - q.y)
          if (d < 100) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = `rgba(96,165,250,${0.06 * (1 - d / 100)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
        p.update()
        p.draw()
      })
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animId)
    }
  }, [])

  return <canvas ref={canvasRef} id="particles-canvas" className="absolute inset-0 w-full h-full" />
}

export default function Hero() {
  const typedText = useTypewriter(TYPED_ROLES, { speed: 75, deleteSpeed: 45, pause: 2200 })

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden hero-grid pt-20"
    >
      {/* Particles */}
      <ParticleCanvas />

      {/* Glowing orbs */}
      <div className="orb w-[600px] h-[600px] bg-blue-600/10 top-[-100px] left-[-200px]" />
      <div className="orb w-[500px] h-[500px] bg-cyan-500/8 bottom-[-50px] right-[-100px]" />
      <div className="orb w-[300px] h-[300px] bg-purple-600/8 top-[30%] right-[15%]" />

      <div className="relative z-10 max-w-6xl mx-auto px-5 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT: Text content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 lg:order-1"
          >
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse-slow" />
              Open to Opportunities
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-3"
            >
              Hi, I'm{' '}
              <span className="gradient-text block sm:inline">Anirban Shit</span>
            </motion.h1>

            {/* Typewriter */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl sm:text-2xl font-semibold text-slate-400 mb-4 h-8 flex items-center"
            >
              <span className="text-accent-cyan">{typedText}</span>
              <span className="typewriter-cursor ml-0.5 text-accent-cyan">|</span>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-slate-400 text-base leading-relaxed mb-6 max-w-lg"
            >
              B.Tech CSE'28 @ Jalpaiguri Government Engineering College. Building full-stack web
              applications with modern frameworks, solving DSA problems, and shipping
              real-world products that make an impact.
            </motion.p>

            {/* Badges */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              <span className="badge">
                <Users size={13} />
                500+ LinkedIn Connections
              </span>
              <span className="badge">
                <MapPin size={13} />
                Kolkata, West Bengal, India
              </span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.6 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              <a href="/resume.pdf" download className="btn-primary shine">
                <Download size={16} />
                Download Resume
              </a>
              <button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-secondary"
              >
                <MessageCircle size={16} />
                Get in Touch
              </button>
              <button
                onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-outline"
              >
                View Projects
                <ArrowRight size={16} />
              </button>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.6 }}
              className="flex items-center gap-4"
            >
              <a
                href="https://github.com/anirbanshit"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors duration-200"
              >
                <Github size={18} />
                GitHub
              </a>
              <span className="w-px h-4 bg-white/10" />
              <a
                href="https://www.linkedin.com/in/anirbanshit"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-400 hover:text-accent-blue text-sm transition-colors duration-200"
              >
                <Linkedin size={18} />
                LinkedIn
              </a>
            </motion.div>
          </motion.div>

          {/* RIGHT: Avatar card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative">
              {/* Outer glow ring */}
              <div
                className="absolute inset-[-12px] rounded-full opacity-60"
                style={{
                  background: 'conic-gradient(from 0deg, #60a5fa, #06b6d4, #a78bfa, #60a5fa)',
                  animation: 'spin 8s linear infinite',
                  filter: 'blur(8px)',
                }}
              />

              {/* Avatar container */}
              <div
                className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden border-4 border-white/10 avatar-glow"
                style={{ animation: 'float 6s ease-in-out infinite' }}
              >
                <img
                  src="/assets/profile.jpg"
                  alt="Anirban Shit"
                  className="w-full h-full object-cover"
                  onError={e => {
                    // Fallback gradient avatar
                    e.target.style.display = 'none'
                    e.target.parentElement.style.background =
                      'linear-gradient(135deg, #1e3a5f 0%, #0b2d59 50%, #0d1f3c 100%)'
                    const initials = document.createElement('div')
                    initials.style.cssText =
                      'position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:4rem;font-weight:900;color:#60a5fa;font-family:Inter,sans-serif;text-shadow:0 0 30px rgba(96,165,250,0.5)'
                    initials.textContent = 'AS'
                    e.target.parentElement.appendChild(initials)
                  }}
                />
              </div>

              {/* Floating skill badges */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9, type: 'spring', stiffness: 200 }}
                className="absolute -bottom-4 -left-4 glass-card px-3 py-2 text-xs font-semibold text-accent-cyan flex items-center gap-1.5"
              >
                <span className="w-2 h-2 bg-accent-cyan rounded-full animate-pulse" />
                C++ & DSA
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.0, type: 'spring', stiffness: 200 }}
                className="absolute -top-4 -right-4 glass-card px-3 py-2 text-xs font-semibold text-accent-purple flex items-center gap-1.5"
              >
                <span className="w-2 h-2 bg-accent-purple rounded-full animate-pulse" />
                Full-Stack Dev
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1, type: 'spring', stiffness: 200 }}
                className="absolute top-1/2 -right-12 glass-card px-3 py-2 text-xs font-semibold text-accent-pink flex items-center gap-1.5"
              >
                <span className="w-2 h-2 bg-accent-pink rounded-full animate-pulse" />
                React / Node
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-slate-600 to-transparent animate-bounce-slow" />
        </motion.div>
      </div>
    </section>
  )
}
