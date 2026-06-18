import { useState, useEffect } from 'react'
import { Moon, Sun, Menu, X, Code2 } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Home',     href: '#home' },
  { label: 'About',    href: '#about' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact' },
]

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActive] = useState('home')

  // Shrink nav on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active section tracking
  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.href.slice(1))
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    ids.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  // Close mobile nav on resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMobileOpen(false)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'py-2 bg-dark-900/80 backdrop-blur-xl border-b border-white/[0.05] shadow-lg'
            : 'py-4 bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 flex items-center gap-4">
          {/* Logo */}
          <a
            href="#home"
            onClick={e => { e.preventDefault(); scrollTo('#home') }}
            className="flex items-center gap-2 text-white font-bold text-lg tracking-tight group"
          >
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-dark-900 shadow-glow-cyan group-hover:shadow-glow-blue transition-all duration-300">
              <Code2 size={16} strokeWidth={2.5} />
            </span>
            <span className="gradient-text">Anirban<span className="text-white/40">.</span></span>
          </a>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-1 ml-auto">
            {NAV_LINKS.map(({ label, href }) => (
              <button
                key={label}
                onClick={() => scrollTo(href)}
                className={`nav-link transition-all duration-200 ${
                  activeSection === href.slice(1) ? 'active' : ''
                }`}
              >
                {label}
                {activeSection === href.slice(1) && (
                  <span className="absolute bottom-0.5 left-3 right-3 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 ml-3 md:ml-0">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-9 h-9 rounded-lg border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all duration-200"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Resume CTA */}
            <a
              href="/resume.pdf"
              download
              className="hidden md:flex btn-primary text-xs px-4 py-2"
            >
              Resume
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(o => !o)}
              aria-label="Toggle menu"
              className="md:hidden w-9 h-9 rounded-lg border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-dark-900/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        {/* Drawer */}
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-dark-800/95 backdrop-blur-xl border-l border-white/[0.06] p-6 pt-20 flex flex-col gap-2 transition-transform duration-300 ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <button
              key={label}
              onClick={() => scrollTo(href)}
              className={`text-left px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                activeSection === href.slice(1)
                  ? 'bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              {label}
            </button>
          ))}
          <div className="mt-4">
            <a href="/resume.pdf" download className="btn-primary justify-center w-full">
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
