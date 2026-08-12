# First Move

Single-page self-assessment web app for University at Buffalo Community Assistants,
taken live during training (~80 CAs per room, on phones, under 3 minutes). Surfaces
each CA's facilitation instinct — their default first move — and previews it on the
2×2 grid they'll stand on in Mentimeter next.

React + Vite, static build, no backend. Nothing a user enters leaves their device.

## Contents

- [`PRD.md`](./PRD.md) — product requirements: screens, flow, scoring, branding, acceptance criteria.
- [`firstmove-Spec.md`](./firstmove-Spec.md) — content companion: the 13 items, PS/GE/AL/AO answer keys, and the results copy. Spec and app are a **living doc** — keep §4/§5 and the data files in sync.

## Project layout

```
src/
  data/questions.js   13 items + answer keys (scene/prompt/options; edit copy here)
  data/results.js     results copy, intro frame, tie framing, next-step (verbatim)
  lib/scoring.js      key counts + tie logic (pure; single / blend / second-tie)
  lib/shuffle.js      per-load option shuffle
  screens/            Intro · Question · Results · NextStep
  components/         QuadrantGrid (the signature 2×2)
  dev/TieSimulator    dev-only; stripped from production builds
```

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
```

In dev, a small **DEV** bar (bottom-left) jumps straight to any result state —
single, first-place tie (blend), 3-way tie, second-place tie — for fast testing.
It does not exist in production builds.

## Build

```bash
npm run build      # -> dist/  (~54 KB gzipped total, well under the 200 KB budget)
npm run preview    # serve the production build locally
```

## Deploy (Netlify)

`netlify.toml` is committed, so both paths below work with no extra config.

**Option A — drag & drop:** run `npm run build`, then drag the `dist/` folder onto
<https://app.netlify.com/drop>. Instant URL.

**Option B — Git (auto-deploy on push):** in Netlify → *Add new site → Import from Git*,
pick this repo. Netlify reads `netlify.toml` (build `npm run build`, publish `dist`).
Every push to `main` redeploys.

After deploy, set a memorable site name in *Site configuration → Change site name*
so the room URL is short (e.g. `first-move-ub.netlify.app`).

## QR codes for the room

One QR per room, all pointing at the production URL (the app needs no query params —
the route is just `/`). Generate with any offline-safe tool, e.g.
[qr-code-generator.com](https://www.qr-code-generator.com/) or, locally:

```bash
npx qrcode "https://YOUR-SITE.netlify.app" -o room-qr.png
```

Print large; test one scan on hall wifi before the session.

## Fonts

Headers use the stack `"Sofia Pro", "Century Gothic", "Segoe UI", system-ui, sans-serif`.
**Sofia Pro is not bundled** — it renders only if self-hosted later. Until then the app
falls back to Century Gothic / Segoe UI / the system geometric sans, by design (no
external font requests at runtime). Body text uses the system font stack.

## Privacy & resilience

No backend, no analytics, no cookies, no external runtime requests. In-progress state
lives only in `sessionStorage` (survives rotation / lock / reload within the tab) and
is cleared on retake. Fully functional offline after first load.
