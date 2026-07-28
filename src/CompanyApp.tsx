import SiteNav from "./components/SiteNav";
import useReveal from "./useReveal";
import DomainConstellation from "./components/DomainConstellation";
import Tag from "./components/Tag";
import ProductGrid from "./components/ProductGrid";
import { YOUNG_LEARNERS, WIDER } from "./data/products";

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

export default function CompanyApp() {
  useReveal();

  return (
    <div className="page">
      <div className="grain" aria-hidden="true" />
      <SiteNav current="company" />

      <header className="hero section">
        <div className="hero-inner">
          <Tag mark="star">Cognitive science, built into software</Tag>
          <h1 className="ab-h1">
            <span className="ab-h1-light">We map</span>
            <span className="ab-h1-bold">how a child learns.</span>
          </h1>

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
          <Tag mark="orbit">The model</Tag>
          <h2 className="ab-h2">
            <span className="ab-h1-light">A map of</span>
            <span className="ab-h1-bold">how one child thinks.</span>
          </h2>
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

      <div className="ab-panel">
      <section className="section" id="examples">
        <div className="section-head">
          <Tag mark="fork">What the map catches</Tag>
          <h2 className="ab-h2">
            <span className="ab-h1-light">Three children who all</span>
            <span className="ab-h1-bold">look stuck on reading.</span>
          </h2>
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
      </div>

      <section className="section" id="products">
        <div className="section-head">
          <Tag mark="chain">What it powers</Tag>
          <h2 className="ab-h2">
            <span className="ab-h1-light">Products built</span>
            <span className="ab-h1-bold">on the model.</span>
          </h2>
          <p className="section-standfirst">
            The engine stays the same and the skills taught on top of it change.
            We started with reading, because it is early, universal, and the
            point where a parent first feels the stakes.
          </p>
        </div>

        <h3 className="group-title">Axial for young learners</h3>
        <ProductGrid items={YOUNG_LEARNERS} />

        <h3 className="group-title group-title--gap">Beyond one child</h3>
        <ProductGrid items={WIDER} />
      </section>

      <div className="ab-panel">
      <section className="section" id="about">
        <div className="section-head">
          <Tag mark="pair">Who is building this</Tag>
          <h2 className="ab-h2">
            <span className="ab-h1-light">Built from years</span>
            <span className="ab-h1-bold">of tutoring children.</span>
          </h2>
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
              <a className="bio-link" href="https://www.linkedin.com/in/aaryaa-kamdar/" target="_blank" rel="noreferrer">
                Aaryaa Kamdar
              </a>{" "}
              trained in architecture and data science at the Architectural
              Association in London, then studied cognitive neuroscience and
              completed a master's in innovation management and entrepreneurship
              at Brown University.
            </p>
            <p className="about-note">
              Axial is looking for a founding partner with go to market and
              sales partnerships experience.{" "}
              <a href="mailto:aaryaa.kamdar@gmail.com">Get in touch</a>.
            </p>
          </div>
        </div>
      </section>
      </div>

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
