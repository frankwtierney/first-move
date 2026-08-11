import { useEffect, useState } from 'react'
import { questions } from './data/questions.js'
import { computeResult } from './lib/scoring.js'
import Intro from './screens/Intro.jsx'
import Question from './screens/Question.jsx'
import Results from './screens/Results.jsx'
import NextStep from './screens/NextStep.jsx'
import TieSimulator from './dev/TieSimulator.jsx'

const STORE_KEY = 'firstmove.v1'
const TOTAL = questions.length

// In-progress state survives rotation / lock / reload within the tab via
// sessionStorage. Nothing is persisted beyond the tab; nothing leaves the device.
function loadState() {
  try {
    const raw = sessionStorage.getItem(STORE_KEY)
    if (raw) return JSON.parse(raw)
  } catch { /* ignore */ }
  return { screen: 'intro', index: 0, answers: {} }
}

export default function App() {
  const [state, setState] = useState(loadState)
  const { screen, index, answers } = state

  useEffect(() => {
    try { sessionStorage.setItem(STORE_KEY, JSON.stringify(state)) } catch { /* ignore */ }
  }, [state])

  // Move focus/scroll to top on each screen or question change.
  useEffect(() => { window.scrollTo(0, 0) }, [screen, index])

  const start = () => setState({ screen: 'question', index: 0, answers: {} })

  const answer = (key) => {
    setState((s) => {
      const nextAnswers = { ...s.answers, [questions[s.index].id]: key }
      if (s.index < TOTAL - 1) return { ...s, answers: nextAnswers, index: s.index + 1 }
      return { ...s, answers: nextAnswers, screen: 'results' }
    })
  }

  const back = () => setState((s) => ({ ...s, index: Math.max(0, s.index - 1) }))
  const toNext = () => setState((s) => ({ ...s, screen: 'next' }))
  const retake = () => {
    try { sessionStorage.removeItem(STORE_KEY) } catch { /* ignore */ }
    setState({ screen: 'intro', index: 0, answers: {} })
  }

  // Dev-only jump to a result pattern.
  const simulate = (patternAnswers) =>
    setState({ screen: 'results', index: TOTAL - 1, answers: patternAnswers })

  let view
  if (screen === 'question') {
    const item = questions[index]
    view = (
      <Question
        item={item}
        index={index}
        total={TOTAL}
        current={answers[item.id]}
        onAnswer={answer}
        onBack={back}
      />
    )
  } else if (screen === 'results') {
    view = <Results result={computeResult(answers)} onNext={toNext} />
  } else if (screen === 'next') {
    view = <NextStep onRetake={retake} />
  } else {
    view = <Intro onStart={start} />
  }

  return (
    <div className="app">
      {view}
      <footer className="footer">Campus Living &amp; Residential Life, University at Buffalo</footer>
      {import.meta.env.DEV && <TieSimulator onSimulate={simulate} onReset={retake} />}
    </div>
  )
}
