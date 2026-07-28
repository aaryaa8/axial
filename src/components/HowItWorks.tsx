const LOOP = [
  {
    n: "01",
    h: "It listens",
    p: "Your child reads aloud and plays. There is no test to sit. Axial reads how the child responds: what they get, where they slip, when they give up.",
  },
  {
    n: "02",
    h: "It understands",
    p: "From those signals it builds a model of how the child learns, and finds the one skill underneath that is holding the rest back.",
  },
  {
    n: "03",
    h: "It teaches",
    p: "It picks the next thing to teach, and the way to teach it to them, then watches what happens and updates. A good tutor, on a loop.",
  },
];

export default function HowItWorks() {
  return (
    <section className="section how" id="how">
      <div className="section-head">
        <h2 className="section-title">Two connected maps of your child</h2>
      </div>

      <div className="twomaps">
        <div className="twomap">
          <span className="twomap-tag twomap-tag--reading">what the child is learning</span>
          <p>
            The reading skills every child moves through, from letter sounds to
            blending to fluent reading. This is the well-charted part, drawn
            from decades of reading science.
          </p>
        </div>
        <div className="twomap-link" aria-hidden="true">
          <span>the link between them</span>
        </div>
        <div className="twomap">
          <span className="twomap-tag twomap-tag--cognitive">how the child learns</span>
          <p>
            The cognitive strengths underneath, like how the child hears sounds
            and how long they can hold them in mind. This is the part that decides
            how to teach them.
          </p>
        </div>
      </div>

      <p className="how-thesis">
        The connections between the two maps are the whole product. They let Axial
        name <strong>what your child is stuck on and why</strong>, and therefore
        what to do about it this week.
      </p>

      <div className="loop">
        {LOOP.map((s) => (
          <div className="loop-card" key={s.n}>
            <span className="loop-n">{s.n}</span>
            <h3>{s.h}</h3>
            <p>{s.p}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
