// First Move — results copy and framing text.
// All student-facing text is VERBATIM from firstmove-Spec.md (§3 rule 2 intro,
// §2 tie handling, §5 results + final screen). Do not reword, shorten, or add.

export const results = {
  // Intro screen frame — spec §3, rule 2 (verbatim).
  // NOTE: spec renders this mid-sentence lowercase ("there are no right answers...").
  // Left verbatim; see the fidelity note about sentence-case for screen display.
  intro: `there are no right answers here, and answering with what you'd actually do (not what you think you should do) is the only way the result is useful to you`,

  // Labels for the five results blocks — spec §5 (verbatim, bolded in source).
  labels: {
    defaultMove: `Your default move:`,
    gives: `What it gives you:`,
    costs: `What it costs you:`,
    cmuWatch: `At a CMU, watch for:`,
    cpWatch: `At a CheckPoint, watch for:`,
  },

  // Per-tendency result content — spec §5 (verbatim).
  // `short` is the blend name form used for ties (spec §2, e.g. "Solver-Observer").
  tendencies: {
    PS: {
      name: `Problem Solver`,
      short: `Solver`,
      defaultMove: `toward the fix. You compress ambiguity into action fast.`,
      gives: `momentum. Groups don't stall on your watch, and residents leave conversations with next steps.`,
      costs: `ownership. When you fix it, they didn't. Speed can read as not really listening.`,
      cmuWatch: `cutting activities short and answering your own debrief questions.`,
      cpWatch: `advice arriving before the resident finishes the story.`,
    },
    GE: {
      name: `Group Energizer`,
      short: `Energizer`,
      defaultMove: `toward the people. You raise the temperature of a room and lower the barrier to joining.`,
      gives: `participation. Quiet rooms open up around you, and residents feel liked, fast.`,
      costs: `depth. Filling every silence and lightening every heavy moment can keep things at the surface.`,
      cmuWatch: `riding fun tangents past the Landing Point.`,
      cpWatch: `reassuring so quickly that the hard thing never fully gets said.`,
    },
    AL: {
      name: `Active Listener`,
      short: `Listener`,
      defaultMove: `toward staying with it. You hold space, tolerate silence, and let people finish.`,
      gives: `trust. Residents tell you things they don't tell anyone else on the floor.`,
      costs: `motion. Some moments need an intervention, and holding space can become watching a problem happen.`,
      cmuWatch: `letting a dominant voice run because interrupting feels harsh.`,
      cpWatch: `validating in circles when the resident is ready to be asked a harder question.`,
    },
    AO: {
      name: `Analytical Observer`,
      short: `Observer`,
      defaultMove: `toward understanding first. You gather before you act and see patterns others miss.`,
      gives: `accuracy. Your reads on group dynamics and roommate conflicts are usually right.`,
      costs: `presence. While you're processing, the room may experience you as absent, and the moment to act can pass.`,
      cmuWatch: `managing the plan in your head instead of the people in front of you.`,
      cpWatch: `questions that feel like an investigation instead of a conversation.`,
    },
  },

  // Tie handling.
  // First-place tie: render both tendencies' full blocks as a blend, with this line (PRD §Core Flow 3).
  // Blend name is the two `short` forms joined, e.g. "Solver-Observer" (spec §2).
  tieForFirst: {
    blendSeparator: `-`,
    line: `Two instincts tied. As you read both, submit whichever felt truest.`,
  },
  // Second-place tie: show primary normally; list both secondary names (PRD §Scoring Logic).
  tieForSecond: {
    nameSeparator: ` / `,
  },

  // Final screen after results — spec §5 (verbatim).
  nextStep: `Now open Mentimeter and place yourself on the grid. Then be ready to answer: at your first CMU and your first CheckPoint, what will you lean on, and where will your instinct need a leash?`,
}
