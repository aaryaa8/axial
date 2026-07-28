// Public data for the Axial map.
//
// Carries the structure of the model: skill names, their domain, and the typed
// dependencies between them. The skill DEFINITIONS and the research citations
// behind each dependency are the proprietary part and are never sent to the
// browser, which is what keeps the explanation genuinely behind the waitlist.

export type DomainID = "D1" | "D2" | "D3" | "D4" | "D5" | "D6";
export type LinkType = "amplifying" | "prerequisite" | "bottleneck" | "compensatory" | "load_dependent";
export type Strength = "strong" | "moderate" | "weak";

export const DOMAINS: Record<DomainID, { label: string; short: string; angle: number }> = {
  D1: { label: "REASONING & PROBLEM SOLVING", short: "Reasoning", angle: -90 },
  D2: { label: "MEMORY & LEARNING", short: "Memory", angle: -30 },
  D3: { label: "COGNITIVE CONTROL", short: "Cognitive Control", angle: 30 },
  D4: { label: "METACOGNITION & SELF-REG.", short: "Metacognition", angle: 90 },
  D5: { label: "EMOTIONAL COGNITION", short: "Emotional", angle: 150 },
  D6: { label: "SOCIAL COGNITION", short: "Social", angle: -150 },
};

// Line style per dependency type, matching the Axial map exactly.
export const LINE_DASH: Record<LinkType, string> = {
  amplifying: "none",
  prerequisite: "7,3",
  bottleneck: "3,3",
  compensatory: "6,2,1,2",
  load_dependent: "1.5,3.5",
};

export const STRENGTH_STYLE: Record<Strength, { width: number; color: string }> = {
  strong: { width: 1.125, color: "#555555" },
  moderate: { width: 0.675, color: "#999999" },
  weak: { width: 0.3375, color: "#cccccc" },
};

export const DIMMED_COLORS: Record<Strength, string> = {
  strong: "#e0ddd8",
  moderate: "#e8e5e0",
  weak: "#eeeee6",
};

// Plain language gloss for the legend, so a visitor can read the map.
export const TYPE_GLOSS: Record<LinkType, string> = {
  amplifying: "one skill strengthens another",
  prerequisite: "must come first",
  bottleneck: "a weakness here caps the other",
  compensatory: "one can stand in for the other",
  load_dependent: "holds up only while load stays low",
};

export const NODE_RADIUS = 3.5;

export interface Skill { id: string; domain: DomainID; name: string; }
export const SKILLS: Skill[] = [
  { id: "S01", domain: "D1", name: "Fluid Reasoning" },
  { id: "S02", domain: "D1", name: "Verbal Reasoning" },
  { id: "S03", domain: "D1", name: "Numerical Reasoning" },
  { id: "S04", domain: "D1", name: "Visual-Spatial Processing" },
  { id: "S05", domain: "D1", name: "Auditory Processing" },
  { id: "S06", domain: "D1", name: "Pattern Recognition" },
  { id: "S07", domain: "D1", name: "Problem Solving" },
  { id: "S08", domain: "D2", name: "Working Memory" },
  { id: "S09", domain: "D2", name: "Long-Term Memory & Retrieval" },
  { id: "S10", domain: "D2", name: "Interference Susceptibility" },
  { id: "S29", domain: "D2", name: "Prospective Memory" },
  { id: "S11", domain: "D3", name: "Sustained Attention" },
  { id: "S12", domain: "D3", name: "Inhibitory Control" },
  { id: "S13", domain: "D3", name: "Cognitive Flexibility" },
  { id: "S14", domain: "D3", name: "Processing Speed" },
  { id: "S31", domain: "D3", name: "Mind Wandering Propensity" },
  { id: "S15", domain: "D4", name: "Metacognitive Monitoring" },
  { id: "S16", domain: "D4", name: "Accurate Self-Assessment" },
  { id: "S17", domain: "D4", name: "Goal Setting & Planning" },
  { id: "S18", domain: "D4", name: "Time Management" },
  { id: "S19", domain: "D4", name: "Adaptability" },
  { id: "S30", domain: "D4", name: "Epistemic Curiosity" },
  { id: "S20", domain: "D5", name: "Emotional Self-Awareness" },
  { id: "S21", domain: "D5", name: "Emotional Regulation" },
  { id: "S22", domain: "D5", name: "Stress Tolerance" },
  { id: "S23", domain: "D5", name: "Achievement Drive" },
  { id: "S24", domain: "D5", name: "Grit & Perseverance" },
  { id: "S25", domain: "D6", name: "Empathy & Perspective-Taking" },
  { id: "S26", domain: "D6", name: "Communication" },
  { id: "S27", domain: "D6", name: "Collaboration" },
  { id: "S28", domain: "D6", name: "Help-Seeking" },
];

