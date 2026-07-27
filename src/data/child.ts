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
  x: number; // in a 0..100 x, 0..66 y viewBox
  y: number;
}

export interface MapEdge {
  from: string;
  to: string;
}

export const NODES: MapNode[] = [
  // Graph A — reading skills (top band)
  { id: "letters", label: "Letter sounds", layer: "reading", x: 17, y: 17 },
  { id: "blending", label: "Blending", layer: "reading", x: 41, y: 14 },
  { id: "words", label: "Reading words", layer: "reading", x: 66, y: 18 },
  { id: "fluency", label: "Fluent reading", layer: "reading", x: 87, y: 25 },
  // Graph B — cognitive capacities (lower band)
  { id: "hearing", label: "Hearing sounds", sub: "phonemic awareness", layer: "cognitive", x: 21, y: 49 },
  { id: "holding", label: "Holding sounds in mind", sub: "phonological working memory", layer: "cognitive", x: 46, y: 52 },
  { id: "attention", label: "Staying with it", sub: "sustained attention", layer: "cognitive", x: 71, y: 47 },
];

export const EDGES: MapEdge[] = [
  { from: "hearing", to: "letters" },
  { from: "holding", to: "blending" }, // the key cross-graph edge
  { from: "attention", to: "blending" },
  { from: "letters", to: "blending" },
  { from: "blending", to: "words" },
  { from: "words", to: "fluency" },
];

export interface DemoStep {
  kicker: string;
  title: string;
  body: string;
  word?: string;
  transcript?: string; // what Maya says out loud
  correct?: boolean;
  speak?: string; // spoken aloud via the browser if sound is on
  states: Record<string, NodeState>; // node id -> state (unlisted = dim)
  trail?: MapEdge[]; // edges to trace as the because-trail
  activity?: { before: string; after: string };
  parent?: boolean;
}

export const CHILD = { name: "Maya", age: 6 };

export const STEPS: DemoStep[] = [
  {
    kicker: "The child",
    title: "Meet Maya. She is six, and she is learning to read.",
    body: "Press play to hear her read three short words aloud. Axial listens to how she works out each word.",
    states: {},
    speak: "Let's read three words.",
  },
  {
    kicker: "Word 1 of 3",
    title: "“cat”",
    body: "Maya reads it cleanly, sound by sound. She knows her letter sounds. That part is solid.",
    word: "cat",
    transcript: "/k/ … /a/ … /t/ … cat!",
    correct: true,
    speak: "cat",
    states: { letters: "mastered", hearing: "mastered" },
  },
  {
    kicker: "Word 2 of 3",
    title: "“sun”",
    body: "She says every sound right, then guesses the word from the first letter. The sounds are there. They slip away before she can join them.",
    word: "sun",
    transcript: "/s/ … /u/ … um … snake?",
    correct: false,
    speak: "sss, uh, snake?",
    states: { letters: "mastered", hearing: "mastered", blending: "stuck" },
  },
  {
    kicker: "Word 3 of 3",
    title: "“map”",
    body: "The same pattern. Clear sounds, then they scatter before the word comes together. Two data points now say the same thing.",
    word: "map",
    transcript: "/m/ … /a/ … it's gone.",
    correct: false,
    speak: "mmm, ah…",
    states: { letters: "mastered", hearing: "mastered", blending: "stuck" },
  },
  {
    kicker: "What Axial notices",
    title: "The letters are solid. What slips is holding the sounds together.",
    body: "A drill-app would give Maya more letters. Axial reads the pattern the way a good tutor would: she knows the sounds, so the bottleneck is upstream, in how long she can hold them in mind while she blends. No language model decided this. It is read from how she read.",
    states: { letters: "mastered", hearing: "mastered", blending: "stuck", holding: "bottleneck", words: "unlock" },
    trail: [
      { from: "holding", to: "blending" },
      { from: "blending", to: "words" },
    ],
  },
  {
    kicker: "How the tutor adapts",
    title: "So it changes what it teaches, and how.",
    body: "Instead of sounding out whole words, Maya practices joining just two sounds at a time, slower, with the sounds held on screen so she does not have to carry them alone. Clear the bottleneck and reading words opens up next.",
    states: { letters: "mastered", hearing: "mastered", blending: "stuck", holding: "bottleneck", words: "unlock" },
    activity: {
      before: "Sound out the whole word:  s · u · n",
      after: "Join two sounds:  s + un  →  “sun”",
    },
    speak: "Let's join two sounds. Ssss — un. Sun.",
  },
  {
    kicker: "What the parent sees",
    title: "And it tells you, in plain words, what is happening.",
    body: "Maya knows her letters. Her next unlock is holding sounds together long enough to blend them, so this week she is playing two-sound games instead of drilling letters she already knows. You should hear her read her first full words soon.",
    states: { letters: "mastered", hearing: "mastered", blending: "stuck", holding: "bottleneck", words: "unlock" },
    parent: true,
  },
];
