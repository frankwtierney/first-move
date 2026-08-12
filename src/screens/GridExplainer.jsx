import { results } from '../data/results.js'
import QuadrantGrid from '../components/QuadrantGrid.jsx'
import { Rich } from '../lib/emphasis.jsx'

const { gridExplainer: g } = results

// Screen 3 — the read-the-grid primer, shown after the last question and before
// the result. Same 2x2 the CA will stand on in Mentimeter, with the two axes in
// plain language, so the reveal lands on a grid they already understand.
export default function GridExplainer({ onReveal }) {
  return (
    <section className="screen" aria-labelledby="grid-title">
      <div className="mt-24">
        <p className="eyebrow">{g.eyebrow}</p>
        <h1 id="grid-title" className="stem" style={{ marginTop: 12 }}>{g.title}</h1>

        <QuadrantGrid />

        <ul className="axis-guide">
          {g.axes.map((a) => (
            <li key={a.name}>
              <p className="axis-name">{a.name}</p>
              <p className="axis-desc"><Rich text={a.desc} /></p>
            </li>
          ))}
        </ul>

        <p className="lede mt-16">{g.note}</p>
      </div>
      <div className="stack-top">
        <button className="btn btn-primary" onClick={onReveal}>
          {g.cta}
        </button>
      </div>
    </section>
  )
}
