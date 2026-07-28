// The public view of the Axial map.
//
// Deliberately partial. This file carries skill names, their domain, and which
// skills connect. The definitions, the dependency types and the edge strengths
// are the proprietary part of Axial and are never sent to the browser, so the
// explanation behind a connection genuinely lives behind the waitlist instead
// of being hidden in the page source.

export type DomainID = "D1" | "D2" | "D3" | "D4" | "D5" | "D6";

export const DOMAINS: Record<DomainID, { label: string; short: string; angle: number }> = {
  D1: { label: "Reasoning & Problem Solving", short: "Reasoning", angle: -90 },
  D2: { label: "Memory & Learning", short: "Memory", angle: -30 },
  D3: { label: "Cognitive Control", short: "Cognitive Control", angle: 30 },
  D4: { label: "Metacognition & Self-Regulation", short: "Metacognition", angle: 90 },
  D5: { label: "Emotional Cognition", short: "Emotional", angle: 150 },
  D6: { label: "Social Cognition", short: "Social", angle: -150 },
};

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

export interface Link { source: string; target: string; }

export const LINKS: Link[] = [
  { source: "S01", target: "S06" },
  { source: "S01", target: "S07" },
  { source: "S02", target: "S05" },
  { source: "S02", target: "S09" },
  { source: "S03", target: "S04" },
  { source: "S04", target: "S06" },
  { source: "S05", target: "S09" },
  { source: "S06", target: "S09" },
  { source: "S07", target: "S13" },
  { source: "S07", target: "S15" },
  { source: "S08", target: "S01" },
  { source: "S08", target: "S02" },
  { source: "S08", target: "S03" },
  { source: "S08", target: "S07" },
  { source: "S08", target: "S09" },
  { source: "S08", target: "S29" },
  { source: "S10", target: "S09" },
  { source: "S09", target: "S29" },
  { source: "S12", target: "S10" },
  { source: "S11", target: "S09" },
  { source: "S11", target: "S12" },
  { source: "S11", target: "S15" },
  { source: "S12", target: "S07" },
  { source: "S12", target: "S13" },
  { source: "S12", target: "S15" },
  { source: "S12", target: "S31" },
  { source: "S13", target: "S19" },
  { source: "S14", target: "S01" },
  { source: "S14", target: "S03" },
  { source: "S14", target: "S08" },
  { source: "S15", target: "S09" },
  { source: "S15", target: "S14" },
  { source: "S15", target: "S16" },
  { source: "S15", target: "S19" },
  { source: "S15", target: "S30" },
  { source: "S16", target: "S17" },
  { source: "S16", target: "S28" },
  { source: "S17", target: "S18" },
  { source: "S17", target: "S29" },
  { source: "S18", target: "S31" },
  { source: "S19", target: "S24" },
  { source: "S20", target: "S21" },
  { source: "S20", target: "S25" },
  { source: "S21", target: "S08" },
  { source: "S21", target: "S01" },
  { source: "S21", target: "S17" },
  { source: "S22", target: "S08" },
  { source: "S22", target: "S15" },
  { source: "S22", target: "S21" },
  { source: "S22", target: "S29" },
  { source: "S23", target: "S24" },
  { source: "S23", target: "S30" },
  { source: "S25", target: "S26" },
  { source: "S25", target: "S27" },
  { source: "S26", target: "S09" },
  { source: "S26", target: "S27" },
  { source: "S26", target: "S28" },
  { source: "S27", target: "S09" },
  { source: "S27", target: "S22" },
  { source: "S28", target: "S15" },
  { source: "S30", target: "S09" },
  { source: "S30", target: "S31" },
  { source: "S31", target: "S09" },
  { source: "S31", target: "S11" },
  { source: "S31", target: "S15" },
  { source: "S08", target: "S11" },
  { source: "S13", target: "S15" },
  { source: "S22", target: "S01" },
  { source: "S10", target: "S13" },
  { source: "S17", target: "S15" },
  { source: "S18", target: "S29" },
  { source: "S23", target: "S17" },
  { source: "S24", target: "S22" },
  { source: "S30", target: "S17" },
  { source: "S25", target: "S28" },
  { source: "S19", target: "S30" },
  { source: "S24", target: "S09" },
  { source: "S28", target: "S09" },
  { source: "S21", target: "S23" },
  { source: "S12", target: "S18" },
  { source: "S06", target: "S03" },
  { source: "S10", target: "S08" },
  { source: "S04", target: "S08" },
  { source: "S04", target: "S01" },
  { source: "S04", target: "S07" },
  { source: "S04", target: "S09" },
  { source: "S14", target: "S04" },
  { source: "S04", target: "S02" },
  { source: "S22", target: "S04" },
  { source: "S04", target: "S26" },
];

export function computeDegrees(links: Link[]): Record<string, number> {
  const deg: Record<string, number> = {};
  for (const l of links) {
    deg[l.source] = (deg[l.source] || 0) + 1;
    deg[l.target] = (deg[l.target] || 0) + 1;
  }
  return deg;
}
