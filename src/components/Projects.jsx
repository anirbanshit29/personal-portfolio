import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github, Code2 } from 'lucide-react'

const PROJECTS = [
  {
    id: 'alcohol-delivery',
    title: 'Alcohol Delivery Platform',
    emoji: '🍺',
    description:
      'A full-stack alcohol delivery web application with product listings, cart management, user authentication, real-time order tracking, and an admin dashboard for inventory control.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    gradient: 'from-amber-500/20 to-orange-500/10',
    border: 'border-amber-500/20',
    accent: 'text-amber-400',
    glow: 'hover:shadow-[0_0_20px_rgba(251,191,36,0.2)]',
    liveUrl: '#',
    githubUrl: '#',
    status: 'In Progress',
    statusColor: 'bg-yellow-400',
  },
  {
    id: 'portfolio',
    title: 'Personal Portfolio Website',
    emoji: '🌐',
    description:
      'A stunning personal portfolio built with React & Tailwind CSS. Features a particle canvas hero, typewriter effect, glassmorphism cards, 3D tilt project cards, and smooth Framer Motion animations.',
    tags: ['React', 'Tailwind CSS', 'Framer Motion', 'Vite'],
    gradient: 'from-blue-500/20 to-cyan-500/10',
    border: 'border-blue-500/20',
    accent: 'text-accent-cyan',
    glow: 'hover:shadow-glow-cyan',
    liveUrl: '#',
    githubUrl: '#',
    status: 'Live',
    statusColor: 'bg-emerald-400',
  },
]

function ProjectCard({ project, index }) {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 12
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -12
    setTilt({ x, y })
  }

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }) }}
      style={{
        transform: hovered
          ? `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale3d(1.02, 1.02, 1.02)`
          : 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)',
        transition: 'transform 0.2s ease',
      }}
      className={`glass-card border ${project.border} bg-gradient-to-br ${project.gradient} overflow-hidden group cursor-default ${project.glow} transition-shadow duration-300 flex flex-col`}
    >
      {/* Card header */}
      <div className="p-6 pb-0">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{project.emoji}</div>
            <div>
              <h3 className="text-white font-bold text-lg leading-tight">{project.title}</h3>
              <div className="flex items-center gap-1.5 mt-1">
                <span className={`w-2 h-2 rounded-full ${project.statusColor} animate-pulse`} />
                <span className="text-xs text-slate-400 font-medium">{project.status}</span>
              </div>
            </div>
          </div>
          <Code2 size={18} className="text-slate-600 group-hover:text-slate-400 transition-colors" />
        </div>

        <p className="text-slate-400 text-sm leading-relaxed mb-5">{project.description}</p>
      </div>

      {/* Tags */}
      <div className="px-6 pb-5 flex-1">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map(tag => (
            <span
              key={tag}
              className="px-2.5 py-1 bg-white/[0.04] border border-white/[0.06] rounded-lg text-xs font-medium text-slate-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 pb-6 border-t border-white/[0.04] pt-4 flex items-center gap-3">
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-1.5 text-xs font-semibold ${project.accent} hover:underline transition-colors`}
        >
          <ExternalLink size={13} />
          Live Demo
        </a>
        <span className="w-px h-4 bg-white/10" />
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <Github size={13} />
          Source Code
        </a>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="orb w-[500px] h-[500px] bg-cyan-600/6 top-[-50px] right-[-100px]" />

      <div className="max-w-6xl mx-auto px-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-accent-cyan text-sm font-semibold tracking-widest uppercase mb-3">Things I've built</p>
          <h2 className="section-title text-4xl font-black">Projects</h2>
          <div className="section-divider mx-auto mt-4" />
          <p className="text-slate-400 mt-4 max-w-lg mx-auto text-sm">
            A selection of projects I'm proud of — click to explore the live demo or browse the source code.
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-slate-400 text-sm mb-4">More projects in progress — check out my GitHub for everything</p>
          <a
            href="https://github.com/anirbanshit"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex"
          >
            <Github size={16} />
            View All on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}
