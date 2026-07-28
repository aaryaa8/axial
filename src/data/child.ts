// The sample child and the two-graph mind-model that drives the demo.
// Nothing here is real student data. It is a crafted illustration for the demo.
//
// Graph A = what we teach (reading skills). Graph B = how this child learns
// (cognitive capacities). The edges between them are the product.

export type NodeState =
  | "dim" // not yet assessed / far ahead
  | "mastered" // teal, the child can do this
  | "stuck" // clay, where the child is blocked
  | "bottleneck" // amber glow, the upstream cause
  | "unlock"; // the skill that opens up once the bottleneck clears

export type Layer = "reading" | "cognitive";

export interface MapNode {
  id: string;
  label: string;
  sub?: string; // technical term, shown small + mono
  layer: Layer;
  x: number; // percent across the plot
  age?: string; // reading band only: the typical age this skill lands
}

export interface MapEdge {
  from: string;
  to: string;
}

// The two bands, as a percentage of plot height. Labels sit on the OUTER side
// of each band (reading above its dots, cognitive below), which keeps the
// middle corridor free for edges so no line ever crosses a word.
export const BAND_Y: Record<Layer, number> = { reading: 41, cognitive: 75 };

// Reading skills are ordered left to right by the age they typically arrive,
// following Chall's stages and Ehri's phases. That makes position meaningful:
// the map is a developmental timeline, not an arbitrary scatter.
export const NODES: MapNode[] = [
  // Graph A — the reading sequence (top band)
  { id: "letters", label: "Letter sounds", layer: "reading", x: 12, age: "4–5" },
  { id: "blending", label: "Blending", layer: "reading", x: 37, age: "5–6" },
  { id: "words", label: "Reading words", layer: "reading", x: 63, age: "6–7" },
  { id: "fluency", label: "Fluent reading", layer: "reading", x: 88, age: "7–9" },
  // Graph B — the capacities underneath (lower band), each under what it feeds
  { id: "hearing", label: "Hearing sounds", sub: "phonemic awareness", layer: "cognitive", x: 12 },
  { id: "holding", label: "Holding sounds in mind", sub: "phonological working memory", layer: "cognitive", x: 37 },
  { id: "attention", label: "Staying with it", sub: "sustained attention", layer: "cognitive", x: 66 },
];

// Where the demo child sits on that timeline. At six she is in the move from
// guessing at words to sounding them out fully, which is exactly the phase
// Ehri describes and exactly where blending decides everything downstream.
export const AGE_MARKER = { x: 50, label: "Maya · 6" };

export interface DemoStep {
  kicker: string;
  title: string;
  body: string;
  word?: string;
  transcript?: string; // what Maya says out loud
  correct?: boolean;
  audio?: string; // pre-recorded clip in public/audio, played when sound is on
  say?: string; // the script that clip was recorded from, kept for regeneration
  states: Record<string, NodeState>; // node id -> state (unlisted = dim)
  trail?: MapEdge[]; // edges to trace as the because-trail
  activity?: { before: string; after: string };
  parent?: boolean;
}

export const CHILD = { name: "Maya", age: 6 };

export const STEPS: DemoStep[] = [
  {
    kicker: "The child",
    title: "Maya is six years old and learning to read",
    body: "Press play to hear her read three short words aloud. Axial listens to how she works out each word.",
    states: {},
    audio: "s0-intro",
    say: "Let's read three words together. Take your time.",
  },
  {
    kicker: "Word 1 of 3",
    title: "“cat”",
    body: "Maya reads it cleanly, sound by sound. She knows her letter sounds. That part is solid.",
    word: "cat",
    transcript: "/k/ … /a/ … /t/ … cat!",
    say: "c... a... t. Cat!",
    correct: true,
    audio: "s1-cat",
    states: { letters: "mastered", hearing: "mastered" },
  },
  {
    kicker: "Word 2 of 3",
    title: "“sun”",
    body: "She says every sound right, then guesses the word from the first letter. The sounds are there. They slip away before she can join them.",
    word: "sun",
    transcript: "/s/ … /u/ … /n/ … um … “snake?”",
    say: "s... u... n... um... snake?",
    correct: false,
    audio: "s2-sun",
    states: { letters: "mastered", hearing: "mastered", blending: "stuck" },
  },
  {
    kicker: "Word 3 of 3",
    title: "“map”",
    body: "Every sound correct again, and then she asks for the first one back. That is the tell. The sounds arrive correctly and fall out of memory before she can join them.",
    word: "map",
    transcript: "/m/ … /a/ … /p/ … wait, what was the first one?",
    say: "m... a... p... wait, what was the first sound again?",
    correct: false,
    audio: "s3-map",
    states: { letters: "mastered", hearing: "mastered", blending: "stuck" },
  },
  {
    kicker: "What Axial notices",
    title: "The sounds are solid, and holding them together is what slips",
    body: "A drill-app would give Maya more letters. Axial reads the pattern the way a good tutor would: she knows the sounds, so the bottleneck is upstream, in how long she can hold them in mind while she blends. Every part of that reading comes from the rule set, applied to how she read.",
    states: { letters: "mastered", hearing: "mastered", blending: "stuck", holding: "bottleneck", words: "unlock" },
    trail: [
      { from: "holding", to: "blending" },
      { from: "blending", to: "words" },
    ],
  },
  {
    kicker: "How the tutor adapts",
    title: "The tutor changes what it teaches and how it teaches it",
    body: "Maya now practices joining just two sounds at a time, slower, with the sounds held on screen so it carries them with her. Clear the bottleneck and reading words opens up next.",
    states: { letters: "mastered", hearing: "mastered", blending: "stuck", holding: "bottleneck", words: "unlock" },
    activity: {
      before: "Sound out the whole word:  s · u · n",
      after: "Join two sounds:  s + un  →  “sun”",
    },
    audio: "s5-adapt",
    say: "This time, just two pieces. Ss... un. Sun!",
  },
  {
    kicker: "What the parent sees",
    title: "The parent gets the same finding in plain words",
    body: "Maya knows her letters. Her next unlock is holding sounds together long enough to blend them, so this week she is playing two-sound games. You should hear her read her first full words soon.",
    states: { letters: "mastered", hearing: "mastered", blending: "stuck", holding: "bottleneck", words: "unlock" },
    parent: true,
  },
];
