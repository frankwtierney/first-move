import { useState } from 'react'
import { isUbEmail } from '../lib/ubEmail.js'
import { fetchLatestResult } from '../lib/collect.js'

// Screen — Lookup. Enter a UB email, fetch the most recent result on file, and
// hand it up to App to render on the Results screen. Handles the three outcomes:
// found (onFound), nothing on file (inline message), lookup error (inline retry).
export default function Lookup({ onFound, onTake, onBack }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | notfound | error

  const trimmed = email.trim()
  const emailValid = isUbEmail(trimmed)
  const showEmailError = trimmed.length > 0 && !emailValid
  const canSubmit = emailValid && status !== 'loading'

  const submit = async () => {
    if (!canSubmit) return
    setStatus('loading')
    try {
      const found = await fetchLatestResult(trimmed)
      if (found) onFound(found)
      else setStatus('notfound')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="screen" aria-labelledby="lookup-title">
      <div className="mt-24">
        <p className="eyebrow">Already took it?</p>
        <h1 id="lookup-title" className="display mt-8">See my results</h1>
        <p className="lede mt-16">
          Enter the UB email you used and we&rsquo;ll pull up your most recent result.
        </p>

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
              onChange={(e) => { setEmail(e.target.value); if (status !== 'idle') setStatus('idle') }}
              onKeyDown={(e) => { if (e.key === 'Enter') submit() }}
            />
            {showEmailError && (
              <span className="field-error">Enter a valid UB email ending in buffalo.edu.</span>
            )}
            {status === 'notfound' && (
              <span className="field-note">
                No results on file for that email yet. Take the assessment to get yours.
              </span>
            )}
            {status === 'error' && (
              <span className="field-error">Something went wrong. Please try again.</span>
            )}
          </label>
        </div>
      </div>

      <div className="stack-top btn-stack">
        <button className="btn btn-primary" onClick={submit} disabled={!canSubmit}>
          {status === 'loading' ? 'Looking…' : 'See my results'}
        </button>
        {status === 'notfound' ? (
          <button className="btn btn-outline" onClick={onTake}>
            Take the assessment
          </button>
        ) : (
          <button className="btn btn-ghost" onClick={onBack}>
            Back
          </button>
        )}
      </div>
    </section>
  )
}
