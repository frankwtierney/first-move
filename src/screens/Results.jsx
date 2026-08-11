import { results } from '../data/results.js'
import QuadrantGrid from '../components/QuadrantGrid.jsx'

const { labels, tendencies, tieForFirst, tieForSecond } = results

function TendencyBlocks({ keyName }) {
  const t = tendencies[keyName]
  return (
    <div className="block-group">
      <h3>{t.name}</h3>
      <p className="block"><b>{labels.defaultMove}</b> <span>{t.defaultMove}</span></p>
      <p className="block"><b>{labels.gives}</b> <span>{t.gives}</span></p>
      <p className="block"><b>{labels.costs}</b> <span>{t.costs}</span></p>
      <p className="block"><b>{labels.cmuWatch}</b> <span>{t.cmuWatch}</span></p>
      <p className="block"><b>{labels.cpWatch}</b> <span>{t.cpWatch}</span></p>
    </div>
  )
}

// Screen 3 — Results. Renders single, second-place tie, or first-place blend.
export default function Results({ result, onNext }) {
  let headline
  let subline = null
  let tieLine = null
  let primaryKeys = []
  let secondaryKeys = []
  let blockKeys = []

  if (result.kind === 'blend') {
    // First-place tie: blend name from short forms; render both full blocks.
    headline = result.tied.map((k) => tendencies[k].short).join(tieForFirst.blendSeparator)
    tieLine = tieForFirst.line
    primaryKeys = result.tied
    blockKeys = result.tied
  } else if (result.kind === 'secondTie') {
    headline = tendencies[result.primary].name
    subline = 'Secondary: ' + result.secondaries.map((k) => tendencies[k].short).join(tieForSecond.nameSeparator)
    primaryKeys = [result.primary]
    secondaryKeys = result.secondaries
    blockKeys = [result.primary]
  } else {
    headline = tendencies[result.primary].name
    subline = 'Secondary: ' + tendencies[result.secondary].name
    primaryKeys = [result.primary]
    secondaryKeys = [result.secondary]
    blockKeys = [result.primary]
  }

  return (
    <section className="screen" aria-labelledby="result-title">
      <div className="mt-24 result-head">
        <p className="eyebrow">Your default move</p>
        <h1 id="result-title" className="tendency-name mt-8">{headline}</h1>
        {subline && <p className="tendency-second">{subline}</p>}
        {tieLine && <p className="tie-line">{tieLine}</p>}
      </div>

      <QuadrantGrid primaryKeys={primaryKeys} secondaryKeys={secondaryKeys} />

      <div className="blocks">
        {blockKeys.map((k) => <TendencyBlocks key={k} keyName={k} />)}
      </div>

      <div className="stack-top">
        <button className="btn btn-primary" onClick={onNext}>
          What to do next
        </button>
      </div>
    </section>
  )
}
