// Scaling story: reading is the wedge, but the same mind-model already spans
// the six cognitive domains Axial maps. These six are the domains shown on the
// real Axial map, kept here as names only (no proprietary skills or edges).

const DOMAINS = [
  { label: "Reasoning", eg: "patterns, cause and effect" },
  { label: "Memory", eg: "holding and recalling" },
  { label: "Cognitive Control", eg: "focus, impulse" },
  { label: "Metacognition", eg: "planning, self-checking" },
  { label: "Emotional", eg: "confidence, regulation" },
  { label: "Social", eg: "sharing, collaboration" },
];

const PATH = [
  { when: "Now", what: "Reading", sub: "Letter sounds through to fluent reading." },
  { when: "Next", what: "Writing and early arithmetic", sub: "The same play-based intake, new skill maps on top." },
  { when: "As she grows", what: "The six domains of thinking", sub: "Attention, memory, reasoning, planning, feeling, relating." },
  { when: "The horizon", what: "Thinking itself", sub: "The harder things a devoted tutor teaches over years." },
];

const CX = 50;
const CY = 50;
const R = 33;

export default function ExpandSkills() {
  const pts = DOMAINS.map((d, i) => {
    const ang = (-90 + i * 60) * (Math.PI / 180);
    return { ...d, x: CX + Math.cos(ang) * R, y: CY + Math.sin(ang) * R };
  });

  return (
    <section className="section expand" id="beyond">
      <div className="section-head">
        <span className="section-kicker">Beyond reading</span>
        <h2 className="section-title">
          The same model maps the whole of how a child <em>thinks</em>.
        </h2>
      </div>

      <p className="expand-lede">
        Reading is where we start, because it is early, universal, and the
        moment a parent feels the stakes. Underneath it, the model already spans
        six domains of thinking, feeling, and relating. Every new skill Maya
        meets, writing, arithmetic, and eventually far more, reads from the same
        map of her mind. The engine does not change. Only the skills we teach on
        top of it do.
      </p>

      <div className="domain-ring-wrap">
        <div className="domain-ring">
          <svg className="domain-svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
            {pts.map((p) => {
              const dx = p.x - CX;
              const dy = p.y - CY;
              const len = Math.hypot(dx, dy) || 1;
              const sx = CX + (dx / len) * 7;
              const sy = CY + (dy / len) * 7;
              const ex = p.x - (dx / len) * 6;
              const ey = p.y - (dy / len) * 6;
              return (
                <line
                  key={p.label}
                  x1={sx}
                  y1={sy}
                  x2={ex}
                  y2={ey}
                  stroke="#bbbbbb"
                  strokeWidth="0.3"
                />
              );
            })}
          </svg>

          <div className="domain-center">how a child thinks</div>

          {pts.map((p) => (
            <div
              key={p.label}
              className="domain-node"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              <span className="domain-dot" />
              <span className="domain-label">{p.label}</span>
              <span className="domain-eg">{p.eg}</span>
            </div>
          ))}
        </div>

        <div className="expand-side">
          <h3>One engine, a widening set of skills.</h3>
          <ul className="expand-path">
            {PATH.map((p) => (
              <li key={p.when}>
                <span className="expand-when">{p.when}</span>
                <span className="expand-what">
                  {p.what}
                  <small>{p.sub}</small>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
