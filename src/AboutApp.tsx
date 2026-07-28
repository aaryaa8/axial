import SiteNav from "./components/SiteNav";
import useReveal from "./useReveal";
import DomainConstellation from "./components/DomainConstellation";

const BASE = import.meta.env.BASE_URL;

export default function AboutApp() {
  useReveal();
  return (
    <div className="page">
      <div className="grain" aria-hidden="true" />
      <SiteNav current="about" />

      <header className="hero section">
        <div className="hero-inner">
          <h1 className="hero-title">Start learning the way your child thinks.</h1>
          <p className="hero-lede">
            Axial maps how a child's mind actually works, then builds the
            teaching around it. Learning that fits how they think, so it stops
            feeling like a fight.
          </p>
          <div className="hero-cta">
            <a className="btn btn-primary" href={`${BASE}read/`}>See the reading tutor</a>
            <a className="btn btn-ghost" href={`${BASE}map/`}>Explore the map</a>
          </div>
        </div>
        <div className="hero-figure">
          <DomainConstellation center="how a child thinks" showExamples={false} />
        </div>
      </header>

      <section className="section">
        <div className="section-head">
          <h2 className="section-title">It was the one-size-fits-all approach</h2>
          <p className="section-standfirst">
            Axial starts from a simple flip. Stop asking the child to adapt to
            the system, and build a system that adapts to the child.
          </p>
        </div>

        <div className="tiles tiles--3">
          <div className="tile">
            <h3 className="tile-title">A picture you can act on</h3>
            <p className="tile-body">
              From a short diagnostic, a personal map of how a child handles
              learning. No score and no label, just something you can do
              something about on Monday morning.
            </p>
          </div>
          <div className="tile">
            <h3 className="tile-title">Six domains</h3>
            <p className="tile-body">
              Every skill Axial measures sits inside one of six domains of
              thinking, feeling and relating, and the links between them show
              which weakness is causing which.
            </p>
          </div>
          <div className="tile">
            <h3 className="tile-title">The science underneath</h3>
            <p className="tile-body">
              Built on sixty years of cognitive science. The skills that shape
              how a child learns, and how they fit together, drawn from the
              research psychologists use to understand how people think.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2 className="section-title">Where Axial starts, and where it goes</h2>
          <p className="section-standfirst">
            Axial started with reading, because that is where the mismatch shows
            up first and hurts most. The same map works anywhere learning and
            focus matter, and the profile a child builds carries into the rest
            of their life.
          </p>
        </div>

        <div className="tiles tiles--2">
          <div className="tile">
            <span className="status-tag is-done">Built</span>
            <h3 className="tile-title">The cognitive model</h3>
            <p className="tile-body">
              35 skills across six domains, around a hundred dependencies
              between them, and a deterministic scoring engine on top.
            </p>
          </div>
          <div className="tile">
            <span className="status-tag is-wip">In progress</span>
            <h3 className="tile-title">Everything built on it</h3>
            <p className="tile-body">
              The reading tutor works end to end as a demo. The play based
              intake, the child facing interface, and the consent and safety
              layer needed before a real child uses it are being built now.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2 className="section-title">Who is building this</h2>
        </div>
        <div className="about-grid">
          <p className="about-lede">
            Aaryaa Kamdar trained in architecture and data science at the
            Architectural Association in London, studied cognitive neuroscience
            at Brown, and has spent years tutoring children one to one.
          </p>
          <div className="about-side">
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
