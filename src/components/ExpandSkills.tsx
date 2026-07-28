import DomainConstellation from "./DomainConstellation";

const PATH = [
  { when: "Now", what: "Reading", sub: "Letter sounds through to fluent reading." },
  { when: "Next", what: "Writing and early arithmetic", sub: "The same play-based intake, new skill maps on top." },
  { when: "As they grow", what: "The six domains of thinking", sub: "Attention, memory, reasoning, planning, feeling, relating." },
  { when: "The horizon", what: "Thinking itself", sub: "The harder things a devoted tutor teaches over years." },
];

export default function ExpandSkills() {
  return (
    <section className="section expand" id="beyond">
      <div className="section-head">
        <h2 className="section-title">The same model covers every domain of thinking</h2>
      </div>

      <p className="expand-lede">
        Reading is where we start, because it is early, universal, and the
        moment a parent feels the stakes. Underneath it, the model already spans
        six domains of thinking, feeling, and relating. Every new skill a child
        meets, writing, arithmetic, and eventually far more, reads from the same
        map of the child’s mind. The engine stays the same, and the skills taught on top
        of it widen.
      </p>

      <div className="domain-ring-wrap">
        <DomainConstellation />

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
