import SiteNav from "./components/SiteNav";
import useReveal from "./useReveal";

const BASE = import.meta.env.BASE_URL;

const PRODUCTS = [
  {
    name: "Axial Read",
    status: "Live demo",
    live: true,
    body: "A reading tutor for four to eight year olds. The child reads aloud, the model finds the skill underneath that is blocking them, and the teaching changes in response.",
    href: `${BASE}read/`,
    cta: "See it work",
  },
  {
    name: "Axial Arithmetic",
    status: "Coming soon",
    live: false,
    body: "Early number sense through to arithmetic, on the same cognitive model. The skills on top change and the engine underneath stays the same.",
    href: `${BASE}arithmetic/`,
    cta: "What is coming",
  },
  {
    name: "Axial for Schools",
    status: "Coming soon",
    live: false,
    body: "One view of a whole class, so a teacher can see thirty cognitive maps at once and group and target instruction accordingly.",
  },
];

export default function ProductsApp() {
  useReveal();
  return (
    <div className="page">
      <div className="grain" aria-hidden="true" />
      <SiteNav current="products" />

      <section className="section">
        <div className="section-head">
          <h2 className="section-title">Products</h2>
          <p className="section-standfirst">
            One cognitive model, and a widening set of things taught on top of
            it. Reading is live as a demo, and the rest follow the same engine.
          </p>
        </div>

        <div className="tiles tiles--3">
          {PRODUCTS.map((p) => (
            <div className={`tile ${p.live ? "" : "tile--soon"}`} key={p.name}>
              <span className={`status-tag ${p.live ? "is-done" : "is-wip"}`}>{p.status}</span>
              <h3 className="tile-title">{p.name}</h3>
              <p className="tile-body">{p.body}</p>
              {p.href && (
                <a className="product-cta" href={p.href}>
                  {p.cta} <span aria-hidden="true">→</span>
                </a>
              )}
            </div>
          ))}
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
