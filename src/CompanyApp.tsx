import { useEffect } from "react";
import SiteNav from "./components/SiteNav";
import DomainConstellation from "./components/DomainConstellation";

const BASE = import.meta.env.BASE_URL;

const FACTS = [
  { k: "31", v: "cognitive skills", n: "across six domains of thinking, feeling and relating" },
  { k: "98", v: "dependencies", n: "typed links describing which skills carry which" },
  { k: "120", v: "sources", n: "peer reviewed research behind the map" },
];

const PRODUCTS = [
  {
    name: "Axial Read",
    status: "Live demo",
    body: "A reading tutor for four to eight year olds. The child reads aloud, the model works out which skill underneath is holding her back, and the teaching changes in response.",
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
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll(".section"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      sections.forEach((s) => s.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <div className="page">
      <div className="grain" aria-hidden="true" />
      <SiteNav current="company" />

      <header className="hero co-hero section">
        <div className="hero-inner">
          <div className="eyebrow">
            <span className="eyebrow-mark">Axial</span>
            <span className="eyebrow-sep" />
            cognitive science, built into software
          </div>

          <h1 className="hero-title">
            We map how a child <em>learns</em>.
          </h1>

          <p className="hero-lede">
            Axial is a model of how a mind learns, grounded in published
            cognitive science and explainable end to end. It works out what a
            child is stuck on and why, and every product we build sits on top
            of it.
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

        <div className="co-hero-figure">
          <DomainConstellation center="how a child thinks" showExamples={false} />
        </div>
      </header>

      <section className="section co-model" id="model">
        <div className="section-head">
          <span className="section-kicker">The model</span>
          <h2 className="section-title">One map of a child's thinking.</h2>
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

        <div className="principles">
          <div className="principle">
            <h3>The scoring is deterministic</h3>
            <p>
              What a child knows is computed from a versioned rule set, so the
              same evidence always produces the same reading. No language model
              decides what your child knows.
            </p>
          </div>
          <div className="principle">
            <h3>Every conclusion carries its reasons</h3>
            <p>
              Each recommendation traces back through the skill map to the
              observations that produced it. A parent or a teacher can ask why
              and get a real answer.
            </p>
          </div>
          <div className="principle">
            <h3>It grows with the child</h3>
            <p>
              The profile updates every session and compounds over years, which
              is the part of good tutoring that software has never had.
            </p>
          </div>
        </div>
      </section>

      <section className="section co-products" id="products">
        <div className="section-head">
          <span className="section-kicker">What it powers</span>
          <h2 className="section-title">One model, several products.</h2>
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

      <section className="section co-about" id="about">
        <div className="section-head">
          <span className="section-kicker">Who is building this</span>
          <h2 className="section-title">
            Built by someone who has sat with the children.
          </h2>
        </div>

        <div className="about-grid">
          <p className="about-lede">
            Axial comes out of years of tutoring children one to one, and out of
            a simple observation from that work. The same explanation lands
            completely differently for two children, and once you understand how
            a particular child's mind works, teaching becomes far easier. Every
            good tutor does this by instinct. Axial makes it something software
            can do at scale.
          </p>
          <div className="about-side">
            <p>
              Aaryaa Kamdar trained in architecture and data science at the
              Architectural Association in London, and holds a master's in
              innovation management and entrepreneurship from Brown.
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
