import SiteNav from "./SiteNav";
import useReveal from "../useReveal";

const BASE = import.meta.env.BASE_URL;

export default function ComingSoon({ name, line }: { name: string; line: string }) {
  useReveal();
  return (
    <div className="page">
      <div className="grain" aria-hidden="true" />
      <SiteNav current="products" />

      <section className="section soon-page">
        <span className="status-tag is-wip">Coming soon</span>
        <h1 className="section-title">{name}</h1>
        <p className="section-standfirst">{line}</p>
        <div className="hero-cta">
          <a className="btn btn-primary" href={`${BASE}read/`}>See the reading tutor</a>
          <a className="btn btn-ghost" href={`${BASE}products/`}>All products</a>
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
