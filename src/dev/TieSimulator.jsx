// Dev-only helper to jump straight to a result pattern (PRD build step 3).
// Rendered only under import.meta.env.DEV, so it is tree-shaken out of the
// production build and never reaches students. Styles are inline here (not in
// index.css) so no dev styling ships to production either.

// Build an answers map { 1..12 -> key } matching the requested per-key counts.
function pattern(counts) {
  const answers = {}
  let id = 1
  for (const [key, n] of Object.entries(counts)) {
    for (let i = 0; i < n; i++) answers[id++] = key
  }
  return answers
}

const CASES = [
  { label: 'Single (PS)', counts: { PS: 6, GE: 3, AL: 2, AO: 1 } },
  { label: '1st tie 4/4/2/2', counts: { PS: 4, GE: 4, AL: 2, AO: 2 } },
  { label: '3-way 1st tie', counts: { PS: 4, GE: 4, AL: 4, AO: 0 } },
  { label: '2nd-place tie', counts: { PS: 5, GE: 3, AL: 3, AO: 1 } },
]

const barStyle = {
  position: 'fixed', left: 8, bottom: 8, zIndex: 50,
  display: 'flex', flexWrap: 'wrap', gap: 6, padding: 8,
  background: '#111', borderRadius: 10, maxWidth: 'calc(100vw - 16px)',
}
const btnStyle = {
  font: '600 11px system-ui, sans-serif', color: '#fff', background: '#333',
  border: '1px solid #555', borderRadius: 6, padding: '6px 8px', cursor: 'pointer',
}
const tagStyle = {
  color: '#888', alignSelf: 'center', padding: '0 4px',
  font: '600 10px system-ui, sans-serif', letterSpacing: '0.08em',
}

export default function TieSimulator({ onSimulate, onReset }) {
  return (
    <div style={barStyle} role="group" aria-label="Dev tie simulator">
      <span style={tagStyle}>DEV</span>
      {CASES.map((c) => (
        <button key={c.label} style={btnStyle} onClick={() => onSimulate(pattern(c.counts))}>
          {c.label}
        </button>
      ))}
      <button style={btnStyle} onClick={onReset}>Reset</button>
    </div>
  )
}
