// Participant-level result collection. When someone reveals their result we
// record one row: email, building, the result (both coded and human-readable),
// the per-style counts, and the full per-question answer trail. Residential
// Life reads these from the Supabase dashboard to follow up.
//
// Storage is the dedicated "FirstMove" Supabase project. Via the anon key the
// browser can insert rows and read them back for the "See my results" lookup
// (row-level security blocks updates/deletes). Read access is intentionally
// open: results are low-sensitivity and any UB email can be looked up without
// auth. The anon key is therefore safe to ship publicly:
//
//   create table public.first_move_results (
//     id           uuid primary key default gen_random_uuid(),
//     email        text,
//     building     text,
//     primary_key  text,   -- 'PS' | 'GE' | 'AL' | 'AO', or a blend like 'PS-GE'
//     result_label text,   -- human-readable, e.g. 'Problem Solver + Group Energizer (blend)'
//     counts       jsonb,  -- { PS, GE, AL, AO } tally across the 13 items
//     answers      jsonb,  -- [ { id, question, answer, key }, ... ] in question order
//     created_at   timestamptz default now()
//   );
//   alter table public.first_move_results enable row level security;
//   create policy "anon insert only" on public.first_move_results
//     for insert to anon with check (true);
//
// Values may be overridden at build time with VITE_SUPABASE_URL /
// VITE_SUPABASE_ANON_KEY; otherwise these defaults are used.
import { questions } from '../data/questions.js'
import { results } from '../data/results.js'

const { tendencies } = results

const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || 'https://kvqczofxgldkkqaujzsb.supabase.co'
const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2cWN6b2Z4Z2xka2txYXVqenNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY1NjY5MzUsImV4cCI6MjEwMjE0MjkzNX0.9w65lQ6LN8AsV7FxHUwI3ncNDmUsWmN0OTBid562Gcs'

const ENDPOINT = `${SUPABASE_URL}/rest/v1/first_move_results`
const HEADERS = {
  'Content-Type': 'application/json',
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  Prefer: 'return=minimal',
}

// Coded result: single key ('PS') or blend ('PS-GE').
function primaryKey(result) {
  if (result.kind === 'blend') return result.tied.join('-')
  return result.primary
}

// Human-readable result name for the dashboard (no codes to decipher).
function resultLabel(result) {
  if (result.kind === 'blend') {
    return result.tied.map((k) => tendencies[k].name).join(' + ') + ' (blend)'
  }
  return tendencies[result.primary].name
}

// The full 13, in question order: the scene and the exact option they chose.
function answerDetail(answers) {
  return questions.map((q) => {
    const key = answers[q.id]
    const chosen = q.options.find((o) => o.key === key)
    return {
      id: q.id,
      question: q.scene.replace(/\n/g, ' '),
      answer: chosen ? chosen.text : null,
      key: key || null,
    }
  })
}

export async function submitResult({ email, building, answers, result }) {
  if (!result) return
  const payload = {
    email: email || null,
    building: building || null,
    primary_key: primaryKey(result),
    result_label: resultLabel(result),
    counts: result.counts,
    answers: answerDetail(answers || {}),
  }
  try {
    await fetch(ENDPOINT, { method: 'POST', headers: HEADERS, body: JSON.stringify(payload) })
  } catch {
    /* best-effort; never block the user's result on collection */
  }
}

// Rebuild the { [questionId]: key } map that scoring.computeResult expects from
// the stored answer trail, so a looked-up result renders identically to the
// original. Falls back to positional ids if a row predates the id field.
function answersToMap(stored) {
  const map = {}
  ;(stored || []).forEach((a, i) => {
    if (a && a.key) map[a.id ?? i] = a.key
  })
  return map
}

// "See my results": fetch the most recent submission for a UB email. Returns
// { email, building, answers } for App to render on the Results screen, or null
// if there's nothing on file. Throws only on network/HTTP failure so the caller
// can distinguish "no results yet" from "lookup couldn't run".
export async function fetchLatestResult(email) {
  const clean = (email || '').trim()
  if (!clean) return null
  // ilike (no wildcards) = exact match, case-insensitive, so 'You@Buffalo.edu'
  // finds a row stored as 'you@buffalo.edu'.
  const query =
    `?select=email,building,answers` +
    `&email=ilike.${encodeURIComponent(clean)}` +
    `&order=created_at.desc&limit=1`
  const res = await fetch(ENDPOINT + query, { headers: HEADERS })
  if (!res.ok) throw new Error(`Lookup failed (${res.status})`)
  const rows = await res.json()
  if (!Array.isArray(rows) || rows.length === 0) return null
  const row = rows[0]
  return {
    email: row.email || clean,
    building: row.building || '',
    answers: answersToMap(row.answers),
  }
}
