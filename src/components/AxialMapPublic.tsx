import { useEffect, useMemo, useRef, useState } from "react";
import {
  SKILLS,
  LINKS,
  DOMAINS,
  computeDegrees,
  type DomainID,
  type Skill,
} from "../data/mapPublic";

const NODE_RADIUS = 3.5;

interface Placed extends Skill {
  x: number;
  y: number;
  degree: number;
}

// Six domain centroids arranged on a ring, exactly as the original map does it.
function domainCentroids(cx: number, cy: number, R: number) {
  const out = {} as Record<DomainID, { x: number; y: number; angle: number }>;
  for (const [id, cfg] of Object.entries(DOMAINS)) {
    const rad = (cfg.angle * Math.PI) / 180;
    out[id as DomainID] = { x: cx + Math.cos(rad) * R, y: cy + Math.sin(rad) * R, angle: cfg.angle };
  }
  return out;
}

// Skills sit in a wedge around their domain, with the most connected ones
// pulled toward the centre, then a collision pass separates them.
function placeSkills(
  centroids: Record<DomainID, { x: number; y: number; angle: number }>,
  degrees: Record<string, number>,
  cx: number,
  cy: number,
  R: number
): Placed[] {
  const groups: Record<DomainID, Skill[]> = { D1: [], D2: [], D3: [], D4: [], D5: [], D6: [] };
  for (const s of SKILLS) groups[s.domain].push(s);

  const nodes: Placed[] = [];
  const bandMin = R * 0.22;
  const bandMax = R * 0.65;
  const wedge = Math.PI / 5.5;

  for (const [domId, group] of Object.entries(groups) as [DomainID, Skill[]][]) {
    const c = centroids[domId];
    const sorted = [...group].sort((a, b) => (degrees[b.id] || 0) - (degrees[a.id] || 0));
    const n = sorted.length;
    const degs = sorted.map((s) => degrees[s.id] || 0);
    const maxDeg = Math.max(...degs);
    const minDeg = Math.min(...degs);
    const base = (c.angle * Math.PI) / 180;

    sorted.forEach((s, i) => {
      const deg = degrees[s.id] || 0;
      const t = maxDeg === minDeg ? 0.5 : 1 - (deg - minDeg) / (maxDeg - minDeg);
      const dist = bandMin + t * (bandMax - bandMin);
      const offset = n > 1 ? (i / (n - 1) - 0.5) * 2 * wedge : 0;
      const a = base + offset;
      nodes.push({
        ...s,
        degree: deg,
        x: c.x + Math.cos(a) * dist * 0.6 + (cx - c.x) * (1 - t) * 0.25,
        y: c.y + Math.sin(a) * dist * 0.6 + (cy - c.y) * (1 - t) * 0.25,
      });
    });
  }

  const minDist = NODE_RADIUS * 4.5;
  for (let iter = 0; iter < 80; iter++) {
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[j].x - nodes[i].x;
        const dy = nodes[j].y - nodes[i].y;
        const d = Math.hypot(dx, dy);
        if (d < minDist && d > 0) {
          const push = (minDist - d) / 2;
          const ux = (dx / d) * push;
          const uy = (dy / d) * push;
          nodes[i].x -= ux;
          nodes[i].y -= uy;
          nodes[j].x += ux;
          nodes[j].y += uy;
        }
      }
    }
  }
  return nodes;
}

const FILTERS: { key: DomainID | null; label: string }[] = [
  { key: null, label: "All" },
  ...(Object.entries(DOMAINS) as [DomainID, { short: string }][]).map(([k, v]) => ({
    key: k,
    label: v.short,
  })),
];

