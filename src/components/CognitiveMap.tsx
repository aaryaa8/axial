import { NODES, EDGES, type MapEdge, type NodeState } from "../data/child";

const VB_W = 100;
const VB_H = 66;

function nodeById(id: string) {
  return NODES.find((n) => n.id === id)!;
}

function edgePath(e: MapEdge) {
  const a = nodeById(e.from);
  const b = nodeById(e.to);
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2 - 4; // gentle lift for an organic arc
  return `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`;
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
          <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="1.4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {EDGES.map((e) => {
          const on = trailSet.has(`${e.from}->${e.to}`);
          return (
            <path
              key={`${e.from}-${e.to}`}
              d={edgePath(e)}
              className={`map-edge ${on ? "map-edge--trail" : ""}`}
              fill="none"
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
