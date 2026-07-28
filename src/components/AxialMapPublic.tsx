import { useEffect, useMemo, useRef, useState } from "react";
import {
  SKILLS, LINKS, DOMAINS, LINE_DASH, STRENGTH_STYLE, DIMMED_COLORS,
  TYPE_GLOSS, NODE_RADIUS, computeDegrees,
  type DomainID, type LinkType, type Skill,
} from "../data/mapPublic";

export interface Placed extends Skill { x: number; y: number; degree: number }

function domainCentroids(cx: number, cy: number, R: number) {
  const out = {} as Record<DomainID, { x: number; y: number; angle: number }>;
  for (const [id, cfg] of Object.entries(DOMAINS)) {
    const rad = (cfg.angle * Math.PI) / 180;
    out[id as DomainID] = { x: cx + Math.cos(rad) * R, y: cy + Math.sin(rad) * R, angle: cfg.angle };
  }
  return out;
}

function placeSkills(
  centroids: Record<DomainID, { x: number; y: number; angle: number }>,
  degrees: Record<string, number>, cx: number, cy: number, R: number
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
    const maxDeg = Math.max(...degs), minDeg = Math.min(...degs);
    const base = (c.angle * Math.PI) / 180;
    sorted.forEach((s, i) => {
      const deg = degrees[s.id] || 0;
      const t = maxDeg === minDeg ? 0.5 : 1 - (deg - minDeg) / (maxDeg - minDeg);
      const dist = bandMin + t * (bandMax - bandMin);
      const a = base + (n > 1 ? (i / (n - 1) - 0.5) * 2 * wedge : 0);
      nodes.push({
        ...s, degree: deg,
        x: c.x + Math.cos(a) * dist * 0.6 + (cx - c.x) * (1 - t) * 0.25,
        y: c.y + Math.sin(a) * dist * 0.6 + (cy - c.y) * (1 - t) * 0.25,
      });
    });
  }

  const minDist = NODE_RADIUS * 4.5;
  for (let iter = 0; iter < 80; iter++) {
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[j].x - nodes[i].x, dy = nodes[j].y - nodes[i].y;
        const d = Math.hypot(dx, dy);
        if (d < minDist && d > 0) {
          const push = (minDist - d) / 2, ux = (dx / d) * push, uy = (dy / d) * push;
          nodes[i].x -= ux; nodes[i].y -= uy; nodes[j].x += ux; nodes[j].y += uy;
        }
      }
    }
  }
  return nodes;
}

const FILTERS: { key: DomainID | null; label: string }[] = [
  { key: null, label: "All" },
  ...(Object.entries(DOMAINS) as [DomainID, { short: string }][]).map(([k, v]) => ({ key: k, label: v.short })),
];

