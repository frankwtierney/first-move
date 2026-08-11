import { results } from '../data/results.js'

// Screen 4 — Next step. The closing Mentimeter instruction (verbatim) + Retake.
export default function NextStep({ onRetake }) {
  return (
    <section className="screen" aria-labelledby="next-title">
      <div className="mt-24">
        <p className="eyebrow">One more thing</p>
        <h1 id="next-title" className="stem" style={{ marginTop: 12 }}>{results.nextStep}</h1>
      </div>
      <div className="stack-top">
        <button className="btn btn-outline" onClick={onRetake}>
          Retake
        </button>
      </div>
    </section>
  )
}
