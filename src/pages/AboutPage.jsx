import { useState } from 'react'
import { motion } from 'framer-motion'

/* ── File tree data ──────────────────────────────────────────── */
const SECTIONS = {
  bio: {
    label: 'bio',
    dot: 'dot-red',
    lines: [
      { t: '/**', c: 's-comment' },
      { t: ' * About me', c: 's-comment' },
      { t: ' *', c: 's-comment' },
      { t: ' * I am a B.Tech CSE student at JGEC,', c: 's-comment' },
      { t: ' * Jalpaiguri Government Engineering College,', c: 's-comment' },
      { t: ' * graduating in 2028. I build full-stack web', c: 's-comment' },
      { t: ' * applications end to end — from clean,', c: 's-comment' },
      { t: ' * responsive UIs to scalable REST backends.', c: 's-comment' },
      { t: ' *', c: 's-comment' },
      { t: ' * My foundation in C++ and DSA keeps my', c: 's-comment' },
      { t: ' * problem-solving sharp. I believe great', c: 's-comment' },
      { t: ' * software is simple, fast, and reliable.', c: 's-comment' },
      { t: ' *', c: 's-comment' },
      { t: ' * I am driven by curiosity and constantly', c: 's-comment' },
      { t: ' * learning new things in the world of tech.', c: 's-comment' },
      { t: ' */', c: 's-comment' },
    ],
  },
  interests: {
    label: 'interests',
    dot: 'dot-teal',
    lines: [
      { t: '/**', c: 's-comment' },
      { t: ' * My Interests', c: 's-comment' },
      { t: ' *', c: 's-comment' },
      { t: ' * [1] Web Development (React, Node.js)', c: 's-comment' },
      { t: ' * [2] Data Structures & Algorithms', c: 's-comment' },
      { t: ' * [3] System Design', c: 's-comment' },
      { t: ' * [4] Open Source Contribution', c: 's-comment' },
      { t: ' * [5] Building side projects', c: 's-comment' },
      { t: ' * [6] Competitive Programming', c: 's-comment' },
      { t: ' */', c: 's-comment' },
    ],
  },
  education: {
    label: 'education',
    dot: 'dot-blue',
    lines: [
      { t: '// Education', c: 's-comment' },
      { t: '', c: '' },
      {
        raw: true, content: [
          { t: 'const ', c: 's-keyword' },
          { t: 'education', c: 's-fn' },
          { t: ' = {', c: '' },
        ]
      },
      {
        raw: true, content: [
          { t: '  college', c: 's-prop' },
          { t: ': ', c: '' },
          { t: '"JGEC — Jalpaiguri Government Engineering College"', c: 's-string' },
          { t: ',', c: '' },
        ]
      },
      {
        raw: true, content: [
          { t: '  degree', c: 's-prop' },
          { t: ': ', c: '' },
          { t: '"B.Tech in Computer Science & Engineering"', c: 's-string' },
          { t: ',', c: '' },
        ]
      },
      {
        raw: true, content: [
          { t: '  batch', c: 's-prop' },
          { t: ': ', c: '' },
          { t: '"2024 — 2028"', c: 's-string' },
          { t: ',', c: '' },
        ]
      },
      {
        raw: true, content: [
          { t: '  cgpa', c: 's-prop' },
          { t: ': ', c: '' },
          { t: '"pursuing"', c: 's-string' },
          { t: ',', c: '' },
        ]
      },
      { raw: true, content: [{ t: '}', c: '' }] },
    ],
  },
}

const SNIPPETS = [
  {
    user: 'AS',
    color: '#43D9AD',
    ago: 'just now',
    stars: 3,
    code: [
      { t: 'function ', c: 's-keyword' },
      { t: 'buildProject', c: 's-fn' },
      { t: '(idea) {', c: '' },
      '\n',
      { t: '  const ', c: 's-keyword' },
      { t: 'stack', c: 's-fn' },
      { t: ' = [', c: '' },
      { t: '"React"', c: 's-string' },
      { t: ', ', c: '' },
      { t: '"Node.js"', c: 's-string' },
      { t: '];', c: '' },
      '\n',
      { t: '  return ', c: 's-keyword' },
      { t: 'deploy', c: 's-fn' },
      { t: '(idea, stack);', c: '' },
      '\n',
      { t: '}', c: '' },
    ],
  },
  {
    user: 'AS',
    color: '#5BC8F5',
    ago: '2 months ago',
    stars: 0,
    code: [
      { t: 'const ', c: 's-keyword' },
      { t: 'goal', c: 's-fn' },
      { t: ' = ', c: '' },
      { t: '"get internship"', c: 's-string' },
      { t: ';', c: '' },
      '\n',
      { t: 'const ', c: 's-keyword' },
      { t: 'action', c: 's-fn' },
      { t: ' = ', c: '' },
      { t: '"keep building"', c: 's-string' },
      { t: ';', c: '' },
      '\n',
      { t: 'while', c: 's-keyword' },
      { t: '(!done)', c: '' },
      { t: ' learn()', c: 's-fn' },
      { t: ';', c: '' },
    ],
  },
]

