import DomainConstellation from "./DomainConstellation";

const PATH = [
  { when: "Now", what: "Reading", sub: "Letter sounds through to fluent reading." },
  { when: "Next", what: "Writing and early arithmetic", sub: "The same play-based intake, new skill maps on top." },
  { when: "As she grows", what: "The six domains of thinking", sub: "Attention, memory, reasoning, planning, feeling, relating." },
  { when: "The horizon", what: "Thinking itself", sub: "The harder things a devoted tutor teaches over years." },
];

export default function ExpandSkills() {
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
