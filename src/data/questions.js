// First Move — item pool.
// Content tracks firstmove-Spec.md §4 (living doc — edit both together).
// Keys: PS = Problem Solver, GE = Group Energizer, AL = Active Listener, AO = Analytical Observer.
// Question order is fixed and deliberately sequenced so similar contexts and
// tensions (silence, conflict, plan-vs-engagement, distress) never sit adjacent.
// Contexts: iCP = individual CheckPoint, RCP = Roommate CheckPoint, CMU, hallway.
// Each item splits into `scene` (the setup, shown italic; \n forces a line break)
// and `prompt` (the ask, on its own line). Option order here is the authoring
// order; the app shuffles options per load.

export const questions = [
  {
    id: 1,
    scene: `A resident says, "My classes are way harder than I thought they'd be."`,
    prompt: `Your first instinct:`,
    options: [
      { text: `Ask what "harder" means for them: which class, what part`, key: `AO` },
      { text: `Tell them about resources: tutoring, the Success Center, office hours`, key: `PS` },
      { text: `Reflect it back: "sounds like this semester's hitting different than you expected"`, key: `AL` },
      { text: `Normalize it with energy: "honestly, everyone's saying this, you're so not alone"`, key: `GE` },
    ],
  },
  {
    id: 2,
    scene: `One resident is dominating your CMU discussion.\n...Again.`,
    prompt: `Your first instinct:`,
    options: [
      { text: `Redirect by name: "let's hear three voices we haven't heard yet"`, key: `PS` },
      { text: `Catch the eye of a quieter resident you know has a take, and invite them in warmly`, key: `GE` },
      { text: `Wait for the natural pause; interrupting the dominator can chill the whole room`, key: `AL` },
      { text: `Track who's checked out and how long this has run before choosing a move`, key: `AO` },
    ],
  },
  {
    id: 3,
    scene: `You're in an individual CheckPoint (iCP). The resident was opening up, but their answers are getting shorter and more closed off.`,
    prompt: `Your first instinct:`,
    options: [
      { text: `Let it get quiet and stay with them — don't rush to fill the space`, key: `AL` },
      { text: `Try a different, easier question — something concrete to get them talking again`, key: `PS` },
      { text: `Warm it back up with some lightness: "hey, no pressure, we've got time"`, key: `GE` },
      { text: `Replay what shifted — what you'd just asked when they started pulling back`, key: `AO` },
    ],
  },
  {
    id: 4,
    scene: `Your CMU discussion has drifted onto a tangent. It's off-topic, but the group is genuinely connecting.`,
    prompt: `Your first instinct:`,
    options: [
      { text: `Let it breathe; connection is community, and you can flex the plan`, key: `GE` },
      { text: `Bridge it back: find the thread that connects the tangent to the week's focus`, key: `PS` },
      { text: `Listen closely to the tangent itself; what a group drifts toward matters`, key: `AL` },
      { text: `Weigh time remaining against what's left in the plan before deciding`, key: `AO` },
    ],
  },
  {
    id: 5,
    scene: `You're in a Roommate CheckPoint. One roommate is fine with frequent guests — even overnight, no heads-up needed — and figures the other feels the same. The other isn't comfortable with it. Both are polite, but stuck.`,
    prompt: `Your first instinct:`,
    options: [
      { text: `Get specific with both: how often, how much notice, which nights — so the real gap is clear`, key: `AO` },
      { text: `Name what's underneath: one wants an open door, the other wants a heads-up — both are fair`, key: `AL` },
      { text: `Steer them toward one ground rule they can both live with, like a quick text before guests`, key: `PS` },
      { text: `Anchor on what they share: you both want the room to feel comfortable to come back to`, key: `GE` },
    ],
  },
  {
    id: 6,
    scene: `You're partway through an iCP when the resident starts venting — five straight minutes pour out. Then they stop.`,
    prompt: `Your first instinct:`,
    options: [
      { text: `Ask them what they want to happen next`, key: `PS` },
      { text: `Say what you heard back to them, feelings included`, key: `AL` },
      { text: `Gently ask about the one part that didn't quite fit`, key: `AO` },
      { text: `Reassure them first: "I'm really glad you came to me with this"`, key: `GE` },
    ],
  },
  {
    id: 7,
    scene: `You ask a debrief question at your CMU. Ten full seconds of silence.`,
    prompt: `Your first instinct:`,
    options: [
      { text: `Hold it; ten seconds feels like sixty, and someone is almost always formulating`, key: `AL` },
      { text: `Rephrase the question in simpler words`, key: `PS` },
      { text: `Answer it partially yourself with some energy to prime the pump`, key: `GE` },
      { text: `Consider whether the question came too early in the arc for them to answer yet`, key: `AO` },
    ],
  },
  {
    id: 8,
    scene: `You're in an iCP and the resident keeps insisting everything's "fine, good, no complaints" — but nothing about them reads fine.`,
    prompt: `Your first instinct:`,
    options: [
      { text: `Gently name the gap: "you're saying fine, but something feels off — tell me if I'm wrong"`, key: `AL` },
      { text: `Give them an easy on-ramp: "one thing, big or small, that's been rattling around lately?"`, key: `PS` },
      { text: `Warm it up so the wall comes down: "no agenda here, I actually just want to know how you are"`, key: `GE` },
      { text: `Read the tells — tone, eye contact, what they skip past — before you decide your move`, key: `AO` },
    ],
  },
  {
    id: 9,
    scene: `Your CMU activity is running long. The group is into it, but you have two steps left.`,
    prompt: `Your first instinct:`,
    options: [
      { text: `Cut it and move on; the arc matters and the Landing Point can't get squeezed`, key: `PS` },
      { text: `Ride the energy a bit longer; engagement like this is the whole point`, key: `GE` },
      { text: `Quickly calculate what to trim from the remaining steps to fit both in`, key: `AO` },
      { text: `Check the room: ask the group whether they want more time here`, key: `AL` },
    ],
  },
  {
    id: 10,
    scene: `You're in a Roommate CheckPoint and the two roommates start talking over each other.`,
    prompt: `Your first instinct:`,
    options: [
      { text: `Stop it and set structure: "one at a time, you first, then you"`, key: `PS` },
      { text: `Break the tension with a light comment, then restart the conversation`, key: `GE` },
      { text: `Let it run a few more seconds; what they interrupt each other about tells you a lot`, key: `AO` },
      { text: `Turn to the one who got cut off first: "finish your thought, I want to hear it"`, key: `AL` },
    ],
  },
  {
    id: 11,
    scene: `You're in an iCP and the resident is talking plenty — but none of it maps to the areas you're there to cover on your tracker.`,
    prompt: `Your first instinct:`,
    options: [
      { text: `Steer them back toward the areas you're there to check in on`, key: `PS` },
      { text: `Let them keep going; they're talking and connecting, and that's the real win`, key: `GE` },
      { text: `Follow what they actually want to talk about — that IS the check-in`, key: `AL` },
      { text: `Clock the mismatch first: are they steering around your areas, or do the areas just not fit them?`, key: `AO` },
    ],
  },
  {
    id: 12,
    scene: `A resident who never talks at CMUs finally speaks, and the thought comes out half-formed and confusing.`,
    prompt: `Your first instinct:`,
    options: [
      { text: `Nod and give them room to keep going, even if it stays messy`, key: `AL` },
      { text: `Enthusiastically grab onto any piece of it: "yes! okay, say more about that"`, key: `GE` },
      { text: `Restate it cleanly for the group: "so what you're saying is..."`, key: `PS` },
      { text: `Ask one small clarifying question to help them find the thread`, key: `AO` },
    ],
  },
  {
    id: 13,
    scene: `You're deep in an iCP. The resident has been thinking out loud for a while, then looks right at you and asks: "What should I do?"`,
    prompt: `Your first instinct:`,
    options: [
      { text: `Tell them what you'd do in their position; they asked, and you have a real answer`, key: `PS` },
      { text: `Turn it back: "what are the options as you see them?"`, key: `AO` },
      { text: `Slow it down: "before I answer, tell me more about what's pulling at you"`, key: `AL` },
      { text: `Boost them first: "honestly, the way you've handled this so far, you're closer than you think"`, key: `GE` },
    ],
  },
]
