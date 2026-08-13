import { useEffect, useState } from 'react'
import { questions } from './data/questions.js'
import { computeResult } from './lib/scoring.js'
import { submitResult } from './lib/collect.js'
import Intro from './screens/Intro.jsx'
import Question from './screens/Question.jsx'
import GridExplainer from './screens/GridExplainer.jsx'
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
  return { screen: 'intro', index: 0, answers: {}, email: '', building: '' }
}

export default function App() {
  const [state, setState] = useState(loadState)
  const { screen, index, answers, email, building } = state

  useEffect(() => {
    try { sessionStorage.setItem(STORE_KEY, JSON.stringify(state)) } catch { /* ignore */ }
  }, [state])

  // Move focus/scroll to top on each screen or question change.
  useEffect(() => { window.scrollTo(0, 0) }, [screen, index])

  const start = ({ email, building }) =>
    setState({ screen: 'question', index: 0, answers: {}, email, building })

  const answer = (key) => {
    setState((s) => {
      const nextAnswers = { ...s.answers, [questions[s.index].id]: key }
      if (s.index < TOTAL - 1) return { ...s, answers: nextAnswers, index: s.index + 1 }
      return { ...s, answers: nextAnswers, screen: 'explainer' }
    })
  }

  const back = () => setState((s) => ({ ...s, index: Math.max(0, s.index - 1) }))
  // Revealing the result is the moment we record one participant-level result
  // (email + building + result) so Residential Life can follow up. Best-effort;
  // the result renders regardless of whether collection is configured or succeeds.
  const reveal = () => {
    submitResult({ email, building, answers, result: computeResult(answers) })
    setState((s) => ({ ...s, screen: 'results' }))
  }
  const toNext = () => setState((s) => ({ ...s, screen: 'next' }))
  const retake = () => {
    try { sessionStorage.removeItem(STORE_KEY) } catch { /* ignore */ }
    setState({ screen: 'intro', index: 0, answers: {}, email: '', building: '' })
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
  } else if (screen === 'explainer') {
    view = <GridExplainer onReveal={reveal} />
  } else if (screen === 'results') {
    view = <Results result={computeResult(answers)} email={email} building={building} onNext={toNext} />
  } else if (screen === 'next') {
    view = <NextStep onRetake={retake} />
  } else {
    view = <Intro onStart={start} initialEmail={email} initialBuilding={building} />
  }

  return (
    <div className="app">
      {view}
      <footer className="footer">Campus Living &amp; Residential Life, University at Buffalo</footer>
      {import.meta.env.DEV && <TieSimulator onSimulate={simulate} onReset={retake} />}
    </div>
  )
}
