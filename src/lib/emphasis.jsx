// Lightweight inline emphasis for results copy.
// Renders **bold** as <strong> and *italic* as <em>. No nesting; anything that
// isn't a marker passes through as plain text. Keeps copy authorable as plain
// strings in the data files while letting a few words carry weight.
const TOKEN = /\*\*([^*]+)\*\*|\*([^*]+)\*/g

export function Rich({ text }) {
  const nodes = []
  let last = 0
  let key = 0
  let m
  while ((m = TOKEN.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index))
    if (m[1] != null) nodes.push(<strong key={key++}>{m[1]}</strong>)
    else nodes.push(<em key={key++}>{m[2]}</em>)
    last = m.index + m[0].length
  }
  if (last < text.length) nodes.push(text.slice(last))
  return nodes
}
