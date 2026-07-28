// The six domains Axial maps, drawn as a small constellation. Names only, with
// no skills, dependencies or weights, so this stays safe to show publicly.
//
// Labels radiate outward from the ring, so the connecting lines stay inside it
// and never cross a word.

import { DOMAINS as MAP_DOMAINS, type DomainID } from "../data/mapPublic";

const EXAMPLES: Record<DomainID, string> = {
  D1: "patterns, cause and effect",
  D2: "holding and recalling",
  D3: "focus, impulse",
  D4: "planning, self-checking",
  D5: "confidence, regulation",
  D6: "sharing, collaboration",
};

// Same six domains as the full map, in the same order, so the two never drift.
export const DOMAINS = (["D1", "D2", "D3", "D4", "D5", "D6"] as DomainID[]).map((id) => ({
  label: MAP_DOMAINS[id].short,
  eg: EXAMPLES[id],
}));

const CX = 50;
const CY = 50;
const R = 27;

// Which side of its dot each label sits on, taken from the outward direction.
function side(ux: number, uy: number) {
  if (ux > 0.5) return "right";
  if (ux < -0.5) return "left";
  return uy < 0 ? "top" : "bottom";
}

interface Props {
  center?: string;
  showExamples?: boolean;
}

export default function DomainConstellation({
  center = "how a child thinks",
  showExamples = true,
}: Props) {
  const pts = DOMAINS.map((d, i) => {
    const deg = -90 + i * 60;
    const ang = deg * (Math.PI / 180);
    const ux = Math.cos(ang);
    const uy = Math.sin(ang);
    return { ...d, x: CX + ux * R, y: CY + uy * R, ux, uy, side: side(ux, uy) };
  });

  return (
    <div className="domain-ring">
      <svg className="domain-svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        {/* spokes from the centre out to each domain */}
        {pts.map((p) => (
          <line
            key={`spoke-${p.label}`}
            x1={CX + p.ux * 8}
            y1={CY + p.uy * 8}
            x2={p.x - p.ux * 3}
            y2={p.y - p.uy * 3}
            stroke="#cfc8ba"
            strokeWidth="0.28"
          />
        ))}
        {/* the ring joining neighbouring domains */}
        {pts.map((p, i) => {
          const q = pts[(i + 1) % pts.length];
          return (
            <line
              key={`ring-${p.label}`}
              x1={p.x}
              y1={p.y}
              x2={q.x}
              y2={q.y}
              stroke="#e2dccf"
              strokeWidth="0.25"
            />
          );
        })}
      </svg>

      <div className="domain-center">{center}</div>

      {pts.map((p) => (
        <div
          key={p.label}
          className={`domain-node domain-node--${p.side}`}
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
        >
          <span className="domain-dot" />
          <span className="domain-text">
            <span className="domain-label">{p.label}</span>
            {showExamples && <span className="domain-eg">{p.eg}</span>}
          </span>
        </div>
      ))}
    </div>
  );
}