export default function AxialMapPublic({ onOpen }: { onOpen: (s: Placed) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });
  const [hover, setHover] = useState<Placed | null>(null);
  const [selected, setSelected] = useState<Placed | null>(null);
  const [domain, setDomain] = useState<DomainID | null>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setBox((p) =>
      p.w === el.clientWidth && p.h === el.clientHeight ? p : { w: el.clientWidth, h: el.clientHeight });
    measure();
    window.addEventListener("resize", measure);
    let ro: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined") { ro = new ResizeObserver(measure); ro.observe(el); }
    return () => { window.removeEventListener("resize", measure); ro?.disconnect(); };
  }, []);

  const degrees = useMemo(() => computeDegrees(LINKS), []);
  const { nodes, cx, cy, R } = useMemo(() => {
    if (!box.w) return { nodes: [] as Placed[], cx: 0, cy: 0, R: 0 };
    const cx = box.w / 2, cy = box.h / 2, R = Math.min(box.w, box.h) * 0.28;
    return { nodes: placeSkills(domainCentroids(cx, cy, R), degrees, cx, cy, R), cx, cy, R };
  }, [box, degrees]);

  const shown = useMemo(() => {
    if (!domain || !cx) return nodes;
    return nodes.map((n) => n.domain === domain
      ? { ...n, x: n.x + (cx - n.x) * 0.15, y: n.y + (cy - n.y) * 0.15 } : n);
  }, [nodes, domain, cx, cy]);

  const byId = useMemo(() => {
    const m: Record<string, Placed> = {};
    for (const n of shown) m[n.id] = n;
    return m;
  }, [shown]);

  const active = selected || hover;
  const peers = useMemo(() => {
    const s = new Set<string>();
    if (!active) return s;
    for (const l of LINKS) {
      if (l.source === active.id) s.add(l.target);
      if (l.target === active.id) s.add(l.source);
    }
    return s;
  }, [active]);

  const labelR = R * 1.75 + 26;

  return (
    <div className="axialmap-wrap">
      <div className="axialmap-filters">
        {FILTERS.map((f) => (
          <button key={f.label}
            className={`axialmap-filter ${domain === f.key ? "is-on" : ""}`}
            onClick={(e) => { e.stopPropagation(); setDomain(f.key); }}>
            {f.label}
          </button>
        ))}
      </div>

      <div className="axialmap" ref={ref} onClick={() => setSelected(null)}>
        <svg width={box.w} height={box.h} className="axialmap-svg">
          <defs>
            {["555555", "999999", "cccccc", "111111", "444444"].map((c) => (
              <marker key={c} id={`am-${c}`} viewBox="0 -5 10 10" refX={NODE_RADIUS + 6} refY="0"
                markerWidth="5" markerHeight="5" orient="auto">
                <path d="M0,-4L8,0L0,4" fill={`#${c}`} />
              </marker>
            ))}
          </defs>

          {(Object.entries(DOMAINS) as [DomainID, { label: string; angle: number }][]).map(([id, cfg]) => {
            const rad = (cfg.angle * Math.PI) / 180;
            const rawX = cx + Math.cos(rad) * labelR;
            const y = Math.max(12, Math.min(box.h - 12, cy + Math.sin(rad) * labelR));
            // Anchor outer labels to the edge so long domain names stay inside
            // the frame instead of being clipped.
            const near = box.w * 0.28;
            const anchor = rawX < near ? "start" : rawX > box.w - near ? "end" : "middle";
            const x = anchor === "start" ? 4 : anchor === "end" ? box.w - 4 : rawX;
            return (
              <text key={id} x={x} y={y} textAnchor={anchor} dominantBaseline="middle" className="axialmap-domain">
                {cfg.label}
              </text>
            );
          })}

          {LINKS.map((l, i) => {
            const s = byId[l.source], t = byId[l.target];
            if (!s || !t) return null;
            const connected = active ? (l.source === active.id || l.target === active.id) : false;
            const sMatch = !domain || s.domain === domain;
            const tMatch = !domain || t.domain === domain;
            const domainDimmed = domain ? (!sMatch && !tMatch) : false;
            const domainPartial = domain ? (!sMatch || !tMatch) : false;
            const base = STRENGTH_STYLE[l.strength];
            const hasArrow = l.type === "prerequisite" || l.type === "bottleneck";

            let stroke: string, width: number, opacity: number;
            if (active && connected) {
              stroke = l.strength === "strong" ? "#111111" : "#444444";
              width = base.width * 1.5; opacity = 1;
            } else if (active && !connected) {
              stroke = DIMMED_COLORS[l.strength]; width = base.width; opacity = 0.08;
            } else if (domainDimmed) {
              stroke = base.color; width = base.width; opacity = 0.08;
            } else if (domainPartial) {
              stroke = base.color; width = base.width; opacity = 0.15;
            } else {
              stroke = base.color; width = base.width; opacity = 1;
            }
            const dash = LINE_DASH[l.type];
            return (
              <line key={i} x1={s.x} y1={s.y} x2={t.x} y2={t.y}
                stroke={stroke} strokeWidth={width} opacity={opacity}
                strokeDasharray={dash === "none" ? undefined : dash}
                markerEnd={hasArrow ? `url(#am-${stroke.replace("#", "")})` : undefined}
                style={{ transition: "opacity 0.2s ease-out" }} />
            );
          })}

          {shown.map((n) => {
            const isActive = active?.id === n.id;
            const isPeer = peers.has(n.id);
            let opacity = 1;
            if (active && !isActive && !isPeer) opacity = 0.08;
            else if (domain && n.domain !== domain) opacity = 0.15;
            return (
              <g key={n.id}>
                <circle cx={n.x} cy={n.y} r={NODE_RADIUS + 7} fill="transparent" className="axialmap-hit"
                  onMouseEnter={(e) => { setHover(n); setMouse({ x: e.clientX, y: e.clientY }); }}
                  onMouseMove={(e) => setMouse({ x: e.clientX, y: e.clientY })}
                  onMouseLeave={() => setHover(null)}
                  onClick={(e) => { e.stopPropagation(); setSelected(n); onOpen(n); }} />
                <circle cx={n.x} cy={n.y} r={NODE_RADIUS} fill={isActive ? "#555555" : "#777777"}
                  opacity={opacity} pointerEvents="none" style={{ transition: "all 0.2s ease-out" }} />
              </g>
            );
          })}
        </svg>

        {hover && (
          <div className="axialmap-tip" style={{ left: mouse.x + 14, top: mouse.y + 14 }}>
            <span className="axialmap-tip-name">{hover.name}</span>
            <span className="axialmap-tip-meta">
              {DOMAINS[hover.domain].short} · {hover.degree} connections
            </span>
          </div>
        )}
      </div>

      <div className="axialmap-legend">
        <span className="axialmap-legend-head">Types</span>
        {(Object.keys(LINE_DASH) as LinkType[]).map((k) => (
          <span className="axialmap-legend-item" key={k}>
            <svg width="22" height="4" aria-hidden="true">
              <line x1="0" y1="2" x2="22" y2="2" stroke="#777" strokeWidth="1.5"
                strokeDasharray={LINE_DASH[k] === "none" ? undefined : LINE_DASH[k]} />
            </svg>
            <span className="axialmap-legend-label">{k.replace("_", " ")}</span>
          </span>
        ))}
        <span className="axialmap-legend-head axialmap-legend-head--right">Strength</span>
        {(["strong", "moderate", "weak"] as const).map((s) => (
          <span className="axialmap-legend-item" key={s}>
            <svg width="22" height="4" aria-hidden="true">
              <line x1="0" y1="2" x2="22" y2="2" stroke={STRENGTH_STYLE[s].color} strokeWidth={STRENGTH_STYLE[s].width * 2} />
            </svg>
            <span className="axialmap-legend-label">{s}</span>
          </span>
        ))}
      </div>

      <details className="axialmap-guide">
        <summary>How to read the map</summary>
        <div className="axialmap-guide-body">
          <p>
            Each point is a cognitive skill, grouped near the domain it belongs
            to. The most connected skills sit closest to the centre, because
            they carry the most of the rest of the map.
          </p>
          <p>
            A line means one skill depends on another, and the line style says
            how:
          </p>
          <ul>
            {(Object.keys(TYPE_GLOSS) as LinkType[]).map((k) => (
              <li key={k}>
                <b>{k.replace("_", " ")}</b> {TYPE_GLOSS[k]}
              </li>
            ))}
          </ul>
          <p>
            Thicker and darker lines are stronger dependencies. Arrows mark the
            direction on prerequisites and bottlenecks. Hover a point to read
            the skill, and click it to open the detail.
          </p>
        </div>
      </details>
    </div>
  );
}
