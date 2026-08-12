import { results } from '../data/results.js'

// The two-axis model as a 2x2 grid (spec §2) — the same grid CAs stand on in
// Mentimeter next. Cell layout (row-major) matches the spec table:
//   [ Acts quickly + task = PS ][ Acts quickly + person = GE ]
//   [ Holds back  + task = AO ][ Holds back  + person = AL ]
const CELLS = ['PS', 'GE', 'AO', 'AL']

// Continuous marker position from the four counts, so the dot shows both
// direction (which way you lean) and depth (how strong the lean).
//   x: toward the task (-) <-> toward the person (+)
//   y: holds back (-) <-> acts quickly (+)
// Mapped into 8%..92% of the plot: a strong lean lands deep in its quadrant
// (near the corner, clear of the centered label); a balanced result sits near
// the middle, between all four names.
function dotPosition(counts) {
  const total = counts.PS + counts.GE + counts.AL + counts.AO
  if (!total) return null
  const x = (counts.GE + counts.AL - counts.PS - counts.AO) / total
  const y = (counts.PS + counts.GE - counts.AL - counts.AO) / total
  return { left: 50 + x * 42, top: 50 - y * 42 }
}

export default function QuadrantGrid({ primaryKeys = [], secondaryKeys = [], counts = null }) {
  const pos = counts ? dotPosition(counts) : null
  return (
    <div className="grid-wrap" aria-hidden="true">
      <div className="grid-axis-top">Acts quickly</div>
      <div className="grid-row">
        <div className="grid-side left">The situation</div>
        <div className="grid">
          {CELLS.map((k) => {
            const cls = primaryKeys.includes(k)
              ? 'cell primary'
              : secondaryKeys.includes(k)
                ? 'cell secondary'
                : 'cell'
            return (
              <div key={k} className={cls}>
                {results.tendencies[k].short}
              </div>
            )
          })}
          {pos && (
            <span
              className="grid-dot"
              style={{ left: `${pos.left}%`, top: `${pos.top}%` }}
            />
          )}
        </div>
        <div className="grid-side right">The person</div>
      </div>
      <div className="grid-axis-bottom">Holds back first</div>
    </div>
  )
}
