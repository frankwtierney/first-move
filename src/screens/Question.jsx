import { useEffect, useMemo, useRef, useState } from 'react'
import { shuffle } from '../lib/shuffle.js'

const FLASH_MS = 250

function Check() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function BackArrow() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.5"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// Screen 2 — one scenario per screen. Tap answer -> brief selected flash ->
// auto-advance. Back button lets you change the previous answer. No skip.
export default function Question({ item, index, total, current, onAnswer, onBack }) {
  const [flashing, setFlashing] = useState(null)
  const timer = useRef(null)

  // Shuffle options once per question mount (per load). Answers are stored by
  // key, so reshuffling never corrupts a restored answer.
  const options = useMemo(() => shuffle(item.options), [item.id])

  useEffect(() => () => clearTimeout(timer.current), [])
  // Reset any pending flash when the question changes.
  useEffect(() => {
    setFlashing(null)
    clearTimeout(timer.current)
  }, [item.id])

  function pick(key) {
    if (flashing) return
    setFlashing(key)
    timer.current = setTimeout(() => onAnswer(key), FLASH_MS)
  }

  const pct = Math.round(((index + 1) / total) * 100)

  return (
    <section className="screen" aria-labelledby="q-stem">
      <div className="mt-24">
        <div className="progress-head">
          {index > 0 ? (
            <button className="btn-ghost" onClick={onBack} aria-label="Go back to the previous question">
              <BackArrow /> Back
            </button>
          ) : (
            <span aria-hidden="true" />
          )}
          <span className="progress-count">{index + 1} OF {total}</span>
        </div>
        <div className="track"><i style={{ width: `${pct}%` }} /></div>

        <h1 id="q-stem" className="stem-wrap">
          <span className="scene">{item.scene}</span>
          <span className="prompt">{item.prompt}</span>
        </h1>

        <div className="options" role="group" aria-label="Choose your first instinct">
          {options.map((opt) => {
            const selected = flashing ? flashing === opt.key : current === opt.key
            return (
              <button
                key={opt.key}
                className="option"
                aria-pressed={selected}
                onClick={() => pick(opt.key)}
              >
                <span className="mark"><Check /></span>
                <span>{opt.text}</span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
