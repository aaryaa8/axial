import SiteNav from "./components/SiteNav";
import useReveal from "./useReveal";
import DomainConstellation from "./components/DomainConstellation";

const BASE = import.meta.env.BASE_URL;

const FACTS = [
  { k: "35", v: "cognitive skills", n: "across six domains of thinking, feeling and relating" },
  { k: "100", v: "dependencies", n: "typed links describing which skills carry which" },
  { k: "120", v: "sources", n: "peer reviewed research behind the map" },
];

const PRINCIPLES = [
  {
    t: "The scoring is deterministic",
    b: "What a child knows comes from a versioned rule set, so the same evidence always produces the same reading.",
  },
  {
    t: "Every conclusion carries its reasons",
    b: "Each recommendation traces back through the skill map to the observations behind it. A parent can ask why and get a real answer.",
  },
  {
    t: "It grows with the child",
    b: "The profile updates every session and compounds over years, which is the part of good tutoring that software has always missed.",
  },
];

const EXAMPLES = [
  {
    q: "“s… u… n… snake?”",
    obs: "The child says every sound correctly and reaches for a different word.",
    cause: "Holding sounds in working memory",
  },
  {
    q: "“I knew this yesterday.”",
    obs: "The child has the material and comes apart on anything timed.",
    cause: "Self regulation under pressure",
  },
  {
    q: "“I read it. I don't know.”",
    obs: "The child reads the page smoothly and cannot say what happened in it.",
    cause: "Comprehension monitoring",
  },
];

const PRODUCTS = [
  {
    name: "Axial Read",
    status: "Live demo",
    body: "A reading tutor for four to eight year olds. The child reads aloud, the model finds the skill underneath that is blocking them, and the teaching changes in response.",
    href: `${BASE}read/`,
    cta: "See it work",
  },
  {
    name: "Axial for schools",
    status: "In development",
    body: "One view of thirty children's cognitive maps, so a teacher can group and target instruction across a whole class.",
  },
  {
    name: "Axial for older learners",
    status: "Research",
    body: "The metacognitive layer for students who work hard and underperform, which is where the model began.",
  },
];

export default function CompanyApp() {
  useReveal();

  return (
    <div className="page">
      <div className="grain" aria-hidden="true" />
      <SiteNav current="company" />

      <header className="hero section">
        <div className="hero-inner">
          <h1 className="hero-title">We map how a child learns.</h1>

          <p className="hero-lede">
            Axial is a model of how a mind learns, grounded in published
            cognitive science and explainable end to end. It works out{" "}
            <strong>what a child is stuck on and why</strong>, and every product
            we build sits on top of it.
          </p>

          <div className="hero-cta">
            <a className="btn btn-primary" href={`${BASE}read/`}>
              See the reading tutor
            </a>
            <a className="btn btn-ghost" href="#model">
              How the model works
            </a>
          </div>
        </div>

        <div className="hero-figure">
          <DomainConstellation center="how a child thinks" showExamples={false} />
        </div>
      </header>

      <section className="section" id="model">
        <div className="section-head">
          <h2 className="section-title">A map of how one child thinks</h2>
          <p className="section-standfirst">
            Axial describes a learner as a set of connected cognitive skills
            across six domains, scored from how the child actually works. The
            links between those skills carry the useful information, because
            they show which weakness is causing which.
          </p>
        </div>

        <div className="facts">
          {FACTS.map((f) => (
            <div className="fact" key={f.k}>
              <span className="fact-k">{f.k}</span>
              <span className="fact-v">{f.v}</span>
              <span className="fact-n">{f.n}</span>
            </div>
          ))}
        </div>

        <div className="tiles tiles--3">
          {PRINCIPLES.map((p) => (
            <div className="tile" key={p.t}>
              <h3 className="tile-title">{p.t}</h3>
              <p className="tile-body">{p.b}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="examples">
        <div className="section-head">
          <h2 className="section-title">Three children who all look stuck on reading</h2>
          <p className="section-standfirst">
            Each of these children needs different teaching this week. The map
            is what tells them apart.
          </p>
        </div>

        <div className="tiles tiles--3">
          {EXAMPLES.map((e) => (
            <div className="tile tile--example" key={e.cause}>
              <p className="tile-quote">{e.q}</p>
              <p className="tile-body">{e.obs}</p>
              <span className="tile-arrow" aria-hidden="true">↓</span>
              <p className="tile-cause">
                <b>{e.cause}</b>
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="products">
        <div className="section-head">
          <h2 className="section-title">Products built on the model</h2>
          <p className="section-standfirst">
            The engine stays the same and the skills taught on top of it change.
            We started with reading, because it is early, universal, and the
            point where a parent first feels the stakes.
          </p>
        </div>

        <div className="products">
          {PRODUCTS.map((p) => (
            <article className={`product ${p.href ? "is-live" : ""}`} key={p.name}>
              <span className="product-status">{p.status}</span>
              <h3 className="product-name">{p.name}</h3>
              <p className="product-body">{p.body}</p>
              {p.href && (
                <a className="product-cta" href={p.href}>
                  {p.cta} <span aria-hidden="true">→</span>
                </a>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="about">
        <div className="section-head">
          <h2 className="section-title">Built from years of tutoring children</h2>
        </div>

        <div className="about-grid">
          <p className="about-lede">
            Axial comes out of one observation from that work.{" "}
            <strong>
              The same explanation lands completely differently for two children.
            </strong>{" "}
            Once you understand how a particular child's mind works, teaching
            becomes far easier and the child improves quickly. Every good tutor
            does this by instinct, and Axial makes it something software can do
            at scale.
          </p>
          <div className="about-side">
            <p>
              Aaryaa Kamdar trained in architecture and data science at the
              Architectural Association in London, and holds a master's in
              innovation management and entrepreneurship.
            </p>
            <p className="about-note">
              Axial is looking for a founding partner with go to market and
              sales partnerships experience.{" "}
              <a href="mailto:aaryaa.kamdar@gmail.com">Get in touch</a>.
            </p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-mark">Axial</div>
        <p className="footer-line">A model of how a child learns.</p>
        <p className="footer-fine">
          The cognitive engine, the full taxonomy and the research behind Axial
          are proprietary. This site shows what the method produces.
        </p>
      </footer>
    </div>
  );
}
