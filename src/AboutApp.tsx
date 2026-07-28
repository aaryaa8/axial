import SiteNav from "./components/SiteNav";
import useReveal from "./useReveal";
import DomainConstellation from "./components/DomainConstellation";

const BASE = import.meta.env.BASE_URL;

// Content follows the live Axial about page, carried across into the child and
// parent framing this site uses.
const WHO = [
  {
    t: "Children",
    d: "A way of learning that finally fits how they think, and language for what has felt hard, without a label attached.",
  },
  {
    t: "Parents",
    d: "Understand how your child actually learns, and how to help in a way that fits them. No diagnosis and no pathologising, just a clearer picture and a plan.",
  },
  {
    t: "Teachers",
    d: "You already know your students learn differently. Axial gives you a precise, practical read on each one, so support matches the child in front of you.",
  },
];

const APPLIES = [
  { t: "Early reading", d: "Find the skill underneath a stall, before a child decides they are bad at reading." },
  { t: "Learning differences", d: "Built with neurodivergent learners in mind. Two children with the same diagnosis can have very different profiles, and very different needs." },
  { t: "Tutoring support", d: "A precise starting point, so sessions target the thing that actually moves the needle." },
  { t: "Classroom teaching", d: "A shared language for how a class learns, so instruction can flex to fit real differences." },
];

const BEYOND = [
  { t: "Workplace learning", d: "The same map shows why strong performers plateau and where training will actually land." },
  { t: "Hiring and talent", d: "A structural read on how someone thinks, adapts under pressure and manages goals, for roles where judgement matters more than a personality label." },
  { t: "Sport and performance", d: "Attentional control, decision-making and composure are all measurable, which turns vague talk of mental toughness into specific targets." },
  { t: "High-stakes work", d: "Errors under fatigue come from cognition breaking down while the knowledge is already there. Axial shows what degrades under load." },
];

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
              learning. No score and no label, just a picture you can do
              something about.
            </p>
          </div>
          <div className="tile">
            <h3 className="tile-title">Six domains</h3>
            <p className="tile-body">
              Every skill Axial measures sits inside one of six domains of
              thinking, feeling and relating. The links between them show which
              weakness is causing which.
            </p>
          </div>
          <div className="tile">
            <h3 className="tile-title">The science underneath</h3>
            <p className="tile-body">
              Built on sixty years of cognitive science, drawn from the research
              psychologists use to understand how people think and learn.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2 className="section-title">Useful to everyone helping them</h2>
        </div>
        <div className="tiles tiles--3">
          {WHO.map((w) => (
            <div className="tile" key={w.t}>
              <h3 className="tile-title">{w.t}</h3>
              <p className="tile-body">{w.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2 className="section-title">Where it applies today</h2>
          <p className="section-standfirst">
            Axial started with reading, because that is where the mismatch shows
            up first and hurts most.
          </p>
        </div>
        <div className="tiles tiles--2">
          {APPLIES.map((a) => (
            <div className="tile" key={a.t}>
              <h3 className="tile-title">{a.t}</h3>
              <p className="tile-body">{a.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2 className="section-title">The same map extends past the classroom</h2>
          <p className="section-standfirst">
            Anywhere people have to think clearly under pressure. Education is
            where we are starting, and the profile a child builds carries into
            the rest of their life.
          </p>
        </div>
        <div className="tiles tiles--2">
          {BEYOND.map((b) => (
            <div className="tile tile--soon" key={b.t}>
              <h3 className="tile-title">{b.t}</h3>
              <p className="tile-body">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2 className="section-title">Who is building this</h2>
        </div>
        <div className="about-grid">
          <p className="about-lede">
            <a className="bio-link" href="https://www.linkedin.com/in/aaryaa-kamdar/" target="_blank" rel="noreferrer">
              Aaryaa Kamdar
            </a>{" "}
            trained in architecture and data science at the Architectural
            Association in London, then studied cognitive neuroscience and
            completed a master's in innovation management and entrepreneurship at
            Brown University, alongside years of tutoring children one to one.
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
