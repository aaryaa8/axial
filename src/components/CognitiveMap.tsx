import { useEffect, useRef, useState } from "react";
import { NODES, BAND_Y, AGE_MARKER, type MapEdge, type NodeState } from "../data/child";
import { DEPENDENCIES, EDGE_TYPES, type EdgeType } from "../data/evidence";

// Dot radii in CSS pixels, so edges can stop cleanly at the node rim.
const R: Record<string, number> = { reading: 5.5, cognitive: 4.5 };
const HEAD = 9; // room left for the arrowhead

// Dash patterns in pixels, one per dependency type.
const DASH: Record<EdgeType, string> = {
  prerequisite: "",
  capacity: "5 3",
  enabling: "1.5 3",
  automatizing: "7 3 1.5 3",
};

function nodeById(id: string) {
  return NODES.find((n) => n.id === id)!;
}

interface Props {
  states: Record<string, NodeState>;
  trail?: MapEdge[];
}

export default function CognitiveMap({ states, trail = [] }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setBox({ w: el.clientWidth, h: el.clientHeight });
    measure();
    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const trailSet = new Set(trail.map((t) => `${t.from}->${t.to}`));

  const pos = (id: string) => {
    const n = nodeById(id);
    return { x: (n.x / 100) * box.w, y: (BAND_Y[n.layer] / 100) * box.h, layer: n.layer };
  };

  // Trim each edge to the rim of both dots and bow it gently. Same-band edges
  // bow upward, away from the corridor the cross-band edges travel through.
  function edgeGeom(fromId: string, toId: string) {
    const a = pos(fromId);
    const b = pos(toId);
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const len = Math.hypot(dx, dy) || 1;
    const ux = dx / len;
    const uy = dy / len;
    const startPad = R[a.layer] + 3;
    const endPad = R[b.layer] + HEAD;
    const ax = a.x + ux * startPad;
    const ay = a.y + uy * startPad;
    const bx = b.x - ux * endPad;
    const by = b.y - uy * endPad;
    const sameBand = a.layer === b.layer;
    const bow = sameBand ? -0.055 : 0.035;
    const mx = (ax + bx) / 2 + -uy * len * bow;
    const my = (ay + by) / 2 + ux * len * bow;
    return `M ${ax} ${ay} Q ${mx} ${my} ${bx} ${by}`;
  }

  const readingNodes = NODES.filter((n) => n.layer === "reading");
  const ready = box.w > 0;

  return (
    <div className="map-figure">
      <div className="map" ref={ref}>
        {/* developmental age axis: position along the map means age */}
        <div className="map-axis" aria-hidden="true" />
        <span className="map-axis-cap">typical age</span>
        {readingNodes.map((n) => (
          <span key={`age-${n.id}`} className="map-age" style={{ left: `${n.x}%` }}>
            {n.age}
            <span className="map-tick" />
          </span>
        ))}

        {/* where this child sits on the timeline */}
        <div className="maya-marker" style={{ left: `${AGE_MARKER.x}%` }} aria-hidden="true">
          <span className="maya-marker-label">{AGE_MARKER.label}</span>
        </div>

        {/* the boundary between the two graphs */}
        <div className="band-divider" aria-hidden="true" />
        <span className="band-cap band-cap--top">what she’s learning</span>
        <span className="band-cap band-cap--bottom">how she learns</span>

        <svg className="map-svg" width={box.w} height={box.h} aria-hidden="true">
          <defs>
            <marker id="ar-dim" viewBox="0 -5 10 10" refX="9" refY="0" markerWidth="8" markerHeight="8" orient="auto">
              <path d="M0,-4L9,0L0,4" fill="#bbbbbb" />
            </marker>
            <marker id="ar-ink" viewBox="0 -5 10 10" refX="9" refY="0" markerWidth="8" markerHeight="8" orient="auto">
              <path d="M0,-4L9,0L0,4" fill="#1a1a1a" />
            </marker>
          </defs>
          {ready &&
            DEPENDENCIES.map((d) => {
              const on = trailSet.has(`${d.from}->${d.to}`);
              return (
                <path
                  key={`${d.from}-${d.to}`}
                  d={edgeGeom(d.from, d.to)}
                  className={`map-edge ${on ? "map-edge--trail" : ""}`}
                  fill="none"
                  strokeDasharray={on ? undefined : DASH[d.type] || undefined}
                  markerEnd={on ? "url(#ar-ink)" : "url(#ar-dim)"}
                />
              );
            })}
        </svg>

        {NODES.map((n) => {
          const state = states[n.id] ?? "dim";
          return (
            <div
              key={n.id}
              className={`map-node map-node--${n.layer} map-node--${state}`}
              style={{ left: `${n.x}%`, top: `${BAND_Y[n.layer]}%` }}
            >
              <span className="map-dot" />
              <span
                className="map-label"
                /* scale label width with the plot so neighbours never collide */
                style={{ width: ready ? Math.min(136, box.w * 0.225) : 132 }}
              >
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
            <svg className="legend-line" viewBox="0 0 30 6" aria-hidden="true">
              <defs>
                <marker id={`lg-${t}`} viewBox="0 -5 10 10" refX="8" refY="0" markerWidth="7" markerHeight="7" orient="auto">
                  <path d="M0,-4L9,0L0,4" fill="#555555" />
                </marker>
              </defs>
              <line
                x1="1"
                y1="3"
                x2="21"
                y2="3"
                stroke="#555555"
                strokeWidth="1.1"
                strokeDasharray={DASH[t] || undefined}
                markerEnd={`url(#lg-${t})`}
              />
            </svg>
            <span className="legend-label">
              {EDGE_TYPES[t].label}
              <span className="legend-gloss">{EDGE_TYPES[t].gloss}</span>
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
