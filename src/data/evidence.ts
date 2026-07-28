// The scientific evidence base for the reading dependencies shown in the demo.
//
// These dependencies come from the published science of reading, which is
// public research, not Axial's proprietary taxonomy. Every edge in the demo
// map traces to a real, citable finding below. This is the grounded core: the
// claim that reading skills depend on each other in a specific, evidence-backed
// order, and that some of those dependencies are cognitive capacities sitting
// underneath the reading skills themselves.

export type EdgeType = "prerequisite" | "capacity" | "enabling" | "automatizing";

export interface EdgeTypeStyle {
  label: string;
  gloss: string;
  dash: string; // SVG stroke-dasharray in map units
}

// Distinct line styles per dependency type, echoing Axial's typed-edge map.
export const EDGE_TYPES: Record<EdgeType, EdgeTypeStyle> = {
  prerequisite: { label: "Prerequisite", gloss: "must come first", dash: "" },
  capacity: { label: "Capacity", gloss: "carries the load", dash: "2 1.3" },
  enabling: { label: "Foundation", gloss: "underpins", dash: "0.5 1.5" },
  automatizing: { label: "Automatizes", gloss: "turns effort to ease", dash: "2.6 1 0.5 1" },
};

export interface Citation {
  id: string;
  short: string;
  ref: string;
  finding: string;
}

export const CITATIONS: Citation[] = [
  {
    id: "wt87",
    short: "Wagner & Torgesen, 1987",
    ref: "Wagner, R. K., & Torgesen, J. K. (1987). The nature of phonological processing and its causal role in the acquisition of reading skills. Psychological Bulletin, 101(2), 192–212.",
    finding:
      "Holding sounds in phonological working memory plays a causal role in learning to read, alongside phonemic awareness.",
  },
  {
    id: "mlh12",
    short: "Melby-Lervåg et al., 2012",
    ref: "Melby-Lervåg, M., Lyster, S.-A. H., & Hulme, C. (2012). Phonological skills and their role in learning to read: A meta-analytic review. Psychological Bulletin, 138(2), 322–352.",
    finding:
      "Across studies, individual differences in word decoding are primarily linked to awareness of sounds at the phoneme level.",
  },
  {
    id: "ehri05",
    short: "Ehri, 2005",
    ref: "Ehri, L. C. (2005). Development of sight word reading: Phases and findings. In The Science of Reading: A Handbook (pp. 135–154). Blackwell.",
    finding:
      "Children in the partial-alphabetic phase use a few letters to guess at words and confuse similarly spelled ones, exactly the pattern the demo shows.",
  },
  {
    id: "nrp00",
    short: "National Reading Panel, 2000",
    ref: "National Reading Panel (2000). Teaching children to read. National Institute of Child Health and Human Development.",
    finding:
      "Reading rests on five components in sequence: phonemic awareness, phonics, fluency, vocabulary, and comprehension.",
  },
  {
    id: "svr86",
    short: "Gough & Tunmer, 1986",
    ref: "Gough, P. B., & Tunmer, W. E. (1986). Decoding, reading, and reading disability. Remedial and Special Education, 7(1), 6–10.",
    finding:
      "Reading comprehension is the product of decoding and language comprehension. Weak decoding caps everything downstream.",
  },
  {
    id: "ls74",
    short: "LaBerge & Samuels, 1974",
    ref: "LaBerge, D., & Samuels, S. J. (1974). Toward a theory of automatic information processing in reading. Cognitive Psychology, 6(2), 293–323.",
    finding:
      "Fluency emerges when word reading becomes automatic and stops consuming attention.",
  },
  {
    id: "ef19",
    short: "Blankenship et al., 2019",
    ref: "Blankenship, T. L., et al. (2019). Attention and executive functioning in infancy: Links to childhood executive function and reading achievement. Developmental Science, 22(6), e12824.",
    finding:
      "Early attention and executive function predict later reading achievement.",
  },
  {
    id: "rope01",
    short: "Scarborough, 2001",
    ref: "Scarborough, H. S. (2001). Connecting early language and literacy to later reading (dis)abilities. In Handbook for Research in Early Literacy (pp. 97–110). Guilford Press.",
    finding:
      "Skilled reading is many strands woven together. When one strand is weak, the whole rope is compromised.",
  },
];

export interface Dependency {
  from: string;
  to: string;
  type: EdgeType;
  strength: "strong" | "moderate";
  claim: string;
  cites: string[];
}

// Each edge in the demo map, typed and cited.
export const DEPENDENCIES: Dependency[] = [
  {
    from: "hearing",
    to: "letters",
    type: "enabling",
    strength: "strong",
    claim: "Hearing the separate sounds in a word underpins learning which sounds the letters make.",
    cites: ["mlh12", "nrp00"],
  },
  {
    from: "letters",
    to: "blending",
    type: "prerequisite",
    strength: "strong",
    claim: "A child has to know the letter sounds before blending them into a word.",
    cites: ["nrp00", "ehri05"],
  },
  {
    from: "holding",
    to: "blending",
    type: "capacity",
    strength: "strong",
    claim: "Blending means holding each sound in mind long enough to join them. That is phonological working memory.",
    cites: ["wt87"],
  },
  {
    from: "attention",
    to: "blending",
    type: "capacity",
    strength: "moderate",
    claim: "Sustained attention keeps the sounds active through the effort of blending.",
    cites: ["ef19"],
  },
  {
    from: "blending",
    to: "words",
    type: "prerequisite",
    strength: "strong",
    claim: "Reliable blending is the gate to reading whole words instead of guessing them.",
    cites: ["ehri05", "svr86"],
  },
  {
    from: "words",
    to: "fluency",
    type: "automatizing",
    strength: "strong",
    claim: "As word reading becomes automatic, fluent reading follows.",
    cites: ["ls74", "nrp00"],
  },
];

export function citationById(id: string): Citation | undefined {
  return CITATIONS.find((c) => c.id === id);
}

// Short citation labels for the edges in a because-trail (deduped, in order).
export function citesForTrail(trail: { from: string; to: string }[]): string[] {
  const ids: string[] = [];
  for (const t of trail) {
    const dep = DEPENDENCIES.find((d) => d.from === t.from && d.to === t.to);
    if (dep) for (const c of dep.cites) if (!ids.includes(c)) ids.push(c);
  }
  return ids.map((id) => citationById(id)?.short ?? id);
}
