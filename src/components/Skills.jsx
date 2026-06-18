import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const SKILL_CATEGORIES = [
  {
    category: 'Languages',
    color: 'from-blue-500 to-cyan-500',
    glow: 'shadow-glow-cyan',
    skills: [
      { name: 'C++',        level: 85, icon: '⚙️' },
      { name: 'JavaScript', level: 75, icon: '🟨' },
      { name: 'HTML',       level: 92, icon: '🧱' },
      { name: 'CSS',        level: 88, icon: '🎨' },
    ],
  },
  {
    category: 'Frameworks & Libraries',
    color: 'from-purple-500 to-pink-500',
    glow: 'shadow-glow-blue',
    skills: [
      { name: 'React',     level: 70, icon: '⚛️' },
      { name: 'Node.js',   level: 60, icon: '🟩' },
      { name: 'Express',   level: 55, icon: '🚀' },
      { name: 'Tailwind',  level: 75, icon: '💨' },
    ],
  },
  {
    category: 'CS Fundamentals',
    color: 'from-yellow-500 to-orange-500',
    glow: '',
    skills: [
      { name: 'Data Structures & Algorithms', level: 80, icon: '🧩' },
      { name: 'Object Oriented Programming',  level: 78, icon: '🏗️' },
      { name: 'Database Management System',   level: 65, icon: '🗄️' },
      { name: 'Operating System',             level: 70, icon: '💻' },
    ],
  },

]

const ALL_PILLS = [
  'C++', 'JavaScript', 'HTML', 'CSS', 'React', 'Node.js',
  'Express', 'MongoDB', 'Tailwind CSS', 'DSA', 'Git', 'GitHub',
  'OOP', 'REST APIs', 'VS Code', 'Responsive Design',
]

function SkillBar({ name, level, icon, gradient, delay }) {
  const barRef = useRef(null)
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const el = barRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true) },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={barRef} className="group">
      <div className="flex items-center justify-between mb-2">
        <span className="flex items-center gap-2 text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
          <span>{icon}</span>
          {name}
        </span>
        <span className="text-xs font-semibold text-slate-500 group-hover:text-slate-300 transition-colors">
          {level}%
        </span>
      </div>
      <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden border border-white/[0.04]">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${gradient} transition-all duration-1000 ease-out`}
          style={{
            width: animated ? `${level}%` : '0%',
            transitionDelay: `${delay}ms`,
            boxShadow: animated ? `0 0 8px rgba(96,165,250,0.4)` : 'none',
          }}
        />
      </div>
    </div>
  )
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="orb w-[500px] h-[500px] bg-purple-700/8 bottom-0 left-[-100px]" />

      <div className="max-w-6xl mx-auto px-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-accent-cyan text-sm font-semibold tracking-widest uppercase mb-3">What I work with</p>
          <h2 className="section-title text-4xl font-black">Skills & Tech Stack</h2>
          <div className="section-divider mx-auto mt-4" />
        </motion.div>

        {/* Pills cloud */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap gap-2.5 justify-center mb-16"
        >
          {ALL_PILLS.map((pill, i) => (
            <motion.span
              key={pill}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
              className="skill-pill"
            >
              {pill}
            </motion.span>
          ))}
        </motion.div>

        {/* Skill bar categories */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid md:grid-cols-2 gap-6"
        >
          {SKILL_CATEGORIES.map(({ category, color, skills }) => (
            <motion.div
              key={category}
              variants={cardVariants}
              className="glass-card p-6 hover:border-white/10 transition-all duration-300 shine"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-1 h-6 rounded-full bg-gradient-to-b ${color}`} />
                <h3 className="text-white font-bold text-sm tracking-wide">{category}</h3>
              </div>
              <div className="space-y-4">
                {skills.map(({ name, level, icon }, idx) => (
                  <SkillBar
                    key={name}
                    name={name}
                    level={level}
                    icon={icon}
                    gradient={color}
                    delay={idx * 150}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
        >
          {[
            { num: '2',    label: 'Projects Built',   color: 'text-accent-cyan' },
            { num: '500+', label: 'LinkedIn Connects', color: 'text-accent-blue' },
            { num: '2+',   label: 'Years Coding',      color: 'text-accent-purple' },
            { num: '∞',    label: 'Curiosity Level',   color: 'text-accent-pink' },
          ].map(({ num, label, color }) => (
            <div key={label} className="glass-card p-5 text-center group hover:scale-105 transition-transform duration-300">
              <div className={`text-3xl font-black ${color} mb-1`}>{num}</div>
              <div className="text-slate-400 text-xs font-medium">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
