// Participant-level result collection. When someone reveals their result we
// record one row: email, building, the result (both coded and human-readable),
// the per-style counts, and the full per-question answer trail. Residential
// Life reads these from the Supabase dashboard to follow up.
//
// Storage is the dedicated "FirstMove" Supabase project. The table is
// insert-only from the browser via the anon key (row-level security blocks all
// reads/updates/deletes from the client), so this key is safe to ship publicly:
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
