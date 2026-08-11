import { results } from '../data/results.js'

// Screen 1 — Intro. Title, one-paragraph frame (verbatim), Start. Nothing else.
export default function Intro({ onStart }) {
  return (
    <section className="screen" aria-labelledby="intro-title">
      <div className="mt-24">
        <p className="eyebrow">A quick self-check</p>
        <h1 id="intro-title" className="display mt-8">First&nbsp;Move</h1>
        <p className="lede mt-16">{results.intro}</p>
      </div>
      <div className="stack-top">
        <button className="btn btn-primary" onClick={onStart}>
          Start
        </button>
      </div>
    </section>
  )
}
