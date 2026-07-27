import { NODES, EDGES, type MapEdge, type NodeState } from "../data/child";

const VB_W = 100;
const VB_H = 66;

function nodeById(id: string) {
  return NODES.find((n) => n.id === id)!;
}

function edgePath(e: MapEdge) {
  const a = nodeById(e.from);
  const b = nodeById(e.to);
  // stop a little short of the target so the arrowhead sits beside the node
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const gap = 3.2;
  const ex = b.x - (dx / len) * gap;
  const ey = b.y - (dy / len) * gap;
  const mx = (a.x + ex) / 2;
  const my = (a.y + ey) / 2 - 3.5; // gentle lift for an organic arc
  return `M ${a.x} ${a.y} Q ${mx} ${my} ${ex} ${ey}`;
}

interface Props {
  states: Record<string, NodeState>;
  trail?: MapEdge[];
}

export default function CognitiveMap({ states, trail = [] }: Props) {
  const trailSet = new Set(trail.map((t) => `${t.from}->${t.to}`));

  return (
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
          <marker
            id="arrow-dim"
            viewBox="0 -5 10 10"
            refX="8"
            refY="0"
            markerWidth="4"
            markerHeight="4"
            orient="auto"
          >
            <path d="M0,-4L8,0L0,4" fill="#bbbbbb" />
          </marker>
          <marker
            id="arrow-ink"
            viewBox="0 -5 10 10"
            refX="8"
            refY="0"
            markerWidth="4.5"
            markerHeight="4.5"
            orient="auto"
          >
            <path d="M0,-4L8,0L0,4" fill="#1a1a1a" />
          </marker>
        </defs>

        {EDGES.map((e) => {
          const on = trailSet.has(`${e.from}->${e.to}`);
          return (
            <path
              key={`${e.from}-${e.to}`}
              d={edgePath(e)}
              className={`map-edge ${on ? "map-edge--trail" : ""}`}
              fill="none"
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
  );
}
