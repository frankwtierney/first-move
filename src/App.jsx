import { questions } from './data/questions.js'
import { results } from './data/results.js'

// Placeholder shell only. UI screens (intro / question / results / next-step)
// are intentionally NOT built yet — per the build plan, content in the data
// files is verified for fidelity before any UI work begins.
export default function App() {
  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: 16, maxWidth: 460, margin: '0 auto' }}>
      <h1 style={{ color: '#005bbb' }}>First Move</h1>
      <p style={{ color: '#666666' }}>
        Scaffold complete. {questions.length} items and {Object.keys(results.tendencies).length} result
        tendencies loaded from the data files. UI not built yet.
      </p>
    </main>
  )
}
