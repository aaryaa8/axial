import { NODES, type MapEdge, type NodeState } from "../data/child";
import { DEPENDENCIES, EDGE_TYPES, type EdgeType } from "../data/evidence";

const VB_W = 100;
const VB_H = 66;

function nodeById(id: string) {
  return NODES.find((n) => n.id === id)!;
}

function edgePath(from: string, to: string) {
  const a = nodeById(from);
  const b = nodeById(to);
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const gap = 3.4;
  const ex = b.x - (dx / len) * gap;
  const ey = b.y - (dy / len) * gap;
  const mx = (a.x + ex) / 2;
  const my = (a.y + ey) / 2 - 3.5;
  return `M ${a.x} ${a.y} Q ${mx} ${my} ${ex} ${ey}`;
}

// legend line samples use their own small viewbox
const LEGEND_DASH: Record<EdgeType, string> = {
  prerequisite: "",
  capacity: "4 2.4",
  enabling: "0.8 2.4",
  automatizing: "5 1.8 1 1.8",
};

interface Props {
  states: Record<string, NodeState>;
  trail?: MapEdge[];
}

export default function CognitiveMap({ states, trail = [] }: Props) {
  const trailSet = new Set(trail.map((t) => `${t.from}->${t.to}`));

  return (
    <div className="map-figure">
      <div className="map">
        <span className="map-band-label map-band-top">what she’s learning</span>
        <span className="map-band-label map-band-bottom">how she learns</span>

        <svg
          className="map-svg"
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <defs>
            <marker id="arrow-dim" viewBox="0 -5 10 10" refX="7" refY="0" markerWidth="4" markerHeight="4" orient="auto">
              <path d="M0,-4L8,0L0,4" fill="#bbbbbb" />
            </marker>
            <marker id="arrow-ink" viewBox="0 -5 10 10" refX="7" refY="0" markerWidth="4.6" markerHeight="4.6" orient="auto">
              <path d="M0,-4L8,0L0,4" fill="#1a1a1a" />
            </marker>
          </defs>

          {DEPENDENCIES.map((d) => {
            const on = trailSet.has(`${d.from}->${d.to}`);
            return (
              <path
                key={`${d.from}-${d.to}`}
                d={edgePath(d.from, d.to)}
                className={`map-edge ${on ? "map-edge--trail" : ""}`}
                fill="none"
                strokeDasharray={on ? undefined : EDGE_TYPES[d.type].dash || undefined}
                markerEnd={on ? "url(#arrow-ink)" : "url(#arrow-dim)"}
              />
            );
          })}
        </svg>

        {NODES.map((n) => {
          const state = states[n.id] ?? "dim";
          const topPct = (n.y / VB_H) * 100;
          return (
            <div
              key={n.id}
              className={`map-node map-node--${n.layer} map-node--${state}`}
              style={{ left: `${n.x}%`, top: `${topPct}%` }}
            >
              <span className="map-dot" />
              <span className="map-label">
                {n.label}
                {n.sub && <span className="map-sub">{n.sub}</span>}
              </span>
            </div>
          );
        })}
      </div>

      <div className="map-legend">
        <span className="map-legend-head">how to read</span>
        {(Object.keys(EDGE_TYPES) as EdgeType[]).map((t) => (
          <span className="legend-item" key={t}>
            <svg className="legend-line" viewBox="0 0 26 6" aria-hidden="true">
              <defs>
                <marker id={`lg-${t}`} viewBox="0 -5 10 10" refX="6" refY="0" markerWidth="5" markerHeight="5" orient="auto">
                  <path d="M0,-4L8,0L0,4" fill="#555555" />
                </marker>
              </defs>
              <line
                x1="1"
                y1="3"
                x2="20"
                y2="3"
                stroke="#555555"
                strokeWidth="1"
                strokeDasharray={LEGEND_DASH[t] || undefined}
                markerEnd={`url(#lg-${t})`}
              />
            </svg>
            <span className="legend-label">{EDGE_TYPES[t].label}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