function renderLine(line, i) {
  if (!line) return <br key={i} />
  if (line.raw) {
    return (
      <div key={i} style={{ display: 'flex' }}>
        {line.content.map((tok, j) => (
          <span key={j} className={tok.c}>{tok.t}</span>
        ))}
      </div>
    )
  }
  return <div key={i} className={line.c}>{line.t || '\u00a0'}</div>
}

function renderSnippetCode(tokens) {
  return tokens.map((t, i) =>
    t === '\n' ? <br key={i} /> : <span key={i} className={t.c}>{t.t}</span>
  )
}

export default function AboutPage() {
  const [active, setActive] = useState('bio')
  const [open, setOpen] = useState({ personal: true, education: true, contacts: true })

  const section = SECTIONS[active]

  return (
    <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

      {/* ── Sidebar ── */}
      <div className="vsc-sidebar" style={{ width: 220 }}>

        {/* Personal info */}
        <div
          className="sidebar-section-title"
          style={{ cursor: 'pointer', marginTop: 8 }}
          onClick={() => setOpen(o => ({ ...o, personal: !o.personal }))}
        >
          <span style={{ color: '#3a5068' }}>{open.personal ? '▾' : '▸'}</span>
          personal-info
        </div>
        {open.personal && (
          <>
            {['bio', 'interests'].map(key => (
              <div
                key={key}
                className={`sidebar-item${active === key ? ' active' : ''}`}
                onClick={() => setActive(key)}
              >
                <div className={`dot ${SECTIONS[key].dot}`} />
                {key}
              </div>
            ))}
            <div
              className={`sidebar-item${active === 'education' ? ' active' : ''}`}
              onClick={() => setActive('education')}
            >
              <div className="dot dot-blue" />
              education
            </div>
          </>
        )}

        {/* Contacts */}
        <div
          className="sidebar-section-title"
          style={{ cursor: 'pointer', marginTop: 12 }}
          onClick={() => setOpen(o => ({ ...o, contacts: !o.contacts }))}
        >
          <span style={{ color: '#3a5068' }}>{open.contacts ? '▾' : '▸'}</span>
          contacts
        </div>
        {open.contacts && (
          <>
            <div className="sidebar-item" style={{ gap: 6 }}>
              <span style={{ fontSize: '0.65rem', color: '#3a5068' }}>✉</span>
              <span style={{ fontSize: '0.68rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                anirbanshit77@gmail.com
              </span>
            </div>
            <div className="sidebar-item" style={{ gap: 6 }}>
              <span style={{ fontSize: '0.65rem', color: '#3a5068' }}>in</span>
              <a
                href="https://www.linkedin.com/in/anirbanshit"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '0.68rem', color: '#607B96', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
              >
                linkedin.com/in/anirbanshit
              </a>
            </div>
          </>
        )}
      </div>

      {/* ── Middle: Code editor — flex:1 so it fills all remaining width ── */}
      <div style={{ flex: 1, minWidth: 0, borderRight: '1px solid #1e2d3d', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Inner tab */}
        <div className="vsc-inner-tabs">
          <div className="vsc-inner-tab">
            <span>{section.label}</span>
            <span className="close">×</span>
          </div>
        </div>
        {/* Editor — pre-wrap so long comment lines wrap instead of overflow */}
        <div className="code-editor">
          <div className="line-numbers">
            {section.lines.map((_, i) => <div key={i}>{i + 1}</div>)}
          </div>
          <div className="code-content" style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {section.lines.map((line, i) => renderLine(line, i))}
          </div>
        </div>
      </div>

      {/* ── Right: Code snippets — fixed 320px panel ── */}
      <div style={{ flex: '0 0 320px', borderLeft: '1px solid #1e2d3d', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div className="vsc-inner-tabs">
          <div className="vsc-inner-tab" style={{ color: '#607B96', fontSize: '0.7rem' }}>
            // Code snippet showcase:
          </div>
        </div>
        <div className="pane-scroll" style={{ padding: 20 }}>
          {SNIPPETS.map((s, i) => (
            <div key={i} className="snippet-card">
              <div className="snippet-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.55rem', fontWeight: 700, color: '#011627' }}>
                    {s.user}
                  </div>
                  <span style={{ color: '#5BC8F5' }}>@anirban</span>
                  <span style={{ color: '#3a5068' }}>Created {s.ago}</span>
                </div>
                <div style={{ display: 'flex', gap: 12, color: '#3a5068' }}>
                  <span>details</span>
                  <span>☆ {s.stars} stars</span>
                </div>
              </div>
              <div className="snippet-body" style={{ color: '#607B96' }}>
                {renderSnippetCode(s.code)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
