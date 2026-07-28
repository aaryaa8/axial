import SiteNav from "./components/SiteNav";
import useReveal from "./useReveal";
import ProductGrid from "./components/ProductGrid";
import { YOUNG_LEARNERS, WIDER } from "./data/products";

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
            it. Reading is live as a demo, and everything else runs on the same
            engine.
          </p>
        </div>

        <h3 className="group-title">Axial for young learners</h3>
        <ProductGrid items={YOUNG_LEARNERS} />

        <h3 className="group-title group-title--gap">Beyond one child</h3>
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
