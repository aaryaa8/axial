/**
 * Small node-cluster mark shown beside each section tag, ported from the Axial
 * about page. The central node is anchored and the satellites drift gently, so
 * every heading carries a little of the map's visual language.
 */

export type MarkVariant =
  | "star" | "chain" | "triangle" | "fork" | "pair" | "cluster" | "orbit" | "crossed";

type Node = { x: number; y: number; solid?: boolean; drift?: boolean; delay?: number };
type Edge = { a: number; b: number; dashed?: boolean };

const LAYOUTS: Record<MarkVariant, { nodes: Node[]; edges: Edge[] }> = {
  star: {
    nodes: [
      { x: 14, y: 14, solid: true },
      { x: 4, y: 5, drift: true, delay: 0 },
      { x: 25, y: 4, drift: true, delay: 1.2 },
      { x: 24, y: 24, drift: true, delay: 2.4 },
      { x: 4, y: 24, drift: true, delay: 0.6 },
    ],
    edges: [{ a: 0, b: 1 }, { a: 0, b: 2, dashed: true }, { a: 0, b: 3 }, { a: 0, b: 4, dashed: true }],
  },
  chain: {
    nodes: [
      { x: 3, y: 14, drift: true, delay: 0 },
      { x: 11, y: 14, solid: true },
      { x: 19, y: 14, solid: true },
      { x: 27, y: 14, drift: true, delay: 1.4 },
    ],
    edges: [{ a: 0, b: 1 }, { a: 1, b: 2 }, { a: 2, b: 3, dashed: true }],
  },
  triangle: {
    nodes: [
      { x: 14, y: 5, drift: true, delay: 0 },
      { x: 4, y: 23, solid: true },
      { x: 24, y: 23, solid: true },
    ],
    edges: [{ a: 0, b: 1 }, { a: 1, b: 2, dashed: true }, { a: 2, b: 0 }],
  },
  fork: {
    nodes: [
      { x: 4, y: 14, solid: true },
      { x: 16, y: 14, solid: true },
      { x: 26, y: 6, drift: true, delay: 0.8 },
      { x: 26, y: 22, drift: true, delay: 1.9 },
    ],
    edges: [{ a: 0, b: 1 }, { a: 1, b: 2, dashed: true }, { a: 1, b: 3 }],
  },
  pair: {
    nodes: [{ x: 9, y: 14, solid: true }, { x: 22, y: 14, drift: true, delay: 1.1 }],
    edges: [{ a: 0, b: 1 }],
  },
  cluster: {
    nodes: [
      { x: 10, y: 10, solid: true },
      { x: 20, y: 12, drift: true, delay: 0 },
      { x: 8, y: 22, drift: true, delay: 1 },
      { x: 22, y: 22, drift: true, delay: 2 },
    ],
    edges: [{ a: 0, b: 1 }, { a: 0, b: 2, dashed: true }, { a: 1, b: 3 }, { a: 2, b: 3, dashed: true }],
  },
  orbit: {
    nodes: [
      { x: 15, y: 15, solid: true },
      { x: 4, y: 15, drift: true, delay: 0 },
      { x: 15, y: 4, drift: true, delay: 1.5 },
      { x: 26, y: 15, drift: true, delay: 3 },
    ],
    edges: [{ a: 0, b: 1, dashed: true }, { a: 0, b: 2 }, { a: 0, b: 3, dashed: true }],
  },
  crossed: {
    nodes: [
      { x: 5, y: 5, drift: true, delay: 0.4 },
      { x: 24, y: 5, drift: true, delay: 1.6 },
      { x: 5, y: 24, drift: true, delay: 2.4 },
      { x: 24, y: 24, drift: true, delay: 0.8 },
      { x: 15, y: 15, solid: true },
    ],
    edges: [{ a: 0, b: 4 }, { a: 1, b: 4, dashed: true }, { a: 2, b: 4, dashed: true }, { a: 3, b: 4 }],
  },
};

export default function SectionNodeMark({
  variant = "star",
  size = 30,
  dark = false,
}: {
  variant?: MarkVariant;
  size?: number;
  dark?: boolean;
}) {
  const { nodes, edges } = LAYOUTS[variant];
  const stroke = dark ? "rgba(247,246,243,0.55)" : "var(--ink)";
  const fillSolid = dark ? "rgba(247,246,243,0.55)" : "var(--ink)";
  const fillHollow = dark ? "#111110" : "var(--bg)";

  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 30 30"
      style={{ flexShrink: 0, display: "block", opacity: 0.7 }}>
      <g stroke={stroke} strokeOpacity="0.5" fill="none">
        {edges.map((e, i) => {
          const a = nodes[e.a], b = nodes[e.b];
          return (
            <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} strokeWidth={0.7}
              strokeDasharray={e.dashed ? "1.4 1.4" : undefined} />
          );
        })}
      </g>
      <g>
        {nodes.map((n, i) => (
          <circle key={i}
            className={n.drift ? "about-node-drift" : undefined}
            style={n.drift ? { animationDelay: `${n.delay ?? 0}s`, transformOrigin: `${n.x}px ${n.y}px` } : undefined}
            cx={n.x} cy={n.y} r={n.solid ? 1.4 : 1.2}
            fill={n.solid ? fillSolid : fillHollow}
            stroke={stroke} strokeOpacity="0.75" strokeWidth={0.55} />
        ))}
      </g>
    </svg>
  );
}
