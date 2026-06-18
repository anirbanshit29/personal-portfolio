import { useState, useEffect } from 'react'

export function useTypewriter(texts, { speed = 80, deleteSpeed = 40, pause = 2000 } = {}) {
  const [displayText, setDisplayText] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false)
        setIsDeleting(true)
      }, pause)
      return () => clearTimeout(pauseTimer)
    }

    const currentText = texts[textIndex]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentText.slice(0, displayText.length + 1))
        if (displayText.length + 1 === currentText.length) {
          setIsPaused(true)
        }
      } else {
        setDisplayText(currentText.slice(0, displayText.length - 1))
        if (displayText.length === 0) {
          setIsDeleting(false)
          setTextIndex((i) => (i + 1) % texts.length)
        }
      }
    }, isDeleting ? deleteSpeed : speed)

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, isPaused, textIndex, texts, speed, deleteSpeed, pause])

  return displayText
}
