// Regression test for the "See my results" missing-dot bug.
//
// Root cause: looked-up results were rebuilt from the nullable `answers`
// column. Rows created before answers were stored (e.g. the early Blake Center
// test row) have answers=null, so reconstruction produced all-zero counts —
// the QuadrantGrid dot (which needs a nonzero total) vanished and the result
// rendered as a bogus 4-way blend. The fix reads the authoritative `counts`
// column, which is always present.
import assert from 'node:assert/strict'
import { computeResult, resultFromCounts, countKeys } from '../src/lib/scoring.js'

// Mirror of QuadrantGrid.dotPosition: null when the counts total is zero.
function dotShows(counts) {
  const total = counts.PS + counts.GE + counts.AL + counts.AO
  return total > 0
}

// The real stored counts from the null-answers Blake Center row.
const storedCounts = { AL: 2, AO: 1, GE: 5, PS: 5 }

// 1. Reproduces the bug: the OLD path (reconstruct from missing answers) loses the dot.
const fromEmptyAnswers = computeResult({})
assert.equal(dotShows(fromEmptyAnswers.counts), false, 'empty answers => no dot (the bug)')

// 2. The FIX: rendering from the stored counts yields a valid dot and the right result.
const fixed = resultFromCounts(storedCounts)
assert.equal(dotShows(fixed.counts), true, 'stored counts => dot shows')
assert.equal(fixed.kind, 'blend', 'PS=GE=5 is a first-place tie => blend')
assert.deepEqual(fixed.tied, ['PS', 'GE'], 'blend of PS and GE')

// 3. resultFromCounts must agree with computeResult for a normal answer map.
const answers = { 1: 'AO', 2: 'GE', 3: 'GE', 4: 'AO', 5: 'AO', 6: 'GE', 7: 'GE',
                  8: 'GE', 9: 'GE', 10: 'PS', 11: 'PS', 12: 'AO', 13: 'GE' }
assert.deepEqual(resultFromCounts(countKeys(answers)), computeResult(answers),
  'resultFromCounts(countKeys(a)) === computeResult(a)')

// 4. Defensive: missing keys default to 0, no NaN blow-ups.
const partial = resultFromCounts({ PS: 3, GE: 1 })
assert.equal(dotShows(partial.counts), true, 'partial counts normalize, dot shows')

console.log('OK: scoring-lookup tests passed')
