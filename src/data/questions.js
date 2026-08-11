// First Move — item pool.
// Content is VERBATIM from firstmove-Spec.md §4. Do not reword, shorten, or add.
// Keys: PS = Problem Solver, GE = Group Energizer, AL = Active Listener, AO = Analytical Observer.
// Question order is fixed (items sequenced to rotate contexts).
// Option order here is the spec's authoring order; the app shuffles options per load.

export const questions = [
  {
    id: 1,
    stem: `You're in a 1-on-1 CheckPoint. Mid-sentence, the resident trails off and goes quiet. Your first instinct:`,
    options: [
      { text: `Let the silence sit and stay with them until they pick it back up`, key: `AL` },
      { text: `Gently offer a guess at where the sentence was going so they can keep moving`, key: `PS` },
      { text: `Warm the moment back up: "hey, no pressure, we've got time" with a smile`, key: `GE` },
      { text: `Mentally replay what they said right before, looking for what stopped them`, key: `AO` },
    ],
  },
  {
    id: 2,
    stem: `Your CMU icebreaker just landed flat. The room is silent. Your first instinct:`,
    options: [
      { text: `Jump in with your own answer, big and a little self-deprecating, to lower the bar`, key: `GE` },
      { text: `Rework the prompt on the fly into something easier to answer`, key: `PS` },
      { text: `Give the room a beat; someone usually goes first if you can stand the pause`, key: `AL` },
      { text: `Scan faces to figure out whether the problem is the prompt, the hour, or the group`, key: `AO` },
    ],
  },
  {
    id: 3,
    stem: `During a Roommate CheckPoint, the two roommates start talking over each other. Your first instinct:`,
    options: [
      { text: `Stop it and set structure: "one at a time, you first, then you"`, key: `PS` },
      { text: `Break the tension with a light comment, then restart the conversation`, key: `GE` },
      { text: `Let it run a few more seconds; what they interrupt each other about tells you a lot`, key: `AO` },
      { text: `Turn to the one who got cut off first: "finish your thought, I want to hear it"`, key: `AL` },
    ],
  },
  {
    id: 4,
    stem: `A resident says, "My classes are way harder than I thought they'd be." Your first instinct:`,
    options: [
      { text: `Ask what "harder" means for them: which class, what part`, key: `AO` },
      { text: `Tell them about resources: tutoring, the Success Center, office hours`, key: `PS` },
      { text: `Reflect it back: "sounds like this semester's hitting different than you expected"`, key: `AL` },
      { text: `Normalize it with energy: "honestly, everyone's saying this, you're so not alone"`, key: `GE` },
    ],
  },
  {
    id: 5,
    stem: `Your CMU activity is running long. The group is into it, but you have two steps left. Your first instinct:`,
    options: [
      { text: `Cut it and move on; the arc matters and the Landing Point can't get squeezed`, key: `PS` },
      { text: `Ride the energy a bit longer; engagement like this is the whole point`, key: `GE` },
      { text: `Quickly calculate what to trim from the remaining steps to fit both in`, key: `AO` },
      { text: `Check the room: ask the group whether they want more time here`, key: `AL` },
    ],
  },
  {
    id: 6,
    stem: `A resident who never talks at CMUs finally speaks, and the thought comes out half-formed and confusing. Your first instinct:`,
    options: [
      { text: `Nod and give them room to keep going, even if it stays messy`, key: `AL` },
      { text: `Enthusiastically grab onto any piece of it: "yes! okay, say more about that"`, key: `GE` },
      { text: `Restate it cleanly for the group: "so what you're saying is..."`, key: `PS` },
      { text: `Ask one small clarifying question to help them find the thread`, key: `AO` },
    ],
  },
  {
    id: 7,
    stem: `One resident is dominating your CMU discussion. Again. Your first instinct:`,
    options: [
      { text: `Redirect by name: "let's hear three voices we haven't heard yet"`, key: `PS` },
      { text: `Catch the eye of a quieter resident you know has a take, and invite them in warmly`, key: `GE` },
      { text: `Wait for the natural pause; interrupting the dominator can chill the whole room`, key: `AL` },
      { text: `Track who's checked out and how long this has run before choosing a move`, key: `AO` },
    ],
  },
  {
    id: 8,
    stem: `A resident knocks on your door upset and vents for five straight minutes. When they stop, your first instinct:`,
    options: [
      { text: `Ask them what they want to happen next`, key: `PS` },
      { text: `Say what you heard back to them, feelings included`, key: `AL` },
      { text: `Ask a question about the one detail that didn't add up`, key: `AO` },
      { text: `Reassure them first: "I'm really glad you came to me with this"`, key: `GE` },
    ],
  },
  {
    id: 9,
    stem: `Your CMU discussion has drifted onto a tangent. It's off-topic, but the group is genuinely connecting. Your first instinct:`,
    options: [
      { text: `Let it breathe; connection is community, and you can flex the plan`, key: `GE` },
      { text: `Bridge it back: find the thread that connects the tangent to the week's focus`, key: `PS` },
      { text: `Listen closely to the tangent itself; what a group drifts toward matters`, key: `AL` },
      { text: `Weigh time remaining against what's left in the plan before deciding`, key: `AO` },
    ],
  },
  {
    id: 10,
    stem: `You ask a debrief question at your CMU. Ten full seconds of silence. Your first instinct:`,
    options: [
      { text: `Hold it; ten seconds feels like sixty, and someone is almost always formulating`, key: `AL` },
      { text: `Rephrase the question in simpler words`, key: `PS` },
      { text: `Answer it partially yourself with some energy to prime the pump`, key: `GE` },
      { text: `Consider whether the question came too early in the arc for them to answer yet`, key: `AO` },
    ],
  },
  {
    id: 11,
    stem: `In a Roommate CheckPoint, each roommate gives you a completely different version of the same conflict. Your first instinct:`,
    options: [
      { text: `Ask each of them questions until the timeline actually lines up`, key: `AO` },
      { text: `Name it out loud: "you two are describing different rooms right now," and sit with what that means`, key: `AL` },
      { text: `Skip the past: "let's not litigate history, let's agree on what happens from today"`, key: `PS` },
      { text: `Find the overlap and build on it: "you both said you want the room to feel less tense"`, key: `GE` },
    ],
  },
  {
    id: 12,
    stem: `A resident looks at you and asks directly: "What should I do?" Your first instinct:`,
    options: [
      { text: `Tell them what you'd do in their position; they asked, and you have a real answer`, key: `PS` },
      { text: `Turn it back: "what are the options as you see them?"`, key: `AO` },
      { text: `Slow it down: "before I answer, tell me more about what's pulling at you"`, key: `AL` },
      { text: `Boost them first: "honestly, the way you've handled this so far, you're closer than you think"`, key: `GE` },
    ],
  },
]
