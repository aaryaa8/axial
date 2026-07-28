import SiteNav from "./components/SiteNav";
import useReveal from "./useReveal";

const BASE = import.meta.env.BASE_URL;

export default function ArithmeticApp() {
  useReveal();
  return (
    <div className="page">
      <div className="grain" aria-hidden="true" />
      <SiteNav current="products" />

      <section className="section">
        <div className="section-head">
          <span className="status-tag is-wip">Coming soon</span>
          <h2 className="section-title">Axial Arithmetic</h2>
          <p className="section-standfirst">
            Early number sense through to arithmetic, running on the same
            cognitive model as the reading tutor. A child who loses the thread
            mid-sum and a child who has never held the idea of quantity need
            different teaching, and the map is what tells them apart.
          </p>
        </div>

        <div className="tiles tiles--2">
          <div className="tile">
            <h3 className="tile-title">The engine is already built</h3>
            <p className="tile-body">
              Arithmetic needs a new skill progression on top, and the model
              underneath is the one that already scores reading. That is the
              point of building the model first.
            </p>
          </div>
          <div className="tile">
            <h3 className="tile-title">What comes with it</h3>
            <p className="tile-body">
              The same play based intake, the same explainable scoring, and the
              same one sentence to the parent explaining what changed and why.
            </p>
          </div>
        </div>

        <div className="soon-next">
          <h3 className="tile-title">Also coming</h3>
          <div className="tiles tiles--2">
            <div className="tile tile--soon">
              <span className="status-tag is-wip">Coming soon</span>
              <h3 className="tile-title">Axial for Schools</h3>
              <p className="tile-body">
                One view of a whole class, so a teacher can see thirty cognitive
                maps at once and group instruction around them.
              </p>
            </div>
            <div className="tile">
              <span className="status-tag is-done">Live demo</span>
              <h3 className="tile-title">Axial Read</h3>
              <p className="tile-body">
                The reading tutor, working end to end today.
              </p>
              <a className="product-cta" href={`${BASE}read/`}>
                See it work <span aria-hidden="true">→</span>
              </a>
            </div>
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
