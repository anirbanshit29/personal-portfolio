import { Github, Linkedin, Mail } from 'lucide-react'

const NAV = ['about', 'skills', 'projects', 'contact']
const go = href => document.getElementById(href)?.scrollIntoView({ behavior: 'smooth' })

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid #27272A', padding: '48px 0' }}>
      <div className="container-main">
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>

          {/* Logo */}
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.875rem', fontWeight: 600, color: '#3F3F46', letterSpacing: '-0.02em' }}>
            ~/anirban
          </span>

          {/* Nav */}
          <nav style={{ display: 'flex', gap: 20 }}>
            {NAV.map(id => (
              <button key={id} onClick={() => go(id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6875rem', color: '#27272A', letterSpacing: '0.05em', textTransform: 'uppercase', transition: 'color 0.15s ease', padding: 0 }}
                onMouseEnter={e => e.currentTarget.style.color = '#3F3F46'}
                onMouseLeave={e => e.currentTarget.style.color = '#27272A'}
              >
                {id}
              </button>
            ))}
          </nav>

          {/* Socials */}
          <div style={{ display: 'flex', gap: 16 }}>
            {[
              { href: 'https://github.com/anirbanshit29',        Icon: Github },
              { href: 'https://www.linkedin.com/in/anirbanshit', Icon: Linkedin },
              { href: 'mailto:anirbanshit77@gmail.com',          Icon: Mail },
            ].map(({ href, Icon }) => (
              <a key={href} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                style={{ color: '#27272A', transition: 'color 0.15s ease' }}
                onMouseEnter={e => e.currentTarget.style.color = '#3F3F46'}
                onMouseLeave={e => e.currentTarget.style.color = '#27272A'}
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