export default function AxialMapPublic({ onOpen }: { onOpen: (s: Placed) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });
  const [hover, setHover] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [domain, setDomain] = useState<DomainID | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () =>
      setBox((p) =>
        p.w === el.clientWidth && p.h === el.clientHeight ? p : { w: el.clientWidth, h: el.clientHeight }
      );
    measure();
    window.addEventListener("resize", measure);
    let ro: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(measure);
      ro.observe(el);
    }
    return () => {
      window.removeEventListener("resize", measure);
      ro?.disconnect();
    };
  }, []);

  const degrees = useMemo(() => computeDegrees(LINKS), []);

  const { nodes, cx, cy, R } = useMemo(() => {
    if (!box.w) return { nodes: [] as Placed[], cx: 0, cy: 0, R: 0 };
    const cx = box.w / 2;
    const cy = box.h / 2;
    const R = Math.min(box.w, box.h) * 0.28;
    return { nodes: placeSkills(domainCentroids(cx, cy, R), degrees, cx, cy, R), cx, cy, R };
  }, [box, degrees]);

  // Pull an active domain gently toward the centre, as the original does.
  const shown = useMemo(() => {
    if (!domain || !cx) return nodes;
    return nodes.map((n) =>
      n.domain === domain ? { ...n, x: n.x + (cx - n.x) * 0.15, y: n.y + (cy - n.y) * 0.15 } : n
    );
  }, [nodes, domain, cx, cy]);

  const byId = useMemo(() => {
    const m: Record<string, Placed> = {};
    for (const n of shown) m[n.id] = n;
    return m;
  }, [shown]);

  const active = selected || hover;
  const peers = useMemo(() => {
    if (!active) return new Set<string>();
    const s = new Set<string>();
    for (const l of LINKS) {
      if (l.source === active) s.add(l.target);
      if (l.target === active) s.add(l.source);
    }
    return s;
  }, [active]);

  const labelR = R * 1.75 + 26;

  return (
    <div className="axialmap-wrap">
      <div className="axialmap-filters">
        {FILTERS.map((f) => (
          <button
            key={f.label}
            className={`axialmap-filter ${domain === f.key ? "is-on" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              setDomain(f.key);
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="axialmap" ref={ref} onClick={() => setSelected(null)}>
        <svg width={box.w} height={box.h} className="axialmap-svg">
          {/* domain labels around the outside */}
          {(Object.entries(DOMAINS) as [DomainID, { label: string; angle: number }][]).map(
            ([id, cfg]) => {
              const rad = (cfg.angle * Math.PI) / 180;
              const x = Math.max(52, Math.min(box.w - 52, cx + Math.cos(rad) * labelR));
              const y = Math.max(14, Math.min(box.h - 14, cy + Math.sin(rad) * labelR));
              return (
                <text
                  key={id}
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="axialmap-domain"
                >
                  {cfg.label}
                </text>
              );
            }
          )}

          {LINKS.map((l, i) => {
            const a = byId[l.source];
            const b = byId[l.target];
            if (!a || !b) return null;
            const lit = !!active && (l.source === active || l.target === active);
            const dimmed =
              (!!active && !lit) ||
              (!!domain && a.domain !== domain && b.domain !== domain);
            return (
              <line
                key={i}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                className={`axialmap-link ${lit ? "is-lit" : ""} ${dimmed ? "is-dim" : ""}`}
              />
            );
          })}

          {shown.map((n) => {
            const isActive = active === n.id;
            const isPeer = peers.has(n.id);
            const dimmed =
              (!!active && !isActive && !isPeer) || (!!domain && n.domain !== domain);
            return (
              <g
                key={n.id}
                className={`axialmap-node ${isActive ? "is-active" : ""} ${dimmed ? "is-dim" : ""}`}
                onMouseEnter={() => setHover(n.id)}
                onMouseLeave={() => setHover(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelected(n.id);
                  onOpen(n);
                }}
              >
                <circle cx={n.x} cy={n.y} r={NODE_RADIUS + 7} className="axialmap-hit" />
                <circle cx={n.x} cy={n.y} r={NODE_RADIUS} className="axialmap-dot" />
                {(isActive || isPeer) && (
                  <text x={n.x} y={n.y - 9} textAnchor="middle" className="axialmap-name">
                    {n.name}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {!active && <span className="axialmap-hint">Hover a point to see the skill, click to open it</span>}
      </div>
    </div>
  );
}

export type { Placed };
