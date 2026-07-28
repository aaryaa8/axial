import SiteNav from "./components/SiteNav";
import useReveal from "./useReveal";
import ProductGrid from "./components/ProductGrid";
import Tag from "./components/Tag";
import { YOUNG_LEARNERS, WIDER } from "./data/products";

export default function ProductsApp() {
  useReveal();
  return (
    <div className="page">
      <div className="grain" aria-hidden="true" />
      <SiteNav current="products" />

      <section className="section">
        <div className="section-head">
          <Tag mark="chain">Products</Tag>
          <h2 className="ab-h2">
            <span className="ab-h1-light">One model,</span>
            <span className="ab-h1-bold">a widening set of products.</span>
          </h2>
          <p className="section-standfirst">
            One cognitive model, and a widening set of things taught on top of
            it. Reading is live as a demo, and everything else runs on the same
            engine.
          </p>
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
