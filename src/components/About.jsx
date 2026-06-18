import { motion } from 'framer-motion'
import { GraduationCap, Code, Zap, Rocket } from 'lucide-react'

const TIMELINE = [
  {
    icon: GraduationCap,
    color: 'text-accent-cyan',
    bg: 'bg-accent-cyan/10',
    border: 'border-accent-cyan/20',
    title: 'B.Tech Computer Science Engineering',
    sub: 'Jalpaiguri Government Engineering College · Batch of 2028',
    desc: 'Pursuing CSE with focus on software development, algorithms, and emerging technologies.',
  },
  {
    icon: Code,
    color: 'text-accent-blue',
    bg: 'bg-accent-blue/10',
    border: 'border-accent-blue/20',
    title: 'Full-Stack Web Development',
    sub: 'HTML · CSS · JavaScript · React · Node.js · MongoDB',
    desc: 'Building responsive, modern web applications end-to-end. Always learning new frameworks and best practices.',
  },
  {
    icon: Rocket,
    color: 'text-accent-pink',
    bg: 'bg-accent-pink/10',
    border: 'border-accent-pink/20',
    title: 'Building Real-World Projects',
    sub: 'Portfolio · DSA Tracker · Alcohol Delivery Platform',
    desc: 'Applying skills by shipping complete applications — from design to deployment, focusing on clean code and great UX.',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const itemVariants = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background orb */}
      <div className="orb w-[400px] h-[400px] bg-blue-700/8 top-0 right-[-100px]" />

      <div className="max-w-6xl mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-accent-cyan text-sm font-semibold tracking-widest uppercase mb-3">Get to know me</p>
          <h2 className="section-title text-4xl font-black">About Me</h2>
          <div className="section-divider mx-auto mt-4" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Left: Intro */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="glass-card p-8">
              <p className="text-slate-300 leading-relaxed text-base mb-4">
                Hi! I'm <span className="text-white font-semibold">Anirban Shit</span>, a passionate Computer
                Science student at <span className="text-accent-cyan font-medium">Jalpaiguri Government Engineering College</span> (Batch of 2028).
              </p>
              <p className="text-slate-400 leading-relaxed text-base mb-4">
                I'm on a journey to master Full-Stack Web Development while building real-world projects using modern
                frameworks. My strong foundation in <span className="text-white">C++ and Data Structures & Algorithms</span> keeps
                me sharp in problem solving — I regularly compete on LeetCode and Codeforces.
              </p>
              <p className="text-slate-400 leading-relaxed text-base mb-6">
                I love turning ideas into real products — from crafting pixel-perfect UIs to
                building robust backends. I'm always eager to{' '}
                <span className="text-white">collaborate, contribute to open source</span>, and
                grow as a developer by working on meaningful projects.
              </p>

              {/* Key traits */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Team Player',       emoji: '🤝' },
                  { label: 'Quick Learner',      emoji: '⚡' },
                  { label: 'Problem Solver',     emoji: '🧩' },
                  { label: 'Open Source Minded', emoji: '🌐' },
                ].map(({ label, emoji }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05] text-slate-300 text-sm font-medium"
                  >
                    <span>{emoji}</span>
                    {label}
                  </div>
                ))}
              </div>
            </div>

            {/* Fun facts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-4 glass-card p-6"
            >
              <h3 className="text-white font-semibold mb-4">Currently</h3>
              <ul className="space-y-2.5">
                {[
                  { color: 'bg-accent-cyan',   text: 'Learning: React, Node.js, Express, MongoDB' },
                  { color: 'bg-accent-blue',   text: 'Comfortable: C++, DSA, HTML, CSS, JavaScript' },
                  { color: 'bg-accent-purple', text: 'Building: Alcohol Delivery Platform & more apps' },
                  { color: 'bg-emerald-400',   text: 'Always open to internships & collaborations' },
                ].map(({ color, text }) => (
                  <li key={text} className="flex items-start gap-3 text-slate-400 text-sm">
                    <span className={`w-2 h-2 rounded-full ${color} mt-1.5 shrink-0`} />
                    {text}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Right: Timeline */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="space-y-4"
          >
            {TIMELINE.map(({ icon: Icon, color, bg, border, title, sub, desc }) => (
              <motion.div
                key={title}
                variants={itemVariants}
                className={`glass-card p-5 border ${border} group hover:scale-[1.02] transition-transform duration-300 shine`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl ${bg} border ${border} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={20} className={color} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm mb-0.5">{title}</h3>
                    <p className={`text-xs font-medium mb-2 ${color}`}>{sub}</p>
                    <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
