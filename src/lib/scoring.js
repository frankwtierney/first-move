// First Move — scoring. Pure functions, no React, easy to test.
// Rules (PRD §Scoring Logic, spec §2):
//   - Count answers per key across the 12 items.
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

// answers: an object/map of { [questionId]: 'PS' | 'GE' | 'AL' | 'AO' }
// Returns a discriminated result:
//   { kind: 'blend',      tied: [k, ...],           counts }
//   { kind: 'secondTie',  primary: k, secondaries: [k, ...], counts }
//   { kind: 'single',     primary: k, secondary: k, counts }
export function computeResult(answers) {
  const counts = countKeys(answers)
  const ordered = [...KEY_ORDER]

  const maxCount = Math.max(...ordered.map((k) => counts[k]))
  const firstPlace = ordered.filter((k) => counts[k] === maxCount)

  if (firstPlace.length > 1) {
    return { kind: 'blend', tied: firstPlace, counts }
  }

  const primary = firstPlace[0]
  const rest = ordered.filter((k) => k !== primary)
  const secondCount = Math.max(...rest.map((k) => counts[k]))
  const secondPlace = rest.filter((k) => counts[k] === secondCount)

  if (secondPlace.length > 1) {
    return { kind: 'secondTie', primary, secondaries: secondPlace, counts }
  }

  return { kind: 'single', primary, secondary: secondPlace[0], counts }
}
