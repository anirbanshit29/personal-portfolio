import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ── Constants ───────────────────────────────────────────────── */
const COLS = 15, ROWS = 12, CS = 15        // grid cols × rows × cell-size(px)
const TOTAL_FOOD = 8
const TICK = 130                            // ms per frame

/* ── Helpers ─────────────────────────────────────────────────── */
const randFood = (snake) => {
  const occupied = new Set(snake.map(s => `${s.x},${s.y}`))
  const food = []
  let attempts = 0
  while (food.length < TOTAL_FOOD && attempts < 500) {
    attempts++
    const x = Math.floor(Math.random() * COLS)
    const y = Math.floor(Math.random() * ROWS)
    const k = `${x},${y}`
    if (!occupied.has(k) && !food.some(f => `${f.x},${f.y}` === k)) {
      food.push({ x, y })
      occupied.add(k)
    }
  }
  return food
}

/* ── Arrow key component ─────────────────────────────────────── */
function ArrowKey({ char, pressed }) {
  return (
    <div className={`arrow-key${pressed ? ' pressed' : ''}`}>{char}</div>
  )
}

/* ── Snake Game ──────────────────────────────────────────────── */
export default function SnakeGame({ onSkip }) {
  const canvasRef = useRef(null)
  const gameRef   = useRef({
    snake:   [{ x: 8, y: 6 }, { x: 7, y: 6 }, { x: 6, y: 6 }],
    dir:     { x: 1, y: 0 },
    nextDir: { x: 1, y: 0 },
    food:    [],
    running: false,
  })
  const intervalRef = useRef(null)
  const [phase,    setPhase]    = useState('idle')   // idle|playing|won|lost
  const [eaten,    setEaten]    = useState(0)
  const [pressed,  setPressed]  = useState(null)     // for arrow-key highlight

  /* ── Draw ── */
  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const { snake, food } = gameRef.current

    // Background
    ctx.fillStyle = '#010e1a'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Grid dots
    ctx.fillStyle = 'rgba(96,123,150,0.07)'
    for (let x = 0; x < COLS; x++)
      for (let y = 0; y < ROWS; y++)
        ctx.fillRect(x * CS + Math.floor(CS / 2), y * CS + Math.floor(CS / 2), 1, 1)

    // Food
    food.forEach(f => {
      ctx.fillStyle = '#FEA55F'
      ctx.beginPath()
      ctx.arc(f.x * CS + CS / 2, f.y * CS + CS / 2, 4, 0, Math.PI * 2)
      ctx.fill()
    })

    // Snake segments (rounded rects)
    snake.forEach((seg, i) => {
      const alpha = Math.max(0.35, 1 - i * 0.05)
      ctx.fillStyle = i === 0 ? '#43D9AD' : `rgba(67,217,173,${alpha})`
      const x = seg.x * CS + 2, y = seg.y * CS + 2, w = CS - 4, h = CS - 4
      ctx.beginPath()
      ctx.roundRect?.(x, y, w, h, 3) ?? ctx.rect(x, y, w, h)
      ctx.fill()
    })
  }, [])

  /* ── Initial idle draw (L-shape preview) ── */
  useEffect(() => {
    const g = gameRef.current
    g.snake = [
      { x: 6, y: 8 }, { x: 6, y: 7 }, { x: 6, y: 6 },
      { x: 7, y: 6 }, { x: 8, y: 6 }, { x: 9, y: 6 },
    ]
    g.food = []
    draw()
  }, [draw])

  /* ── Start game ── */
  const startGame = useCallback(() => {
    clearInterval(intervalRef.current)
    const g = gameRef.current
    g.snake   = [{ x: 8, y: 6 }, { x: 7, y: 6 }, { x: 6, y: 6 }]
    g.dir     = { x: 1, y: 0 }
    g.nextDir = { x: 1, y: 0 }
    g.food    = randFood(g.snake)
    g.running = true
    setPhase('playing')
    setEaten(0)
    draw()
  }, [draw])

  /* ── Game loop ── */
  useEffect(() => {
    if (phase !== 'playing') return

    const tick = () => {
      const g = gameRef.current
      if (!g.running) return
      g.dir = { ...g.nextDir }
      const head = { x: g.snake[0].x + g.dir.x, y: g.snake[0].y + g.dir.y }

      // Wall / self collision
      if (
        head.x < 0 || head.x >= COLS ||
        head.y < 0 || head.y >= ROWS ||
        g.snake.some(s => s.x === head.x && s.y === head.y)
      ) {
        g.running = false
        clearInterval(intervalRef.current)
        setPhase('lost')
        return
      }

      g.snake.unshift(head)
      const fi = g.food.findIndex(f => f.x === head.x && f.y === head.y)
      if (fi !== -1) {
        g.food.splice(fi, 1)
        setEaten(e => {
          const ne = e + 1
          if (g.food.length === 0) {
            g.running = false
            clearInterval(intervalRef.current)
            setPhase('won')
          }
          return ne
        })
      } else {
        g.snake.pop()
      }
      draw()
    }

    intervalRef.current = setInterval(tick, TICK)
    return () => clearInterval(intervalRef.current)
  }, [phase, draw])

  /* ── Keyboard controls ── */
  useEffect(() => {
    if (phase !== 'playing') return
    const MAP = {
      ArrowUp:    { x: 0, y: -1 },
      ArrowDown:  { x: 0, y: 1 },
      ArrowLeft:  { x: -1, y: 0 },
      ArrowRight: { x: 1, y: 0 },
    }
    const onKey = e => {
      const g = gameRef.current
      const d = MAP[e.key]
      if (!d) return
      e.preventDefault()
      if (!(d.x === -g.dir.x && d.y === -g.dir.y)) g.nextDir = d
      setPressed(e.key)
      setTimeout(() => setPressed(null), 120)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [phase])

  /* ── Arrow button press (mobile) ── */
  const pressDir = useCallback((key) => {
    const MAP = {
      ArrowUp: { x: 0, y: -1 }, ArrowDown: { x: 0, y: 1 },
      ArrowLeft: { x: -1, y: 0 }, ArrowRight: { x: 1, y: 0 },
    }
    const g = gameRef.current
    const d = MAP[key]
    if (d && !(d.x === -g.dir.x && d.y === -g.dir.y)) g.nextDir = d
    setPressed(key)
    setTimeout(() => setPressed(null), 120)
  }, [])

  const foodLeft = TOTAL_FOOD - eaten

  return (
    <div className="snake-widget">
      {/* Left: Canvas + start/restart button */}
      <div className="snake-left">
        <canvas
          ref={canvasRef}
          width={COLS * CS}
          height={ROWS * CS}
          style={{ display: 'block', borderRadius: 6, border: '1px solid #1e2d3d' }}
        />
        <AnimatePresence mode="wait">
          {phase === 'won' ? (
            <motion.button
              key="won"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="game-btn green"
              onClick={onSkip}
            >
              you won! 🎉 view portfolio →
            </motion.button>
          ) : phase === 'lost' ? (
            <motion.button
              key="lost"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="game-btn"
              onClick={startGame}
            >
              try-again
            </motion.button>
          ) : (
            <motion.button
              key="start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="game-btn"
              onClick={startGame}
            >
              {phase === 'idle' ? 'start-game' : 'restart'}
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Right: Controls + food counter + skip */}
      <div className="snake-right">
        <div>
          <div style={{ color: '#3a5068', fontSize: '0.7rem', lineHeight: 1.8, marginBottom: 10 }}>
            <div>// use keyboard</div>
            <div>// arrows to play</div>
          </div>
          <div className="arrow-grid">
            <div className="arrow-row">
              <ArrowKey char="▲" pressed={pressed === 'ArrowUp'} />
            </div>
            <div className="arrow-row">
              <div onClick={() => pressDir('ArrowLeft')}><ArrowKey char="◄" pressed={pressed === 'ArrowLeft'} /></div>
              <div onClick={() => pressDir('ArrowDown')}><ArrowKey char="▼" pressed={pressed === 'ArrowDown'} /></div>
              <div onClick={() => pressDir('ArrowRight')}><ArrowKey char="►" pressed={pressed === 'ArrowRight'} /></div>
            </div>
          </div>
        </div>

        <div>
          <div style={{ color: '#3a5068', fontSize: '0.7rem', marginBottom: 8 }}>// food left</div>
          <div className="food-dots">
            {Array.from({ length: TOTAL_FOOD }).map((_, i) => (
              <div key={i} className={`food-dot${i >= foodLeft ? ' eaten' : ''}`} />
            ))}
          </div>
        </div>

        <button className="skip-btn" onClick={onSkip}>
          skip →→
        </button>
      </div>
    </div>
  )
}
