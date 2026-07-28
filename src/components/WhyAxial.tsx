const ROWS = [
  {
    q: "What decides the next step",
    wrap: "The model’s best guess, turn by turn",
    axial: "A structured, cited model of this child’s skills",
  },
  {
    q: "How it personalizes",
    wrap: "The same prompt, reworded",
    axial: "It finds the upstream cause and teaches there",
  },
  {
    q: "Consistency",
    wrap: "A different answer each run",
    axial: "The same read of the child every time",
  },
  {
    q: "Evidence",
    wrap: "None you can inspect",
    axial: "Every move traces to a research finding",
  },
  {
    q: "Over time",
    wrap: "Starts over each session",
    axial: "The model of the child compounds for years",
  },
];

const HOW = [
  {
    n: "01",
    h: "It keeps a living model of the child",
    p: "Not a chat history. A structured map of which skills she has and how they depend on each other, updated every session.",
  },
  {
    n: "02",
    h: "It teaches at the cause, not the symptom",
    p: "When she stumbles on a word, it locates the upstream skill holding her back and teaches there, the way a good tutor does.",
  },
  {
    n: "03",
    h: "The cognitive model decides what she knows",
    p: "Claude writes the stories and speaks the words, and the cognitive model decides the teaching. That is why Axial stays consistent and can show its reasons.",
  },
];

export default function WhyAxial() {
  return (
    <section className="section why" id="why">
      <div className="section-head">
        <h2 className="section-title">How Axial compares with a chat based AI tutor</h2>
        <p className="section-standfirst">
          Most products called an AI tutor are a language model in a chat box. They
          read what a child knows from her last message, pick the next step by
          feel, and answer differently each time you ask. For a parent choosing
          a tutor for a young child, that is the whole problem.
        </p>
      </div>

      <div className="compare">
        <div className="compare-head">
          <span></span>
          <span className="compare-col compare-col--wrap">A ChatGPT wrapper</span>
          <span className="compare-col compare-col--axial">Axial</span>
        </div>
        {ROWS.map((r) => (
          <div className="compare-row" key={r.q}>
            <span className="compare-q">{r.q}</span>
            <span className="compare-wrap">{r.wrap}</span>
            <span className="compare-axial">{r.axial}</span>
          </div>
        ))}
      </div>

      <p className="why-pull">
        Two children give the same wrong answer. A wrapper gives them the same
        hint. Axial gives them different teaching, because it knows they are
        stuck for different reasons.
      </p>

      <div className="how-grid">
        {HOW.map((s) => (
          <div className="how-card" key={s.n}>
            <span className="how-n">{s.n}</span>
            <h3>{s.h}</h3>
            <p>{s.p}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
