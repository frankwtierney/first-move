# First Move — PRD


## Overview

A single-page self-assessment web app for University at Buffalo Community Assistants, used live during a training session. ~80 CAs per room take it simultaneously on their phones, get an instant result, then carry that result into a Mentimeter activity. Total time on app: under 3 minutes.

## Users & Context

- **Primary users:** ~240 CAs, on personal phones, on hall wifi or cellular, mid-training-session with a facilitator waiting on them.
- **Secondary users:** 6 facilitators who will project the QR/URL and need the app to just work.
- **Context constraints:** one shot, live, no tech support. If it breaks, the segment dies. Reliability and load speed beat every other consideration.

## Core Flow (4 screens)

1. **Intro screen.** Title, one-paragraph frame (verbatim from spec §3, rule 2: "there are no right answers... answering with what you'd actually do is the only way the result is useful to you"), a Start button. Nothing else.
2. **Question screens (×12).** One scenario per screen. Stem at top, four tappable answer cards, progress indicator (e.g., "4 of 12"). Tapping an answer auto-advances after a brief (~250ms) selected-state flash. A back button allows changing the previous answer. No skip.
3. **Results screen.** Primary tendency name large, secondary tendency smaller beneath it. Then the four content blocks for the primary tendency from spec §5: default move, what it gives you, what it costs you, CMU watch-out, CP watch-out. Ties render as a blend per spec §2 (e.g., "Solver-Observer") with one line: "Two instincts tied. As you read both, submit whichever felt truest."
4. **Next-step screen.** The closing instruction from spec §5: open Mentimeter, place yourself on the grid, and be ready to answer what you'll lean on and where your instinct needs a leash at your first CMU and CheckPoint. Include a Retake button.

## Content

- All 12 items, option keys (PS/GE/AL/AO), and all results copy come **verbatim** from `firstmove-Spec.md` §4 and §5. Do not paraphrase, improve, or reword any student-facing content.
- Store items in a single `questions.js` (or `.json`) data file: `{ id, stem, options: [{ text, key }] }`. Results copy in a parallel `results.js`. Content editable without touching component code.

## Scoring Logic

- Count answers per key across 12 items. Primary = highest count; secondary = second highest.
- **Tie for first:** render blend result showing both tendencies' full blocks, stacked, primary-tie framing per spec.
- **Tie for second:** show primary normally; pick the secondary that has more "acts quickly" adjacency to the primary? No. Keep it simple: if secondary ties, list both names in the secondary line ("Secondary: Energizer / Observer") and only render the primary's blocks.
- All scoring client-side. No network calls after initial page load. No analytics, no storage, no cookies, nothing leaves the device.

## Randomization

- Shuffle option order within each question on every app load (per user).
- Question order stays fixed (items were sequenced to rotate contexts).

## Branding (UB standards — strict on color)

- **UB Blue `#005bbb`** as the primary/action color. **Townsend Gray `#666666`** for secondary text. White background. No other brand colors, no tints, no gradients, no invented blues.
- Do not render, recreate, or approximate any UB logo or interlocking-UB mark anywhere in the app.
- Headers: Sofia Pro if available via the user's font files; otherwise use a clean geometric sans fallback stack (`"Sofia Pro", "Century Gothic", "Segoe UI", system-ui, sans-serif`) and flag the substitution in the README rather than silently shipping it. Body text: system font stack is fine for this artifact.
- Selected/interactive states must not rely on color alone: pair with a border weight change or check indicator.
- Footer line: "Campus Living & Residential Life, University at Buffalo"

## Technical Requirements

- **Stack:** React + Vite, deployed to Netlify as a static site. No backend, no database, no API keys, no external requests at runtime (fonts self-hosted or system).
- **Payload:** target under 200KB total transfer. 80 phones hitting hall wifi at the same moment is the real load test.
- **Responsive (mobile-first, industry standard):** Author base styles for a 360px floor (smallest common Android); design comfortably at 375–390px (modern iPhone). Layout is a fluid single column that fills the viewport with 16px side gutters, capped by a **~460px max-width container** so content reads as one tidy column on every device — full-bleed on phones, centered (never stretched) on tablet/desktop. Answer cards are full-width within that column. Touch targets ≥ **48px** (satisfies Apple HIG 44pt and Material 48dp). Verify layout at **360 / 390 / 768 / 1280px**.
- **Accessibility:** semantic buttons, visible focus states, WCAG AA contrast (UB Blue and Townsend Gray both pass on white for text), screen-reader-sane labels, no motion beyond the selection flash.
- **Resilience:** app fully functional offline after first load. Refresh mid-quiz may reset progress; that's acceptable at 2 minutes total, but state should survive rotation/lock-screen via component state or sessionStorage.
- **QR-ready:** short route (`/`), no query params needed. README includes a note to generate one QR per room pointing at the production URL.

## Explicitly Out of Scope

- Accounts, logins, saving results, exporting results, emailing results
- Facilitator dashboard or aggregate view (Mentimeter is the aggregate view)
- DiSC letters anywhere in the UI (the mapping stays out of student-facing content deliberately)
- Any evaluative framing (see spec §7)

## Acceptance Criteria

1. A first-time user on a phone completes intro → 12 items → results in under 3 minutes with no instructions beyond the intro screen.
2. Answer keys and copy match the spec file exactly (spot-check items 1, 7, 12 and all four results blocks).
3. Forcing a tie (e.g., 4/4/2/2 pattern) renders the blend state correctly.
4. Option order differs between two fresh loads.
5. Airplane mode after load: quiz still completes and scores.
6. Lighthouse mobile: performance ≥ 95, accessibility ≥ 95.
7. No network requests after initial load (verify in devtools).
8. Colors in the built CSS are exactly `#005bbb` and `#666666`, with no derived tints.



