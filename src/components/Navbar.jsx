import { useState, useEffect, useRef } from 'react'

const LINKS = [
  { label: 'about',    href: '#about' },
  { label: 'skills',   href: '#skills' },
  { label: 'projects', href: '#projects' },
  { label: 'contact',  href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active,   setActive]   = useState('home')
  const [open,     setOpen]     = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    const ids = ['home', 'about', 'skills', 'projects', 'contact']
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' }
    )
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  const go = href => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <header
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(9,9,11,0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid #27272A' : '1px solid transparent',
        transition: 'all 0.25s ease',
      }}
    >
      <div
        className="container-main"
        style={{ display: 'flex', alignItems: 'center', height: 60 }}
      >
        {/* Logo */}
        <button
          onClick={() => go('#home')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, padding: 0 }}
        >
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.9rem', fontWeight: 600, color: '#FAFAFA', letterSpacing: '-0.02em' }}>
            <span style={{ color: '#3F3F46' }}>~/</span>anirban
          </span>
        </button>

        {/* Desktop nav */}
        <nav style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 28 }} className="hidden md:flex">
          {LINKS.map(({ label, href }) => (
            <button
              key={label}
              onClick={() => go(href)}
              className={`nav-item${active === href.slice(1) ? ' active' : ''}`}
              style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem' }}
            >
              {label}
            </button>
          ))}
          <a href="/resume.pdf" download className="btn-primary" style={{ padding: '7px 16px', fontSize: '0.8125rem' }}>
            resume.pdf
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(o => !o)}
          className="md:hidden"
          style={{ marginLeft: 'auto', background: 'none', border: '1px solid #27272A', borderRadius: 6, padding: '6px 10px', color: '#71717A', cursor: 'pointer', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem' }}
        >
          {open ? 'close' : 'menu'}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: '#09090B', borderBottom: '1px solid #27272A', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {LINKS.map(({ label, href }) => (
            <button key={label} onClick={() => go(href)} className="nav-item" style={{ textAlign: 'left', padding: '10px 0', borderBottom: '1px solid #18181B', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem' }}>
              {label}
            </button>
          ))}
          <a href="/resume.pdf" download className="btn-primary" style={{ marginTop: 12, justifyContent: 'center' }}>
            resume.pdf
          </a>
        </div>
      )}
    </header>
  )
}
