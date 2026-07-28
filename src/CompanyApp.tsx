import SiteNav from "./components/SiteNav";
import useReveal from "./useReveal";
import DomainConstellation from "./components/DomainConstellation";
import Tag from "./components/Tag";
import ProductGrid from "./components/ProductGrid";
import { YOUNG_LEARNERS, WIDER } from "./data/products";

const BASE = import.meta.env.BASE_URL;

const FACTS = [
  { k: "35", v: "cognitive skills", n: "across six domains" },
  { k: "100", v: "dependencies", n: "showing which skill carries which" },
  { k: "120", v: "sources", n: "of peer reviewed research" },
];

const EXAMPLES = [
  {
    q: "“s… u… n… snake?”",
    obs: "Every sound correct, and then a different word.",
    cause: "Holding sounds in working memory",
  },
  {
    q: "“I knew this yesterday.”",
    obs: "Has the material, comes apart on anything timed.",
    cause: "Self regulation under pressure",
  },
  {
    q: "“I read it. I don't know.”",
    obs: "Reads the page smoothly, cannot say what happened.",
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
            Axial works out <strong>what a child is stuck on and why</strong>,
            from a model of how their mind handles learning. Every product we
            build sits on top of it.
          </p>

          <div className="hero-cta">
            <a className="btn btn-primary" href={`${BASE}read/`}>
              See the reading tutor
            </a>
            <a className="btn btn-ghost" href={`${BASE}about/`}>
              How it works
            </a>
          </div>
        </div>

        <div className="hero-figure">
          <DomainConstellation center="how a child thinks" showExamples={false} />
        </div>
      </header>

      <section className="section co-facts">
        <div className="facts">
          {FACTS.map((f) => (
            <div className="fact" key={f.k}>
              <span className="fact-k">{f.k}</span>
              <span className="fact-v">{f.v}</span>
              <span className="fact-n">{f.n}</span>
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
              Each needs different teaching this week. The map is what tells them
              apart.
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
        </div>

        <div className="ab-minilabel">Axial for young learners</div>
        <ProductGrid items={YOUNG_LEARNERS} />

        <div className="ab-minilabel ab-minilabel--gap">Beyond one child</div>
        <ProductGrid items={WIDER} />
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
