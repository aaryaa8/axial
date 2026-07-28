import SiteNav from "./components/SiteNav";
import useReveal from "./useReveal";

const BASE = import.meta.env.BASE_URL;

const STATUS = [
  {
    t: "The cognitive model",
    s: "Built",
    b: "35 skills across six domains, around a hundred dependencies between them, drawn from about 120 peer reviewed sources, with a deterministic scoring engine on top.",
  },
  {
    t: "Axial Read",
    s: "In progress",
    b: "The reading tutor. The demo works end to end. The early reading progression, the play based intake for four to eight year olds and the child facing interface are being built now.",
  },
  {
    t: "Axial for schools",
    s: "In progress",
    b: "One view of a whole class, so a teacher can group and target instruction. Prototyped, and waiting on the reading tutor to land first.",
  },
  {
    t: "Consent and safety",
    s: "In progress",
    b: "Verifiable parental consent and a content review layer, both required before any real child uses the product.",
  },
];

export default function AboutApp() {
  useReveal();
  return (
    <div className="page">
      <div className="grain" aria-hidden="true" />
      <SiteNav current="about" />

      <section className="section about-page">
        <div className="section-head">
          <h2 className="section-title">About Axial</h2>
          <p className="section-standfirst">
            Axial began with a question that comes up constantly when you teach
            children one to one. Why does the same explanation work for one child
            and fail completely for the next?
          </p>
        </div>

        <div className="about-grid">
          <div>
            <p className="about-lede">
              <strong>
                Once you understand how a particular child's mind works, teaching
                becomes far easier and the child improves quickly.
              </strong>{" "}
              Every good tutor works this out by instinct over months of sitting
              with one child. It has never been something software could do,
              because doing it takes a model of the child that nobody had built.
            </p>
            <p className="about-body">
              So that is what we built first. Axial describes a learner as a set
              of connected cognitive skills across six domains, scored from how
              the child actually works, with every conclusion traceable to
              something we observed. The reading tutor is the first product on
              top of it, and the model reaches a good deal further than reading.
            </p>
          </div>

          <div className="about-side">
            <p>
              <b>Aaryaa Kamdar</b> trained in architecture and data science at the
              Architectural Association in London, studied cognitive
              neuroscience at Brown, and holds a master's in innovation
              management and entrepreneurship. Alongside that, years of tutoring
              children one to one and teaching through TeachSTEAM, an education
              program running STEAM workshops for school children.
            </p>
            <p className="about-note">
              Axial is looking for a founding partner with go to market and sales
              partnerships experience.{" "}
              <a href="mailto:aaryaa.kamdar@gmail.com">Get in touch</a>.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2 className="section-title">Where things stand</h2>
          <p className="section-standfirst">
            Axial is early, and it is worth being straightforward about which
            parts exist today and which are being built.
          </p>
        </div>

        <div className="tiles tiles--2">
          {STATUS.map((s) => (
            <div className="tile" key={s.t}>
              <span className={`status-tag ${s.s === "Built" ? "is-done" : "is-wip"}`}>{s.s}</span>
              <h3 className="tile-title">{s.t}</h3>
              <p className="tile-body">{s.b}</p>
            </div>
          ))}
        </div>

        <div className="about-cta">
          <a className="btn btn-primary" href={`${BASE}read/`}>
            See the reading tutor
          </a>
          <a className="btn btn-ghost" href={`${BASE}map/`}>
            Explore the map
          </a>
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
