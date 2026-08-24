import { results } from '../data/results.js'

// Screen 0 — Landing. The app's front door: take the assessment, or look up a
// result already on file by UB email. Both buttons just switch screens; the
// intro (email/building capture) and lookup screens own their own flows.
export default function Landing({ onTake, onLookup }) {
  return (
    <section className="screen" aria-labelledby="landing-title">
      <div className="mt-24">
        <p className="eyebrow">A quick self-check</p>
        <h1 id="landing-title" className="display mt-8">First&nbsp;Move</h1>
        <p className="lede mt-16">{results.intro}</p>
      </div>

      <div className="stack-top btn-stack">
        <button className="btn btn-primary" onClick={onTake}>
          Take the assessment
        </button>
        <button className="btn btn-outline" onClick={onLookup}>
          See my results
        </button>
      </div>
    </section>
  )
}
