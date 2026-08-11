import { results } from '../data/results.js'

// The two-axis model as a 2x2 grid (spec §2) — the same grid CAs stand on in
// Mentimeter next. Cell layout (row-major) matches the spec table:
//   [ Acts quickly + task = PS ][ Acts quickly + person = GE ]
//   [ Holds back  + task = AO ][ Holds back  + person = AL ]
const CELLS = ['PS', 'GE', 'AO', 'AL']

export default function QuadrantGrid({ primaryKeys = [], secondaryKeys = [] }) {
  return (
    <div className="grid-wrap" aria-hidden="true">
      <div className="grid-axis-top">Acts quickly</div>
      <div className="grid-row">
        <div className="grid-side left">Toward the task</div>
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
        </div>
        <div className="grid-side right">Toward the person</div>
      </div>
      <div className="grid-axis-bottom">Holds back first</div>
    </div>
  )
}
