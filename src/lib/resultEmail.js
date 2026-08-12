import { results } from '../data/results.js'

// Strip *italic* / **bold** markers so copy reads clean in a plaintext email.
function plain(s) {
  return s.replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\*([^*]+)\*/g, '$1')
}

// Build a mailto: link that opens the user's own mail app with their result
// pre-filled. The message is composed and sent BY the user, TO themselves — it
// is never transmitted to us or any server (same "nothing leaves the device"
// model as the Mentimeter hand-off). Returns null if no email was given.
export function resultMailto(email, result) {
  if (!email) return null
  const { tendencies, labels } = results

  const keys = result.kind === 'blend' ? result.tied : [result.primary]
  const primaryNames = keys.map((k) => tendencies[k].name).join(' + ')
  const next =
    result.kind === 'blend' ? null
    : result.kind === 'secondTie' ? result.secondaries.map((k) => tendencies[k].name).join(' / ')
    : tendencies[result.secondary].name

  const lines = [`Your primary move: ${primaryNames}`]
  if (next) lines.push(`Your next move: ${next}`)
  lines.push('')

  for (const k of keys) {
    const t = tendencies[k]
    if (keys.length > 1) lines.push(`— ${t.name} —`)
    lines.push(`${labels.defaultMove} ${plain(t.defaultMove)}`)
    lines.push(`${labels.gives} ${t.gives.word}. ${plain(t.gives.rest)}`)
    lines.push(`${labels.costs} ${t.costs.word}. ${plain(t.costs.rest)}`)
    lines.push(`${labels.cmuWatch} ${plain(t.cmuWatch)}`)
    lines.push(`${labels.cpWatch} ${plain(t.cpWatch)}`)
    lines.push('')
  }
  lines.push('Next: place yourself on the grid in Mentimeter.')

  const subject = `Your First Move result: ${primaryNames}`
  const body = lines.join('\n')
  return `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