export interface Link { source: string; target: string; type: LinkType; strength: Strength; }
export const LINKS: Link[] = [
  { source: "S01", target: "S06", type: "amplifying", strength: "moderate" },
  { source: "S01", target: "S07", type: "prerequisite", strength: "strong" },
  { source: "S02", target: "S05", type: "amplifying", strength: "moderate" },
  { source: "S02", target: "S09", type: "amplifying", strength: "strong" },
  { source: "S03", target: "S04", type: "amplifying", strength: "moderate" },
  { source: "S04", target: "S06", type: "amplifying", strength: "moderate" },
  { source: "S05", target: "S09", type: "amplifying", strength: "moderate" },
  { source: "S06", target: "S09", type: "amplifying", strength: "strong" },
  { source: "S07", target: "S13", type: "amplifying", strength: "strong" },
  { source: "S07", target: "S15", type: "amplifying", strength: "moderate" },
  { source: "S08", target: "S01", type: "bottleneck", strength: "strong" },
  { source: "S08", target: "S02", type: "bottleneck", strength: "strong" },
  { source: "S08", target: "S03", type: "bottleneck", strength: "strong" },
  { source: "S08", target: "S07", type: "bottleneck", strength: "strong" },
  { source: "S08", target: "S09", type: "amplifying", strength: "strong" },
  { source: "S08", target: "S29", type: "prerequisite", strength: "strong" },
  { source: "S10", target: "S09", type: "bottleneck", strength: "strong" },
  { source: "S09", target: "S29", type: "amplifying", strength: "moderate" },
  { source: "S12", target: "S10", type: "compensatory", strength: "moderate" },
  { source: "S11", target: "S09", type: "load_dependent", strength: "strong" },
  { source: "S11", target: "S12", type: "amplifying", strength: "moderate" },
  { source: "S11", target: "S15", type: "amplifying", strength: "strong" },
  { source: "S12", target: "S07", type: "prerequisite", strength: "moderate" },
  { source: "S12", target: "S13", type: "prerequisite", strength: "strong" },
  { source: "S12", target: "S15", type: "amplifying", strength: "moderate" },
  { source: "S12", target: "S31", type: "compensatory", strength: "moderate" },
  { source: "S13", target: "S19", type: "amplifying", strength: "strong" },
  { source: "S14", target: "S01", type: "bottleneck", strength: "moderate" },
  { source: "S14", target: "S03", type: "bottleneck", strength: "moderate" },
  { source: "S14", target: "S08", type: "bottleneck", strength: "strong" },
  { source: "S15", target: "S09", type: "amplifying", strength: "strong" },
  { source: "S15", target: "S14", type: "compensatory", strength: "moderate" },
  { source: "S15", target: "S16", type: "prerequisite", strength: "strong" },
  { source: "S15", target: "S19", type: "amplifying", strength: "strong" },
  { source: "S15", target: "S30", type: "amplifying", strength: "strong" },
  { source: "S16", target: "S17", type: "prerequisite", strength: "strong" },
  { source: "S16", target: "S28", type: "prerequisite", strength: "strong" },
  { source: "S17", target: "S18", type: "amplifying", strength: "strong" },
  { source: "S17", target: "S29", type: "amplifying", strength: "strong" },
  { source: "S18", target: "S31", type: "compensatory", strength: "moderate" },
  { source: "S19", target: "S24", type: "amplifying", strength: "moderate" },
  { source: "S20", target: "S21", type: "prerequisite", strength: "strong" },
  { source: "S20", target: "S25", type: "amplifying", strength: "moderate" },
  { source: "S21", target: "S08", type: "load_dependent", strength: "strong" },
  { source: "S21", target: "S01", type: "load_dependent", strength: "moderate" },
  { source: "S21", target: "S17", type: "amplifying", strength: "moderate" },
  { source: "S22", target: "S08", type: "load_dependent", strength: "strong" },
  { source: "S22", target: "S15", type: "load_dependent", strength: "moderate" },
  { source: "S22", target: "S21", type: "amplifying", strength: "strong" },
  { source: "S22", target: "S29", type: "load_dependent", strength: "moderate" },
  { source: "S23", target: "S24", type: "amplifying", strength: "strong" },
  { source: "S23", target: "S30", type: "amplifying", strength: "moderate" },
  { source: "S25", target: "S26", type: "amplifying", strength: "strong" },
  { source: "S25", target: "S27", type: "prerequisite", strength: "moderate" },
  { source: "S26", target: "S09", type: "amplifying", strength: "strong" },
  { source: "S26", target: "S27", type: "amplifying", strength: "strong" },
  { source: "S26", target: "S28", type: "amplifying", strength: "moderate" },
  { source: "S27", target: "S09", type: "amplifying", strength: "moderate" },
  { source: "S27", target: "S22", type: "amplifying", strength: "moderate" },
  { source: "S28", target: "S15", type: "amplifying", strength: "moderate" },
  { source: "S30", target: "S09", type: "amplifying", strength: "strong" },
  { source: "S30", target: "S31", type: "compensatory", strength: "moderate" },
  { source: "S31", target: "S09", type: "load_dependent", strength: "strong" },
  { source: "S31", target: "S11", type: "load_dependent", strength: "strong" },
  { source: "S31", target: "S15", type: "load_dependent", strength: "moderate" },
  { source: "S08", target: "S11", type: "amplifying", strength: "moderate" },
  { source: "S13", target: "S15", type: "amplifying", strength: "moderate" },
  { source: "S22", target: "S01", type: "load_dependent", strength: "moderate" },
  { source: "S10", target: "S13", type: "compensatory", strength: "weak" },
  { source: "S17", target: "S15", type: "amplifying", strength: "moderate" },
  { source: "S18", target: "S29", type: "amplifying", strength: "strong" },
  { source: "S23", target: "S17", type: "amplifying", strength: "moderate" },
  { source: "S24", target: "S22", type: "amplifying", strength: "moderate" },
  { source: "S30", target: "S17", type: "amplifying", strength: "moderate" },
  { source: "S25", target: "S28", type: "amplifying", strength: "moderate" },
  { source: "S19", target: "S30", type: "amplifying", strength: "moderate" },
  { source: "S24", target: "S09", type: "amplifying", strength: "moderate" },
  { source: "S28", target: "S09", type: "amplifying", strength: "moderate" },
  { source: "S21", target: "S23", type: "amplifying", strength: "moderate" },
  { source: "S12", target: "S18", type: "amplifying", strength: "moderate" },
  { source: "S06", target: "S03", type: "amplifying", strength: "moderate" },
  { source: "S10", target: "S08", type: "load_dependent", strength: "moderate" },
  { source: "S04", target: "S08", type: "amplifying", strength: "strong" },
  { source: "S04", target: "S01", type: "amplifying", strength: "strong" },
  { source: "S04", target: "S07", type: "amplifying", strength: "moderate" },
  { source: "S04", target: "S09", type: "amplifying", strength: "moderate" },
  { source: "S14", target: "S04", type: "bottleneck", strength: "moderate" },
  { source: "S04", target: "S02", type: "compensatory", strength: "moderate" },
  { source: "S22", target: "S04", type: "load_dependent", strength: "moderate" },
  { source: "S04", target: "S26", type: "amplifying", strength: "moderate" },
];

export function computeDegrees(links: Link[]): Record<string, number> {
  const deg: Record<string, number> = {};
  for (const l of links) {
    deg[l.source] = (deg[l.source] || 0) + 1;
    deg[l.target] = (deg[l.target] || 0) + 1;
  }
  return deg;
}
