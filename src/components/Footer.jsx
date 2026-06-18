import { Github, Linkedin, Mail, Code2 } from 'lucide-react'

const LINKS = [
  { label: 'Home',     href: '#home' },
  { label: 'About',    href: '#about' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact' },
]

const SOCIALS = [
  { icon: Github,   href: 'https://github.com/anirbanshit',                label: 'GitHub',   color: 'hover:text-white' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/anirbanshit',      label: 'LinkedIn', color: 'hover:text-accent-blue' },
  { icon: Mail,     href: 'mailto:anirbanshit77@gmail.com',               label: 'Email',    color: 'hover:text-accent-cyan' },
]

export default function Footer() {

  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <footer className="relative border-t border-white/[0.04] mt-8">
      {/* Top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-accent-cyan/50 to-transparent" />

      <div className="max-w-6xl mx-auto px-5 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-10">

          {/* Brand */}
          <div>
            <a
              href="#home"
              onClick={e => { e.preventDefault(); scrollTo('#home') }}
              className="flex items-center gap-2 text-white font-bold text-lg mb-3"
            >
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-dark-900">
                <Code2 size={16} strokeWidth={2.5} />
              </span>
              <span className="gradient-text">Anirban Shit</span>
            </a>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              B.Tech CSE'28 @ JGEC. Learning, building, and exploring the world of modern web development.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Navigation</h4>
            <ul className="space-y-2">
              {LINKS.map(({ label, href }) => (
                <li key={label}>
                  <button
                    onClick={() => scrollTo(href)}
                    className="text-slate-500 text-sm hover:text-slate-300 transition-colors duration-200"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Connect</h4>
            <div className="flex flex-col gap-2">
              {SOCIALS.map(({ icon: Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 text-slate-500 text-sm transition-colors duration-200 ${color}`}
                >
                  <Icon size={15} />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>


      </div>
    </footer>
  )
}
