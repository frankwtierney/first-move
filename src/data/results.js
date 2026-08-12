// First Move — results copy and framing text.
// Tracks firstmove-Spec.md (living doc — edit both together): §3 intro,
// §2 tie handling, §5 results + grid-explainer + final screen.
// Copy supports lightweight inline emphasis: *italic* and **bold** are rendered
// via <Rich> (src/lib/emphasis.jsx). `gives`/`costs` split into a one-word answer
// (`word`, rendered as a styled lead) and the `rest`. Keep every block tight.

export const results = {
  // Intro screen frame — spec §3, rule 2.
  intro: `There are no right answers here, and answering with what you'd actually do (not what you think you should do) is the only way the result is useful to you.`,

  // Grid-explainer screen — shown between the last question and the result.
  // Plain-language read of the two axes before the reveal. Keep it dead simple.
  gridExplainer: {
    eyebrow: `Before your result`,
    title: `How to read your grid`,
    axes: [
      { name: `Top to bottom — how fast you act`, desc: `Up top, people do something right away. Lower down, people hang back and take the situation in first.` },
      { name: `Left to right — what you go to first`, desc: `On the left, people go straight to the situation — what needs to happen. On the right, people go straight to the person in front of them.` },
    ],
    note: `Your answers place you in one of these four squares. The next screen shows which one — what that instinct does well, and where it can trip you up.`,
    cta: `Show me`,
  },

  // Labels for the five results blocks — spec §5.
  labels: {
    defaultMove: `In the moment:`,
    gives: `What it gives you:`,
    costs: `What it costs:`,
    cmuWatch: `At a CMU, watch for:`,
    cpWatch: `At a CheckPoint, watch for:`,
  },

  // Per-tendency result content — spec §5.
  // `short` is the blend name form used for ties (spec §2, e.g. "Solver-Observer").
  tendencies: {
    PS: {
      name: `Problem Solver`,
      short: `Solver`,
      defaultMove: `You go straight for the solution. When something's unresolved, you turn it into a clear next step, fast.`,
      gives: { word: `Momentum`, rest: `Groups don't stall on your watch, and residents leave a conversation knowing what to do next.` },
      costs: { word: `Ownership`, rest: `When *you* solve it, *they* didn't — and the lesson that sticks is the one a resident works out on their own, not the one you hand them. Moving fast can also come across as not really listening.` },
      cmuWatch: `cutting activities short and answering your own debrief questions. A debrief works when the *residents* reach the point themselves — that's where the learning happens. Answer it for them and you've taken away the thinking they came to do. Ask, then wait.`,
      cpWatch: `offering advice, referrals, or resources before the resident has finished sharing. Knowing the right service or person to point them to is essential — but *when* and *how* you offer it matters just as much. A referral isn't a box to check; it's a form of care that shows you understood their situation first.`,
    },
    GE: {
      name: `Group Energizer`,
      short: `Energizer`,
      defaultMove: `You go straight to the people. You lift the energy in a room and make it easy for residents to jump in.`,
      gives: { word: `Participation`, rest: `Quiet rooms open up around you, and residents warm to you quickly.` },
      costs: { word: `Depth`, rest: `Filling every silence and lightening every heavy moment keeps things on the surface — and the hard thing a resident *almost* said usually needed the room to stay quiet long enough for them to say it.` },
      cmuWatch: `riding a fun tangent past the Landing Point. The energy is the *warm-up*, not the goal — if the group never reaches the takeaway, they had a good time and can't name what they learned.`,
      cpWatch: `reassuring so fast that the hard thing never actually gets said. Sometimes the most helpful move is to let a silence sit instead of filling it.`,
    },
    AL: {
      name: `Active Listener`,
      short: `Listener`,
      defaultMove: `You slow down and give the resident room. You let silences sit, let people finish, and make it safe for them to keep talking.`,
      gives: { word: `Trust`, rest: `Residents tell you things they don't tell anyone else on the floor.` },
      costs: { word: `Movement`, rest: `Some moments need you to step in, and staying quiet and patient can slip into just watching a problem unfold. Understanding a situation isn't the same as helping it change.` },
      cmuWatch: `letting one loud voice run because cutting in feels rude. Protecting one person's comfort can cost the other ten their turn — guiding the room is part of caring for it.`,
      cpWatch: `staying in reassurance when the resident is ready to go a little deeper. Gently naming what you're noticing can open the conversation up, not shut it down.`,
    },
    AO: {
      name: `Analytical Observer`,
      short: `Observer`,
      defaultMove: `You take it in before you act. You watch, gather the details, and notice patterns other people miss.`,
      gives: { word: `Accuracy`, rest: `Your read on a group's mood or a roommate conflict is usually right.` },
      costs: { word: `Presence`, rest: `While you're still thinking, the room can feel like you've checked out — and a resident won't open up to someone who's gone quiet inside their own head. The moment to act can pass while you're still sizing it up.` },
      cmuWatch: `running the plan in your head instead of reading the people in front of you. The plan is a guide, not the goal — facilitate the room, not the outline.`,
      cpWatch: `asking so many questions it starts to feel like an interview instead of a conversation. A resident can tell the difference between being *understood* and being *studied*.`,
    },
  },

  // Tie handling.
  // First-place tie: render both tendencies' full blocks as a blend, with this line (PRD §Core Flow 3).
  // Blend name is the two `short` forms joined, e.g. "Solver-Observer" (spec §2).
  tieForFirst: {
    blendSeparator: `-`,
    line: `Two instincts tied. As you read both, submit whichever felt truest.`,
  },
  // Second-place tie: show primary normally; list both next-move names (PRD §Scoring Logic).
  tieForSecond: {
    nameSeparator: ` / `,
  },

  // Final screen after results — spec §5.
  nextStep: `Now open Mentimeter and place yourself on the grid. Then be ready to answer: at your first CMU and your first CheckPoint, what will you lean on, and where will your instinct need a leash?`,
}
