import { results } from '../data/results.js'

// "Save my results" — render a branded, print-ready page in a new tab and fire
// the browser's print dialog, where the user picks "Save as PDF". Everything is
// composed on-device from the same copy the app shows (data/results.js); nothing
// is transmitted. This replaces the old mailto: hand-off (which only drafted an
// email in the user's mail app).
const { labels, tendencies, tieForFirst, tieForSecond } = results

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

// Render the copy's lightweight inline emphasis (*italic* / **bold**) as real
// HTML — escape first so user/content text can't inject markup.
function rich(s) {
  return esc(s)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
}

// Mirror Results.jsx: headline + "next move" line + which full blocks to show.
function shape(result) {
  if (result.kind === 'blend') {
    return {
      headline: result.tied.map((k) => tendencies[k].short).join(tieForFirst.blendSeparator),
      next: null,
      tie: tieForFirst.line,
      blocks: result.tied,
    }
  }
  if (result.kind === 'secondTie') {
    return {
      headline: tendencies[result.primary].name,
      next: result.secondaries.map((k) => tendencies[k].name).join(tieForSecond.nameSeparator),
      tie: null,
      blocks: [result.primary],
    }
  }
  return {
    headline: tendencies[result.primary].name,
    next: tendencies[result.secondary].name,
    tie: null,
    blocks: [result.primary],
  }
}

function row(label, valueHtml) {
  return `<div class="row"><div class="k">${esc(label)}</div><div class="v">${valueHtml}</div></div>`
}

function blockHtml(k) {
  const t = tendencies[k]
  return `<section class="block">
    <h2>${esc(t.name)}</h2>
    ${row(labels.defaultMove, rich(t.defaultMove))}
    ${row(labels.gives, `<em class="lead">${esc(t.gives.word)}.</em> ${rich(t.gives.rest)}`)}
    ${row(labels.costs, `<em class="lead">${esc(t.costs.word)}.</em> ${rich(t.costs.rest)}`)}
    ${row(labels.cmuWatch, rich(t.cmuWatch))}
    ${row(labels.cpWatch, rich(t.cpWatch))}
  </section>`
}

function metaLine({ email, building, dateStr }) {
  const parts = []
  if (email) parts.push(esc(email))
  if (building) parts.push(esc(building))
  parts.push(esc(dateStr))
  return parts.join('&nbsp;&nbsp;·&nbsp;&nbsp;')
}

function buildHtml({ email, building, result }) {
  const s = shape(result)
  const dateStr = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const headBlock = `
    <header class="head">
      <p class="brand">FIRST&nbsp;MOVE</p>
      <p class="eyebrow">Your primary move</p>
      <h1>${esc(s.headline)}</h1>
      ${s.next ? `<p class="next">Next move: <em>${esc(s.next)}</em></p>` : ''}
      ${s.tie ? `<p class="tie">${esc(s.tie)}</p>` : ''}
      <p class="meta">${metaLine({ email, building, dateStr })}</p>
    </header>`

  const blocks = s.blocks.map(blockHtml).join('\n')

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>First Move — Your result</title>
<style>
  :root {
    --ub-blue: #005bbb;
    --ink: #1a1a1a;
    --gray: #666666;
    --line: #e2e2e2;
    --accent: #e56a54;
  }
  * { box-sizing: border-box; }
  html, body { margin: 0; background: #fff; }
  body {
    color: var(--ink);
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    font-size: 12pt;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .page { max-width: 44rem; margin: 0 auto; padding: 40px 32px 56px; }

  .head { border-bottom: 2px solid var(--ub-blue); padding-bottom: 18px; margin-bottom: 22px; }
  .brand {
    margin: 0 0 14px;
    font-size: 10pt; font-weight: 700; letter-spacing: 0.18em;
    color: var(--ub-blue);
  }
  .eyebrow {
    margin: 0; text-transform: uppercase; letter-spacing: 0.08em;
    font-size: 9.5pt; font-weight: 600; color: var(--gray);
  }
  h1 {
    margin: 4px 0 0;
    font-family: "Century Gothic", "Segoe UI", system-ui, sans-serif;
    font-size: 30pt; font-weight: 700; line-height: 1.1; color: var(--ink);
    text-wrap: balance;
  }
  .next { margin: 10px 0 0; font-size: 12.5pt; color: var(--ink); }
  .next em { font-style: normal; font-weight: 600; color: var(--ub-blue); }
  .tie { margin: 8px 0 0; font-size: 11pt; color: var(--gray); }
  .meta { margin: 16px 0 0; font-size: 9.5pt; color: var(--gray); }

  .block { margin-top: 26px; break-inside: avoid; page-break-inside: avoid; }
  .block h2 {
    margin: 0 0 12px;
    font-size: 15pt; font-weight: 700; color: var(--ink);
    padding-left: 12px; border-left: 4px solid var(--accent);
  }
  .row {
    display: grid; grid-template-columns: 8.5rem 1fr; gap: 10px 16px;
    padding: 7px 0; border-top: 1px solid var(--line);
  }
  .row:first-of-type { border-top: 0; }
  .k { font-weight: 600; color: var(--gray); font-size: 10.5pt; }
  .v { color: var(--ink); }
  .v .lead { font-style: normal; font-weight: 700; color: var(--ub-blue); }
  .v strong { font-weight: 700; }

  footer {
    margin-top: 34px; padding-top: 14px; border-top: 1px solid var(--line);
    font-size: 10pt; color: var(--gray);
  }
  footer .step { color: var(--ink); font-weight: 600; }

  @media print {
    .page { padding: 0; max-width: none; }
    @page { margin: 0.7in; }
  }
</style>
</head>
<body>
  <main class="page">
    ${headBlock}
    ${blocks}
    <footer>
      <span class="step">Next:</span> place yourself on the grid in Mentimeter.
    </footer>
  </main>
  <script>
    window.addEventListener('load', function () {
      setTimeout(function () { window.print() }, 350)
    })
    window.addEventListener('afterprint', function () { window.close() })
  </script>
</body>
</html>`
}

// Open the printable result and trigger the print/save dialog. Returns false if
// a popup blocker prevented the new tab (rare for a direct click).
export function openResultPrint({ email, building, result }) {
  if (!result) return false
  const w = window.open('', '_blank')
  if (!w) return false
  w.document.open()
  w.document.write(buildHtml({ email, building, result }))
  w.document.close()
  w.focus()
  return true
}
