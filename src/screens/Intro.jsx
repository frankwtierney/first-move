import { useState } from 'react'
import { results } from '../data/results.js'
import { buildings, buildingGroups } from '../data/buildings.js'

// Screen 1 — Intro. Title, one-paragraph frame, required UB email + required
// building, Start. The UB email is the participant's unique ID: it's stored with
// their result so Residential Life can follow up (see lib/collect.js) and builds
// the mailto to their own inbox at the end. Start is disabled until both are set.
//
// A UB email is anything @buffalo.edu (incl. subdomains like @dental.buffalo.edu).
// Relax UB_EMAIL if you need to accept non-UB addresses.
const UB_EMAIL = /^[^\s@]+@([^\s@.]+\.)*buffalo\.edu$/i

export default function Intro({ onStart, initialEmail = '', initialBuilding = '' }) {
  const [email, setEmail] = useState(initialEmail)
  const [building, setBuilding] = useState(initialBuilding)

  const trimmed = email.trim()
  const emailValid = UB_EMAIL.test(trimmed)
  const showEmailError = trimmed.length > 0 && !emailValid
  const buildingValid = building.trim().length > 0
  const canStart = emailValid && buildingValid

  const begin = () => {
    if (canStart) onStart({ email: trimmed, building: building.trim() })
  }

  return (
    <section className="screen" aria-labelledby="intro-title">
      <div className="mt-24">
        <p className="eyebrow">A quick self-check</p>
        <h1 id="intro-title" className="display mt-8">First&nbsp;Move</h1>
        <p className="lede mt-16">{results.intro}</p>

        <div className="fields mt-16">
          <label className="field">
            <span className="field-label">
              UB email <span className="field-hint">(required)</span>
            </span>
            <input
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@buffalo.edu"
              required
              aria-invalid={showEmailError}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {showEmailError && (
              <span className="field-error">Enter a valid UB email ending in buffalo.edu.</span>
            )}
          </label>

          <label className="field">
            <span className="field-label">
              Building <span className="field-hint">(required)</span>
            </span>
            {buildings.length ? (
              <select value={building} onChange={(e) => setBuilding(e.target.value)}>
                <option value="">Select your building…</option>
                {buildingGroups.map((g) => (
                  <optgroup key={g.area} label={g.area}>
                    {g.buildings.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            ) : (
              <input
                type="text"
                placeholder="Your building"
                value={building}
                onChange={(e) => setBuilding(e.target.value)}
              />
            )}
          </label>
        </div>
      </div>

      <div className="stack-top">
        <button className="btn btn-primary" onClick={begin} disabled={!canStart}>
          Start
        </button>
      </div>
    </section>
  )
}
