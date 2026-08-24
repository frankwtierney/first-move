// First Move — scoring. Pure functions, no React, easy to test.
// Rules (PRD §Scoring Logic, spec §2):
//   - Count answers per key across the 13 items.
//   - Primary = highest count. Secondary = next highest.
//   - Tie for FIRST  -> blend: render every tied tendency's full blocks.
//   - Tie for SECOND -> show primary normally; list both secondary names.

// Fixed display order so tied sets and blend names are deterministic.
export const KEY_ORDER = ['PS', 'GE', 'AL', 'AO']

export function countKeys(answers) {
  const counts = { PS: 0, GE: 0, AL: 0, AO: 0 }
  for (const key of Object.values(answers)) {
    if (key in counts) counts[key] += 1
  }
  return counts
}

// Rank a { PS, GE, AL, AO } tally into a discriminated result:
//   { kind: 'blend',      tied: [k, ...],                counts }
//   { kind: 'secondTie',  primary: k, secondaries: [k, ...], counts }
//   { kind: 'single',     primary: k, secondary: k,         counts }
// Use this when you already have counts (e.g. a stored result looked up by
// email). Missing keys normalize to 0 so partial/legacy data can't produce NaN.
export function resultFromCounts(counts) {
  const c = {
    PS: Number(counts?.PS) || 0,
    GE: Number(counts?.GE) || 0,
    AL: Number(counts?.AL) || 0,
    AO: Number(counts?.AO) || 0,
  }
  const ordered = [...KEY_ORDER]

  const maxCount = Math.max(...ordered.map((k) => c[k]))
  const firstPlace = ordered.filter((k) => c[k] === maxCount)

  if (firstPlace.length > 1) {
    return { kind: 'blend', tied: firstPlace, counts: c }
  }

  const primary = firstPlace[0]
  const rest = ordered.filter((k) => k !== primary)
  const secondCount = Math.max(...rest.map((k) => c[k]))
  const secondPlace = rest.filter((k) => c[k] === secondCount)

  if (secondPlace.length > 1) {
    return { kind: 'secondTie', primary, secondaries: secondPlace, counts: c }
  }

  return { kind: 'single', primary, secondary: secondPlace[0], counts: c }
}

// answers: an object/map of { [questionId]: 'PS' | 'GE' | 'AL' | 'AO' }.
export function computeResult(answers) {
  return resultFromCounts(countKeys(answers))
}
